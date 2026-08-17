import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const DATA_PATH = path.resolve("data/quota-drawing-current.json");
const DBPR_HOME = "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/";

const FLORIDA_COUNTIES = [
  "Alachua", "Baker", "Bay", "Bradford", "Brevard", "Broward", "Calhoun", "Charlotte",
  "Citrus", "Clay", "Collier", "Columbia", "Dade", "DeSoto", "Dixie", "Duval", "Escambia",
  "Flagler", "Franklin", "Gadsden", "Gilchrist", "Glades", "Gulf", "Hamilton", "Hardee", "Hendry",
  "Hernando", "Highlands", "Hillsborough", "Holmes", "Indian River", "Jackson", "Jefferson", "Lafayette",
  "Lake", "Lee", "Leon", "Levy", "Liberty", "Madison", "Manatee", "Marion", "Martin", "Monroe", "Nassau",
  "Okaloosa", "Okeechobee", "Orange", "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam",
  "Santa Rosa", "Sarasota", "Seminole", "St. Johns", "St. Lucie", "Sumter", "Suwannee", "Taylor", "Union",
  "Volusia", "Wakulla", "Walton", "Washington",
];

function regexEscape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countyPattern(county) {
  return regexEscape(county)
    .replace(/St\\\. /g, "St\\.?\\s+")
    .replace(/\\ /g, "\\s+");
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

async function fetchRequired(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "FloridaLiquorLicenseMarket/1.0" },
  });
  if (!response.ok) throw new Error(`DBPR request failed (${response.status}) for ${url}`);
  return response;
}

function discoverNoticeUrl(html, fallback) {
  const match = html.match(/href=["']([^"']*QuotaEntryPeriodAnnouncement\.pdf[^"']*)["']/i);
  if (!match) return fallback;
  return new URL(match[1].replace(/&amp;/g, "&"), DBPR_HOME).toString();
}

function extractDates(flatText, existing) {
  const matches = [...flatText.matchAll(/([A-Z][a-z]+\s+\d{1,2},\s+\d{4})\s+at\s+(\d{1,2}:\d{2}\s*[AP]\.?(?:\s*)M\.?)\s+EST/gi)];
  if (matches.length < 2) {
    return { entryOpens: existing.entryOpens, entryCloses: existing.entryCloses };
  }
  const cleanTime = (value) => value.replace(/\s+/g, " ").replace(/A\.\s*M\./i, "A.M.").replace(/P\.\s*M\./i, "P.M.");
  return {
    entryOpens: `${matches[0][1]} at ${cleanTime(matches[0][2])} EST`,
    entryCloses: `${matches[1][1]} at ${cleanTime(matches[1][2])} EST`,
  };
}

function parseNotice(text, existing, sourceNoticeUrl) {
  const flat = text.replace(/\s+/g, " ").trim();
  const totalMatch = flat.match(/(?:there\s+are\s+)?(\d+)\s+quota beverage licenses?\s+(?:are\s+)?available\s+in\s+(\d+)\s+counties/i);
  if (!totalMatch) throw new Error("Could not find DBPR's total license/county statement in the quota notice.");

  const totalLicenses = Number(totalMatch[1]);
  const totalCounties = Number(totalMatch[2]);
  const feeMatch = flat.match(/non-refundable\s+(?:drawing\s+)?entry fee(?:\s+of)?\s+\$\s*(\d+)/i)
    || flat.match(/\$\s*(\d+)\s+non-refundable\s+(?:drawing\s+)?entry fee/i);
  const entryFee = feeMatch ? Number(feeMatch[1]) : existing.entryFee;

  const counties = [];
  for (const county of FLORIDA_COUNTIES) {
    const pattern = new RegExp(`\\b${countyPattern(county)}\\s+(\\d{1,2})\\b`, "i");
    const match = flat.match(pattern);
    if (!match) continue;
    const licenses = Number(match[1]);
    if (licenses > 0 && licenses <= 20) counties.push({ county, licenses });
  }

  const sum = counties.reduce((total, item) => total + item.licenses, 0);
  if (counties.length !== totalCounties || sum !== totalLicenses) {
    throw new Error(
      `DBPR quota parse validation failed: parsed ${counties.length} counties / ${sum} licenses, notice states ${totalCounties} counties / ${totalLicenses} licenses.`
    );
  }

  const dates = extractDates(flat, existing);
  const yearMatch = sourceNoticeUrl.match(/ABT(20\d{2})Quota/i);
  const year = yearMatch ? Number(yearMatch[1]) : Number(dates.entryOpens.match(/20\d{2}/)?.[0] || existing.year);

  return {
    year,
    ...dates,
    totalLicenses,
    totalCounties,
    entryFee,
    lastVerified: formatDate(new Date()),
    sourceNoticeUrl,
    counties,
  };
}

async function main() {
  const existing = JSON.parse(readFileSync(DATA_PATH, "utf8"));
  const homeResponse = await fetchRequired(DBPR_HOME);
  const html = await homeResponse.text();
  const sourceNoticeUrl = discoverNoticeUrl(html, existing.sourceNoticeUrl);

  const pdfResponse = await fetchRequired(sourceNoticeUrl);
  const pdfBytes = new Uint8Array(await pdfResponse.arrayBuffer());
  const tempDirectory = mkdtempSync(path.join(tmpdir(), "fllm-quota-"));
  const pdfPath = path.join(tempDirectory, "quota.pdf");
  const textPath = path.join(tempDirectory, "quota.txt");

  try {
    writeFileSync(pdfPath, pdfBytes);
    execFileSync("pdftotext", ["-layout", pdfPath, textPath], { stdio: "inherit" });
    const text = readFileSync(textPath, "utf8");
    const parsed = parseNotice(text, existing, sourceNoticeUrl);
    writeFileSync(DATA_PATH, `${JSON.stringify(parsed, null, 2)}\n`);
    console.log(`Validated DBPR ${parsed.year} quota drawing: ${parsed.totalLicenses} licenses in ${parsed.totalCounties} counties.`);
  } finally {
    rmSync(tempDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
