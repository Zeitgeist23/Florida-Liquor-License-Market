import type { Metadata } from "next";
import Link from "next/link";
import FormsSiteHeader from "@/components/FormsSiteHeader";

import MarketplaceListingCard from "@/components/MarketplaceListingCard";
import { indexableCounties } from "@/data/florida-counties";
import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../listings/listings-premium.css";
import "../listings/listings-map-size.css";
import "../listings/listings-county-links.css";
import "../listings/listings-navy-refresh.css";
import "../listings/listings-card-gold-borders.css";
import "../listings/listings-regression-fix.css";
import "../listings/listings-conversion-cards.css";
import "../listings/listings-card-overlap-fix.css";
import "../counties/counties-page.css";
import "./three-ps-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-3ps-liquor-license-for-sale`;
const listingsHref = "/listings?type=3PS%20Quota%20%2F%20Package%20Store&status=available";

export const dynamic = "force-dynamic";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

function floridaDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", month: "long", day: "numeric", year: "numeric" }).format(date);
}

async function getThreePsListings() {
  return getVisibleAvailableMarketplaceListings(await getMarketplaceListings()).filter(
    (listing) => listing.type === "3PS Quota / Package Store",
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const availableListings = await getThreePsListings();
  const prices = availableListings.map((listing) => listing.price).filter((value): value is number => Number.isFinite(value));
  const countyCount = new Set(availableListings.map((listing) => listing.county)).size;
  const low = prices.length ? Math.min(...prices) : null;
  const high = prices.length ? Math.max(...prices) : null;
  const marketSummary = low !== null && high !== null ? ` Current disclosed asking prices range from ${money(low)} to ${money(high)}.` : "";
  const description = `Browse ${availableListings.length} active Florida 3PS package-store liquor licenses for sale across ${countyCount} counties. Compare county markets, current asking prices and live listing details.${marketSummary}`;

  return {
    title: "Florida 3PS Liquor Licenses for Sale | Package Store Listings",
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: { type: "website", url: canonicalUrl, title: "Florida 3PS Liquor Licenses for Sale | FLLM", description, siteName: "Florida Liquor License Market" },
    twitter: { card: "summary_large_image", title: "Florida 3PS Liquor Licenses for Sale", description },
  };
}

export default async function Florida3PsLiquorLicenseForSalePage() {
  const availableListings = await getThreePsListings();
  const disclosedPrices = availableListings.map((listing) => listing.price).filter((value): value is number => Number.isFinite(value));
  const lowestPrice = disclosedPrices.length ? Math.min(...disclosedPrices) : null;
  const medianPrice = median(disclosedPrices);
  const highestPrice = disclosedPrices.length ? Math.max(...disclosedPrices) : null;
  const activeCountyNames = new Set(availableListings.map((listing) => listing.county));
  const updatedLabel = floridaDateLabel();

  const countyStats = indexableCounties.map((county) => {
    const listings = availableListings.filter((listing) => listing.county === county.name);
    const prices = listings.map((listing) => listing.price).filter((value): value is number => Number.isFinite(value));
    return { county, count: listings.length, low: prices.length ? Math.min(...prices) : null, median: median(prices), high: prices.length ? Math.max(...prices) : null };
  }).filter(({ count }) => count > 0).sort((a, b) => b.count - a.count || a.county.name.localeCompare(b.county.name));

  const previewListings = [...availableListings].sort((a, b) => {
    const aFeatured = a.featuredUntil ? new Date(a.featuredUntil).getTime() : 0;
    const bFeatured = b.featuredUntil ? new Date(b.featuredUntil).getTime() : 0;
    if (bFeatured !== aFeatured) return bFeatured - aFeatured;
    const aPublished = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bPublished = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    if (bPublished !== aPublished) return bPublished - aPublished;
    return a.county.localeCompare(b.county);
  }).slice(0, 18);

  const faqs = [
    { question: "What is a Florida 3PS quota liquor license?", answer: "A Florida 3PS-family quota license is generally used for retail package sales of sealed beer, wine and distilled spirits for consumption away from the licensed premises. The exact series designation can vary with county population and remains subject to Florida regulatory approval." },
    { question: "How much does a Florida 3PS liquor license cost?", answer: "There is no single statewide price. Asking prices vary by county, local supply and demand, license status, seller terms and current market conditions. This page publishes a live snapshot using disclosed prices from visible marketplace inventory." },
    { question: "Where can I find Florida 3PS licenses for sale?", answer: "Use the active marketplace inventory on this page to compare current 3PS package-store licenses by county and asking price. Each card opens an individual listing or the appropriate marketplace path for more detail." },
    { question: "Does a 3PS listing include a liquor store business or real estate?", answer: "Not unless the individual listing expressly says so. FLLM marketplace cards describe the liquor-license interest separately from an operating business, leasehold, equipment, inventory or real estate." },
    { question: "Can a 3PS quota license be moved to another Florida county?", answer: "Quota licenses are county-specific. A buyer should acquire a license in the county where it will be used and confirm the applicant, ownership, premises, zoning and transfer requirements before closing." },
    { question: "Can a 3PS license be converted to a 4COP quota series?", answer: "A qualifying quota-license owner may be able to change the license series from 3PS to a 4COP quota series, but the proposed use, premises, zoning and regulatory approvals must support the change. Confirm eligibility with Florida DBPR/ABT and local authorities before relying on a conversion." },
    { question: "Can a Florida 3PS quota license be financed?", answer: "Financing may be available through banks, private lenders, seller financing or other transaction structures depending on the buyer, collateral, valuation and lender requirements. FLLM maintains separate financing and appraisal resources." },
  ];

  const structuredData = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: "Florida 3PS Liquor Licenses for Sale", url: canonicalUrl, description: "Live statewide Florida 3PS package-store quota liquor-license inventory organized by county, asking price and availability.", dateModified: new Date().toISOString(), isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Florida Liquor Licenses for Sale", item: `${siteUrl}/listings` },
      { "@type": "ListItem", position: 3, name: "Florida 3PS Liquor Licenses for Sale", item: canonicalUrl },
    ] },
    { "@context": "https://schema.org", "@type": "ItemList", name: "Active Florida 3PS liquor licenses for sale", url: canonicalUrl, numberOfItems: availableListings.length, itemListElement: availableListings.slice(0, 100).map((listing, index) => ({ "@type": "ListItem", position: index + 1, name: `Florida 3PS package-store liquor license for sale in ${listing.county} — ${listing.priceLabel}`, url: `${siteUrl}${listingPageHref(listing)}` })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <main className="county-directory-page market-data-page three-ps-page">
      <div className="fllm-ui-header"><FormsSiteHeader /></div>

        <section className="directory-hero market-data-hero three-ps-hero">
          <div className="directory-shell">
            <span>Florida Package-Store Quota Marketplace</span>
            <h1>Florida 3PS Liquor Licenses for Sale</h1>
            <p>Compare current 3PS-family package-store opportunities by county and disclosed asking price, then open the live FLLM marketplace to review each license with the seller or broker.</p>
            <div className="market-data-hero-actions"><Link href={listingsHref}>Browse All 3PS Listings</Link><a href="#county-market">Browse County Markets</a></div>
          </div>
        </section>

        <section className="market-snapshot directory-shell" aria-label="Current Florida 3PS marketplace snapshot">
          <div className="market-snapshot-heading"><div><span>Live marketplace snapshot</span><h2>Current Florida 3PS market at a glance</h2></div><p>Marketplace snapshot: {updatedLabel}. Figures use currently visible FLLM inventory.</p></div>
          <div className="market-stat-grid">
            <article><strong>{availableListings.length}</strong><span>Active 3PS listings</span></article>
            <article><strong>{activeCountyNames.size}</strong><span>Counties with inventory</span></article>
            <article><strong>{lowestPrice === null ? "—" : money(lowestPrice)}</strong><span>Lowest disclosed ask</span></article>
            <article><strong>{medianPrice === null ? "—" : money(medianPrice)}</strong><span>Median disclosed ask</span></article>
          </div>
          <p className="market-data-caution">Asking-price data is a current market snapshot. Florida quota licenses are county-specific; asking prices are not appraisals, verified closed-sale prices or guarantees of value.</p>
        </section>

        <section className="three-ps-inventory" id="live-listings">
          <div className="directory-shell three-ps-listings-shell">
            <div className="directory-heading"><div><span>Live Marketplace Inventory</span><h2>Active Florida 3PS licenses currently for sale</h2></div><Link href={listingsHref}>View all active 3PS listings ›</Link></div>
            <p>Each card represents a liquor-license opportunity—not a liquor store, restaurant, lease or parcel of real estate unless an individual listing expressly states otherwise.</p>
            {previewListings.length ? <div className="results-page three-ps-results"><div className="results-grid">{previewListings.map((listing) => <MarketplaceListingCard key={listing.sourceRef ?? `${listing.county}-${listing.priceLabel}`} listing={listing} id={listing.sourceRef} />)}</div></div> : <div className="three-ps-empty"><strong>No active 3PS inventory is currently displayed.</strong><p>Inventory changes frequently. Browse the full marketplace or create a license alert.</p><div className="three-ps-actions"><Link className="three-ps-button three-ps-button-gold" href={listingsHref}>Browse the Marketplace</Link><Link className="three-ps-button three-ps-button-outline" href="/license-alerts">Create a License Alert</Link></div></div>}
          </div>
        </section>

        <section className="county-market-data" id="county-market"><div className="directory-shell">
          <div className="directory-heading market-table-heading"><div><span>County-Specific Market Data</span><h2>Florida 3PS prices and inventory by county</h2></div><p>Median and range figures use disclosed asking prices in active 3PS marketplace inventory.</p></div>
          <p>Florida quota licenses are county-specific. The table summarizes disclosed asking prices from active 3PS marketplace inventory and links directly to each county market.</p>
          <div className="market-table-wrap"><table className="market-data-table"><thead><tr><th>County</th><th>Active Listings</th><th>Lowest Ask</th><th>Median Ask</th><th>Highest Ask</th></tr></thead><tbody>{countyStats.map(({ county, count, low, median: countyMedian, high }) => <tr key={county.slug}><td><Link href={`/counties/${county.slug}`}><strong>{county.name}</strong><small>View county market</small></Link></td><td><Link className="market-count-link" href={`/listings?county=${encodeURIComponent(county.name)}&type=3PS%20Quota%20%2F%20Package%20Store&status=available`}>{count}</Link></td><td><span className="market-price-cell"><strong>{low === null ? "Undisclosed" : money(low)}</strong><small>lowest disclosed ask</small></span></td><td><span className="market-price-cell"><strong>{countyMedian === null ? "Undisclosed" : money(countyMedian)}</strong><small>median disclosed ask</small></span></td><td><span className="market-price-cell"><strong>{high === null ? "Undisclosed" : money(high)}</strong><small>highest disclosed ask</small></span></td></tr>)}</tbody></table></div>
          <p className="market-table-footnote"><strong>About this snapshot:</strong> FLLM uses currently visible marketplace listings, removes duplicate public inventory and calculates disclosed asking-price statistics by county. Asking prices are not completed-sale prices, appraisals or guarantees of value.</p>
        </div></section>

        <section className="three-ps-license-guide" id="what-is-3ps"><div className="directory-shell">
          <span className="three-ps-section-kicker">Understand the License Before You Buy</span><h2>What a Florida 3PS quota license actually authorizes</h2>
          <div className="three-ps-authority-grid"><article><b>3PS Package Store</b><p>A 3PS-family quota license is generally used for retail package sales of sealed beer, wine and distilled spirits for off-premises consumption. It is the full-liquor package-store category buyers commonly associate with a liquor store.</p><p>The license is a county-specific transferable asset. Buying it does not automatically include an operating business, lease, equipment, inventory or real estate.</p><Link href="/license-types/3ps-package-store">Read the complete 3PS license guide ›</Link></article><article><b>Possible 3PS-to-4COP Series Change</b><p>A qualifying quota-license owner may be able to change the license series from 3PS to a 4COP quota series, subject to DBPR/ABT approval and the proposed premises, use and local zoning requirements.</p><p>A buyer should never price or close a transaction on the assumption that a series change is guaranteed.</p><Link href="/resources/florida-liquor-license-system">Review how Florida quota licensing works ›</Link></article></div>
        </div></section>

        <section className="three-ps-buying" id="buying-process"><div className="directory-shell">
          <span className="three-ps-section-kicker">Buyer Process</span><h2>How to buy a Florida 3PS liquor license</h2><p>Begin with the county where the license will be used, compare current inventory, and verify the specific license and proposed premises before committing funds. For the full statewide purchase workflow, see <Link href="/how-to-buy-florida-liquor-license">How to Buy a Florida Liquor License</Link>.</p>
          <div className="three-ps-step-grid"><article><span>1</span><h3>Choose the county</h3><p>Florida quota licenses are county-specific, so start in the county where the proposed package store will operate.</p></article><article><span>2</span><h3>Compare license-only inventory</h3><p>Review active listings, asking prices, source information, license status and seller-specific terms.</p></article><article><span>3</span><h3>Verify the transfer</h3><p>Confirm ownership, liens, tax clearance, premises, zoning, application documents and required state or local approvals.</p></article></div>
          <div className="three-ps-actions"><Link className="three-ps-button three-ps-button-gold" href={listingsHref}>Search Florida 3PS Licenses</Link><Link className="three-ps-button three-ps-button-outline" href="/buy-florida-liquor-license">Buy a Florida Liquor License</Link><Link className="three-ps-button three-ps-button-outline" href="/dbpr-abt-6002">Review the ABT-6002 Transfer Guide</Link></div>
        </div></section>

        <section className="three-ps-value"><div className="directory-shell three-ps-value-grid">
          <article><span className="three-ps-section-kicker">Pricing, Financing & Valuation</span><h2>What determines the value of a Florida 3PS license?</h2><p>County supply, package-store demand, current competing inventory, license status, transaction timing and seller terms all influence asking prices. County-level comparables are more useful than a single statewide average.</p><p>FLLM maintains separate valuation, appraisal and financing resources for buyers, sellers and lenders evaluating Florida liquor-license transactions.</p><div className="three-ps-actions"><Link className="three-ps-button three-ps-button-gold" href="/florida-liquor-license-value">Estimate License Value</Link><Link className="three-ps-button three-ps-button-outline" href="/financing">Explore Financing</Link></div></article>
          <aside><strong>Current statewide disclosed 3PS snapshot</strong><ul><li>Active listings: {availableListings.length}</li><li>Counties with active inventory: {activeCountyNames.size}</li><li>Lowest disclosed ask: {lowestPrice === null ? "Varies" : money(lowestPrice)}</li><li>Median disclosed ask: {medianPrice === null ? "Varies" : money(medianPrice)}</li><li>Highest disclosed ask: {highestPrice === null ? "Varies" : money(highestPrice)}</li></ul></aside>
        </div></section>

        <section className="three-ps-faq"><div className="directory-shell"><span className="three-ps-section-kicker">Florida 3PS Buyer Questions</span><h2>Questions buyers ask about 3PS package-store licenses</h2><div className="three-ps-faq-grid">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>

        <section className="directory-cta"><div className="directory-shell directory-cta-grid"><div><span>For Buyers</span><h2>Compare current Florida 3PS opportunities</h2><p>Search live package-store inventory by county and disclosed asking price.</p><Link href={listingsHref}>Browse Active 3PS Listings</Link></div><div><span>Need a Specific County?</span><h2>Create a license alert</h2><p>Tell FLLM which county and license type you need so you can follow new market opportunities.</p><Link href="/license-alerts">Create a License Alert</Link></div></div></section>

        <footer className="county-footer">
          <div className="directory-shell"><span>© Florida Liquor License Market</span><nav><Link href="/listings">Listings</Link><Link href="/counties">Counties</Link><Link href="/financing">Financing</Link><Link href="/contact">Contact</Link></nav></div>
        </footer>
      </main>
    </>
  );
}