import "server-only";

import { listings, type Listing } from "@/data/listings";
import { additionalListings } from "@/data/additional-listings";
import { latestListings } from "@/data/latest-listings";

const staticListings = [...listings, ...additionalListings, ...latestListings].map((listing) =>
  listing.sourceRef === "FLLM-030"
    ? { ...listing, price: 200000, priceLabel: "$200,000" }
    : listing
);

export function dedupeListings(input: Listing[]): Listing[] {
  return Array.from(
    new Map(
      input.map((listing) => [
        `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`,
        listing,
      ])
    ).values()
  );
}

function databaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function headers(extra: HeadersInit = {}): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

type ListingRow = {
  county: string;
  license_type: Listing["type"];
  price: number | null;
  price_label: string;
  source_ref: string | null;
  source_name: string | null;
  source_url: string | null;
  note: string | null;
  image: string;
};

function rowToListing(row: ListingRow): Listing {
  return {
    county: row.county,
    type: row.license_type,
    price: row.price,
    priceLabel: row.price_label,
    sourceRef: row.source_ref ?? undefined,
    sourceName: row.source_name ?? undefined,
    sourceUrl: row.source_url ?? undefined,
    note: row.note ?? undefined,
    image: row.image,
  };
}

function listingToRow(listing: Listing) {
  return {
    dedupe_key: `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`,
    county: listing.county,
    license_type: listing.type,
    price: listing.price,
    price_label: listing.priceLabel,
    source_ref: listing.sourceRef ?? null,
    source_name: listing.sourceName ?? null,
    source_url: listing.sourceUrl ?? null,
    note: listing.note ?? null,
    image: listing.image,
    status: listing.sourceRef ? "available" : "sold",
    last_seen_at: new Date().toISOString(),
  };
}

async function upsertRows(input: Listing[]) {
  if (!databaseConfigured() || input.length === 0) return;

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/listings?on_conflict=dedupe_key`,
    {
      method: "POST",
      headers: headers({ Prefer: "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify(input.map(listingToRow)),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Listing database upsert failed: ${response.status} ${await response.text()}`);
  }
}

export async function getMarketplaceListings(): Promise<Listing[]> {
  const fallback = dedupeListings(staticListings);
  if (!databaseConfigured()) return fallback;

  try {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/listings?select=county,license_type,price,price_label,source_ref,source_name,source_url,note,image&order=created_at.asc`,
      { headers: headers(), cache: "no-store" }
    );

    if (!response.ok) throw new Error(`Listing database read failed: ${response.status}`);
    const rows = (await response.json()) as ListingRow[];
    const databaseListings = rows.map(rowToListing);
    const mergedListings = dedupeListings([...databaseListings, ...fallback]);

    // Keep Supabase synchronized with the complete built-in inventory while
    // preserving any valid database-only listings imported from authorized feeds.
    await upsertRows(mergedListings);

    return mergedListings;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

export async function upsertMarketplaceListings(input: Listing[]) {
  await upsertRows(dedupeListings(input));
}
