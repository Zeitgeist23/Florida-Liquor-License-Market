import "server-only";

import { createHash } from "node:crypto";
import discoveryConfigJson from "@/data/florida-liquor-license-auto-discovery.json";
import type { Listing } from "@/data/listings";

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

export type DiscoveryRun = {
  checkedSources: number;
  searchResults: number;
  qualifiedListings: Listing[];
  manualReviewCandidates: number;
  rejectedResults: number;
  sourceResults: DiscoverySourceResult[];
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

const discoveryConfig = discoveryConfigJson as DiscoveryConfig;

const COUNTY_ALIASES: Array<{ county: string; aliases: string[] }> = [
  { county: "Miami-Dade County", aliases: ["miami dade county", "dade county"] },
  { county: "St. Johns County", aliases: ["st johns county", "saint johns county"] },
  { county: "St. Lucie County", aliases: ["st lucie county", "saint lucie county"] },
  { county: "Indian River County", aliases: ["indian river county"] },
  { county: "Palm Beach County", aliases: ["palm beach county"] },
  { county: "Santa Rosa County", aliases: ["santa rosa county"] },
  { county: "Alachua County", aliases: ["alachua county"] },
  { county: "Baker County", aliases: ["baker county"] },
  { county: "Bay County", aliases: ["bay county"] },
  { county: "Bradford County", aliases: ["bradford county"] },
  { county: "Brevard County", aliases: ["brevard county"] },
  { county: "Broward County", aliases: ["broward county"] },
  { county: "Calhoun County", aliases: ["calhoun county"] },
  { county: "Charlotte County", aliases: ["charlotte county"] },
  { county: "Citrus County", aliases: ["citrus county"] },
  { county: "Clay County", aliases: ["clay county"] },
  { county: "Collier County", aliases: ["collier county"] },
  { county: "Columbia County", aliases: ["columbia county"] },
  { county: "DeSoto County", aliases: ["desoto county", "de soto county"] },
  { county: "Dixie County", aliases: ["dixie county"] },
  { county: "Duval County", aliases: ["duval county"] },
  { county: "Escambia County", aliases: ["escambia county"] },
  { county: "Flagler County", aliases: ["flagler county"] },
  { county: "Franklin County", aliases: ["franklin county"] },
  { county: "Gadsden County", aliases: ["gadsden county"] },
  { county: "Gilchrist County", aliases: ["gilchrist county"] },
  { county: "Glades County", aliases: ["glades county"] },
  { county: "Gulf County", aliases: ["gulf county"] },
  { county: "Hamilton County", aliases: ["hamilton county"] },
  { county: "Hardee County", aliases: ["hardee county"] },
  { county: "Hendry County", aliases: ["hendry county"] },
  { county: "Hernando County", aliases: ["hernando county"] },
  { county: "Highlands County", aliases: ["highlands county"] },
  { county: "Hillsborough County", aliases: ["hillsborough county"] },
  { county: "Holmes County", aliases: ["holmes county"] },
  { county: "Jackson County", aliases: ["jackson county"] },
  { county: "Jefferson County", aliases: ["jefferson county"] },
  { county: "Lafayette County", aliases: ["lafayette county"] },
  { county: "Lake County", aliases: ["lake county"] },
  { county: "Lee County", aliases: ["lee county"] },
  { county: "Leon County", aliases: ["leon county"] },
  { county: "Levy County", aliases: ["levy county"] },
  { county: "Liberty County", aliases: ["liberty county"] },
  { county: "Madison County", aliases: ["madison county"] },
  { county: "Manatee County", aliases: ["manatee county"] },
  { county: "Marion County", aliases: ["marion county"] },
  { county: "Martin County", aliases: ["martin county"] },
  { county: "Monroe County", aliases: ["monroe county"] },
  { county: "Nassau County", aliases: ["nassau county"] },
  { county: "Okaloosa County", aliases: ["okaloosa county"] },
  { county: "Okeechobee County", aliases: ["okeechobee county"] },
  { county: "Orange County", aliases: ["orange county"] },
  { county: "Osceola County", aliases: ["osceola county"] },
  { county: "Pasco County", aliases: ["pasco county"] },
  { county: "Pinellas County", aliases: ["pinellas county"] },
  { county: "Polk County", aliases: ["polk county"] },
  { county: "Putnam County", aliases: ["putnam county"] },
  { county: "Sarasota County", aliases: ["sarasota county"] },
  { county: "Seminole County", aliases: ["seminole county"] },
  { county: "Sumter County", aliases: ["sumter county"] },
  { county: "Suwannee County", aliases: ["suwannee county"] },
  { county: "Taylor County", aliases: ["taylor county"] },
  { county: "Union County", aliases: ["union county"] },
  { county: "Volusia County", aliases: ["volusia county"] },
  { county: "Wakulla County", aliases: ["wakulla county"] },
  { county: "Walton County", aliases: ["walton county"] },
  { county: "Washington County", aliases: ["washington county"] }
];

const UNAVAILABLE_TERMS = [
  "sold",
  "in escrow",
  "under contract",
  "sale pending",
  "no longer available",
  "off market",
  "listing expired"
];

function normalizeForMatch(value: string): string {
  return value
    .toLowerCase()
    .replace(/&amp;/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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

function extractCounty(text: string): string | null {
  const normalized = ` ${normalizeForMatch(text)} `;
  for (const entry of COUNTY_ALIASES) {
    if (entry.aliases.some((alias) => normalized.includes(` ${alias} `))) return entry.county;
  }
  return null;
}

function extractLicenseType(text: string): Listing["type"] | null {
  const normalized = normalizeForMatch(text).replace(/\s+/g, "");
  if (normalized.includes("4cop")) return "4COP Quota";
  if (normalized.includes("3ps")) return "3PS Quota / Package Store";
  return null;
}

function extractPrice(text: string): number | null {
  const matches = text.matchAll(/\$\s*([0-9]{2,3}(?:,[0-9]{3})+|[0-9]{5,7})(?:\.\d{2})?/g);
  for (const match of matches) {
    const value = Number(match[1].replace(/,/g, ""));
    if (Number.isFinite(value) && value >= 50000 && value <= 2500000) return Math.round(value);
  }
  return null;
}

function isUnavailable(title: string, content: string): boolean {
  const normalized = normalizeForMatch(`${title} ${content.slice(0, 800)}`);
  return UNAVAILABLE_TERMS.some((term) => normalized.includes(normalizeForMatch(term)));
}

function isSaleListing(title: string, content: string): boolean {
  const normalized = normalizeForMatch(`${title} ${content}`);
  const hasLicense = normalized.includes("liquor license") || normalized.includes("4cop") || normalized.includes("3ps");
  const hasSaleIntent = normalized.includes("for sale") || normalized.includes("available") || normalized.includes("asset sale") || normalized.includes("asking price");
  return hasLicense && hasSaleIntent;
}

function pathMatchesSource(source: DiscoverySource, value: string): boolean {
  const url = new URL(value);
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host !== source.domain && !host.endsWith(`.${source.domain}`)) return false;
  return source.individualListingPathPatterns.some((pattern) => new RegExp(pattern, "i").test(url.pathname));
}

function stableSourceRef(source: DiscoverySource, canonicalUrl: string): string {
  const url = new URL(canonicalUrl);
  const path = url.pathname;

  if (source.sourceId === "bizbuysell") {
    const match = path.match(/\/(\d+)\/?$/);
    if (match) return `BBS-${match[1]}`;
  }

  if (source.sourceId === "bizquest") {
    const match = path.match(/\/(BW\d+)\/?$/i);
    if (match) return `BQ-${match[1].toUpperCase()}`;
  }

  if (source.sourceId === "liquor-license-auctioneers") {
    const match = path.match(/-(A\d+)\/?$/i);
    if (match) return `LLA-${match[1].toUpperCase()}`;
  }

  return `${source.sourceId.toUpperCase()}-${createHash("sha256").update(canonicalUrl).digest("hex").slice(0, 12)}`;
}

function imageForCounty(county: string): string {
  if (["Miami-Dade County", "Broward County", "Monroe County"].includes(county)) return "/assets/listing-miami.png";
  if (["Palm Beach County", "Brevard County", "Indian River County", "St. Lucie County"].includes(county)) return "/assets/listing-palm-beach.png";
  if (["Sarasota County", "Manatee County", "Charlotte County", "Pinellas County", "Hillsborough County"].includes(county)) return "/assets/listing-sarasota.png";
  return "/assets/listing-lee.png";
}

function resultToListing(source: DiscoverySource, result: TavilyResult): Listing | null {
  const title = result.title?.trim() ?? "";
  const content = result.content?.trim() ?? result.raw_content?.trim() ?? "";
  const rawUrl = result.url?.trim();
  if (!rawUrl || !title || !pathMatchesSource(source, rawUrl)) return null;
  if ((result.score ?? 0) < discoveryConfig.minimumScore) return null;
  if (!isSaleListing(title, content) || isUnavailable(title, content)) return null;

  const canonicalUrl = canonicalizeSourceUrl(rawUrl);
  const searchableText = `${title} ${content} ${canonicalUrl}`;
  const county = extractCounty(searchableText);
  const type = extractLicenseType(searchableText);
  if (!county || !type) return null;

  const price = extractPrice(title) ?? extractPrice(content);
  return {
    county,
    type,
    price,
    priceLabel: price === null ? "Price Undisclosed" : `$${price.toLocaleString("en-US")}`,
    sourceRef: stableSourceRef(source, canonicalUrl),
    sourceName: source.name,
    sourceUrl: canonicalUrl,
    note: `Automatically discovered from ${source.name}. Price and availability subject to confirmation.`,
    image: imageForCounty(county)
  };
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
      include_raw_content: false,
      include_images: false,
      include_domains: [source.domain],
      country: "united states",
      auto_parameters: false,
      safe_search: true
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(20000)
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

export async function discoverPublicListings(apiKey: string): Promise<DiscoveryRun> {
  const dayNumber = Math.floor(Date.now() / 86400000);
  const query = discoveryConfig.queryRotation[dayNumber % discoveryConfig.queryRotation.length];
  const sources = discoveryConfig.sources;
  const settled = await runInBatches(sources, 3, (source) => searchSource(apiKey, source, query));

  const qualifiedByUrl = new Map<string, Listing>();
  const sourceResults: DiscoverySourceResult[] = [];
  let searchResults = 0;
  let manualReviewCandidates = 0;
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

    const results = result.value;
    searchResults += results.length;
    let qualified = 0;
    let manualReview = 0;
    let rejected = 0;

    for (const item of results) {
      const listing = resultToListing(source, item);
      if (!listing) {
        rejected += 1;
        continue;
      }

      if (!source.autoPublish) {
        manualReview += 1;
        continue;
      }

      const key = canonicalizeSourceUrl(listing.sourceUrl ?? "");
      qualifiedByUrl.set(key, listing);
      qualified += 1;
    }

    manualReviewCandidates += manualReview;
    rejectedResults += rejected;
    sourceResults.push({
      sourceId: source.sourceId,
      sourceName: source.name,
      checked: true,
      results: results.length,
      qualified,
      manualReview,
      rejected
    });
  });

  return {
    checkedSources: sourceResults.filter((source) => source.checked).length,
    searchResults,
    qualifiedListings: Array.from(qualifiedByUrl.values()),
    manualReviewCandidates,
    rejectedResults,
    sourceResults
  };
}
