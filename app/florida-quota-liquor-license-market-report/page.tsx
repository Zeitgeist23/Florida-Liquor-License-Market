import type { Metadata } from "next";
import Link from "next/link";

import { buildFloridaMarketIndex } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "./market-report.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-quota-liquor-license-market-report`;
const marketIndexUrl = `${siteUrl}/florida-liquor-license-market-index`;
const csvUrl = `${siteUrl}/api/florida-liquor-license-market-index.csv`;

export const dynamic = "force-dynamic";

function currentMonthLabel() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());
}

export function generateMetadata(): Metadata {
  const month = currentMonthLabel();
  const title = `Florida Quota Liquor License Market Report | ${month}`;
  const description = `Current ${month} Florida quota liquor-license market report covering 4COP and 3PS inventory, disclosed asking prices, county activity and statewide market evidence.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      siteName: "Florida Liquor License Market",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function priceRange(low: number | null, high: number | null) {
  if (low === null || high === null) return "No disclosed range";
  if (low === high) return money(low);
  return `${money(low)}–${money(high)}`;
}

export default async function FloridaQuotaLiquorLicenseMarketReportPage() {
  const listings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const snapshot = buildFloridaMarketIndex(listings);
  const currentDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());

  const activeMarkets = [...snapshot.countyRows]
    .filter((row) => row.activeListings > 0)
    .sort((a, b) => b.activeListings - a.activeListings || a.county.localeCompare(b.county))
    .slice(0, 10);

  const pricedMarkets = snapshot.countyRows
    .filter((row) => row.all.count >= 2 && row.all.median !== null)
    .sort((a, b) => (b.all.median ?? 0) - (a.all.median ?? 0))
    .slice(0, 8);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Florida Quota Liquor License Market Report — ${snapshot.snapshotLabel}`,
      description:
        "A recurring Florida market report covering current 4COP and 3PS quota liquor-license inventory, disclosed asking prices, county activity and methodology.",
      url: canonicalUrl,
      dateModified: snapshot.generatedAt,
      datePublished: snapshot.generatedAt,
      author: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      publisher: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      mainEntityOfPage: canonicalUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: `Florida Quota Liquor License Market Report — ${snapshot.snapshotLabel}`,
      description:
        "Current Florida quota liquor-license inventory and disclosed asking-price evidence by county and license type.",
      url: marketIndexUrl,
      dateModified: snapshot.generatedAt,
      creator: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      spatialCoverage: { "@type": "Place", name: "Florida, United States" },
      distribution: {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: csvUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Quota Liquor License Market Report", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="quota-market-report">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <header className="quota-report-header quota-report-shell">
        <Link className="quota-report-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="Market report navigation">
          <Link href="/listings">Licenses for Sale</Link>
          <Link href="/counties">County Data</Link>
          <Link href="/florida-liquor-license-market-index">Market Index</Link>
          <Link className="quota-report-nav-cta" href="/research">Research</Link>
        </nav>
      </header>

      <section className="quota-report-hero">
        <div className="quota-report-shell quota-report-hero-grid">
          <div>
            <span className="quota-report-kicker">FLLM Monthly Market Intelligence</span>
            <h1>Florida Quota Liquor License Market Report</h1>
            <p className="quota-report-date">{snapshot.snapshotLabel} edition · Updated {currentDate}</p>
            <p className="quota-report-lead">
              This recurring report tracks current Florida 4COP and 3PS quota liquor-license inventory, disclosed asking prices and county-level market activity. It is designed as a citable market reference for buyers, sellers, brokers, attorneys, lenders, appraisers, researchers and journalists.
            </p>
            <div className="quota-report-actions">
              <Link href="/listings">Browse current Florida liquor licenses for sale</Link>
              <Link href="/florida-liquor-license-market-index">Open the full 67-county market index</Link>
              <a href={csvUrl}>Download current CSV</a>
            </div>
          </div>
          <aside className="quota-report-snapshot">
            <span>Statewide disclosed median ask</span>
            <strong>{money(snapshot.statewide.median)}</strong>
            <dl>
              <div><dt>Active listings</dt><dd>{snapshot.activeListings}</dd></div>
              <div><dt>Counties with inventory</dt><dd>{snapshot.countiesWithInventory}</dd></div>
              <div><dt>4COP listings</dt><dd>{snapshot.fourCopCount}</dd></div>
              <div><dt>3PS listings</dt><dd>{snapshot.threePsCount}</dd></div>
              <div><dt>Disclosed asks</dt><dd>{snapshot.disclosedAsks}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="quota-report-shell quota-report-types">
        <article>
          <span>4COP Quota</span>
          <strong>{money(snapshot.fourCop.median)}</strong>
          <small>Median disclosed asking price</small>
          <p>{snapshot.fourCopCount} active listings · {priceRange(snapshot.fourCop.low, snapshot.fourCop.high)} disclosed range.</p>
        </article>
        <article>
          <span>3PS Quota / Package Store</span>
          <strong>{money(snapshot.threePs.median)}</strong>
          <small>Median disclosed asking price</small>
          <p>{snapshot.threePsCount} active listings · {priceRange(snapshot.threePs.low, snapshot.threePs.high)} disclosed range.</p>
        </article>
      </section>

      <section className="quota-report-section quota-report-shell">
        <div className="quota-report-heading">
          <div><span>Market Activity</span><h2>Florida counties with the most active inventory</h2></div>
          <p>Current available marketplace listings, ranked by county.</p>
        </div>
        <div className="quota-report-table-wrap">
          <table>
            <thead><tr><th>County</th><th>Active</th><th>4COP</th><th>3PS</th><th>Median Ask</th></tr></thead>
            <tbody>
              {activeMarkets.map((row) => (
                <tr key={row.slug}>
                  <td><Link href={`/counties/${row.slug}`}>{row.county}</Link></td>
                  <td>{row.activeListings}</td>
                  <td>{row.fourCopCount}</td>
                  <td>{row.threePsCount}</td>
                  <td>{money(row.all.median)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="quota-report-section quota-report-shell">
        <div className="quota-report-heading">
          <div><span>Pricing Evidence</span><h2>Higher-median active county markets</h2></div>
          <p>Shown only where at least two active listings have disclosed asking prices.</p>
        </div>
        <div className="quota-report-market-grid">
          {pricedMarkets.length ? pricedMarkets.map((row) => (
            <Link href={`/counties/${row.slug}`} key={row.slug}>
              <span>{row.county}</span>
              <strong>{money(row.all.median)}</strong>
              <small>{row.all.count} disclosed asks · {priceRange(row.all.low, row.all.high)}</small>
            </Link>
          )) : <p>Not enough multi-listing county evidence is available yet.</p>}
        </div>
      </section>

      <section className="quota-report-methodology">
        <div className="quota-report-shell">
          <div className="quota-report-heading">
            <div><span>Methodology</span><h2>What this report measures</h2></div>
          </div>
          <div className="quota-report-method-grid">
            <article><b>01</b><strong>Current marketplace inventory</strong><p>Counts use currently available FLLM marketplace listings. Inventory can change as listings are added, repriced, sold or withdrawn.</p></article>
            <article><b>02</b><strong>Asking prices, not verified closings</strong><p>Price statistics use disclosed advertised asking prices. They are market evidence, not appraisals, guaranteed sale prices or verified transaction values.</p></article>
            <article><b>03</b><strong>County-specific Florida licenses</strong><p>Quota liquor licenses are county-specific. Statewide figures provide context; transaction analysis should use exact-county and exact-license-type evidence.</p></article>
            <article><b>04</b><strong>Recurring series</strong><p>The stable report URL updates with the current monthly edition while the full Market Index and CSV provide the underlying live county-level data.</p></article>
          </div>
        </div>
      </section>

      <section className="quota-report-citation">
        <div className="quota-report-shell quota-report-citation-grid">
          <div>
            <span>Citation &amp; backlink reference</span>
            <h2>Use this report as a source</h2>
            <p>If you reference FLLM inventory, asking-price or county-market statistics in an article, legal memorandum, lending analysis, brokerage page or research report, link to this page so readers can review the current data and methodology.</p>
          </div>
          <aside>
            <strong>Suggested citation</strong>
            <p>{`Florida Liquor License Market, “Florida Quota Liquor License Market Report — ${snapshot.snapshotLabel},” accessed ${currentDate}.`}</p>
            <code>{canonicalUrl}</code>
          </aside>
        </div>
      </section>

      <footer className="quota-report-footer">
        <div className="quota-report-shell">
          <p>Florida Liquor License Market · Statewide marketplace and market-data reference.</p>
          <nav><Link href="/listings">Florida liquor licenses for sale</Link><Link href="/florida-liquor-license-market-index">Market Index</Link><Link href="/research">Research</Link><Link href="/contact">Contact</Link></nav>
        </div>
      </footer>
    </main>
  );
}
