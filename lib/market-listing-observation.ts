import "server-only";

import type { BusinessQuotaListing } from "@/lib/business-quota-listings";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export type MarketListingObservation = {
  listingKey: string;
  firstSeenAt: string;
  lastSeenAt: string;
  removedAt: string | null;
  status: "active" | "removed" | "sold" | "withdrawn" | "unknown";
};

function sourcePlatform(url?: string) {
  if (!url) return null;
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host || null;
  } catch {
    return null;
  }
}

function headers(key: string, extra: HeadersInit = {}): HeadersInit {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function mapRow(row: any): MarketListingObservation {
  return {
    listingKey: row.listing_key,
    firstSeenAt: row.first_seen_at,
    lastSeenAt: row.last_seen_at,
    removedAt: row.removed_at ?? null,
    status: row.status,
  };
}

export async function getOrStartMarketListingObservation(
  listing: BusinessQuotaListing,
): Promise<MarketListingObservation | null> {
  try {
    const { url, key } = supabaseServiceSettings(
      "FLLM market-observation tracking is unavailable.",
    );
    const listingKey = listing.listingReference.trim().toUpperCase();
    const selectUrl =
      `${url}/rest/v1/market_listing_observations?listing_key=eq.${encodeURIComponent(listingKey)}&select=listing_key,first_seen_at,last_seen_at,removed_at,status&limit=1`;

    const existingResponse = await fetch(selectUrl, {
      headers: headers(key),
      cache: "no-store",
    });

    if (existingResponse.ok) {
      const rows = (await existingResponse.json()) as any[];
      if (rows[0]) return mapRow(rows[0]);
    }

    const sourceUrl = listing.sourceListingUrls?.[0] ?? null;
    const payload = {
      listing_key: listingKey,
      source_platform: sourcePlatform(sourceUrl ?? undefined),
      source_url: sourceUrl,
      listing_title: listing.title,
      broker_name: listing.brokerName || null,
      brokerage: listing.brokerage || null,
      county: listing.county,
      business_type: listing.businessCategory,
      license_type: listing.licenseType,
      asking_price: listing.packagePriceNumber || null,
      status: "active",
      is_featured_broker_listing: false,
    };

    const insertResponse = await fetch(
      `${url}/rest/v1/market_listing_observations?on_conflict=listing_key`,
      {
        method: "POST",
        headers: headers(key, {
          Prefer: "resolution=ignore-duplicates,return=representation",
        }),
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    if (insertResponse.ok) {
      const rows = (await insertResponse.json()) as any[];
      if (rows[0]) return mapRow(rows[0]);
    }

    const retryResponse = await fetch(selectUrl, {
      headers: headers(key),
      cache: "no-store",
    });
    if (!retryResponse.ok) return null;
    const retryRows = (await retryResponse.json()) as any[];
    return retryRows[0] ? mapRow(retryRows[0]) : null;
  } catch (error) {
    console.error("Market listing observation tracking failed", error);
    return null;
  }
}
