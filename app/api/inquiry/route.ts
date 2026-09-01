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
      console.error("Buyer inquiry delivery to approved seller failed", sellerDeliveryError);
      return NextResponse.json(
        { error: "Your inquiry was received, but the seller notification email could not be delivered. Please try again." },
        { status: 502 },
      );
    }

    try {
      await sendApprovedSellerContactToBuyer({
        buyerName: fullName,
        buyerEmail: email,
        submission: approvedSellerSubmission,
      });
    } catch (buyerDeliveryError) {
      console.error("Approved seller contact delivery failed", buyerDeliveryError);
      return NextResponse.json(
        { error: "Your inquiry was received, but the seller contact email could not be delivered. Please try again." },
        { status: 502 },
      );
    }
  }

  if (fllmNotificationFailed) {
    // Returning 429 only after the paid-listing routing has been attempted lets
    // the contact-page client send its existing FormSubmit backup copy to FLLM
    // without bypassing seller/buyer delivery.
    return NextResponse.json(
      { error: "Primary FLLM notification service is unavailable." },
      { status: 429 },
    );
  }

  return NextResponse.json({
    ok: true,
    sellerNotified: Boolean(approvedSellerSubmission),
    sellerContactDelivered: Boolean(approvedSellerSubmission),
  });
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
