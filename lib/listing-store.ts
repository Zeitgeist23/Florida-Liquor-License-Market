import "server-only";

import { listings, type Listing } from "@/data/listings";
import { additionalListings } from "@/data/additional-listings";
import { latestListings } from "@/data/latest-listings";
import { marketAdditions } from "@/data/market-additions";
import { canonicalFloridaCountyName } from "@/lib/county-normalization";
import {
  resolveListingInventoryClass,
  withListingInventoryClass,
  type ClassifiedListing,
  type ListingInventoryClass,
  type ListingWithInventoryClass,
} from "@/lib/listing-inventory-class";

function normalizeListing(
  listing: ListingWithInventoryClass,
): ClassifiedListing {
  return withListingInventoryClass({
    ...listing,
    county: canonicalFloridaCountyName(listing.county),
  });
}

const staticListings: ClassifiedListing[] = [
  ...listings,
  ...additionalListings,
  ...latestListings,
  ...marketAdditions,
].map((listing) =>
  normalizeListing(
    listing.sourceRef === "FLLM-030"
      ? { ...listing, price: 200000, priceLabel: "$200,000" }
      : listing,
  ),
);

function listingKey(listing: ListingWithInventoryClass) {
  const county = canonicalFloridaCountyName(listing.county);
  return (
    listing.sourceRef ||
    `${county}|${listing.type}|${listing.price ?? listing.priceLabel}`
  );
}

export function dedupeListings(
  input: ListingWithInventoryClass[],
): ClassifiedListing[] {
  return Array.from(
    new Map(
      input
        .map(normalizeListing)
        .map((listing) => [listingKey(listing), listing]),
    ).values(),
  );
}

function databaseConfigured() {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
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
  inventory_class?: ListingInventoryClass | null;
};

function rowToListing(row: ListingRow): ClassifiedListing {
  return normalizeListing({
    county: row.county,
    type: row.license_type,
    price: row.price,
    priceLabel: row.price_label,
    sourceRef:
      row.status === "available" ? (row.source_ref ?? undefined) : undefined,
    sourceName: row.source_name ?? undefined,
    sourceUrl: row.source_url ?? undefined,
    note: row.note ?? undefined,
    image: row.image,
    inventoryClass: row.inventory_class ?? undefined,
  });
}

type ApprovedListingDetailsRow = {
  submission_ref: string;
  license_status: string | null;
  preferred_timing: string | null;
  message: string | null;
  approved_at: string | null;
};

async function getApprovedListingDetails() {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/listing_submissions?status=eq.approved&select=submission_ref,license_status,preferred_timing,message,approved_at`,
    { headers: headers(), cache: "no-store" },
  );
  if (!response.ok) {
    console.error(`Approved listing details read failed: ${response.status}`);
    return new Map<string, ApprovedListingDetailsRow>();
  }
  const rows = (await response.json()) as ApprovedListingDetailsRow[];
  return new Map(rows.map((row) => [row.submission_ref, row]));
}

function activeFeaturedUntil(details: ApprovedListingDetailsRow | undefined) {
  if (
    !details?.approved_at ||
    !details.message?.includes("Listing option: Featured Broker Listing")
  ) {
    return undefined;
  }

  const expiresAt = new Date(details.approved_at);
  if (Number.isNaN(expiresAt.getTime())) return undefined;
  expiresAt.setUTCDate(expiresAt.getUTCDate() + 30);
  return expiresAt.getTime() > Date.now() ? expiresAt.toISOString() : undefined;
}

function identityKeys(
  listing: Pick<
    Listing,
    "county" | "type" | "price" | "priceLabel" | "sourceRef" | "sourceUrl"
  >,
): string[] {
  const county = canonicalFloridaCountyName(listing.county).toLowerCase();
  const keys = [
    `signature:${county}|${listing.type}|${listing.price ?? listing.priceLabel}`,
  ];
  if (listing.sourceRef)
    keys.push(`ref:${listing.sourceRef.trim().toLowerCase()}`);
  if (listing.sourceUrl)
    keys.push(
      `url:${listing.sourceUrl.trim().toLowerCase().replace(/\/+$/, "")}`,
    );
  return keys;
}

function rowIdentityKeys(row: ListingRow): string[] {
  return identityKeys({
    county: row.county,
    type: row.license_type,
    price: row.price,
    priceLabel: row.price_label,
    sourceRef: row.source_ref ?? undefined,
    sourceUrl: row.source_url ?? undefined,
  });
}

function listingToRow(listing: ListingWithInventoryClass) {
  const classified = normalizeListing(listing);
  return {
    dedupe_key: listingKey(classified),
    county: classified.county,
    license_type: classified.type,
    price: classified.price,
    price_label: classified.priceLabel,
    source_ref: classified.sourceRef ?? null,
    source_name: classified.sourceName ?? null,
    source_url: classified.sourceUrl ?? null,
    note: classified.note ?? null,
    image: classified.image,
    status: classified.sourceRef ? "available" : "sold",
    inventory_class: classified.inventoryClass,
    last_seen_at: new Date().toISOString(),
  };
}

function isMissingInventoryClassError(message: string): boolean {
  return /inventory_class/i.test(message);
}

function withoutInventoryClass<
  T extends { inventory_class: ListingInventoryClass },
>(row: T) {
  const { inventory_class: _inventoryClass, ...legacyRow } = row;
  return legacyRow;
}

async function upsertRows(input: ListingWithInventoryClass[]) {
  if (!databaseConfigured() || input.length === 0) return;

  const rows = input.map(listingToRow);
  const endpoint = `${process.env.SUPABASE_URL}/rest/v1/listings?on_conflict=dedupe_key`;
  const requestHeaders = headers({
    Prefer: "resolution=merge-duplicates,return=minimal",
  });

  let response = await fetch(endpoint, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(rows),
    cache: "no-store",
  });

  if (response.ok) return;

  const firstError = await response.text();
  let finalStatus = response.status;
  let finalError = firstError;

  // Keep the deployment backward-compatible until the inventory_class SQL
  // migration is applied to an existing Supabase project. Runtime listings are
  // still classified immediately; persistence begins as soon as the column exists.
  if (isMissingInventoryClassError(firstError)) {
    response = await fetch(endpoint, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(rows.map(withoutInventoryClass)),
      cache: "no-store",
    });
    if (response.ok) return;
    finalStatus = response.status;
    finalError = await response.text();
  }

  throw new Error(
    `Listing database upsert failed: ${finalStatus} ${finalError || firstError}`,
  );
}

async function readListingRows(): Promise<ListingRow[]> {
  const baseFields =
    "county,license_type,price,price_label,source_ref,source_name,source_url,note,image,status";
  let response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/listings?select=${baseFields},inventory_class&order=created_at.asc`,
    { headers: headers(), cache: "no-store" },
  );

  if (response.ok) return (await response.json()) as ListingRow[];

  const firstError = await response.text();
  if (!isMissingInventoryClassError(firstError)) {
    throw new Error(
      `Listing database read failed: ${response.status} ${firstError}`,
    );
  }

  response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/listings?select=${baseFields}&order=created_at.asc`,
    { headers: headers(), cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(
      `Listing database read failed: ${response.status} ${await response.text()}`,
    );
  }

  return (await response.json()) as ListingRow[];
}

export async function getMarketplaceListings(): Promise<ClassifiedListing[]> {
  const fallback = dedupeListings(staticListings);
  if (!databaseConfigured()) return fallback;

  try {
    const rows = await readListingRows();
    const databaseIdentities = new Set(rows.flatMap(rowIdentityKeys));
    const missingStaticListings = fallback.filter((listing) =>
      identityKeys(listing).every((key) => !databaseIdentities.has(key)),
    );
    const approvedDetails = await getApprovedListingDetails();
    const databaseListings: ClassifiedListing[] = rows.map((row) => {
      const listing = rowToListing(row);
      const details = row.source_ref
        ? approvedDetails.get(row.source_ref)
        : undefined;
      return normalizeListing({
        ...listing,
        inventoryClass:
          row.inventory_class ?? resolveListingInventoryClass(listing),
        licenseStatus: details?.license_status ?? undefined,
        preferredTiming: details?.preferred_timing ?? undefined,
        featuredUntil: activeFeaturedUntil(details),
      });
    });
    const mergedListings = dedupeListings([
      ...missingStaticListings,
      ...databaseListings,
    ]);

    // Seed only built-in records that do not already exist. Existing database
    // rows remain authoritative for refreshed prices and availability status.
    await upsertRows(missingStaticListings);
    return mergedListings;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

export async function upsertMarketplaceListings(
  input: ListingWithInventoryClass[],
) {
  await upsertRows(dedupeListings(input));
}
