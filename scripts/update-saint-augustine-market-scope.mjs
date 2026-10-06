import fs from "node:fs/promises";
import path from "node:path";

const DBPR_URL = "https://www2.myfloridalicense.com/sto/file_download/extracts/bd4006lic.csv";
const OUT = path.join(process.cwd(), "data/market-scope/saint-augustine-dbpr.json");

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

function normalize(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
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
    Accept: "text/csv,*/*",
  },
});
if (!response.ok) throw new Error(`DBPR fetch failed: ${response.status}`);

const csv = await response.text();

async function officialSaintAugustineLicenseNumbers() {
  const quarterUrls = [
    "https://www2.myfloridalicense.com/abt/documents/CityFeeDistribution1stQtr2025-2026.pdf",
    "https://www2.myfloridalicense.com/abt/documents/CityFeeDistribution2ndQtr2025-2026.pdf",
    "https://www2.myfloridalicense.com/abt/documents/CityFeeDistribution3rdQtr2025-2026.pdf",
    "https://www2.myfloridalicense.com/abt/documents/CityFeeDistribution4thQtr2025-2026.pdf",
  ];
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const { tmpdir } = await import("node:os");
  const execFileAsync = promisify(execFile);
  const ids = new Set();

  for (let i = 0; i < quarterUrls.length; i += 1) {
    const pdfPath = path.join(tmpdir(), `fllm-staug-q${i + 1}.pdf`);
    const txtPath = path.join(tmpdir(), `fllm-staug-q${i + 1}.txt`);
    const pdfResponse = await fetch(quarterUrls[i], {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36" },
    });
    if (!pdfResponse.ok) throw new Error(`City fee distribution fetch failed: ${pdfResponse.status}`);
    await fs.writeFile(pdfPath, Buffer.from(await pdfResponse.arrayBuffer()));
    await execFileAsync("pdftotext", ["-layout", pdfPath, txtPath]);
    const text = await fs.readFile(txtPath, "utf8");

    const starts = [];
    const marker = "City of St. Augustine";
    let from = 0;
    while (true) {
      const idx = text.indexOf(marker, from);
      if (idx < 0) break;
      starts.push(idx);
      from = idx + marker.length;
    }

    for (const start of starts) {
      const nextCity = text.indexOf("City/County Code:", start + marker.length);
      const segment = text.slice(start, nextCity > start ? nextCity : undefined);
      for (const match of segment.matchAll(/\b65\d{5}\b/g)) ids.add(match[0]);
    }
  }

  return ids;
}

const officialCityLicenseNumbers = await officialSaintAugustineLicenseNumbers();
const countyRows = [];
const cityRows = [];

for (const line of csv.split(/\n/)) {
  if (!line.trim()) continue;
  const row = parseCsvRow(line);
  if (row.length < 23) continue;
  const countyCode = String(row[19] || row[11] || "").trim();
  if (countyCode !== "65") continue;

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
  const bareLicenseNumber = record.licenseNumber.replace(/^BEV/i, "");
  if (officialCityLicenseNumbers.has(bareLicenseNumber)) cityRows.push(record);
}

const county4cop = countyRows.filter((r) => r.quotaClass === "4COP Quota");
const county3ps = countyRows.filter((r) => r.quotaClass === "3PS Quota");
const city4cop = cityRows.filter((r) => r.quotaClass === "4COP Quota" && r.active);
const city3ps = cityRows.filter((r) => r.quotaClass === "3PS Quota" && r.active);
const citySfs = cityRows.filter((r) => r.series.toUpperCase() === "4COP" && isSfs4cop(r.modifier) && r.active);
const city2cop = cityRows.filter((r) => r.series.toUpperCase() === "2COP" && r.active);

const snapshot = {
  source: "Florida DBPR / ABT retail license extract + City of St. Augustine fee-distribution code 795",
  generatedAt: new Date().toISOString(),
  county: "St. Johns County",
  city: "Saint Augustine",
  countyTotalRetailLicenses: countyRows.length,
  cityTotalRetailLicenses: cityRows.filter((r) => r.active).length,
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
  cityEstablishments: cityRows
    .sort((a, b) => a.dba.localeCompare(b.dba)),
  countyInactiveEstablishments: countyRows
    .filter((r) => !r.active)
    .sort((a, b) => a.dba.localeCompare(b.dba)),
  cityQuotaEstablishments: cityRows
    .filter((r) => r.quotaClass === "4COP Quota" || r.quotaClass === "3PS Quota")
    .sort((a, b) => a.dba.localeCompare(b.dba)),
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
  cityEstablishments: snapshot.cityEstablishments.length,
  cityQuotaEstablishments: snapshot.cityQuotaEstablishments.length,
}, null, 2));
