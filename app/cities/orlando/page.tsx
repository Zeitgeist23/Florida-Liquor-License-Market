import type { Metadata } from "next";
import CityMarketPageShell from "@/components/CityMarketPageShell";
import CityMarketScope from "@/components/CityMarketScope";
import CityMarketOverviewMaps from "@/components/CityMarketOverviewMaps";
import { getOrlandoDbprMarketScope } from "@/lib/city-market-scope-dbpr";
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
const canonicalUrl = `${siteUrl}/cities/orlando`;

export const metadata: Metadata = {
  title: "Orlando Liquor License Market Data | Orange County | FLLM",
  description:
    "Orlando liquor-license market data for Orange County, including 4COP and 3PS quota licenses, 4COP SFS/SRX and 2COP operating establishments, business opportunities, and current asking-price context.",
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

export default async function OrlandoCityPage() {
  const [allStandalone, dbprMarketScope] = await Promise.all([
    getMarketplaceListings().then(getVisibleAvailableMarketplaceListings),
    getOrlandoDbprMarketScope(),
  ]);

  const standalone = allStandalone.filter(
    (listing) => listing.county === "Orange County",
  );

  const allBusinesses = [
    ...businessQuotaListings,
    ...businessSfsListings,
    ...business2copListings,
  ];

  const standalonePrices = standalone
    .map((listing) => listing.price)
    .filter((price): price is number => typeof price === "number" && Number.isFinite(price));

  const standalone4copListings = standalone.filter(
    (listing) => listing.type === "4COP Quota",
  );
  const standalone3psListings = standalone.filter(
    (listing) => listing.type === "3PS Quota / Package Store",
  );

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
    .filter((listing) => listing.county === "Orange County")
    .map((listing) => ({
      title: listing.title,
      category: listing.businessCategory,
      licenseType: listing.licenseType,
      price: listing.packagePrice,
      href: listing.marketViewHref || listing.href,
    }));

  const drawing2026 =
    QUOTA_DRAWING_2026.counties.find((item) => item.county === "Orange")?.licenses ?? 0;

  // BEBR 2026 medium projection: Orange County 1,536,045 (2025) to 1,652,800 (2030).
  const bebr2025 = 1_536_045;
  const bebr2030 = 1_652_800;
  const growthRate = ((bebr2030 / bebr2025) - 1) * 100;
  const annualGrowthFactor = Math.pow(bebr2030 / bebr2025, 1 / 5);
  const projected2027Population = Math.round(
    bebr2025 * Math.pow(annualGrowthFactor, 2),
  );
  const forecast2027 = Math.max(
    1,
    Math.round((projected2027Population - bebr2025) / 7_500),
  );

  return (
    <CityMarketPageShell
      city="Orlando"
      heroTitle={
        <>
          Orlando
          <br />
          Liquor License Market Data
        </>
      }
      heroDescription={
        <p>
          Explore current liquor-license market activity in Orlando and Orange County,
          including standalone quota licenses, restaurants and nightlife businesses with
          liquor licenses, operating establishments, and local asking-price context.
        </p>
      }
      heroBullets={[
        "Orlando restaurants, bars and nightlife businesses with liquor licenses.",
        "Standalone Orange County 4COP and 3PS quota liquor licenses for sale.",
        "Orange County liquor-license pricing, operating-license and growth context.",
      ]}
      heroImage="https://commons.wikimedia.org/wiki/Special:FilePath/Cinderella_castle_day.jpg"
      heroImagePosition="67% 48%"
      cityMark="Orlando"
      cityMarkTagline="Florida · Central Florida"
      heroImageCredit="Cinderella Castle by day · SteamFan / CC BY 2.5"
      heroImageCreditHref="https://commons.wikimedia.org/wiki/File:Cinderella_castle_day.jpg"
    >
      <CityMarketOverviewMaps
        standalone={allStandalone}
        businesses={allBusinesses}
        city="Orlando"
        county="Orange County"
        markerX={372}
        markerY={119}
      />

      <CityMarketScope
        city="Orlando"
        county="Orange County"
        countyPopulation={countyPopulations2024["Orange County"]}
        cityPopulation={333_888}
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
        standalone3psMedianIsProxy={
          standalone3psMedianDirect === null && standalone3psMedianEstimate !== null
        }
        standaloneLow={standalonePrices.length ? Math.min(...standalonePrices) : null}
        standaloneMedian={median(standalonePrices)}
        standaloneHigh={standalonePrices.length ? Math.max(...standalonePrices) : null}
        marketBusinesses={businessInventory}
        dbpr={dbprMarketScope}
      />
    </CityMarketPageShell>
  );
}
