import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";

import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import { indexableCounties } from "@/data/florida-counties";
import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../fllm-official-template.css";
import "../listings/listings-premium.css";
import "../listings/listings-map-size.css";
import "../listings/listings-county-links.css";
import "../listings/listings-navy-refresh.css";
import "../listings/listings-card-gold-borders.css";
import "../listings/listings-regression-fix.css";
import "../listings/listings-conversion-cards.css";
import "../listings/listings-card-overlap-fix.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";
import "./official-template.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-4cop-liquor-license-for-sale`;
const listingsHref = "/listings?type=4COP%20Quota&status=available";

export const dynamic = "force-dynamic";

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

function floridaDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

async function getAvailableMarketplaceListings() {
  return getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
}

async function getFourCopListings() {
  return (await getAvailableMarketplaceListings()).filter(
    (listing) => listing.type === "4COP Quota",
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const availableListings = await getFourCopListings();
  const prices = availableListings
    .map((listing) => listing.price)
    .filter((value): value is number => Number.isFinite(value));
  const countyCount = new Set(availableListings.map((listing) => listing.county)).size;
  const low = prices.length ? Math.min(...prices) : null;
  const high = prices.length ? Math.max(...prices) : null;

  const marketSummary =
    low !== null && high !== null
      ? ` Current disclosed asking prices range from ${money(low)} to ${money(high)}.`
      : "";

  const description = `Browse ${availableListings.length} active Florida 4COP quota liquor licenses for sale across ${countyCount} counties. Compare county markets, current asking prices and live listing details.${marketSummary}`;

  return {
    title: "Florida 4COP Quota Liquor Licenses for Sale | FLLM",
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: "Florida 4COP Quota Liquor Licenses for Sale | FLLM",
      description,
      siteName: "Florida Liquor License Market",
    },
    twitter: {
      card: "summary_large_image",
      title: "Florida 4COP Quota Liquor Licenses for Sale",
      description,
    },
  };
}

export default async function Florida4CopLiquorLicenseForSalePage() {
  const marketplaceListings = await getAvailableMarketplaceListings();
  const availableListings = marketplaceListings.filter(
    (listing) => listing.type === "4COP Quota",
  );
  const marketplaceDisclosedPrices = marketplaceListings
    .map((listing) => listing.price)
    .filter((value): value is number => Number.isFinite(value));
  const marketplaceCountyNames = new Set(marketplaceListings.map((listing) => listing.county));
  const marketplaceLowestPrice = marketplaceDisclosedPrices.length
    ? Math.min(...marketplaceDisclosedPrices)
    : null;
  const marketplaceMedianPrice = median(marketplaceDisclosedPrices);
  const marketplaceHighestPrice = marketplaceDisclosedPrices.length
    ? Math.max(...marketplaceDisclosedPrices)
    : null;

  const updatedLabel = floridaDateLabel();

  const countyStats = indexableCounties
    .map((county) => {
      const listings = availableListings.filter(
        (listing) => listing.county === county.name,
      );
      const prices = listings
        .map((listing) => listing.price)
        .filter((value): value is number => Number.isFinite(value));

      return {
        county,
        count: listings.length,
        low: prices.length ? Math.min(...prices) : null,
        median: median(prices),
        high: prices.length ? Math.max(...prices) : null,
      };
    })
    .filter(({ count }) => count > 0)
    .sort(
      (a, b) =>
        b.count - a.count || a.county.name.localeCompare(b.county.name),
    );

  const previewListings = [...availableListings]
    .sort((a, b) => {
      const aFeatured = a.featuredUntil ? new Date(a.featuredUntil).getTime() : 0;
      const bFeatured = b.featuredUntil ? new Date(b.featuredUntil).getTime() : 0;
      if (bFeatured !== aFeatured) return bFeatured - aFeatured;

      const aPublished = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bPublished = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      if (bPublished !== aPublished) return bPublished - aPublished;

      const byCounty = a.county.localeCompare(b.county);
      if (byCounty !== 0) return byCounty;
      if (a.price === null) return 1;
      if (b.price === null) return -1;
      return a.price - b.price;
    })
    .slice(0, 18);

  const faqs = [
    {
      question: "What is a Florida 4COP quota liquor license?",
      answer:
        "A Florida 4COP quota license is a county-limited full-liquor quota license used for beer, wine and spirits within its approved privileges. It is commonly associated with bars, taverns, cocktail lounges, nightclubs and hospitality concepts that need transferable full-liquor authority. Premises, zoning and state transfer approval still matter.",
    },
    {
      question: "How much does a Florida 4COP quota liquor license cost?",
      answer:
        "There is no single statewide price. Asking prices vary by county, local supply and demand, license status, seller terms and current market conditions. FLLM publishes a live statewide snapshot of disclosed asking prices and county-level inventory on this page.",
    },
    {
      question: "Where can I find Florida 4COP quota liquor licenses for sale?",
      answer:
        "Use the active marketplace inventory on this page to compare 4COP quota licenses by county and asking price. Each listing links to an individual detail page or the county market page so buyers can review current availability before making an inquiry.",
    },
    {
      question: "Can a Florida 4COP quota license be moved to another county?",
      answer:
        "Quota licenses are county-specific. A buyer should acquire a license in the county where it will be used and confirm the proposed ownership, premises and transfer with the Florida Division of Alcoholic Beverages and Tobacco before closing.",
    },
    {
      question: "Does a 4COP quota license have the SRX food-sales requirement?",
      answer:
        "A transferable quota 4COP is not qualified under the special restaurant 51% food-and-nonalcoholic-beverage revenue test merely because it is a 4COP quota license. Local zoning, occupancy, premises and other regulatory requirements can still apply.",
    },
    {
      question: "What is the difference between a 4COP quota license and a 4COP-SFS or SRX license?",
      answer:
        "A 4COP quota license is a transferable county-limited quota license interest. A 4COP-SFS or SRX license is a special restaurant license tied to statutory restaurant qualifications. They should not be treated as the same asset or the same licensing path.",
    },
    {
      question: "Can a Florida 4COP quota license be financed?",
      answer:
        "Financing may be available through banks, private lenders or other transaction structures depending on the buyer, collateral, valuation and lender requirements. FLLM maintains separate financing and appraisal resources for liquor-license transactions.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida 4COP Quota Liquor Licenses for Sale",
      url: canonicalUrl,
      description:
        "Live statewide Florida 4COP quota liquor-license inventory organized by county, asking price and availability.",
      dateModified: new Date().toISOString(),
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida Liquor Licenses for Sale",
          item: `${siteUrl}/listings`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Florida 4COP Quota Liquor Licenses for Sale",
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Active Florida 4COP quota liquor licenses for sale",
      url: canonicalUrl,
      numberOfItems: availableListings.length,
      itemListElement: availableListings.slice(0, 100).map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `Florida 4COP quota liquor license for sale in ${listing.county} — ${listing.priceLabel}`,
        url: `${siteUrl}${listingPageHref(listing)}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main className="seo-market-page fllm-official-page" data-fllm-template="county-v1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />


      <FormsSiteHeader />

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/listings">Florida Liquor Licenses for Sale</Link>
            <span>›</span>
            <strong>Florida 4COP Quota Licenses</strong>
          </div>

          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Live Statewide Full-Liquor Quota Market</span>
              <h1>Florida 4COP Quota Liquor Licenses for Sale</h1>
              <p>
                Compare active Florida 4COP quota liquor licenses for sale across the statewide marketplace. Review current asking prices, county-specific inventory and individual license listings for transferable full-liquor opportunities.
              </p>
              <div className="seo-market-actions">
                <Link
                  className="seo-market-button seo-market-button-gold"
                  href={listingsHref}
                >
                  Browse All Active 4COP Listings
                </Link>
                <Link
                  className="seo-market-button seo-market-button-dark"
                  href="#county-market"
                >
                  Compare 4COP Prices by County
                </Link>
              </div>
              <div className="four-cop-jump-nav" aria-label="4COP page sections">
                <a href="#live-listings">Live Listings</a>
                <a href="#county-market">County Pricing</a>
                <a href="#what-is-4cop">What 4COP Means</a>
                <a href="#buying-process">How to Buy</a>
              </div>
              <p className="four-cop-updated">Marketplace snapshot updated {updatedLabel}.</p>
            </div>

            <aside
              className="seo-market-snapshot"
              aria-label="Current Florida marketplace snapshot"
            >
              <span>Current Florida Marketplace Snapshot</span>
              <div className="seo-market-snapshot-grid">
                <div>
                  <strong>{marketplaceListings.length}</strong>
                  <small>active marketplace listings</small>
                </div>
                <div>
                  <strong>{marketplaceCountyNames.size}</strong>
                  <small>counties with inventory</small>
                </div>
                <div>
                  <strong>{marketplaceLowestPrice === null ? "—" : money(marketplaceLowestPrice)}</strong>
                  <small>lowest disclosed ask</small>
                </div>
                <div>
                  <strong>{marketplaceMedianPrice === null ? "—" : money(marketplaceMedianPrice)}</strong>
                  <small>median disclosed ask</small>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-inventory" id="live-listings">
        <div className="seo-market-shell seo-market-listings-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Live Marketplace Inventory</span>
              <h2>Active Florida 4COP quota liquor licenses currently for sale</h2>
            </div>
            <Link href={listingsHref}>View all active 4COP listings ›</Link>
          </div>
          <p>
            These are current marketplace listings classified as 4COP Quota and available for buyer review. Open an individual listing to see the county, asking price, source information and inquiry options.
          </p>
          <div className="results-page seo-market-preview-results">
            <div className="results-grid">
              {previewListings.map((listing) => (
                <MarketplaceListingCard
                  key={listing.sourceRef ?? `${listing.county}-${listing.price}`}
                  listing={listing}
                  id={listing.sourceRef}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="seo-market-counties" id="county-market">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Statewide 4COP Market Data</span>
              <h2>Florida 4COP quota license prices and inventory by county</h2>
            </div>
            <Link href="/counties">Browse all 67 Florida county markets ›</Link>
          </div>
          <p>
            Florida quota licenses are county-specific, so statewide 4COP pricing is best understood county by county. The table below summarizes currently disclosed asking prices from active FLLM marketplace inventory.
          </p>

          <div className="four-cop-market-table-wrap">
            <table className="four-cop-market-table">
              <thead>
                <tr>
                  <th>County</th>
                  <th>Active 4COP Listings</th>
                  <th>Lowest Ask</th>
                  <th>Median Ask</th>
                  <th>Highest Ask</th>
                </tr>
              </thead>
              <tbody>
                {countyStats.map(({ county, count, low, median: countyMedian, high }) => (
                  <tr key={county.slug}>
                    <td>
                      <Link href={`/counties/${county.slug}`}>{county.name}</Link>
                    </td>
                    <td><strong>{count}</strong></td>
                    <td>{low === null ? "Undisclosed" : money(low)}</td>
                    <td>{countyMedian === null ? "Undisclosed" : money(countyMedian)}</td>
                    <td>{high === null ? "Undisclosed" : money(high)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="four-cop-methodology">
            <strong>How this snapshot is built:</strong> FLLM uses currently visible marketplace listings with an active public listing reference, removes duplicate visible inventory and then calculates disclosed asking-price statistics by county. Sold listings are not counted as active inventory. Asking prices are not completed-sale prices and remain subject to seller confirmation.
          </div>
        </div>
      </section>

      <section className="seo-market-intro" id="what-is-4cop">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Know the License Before You Buy</span>
          <h2>What a Florida 4COP quota liquor license actually is</h2>

          <div className="four-cop-authority-grid">
            <article className="four-cop-authority-card">
              <h3>4COP Quota</h3>
              <p>
                A 4COP quota license is the transferable full-liquor quota license buyers commonly seek for bars, taverns, lounges, nightclubs and other hospitality uses requiring beer, wine and distilled spirits privileges.
              </p>
              <p>
                The quota license is county-specific. Ownership of a license does not by itself guarantee that a proposed premises or location will be approved.
              </p>
              <Link href="/license-types/4cop-quota">Read the complete 4COP quota license guide ›</Link>
            </article>

            <article className="four-cop-authority-card">
              <h3>4COP Quota is not 4COP-SFS / SRX</h3>
              <p>
                A transferable 4COP quota license should not be confused with Florida&apos;s special restaurant 4COP-SFS / SRX license. The special restaurant route depends on statutory restaurant qualifications rather than ownership of a transferable county quota license.
              </p>
              <p>
                A quota 4COP is not subject to the SRX 51% food-and-nonalcoholic-beverage revenue test merely because it is a 4COP quota license.
              </p>
              <Link href="/license-types/4cop-sfs-restaurant">Compare 4COP Quota with 4COP-SFS / SRX ›</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-guide" id="buying-process">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buyer Process</span>
          <h2>How to buy a Florida 4COP quota liquor license</h2>
          <p>
            Start with the county where the license will be used, compare live inventory and asking prices, then verify the specific license and transaction before committing funds.
          </p>
          <div className="seo-market-guide-grid">
            <article className="seo-market-guide-card">
              <span>1</span>
              <h3>Choose the Florida county</h3>
              <p>A quota license is county-specific, so begin in the county where the proposed licensed premises will operate.</p>
            </article>
            <article className="seo-market-guide-card">
              <span>2</span>
              <h3>Compare current 4COP inventory</h3>
              <p>Review active listings, asking prices, listing source, license status and any seller-specific terms.</p>
            </article>
            <article className="seo-market-guide-card">
              <span>3</span>
              <h3>Verify the license and transfer</h3>
              <p>Confirm ownership, liens, tax clearance, premises, zoning, transfer paperwork and required state or local approvals.</p>
            </article>
          </div>
          <div className="seo-market-actions" style={{ marginTop: 28 }}>
            <Link
              className="seo-market-button seo-market-button-gold"
              href={listingsHref}
            >
              Search Florida 4COP Quota Licenses
            </Link>
            <Link
              className="seo-market-button seo-market-button-dark"
              href="/dbpr-abt-6002"
            >
              Review the ABT-6002 Transfer Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell seo-market-intro-grid">
          <article>
            <span className="seo-market-section-kicker">Pricing, Financing & Valuation</span>
            <h2>What determines the value of a Florida 4COP quota license?</h2>
            <p>
              County supply, local demand, current competing inventory, transaction urgency, license status and seller terms can all affect asking prices. That is why a statewide average alone is less useful than current county-level comparables.
            </p>
            <p>
              FLLM maintains separate market-value, appraisal and financing resources for buyers, sellers and lenders evaluating Florida liquor-license transactions.
            </p>
            <div className="seo-market-actions">
              <Link className="seo-market-button seo-market-button-gold" href="/florida-liquor-license-value">
                Estimate a Florida Liquor License Value
              </Link>
              <Link className="seo-market-button seo-market-button-dark" href="/financing">
                Explore Liquor License Financing
              </Link>
            </div>
          </article>
          <aside className="seo-market-callout">
            <strong>Current statewide marketplace asking-price snapshot</strong>
            <ul>
              <li>Active listings: {marketplaceListings.length}</li>
              <li>Counties with active inventory: {marketplaceCountyNames.size}</li>
              <li>Lowest disclosed ask: {marketplaceLowestPrice === null ? "Varies" : money(marketplaceLowestPrice)}</li>
              <li>Median disclosed ask: {marketplaceMedianPrice === null ? "Varies" : money(marketplaceMedianPrice)}</li>
              <li>Highest disclosed ask: {marketplaceHighestPrice === null ? "Varies" : money(marketplaceHighestPrice)}</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Florida 4COP Quota FAQs</span>
          <h2>Questions buyers ask about Florida 4COP quota licenses</h2>
          <div className="seo-market-faq-grid">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="four-cop-footer-resources" aria-labelledby="four-cop-footer-resources-title">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Related Florida Market Resources</span>
          <h2 id="four-cop-footer-resources-title">Continue your license research</h2>
          <div className="four-cop-footer-resource-grid">
            <article>
              <h3>Buying guide</h3>
              <p>
                Follow the purchase process from choosing the correct license type and county through pricing, due diligence, financing, transfer preparation and closing.
              </p>
              <Link href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License ›</Link>
            </article>
            <article>
              <h3>Online marketplace</h3>
              <p>
                Compare current 4COP quota and 3PS marketplace listings, or advertise a qualifying Florida liquor license for sale.
              </p>
              <Link href="/listings">Browse Florida liquor licenses online ›</Link>
            </article>
            <article>
              <h3>Statewide market report</h3>
              <p>
                Review current statewide inventory and asking-price evidence across Florida quota-license markets.
              </p>
              <Link href="/florida-quota-liquor-license-market-report">Open the Florida market report ›</Link>
            </article>
            <article>
              <h3>Broker listing service</h3>
              <p>
                Brokers can advertise a client&apos;s license on FLLM while remaining the listing representative and transaction contact.
              </p>
              <Link href="/brokers/list-your-license">List a client&apos;s Florida license ›</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-final-cta">
        <div className="seo-market-shell">
          <div>
            <h2>Compare Florida 4COP quota liquor licenses for sale</h2>
            <p>
              Search the active statewide marketplace by county, asking price and listing detail, or review the county market before contacting a seller or broker.
            </p>
          </div>
          <Link
            className="seo-market-button seo-market-button-dark"
            href={listingsHref}
          >
            Browse Active Florida 4COP Listings
          </Link>
        </div>
      </section>

      <footer className="directory-footer">
        <div className="seo-market-shell">
          <div className="directory-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
