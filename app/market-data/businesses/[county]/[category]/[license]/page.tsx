import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BusinessMarketHeatMap from "@/components/BusinessMarketHeatMap";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import { floridaCounties, getCountyBySlug } from "@/data/florida-counties";
import {
  businessCategoryFromSlug,
  businessMarketLicenseFromSlug,
} from "@/lib/business-market-view";
import { businessQuotaListingRecords } from "@/lib/business-quota-listings";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "@/app/fllm-official-template.css";
import "./business-market-view.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

type PageProps = {
  params: Promise<{
    county: string;
    category: string;
    license: string;
  }>;
};

type PriceStats = {
  count: number;
  average: number | null;
  median: number | null;
  low: number | null;
  high: number | null;
};

function stats(values: Array<number | null | undefined>): PriceStats {
  const prices = values
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value) && value > 0)
    .map((value) => Math.round(value))
    .sort((a, b) => a - b);

  if (!prices.length) {
    return { count: 0, average: null, median: null, low: null, high: null };
  }

  const midpoint = Math.floor(prices.length / 2);
  const median = prices.length % 2
    ? prices[midpoint]
    : Math.round((prices[midpoint - 1] + prices[midpoint]) / 2);

  return {
    count: prices.length,
    average: Math.round(prices.reduce((sum, value) => sum + value, 0) / prices.length),
    median,
    low: prices[0],
    high: prices[prices.length - 1],
  };
}

function money(value: number | null) {
  if (value === null) return "No disclosed data";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function rangeLabel(priceStats: PriceStats) {
  if (priceStats.low === null || priceStats.high === null) return "No disclosed data";
  if (priceStats.low === priceStats.high) return money(priceStats.low);
  return `${money(priceStats.low)}–${money(priceStats.high)}`;
}

function licenseMatches(
  listingLicense: string,
  selectedLicense: string,
) {
  return listingLicense === selectedLicense;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { county: countySlug, category: categorySlug, license: licenseSlug } = await params;
  const county = getCountyBySlug(countySlug);
  const category = businessCategoryFromSlug(categorySlug);
  const licenseView = businessMarketLicenseFromSlug(licenseSlug);

  if (!county || !category || !licenseView) return {};

  const canonical = `${siteUrl}/market-data/businesses/${county.slug}/${categorySlug}/${licenseSlug}`;
  const title = `${county.name} ${category} Market View | FLLM`;
  const description =
    `Compare observed ${category.toLowerCase()} asking prices in ${county.name} with FLLM's ${licenseView.benchmarkLabel} asking-price data and statewide county heat-map context.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Florida Liquor License Market",
    },
  };
}

export default async function BusinessMarketViewPage({ params }: PageProps) {
  const { county: countySlug, category: categorySlug, license: licenseSlug } = await params;
  const county = getCountyBySlug(countySlug);
  const category = businessCategoryFromSlug(categorySlug);
  const licenseView = businessMarketLicenseFromSlug(licenseSlug);

  if (!county || !category || !licenseView) notFound();

  const publishedBusinessObservations = businessQuotaListingRecords.filter(
    (listing) =>
      listing.publicationStatus === "published" &&
      listing.businessCategory === category &&
      licenseMatches(listing.licenseType, licenseView.label),
  );

  const countyBusinessObservations = publishedBusinessObservations.filter(
    (listing) => listing.county === county.name,
  );

  const marketplaceListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );

  const countyQuotaListings = marketplaceListings.filter(
    (listing) =>
      listing.county === county.name &&
      listing.type === licenseView.benchmarkType,
  );

  const businessStats = stats(
    countyBusinessObservations.map((listing) => listing.packagePriceNumber),
  );
  const quotaStats = stats(countyQuotaListings.map((listing) => listing.price));

  const rows = floridaCounties.map((rowCounty) => {
    const businesses = publishedBusinessObservations.filter(
      (listing) => listing.county === rowCounty.name,
    );
    const quotaListings = marketplaceListings.filter(
      (listing) =>
        listing.county === rowCounty.name &&
        listing.type === licenseView.benchmarkType,
    );
    const businessPriceStats = stats(
      businesses.map((listing) => listing.packagePriceNumber),
    );
    const quotaPriceStats = stats(quotaListings.map((listing) => listing.price));

    return {
      name: rowCounty.name,
      slug: rowCounty.slug,
      businessCount: businesses.length,
      businessAverage: businessPriceStats.average,
      quotaCount: quotaPriceStats.count,
      quotaAverage: quotaPriceStats.average,
    };
  });

  const canonicalPath = `/market-data/businesses/${county.slug}/${categorySlug}/${licenseSlug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${county.name} ${category} Market View`,
    url: `${siteUrl}${canonicalPath}`,
    description:
      `Observed advertised asking prices for ${category.toLowerCase()} businesses using ${licenseView.label} licensing, compared with FLLM county quota-license asking-price data.`,
    spatialCoverage: { "@type": "Place", name: county.name },
    creator: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
      url: siteUrl,
    },
    variableMeasured: [
      `${category} advertised asking prices`,
      `${licenseView.benchmarkLabel} advertised asking prices`,
      "Matching market observations",
    ],
  };

  return (
    <main className="business-market-view-page fllm-official-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <div className="business-market-view-header">
        <FormsSiteHeader />
      </div>

      <section className="business-market-view-hero">
        <div className="business-market-view-shell">
          <div className="business-market-view-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/market-data/heat-map">Market Data</Link><span>›</span>
            <strong>Market View</strong>
          </div>
          <span className="business-market-view-kicker">FLLM Business + Liquor License Market Intelligence</span>
          <h1>{county.name} <em>{category} Market View</em></h1>
          <p>
            Compare the advertised asking-price landscape for matching {category.toLowerCase()} opportunities with
            FLLM&apos;s county liquor-license market data. This page summarizes market observations; it is not a listing-broker page.
          </p>
          <div className="business-market-view-tags" aria-label="Selected market filters">
            <span>{category}</span>
            <span>{licenseView.label}</span>
            <span>{county.name}</span>
          </div>
        </div>
      </section>

      <section className="business-market-view-summary">
        <div className="business-market-view-shell">
          <div className="business-market-view-heading">
            <div>
              <span>County Snapshot</span>
              <h2>Business asking prices + liquor-license benchmark</h2>
            </div>
            <Link href="/market-data/heat-map">Standalone License Heat Map →</Link>
          </div>

          <div className="business-market-view-stat-grid">
            <article>
              <span>Average {category} Ask</span>
              <strong>{money(businessStats.average)}</strong>
              <small>{businessStats.count} disclosed matching observation{businessStats.count === 1 ? "" : "s"}</small>
            </article>
            <article>
              <span>Median {category} Ask</span>
              <strong>{money(businessStats.median)}</strong>
              <small>Observed range {rangeLabel(businessStats)}</small>
            </article>
            <article>
              <span>Average {licenseView.benchmarkLabel} Ask</span>
              <strong>{money(quotaStats.average)}</strong>
              <small>{quotaStats.count} disclosed standalone observation{quotaStats.count === 1 ? "" : "s"}</small>
            </article>
            <article>
              <span>Median {licenseView.benchmarkLabel} Ask</span>
              <strong>{money(quotaStats.median)}</strong>
              <small>Observed range {rangeLabel(quotaStats)}</small>
            </article>
          </div>

          {licenseView.benchmarkContext ? (
            <div className="business-market-view-context-note">
              <strong>Benchmark context:</strong> {licenseView.benchmarkContext}
            </div>
          ) : null}
        </div>
      </section>

      <section className="business-market-view-map-section">
        <div className="business-market-view-shell">
          <BusinessMarketHeatMap
            rows={rows}
            categoryLabel={category}
            benchmarkLabel={licenseView.benchmarkLabel}
            categorySlug={categorySlug}
            licenseSlug={licenseSlug}
            selectedCountySlug={county.slug}
          />
        </div>
      </section>

      <section className="business-market-view-method">
        <div className="business-market-view-shell business-market-view-method-grid">
          <article>
            <span>Business Market Observations</span>
            <h2>What the business side measures</h2>
            <p>
              FLLM records advertised asking prices for businesses observed in the market and groups them by Florida county,
              business type and liquor-license classification. The figures summarize advertised asks, not closed-sale prices.
            </p>
          </article>
          <article>
            <span>Quota-License Benchmark</span>
            <h2>What the license side measures</h2>
            <p>
              The quota benchmark is derived from FLLM&apos;s standalone liquor-license marketplace data for the selected county.
              It is shown separately so a buyer can compare the business asking-price landscape with the county&apos;s license market.
            </p>
          </article>
        </div>

        <div className="business-market-view-shell">
          <div className="business-market-view-disclosure">
            <strong>Market-data disclosure:</strong> FLLM is not acting as the business broker, listing broker, seller, buyer&apos;s
            broker, or agent for Market Listings summarized in this dataset. Market observations are provided for informational
            and market-reference purposes. Asking prices may change, listings may be withdrawn or sold, and availability,
            license status, transaction terms and regulatory requirements should be independently verified. Asking prices are
            not appraised values or verified closed-sale prices.
          </div>
        </div>
      </section>

      <footer className="business-market-view-footer" aria-label="Florida Liquor License Market footer">
        <div className="business-market-view-shell business-market-view-footer-main">
          <div className="business-market-view-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav>
            <Link href="/listings">Standalone Licenses</Link>
            <Link href="/businesses-with-quota-licenses">Business Packages</Link>
            <Link href="/restaurants-with-liquor-licenses">Restaurants</Link>
            <Link href="/market-data/heat-map">Market Data</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
