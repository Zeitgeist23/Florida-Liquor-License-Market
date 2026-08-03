import "server-only";

import { randomBytes } from "node:crypto";

export type SubmissionStatus =
  | "pending_payment"
  | "paid"
  | "approved"
  | "rejected"
  | "checkout_failed";

export type EmailDeliveryStatus = "pending" | "sending" | "sent" | "failed";

export type ListingSubmission = {
  id: string;
  submissionRef: string;
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
  county: string;
  licenseType: string;
  askingPrice: number | null;
  askingPriceText: string | null;
  licenseStatus: string;
  preferredTiming: string | null;
  message: string | null;
  status: SubmissionStatus;
  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;
  stripeCustomerEmail: string | null;
  paidAt: string | null;
  paymentEmailStatus: EmailDeliveryStatus;
  paymentEmailSentAt: string | null;
  listingTitle: string | null;
  approvedLicenseType: "4COP Quota" | "3PS Quota / Package Store" | null;
  approvedAskingPrice: number | null;
  liveListingRef: string | null;
  liveListingUrl: string | null;
  approvedAt: string | null;
  approvalEmailStatus: EmailDeliveryStatus;
  approvalEmailSentAt: string | null;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
};

type SubmissionRow = {
  id: string;
  submission_ref: string;
  full_name: string;
  first_name: string;
  email: string;
  phone: string;
  county: string;
  license_type: string;
  asking_price: number | null;
  asking_price_text: string | null;
  license_status: string;
  preferred_timing: string | null;
  message: string | null;
  status: SubmissionStatus;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_customer_email: string | null;
  paid_at: string | null;
  payment_email_status: EmailDeliveryStatus;
  payment_email_sent_at: string | null;
  listing_title: string | null;
  approved_license_type: "4COP Quota" | "3PS Quota / Package Store" | null;
  approved_asking_price: number | null;
  live_listing_ref: string | null;
  live_listing_url: string | null;
  approved_at: string | null;
  approval_email_status: EmailDeliveryStatus;
  approval_email_sent_at: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateSubmissionInput = {
  fullName: string;
  email: string;
  phone: string;
  county: string;
  licenseType: string;
  askingPriceText?: string | null;
  licenseStatus: string;
  preferredTiming?: string | null;
  message?: string | null;
  requiresPayment?: boolean;
};

function databaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function requireDatabase() {
  if (!databaseConfigured()) {
    throw new Error("Listing automation requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
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

function endpoint(pathAndQuery: string) {
  return `${process.env.SUPABASE_URL}/rest/v1/${pathAndQuery}`;
}

function toSubmission(row: SubmissionRow): ListingSubmission {
  return {
    id: row.id,
    submissionRef: row.submission_ref,
    fullName: row.full_name,
    firstName: row.first_name,
    email: row.email,
    phone: row.phone,
    county: row.county,
    licenseType: row.license_type,
    askingPrice: row.asking_price,
    askingPriceText: row.asking_price_text,
    licenseStatus: row.license_status,
    preferredTiming: row.preferred_timing,
    message: row.message,
    status: row.status,
    stripeCheckoutSessionId: row.stripe_checkout_session_id,
    stripePaymentIntentId: row.stripe_payment_intent_id,
    stripeCustomerEmail: row.stripe_customer_email,
    paidAt: row.paid_at,
    paymentEmailStatus: row.payment_email_status,
    paymentEmailSentAt: row.payment_email_sent_at,
    listingTitle: row.listing_title,
    approvedLicenseType: row.approved_license_type,
    approvedAskingPrice: row.approved_asking_price,
    liveListingRef: row.live_listing_ref,
    liveListingUrl: row.live_listing_url,
    approvedAt: row.approved_at,
    approvalEmailStatus: row.approval_email_status,
    approvalEmailSentAt: row.approval_email_sent_at,
    lastError: row.last_error,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function cleanText(value: string | null | undefined, maxLength: number) {
  const cleaned = (value ?? "").trim().replace(/\s+/g, " ");
  return cleaned.slice(0, maxLength);
}

function parseAskingPrice(value: string | null | undefined): number | null {
  const cleaned = (value ?? "").replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const amount = Number(cleaned);
  if (!Number.isFinite(amount) || amount < 0 || amount > 100_000_000) return null;
  return Math.round(amount);
}

function makeSubmissionRef(requiresPayment: boolean) {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const token = randomBytes(4).toString("hex").toUpperCase();
  const prefix = requiresPayment ? "FLLM-PAID" : "FLLM-CONSULT";
  return `${prefix}-${date}-${token}`;
}

export async function createListingSubmission(input: CreateSubmissionInput) {
  requireDatabase();

  const requiresPayment = input.requiresPayment !== false;

  const fullName = cleanText(input.fullName, 160);
  const email = cleanText(input.email, 254).toLowerCase();
  const phone = cleanText(input.phone, 60);
  const county = cleanText(input.county, 100);
  const licenseType = cleanText(input.licenseType, 100);
  const licenseStatus = cleanText(input.licenseStatus, 120);

  if (!fullName || !email || !phone || !county || !licenseType || !licenseStatus) {
    throw new Error("Please complete all required listing fields.");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  const firstName = fullName.split(/\s+/)[0] || "there";
  const askingPriceText = cleanText(input.askingPriceText, 60) || null;
  const now = new Date().toISOString();
  const row = {
    submission_ref: makeSubmissionRef(requiresPayment),
    full_name: fullName,
    first_name: firstName,
    email,
    phone,
    county,
    license_type: licenseType,
    asking_price: parseAskingPrice(askingPriceText),
    asking_price_text: askingPriceText,
    license_status: licenseStatus,
    preferred_timing: cleanText(input.preferredTiming, 120) || null,
    message: cleanText(input.message, 5000) || null,
    status: "pending_payment" satisfies SubmissionStatus,
    payment_email_status: "pending" satisfies EmailDeliveryStatus,
    approval_email_status: "pending" satisfies EmailDeliveryStatus,
    created_at: now,
    updated_at: now,
  };

  const response = await fetch(endpoint("listing_submissions"), {
    method: "POST",
    headers: supabaseHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not save the listing submission: ${response.status} ${await response.text()}`);
  }

  const rows = (await response.json()) as SubmissionRow[];
  if (!rows[0]) throw new Error("The listing submission was not returned by the database.");
  return toSubmission(rows[0]);
}

async function getSingle(query: string): Promise<ListingSubmission | null> {
  requireDatabase();
  const response = await fetch(endpoint(`listing_submissions?${query}&limit=1`), {
    headers: supabaseHeaders(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not read listing submission: ${response.status}`);
  const rows = (await response.json()) as SubmissionRow[];
  return rows[0] ? toSubmission(rows[0]) : null;
}

async function patchRows(query: string, values: Record<string, unknown>): Promise<ListingSubmission[]> {
  requireDatabase();
  const response = await fetch(endpoint(`listing_submissions?${query}`), {
    method: "PATCH",
    headers: supabaseHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify({ ...values, updated_at: new Date().toISOString() }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Could not update listing submission: ${response.status} ${await response.text()}`);
  }
  return ((await response.json()) as SubmissionRow[]).map(toSubmission);
}

export async function getSubmissionById(id: string) {
  return getSingle(`id=eq.${encodeURIComponent(id)}&select=*`);
}

export async function getSubmissionByRef(submissionRef: string) {
  return getSingle(`submission_ref=eq.${encodeURIComponent(submissionRef)}&select=*`);
}

export async function getSubmissionByCheckoutSession(sessionId: string) {
  return getSingle(`stripe_checkout_session_id=eq.${encodeURIComponent(sessionId)}&select=*`);
}

export async function getApprovedSubmissionByPublicRef(submissionRef: string) {
  return getSingle(
    `submission_ref=eq.${encodeURIComponent(submissionRef)}&status=eq.approved&select=*`
  );
}

export async function attachCheckoutSession(id: string, checkoutSessionId: string) {
  const rows = await patchRows(`id=eq.${encodeURIComponent(id)}&select=*`, {
    stripe_checkout_session_id: checkoutSessionId,
    last_error: null,
  });
  return rows[0] ?? null;
}

export async function markCheckoutFailed(id: string, message: string) {
  const rows = await patchRows(`id=eq.${encodeURIComponent(id)}&select=*`, {
    status: "checkout_failed",
    last_error: message.slice(0, 2000),
  });
  return rows[0] ?? null;
}

export async function markSubmissionPaid(input: {
  submissionRef: string;
  checkoutSessionId: string;
  paymentIntentId?: string | null;
  customerEmail?: string | null;
}) {
  const existing = await getSubmissionByRef(input.submissionRef);
  if (!existing) throw new Error(`Unknown listing submission ${input.submissionRef}.`);
  if (existing.status === "approved" || existing.status === "paid") return existing;

  const now = new Date().toISOString();
  const rows = await patchRows(`id=eq.${encodeURIComponent(existing.id)}&select=*`, {
    status: "paid",
    stripe_checkout_session_id: input.checkoutSessionId,
    stripe_payment_intent_id: input.paymentIntentId ?? null,
    stripe_customer_email: input.customerEmail ?? null,
    paid_at: now,
    last_error: null,
  });
  return rows[0] ?? existing;
}

async function claimEmail(
  id: string,
  column: "payment_email_status" | "approval_email_status"
): Promise<ListingSubmission | null> {
  const rows = await patchRows(
    `id=eq.${encodeURIComponent(id)}&${column}=in.(pending,failed)&select=*`,
    { [column]: "sending", last_error: null }
  );
  return rows[0] ?? null;
}

export function claimPaymentEmail(id: string) {
  return claimEmail(id, "payment_email_status");
}

export function claimApprovalEmail(id: string) {
  return claimEmail(id, "approval_email_status");
}

export async function finishPaymentEmail(id: string, sent: boolean, error?: string) {
  const rows = await patchRows(`id=eq.${encodeURIComponent(id)}&select=*`, {
    payment_email_status: sent ? "sent" : "failed",
    payment_email_sent_at: sent ? new Date().toISOString() : null,
    last_error: sent ? null : (error ?? "Payment confirmation email failed").slice(0, 2000),
  });
  return rows[0] ?? null;
}

export async function finishApprovalEmail(id: string, sent: boolean, error?: string) {
  const rows = await patchRows(`id=eq.${encodeURIComponent(id)}&select=*`, {
    approval_email_status: sent ? "sent" : "failed",
    approval_email_sent_at: sent ? new Date().toISOString() : null,
    last_error: sent ? null : (error ?? "Approval email failed").slice(0, 2000),
  });
  return rows[0] ?? null;
}

export async function approveListingSubmission(input: {
  id: string;
  title: string;
  licenseType: "4COP Quota" | "3PS Quota / Package Store";
  askingPrice: number | null;
  liveListingUrl: string;
}) {
  const existing = await getSubmissionById(input.id);
  if (!existing) throw new Error("Listing submission not found.");
  if (existing.status !== "paid" && existing.status !== "approved") {
    throw new Error("Only paid submissions can be approved.");
  }

  const now = new Date().toISOString();
  const rows = await patchRows(`id=eq.${encodeURIComponent(input.id)}&select=*`, {
    status: "approved",
    listing_title: cleanText(input.title, 180),
    approved_license_type: input.licenseType,
    approved_asking_price: input.askingPrice,
    live_listing_ref: existing.submissionRef,
    live_listing_url: input.liveListingUrl,
    approved_at: existing.approvedAt ?? now,
    last_error: null,
  });
  return rows[0] ?? existing;
}

export async function listListingSubmissions() {
  requireDatabase();
  const response = await fetch(
    endpoint("listing_submissions?select=*&order=created_at.desc&limit=250"),
    { headers: supabaseHeaders(), cache: "no-store" }
  );
  if (!response.ok) throw new Error(`Could not list submissions: ${response.status}`);
  return ((await response.json()) as SubmissionRow[]).map(toSubmission);
}
