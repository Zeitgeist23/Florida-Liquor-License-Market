import "server-only";

import { randomUUID } from "node:crypto";

const bucket = "license-alerts";
const dbPrefix = "FLLM-ALERT-";

export type LicenseAlert = {
  id: string;
  objectName: string;
  email: string;
  first_name: string;
  address: string;
  phone: string;
  counties: string[];
  license_types: Array<"4COP Quota" | "3PS Quota / Package Store">;
  max_price: number | null;
  status: "active" | "unsubscribed";
  unsubscribe_token: string;
  notified_listing_refs: string[];
  created_at: string;
  updated_at: string;
};

function settings() {
  const rawUrl = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!rawUrl || !key) throw new Error("License Alerts are temporarily unavailable.");
  const url = (/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`).replace(/\/+$/, "");
  return { url, key };
}

function authHeaders(contentType?: string) {
  const { key } = settings();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    ...(contentType ? { "Content-Type": contentType } : {}),
  };
}

async function ensureBucket() {
  const { url } = settings();
  const response = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: authHeaders("application/json"),
    body: JSON.stringify({
      id: bucket,
      name: bucket,
      public: false,
      file_size_limit: 100000,
      allowed_mime_types: ["application/json"],
    }),
    cache: "no-store",
  });

  if (!response.ok && response.status !== 409) {
    throw new Error(`License Alert storage could not be initialized (${response.status}).`);
  }
}

async function writeStorageAlert(alert: LicenseAlert) {
  await ensureBucket();
  const { url } = settings();
  const response = await fetch(
    `${url}/storage/v1/object/${bucket}/${encodeURIComponent(alert.objectName)}`,
    {
      method: "POST",
      headers: { ...authHeaders("application/json"), "x-upsert": "true" },
      body: JSON.stringify(alert),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error("Saving license alert to Storage failed", response.status, await response.text());
    throw new Error("License Alert Storage write failed.");
  }

  return alert;
}

type DbAlertRow = {
  submission_ref: string;
  message: string | null;
};

function dbRefFor(alert: LicenseAlert) {
  if (alert.objectName.startsWith("db:")) return alert.objectName.slice(3);
  return `${dbPrefix}${alert.id}`;
}

function dbRowFor(alert: LicenseAlert) {
  const submissionRef = dbRefFor(alert);
  return {
    submission_ref: submissionRef,
    full_name: alert.first_name || "License Alert Subscriber",
    first_name: (alert.first_name || "there").split(/\s+/)[0] || "there",
    email: alert.email,
    phone: alert.phone,
    county: alert.counties[0] || "Florida",
    license_type: alert.license_types[0] || "4COP Quota",
    asking_price: alert.max_price,
    asking_price_text: alert.max_price === null ? null : String(alert.max_price),
    license_status: alert.status === "active" ? "License Alert" : "License Alert Unsubscribed",
    preferred_timing: "Ongoing",
    message: JSON.stringify({ kind: "license_alert", alert: { ...alert, objectName: `db:${submissionRef}` } }),
    status: "pending_payment",
    payment_email_status: "pending",
    approval_email_status: "pending",
    listing_title: "FLLM License Alert",
    approved_license_type: alert.license_types[0] || null,
    approved_asking_price: alert.max_price,
    created_at: alert.created_at,
    updated_at: alert.updated_at,
  };
}

async function insertDbAlert(alert: LicenseAlert) {
  const { url } = settings();
  const row = dbRowFor(alert);
  const response = await fetch(`${url}/rest/v1/listing_submissions`, {
    method: "POST",
    headers: { ...authHeaders("application/json"), Prefer: "return=minimal" },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error("Saving license alert to database fallback failed", response.status, detail);
    throw new Error("We could not save your License Alert. Please try again.");
  }
  return { ...alert, objectName: `db:${row.submission_ref}` };
}

async function updateDbAlert(alert: LicenseAlert) {
  const { url } = settings();
  const ref = dbRefFor(alert);
  const row = dbRowFor({ ...alert, objectName: `db:${ref}` });
  const response = await fetch(
    `${url}/rest/v1/listing_submissions?submission_ref=eq.${encodeURIComponent(ref)}`,
    {
      method: "PATCH",
      headers: { ...authHeaders("application/json"), Prefer: "return=minimal" },
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
        approved_license_type: row.approved_license_type,
        approved_asking_price: row.approved_asking_price,
        updated_at: row.updated_at,
      }),
      cache: "no-store",
    }
  );
  if (!response.ok) {
    console.error("Updating license alert database fallback failed", response.status, await response.text());
    throw new Error("We could not update your License Alert.");
  }
  return { ...alert, objectName: `db:${ref}` };
}

function alertFromDbRow(row: DbAlertRow): LicenseAlert | null {
  if (!row.message) return null;
  try {
    const parsed = JSON.parse(row.message) as { kind?: string; alert?: LicenseAlert };
    if (parsed.kind !== "license_alert" || !parsed.alert) return null;
    return {
      ...parsed.alert,
      address: typeof parsed.alert.address === "string" ? parsed.alert.address : "",
      objectName: `db:${row.submission_ref}`,
    };
  } catch {
    return null;
  }
}

async function readDbAlerts() {
  const { url } = settings();
  const response = await fetch(
    `${url}/rest/v1/listing_submissions?submission_ref=like.${encodeURIComponent(`${dbPrefix}*`)}&select=submission_ref,message&order=created_at.asc`,
    { headers: authHeaders("application/json"), cache: "no-store" }
  );
  if (!response.ok) {
    console.error("Reading license alert database fallback failed", response.status, await response.text());
    return [] as LicenseAlert[];
  }
  const rows = (await response.json()) as DbAlertRow[];
  return rows.map(alertFromDbRow).filter((alert): alert is LicenseAlert => alert !== null);
}

async function listObjectNames() {
  await ensureBucket();
  const { url } = settings();
  const names: string[] = [];

  for (let offset = 0; offset < 10000; offset += 1000) {
    const response = await fetch(`${url}/storage/v1/object/list/${bucket}`, {
      method: "POST",
      headers: authHeaders("application/json"),
      body: JSON.stringify({
        prefix: "",
        limit: 1000,
        offset,
        sortBy: { column: "name", order: "asc" },
      }),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("License Alert storage could not be read.");
    const rows = (await response.json()) as Array<{ name: string }>;
    names.push(...rows.map((row) => row.name).filter((name) => name.endsWith(".json")));
    if (rows.length < 1000) break;
  }

  return names;
}

async function readStorageAlert(objectName: string) {
  const { url } = settings();
  const response = await fetch(
    `${url}/storage/v1/object/${bucket}/${encodeURIComponent(objectName)}`,
    { headers: authHeaders(), cache: "no-store" }
  );

  if (!response.ok) return null;
  const alert = (await response.json()) as LicenseAlert;
  alert.objectName = objectName;
  if (typeof alert.address !== "string") alert.address = "";
  return alert;
}

async function writeAlert(alert: LicenseAlert) {
  if (alert.objectName.startsWith("db:")) return updateDbAlert(alert);
  try {
    return await writeStorageAlert(alert);
  } catch (error) {
    console.error("License Alert Storage unavailable; using database fallback", error);
    return insertDbAlert(alert);
  }
}

export async function createLicenseAlert(input: {
  email: string;
  firstName?: string;
  address?: string;
  phone?: string;
  counties: string[];
  licenseTypes: Array<"4COP Quota" | "3PS Quota / Package Store">;
  maxPrice?: number | null;
}) {
  const id = randomUUID();
  const now = new Date().toISOString();

  return writeAlert({
    id,
    objectName: `${now.slice(0, 10)}__${id}.json`,
    email: input.email.trim().toLowerCase(),
    first_name: input.firstName?.trim() ?? "",
    address: input.address?.trim() ?? "",
    phone: input.phone?.trim() ?? "",
    counties: Array.from(new Set(input.counties.map((county) => county.trim()).filter(Boolean))),
    license_types: Array.from(new Set(input.licenseTypes)),
    max_price: input.maxPrice ?? null,
    status: "active",
    unsubscribe_token: randomUUID(),
    notified_listing_refs: [],
    created_at: now,
    updated_at: now,
  });
}

export async function activeLicenseAlerts() {
  const byId = new Map<string, LicenseAlert>();

  try {
    const storageAlerts = await Promise.all((await listObjectNames()).map(readStorageAlert));
    storageAlerts.forEach((alert) => {
      if (alert) byId.set(alert.id, alert);
    });
  } catch (error) {
    console.error("License Alert Storage read unavailable", error);
  }

  try {
    const dbAlerts = await readDbAlerts();
    dbAlerts.forEach((alert) => byId.set(alert.id, alert));
  } catch (error) {
    console.error("License Alert database fallback read unavailable", error);
  }

  return Array.from(byId.values()).filter((alert) => alert.status === "active");
}

export async function markLicenseAlertNotified(alert: LicenseAlert, listingRef: string) {
  if (alert.notified_listing_refs.includes(listingRef)) return alert;
  return writeAlert({
    ...alert,
    notified_listing_refs: [...alert.notified_listing_refs, listingRef].slice(-250),
    updated_at: new Date().toISOString(),
  });
}

export async function unsubscribeLicenseAlert(token: string) {
  const alerts = await activeLicenseAlerts();
  const alert = alerts.find((candidate) => candidate.unsubscribe_token === token);
  if (!alert) return false;
  await writeAlert({ ...alert, status: "unsubscribed", updated_at: new Date().toISOString() });
  return true;
}
