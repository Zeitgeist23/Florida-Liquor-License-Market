import "server-only";

import type { StripeCheckoutSession } from "@/lib/stripe-listing-checkout";
import {
  PRELIMINARY_MARKET_REPORT_PRICE_CENTS,
  type PreliminaryMarketReportOrder,
} from "@/lib/preliminary-market-report";

function siteUrl(requestUrl?: string) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.FLLM_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  if (requestUrl) return new URL(requestUrl).origin;
  return "https://www.floridaliquorlicensemarket.com";
}

export async function createPreliminaryMarketReportCheckoutSession(
  order: PreliminaryMarketReportOrder,
  requestUrl?: string,
) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    throw new Error("Secure report checkout is temporarily unavailable. Please contact FLLM for assistance.");
  }

  const origin = siteUrl(requestUrl);
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("client_reference_id", order.submissionRef);
  params.set("customer_email", order.email);
  params.set(
    "success_url",
    `${origin}/preliminary-market-report/success?session_id={CHECKOUT_SESSION_ID}`,
  );
  params.set(
    "cancel_url",
    `${origin}/florida-liquor-license-value?report_payment=cancelled&report_ref=${encodeURIComponent(order.submissionRef)}`,
  );
  params.set("metadata[submission_ref]", order.submissionRef);
  params.set("metadata[submission_id]", order.id);
  params.set("metadata[product_kind]", "preliminary_market_report");
  params.set("metadata[county]", order.county);
  params.set("metadata[license_type]", order.licenseType);
  params.set("metadata[license_number]", order.licenseNumber);
  params.set("payment_intent_data[receipt_email]", order.email);

  const priceId = process.env.STRIPE_MARKET_REPORT_PRICE_ID;
  if (priceId) {
    params.set("line_items[0][price]", priceId);
  } else {
    params.set("line_items[0][price_data][currency]", "usd");
    params.set(
      "line_items[0][price_data][unit_amount]",
      String(PRELIMINARY_MARKET_REPORT_PRICE_CENTS),
    );
    params.set(
      "line_items[0][price_data][product_data][name]",
      "Preliminary Florida Liquor License Market Report",
    );
    params.set(
      "line_items[0][price_data][product_data][description]",
      "Manual FLLM research of a specific Florida quota liquor license, including available DBPR records, county market comparables, and available transaction evidence. Not a certified appraisal.",
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
    throw new Error(payload.error?.message || `Stripe checkout failed with status ${response.status}.`);
  }

  return payload;
}
