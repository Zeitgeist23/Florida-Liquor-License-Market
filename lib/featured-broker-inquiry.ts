import "server-only";

import { randomBytes } from "node:crypto";

import { recordBuyerInquiry } from "@/lib/buyer-inquiry-lead";
import { emailShell, sendFllmEmail } from "@/lib/fllm-email";
import type { ListingSubmission } from "@/lib/listing-submission-store";
import { publicListingReference } from "@/lib/public-listing-reference";

export type FeaturedBrokerRecipient = {
  listingReference: string;
  brokerName: string;
  brokerage: string;
  email: string;
  phone?: string | null;
};

type InquiryDetails = {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  inquiryType: string;
  message: string;
  listingRequested: string;
  listingCounty: string;
  licenseType: string;
  askingPrice: string;
  listingUrl: string;
};

const STATIC_FEATURED_BROKERS: Record<string, FeaturedBrokerRecipient> = {
  "FLLM-022": {
    listingReference: "FLLM-022",
    brokerName: "Lawrence Moore",
    brokerage: "GAI: Gibson and Associates, Inc.",
    email: "lawrence@gai.services",
    phone: "(850) 990-2328",
  },
  "FLLM-ANTEZZA": {
    listingReference: "FLLM-ANTEZZA",
    brokerName: "Alessandro Antezza",
    brokerage: "SUNSHINEAGLE LLC",
    email: "info@sunshineagle.com",
    phone: "(941) 416-4580",
  },
};

function messageValue(message: string | null, label: string) {
  if (!message) return null;
  const line = message.split("\n").find((entry) => entry.startsWith(`${label}:`));
  return line?.slice(label.length + 1).trim() || null;
}

function isIndependentBrokerSubmission(submission: ListingSubmission) {
  const reference = publicListingReference(submission).trim().toUpperCase();
  return Boolean(
    reference === "FLLM-022" ||
    submission.message?.includes("Submission type: Independent Broker Marketplace Listing") ||
    submission.message?.includes("Independent broker listing represented by") ||
    submission.message?.includes("Buyer inquiry routing:") ||
    submission.message?.includes("Brokerage:"),
  );
}

export function resolveFeaturedBrokerRecipient(
  listingReference: string,
  submission: ListingSubmission | null,
): FeaturedBrokerRecipient | null {
  const reference = listingReference.trim().toUpperCase();
  const staticRecipient = STATIC_FEATURED_BROKERS[reference];
  if (staticRecipient) return staticRecipient;

  if (!submission || !isIndependentBrokerSubmission(submission) || !submission.email) {
    return null;
  }

  return {
    listingReference: publicListingReference(submission),
    brokerName: submission.fullName || "Independent Listing Broker",
    brokerage: messageValue(submission.message, "Brokerage") || "Independent Brokerage",
    email: submission.email,
    phone: submission.phone || null,
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

async function recordStaticFeaturedBrokerInquiry(
  recipient: FeaturedBrokerRecipient,
  input: InquiryDetails,
) {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) return;

  const now = new Date().toISOString();
  const leadRef = `FLLM-BUYER-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomBytes(4).toString("hex").toUpperCase()}`;
  const approvedLicenseType =
    input.licenseType === "4COP Quota" || input.licenseType === "3PS Quota / Package Store"
      ? input.licenseType
      : null;

  const row = {
    submission_ref: leadRef,
    full_name: input.buyerName,
    first_name: input.buyerName.split(/\s+/)[0] || "there",
    email: input.buyerEmail,
    phone: input.buyerPhone,
    county: input.listingCounty || "Florida",
    license_type: input.licenseType || "4COP Quota",
    asking_price: null,
    asking_price_text: input.askingPrice || null,
    license_status: "Buyer inquiry",
    preferred_timing: null,
    message: JSON.stringify({
      kind: "featured_broker_inquiry",
      inquiryType: input.inquiryType,
      buyerMessage: input.message,
      source: "featured_third_party_broker_listing",
      brokerName: recipient.brokerName,
      brokerEmail: recipient.email,
      listingReference: recipient.listingReference,
    }),
    status: "pending_payment",
    payment_email_status: "pending",
    approval_email_status: "pending",
    listing_title: input.listingRequested || `${input.listingCounty} ${input.licenseType}`,
    approved_license_type: approvedLicenseType,
    approved_asking_price: null,
    live_listing_ref: recipient.listingReference,
    live_listing_url: input.listingUrl || null,
    created_at: now,
    updated_at: now,
  };

  const response = await fetch(`${base}/rest/v1/listing_submissions`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not record featured broker inquiry: ${response.status} ${await response.text()}`);
  }
}

export async function sendFeaturedBrokerInquiry(input: {
  recipient: FeaturedBrokerRecipient;
  submission: ListingSubmission | null;
  inquiry: InquiryDetails;
}) {
  const { recipient, submission, inquiry } = input;

  try {
    if (submission && isIndependentBrokerSubmission(submission)) {
      await recordBuyerInquiry({
        buyerName: inquiry.buyerName,
        buyerEmail: inquiry.buyerEmail,
        buyerPhone: inquiry.buyerPhone,
        inquiryType: inquiry.inquiryType,
        message: inquiry.message,
        submission,
      });
    } else {
      await recordStaticFeaturedBrokerInquiry(recipient, inquiry);
    }
  } catch (trackingError) {
    console.error("Featured broker inquiry tracking failed", trackingError);
  }

  const content = `
    <p style="margin:0 0 18px;"><strong>A prospective buyer submitted an inquiry through Florida Liquor License Market about a listing you represent.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Listing Reference:</strong> ${escapeHtml(recipient.listingReference)}<br>
      <strong>Selected Listing:</strong> ${escapeHtml(inquiry.listingRequested)}<br>
      <strong>County:</strong> ${escapeHtml(inquiry.listingCounty)}<br>
      <strong>License Type:</strong> ${escapeHtml(inquiry.licenseType)}<br>
      <strong>Asking Price:</strong> ${escapeHtml(inquiry.askingPrice)}
      ${inquiry.listingUrl ? `<br><strong>FLLM Listing:</strong> <a href="${escapeHtml(inquiry.listingUrl)}">${escapeHtml(inquiry.listingUrl)}</a>` : ""}
    </p>
    <p style="margin:0 0 18px;">
      <strong>Buyer Name:</strong> ${escapeHtml(inquiry.buyerName)}<br>
      <strong>Buyer Email:</strong> <a href="mailto:${escapeHtml(inquiry.buyerEmail)}">${escapeHtml(inquiry.buyerEmail)}</a><br>
      <strong>Buyer Phone:</strong> ${escapeHtml(inquiry.buyerPhone || "Not provided")}<br>
      <strong>Inquiry Type:</strong> ${escapeHtml(inquiry.inquiryType)}
    </p>
    <p style="margin:0;"><strong>Buyer Message:</strong><br>${escapeHtml(inquiry.message).replaceAll("\n", "<br>")}</p>`;

  const text = `A prospective buyer submitted an inquiry through Florida Liquor License Market about a listing you represent.\n\nListing Reference: ${recipient.listingReference}\nSelected Listing: ${inquiry.listingRequested}\nCounty: ${inquiry.listingCounty}\nLicense Type: ${inquiry.licenseType}\nAsking Price: ${inquiry.askingPrice}${inquiry.listingUrl ? `\nFLLM Listing: ${inquiry.listingUrl}` : ""}\n\nBuyer Name: ${inquiry.buyerName}\nBuyer Email: ${inquiry.buyerEmail}\nBuyer Phone: ${inquiry.buyerPhone || "Not provided"}\nInquiry Type: ${inquiry.inquiryType}\n\nBuyer Message:\n${inquiry.message}`;

  return sendFllmEmail({
    to: recipient.email,
    replyTo: inquiry.buyerEmail,
    subject: `FLLM Buyer Inquiry — ${recipient.listingReference} — ${inquiry.listingCounty}`,
    text,
    html: emailShell(content),
  });
}
