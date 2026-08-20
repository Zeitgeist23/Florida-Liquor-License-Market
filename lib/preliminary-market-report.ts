import "server-only";

import { randomBytes } from "node:crypto";

import { floridaCounties } from "@/data/florida-counties";
import { sendFllmEmail } from "@/lib/fllm-email";
import type { ListingSubmission } from "@/lib/listing-submission-store";

export const PRELIMINARY_MARKET_REPORT_PRICE_CENTS = 19_500;
export const PRELIMINARY_MARKET_REPORT_PRICE_LABEL = "$195";

export type PreliminaryMarketReportOrder = {
  id: string;
  submissionRef: string;
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
  county: string;
  licenseType: string;
  licenseStatus: string;
  preferredTiming: string;
  licenseNumber: string;
  currentHolderOfRecord: string | null;
  relationship: string;
  purpose: string;
};

type EstimateSnapshot = {
  count: number;
  low: number | null;
  median: number | null;
  high: number | null;
  typicalLow: number | null;
  typicalHigh: number | null;
  confidence: string;
  generatedAt: string;
};

export type CreatePreliminaryMarketReportOrderInput = {
  fullName: string;
  email: string;
  phone: string;
  county: string;
  licenseType: string;
  licenseStatus: string;
  preferredTiming: string;
  licenseNumber: string;
  currentHolderOfRecord?: string | null;
  relationship: string;
  purpose: string;
  notes?: string | null;
  estimate: EstimateSnapshot;
};

type StoredReportDetails = {
  kind?: string;
  product?: string;
  priceCents?: number;
  licenseNumber?: string | null;
  currentHolderOfRecord?: string | null;
  relationship?: string | null;
  purpose?: string | null;
  notes?: string | null;
  estimate?: Partial<EstimateSnapshot>;
};

const validCounties = new Set(floridaCounties.map((county) => county.name));
const validLicenseTypes = new Set(["4COP Quota", "3PS Quota / Package Store"]);
const validStatuses = new Set(["Active", "Inactive / Escrowed", "Pending transfer", "Not sure"]);
const validRelationships = new Set([
  "License Owner",
  "Buyer / Prospective Buyer",
  "Commercial Lender",
  "Attorney / CPA / Advisor",
  "Other",
]);
const validPurposes = new Set([
  "Considering a Sale",
  "Considering a Purchase",
  "Financing or Refinance",
  "Estate or Legal Matter",
  "Internal Planning",
  "Other",
]);

function cleanText(value: string | null | undefined, maxLength: number) {
  return (value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanLongText(value: string | null | undefined, maxLength: number) {
  return (value ?? "").trim().slice(0, maxLength);
}

function cleanAmount(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value) || value < 0 || value > 100_000_000) {
    return null;
  }
  return Math.round(value);
}

function makeReportRef() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const token = randomBytes(4).toString("hex").toUpperCase();
  return `FLLM-REPORT-${date}-${token}`;
}

function requireDatabase() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("The report-order database is not configured.");
  }
}

function supabaseEndpoint(path: string) {
  return `${process.env.SUPABASE_URL!.replace(/\/$/, "")}/rest/v1/${path}`;
}

function supabaseHeaders(extra: HeadersInit = {}): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export function isPreliminaryMarketReportOrder(
  submission: Pick<ListingSubmission, "submissionRef"> | string,
) {
  const reference = typeof submission === "string" ? submission : submission.submissionRef;
  return reference.startsWith("FLLM-REPORT-");
}

export function preliminaryMarketReportDetails(submission: Pick<ListingSubmission, "message">) {
  try {
    return JSON.parse(submission.message || "{}") as StoredReportDetails;
  } catch {
    return {} as StoredReportDetails;
  }
}

export async function createPreliminaryMarketReportOrder(
  input: CreatePreliminaryMarketReportOrderInput,
): Promise<PreliminaryMarketReportOrder> {
  requireDatabase();

  const fullName = cleanText(input.fullName, 160);
  const email = cleanText(input.email, 254).toLowerCase();
  const phone = cleanText(input.phone, 60);
  const county = cleanText(input.county, 100);
  const licenseType = cleanText(input.licenseType, 100);
  const licenseStatus = cleanText(input.licenseStatus, 120);
  const preferredTiming = cleanText(input.preferredTiming, 120);
  const licenseNumber = cleanText(input.licenseNumber, 80);
  const currentHolderOfRecord = cleanText(input.currentHolderOfRecord, 180) || null;
  const relationship = cleanText(input.relationship, 80);
  const purpose = cleanText(input.purpose, 100);
  const notes = cleanLongText(input.notes, 4000) || null;

  if (!fullName || !email || !phone || !county || !licenseType || !licenseStatus || !licenseNumber || !relationship || !purpose) {
    throw new Error("Please complete all required preliminary market report fields.");
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Please enter a valid email address.");
  if (!validCounties.has(county) || !validLicenseTypes.has(licenseType) || !validStatuses.has(licenseStatus)) {
    throw new Error("Please select valid Florida license details.");
  }
  if (!validRelationships.has(relationship) || !validPurposes.has(purpose)) {
    throw new Error("Please select a valid report purpose and relationship to the license.");
  }

  const details: StoredReportDetails = {
    kind: "preliminary_market_report",
    product: "Preliminary Florida Liquor License Market Report",
    priceCents: PRELIMINARY_MARKET_REPORT_PRICE_CENTS,
    licenseNumber,
    currentHolderOfRecord,
    relationship,
    purpose,
    notes,
    estimate: {
      count: Math.max(0, Math.min(500, Math.round(input.estimate.count || 0))),
      low: cleanAmount(input.estimate.low),
      median: cleanAmount(input.estimate.median),
      high: cleanAmount(input.estimate.high),
      typicalLow: cleanAmount(input.estimate.typicalLow),
      typicalHigh: cleanAmount(input.estimate.typicalHigh),
      confidence: cleanText(input.estimate.confidence, 40),
      generatedAt: cleanText(input.estimate.generatedAt, 40),
    },
  };

  const submissionRef = makeReportRef();
  const now = new Date().toISOString();
  const row = {
    submission_ref: submissionRef,
    full_name: fullName,
    first_name: fullName.split(/\s+/)[0] || "there",
    email,
    phone,
    county,
    license_type: licenseType,
    asking_price: null,
    asking_price_text: null,
    license_status: licenseStatus,
    preferred_timing: preferredTiming || purpose,
    message: JSON.stringify(details),
    status: "pending_payment",
    payment_email_status: "pending",
    approval_email_status: "pending",
    listing_title: `${county} ${licenseType} Preliminary Market Report — ${licenseNumber}`,
    live_listing_ref: licenseNumber,
    created_at: now,
    updated_at: now,
  };

  const response = await fetch(supabaseEndpoint("listing_submissions"), {
    method: "POST",
    headers: supabaseHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Could not save the preliminary market report order: ${response.status} ${await response.text()}`);
  }

  const rows = (await response.json()) as Array<{
    id: string;
    submission_ref: string;
    first_name: string;
  }>;
  if (!rows[0]) throw new Error("The preliminary market report order was not returned by the database.");

  return {
    id: rows[0].id,
    submissionRef: rows[0].submission_ref,
    fullName,
    firstName: rows[0].first_name || fullName.split(/\s+/)[0] || "there",
    email,
    phone,
    county,
    licenseType,
    licenseStatus,
    preferredTiming,
    licenseNumber,
    currentHolderOfRecord,
    relationship,
    purpose,
  };
}

function escapeHtml(value: string | null | undefined) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Not available";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function estimateRange(details: StoredReportDetails) {
  const low = details.estimate?.typicalLow ?? details.estimate?.low ?? null;
  const high = details.estimate?.typicalHigh ?? details.estimate?.high ?? null;
  if (low === null && high === null) return "No exact county range available";
  if (low === high || high === null) return money(low);
  if (low === null) return money(high);
  return `${money(low)}–${money(high)}`;
}

function emailShell(content: string) {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#111111;"><div style="max-width:760px;">${content}<div style="margin-top:30px;padding-top:18px;border-top:2px solid #c88908;color:#071a3a;"><strong>Florida Liquor License Market</strong><br><span style="font-size:13px;">www.floridaliquorlicensemarket.com</span></div></div></body></html>`;
}

export async function sendPreliminaryMarketReportPaymentEmails(submission: ListingSubmission) {
  const details = preliminaryMarketReportDetails(submission);
  const licenseNumber = details.licenseNumber || submission.liveListingRef || "Not provided";
  const holder = details.currentHolderOfRecord || "Not provided";
  const reviewEmail =
    process.env.MARKET_REPORT_REVIEW_EMAIL ||
    process.env.VALUATION_LEAD_REVIEW_EMAIL ||
    process.env.GOOGLE_SENDER_EMAIL ||
    "listings@floridaliquorlicensemarket.com";

  const customerHtml = emailShell(`
    <p style="margin:0 0 18px;">Hello ${escapeHtml(submission.firstName || "there")},</p>
    <p style="margin:0 0 18px;">Thank you. Your ${PRELIMINARY_MARKET_REPORT_PRICE_LABEL} payment for a <strong>Preliminary Florida Liquor License Market Report</strong> has been received.</p>
    <p style="margin:0 0 18px;">FLLM will research the subject license, current county marketplace evidence, available DBPR records, and available transfer or transaction evidence. We may contact you if additional information is needed.</p>
    <p style="margin:0 0 18px;"><strong>Order reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>County:</strong> ${escapeHtml(submission.county)}<br>
      <strong>License type:</strong> ${escapeHtml(submission.licenseType)}<br>
      <strong>License number:</strong> ${escapeHtml(licenseNumber)}<br>
      <strong>Holder of record:</strong> ${escapeHtml(holder)}</p>
    <p style="margin:0 0 18px;">Your completed report will be delivered by email after the research is completed.</p>
    <p style="margin:0;color:#555;font-size:13px;">This preliminary market report is a market analysis prepared by Florida Liquor License Market. It is not a certified appraisal, real-estate appraisal, fairness opinion, or guarantee of value.</p>`);

  const customerText = `Hello ${submission.firstName || "there"},\n\nThank you. Your ${PRELIMINARY_MARKET_REPORT_PRICE_LABEL} payment for a Preliminary Florida Liquor License Market Report has been received.\n\nOrder reference: ${submission.submissionRef}\nCounty: ${submission.county}\nLicense type: ${submission.licenseType}\nLicense number: ${licenseNumber}\nHolder of record: ${holder}\n\nFLLM will research the subject license, current county marketplace evidence, available DBPR records, and available transfer or transaction evidence. Your completed report will be delivered by email after the research is completed.\n\nThis preliminary market report is a market analysis prepared by Florida Liquor License Market. It is not a certified appraisal, real-estate appraisal, fairness opinion, or guarantee of value.`;

  const internalHtml = emailShell(`
    <p style="margin:0 0 18px;"><strong>A paid Preliminary Market Report order has been received.</strong></p>
    <p style="margin:0 0 18px;"><strong>Order reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>Customer:</strong> ${escapeHtml(submission.fullName)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(submission.phone)}<br>
      <strong>County:</strong> ${escapeHtml(submission.county)}<br>
      <strong>License type:</strong> ${escapeHtml(submission.licenseType)}<br>
      <strong>License status:</strong> ${escapeHtml(submission.licenseStatus)}<br>
      <strong>License number:</strong> ${escapeHtml(licenseNumber)}<br>
      <strong>Current holder of record:</strong> ${escapeHtml(holder)}<br>
      <strong>Relationship:</strong> ${escapeHtml(details.relationship || "Not provided")}<br>
      <strong>Purpose:</strong> ${escapeHtml(details.purpose || "Not provided")}</p>
    <p style="margin:0 0 18px;"><strong>Free-estimator range:</strong> ${escapeHtml(estimateRange(details))}<br>
      <strong>Estimator median:</strong> ${escapeHtml(money(details.estimate?.median ?? null))}<br>
      <strong>Exact active comparables:</strong> ${escapeHtml(String(details.estimate?.count ?? 0))}<br>
      <strong>Confidence:</strong> ${escapeHtml(details.estimate?.confidence || "Unavailable")}</p>
    <p style="margin:0;"><strong>Customer notes:</strong><br>${escapeHtml(details.notes || "None provided").replaceAll("\n", "<br>")}</p>`);

  const internalText = `PAID PRELIMINARY MARKET REPORT ORDER\n\nOrder reference: ${submission.submissionRef}\nCustomer: ${submission.fullName}\nEmail: ${submission.email}\nPhone: ${submission.phone}\nCounty: ${submission.county}\nLicense type: ${submission.licenseType}\nLicense status: ${submission.licenseStatus}\nLicense number: ${licenseNumber}\nCurrent holder of record: ${holder}\nRelationship: ${details.relationship || "Not provided"}\nPurpose: ${details.purpose || "Not provided"}\n\nFree-estimator range: ${estimateRange(details)}\nEstimator median: ${money(details.estimate?.median ?? null)}\nExact active comparables: ${details.estimate?.count ?? 0}\nConfidence: ${details.estimate?.confidence || "Unavailable"}\n\nCustomer notes: ${details.notes || "None provided"}`;

  const customerResult = await sendFllmEmail({
    to: submission.email,
    subject: `Preliminary Market Report Order Received — ${submission.submissionRef}`,
    text: customerText,
    html: customerHtml,
  });

  try {
    await sendFllmEmail({
      to: reviewEmail,
      replyTo: submission.email,
      subject: `PAID Market Report Order — ${submission.county} ${submission.licenseType} — ${submission.submissionRef}`,
      text: internalText,
      html: internalHtml,
    });
  } catch (error) {
    console.error("Internal preliminary market report notification failed", error);
  }

  return customerResult;
}
