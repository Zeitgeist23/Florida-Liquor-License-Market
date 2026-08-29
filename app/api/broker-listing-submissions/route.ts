import { NextResponse } from "next/server";
import { randomBytes, randomUUID } from "node:crypto";

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

function values(form: FormData, key: string, maxLength = 5000) {
  return form
    .getAll(key)
    .map((item) => String(item).trim())
    .filter(Boolean)
    .join(", ")
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
    paymentLink:
      process.env.STRIPE_LISTING_PAYMENT_LINK ||
      "https://buy.stripe.com/00w00b8vbgUd3ml5mZebu04",
  },
  featured: {
    label: "Featured Broker Listing",
    unitAmount: 2495,
    description:
      "Featured badge, prominent broker contact display and 30 days of priority marketplace placement after publication.",
    paymentLink:
      process.env.STRIPE_FEATURED_LISTING_PAYMENT_LINK ||
      "https://buy.stripe.com/5kQ00bdPv5bv4qpbLnebu05",
  },
} as const;

function emergencySubmissionRef() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `FLLM-PAID-${date}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  let submissionId: string | null = null;
  let stage = "reading the broker listing form";
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
    const contactPreference = values(form, "contact_preference", 500);
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
    stage = "storing the optional supporting document";
    const storedDocument =
      document instanceof File && document.size
        ? await uploadBrokerListingDocument(document)
        : null;

    const fullName = value(form, "name", 160);
    const email = value(form, "email", 254).toLowerCase();
    const phone = value(form, "phone", 60);
    const county = value(form, "county", 100);
    const licenseType = value(form, "license_type", 100);
    const askingPriceText = value(form, "asking_price", 60);
    const licenseStatus = value(form, "license_status", 120);
    const preferredTiming = value(form, "preferred_timing", 120);
    if (
      !fullName ||
      !email ||
      !phone ||
      !county ||
      !licenseType ||
      !licenseStatus
    ) {
      return NextResponse.json(
        { error: "Please complete all required broker and license fields." },
        { status: 400 },
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

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

    const submissionInput = {
      fullName,
      email,
      phone,
      county,
      licenseType,
      askingPriceText,
      licenseStatus,
      preferredTiming,
      message: notes.join("\n\n"),
      requiresPayment: true,
    };
    stage = "saving the broker listing";
    let databaseSaved = true;
    let submission;
    try {
      submission = await createListingSubmission(submissionInput);
      submissionId = submission.id;
    } catch (databaseError) {
      if (
        !(databaseError instanceof Error) ||
        databaseError.message !== "fetch failed"
      ) {
        throw databaseError;
      }
      databaseSaved = false;
      submission = {
        id: randomUUID(),
        submissionRef: emergencySubmissionRef(),
        email,
        county,
        licenseType,
      };
      console.warn("Broker listing will be recovered from Stripe metadata", {
        submissionRef: submission.submissionRef,
        error: databaseError.message,
      });
    }

    stage = "opening secure Stripe Checkout";
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
          recovery_version: "broker_v1",
          database_saved: String(databaseSaved),
          full_name: fullName.slice(0, 500),
          email: email.slice(0, 500),
          phone: phone.slice(0, 500),
          county: county.slice(0, 500),
          license_type: licenseType.slice(0, 500),
          asking_price_text: askingPriceText.slice(0, 500),
          license_status: licenseStatus.slice(0, 500),
          preferred_timing: preferredTiming.slice(0, 500),
          brokerage_name: brokerageName.slice(0, 500),
          broker_license: value(form, "broker_license_number", 100).slice(
            0,
            500,
          ),
          brokerage_website: value(form, "brokerage_website", 300).slice(
            0,
            500,
          ),
          contact_preference: contactPreference.slice(0, 500),
          license_number: value(form, "license_number", 100).slice(0, 500),
          license_visibility: value(
            form,
            "license_number_visibility",
            100,
          ).slice(0, 500),
          broker_notes: additional.slice(0, 500),
          document_path: storedDocument?.objectPath.slice(0, 500) || "",
        },
        paymentLink: listingTier.paymentLink,
      },
    );
    // Do not strand the customer on this page after Stripe has already created
    // a valid Checkout Session. The webhook can reconcile the real session ID
    // from submission_ref after payment even if this nonessential PATCH has a
    // transient database/network failure.
    try {
      if (databaseSaved)
        await attachCheckoutSession(submission.id, checkout.id);
    } catch (attachError) {
      console.warn(
        "Broker checkout session attachment will be reconciled by webhook",
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
        : "The broker listing could not be submitted.";
    if (submissionId) {
      try {
        await markCheckoutFailed(submissionId, message);
      } catch (markError) {
        console.error("Could not mark broker checkout as failed", markError);
      }
    }
    console.error("Broker listing submission failed", { stage, error });
    const customerMessage =
      message === "fetch failed"
        ? stage === "opening secure Stripe Checkout"
          ? "Stripe could not be reached. Please try again; no payment was processed."
          : "The listing service could not be reached. Please try again."
        : message;
    return NextResponse.json({ error: customerMessage }, { status: 500 });
  }
}
