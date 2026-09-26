import { countySlug } from "@/data/florida-counties";
import type {
  BusinessQuotaCategory,
  BusinessQuotaListing,
} from "@/lib/business-quota-listings";

export const BUSINESS_CATEGORY_SLUGS: Record<BusinessQuotaCategory, string> = {
  Bar: "bar",
  "Cocktail Lounge": "cocktail-lounge",
  Nightclub: "nightclub",
  Restaurant: "restaurant",
  "Bowling Alley": "bowling-alley",
  "Liquor Store": "liquor-store",
  Marina: "marina",
  "Gentlemen's Club": "gentlemens-club",
  "Hotel / Motel": "hotel-motel",
  "Country Club": "country-club",
  "Other Hospitality": "other-hospitality",
};

export type BusinessMarketLicenseSlug =
  | "4cop-quota"
  | "3ps-quota"
  | "4cop-sfs-srx"
  | "2cop-beer-wine";

export type BusinessMarketLicenseView = {
  slug: BusinessMarketLicenseSlug;
  label: BusinessQuotaListing["licenseType"];
  benchmarkType: "4COP Quota" | "3PS Quota / Package Store";
  benchmarkLabel: string;
  benchmarkContext: string | null;
};

const LICENSE_VIEWS: Record<BusinessMarketLicenseSlug, BusinessMarketLicenseView> = {
  "4cop-quota": {
    slug: "4cop-quota",
    label: "4COP Quota",
    benchmarkType: "4COP Quota",
    benchmarkLabel: "4COP Quota",
    benchmarkContext: null,
  },
  "3ps-quota": {
    slug: "3ps-quota",
    label: "3PS Quota / Package Store",
    benchmarkType: "3PS Quota / Package Store",
    benchmarkLabel: "3PS Quota / Package Store",
    benchmarkContext: null,
  },
  "4cop-sfs-srx": {
    slug: "4cop-sfs-srx",
    label: "4COP SFS/SRX",
    benchmarkType: "4COP Quota",
    benchmarkLabel: "4COP Quota market context",
    benchmarkContext:
      "The quota-license benchmark is shown only as county full-liquor market context. A 4COP SFS/SRX license is qualification- and premises-dependent and is not valued as a transferable quota license.",
  },
  "2cop-beer-wine": {
    slug: "2cop-beer-wine",
    label: "2COP Beer & Wine",
    benchmarkType: "4COP Quota",
    benchmarkLabel: "4COP Quota market context",
    benchmarkContext:
      "The quota-license benchmark is shown only as county liquor-market context. A 2COP beer-and-wine license is not a quota asset and should not be valued from 4COP quota asking prices.",
  },
};

export function businessCategorySlug(category: BusinessQuotaCategory) {
  return BUSINESS_CATEGORY_SLUGS[category];
}

export function businessCategoryFromSlug(slug: string) {
  return (Object.entries(BUSINESS_CATEGORY_SLUGS).find(([, value]) => value === slug)?.[0] ??
    null) as BusinessQuotaCategory | null;
}

export function businessMarketLicenseSlug(
  listing: Pick<BusinessQuotaListing, "licenseType">,
): BusinessMarketLicenseSlug {
  if (listing.licenseType === "3PS Quota / Package Store") return "3ps-quota";
  if (listing.licenseType === "4COP SFS/SRX") return "4cop-sfs-srx";
  if (listing.licenseType === "2COP Beer & Wine") return "2cop-beer-wine";
  return "4cop-quota";
}

export function businessMarketLicenseFromSlug(slug: string) {
  return LICENSE_VIEWS[slug as BusinessMarketLicenseSlug] ?? null;
}

export function businessMarketViewHref(
  listing: Pick<BusinessQuotaListing, "county" | "businessCategory" | "licenseType">,
) {
  return `/market-data/businesses/${countySlug(listing.county)}/${businessCategorySlug(
    listing.businessCategory,
  )}/${businessMarketLicenseSlug(listing)}`;
}
