import type { Listing } from "@/data/listings";

export const LISTING_INVENTORY_CLASSES = [
  "market",
  "direct_seller",
  "fllm_exclusive",
] as const;

export type ListingInventoryClass = (typeof LISTING_INVENTORY_CLASSES)[number];

export type ListingWithInventoryClass = Listing & {
  inventoryClass?: ListingInventoryClass;
};

export type ClassifiedListing = Listing & {
  inventoryClass: ListingInventoryClass;
};

export const LISTING_INVENTORY_CLASS_LABELS: Record<ListingInventoryClass, string> = {
  market: "Market Listing",
  direct_seller: "Direct Seller",
  fllm_exclusive: "FLLM Exclusive",
};

export function isDirectSellerReference(sourceRef: string | null | undefined): boolean {
  return /^FLLM-PAID-/i.test(sourceRef?.trim() ?? "");
}

export function isDirectSellerListing(
  listing: Pick<ListingWithInventoryClass, "sourceRef" | "inventoryClass">,
): boolean {
  return (
    listing.inventoryClass === "direct_seller" ||
    isDirectSellerReference(listing.sourceRef)
  );
}

export function isFllmExclusiveReference(sourceRef: string | null | undefined): boolean {
  return /^FLLM-EXCLUSIVE-/i.test(sourceRef?.trim() ?? "");
}

export function resolveListingInventoryClass(
  listing: Pick<ListingWithInventoryClass, "sourceRef" | "inventoryClass">,
): ListingInventoryClass {
  if (listing.inventoryClass && LISTING_INVENTORY_CLASSES.includes(listing.inventoryClass)) {
    return listing.inventoryClass;
  }

  if (isFllmExclusiveReference(listing.sourceRef)) return "fllm_exclusive";
  if (isDirectSellerListing(listing)) return "direct_seller";

  // Legacy FLLM references and all outside-source inventory are market data
  // unless FLLM deliberately classifies the listing otherwise. This prevents
  // old FLLM-* references from being mislabeled as proprietary inventory.
  return "market";
}

export function withListingInventoryClass(
  listing: ListingWithInventoryClass,
  inventoryClass?: ListingInventoryClass,
): ClassifiedListing {
  return {
    ...listing,
    inventoryClass: inventoryClass ?? resolveListingInventoryClass(listing),
  };
}

export function asMarketListing(listing: ListingWithInventoryClass): ClassifiedListing {
  return withListingInventoryClass(listing, "market");
}

export function asDirectSellerListing(listing: ListingWithInventoryClass): ClassifiedListing {
  return withListingInventoryClass(listing, "direct_seller");
}

export function asFllmExclusiveListing(listing: ListingWithInventoryClass): ClassifiedListing {
  return withListingInventoryClass(listing, "fllm_exclusive");
}
