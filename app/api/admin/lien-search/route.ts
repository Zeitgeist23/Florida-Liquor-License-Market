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
  searchFloridaUccDebtor,
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
    const searches = await listAppraisalLienSearches(50);
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

    const results = [];
    for (const debtorName of debtorNames) {
      results.push(await searchFloridaUccDebtor(debtorName));
    }

    const filingCount = results.reduce(
      (sum, result) => sum + countReportedUccFilings(result.payload),
      0,
    );
    const allCompleted = results.every((result) => result.completed && !result.error);
    const uccStatus = !allCompleted
      ? "error"
      : filingCount > 0
        ? "filings_found"
        : "no_filings_reported";

    search = await updateAppraisalLienSearch(search.id, {
      uccStatus,
      uccSearchedAt: new Date().toISOString(),
      uccResult: {
        registry: "Florida Secured Transaction Registry",
        registryUrl: "https://floridaucc.com/search",
        filingCount,
        searches: results,
        disclaimer:
          "UCC research is a separate debtor-level public-record search and is not an official ABT-6023 certification of liens against the alcoholic-beverage license.",
      },
    });

    return NextResponse.json({
      search,
      tinyFishConfigured: true,
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
