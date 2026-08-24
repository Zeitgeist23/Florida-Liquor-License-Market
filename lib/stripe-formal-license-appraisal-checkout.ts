import "server-only";

import type { FormalLicenseAppraisalOrder } from "@/lib/formal-license-appraisal";
import type { StripeCheckoutSession } from "@/lib/stripe-listing-checkout";

const ACTIVE_FORMAL_APPRAISAL_PAYMENT_LINK =
  "https://buy.stripe.com/7sY14fdPv6fz3ml3eRebu02";

export async function createFormalLicenseAppraisalCheckoutSession(
  order: FormalLicenseAppraisalOrder,
  _requestUrl?: string,
) {
  // This product is sold through the dedicated Stripe Payment Link created in
  // the FLLM account. Prefer it even when STRIPE_SECRET_KEY is configured so a
  // Stripe API/session outage cannot strand the customer on the order form.
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
