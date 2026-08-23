import type { Metadata } from "next";
import Link from "next/link";

import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import { buildFloridaMarketIndex, type MarketPriceStats } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "./market-index.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-market-index`;
const csvUrl = `${siteUrl}/api/florida-liquor-license-market-index.csv`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Florida Liquor License Market Index | 4COP & 3PS Prices",
  description:
    "Track Florida quota liquor-license asking prices, 4COP and 3PS supply, active inventory, county rankings and market data across all 67 Florida counties.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Market Index",
    description:
      "A statewide data reference for current Florida 4COP and 3PS asking prices, active inventory, county rankings and quota-license supply.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor License Market Index",
    description: "Current Florida quota liquor-license market data across all 67 counties.",
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

function range(stats: MarketPriceStats) {
  if (stats.low === null || stats.high === null) return "No disclosed asks";
  if (stats.low === stats.high) return money(stats.low);
  return `${money(stats.low)}–${money(stats.high)}`;
}

function MarketTypeCard({
  title,
  count,
  stats,
}: {
  title: string;
  count: number;
  stats: MarketPriceStats;
}) {
  return (
    <article className="index-type-card">
      <span>{title}</span>
      <strong>{money(stats.median)}</strong>
      <small>Median disclosed asking price</small>
      <dl>
        <div><dt>Active inventory</dt><dd>{count}</dd></div>
        <div><dt>Disclosed asks</dt><dd>{stats.count}</dd></div>
        <div><dt>Current range</dt><dd>{range(stats)}</dd></div>
      </dl>
    </article>
  );
}

export default async function FloridaLiquorLicenseMarketIndexPage() {
  const listings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const snapshot = buildFloridaMarketIndex(listings);
  const currentDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());

  const byInventory = [...snapshot.countyRows]
    .filter((row) => row.activeListings > 0)
    .sort((a, b) => b.activeListings - a.activeListings || a.county.localeCompare(b.county))
    .slice(0, 10);

  const evidenceMarkets = snapshot.countyRows.filter((row) => row.all.count >= 2 && row.all.median !== null);
  const highestMedian = [...evidenceMarkets]
    .sort((a, b) => (b.all.median ?? 0) - (a.all.median ?? 0))
    .slice(0, 8);
  const lowestMedian = [...evidenceMarkets]
    .sort((a, b) => (a.all.median ?? Number.MAX_SAFE_INTEGER) - (b.all.median ?? Number.MAX_SAFE_INTEGER))
    .slice(0, 8);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: `Florida Liquor License Market Index — ${snapshot.snapshotLabel}`,
      description:
        "Current Florida quota liquor-license asking-price and inventory data by county and license type, including 4COP and 3PS market statistics.",
      url: canonicalUrl,
      dateModified: snapshot.generatedAt,
      creator: { "@type": "Organization", name: "Florida Liquor License Market", url: siteUrl },
      spatialCoverage: { "@type": "Place", name: "Florida, United States" },
      variableMeasured: [
        "Active quota liquor-license listings",
        "Disclosed asking price",
        "4COP inventory",
        "3PS inventory",
        "County median asking price",
        "County population",
        "Quota drawing availability",
      ],
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
        { "@type": "ListItem", position: 2, name: "Florida Market Index", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="market-index-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <header className="index-header index-shell">
        <Link className="index-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="Market index navigation">
          <Link href="/florida-liquor-licenses-for-sale">Licenses for Sale</Link>
          <Link href="/counties">County Data</Link>
          <Link href="/research">Research</Link>
          <Link className="index-nav-cta" href={csvUrl}>Download CSV</Link>
        </nav>
      </header>

      <section className="index-hero">
        <div className="index-shell index-hero-grid">
          <div>
            <span className="index-kicker">FLLM Statewide Data Series</span>
            <h1>Florida Liquor License Market Index</h1>
            <p>
              A continuously updated view of Florida quota liquor-license supply and disclosed asking prices across all 67 counties, separated by 4COP and 3PS license categories.
            </p>
            <div className="index-hero-actions">
              <a className="index-button index-button-gold" href="#county-index">Explore County Rankings</a>
              <Link className="index-button index-button-dark" href="/research">Methodology &amp; Research</Link>
              <a className="index-button index-button-dark" href={csvUrl}>Download Current CSV</a>
            </div>
          </div>
          <aside className="index-snapshot-card">
            <span>{snapshot.snapshotLabel}</span>
            <strong>{money(snapshot.statewide.median)}</strong>
            <small>Statewide median disclosed ask</small>
            <dl>
              <div><dt>Active listings</dt><dd>{snapshot.activeListings}</dd></div>
              <div><dt>Counties with inventory</dt><dd>{snapshot.countiesWithInventory}</dd></div>
              <div><dt>Disclosed asking prices</dt><dd>{snapshot.disclosedAsks}</dd></div>
            </dl>
            <p>Snapshot generated {currentDate}. Asking prices are not verified closed-sale prices.</p>
          </aside>
        </div>
      </section>

      <section className="index-summary index-shell" aria-label="Statewide liquor license market summary">
        <article><span>Active Marketplace Listings</span><strong>{snapshot.activeListings}</strong></article>
        <article><span>Counties with Inventory</span><strong>{snapshot.countiesWithInventory}</strong></article>
        <article><span>4COP Supply</span><strong>{snapshot.fourCopCount}</strong></article>
        <article><span>3PS Supply</span><strong>{snapshot.threePsCount}</strong></article>
        <article><span>2026 New Quota Licenses</span><strong>{snapshot.quotaDrawingLicenses}</strong></article>
      </section>

      <section className="index-types index-shell">
        <div className="index-section-heading">
          <div><span>License-Type Market</span><h2>4COP vs. 3PS asking-price evidence</h2></div>
          <p>Statistics use active FLLM marketplace inventory with disclosed asking prices.</p>
        </div>
        <div className="index-type-grid">
          <MarketTypeCard title="4COP Quota" count={snapshot.fourCopCount} stats={snapshot.fourCop} />
          <MarketTypeCard title="3PS Quota / Package Store" count={snapshot.threePsCount} stats={snapshot.threePs} />
        </div>
      </section>

      <section className="index-rankings" id="county-index">
        <div className="index-shell">
          <div className="index-section-heading">
            <div><span>County Rankings</span><h2>Where the active market is concentrated</h2></div>
            <p>Median rankings require at least two disclosed active asking prices in the county.</p>
          </div>
          <div className="index-ranking-grid">
            <article>
              <h3>Most active county markets</h3>
              <ol>
                {byInventory.map((row) => (
                  <li key={row.slug}>
                    <Link href={`/counties/${row.slug}`}><span>{row.county}</span><strong>{row.activeListings} active</strong></Link>
                  </li>
                ))}
              </ol>
            </article>
            <article>
              <h3>Highest median asking markets</h3>
              {highestMedian.length ? (
                <ol>
                  {highestMedian.map((row) => (
                    <li key={row.slug}>
                      <Link href={`/counties/${row.slug}`}><span>{row.county}</span><strong>{money(row.all.median)}</strong></Link>
                    </li>
                  ))}
                </ol>
              ) : <p className="index-empty">Not enough multi-listing county evidence yet.</p>}
            </article>
            <article>
              <h3>Lowest median asking markets</h3>
              {lowestMedian.length ? (
                <ol>
                  {lowestMedian.map((row) => (
                    <li key={row.slug}>
                      <Link href={`/counties/${row.slug}`}><span>{row.county}</span><strong>{money(row.all.median)}</strong></Link>
                    </li>
                  ))}
                </ol>
              ) : <p className="index-empty">Not enough multi-listing county evidence yet.</p>}
            </article>
          </div>
        </div>
      </section>

      <section className="index-county-table index-shell">
        <div className="index-section-heading">
          <div><span>All 67 Florida Counties</span><h2>Current county market index</h2></div>
          <a href={csvUrl}>Download table as CSV ›</a>
        </div>
        <div className="index-table-wrap">
          <table>
            <thead>
              <tr>
                <th>County</th>
                <th>Population</th>
                <th>Active</th>
                <th>4COP</th>
                <th>3PS</th>
                <th>Median Ask</th>
                <th>Asking Range</th>
                <th>2026 New Quota</th>
              </tr>
            </thead>
            <tbody>
              {snapshot.countyRows.map((row) => (
                <tr key={row.slug}>
                  <td><Link href={`/counties/${row.slug}`}><strong>{row.county}</strong><small>{row.cities.slice(0, 3).join(" · ") || "County market"}</small></Link></td>
                  <td>{row.population?.toLocaleString("en-US") ?? "—"}</td>
                  <td>{row.activeListings}</td>
                  <td>{row.fourCopCount}</td>
                  <td>{row.threePsCount}</td>
                  <td><strong>{money(row.all.median)}</strong><small>{row.all.count ? `${row.all.count} disclosed ask${row.all.count === 1 ? "" : "s"}` : "No disclosed ask"}</small></td>
                  <td>{range(row.all)}</td>
                  <td>{row.quotaDrawingLicenses || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="index-history">
        <div className="index-shell index-history-grid">
          <article>
            <span>Historical Series</span>
            <h2>Market-index baseline established</h2>
            <p>
              FLLM is establishing a month-over-month market series beginning with the current live index. Historical percentage changes will only be published after comparable archived snapshots exist; FLLM will not infer or manufacture earlier price changes.
            </p>
          </article>
          <aside>
            <strong>Current baseline</strong>
            <span>{snapshot.snapshotLabel}</span>
            <p>Future editions can compare inventory, median disclosed asks and 4COP/3PS supply against this baseline.</p>
          </aside>
        </div>
      </section>

      <section className="index-methodology index-shell">
        <div className="index-section-heading"><div><span>Methodology</span><h2>How to interpret the FLLM Market Index</h2></div></div>
        <div className="index-method-grid">
          <article><b>01</b><strong>Active marketplace inventory</strong><p>Counts use currently available FLLM marketplace listings. Listings can be added, repriced, withdrawn or sold at any time.</p></article>
          <article><b>02</b><strong>Asking prices, not closings</strong><p>Medians and ranges use disclosed advertised asking prices. They are not appraisals, verified sale prices or guarantees of value.</p></article>
          <article><b>03</b><strong>County-specific evidence</strong><p>Florida quota licenses are county-specific. Statewide statistics are directional context; a specific transaction should rely on exact-county and exact-license-type evidence.</p></article>
          <article><b>04</b><strong>Regulatory context</strong><p>Quota drawing data comes from DBPR/ABT. The 2026 drawing column describes announced availability, not issued or transferable licenses.</p><a href={QUOTA_DRAWING_2026.sourceNoticeUrl} target="_blank" rel="noopener noreferrer">Official DBPR notice ↗</a></article>
        </div>
      </section>

      <section className="index-citation">
        <div className="index-shell index-citation-grid">
          <div>
            <span>For attorneys, lenders, brokers, researchers &amp; journalists</span>
            <h2>Cite the current Florida market snapshot</h2>
            <p>Link to this page when referencing FLLM market statistics so readers can see the live data, methodology and limitations behind the figures.</p>
            <Link href="/research">Open the FLLM research &amp; citation center ›</Link>
          </div>
          <aside>
            <strong>Suggested citation</strong>
            <p>{`Florida Liquor License Market, “Florida Liquor License Market Index — ${snapshot.snapshotLabel},” accessed ${currentDate}.`}</p>
            <code>{canonicalUrl}</code>
          </aside>
        </div>
      </section>

      <footer className="index-footer">
        <div className="index-shell">
          <span>© Florida Liquor License Market</span>
          <nav><Link href="/counties">County Data</Link><Link href="/research">Research</Link><Link href="/florida-liquor-licenses-for-sale">Licenses for Sale</Link><Link href="/contact">Contact</Link></nav>
        </div>
      </footer>
    </main>
  );
}
