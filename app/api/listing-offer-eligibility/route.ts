import { NextResponse } from "next/server";
import { getMarketplaceListings } from "@/lib/listing-store";
import { resolveListingInventoryClass } from "@/lib/listing-inventory-class";

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("ref")?.trim().toUpperCase();
  if (!reference) return NextResponse.json({ eligible: false }, { headers: { "Cache-Control": "no-store" } });
  const listings = await getMarketplaceListings();
  const listing = listings.find((item) => item.sourceRef?.toUpperCase() === reference);
  return NextResponse.json({ eligible: Boolean(listing && resolveListingInventoryClass(listing) !== "market") }, { headers: { "Cache-Control": "no-store" } });
}
