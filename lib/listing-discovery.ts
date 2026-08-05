import "server-only";

import { createHash } from "node:crypto";
import discoveryConfigJson from "@/data/florida-liquor-license-auto-discovery.json";
import type { Listing } from "@/data/listings";
import {
  isUnavailableListing,
  listingImageForCounty,
  parseLicenseCandidate
} from "@/lib/florida-license-parser";

export type DiscoverySourceResult = {
  sourceId: string;
  sourceName: string;
  checked: boolean;
  results: number;
  qualified: number;
  manualReview: number;
  rejected: number;
  error?: string;
};

export type DiscoveryCandidate = {
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  title: string;
  reason: "source_requires_review" | "county_not_identified" | "license_type_not_identified" | "unrecognized_listing_url";
  score: number | null;
  county: string | null;
  licenseType: Listing["type"] | null;
  price: number | null;
};

export type DiscoveryRun = {
  checkedSources: number;
  searchResults: number;
  qualifiedListings: Listing[];
  manualReviewCandidates: number;
  rejectedResults: number;
  sourceResults: DiscoverySourceResult[];
  reviewCandidates: DiscoveryCandidate[];
};

type DiscoverySource = {
  sourceId: string;
  name: string;
  domain: string;
  autoPublish: boolean;
  individualListingPathPatterns: string[];
};

type DiscoveryConfig = {
  provider: "tavily";
  minimumScore: number;
  maxResultsPerSource: number;
  queriesPerSource?: number;
  queryRotation: string[];
  sources: DiscoverySource[];
};

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

type ResultAnalysis = {
  listing?: Listing;
  candidate?: DiscoveryCandidate;
};

const discoveryConfig = discoveryConfigJson as DiscoveryConfig;

export function canonicalizeSourceUrl(value: string): string {
  const url = new URL(value);
  url.hash = "";
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");

  const trackingKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "returnurl",
    "returnurllabel"
  ];
  trackingKeys.forEach((key) => url.searchParams.delete(key));
  url.searchParams.sort();

  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
  return `${url.protocol}//${url.hostname}${path}${url.search}`;
}

function sourceHostMatches(source: DiscoverySource, value: string): boolean {
  try {
    const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "");
    return host === source.domain || host.endsWith(`.${source.domain}`);
  } catch {
    return false;
  }
}

function pathMatchesSource(source: DiscoverySource, value: string): boolean {
  if (!sourceHostMatches(source, value)) return false;
  const pathname = new URL(value).pathname;
  return source.individualListingPathPatterns.some((pattern) => new RegExp(pattern, "i").test(pathname));
}

function stableSourceRef(source: DiscoverySource, canonicalUrl: string): string {
  const path = new URL(canonicalUrl).pathname;

  if (source.sourceId === "bizbuysell") {
    const ids = Array.from(path.matchAll(/\/(\d{6,})(?:\/|$)/g));
    const id = ids.at(-1)?.[1];
    if (id) return `BBS-${id}`;
  }

  if (source.sourceId === "bizquest") {
    const match = path.match(/\/(BW\d+)(?:\/|$)/i);
    if (match) return `BQ-${match[1].toUpperCase()}`;
  }

  if (source.sourceId === "liquor-license-auctioneers") {
    const match = path.match(/-(A\d+)(?:\/|$)/i);
    if (match) return `LLA-${match[1].toUpperCase()}`;
  }

  return `${source.sourceId.toUpperCase()}-${createHash("sha256").update(canonicalUrl).digest("hex").slice(0, 12)}`;
}

function combinedResultText(result: TavilyResult): string {
  return [result.title, result.content, result.raw_content, result.url]
    .filter((value): value is string => Boolean(value?.trim()))
    .join("\n");
}

function reviewCandidate(
  source: DiscoverySource,
  result: TavilyResult,
  canonicalUrl: string,
  reason: DiscoveryCandidate["reason"],
  parsed: ReturnType<typeof parseLicenseCandidate>
): DiscoveryCandidate {
  return {
    sourceId: source.sourceId,
    sourceName: source.name,
    sourceUrl: canonicalUrl,
    title: result.title?.trim() || canonicalUrl,
    reason,
    score: typeof result.score === "number" ? result.score : null,
    county: parsed.county,
    licenseType: parsed.type,
    price: parsed.price
  };
}

function analyzeResult(source: DiscoverySource, result: TavilyResult): ResultAnalysis {
  const rawUrl = result.url?.trim();
  const title = result.title?.trim();
  if (!rawUrl || !title || !sourceHostMatches(source, rawUrl)) return {};
  if ((result.score ?? 0) < discoveryConfig.minimumScore) return {};

  const text = combinedResultText(result);
  const parsed = parseLicenseCandidate(text);
  const statusText = [result.title, result.content].filter(Boolean).join("\n");
  if (!parsed.hasLicenseLanguage || !parsed.hasSaleIntent || isUnavailableListing(statusText)) return {};

  const canonicalUrl = canonicalizeSourceUrl(rawUrl);
  if (!pathMatchesSource(source, rawUrl)) {
    return { candidate: reviewCandidate(source, result, canonicalUrl, "unrecognized_listing_url", parsed) };
  }
  if (!parsed.county) {
    return { candidate: reviewCandidate(source, result, canonicalUrl, "county_not_identified", parsed) };
  }
  if (!parsed.type) {
    return { candidate: reviewCandidate(source, result, canonicalUrl, "license_type_not_identified", parsed) };
  }

  const listing: Listing = {
    county: parsed.county,
    type: parsed.type,
    price: parsed.price,
    priceLabel: parsed.price === null ? "Price Undisclosed" : `$${parsed.price.toLocaleString("en-US")}`,
    sourceRef: stableSourceRef(source, canonicalUrl),
    sourceName: source.name,
    sourceUrl: canonicalUrl,
    note: `Automatically discovered from ${source.name}. Price and availability subject to confirmation.`,
    image: listingImageForCounty(parsed.county)
  };

  if (!source.autoPublish) {
    return { candidate: reviewCandidate(source, result, canonicalUrl, "source_requires_review", parsed) };
  }

  return { listing };
}

async function searchSource(apiKey: string, source: DiscoverySource, query: string): Promise<TavilyResult[]> {
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      max_results: discoveryConfig.maxResultsPerSource,
      topic: "general",
      include_answer: false,
      include_raw_content: "text",
      include_images: false,
      include_domains: [source.domain],
      country: "united states",
      auto_parameters: false,
      safe_search: true
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) throw new Error(`Tavily returned ${response.status}`);
  const body = (await response.json()) as TavilyResponse;
  return Array.isArray(body.results) ? body.results : [];
}

async function runInBatches<T, R>(items: T[], batchSize: number, worker: (item: T) => Promise<R>): Promise<PromiseSettledResult<R>[]> {
  const output: PromiseSettledResult<R>[] = [];
  for (let index = 0; index < items.length; index += batchSize) {
    output.push(...await Promise.allSettled(items.slice(index, index + batchSize).map(worker)));
  }
  return output;
}

function queriesForDay(dayNumber: number): string[] {
  const queries = discoveryConfig.queryRotation;
  if (queries.length === 0) return ["Florida liquor license for sale 4COP 3PS quota county price"];
  const count = Math.max(1, Math.min(queries.length, discoveryConfig.queriesPerSource ?? 2));
  return Array.from({ length: count }, (_, offset) => queries[(dayNumber + offset) % queries.length]);
}

export async function discoverPublicListings(apiKey: string): Promise<DiscoveryRun> {
  const dayNumber = Math.floor(Date.now() / 86400000);
  const sources = discoveryConfig.sources;
  const tasks = sources.flatMap((source) => queriesForDay(dayNumber).map((query) => ({ source, query })));
  const settled = await runInBatches(tasks, 6, (task) => searchSource(apiKey, task.source, task.query));

  const qualifiedByUrl = new Map<string, Listing>();
  const reviewByUrl = new Map<string, DiscoveryCandidate>();
  const sourceResults: DiscoverySourceResult[] = [];
  let searchResults = 0;
  let rejectedResults = 0;

  for (const source of sources) {
    const uniqueResults = new Map<string, TavilyResult>();
    const errors: string[] = [];
    let successfulQueries = 0;

    settled.forEach((result, index) => {
      if (tasks[index].source.sourceId !== source.sourceId) return;
      if (result.status === "rejected") {
        errors.push(result.reason instanceof Error ? result.reason.message : String(result.reason));
        return;
      }

      successfulQueries += 1;
      for (const item of result.value) {
        const rawUrl = item.url?.trim();
        if (!rawUrl) continue;
        try {
          uniqueResults.set(canonicalizeSourceUrl(rawUrl), item);
        } catch {
          uniqueResults.set(rawUrl, item);
        }
      }
    });

    let qualified = 0;
    let manualReview = 0;
    let rejected = 0;
    for (const item of uniqueResults.values()) {
      const analysis = analyzeResult(source, item);
      if (analysis.listing) {
        const key = analysis.listing.sourceUrl ?? analysis.listing.sourceRef ?? `${analysis.listing.county}|${analysis.listing.priceLabel}`;
        qualifiedByUrl.set(key, analysis.listing);
        qualified += 1;
      } else if (analysis.candidate) {
        reviewByUrl.set(analysis.candidate.sourceUrl, analysis.candidate);
        manualReview += 1;
      } else {
        rejected += 1;
      }
    }

    searchResults += uniqueResults.size;
    rejectedResults += rejected;
    sourceResults.push({
      sourceId: source.sourceId,
      sourceName: source.name,
      checked: successfulQueries > 0,
      results: uniqueResults.size,
      qualified,
      manualReview,
      rejected,
      error: errors.length > 0 ? `${errors.length} search${errors.length === 1 ? "" : "es"} failed: ${errors[0]}` : undefined
    });
  }

  return {
    checkedSources: sourceResults.filter((source) => source.checked).length,
    searchResults,
    qualifiedListings: Array.from(qualifiedByUrl.values()),
    manualReviewCandidates: reviewByUrl.size,
    rejectedResults,
    sourceResults,
    reviewCandidates: Array.from(reviewByUrl.values())
  };
}
