import "server-only";

import {
  FORMAL_LICENSE_APPRAISAL_PRICE_CENTS,
  type FormalLicenseAppraisalOrder,
} from "@/lib/formal-license-appraisal";
import type { StripeCheckoutSession } from "@/lib/stripe-listing-checkout";

const ACTIVE_FORMAL_APPRAISAL_PAYMENT_LINK =
  "https://buy.stripe.com/7sY14fdPv6fz3ml3eRebu02";

function siteUrl(requestUrl?: string) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.FLLM_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  if (requestUrl) return new URL(requestUrl).origin;
  return "https://www.floridaliquorlicensemarket.com";
}

export async function createFormalLicenseAppraisalCheckoutSession(
  order: FormalLicenseAppraisalOrder,
  requestUrl?: string,
) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    const paymentLink = new URL(
      process.env.STRIPE_FORMAL_APPRAISAL_PAYMENT_LINK || ACTIVE_FORMAL_APPRAISAL_PAYMENT_LINK,
    );
    paymentLink.searchParams.set("client_reference_id", order.submissionRef);
    paymentLink.searchParams.set("prefilled_email", order.email);
    return {
      id: `formal_appraisal_payment_link_${order.submissionRef}`,
      url: paymentLink.toString(),
      client_reference_id: order.submissionRef,
    } satisfies StripeCheckoutSession;
  }

  const origin = siteUrl(requestUrl);
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("client_reference_id", order.submissionRef);
  params.set("customer_email", order.email);
  params.set("success_url", `${origin}/formal-license-appraisal/success?session_id={CHECKOUT_SESSION_ID}`);
  params.set("cancel_url", `${origin}/florida-liquor-license-appraisal?payment=cancelled#order-form`);
  params.set("metadata[submission_ref]", order.submissionRef);
  params.set("metadata[submission_id]", order.id);
  params.set("metadata[product_kind]", "formal_license_appraisal");
  params.set("metadata[county]", order.county);
  params.set("metadata[license_type]", order.licenseType);
  params.set("metadata[license_number]", order.licenseNumber);
  params.set("line_items[0][price_data][currency]", "usd");
  params.set("line_items[0][price_data][unit_amount]", String(FORMAL_LICENSE_APPRAISAL_PRICE_CENTS));
  params.set("line_items[0][price_data][product_data][name]", "FLLM Formal Florida Quota Liquor License Appraisal");
  params.set(
    "line_items[0][price_data][product_data][description]",
    "Lender-oriented subject-license appraisal with DBPR research, separate same-county 3PS and 4COP market evidence, available verified recent sales, series-conversion analysis, exhibits, and a reconciled value conclusion.",
  );
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
