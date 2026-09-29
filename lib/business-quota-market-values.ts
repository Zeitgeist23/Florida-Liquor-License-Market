import type { Listing } from "@/data/listings";
import type { BusinessQuotaListing } from "@/lib/business-quota-listings";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function medianPrice(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[midpoint]
    : Math.round((sorted[midpoint - 1] + sorted[midpoint]) / 2);
}

export function withMarketLicenseValues(
  listings: BusinessQuotaListing[],
  standaloneListings: Listing[],
) {
  return listings.map((listing) => {
    if (listing.listingTier !== "market") return listing;

    if (listing.licenseClass === "sfs") {
      return { ...listing, allocatedLicenseValue: "Location-specific" };
    }

    if (listing.licenseClass === "2cop") {
      return { ...listing, allocatedLicenseValue: "No separate quota value" };
    }

    const comparableType =
      listing.licenseType === "3PS Quota / Package Store"
        ? "3PS Quota / Package Store"
        : "4COP Quota";

    const countyPrices = standaloneListings
      .filter(
        (marketListing) =>
          marketListing.county === listing.county &&
          marketListing.type === comparableType &&
          typeof marketListing.price === "number" &&
          Number.isFinite(marketListing.price),
      )
      .map((marketListing) => marketListing.price as number);

    const median = medianPrice(countyPrices);

    return {
      ...listing,
      allocatedLicenseValue:
        median === null ? "Market data unavailable" : formatMoney(median),
    };
  });
}
