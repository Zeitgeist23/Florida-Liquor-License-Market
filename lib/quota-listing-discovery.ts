import "server-only";

import { createHash } from "node:crypto";
import discoveryConfigJson from "@/data/florida-liquor-license-auto-discovery.json";
import type { Listing } from "@/data/listings";
import { canonicalizeSourceUrl } from "@/lib/listing-discovery";

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
  rejected: number;
  error?: string;
};

export type SupplementalDiscoveryRun = {
  checkedSources: number;
  searchResults: number;
  qualifiedListings: Listing[];
  rejectedResults: number;
  countyBatch: string[];
  sourceResults: SupplementalSourceResult[];
};

const discoveryConfig = discoveryConfigJson as DiscoveryConfig;
const COUNTY_COVERAGE_DAYS = 7;

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

const COUNTY_EXTRA_ALIASES: Record<string, string[]> = {
  "Miami-Dade County": ["dade county"],
  "DeSoto County": ["de soto county"],
  "St. Johns County": ["saint johns county"],
  "St. Lucie County": ["saint lucie county"]
};

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

function extractCounty(text: string): string | null {
  const normalized = ` ${normalizeForMatch(text)} `;
  for (const county of COUNTIES) {
    const aliases = [normalizeForMatch(county), ...(COUNTY_EXTRA_ALIASES[county] ?? [])];
    if (aliases.some((alias) => normalized.includes(` ${alias} `))) return county;
  }
  return null;
}

function extractLicenseType(text: string): Listing["type"] | null {
  const normalized = normalizeForMatch(text);
  const compact = normalized.replace(/\s+/g, "");

  if (compact.includes("4cop")) return "4COP Quota";
  if (compact.includes("3ps")) return "3PS Quota / Package Store";

  const packageStoreTerms = [
    "package store license",
    "package liquor license",
    "off premises liquor license",
    "off premise liquor license"
  ];
  if (packageStoreTerms.some((term) => normalized.includes(term))) return "3PS Quota / Package Store";

  const fullQuotaTerms = [
    "full quota liquor license",
    "quota liquor license",
    "full liquor license",
    "full alcohol license",
    "quota license"
  ];
  if (fullQuotaTerms.some((term) => normalized.includes(term))) return "4COP Quota";

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

function pathMatchesSource(source: DiscoverySource, value: string): boolean {
  const url = new URL(value);
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host !== source.domain && !host.endsWith(`.${source.domain}`)) return false;
  return source.individualListingPathPatterns.some((pattern) => new RegExp(pattern, "i").test(url.pathname));
}

function stableSourceRef(source: DiscoverySource, canonicalUrl: string): string {
  const path = new URL(canonicalUrl).pathname;

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

  const normalized = normalizeForMatch(`${title} ${content}`);
  const hasSaleIntent = normalized.includes("for sale") || normalized.includes("available") || normalized.includes("asset sale") || normalized.includes("asking price");
  if (!hasSaleIntent || UNAVAILABLE_TERMS.some((term) => normalized.includes(term))) return null;

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
    note: `Automatically discovered from ${source.name} using quota-license terminology. Price and availability subject to confirmation.`,
    image: imageForCounty(county)
  };
}

function countiesForDay(dayNumber: number): string[] {
  const batchIndex = dayNumber % COUNTY_COVERAGE_DAYS;
  return COUNTIES.filter((_, index) => index % COUNTY_COVERAGE_DAYS === batchIndex);
}

function buildQuery(counties: string[]): string {
  const countyClause = counties.map((county) => `"${county}"`).join(" OR ");
  return `Florida (${countyClause}) ("full quota liquor license" OR "quota liquor license" OR "full liquor license" OR "full alcohol license" OR "quota license") ("for sale" OR available OR "asset sale" OR "asking price")`;
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
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) throw new Error(`Tavily returned ${response.status}`);
  const body = (await response.json()) as TavilyResponse;
  return Array.isArray(body.results) ? body.results : [];
}

export async function discoverQuotaPhraseListings(apiKey: string): Promise<SupplementalDiscoveryRun> {
  const dayNumber = Math.floor(Date.now() / 86400000);
  const countyBatch = countiesForDay(dayNumber);
  const query = buildQuery(countyBatch);
  const sources = discoveryConfig.sources.filter((source) => source.autoPublish);
  const settled = await Promise.allSettled(sources.map((source) => searchSource(apiKey, source, query)));

  const qualifiedByUrl = new Map<string, Listing>();
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
    let rejected = 0;
    for (const item of uniqueResults.values()) {
      const listing = resultToListing(source, item);
      if (!listing) {
        rejected += 1;
        continue;
      }
      qualifiedByUrl.set(listing.sourceUrl ?? listing.sourceRef ?? `${listing.county}|${listing.priceLabel}`, listing);
      qualified += 1;
    }

    searchResults += uniqueResults.size;
    rejectedResults += rejected;
    sourceResults.push({
      sourceId: source.sourceId,
      sourceName: source.name,
      checked: true,
      results: uniqueResults.size,
      qualified,
      rejected
    });
  });

  return {
    checkedSources: sourceResults.filter((source) => source.checked).length,
    searchResults,
    qualifiedListings: Array.from(qualifiedByUrl.values()),
    rejectedResults,
    countyBatch,
    sourceResults
  };
}
