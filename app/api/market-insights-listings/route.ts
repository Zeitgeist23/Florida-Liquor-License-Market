import { NextResponse } from "next/server";
import { getMarketplaceListings } from "@/lib/listing-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const listings = (await getMarketplaceListings())
    .filter((listing) => Boolean(listing.sourceRef))
    .sort((left, right) => {
      if (left.price === null && right.price === null) {
        return left.county.localeCompare(right.county) || left.type.localeCompare(right.type);
      }
      if (left.price === null) return 1;
      if (right.price === null) return -1;
      return right.price - left.price || left.county.localeCompare(right.county) || left.type.localeCompare(right.type);
    })
    .map((listing) => ({
      county: listing.county,
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
