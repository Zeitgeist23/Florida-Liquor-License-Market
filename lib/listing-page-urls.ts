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

function normalizedSourceUrl(sourceUrl?: string) {
  return sourceUrl?.trim().toLowerCase().replace(/\/+$/, "") ?? "";
}

function isPaidMarketplaceRef(sourceRef: string) {
  return /^FLLM-PAID-/i.test(sourceRef.trim());
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
  const seenIdentities = new Set<string>();
  const pages = new Map<string, IndexableListingPage>();

  for (const listing of input) {
    if (!listing.sourceRef) continue;

    // First suppress exact source duplicates without collapsing two legitimate
    // listings merely because they share county, type, and asking price.
    const sourceUrl = normalizedSourceUrl(listing.sourceUrl);
    const identity = sourceUrl
      ? `url:${sourceUrl}`
      : `ref:${listing.sourceRef.trim().toLowerCase()}`;
    if (seenIdentities.has(identity)) continue;
    seenIdentities.add(identity);

    const slug = listingPageSlug(listing);
    if (!slug || pages.has(slug)) continue;
    pages.set(slug, { slug, listing });
  }

  return [...pages.values()];
}
