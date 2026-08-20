import { NextResponse } from "next/server";

import {
  createPreliminaryMarketReportOrder,
} from "@/lib/preliminary-market-report";
import {
  attachCheckoutSession,
  getSubmissionByCheckoutSession,
  markCheckoutFailed,
} from "@/lib/listing-submission-store";
import { createPreliminaryMarketReportCheckoutSession } from "@/lib/stripe-market-report-checkout";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  county?: string;
  license_type?: string;
  license_number?: string;
  current_holder_of_record?: string;
  license_status?: string;
  preferred_timing?: string;
  relationship?: string;
  purpose?: string;
  notes?: string;
  terms_accepted?: boolean | string;
  estimate?: {
    count?: number;
    low?: number | null;
    median?: number | null;
    high?: number | null;
    typicalLow?: number | null;
    typicalHigh?: number | null;
    confidence?: string;
    generatedAt?: string;
  };
};

function accepted(value: boolean | string | undefined) {
  return value === true || value === "true" || value === "Accepted";
}

function amount(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error || "Unknown error");
}

function isTransientFetchFailure(error: unknown) {
  return /fetch failed|failed to fetch|networkerror|econnreset|etimedout|socket hang up/i.test(errorMessage(error));
}

async function retryTransient<T>(task: () => Promise<T>, label: string): Promise<T> {
  try {
    return await task();
  } catch (error) {
    if (!isTransientFetchFailure(error)) throw error;
    console.warn(`${label} failed on first attempt; retrying once`, error);
    await new Promise((resolve) => setTimeout(resolve, 350));
    return task();
  }
}

export async function POST(request: Request) {
  let orderId: string | null = null;
  try {
    const body = (await request.json()) as RequestBody;

    if (!accepted(body.terms_accepted)) {
      return NextResponse.json(
        { error: "Please acknowledge the preliminary market report terms before continuing." },
        { status: 400 },
      );
    }

    const estimate = body.estimate ?? {};
    const createOrder = () => createPreliminaryMarketReportOrder({
      fullName: body.name ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      county: body.county ?? "",
      licenseType: body.license_type ?? "",
      licenseStatus: body.license_status ?? "",
      preferredTiming: body.preferred_timing ?? "",
      licenseNumber: body.license_number ?? "",
      currentHolderOfRecord: body.current_holder_of_record,
      relationship: body.relationship ?? "",
      purpose: body.purpose ?? "",
      notes: body.notes,
      estimate: {
        count: typeof estimate.count === "number" ? estimate.count : 0,
        low: amount(estimate.low),
        median: amount(estimate.median),
        high: amount(estimate.high),
        typicalLow: amount(estimate.typicalLow),
        typicalHigh: amount(estimate.typicalHigh),
        confidence: estimate.confidence ?? "unavailable",
        generatedAt: estimate.generatedAt ?? new Date().toISOString(),
      },
    });

    const order = await retryTransient(createOrder, "Market report order save");
    orderId = order.id;

    const checkout = await retryTransient(
      () => createPreliminaryMarketReportCheckoutSession(order, request.url),
      "Stripe report checkout",
    );

    // A temporary database update failure should not prevent a customer from
    // reaching a valid Stripe Checkout session. The order reference is already
    // stored before the checkout is created and Stripe also receives it as
    // client_reference_id and metadata.
    try {
      await retryTransient(
        () => attachCheckoutSession(order.id, checkout.id),
        "Checkout session attachment",
      );
    } catch (attachError) {
      console.error("Could not attach checkout session before redirect", attachError);
    }

    return NextResponse.json({
      ok: true,
      orderReference: order.submissionRef,
      checkoutUrl: checkout.url,
    });
  } catch (error) {
    const rawMessage = errorMessage(error);
    const message = isTransientFetchFailure(error)
      ? "Secure checkout could not be reached. Please try again in a moment."
      : rawMessage || "Unable to create the preliminary market report order.";

    if (orderId) {
      try {
        await markCheckoutFailed(orderId, rawMessage);
      } catch (markError) {
        console.error("Could not mark preliminary market report checkout as failed", markError);
      }
    }
    console.error("Preliminary market report checkout failed", error);
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
    if (!submission) return NextResponse.json({ status: "processing" });

    return NextResponse.json({
      status: submission.status,
      orderReference: submission.submissionRef,
      paymentEmailStatus: submission.paymentEmailStatus,
    });
  } catch (error) {
    console.error("Could not read preliminary market report order status", error);
    return NextResponse.json({ status: "processing" });
  }
}
