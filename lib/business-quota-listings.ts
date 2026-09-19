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
};

export const businessQuotaListings: BusinessQuotaListing[] = [
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
  },
];

const businessQuotaReferences = new Set(
  businessQuotaListings.map((listing) => listing.listingReference.toUpperCase()),
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
