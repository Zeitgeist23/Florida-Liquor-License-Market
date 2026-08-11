import type { Listing } from "@/data/listings";
import { countySlug } from "@/data/florida-counties";

function slugPart(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function shortHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function listingTypeSlug(type: Listing["type"]) {
  return type === "4COP Quota" ? "4cop-quota" : "3ps-quota";
}

function isPaidMarketplaceRef(sourceRef: string) {
  return /^FLLM-PAID-/i.test(sourceRef.trim());
}

function listingCardIdentity(listing: Pick<Listing, "county" | "type" | "price" | "priceLabel">) {
  return `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}

export function listingPageSlug(listing: Pick<Listing, "county" | "type" | "sourceRef">) {
  if (!listing.sourceRef) return null;

  // Paid seller listings already use their public submission reference as the
  // canonical route. Keep that URL stable rather than creating a second page.
  if (isPaidMarketplaceRef(listing.sourceRef)) {
    return listing.sourceRef.trim().toUpperCase();
  }

  const reference = slugPart(listing.sourceRef).slice(0, 34) || "listing";
  return `${countySlug(listing.county)}-${listingTypeSlug(listing.type)}-${reference}-${shortHash(listing.sourceRef)}`;
}

export function listingPageHref(listing: Pick<Listing, "county" | "type" | "sourceRef">) {
  const slug = listingPageSlug(listing);
  return slug ? `/listings/${slug}` : "/listings";
}

export type IndexableListingPage = {
  slug: string;
  listing: Listing;
};

export function indexableListingPages(input: Listing[]): IndexableListingPage[] {
  // Keep routing in lockstep with the Listings page. The visible card grid uses
  // the same county/type/price identity with last-write-wins behavior. Building
  // detail pages from that exact set guarantees that every displayed AVAILABLE
  // card has a matching /listings/[slug] route instead of a possible 404.
  const visibleListings = Array.from(
    new Map(input.map((listing) => [listingCardIdentity(listing), listing])).values()
  );

  const pages = new Map<string, IndexableListingPage>();

  for (const listing of visibleListings) {
    if (!listing.sourceRef) continue;

    const slug = listingPageSlug(listing);
    if (!slug) continue;

    // If one source reference appears more than once, keep the latest visible
    // record so the detail page agrees with the card the visitor actually saw.
    pages.set(slug, { slug, listing });
  }

  return [...pages.values()];
}
