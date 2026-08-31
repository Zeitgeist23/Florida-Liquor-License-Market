import { createHash } from "node:crypto";
import discoveryConfigJson from "@/data/florida-liquor-license-auto-discovery.json";
import type { Listing } from "@/data/listings";
import type { DiscoveryCandidate } from "@/lib/listing-discovery";
import {
  listingImageForCounty,
  parseLicenseCandidate
} from "@/lib/florida-license-parser";

type DirectCrawlConfig = {
  sitemapUrls: string[];
  listingPathPatterns: string[];
  concurrency?: number;
};

type DirectCrawlSource = {
  sourceId: string;
  name: string;
  domain: string;
  autoPublish: boolean;
  directCrawl?: DirectCrawlConfig;
};

type DirectCrawlDiscoveryConfig = {
  sources: DirectCrawlSource[];
};

export type DirectSourceResult = {
  sourceId: string;
  sourceName: string;
  checked: boolean;
  sitemapUrls: number;
  listingUrls: number;
  pagesFetched: number;
  qualified: number;
  manualReview: number;
  unavailable: number;
  failed: number;
  error?: string;
};

export type DirectCrawlRun = {
  checkedSources: number;
  listingUrls: number;
  pagesFetched: number;
  qualifiedListings: Listing[];
  manualReviewCandidates: number;
  unavailableListings: number;
  failedPages: number;
  sourceResults: DirectSourceResult[];
  reviewCandidates: DiscoveryCandidate[];
};

type PageResult =
  | { kind: "listing"; listing: Listing }
  | { kind: "candidate"; candidate: DiscoveryCandidate }
  | { kind: "unavailable" }
  | { kind: "rejected" };

const discoveryConfig = discoveryConfigJson as DirectCrawlDiscoveryConfig;
const USER_AGENT = "FLLM-InventoryBot/1.0 (+https://www.floridaliquorlicensemarket.com)";
const FETCH_TIMEOUT_MS = 25_000;

function canonicalizeSourceUrl(value: string): string {
  const url = new URL(value);
  url.hash = "";
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
  return `${url.protocol}//${url.hostname}${path}${url.search}`;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_match, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, code: string) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function sourceHostMatches(source: DirectCrawlSource, value: string): boolean {
  try {
    const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "");
    return host === source.domain || host.endsWith(`.${source.domain}`);
  } catch {
    return false;
  }
}

function listingPathMatches(source: DirectCrawlSource, value: string): boolean {
  if (!source.directCrawl || !sourceHostMatches(source, value)) return false;
  const path = new URL(value).pathname;
  return source.directCrawl.listingPathPatterns.some((pattern) => new RegExp(pattern, "i").test(path));
}

async function fetchText(url: string, accept: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      Accept: accept,
      "User-Agent": USER_AGENT
    },
    cache: "no-store",
    redirect: "follow",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
  });

  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

async function collectSitemapListingUrls(source: DirectCrawlSource): Promise<string[]> {
  const config = source.directCrawl;
  if (!config) return [];

  const pending = [...config.sitemapUrls];
  const visitedSitemaps = new Set<string>();
  const listingUrls = new Set<string>();

  while (pending.length > 0) {
    const rawUrl = pending.shift();
    if (!rawUrl) continue;
    const sitemapUrl = canonicalizeSourceUrl(rawUrl);
    if (visitedSitemaps.has(sitemapUrl)) continue;
    visitedSitemaps.add(sitemapUrl);

    const xml = await fetchText(sitemapUrl, "application/xml,text/xml;q=0.9,*/*;q=0.1");
    const locations = Array.from(
      xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi),
      (match) => decodeEntities(match[1].trim())
    );

    for (const location of locations) {
      if (!sourceHostMatches(source, location)) continue;
      if (listingPathMatches(source, location)) {
        listingUrls.add(canonicalizeSourceUrl(location));
      } else if (/(?:sitemap|\.xml(?:$|\?))/i.test(new URL(location).pathname)) {
        pending.push(location);
      }
    }
  }

  return Array.from(listingUrls).sort();
}

function visiblePageText(html: string): string {
  const structuredData = Array.from(
    html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
    (match) => match[1]
  ).join("\n");

  const visible = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<[^>]+>/g, " ");

  return decodeEntities(`${structuredData}\n${visible}`).replace(/\s+/g, " ").trim();
}

function stableSourceRef(source: DirectCrawlSource, sourceUrl: string): string {
  const path = new URL(sourceUrl).pathname;
  if (source.sourceId === "liquor-license-auctioneers") {
    const match = path.match(/-(A\d+)(?:\/|$)/i);
    if (match) return `LLA-${match[1].toUpperCase()}`;
  }

  return `${source.sourceId.toUpperCase()}-${createHash("sha256").update(sourceUrl).digest("hex").slice(0, 12)}`;
}

function candidateFor(
  source: DirectCrawlSource,
  sourceUrl: string,
  reason: DiscoveryCandidate["reason"],
  parsed: ReturnType<typeof parseLicenseCandidate>
): DiscoveryCandidate {
  return {
    sourceId: source.sourceId,
    sourceName: source.name,
    sourceUrl,
    title: sourceUrl,
    reason,
    score: null,
    county: parsed.county,
    licenseType: parsed.type,
    price: parsed.price
  };
}

async function analyzeListingPage(source: DirectCrawlSource, sourceUrl: string): Promise<PageResult> {
  const html = await fetchText(sourceUrl, "text/html,application/xhtml+xml;q=0.9,*/*;q=0.1");
  const parsed = parseLicenseCandidate(`${visiblePageText(html)}\n${sourceUrl}`);

  if (parsed.unavailable) return { kind: "unavailable" };
  if (!parsed.hasLicenseLanguage || !parsed.hasSaleIntent) return { kind: "rejected" };
  if (!parsed.county) {
    return { kind: "candidate", candidate: candidateFor(source, sourceUrl, "county_not_identified", parsed) };
  }
  if (!parsed.type) {
    return { kind: "candidate", candidate: candidateFor(source, sourceUrl, "license_type_not_identified", parsed) };
  }

  const listing: Listing = {
    county: parsed.county,
    type: parsed.type,
    price: parsed.price,
    priceLabel: parsed.price === null ? "Price Undisclosed" : `$${parsed.price.toLocaleString("en-US")}`,
    sourceRef: stableSourceRef(source, sourceUrl),
    sourceName: source.name,
    sourceUrl,
    note: `Directly reconciled against every current ${source.name} listing page. Price and availability subject to source confirmation.`,
    image: listingImageForCounty(parsed.county)
  };

  if (!source.autoPublish) {
    return { kind: "candidate", candidate: candidateFor(source, sourceUrl, "source_requires_review", parsed) };
  }
  return { kind: "listing", listing };
}

async function runInBatches<T, R>(
  items: T[],
  batchSize: number,
  worker: (item: T) => Promise<R>
): Promise<PromiseSettledResult<R>[]> {
  const output: PromiseSettledResult<R>[] = [];
  for (let index = 0; index < items.length; index += batchSize) {
    output.push(...await Promise.allSettled(items.slice(index, index + batchSize).map(worker)));
  }
  return output;
}

async function crawlSource(source: DirectCrawlSource) {
  const config = source.directCrawl;
  if (!config) throw new Error("Direct crawl configuration is missing.");

  try {
    const listingUrls = await collectSitemapListingUrls(source);
    const settled = await runInBatches(
      listingUrls,
      Math.max(1, config.concurrency ?? 4),
      (url) => analyzeListingPage(source, url)
    );

    const listings: Listing[] = [];
    const candidates: DiscoveryCandidate[] = [];
    let unavailable = 0;
    let failed = 0;
    let rejected = 0;

    for (const page of settled) {
      if (page.status === "rejected") {
        failed += 1;
      } else if (page.value.kind === "listing") {
        listings.push(page.value.listing);
      } else if (page.value.kind === "candidate") {
        candidates.push(page.value.candidate);
      } else if (page.value.kind === "unavailable") {
        unavailable += 1;
      } else {
        rejected += 1;
      }
    }

    return {
      result: {
        sourceId: source.sourceId,
        sourceName: source.name,
        checked: true,
        sitemapUrls: config.sitemapUrls.length,
        listingUrls: listingUrls.length,
        pagesFetched: settled.length - failed,
        qualified: listings.length,
        manualReview: candidates.length,
        unavailable,
        failed,
        error: rejected > 0 ? `${rejected} listing page${rejected === 1 ? "" : "s"} did not qualify.` : undefined
      } satisfies DirectSourceResult,
      listings,
      candidates
    };
  } catch (error) {
    return {
      result: {
        sourceId: source.sourceId,
        sourceName: source.name,
        checked: false,
        sitemapUrls: config.sitemapUrls.length,
        listingUrls: 0,
        pagesFetched: 0,
        qualified: 0,
        manualReview: 0,
        unavailable: 0,
        failed: 0,
        error: error instanceof Error ? error.message : String(error)
      } satisfies DirectSourceResult,
      listings: [] as Listing[],
      candidates: [] as DiscoveryCandidate[]
    };
  }
}

export async function crawlDirectListingSources(): Promise<DirectCrawlRun> {
  const crawled = await Promise.all(
    discoveryConfig.sources.filter((source) => source.directCrawl).map(crawlSource)
  );

  const listingsByIdentity = new Map<string, Listing>();
  const candidatesByUrl = new Map<string, DiscoveryCandidate>();
  for (const source of crawled) {
    for (const listing of source.listings) {
      const identity = listing.sourceRef ?? listing.sourceUrl ?? `${listing.county}|${listing.type}|${listing.priceLabel}`;
      listingsByIdentity.set(identity.toLowerCase(), listing);
    }
    for (const candidate of source.candidates) candidatesByUrl.set(candidate.sourceUrl, candidate);
  }

  const sourceResults = crawled.map((source) => source.result);
  return {
    checkedSources: sourceResults.filter((source) => source.checked).length,
    listingUrls: sourceResults.reduce((sum, source) => sum + source.listingUrls, 0),
    pagesFetched: sourceResults.reduce((sum, source) => sum + source.pagesFetched, 0),
    qualifiedListings: Array.from(listingsByIdentity.values()),
    manualReviewCandidates: candidatesByUrl.size,
    unavailableListings: sourceResults.reduce((sum, source) => sum + source.unavailable, 0),
    failedPages: sourceResults.reduce((sum, source) => sum + source.failed, 0),
    sourceResults,
    reviewCandidates: Array.from(candidatesByUrl.values())
  };
}
