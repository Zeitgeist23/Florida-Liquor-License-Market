import "server-only";

import { APPROVED_BROKER_RECIPIENTS } from "@/data/approved-broker-directory";
import { FLLM_GMAIL_SIGNATURE_IMAGE_BASE64 } from "@/lib/fllm-gmail-signature";

const FLLM_SIGNATURE_CID_PLACEHOLDER = "__FLLM_SIGNATURE_CID__";
import type { ListingSubmission } from "@/lib/listing-submission-store";
import { listingPaymentDetails } from "@/lib/listing-payment-details";

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.FLLM_SITE_URL ||
    "https://www.floridaliquorlicensemarket.com"
  ).replace(/\/$/, "");
}

function senderEmail() {
  return (
    process.env.GOOGLE_SENDER_EMAIL || "listings@floridaliquorlicensemarket.com"
  );
}

function escapeHtml(value: string | null | undefined) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(value: number | null) {
  if (value === null) return "Price not disclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function countyLabel(county: string) {
  const cleaned = county.trim();
  return / County$/i.test(cleaned) ? cleaned : `${cleaned} County`;
}

function approvedEmailTitle(submission: ListingSubmission) {
  if (!submission.listingTitle || !submission.approvedLicenseType) {
    throw new Error(
      "The approved listing is missing its title or license type.",
    );
  }
  return submission.listingTitle;
}

function corporateSignatureHtml() {
  const origin = siteUrl();
  const sender = senderEmail();
  return `
    <div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature">
      <div dir="ltr">
        <div style="color:rgb(0,0,0);font-family:'Times New Roman';height:28px;line-height:28px;font-size:28px">&nbsp;</div>
        <table cellpadding="0" cellspacing="0" border="0" style="font-size:medium;color:rgb(7,26,58);border-collapse:collapse">
          <tbody>
            <tr>
              <td style="padding-right:16px;vertical-align:middle">
                <img src="cid:${FLLM_SIGNATURE_CID_PLACEHOLDER}" width="108" height="108" alt="Florida Liquor License Market" style="display:block;border:0;width:108px;height:108px">
              </td>
              <td style="border-left:2px solid rgb(200,137,8);padding-left:16px;vertical-align:middle">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:22px;font-weight:bold;white-space:nowrap">Florida Liquor License Market</div>
                <div style="margin-top:4px;font-size:12px;line-height:17px;font-style:italic;color:rgb(184,115,0)">Florida’s marketplace for buying, selling and financing liquor licenses</div>
                <div style="margin-top:9px;font-size:13px;line-height:19px">✉&nbsp;&nbsp;<a href="mailto:${sender}" style="color:rgb(7,26,58);text-decoration:none" target="_blank">${sender}</a></div>
                <div style="font-size:13px;line-height:19px">●&nbsp;&nbsp;<a href="${origin}" style="color:rgb(7,26,58);text-decoration:none" target="_blank">www.floridaliquorlicensemarket.com</a></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
}
export function emailShell(content: string) {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#111111;">
    <div style="max-width:760px;">${content}${corporateSignatureHtml()}</div>
  </body></html>`;
}

async function accessToken() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Google email credentials are incomplete. Configure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN.",
    );
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  const payload = (await response.json()) as {
    access_token?: string;
    error_description?: string;
  };
  if (!response.ok || !payload.access_token) {
    throw new Error(
      payload.error_description || "Google OAuth token refresh failed.",
    );
  }
  return payload.access_token;
}

function encodeSubject(subject: string) {
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}

function base64Url(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/g, "");
}

function attachmentBase64(value: Uint8Array) {
  return (
    Buffer.from(value)
      .toString("base64")
      .match(/.{1,76}/g)
      ?.join("\r\n") || ""
  );
}

export async function sendFllmEmail(input: {
  to: string;
  cc?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{
    fileName: string;
    contentType: string;
    content: Uint8Array;
  }>;
}) {
  const sender = senderEmail();
  const signatureContentId = `fllm-signature-${Date.now()}-${Math.random().toString(16).slice(2)}@floridaliquorlicensemarket.com`;
  const html = input.html.replaceAll(
    FLLM_SIGNATURE_CID_PLACEHOLDER,
    signatureContentId,
  );
  const alternativeBoundary = `fllm-alt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const relatedBoundary = `fllm-related-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const mixedBoundary = `fllm-mixed-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const headers = [
    `From: Florida Liquor License Market <${sender}>`,
    `To: ${input.to}`,
    ...(input.cc ? [`Cc: ${input.cc}`] : []),
    ...(input.replyTo ? [`Reply-To: ${input.replyTo}`] : []),
    `Subject: ${encodeSubject(input.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`,
    "",
  ];
  const alternative = [
    `--${mixedBoundary}`,
    `Content-Type: multipart/related; boundary="${relatedBoundary}"`,
    "",
    `--${relatedBoundary}`,
    `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
    "",
    `--${alternativeBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    input.text,
    "",
    `--${alternativeBoundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    html,
    "",
    `--${alternativeBoundary}--`,
    "",
    `--${relatedBoundary}`,
    "Content-Type: image/png; name=Florida Liquor License Market",
    "Content-Disposition: attachment; filename=Florida Liquor License Market",
    "Content-Transfer-Encoding: base64",
    `X-Attachment-Id: ${signatureContentId}`,
    "X-Attachment-Content-Disposition: inline",
    `Content-ID: <${signatureContentId}>`,
    "",
    FLLM_GMAIL_SIGNATURE_IMAGE_BASE64.match(/.{1,76}/g)?.join("\r\n") || "",
    "",
    `--${relatedBoundary}--`,
  ];
  const attachments = (input.attachments ?? []).flatMap((attachment) => {
    const fileName = attachment.fileName.replace(/["\r\n]/g, "_");
    return [
      `--${mixedBoundary}`,
      `Content-Type: ${attachment.contentType}; name="${fileName}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${fileName}"`,
      "",
      attachmentBase64(attachment.content),
      "",
    ];
  });
  const mime = [
    ...headers,
    ...alternative,
    ...attachments,
    `--${mixedBoundary}--`,
  ].join("\r\n");

  const token = await accessToken();
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: base64Url(mime) }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Gmail API send failed: ${response.status} ${await response.text()}`,
    );
  }
  return response.json() as Promise<{ id: string; threadId: string }>;
}

export async function sendApprovedSellerContactToBuyer(input: {
  buyerName: string;
  buyerEmail: string;
  submission: ListingSubmission;
}) {
  const { submission } = input;
  if (
    submission.status !== "approved" ||
    !submission.approvedLicenseType ||
    !submission.email ||
    !submission.phone
  ) {
    throw new Error("The approved listing is missing seller contact information.");
  }

  const buyerFirstName = escapeHtml(input.buyerName.split(/\s+/)[0] || "there");
  const sellerName = escapeHtml(submission.fullName);
  const sellerEmail = escapeHtml(submission.email);
  const sellerPhone = escapeHtml(submission.phone);
  const reference = escapeHtml(submission.liveListingRef || submission.submissionRef);
  const county = escapeHtml(countyLabel(submission.county));
  const licenseType = escapeHtml(submission.approvedLicenseType);
  const askingPrice = escapeHtml(
    formatMoney(submission.approvedAskingPrice ?? submission.askingPrice),
  );
  const liveListingUrl = submission.liveListingUrl
    ? escapeHtml(submission.liveListingUrl)
    : "";

  const content = `
    <p style="margin:0 0 18px;">Hello ${buyerFirstName},</p>
    <p style="margin:0 0 18px;">Thank you for your inquiry through Florida Liquor License Market. The approved contact for the license you selected is below.</p>
    <p style="margin:0 0 18px;">
      <strong>Listing Reference:</strong> ${reference}<br>
      <strong>County:</strong> ${county}<br>
      <strong>License Type:</strong> ${licenseType}<br>
      <strong>Asking Price:</strong> ${askingPrice}
    </p>
    <p style="margin:0 0 18px;">
      <strong>Listing Representative:</strong> ${sellerName}<br>
      <strong>Email:</strong> <a href="mailto:${sellerEmail}" style="color:#0645ad;">${sellerEmail}</a><br>
      <strong>Phone:</strong> <a href="tel:${sellerPhone.replace(/[^+\d]/g, "")}" style="color:#0645ad;">${sellerPhone}</a>
    </p>
    ${liveListingUrl ? `<p style="margin:0 0 18px;"><a href="${liveListingUrl}" style="color:#0645ad;font-weight:bold;text-decoration:underline;">View the license listing</a></p>` : ""}
    <p style="margin:0;">Availability, asking price, license status, and transfer eligibility remain subject to confirmation and applicable regulatory requirements.</p>`;

  const text = `Hello ${input.buyerName.split(/\s+/)[0] || "there"},

Thank you for your inquiry through Florida Liquor License Market. The approved contact for the license you selected is below.

Listing Reference: ${submission.liveListingRef || submission.submissionRef}
County: ${countyLabel(submission.county)}
License Type: ${submission.approvedLicenseType}
Asking Price: ${formatMoney(submission.approvedAskingPrice ?? submission.askingPrice)}

Listing Representative: ${submission.fullName}
Email: ${submission.email}
Phone: ${submission.phone}
${submission.liveListingUrl ? `Listing: ${submission.liveListingUrl}\n` : ""}
Availability, asking price, license status, and transfer eligibility remain subject to confirmation and applicable regulatory requirements.

Florida Liquor License Market
${senderEmail()}
${siteUrl()}`;

  return sendFllmEmail({
    to: input.buyerEmail,
    replyTo: submission.email,
    subject: `Contact Information for ${submission.liveListingRef || submission.submissionRef}`,
    text,
    html: emailShell(content),
  });
}

export type AttorneyDirectoryApplicationEmail = {
  reference: string;
  fullName: string;
  firm: string;
  barNumber: string;
  email: string;
  phone: string;
  city: string;
  counties: string;
  website: string;
  portraitUrl: string;
  biography: string;
  services: string[];
  additionalInformation: string;
  submittedAt: string;
};

function applicationReviewEmail() {
  return process.env.ATTORNEY_DIRECTORY_REVIEW_EMAIL || senderEmail();
}

export async function notifyFllmOfAttorneyApplication(
  application: AttorneyDirectoryApplicationEmail,
) {
  const servicesHtml = application.services
    .map((service) => `<li>${escapeHtml(service)}</li>`)
    .join("");
  const servicesText = application.services
    .map((service) => `- ${service}`)
    .join("\n");
  const portraitHtml = application.portraitUrl
    ? `<br><strong>Portrait URL:</strong> <a href="${escapeHtml(application.portraitUrl)}">${escapeHtml(application.portraitUrl)}</a>`
    : "";

  const details = `
    <p style="margin:0 0 18px;"><strong>A new attorney has applied to the FLLM attorney directory.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Reference:</strong> ${escapeHtml(application.reference)}<br>
      <strong>Attorney:</strong> ${escapeHtml(application.fullName)}<br>
      <strong>Firm:</strong> ${escapeHtml(application.firm)}<br>
      <strong>Florida Bar number:</strong> ${escapeHtml(application.barNumber)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(application.email)}">${escapeHtml(application.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(application.phone)}<br>
      <strong>Primary city:</strong> ${escapeHtml(application.city)}<br>
      <strong>Service area:</strong> ${escapeHtml(application.counties)}<br>
      <strong>Profile URL:</strong> <a href="${escapeHtml(application.website)}">${escapeHtml(application.website)}</a>
      ${portraitHtml}
    </p>
    <p style="margin:0 0 5px;"><strong>Services:</strong></p>
    <ul style="margin-top:0;">${servicesHtml}</ul>
    <p style="margin:0 0 18px;"><strong>Biography:</strong><br>${escapeHtml(application.biography).replaceAll("\n", "<br>")}</p>
    <p style="margin:0 0 18px;"><strong>Additional information:</strong><br>${escapeHtml(application.additionalInformation || "None provided").replaceAll("\n", "<br>")}</p>
    <p style="margin:0;">The applicant accepted the identity/authority certification, publication consent, and moderated-review agreement.</p>`;

  const text = `A new attorney has applied to the FLLM attorney directory.

Reference: ${application.reference}
Attorney: ${application.fullName}
Firm: ${application.firm}
Florida Bar number: ${application.barNumber}
Email: ${application.email}
Phone: ${application.phone}
Primary city: ${application.city}
Service area: ${application.counties}
Profile URL: ${application.website}
Portrait URL: ${application.portraitUrl || "None provided"}

Services:
${servicesText}

Biography:
${application.biography}

Additional information:
${application.additionalInformation || "None provided"}

The applicant accepted the identity/authority certification, publication consent, and moderated-review agreement.

Submitted: ${application.submittedAt}`;

  return sendFllmEmail({
    to: applicationReviewEmail(),
    subject: `Attorney Directory Application — ${application.fullName} — ${application.reference}`,
    text,
    html: emailShell(details),
  });
}

export async function sendAttorneyApplicationAcknowledgement(
  application: AttorneyDirectoryApplicationEmail,
) {
  const firstName = escapeHtml(
    application.fullName.split(/\s+/)[0] || application.fullName,
  );
  const details = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">Thank you for applying to the Florida Liquor License Market attorney directory.</p>
    <p style="margin:0 0 18px;">Your application has been received for independent review. FLLM may verify your Florida Bar record, firm profile, and submitted practice information or contact you for clarification. Submission does not guarantee publication.</p>
    <p style="margin:0 0 18px;"><strong>Application reference:</strong> ${escapeHtml(application.reference)}<br>
    <strong>Attorney:</strong> ${escapeHtml(application.fullName)}<br>
    <strong>Firm:</strong> ${escapeHtml(application.firm)}</p>
    <p style="margin:0;">No payment was required and no public profile has been created at this stage.</p>`;

  const text = `Hello ${application.fullName.split(/\s+/)[0] || application.fullName},

Thank you for applying to the Florida Liquor License Market attorney directory.

Your application has been received for independent review. FLLM may verify your Florida Bar record, firm profile, and submitted practice information or contact you for clarification. Submission does not guarantee publication.

Application reference: ${application.reference}
Attorney: ${application.fullName}
Firm: ${application.firm}

No payment was required and no public profile has been created at this stage.

Florida Liquor License Market
${senderEmail()}
${siteUrl()}`;

  return sendFllmEmail({
    to: application.email,
    subject: `We Received Your Attorney Directory Application — ${application.reference}`,
    text,
    html: emailShell(details),
  });
}

export async function sendPaymentReceivedEmail(submission: ListingSubmission) {
  const firstName = escapeHtml(submission.firstName || "there");
  const payment = listingPaymentDetails(submission.message);
  const details = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">Thank you for submitting your Florida liquor license listing and completing the ${payment.amountLabel} ${payment.tierLabel.toLowerCase()} payment through Stripe.</p>
    <p style="margin:0 0 18px;">Your submission has been received and is now under review. Payment does not guarantee publication. We will send another email after the listing has been reviewed and, if approved, published on the Florida Liquor License Market website.</p>
    <p style="margin:0 0 18px;"><strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
    <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}<br>
    <strong>Asking Price:</strong> ${escapeHtml(formatMoney(submission.askingPrice))}<br>
    <strong>Submission Reference:</strong> ${escapeHtml(submission.submissionRef)}</p>
    <p style="margin:0;">No further action is required at this time.</p>`;

  const text = `Hello ${submission.firstName || "there"},\n\nThank you for submitting your Florida liquor license listing and completing the ${payment.amountLabel} ${payment.tierLabel.toLowerCase()} payment through Stripe.\n\nYour submission has been received and is now under review. Payment does not guarantee publication. We will send another email after the listing has been reviewed and, if approved, published on the Florida Liquor License Market website.\n\nCounty: ${countyLabel(submission.county)}\nLicense Type: ${submission.licenseType}\nAsking Price: ${formatMoney(submission.askingPrice)}\nSubmission Reference: ${submission.submissionRef}\n\nNo further action is required at this time.\n\nFlorida Liquor License Market\n${senderEmail()}\n${siteUrl()}`;

  return sendFllmEmail({
    to: submission.email,
    subject: "We Received Your Florida Liquor License Listing",
    text,
    html: emailShell(details),
  });
}

export async function notifyFllmOfBrokerConsultation(
  submission: ListingSubmission,
) {
  const reviewEmail =
    process.env.BROKER_CONSULTATION_REVIEW_EMAIL || senderEmail();
  const details = `
    <p style="margin:0 0 18px;"><strong>A seller has requested a broker-assisted consultation.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>Name:</strong> ${escapeHtml(submission.fullName)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(submission.phone)}<br>
      <strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
      <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}
    </p>
    <p style="margin:0 0 18px;"><strong>Consultation details:</strong><br>${escapeHtml(submission.message || "None provided").replaceAll("\n", "<br>")}</p>
    <p style="margin:0;">No listing fee was charged. Contact the seller to discuss services and any separate written agreement.</p>`;

  const text = `A seller has requested a broker-assisted consultation.

Reference: ${submission.submissionRef}
Name: ${submission.fullName}
Email: ${submission.email}
Phone: ${submission.phone}
County: ${countyLabel(submission.county)}
License Type: ${submission.licenseType}

Consultation details:
${submission.message || "None provided"}

No listing fee was charged. Contact the seller to discuss services and any separate written agreement.`;

  return sendFllmEmail({
    to: reviewEmail,
    replyTo: submission.email,
    subject: `Broker-Assisted Consultation Request — ${submission.fullName} — ${submission.submissionRef}`,
    text,
    html: emailShell(details),
  });
}

export async function notifyFllmOfBuyerOffer(submission: ListingSubmission) {
  const reviewEmail = process.env.BUYER_LEAD_REVIEW_EMAIL || senderEmail();
  let details: {
    purchaseMethod?: string | null;
    targetClosing?: string | null;
    proofOfFunds?: string | null;
    offerExpiration?: string | null;
    contingencies?: string | null;
    notes?: string | null;
  } = {};
  try {
    details = JSON.parse(submission.message || "{}") as typeof details;
  } catch {
    details.notes = submission.message;
  }

  const content = `
    <p style="margin:0 0 18px;"><strong>A buyer submitted an offer through FLLM.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Lead Reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>Listing:</strong> ${escapeHtml(submission.listingTitle || submission.county)}<br>
      <strong>Listing Reference:</strong> ${escapeHtml(submission.liveListingRef || "Not provided")}<br>
      <strong>Offer Amount:</strong> ${escapeHtml(formatMoney(submission.askingPrice))}<br>
      <strong>Buyer:</strong> ${escapeHtml(submission.fullName)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(submission.phone)}
    </p>
    <p style="margin:0 0 18px;">
      <strong>Purchase Method:</strong> ${escapeHtml(details.purchaseMethod || "Not provided")}<br>
      <strong>Target Closing:</strong> ${escapeHtml(details.targetClosing || submission.preferredTiming || "Not provided")}<br>
      <strong>Proof of Funds:</strong> ${escapeHtml(details.proofOfFunds || "Not provided")}<br>
      <strong>Offer Expiration:</strong> ${escapeHtml(details.offerExpiration || "Not provided")}
    </p>
    <p style="margin:0 0 18px;"><strong>Contingencies:</strong><br>${escapeHtml(details.contingencies || "None provided")}</p>
    <p style="margin:0;"><strong>Additional Notes:</strong><br>${escapeHtml(details.notes || "None provided")}</p>`;

  const text = `A buyer submitted an offer through FLLM.

Lead Reference: ${submission.submissionRef}
Listing: ${submission.listingTitle || submission.county}
Listing Reference: ${submission.liveListingRef || "Not provided"}
Offer Amount: ${formatMoney(submission.askingPrice)}
Buyer: ${submission.fullName}
Email: ${submission.email}
Phone: ${submission.phone}
Purchase Method: ${details.purchaseMethod || "Not provided"}
Target Closing: ${details.targetClosing || submission.preferredTiming || "Not provided"}
Proof of Funds: ${details.proofOfFunds || "Not provided"}
Offer Expiration: ${details.offerExpiration || "Not provided"}

Contingencies:
${details.contingencies || "None provided"}

Additional Notes:
${details.notes || "None provided"}`;

  return sendFllmEmail({
    to: reviewEmail,
    replyTo: submission.email,
    subject: `New Buyer Offer — ${submission.liveListingRef || submission.county} — ${formatMoney(submission.askingPrice)}`,
    text,
    html: emailShell(content),
  });
}

type ValuationLeadDetails = {
  kind?: string;
  estimate?: {
    count?: number;
    low?: number | null;
    median?: number | null;
    high?: number | null;
    typicalLow?: number | null;
    typicalHigh?: number | null;
    confidence?: string | null;
    generatedAt?: string | null;
  };
};

function valuationDetails(submission: ListingSubmission) {
  try {
    return JSON.parse(submission.message || "{}") as ValuationLeadDetails;
  } catch {
    return {};
  }
}

function valuationRange(details: ValuationLeadDetails) {
  const low = details.estimate?.typicalLow ?? details.estimate?.low ?? null;
  const high = details.estimate?.typicalHigh ?? details.estimate?.high ?? null;
  if (low === null && high === null) return "No exact county range available";
  if (low === high || high === null) return formatMoney(low);
  if (low === null) return formatMoney(high);
  return `${formatMoney(low)}–${formatMoney(high)}`;
}

export async function notifyFllmOfValuationLead(submission: ListingSubmission) {
  const reviewEmail = process.env.VALUATION_LEAD_REVIEW_EMAIL || senderEmail();
  const details = valuationDetails(submission);
  const content = `
    <p style="margin:0 0 18px;"><strong>A license owner requested follow-up after using the FLLM market estimator.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Lead Reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>Name:</strong> ${escapeHtml(submission.fullName)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(submission.phone)}<br>
      <strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
      <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}<br>
      <strong>License Status:</strong> ${escapeHtml(submission.licenseStatus)}<br>
      <strong>Seller Timing:</strong> ${escapeHtml(submission.preferredTiming || "Not provided")}<br>
      <strong>Target Price:</strong> ${escapeHtml(formatMoney(submission.askingPrice))}
    </p>
    <p style="margin:0 0 18px;">
      <strong>Automated Market Range:</strong> ${escapeHtml(valuationRange(details))}<br>
      <strong>Median Asking Price:</strong> ${escapeHtml(formatMoney(details.estimate?.median ?? null))}<br>
      <strong>Exact Comparables:</strong> ${escapeHtml(String(details.estimate?.count ?? 0))}<br>
      <strong>Data Confidence:</strong> ${escapeHtml(details.estimate?.confidence || "Unavailable")}
    </p>
    <p style="margin:0;">The seller authorized FLLM to contact them about this estimate and selling options.</p>`;

  const text = `A license owner requested follow-up after using the FLLM market estimator.

Lead Reference: ${submission.submissionRef}
Name: ${submission.fullName}
Email: ${submission.email}
Phone: ${submission.phone}
County: ${countyLabel(submission.county)}
License Type: ${submission.licenseType}
License Status: ${submission.licenseStatus}
Seller Timing: ${submission.preferredTiming || "Not provided"}
Target Price: ${formatMoney(submission.askingPrice)}

Automated Market Range: ${valuationRange(details)}
Median Asking Price: ${formatMoney(details.estimate?.median ?? null)}
Exact Comparables: ${details.estimate?.count ?? 0}
Data Confidence: ${details.estimate?.confidence || "Unavailable"}

The seller authorized FLLM to contact them about this estimate and selling options.`;

  return sendFllmEmail({
    to: reviewEmail,
    replyTo: submission.email,
    subject: `New Valuation Lead — ${submission.county} ${submission.licenseType} — ${submission.submissionRef}`,
    text,
    html: emailShell(content),
  });
}

export async function sendValuationLeadAcknowledgement(
  submission: ListingSubmission,
) {
  const details = valuationDetails(submission);
  const firstName = escapeHtml(submission.firstName || "there");
  const content = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">We received your request to discuss the FLLM market estimate for your ${escapeHtml(countyLabel(submission.county))} ${escapeHtml(submission.licenseType)} license.</p>
    <p style="margin:0 0 18px;">
      <strong>Current asking-price range:</strong> ${escapeHtml(valuationRange(details))}<br>
      <strong>Median asking price:</strong> ${escapeHtml(formatMoney(details.estimate?.median ?? null))}<br>
      <strong>Comparable listings:</strong> ${escapeHtml(String(details.estimate?.count ?? 0))}<br>
      <strong>Reference:</strong> ${escapeHtml(submission.submissionRef)}
    </p>
    <p style="margin:0 0 18px;">An FLLM representative may contact you to discuss timing, current buyer interest and listing options.</p>
    <p style="margin:0;">This market estimate uses advertised asking prices. It is not an appraisal, verified closed-sale report or guarantee of sale price.</p>`;

  const text = `Hello ${submission.firstName || "there"},

We received your request to discuss the FLLM market estimate for your ${countyLabel(submission.county)} ${submission.licenseType} license.

Current asking-price range: ${valuationRange(details)}
Median asking price: ${formatMoney(details.estimate?.median ?? null)}
Comparable listings: ${details.estimate?.count ?? 0}
Reference: ${submission.submissionRef}

An FLLM representative may contact you to discuss timing, current buyer interest and listing options.

This market estimate uses advertised asking prices. It is not an appraisal, verified closed-sale report or guarantee of sale price.

Florida Liquor License Market
${senderEmail()}
${siteUrl()}`;

  return sendFllmEmail({
    to: submission.email,
    subject: `Your Florida Liquor License Market Estimate — ${submission.submissionRef}`,
    text,
    html: emailShell(content),
  });
}

export async function sendBrokerConsultationAcknowledgement(
  submission: ListingSubmission,
) {
  const firstName = escapeHtml(submission.firstName || "there");
  const details = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">We received your request for a broker-assisted consultation regarding your Florida liquor license.</p>
    <p style="margin:0 0 18px;">An FLLM representative will review the information and contact you using your preferred contact method.</p>
    <p style="margin:0 0 18px;"><strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
    <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}<br>
    <strong>Reference:</strong> ${escapeHtml(submission.submissionRef)}</p>
    <p style="margin:0;"><strong>No payment was required or charged.</strong> This request does not create a brokerage relationship. Any services, exclusivity, or compensation must be stated in a separate written agreement accepted by the parties.</p>`;

  const text = `Hello ${submission.firstName || "there"},

We received your request for a broker-assisted consultation regarding your Florida liquor license. An FLLM representative will review the information and contact you using your preferred contact method.

County: ${countyLabel(submission.county)}
License Type: ${submission.licenseType}
Reference: ${submission.submissionRef}

No payment was required or charged. This request does not create a brokerage relationship. Any services, exclusivity, or compensation must be stated in a separate written agreement accepted by the parties.

Florida Liquor License Market
${senderEmail()}
${siteUrl()}`;

  return sendFllmEmail({
    to: submission.email,
    subject: `We Received Your Broker-Assisted Consultation Request — ${submission.submissionRef}`,
    text,
    html: emailShell(details),
  });
}

export async function sendListingApprovedEmail(submission: ListingSubmission) {
  if (
    !submission.liveListingUrl ||
    !submission.listingTitle ||
    !submission.approvedLicenseType
  ) {
    throw new Error(
      "The approved listing is missing its title, license type, or live URL.",
    );
  }

  const firstName = escapeHtml(submission.firstName || "there");
  const county = countyLabel(submission.county);
  const listingTitle = approvedEmailTitle(submission);
  const liveUrl = escapeHtml(submission.liveListingUrl);
  const cardImageUrl = `${siteUrl()}/api/listing-email-card/${encodeURIComponent(submission.submissionRef)}`;

  const details = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">Thank you for submitting your paid listing request to Florida Liquor License Market.</p>
    <p style="margin:0 0 18px;">We have completed our review and are pleased to confirm that your listing has been <strong>approved and is now live</strong> on the Florida Liquor License Market website.</p>
    <p style="margin:0 0 6px;"><strong>Listing:</strong>&nbsp;&nbsp; ${escapeHtml(listingTitle)}<br>
    <strong>County:</strong> ${escapeHtml(county)}<br>
    <strong>License Type:</strong> ${escapeHtml(submission.approvedLicenseType)}</p>
    <p style="margin:0 0 22px;"><a href="${liveUrl}" style="color:#0645ad;font-weight:bold;text-decoration:underline;">View live listing</a></p>
    <p style="margin:0 0 18px;">Please review the live listing and reply to this email if any information needs to be corrected or updated.</p>
    <p style="margin:0 0 18px;">Thank you for choosing Florida Liquor License Market.</p>
    <a href="${liveUrl}" style="display:block;text-decoration:none;">
      <img src="${cardImageUrl}" width="680" alt="${escapeHtml(county)} ${escapeHtml(submission.approvedLicenseType)} listing" style="display:block;width:100%;max-width:680px;height:auto;border:0;">
    </a>`;

  const text = `Hello ${submission.firstName || "there"},\n\nThank you for submitting your paid listing request to Florida Liquor License Market.\n\nWe have completed our review and are pleased to confirm that your listing has been approved and is now live on the Florida Liquor License Market website.\n\nListing: ${listingTitle}\nCounty: ${county}\nLicense Type: ${submission.approvedLicenseType}\nView live listing: ${submission.liveListingUrl}\n\nPlease review the live listing and reply to this email if any information needs to be corrected or updated.\n\nThank you for choosing Florida Liquor License Market.\n\nFlorida Liquor License Market\n${senderEmail()}\n${siteUrl()}`;

  return sendFllmEmail({
    to: submission.email,
    subject: `Your ${county} ${submission.approvedLicenseType} Listing Is Now Live`,
    text,
    html: emailShell(details),
  });
}

export type ApprovedBrokerNotificationResult = {
  attempted: number;
  sent: number;
  failed: number;
  failures: Array<{ email: string; error: string }>;
};

export async function notifyApprovedBrokersOfListing(
  submission: ListingSubmission,
): Promise<ApprovedBrokerNotificationResult> {
  if (
    !submission.liveListingUrl ||
    !submission.listingTitle ||
    !submission.approvedLicenseType
  ) {
    throw new Error(
      "The approved listing is missing its title, license type, or live URL.",
    );
  }

  const county = countyLabel(submission.county);
  const listingTitle = approvedEmailTitle(submission);
  const liveUrl = escapeHtml(submission.liveListingUrl);
  const askingPrice = formatMoney(
    submission.approvedAskingPrice ?? submission.askingPrice,
  );
  const subject = `New FLLM Listing — ${county} ${submission.approvedLicenseType}`;

  const deliveries = await Promise.all(
    APPROVED_BROKER_RECIPIENTS.map(async (broker) => {
      const firstName = escapeHtml(broker.name.split(/\s+/)[0] || broker.name);
      const content = `
        <p style="margin:0 0 18px;">Hello ${firstName},</p>
        <p style="margin:0 0 18px;">Florida Liquor License Market has published a new liquor-license listing that may be relevant to your clients.</p>
        <p style="margin:0 0 18px;">
          <strong>Listing:</strong> ${escapeHtml(listingTitle)}<br>
          <strong>County:</strong> ${escapeHtml(county)}<br>
          <strong>License Type:</strong> ${escapeHtml(submission.approvedLicenseType)}<br>
          <strong>Asking Price:</strong> ${escapeHtml(askingPrice)}<br>
          <strong>Reference:</strong> ${escapeHtml(submission.submissionRef)}
        </p>
        <p style="margin:0 0 18px;"><a href="${liveUrl}" style="color:#0645ad;font-weight:bold;text-decoration:underline;">View the live listing</a></p>
        <p style="margin:0 0 18px;">Availability, price, license status, and transfer eligibility remain subject to confirmation and applicable regulatory requirements.</p>
        <p style="margin:0;">If you prefer not to receive approved FLLM listing notices, reply to this email and we will remove you from the outreach directory.</p>`;

      const text = `Hello ${broker.name.split(/\s+/)[0] || broker.name},

Florida Liquor License Market has published a new liquor-license listing that may be relevant to your clients.

Listing: ${listingTitle}
County: ${county}
License Type: ${submission.approvedLicenseType}
Asking Price: ${askingPrice}
Reference: ${submission.submissionRef}
View the live listing: ${submission.liveListingUrl}

Availability, price, license status, and transfer eligibility remain subject to confirmation and applicable regulatory requirements.

If you prefer not to receive approved FLLM listing notices, reply to this email and we will remove you from the outreach directory.

Florida Liquor License Market
${senderEmail()}
${siteUrl()}`;

      try {
        await sendFllmEmail({
          to: broker.email,
          subject,
          text,
          html: emailShell(content),
        });
        return { email: broker.email, sent: true as const };
      } catch (error) {
        return {
          email: broker.email,
          sent: false as const,
          error:
            error instanceof Error
              ? error.message
              : "Broker notification failed.",
        };
      }
    }),
  );

  const failures = deliveries
    .filter(
      (delivery): delivery is { email: string; sent: false; error: string } =>
        !delivery.sent,
    )
    .map((delivery) => ({ email: delivery.email, error: delivery.error }));

  return {
    attempted: deliveries.length,
    sent: deliveries.length - failures.length,
    failed: failures.length,
    failures,
  };
}
