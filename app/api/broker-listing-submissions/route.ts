import { NextResponse } from "next/server";

import { uploadBrokerListingDocument } from "@/lib/broker-listing-documents";
import {
  createListingSubmission,
  markCheckoutFailed,
  attachCheckoutSession,
} from "@/lib/listing-submission-store";
import { createListingCheckoutSession } from "@/lib/stripe-listing-checkout";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function value(form: FormData, key: string, maxLength = 5000) {
  return String(form.get(key) || "")
    .trim()
    .slice(0, maxLength);
}

function accepted(form: FormData, key: string) {
  return value(form, key, 30) === "Accepted";
}

const listingOptions = {
  standard: {
    label: "Standard Broker Listing",
    unitAmount: 1495,
    description: "Standard marketplace publication after review.",
    paymentLink: process.env.STRIPE_LISTING_PAYMENT_LINK,
  },
  featured: {
    label: "Featured Broker Listing",
    unitAmount: 2495,
    description:
      "Featured badge and 30 days of priority marketplace placement after publication.",
    paymentLink: process.env.STRIPE_FEATURED_LISTING_PAYMENT_LINK,
  },
} as const;

export async function POST(request: Request) {
  let submissionId: string | null = null;
  try {
    const form = await request.formData();
    if (value(form, "_honey", 200))
      return NextResponse.json({ ok: true, checkoutUrl: "/" });

    const certifications = [
      "authority_certification",
      "accuracy_certification",
      "marketplace_acknowledgment",
      "fee_agreement",
    ];
    if (!certifications.every((key) => accepted(form, key))) {
      return NextResponse.json(
        { error: "Please accept all broker certifications before continuing." },
        { status: 400 },
      );
    }

    const brokerageName = value(form, "brokerage_name", 180);
    const contactPreference = value(form, "contact_preference", 120);
    if (!brokerageName || !contactPreference) {
      return NextResponse.json(
        {
          error:
            "Please complete the required brokerage and inquiry-routing fields.",
        },
        { status: 400 },
      );
    }

    const listingTierKey = value(form, "listing_tier", 30).toLowerCase();
    if (listingTierKey !== "standard" && listingTierKey !== "featured") {
      return NextResponse.json(
        { error: "Please select a valid broker listing option." },
        { status: 400 },
      );
    }
    const listingTier = listingOptions[listingTierKey];

    const document = form.get("supporting_document");
    const storedDocument =
      document instanceof File && document.size
        ? await uploadBrokerListingDocument(document)
        : null;

    const notes = [
      "Submission type: Independent Broker Marketplace Listing",
      `Listing option: ${listingTier.label} — $${(listingTier.unitAmount / 100).toFixed(2)}`,
      `Marketplace treatment: ${listingTier.description}`,
      `Brokerage: ${brokerageName}`,
      `Broker / registration number: ${value(form, "broker_license_number", 100) || "Not provided"}`,
      `Brokerage website: ${value(form, "brokerage_website", 300) || "Not provided"}`,
      `Buyer inquiry routing: ${contactPreference}`,
      `License number: ${value(form, "license_number", 100) || "Not provided"}`,
      `License-number visibility: ${value(form, "license_number_visibility", 100)}`,
      "Broker authority certification: Accepted",
      "Accuracy and update certification: Accepted",
      "Advertising-only marketplace acknowledgment: Accepted",
      storedDocument
        ? `Private supporting document: ${storedDocument.fileName} (${storedDocument.mimeType}, ${storedDocument.size} bytes) — storage path ${storedDocument.objectPath}`
        : "Private supporting document: Not provided",
    ];
    const additional = value(form, "message", 3500);
    if (additional) notes.push(`Broker notes: ${additional}`);

    const submission = await createListingSubmission({
      fullName: value(form, "name", 160),
      email: value(form, "email", 254),
      phone: value(form, "phone", 60),
      county: value(form, "county", 100),
      licenseType: value(form, "license_type", 100),
      askingPriceText: value(form, "asking_price", 60),
      licenseStatus: value(form, "license_status", 120),
      preferredTiming: value(form, "preferred_timing", 120),
      message: notes.join("\n\n"),
      requiresPayment: true,
    });
    submissionId = submission.id;

    const checkout = await createListingCheckoutSession(
      submission,
      request.url,
      "/brokers/list-your-license?payment=cancelled",
      {
        unitAmount: listingTier.unitAmount,
        productName: `FLLM ${listingTier.label}`,
        productDescription: listingTier.description,
        metadata: {
          listing_tier: listingTierKey,
          listing_price: String(listingTier.unitAmount),
        },
        paymentLink: listingTier.paymentLink,
      },
    );
    await attachCheckoutSession(submission.id, checkout.id);

    return NextResponse.json({
      ok: true,
      submissionRef: submission.submissionRef,
      checkoutUrl: checkout.url,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The broker listing could not be submitted.";
    if (submissionId) {
      try {
        await markCheckoutFailed(submissionId, message);
      } catch (markError) {
        console.error("Could not mark broker checkout as failed", markError);
      }
    }
    console.error("Broker listing submission failed", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
