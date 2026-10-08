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

const FLLM_3PS_TO_4COP_MATCHED_MARKET_FACTOR = 0.985;

function roundToNearestFiveThousand(value: number) {
  return Math.round(value / 5_000) * 5_000;
}

export function withMarketLicenseValues(
  listings: BusinessQuotaListing[],
  standaloneListings: Listing[],
): BusinessQuotaListing[] {
  return listings.map((listing): BusinessQuotaListing => {
    if (listing.listingTier !== "market") return listing;

    if (listing.licenseClass === "sfs" || listing.licenseClass === "2cop") {
      // Location-specific licenses must never carry an inherited quota valuation.
      return {
        ...listing,
        allocatedLicenseValue: "",
        marketMedianLicenseValue: undefined,
        licenseValueBasis: "unavailable",
      };
    }

    const is3ps = listing.licenseType === "3PS Quota / Package Store";
    const comparableType = is3ps
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

    const directMedian = medianPrice(countyPrices);

    if (directMedian !== null) {
      return {
        ...listing,
        allocatedLicenseValue: formatMoney(directMedian),
        marketMedianLicenseValue: formatMoney(directMedian),
        licenseValueBasis: is3ps
          ? "county_3ps_median"
          : "county_4cop_median",
      };
    }

    if (is3ps) {
      const county4copPrices = standaloneListings
        .filter(
          (marketListing) =>
            marketListing.county === listing.county &&
            marketListing.type === "4COP Quota" &&
            typeof marketListing.price === "number" &&
            Number.isFinite(marketListing.price),
        )
        .map((marketListing) => marketListing.price as number);

      const county4copMedian = medianPrice(county4copPrices);

      if (county4copMedian !== null) {
        const proxyValue = roundToNearestFiveThousand(
          county4copMedian * FLLM_3PS_TO_4COP_MATCHED_MARKET_FACTOR,
        );

        return {
          ...listing,
          allocatedLicenseValue: formatMoney(proxyValue),
          marketMedianLicenseValue: formatMoney(proxyValue),
          licenseValueBasis: "county_4cop_series_proxy",
        };
      }
    }

    return {
      ...listing,
      allocatedLicenseValue: "Market data unavailable",
      marketMedianLicenseValue: undefined,
      licenseValueBasis: "unavailable",
    };
  });
}
