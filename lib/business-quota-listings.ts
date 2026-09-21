import type { ListingWithInventoryClass } from "@/lib/listing-inventory-class";

export type QuotaOfferClassification =
  | "standalone_quota"
  | "business_package"
  | "dual_offering"
  | "excluded";

export type QuotaOfferFacts = {
  isTransferableQuotaLicense: boolean;
  includesOperatingBusiness: boolean;
  licenseAvailableSeparately: boolean;
};

export const FLLM_QUOTA_LISTING_OPERATING_RULES = [
  {
    classification: "standalone_quota",
    label: "Standalone Quota License",
    placement: "Standalone license inventory",
    description:
      "A separately purchasable 4COP or 3PS quota license belongs only in FLLM's standalone inventory and market statistics.",
  },
  {
    classification: "business_package",
    label: "Business + Quota License",
    placement: "Business-package inventory",
    description:
      "An operating business sold with an included quota license belongs only in Businesses With Quota Licenses and is excluded from standalone statistics.",
  },
  {
    classification: "dual_offering",
    label: "Separately Authorized Offers",
    placement: "Two distinct listings",
    description:
      "When a broker expressly offers the business package and the license separately, FLLM creates distinct records, prices, disclosures, and search intent for each offer.",
  },
  {
    classification: "excluded",
    label: "Nonquota or Premises-Dependent License",
    placement: "Excluded from quota inventory",
    description:
      "A business involving only a nonquota, specialty, or premises-dependent license is not published as FLLM quota-license inventory.",
  },
] as const satisfies ReadonlyArray<{
  classification: QuotaOfferClassification;
  label: string;
  placement: string;
  description: string;
}>;

export function classifyQuotaOffer({
  isTransferableQuotaLicense,
  includesOperatingBusiness,
  licenseAvailableSeparately,
}: QuotaOfferFacts): QuotaOfferClassification {
  if (!isTransferableQuotaLicense) return "excluded";
  if (includesOperatingBusiness && licenseAvailableSeparately) return "dual_offering";
  if (includesOperatingBusiness) return "business_package";
  return "standalone_quota";
}

export type BusinessQuotaListing = {
  listingReference: string;
  href: string;
  county: string;
  countyHref: string;
  licenseType: "4COP Quota" | "3PS Quota / Package Store";
  title: string;
  businessType: string;
  packagePrice: string;
  packagePriceNumber: number;
  allocatedLicenseValue: string;
  brokerName: string;
  brokerage: string;
  featured: boolean;
  publicationStatus: "published" | "preview";
  classification: "business_package";
};

/**
 * Canonical registry for third-party broker offerings that include an
 * operating business and a quota license. These records are deliberately
 * separate from statewide standalone-license inventory, pricing statistics,
 * county counts, market comparisons, and the Exchange.
 *
 * Preview records remain classified here so they cannot leak into standalone
 * inventory, but they are not exposed on the public business inventory until
 * the broker listing is approved and publicationStatus becomes "published".
 */
export const businessQuotaListingRecords: BusinessQuotaListing[] = [
  {
    listingReference: "FLLM-ANTEZZA",
    href: "/listings/fllm-antezza",
    county: "Pinellas County",
    countyHref: "/counties/pinellas",
    licenseType: "4COP Quota",
    title: "Pinellas County Cocktail Lounge + 4COP Quota License",
    businessType: "Upscale cocktail lounge",
    packagePrice: "$999,000",
    packagePriceNumber: 999_000,
    allocatedLicenseValue: "$460,000",
    brokerName: "Alessandro Antezza",
    brokerage: "SUNSHINEAGLE LLC",
    featured: true,
    publicationStatus: "published",
    classification: "business_package",
  },
  {
    listingReference: "FLLM-DESAMOURS",
    href: "/listings/fllm-desamours",
    county: "Martin County",
    countyHref: "/counties/martin",
    licenseType: "4COP Quota",
    title: "Iconic Jensen Beach Bar + 4COP Quota License",
    businessType: "Long-established neighborhood bar",
    packagePrice: "$650,000",
    packagePriceNumber: 650_000,
    allocatedLicenseValue: "Approx. $600,000",
    brokerName: "JR DesAmours",
    brokerage: "Business Exit Advisors",
    featured: true,
    publicationStatus: "published",
    classification: "business_package",
  },
  {
    listingReference: "FLLM-NEGOVAN",
    href: "/listings/fllm-negovan",
    county: "Miami-Dade County",
    countyHref: "/counties/miami-dade",
    licenseType: "4COP Quota",
    title: "Miami Adult Nightclub + 4COP Quota License",
    businessType: "Premium adult-entertainment business",
    packagePrice: "$3,500,000",
    packagePriceNumber: 3_500_000,
    allocatedLicenseValue: "$250,000",
    brokerName: "Julie Negovan",
    brokerage: "Patricia Burnside Realty",
    featured: true,
    publicationStatus: "preview",
    classification: "business_package",
  },
];

export const businessQuotaListings = businessQuotaListingRecords.filter(
  (listing) => listing.publicationStatus === "published",
);

const businessQuotaReferences = new Set(
  businessQuotaListingRecords.map((listing) => listing.listingReference.toUpperCase()),
);

export function isBusinessQuotaListing(
  listing: Pick<ListingWithInventoryClass, "sourceRef">,
) {
  return businessQuotaReferences.has(listing.sourceRef?.trim().toUpperCase() ?? "");
}

export function standaloneQuotaListings<T extends Pick<ListingWithInventoryClass, "sourceRef">>(
  listings: T[],
) {
  return listings.filter((listing) => !isBusinessQuotaListing(listing));
}

export function businessQuotaListingsForCounty(county: string) {
  return businessQuotaListings.filter((listing) => listing.county === county);
}
