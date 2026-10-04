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
  return saintAugustineDbprSnapshot as unknown as CityDbprMarketScope;
}
