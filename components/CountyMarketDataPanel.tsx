import Link from "next/link";

import { countyPopulations2024 } from "@/data/county-populations-2024";
import type { FloridaCounty } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import { countyValuationGuideHref } from "@/data/county-valuation-guides";
import { marketPriceStats } from "@/lib/florida-market-index";
import { listingPageHref } from "@/lib/listing-page-urls";
import "./CountyMarketDataPanel.css";

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function marketRange(values: Array<number | null>) {
  const stats = marketPriceStats(values);
  if (stats.low === null || stats.high === null) return "No disclosed asks";
  return stats.low === stats.high ? money(stats.low) : `${money(stats.low)}–${money(stats.high)}`;
}

function dbprCountyName(value: string) {
  return value === "Dade" ? "Miami-Dade County" : `${value} County`;
}

export default function CountyMarketDataPanel({
  county,
  listings,
  hasValuationGuide,
}: {
  county: FloridaCounty;
  listings: Listing[];
  hasValuationGuide: boolean;
}) {
  const fourCop = listings.filter((listing) => listing.type === "4COP Quota");
  const threePs = listings.filter((listing) => listing.type === "3PS Quota / Package Store");
  const allStats = marketPriceStats(listings.map((listing) => listing.price));
  const fourCopStats = marketPriceStats(fourCop.map((listing) => listing.price));
  const threePsStats = marketPriceStats(threePs.map((listing) => listing.price));
  const population = countyPopulations2024[county.name] ?? null;
  const drawingLicenses = QUOTA_DRAWING_2026.counties.find(
    (item) => dbprCountyName(item.county) === county.name,
  )?.licenses ?? 0;
  const filteredListingsHref = `/listings?county=${encodeURIComponent(county.name)}&status=available`;
  const snapshotDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());
  const evidenceListings = listings.filter((listing) => listing.sourceRef).slice(0, 5);

  return (
    <section className="county-data-panel county-shell" aria-labelledby="county-data-title">
      <div className="county-data-heading">
        <div>
          <span>FLLM County Market Data</span>
          <h2 id="county-data-title">{county.name} liquor-license market snapshot</h2>
          <p>
            Live inventory, disclosed asking-price evidence, population context and DBPR quota information for {county.name}. Snapshot: {snapshotDate}.
          </p>
        </div>
        <Link href="/florida-liquor-license-market-index">Florida Market Index ›</Link>
      </div>

      <div className="county-data-grid">
        <article>
          <span>County population</span>
          <strong>{population?.toLocaleString("en-US") ?? "—"}</strong>
          <small>U.S. Census Vintage 2024 estimate</small>
        </article>
        <article>
          <span>Active inventory</span>
          <strong>{listings.length}</strong>
          <small>{fourCop.length} 4COP · {threePs.length} 3PS</small>
        </article>
        <article>
          <span>Median disclosed ask</span>
          <strong>{money(allStats.median)}</strong>
          <small>{allStats.count} disclosed ask{allStats.count === 1 ? "" : "s"}</small>
        </article>
        <article>
          <span>Current asking range</span>
          <strong className="county-data-range">{marketRange(listings.map((listing) => listing.price))}</strong>
          <small>Active disclosed asking prices</small>
        </article>
        <article>
          <span>2026 new quota</span>
          <strong>{drawingLicenses || "—"}</strong>
          <small>Official DBPR drawing notice</small>
        </article>
      </div>

      <div className="county-data-type-grid">
        <article>
          <div><span>4COP Quota market</span><strong>{fourCop.length} active</strong></div>
          <dl>
            <div><dt>Median ask</dt><dd>{money(fourCopStats.median)}</dd></div>
            <div><dt>Disclosed asks</dt><dd>{fourCopStats.count}</dd></div>
            <div><dt>Current range</dt><dd>{marketRange(fourCop.map((listing) => listing.price))}</dd></div>
          </dl>
        </article>
        <article>
          <div><span>3PS Quota / Package Store market</span><strong>{threePs.length} active</strong></div>
          <dl>
            <div><dt>Median ask</dt><dd>{money(threePsStats.median)}</dd></div>
            <div><dt>Disclosed asks</dt><dd>{threePsStats.count}</dd></div>
            <div><dt>Current range</dt><dd>{marketRange(threePs.map((listing) => listing.price))}</dd></div>
          </dl>
        </article>
      </div>

      <div className="county-data-context-grid">
        <article>
          <span>Primary local markets</span>
          <h3>{county.primaryCities.length ? county.primaryCities.join(" · ") : county.name.replace(" County", "")}</h3>
          <p>{county.marketOverview}</p>
        </article>
        <aside>
          <span>Regulatory context</span>
          <h3>Florida DBPR / ABT</h3>
          <p>
            Quota licenses are county-specific. A buyer should independently confirm license status, category, liens, transfer eligibility, premises, zoning and other regulatory requirements.
          </p>
          <a href={QUOTA_DRAWING_2026.quotaInformationUrl} target="_blank" rel="noopener noreferrer">DBPR quota-license information ↗</a>
          <a href={QUOTA_DRAWING_2026.sourceNoticeUrl} target="_blank" rel="noopener noreferrer">2026 official drawing notice ↗</a>
          <small>Drawing data last verified {QUOTA_DRAWING_2026.lastVerified}.</small>
        </aside>
      </div>

      {evidenceListings.length ? (
        <div className="county-data-evidence">
          <div className="county-data-evidence-heading">
            <div><span>Current Market Evidence</span><h3>Live {county.name} listing references</h3></div>
            <Link href={filteredListingsHref}>View all county listings ›</Link>
          </div>
          <div className="county-data-evidence-grid">
            {evidenceListings.map((listing) => (
              <Link key={listing.sourceRef} href={listingPageHref(listing)}>
                <span>{listing.sourceRef}</span>
                <strong>{listing.type}</strong>
                <b>{listing.priceLabel}</b>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="county-data-links">
        <Link href={filteredListingsHref}>Browse {county.name} licenses for sale</Link>
        {hasValuationGuide ? <Link href={countyValuationGuideHref(county.slug)}>Review {county.name} valuation evidence</Link> : null}
        <Link href="/florida-liquor-license-market-index">Compare all 67 counties</Link>
        <Link href="/research">Data methodology &amp; citation guide</Link>
      </div>

      <p className="county-data-history-note">
        Historical change tracking begins with the FLLM Market Index baseline. FLLM will publish month-over-month changes only after comparable archived snapshots exist; earlier price changes are not inferred from current listings.
      </p>
    </section>
  );
}
