import type { ListingWithInventoryClass } from "@/lib/listing-inventory-class";

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
    packagePrice: "$1,100,000",
    packagePriceNumber: 1_100_000,
    allocatedLicenseValue: "$495,000",
    brokerName: "Alessandro Antezza",
    brokerage: "SUNSHINEAGLE LLC",
    featured: true,
    publicationStatus: "published",
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
    publicationStatus: "preview",
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
