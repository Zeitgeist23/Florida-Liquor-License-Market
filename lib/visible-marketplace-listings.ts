import type { Listing } from "@/data/listings";
import {
  isDirectSellerListing,
  type ListingWithInventoryClass,
} from "@/lib/listing-inventory-class";

function visibleListingIdentity(listing: Listing) {
  const sourceRef = listing.sourceRef?.trim().toLowerCase();
  if (sourceRef) return `source-ref:${sourceRef}`;

  const sourceUrl = listing.sourceUrl?.trim().toLowerCase().replace(/\/+$/, "");
  if (sourceUrl) return `source-url:${sourceUrl}`;

  return `fallback:${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}

export function preservePaidListingIdentity(input: ListingWithInventoryClass[]): Listing[] {
  return input.map((listing, index) => {
    if (!isDirectSellerListing(listing)) return listing;

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

export function getVisibleMarketplaceListings(input: ListingWithInventoryClass[]): Listing[] {
  const normalized = preservePaidListingIdentity(input);
  return Array.from(
    new Map(normalized.map((listing) => [visibleListingIdentity(listing), listing])).values(),
  );
}

export function getVisibleAvailableMarketplaceListings(
  input: ListingWithInventoryClass[],
): Listing[] {
  return getVisibleMarketplaceListings(input).filter((listing) => Boolean(listing.sourceRef));
}
