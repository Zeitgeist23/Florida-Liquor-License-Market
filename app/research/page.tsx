import type { Metadata } from "next";
import Link from "next/link";

import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import { buildFloridaMarketIndex } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "./research-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/research`;
const marketIndexUrl = `${siteUrl}/florida-liquor-license-market-index`;
const csvUrl = `${siteUrl}/api/florida-liquor-license-market-index.csv`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Florida Liquor License Data & Research | FLLM",
  description:
    "Research Florida liquor-license asking prices, county market data, 4COP and 3PS supply, quota drawing information, fees and FLLM market methodology.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Data & Research",
    description:
      "FLLM data resources for attorneys, lenders, brokers, restaurant professionals, researchers and journalists.",
    siteName: "Florida Liquor License Market",
  },
};

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function ResearchPage() {
  const listings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const snapshot = buildFloridaMarketIndex(listings);
  const currentDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Florida Liquor License Data & Research",
    url: canonicalUrl,
    description:
      "Research hub for Florida quota liquor-license asking-price data, active inventory, county statistics, quota drawing information and regulatory resources.",
    isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    mainEntity: {
      "@type": "Dataset",
      name: "Florida Liquor License Market Index",
      url: marketIndexUrl,
      dateModified: snapshot.generatedAt,
      distribution: {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: csvUrl,
      },
    },
  };

  return (
    <main className="research-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema).replaceAll("<", "\\u003c") }} />

      <header className="research-header research-shell">
        <Link className="research-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="Research navigation">
          <Link href="/florida-liquor-license-market-index">Market Index</Link>
          <Link href="/counties">County Data</Link>
          <Link href="/resources/license-fees">License Fees</Link>
          <Link href="/florida-liquor-license-lottery">Quota Lottery</Link>
        </nav>
      </header>

      <section className="research-hero">
        <div className="research-shell research-hero-grid">
          <div>
            <span>FLLM Research Center</span>
            <h1>Florida Liquor License Data &amp; Research</h1>
            <p>
              A source-transparent research hub for Florida quota liquor-license inventory, asking prices, county markets, regulatory references and downloadable market data.
            </p>
            <div className="research-actions">
              <Link href="/florida-liquor-license-market-index">Open Market Index</Link>
              <a href={csvUrl}>Download Current CSV</a>
            </div>
          </div>
          <aside>
            <strong>{snapshot.snapshotLabel}</strong>
            <dl>
              <div><dt>Active marketplace listings</dt><dd>{snapshot.activeListings}</dd></div>
              <div><dt>Counties with inventory</dt><dd>{snapshot.countiesWithInventory}</dd></div>
              <div><dt>Median disclosed ask</dt><dd>{money(snapshot.statewide.median)}</dd></div>
            </dl>
            <p>Current asking-price snapshot; not a certified appraisal or verified closed-sale database.</p>
          </aside>
        </div>
      </section>

      <section className="research-library research-shell">
        <div className="research-heading">
          <span>Reference Library</span>
          <h2>Link-worthy Florida liquor-license resources</h2>
          <p>Each resource is designed to give professionals and researchers a specific source page to cite rather than relying on generic marketing copy.</p>
        </div>
        <div className="research-card-grid">
          <Link href="/florida-liquor-license-market-index"><b>01</b><strong>Florida Liquor License Market Index</strong><p>Statewide 4COP and 3PS inventory, disclosed asking-price medians, county rankings and downloadable CSV data.</p><span>Open index ›</span></Link>
          <Link href="/counties"><b>02</b><strong>All 67 County Markets</strong><p>County population, active inventory, 4COP and 3PS asking-price evidence and local market pages.</p><span>Browse county data ›</span></Link>
          <Link href="/florida-liquor-license-lottery"><b>03</b><strong>Quota Drawing Data</strong><p>Current Florida quota drawing information with official DBPR references and county availability.</p><span>View quota data ›</span></Link>
          <Link href="/resources/license-fees"><b>04</b><strong>Florida Liquor License Fees</strong><p>Reference material for state license fees and related regulatory costs.</p><span>Review fees ›</span></Link>
          <Link href="/florida-liquor-license-value"><b>05</b><strong>Market Value Evidence</strong><p>FLLM estimator and county valuation guides based on current asking-price comparables.</p><span>Open value center ›</span></Link>
          <Link href="/resources/forms"><b>06</b><strong>Florida ABT Forms</strong><p>FLLM access to commonly used Florida alcoholic-beverage licensing and transfer forms.</p><span>Browse forms ›</span></Link>
        </div>
      </section>

      <section className="research-methodology">
        <div className="research-shell">
          <div className="research-heading">
            <span>Data Methodology</span>
            <h2>What FLLM measures—and what it does not</h2>
          </div>
          <div className="research-method-grid">
            <article><strong>Active inventory</strong><p>FLLM counts listings currently displayed as available in the marketplace. Inventory can change whenever a listing is added, withdrawn, repriced or sold.</p></article>
            <article><strong>Disclosed asking prices</strong><p>Median and range statistics use disclosed advertised asking prices. Undisclosed-price listings remain in inventory counts but are excluded from price calculations.</p></article>
            <article><strong>County and type separation</strong><p>Market evidence is grouped by county and license category because Florida quota licenses are county-specific and 4COP and 3PS interests may serve different buyers.</p></article>
            <article><strong>No invented historical series</strong><p>FLLM will publish month-over-month changes only after comparable archived snapshots exist. Earlier price changes are not inferred from present-day listings.</p></article>
          </div>
        </div>
      </section>

      <section className="research-sources research-shell">
        <div className="research-heading">
          <span>Source Transparency</span>
          <h2>Primary and marketplace sources</h2>
        </div>
        <div className="research-source-grid">
          <article>
            <strong>Florida DBPR / ABT</strong>
            <p>Regulatory and quota-license references are linked to the Florida Department of Business and Professional Regulation, Division of Alcoholic Beverages and Tobacco.</p>
            <a href={QUOTA_DRAWING_2026.dbprHomeUrl} target="_blank" rel="noopener noreferrer">DBPR / ABT ↗</a>
          </article>
          <article>
            <strong>Official quota drawing notice</strong>
            <p>The current quota drawing county and license counts come from the official DBPR notice, last verified {QUOTA_DRAWING_2026.lastVerified}.</p>
            <a href={QUOTA_DRAWING_2026.sourceNoticeUrl} target="_blank" rel="noopener noreferrer">Official notice ↗</a>
          </article>
          <article>
            <strong>U.S. Census Bureau</strong>
            <p>County population context uses Vintage 2024 county estimates, separate from FLLM's marketplace inventory calculations.</p>
            <a href="https://www.census.gov/programs-surveys/popest.html" target="_blank" rel="noopener noreferrer">Population Estimates ↗</a>
          </article>
          <article>
            <strong>FLLM marketplace inventory</strong>
            <p>Current asking-price statistics are computed from available marketplace listings and direct submissions with disclosed prices.</p>
            <Link href="/florida-liquor-licenses-for-sale">Browse current licenses ›</Link>
          </article>
        </div>
      </section>

      <section className="research-citation">
        <div className="research-shell research-citation-grid">
          <div>
            <span>For Attorneys, Lenders, Brokers &amp; Media</span>
            <h2>How to cite FLLM market data</h2>
            <p>
              You may reference FLLM market statistics in professional, editorial or research material when the statistic is attributed to Florida Liquor License Market, the snapshot date is identified, and readers are linked to the underlying source page.
            </p>
            <p>
              Because marketplace asking prices can change, use a dated citation and avoid describing an FLLM asking-price statistic as a verified closed-sale price or certified appraisal.
            </p>
          </div>
          <aside>
            <strong>Suggested Market Index citation</strong>
            <p>{`Florida Liquor License Market, “Florida Liquor License Market Index — ${snapshot.snapshotLabel},” accessed ${currentDate}.`}</p>
            <code>{marketIndexUrl}</code>
            <a href={csvUrl}>Download supporting CSV ›</a>
          </aside>
        </div>
      </section>

      <section className="research-outreach research-shell">
        <div className="research-heading">
          <span>Professional Use</span>
          <h2>Useful reasons to link to FLLM</h2>
        </div>
        <div className="research-use-grid">
          <article><strong>Attorneys &amp; CPAs</strong><p>Link clients to current county market evidence, forms, fee references and DBPR source material without presenting a market snapshot as legal or valuation advice.</p></article>
          <article><strong>Restaurant consultants</strong><p>Use county inventory and 4COP/3PS supply data as a starting point for operators researching Florida markets.</p></article>
          <article><strong>Lenders</strong><p>Reference current advertised market evidence while conducting independent collateral, lien and transaction diligence.</p></article>
          <article><strong>Journalists &amp; researchers</strong><p>Use the Market Index and downloadable county CSV as a dated source for stories about quota-license supply and advertised pricing.</p></article>
        </div>
      </section>

      <section className="research-contact">
        <div className="research-shell">
          <div><span>Data Question or Correction?</span><h2>Help keep the reference accurate</h2><p>If you identify a listing, regulatory source or market statistic that should be reviewed, contact FLLM and include the page or data point involved.</p></div>
          <Link href="/contact">Contact FLLM</Link>
        </div>
      </section>

      <footer className="research-footer">
        <div className="research-shell"><span>© Florida Liquor License Market</span><nav><Link href="/florida-liquor-license-market-index">Market Index</Link><Link href="/counties">County Data</Link><Link href="/florida-liquor-licenses-for-sale">Listings</Link><Link href="/contact">Contact</Link></nav></div>
      </footer>
    </main>
  );
}
