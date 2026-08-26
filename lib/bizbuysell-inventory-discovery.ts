import "server-only";

import { floridaCounties } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import type { DiscoveryCandidate } from "@/lib/listing-discovery";
import { canonicalizeSourceUrl } from "@/lib/listing-discovery";
import {
  isUnavailableListing,
  listingImageForCounty,
  parseLicenseCandidate
} from "@/lib/florida-license-parser";

type TavilyResult = {
  title?: string;
  url?: string;
  content?: string;
  raw_content?: string | null;
  score?: number;
};

type TavilyResponse = {
  results?: TavilyResult[];
};

export type BizBuySellReconciliationRun = {
  countyBatch: string[];
  searchedCounties: number;
  searchResults: number;
  qualifiedListings: Listing[];
  manualReviewCandidates: number;
  rejectedResults: number;
  failedCounties: Array<{ county: string; error: string }>;
  reviewCandidates: DiscoveryCandidate[];
};

const SOURCE_ID = "bizbuysell";
const SOURCE_NAME = "BizBuySell";
const SOURCE_DOMAIN = "bizbuysell.com";
const COUNTY_BATCH_COUNT = 12;
const MAX_RESULTS_PER_COUNTY = 20;

function countiesForCurrentRun(now = Date.now()): string[] {
  const hourlySlot = Math.floor(now / 3_600_000);
  const batchIndex = hourlySlot % COUNTY_BATCH_COUNT;
  return floridaCounties
    .map((county) => county.name)
    .filter((_, index) => index % COUNTY_BATCH_COUNT === batchIndex);
}

function combinedText(result: TavilyResult): string {
  return [result.title, result.content, result.raw_content, result.url]
    .filter((value): value is string => Boolean(value?.trim()))
    .join("\n");
}

function stableAdRef(sourceUrl: string): string | null {
  const matches = Array.from(new URL(sourceUrl).pathname.matchAll(/\/(\d{6,})(?:\/|$)/g));
  const adId = matches.at(-1)?.[1];
  return adId ? `BBS-${adId}` : null;
}

function isBizBuySellUrl(value: string): boolean {
  try {
    const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "");
    return host === SOURCE_DOMAIN || host.endsWith(`.${SOURCE_DOMAIN}`);
  } catch {
    return false;
  }
}

function isLicenseOnlyAssetUrl(value: string): boolean {
  return /^\/business-asset\//i.test(new URL(value).pathname);
}

function candidateFor(
  result: TavilyResult,
  sourceUrl: string,
  reason: DiscoveryCandidate["reason"],
  parsed: ReturnType<typeof parseLicenseCandidate>
): DiscoveryCandidate {
  return {
    sourceId: SOURCE_ID,
    sourceName: SOURCE_NAME,
    sourceUrl,
    title: result.title?.trim() || sourceUrl,
    reason,
    score: typeof result.score === "number" ? result.score : null,
    county: parsed.county,
    licenseType: parsed.type,
    price: parsed.price
  };
}

function analyzeResult(result: TavilyResult): { listing?: Listing; candidate?: DiscoveryCandidate } {
  const rawUrl = result.url?.trim();
  const title = result.title?.trim();
  if (!rawUrl || !title || !isBizBuySellUrl(rawUrl)) return {};
  if ((result.score ?? 1) < 0.15) return {};

  const text = combinedText(result);
  const parsed = parseLicenseCandidate(text);
  const statusText = [result.title, result.content, result.raw_content].filter(Boolean).join("\n");
  if (!parsed.hasLicenseLanguage || !parsed.hasSaleIntent || isUnavailableListing(statusText)) return {};

  const sourceUrl = canonicalizeSourceUrl(rawUrl);
  const sourceRef = stableAdRef(sourceUrl);
  if (!sourceRef) {
    return { candidate: candidateFor(result, sourceUrl, "unrecognized_listing_url", parsed) };
  }

  // BizBuySell business-opportunity prices can include an operating business,
  // inventory, equipment, or real estate. Only license-only asset-sale pages
  // are safe to publish automatically as liquor-license asking prices.
  if (!isLicenseOnlyAssetUrl(sourceUrl)) {
    return { candidate: candidateFor(result, sourceUrl, "source_requires_review", parsed) };
  }
  if (!parsed.county) {
    return { candidate: candidateFor(result, sourceUrl, "county_not_identified", parsed) };
  }
  if (!parsed.type) {
    return { candidate: candidateFor(result, sourceUrl, "license_type_not_identified", parsed) };
  }

  return {
    listing: {
      county: parsed.county,
      type: parsed.type,
      price: parsed.price,
      priceLabel: parsed.price === null ? "Price Undisclosed" : `$${parsed.price.toLocaleString("en-US")}`,
      sourceRef,
      sourceName: SOURCE_NAME,
      sourceUrl,
      note: "Public marketplace listing. Price and availability subject to confirmation.",
      image: listingImageForCounty(parsed.county)
    }
  };
}

function queryForCounty(county: string): string {
  return `"${county}" Florida (4COP OR 3PS OR "quota liquor license" OR "full liquor license" OR "package store license") ("for sale" OR "asset sale" OR available OR "asking price")`;
}

async function searchCounty(apiKey: string, county: string): Promise<TavilyResult[]> {
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: queryForCounty(county),
      search_depth: "advanced",
      max_results: MAX_RESULTS_PER_COUNTY,
      topic: "general",
      include_answer: false,
      include_raw_content: "text",
      include_images: false,
      include_domains: [SOURCE_DOMAIN],
      country: "united states",
      auto_parameters: false,
      safe_search: true
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000)
  });

  if (!response.ok) throw new Error(`Tavily returned ${response.status}`);
  const body = (await response.json()) as TavilyResponse;
  return Array.isArray(body.results) ? body.results : [];
}

export async function reconcileBizBuySellInventory(apiKey: string): Promise<BizBuySellReconciliationRun> {
  const countyBatch = countiesForCurrentRun();
  const settled = await Promise.allSettled(
    countyBatch.map(async (county) => ({ county, results: await searchCounty(apiKey, county) }))
  );

  const uniqueResults = new Map<string, TavilyResult>();
  const failedCounties: Array<{ county: string; error: string }> = [];

  settled.forEach((result, index) => {
    if (result.status === "rejected") {
      failedCounties.push({
        county: countyBatch[index],
        error: result.reason instanceof Error ? result.reason.message : String(result.reason)
      });
      return;
    }

    for (const item of result.value.results) {
      const rawUrl = item.url?.trim();
      if (!rawUrl) continue;
      try {
        uniqueResults.set(canonicalizeSourceUrl(rawUrl), item);
      } catch {
        uniqueResults.set(rawUrl, item);
      }
    }
  });

  const qualifiedByRef = new Map<string, Listing>();
  const reviewByUrl = new Map<string, DiscoveryCandidate>();
  let rejectedResults = 0;

  for (const result of uniqueResults.values()) {
    const analysis = analyzeResult(result);
    if (analysis.listing?.sourceRef) {
      qualifiedByRef.set(analysis.listing.sourceRef, analysis.listing);
    } else if (analysis.candidate) {
      reviewByUrl.set(analysis.candidate.sourceUrl, analysis.candidate);
    } else {
      rejectedResults += 1;
    }
  }

  return {
    countyBatch,
    searchedCounties: countyBatch.length - failedCounties.length,
    searchResults: uniqueResults.size,
    qualifiedListings: Array.from(qualifiedByRef.values()),
    manualReviewCandidates: reviewByUrl.size,
    rejectedResults,
    failedCounties,
    reviewCandidates: Array.from(reviewByUrl.values())
  };
}
