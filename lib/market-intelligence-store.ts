import "server-only";

import { businessQuotaListingRecords } from "@/lib/business-quota-listings";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export type MarketIntelligenceRecord = {
  id: string | null;
  listing_reference: string;
  business_name: string | null;
  source_listing_title: string | null;
  identification_basis: string | null;
  legal_entity_name: string | null;
  county: string;
  city: string | null;
  business_type: string;
  license_type: string | null;
  license_number: string | null;
  license_holder: string | null;
  asking_price: number | null;
  gross_revenue: number | null;
  sde_cash_flow: number | null;
  fllm_est_license_value: number | null;
  broker_name: string | null;
  brokerage: string | null;
  broker_phone: string | null;
  broker_email: string | null;
  owner_name: string | null;
  owner_phone: string | null;
  owner_email: string | null;
  source_listing_url: string | null;
  dbpr_url: string | null;
  sunbiz_url: string | null;
  property_url: string | null;
  source_urls: string[];
  identification_confidence: number | null;
  verification_status: string;
  market_status: string;
  first_seen_at: string;
  last_seen_at: string;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
  origin: "private_database" | "fllm_registry";
};

type DbRow = Omit<MarketIntelligenceRecord, "origin">;

function settings() {
  return supabaseServiceSettings("FLLM private market-intelligence database is unavailable.");
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
  if (!response.ok) {
    throw new Error(`Market-intelligence database error: ${response.status} ${await response.text()}`);
  }
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

function moneyNumber(value?: string | null) {
  if (!value) return null;
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function registryRow(record: (typeof businessQuotaListingRecords)[number]): MarketIntelligenceRecord {
  const now = new Date().toISOString();
  return {
    id: null,
    listing_reference: record.listingReference,
    business_name: null,
    source_listing_title: record.title,
    identification_basis: null,
    legal_entity_name: null,
    county: record.county,
    city: null,
    business_type: record.businessCategory,
    license_type: record.licenseType,
    license_number: null,
    license_holder: null,
    asking_price: record.packagePriceNumber || null,
    gross_revenue: null,
    sde_cash_flow: null,
    fllm_est_license_value: moneyNumber(record.marketMedianLicenseValue || record.allocatedLicenseValue),
    broker_name: record.brokerName || null,
    brokerage: record.brokerage || null,
    broker_phone: null,
    broker_email: null,
    owner_name: null,
    owner_phone: null,
    owner_email: null,
    source_listing_url: record.sourceListingUrls?.[0] || null,
    dbpr_url: null,
    sunbiz_url: null,
    property_url: null,
    source_urls: [...(record.sourceListingUrls || []), ...(record.independentVerificationUrls || [])],
    identification_confidence: null,
    verification_status: record.sourceVerification === "independently_verified" ? "verified" : "unverified",
    market_status: record.publicationStatus === "published" ? "active" : "preview",
    first_seen_at: now,
    last_seen_at: now,
    notes: record.featured ? "FLLM featured broker listing registry record." : "FLLM market-observation registry record.",
    created_at: null,
    updated_at: null,
    origin: "fllm_registry",
  };
}

function mergeRows(base: MarketIntelligenceRecord, privateRow: DbRow): MarketIntelligenceRecord {
  const merged = { ...base, ...privateRow, origin: "private_database" as const };
  merged.source_urls = Array.from(new Set([...(base.source_urls || []), ...(privateRow.source_urls || [])]));
  return merged;
}

export async function listMarketIntelligence(): Promise<MarketIntelligenceRecord[]> {
  const privateRows = await rest<DbRow[]>(
    "market_intelligence_businesses?select=*&order=last_seen_at.desc&limit=2000",
  );

  const byRef = new Map(privateRows.filter((r) => r.listing_reference).map((r) => [r.listing_reference, r]));
  const registry = businessQuotaListingRecords.map((record) => {
    const base = registryRow(record);
    const privateRow = byRef.get(base.listing_reference);
    return privateRow ? mergeRows(base, privateRow) : base;
  });

  const registryRefs = new Set(registry.map((r) => r.listing_reference));
  const privateOnly = privateRows
    .filter((row) => !registryRefs.has(row.listing_reference))
    .map((row) => ({ ...row, origin: "private_database" as const }));

  return [...privateOnly, ...registry].sort((a, b) => {
    const aNamed = Boolean(a.business_name);
    const bNamed = Boolean(b.business_name);
    if (aNamed !== bNamed) return aNamed ? -1 : 1;
    if (aNamed && bNamed) {
      const confidenceDelta = (b.identification_confidence ?? -1) - (a.identification_confidence ?? -1);
      if (confidenceDelta) return confidenceDelta;
    }
    if (a.market_status === b.market_status) return a.county.localeCompare(b.county);
    return a.market_status === "active" ? -1 : 1;
  });
}

const editableFields = [
  "business_name","source_listing_title","identification_basis","legal_entity_name","county","city","business_type","license_type","license_number","license_holder",
  "asking_price","gross_revenue","sde_cash_flow","fllm_est_license_value","broker_name","brokerage","broker_phone","broker_email",
  "owner_name","owner_phone","owner_email","source_listing_url","dbpr_url","sunbiz_url","property_url","source_urls",
  "identification_confidence","verification_status","market_status","first_seen_at","last_seen_at","notes",
] as const;

export async function saveMarketIntelligence(input: Partial<DbRow> & { listing_reference?: string | null }) {
  const reference = input.listing_reference?.trim() || `INTEL-${Date.now()}`;
  const row: Record<string, unknown> = { listing_reference: reference, updated_at: new Date().toISOString() };

  for (const key of editableFields) {
    if (input[key] !== undefined) row[key] = input[key];
  }

  if (!row.county || !row.business_type) {
    const registryRecord = businessQuotaListingRecords.find((r) => r.listingReference === reference);
    if (registryRecord) {
      row.county ??= registryRecord.county;
      row.business_type ??= registryRecord.businessCategory;
      row.license_type ??= registryRecord.licenseType;
      row.asking_price ??= registryRecord.packagePriceNumber || null;
      row.broker_name ??= registryRecord.brokerName || null;
      row.brokerage ??= registryRecord.brokerage || null;
      row.source_listing_url ??= registryRecord.sourceListingUrls?.[0] || null;
      row.source_urls ??= [...(registryRecord.sourceListingUrls || []), ...(registryRecord.independentVerificationUrls || [])];
    }
  }

  if (!row.county || !row.business_type) {
    throw new Error("County and business type are required.");
  }

  const response = await rest<DbRow[]>(
    "market_intelligence_businesses?on_conflict=listing_reference",
    {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(row),
    },
  );
  return response[0];
}
