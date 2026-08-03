import { NextResponse } from "next/server";

import type { Listing } from "@/data/listings";
import { getMarketplaceListings } from "@/lib/listing-store";

export const dynamic = "force-dynamic";

const supportedLicenseTypes = new Set<Listing["type"]>([
  "4COP Quota",
  "3PS Quota / Package Store",
]);

function median(values: number[]) {
  const midpoint = Math.floor(values.length / 2);
  return values.length % 2 === 0
    ? Math.round((values[midpoint - 1] + values[midpoint]) / 2)
    : values[midpoint];
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const county = (url.searchParams.get("county") || "").trim();
  const licenseType = (url.searchParams.get("licenseType") || "").trim();

  if (!county || !supportedLicenseTypes.has(licenseType as Listing["type"])) {
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
      sourceName: listing.sourceName || "Florida Liquor License Market",
      sourceUrl:
        listing.sourceUrl ||
        `/listings?county=${encodeURIComponent(listing.county)}&type=${encodeURIComponent(listing.type)}`,
    }));

  const prices = comparables.map((listing) => listing.askingPrice);

  return NextResponse.json(
    {
      county,
      licenseType,
      count: comparables.length,
      low: prices.length ? prices[0] : null,
      median: prices.length ? median(prices) : null,
      high: prices.length ? prices[prices.length - 1] : null,
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
