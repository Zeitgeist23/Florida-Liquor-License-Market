import "server-only";

import type { FormalLicenseAppraisalOrder } from "@/lib/formal-license-appraisal";
import {
  createListingCheckoutSession,
  type StripeCheckoutSession,
} from "@/lib/stripe-listing-checkout";

const FORMAL_APPRAISAL_PRICE_CENTS = 49_500;

export async function createFormalLicenseAppraisalCheckoutSession(
  order: FormalLicenseAppraisalOrder,
  requestUrl?: string,
) {
  return createListingCheckoutSession(
    {
      id: order.id,
      submissionRef: order.submissionRef,
      email: order.email,
      county: order.county,
      licenseType: order.licenseType,
    },
    requestUrl,
    "/florida-liquor-license-appraisal?payment=cancelled",
    {
      unitAmount: FORMAL_APPRAISAL_PRICE_CENTS,
      productName: "FLLM Formal Florida Quota Liquor License Appraisal",
      productDescription:
        "License-specific formal appraisal supported by county market evidence, comparable listings, regulatory research and a reconciled value conclusion.",
      metadata: {
        product: "formal_license_appraisal",
        appraisal_price: "495",
      },
    },
  ) as Promise<StripeCheckoutSession>;
}
