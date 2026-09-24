import type { FeaturedThirdPartyBusinessListingConfig } from "@/components/FeaturedThirdPartyBusinessListingPage";

export const OFFICIAL_4COP_SFS_SRX_BUSINESS_LISTING_TEMPLATE =
  "fllm-4cop-sfs-business-listing-v1" as const;

export type Official4CopSfsBusinessListingConfig = Omit<
  FeaturedThirdPartyBusinessListingConfig,
  "licenseType" | "licenseClass"
>;

export function defineOfficial4CopSfsBusinessListing(
  config: Official4CopSfsBusinessListingConfig,
): FeaturedThirdPartyBusinessListingConfig {
  return {
    ...config,
    licenseType: "4COP SFS/SRX",
    licenseClass: "sfs",
  };
}
