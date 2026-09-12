import "server-only";

import { emailShell, sendFllmEmail } from "@/lib/fllm-email";
import { listingPaymentDetails } from "@/lib/listing-payment-details";
import type { ListingSubmission } from "@/lib/listing-submission-store";

const NOTIFICATION_KIND = "paid_self_directed_review";
const CLAIM_STALE_AFTER_MS = 15 * 60 * 1000;

type NotificationStatus = "sending" | "sent" | "failed";

type NotificationRow = {
  id: string;
  submission_id: string;
  submission_ref: string;
  kind: typeof NOTIFICATION_KIND;
  status: NotificationStatus;
  claimed_at: string;
  sent_at: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
};

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.FLLM_SITE_URL ||
    "https://www.floridaliquorlicensemarket.com"
  ).replace(/\/$/, "");
}

function reviewEmail() {
  return (
    process.env.LISTING_APPROVAL_REVIEW_EMAIL ||
    process.env.GOOGLE_SENDER_EMAIL ||
    "listings@floridaliquorlicensemarket.com"
  );
}

function databaseConfigured() {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
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

function escapeHtml(value: string | null | undefined) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function countyLabel(county: string) {
  const cleaned = county.trim();
  return / County$/i.test(cleaned) ? cleaned : `${cleaned} County`;
}

function formatMoney(value: number | null) {
  if (value === null) return "Price not disclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function isPaidSelfDirectedListing(submission: ListingSubmission) {
  return (
    submission.status === "paid" &&
    submission.submissionRef.startsWith("FLLM-PAID-") &&
    /Self-Directed Listing/i.test(submission.message || "")
  );
}

async function insertClaim(submission: ListingSubmission) {
  if (!databaseConfigured()) {
    throw new Error(
      "Paid listing admin notifications require SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const now = new Date().toISOString();
  const response = await fetch(
    endpoint(
      "listing_admin_notifications?on_conflict=submission_id,kind&select=*",
    ),
    {
      method: "POST",
      headers: supabaseHeaders({
        Prefer: "resolution=ignore-duplicates,return=representation",
      }),
      body: JSON.stringify({
        submission_id: submission.id,
        submission_ref: submission.submissionRef,
        kind: NOTIFICATION_KIND,
        status: "sending",
        claimed_at: now,
        updated_at: now,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Could not claim the paid-listing admin notification: ${response.status} ${await response.text()}`,
    );
  }

  const rows = (await response.json()) as NotificationRow[];
  return rows[0] ?? null;
}

async function getExistingClaim(submission: ListingSubmission) {
  const response = await fetch(
    endpoint(
      `listing_admin_notifications?submission_id=eq.${encodeURIComponent(submission.id)}&kind=eq.${NOTIFICATION_KIND}&select=*&limit=1`,
    ),
    {
      headers: supabaseHeaders(),
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(
      `Could not read the paid-listing admin notification: ${response.status} ${await response.text()}`,
    );
  }
  const rows = (await response.json()) as NotificationRow[];
  return rows[0] ?? null;
}

async function retryClaim(row: NotificationRow) {
  const staleBefore = new Date(Date.now() - CLAIM_STALE_AFTER_MS).toISOString();
  const retryable =
    row.status === "failed" ||
    (row.status === "sending" && row.updated_at < staleBefore);
  if (!retryable) return null;

  const now = new Date().toISOString();
  const condition =
    row.status === "failed"
      ? `id=eq.${encodeURIComponent(row.id)}&status=eq.failed`
      : `id=eq.${encodeURIComponent(row.id)}&status=eq.sending&updated_at=lt.${encodeURIComponent(staleBefore)}`;

  const response = await fetch(
    endpoint(`listing_admin_notifications?${condition}&select=*`),
    {
      method: "PATCH",
      headers: supabaseHeaders({ Prefer: "return=representation" }),
      body: JSON.stringify({
        status: "sending",
        claimed_at: now,
        sent_at: null,
        last_error: null,
        updated_at: now,
      }),
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(
      `Could not retry the paid-listing admin notification: ${response.status} ${await response.text()}`,
    );
  }
  const rows = (await response.json()) as NotificationRow[];
  return rows[0] ?? null;
}

async function claimNotification(submission: ListingSubmission) {
  const inserted = await insertClaim(submission);
  if (inserted) return inserted;

  const existing = await getExistingClaim(submission);
  if (!existing || existing.status === "sent") return null;
  return retryClaim(existing);
}

async function finishNotification(
  id: string,
  sent: boolean,
  error?: string,
) {
  const response = await fetch(
    endpoint(`listing_admin_notifications?id=eq.${encodeURIComponent(id)}`),
    {
      method: "PATCH",
      headers: supabaseHeaders(),
      body: JSON.stringify({
        status: sent ? "sent" : "failed",
        sent_at: sent ? new Date().toISOString() : null,
        last_error: sent
          ? null
          : (error || "Paid listing admin notification failed").slice(0, 2000),
        updated_at: new Date().toISOString(),
      }),
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(
      `Could not finish the paid-listing admin notification: ${response.status} ${await response.text()}`,
    );
  }
}

async function sendReviewEmail(submission: ListingSubmission) {
  const payment = listingPaymentDetails(submission.message);
  const adminUrl = `${siteUrl()}/admin/listing-submissions`;
  const subject = `Paid Self-Directed Listing Awaiting Approval — ${countyLabel(submission.county)} ${submission.licenseType}`;

  const content = `
    <p style="margin:0 0 18px;"><strong>A paid self-directed listing is waiting for FLLM approval.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Submission Reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>Listing Tier:</strong> ${escapeHtml(payment.tierLabel)} (${escapeHtml(payment.amountLabel)})<br>
      <strong>Payment Status:</strong> Paid<br>
      <strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
      <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}<br>
      <strong>Asking Price:</strong> ${escapeHtml(formatMoney(submission.askingPrice))}<br>
      <strong>Seller:</strong> ${escapeHtml(submission.fullName)}<br>
      <strong>Email:</strong> ${escapeHtml(submission.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(submission.phone)}
    </p>
    <p style="margin:0 0 18px;">The submission is paid and pending administrative review before publication.</p>
    <p style="margin:0;"><a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:#071a3a;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 18px;border-radius:4px;">Review Listing Submission</a></p>`;

  const text = `A paid self-directed listing is waiting for FLLM approval.\n\nSubmission Reference: ${submission.submissionRef}\nListing Tier: ${payment.tierLabel} (${payment.amountLabel})\nPayment Status: Paid\nCounty: ${countyLabel(submission.county)}\nLicense Type: ${submission.licenseType}\nAsking Price: ${formatMoney(submission.askingPrice)}\nSeller: ${submission.fullName}\nEmail: ${submission.email}\nPhone: ${submission.phone}\n\nThe submission is paid and pending administrative review before publication.\n\nReview Listing Submission: ${adminUrl}`;

  return sendFllmEmail({
    to: reviewEmail(),
    subject,
    text,
    html: emailShell(content),
  });
}

export async function notifyAdminOfPaidSelfDirectedListing(
  submission: ListingSubmission,
) {
  if (!isPaidSelfDirectedListing(submission)) return false;

  const claim = await claimNotification(submission);
  if (!claim) return false;

  try {
    await sendReviewEmail(submission);
    await finishNotification(claim.id, true);
    return true;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Paid listing admin notification failed.";
    try {
      await finishNotification(claim.id, false, message);
    } catch (finishError) {
      console.error(
        "Could not record the failed paid-listing admin notification",
        finishError,
      );
    }
    throw error;
  }
}
