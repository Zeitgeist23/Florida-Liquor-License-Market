import "server-only";

import type { ListingSubmission } from "@/lib/listing-submission-store";

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.FLLM_SITE_URL ||
    "https://www.floridaliquorlicensemarket.com"
  ).replace(/\/$/, "");
}

function senderEmail() {
  return process.env.GOOGLE_SENDER_EMAIL || "listings@floridaliquorlicensemarket.com";
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
    throw new Error("The approved listing is missing its title or license type.");
  }
  return submission.listingTitle;
}

function corporateSignatureHtml() {
  const origin = siteUrl();
  const sender = senderEmail();
  return `
    <div style="height:28px;line-height:28px;font-size:28px;">&nbsp;</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#071a3a;border-collapse:collapse;">
      <tr>
        <td style="padding-right:16px;vertical-align:middle;">
          <img src="${origin}/assets/fllm-email-logo.png" width="108" height="108" alt="Florida Liquor License Market" style="display:block;border:0;width:108px;height:108px;">
        </td>
        <td style="border-left:2px solid #c88908;padding-left:16px;vertical-align:middle;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:22px;font-weight:bold;color:#071a3a;white-space:nowrap;">Florida Liquor License Market</div>
          <div style="margin-top:4px;font-size:12px;line-height:17px;font-style:italic;color:#b87300;">Florida’s marketplace for buying, selling and financing liquor licenses</div>
          <div style="margin-top:9px;font-size:13px;line-height:19px;">
            <span style="color:#071a3a;">✉</span>&nbsp;
            <a href="mailto:${sender}" style="color:#071a3a;text-decoration:none;">${sender}</a>
          </div>
          <div style="font-size:13px;line-height:19px;">
            <span style="color:#071a3a;">●</span>&nbsp;
            <a href="${origin}" style="color:#071a3a;text-decoration:none;">www.floridaliquorlicensemarket.com</a>
          </div>
        </td>
      </tr>
    </table>`;
}

function emailShell(content: string) {
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
      "Google email credentials are incomplete. Configure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN."
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
  const payload = (await response.json()) as { access_token?: string; error_description?: string };
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || "Google OAuth token refresh failed.");
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
  return Buffer.from(value)
    .toString("base64")
    .match(/.{1,76}/g)
    ?.join("\r\n") || "";
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
  const alternativeBoundary = `fllm-alt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
    input.html,
    "",
    `--${alternativeBoundary}--`,
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
  const mime = [...headers, ...alternative, ...attachments, `--${mixedBoundary}--`].join("\r\n");

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
    }
  );

  if (!response.ok) {
    throw new Error(`Gmail API send failed: ${response.status} ${await response.text()}`);
  }
  return response.json() as Promise<{ id: string; threadId: string }>;
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
  application: AttorneyDirectoryApplicationEmail
) {
  const servicesHtml = application.services
    .map((service) => `<li>${escapeHtml(service)}</li>`)
    .join("");
  const servicesText = application.services.map((service) => `- ${service}`).join("\n");
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
  application: AttorneyDirectoryApplicationEmail
) {
  const firstName = escapeHtml(application.fullName.split(/\s+/)[0] || application.fullName);
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
  const details = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">Thank you for submitting your Florida liquor license listing and completing the $14.95 listing-submission payment.</p>
    <p style="margin:0 0 18px;">Your submission has been received and is now under review. Payment does not guarantee publication. We will send another email after the listing has been reviewed and, if approved, published on the Florida Liquor License Market website.</p>
    <p style="margin:0 0 18px;"><strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
    <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}<br>
    <strong>Asking Price:</strong> ${escapeHtml(formatMoney(submission.askingPrice))}<br>
    <strong>Submission Reference:</strong> ${escapeHtml(submission.submissionRef)}</p>
    <p style="margin:0;">No further action is required at this time.</p>`;

  const text = `Hello ${submission.firstName || "there"},\n\nThank you for submitting your Florida liquor license listing and completing the $14.95 listing-submission payment.\n\nYour submission has been received and is now under review. Payment does not guarantee publication. We will send another email after the listing has been reviewed and, if approved, published on the Florida Liquor License Market website.\n\nCounty: ${countyLabel(submission.county)}\nLicense Type: ${submission.licenseType}\nAsking Price: ${formatMoney(submission.askingPrice)}\nSubmission Reference: ${submission.submissionRef}\n\nNo further action is required at this time.\n\nFlorida Liquor License Market\n${senderEmail()}\n${siteUrl()}`;

  return sendFllmEmail({
    to: submission.email,
    subject: "We Received Your Florida Liquor License Listing",
    text,
    html: emailShell(details),
  });
}

export async function sendListingApprovedEmail(submission: ListingSubmission) {
  if (!submission.liveListingUrl || !submission.listingTitle || !submission.approvedLicenseType) {
    throw new Error("The approved listing is missing its title, license type, or live URL.");
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

