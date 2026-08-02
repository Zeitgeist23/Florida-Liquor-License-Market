import { NextRequest, NextResponse } from "next/server";
import type { Listing } from "@/data/listings";
import { publishDiscoveredListings } from "@/lib/discovered-listing-store";
import { discoverPublicListings } from "@/lib/listing-discovery";
import { refreshKnownListings } from "@/lib/listing-refresh";
import { discoverQuotaPhraseListings } from "@/lib/quota-listing-discovery";
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

function discoveryKey(listing: Listing): string {
  return listing.sourceUrl?.trim().toLowerCase()
    || listing.sourceRef?.trim().toLowerCase()
    || `${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}

function errorMessage(result: PromiseRejectedResult | undefined): string | undefined {
  if (!result) return undefined;
  return result.reason instanceof Error ? result.reason.message : String(result.reason);
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
    try {
      const [primaryResult, supplementalResult, refreshResult] = await Promise.allSettled([
        discoverPublicListings(tavilyApiKey),
        discoverQuotaPhraseListings(tavilyApiKey),
        refreshKnownListings(tavilyApiKey)
      ]);

      const primary = primaryResult.status === "fulfilled" ? primaryResult.value : undefined;
      const supplemental = supplementalResult.status === "fulfilled" ? supplementalResult.value : undefined;
      const refresh = refreshResult.status === "fulfilled" ? refreshResult.value : undefined;
      const qualifiedListings = Array.from(
        new Map(
          [...(primary?.qualifiedListings ?? []), ...(supplemental?.qualifiedListings ?? [])]
            .map((listing) => [discoveryKey(listing), listing])
        ).values()
      );
      const publish = await publishDiscoveredListings(qualifiedListings);

      discovery = {
        enabled: true,
        checkedSources: Math.max(primary?.checkedSources ?? 0, supplemental?.checkedSources ?? 0),
        searchResults: (primary?.searchResults ?? 0) + (supplemental?.searchResults ?? 0),
        qualified: qualifiedListings.length,
        inserted: publish.inserted,
        refreshedExisting: publish.refreshedExisting,
        priceUpdated: publish.priceUpdated,
        statusUpdated: publish.statusUpdated,
        skippedExisting: publish.skippedExisting,
        skippedDuplicateCandidate: publish.skippedDuplicateCandidate,
        manualReviewCandidates: primary?.manualReviewCandidates ?? 0,
        rejectedResults: (primary?.rejectedResults ?? 0) + (supplemental?.rejectedResults ?? 0),
        databaseConfigured: publish.databaseConfigured,
        sources: primary?.sourceResults ?? [],
        primaryError: primaryResult.status === "rejected" ? errorMessage(primaryResult) : undefined,
        knownListingRefresh: {
          checked: refresh?.checked ?? 0,
          refreshed: refresh?.refreshed ?? 0,
          priceUpdated: refresh?.priceUpdated ?? 0,
          statusUpdated: refresh?.statusUpdated ?? 0,
          failed: refresh?.failed ?? 0,
          databaseConfigured: refresh?.databaseConfigured ?? false,
          error: refreshResult.status === "rejected" ? errorMessage(refreshResult) : undefined
        },
        supplemental: {
          checkedSources: supplemental?.checkedSources ?? 0,
          searchResults: supplemental?.searchResults ?? 0,
          qualified: supplemental?.qualifiedListings.length ?? 0,
          rejectedResults: supplemental?.rejectedResults ?? 0,
          countyBatch: supplemental?.countyBatch ?? [],
          sources: supplemental?.sourceResults ?? [],
          error: supplementalResult.status === "rejected" ? errorMessage(supplementalResult) : undefined
        }
      };
    } catch (error) {
      discovery = {
        ...discovery,
        enabled: true,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  } else if (!tavilyApiKey) {
    discovery.message = "TAVILY_API_KEY is not configured; authorized JSON feeds were still checked.";
  } else {
    discovery.message = "Automatic public-web discovery is disabled by AUTO_DISCOVERY_ENABLED=false.";
  }

  return NextResponse.json({
    feeds: {
      configured: feedUrls.length,
      updated: feedListings.length,
      failed: feedResults.filter((result) => result.status === "rejected").length
    },
    discovery
  });
}
