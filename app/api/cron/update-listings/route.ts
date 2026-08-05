import { NextRequest, NextResponse } from "next/server";
import type { Listing } from "@/data/listings";
import { publishDiscoveredListings } from "@/lib/discovered-listing-store";
import { discoverPublicListings } from "@/lib/listing-discovery";
import {
  beginDiscoveryRun,
  finishDiscoveryRun,
  recordDiscoveryCandidates
} from "@/lib/listing-discovery-log";
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
    image: item.image?.trim() || "/assets/listing-miami.png"
  };
}

async function readFeed(feedUrl: string): Promise<Listing[]> {
  const response = await fetch(feedUrl, {
    headers: { Accept: "application/json", "User-Agent": "FloridaLiquorLicenseMarket/1.0" },
    cache: "no-store",
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) throw new Error(`${feedUrl} returned ${response.status}`);
  const body = await response.json();
  const items: FeedListing[] = Array.isArray(body) ? body : Array.isArray(body?.listings) ? body.listings : [];
  return items.map((item) => normalizeListing(item, feedUrl)).filter((item): item is Listing => Boolean(item));
}

function authorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && request.headers.get("authorization") === `Bearer ${secret}`);
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const runId = await beginDiscoveryRun("primary-listing-discovery");
  try {
    const feedUrls = (process.env.AUTHORIZED_LISTING_FEEDS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const feedResults = await Promise.allSettled(feedUrls.map(readFeed));
    const feedListings = feedResults.flatMap((result) => result.status === "fulfilled" ? result.value : []);
    await upsertMarketplaceListings(feedListings);

    const tavilyApiKey = process.env.TAVILY_API_KEY?.trim();
    const autoDiscoveryEnabled = Boolean(tavilyApiKey) && process.env.AUTO_DISCOVERY_ENABLED !== "false";

    let discovery: Record<string, unknown> = {
      enabled: autoDiscoveryEnabled,
      checkedSources: 0,
      searchResults: 0,
      qualified: 0,
      inserted: 0,
      refreshedExisting: 0,
      priceUpdated: 0,
      statusUpdated: 0,
      skippedExisting: 0,
      skippedDuplicateCandidate: 0,
      manualReviewCandidates: 0,
      rejectedResults: 0
    };

    if (autoDiscoveryEnabled && tavilyApiKey) {
      const result = await discoverPublicListings(tavilyApiKey);
      const publish = await publishDiscoveredListings(result.qualifiedListings);
      await recordDiscoveryCandidates(runId, result.reviewCandidates);

      discovery = {
        enabled: true,
        checkedSources: result.checkedSources,
        searchResults: result.searchResults,
        qualified: result.qualifiedListings.length,
        inserted: publish.inserted,
        refreshedExisting: publish.refreshedExisting,
        priceUpdated: publish.priceUpdated,
        statusUpdated: publish.statusUpdated,
        skippedExisting: publish.skippedExisting,
        skippedDuplicateCandidate: publish.skippedDuplicateCandidate,
        manualReviewCandidates: result.manualReviewCandidates,
        rejectedResults: result.rejectedResults,
        databaseConfigured: publish.databaseConfigured,
        sources: result.sourceResults
      };
    } else if (!tavilyApiKey) {
      discovery.message = "TAVILY_API_KEY is not configured; authorized JSON feeds were still checked.";
    } else {
      discovery.message = "Automatic public-web discovery is disabled by AUTO_DISCOVERY_ENABLED=false.";
    }

    const response = {
      feeds: {
        configured: feedUrls.length,
        updated: feedListings.length,
        failed: feedResults.filter((result) => result.status === "rejected").length
      },
      discovery
    };

    await finishDiscoveryRun(runId, "succeeded", response);
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await finishDiscoveryRun(runId, "failed", {}, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
