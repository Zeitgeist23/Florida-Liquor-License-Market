import type { Metadata } from "next";
import CityMarketPageShell from "@/components/CityMarketPageShell";
import CityMarketScope from "@/components/CityMarketScope";
import CityMarketOverviewMaps from "@/components/CityMarketOverviewMaps";
import { getMiamiDbprMarketScope } from "@/lib/city-market-scope-dbpr";
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
const canonicalUrl = `${siteUrl}/cities/miami`;

export const metadata: Metadata = {
  title: "Miami Liquor License Market Data | Miami-Dade County | FLLM",
  description:
    "Miami liquor-license market data for Miami-Dade County, including 4COP and 3PS quota licenses, 4COP SFS/SRX and 2COP operating establishments, business opportunities, and current asking-price context.",
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

export default async function MiamiCityPage() {
  const [allStandalone, dbprMarketScope] = await Promise.all([
    getMarketplaceListings().then(getVisibleAvailableMarketplaceListings),
    getMiamiDbprMarketScope(),
  ]);

  const standalone = allStandalone.filter(
    (listing) => listing.county === "Miami-Dade County",
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
    .filter((listing) => listing.county === "Miami-Dade County")
    .map((listing) => ({
      title: listing.title,
      category: listing.businessCategory,
      licenseType: listing.licenseType,
      price: listing.packagePrice,
      href: listing.marketViewHref || listing.href,
      featuredThirdParty: Boolean(listing.featured && !listing.sellerDirect && listing.brokerName?.trim()),
    }));

  const drawing2026 =
    QUOTA_DRAWING_2026.counties.find((item) => item.county === "Dade")?.licenses ?? 0;

  // BEBR medium-series projection: 2,814,927 (2025) to 2,916,375 (2030).
  const bebr2025 = 2_814_927;
  const bebr2030 = 2_916_375;
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
      city="Miami"
      heroTitle={
        <>
          Miami
          <br />
          Liquor License Market Data
        </>
      }
      heroDescription={
        <p>
          Explore current liquor-license market activity in Miami and Miami-Dade County,
          including standalone quota licenses, restaurants, bars, nightclubs and hospitality
          businesses with liquor licenses, operating establishments, and local asking-price context.
        </p>
      }
      heroBullets={[
        "Miami restaurants, bars, nightclubs and hospitality businesses with liquor licenses.",
        "Standalone Miami-Dade County 4COP and 3PS quota liquor licenses for sale.",
        "Miami-Dade liquor-license pricing, operating-license and growth context.",
      ]}
      heroImage="https://images.openai.com/static-rsc-4/PlQ5whI2qIepoeKErtlJ--jKU49WUBlkkFqwqUc2lIpwNtX0uBelDcccx2kwTYStPE0ZC9abxyT-w3cdLtZbsgxO9yPRyzSNUUniIeeqb9uOK4WZJq6upO7yWTXdikVK1a7OnmKOokBGGca11jAXkH-ZfZ61qp9uQQ05tuQexLW5RyTg1zQ2O6zdDGhHqQi8?purpose=fullsize"
      heroImagePosition="68% 50%"
      cityMark="Miami"
      cityMarkTagline="Florida · Magic City"
    >
      <CityMarketOverviewMaps
        standalone={allStandalone}
        businesses={allBusinesses}
        city="Miami"
        county="Miami-Dade County"
        markerX={405}
        markerY={238}
      />

      <CityMarketScope
        city="Miami"
        county="Miami-Dade County"
        countyPopulation={countyPopulations2024["Miami-Dade County"]}
        cityPopulation={489_812}
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
