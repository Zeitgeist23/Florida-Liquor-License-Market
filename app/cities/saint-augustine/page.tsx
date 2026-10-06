import type { Metadata } from "next";
import CityMarketScope from "@/components/CityMarketScope";
import CityMarketPageShell from "@/components/CityMarketPageShell";
import CityMarketOverviewMaps from "@/components/CityMarketOverviewMaps";
import { getSaintAugustineDbprMarketScope } from "@/lib/city-market-scope-dbpr";
import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import { countyPopulations2024 } from "@/data/county-populations-2024";
import {
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "../../fllm-official-template.css";
import "../city-page-standard.css";
import "../city-market-overview.css";
import "../city-market-scope.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/cities/saint-augustine`;

export const metadata: Metadata = {
  title: "Saint Augustine Liquor License Market Data | St. Johns County | FLLM",
  description:
    "Saint Augustine liquor-license market data for St. Johns County, Florida.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[midpoint]
    : Math.round((sorted[midpoint - 1] + sorted[midpoint]) / 2);
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SaintAugustineCityPage() {
  const [allStandalone, dbprMarketScope] = await Promise.all([
    getMarketplaceListings().then(getVisibleAvailableMarketplaceListings),
    getSaintAugustineDbprMarketScope(),
  ]);
  const standalone = allStandalone.filter((listing) => listing.county === "St. Johns County");

  const allBusinesses = [
    ...businessQuotaListings,
    ...businessSfsListings,
    ...business2copListings,
  ];

  const standalonePrices = standalone
    .map((listing) => listing.price)
    .filter((price): price is number => typeof price === "number" && Number.isFinite(price));

  const standalone4copListings = standalone.filter((listing) => listing.type === "4COP Quota");
  const standalone3psListings = standalone.filter((listing) => listing.type === "3PS Quota / Package Store");
  const standalone4copPrices = standalone4copListings
    .map((listing) => listing.price)
    .filter((price): price is number => typeof price === "number" && Number.isFinite(price));
  const standalone3psPrices = standalone3psListings
    .map((listing) => listing.price)
    .filter((price): price is number => typeof price === "number" && Number.isFinite(price));
  const standalone4copMedian = median(standalone4copPrices);
  const standalone3psMedianDirect = median(standalone3psPrices);
  const standalone3psMedianEstimate =
    standalone3psMedianDirect ??
    (standalone4copMedian === null ? null : Math.round(standalone4copMedian * 0.985));

  const businessInventory = allBusinesses
    .filter((listing) => listing.county === "St. Johns County")
    .filter((listing) =>
      /\b(?:st\.?|saint)\s+augustine\b/i.test(`${listing.title} ${listing.businessType}`),
    )
    .map((listing) => ({
      title: listing.title,
      category: listing.businessCategory,
      licenseType: listing.licenseType,
      price: listing.packagePrice,
      href: listing.marketViewHref || listing.href,
    }));

  const drawing2026 =
    QUOTA_DRAWING_2026.counties.find((item) => item.county === "St. Johns")?.licenses ?? 0;

  // BEBR 2024 projection series: 337,375 (2025) to 385,504 (2030).
  const bebr2025 = 337_375;
  const bebr2030 = 385_504;
  const growthRate = ((bebr2030 / bebr2025) - 1) * 100;
  const annualGrowthFactor = Math.pow(bebr2030 / bebr2025, 1 / 5);
  const projected2027Population = Math.round(bebr2025 * Math.pow(annualGrowthFactor, 2));
  const forecast2027 = Math.max(1, Math.round((projected2027Population - bebr2025) / 7_500));

  return (
    <CityMarketPageShell
      city="Saint Augustine"
      heroTitle={
        <>
          Saint Augustine
          <br />
          Liquor License Market Data
        </>
      }
      heroDescription={
        <p>
          Explore current liquor-license market activity in Saint Augustine and St. Johns County, including standalone liquor licenses for sale, businesses + liquor licenses for sale, and local pricing context.
        </p>
      }
      heroBullets={[
        "Standalone liquor licenses for sale.",
        "Businesses + liquor licenses for sale.",
        "St. Johns County liquor-license pricing and market data."
      ]}
      heroImage="https://upload.wikimedia.org/wikipedia/commons/4/4a/The_Flagler_College.jpg"
      heroImagePosition="58% 50%"
      cityMark="Saint Augustine"
      cityMarkTagline="Florida · America’s Oldest City"
    >
      <CityMarketOverviewMaps
        standalone={allStandalone}
        businesses={allBusinesses}
        county="St. Johns County"
      />

      <CityMarketScope
        city="Saint Augustine"
        county="St. Johns County"
        countyPopulation={countyPopulations2024["St. Johns County"]}
        cityPopulation={16_141}
        cityPopulationYear={2025}
        projectedGrowthRate={growthRate}
        projected2027Population={projected2027Population}
        lottery2026={drawing2026}
        lotteryVerified={QUOTA_DRAWING_2026.lastVerified}
        forecast2027={forecast2027}
        standaloneCount={standalone.length}
        standalone4cop={standalone4copListings.length}
        standalone3ps={standalone3psListings.length}
        standalone4copMedian={standalone4copMedian}
        standalone3psMedian={standalone3psMedianEstimate}
        standalone3psMedianIsProxy={standalone3psMedianDirect === null && standalone3psMedianEstimate !== null}
        standaloneLow={standalonePrices.length ? Math.min(...standalonePrices) : null}
        standaloneMedian={median(standalonePrices)}
        standaloneHigh={standalonePrices.length ? Math.max(...standalonePrices) : null}
        marketBusinesses={businessInventory}
        dbpr={dbprMarketScope}
      />
    </CityMarketPageShell>
  );
}
