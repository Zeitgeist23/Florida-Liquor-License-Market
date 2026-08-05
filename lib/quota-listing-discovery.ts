import "server-only";

import { createHash } from "node:crypto";
import discoveryConfigJson from "@/data/florida-liquor-license-auto-discovery.json";
import type { Listing } from "@/data/listings";
import type { DiscoveryCandidate } from "@/lib/listing-discovery";
import { canonicalizeSourceUrl } from "@/lib/listing-discovery";
import {
  isUnavailableListing,
  listingImageForCounty,
  parseLicenseCandidate
} from "@/lib/florida-license-parser";

type DiscoverySource = {
  sourceId: string;
  name: string;
  domain: string;
  autoPublish: boolean;
  individualListingPathPatterns: string[];
};

type DiscoveryConfig = {
  minimumScore: number;
  maxResultsPerSource: number;
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

export type SupplementalSourceResult = {
  sourceId: string;
  sourceName: string;
  checked: boolean;
  results: number;
  qualified: number;
  manualReview: number;
  rejected: number;
  error?: string;
};

export type SupplementalDiscoveryRun = {
  checkedSources: number;
  searchResults: number;
  qualifiedListings: Listing[];
  manualReviewCandidates: number;
  rejectedResults: number;
  countyBatch: string[];
  sourceResults: SupplementalSourceResult[];
  reviewCandidates: DiscoveryCandidate[];
};

const discoveryConfig = discoveryConfigJson as DiscoveryConfig;
const COUNTY_COVERAGE_DAYS = 10;

const COUNTIES = [
  "Alachua County", "Baker County", "Bay County", "Bradford County", "Brevard County", "Broward County",
  "Calhoun County", "Charlotte County", "Citrus County", "Clay County", "Collier County", "Columbia County",
  "DeSoto County", "Dixie County", "Duval County", "Escambia County", "Flagler County", "Franklin County",
  "Gadsden County", "Gilchrist County", "Glades County", "Gulf County", "Hamilton County", "Hardee County",
  "Hendry County", "Hernando County", "Highlands County", "Hillsborough County", "Holmes County", "Indian River County",
  "Jackson County", "Jefferson County", "Lafayette County", "Lake County", "Lee County", "Leon County", "Levy County",
  "Liberty County", "Madison County", "Manatee County", "Marion County", "Martin County", "Miami-Dade County",
  "Monroe County", "Nassau County", "Okaloosa County", "Okeechobee County", "Orange County", "Osceola County",
  "Palm Beach County", "Pasco County", "Pinellas County", "Polk County", "Putnam County", "Santa Rosa County",
  "Sarasota County", "Seminole County", "St. Johns County", "St. Lucie County", "Sumter County", "Suwannee County",
  "Taylor County", "Union County", "Volusia County", "Wakulla County", "Walton County", "Washington County"
] as const;

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

function candidateFor(
  source: DiscoverySource,
  result: TavilyResult,
  sourceUrl: string,
  reason: DiscoveryCandidate["reason"],
  parsed: ReturnType<typeof parseLicenseCandidate>
): DiscoveryCandidate {
  return {
    sourceId: source.sourceId,
    sourceName: source.name,
    sourceUrl,
    title: result.title?.trim() || sourceUrl,
    reason,
    score: typeof result.score === "number" ? result.score : null,
    county: parsed.county,
    licenseType: parsed.type,
    price: parsed.price
  };
}

function analyzeResult(source: DiscoverySource, result: TavilyResult): { listing?: Listing; candidate?: DiscoveryCandidate } {
  const rawUrl = result.url?.trim();
  const title = result.title?.trim();
  if (!rawUrl || !title || !sourceHostMatches(source, rawUrl)) return {};
  if ((result.score ?? 0) < discoveryConfig.minimumScore) return {};

  const parsed = parseLicenseCandidate(combinedResultText(result));
  const statusText = [result.title, result.content].filter(Boolean).join("\n");
  if (!parsed.hasLicenseLanguage || !parsed.hasSaleIntent || isUnavailableListing(statusText)) return {};

  const canonicalUrl = canonicalizeSourceUrl(rawUrl);
  if (!pathMatchesSource(source, rawUrl)) {
    return { candidate: candidateFor(source, result, canonicalUrl, "unrecognized_listing_url", parsed) };
  }
  if (!parsed.county) {
    return { candidate: candidateFor(source, result, canonicalUrl, "county_not_identified", parsed) };
  }
  if (!parsed.type) {
    return { candidate: candidateFor(source, result, canonicalUrl, "license_type_not_identified", parsed) };
  }

  const listing: Listing = {
    county: parsed.county,
    type: parsed.type,
    price: parsed.price,
    priceLabel: parsed.price === null ? "Price Undisclosed" : `$${parsed.price.toLocaleString("en-US")}`,
    sourceRef: stableSourceRef(source, canonicalUrl),
    sourceName: source.name,
    sourceUrl: canonicalUrl,
    note: `Automatically discovered from ${source.name} using county and quota-license searches. Price and availability subject to confirmation.`,
    image: listingImageForCounty(parsed.county)
  };

  if (!source.autoPublish) {
    return { candidate: candidateFor(source, result, canonicalUrl, "source_requires_review", parsed) };
  }
  return { listing };
}

function countiesForDay(dayNumber: number): string[] {
  const batchIndex = dayNumber % COUNTY_COVERAGE_DAYS;
  return COUNTIES.filter((_, index) => index % COUNTY_COVERAGE_DAYS === batchIndex);
}

function buildQuery(counties: string[]): string {
  const countyClause = counties.map((county) => `"${county}"`).join(" OR ");
  return `Florida (${countyClause}) (4COP OR 3PS OR "quota liquor license" OR "full liquor license" OR "package store license") ("for sale" OR available OR "asking price")`;
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

export async function discoverQuotaPhraseListings(apiKey: string): Promise<SupplementalDiscoveryRun> {
  const dayNumber = Math.floor(Date.now() / 86400000);
  const countyBatch = countiesForDay(dayNumber);
  const sources = discoveryConfig.sources;
  const query = buildQuery(countyBatch);
  const settled = await Promise.allSettled(sources.map((source) => searchSource(apiKey, source, query)));

  const qualifiedByUrl = new Map<string, Listing>();
  const reviewByUrl = new Map<string, DiscoveryCandidate>();
  const sourceResults: SupplementalSourceResult[] = [];
  let searchResults = 0;
  let rejectedResults = 0;

  settled.forEach((result, index) => {
    const source = sources[index];
    if (result.status === "rejected") {
      sourceResults.push({
        sourceId: source.sourceId,
        sourceName: source.name,
        checked: false,
        results: 0,
        qualified: 0,
        manualReview: 0,
        rejected: 0,
        error: result.reason instanceof Error ? result.reason.message : String(result.reason)
      });
      return;
    }

    const uniqueResults = new Map<string, TavilyResult>();
    for (const item of result.value) {
      const rawUrl = item.url?.trim();
      if (!rawUrl) continue;
      try {
        uniqueResults.set(canonicalizeSourceUrl(rawUrl), item);
      } catch {
        uniqueResults.set(rawUrl, item);
      }
    }

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
      checked: true,
      results: uniqueResults.size,
      qualified,
      manualReview,
      rejected
    });
  });

  return {
    checkedSources: sourceResults.filter((source) => source.checked).length,
    searchResults,
    qualifiedListings: Array.from(qualifiedByUrl.values()),
    manualReviewCandidates: reviewByUrl.size,
    rejectedResults,
    countyBatch,
    sourceResults,
    reviewCandidates: Array.from(reviewByUrl.values())
  };
}
