import "server-only";

import { unstable_cache } from "next/cache";
import {
  DBPR_RETAIL_LICENSE_CSV,
  dbprCountyNames,
  parseDbprCsvRow,
} from "@/lib/license-fee-lookup";

const QUOTA_SERIES = new Set(["4COP", "5COP", "6COP", "7COP", "8COP"]);
const ACTIVE_OR_TEMPORARY_PRIMARY_STATUSES = new Set(["20", "21", "30", "31", "32"]);

export type CountyQuotaInventory = {
  countyCode: string;
  county: string;
  series: string[];
  seriesBreakdown: Record<string, number>;
  fourCopQuotaRecords: number;
  activeOrTemporary: number;
  escrow: number;
  delinquent: number;
  restrictedOrPending: number;
  totalIssued: number;
  dbprDataUpdatedAt: string;
  calculatedAt: string;
};

export type FloridaQuotaInventory = {
  source: "Florida DBPR Division of Alcoholic Beverages and Tobacco";
  sourceUrl: string;
  methodology: string;
  dbprDataUpdatedAt: string;
  calculatedAt: string;
  counties: CountyQuotaInventory[];
};

type MutableCountyInventory = Omit<CountyQuotaInventory, "series"> & {
  seriesCounts: Map<string, number>;
};

function emptyCountyInventory(
  countyCode: string,
  county: string,
  dbprDataUpdatedAt: string,
  calculatedAt: string,
): MutableCountyInventory {
  return {
    countyCode,
    county,
    seriesCounts: new Map<string, number>(),
    seriesBreakdown: {},
    fourCopQuotaRecords: 0,
    activeOrTemporary: 0,
    escrow: 0,
    delinquent: 0,
    restrictedOrPending: 0,
    totalIssued: 0,
    dbprDataUpdatedAt,
    calculatedAt,
  };
}

function isQuotaFullLiquorRecord(series: string, modifier: string) {
  // In DBPR's retail extract the population-quota COP rows have a blank
  // modifier. Specialty 4COP classes (SFS, S, SBX, etc.) are excluded.
  return QUOTA_SERIES.has(series) && (modifier === "" || modifier === "QUOTA");
}

export function calculateQuotaInventory(
  csv: string,
  dbprDataUpdatedAt = new Date().toISOString(),
  calculatedAt = new Date().toISOString(),
): FloridaQuotaInventory {
  const inventoryByCode = new Map<string, MutableCountyInventory>(
    Object.entries(dbprCountyNames).map(([countyCode, county]) => [
      countyCode,
      emptyCountyInventory(countyCode, county, dbprDataUpdatedAt, calculatedAt),
    ]),
  );
  const countedLicenses = new Set<string>();

  for (const line of csv.split(/\n/).slice(1)) {
    if (!line.includes("COP")) continue;
    const row = parseDbprCsvRow(line);
    const series = row[3]?.trim().toUpperCase() ?? "";
    const modifier = row[4]?.trim().toUpperCase() ?? "";
    if (!isQuotaFullLiquorRecord(series, modifier)) continue;

    const countyCode = row[19]?.trim() || row[11]?.trim() || "";
    const licenseNumber = row[20]?.trim().toUpperCase() || "";
    const inventory = inventoryByCode.get(countyCode);
    if (!inventory || !licenseNumber) continue;

    const uniqueKey = `${countyCode}:${licenseNumber}`;
    if (countedLicenses.has(uniqueKey)) continue;
    countedLicenses.add(uniqueKey);

    const primaryStatus = row[21]?.trim() ?? "";
    const secondaryStatus = row[22]?.trim() ?? "";
    inventory.totalIssued += 1;
    inventory.seriesCounts.set(series, (inventory.seriesCounts.get(series) ?? 0) + 1);
    if (series === "4COP") inventory.fourCopQuotaRecords += 1;

    if (primaryStatus === "41") inventory.escrow += 1;
    else if (primaryStatus === "45") inventory.delinquent += 1;
    else if (ACTIVE_OR_TEMPORARY_PRIMARY_STATUSES.has(primaryStatus) && secondaryStatus === "20") {
      inventory.activeOrTemporary += 1;
    } else {
      inventory.restrictedOrPending += 1;
    }
  }

  const counties = Array.from(inventoryByCode.values())
    .map(({ seriesCounts, ...inventory }) => {
      const seriesBreakdown = Object.fromEntries(
        Array.from(seriesCounts.entries()).sort(([left], [right]) => left.localeCompare(right)),
      );
      return {
        ...inventory,
        series: Object.keys(seriesBreakdown),
        seriesBreakdown,
      } satisfies CountyQuotaInventory;
    })
    .sort((left, right) => left.county.localeCompare(right.county));

  return {
    source: "Florida DBPR Division of Alcoholic Beverages and Tobacco",
    sourceUrl: DBPR_RETAIL_LICENSE_CSV,
    methodology:
      "Distinct DBPR retail-license records in series 4COP through 8COP with the population-quota modifier. Specialty-license modifiers are excluded; DBPR's retail extract excludes null-and-void, revoked and transferred records.",
    dbprDataUpdatedAt,
    calculatedAt,
    counties,
  };
}

async function loadFloridaQuotaInventory() {
  const response = await fetch(DBPR_RETAIL_LICENSE_CSV, {
    cache: "no-store",
    headers: { Accept: "text/csv", "User-Agent": "FloridaLiquorLicenseMarket/1.0" },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`DBPR retail-license data returned ${response.status}.`);

  const calculatedAt = new Date().toISOString();
  const lastModified = response.headers.get("last-modified");
  const dbprDataUpdatedAt = lastModified
    ? new Date(lastModified).toISOString()
    : calculatedAt;
  return calculateQuotaInventory(await response.text(), dbprDataUpdatedAt, calculatedAt);
}

export const getFloridaQuotaInventory = unstable_cache(
  loadFloridaQuotaInventory,
  ["florida-dbpr-quota-license-inventory-v1"],
  { revalidate: 60 * 60 * 12, tags: ["florida-dbpr-quota-license-inventory"] },
);

export async function getCountyQuotaInventory(countyName: string) {
  const normalizedCounty = countyName.replace(/\s+County$/i, "").trim().toLowerCase();
  const inventory = await getFloridaQuotaInventory();
  return inventory.counties.find((county) => county.county.toLowerCase() === normalizedCounty) ?? null;
}
