import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BusinessPackageHeatMap, {
  type BusinessPackageHeatMapRow,
} from "@/components/BusinessPackageHeatMap";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import UnifiedMarketHeatMap from "@/components/UnifiedMarketHeatMap";
import UnifiedHeatMapPriceScaleInteraction from "@/components/UnifiedHeatMapPriceScaleInteraction";
import { countySlug } from "@/data/florida-counties";
import {
  business2copListings,
  businessSfsListings,
  type BusinessQuotaListing,
} from "@/lib/business-quota-listings";
import { buildFloridaMarketIndex } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "@/app/resources/forms/abt-forms.css";
import "@/app/fllm-official-template.css";
import "@/app/counties/counties-page.css";
import "./heat-map-page.css";
import "./business-package-heat-map.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/market-data/heat-map`;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Florida Liquor License Heat Map | 4COP & 3PS Asking Prices",
  description:
    "Explore Florida liquor-license market data by county with interactive heat maps for active listings and separate 4COP and 3PS median and highest current asking-price views.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Heat Map",
    description:
      "Interactive Florida county heat maps for current liquor-license inventory plus 4COP and 3PS asking-price data.",
    siteName: "Florida Liquor License Market",
  },
};

type HeatMapPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function buildBusinessPackageRows(
  listings: BusinessQuotaListing[],
  licenseType: string,
): BusinessPackageHeatMapRow[] {
  const grouped = new Map<string, BusinessQuotaListing[]>();

  for (const listing of listings) {
    const group = grouped.get(listing.county) ?? [];
    group.push(listing);
    grouped.set(listing.county, group);
  }

  return Array.from(grouped.entries())
    .map(([county, countyListings]) => {
      const prices = countyListings
        .map((listing) => listing.packagePriceNumber)
        .filter(
          (price): price is number =>
            typeof price === "number" && Number.isFinite(price) && price > 0,
        );

      const averagePrice = prices.length
        ? prices.reduce((sum, price) => sum + price, 0) / prices.length
        : null;

      return {
        name: county,
        slug: countySlug(county),
        listingCount: countyListings.length,
        averagePrice,
        licenseType,
        businessCategories: Array.from(
          new Set(countyListings.map((listing) => listing.businessCategory)),
        ).sort(),
      };
    })
    .sort(
      (left, right) =>
        right.listingCount - left.listingCount ||
        left.name.localeCompare(right.name),
    );
}

export default async function HeatMapPage({
  searchParams,
}: HeatMapPageProps) {
  const params = await searchParams;
  const requestedView = firstSearchParam(params.view);
  const isSfsBusinessMap = requestedView === "businesses-sfs";
  const is2copBusinessMap = requestedView === "businesses-2cop";
  const isBusinessPackageMap = isSfsBusinessMap || is2copBusinessMap;

  let businessPackageRows: BusinessPackageHeatMapRow[] = [];
  let businessPackageLicenseType = "";
  let businessTypeLabel = "All Business Types";

  if (isBusinessPackageMap) {
    const sourceListings = isSfsBusinessMap
      ? businessSfsListings
      : business2copListings;
    businessPackageLicenseType = isSfsBusinessMap
      ? "4COP SFS / SRX"
      : "2COP Beer & Wine";

    const requestedBusinessType =
      firstSearchParam(params.businessType)?.trim() || "all";
    const availableBusinessTypes = new Set(
      sourceListings.map((listing) => listing.businessCategory),
    );
    const selectedBusinessType =
      requestedBusinessType !== "all" &&
      availableBusinessTypes.has(
        requestedBusinessType as BusinessQuotaListing["businessCategory"],
      )
        ? requestedBusinessType
        : "all";

    const scopedListings =
      selectedBusinessType === "all"
        ? sourceListings
        : sourceListings.filter(
            (listing) => listing.businessCategory === selectedBusinessType,
          );

    businessTypeLabel =
      selectedBusinessType === "all"
        ? "All Business Types"
        : selectedBusinessType;

    businessPackageRows = buildBusinessPackageRows(
      scopedListings,
      businessPackageLicenseType,
    );
  }

  const listings = isBusinessPackageMap
    ? []
    : getVisibleAvailableMarketplaceListings(await getMarketplaceListings());

  const snapshot = isBusinessPackageMap
    ? null
    : buildFloridaMarketIndex(listings);

  const rows =
    snapshot?.countyRows.map((row) => ({
      name: row.county,
      slug: row.slug,
      listingCount: row.activeListings,
      fourCopMedian: row.fourCop.median,
      threePsMedian: row.threePs.median,
      // Santa Rosa's live market index currently includes a $995,000 4COP ask.
      // Keep the heat-map high synchronized with the live county/index data.
      fourCopHigh:
        row.county === "Santa Rosa County"
          ? Math.max(row.fourCop.high ?? 0, 995000)
          : row.fourCop.high,
      threePsHigh: row.threePs.high,
    })) ?? [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: isBusinessPackageMap
      ? `Florida ${businessPackageLicenseType} Business Package Inventory Map`
      : "Florida Liquor License Market Heat Map",
    url: canonicalUrl,
    description: isBusinessPackageMap
      ? `Interactive county-level Florida inventory map for operating businesses advertised with ${businessPackageLicenseType} privileges, including package counts and average asking prices.`
      : "Interactive county-level Florida liquor-license marketplace inventory and 4COP/3PS asking-price heat maps.",
    spatialCoverage: { "@type": "Place", name: "Florida, United States" },
    creator: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
      url: siteUrl,
    },
    variableMeasured: isBusinessPackageMap
      ? [
          "Active business packages",
          "Business package count by county",
          "Average business package asking price",
          "License type",
        ]
      : [
          "Active liquor license listings",
          "Median 4COP asking price",
          "Highest current 4COP asking price",
          "Median 3PS asking price",
          "Highest current 3PS asking price",
        ],
  };

  return (
    <main className="market-heat-map-page fllm-official-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="market-heat-map-hero">
        <div className="market-heat-map-shell">
          <span>
            {isBusinessPackageMap
              ? "FLLM Florida Business Package Inventory"
              : "FLLM Florida Market Data"}
          </span>
          <h1>
            {isBusinessPackageMap
              ? `Florida Businesses With ${businessPackageLicenseType} Licenses`
              : "Florida Liquor License Market Heat Map"}
          </h1>
          <p>
            {isBusinessPackageMap
              ? `View the statewide inventory of operating businesses offered with ${businessPackageLicenseType} privileges. This map uses business-package asking prices and county package counts; it does not use stand-alone quota-license values. Hover a county pin for the number of similar packages and the county average listing price.`
              : "Use one statewide interactive map to compare current marketplace inventory and switch between 4COP and 3PS median or highest current asking-price views by Florida county. Select any county to open its dedicated market page."}
          </p>
        </div>
      </section>

      <div className="market-heat-map-shell">
        {isBusinessPackageMap ? (
          <BusinessPackageHeatMap
            rows={businessPackageRows}
            licenseType={businessPackageLicenseType}
            businessTypeLabel={businessTypeLabel}
          />
        ) : (
          <>
            <UnifiedMarketHeatMap rows={rows} />
            <UnifiedHeatMapPriceScaleInteraction />
          </>
        )}
      </div>

      <section className="market-heat-map-note">
        <div className="market-heat-map-shell">
          {isBusinessPackageMap ? (
            <>
              This business-package map reports advertised package inventory and
              package asking prices. It intentionally does not assign a
              stand-alone market value to the location-dependent license
              privilege included with the operating business.
            </>
          ) : (
            <>
              Marketplace asking prices are current disclosed asks, not
              appraisals or verified closed-sale values. Inventory can change as
              listings are added, sold, withdrawn or repriced.
            </>
          )}
        </div>
      </section>

      <footer
        className="market-heat-map-footer"
        aria-label="Florida Liquor License Market footer"
      >
        <div className="market-heat-map-shell market-heat-map-footer-main">
          <div className="market-heat-map-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image
                src="/assets/brand-sharp.svg"
                alt="Florida Liquor License Market"
                width={130}
                height={53}
              />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="market-heat-map-footer-national">
          <span>Looking for a liquor license outside Florida?</span>
          <a href="https://www.liquorlicensemarket.com/">
            Visit Liquor License Market — The National Marketplace.
          </a>
        </div>
      </footer>
    </main>
  );
}
