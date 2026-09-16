import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import UnifiedMarketHeatMap from "@/components/UnifiedMarketHeatMap";
import UnifiedHeatMapPriceScaleInteraction from "@/components/UnifiedHeatMapPriceScaleInteraction";
import { buildFloridaMarketIndex } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "@/app/resources/forms/abt-forms.css";
import "@/app/fllm-official-template.css";
import "./heat-map-page.css";

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

export default async function HeatMapPage() {
  const listings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );
  const snapshot = buildFloridaMarketIndex(listings);

  const rows = snapshot.countyRows.map((row) => ({
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
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Florida Liquor License Market Heat Map",
    url: canonicalUrl,
    description:
      "Interactive county-level Florida liquor-license marketplace inventory and 4COP/3PS asking-price heat maps.",
    spatialCoverage: { "@type": "Place", name: "Florida, United States" },
    creator: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
      url: siteUrl,
    },
    variableMeasured: [
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
          <span>FLLM Florida Market Data</span>
          <h1>Florida Liquor License Market Heat Map</h1>
          <p>
            Use one statewide interactive map to compare current marketplace
            inventory and switch between 4COP and 3PS median or highest current
            asking-price views by Florida county. Select any county to open its
            dedicated market page.
          </p>
        </div>
      </section>

      <div className="market-heat-map-shell">
        <UnifiedMarketHeatMap rows={rows} />
        <UnifiedHeatMapPriceScaleInteraction />
      </div>

      <section className="market-heat-map-note">
        <div className="market-heat-map-shell">
          Marketplace asking prices are current disclosed asks, not appraisals or
          verified closed-sale values. Inventory can change as listings are added,
          sold, withdrawn or repriced.
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
