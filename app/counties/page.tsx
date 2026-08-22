import type { Metadata } from "next";
import Link from "next/link";

import { countyPopulations2024 } from "@/data/county-populations-2024";
import { countySlug, floridaCounties, featuredCounties, getCountyBySlug } from "@/data/florida-counties";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "./counties-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/counties`;

export const metadata: Metadata = {
  title: "Florida Liquor License Market Data by County | 4COP & 3PS Prices",
  description:
    "Compare Florida liquor license asking prices, active 4COP and 3PS inventory, and 2024 county population data across all 67 Florida counties.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Market Data by County",
    description: "Compare current 4COP and 3PS asking-price data and active inventory across Florida's 67 counties.",
    siteName: "Florida Liquor License Market",
  },
};

export const dynamic = "force-dynamic";

type PriceStats = {
  count: number;
  low: number | null;
  median: number | null;
  high: number | null;
};

function canonicalCountyName(value: string) {
  const normalized = value.replace(/^Saint\s+/i, "St. ");
  return getCountyBySlug(countySlug(normalized))?.name ?? value;
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function priceStats(values: Array<number | null>): PriceStats {
  const prices = values
    .filter((value): value is number => typeof value === "number")
    .sort((a, b) => a - b);
  if (prices.length === 0) return { count: 0, low: null, median: null, high: null };
  const middle = Math.floor(prices.length / 2);
  const median = prices.length % 2 === 1
    ? prices[middle]
    : Math.round((prices[middle - 1] + prices[middle]) / 2);
  return {
    count: prices.length,
    low: prices[0],
    median,
    high: prices[prices.length - 1],
  };
}

function AskingPriceCell({ stats }: { stats: PriceStats }) {
  if (stats.median === null) return <span className="market-data-empty">—</span>;
  const range = stats.low !== stats.high && stats.low !== null && stats.high !== null
    ? `${money(stats.low)}–${money(stats.high)}`
    : null;
  return (
    <span className="market-price-cell">
      <strong>{money(stats.median)}</strong>
      <small>{stats.count} disclosed ask{stats.count === 1 ? "" : "s"}{range ? ` · ${range}` : ""}</small>
    </span>
  );
}

export default async function CountiesPage() {
  const listings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings()).map((listing) => ({
    ...listing,
    county: canonicalCountyName(listing.county),
  }));
  const availableCounts = new Map<string, number>();
  listings.forEach((listing) => {
    availableCounts.set(listing.county, (availableCounts.get(listing.county) ?? 0) + 1);
  });

  const alphabetical = [...floridaCounties].sort((a, b) => a.name.localeCompare(b.name));
  const countyRows = alphabetical.map((county) => {
    const countyListings = listings.filter((listing) => listing.county === county.name);
    const fourCop = countyListings.filter((listing) => listing.type === "4COP Quota");
    const threePs = countyListings.filter((listing) => listing.type === "3PS Quota / Package Store");
    return {
      county,
      population: countyPopulations2024[county.name] ?? null,
      listingCount: countyListings.length,
      fourCop: priceStats(fourCop.map((listing) => listing.price)),
      threePs: priceStats(threePs.map((listing) => listing.price)),
    };
  });
  const marketsWithInventory = countyRows.filter((row) => row.listingCount > 0).length;
  const disclosedPrices = listings
    .map((listing) => listing.price)
    .filter((value): value is number => typeof value === "number")
    .sort((a, b) => a - b);
  const statewideMedian = disclosedPrices.length
    ? disclosedPrices[Math.floor(disclosedPrices.length / 2)]
    : null;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Florida Liquor License Market Data by County",
      description: "Current Florida 4COP and 3PS asking-price and active inventory data by county, with 2024 county population context.",
      url: canonicalUrl,
      creator: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      spatialCoverage: { "@type": "Place", name: "Florida, United States" },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida liquor license markets by county",
      url: canonicalUrl,
      numberOfItems: alphabetical.length,
      itemListElement: alphabetical.map((county, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: county.name,
        url: `${siteUrl}/counties/${county.slug}`,
      })),
    },
  ];

  return (
    <main className="county-directory-page market-data-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <header className="directory-header directory-shell">
        <Link className="directory-brand" href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
        <nav><Link href="/listings">Licenses for Sale</Link><Link href="/florida-liquor-license-value">Value Estimator</Link><Link href="/financing">Financing</Link><Link href="/sell-your-license">List Your License</Link><Link href="/contact">Contact</Link></nav>
      </header>

      <section className="directory-hero market-data-hero">
        <div className="directory-shell">
          <span>FLLM Florida Quota License Data Center</span>
          <h1>Florida Liquor License Market Data by County</h1>
          <p>Compare current 4COP and 3PS asking prices, active marketplace inventory and 2024 county population data across all 67 Florida counties.</p>
          <div className="market-data-hero-actions"><a href="#county-market-table">View All 67 Counties</a><Link href="/listings">Browse Current Listings</Link></div>
        </div>
      </section>

      <section className="market-snapshot directory-shell">
        <div className="market-snapshot-heading"><div><span>Live marketplace snapshot</span><h2>Florida quota license market at a glance</h2></div><p>Updated from the current FLLM marketplace inventory.</p></div>
        <div className="market-stat-grid">
          <article><strong>{listings.length}</strong><span>Active marketplace listings</span></article>
          <article><strong>{marketsWithInventory}</strong><span>Counties with active inventory</span></article>
          <article><strong>{statewideMedian === null ? "—" : money(statewideMedian)}</strong><span>Median disclosed asking price*</span></article>
          <article><strong>67</strong><span>Florida counties compared</span></article>
        </div>
        <p className="market-data-caution">*Asking-price data is a current market snapshot. Florida quota licenses are county-specific; asking prices are not appraisals, verified closed-sale prices or guarantees of value.</p>
      </section>

      <section className="directory-featured directory-shell">
        <div className="directory-heading"><div><span>High-Interest Markets</span><h2>Featured Florida Counties</h2></div><Link href="/listings">Florida liquor licenses for sale ›</Link></div>
        <div className="directory-featured-grid">
          {featuredCounties.map((county) => (
            <Link key={county.slug} href={`/counties/${county.slug}`}>
              <div><strong>{county.name}</strong><span>{county.primaryCities.join(" · ")}</span></div>
              <em>{availableCounts.get(county.name) ?? 0} available</em>
            </Link>
          ))}
        </div>
      </section>

      <section className="county-market-data" id="county-market-table">
        <div className="directory-shell">
          <div className="directory-heading market-table-heading"><div><span>All 67 Florida counties</span><h2>County-by-county liquor license market table</h2></div><p>Median and range figures use currently disclosed asking prices in active marketplace inventory.</p></div>
          <div className="market-table-wrap">
            <table className="market-data-table">
              <thead><tr><th>County</th><th>2024 Population</th><th>Active Listings</th><th>4COP Asking Market</th><th>3PS Asking Market</th></tr></thead>
              <tbody>
                {countyRows.map((row) => (
                  <tr key={row.county.slug}>
                    <td><Link href={`/counties/${row.county.slug}`}><strong>{row.county.name}</strong><small>{row.county.primaryCities.slice(0, 3).join(" · ") || "County market page"}</small></Link></td>
                    <td>{row.population?.toLocaleString("en-US") ?? "—"}</td>
                    <td>{row.listingCount > 0 ? <Link className="market-count-link" href={`/listings?county=${encodeURIComponent(row.county.name)}&status=available`}>{row.listingCount}</Link> : <span className="market-data-empty">0</span>}</td>
                    <td><AskingPriceCell stats={row.fourCop} /></td>
                    <td><AskingPriceCell stats={row.threePs} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="market-methodology directory-shell">
        <div className="directory-heading"><div><span>Transparent methodology</span><h2>What the market table measures</h2></div></div>
        <div className="methodology-grid">
          <article><b>01</b><strong>Current asking prices</strong><p>FLLM uses active marketplace inventory and direct seller submissions, then calculates disclosed asking-price medians and ranges by county and license type.</p><Link href="/listings">View current marketplace inventory ›</Link></article>
          <article><b>02</b><strong>County population</strong><p>Population figures are U.S. Census Bureau Vintage 2024 county estimates and provide context for Florida&apos;s county-based quota system.</p><a href="https://www.census.gov/programs-surveys/popest.html" target="_blank" rel="noopener noreferrer">U.S. Census Population Estimates ↗</a></article>
          <article><b>03</b><strong>County-specific markets</strong><p>Quota licenses are county-specific. A statewide average cannot substitute for comparing supply, demand and asking prices in the county where the license may be used.</p><Link href="/resources/florida-liquor-license-system">How Florida quota licensing works ›</Link></article>
          <article><b>04</b><strong>Market data, not an appraisal</strong><p>Advertised asking prices are not verified transaction prices. Buyers and sellers should independently confirm license status, transfer requirements and transaction terms.</p><Link href="/florida-liquor-license-value">Open the value estimator ›</Link></article>
        </div>
      </section>

      <section className="directory-cta">
        <div className="directory-shell directory-cta-grid">
          <div><span>For Buyers</span><h2>Search current license opportunities</h2><p>Compare Florida liquor licenses for sale, then filter live inventory by county, license type and asking price.</p><Link href="/listings">Browse Florida Licenses for Sale</Link></div>
          <div><span>For Sellers</span><h2>Compare the market before listing</h2><p>Review asking-price evidence by county, then check the FLLM value estimator or publish a license listing.</p><Link href="/florida-liquor-license-value">Check My License Market</Link></div>
        </div>
      </section>

      <footer className="directory-footer"><div className="directory-shell"><span>© Florida Liquor License Market</span><nav><Link href="/">Home</Link><Link href="/florida-4cop-liquor-license-for-sale">4COP</Link><Link href="/florida-3ps-liquor-license-for-sale">3PS</Link><Link href="/listings">Listings</Link><Link href="/contact">Contact</Link></nav></div></footer>
    </main>
  );
}
