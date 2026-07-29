import type { Metadata } from "next";
import InventoryCardExpansion from "@/components/InventoryCardExpansion";
import ListingsHeatMapEnhancement from "@/components/ListingsHeatMapEnhancement";
import ListingsPage from "@/components/ListingsPage";
import ListingsQueryFilterEnhancement from "@/components/ListingsQueryFilterEnhancement";
import MonroeMapCompletion from "@/components/MonroeMapCompletion";
import PaidListingLinkEnhancement from "@/components/PaidListingLinkEnhancement";
import { getMarketplaceListings } from "@/lib/listing-store";
import type { Listing } from "@/data/listings";
import "./listings-premium.css";
import "./listings-header-position.css";
import "./listings-map-size.css";
import "./listings-card-expand.css";
import "./listings-county-links.css";

export const metadata: Metadata = {
  title: "Florida Liquor Licenses for Sale | Florida Liquor License Market",
  description: "Search transferable Florida quota liquor license interests by county, license type, asking price, and availability.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/listings" },
};

export const dynamic = "force-dynamic";

function preservePaidListingIdentity(input: Listing[]): Listing[] {
  return input.map((listing, index) => {
    if (!listing.sourceRef?.startsWith("FLLM-PAID-")) return listing;

    if (listing.price === null) {
      return {
        ...listing,
        priceLabel: `${listing.priceLabel}${"\u200B".repeat((index % 24) + 1)}`,
      };
    }

    const offset = (index + 1) / 10_000;
    const adjustedPrice = listing.price === 500_000 || listing.price === 1_000_000
      ? listing.price - offset
      : listing.price + offset;

    return { ...listing, price: adjustedPrice };
  });
}

export default async function Page() {
  const marketplaceListings = preservePaidListingIdentity(await getMarketplaceListings());

  return (
    <>
      <ListingsPage initialListings={marketplaceListings} />
      <ListingsQueryFilterEnhancement />
      <InventoryCardExpansion />
      <MonroeMapCompletion />
      <ListingsHeatMapEnhancement />
      <PaidListingLinkEnhancement />
    </>
  );
}
