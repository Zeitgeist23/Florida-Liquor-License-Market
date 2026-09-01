import "server-only";

import { emailShell, sendFllmEmail } from "@/lib/fllm-email";
import type { ListingSubmission } from "@/lib/listing-submission-store";
import { publicListingReference } from "@/lib/public-listing-reference";

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

export async function sendBuyerInquiryToApprovedSeller(input: {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  inquiryType: string;
  message: string;
  submission: ListingSubmission;
}) {
  const { submission } = input;
  if (!submission.email) {
    throw new Error("The approved listing is missing the seller email address.");
  }

  const reference = publicListingReference(submission);
  const county = countyLabel(submission.county);
  const licenseType = submission.approvedLicenseType || submission.licenseType;
  const askingPrice = formatMoney(
    submission.approvedAskingPrice ?? submission.askingPrice,
  );
  const listingUrl = submission.liveListingUrl || "";

  const content = `
    <p style="margin:0 0 18px;"><strong>A prospective buyer submitted an inquiry about your FLLM listing.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Listing Reference:</strong> ${escapeHtml(reference)}<br>
      <strong>County:</strong> ${escapeHtml(county)}<br>
      <strong>License Type:</strong> ${escapeHtml(licenseType)}<br>
      <strong>Asking Price:</strong> ${escapeHtml(askingPrice)}
      ${listingUrl ? `<br><strong>Listing:</strong> <a href="${escapeHtml(listingUrl)}">${escapeHtml(listingUrl)}</a>` : ""}
    </p>
    <p style="margin:0 0 18px;">
      <strong>Buyer Name:</strong> ${escapeHtml(input.buyerName)}<br>
      <strong>Buyer Email:</strong> <a href="mailto:${escapeHtml(input.buyerEmail)}">${escapeHtml(input.buyerEmail)}</a><br>
      <strong>Buyer Phone:</strong> ${escapeHtml(input.buyerPhone)}<br>
      <strong>Inquiry Type:</strong> ${escapeHtml(input.inquiryType)}
    </p>
    <p style="margin:0;"><strong>Buyer Message:</strong><br>${escapeHtml(input.message).replaceAll("\n", "<br>")}</p>`;

  const text = `A prospective buyer submitted an inquiry about your FLLM listing.\n\nListing Reference: ${reference}\nCounty: ${county}\nLicense Type: ${licenseType}\nAsking Price: ${askingPrice}${listingUrl ? `\nListing: ${listingUrl}` : ""}\n\nBuyer Name: ${input.buyerName}\nBuyer Email: ${input.buyerEmail}\nBuyer Phone: ${input.buyerPhone}\nInquiry Type: ${input.inquiryType}\n\nBuyer Message:\n${input.message}`;

  return sendFllmEmail({
    to: submission.email,
    replyTo: input.buyerEmail,
    subject: `Buyer Inquiry for ${reference} — ${county}`,
    text,
    html: emailShell(content),
  });
}
