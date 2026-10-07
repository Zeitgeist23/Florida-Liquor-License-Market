import "server-only";

import { supabaseServiceSettings } from "@/lib/supabase-settings";

export type BrokerInventoryObservation = {
  id?: string;
  brokerage: string;
  broker_name: string | null;
  source_domain: string;
  source_listing_id: string;
  source_listing_url: string;
  source_listing_title: string | null;
  city: string | null;
  county: string | null;
  business_type: string;
  license_type: string | null;
  license_class: string;
  asking_price: number | null;
  market_status: string;
  first_seen_at: string;
  last_seen_at: string;
  raw_license_evidence: string | null;
  classification_confidence: number | null;
};

function settings() {
  return supabaseServiceSettings("FLLM broker inventory ingestion is unavailable.");
}

function headers(extra: HeadersInit = {}): HeadersInit {
  const { key } = settings();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function endpoint(path: string) {
  const { url } = settings();
  return `${url}/rest/v1/${path}`;
}

async function rest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(endpoint(path), {
    cache: "no-store",
    ...init,
    headers: headers(init?.headers || {}),
  });
  if (!response.ok) throw new Error(`Broker inventory database error: ${response.status} ${await response.text()}`);
  if (response.status === 204) return undefined as T;
  const body = await response.text();
  return (body ? JSON.parse(body) : undefined) as T;
}

export async function listBrokerInventoryObservations() {
  return rest<BrokerInventoryObservation[]>(
    "broker_inventory_observations?select=*&order=last_seen_at.desc&limit=5000",
  );
}

const FLORIDA_COUNTIES = [
  "Alachua","Baker","Bay","Bradford","Brevard","Broward","Calhoun","Charlotte","Citrus","Clay","Collier","Columbia",
  "DeSoto","Dixie","Duval","Escambia","Flagler","Franklin","Gadsden","Gilchrist","Glades","Gulf","Hamilton","Hardee",
  "Hendry","Hernando","Highlands","Hillsborough","Holmes","Indian River","Jackson","Jefferson","Lafayette","Lake","Lee",
  "Leon","Levy","Liberty","Madison","Manatee","Marion","Martin","Miami-Dade","Monroe","Nassau","Okaloosa","Okeechobee",
  "Orange","Osceola","Palm Beach","Pasco","Pinellas","Polk","Putnam","Santa Rosa","Sarasota","Seminole","St. Johns",
  "St. Lucie","Sumter","Suwannee","Taylor","Union","Volusia","Wakulla","Walton","Washington"
];

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripHtml(html: string) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
  ).trim();
}

function firstMatch(value: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return decodeEntities(match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  }
  return null;
}

function priceFromText(text: string) {
  const patterns = [
    /FOR SALE\s*-\s*ACTIVE[\s\S]{0,180}?\$\s*([0-9][0-9,]*)/i,
    /(?:Price|Asking Price)\s*:?\s*\$?\s*([0-9][0-9,]*)/i,
  ];
  for (const pattern of patterns) {
    const m = text.match(pattern);
    if (m?.[1]) {
      const n = Number(m[1].replace(/,/g, ""));
      if (Number.isFinite(n)) return n;
    }
  }
  return null;
}

function countyFromText(text: string) {
  const lower = text.toLowerCase();
  for (const county of FLORIDA_COUNTIES) {
    const variants = [
      `${county.toLowerCase()} county`,
      county.toLowerCase().replace("st. ", "st "),
    ];
    if (variants.some((v) => lower.includes(v))) return `${county} County`;
  }
  return null;
}

function cityFromText(text: string) {
  const match = text.match(/(?:Location\s*:?\s*|\n)([A-Za-z .'-]{2,40}),\s*Florida\b/i);
  return match?.[1]?.trim() || null;
}

function businessType(title: string, text: string) {
  const value = `${title} ${text.slice(0, 2500)}`.toLowerCase();
  if (/nightclub|night club/.test(value)) return "Nightclub";
  if (/liquor store|package store/.test(value)) return "Liquor Store";
  if (/bar and grill|bar & grill|sports bar|tavern|pub\b|cocktail lounge|\bbar\b/.test(value)) return "Bar";
  if (/pizza|pizzeria/.test(value)) return "Pizzeria";
  if (/ice cream|dessert|bakery/.test(value)) return "Dessert / Cafe";
  return "Restaurant";
}

function classifyLicense(text: string) {
  const normalized = text.toLowerCase();
  const evidence: string[] = [];

  const snippets = [
    ...normalized.matchAll(/.{0,80}(?:4cop|3ps|2cop|full liquor|beer and wine|beer & wine|liquor license).{0,120}/g),
  ].map((m) => m[0]).slice(0, 8);
  evidence.push(...snippets);

  if (/4cop/.test(normalized) && /(?:sfs|srx|special food service)/.test(normalized)) {
    return { licenseType: "4COP SFS/SRX", licenseClass: "sfs", confidence: 98, evidence: evidence.join(" | ") };
  }
  if (/3ps/.test(normalized)) {
    return { licenseType: "3PS Quota / Package Store", licenseClass: "quota", confidence: 99, evidence: evidence.join(" | ") };
  }
  if (/4cop/.test(normalized)) {
    return { licenseType: "4COP Quota", licenseClass: "quota", confidence: 96, evidence: evidence.join(" | ") };
  }
  if (/2cop/.test(normalized)) {
    return { licenseType: "2COP Beer & Wine", licenseClass: "2cop", confidence: 99, evidence: evidence.join(" | ") };
  }
  if (/beer and wine|beer & wine|beer\/wine/.test(normalized)) {
    return { licenseType: "Beer & Wine", licenseClass: "2cop", confidence: 82, evidence: evidence.join(" | ") };
  }
  if (/full liquor|full bar/.test(normalized)) {
    return { licenseType: "Full Liquor — Class Unresolved", licenseClass: "full_liquor_unknown", confidence: 72, evidence: evidence.join(" | ") };
  }
  return { licenseType: null, licenseClass: "unknown", confidence: null, evidence: evidence.join(" | ") || null };
}

async function fetchHtml(url: string) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; FLLMMarketResearch/1.0; +https://www.floridaliquorlicensemarket.com)",
      Accept: "text/html,application/xhtml+xml",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error(`WSR fetch failed ${response.status} for ${url}`);
  return response.text();
}

function listingUrlsFromHtml(html: string) {
  const found = new Map<string,string>();
  for (const match of html.matchAll(/href=["']([^"']*\/restaurant-for-sale\/[^"'?#]+\/(\d+)[^"']*)["']/gi)) {
    const href = decodeEntities(match[1]);
    const id = match[2];
    const absolute = href.startsWith("http") ? href : `https://www.wesellrestaurants.com${href.startsWith("/") ? "" : "/"}${href}`;
    found.set(id, absolute.split("?")[0]);
  }
  return [...found.entries()].map(([id,url]) => ({id,url}));
}

function territoryUrlsFromHtml(html: string) {
  const found = new Set<string>();
  for (const match of html.matchAll(/href=["']([^"']*\/restaurants-for-sale\/Florida-[^"'?#]+)["']/gi)) {
    const href = decodeEntities(match[1]);
    const absolute = href.startsWith("http") ? href : `https://www.wesellrestaurants.com${href.startsWith("/") ? "" : "/"}${href}`;
    if (!absolute.includes("Florida-Restaurants-for-Sale")) found.add(absolute.split("?")[0]);
  }
  return [...found];
}

async function discoverWsrFloridaListingUrls() {
  const root = "https://www.wesellrestaurants.com/restaurants-for-sale/Florida-Restaurants-for-Sale";
  const rootHtml = await fetchHtml(root);
  const territories = territoryUrlsFromHtml(rootHtml);
  const pages = [rootHtml];

  const settled = await Promise.allSettled(territories.slice(0, 30).map(fetchHtml));
  for (const item of settled) if (item.status === "fulfilled") pages.push(item.value);

  const found = new Map<string,string>();
  for (const page of pages) {
    for (const row of listingUrlsFromHtml(page)) found.set(row.id, row.url);
  }
  return { listings: [...found.entries()].map(([id,url]) => ({id,url})), territories: territories.length };
}

async function parseWsrListing(id: string, url: string): Promise<BrokerInventoryObservation> {
  const html = await fetchHtml(url);
  const text = stripHtml(html);
  const title =
    firstMatch(html, [/<h1[^>]*>([\s\S]*?)<\/h1>/i, /<title[^>]*>([\s\S]*?)<\/title>/i]) ||
    `We Sell Restaurants Listing #${id}`;
  const broker = firstMatch(text, [/Listed By:\s*([^|]{2,80}?)(?:Meet the|Get complete|Contact restaurant broker|Overview|$)/i]);
  const status = /FOR SALE\s*-\s*ACTIVE/i.test(text) ? "active" : /sold|closed/i.test(text) ? "sold" : "active";
  const license = classifyLicense(text);

  return {
    brokerage: "We Sell Restaurants",
    broker_name: broker,
    source_domain: "wesellrestaurants.com",
    source_listing_id: id,
    source_listing_url: url,
    source_listing_title: title,
    city: cityFromText(text),
    county: countyFromText(text),
    business_type: businessType(title, text),
    license_type: license.licenseType,
    license_class: license.licenseClass,
    asking_price: priceFromText(text),
    market_status: status,
    first_seen_at: new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
    raw_license_evidence: license.evidence ? license.evidence.slice(0, 2500) : null,
    classification_confidence: license.confidence,
  };
}

async function upsertObservations(rows: BrokerInventoryObservation[]) {
  if (!rows.length) return;
  await rest("broker_inventory_observations?on_conflict=source_domain,source_listing_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows.map((row) => ({
      ...row,
      updated_at: new Date().toISOString(),
    }))),
  });
}

export async function ingestWsrFloridaInventory(options?: { batchSize?: number; cursor?: number }) {
  const discovered = await discoverWsrFloridaListingUrls();
  const batchSize = Math.max(1, Math.min(60, Math.round(options?.batchSize || 30)));
  const existing = await listBrokerInventoryObservations();
  const existingWsr = existing.filter((row) => row.source_domain === "wesellrestaurants.com").length;
  const requestedCursor = options?.cursor;
  const cursor = requestedCursor === undefined
    ? (discovered.listings.length ? existingWsr % discovered.listings.length : 0)
    : Math.max(0, Math.round(requestedCursor));
  const batch = discovered.listings.slice(cursor, cursor + batchSize);

  const parsed: BrokerInventoryObservation[] = [];
  const errors: { id: string; error: string }[] = [];
  const settled = await Promise.allSettled(batch.map((row) => parseWsrListing(row.id, row.url)));
  settled.forEach((result, index) => {
    if (result.status === "fulfilled") parsed.push(result.value);
    else errors.push({ id: batch[index].id, error: result.reason instanceof Error ? result.reason.message : String(result.reason) });
  });

  await upsertObservations(parsed);

  const nextCursor = cursor + batch.length;
  return {
    brokerage: "We Sell Restaurants",
    discovered: discovered.listings.length,
    territories: discovered.territories,
    processed: batch.length,
    saved: parsed.length,
    errors,
    cursor,
    next_cursor: nextCursor < discovered.listings.length ? nextCursor : null,
    complete: nextCursor >= discovered.listings.length,
    quota: parsed.filter((r) => r.license_class === "quota").length,
    sfs: parsed.filter((r) => r.license_class === "sfs").length,
    beer_wine: parsed.filter((r) => r.license_class === "2cop").length,
    full_liquor_unresolved: parsed.filter((r) => r.license_class === "full_liquor_unknown").length,
    unknown: parsed.filter((r) => r.license_class === "unknown").length,
  };
}
