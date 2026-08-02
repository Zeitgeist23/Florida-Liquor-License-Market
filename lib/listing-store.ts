import "server-only";

import { listings, type Listing } from "@/data/listings";
import { additionalListings } from "@/data/additional-listings";
import { latestListings } from "@/data/latest-listings";

const staticListings = [...listings, ...additionalListings, ...latestListings].map((listing) =>
  listing.sourceRef === "FLLM-030"
    ? { ...listing, price: 200000, priceLabel: "$200,000" }
    : listing
);

function listingKey(listing: Listing) {
  return listing.sourceRef || `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}

export function dedupeListings(input: Listing[]): Listing[] {
  return Array.from(
    new Map(input.map((listing) => [listingKey(listing), listing])).values()
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
  status: "available" | "sold";
};

function rowToListing(row: ListingRow): Listing {
  return {
    county: row.county,
    type: row.license_type,
    price: row.price,
    priceLabel: row.price_label,
    sourceRef: row.status === "available" ? row.source_ref ?? undefined : undefined,
    sourceName: row.source_name ?? undefined,
    sourceUrl: row.source_url ?? undefined,
    note: row.note ?? undefined,
    image: row.image,
  };
}

function identityKeys(listing: Pick<Listing, "county" | "type" | "price" | "priceLabel" | "sourceRef" | "sourceUrl">): string[] {
  const keys = [`signature:${listing.county.trim().toLowerCase()}|${listing.type}|${listing.price ?? listing.priceLabel}`];
  if (listing.sourceRef) keys.push(`ref:${listing.sourceRef.trim().toLowerCase()}`);
  if (listing.sourceUrl) keys.push(`url:${listing.sourceUrl.trim().toLowerCase().replace(/\/+$/, "")}`);
  return keys;
}

function rowIdentityKeys(row: ListingRow): string[] {
  return identityKeys({
    county: row.county,
    type: row.license_type,
    price: row.price,
    priceLabel: row.price_label,
    sourceRef: row.source_ref ?? undefined,
    sourceUrl: row.source_url ?? undefined
  });
}

function listingToRow(listing: Listing) {
  return {
    dedupe_key: listingKey(listing),
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
      `${process.env.SUPABASE_URL}/rest/v1/listings?select=county,license_type,price,price_label,source_ref,source_name,source_url,note,image,status&order=created_at.asc`,
      { headers: headers(), cache: "no-store" }
    );

    if (!response.ok) throw new Error(`Listing database read failed: ${response.status}`);
    const rows = (await response.json()) as ListingRow[];
    const databaseIdentities = new Set(rows.flatMap(rowIdentityKeys));
    const missingStaticListings = fallback.filter((listing) =>
      identityKeys(listing).every((key) => !databaseIdentities.has(key))
    );
    const databaseListings = rows.map(rowToListing);
    const mergedListings = dedupeListings([...missingStaticListings, ...databaseListings]);

    // Seed only built-in records that do not already exist. Existing database
    // rows remain authoritative for refreshed prices and availability status.
    await upsertRows(missingStaticListings);
    return mergedListings;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

export async function upsertMarketplaceListings(input: Listing[]) {
  await upsertRows(dedupeListings(input));
}
