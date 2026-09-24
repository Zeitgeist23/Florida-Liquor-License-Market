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

export type BusinessQuotaCategory =
  | "Bar"
  | "Cocktail Lounge"
  | "Nightclub"
  | "Restaurant"
  | "Bowling Alley"
  | "Liquor Store"
  | "Marina"
  | "Gentlemen's Club"
  | "Hotel / Motel"
  | "Country Club"
  | "Other Hospitality";

export type BusinessQuotaListing = {
  listingReference: string;
  inventoryReferences?: readonly string[];
  href: string;
  county: string;
  countyHref: string;
  licenseType: "4COP Quota" | "3PS Quota / Package Store" | "4COP SFS/SRX" | "2COP Beer & Wine";
  licenseClass: "quota" | "sfs" | "2cop";
  title: string;
  businessType: string;
  businessCategory: BusinessQuotaCategory;
  summaryBusinessType: string;
  transactionType: string;
  packagePrice: string;
  packagePriceNumber: number;
  allocatedLicenseValue: string;
  brokerName: string;
  brokerage: string;
  featured: boolean;
  publicationStatus: "published" | "preview";
  classification: "business_package" | "business_sfs" | "business_2cop";
  sellerDirect?: boolean;
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
    licenseClass: "quota",
    title: "Pinellas County Cocktail Lounge + 4COP Quota License",
    businessType: "Upscale cocktail lounge",
    businessCategory: "Cocktail Lounge",
    summaryBusinessType: "Cocktail Lounge",
    transactionType: "Asset Sale",
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
    licenseClass: "quota",
    title: "Iconic Jensen Beach Bar + 4COP Quota License",
    businessType: "Long-established neighborhood bar",
    businessCategory: "Bar",
    summaryBusinessType: "Bar",
    transactionType: "Asset Sale",
    packagePrice: "$650,000",
    packagePriceNumber: 650_000,
    allocatedLicenseValue: "$600,000 est.",
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
    licenseClass: "quota",
    title: "Miami Adult Nightclub + 4COP Quota License",
    businessType: "Premium adult-entertainment business",
    businessCategory: "Gentlemen's Club",
    summaryBusinessType: "Gentlemen's Club",
    transactionType: "Business Package",
    packagePrice: "$3,500,000",
    packagePriceNumber: 3_500_000,
    allocatedLicenseValue: "$250,000",
    brokerName: "Julie Negovan",
    brokerage: "Patricia Burnside Realty",
    featured: true,
    publicationStatus: "preview",
    classification: "business_package",
  },
  {
    listingReference: "FLLM-MELLO",
    inventoryReferences: ["FLLM-265072"],
    href: "/listings/fllm-mello",
    county: "Palm Beach County",
    countyHref: "/counties/palm-beach",
    licenseType: "4COP Quota",
    licenseClass: "quota",
    title: "Delray Beach Restaurant + 4COP Quota License",
    businessType: "Turnkey full-service restaurant and bar",
    businessCategory: "Restaurant",
    summaryBusinessType: "Restaurant",
    transactionType: "Asset Sale",
    packagePrice: "$359,000",
    packagePriceNumber: 359_000,
    allocatedLicenseValue: "$200,000",
    brokerName: "Leonard Mello",
    brokerage: "We Sell Restaurants",
    featured: true,
    publicationStatus: "published",
    classification: "business_package",
  },
  {
    listingReference: "FLLM-ZOBERG",
    href: "/listings/fllm-zoberg",
    county: "Miami-Dade County",
    countyHref: "/counties/miami-dade",
    licenseType: "4COP SFS/SRX",
    licenseClass: "sfs",
    title: "Miami-Dade Mexican Restaurant + 4COP SFS / SRX License",
    businessType: "Mexican-Latin restaurant and entertainment venue",
    businessCategory: "Restaurant",
    summaryBusinessType: "Restaurant",
    transactionType: "Business Sale",
    packagePrice: "$1,200,000",
    packagePriceNumber: 1_200_000,
    allocatedLicenseValue: "Location-specific",
    brokerName: "Brian Zoberg",
    brokerage: "Suncoast Business Consultants",
    featured: true,
    publicationStatus: "published",
    classification: "business_sfs",
  },
  {
    listingReference: "FLLM-KOPP",
    href: "/listings/fllm-kopp",
    county: "Miami-Dade County",
    countyHref: "/counties/miami-dade",
    licenseType: "2COP Beer & Wine",
    licenseClass: "2cop",
    title: "Miami Peruvian Restaurant + 2COP Beer & Wine License",
    businessType: "Peruvian-Mediterranean restaurant",
    businessCategory: "Restaurant",
    summaryBusinessType: "Restaurant",
    transactionType: "Business Sale",
    packagePrice: "$599,999",
    packagePriceNumber: 599_999,
    allocatedLicenseValue: "No separate quota value",
    brokerName: "Marianella Kopp",
    brokerage: "Seller Direct",
    sellerDirect: true,
    featured: true,
    publicationStatus: "preview",
    classification: "business_2cop",
  },
];

export const businessQuotaListings = businessQuotaListingRecords.filter(
  (listing) => listing.publicationStatus === "published" && listing.licenseClass === "quota",
);

export const businessSfsListings = businessQuotaListingRecords.filter(
  (listing) => listing.publicationStatus === "published" && listing.licenseClass === "sfs",
);

export const business2copListings = businessQuotaListingRecords.filter(
  (listing) => listing.publicationStatus === "published" && listing.licenseClass === "2cop",
);

const businessQuotaReferences = new Set(
  businessQuotaListingRecords.flatMap((listing) =>
    [listing.listingReference, ...(listing.inventoryReferences ?? [])].map((reference) =>
      reference.toUpperCase(),
    ),
  ),
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
