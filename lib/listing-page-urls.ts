import type { Listing } from "@/data/listings";
import { countySlug } from "@/data/florida-counties";
import {
  isDirectSellerReference,
  withListingInventoryClass,
  type ClassifiedListing,
  type ListingWithInventoryClass,
} from "@/lib/listing-inventory-class";

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

function publicListingForDetailPage(listing: ListingWithInventoryClass): ClassifiedListing {
  const classified = withListingInventoryClass(listing);
  const isFllmSubmission = isDirectSellerReference(classified.sourceRef);

  // Source names and source URLs are internal marketplace data. They are used
  // for ingestion, refresh, and deduplication, but are never exposed on public
  // individual-license pages. Imported notes can carry source-identifying
  // language as well, so only genuine FLLM-submitted seller notes are retained.
  return {
    ...classified,
    sourceName: undefined,
    sourceUrl: undefined,
    note: isFllmSubmission ? classified.note : undefined,
  };
}

export function listingPageSlug(listing: Pick<Listing, "county" | "type" | "sourceRef">) {
  if (!listing.sourceRef) return null;

  // Paid seller listings already use their public submission reference as the
  // canonical route. Keep that URL stable rather than creating a second page.
  if (isDirectSellerReference(listing.sourceRef)) {
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
  listing: ClassifiedListing;
};

export function indexableListingPages(input: ListingWithInventoryClass[]): IndexableListingPage[] {
  const pages = new Map<string, IndexableListingPage>();

  // Every active source reference can be surfaced as a comparable in the value
  // estimator, including two listings that happen to share the same county,
  // license type, and asking price. Build a detail route for every distinct
  // listing slug so none of those estimator links can lead to a 404.
  for (const listing of input) {
    if (!listing.sourceRef) continue;

    const slug = listingPageSlug(listing);
    if (!slug) continue;

    // If the same canonical source reference appears more than once, keep the
    // latest record so the detail page reflects current marketplace data while
    // presenting only FLLM-safe public fields and retaining its inventory class.
    pages.set(slug, { slug, listing: publicListingForDetailPage(listing) });
  }

  return [...pages.values()];
}
