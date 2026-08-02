import "server-only";

import { createHash } from "node:crypto";
import type { Listing } from "@/data/listings";
import { canonicalizeSourceUrl } from "@/lib/listing-discovery";

export type DiscoveryPublishResult = {
  databaseConfigured: boolean;
  inserted: number;
  refreshedExisting: number;
  priceUpdated: number;
  statusUpdated: number;
  skippedExisting: number;
  skippedDuplicateCandidate: number;
};

type ExistingListingRow = {
  id: number;
  county: string;
  license_type: Listing["type"];
  price: number | null;
  price_label: string;
  source_ref: string | null;
  source_url: string | null;
  status: "available" | "sold";
};

function databaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function headers(extra: HeadersInit = {}): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra
  };
}

function sourceUrlKey(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return canonicalizeSourceUrl(value).toLowerCase();
  } catch {
    return value.trim().toLowerCase();
  }
}

function sourceRefKey(value: string | null | undefined): string | null {
  return value?.trim().toLowerCase() || null;
}

function marketSignature(county: string, type: Listing["type"], price: number | null): string | null {
  if (price === null) return null;
  return `${county.trim().toLowerCase()}|${type}|${price}`;
}

function discoveryDedupeKey(listing: Listing): string {
  const ref = sourceRefKey(listing.sourceRef);
  if (ref) return `source-ref:${ref}`;

  const url = sourceUrlKey(listing.sourceUrl);
  if (url) return `source-url:${createHash("sha256").update(url).digest("hex")}`;

  return `discovery:${createHash("sha256")
    .update(`${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`)
    .digest("hex")}`;
}

function listingToRow(listing: Listing) {
  return {
    dedupe_key: discoveryDedupeKey(listing),
    county: listing.county,
    license_type: listing.type,
    price: listing.price,
    price_label: listing.priceLabel,
    source_ref: listing.sourceRef ?? null,
    source_name: listing.sourceName ?? null,
    source_url: listing.sourceUrl ?? null,
    note: listing.note ?? null,
    image: listing.image,
    status: "available",
    last_seen_at: new Date().toISOString()
  };
}

async function refreshExistingRow(row: ExistingListingRow, listing: Listing): Promise<void> {
  const now = new Date().toISOString();
  const update: Record<string, unknown> = {
    status: "available",
    last_seen_at: now,
    updated_at: now
  };

  // A short search result can omit a price. Never replace a known price with
  // "undisclosed", but do apply a newly observed numeric asking price.
  if (listing.price !== null) {
    update.price = listing.price;
    update.price_label = listing.priceLabel;
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/listings?id=eq.${row.id}`,
    {
      method: "PATCH",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify(update),
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Existing listing refresh failed: ${response.status} ${await response.text()}`);
  }
}

export async function publishDiscoveredListings(input: Listing[]): Promise<DiscoveryPublishResult> {
  if (!databaseConfigured()) {
    return {
      databaseConfigured: false,
      inserted: 0,
      refreshedExisting: 0,
      priceUpdated: 0,
      statusUpdated: 0,
      skippedExisting: input.length,
      skippedDuplicateCandidate: 0
    };
  }

  if (input.length === 0) {
    return {
      databaseConfigured: true,
      inserted: 0,
      refreshedExisting: 0,
      priceUpdated: 0,
      statusUpdated: 0,
      skippedExisting: 0,
      skippedDuplicateCandidate: 0
    };
  }

  const existingResponse = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/listings?select=id,county,license_type,price,price_label,source_ref,source_url,status`,
    { headers: headers(), cache: "no-store" }
  );

  if (!existingResponse.ok) {
    throw new Error(`Listing database read failed: ${existingResponse.status} ${await existingResponse.text()}`);
  }

  const existingRows = (await existingResponse.json()) as ExistingListingRow[];
  const existingUrls = new Map<string, ExistingListingRow>();
  const existingRefs = new Map<string, ExistingListingRow>();
  for (const row of existingRows) {
    const url = sourceUrlKey(row.source_url);
    const ref = sourceRefKey(row.source_ref);
    if (url) existingUrls.set(url, row);
    if (ref) existingRefs.set(ref, row);
  }
  const existingSignatures = new Set(
    existingRows
      .map((row) => marketSignature(row.county, row.license_type, row.price))
      .filter((value): value is string => Boolean(value))
  );

  const accepted = new Map<string, Listing>();
  const refreshes = new Map<number, { row: ExistingListingRow; listing: Listing }>();
  let refreshedExisting = 0;
  let priceUpdated = 0;
  let statusUpdated = 0;
  let skippedExisting = 0;
  let skippedDuplicateCandidate = 0;

  for (const listing of input) {
    const url = sourceUrlKey(listing.sourceUrl);
    const ref = sourceRefKey(listing.sourceRef);
    const signature = marketSignature(listing.county, listing.type, listing.price);
    const existing = (url ? existingUrls.get(url) : undefined) ?? (ref ? existingRefs.get(ref) : undefined);

    if (existing) {
      if (!refreshes.has(existing.id)) {
        refreshes.set(existing.id, { row: existing, listing });
        refreshedExisting += 1;
        if (listing.price !== null && (existing.price !== listing.price || existing.price_label !== listing.priceLabel)) {
          priceUpdated += 1;
        }
        if (existing.status !== "available") statusUpdated += 1;
      } else {
        skippedDuplicateCandidate += 1;
      }
      continue;
    }

    if (signature && existingSignatures.has(signature)) {
      skippedExisting += 1;
      continue;
    }

    const key = url ? `url:${url}` : ref ? `ref:${ref}` : signature ? `signature:${signature}` : discoveryDedupeKey(listing);
    if (accepted.has(key)) {
      skippedDuplicateCandidate += 1;
      continue;
    }

    accepted.set(key, listing);
    if (signature) existingSignatures.add(signature);
  }

  await Promise.all(Array.from(refreshes.values()).map(({ row, listing }) => refreshExistingRow(row, listing)));

  const listings = Array.from(accepted.values());
  if (listings.length === 0) {
    return {
      databaseConfigured: true,
      inserted: 0,
      refreshedExisting,
      priceUpdated,
      statusUpdated,
      skippedExisting,
      skippedDuplicateCandidate
    };
  }

  const insertResponse = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/listings?on_conflict=dedupe_key`,
    {
      method: "POST",
      headers: headers({ Prefer: "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify(listings.map(listingToRow)),
      cache: "no-store"
    }
  );

  if (!insertResponse.ok) {
    throw new Error(`Discovered listing insert failed: ${insertResponse.status} ${await insertResponse.text()}`);
  }

  return {
    databaseConfigured: true,
    inserted: listings.length,
    refreshedExisting,
    priceUpdated,
    statusUpdated,
    skippedExisting,
    skippedDuplicateCandidate
  };
}
