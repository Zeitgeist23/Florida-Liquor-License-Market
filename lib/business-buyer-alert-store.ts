import "server-only";

import { randomBytes, randomUUID } from "node:crypto";

import { supabaseServiceSettings } from "@/lib/supabase-settings";
import type { BusinessQuotaCategory, BusinessQuotaListing } from "@/lib/business-quota-listings";

export type BusinessBuyerAlertLicenseType =
  | "4COP Quota"
  | "3PS Quota / Package Store"
  | "4COP SFS/SRX"
  | "2COP Beer & Wine";

export type BusinessBuyerAlertFinancingPreference =
  | "Any"
  | "Cash"
  | "SBA"
  | "Seller Financing"
  | "Other";

export type BusinessBuyerAlert = {
  id: string;
  submission_ref: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  business_types: BusinessQuotaCategory[];
  license_types: BusinessBuyerAlertLicenseType[];
  counties: string[];
  max_purchase_price: number | null;
  min_gross_revenue: number | null;
  min_sde: number | null;
  min_ebitda: number | null;
  financing_preferences: BusinessBuyerAlertFinancingPreference[];
  notes: string;
  source_market_view_ref: string;
  source_market_view_url: string;
  status: "active" | "unsubscribed";
  unsubscribe_token: string;
  notified_listing_refs: string[];
  created_at: string;
  updated_at: string;
};

type AlertRow = {
  submission_ref: string;
  full_name: string;
  first_name: string | null;
  email: string;
  phone: string | null;
  county: string;
  license_type: string;
  asking_price: number | null;
  license_status: string;
  preferred_timing: string | null;
  message: string | null;
  created_at: string;
  updated_at: string;
};

function settings() {
  return supabaseServiceSettings("Business buyer alerts are temporarily unavailable.");
}

function headers(extra?: Record<string, string>) {
  const { key } = settings();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function clean(value: string | undefined | null, max = 5000) {
  return (value ?? "").trim().replace(/\s+/g, " ").slice(0, max);
}

function makeRef() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const token = randomBytes(4).toString("hex").toUpperCase();
  return `FLLM-BUYER-${date}-${token}`;
}

function alertFromRow(row: AlertRow): BusinessBuyerAlert | null {
  if (row.license_status !== "Business Buyer Alert") return null;
  try {
    const parsed = JSON.parse(row.message || "{}") as {
      kind?: string;
      alert?: Omit<BusinessBuyerAlert, "submission_ref"> & { submission_ref?: string };
    };
    if (parsed.kind !== "business_buyer_alert" || !parsed.alert) return null;
    return {
      ...parsed.alert,
      submission_ref: row.submission_ref,
      first_name: parsed.alert.first_name || row.first_name || "there",
      last_name: parsed.alert.last_name || "",
      email: parsed.alert.email || row.email,
      phone: parsed.alert.phone || row.phone || "",
      created_at: parsed.alert.created_at || row.created_at,
      updated_at: parsed.alert.updated_at || row.updated_at,
    } as BusinessBuyerAlert;
  } catch {
    return null;
  }
}

function rowFor(alert: BusinessBuyerAlert) {
  const fullName = [alert.first_name, alert.last_name].filter(Boolean).join(" ").trim();
  return {
    submission_ref: alert.submission_ref,
    full_name: fullName,
    first_name: alert.first_name,
    email: alert.email,
    phone: alert.phone,
    county: alert.counties[0] || "Florida",
    license_type: alert.license_types[0] || "Business + Liquor License",
    asking_price: alert.max_purchase_price,
    asking_price_text: alert.max_purchase_price === null ? null : String(alert.max_purchase_price),
    license_status: alert.status === "active" ? "Business Buyer Alert" : "Business Buyer Alert Unsubscribed",
    preferred_timing: "Ongoing",
    message: JSON.stringify({ kind: "business_buyer_alert", alert }),
    status: "pending_payment",
    payment_email_status: "pending",
    approval_email_status: "pending",
    listing_title: "FLLM Business + Liquor License Buyer Alert",
    approved_license_type: null,
    approved_asking_price: alert.max_purchase_price,
    live_listing_ref: alert.source_market_view_ref || null,
    live_listing_url: alert.source_market_view_url || null,
    created_at: alert.created_at,
    updated_at: alert.updated_at,
  };
}

export async function createBusinessBuyerAlert(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessTypes: BusinessQuotaCategory[];
  licenseTypes: BusinessBuyerAlertLicenseType[];
  counties: string[];
  maxPurchasePrice?: number | null;
  minGrossRevenue?: number | null;
  minSde?: number | null;
  minEbitda?: number | null;
  financingPreferences?: BusinessBuyerAlertFinancingPreference[];
  notes?: string;
  sourceMarketViewRef?: string;
  sourceMarketViewUrl?: string;
}) {
  const { url } = settings();
  const now = new Date().toISOString();
  const alert: BusinessBuyerAlert = {
    id: randomUUID(),
    submission_ref: makeRef(),
    first_name: clean(input.firstName, 80),
    last_name: clean(input.lastName, 80),
    email: clean(input.email, 254).toLowerCase(),
    phone: clean(input.phone, 60),
    business_types: Array.from(new Set(input.businessTypes)),
    license_types: Array.from(new Set(input.licenseTypes)),
    counties: Array.from(new Set(input.counties.map((item) => clean(item, 100)).filter(Boolean))),
    max_purchase_price: input.maxPurchasePrice ?? null,
    min_gross_revenue: input.minGrossRevenue ?? null,
    min_sde: input.minSde ?? null,
    min_ebitda: input.minEbitda ?? null,
    financing_preferences: Array.from(new Set(input.financingPreferences ?? ["Any"])),
    notes: clean(input.notes, 3000),
    source_market_view_ref: clean(input.sourceMarketViewRef, 100),
    source_market_view_url: clean(input.sourceMarketViewUrl, 500),
    status: "active",
    unsubscribe_token: randomUUID(),
    notified_listing_refs: [],
    created_at: now,
    updated_at: now,
  };

  const response = await fetch(`${url}/rest/v1/listing_submissions`, {
    method: "POST",
    headers: headers({ Prefer: "return=minimal" }),
    body: JSON.stringify(rowFor(alert)),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Could not save business buyer alert: ${response.status} ${await response.text()}`);
  }

  return alert;
}

export async function activeBusinessBuyerAlerts() {
  const { url } = settings();
  const response = await fetch(
    `${url}/rest/v1/listing_submissions?license_status=eq.${encodeURIComponent("Business Buyer Alert")}&select=submission_ref,full_name,first_name,email,phone,county,license_type,asking_price,license_status,preferred_timing,message,created_at,updated_at&order=created_at.asc`,
    { headers: headers(), cache: "no-store" },
  );
  if (!response.ok) {
    throw new Error(`Could not read business buyer alerts: ${response.status} ${await response.text()}`);
  }
  const rows = (await response.json()) as AlertRow[];
  return rows.map(alertFromRow).filter((alert): alert is BusinessBuyerAlert => Boolean(alert));
}

export async function updateBusinessBuyerAlert(alert: BusinessBuyerAlert) {
  const { url } = settings();
  const updated = { ...alert, updated_at: new Date().toISOString() };
  const row = rowFor(updated);
  const response = await fetch(
    `${url}/rest/v1/listing_submissions?submission_ref=eq.${encodeURIComponent(alert.submission_ref)}`,
    {
      method: "PATCH",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify({
        full_name: row.full_name,
        first_name: row.first_name,
        email: row.email,
        phone: row.phone,
        county: row.county,
        license_type: row.license_type,
        asking_price: row.asking_price,
        asking_price_text: row.asking_price_text,
        license_status: row.license_status,
        preferred_timing: row.preferred_timing,
        message: row.message,
        approved_asking_price: row.approved_asking_price,
        live_listing_ref: row.live_listing_ref,
        live_listing_url: row.live_listing_url,
        updated_at: row.updated_at,
      }),
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(`Could not update business buyer alert: ${response.status} ${await response.text()}`);
  }
  return updated;
}

export async function markBusinessBuyerAlertNotified(
  alert: BusinessBuyerAlert,
  listingRefs: string[],
) {
  const nextRefs = Array.from(new Set([...alert.notified_listing_refs, ...listingRefs])).slice(-500);
  return updateBusinessBuyerAlert({ ...alert, notified_listing_refs: nextRefs });
}

export async function unsubscribeBusinessBuyerAlert(token: string) {
  const alerts = await activeBusinessBuyerAlerts();
  const alert = alerts.find((item) => item.unsubscribe_token === token);
  if (!alert) return false;
  await updateBusinessBuyerAlert({ ...alert, status: "unsubscribed" });
  return true;
}

export function businessBuyerAlertCriteriaSummary(alert: BusinessBuyerAlert) {
  return {
    businessTypes: alert.business_types.join(", "),
    licenseTypes: alert.license_types.join(", "),
    counties: alert.counties.join(", "),
    financing: alert.financing_preferences.join(", "),
  };
}

export function disclosedMetric(
  listing: BusinessQuotaListing,
  key: "grossRevenueNumber" | "sdeNumber" | "ebitdaNumber",
) {
  const value = listing[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
