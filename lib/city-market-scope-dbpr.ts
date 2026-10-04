import "server-only";
import saintAugustineDbprSnapshot from "@/data/market-scope/saint-augustine-dbpr.json";

const DBPR_RETAIL_LICENSE_CSV =
  "https://www2.myfloridalicense.com/sto/file_download/extracts/bd4006lic.csv";

export type CityDbprLicenseRecord = {
  licenseNumber: string;
  dba: string;
  licensee: string;
  series: string;
  modifier: string;
  city: string;
  address: string;
  zip: string;
  primaryStatus: string;
  secondaryStatus: string;
  active: boolean;
  quotaClass: "4COP Quota" | "3PS Quota" | null;
  category: string;
};

export type CityDbprMarketScope = {
  available: boolean;
  fetchedAt: string | null;
  countyTotalRetailLicenses: number | null;
  cityTotalRetailLicenses: number | null;
  county4copInEffect: number | null;
  county4copInUse: number | null;
  county4copInactive: number | null;
  county3psInEffect: number | null;
  county3psInUse: number | null;
  county3psInactive: number | null;
  city4copInUse: number | null;
  city3psInUse: number | null;
  citySfsInUse: number | null;
  city2copInUse: number | null;
  cityQuotaEstablishments: CityDbprLicenseRecord[];
};


const ST_JOHNS_VERIFIED_QUOTA_FALLBACK =
  saintAugustineDbprSnapshot as unknown as CityDbprMarketScope;

function parseCsvRow(line: string) {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell.replace(/\r$/, ""));
  return cells;
}

function normalize(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function isSaintAugustine(value: string) {
  const normalized = normalize(value);
  return normalized === "SAINTAUGUSTINE" || normalized === "STAUGUSTINE";
}

function isSpecial4CopModifier(modifier: string) {
  return /(SFS|SRX|SPECIAL|HOTEL|MOTEL|CLUB|GOLF|AIRPORT|THEME|CATER|CIVIC|PERFORM|BOWLING|RACE|VESSEL)/i.test(modifier);
}

function quotaClass(seriesValue: string, modifierValue: string) {
  const series = seriesValue.trim().toUpperCase();
  if (series === "4COP" && !isSpecial4CopModifier(modifierValue)) return "4COP Quota" as const;
  if (series === "3PS") return "3PS Quota" as const;
  return null;
}

function categoryFor(dba: string, series: string, modifier: string) {
  const text = dba.toUpperCase();
  if (/LIQUOR|SPIRITS|PACKAGE|BOTTLE SHOP|WINE & SPIRITS/.test(text) || series === "3PS") return "Liquor Store";
  if (/MARINA/.test(text)) return "Marina";
  if (/HOTEL|MOTEL|RESORT|INN\b/.test(text)) return "Hotel / Motel";
  if (/NIGHTCLUB|NIGHT CLUB|CLUB/.test(text) && !/COUNTRY CLUB/.test(text)) return "Nightclub";
  if (/LOUNGE|TAVERN|PUB|SALOON|BAR\b/.test(text)) return "Bar";
  if (/RESTAURANT|GRILL|CAFE|KITCHEN|DINER|BISTRO|STEAK|SEAFOOD|PIZZA/.test(text)) return "Restaurant";
  if (/COUNTRY CLUB|GOLF/.test(text)) return "Country Club";
  if (/SFS|SRX/i.test(modifier)) return "Restaurant";
  return "Other Hospitality";
}

export async function getSaintAugustineDbprMarketScope(): Promise<CityDbprMarketScope> {
  try {
    const response = await fetch(DBPR_RETAIL_LICENSE_CSV, {
      next: { revalidate: 60 * 60 * 6 },
      headers: { "User-Agent": "FloridaLiquorLicenseMarket/1.0" },
    });

    if (!response.ok) throw new Error("DBPR retail extract unavailable");
    const csv = await response.text();
    const lines = csv.split(/\n/).filter(Boolean);

    const countyRows: CityDbprLicenseRecord[] = [];
    const cityRows: CityDbprLicenseRecord[] = [];

    for (const line of lines) {
      const row = parseCsvRow(line);
      if (row.length < 23) continue;
      const countyCode = (row[19] || row[11] || "").trim();
      if (countyCode !== "65") continue;

      const series = (row[3] || "").trim();
      const modifier = (row[4] || "").trim();
      const city = (row[16] || "").trim();
      const secondary = (row[22] || "").trim();
      const record: CityDbprLicenseRecord = {
        licenseNumber: (row[20] || "").trim(),
        licensee: (row[2] || "").trim() || "Not listed",
        dba: (row[12] || "").trim() || "Not listed",
        series,
        modifier,
        city,
        address: [row[13], row[14], row[15]].filter(Boolean).join(" ").trim(),
        zip: (row[18] || "").trim(),
        primaryStatus: (row[21] || "").trim(),
        secondaryStatus: secondary,
        active: secondary === "20",
        quotaClass: quotaClass(series, modifier),
        category: categoryFor((row[12] || "").trim(), series, modifier),
      };
      countyRows.push(record);
      if (isSaintAugustine(city)) cityRows.push(record);
    }

    const county4cop = countyRows.filter((row) => row.quotaClass === "4COP Quota");
    const county3ps = countyRows.filter((row) => row.quotaClass === "3PS Quota");
    const city4cop = cityRows.filter((row) => row.quotaClass === "4COP Quota" && row.active);
    const city3ps = cityRows.filter((row) => row.quotaClass === "3PS Quota" && row.active);
    const citySfs = cityRows.filter(
      (row) => row.series.toUpperCase() === "4COP" && isSpecial4CopModifier(row.modifier) && row.active,
    );
    const city2cop = cityRows.filter((row) => row.series.toUpperCase() === "2COP" && row.active);

    return {
      available: true,
      fetchedAt: new Date().toISOString(),
      countyTotalRetailLicenses: countyRows.length,
      cityTotalRetailLicenses: cityRows.filter((row) => row.active).length,
      county4copInEffect: county4cop.length,
      county4copInUse: county4cop.filter((row) => row.active).length,
      county4copInactive: county4cop.filter((row) => !row.active).length,
      county3psInEffect: county3ps.length,
      county3psInUse: county3ps.filter((row) => row.active).length,
      county3psInactive: county3ps.filter((row) => !row.active).length,
      city4copInUse: city4cop.length,
      city3psInUse: city3ps.length,
      citySfsInUse: citySfs.length,
      city2copInUse: city2cop.length,
      cityQuotaEstablishments: [...city4cop, ...city3ps]
        .sort((a, b) => a.dba.localeCompare(b.dba)),
    };
  } catch {
    return ST_JOHNS_VERIFIED_QUOTA_FALLBACK;
  }
}
