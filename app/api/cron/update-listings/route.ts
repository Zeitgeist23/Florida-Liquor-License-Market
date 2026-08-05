import { NextRequest, NextResponse } from "next/server";
import type { Listing } from "@/data/listings";
import { publishDiscoveredListings } from "@/lib/discovered-listing-store";
import { discoverPublicListings } from "@/lib/listing-discovery";
import {
  beginDiscoveryRun,
  finishDiscoveryRun,
  recordDiscoveryCandidates
} from "@/lib/listing-discovery-log";
import { refreshKnownListings } from "@/lib/listing-refresh";
import { upsertMarketplaceListings } from "@/lib/listing-store";
import { runDueLicenseReminders } from "@/lib/license-renewal-reminders";
import { discoverQuotaPhraseListings } from "@/lib/quota-listing-discovery";

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

function resultError(result: PromiseSettledResult<unknown>): string | undefined {
  if (result.status === "fulfilled") return undefined;
  return result.reason instanceof Error ? result.reason.message : String(result.reason);
}

function listingIdentity(listing: Listing): string {
  const sourceRef = listing.sourceRef?.trim().toLowerCase();
  if (sourceRef) return `ref:${sourceRef}`;

  const sourceUrl = listing.sourceUrl?.trim().toLowerCase().replace(/\/+$/, "");
  if (sourceUrl) return `url:${sourceUrl}`;

  return `fallback:${listing.county}|${listing.type}|${listing.price ?? listing.priceLabel}`;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const runId = await beginDiscoveryRun("daily-marketplace-maintenance");
  try {
    const feedUrls = (process.env.AUTHORIZED_LISTING_FEEDS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const tavilyApiKey = process.env.TAVILY_API_KEY?.trim();
    const autoDiscoveryEnabled = Boolean(tavilyApiKey) && process.env.AUTO_DISCOVERY_ENABLED !== "false";

    const feedPromise = Promise.allSettled(feedUrls.map(readFeed));
    const maintenancePromise = Promise.allSettled([
      autoDiscoveryEnabled && tavilyApiKey ? discoverPublicListings(tavilyApiKey) : Promise.resolve(null),
      autoDiscoveryEnabled && tavilyApiKey ? discoverQuotaPhraseListings(tavilyApiKey) : Promise.resolve(null),
      tavilyApiKey ? refreshKnownListings(tavilyApiKey) : Promise.resolve(null),
      runDueLicenseReminders()
    ] as const);

    const [feedResults, [primaryResult, supplementalResult, refreshResult, reminderResult]] = await Promise.all([
      feedPromise,
      maintenancePromise
    ]);

    const feedListings = feedResults.flatMap((result) => result.status === "fulfilled" ? result.value : []);
    await upsertMarketplaceListings(feedListings);

    const primary = primaryResult.status === "fulfilled" ? primaryResult.value : null;
    const supplemental = supplementalResult.status === "fulfilled" ? supplementalResult.value : null;
    const refresh = refreshResult.status === "fulfilled" ? refreshResult.value : null;
    const reminders = reminderResult.status === "fulfilled" ? reminderResult.value : null;

    const discoveredByIdentity = new Map<string, Listing>();
    for (const listing of [
      ...(primary?.qualifiedListings ?? []),
      ...(supplemental?.qualifiedListings ?? [])
    ]) {
      discoveredByIdentity.set(listingIdentity(listing), listing);
    }

    const publish = await publishDiscoveredListings(Array.from(discoveredByIdentity.values()));
    await recordDiscoveryCandidates(runId, [
      ...(primary?.reviewCandidates ?? []),
      ...(supplemental?.reviewCandidates ?? [])
    ]);

    const response = {
      feeds: {
        configured: feedUrls.length,
        updated: feedListings.length,
        failed: feedResults.filter((result) => result.status === "rejected").length
      },
      discovery: {
        enabled: autoDiscoveryEnabled,
        qualified: discoveredByIdentity.size,
        inserted: publish.inserted,
        refreshedExisting: publish.refreshedExisting,
        priceUpdated: publish.priceUpdated,
        statusUpdated: publish.statusUpdated,
        skippedExisting: publish.skippedExisting,
        skippedDuplicateCandidate: publish.skippedDuplicateCandidate,
        databaseConfigured: publish.databaseConfigured,
        primary: primary ? {
          checkedSources: primary.checkedSources,
          searchResults: primary.searchResults,
          qualified: primary.qualifiedListings.length,
          manualReviewCandidates: primary.manualReviewCandidates,
          rejectedResults: primary.rejectedResults,
          sources: primary.sourceResults
        } : {
          error: resultError(primaryResult),
          message: autoDiscoveryEnabled ? undefined : "Automatic discovery is disabled or TAVILY_API_KEY is missing."
        },
        supplemental: supplemental ? {
          checkedSources: supplemental.checkedSources,
          searchResults: supplemental.searchResults,
          qualified: supplemental.qualifiedListings.length,
          manualReviewCandidates: supplemental.manualReviewCandidates,
          rejectedResults: supplemental.rejectedResults,
          countyBatch: supplemental.countyBatch,
          sources: supplemental.sourceResults
        } : {
          error: resultError(supplementalResult),
          message: autoDiscoveryEnabled ? undefined : "Supplemental discovery is disabled or TAVILY_API_KEY is missing."
        }
      },
      refresh: refresh ?? {
        enabled: false,
        error: resultError(refreshResult),
        message: tavilyApiKey ? undefined : "TAVILY_API_KEY is missing."
      },
      renewalReminders: reminders ?? {
        error: resultError(reminderResult)
      }
    };

    await finishDiscoveryRun(runId, "succeeded", response);
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await finishDiscoveryRun(runId, "failed", {}, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
