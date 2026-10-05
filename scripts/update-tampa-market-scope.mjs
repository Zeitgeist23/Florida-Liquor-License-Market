import fs from "node:fs/promises";
import path from "node:path";

const DBPR_URL = "https://www2.myfloridalicense.com/sto/file_download/extracts/bd4006lic.csv";
const OUT = path.join(process.cwd(), "data/market-scope/tampa-dbpr.json");

function parseCsvRow(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (ch === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += ch;
    }
  }
  cells.push(cell.replace(/\r$/, ""));
  return cells;
}

function isSpecial4cop(modifier) {
  return String(modifier || "").trim().length > 0;
}

function isSfs4cop(modifier) {
  return /^(SFS|SRX)$/i.test(String(modifier || "").trim());
}

function quotaClass(series, modifier) {
  const s = String(series || "").trim().toUpperCase();
  if (s === "4COP" && !isSpecial4cop(modifier)) return "4COP Quota";
  if (s === "3PS") return "3PS Quota";
  return null;
}

function categoryFor(dba, series, modifier) {
  const text = String(dba || "").toUpperCase();
  if (/LIQUOR|SPIRITS|PACKAGE|BOTTLE SHOP|WINE & SPIRITS/.test(text) || series === "3PS") return "Liquor Store";
  if (/MARINA/.test(text)) return "Marina";
  if (/HOTEL|MOTEL|RESORT|INN\b/.test(text)) return "Hotel / Motel";
  if (/NIGHTCLUB|NIGHT CLUB/.test(text)) return "Nightclub";
  if (/LOUNGE|TAVERN|PUB|SALOON|BAR\b/.test(text)) return "Bar";
  if (/RESTAURANT|GRILL|CAFE|KITCHEN|DINER|BISTRO|STEAK|SEAFOOD|PIZZA/.test(text)) return "Restaurant";
  if (/COUNTRY CLUB|GOLF/.test(text)) return "Country Club";
  if (/SFS|SRX/i.test(modifier || "")) return "Restaurant";
  return "Other Hospitality";
}

const response = await fetch(DBPR_URL, {
  headers: {
    "User-Agent": "Mozilla/5.0 FLLM-Market-Scope/1.0",
    Accept: "text/csv,*/*",
  },
});
if (!response.ok) throw new Error(`DBPR fetch failed: ${response.status}`);

const csv = await response.text();
const countyRows = [];
const cityRows = [];

for (const line of csv.split(/\n/)) {
  if (!line.trim()) continue;
  const row = parseCsvRow(line);
  if (row.length < 23) continue;

  const countyCode = String(row[19] || row[11] || "").trim();
  if (countyCode !== "39") continue;

  const series = String(row[3] || "").trim();
  const modifier = String(row[4] || "").trim();
  const city = String(row[16] || "").trim();
  const secondaryStatus = String(row[22] || "").trim();
  const record = {
    licenseNumber: String(row[20] || "").trim(),
    licensee: String(row[2] || "").trim() || "Not listed",
    dba: String(row[12] || "").trim() || "Not listed",
    series,
    modifier,
    city,
    address: [row[13], row[14], row[15]].filter(Boolean).join(" ").trim(),
    zip: String(row[18] || "").trim(),
    primaryStatus: String(row[21] || "").trim(),
    secondaryStatus,
    active: secondaryStatus === "20",
    quotaClass: quotaClass(series, modifier),
    category: categoryFor(String(row[12] || "").trim(), series, modifier),
  };

  countyRows.push(record);
  if (/^TAMPA$/i.test(city)) cityRows.push(record);
}

const county4cop = countyRows.filter((r) => r.quotaClass === "4COP Quota");
const county3ps = countyRows.filter((r) => r.quotaClass === "3PS Quota");
const cityActive = cityRows.filter((r) => r.active);
const city4cop = cityActive.filter((r) => r.quotaClass === "4COP Quota");
const city3ps = cityActive.filter((r) => r.quotaClass === "3PS Quota");
const citySfs = cityActive.filter((r) => r.series.toUpperCase() === "4COP" && isSfs4cop(r.modifier));
const city2cop = cityActive.filter((r) => r.series.toUpperCase() === "2COP");

const snapshot = {
  available: true,
  fetchedAt: new Date().toISOString(),
  source: "Florida DBPR / ABT retail license extract",
  generatedAt: new Date().toISOString(),
  county: "Hillsborough County",
  city: "Tampa",
  countyTotalRetailLicenses: countyRows.length,
  cityTotalRetailLicenses: cityActive.length,
  county4copInEffect: county4cop.length,
  county4copInUse: county4cop.filter((r) => r.active).length,
  county4copInactive: county4cop.filter((r) => !r.active).length,
  county3psInEffect: county3ps.length,
  county3psInUse: county3ps.filter((r) => r.active).length,
  county3psInactive: county3ps.filter((r) => !r.active).length,
  city4copInUse: city4cop.length,
  city3psInUse: city3ps.length,
  citySfsInUse: citySfs.length,
  city2copInUse: city2cop.length,
  cityEstablishments: cityActive.sort((a, b) => a.dba.localeCompare(b.dba)),
  cityQuotaEstablishments: [...city4cop, ...city3ps].sort((a, b) => a.dba.localeCompare(b.dba)),
};

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, JSON.stringify(snapshot, null, 2) + "\n");

console.log(JSON.stringify({
  countyTotalRetailLicenses: snapshot.countyTotalRetailLicenses,
  cityTotalRetailLicenses: snapshot.cityTotalRetailLicenses,
  county4copInEffect: snapshot.county4copInEffect,
  county4copInUse: snapshot.county4copInUse,
  county3psInEffect: snapshot.county3psInEffect,
  county3psInUse: snapshot.county3psInUse,
  city4copInUse: snapshot.city4copInUse,
  city3psInUse: snapshot.city3psInUse,
  citySfsInUse: snapshot.citySfsInUse,
  city2copInUse: snapshot.city2copInUse,
}, null, 2));
