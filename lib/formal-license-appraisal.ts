import "server-only";

import { randomBytes } from "node:crypto";

import { floridaCounties } from "@/data/florida-counties";
import { sendFllmEmail } from "@/lib/fllm-email";
import type { ListingSubmission } from "@/lib/listing-submission-store";

export const FORMAL_LICENSE_APPRAISAL_PRICE_CENTS = 99_500;
export const FORMAL_LICENSE_APPRAISAL_PRICE_LABEL = "$995";

export type FormalLicenseAppraisalOrder = {
  id: string;
  submissionRef: string;
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
  county: string;
  licenseType: string;
  licenseNumber: string;
  currentHolderOfRecord: string | null;
  orderingParty: string;
  intendedUse: string;
  institutionName: string | null;
  effectiveDate: string | null;
};

export type CreateFormalLicenseAppraisalOrderInput = {
  fullName: string;
  email: string;
  phone: string;
  county: string;
  licenseType: string;
  licenseNumber: string;
  currentHolderOfRecord?: string | null;
  orderingParty: string;
  intendedUse: string;
  institutionName?: string | null;
  effectiveDate?: string | null;
  notes?: string | null;
};

type StoredAppraisalDetails = {
  kind?: string;
  product?: string;
  priceCents?: number;
  licenseNumber?: string | null;
  currentHolderOfRecord?: string | null;
  orderingParty?: string | null;
  intendedUse?: string | null;
  institutionName?: string | null;
  effectiveDate?: string | null;
  notes?: string | null;
};

const validCounties = new Set(floridaCounties.map((county) => county.name));
const validLicenseTypes = new Set(["4COP Quota", "3PS Quota / Package Store"]);
const validOrderingParties = new Set([
  "License Owner",
  "Buyer / Prospective Buyer",
  "Bank / Commercial Lender",
  "Attorney / CPA / Advisor",
  "Estate / Fiduciary",
  "Other",
]);
const validIntendedUses = new Set([
  "Loan Underwriting",
  "Refinance / Collateral Review",
  "Purchase or Sale Decision",
  "Estate or Legal Matter",
  "Financial Reporting",
  "Other",
]);

function cleanText(value: string | null | undefined, maxLength: number) {
  return (value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanLongText(value: string | null | undefined, maxLength: number) {
  return (value ?? "").trim().slice(0, maxLength);
}

function makeAppraisalRef() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const token = randomBytes(4).toString("hex").toUpperCase();
  return `FLLM-APPRAISAL-${date}-${token}`;
}

function requireDatabase() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("The appraisal-order database is not configured.");
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

export function isFormalLicenseAppraisalOrder(
  submission: Pick<ListingSubmission, "submissionRef"> | string,
) {
  const reference = typeof submission === "string" ? submission : submission.submissionRef;
  return reference.startsWith("FLLM-APPRAISAL-");
}

export function formalLicenseAppraisalDetails(submission: Pick<ListingSubmission, "message">) {
  try {
    return JSON.parse(submission.message || "{}") as StoredAppraisalDetails;
  } catch {
    return {} as StoredAppraisalDetails;
  }
}

export async function createFormalLicenseAppraisalOrder(
  input: CreateFormalLicenseAppraisalOrderInput,
): Promise<FormalLicenseAppraisalOrder> {
  requireDatabase();

  const fullName = cleanText(input.fullName, 160);
  const email = cleanText(input.email, 254).toLowerCase();
  const phone = cleanText(input.phone, 60);
  const county = cleanText(input.county, 100);
  const licenseType = cleanText(input.licenseType, 100);
  const licenseNumber = cleanText(input.licenseNumber, 80);
  const currentHolderOfRecord = cleanText(input.currentHolderOfRecord, 180) || null;
  const orderingParty = cleanText(input.orderingParty, 100);
  const intendedUse = cleanText(input.intendedUse, 120);
  const institutionName = cleanText(input.institutionName, 180) || null;
  const effectiveDate = cleanText(input.effectiveDate, 20) || null;
  const notes = cleanLongText(input.notes, 5000) || null;

  if (!fullName || !email || !phone || !county || !licenseType || !licenseNumber || !orderingParty || !intendedUse) {
    throw new Error("Please complete all required formal appraisal fields.");
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Please enter a valid email address.");
  if (!validCounties.has(county) || !validLicenseTypes.has(licenseType)) {
    throw new Error("Please select valid Florida license details.");
  }
  if (!validOrderingParties.has(orderingParty) || !validIntendedUses.has(intendedUse)) {
    throw new Error("Please select a valid ordering party and intended use.");
  }

  const details: StoredAppraisalDetails = {
    kind: "formal_license_appraisal",
    product: "FLLM Formal Florida Quota Liquor License Appraisal",
    priceCents: FORMAL_LICENSE_APPRAISAL_PRICE_CENTS,
    licenseNumber,
    currentHolderOfRecord,
    orderingParty,
    intendedUse,
    institutionName,
    effectiveDate,
    notes,
  };

  const submissionRef = makeAppraisalRef();
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
    license_status: "Subject license appraisal",
    preferred_timing: intendedUse,
    message: JSON.stringify(details),
    status: "pending_payment",
    payment_email_status: "pending",
    approval_email_status: "pending",
    listing_title: `${county} ${licenseType} Formal Appraisal — ${licenseNumber}`,
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
    throw new Error(`Could not save the formal appraisal order: ${response.status} ${await response.text()}`);
  }

  const rows = (await response.json()) as Array<{
    id: string;
    submission_ref: string;
    first_name: string;
  }>;
  if (!rows[0]) throw new Error("The formal appraisal order was not returned by the database.");

  return {
    id: rows[0].id,
    submissionRef: rows[0].submission_ref,
    fullName,
    firstName: rows[0].first_name || fullName.split(/\s+/)[0] || "there",
    email,
    phone,
    county,
    licenseType,
    licenseNumber,
    currentHolderOfRecord,
    orderingParty,
    intendedUse,
    institutionName,
    effectiveDate,
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

function emailShell(content: string) {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#111111;"><div style="max-width:800px;">${content}<div style="margin-top:30px;padding-top:18px;border-top:2px solid #c88908;color:#071a3a;"><strong>Florida Liquor License Market</strong><br><span style="font-size:13px;">www.floridaliquorlicensemarket.com</span></div></div></body></html>`;
}

export async function sendFormalLicenseAppraisalPaymentEmails(submission: ListingSubmission) {
  const details = formalLicenseAppraisalDetails(submission);
  const licenseNumber = details.licenseNumber || submission.liveListingRef || "Not provided";
  const reviewEmail =
    process.env.FORMAL_APPRAISAL_REVIEW_EMAIL ||
    process.env.MARKET_REPORT_REVIEW_EMAIL ||
    process.env.GOOGLE_SENDER_EMAIL ||
    "listings@floridaliquorlicensemarket.com";

  const customerHtml = emailShell(`
    <p style="margin:0 0 18px;">Hello ${escapeHtml(submission.firstName || "there")},</p>
    <p style="margin:0 0 18px;">Thank you. Your ${FORMAL_LICENSE_APPRAISAL_PRICE_LABEL} payment for an <strong>FLLM Formal Florida Quota Liquor License Appraisal</strong> has been received.</p>
    <p style="margin:0 0 18px;"><strong>Order reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>County:</strong> ${escapeHtml(submission.county)}<br>
      <strong>Subject series:</strong> ${escapeHtml(submission.licenseType)}<br>
      <strong>License number:</strong> ${escapeHtml(licenseNumber)}<br>
      <strong>Intended use:</strong> ${escapeHtml(details.intendedUse || "Not provided")}<br>
      <strong>Institution:</strong> ${escapeHtml(details.institutionName || "Not provided")}</p>
    <p style="margin:0 0 18px;">FLLM will complete the subject-license and DBPR review, separate same-county 3PS and 4COP market analyses, available recent-sale research, series-conversion analysis, value reconciliation, and supporting exhibits. We may contact you or the intended lender for assignment-specific information.</p>
    <p style="margin:0;color:#555;font-size:13px;">The report is designed for lender and professional review, but acceptance and any appraiser-credential requirements are determined by the receiving institution. It is not a real-estate appraisal or guarantee of value.</p>`);

  const customerText = `Hello ${submission.firstName || "there"},\n\nThank you. Your ${FORMAL_LICENSE_APPRAISAL_PRICE_LABEL} payment for an FLLM Formal Florida Quota Liquor License Appraisal has been received.\n\nOrder reference: ${submission.submissionRef}\nCounty: ${submission.county}\nSubject series: ${submission.licenseType}\nLicense number: ${licenseNumber}\nIntended use: ${details.intendedUse || "Not provided"}\nInstitution: ${details.institutionName || "Not provided"}\n\nFLLM will complete the subject-license and DBPR review, separate same-county 3PS and 4COP market analyses, available recent-sale research, series-conversion analysis, value reconciliation, and supporting exhibits.\n\nThe report is designed for lender and professional review, but acceptance and any appraiser-credential requirements are determined by the receiving institution. It is not a real-estate appraisal or guarantee of value.`;

  const productionStandard = `
    <ol style="margin:10px 0 0;padding-left:20px;">
      <li>Define the client, intended users, intended use, effective date, scope, assumptions and limiting conditions.</li>
      <li>Verify subject identity, county, series, status, holder, DBPR history and available lien/security-interest information.</li>
      <li>Present same-county 3PS active offerings separately.</li>
      <li>Present same-county 4COP active offerings separately.</li>
      <li>Present verified recent same-county 3PS and 4COP sales/transfers separately from asking prices, when available.</li>
      <li>Analyze a possible 3PS/4COP change or increase in series, including approval, premises, fee, timing and risk considerations.</li>
      <li>Include page 1 of ABT-6014 as an exhibit when conversion is relevant; address ABT-6002 if ownership transfer is simultaneous.</li>
      <li>Reconcile all evidence into a supported indicated value conclusion and explain any conversion adjustment.</li>
      <li>Include analyst identity, signature, independence/conflict disclosure and report limitations.</li>
    </ol>`;

  const internalHtml = emailShell(`
    <p style="margin:0 0 18px;"><strong>A paid FORMAL FLLM APPRAISAL order has been received.</strong></p>
    <p style="margin:0 0 18px;"><strong>Order reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>Customer:</strong> ${escapeHtml(submission.fullName)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(submission.phone)}<br>
      <strong>County:</strong> ${escapeHtml(submission.county)}<br>
      <strong>Subject series:</strong> ${escapeHtml(submission.licenseType)}<br>
      <strong>License number:</strong> ${escapeHtml(licenseNumber)}<br>
      <strong>Holder:</strong> ${escapeHtml(details.currentHolderOfRecord || "Not provided")}<br>
      <strong>Ordering party:</strong> ${escapeHtml(details.orderingParty || "Not provided")}<br>
      <strong>Intended use:</strong> ${escapeHtml(details.intendedUse || "Not provided")}<br>
      <strong>Institution:</strong> ${escapeHtml(details.institutionName || "Not provided")}<br>
      <strong>Effective date:</strong> ${escapeHtml(details.effectiveDate || "Current date / to be confirmed")}</p>
    <div style="margin:0 0 18px;padding:16px;border:1px solid #c88908;background:#fff9ea;"><strong>Required formal-appraisal production standard</strong>${productionStandard}</div>
    <p style="margin:0;"><strong>Customer notes:</strong><br>${escapeHtml(details.notes || "None provided").replaceAll("\n", "<br>")}</p>`);

  const internalText = `PAID FORMAL FLLM APPRAISAL ORDER\n\nOrder reference: ${submission.submissionRef}\nCustomer: ${submission.fullName}\nEmail: ${submission.email}\nPhone: ${submission.phone}\nCounty: ${submission.county}\nSubject series: ${submission.licenseType}\nLicense number: ${licenseNumber}\nHolder: ${details.currentHolderOfRecord || "Not provided"}\nOrdering party: ${details.orderingParty || "Not provided"}\nIntended use: ${details.intendedUse || "Not provided"}\nInstitution: ${details.institutionName || "Not provided"}\nEffective date: ${details.effectiveDate || "Current date / to be confirmed"}\n\nREQUIRED: subject/DBPR verification; separate same-county 3PS and 4COP active offerings; separate verified recent sales/transfers; conversion analysis; ABT-6014 exhibit when relevant; ABT-6002 treatment for simultaneous transfer; reconciled conclusion; analyst signature and disclosures.\n\nCustomer notes: ${details.notes || "None provided"}`;

  const customerResult = await sendFllmEmail({
    to: submission.email,
    subject: `Formal FLLM Appraisal Order Received — ${submission.submissionRef}`,
    text: customerText,
    html: customerHtml,
  });

  try {
    await sendFllmEmail({
      to: reviewEmail,
      replyTo: submission.email,
      subject: `PAID FORMAL APPRAISAL — ${submission.county} ${submission.licenseType} — ${submission.submissionRef}`,
      text: internalText,
      html: internalHtml,
    });
  } catch (error) {
    console.error("Internal formal appraisal notification failed", error);
  }

  return customerResult;
}
