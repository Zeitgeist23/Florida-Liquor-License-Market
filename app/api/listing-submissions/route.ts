import { NextResponse } from "next/server";
import { randomBytes, randomUUID } from "node:crypto";

import {
  createListingSubmission,
  markCheckoutFailed,
  attachCheckoutSession,
  getSubmissionByCheckoutSession,
} from "@/lib/listing-submission-store";
import { createListingCheckoutSession } from "@/lib/stripe-listing-checkout";
import { listingPaymentDetails } from "@/lib/listing-payment-details";
import {
  notifyFllmOfBrokerConsultation,
  sendBrokerConsultationAcknowledgement,
} from "@/lib/fllm-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  county?: string;
  license_type?: string;
  asking_price?: string;
  license_status?: string;
  preferred_timing?: string;
  message?: string;
  seller_certification?: boolean | string;
  fee_agreement?: boolean | string;
  sale_method?: string;
  listing_tier?: string;
  honey?: string;
};

const selfDirectedListingOptions = {
  standard: {
    label: "Standard Self-Directed Listing",
    unitAmount: 1495,
    description:
      "Standard self-directed marketplace publication after FLLM review.",
    paymentLink: "https://buy.stripe.com/5kQ7sD8vb8nHcWVdTvebu00",
  },
  featured: {
    label: "Featured Self-Directed Listing",
    unitAmount: 2495,
    description:
      "Featured badge and 30 days of priority marketplace placement after publication, followed by continued Standard listing status until sold or withdrawn.",
    paymentLink:
      process.env.STRIPE_FEATURED_LISTING_PAYMENT_LINK ||
      "https://buy.stripe.com/5kQ00bdPv5bv4qpbLnebu05",
  },
} as const;

function accepted(value: boolean | string | undefined) {
  return (
    value === true ||
    value === "true" ||
    value === "Certified" ||
    value === "Accepted"
  );
}

function emergencySubmissionRef() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `FLLM-PAID-${date}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  let submissionId: string | null = null;
  let stage = "reading the seller listing form";
  try {
    const body = (await request.json()) as RequestBody;

    if (body.honey) {
      return NextResponse.json({ ok: true, checkoutUrl: "/" });
    }
    const brokerAssisted = body.sale_method === "Broker-Assisted Listing";
    if (
      !accepted(body.seller_certification) ||
      (!brokerAssisted && !accepted(body.fee_agreement))
    ) {
      return NextResponse.json(
        {
          error: brokerAssisted
            ? "Please accept the seller certification before requesting a consultation."
            : "Please accept both seller certifications before continuing.",
        },
        { status: 400 },
      );
    }

    const listingTierKey = body.listing_tier === "featured" ? "featured" : "standard";
    const listingTier = selfDirectedListingOptions[listingTierKey];
    const sellerMessage = brokerAssisted
      ? body.message
      : [
          `Listing option: ${listingTier.label} — $${(listingTier.unitAmount / 100).toFixed(2)}`,
          `Marketplace treatment: ${listingTier.description}`,
          body.message || "",
        ]
          .filter(Boolean)
          .join("\n\n");

    const submissionInput = {
      fullName: body.name ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      county: body.county ?? "",
      licenseType: body.license_type ?? "",
      askingPriceText: body.asking_price,
      licenseStatus: body.license_status ?? "",
      preferredTiming: body.preferred_timing,
      message: sellerMessage,
      requiresPayment: !brokerAssisted,
    };

    stage = "saving the seller listing";
    let databaseSaved = true;
    let submission;
    try {
      submission = await createListingSubmission(submissionInput);
      submissionId = submission.id;
    } catch (databaseError) {
      if (
        brokerAssisted ||
        !(databaseError instanceof Error) ||
        databaseError.message !== "fetch failed"
      ) {
        throw databaseError;
      }
      databaseSaved = false;
      submission = {
        id: randomUUID(),
        submissionRef: emergencySubmissionRef(),
        email: submissionInput.email,
        county: submissionInput.county,
        licenseType: submissionInput.licenseType,
      };
      console.warn("Seller listing will be recovered from Stripe metadata", {
        submissionRef: submission.submissionRef,
        error: databaseError.message,
      });
    }

    if (brokerAssisted) {
      const savedSubmission = submission as Awaited<
        ReturnType<typeof createListingSubmission>
      >;
      try {
        await notifyFllmOfBrokerConsultation(savedSubmission);
      } catch (notificationError) {
        console.error(
          "Broker consultation notification failed",
          notificationError,
        );
      }
      try {
        await sendBrokerConsultationAcknowledgement(savedSubmission);
      } catch (acknowledgementError) {
        console.error(
          "Broker consultation acknowledgement failed",
          acknowledgementError,
        );
      }

      return NextResponse.json({
        ok: true,
        submissionRef: savedSubmission.submissionRef,
        consultationRequested: true,
      });
    }

    stage = "opening secure Stripe Checkout";
    const checkout = await createListingCheckoutSession(
      submission,
      request.url,
      "/sell-your-license?payment=cancelled",
      {
        unitAmount: listingTier.unitAmount,
        productName: `FLLM ${listingTier.label}`,
        productDescription: listingTier.description,
        paymentLink: databaseSaved ? listingTier.paymentLink : undefined,
        metadata: {
          listing_tier: listingTierKey,
          listing_price: String(listingTier.unitAmount),
          recovery_version: "self_v1",
          database_saved: String(databaseSaved),
          full_name: submissionInput.fullName.slice(0, 500),
          email: submissionInput.email.slice(0, 500),
          phone: submissionInput.phone.slice(0, 500),
          county: submissionInput.county.slice(0, 500),
          license_type: submissionInput.licenseType.slice(0, 500),
          asking_price_text: (submissionInput.askingPriceText || "").slice(0, 500),
          license_status: submissionInput.licenseStatus.slice(0, 500),
          preferred_timing: (submissionInput.preferredTiming || "").slice(0, 500),
          seller_notes: (submissionInput.message || "").slice(0, 500),
        },
      },
    );
    try {
      if (databaseSaved)
        await attachCheckoutSession(submission.id, checkout.id);
    } catch (attachError) {
      console.warn(
        "Seller checkout session attachment will be reconciled by webhook",
        {
          submissionRef: submission.submissionRef,
          checkoutSessionId: checkout.id,
          error:
            attachError instanceof Error
              ? attachError.message
              : String(attachError),
        },
      );
    }

    return NextResponse.json({
      ok: true,
      submissionRef: submission.submissionRef,
      checkoutUrl: checkout.url,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create secure checkout.";
    if (submissionId) {
      try {
        await markCheckoutFailed(submissionId, message);
      } catch (markError) {
        console.error("Could not mark listing checkout as failed", markError);
      }
    }
    console.error("Listing submission checkout failed", { stage, error });
    const customerMessage =
      message === "fetch failed"
        ? stage === "opening secure Stripe Checkout"
          ? "Stripe could not be reached. Please try again; no payment was processed."
          : "The listing service could not be reached. Please try again."
        : message;
    return NextResponse.json({ error: customerMessage }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const sessionId = new URL(request.url).searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing checkout session." },
        { status: 400 },
      );
    }
    const submission = await getSubmissionByCheckoutSession(sessionId);
    if (!submission) {
      return NextResponse.json({ status: "processing" });
    }
    const payment = listingPaymentDetails(submission.message);
    return NextResponse.json({
      status: submission.status,
      submissionRef: submission.submissionRef,
      paymentEmailStatus: submission.paymentEmailStatus,
      listingTier: payment.tier,
      listingTierLabel: payment.tierLabel,
      paymentAmount: payment.amountLabel,
    });
  } catch (error) {
    console.error("Could not read listing submission status", error);
    return NextResponse.json({ status: "processing" });
  }
}
