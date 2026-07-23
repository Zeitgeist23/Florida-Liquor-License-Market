import { NextRequest, NextResponse } from "next/server";
import type { Listing } from "@/data/listings";
import { upsertMarketplaceListings } from "@/lib/listing-store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type FeedListing = Partial<Listing> & {
  county?: string;
  type?: string;
  price?: number | null;
  priceLabel?: string;
};

function normalizeType(value: string | undefined): Listing["type"] | null {
  const normalized = value?.toLowerCase().replace(/[^a-z0-9]/g, "") ?? "";
  if (normalized.includes("4cop")) return "4COP Quota";
  if (normalized.includes("3ps")) return "3PS Quota / Package Store";
  return null;
}

function normalizeListing(item: FeedListing, feedUrl: string): Listing | null {
  const type = normalizeType(item.type);
  const county = item.county?.trim();
  if (!county || !type || !item.sourceRef) return null;

  const price = typeof item.price === "number" && Number.isFinite(item.price) ? item.price : null;
  const priceLabel = item.priceLabel?.trim() || (price === null ? "Price Undisclosed" : `$${price.toLocaleString("en-US")}`);

  return {
    county: county.endsWith(" County") ? county : `${county} County`,
    type,
    price,
    priceLabel,
    sourceRef: item.sourceRef.trim(),
    sourceName: item.sourceName?.trim() || new URL(feedUrl).hostname,
    sourceUrl: item.sourceUrl?.trim() || feedUrl,
    note: item.note?.trim() || "External listing. Price and availability subject to confirmation.",
    image: item.image?.trim() || "/assets/listing-miami.png",
  };
}

async function readFeed(feedUrl: string): Promise<Listing[]> {
  const response = await fetch(feedUrl, {
    headers: { Accept: "application/json", "User-Agent": "FloridaLiquorLicenseMarket/1.0" },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) throw new Error(`${feedUrl} returned ${response.status}`);
  const body = await response.json();
  const items: FeedListing[] = Array.isArray(body) ? body : Array.isArray(body?.listings) ? body.listings : [];
  return items.map((item) => normalizeListing(item, feedUrl)).filter((item): item is Listing => Boolean(item));
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const feedUrls = (process.env.AUTHORIZED_LISTING_FEEDS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (feedUrls.length === 0) {
    return NextResponse.json({ updated: 0, feeds: 0, message: "No authorized listing feeds configured." });
  }

  const results = await Promise.allSettled(feedUrls.map(readFeed));
  const listings = results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  await upsertMarketplaceListings(listings);

  return NextResponse.json({
    updated: listings.length,
    feeds: feedUrls.length,
    failedFeeds: results.filter((result) => result.status === "rejected").length,
  });
}
