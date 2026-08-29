import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import type { ListingSubmission } from "@/lib/listing-submission-store";

export type StripeCheckoutSession = {
  id: string;
  url: string | null;
  payment_status?: "paid" | "unpaid" | "no_payment_required";
  client_reference_id?: string | null;
  metadata?: Record<string, string> | null;
  payment_intent?: string | null;
  customer_email?: string | null;
  customer_details?: { email?: string | null } | null;
};

type ListingCheckoutOptions = {
  unitAmount?: number;
  productName?: string;
  productDescription?: string;
  metadata?: Record<string, string>;
  paymentLink?: string;
};

const ACTIVE_LISTING_PAYMENT_LINK =
  "https://buy.stripe.com/5kQ7sD8vb8nHcWVdTvebu00";

function siteUrl(requestUrl?: string) {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.FLLM_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  if (requestUrl) return new URL(requestUrl).origin;
  return "https://www.floridaliquorlicensemarket.com";
}

export async function createListingCheckoutSession(
  submission: ListingSubmission,
  requestUrl?: string,
  cancelPath = "/sell-your-license?payment=cancelled",
  options: ListingCheckoutOptions = {},
) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    if (options.unitAmount && !options.paymentLink) {
      throw new Error(
        "Secure checkout is temporarily unavailable for this listing option.",
      );
    }
    const paymentLink = new URL(
      options.paymentLink ||
        process.env.STRIPE_LISTING_PAYMENT_LINK ||
        ACTIVE_LISTING_PAYMENT_LINK,
    );
    paymentLink.searchParams.set(
      "client_reference_id",
      submission.submissionRef,
    );

    return {
      id: `payment_link_${submission.submissionRef}`,
      url: paymentLink.toString(),
      client_reference_id: submission.submissionRef,
    } satisfies StripeCheckoutSession;
  }

  const origin = siteUrl(requestUrl);
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("client_reference_id", submission.submissionRef);
  params.set("customer_email", submission.email);
  params.set(
    "success_url",
    `${origin}/listing-submission/success?session_id={CHECKOUT_SESSION_ID}`,
  );
  params.set(
    "cancel_url",
    `${origin}${cancelPath}${cancelPath.includes("?") ? "&" : "?"}submission_ref=${encodeURIComponent(submission.submissionRef)}`,
  );
  params.set("metadata[submission_ref]", submission.submissionRef);
  params.set("metadata[submission_id]", submission.id);
  params.set("metadata[county]", submission.county);
  params.set("metadata[license_type]", submission.licenseType);
  for (const [key, value] of Object.entries(options.metadata || {})) {
    params.set(`metadata[${key}]`, value);
  }
  params.set("payment_intent_data[receipt_email]", submission.email);

  const priceId = process.env.STRIPE_LISTING_PRICE_ID;
  if (priceId && !options.unitAmount) {
    params.set("line_items[0][price]", priceId);
  } else {
    params.set("line_items[0][price_data][currency]", "usd");
    params.set(
      "line_items[0][price_data][unit_amount]",
      String(options.unitAmount || 1495),
    );
    params.set(
      "line_items[0][price_data][product_data][name]",
      options.productName || "Florida Liquor License Market Listing Submission",
    );
    params.set(
      "line_items[0][price_data][product_data][description]",
      options.productDescription ||
        "One-time listing-submission fee. Publication follows payment matching and marketplace review.",
    );
  }
  params.set("line_items[0][quantity]", "1");

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
    cache: "no-store",
  });

  const payload = (await response.json()) as StripeCheckoutSession & {
    error?: { message?: string };
  };

  if (!response.ok || !payload.id || !payload.url) {
    throw new Error(
      payload.error?.message ||
        `Stripe checkout failed with status ${response.status}.`,
    );
  }

  return payload;
}

export function verifyStripeWebhookSignature(
  payload: string,
  signatureHeader: string | null,
) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not configured.");
  if (!signatureHeader) return false;

  const fields = signatureHeader
    .split(",")
    .map((part) => part.trim().split("="));
  const timestamp = fields.find(([key]) => key === "t")?.[1];
  const signatures = fields
    .filter(([key]) => key === "v1")
    .map(([, value]) => value);
  if (!timestamp || signatures.length === 0) return false;

  const unixSeconds = Number(timestamp);
  if (!Number.isFinite(unixSeconds)) return false;
  if (Math.abs(Date.now() / 1000 - unixSeconds) > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`, "utf8")
    .digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  return signatures.some((candidate) => {
    try {
      const candidateBuffer = Buffer.from(candidate, "hex");
      return (
        candidateBuffer.length === expectedBuffer.length &&
        timingSafeEqual(candidateBuffer, expectedBuffer)
      );
    } catch {
      return false;
    }
  });
}
