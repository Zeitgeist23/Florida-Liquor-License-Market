import { NextResponse } from "next/server";
import { countySlug, getCountyBySlug } from "@/data/florida-counties";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

export const dynamic = "force-dynamic";

function canonicalCountyName(value: string) {
  const normalized = value.replace(/^Saint\s+/i, "St. ");
  return getCountyBySlug(countySlug(normalized))?.name ?? value;
}

export async function GET() {
  const listings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings())
    .sort((left, right) => {
      if (left.price === null && right.price === null) {
        return left.county.localeCompare(right.county) || left.type.localeCompare(right.type);
      }
      if (left.price === null) return 1;
      if (right.price === null) return -1;
      return right.price - left.price || left.county.localeCompare(right.county) || left.type.localeCompare(right.type);
    })
    .map((listing) => ({
      county: canonicalCountyName(listing.county),
      type: listing.type,
      price: listing.price,
      priceLabel: listing.priceLabel,
      sourceRef: listing.sourceRef,
    }));

  return NextResponse.json(
    { count: listings.length, listings },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
      },
    },
  );
}
