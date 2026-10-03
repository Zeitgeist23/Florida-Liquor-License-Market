import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!baseUrl || !serviceKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
}

const tables = [
  "fllm_market_sources",
  "quota_license_market_observations",
  "quota_license_sales",
  "quota_license_financing",
  "business_quota_market_observations",
  "quota_market_snapshots",
];

const archiveDate = process.env.FLLM_ARCHIVE_DATE || new Date().toISOString().slice(0, 10);
const outputDir = resolve(process.cwd(), "data", "market-intelligence", "archives", archiveDate);
await mkdir(outputDir, { recursive: true });

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  Accept: "application/json",
};

async function fetchAll(table) {
  const rows = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const url = new URL(`${baseUrl}/rest/v1/${table}`);
    url.searchParams.set("select", "*");
    url.searchParams.set("limit", String(pageSize));
    url.searchParams.set("offset", String(offset));
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Failed to export ${table}: ${response.status} ${await response.text()}`);
    }
    const page = await response.json();
    rows.push(...page);
    if (page.length < pageSize) break;
  }
  return rows;
}

function csvCell(value) {
  if (value === null || value === undefined) return "";
  const text = typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows) {
  if (!rows.length) return "";
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))].sort();
  return [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(",")),
  ].join("\n") + "\n";
}

const manifest = {
  archive_date: archiveDate,
  exported_at: new Date().toISOString(),
  purpose:
    "Independent FLLM-owned portable archive of the market-intelligence dataset. Supabase is the operational database, not the sole custodian of historical market data.",
  format_version: 1,
  tables: {},
};

for (const table of tables) {
  const rows = await fetchAll(table);
  manifest.tables[table] = { row_count: rows.length };
  await writeFile(
    resolve(outputDir, `${table}.json`),
    JSON.stringify(rows, null, 2) + "\n",
    "utf8",
  );
  await writeFile(resolve(outputDir, `${table}.csv`), toCsv(rows), "utf8");
}

await writeFile(
  resolve(outputDir, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
  "utf8",
);

console.log(JSON.stringify(manifest, null, 2));
