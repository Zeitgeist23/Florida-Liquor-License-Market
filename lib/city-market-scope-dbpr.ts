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
  cityQuotaEstablishments: CityDbprLicenseRecord[];
};

export async function getSaintAugustineDbprMarketScope(): Promise<CityDbprMarketScope> {
  return saintAugustineDbprSnapshot as unknown as CityDbprMarketScope;
}
