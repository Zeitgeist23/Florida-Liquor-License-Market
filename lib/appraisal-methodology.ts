import type { Listing } from "@/data/listings";
import type { AppraisalCase, AppraisalComparable } from "@/lib/appraisal-case-store";

export const APPRAISAL_METHODOLOGY_VERSION = "FLLM-QLA-1.0";

export function classifyQuotaLicense(seriesValue: string, modifierValue: string) {
  const series = seriesValue.trim().toUpperCase();
  const modifier = modifierValue.trim().toUpperCase();
  const specialModifier =
    /(SFS|SRX|SPECIAL|HOTEL|MOTEL|CLUB|GOLF|AIRPORT|THEME|CATER|CIVIC|PERFORM|BOWLING|RACE|VESSEL)/i.test(modifier);

  if (["4COP", "5COP", "6COP", "7COP", "8COP"].includes(series)) {
    return specialModifier ? null : ("4COP Quota" as const);
  }
  if (["3PS", "3APS", "3BPS", "3CPS", "3DPS"].includes(series)) {
    return "3PS Quota / Package Store" as const;
  }
  return null;
}

function median(values: number[]) {
  const prices = [...values].sort((a, b) => a - b);
  if (!prices.length) return null;
  const midpoint = Math.floor(prices.length / 2);
  return prices.length % 2
    ? prices[midpoint]
    : Math.round((prices[midpoint - 1] + prices[midpoint]) / 2);
}

function comparableFromListing(
  listing: Listing,
  tier: AppraisalComparable["tier"],
  evidenceType: AppraisalComparable["evidenceType"],
  included: boolean,
): AppraisalComparable | null {
  if (listing.price === null) return null;
  return {
    reference: listing.sourceRef || `${listing.county}-${listing.type}-${listing.price}`,
    county: listing.county,
    licenseType: listing.type,
    price: listing.price,
    sourceName: listing.sourceName || null,
    sourceUrl: listing.sourceUrl || null,
    tier,
    evidenceType,
    included,
    note: listing.licenseStatus || listing.note || null,
  };
}

export function buildStandardComparables(
  subject: Pick<AppraisalCase, "county" | "licenseType">,
  listings: Listing[],
) {
  const county = subject.county || "";
  const licenseType = subject.licenseType || "";
  const primary = listings
    .filter((listing) => listing.county === county && listing.type === licenseType && listing.price !== null)
    .map((listing) => comparableFromListing(listing, "B", "active_asking_price", true))
    .filter((listing): listing is AppraisalComparable => Boolean(listing))
    .sort((a, b) => a.price - b.price);

  const alternate = listings
    .filter((listing) => listing.county === county && listing.type !== licenseType && listing.price !== null)
    .map((listing) => comparableFromListing(listing, "C", "active_asking_price", primary.length === 0))
    .filter((listing): listing is AppraisalComparable => Boolean(listing))
    .sort((a, b) => a.price - b.price);

  const statewide = listings
    .filter((listing) => listing.county !== county && listing.type === licenseType && listing.price !== null)
    .map((listing) => comparableFromListing(listing, "D", "supplemental_market", primary.length === 0 && alternate.length === 0))
    .filter((listing): listing is AppraisalComparable => Boolean(listing))
    .sort((a, b) => a.price - b.price)
    .slice(0, 12);

  const comparables = [...primary, ...alternate, ...statewide];
  const included = comparables.filter((item) => item.included);
  const automatedValue = median(included.map((item) => item.price));
  const basis = primary.length
    ? `Median of ${primary.length} same-county, same-series active asking price${primary.length === 1 ? "" : "s"} (Tier B)`
    : alternate.length
      ? `Median of ${alternate.length} same-county alternate quota-series asking price${alternate.length === 1 ? "" : "s"} (Tier C; no Tier B evidence available)`
      : statewide.length
        ? `Median of ${statewide.length} statewide same-series supplemental asking price${statewide.length === 1 ? "" : "s"} (Tier D; no same-county evidence available)`
        : "No priced market evidence available";

  const primaryPrices = primary.map((item) => item.price);
  const includedPrices = included.map((item) => item.price);

  return {
    comparables,
    automatedValue,
    automatedValueBasis: basis,
    snapshot: {
      methodologyVersion: APPRAISAL_METHODOLOGY_VERSION,
      generatedAt: new Date().toISOString(),
      county,
      licenseType,
      primaryCount: primary.length,
      alternateCount: alternate.length,
      supplementalCount: statewide.length,
      primaryLow: primaryPrices.length ? Math.min(...primaryPrices) : null,
      primaryMedian: median(primaryPrices),
      primaryHigh: primaryPrices.length ? Math.max(...primaryPrices) : null,
      includedCount: included.length,
      includedLow: includedPrices.length ? Math.min(...includedPrices) : null,
      includedMedian: median(includedPrices),
      includedHigh: includedPrices.length ? Math.max(...includedPrices) : null,
      confidence: primary.length >= 5 ? "strong" : primary.length >= 2 ? "moderate" : primary.length === 1 ? "limited" : included.length ? "supplemental" : "unavailable",
      evidenceHierarchy: [
        "Tier A — verified closed transaction evidence (manual reviewer evidence; preferred when available)",
        "Tier B — same-county, same-series active market asking prices",
        "Tier C — same-county alternate quota-series market evidence",
        "Tier D — statewide same-series supplemental evidence",
      ],
    },
  };
}

export function recalculateFromComparables(comparables: AppraisalComparable[]) {
  const included = comparables.filter((item) => item.included && Number.isFinite(item.price));
  return {
    automatedValue: median(included.map((item) => item.price)),
    includedCount: included.length,
  };
}

export type QcItem = {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
  blocking: boolean;
};

export function evaluateAppraisalQc(
  appraisalCase: AppraisalCase,
  lienSearch: Record<string, unknown> | null,
) {
  const uccStatus = String(lienSearch?.ucc_status || lienSearch?.uccStatus || "not_run");
  const abtStatus = String(lienSearch?.abt_status || lienSearch?.abtStatus || "not_requested");
  const primaryCount = Number(appraisalCase.marketSnapshot?.primaryCount || 0);
  const includedCount = appraisalCase.comparables.filter((item) => item.included).length;
  const adjustmentNeedsReason = Math.abs(appraisalCase.reviewerAdjustment || 0) > 0;

  const items: QcItem[] = [
    {
      id: "dbpr",
      label: "DBPR identity verified",
      passed: Boolean(appraisalCase.dbprVerifiedAt && appraisalCase.ownerName && appraisalCase.county && appraisalCase.series),
      detail: appraisalCase.dbprVerifiedAt ? `Verified ${new Date(appraisalCase.dbprVerifiedAt).toLocaleString()}` : "DBPR verification has not been completed.",
      blocking: true,
    },
    {
      id: "quota",
      label: "Supported transferable quota series",
      passed: Boolean(appraisalCase.licenseType),
      detail: appraisalCase.licenseType || "The subject is not classified as a supported quota license.",
      blocking: true,
    },
    {
      id: "effective-date",
      label: "Effective date recorded",
      passed: Boolean(appraisalCase.effectiveDate),
      detail: appraisalCase.effectiveDate || "Effective date is required.",
      blocking: true,
    },
    {
      id: "intended-use",
      label: "Client / intended use documented",
      passed: Boolean(appraisalCase.clientName && appraisalCase.intendedUse),
      detail: appraisalCase.clientName && appraisalCase.intendedUse
        ? `${appraisalCase.clientName} — ${appraisalCase.intendedUse}`
        : "Client name and intended use are required.",
      blocking: true,
    },
    {
      id: "ucc",
      label: "Florida UCC research completed",
      passed: ["no_filings_reported", "filings_found"].includes(uccStatus),
      detail: `UCC status: ${uccStatus.replaceAll("_", " ")}`,
      blocking: true,
    },
    {
      id: "abt",
      label: "Official ABT-6023 disposition recorded",
      passed: ["clear", "lien_found", "inconclusive"].includes(abtStatus),
      detail: `ABT status: ${abtStatus.replaceAll("_", " ")}`,
      blocking: true,
    },
    {
      id: "market",
      label: "Comparable evidence assembled",
      passed: includedCount > 0,
      detail: `${includedCount} comparable${includedCount === 1 ? "" : "s"} included; ${primaryCount} Tier B same-county/same-series.`,
      blocking: true,
    },
    {
      id: "value",
      label: "Final opinion of value calculated",
      passed: Boolean(appraisalCase.finalValue && appraisalCase.finalValue > 0),
      detail: appraisalCase.finalValue ? `Final value: $${Math.round(appraisalCase.finalValue).toLocaleString("en-US")}` : "Final value has not been set.",
      blocking: true,
    },
    {
      id: "adjustment",
      label: "Reviewer adjustment supported",
      passed: !adjustmentNeedsReason || Boolean(appraisalCase.adjustmentReason?.trim()),
      detail: adjustmentNeedsReason
        ? appraisalCase.adjustmentReason || "A reason is required for a non-zero reviewer adjustment."
        : "No reviewer adjustment applied.",
      blocking: true,
    },
    {
      id: "limited-evidence",
      label: "Limited-evidence reconciliation explained",
      passed: primaryCount >= 2 || Boolean(appraisalCase.reviewerNotes?.trim()),
      detail: primaryCount >= 2
        ? "At least two Tier B comparables are available."
        : appraisalCase.reviewerNotes || "Reviewer notes are required when fewer than two Tier B comparables are available.",
      blocking: true,
    },
  ];

  return {
    items,
    passed: items.filter((item) => item.passed).length,
    total: items.length,
    blockingFailures: items.filter((item) => item.blocking && !item.passed).map((item) => item.id),
    canApprove: items.every((item) => !item.blocking || item.passed),
  };
}
