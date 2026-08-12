import type { Listing } from "@/data/listings";

function visibleListingIdentity(listing: Listing) {
  return `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}

export function preservePaidListingIdentity(input: Listing[]): Listing[] {
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

export function getVisibleMarketplaceListings(input: Listing[]): Listing[] {
  const normalized = preservePaidListingIdentity(input);
  return Array.from(
    new Map(normalized.map((listing) => [visibleListingIdentity(listing), listing])).values(),
  );
}

export function getVisibleAvailableMarketplaceListings(input: Listing[]): Listing[] {
  return getVisibleMarketplaceListings(input).filter((listing) => Boolean(listing.sourceRef));
}
