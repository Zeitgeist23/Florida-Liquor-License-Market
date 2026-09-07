import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import heroDataUri from "./hero-data";
import heatmapDataUri from "./heatmap-data";
import newsDataUri from "./news-data";
import styles from "./exchange-board.module.css";

export const dynamic = "force-dynamic";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/market-data/exchange-board`;

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Asking Prices",
  description:
    "Adding transparency to the Florida liquor license market with active asking prices, county market data, current inventory and featured listings.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "FLLM Exchange Board | Florida Liquor License Asking Prices",
    description:
      "Adding transparency to the Florida liquor license market with active asking prices, county price discovery and current marketplace inventory.",
    siteName: "Florida Liquor License Market",
  },
};

function money(value: number | null, fallback = "—") {
  if (value === null) return fallback;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function shortCounty(county: string) {
  return county.replace(/\s+County$/i, "");
}

function shortType(type: string) {
  return type.startsWith("4COP") ? "4COP" : "3PS";
}

export default async function ExchangeBoardPage() {
  const rawListings = await getMarketplaceListings();
  const listings = getVisibleAvailableMarketplaceListings(rawListings)
    .filter((listing) => listing.price !== null)
    .sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

  const newest = [...listings]
    .sort((a, b) => {
      const left = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const right = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return right - left;
    })
    .slice(0, 4);

  const featured = listings.filter((listing) => {
    if (!listing.featuredUntil) return false;
    return Date.parse(listing.featuredUntil) > Date.now();
  });

  const tickerListings = listings.slice(0, 18);
  const themeListings = [...featured, ...listings.filter((listing) => !featured.includes(listing))].slice(0, 10);
  const boardListings = listings.slice(0, 6);
  const highest = listings[0]?.price ?? null;
  const lowest = listings.length ? listings[listings.length - 1]?.price ?? null : null;
  const activeCounties = new Set(listings.map((listing) => listing.county)).size;
  const featuredListing = featured[0] ?? listings[0];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FLLM Exchange Board",
    url: canonicalUrl,
    description:
      "Active Florida liquor license asking prices, county market data and current FLLM marketplace inventory.",
    dateModified: "2026-09-07",
    publisher: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
      url: siteUrl,
    },
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className={styles.siteHeader}>
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="List Your License" />
      </div>

      <section className={styles.hero} aria-label="FLLM Exchange trading floor">
        <img
          src={heroDataUri}
          alt="FLLM Exchange trading floor with Florida liquor license market boards"
        />
      </section>

      <section className={styles.tickerStack} aria-label="Florida liquor license market tickers">
        <div className={styles.tickerRow}>
          <div className={styles.tickerTrack}>
            {[...tickerListings, ...tickerListings].map((listing, index) => (
              <Link href={listingPageHref(listing)} className={styles.quote} key={`${listing.sourceRef}-${index}`}>
                <b>{shortCounty(listing.county)}</b>
                <span>{shortType(listing.type)}</span>
                <strong>{money(listing.price, listing.priceLabel)}</strong>
                <em>ASK ▲</em>
              </Link>
            ))}
          </div>
        </div>
        <div className={`${styles.tickerRow} ${styles.themeTicker}`}>
          <div className={`${styles.tickerTrack} ${styles.tickerTrackSlow}`}>
            {[0, 1].map((cycle) => (
              <div className={styles.themeSequence} key={cycle}>
                <strong>FLLM</strong>
                <span>ADDING TRANSPARENCY TO THE FLORIDA LIQUOR LICENSE MARKET</span>
                <span>ACTIVE ASKING PRICES</span>
                <span>COUNTY PRICE DISCOVERY</span>
                <span>MARKET DATA</span>
                <span>NEW LISTINGS</span>
                {themeListings.map((listing, index) => (
                  <Link href={listingPageHref(listing)} key={`${cycle}-${listing.sourceRef}-${index}`}>
                    {listing.featuredUntil ? "FEATURED · " : ""}{shortCounty(listing.county)} · {shortType(listing.type)} · {money(listing.price, listing.priceLabel)} ASK
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.marketGrid}>
        <article className={`${styles.panel} ${styles.heatPanel}`}>
          <header className={styles.panelTitle}>
            <span>FLORIDA MARKET HEAT MAP</span>
            <small>ACTIVE ASKING PRICES BY COUNTY</small>
          </header>
          <div className={styles.heatMapArt}>
            <img src={heatmapDataUri} alt="Florida liquor license asking-price heat map" />
          </div>
          <Link className={styles.goldButton} href="/?open=heat-map">Explore County Markets</Link>
        </article>

        <article className={`${styles.panel} ${styles.exchangeBoard}`}>
          <header className={styles.boardHeading}>
            <h1>FLLM Exchange Board</h1>
            <p>ACTIVE FLORIDA LIQUOR LICENSE ASKING PRICES</p>
          </header>
          <div className={styles.boardTable}>
            <div className={styles.boardHeader}>
              <span>County</span><span>License Type</span><span>Asking Price</span><span>Status</span>
            </div>
            {boardListings.map((listing) => (
              <Link href={listingPageHref(listing)} className={styles.boardRow} key={listing.sourceRef}>
                <span>{shortCounty(listing.county)}</span>
                <span>{shortType(listing.type)}</span>
                <strong>{money(listing.price, listing.priceLabel)}</strong>
                <em>AVAILABLE</em>
              </Link>
            ))}
          </div>
          <Link className={styles.goldButton} href="/listings">View All Listings</Link>
        </article>

        <aside className={styles.sideColumn}>
          <article className={styles.panel}>
            <header className={styles.panelTitle}>
              <span>MARKET SNAPSHOT</span>
              <small>FLORIDA LIQUOR LICENSE MARKET</small>
            </header>
            <div className={styles.statsGrid}>
              <div><strong>{listings.length}</strong><span>Active Listings</span></div>
              <div><strong>{activeCounties}</strong><span>Counties</span></div>
              <div><strong>{money(highest)}</strong><span>Highest Ask</span></div>
              <div><strong>{money(lowest)}</strong><span>Lowest Ask</span></div>
            </div>
          </article>
          <article className={styles.panel}>
            <header className={styles.panelTitle}><span>NEWEST TO MARKET</span></header>
            <div className={styles.newList}>
              {newest.map((listing) => (
                <Link href={listingPageHref(listing)} key={listing.sourceRef}>
                  <b>NEW</b><span>{shortCounty(listing.county)}</span><i>{shortType(listing.type)}</i><strong>{money(listing.price, listing.priceLabel)}</strong>
                </Link>
              ))}
            </div>
          </article>
        </aside>
      </section>

      <section className={styles.newsSection} aria-label="FLLM News market report">
        <img
          src={newsDataUri}
          alt="FLLM market reporters discussing the Florida liquor license market with a Florida market heat map"
        />
      </section>

      {featuredListing && (
        <section className={styles.featuredBar}>
          <div>
            <span>FEATURED MARKET LISTING</span>
            <strong>{featuredListing.county} · {shortType(featuredListing.type)} · {money(featuredListing.price, featuredListing.priceLabel)} ASK</strong>
          </div>
          <Link className={styles.goldButton} href={listingPageHref(featuredListing)}>View Featured Listing</Link>
        </section>
      )}

      <section className={styles.actionGrid}>
        <article><span>⌕</span><h2>For Buyers</h2><p>Find available liquor licenses by county and license type.</p><Link href="/listings">Browse Licenses</Link></article>
        <article><span>◇</span><h2>For Sellers</h2><p>List your Florida liquor license and reach qualified buyers.</p><Link href="/sell-your-license">List Your License</Link></article>
        <article><span>↔</span><h2>For Brokers</h2><p>Market client inventory while remaining the listing representative.</p><Link href="/brokers/list-your-license">Broker Options</Link></article>
        <article><span>▥</span><h2>Market Data</h2><p>Explore pricing, trends and county market information.</p><Link href="/counties">View Market Data</Link></article>
      </section>

      <section className={styles.transparencySection}>
        <span className={styles.kicker}>ADDING TRANSPARENCY TO THE FLORIDA LIQUOR LICENSE MARKET</span>
        <h2>A fragmented private market deserves a clearer statewide view.</h2>
        <p>
          Florida quota liquor license sales are fragmented across 67 counties and are often conducted privately through owners, brokers, attorneys, industry relationships and limited-distribution marketing. Unlike residential real estate, there is no single statewide MLS-style system that gives market participants a comprehensive public view of quota liquor licenses offered for sale.
        </p>
        <p>
          FLLM is designed to make the market easier to understand by organizing active listings, county-level market information, asking prices, license types and transaction resources in one statewide platform. Greater visibility does not turn an asking price into a completed sale or an appraisal—but it can give buyers, sellers, brokers, lenders and advisers a more informed starting point.
        </p>
        <div className={styles.transparencyCards}>
          <article><strong>Fragmented Market</strong><span>County-by-county inventory and many privately marketed opportunities.</span></article>
          <article><strong>More Information</strong><span>Active asking prices, county context and searchable marketplace inventory.</span></article>
          <article><strong>More Transparency</strong><span>A clearer statewide view without treating asking prices as completed transactions.</span></article>
        </div>
      </section>

      <section className={styles.notice}>
        <strong>MARKET DATA NOTICE</strong>
        <p>Displayed prices are active asking prices from current marketplace inventory. They are not verified completed transaction prices, appraisals, guarantees of value or investment recommendations. Availability, ownership, transferability, regulatory eligibility and transaction terms should be independently confirmed.</p>
      </section>
    </main>
  );
}
