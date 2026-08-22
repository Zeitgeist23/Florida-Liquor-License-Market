import "server-only";

import { randomUUID } from "node:crypto";

const bucket = "license-alerts";

export type LicenseAlert = {
  id: string;
  objectName: string;
  email: string;
  first_name: string;
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
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("License Alerts are temporarily unavailable.");
  return { url: url.replace(/\/$/, ""), key };
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
    throw new Error("License Alert storage could not be initialized.");
  }
}

async function writeAlert(alert: LicenseAlert) {
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
    console.error("Saving license alert failed", response.status, await response.text());
    throw new Error("We could not save your License Alert. Please try again.");
  }

  return alert;
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

async function readAlert(objectName: string) {
  const { url } = settings();
  const response = await fetch(
    `${url}/storage/v1/object/${bucket}/${encodeURIComponent(objectName)}`,
    { headers: authHeaders(), cache: "no-store" }
  );

  if (!response.ok) return null;
  const alert = (await response.json()) as LicenseAlert;
  alert.objectName = objectName;
  return alert;
}

export async function createLicenseAlert(input: {
  email: string;
  firstName?: string;
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
  const alerts = await Promise.all((await listObjectNames()).map(readAlert));
  return alerts.filter((alert): alert is LicenseAlert => alert !== null && alert.status === "active");
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
  for (const objectName of await listObjectNames()) {
    const alert = await readAlert(objectName);
    if (alert?.unsubscribe_token === token) {
      if (alert.status === "unsubscribed") return true;
      await writeAlert({ ...alert, status: "unsubscribed", updated_at: new Date().toISOString() });
      return true;
    }
  }
  return false;
}
