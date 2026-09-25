import Link from "next/link";

import { countyPopulations2024 } from "@/data/county-populations-2024";
import type { FloridaCounty } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import { countyValuationGuideHref } from "@/data/county-valuation-guides";
import { marketPriceStats } from "@/lib/florida-market-index";
import { listingPageHref } from "@/lib/listing-page-urls";
import "./CountyMarketDataPanel.css";
import "@/app/county-approved-tone-refine.css";
import "./CountyMarketDataPanel-readability.css";


type CountyLocalMarketPhoto = {
  city: string;
  src: string;
  alt: string;
  population: number;
  quotaEquivalent: number;
};

const countyLocalMarketPhotos: Record<string, CountyLocalMarketPhoto[]> = {
  pinellas: [
    {
      city: "St. Petersburg",
      src: "data:image/webp;base64,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",
      alt: "Generated scenic St. Petersburg waterfront skyline and marina",
      population: 264033,
      quotaEquivalent: 35,
    },
    {
      city: "Clearwater",
      src: "data:image/webp;base64,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",
      alt: "Generated Clearwater beachfront and Gulf Coast skyline",
      population: 114364,
      quotaEquivalent: 15,
    },
    {
      city: "Largo",
      src: "data:image/webp;base64,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",
      alt: "Generated landscaped Largo civic and town-center scene",
      population: 80690,
      quotaEquivalent: 10,
    },
    {
      city: "Dunedin",
      src: "data:image/webp;base64,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",
      alt: "Generated Dunedin waterfront promenade and downtown scene",
      population: 35227,
      quotaEquivalent: 4,
    },
  ],
};

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
  const countyInventoryHref = `/counties/${county.slug}#available-licenses`;
  const snapshotDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date());
  const evidenceListings = listings.filter((listing) => listing.sourceRef);
  const localMarketPhotos = countyLocalMarketPhotos[county.slug] ?? [];

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
        <article className={localMarketPhotos.length ? "county-data-local-markets county-data-local-markets--photos" : "county-data-local-markets"}>
          <span>Primary local markets</span>
          {localMarketPhotos.length ? (
            <>
              <div className="county-city-photo-grid" aria-label={`Primary cities and local markets in ${county.name}`}>
                {localMarketPhotos.map((photo) => (
                  <figure className="county-city-photo-card" key={photo.city}>
                    <strong className="county-city-photo-name">{photo.city}</strong>
                    <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                    <figcaption>
                      <span><small>Population</small><b>{photo.population.toLocaleString("en-US")}</b></span>
                      <span><small>Est. quota equivalent*</small><b>{photo.quotaEquivalent}</b></span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="county-city-photo-summary">
                U.S. Census Bureau Vintage 2025 city population estimates. *Quota licenses are allocated at the county level under Florida law; the city figures shown are population-equivalents calculated as population ÷ 7,500, not DBPR city allocations.
              </p>
            </>
          ) : (
            <>
              <h3>{county.primaryCities.length ? county.primaryCities.join(" · ") : county.name.replace(" County", "")}</h3>
              <p>{county.marketOverview}</p>
            </>
          )}
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
            <Link href={countyInventoryHref}>View all {county.name} liquor licenses for sale ›</Link>
          </div>
          <div className="county-data-evidence-grid">
            {evidenceListings.map((listing) => (
              <Link
                key={listing.sourceRef}
                href={listingPageHref(listing)}
                aria-label={`View ${county.name} ${listing.type} offered at ${listing.priceLabel}, reference ${listing.sourceRef}`}
              >
                <span>{listing.sourceRef}</span>
                <strong>{listing.type}</strong>
                <b>{listing.priceLabel}</b>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="county-data-links">
        <Link href={countyInventoryHref}>Browse {county.name} liquor licenses for sale</Link>
        {hasValuationGuide ? <Link href={countyValuationGuideHref(county.slug)}>Review {county.name} valuation evidence</Link> : null}
        <Link href="/florida-liquor-license-market-index">Compare all 67 counties</Link>
        <Link href="/research">Data methodology &amp; citation guide</Link>
      </div>

      <div className="county-data-links" aria-label={`${county.name} liquor license types`}>
        <Link href="/license-types/4cop-quota">{county.name} 4COP quota liquor license</Link>
        <Link href="/license-types/3ps-package-store">{county.name} 3PS quota / package store license</Link>
        <Link href="/resources/florida-liquor-license-types">Florida liquor license types guide</Link>
      </div>

      <p className="county-data-history-note">
        Historical change tracking begins with the FLLM Market Index baseline. FLLM will publish month-over-month changes only after comparable archived snapshots exist; earlier price changes are not inferred from current listings.
      </p>
    </section>
  );
}