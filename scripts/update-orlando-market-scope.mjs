import fs from "node:fs/promises";
import path from "node:path";

const DBPR_URL = "https://www2.myfloridalicense.com/sto/file_download/extracts/bd4006lic.csv";
const OUT = path.join(process.cwd(), "data/market-scope/orlando-dbpr.json");

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
  const text = String(dba || "").toUpperCase().replace(/[’']/g, "");

  if (
    /RESTAURANT|GRILL|CAFE|COFFEE|KITCHEN|DINER|BISTRO|STEAK|SEAFOOD|PIZZA|PIZZERIA|TACO|BURRITO|SUSHI|DELI|EATERY|BRUNCH|BAKERY|BBQ|BAR B QUE|BAR-B-QUE|THAI|MEXICAN|ITALIAN|RAMEN|NOODLE|CHICKEN|WINGS|SANDWICH|FOOD|DINING|CUISINE|KABOB|KEBAB|HIBACHI|TERIYAKI|DONUT|ICE CREAM|CREAMERY/.test(text)
  ) return "Restaurant";

  if (
    /BAR\s*&\s*GRILL|BAR N GRILL|PUBLIC HOUSE|TAVERN|BAR B QUE|BAR-B-QUE|BBQ|SPORTS BAR/.test(text)
  ) return "Restaurant / Bar";

  if (
    /LIQUOR|SPIRITS|PACKAGE|BOTTLE SHOP|WINE\s*&\s*SPIRITS|FINE WINE|LIQUORS\b/.test(text) ||
    String(series || "").toUpperCase() === "3PS"
  ) return "Liquor Store";

  if (/MARINA/.test(text)) return "Marina";
  if (/HOTEL|MOTEL|RESORT|INN\b|BED\s*&\s*BREAKFAST|B\s*&\s*B\b/.test(text)) return "Hotel / Motel";
  if (/NIGHTCLUB|NIGHT CLUB|DANCE CLUB/.test(text)) return "Nightclub";
  if (/\bBAR\b|LOUNGE|\bPUB\b|SALOON|TAPROOM|TAP ROOM|COCKTAIL|BREWING|BREWERY|ALE HOUSE/.test(text)) return "Bar";
  if (/COUNTRY CLUB|GOLF/.test(text)) return "Country Club";
  if (/SFS|SRX/i.test(String(modifier || ""))) return "Restaurant";
  return "Other Hospitality";
}

function dedupeByLicense(rows) {
  const byLicense = new Map();
  for (const row of rows) {
    const key = String(row.licenseNumber || "").trim().toUpperCase();
    if (!key) continue;
    const existing = byLicense.get(key);
    if (!existing) {
      byLicense.set(key, row);
      continue;
    }
    const score = (item) => {
      let value = item.active ? 10 : 0;
      if (item.dba && item.dba !== "Not listed") value += 3;
      if (item.address) value += 2;
      if (item.licensee && item.licensee !== "Not listed") value += 1;
      return value;
    };
    if (score(row) > score(existing)) byLicense.set(key, row);
  }
  return [...byLicense.values()];
}

const response = await fetch(DBPR_URL, {
  headers: {
    "User-Agent": "Mozilla/5.0 FLLM-Market-Scope/1.0",
    Accept: "text/csv,*/*",
  },
});
if (!response.ok) throw new Error(`DBPR fetch failed: ${response.status}`);

const csv = await response.text();
const countyRowsRaw = [];
const cityRowsRaw = [];

for (const line of csv.split(/\n/)) {
  if (!line.trim()) continue;
  const row = parseCsvRow(line);
  if (row.length < 23) continue;

  const countyCode = String(row[19] || row[11] || "").trim();
  const licenseNumber = String(row[20] || "").trim().toUpperCase();
  if (countyCode !== "58" && !licenseNumber.startsWith("BEV58")) continue;

  const series = String(row[3] || "").trim().toUpperCase();
  const modifier = String(row[4] || "").trim().toUpperCase();
  const city = String(row[16] || "").trim();
  const secondaryStatus = String(row[22] || "").trim();

  const record = {
    licenseNumber,
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

  countyRowsRaw.push(record);
  if (/^ORLANDO$/i.test(city)) cityRowsRaw.push(record);
}

const countyRows = dedupeByLicense(countyRowsRaw);
const cityRows = dedupeByLicense(cityRowsRaw);

if (!countyRows.length || !cityRows.length) {
  throw new Error(`Orlando DBPR scope failed validation: county=${countyRows.length}, city=${cityRows.length}`);
}

const county4cop = countyRows.filter((r) => r.quotaClass === "4COP Quota");
const county3ps = countyRows.filter((r) => r.quotaClass === "3PS Quota");
const cityActive = cityRows.filter((r) => r.active);
const city4cop = cityActive.filter((r) => r.quotaClass === "4COP Quota");
const city3ps = cityActive.filter((r) => r.quotaClass === "3PS Quota");
const citySfs = cityActive.filter((r) => r.series === "4COP" && isSfs4cop(r.modifier));
const city2cop = cityActive.filter((r) => r.series === "2COP");

const snapshot = {
  source: "Florida DBPR / ABT retail license extract",
  generatedAt: new Date().toISOString(),
  county: "Orange County",
  city: "Orlando",
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
  countyInactiveEstablishments: countyRows
    .filter((r) => !r.active)
    .sort((a, b) => a.dba.localeCompare(b.dba)),
  cityQuotaEstablishments: [...city4cop, ...city3ps].sort((a, b) =>
    a.dba.localeCompare(b.dba),
  ),
};

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, JSON.stringify(snapshot, null, 2) + "\n");

console.log(JSON.stringify({
  countyTotalRetailLicenses: snapshot.countyTotalRetailLicenses,
  cityTotalRetailLicenses: snapshot.cityTotalRetailLicenses,
  city4copInUse: snapshot.city4copInUse,
  city3psInUse: snapshot.city3psInUse,
  citySfsInUse: snapshot.citySfsInUse,
  city2copInUse: snapshot.city2copInUse,
  inactiveCountyRecords: snapshot.countyInactiveEstablishments.length,
}, null, 2));
