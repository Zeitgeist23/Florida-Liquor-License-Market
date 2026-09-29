import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  buildStandardComparables,
  evaluateAppraisalQc,
  recalculateFromComparables,
} from "@/lib/appraisal-methodology";
import {
  addAppraisalEvent,
  getAppraisalCase,
  latestLienSearchForAppraisal,
  listAppraisalEvents,
  updateAppraisalCase,
  type AppraisalComparable,
} from "@/lib/appraisal-case-store";
import {
  createAppraisalLienSearch,
  updateAppraisalLienSearch,
} from "@/lib/appraisal-lien-search";
import { getMarketplaceListings } from "@/lib/listing-store";
import {
  countReportedUccFilings,
  getTinyFishRun,
  startFloridaUccDebtorSearch,
  tinyFishConfigured,
} from "@/lib/tinyfish-ucc-search";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

function clean(value: unknown, max = 5000) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function moneyValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.round(value);
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? Math.round(parsed) : 0;
}

function uniqueNames(values: string[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

async function syncLienRecord(caseRef: string) {
  const raw = await latestLienSearchForAppraisal(caseRef);
  if (!raw || raw.ucc_status !== "running") return raw;

  const resultObject =
    raw.ucc_result && typeof raw.ucc_result === "object"
      ? (raw.ucc_result as Record<string, unknown>)
      : {};
  const runs = Array.isArray(resultObject.runs)
    ? (resultObject.runs as Array<{ debtorName?: string; runId?: string | null }>)
    : [];

  if (!runs.length) return raw;

  const checked = await Promise.all(
    runs.map(async (entry) => {
      if (!entry.runId) {
        return {
          debtorName: entry.debtorName,
          runId: null,
          status: "FAILED" as const,
          result: null,
          error: "Missing TinyFish run ID.",
        };
      }
      try {
        const run = await getTinyFishRun(entry.runId);
        return { debtorName: entry.debtorName, runId: entry.runId, ...run };
      } catch (error) {
        return {
          debtorName: entry.debtorName,
          runId: entry.runId,
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
  if (!terminal) return raw;

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

  return updateAppraisalLienSearch(String(raw.id), {
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
      runs,
      disclaimer:
        "UCC research is a separate debtor-level public-record search and is not an official ABT-6023 certification of liens against the alcoholic-beverage license.",
    },
  });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const appraisalCase = await getAppraisalCase(id);
    if (!appraisalCase) return NextResponse.json({ error: "Appraisal case not found." }, { status: 404 });

    await syncLienRecord(appraisalCase.caseRef);
    const refreshed = (await getAppraisalCase(id)) || appraisalCase;
    const lienSearch = await latestLienSearchForAppraisal(refreshed.caseRef);
    const qc = evaluateAppraisalQc(refreshed, lienSearch);
    const events = await listAppraisalEvents(refreshed.id, 60);

    return NextResponse.json({
      appraisalCase: refreshed,
      lienSearch,
      qc,
      events,
      tinyFishConfigured: tinyFishConfigured(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load appraisal case." },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    let appraisalCase = await getAppraisalCase(id);
    if (!appraisalCase) return NextResponse.json({ error: "Appraisal case not found." }, { status: 404 });

    const body = (await request.json()) as Record<string, unknown>;
    const action = clean(body.action, 80);

    if (appraisalCase.status === "ISSUED" && !["sync_liens"].includes(action)) {
      return NextResponse.json(
        { error: "Issued appraisals are locked. Create a revision instead of altering the issued workfile." },
        { status: 409 },
      );
    }

    if (action === "run_liens") {
      const debtorNames = uniqueNames([
        appraisalCase.ownerName || "",
        clean(body.additionalDebtorName, 180),
      ]);

      const configured = tinyFishConfigured();
      let search = await createAppraisalLienSearch({
        appraisalRef: appraisalCase.caseRef,
        licenseNumber: appraisalCase.licenseNumber,
        ownerName: appraisalCase.ownerName,
        dba: appraisalCase.dba,
        county: appraisalCase.county,
        series: appraisalCase.series,
        dbprPrimaryStatus: appraisalCase.primaryStatus,
        dbprSecondaryStatus: appraisalCase.secondaryStatus,
        uccDebtorNames: debtorNames,
        uccStatus: configured ? "running" : "configuration_required",
        abtStatus: "ready_to_request",
      });

      if (configured) {
        const runs = await Promise.all(
          debtorNames.map((debtorName) => startFloridaUccDebtorSearch(debtorName)),
        );
        const failed = runs.filter((run) => !run.runId);
        search = await updateAppraisalLienSearch(search.id, {
          uccStatus: failed.length ? "error" : "running",
          ...(failed.length ? { uccSearchedAt: new Date().toISOString() } : {}),
          uccResult: {
            registry: "Florida Secured Transaction Registry",
            registryUrl: "https://floridaucc.com/search",
            filingCount: 0,
            runs,
            searches: failed.map((run) => ({
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
      }

      appraisalCase = await updateAppraisalCase(
        appraisalCase.id,
        { status: "LIEN_RESEARCH" },
        "LIEN_RESEARCH_STARTED",
        { debtorNames, tinyFishConfigured: configured },
      );

      return NextResponse.json({ appraisalCase, lienSearch: search });
    }

    if (action === "sync_liens") {
      const lienSearch = await syncLienRecord(appraisalCase.caseRef);
      if (
        lienSearch &&
        ["no_filings_reported", "filings_found"].includes(String(lienSearch.ucc_status))
      ) {
        appraisalCase = await updateAppraisalCase(
          appraisalCase.id,
          { status: appraisalCase.status === "LIEN_RESEARCH" ? "MARKET_RESEARCH" : appraisalCase.status },
          "LIEN_RESEARCH_SYNCED",
          {
            uccStatus: lienSearch.ucc_status,
            abtStatus: lienSearch.abt_status,
          },
        );
      }
      return NextResponse.json({ appraisalCase, lienSearch });
    }

    if (action === "set_abt_status") {
      const raw = await latestLienSearchForAppraisal(appraisalCase.caseRef);
      if (!raw?.id) {
        return NextResponse.json({ error: "Start lien research before recording an ABT-6023 result." }, { status: 409 });
      }
      const abtStatus = clean(body.abtStatus, 40) as
        | "not_requested"
        | "ready_to_request"
        | "requested"
        | "clear"
        | "lien_found"
        | "inconclusive";
      const allowed = new Set(["not_requested", "ready_to_request", "requested", "clear", "lien_found", "inconclusive"]);
      if (!allowed.has(abtStatus)) {
        return NextResponse.json({ error: "Invalid ABT-6023 status." }, { status: 400 });
      }
      const now = new Date().toISOString();
      const lienSearch = await updateAppraisalLienSearch(String(raw.id), {
        abtStatus,
        ...(abtStatus === "requested" ? { abtRequestedAt: now } : {}),
        ...(["clear", "lien_found", "inconclusive"].includes(abtStatus) ? { abtReceivedAt: now } : {}),
        abtResultSummary: clean(body.abtResultSummary, 5000) || null,
      });
      await addAppraisalEvent(appraisalCase.id, "ABT_STATUS_UPDATED", {
        abtStatus,
        summary: clean(body.abtResultSummary, 1000) || null,
      });
      return NextResponse.json({ appraisalCase, lienSearch });
    }

    if (action === "build_market") {
      const listings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
      const built = buildStandardComparables(appraisalCase, listings);
      const reviewerAdjustment = appraisalCase.reviewerAdjustment || 0;
      appraisalCase = await updateAppraisalCase(
        appraisalCase.id,
        {
          status: "VALUATION",
          market_snapshot: built.snapshot,
          comparables: built.comparables,
          automated_value: built.automatedValue,
          automated_value_basis: built.automatedValueBasis,
          final_value: built.automatedValue === null ? null : built.automatedValue + reviewerAdjustment,
        },
        "MARKET_EVIDENCE_BUILT",
        {
          primaryCount: built.snapshot.primaryCount,
          alternateCount: built.snapshot.alternateCount,
          supplementalCount: built.snapshot.supplementalCount,
          automatedValue: built.automatedValue,
        },
      );
      return NextResponse.json({ appraisalCase });
    }

    if (action === "add_comparable") {
      const price = moneyValue(body.price);
      if (price <= 0) return NextResponse.json({ error: "Comparable price must be greater than zero." }, { status: 400 });
      const tier = clean(body.tier, 2).toUpperCase();
      if (!["A", "B", "C", "D"].includes(tier)) {
        return NextResponse.json({ error: "Comparable tier must be A, B, C, or D." }, { status: 400 });
      }
      const evidenceType = clean(body.evidenceType, 40) as AppraisalComparable["evidenceType"];
      const allowedEvidence = new Set(["verified_transaction", "active_asking_price", "historical_listing", "supplemental_market"]);
      if (!allowedEvidence.has(evidenceType)) {
        return NextResponse.json({ error: "Invalid comparable evidence type." }, { status: 400 });
      }

      const comparable: AppraisalComparable = {
        reference: clean(body.reference, 160) || `MANUAL-${Date.now()}`,
        county: clean(body.county, 100) || appraisalCase.county || "",
        licenseType: clean(body.licenseType, 100) || appraisalCase.licenseType || "",
        price,
        sourceName: clean(body.sourceName, 160) || "Reviewer evidence",
        sourceUrl: clean(body.sourceUrl, 1000) || null,
        tier: tier as AppraisalComparable["tier"],
        evidenceType,
        included: body.included !== false,
        note: clean(body.note, 1000) || null,
      };
      const comparables = [...appraisalCase.comparables, comparable];
      const recalculated = recalculateFromComparables(comparables);
      appraisalCase = await updateAppraisalCase(
        appraisalCase.id,
        {
          status: "VALUATION",
          comparables,
          automated_value: recalculated.automatedValue,
          automated_value_basis: `Median of ${recalculated.includedCount} reviewer-included comparable${recalculated.includedCount === 1 ? "" : "s"} under ${appraisalCase.methodologyVersion}`,
          final_value: recalculated.automatedValue === null
            ? null
            : recalculated.automatedValue + (appraisalCase.reviewerAdjustment || 0),
        },
        "MANUAL_COMPARABLE_ADDED",
        { comparable },
      );
      return NextResponse.json({ appraisalCase });
    }

    if (action === "save_valuation") {
      const comparables = Array.isArray(body.comparables)
        ? (body.comparables as AppraisalComparable[]).map((item) => ({
            ...item,
            price: Math.round(Number(item.price) || 0),
            included: Boolean(item.included),
          }))
        : appraisalCase.comparables;

      const reviewerAdjustment = moneyValue(body.reviewerAdjustment);
      const recalculated = recalculateFromComparables(comparables);
      const automatedValue = recalculated.automatedValue;
      const finalValue = automatedValue === null ? null : automatedValue + reviewerAdjustment;

      appraisalCase = await updateAppraisalCase(
        appraisalCase.id,
        {
          status: "REVIEW",
          client_name: clean(body.clientName, 180) || appraisalCase.clientName,
          intended_use: clean(body.intendedUse, 180) || appraisalCase.intendedUse,
          institution_name: clean(body.institutionName, 180) || appraisalCase.institutionName,
          effective_date: clean(body.effectiveDate, 20) || appraisalCase.effectiveDate,
          comparables,
          automated_value: automatedValue,
          automated_value_basis: `Median of ${recalculated.includedCount} reviewer-included comparable${recalculated.includedCount === 1 ? "" : "s"} under ${appraisalCase.methodologyVersion}`,
          reviewer_adjustment: reviewerAdjustment,
          adjustment_reason: clean(body.adjustmentReason, 2000) || null,
          final_value: finalValue,
          reviewer_notes: clean(body.reviewerNotes, 5000) || null,
          review_status: "ready",
        },
        "VALUATION_RECONCILED",
        {
          automatedValue,
          reviewerAdjustment,
          finalValue,
          includedComparables: recalculated.includedCount,
        },
      );
      return NextResponse.json({ appraisalCase });
    }

    if (action === "approve") {
      const lienSearch = await syncLienRecord(appraisalCase.caseRef);
      appraisalCase = (await getAppraisalCase(appraisalCase.id)) || appraisalCase;
      const qc = evaluateAppraisalQc(appraisalCase, lienSearch);
      if (!qc.canApprove) {
        return NextResponse.json(
          { error: "Quality-control gates are not complete.", qc },
          { status: 409 },
        );
      }
      const now = new Date().toISOString();
      appraisalCase = await updateAppraisalCase(
        appraisalCase.id,
        {
          status: "APPROVED",
          review_status: "approved",
          approved_at: now,
        },
        "APPRAISAL_APPROVED",
        { approvedAt: now, finalValue: appraisalCase.finalValue, qc },
      );
      return NextResponse.json({ appraisalCase, qc });
    }

    if (action === "issue") {
      const lienSearch = await syncLienRecord(appraisalCase.caseRef);
      appraisalCase = (await getAppraisalCase(appraisalCase.id)) || appraisalCase;
      const qc = evaluateAppraisalQc(appraisalCase, lienSearch);
      if (appraisalCase.status !== "APPROVED") {
        return NextResponse.json({ error: "Approve the appraisal before issuing it.", qc }, { status: 409 });
      }
      if (!qc.canApprove) {
        return NextResponse.json({ error: "Quality-control gates are no longer complete.", qc }, { status: 409 });
      }
      const now = new Date().toISOString();
      const revision = appraisalCase.revision + 1;
      const issuedSnapshot = {
        issuedAt: now,
        revision,
        methodologyVersion: appraisalCase.methodologyVersion,
        appraisalCase,
        lienSearch,
        qc,
      };
      appraisalCase = await updateAppraisalCase(
        appraisalCase.id,
        {
          status: "ISSUED",
          issued_at: now,
          revision,
          issued_snapshot: issuedSnapshot,
        },
        "APPRAISAL_ISSUED",
        { issuedAt: now, revision, finalValue: appraisalCase.finalValue },
      );
      return NextResponse.json({ appraisalCase, qc });
    }

    return NextResponse.json({ error: "Unknown appraisal action." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Appraisal action failed." },
      { status: 500 },
    );
  }
}
