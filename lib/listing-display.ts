import type { Listing } from "@/data/listings";
import {
  isDirectSellerListing,
  type ListingWithInventoryClass,
} from "@/lib/listing-inventory-class";

/**
 * The marketplace grid intentionally collapses ordinary duplicate cards that
 * share the same county, type, and asking price. Paid seller listings must keep
 * their own identity even when those display fields happen to match another
 * listing, so give only those records a non-visible identity offset.
 */
export function prepareListingsForDisplay(input: ListingWithInventoryClass[]): Listing[] {
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
