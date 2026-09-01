import { NextResponse } from "next/server";

import { sendBuyerInquiryToApprovedSeller } from "@/lib/buyer-inquiry-email";
import {
  notifyFllmOfBuyerOffer,
  sendApprovedSellerContactToBuyer,
  sendFllmEmail,
} from "@/lib/fllm-email";
import {
  createBuyerLead,
  getApprovedSubmissionByPublicRef,
} from "@/lib/listing-submission-store";
import { publicListingReference } from "@/lib/public-listing-reference";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const FORM_SUBMIT_FALLBACK =
  "https://formsubmit.co/ajax/listings@floridaliquorlicensemarket.com";

function value(formData: FormData, name: string, maxLength = 5000) {
  return String(formData.get(name) || "").trim().slice(0, maxLength);
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function contactRecipient() {
  return (
    process.env.FLLM_CONTACT_INQUIRY_EMAIL ||
    process.env.GOOGLE_SENDER_EMAIL ||
    "listings@floridaliquorlicensemarket.com"
  );
}

function isBuyerOffer(formData: FormData) {
  return Boolean(
    formData.get("non_binding_acknowledgment") ||
    value(formData, "offer_amount", 60) ||
    value(formData, "purchase_method", 160) ||
    value(formData, "target_closing", 120),
  );
}

function safeEmail(value: string | null | undefined) {
  const email = (value || "").trim().toLowerCase();
  return /^\S+@\S+\.\S+$/.test(email) && !/[\r\n,]/.test(email) ? email : "";
}

async function sendFormSubmitInquiryFallback(input: {
  request: Request;
  fullName: string;
  buyerEmail: string;
  phone: string;
  inquiryType: string;
  preferredCounty: string;
  message: string;
  subject: string;
  listingReference: string;
  listingRequested: string;
  listingCounty: string;
  licenseType: string;
  askingPrice: string;
  listingStatus: string;
  listingUrl: string;
  ccRecipients: string[];
  sellerName?: string;
  sellerEmail?: string;
  sellerPhone?: string;
}) {
  const fallback = new FormData();
  fallback.set("_subject", `${input.subject} — FLLM fallback delivery`);
  fallback.set("_template", "table");
  fallback.set("_captcha", "false");
  fallback.set("_replyto", input.buyerEmail);
  fallback.set("_url", input.request.url);

  const cc = Array.from(
    new Set(input.ccRecipients.map((recipient) => safeEmail(recipient)).filter(Boolean)),
  );
  if (cc.length) fallback.set("_cc", cc.join(","));

  fallback.set("name", input.fullName);
  fallback.set("email", input.buyerEmail);
  fallback.set("phone", input.phone || "Not provided");
  fallback.set("inquiry_type", input.inquiryType);
  fallback.set("preferred_county", input.preferredCounty || "Not selected");
  fallback.set("listing_reference", input.listingReference || "Not provided");
  fallback.set("listing_requested", input.listingRequested || "Not provided");
  fallback.set("listing_county", input.listingCounty || "Not provided");
  fallback.set("license_type", input.licenseType || "Not provided");
  fallback.set("asking_price", input.askingPrice || "Not disclosed");
  fallback.set("listing_status", input.listingStatus || "Not provided");
  fallback.set("listing_url", input.listingUrl || "Not provided");
  if (input.sellerName) fallback.set("listing_representative", input.sellerName);
  if (input.sellerEmail) fallback.set("listing_representative_email", input.sellerEmail);
  if (input.sellerPhone) fallback.set("listing_representative_phone", input.sellerPhone);
  fallback.set("message", input.message);

  const response = await fetch(FORM_SUBMIT_FALLBACK, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: fallback,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `FormSubmit fallback failed: ${response.status} ${await response.text()}`,
    );
  }
}

async function submitContactInquiry(request: Request, formData: FormData) {
  const fullName = value(formData, "name", 160);
  const email = value(formData, "email", 254).toLowerCase();
  const phone = value(formData, "phone", 60);
  const inquiryType = value(formData, "inquiry_type", 120);
  const preferredCounty = value(formData, "preferred_county", 100);
  const message = value(formData, "message", 5000);
  const listingReference = value(formData, "listing_reference", 100);

  if (!fullName || !email || !inquiryType || !message || (listingReference && !phone)) {
    return NextResponse.json(
      { error: "Please complete the required inquiry fields." },
      { status: 400 },
    );
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const submittedListingRequested = value(formData, "listing_requested", 300);
  const submittedListingCounty = value(formData, "listing_county", 100) || preferredCounty;
  const submittedLicenseType = value(formData, "license_type", 120);
  const submittedAskingPrice = value(formData, "asking_price", 80);
  const submittedListingStatus = value(formData, "listing_status", 160);
  const listingUrlValue = value(formData, "listing_url", 500);
  const listingUrl = /^\/listings\/[a-z0-9%._~-]+(?:[/?#].*)?$/i.test(listingUrlValue)
    ? new URL(listingUrlValue, request.url).toString()
    : "";
  const approvedSellerSubmission = /^FLLM-/i.test(listingReference)
    ? await getApprovedSubmissionByPublicRef(listingReference.toUpperCase())
    : null;
  const resolvedListingReference =
    (approvedSellerSubmission
      ? publicListingReference(approvedSellerSubmission)
      : null) ||
    listingReference;
  const listingRequested =
    approvedSellerSubmission?.listingTitle || submittedListingRequested;
  const listingCounty = approvedSellerSubmission?.county || submittedListingCounty;
  const licenseType =
    approvedSellerSubmission?.approvedLicenseType || submittedLicenseType;
  const approvedAskingPrice = approvedSellerSubmission
    ? approvedSellerSubmission.approvedAskingPrice ?? approvedSellerSubmission.askingPrice
    : null;
  const askingPrice = approvedSellerSubmission
    ? approvedAskingPrice === null
      ? "Price not disclosed"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(approvedAskingPrice)
    : submittedAskingPrice;
  const listingStatus = approvedSellerSubmission
    ? approvedSellerSubmission.licenseStatus
    : submittedListingStatus;
  const resolvedListingUrl = approvedSellerSubmission?.liveListingUrl || listingUrl;

  const subject = resolvedListingReference
    ? `Specific License Inquiry — ${resolvedListingReference} — ${listingCounty || listingRequested}`
    : value(formData, "_subject", 240) || `FLLM Contact Inquiry — ${inquiryType}`;

  const listingDetails = [
    ["Listing reference", resolvedListingReference],
    ["Selected listing", listingRequested],
    ["County", listingCounty],
    ["License type", licenseType],
    ["Asking price", askingPrice],
    ["Listing status", listingStatus],
    ["Listing page", resolvedListingUrl],
  ].filter(([, detail]) => Boolean(detail));

  const textListingDetails = listingDetails.length
    ? `\nSelected license details:\n${listingDetails.map(([label, detail]) => `${label}: ${detail}`).join("\n")}\n`
    : "";

  const text = `A new confidential inquiry was submitted through Florida Liquor License Market.\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nInquiry type: ${inquiryType}\nPreferred county: ${preferredCounty || "Not selected"}\n${textListingDetails}\nMessage:\n${message}`;

  const listingRows = listingDetails
    .map(([label, detail]) => {
      const displayedDetail = label === "Listing page" && resolvedListingUrl
        ? `<a href="${escapeHtml(resolvedListingUrl)}">${escapeHtml(resolvedListingUrl)}</a>`
        : escapeHtml(detail);
      return `<tr><td style="padding:7px 10px;border-bottom:1px solid #d9dee2;color:#596674;font-size:12px;font-weight:700;">${escapeHtml(label)}</td><td style="padding:7px 10px;border-bottom:1px solid #d9dee2;color:#071a3a;font-size:13px;font-weight:700;">${displayedDetail}</td></tr>`;
    })
    .join("");

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f6f7;font-family:Arial,Helvetica,sans-serif;color:#071a3a;">
    <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #d6dde2;border-top:5px solid #f6a700;padding:24px;">
      <div style="margin-bottom:20px;color:#f1a600;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;">Florida Liquor License Market</div>
      <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.15;">${resolvedListingReference ? "Specific License Inquiry" : "New Confidential Inquiry"}</h1>
      <p style="margin:0 0 18px;line-height:1.65;"><strong>Name:</strong> ${escapeHtml(fullName)}<br><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}<br><strong>Inquiry type:</strong> ${escapeHtml(inquiryType)}<br><strong>Preferred county:</strong> ${escapeHtml(preferredCounty || "Not selected")}</p>
      ${listingRows ? `<h2 style="margin:24px 0 10px;font-size:17px;">Selected License Details</h2><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #d9dee2;border-collapse:collapse;">${listingRows}</table>` : ""}
      <h2 style="margin:24px 0 8px;font-size:17px;">Message</h2>
      <p style="margin:0;white-space:pre-wrap;line-height:1.7;">${escapeHtml(message)}</p>
    </div>
  </body></html>`;

  let fllmNotificationFailed = false;
  let sellerDeliveryFailed = false;
  let buyerDeliveryFailed = false;

  try {
    await sendFllmEmail({
      to: contactRecipient(),
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch (notificationError) {
    fllmNotificationFailed = true;
    console.error("Contact inquiry notification failed", notificationError);
  }

  if (approvedSellerSubmission) {
    try {
      await sendBuyerInquiryToApprovedSeller({
        buyerName: fullName,
        buyerEmail: email,
        buyerPhone: phone,
        inquiryType,
        message,
        submission: approvedSellerSubmission,
      });
    } catch (sellerDeliveryError) {
      sellerDeliveryFailed = true;
      console.error("Buyer inquiry delivery to approved seller failed", sellerDeliveryError);
    }

    try {
      await sendApprovedSellerContactToBuyer({
        buyerName: fullName,
        buyerEmail: email,
        submission: approvedSellerSubmission,
      });
    } catch (buyerDeliveryError) {
      buyerDeliveryFailed = true;
      console.error("Approved seller contact delivery failed", buyerDeliveryError);
    }
  }

  let fallbackDelivered = false;
  if (fllmNotificationFailed || sellerDeliveryFailed || buyerDeliveryFailed) {
    const fallbackCc: string[] = [];
    if (sellerDeliveryFailed && approvedSellerSubmission?.email) {
      fallbackCc.push(approvedSellerSubmission.email);
    }
    if (buyerDeliveryFailed && approvedSellerSubmission) {
      fallbackCc.push(email);
    }

    try {
      await sendFormSubmitInquiryFallback({
        request,
        fullName,
        buyerEmail: email,
        phone,
        inquiryType,
        preferredCounty,
        message,
        subject,
        listingReference: resolvedListingReference,
        listingRequested,
        listingCounty,
        licenseType,
        askingPrice,
        listingStatus,
        listingUrl: resolvedListingUrl,
        ccRecipients: fallbackCc,
        sellerName: approvedSellerSubmission?.fullName,
        sellerEmail: approvedSellerSubmission?.email,
        sellerPhone: approvedSellerSubmission?.phone,
      });
      fallbackDelivered = true;
    } catch (fallbackError) {
      console.error("Inquiry fallback delivery failed", fallbackError);
    }
  }

  const browserFallbackCc = Array.from(new Set([
    ...(sellerDeliveryFailed && approvedSellerSubmission?.email
      ? [approvedSellerSubmission.email]
      : []),
    ...(buyerDeliveryFailed ? [email] : []),
  ]));
  const browserFallbackSellerContact = approvedSellerSubmission
    ? {
        name: approvedSellerSubmission.fullName,
        email: approvedSellerSubmission.email,
        phone: approvedSellerSubmission.phone,
      }
    : null;

  if (sellerDeliveryFailed && !fallbackDelivered) {
    return NextResponse.json(
      { error: "Your inquiry was received, but the seller notification email could not be delivered. Please try again.", fallbackCc: browserFallbackCc, fallbackSellerContact: browserFallbackSellerContact },
      { status: 502 },
    );
  }

  if (buyerDeliveryFailed && !fallbackDelivered) {
    return NextResponse.json(
      { error: "Your inquiry was received, but the seller contact email could not be delivered. Please try again.", fallbackCc: browserFallbackCc, fallbackSellerContact: browserFallbackSellerContact },
      { status: 502 },
    );
  }

  if (fllmNotificationFailed && !fallbackDelivered) {
    // The contact-page client still has its own browser-side FormSubmit fallback
    // as a final administrative copy if both server delivery paths fail.
    return NextResponse.json(
      { error: "Primary FLLM notification service is unavailable.", fallbackCc: browserFallbackCc, fallbackSellerContact: browserFallbackSellerContact },
      { status: 429 },
    );
  }

  return NextResponse.json({
    ok: true,
    sellerNotified: Boolean(approvedSellerSubmission),
    sellerContactDelivered: Boolean(approvedSellerSubmission),
    deliveryMode: fallbackDelivered ? "fallback" : "primary",
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("maildiag") !== "fllm-91c7") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const env = {
    clientId: Boolean(process.env.GOOGLE_CLIENT_ID),
    clientSecret: Boolean(process.env.GOOGLE_CLIENT_SECRET),
    refreshToken: Boolean(process.env.GOOGLE_REFRESH_TOKEN),
    sender: process.env.GOOGLE_SENDER_EMAIL || null,
  };

  try {
    const result = await sendFllmEmail({
      to: "jwigg023@gmail.com",
      subject: "FLLM production mail diagnostic — no action required",
      text: "One-time FLLM production mail diagnostic.",
      html: "<p>One-time FLLM production mail diagnostic.</p>",
    });
    return NextResponse.json({ diag: "fllm-91c7", ok: true, env, result });
  } catch (error) {
    return NextResponse.json({
      diag: "fllm-91c7",
      ok: false,
      env,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    if (value(formData, "_honey", 200)) {
      return NextResponse.json({ ok: true });
    }

    if (!isBuyerOffer(formData)) {
      return submitContactInquiry(request, formData);
    }

    if (!formData.get("non_binding_acknowledgment")) {
      return NextResponse.json({ error: "Please accept the offer acknowledgment." }, { status: 400 });
    }

    const lead = await createBuyerLead({
      fullName: value(formData, "name", 160),
      email: value(formData, "email", 254),
      phone: value(formData, "phone", 60),
      listingReference: value(formData, "listing_reference", 100),
      listingRequested: value(formData, "listing_requested", 300),
      offerAmountText: value(formData, "offer_amount", 60),
      purchaseMethod: value(formData, "purchase_method", 160),
      targetClosing: value(formData, "target_closing", 120),
      proofOfFunds: value(formData, "proof_of_funds", 160),
      offerExpiration: value(formData, "offer_expiration", 40),
      contingencies: value(formData, "contingencies", 5000),
      message: value(formData, "message", 5000),
    });

    try {
      await notifyFllmOfBuyerOffer(lead);
    } catch (notificationError) {
      console.error("Buyer lead notification failed", notificationError);
    }

    return NextResponse.json({ ok: true, leadReference: lead.submissionRef });
  } catch (error) {
    console.error("Inquiry capture failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit inquiry." },
      { status: 500 },
    );
  }
}
