import "server-only";
import saintAugustineDbprSnapshot from "@/data/market-scope/saint-augustine-dbpr.json";

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
  cityEstablishments?: CityDbprLicenseRecord[];
  countyInactiveEstablishments?: CityDbprLicenseRecord[];
  cityQuotaEstablishments: CityDbprLicenseRecord[];
};

export async function getSaintAugustineDbprMarketScope(): Promise<CityDbprMarketScope> {
  const snapshot = saintAugustineDbprSnapshot as typeof saintAugustineDbprSnapshot & {
    generatedAt?: string;
  };
  const base = snapshot as unknown as CityDbprMarketScope;

  const recategorize = (rows: CityDbprLicenseRecord[] = []) =>
    rows.map((row) => ({
      ...row,
      category: categoryFor(row.dba, row.series, row.modifier),
    }));

  return {
    ...base,
    available: true,
    fetchedAt: snapshot.generatedAt ?? null,
    cityEstablishments: recategorize(base.cityEstablishments ?? []),
    countyInactiveEstablishments: recategorize(base.countyInactiveEstablishments ?? []),
    cityQuotaEstablishments: recategorize(base.cityQuotaEstablishments ?? []),
  };
}

const DBPR_RETAIL_EXTRACT =
  "https://www2.myfloridalicense.com/sto/file_download/extracts/bd4006lic.csv";

function parseCsvRow(line: string) {
  const cells: string[] = [];
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

function isSpecial4cop(modifier: string) {
  return modifier.trim().length > 0;
}

function isSfs4cop(modifier: string) {
  return /^(SFS|SRX)$/i.test(modifier.trim());
}

function quotaClass(series: string, modifier: string): CityDbprLicenseRecord["quotaClass"] {
  const normalizedSeries = series.trim().toUpperCase();
  if (normalizedSeries === "4COP" && !isSpecial4cop(modifier)) return "4COP Quota";
  if (normalizedSeries === "3PS") return "3PS Quota";
  return null;
}

function categoryFor(dba: string, series: string, modifier: string) {
  const text = dba.toUpperCase().replace(/[’']/g, "");

  if (
    /LIQUOR|SPIRITS|PACKAGE|BOTTLE SHOP|WINE\s*&\s*SPIRITS|FINE WINE|LIQUORS\b/.test(text) ||
    series === "3PS"
  ) return "Liquor Store";

  if (/MARINA/.test(text)) return "Marina";
  if (/HOTEL|MOTEL|RESORT|INN\b|BED\s*&\s*BREAKFAST|B\s*&\s*B\b/.test(text)) return "Hotel / Motel";
  if (/NIGHTCLUB|NIGHT CLUB|DANCE CLUB/.test(text)) return "Nightclub";

  if (
    /\bBAR\b|LOUNGE|TAVERN|\bPUB\b|PUBLIC HOUSE|SALOON|TAPROOM|TAP ROOM|COCKTAIL|BREWING|BREWERY|ALE HOUSE|SPORTS BAR/.test(text)
  ) return "Bar";

  if (
    /RESTAURANT|GRILL|CAFE|COFFEE|KITCHEN|DINER|BISTRO|STEAK|SEAFOOD|PIZZA|PIZZERIA|TACO|BURRITO|SUSHI|DELI|EATERY|BRUNCH|BAKERY|BBQ|BAR B QUE|BAR-B-QUE|THAI|MEXICAN|ITALIAN|RAMEN|NOODLE|CHICKEN|WINGS|SANDWICH|FOOD|DINING|CUISINE|KABOB|KEBAB|HIBACHI|TERIYAKI|DONUT|ICE CREAM|CREAMERY/.test(text)
  ) return "Restaurant";

  if (/COUNTRY CLUB|GOLF/.test(text)) return "Country Club";
  if (/SFS|SRX/i.test(modifier)) return "Restaurant";
  return "Other Hospitality";
}

function unavailableScope(): CityDbprMarketScope {
  return {
    available: false,
    fetchedAt: null,
    countyTotalRetailLicenses: null,
    cityTotalRetailLicenses: null,
    county4copInEffect: null,
    county4copInUse: null,
    county4copInactive: null,
    county3psInEffect: null,
    county3psInUse: null,
    county3psInactive: null,
    city4copInUse: null,
    city3psInUse: null,
    citySfsInUse: null,
    city2copInUse: null,
    cityEstablishments: [],
    cityQuotaEstablishments: [],
  };
}

export async function getTampaDbprMarketScope(): Promise<CityDbprMarketScope> {
  try {
    const response = await fetch(DBPR_RETAIL_EXTRACT, {
      headers: {
        "User-Agent": "Mozilla/5.0 FLLM-Market-Scope/1.0",
        Accept: "text/csv,*/*",
      },
      next: { revalidate: 86_400 },
    });
    if (!response.ok) return unavailableScope();

    const csv = await response.text();
    const countyRows: CityDbprLicenseRecord[] = [];
    const cityRows: CityDbprLicenseRecord[] = [];

    for (const line of csv.split(/\n/)) {
      if (!line.trim()) continue;
      const row = parseCsvRow(line);
      if (row.length < 23) continue;

      const countyCode = String(row[19] || row[11] || "").trim();
      if (countyCode !== "39") continue;

      const series = String(row[3] || "").trim().toUpperCase();
      const modifier = String(row[4] || "").trim().toUpperCase();
      const city = String(row[16] || "").trim();
      const secondaryStatus = String(row[22] || "").trim();
      const record: CityDbprLicenseRecord = {
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

    const county4cop = countyRows.filter((record) => record.quotaClass === "4COP Quota");
    const county3ps = countyRows.filter((record) => record.quotaClass === "3PS Quota");
    const cityActive = cityRows.filter((record) => record.active);
    const city4cop = cityActive.filter((record) => record.quotaClass === "4COP Quota");
    const city3ps = cityActive.filter((record) => record.quotaClass === "3PS Quota");
    const citySfs = cityActive.filter(
      (record) => record.series === "4COP" && isSfs4cop(record.modifier),
    );
    const city2cop = cityActive.filter((record) => record.series === "2COP");

    return {
      available: true,
      fetchedAt: new Date().toISOString(),
      countyTotalRetailLicenses: countyRows.length,
      cityTotalRetailLicenses: cityActive.length,
      county4copInEffect: county4cop.length,
      county4copInUse: county4cop.filter((record) => record.active).length,
      county4copInactive: county4cop.filter((record) => !record.active).length,
      county3psInEffect: county3ps.length,
      county3psInUse: county3ps.filter((record) => record.active).length,
      county3psInactive: county3ps.filter((record) => !record.active).length,
      city4copInUse: city4cop.length,
      city3psInUse: city3ps.length,
      citySfsInUse: citySfs.length,
      city2copInUse: city2cop.length,
      cityEstablishments: cityActive.sort((a, b) => a.dba.localeCompare(b.dba)),
      cityQuotaEstablishments: [...city4cop, ...city3ps].sort((a, b) =>
        a.dba.localeCompare(b.dba),
      ),
    };
  } catch {
    return unavailableScope();
  }
}
