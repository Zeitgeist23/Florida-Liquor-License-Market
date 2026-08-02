import "server-only";

import { canonicalizeSourceUrl } from "@/lib/listing-discovery";

type RefreshListingRow = {
  id: number;
  price: number | null;
  price_label: string;
  source_url: string;
  status: "available" | "sold";
};

type TavilyExtractResult = {
  url?: string;
  raw_content?: string | null;
};

type TavilyExtractResponse = {
  results?: TavilyExtractResult[];
};

export type ListingRefreshResult = {
  databaseConfigured: boolean;
  checked: number;
  refreshed: number;
  priceUpdated: number;
  statusUpdated: number;
  failed: number;
};

const DEFAULT_BATCH_SIZE = 15;
const MAX_BATCH_SIZE = 20;

function databaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function headers(extra: HeadersInit = {}): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra
  };
}

function sourceUrlKey(value: string): string {
  try {
    return canonicalizeSourceUrl(value).toLowerCase();
  } catch {
    return value.trim().toLowerCase();
  }
}

function batchSize(): number {
  const configured = Number(process.env.LISTING_REFRESH_BATCH_SIZE ?? DEFAULT_BATCH_SIZE);
  if (!Number.isFinite(configured)) return DEFAULT_BATCH_SIZE;
  return Math.max(1, Math.min(MAX_BATCH_SIZE, Math.floor(configured)));
}

function priceValue(value: string): number | null {
  const parsed = Number(value.replace(/[$,\s]/g, ""));
  return Number.isFinite(parsed) && parsed >= 50000 && parsed <= 2500000 ? Math.round(parsed) : null;
}

export function extractAskingPrice(content: string): number | null {
  const labeledPatterns = [
    /(?:asking|list(?:ing)?|sale)\s+price[^$0-9]{0,50}(\$?\s*[0-9]{2,3}(?:,[0-9]{3})+|\$?\s*[0-9]{5,7})(?:\.\d{2})?/gi,
    /(?:price|asking)[^$0-9]{0,20}(\$\s*[0-9]{2,3}(?:,[0-9]{3})+|\$\s*[0-9]{5,7})(?:\.\d{2})?/gi
  ];

  for (const pattern of labeledPatterns) {
    for (const match of content.matchAll(pattern)) {
      const price = priceValue(match[1]);
      if (price !== null) return price;
    }
  }

  // Extract returns the most relevant chunks for the supplied query. A dollar
  // amount near the start is a safe fallback when no explicit label survives.
  for (const match of content.slice(0, 2500).matchAll(/\$\s*([0-9]{2,3}(?:,[0-9]{3})+|[0-9]{5,7})(?:\.\d{2})?/g)) {
    const price = priceValue(match[1]);
    if (price !== null) return price;
  }

  return null;
}

export function isConfidentlyUnavailable(content: string): boolean {
  const normalized = content
    .slice(0, 6000)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const state = "sold|in escrow|under contract|sale pending|off market|no longer available|expired";

  return new RegExp(`\\b(?:listing|license|asset) (?:is |has been |now )?(?:${state})\\b`, "i").test(normalized)
    || new RegExp(`\\bstatus (?:is )?(?:${state})\\b`, "i").test(normalized);
}

async function loadRefreshBatch(): Promise<RefreshListingRow[]> {
  const url = new URL(`${process.env.SUPABASE_URL}/rest/v1/listings`);
  url.searchParams.set("select", "id,price,price_label,source_url,status");
  url.searchParams.set("source_url", "not.is.null");
  url.searchParams.set("order", "last_seen_at.asc");
  url.searchParams.set("limit", String(batchSize()));

  const response = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Listing refresh database read failed: ${response.status} ${await response.text()}`);
  }

  return (await response.json()) as RefreshListingRow[];
}

async function extractListings(apiKey: string, urls: string[]): Promise<TavilyExtractResult[]> {
  const response = await fetch("https://api.tavily.com/extract", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      urls,
      query: "asking price listing status liquor license availability",
      extract_depth: "basic",
      format: "text",
      include_images: false,
      include_favicon: false
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(20000)
  });

  if (!response.ok) throw new Error(`Tavily Extract returned ${response.status}`);
  const body = (await response.json()) as TavilyExtractResponse;
  return Array.isArray(body.results) ? body.results : [];
}

async function updateListing(row: RefreshListingRow, content: string): Promise<{ priceUpdated: boolean; statusUpdated: boolean }> {
  const now = new Date().toISOString();
  const price = extractAskingPrice(content);
  const nextStatus = isConfidentlyUnavailable(content) ? "sold" : row.status;
  const update: Record<string, unknown> = {
    last_seen_at: now,
    updated_at: now
  };

  if (price !== null) {
    update.price = price;
    update.price_label = `$${price.toLocaleString("en-US")}`;
  }
  if (nextStatus !== row.status) update.status = nextStatus;

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/listings?id=eq.${row.id}`,
    {
      method: "PATCH",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify(update),
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Listing refresh update failed: ${response.status} ${await response.text()}`);
  }

  return {
    priceUpdated: price !== null && (row.price !== price || row.price_label !== update.price_label),
    statusUpdated: nextStatus !== row.status
  };
}

export async function refreshKnownListings(apiKey: string): Promise<ListingRefreshResult> {
  if (!databaseConfigured()) {
    return { databaseConfigured: false, checked: 0, refreshed: 0, priceUpdated: 0, statusUpdated: 0, failed: 0 };
  }

  const rows = await loadRefreshBatch();
  if (rows.length === 0) {
    return { databaseConfigured: true, checked: 0, refreshed: 0, priceUpdated: 0, statusUpdated: 0, failed: 0 };
  }

  const extracted = await extractListings(apiKey, rows.map((row) => row.source_url));
  const contentByUrl = new Map(
    extracted
      .filter((item): item is TavilyExtractResult & { url: string; raw_content: string } => Boolean(item.url && item.raw_content))
      .map((item) => [sourceUrlKey(item.url), item.raw_content])
  );

  const settled = await Promise.allSettled(rows.map((row) => {
    const content = contentByUrl.get(sourceUrlKey(row.source_url));
    if (!content) throw new Error(`No extracted content for ${row.source_url}`);
    return updateListing(row, content);
  }));

  const completed = settled.filter((result): result is PromiseFulfilledResult<{ priceUpdated: boolean; statusUpdated: boolean }> => result.status === "fulfilled");
  return {
    databaseConfigured: true,
    checked: rows.length,
    refreshed: completed.length,
    priceUpdated: completed.filter((result) => result.value.priceUpdated).length,
    statusUpdated: completed.filter((result) => result.value.statusUpdated).length,
    failed: settled.length - completed.length
  };
}
