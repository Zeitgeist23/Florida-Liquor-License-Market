import { NextResponse } from "next/server";

import {
  createListingSubmission,
  markCheckoutFailed,
  attachCheckoutSession,
  getSubmissionByCheckoutSession,
} from "@/lib/listing-submission-store";
import { createListingCheckoutSession } from "@/lib/stripe-listing-checkout";

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
  honey?: string;
};

function accepted(value: boolean | string | undefined) {
  return value === true || value === "true" || value === "Certified" || value === "Accepted";
}

export async function POST(request: Request) {
  let submissionId: string | null = null;
  try {
    const body = (await request.json()) as RequestBody;

    if (body.honey) {
      return NextResponse.json({ ok: true, checkoutUrl: "/" });
    }
    if (!accepted(body.seller_certification) || !accepted(body.fee_agreement)) {
      return NextResponse.json(
        { error: "Please accept both seller certifications before continuing." },
        { status: 400 }
      );
    }

    const submission = await createListingSubmission({
      fullName: body.name ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      county: body.county ?? "",
      licenseType: body.license_type ?? "",
      askingPriceText: body.asking_price,
      licenseStatus: body.license_status ?? "",
      preferredTiming: body.preferred_timing,
      message: body.message,
    });
    submissionId = submission.id;

    const checkout = await createListingCheckoutSession(submission, request.url);
    await attachCheckoutSession(submission.id, checkout.id);

    return NextResponse.json({
      ok: true,
      submissionRef: submission.submissionRef,
      checkoutUrl: checkout.url,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create secure checkout.";
    if (submissionId) {
      try {
        await markCheckoutFailed(submissionId, message);
      } catch (markError) {
        console.error("Could not mark listing checkout as failed", markError);
      }
    }
    console.error("Listing submission checkout failed", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const sessionId = new URL(request.url).searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ error: "Missing checkout session." }, { status: 400 });
    }
    const submission = await getSubmissionByCheckoutSession(sessionId);
    if (!submission) {
      return NextResponse.json({ status: "processing" });
    }
    return NextResponse.json({
      status: submission.status,
      submissionRef: submission.submissionRef,
      paymentEmailStatus: submission.paymentEmailStatus,
    });
  } catch (error) {
    console.error("Could not read listing submission status", error);
    return NextResponse.json({ status: "processing" });
  }
}
