import "server-only";

import { randomBytes } from "node:crypto";

import type { ListingSubmission } from "@/lib/listing-submission-store";
import { publicListingReference } from "@/lib/public-listing-reference";

function cleanText(value: string | null | undefined, maxLength: number) {
  return (value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function endpoint(path: string) {
  const base = process.env.SUPABASE_URL;
  if (!base) throw new Error("SUPABASE_URL is not configured.");
  return `${base}/rest/v1/${path}`;
}

function headers(): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
}

function makeBuyerInquiryRef() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const token = randomBytes(4).toString("hex").toUpperCase();
  return `FLLM-BUYER-${date}-${token}`;
}

export async function recordBuyerInquiry(input: {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  inquiryType: string;
  message: string;
  submission: ListingSubmission;
}) {
  const fullName = cleanText(input.buyerName, 160);
  const email = cleanText(input.buyerEmail, 254).toLowerCase();
  const phone = cleanText(input.buyerPhone, 60);
  const message = cleanText(input.message, 5000);
  const inquiryType = cleanText(input.inquiryType, 120);
  const submission = input.submission;
  const listingReference = publicListingReference(submission);
  const licenseType = submission.approvedLicenseType || submission.licenseType;
  const now = new Date().toISOString();

  if (!fullName || !email || !phone || !message || !listingReference) {
    throw new Error("Buyer inquiry is missing required lead data.");
  }

  const row = {
    submission_ref: makeBuyerInquiryRef(),
    full_name: fullName,
    first_name: fullName.split(/\s+/)[0] || "there",
    email,
    phone,
    county: cleanText(submission.county, 100) || "Florida",
    license_type: cleanText(licenseType, 120) || "4COP Quota",
    asking_price: null,
    asking_price_text: null,
    license_status: "Buyer inquiry",
    preferred_timing: null,
    message: JSON.stringify({
      kind: "buyer_inquiry",
      inquiryType,
      buyerMessage: message,
      source: "listing_contact_center",
      sellerSubmissionRef: submission.submissionRef,
    }),
    status: "pending_payment",
    payment_email_status: "pending",
    approval_email_status: "pending",
    listing_title:
      submission.listingTitle || `${submission.county} ${licenseType}`,
    approved_license_type:
      licenseType === "4COP Quota" || licenseType === "3PS Quota / Package Store"
        ? licenseType
        : null,
    approved_asking_price: null,
    live_listing_ref: listingReference,
    live_listing_url: submission.liveListingUrl,
    created_at: now,
    updated_at: now,
  };

  const response = await fetch(endpoint("listing_submissions"), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Could not record buyer inquiry: ${response.status} ${await response.text()}`,
    );
  }

  return row.submission_ref;
}
