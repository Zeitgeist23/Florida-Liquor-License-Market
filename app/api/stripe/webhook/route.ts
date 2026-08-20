import { NextResponse } from "next/server";

import { sendPaymentReceivedEmail } from "@/lib/fllm-email";
import {
  isPreliminaryMarketReportOrder,
  sendPreliminaryMarketReportPaymentEmails,
} from "@/lib/preliminary-market-report";
import {
  claimPaymentEmail,
  finishPaymentEmail,
  markSubmissionPaid,
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
  const submissionRef =
    session.metadata?.submission_ref || session.client_reference_id || "";
  if (!submissionRef) throw new Error("Stripe session is missing the submission reference.");

  const submission = await markSubmissionPaid({
    submissionRef,
    checkoutSessionId: session.id,
    paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
    customerEmail: session.customer_details?.email || session.customer_email || null,
  });

  const claimed = await claimPaymentEmail(submission.id);
  if (!claimed) return;

  try {
    if (isPreliminaryMarketReportOrder(claimed)) {
      await sendPreliminaryMarketReportPaymentEmails(claimed);
    } else {
      await sendPaymentReceivedEmail(claimed);
    }
    await finishPaymentEmail(claimed.id, true);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment confirmation email failed.";
    await finishPaymentEmail(claimed.id, false, message);
    console.error("Payment confirmation email failed", error);
  }
}

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  try {
    if (!verifyStripeWebhookSignature(payload, signature)) {
      return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
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
      { error: error instanceof Error ? error.message : "Webhook processing failed." },
      { status: 500 },
    );
  }
}
