import { NextResponse } from "next/server";

import { sendPaymentReceivedEmail } from "@/lib/fllm-email";
import {
  isFormalLicenseAppraisalOrder,
  sendFormalLicenseAppraisalPaymentEmails,
} from "@/lib/formal-license-appraisal";
import {
  isPreliminaryMarketReportOrder,
  sendPreliminaryMarketReportPaymentEmails,
} from "@/lib/preliminary-market-report";
import {
  claimPaymentEmail,
  finishPaymentEmail,
  getSubmissionByRef,
  markSubmissionPaid,
  recoverListingSubmission,
} from "@/lib/listing-submission-store";
import {
  type StripeCheckoutSession,
  verifyStripeWebhookSignature,
} from "@/lib/stripe-listing-checkout";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type StripeEvent = {
  id: string;
  type: string;
  data: { object: StripeCheckoutSession };
};

async function processPaidCheckout(session: StripeCheckoutSession) {
  // IRA setup assistance is fulfilled from Stripe's customer details and
  // remains visible in the FLLM Stripe Dashboard. It is not a marketplace
  // submission, so it must not enter the listing/appraisal order workflow.
  const paymentLinkId = (
    session as StripeCheckoutSession & { payment_link?: string | null }
  ).payment_link;
  if (
    session.metadata?.product_type === "ira_setup_assistance" ||
    paymentLinkId === "plink_1U8ORJ1LFXNUhoXjseTCoYmX"
  )
    return;

  const submissionRef =
    session.metadata?.submission_ref || session.client_reference_id || "";
  if (!submissionRef)
    throw new Error("Stripe session is missing the submission reference.");

  let existing = await getSubmissionByRef(submissionRef);
  if (!existing && session.metadata?.recovery_version === "broker_v1") {
    const metadata = session.metadata;
    const recoveryNotes = [
      "Submission type: Independent Broker Marketplace Listing",
      `Listing option: ${metadata.listing_tier === "featured" ? "Featured Broker Listing — $24.95" : "Standard Broker Listing — $14.95"}`,
      `Brokerage: ${metadata.brokerage_name || "Not provided"}`,
      `Broker / registration number: ${metadata.broker_license || "Not provided"}`,
      `Brokerage website: ${metadata.brokerage_website || "Not provided"}`,
      `Buyer inquiry routing: ${metadata.contact_preference || "Not provided"}`,
      `License number: ${metadata.license_number || "Not provided"}`,
      `License-number visibility: ${metadata.license_visibility || "Not provided"}`,
      metadata.document_path
        ? `Private supporting document storage path: ${metadata.document_path}`
        : "Private supporting document: Not provided",
      metadata.broker_notes ? `Broker notes: ${metadata.broker_notes}` : "",
      "Recovered from authenticated Stripe Checkout metadata after a temporary listing-database outage.",
    ].filter(Boolean);
    existing = await recoverListingSubmission({
      submissionRef,
      fullName: metadata.full_name || "",
      email: metadata.email || session.customer_email || "",
      phone: metadata.phone || "",
      county: metadata.county || "",
      licenseType: metadata.license_type || "",
      askingPriceText: metadata.asking_price_text || "",
      licenseStatus: metadata.license_status || "",
      preferredTiming: metadata.preferred_timing || "",
      message: recoveryNotes.join("\n\n"),
      requiresPayment: true,
    });
  }

  const submission = await markSubmissionPaid({
    submissionRef,
    checkoutSessionId: session.id,
    paymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : null,
    customerEmail:
      session.customer_details?.email || session.customer_email || null,
  });

  const claimed = await claimPaymentEmail(submission.id);
  if (!claimed) return;

  try {
    if (isFormalLicenseAppraisalOrder(claimed)) {
      await sendFormalLicenseAppraisalPaymentEmails(claimed);
    } else if (isPreliminaryMarketReportOrder(claimed)) {
      await sendPreliminaryMarketReportPaymentEmails(claimed);
    } else {
      await sendPaymentReceivedEmail(claimed);
    }
    await finishPaymentEmail(claimed.id, true);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Payment confirmation email failed.";
    await finishPaymentEmail(claimed.id, false, message);
    console.error("Payment confirmation email failed", error);
  }
}

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  try {
    if (!verifyStripeWebhookSignature(payload, signature)) {
      return NextResponse.json(
        { error: "Invalid Stripe signature." },
        { status: 400 },
      );
    }

    const event = JSON.parse(payload) as StripeEvent;
    const session = event.data.object;

    if (
      event.type === "checkout.session.completed" &&
      session.payment_status &&
      session.payment_status !== "unpaid"
    ) {
      await processPaidCheckout(session);
    }

    if (event.type === "checkout.session.async_payment_succeeded") {
      await processPaidCheckout(session);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe payment webhook failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Webhook processing failed.",
      },
      { status: 500 },
    );
  }
}
