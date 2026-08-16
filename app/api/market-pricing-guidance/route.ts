import { NextResponse } from "next/server";

import { floridaCounties } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { getMarketplaceListings } from "@/lib/listing-store";

export const dynamic = "force-dynamic";

const supportedLicenseTypes = new Set<Listing["type"]>([
  "4COP Quota",
  "3PS Quota / Package Store",
]);
const supportedCounties = new Set(floridaCounties.map((county) => county.name));

function median(values: number[]) {
  const midpoint = Math.floor(values.length / 2);
  return values.length % 2 === 0
    ? Math.round((values[midpoint - 1] + values[midpoint]) / 2)
    : values[midpoint];
}

function percentile(values: number[], percentileValue: number) {
  if (values.length === 0) return null;
  if (values.length === 1) return values[0];
  const position = (values.length - 1) * percentileValue;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return values[lower];
  return Math.round(values[lower] + (values[upper] - values[lower]) * (position - lower));
}

function confidenceFor(count: number) {
  if (count >= 5) return "strong";
  if (count >= 2) return "moderate";
  if (count === 1) return "limited";
  return "unavailable";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const county = (url.searchParams.get("county") || "").trim();
  const licenseType = (url.searchParams.get("licenseType") || "").trim();

  if (!supportedCounties.has(county) || !supportedLicenseTypes.has(licenseType as Listing["type"])) {
    return NextResponse.json(
      { error: "Select a Florida county and a supported quota license type." },
      { status: 400 },
    );
  }

  const listings = await getMarketplaceListings();
  const comparables = listings
    .filter(
      (listing) =>
        listing.county === county &&
        listing.type === licenseType &&
        Boolean(listing.sourceRef) &&
        listing.price !== null,
    )
    .sort((left, right) => (left.price ?? 0) - (right.price ?? 0))
    .map((listing) => ({
      reference: listing.sourceRef || "Marketplace listing",
      county: listing.county,
      licenseType: listing.type,
      status: listing.licenseStatus || "Available",
      askingPrice: listing.price as number,
    }));

  const prices = comparables.map((listing) => listing.askingPrice);
  const statewidePrices = listings
    .filter(
      (listing) =>
        listing.type === licenseType &&
        Boolean(listing.sourceRef) &&
        listing.price !== null,
    )
    .map((listing) => listing.price as number)
    .sort((left, right) => left - right);

  const typicalLow = prices.length >= 4 ? percentile(prices, 0.25) : prices[0] ?? null;
  const typicalHigh = prices.length >= 4
    ? percentile(prices, 0.75)
    : prices[prices.length - 1] ?? null;

  return NextResponse.json(
    {
      county,
      licenseType,
      count: comparables.length,
      low: prices.length ? prices[0] : null,
      median: prices.length ? median(prices) : null,
      high: prices.length ? prices[prices.length - 1] : null,
      typicalLow,
      typicalHigh,
      confidence: confidenceFor(prices.length),
      statewide: {
        count: statewidePrices.length,
        median: statewidePrices.length ? median(statewidePrices) : null,
      },
      comparables,
      generatedAt: new Date().toISOString(),
      notice:
        "Market Pricing Guidance is based on advertised asking prices for active listings. It is not a valuation, appraisal, verified sale-price report, or guarantee of market value.",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
