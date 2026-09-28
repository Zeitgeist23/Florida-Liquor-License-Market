import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createAppraisalLienSearch,
  listAppraisalLienSearches,
  updateAppraisalLienSearch,
  type AbtLienStatus,
  type ReviewStatus,
} from "@/lib/appraisal-lien-search";
import { lookupFloridaRetailLicense } from "@/lib/license-fee-lookup";
import {
  countReportedUccFilings,
  getTinyFishRun,
  startFloridaUccDebtorSearch,
  tinyFishConfigured,
} from "@/lib/tinyfish-ucc-search";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 120;

function clean(value: unknown, max = 180) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function uniqueNames(values: string[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value.toLowerCase();
    if (!value || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    let searches = await listAppraisalLienSearches(50);

    if (tinyFishConfigured()) {
      const running = searches.filter((item) => item.uccStatus === "running").slice(0, 10);
      for (const item of running) {
        const rawRuns = Array.isArray(item.uccResult?.runs)
          ? (item.uccResult.runs as Array<{ debtorName?: string; runId?: string | null }>)
          : [];
        if (!rawRuns.length) continue;

        const checked = await Promise.all(
          rawRuns.map(async (entry) => {
            if (!entry.runId) return { ...entry, status: "FAILED" as const, result: null, error: "Missing TinyFish run ID." };
            try {
              const run = await getTinyFishRun(entry.runId);
              return { ...entry, ...run };
            } catch (error) {
              return {
                ...entry,
                status: "FAILED" as const,
                result: null,
                error: error instanceof Error ? error.message : "Could not check TinyFish run.",
              };
            }
          }),
        );

        const terminal = checked.every((entry) =>
          ["COMPLETED", "FAILED", "CANCELLED"].includes(String(entry.status)),
        );
        if (!terminal) continue;

        const filingCount = checked.reduce(
          (sum, entry) => sum + countReportedUccFilings(entry.result),
          0,
        );
        const allCompleted = checked.every((entry) => entry.status === "COMPLETED");
        const uccStatus = !allCompleted
          ? "error"
          : filingCount > 0
            ? "filings_found"
            : "no_filings_reported";

        await updateAppraisalLienSearch(item.id, {
          uccStatus,
          uccSearchedAt: new Date().toISOString(),
          uccResult: {
            registry: "Florida Secured Transaction Registry",
            registryUrl: "https://floridaucc.com/search",
            filingCount,
            searches: checked.map((entry) => ({
              debtorName: entry.debtorName,
              completed: entry.status === "COMPLETED",
              payload: entry.result ?? {},
              rawStatus: entry.status,
              error: entry.error ?? null,
            })),
            runs: rawRuns,
            disclaimer:
              "UCC research is a separate debtor-level public-record search and is not an official ABT-6023 certification of liens against the alcoholic-beverage license.",
          },
        });
      }
      searches = await listAppraisalLienSearches(50);
    }

    return NextResponse.json({
      searches,
      tinyFishConfigured: tinyFishConfigured(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load lien searches." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      licenseNumber?: string;
      appraisalRef?: string;
      additionalDebtorName?: string;
    };
    const licenseNumber = clean(body.licenseNumber, 40).toUpperCase().replace(/[^A-Z0-9]/g, "");
    const appraisalRef = clean(body.appraisalRef, 100) || null;
    const additionalDebtorName = clean(body.additionalDebtorName, 180);

    if (licenseNumber.length < 5) {
      return NextResponse.json({ error: "Enter a valid Florida DBPR license number." }, { status: 400 });
    }

    const record = await lookupFloridaRetailLicense(licenseNumber);
    if (!record) {
      return NextResponse.json(
        { error: "No matching license was found in the current DBPR retail alcoholic-beverage extract." },
        { status: 404 },
      );
    }

    const debtorNames = uniqueNames([
      record.ownerName !== "Not listed" ? record.ownerName : "",
      additionalDebtorName,
    ]);

    const configured = tinyFishConfigured();
    let search = await createAppraisalLienSearch({
      appraisalRef,
      licenseNumber: record.licenseNumber,
      ownerName: record.ownerName,
      dba: record.dba,
      county: record.county,
      series: record.series,
      dbprPrimaryStatus: record.primaryStatus,
      dbprSecondaryStatus: record.secondaryStatus,
      uccDebtorNames: debtorNames,
      uccStatus: configured ? "running" : "configuration_required",
      abtStatus: "ready_to_request",
    });

    if (!configured) {
      return NextResponse.json({
        search,
        tinyFishConfigured: false,
        message: "DBPR identity captured. Add TINYFISH_API_KEY to enable automated Florida UCC research.",
      });
    }

    const runs = await Promise.all(
      debtorNames.map((debtorName) => startFloridaUccDebtorSearch(debtorName)),
    );

    const failedStarts = runs.filter((run) => !run.runId);
    if (failedStarts.length) {
      search = await updateAppraisalLienSearch(search.id, {
        uccStatus: "error",
        uccSearchedAt: new Date().toISOString(),
        uccResult: {
          registry: "Florida Secured Transaction Registry",
          registryUrl: "https://floridaucc.com/search",
          filingCount: 0,
          runs,
          searches: failedStarts.map((run) => ({
            debtorName: run.debtorName,
            completed: false,
            payload: {},
            rawStatus: null,
            error: run.error,
          })),
          disclaimer:
            "UCC research is a separate debtor-level public-record search and is not an official ABT-6023 certification of liens against the alcoholic-beverage license.",
        },
      });
      return NextResponse.json({
        search,
        tinyFishConfigured: true,
        message: "TinyFish could not start one or more Florida UCC searches. Review the audit record for details.",
      });
    }

    search = await updateAppraisalLienSearch(search.id, {
      uccStatus: "running",
      uccResult: {
        registry: "Florida Secured Transaction Registry",
        registryUrl: "https://floridaucc.com/search",
        filingCount: 0,
        runs,
        searches: [],
        disclaimer:
          "UCC research is a separate debtor-level public-record search and is not an official ABT-6023 certification of liens against the alcoholic-beverage license.",
      },
    });

    return NextResponse.json({
      search,
      tinyFishConfigured: true,
      message: "Florida UCC research started in TinyFish. Use Refresh to collect the completed results.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Lien-search workflow failed." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      abtStatus?: AbtLienStatus;
      abtResultSummary?: string;
      reviewStatus?: ReviewStatus;
      reviewerNotes?: string;
    };
    const id = clean(body.id, 80);
    if (!id) return NextResponse.json({ error: "Lien-search ID is required." }, { status: 400 });

    const abtStatus = body.abtStatus;
    const reviewStatus = body.reviewStatus;
    const now = new Date().toISOString();
    const search = await updateAppraisalLienSearch(id, {
      ...(abtStatus ? { abtStatus } : {}),
      ...(abtStatus === "requested" ? { abtRequestedAt: now } : {}),
      ...(["clear", "lien_found", "inconclusive"].includes(abtStatus || "")
        ? { abtReceivedAt: now }
        : {}),
      ...(body.abtResultSummary !== undefined
        ? { abtResultSummary: clean(body.abtResultSummary, 5000) || null }
        : {}),
      ...(reviewStatus ? { reviewStatus } : {}),
      ...(reviewStatus === "reviewed" ? { reviewedAt: now } : {}),
      ...(body.reviewerNotes !== undefined
        ? { reviewerNotes: clean(body.reviewerNotes, 5000) || null }
        : {}),
    });

    return NextResponse.json({ search });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update the lien-search record." },
      { status: 500 },
    );
  }
}
