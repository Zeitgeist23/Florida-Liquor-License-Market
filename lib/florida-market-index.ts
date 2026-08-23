import type { Listing } from "@/data/listings";
import { countyPopulations2024 } from "@/data/county-populations-2024";
import { countySlug, floridaCounties, getCountyBySlug } from "@/data/florida-counties";
import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";

export type MarketPriceStats = {
  count: number;
  low: number | null;
  median: number | null;
  high: number | null;
};

export type CountyMarketIndexRow = {
  county: string;
  slug: string;
  cities: string[];
  population: number | null;
  activeListings: number;
  fourCopCount: number;
  threePsCount: number;
  all: MarketPriceStats;
  fourCop: MarketPriceStats;
  threePs: MarketPriceStats;
  quotaDrawingLicenses: number;
};

export type FloridaMarketIndexSnapshot = {
  generatedAt: string;
  snapshotLabel: string;
  activeListings: number;
  countiesWithInventory: number;
  disclosedAsks: number;
  statewide: MarketPriceStats;
  fourCop: MarketPriceStats;
  threePs: MarketPriceStats;
  fourCopCount: number;
  threePsCount: number;
  quotaDrawingLicenses: number;
  countyRows: CountyMarketIndexRow[];
};

function canonicalCountyName(value: string) {
  const normalized = value.replace(/^Saint\s+/i, "St. ");
  return getCountyBySlug(countySlug(normalized))?.name ?? value;
}

function dbprCountyName(value: string) {
  return value === "Dade" ? "Miami-Dade County" : `${value} County`;
}

export function marketPriceStats(values: Array<number | null | undefined>): MarketPriceStats {
  const prices = values
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value))
    .sort((a, b) => a - b);

  if (!prices.length) return { count: 0, low: null, median: null, high: null };
  const midpoint = Math.floor(prices.length / 2);
  const median = prices.length % 2
    ? prices[midpoint]
    : Math.round((prices[midpoint - 1] + prices[midpoint]) / 2);

  return {
    count: prices.length,
    low: prices[0],
    median,
    high: prices[prices.length - 1],
  };
}

export function buildFloridaMarketIndex(input: Listing[]): FloridaMarketIndexSnapshot {
  const listings = input
    .filter((listing) => Boolean(listing.sourceRef))
    .map((listing) => ({ ...listing, county: canonicalCountyName(listing.county) }));

  const drawingByCounty = new Map<string, number>();
  QUOTA_DRAWING_2026.counties.forEach((item) => {
    drawingByCounty.set(dbprCountyName(item.county), item.licenses);
  });

  const countyRows = [...floridaCounties]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((county) => {
      const countyListings = listings.filter((listing) => listing.county === county.name);
      const fourCop = countyListings.filter((listing) => listing.type === "4COP Quota");
      const threePs = countyListings.filter((listing) => listing.type === "3PS Quota / Package Store");
      return {
        county: county.name,
        slug: county.slug,
        cities: county.primaryCities,
        population: countyPopulations2024[county.name] ?? null,
        activeListings: countyListings.length,
        fourCopCount: fourCop.length,
        threePsCount: threePs.length,
        all: marketPriceStats(countyListings.map((listing) => listing.price)),
        fourCop: marketPriceStats(fourCop.map((listing) => listing.price)),
        threePs: marketPriceStats(threePs.map((listing) => listing.price)),
        quotaDrawingLicenses: drawingByCounty.get(county.name) ?? 0,
      } satisfies CountyMarketIndexRow;
    });

  const fourCopListings = listings.filter((listing) => listing.type === "4COP Quota");
  const threePsListings = listings.filter((listing) => listing.type === "3PS Quota / Package Store");
  const generatedAt = new Date().toISOString();
  const snapshotLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());

  return {
    generatedAt,
    snapshotLabel,
    activeListings: listings.length,
    countiesWithInventory: countyRows.filter((row) => row.activeListings > 0).length,
    disclosedAsks: listings.filter((listing) => typeof listing.price === "number").length,
    statewide: marketPriceStats(listings.map((listing) => listing.price)),
    fourCop: marketPriceStats(fourCopListings.map((listing) => listing.price)),
    threePs: marketPriceStats(threePsListings.map((listing) => listing.price)),
    fourCopCount: fourCopListings.length,
    threePsCount: threePsListings.length,
    quotaDrawingLicenses: QUOTA_DRAWING_2026.totalLicenses,
    countyRows,
  };
}

export function csvEscape(value: string | number | null) {
  if (value === null) return "";
  const text = String(value);
  return /[\",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
