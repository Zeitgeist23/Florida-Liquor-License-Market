import type { Metadata } from "next";
import Link from "next/link";

import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import { countySlug, floridaCounties, getCountyBySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "./counties-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/counties`;

export const metadata: Metadata = {
  title: "Florida Liquor License Market Data by County | 4COP & 3PS Prices",
  description:
    "Compare Florida liquor license asking prices, active 4COP and 3PS inventory, county populations, and 2026 quota drawing availability across all 67 counties.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Market Data by County",
    description:
      "Current 4COP and 3PS asking-price data, active inventory, population estimates and quota drawing availability across Florida's 67 counties.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor License Market Data by County",
    description: "Compare current Florida quota liquor-license market data across all 67 counties.",
  },
};

export const dynamic = "force-dynamic";

// U.S. Census Bureau Vintage 2024 county population estimates.
const countyPopulations2024: Record<string, number> = {
  "Alachua County": 291782,
  "Baker County": 29325,
  "Bay County": 199718,
  "Bradford County": 28075,
  "Brevard County": 658447,
  "Broward County": 2037472,
  "Calhoun County": 13278,
  "Charlotte County": 212122,
  "Citrus County": 170174,
  "Clay County": 236760,
  "Collier County": 416233,
  "Columbia County": 73977,
  "DeSoto County": 36744,
  "Dixie County": 17614,
  "Duval County": 1055159,
  "Escambia County": 331275,
  "Flagler County": 136744,
  "Franklin County": 12979,
  "Gadsden County": 44151,
  "Gilchrist County": 20233,
  "Glades County": 13132,
  "Gulf County": 15876,
  "Hamilton County": 14334,
  "Hardee County": 26068,
  "Hendry County": 46130,
  "Hernando County": 218150,
  "Highlands County": 109778,
  "Hillsborough County": 1581426,
  "Holmes County": 19876,
  "Indian River County": 172139,
  "Jackson County": 49980,
  "Jefferson County": 15921,
  "Lafayette County": 8640,
  "Lake County": 444204,
  "Lee County": 860959,
  "Leon County": 300488,
  "Levy County": 47765,
  "Liberty County": 7955,
  "Madison County": 18364,
  "Manatee County": 458352,
  "Marion County": 428905,
  "Martin County": 165666,
  "Miami-Dade County": 2838461,
  "Monroe County": 80908,
  "Nassau County": 104376,
  "Okaloosa County": 220483,
  "Okeechobee County": 42369,
  "Orange County": 1533646,
  "Osceola County": 468058,
  "Palm Beach County": 1582055,
  "Pasco County": 659114,
  "Pinellas County": 965870,
  "Polk County": 852878,
  "Putnam County": 77301,
  "Santa Rosa County": 207653,
  "Sarasota County": 476604,
  "Seminole County": 494605,
  "St. Johns County": 334928,
  "St. Lucie County": 390670,
  "Sumter County": 154693,
  "Suwannee County": 47536,
  "Taylor County": 21843,
  "Union County": 15738,
  "Volusia County": 602772,
  "Wakulla County": 37115,
  "Walton County": 89666,
  "Washington County": 26503,
};

type AskingPriceSummary = {
  count: number;
  low: number | null;
  median: number | null;
  high: number | null;
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

function summarizePrices(listings: Listing[]): AskingPriceSummary {
  const prices = listings
    .map((listing) => listing.price)
    .filter((price): price is number => Number.isFinite(price));

  return {
    count: prices.length,
    low: prices.length ? Math.min(...prices) : null,
    median: median(prices),
    high: prices.length ? Math.max(...prices) : null,
  };
}

function canonicalCountyName(value: string) {
  const normalized = value.replace(/^Saint\s+/i, "St. ");
  return getCountyBySlug(countySlug(normalized))?.name ?? value;
}

function drawingCountyName(value: string) {
  if (value === "Dade") return "Miami-Dade County";
  return `${value} County`;
}

function AskingPriceCell({ summary }: { summary: AskingPriceSummary }) {
  if (summary.median === null) return <span className="market-data-empty">—</span>;

  const range = summary.low !== null && summary.high !== null && summary.low !== summary.high
    ? `${money(summary.low)}–${money(summary.high)}`
    : null;

  return (
    <span className="market-price-cell">
      <strong>{money(summary.median)}</strong>
      <small>{summary.count} disclosed ask{summary.count === 1 ? "" : "s"}{range ? ` · ${range}` : ""}</small>
    </span>
  );
}

export default async function CountiesPage() {
  const listings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings()).map((listing) => ({
    ...listing,
    county: canonicalCountyName(listing.county),
  }));

  const drawingByCounty = new Map(
    QUOTA_DRAWING_2026.counties.map((item) => [drawingCountyName(item.county), item.licenses]),
  );

  const alphabetical = [...floridaCounties].sort((a, b) => a.name.localeCompare(b.name));
  const countyRows = alphabetical.map((county) => {
    const countyListings = listings.filter((listing) => listing.county === county.name);
    const fourCop = countyListings.filter((listing) => listing.type === "4COP Quota");
    const threePs = countyListings.filter((listing) => listing.type === "3PS Quota / Package Store");

    return {
      county,
      population: countyPopulations2024[county.name] ?? null,
      listingCount: countyListings.length,
      fourCop: summarizePrices(fourCop),
      threePs: summarizePrices(threePs),
      drawingLicenses: drawingByCounty.get(county.name) ?? 0,
    };
  });

  const disclosedStatewidePrices = listings
    .map((listing) => listing.price)
    .filter((price): price is number => Number.isFinite(price));
  const statewideMedian = median(disclosedStatewidePrices);
  const marketsWithInventory = countyRows.filter((row) => row.listingCount > 0).length;
  const topMarkets = [...countyRows]
    .filter((row) => row.listingCount > 0)
    .sort((left, right) => right.listingCount - left.listingCount || left.county.name.localeCompare(right.county.name))
    .slice(0, 6);
  const snapshotDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Florida Liquor License Market Data by County",
      description:
        "County-level Florida liquor-license market dataset combining current disclosed 4COP and 3PS asking prices, active marketplace inventory, 2024 Census population estimates and 2026 DBPR quota drawing availability.",
      url: canonicalUrl,
      creator: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      spatialCoverage: { "@type": "Place", name: "Florida, United States" },
      temporalCoverage: "2024/2026",
      variableMeasured: [
        "Active liquor license listings",
        "4COP asking prices",
        "3PS asking prices",
        "County population",
        "2026 quota drawing licenses",
      ],
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor License Market Data", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="county-directory-page market-data-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <header className="directory-header directory-shell">
        <Link className="directory-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav>
          <Link href="/listings">Licenses for Sale</Link>
          <Link href="/florida-liquor-license-value">Value Estimator</Link>
          <Link href="/florida-liquor-license-lottery">Quota Lottery</Link>
          <Link href="/sell-your-license">List Your License</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="directory-hero market-data-hero">
        <div className="directory-shell">
          <span>FLLM Florida Quota License Data Center</span>
          <h1>Florida Liquor License Market Data by County</h1>
          <p>
            Compare current 4COP and 3PS asking prices, active marketplace inventory, county populations and 2026 DBPR quota drawing availability across all 67 Florida counties.
          </p>
          <div className="market-data-hero-actions">
            <a href="#county-market-table">View All 67 Counties</a>
            <Link href="/listings">Browse Current Listings</Link>
          </div>
        </div>
      </section>

      <section className="market-snapshot directory-shell" aria-label="Florida liquor license market snapshot">
        <div className="market-snapshot-heading">
          <div>
            <span>Live marketplace snapshot</span>
            <h2>Florida quota license market at a glance</h2>
          </div>
          <p>Marketplace snapshot: {snapshotDate}. DBPR drawing data verified {QUOTA_DRAWING_2026.lastVerified}.</p>
        </div>
        <div className="market-stat-grid">
          <article><strong>{listings.length}</strong><span>Active marketplace listings</span></article>
          <article><strong>{marketsWithInventory}</strong><span>Counties with active inventory</span></article>
          <article><strong>{statewideMedian === null ? "—" : money(statewideMedian)}</strong><span>Median disclosed asking price*</span></article>
          <article><strong>{QUOTA_DRAWING_2026.totalLicenses}</strong><span>2026 DBPR drawing licenses</span></article>
        </div>
        <p className="market-data-caution">
          *Statewide median is a market snapshot only. Florida quota licenses are county-specific, and asking prices are not appraisals, verified closed-sale prices or guarantees of value.
        </p>
      </section>

      <section className="market-leaders">
        <div className="directory-shell">
          <div className="directory-heading">
            <div><span>Current inventory depth</span><h2>Markets with the most active listings</h2></div>
            <Link href="/florida-liquor-license-value">Check a license value ›</Link>
          </div>
          <div className="market-leader-grid">
            {topMarkets.map((row) => (
              <Link key={row.county.slug} href={`/counties/${row.county.slug}`}>
                <div className="market-leader-topline">
                  <strong>{row.county.name}</strong>
                  <em>{row.listingCount} active</em>
                </div>
                <span>{row.county.primaryCities.slice(0, 3).join(" · ") || "Florida county market"}</span>
                <div className="market-leader-metrics">
                  <small>Population <b>{row.population?.toLocaleString("en-US") ?? "—"}</b></small>
                  <small>4COP median <b>{row.fourCop.median === null ? "—" : money(row.fourCop.median)}</b></small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="county-market-data" id="county-market-table">
        <div className="directory-shell">
          <div className="directory-heading market-table-heading">
            <div>
              <span>All 67 Florida counties</span>
              <h2>County-by-county liquor license market table</h2>
            </div>
            <p>Median and range figures use currently disclosed asking prices in FLLM's active marketplace inventory.</p>
          </div>

          <div className="market-table-wrap">
            <table className="market-data-table">
              <thead>
                <tr>
                  <th>County</th>
                  <th>2024 Population</th>
                  <th>Active Listings</th>
                  <th>4COP Asking Market</th>
                  <th>3PS Asking Market</th>
                  <th>2026 New Quota</th>
                </tr>
              </thead>
              <tbody>
                {countyRows.map((row) => (
                  <tr key={row.county.slug}>
                    <td>
                      <Link href={`/counties/${row.county.slug}`}>
                        <strong>{row.county.name}</strong>
                        <small>{row.county.primaryCities.slice(0, 3).join(" · ") || "County market page"}</small>
                      </Link>
                    </td>
                    <td>{row.population?.toLocaleString("en-US") ?? "—"}</td>
                    <td>
                      {row.listingCount > 0
                        ? <Link className="market-count-link" href={`/listings?county=${encodeURIComponent(row.county.name)}&status=available`}>{row.listingCount}</Link>
                        : <span className="market-data-empty">0</span>}
                    </td>
                    <td><AskingPriceCell summary={row.fourCop} /></td>
                    <td><AskingPriceCell summary={row.threePs} /></td>
                    <td>{row.drawingLicenses > 0 ? <strong className="drawing-count">{row.drawingLicenses}</strong> : <span className="market-data-empty">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="market-table-footnote">
            “2026 New Quota” reflects licenses listed in DBPR's 2026 Quota Beverage License Drawing notice. A drawing selection establishes priority to apply; it does not itself issue the beverage license.
          </p>
        </div>
      </section>

      <section className="market-methodology directory-shell" id="methodology">
        <div className="directory-heading">
          <div><span>Transparent methodology</span><h2>Where this Florida liquor license data comes from</h2></div>
        </div>
        <div className="methodology-grid">
          <article>
            <b>01</b>
            <strong>Current asking prices</strong>
            <p>FLLM aggregates active marketplace listings and direct seller submissions. The table calculates disclosed low, median and high asking prices by county and license type.</p>
            <Link href="/listings">View the underlying marketplace ›</Link>
          </article>
          <article>
            <b>02</b>
            <strong>County population</strong>
            <p>Population figures are U.S. Census Bureau Vintage 2024 county population estimates and are shown to provide context for Florida's county-based quota system.</p>
            <a href="https://www.census.gov/programs-surveys/popest.html" target="_blank" rel="noopener noreferrer">U.S. Census Population Estimates ↗</a>
          </article>
          <article>
            <b>03</b>
            <strong>Quota drawing availability</strong>
            <p>The 2026 column is based on the Florida DBPR Division of Alcoholic Beverages and Tobacco's official quota drawing notice, last verified by FLLM on {QUOTA_DRAWING_2026.lastVerified}.</p>
            <a href={QUOTA_DRAWING_2026.sourceNoticeUrl} target="_blank" rel="noopener noreferrer">Official 2026 DBPR Notice ↗</a>
          </article>
          <article>
            <b>04</b>
            <strong>Regulatory reference</strong>
            <p>License classification, issuance and transfer requirements remain governed by Florida law and DBPR/ABT. Market data does not replace regulatory, legal or financial due diligence.</p>
            <a href={QUOTA_DRAWING_2026.quotaInformationUrl} target="_blank" rel="noopener noreferrer">DBPR Quota License Information ↗</a>
          </article>
        </div>
      </section>

      <section className="market-citation-band">
        <div className="directory-shell market-citation-grid">
          <div>
            <span>Researchers, attorneys, brokers & journalists</span>
            <h2>Cite or link to this market data</h2>
            <p>
              This page is designed as a continuously updated reference for Florida quota liquor-license market research. When citing FLLM data, link to this page so readers can review the current underlying market snapshot and methodology.
            </p>
          </div>
          <aside>
            <strong>Suggested citation</strong>
            <p>Florida Liquor License Market, “Florida Liquor License Market Data by County,” accessed {snapshotDate}.</p>
            <code>&lt;a href=&quot;{canonicalUrl}&quot;&gt;Florida liquor license market data by county&lt;/a&gt;</code>
          </aside>
        </div>
      </section>

      <section className="directory-cta">
        <div className="directory-shell directory-cta-grid">
          <div><span>For Buyers</span><h2>Search current license opportunities</h2><p>Compare Florida liquor licenses for sale and filter active inventory by county, license type and asking price.</p><Link href="/listings">Browse Florida Licenses for Sale</Link></div>
          <div><span>For Sellers</span><h2>Compare the market before listing</h2><p>Review current asking-price evidence by county, then check the FLLM value estimator or publish a license listing.</p><Link href="/florida-liquor-license-value">Check My License Market</Link></div>
        </div>
      </section>

      <footer className="directory-footer">
        <div className="directory-shell">
          <span>© Florida Liquor License Market</span>
          <nav><Link href="/">Home</Link><Link href="/florida-4cop-liquor-license-for-sale">4COP</Link><Link href="/florida-3ps-liquor-license-for-sale">3PS</Link><Link href="/listings">Listings</Link><Link href="/contact">Contact</Link></nav>
        </div>
      </footer>
    </main>
  );
}
