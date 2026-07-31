import "server-only";

import { randomUUID } from "node:crypto";

import type { LicenseFeeLookupResult } from "@/lib/license-fee-lookup";

const bucket = "license-fee-reminders";

export type LicenseReminder = {
  id: string;
  objectName: string;
  license_number: string;
  email: string;
  license_series: string;
  county: string;
  annual_fee: number | null;
  half_year_fee: number | null;
  license_expiration_date: string;
  reminder_date: string;
  unsubscribe_token: string;
  status: "pending" | "sending" | "sent" | "failed" | "cancelled";
  created_at: string;
  updated_at: string;
  sent_at?: string;
  last_error?: string | null;
};

function settings() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Renewal reminders are temporarily unavailable.");
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
    throw new Error("Reminder storage could not be initialized.");
  }
}

async function writeReminder(reminder: LicenseReminder) {
  await ensureBucket();
  const { url } = settings();
  const response = await fetch(
    `${url}/storage/v1/object/${bucket}/${encodeURIComponent(reminder.objectName)}`,
    {
      method: "POST",
      headers: { ...authHeaders("application/json"), "x-upsert": "true" },
      body: JSON.stringify(reminder),
      cache: "no-store",
    }
  );
  if (!response.ok) {
    console.error("Saving renewal reminder failed", response.status, await response.text());
    throw new Error("We could not schedule the reminder. Please try again.");
  }
  return reminder;
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
    if (!response.ok) throw new Error("Reminder storage could not be read.");
    const rows = (await response.json()) as Array<{ name: string }>;
    names.push(...rows.map((row) => row.name).filter((name) => name.endsWith(".json")));
    if (rows.length < 1000) break;
  }
  return names;
}

async function readReminder(objectName: string) {
  const { url } = settings();
  const response = await fetch(
    `${url}/storage/v1/object/${bucket}/${encodeURIComponent(objectName)}`,
    { headers: authHeaders(), cache: "no-store" }
  );
  if (!response.ok) return null;
  const reminder = (await response.json()) as LicenseReminder;
  reminder.objectName = objectName;
  return reminder;
}

export async function saveLicenseReminder(input: {
  email: string;
  license: LicenseFeeLookupResult;
  expirationDate: string;
  reminderDate: string;
}) {
  const id = randomUUID();
  const now = new Date().toISOString();
  return writeReminder({
    id,
    objectName: `${input.reminderDate}__${id}.json`,
    license_number: input.license.licenseNumber,
    email: input.email,
    license_series: input.license.series,
    county: input.license.county,
    annual_fee: input.license.annualFee,
    half_year_fee: input.license.halfYearFee,
    license_expiration_date: input.expirationDate,
    reminder_date: input.reminderDate,
    unsubscribe_token: randomUUID(),
    status: "pending",
    created_at: now,
    updated_at: now,
  });
}

export async function dueLicenseReminders() {
  const today = new Date().toISOString().slice(0, 10);
  const dueNames = (await listObjectNames())
    .filter((name) => name.slice(0, 10) <= today);
  const reminders = await Promise.all(dueNames.map(readReminder));
  return reminders.filter(
    (reminder): reminder is LicenseReminder =>
      reminder !== null && reminder.status === "pending" && reminder.reminder_date <= today
  ).slice(0, 100);
}

export async function updateLicenseReminder(
  id: string,
  values: Partial<Pick<LicenseReminder, "status">> & { sent_at?: string; last_error?: string | null },
  objectName?: string
) {
  const name = objectName ?? (await listObjectNames()).find((candidate) => candidate.includes(id));
  if (!name) throw new Error("Reminder record was not found.");
  const current = await readReminder(name);
  if (!current) throw new Error("Reminder record was not found.");
  return writeReminder({ ...current, ...values, updated_at: new Date().toISOString() });
}

export async function cancelLicenseReminder(token: string) {
  for (const name of await listObjectNames()) {
    const reminder = await readReminder(name);
    if (reminder?.unsubscribe_token === token && reminder.status === "pending") {
      await writeReminder({ ...reminder, status: "cancelled", updated_at: new Date().toISOString() });
      return true;
    }
  }
  return false;
}
