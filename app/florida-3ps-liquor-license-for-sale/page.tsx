import type { Metadata } from "next";
import Link from "next/link";

import { indexableCounties } from "@/data/florida-counties";
import { getMarketplaceListings } from "@/lib/listing-store";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-3ps-liquor-license-for-sale`;
const listingsHref = "/listings?type=3PS%20Quota%20%2F%20Package%20Store&status=available";
const featuredSarasotaHref = "/listings/fllm-168405";

export const metadata: Metadata = {
  title: "Florida 3PS Liquor Licenses for Sale | Package Store Listings",
  description:
    "Browse current Florida 3PS quota liquor licenses for sale by county and asking price. Compare package-store opportunities, then open the canonical FLLM Listings marketplace for current inventory.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida 3PS Liquor Licenses for Sale | Package Store Listings",
    description: "Compare current Florida 3PS package-store liquor-license opportunities by county and asking price.",
    siteName: "Florida Liquor License Market",
  },
};

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
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

const faqs = [
  {
    question: "What is a Florida 3PS quota liquor license?",
    answer:
      "A Florida 3PS-family quota license is generally used for package-store sales of beer, wine and distilled spirits in sealed containers for off-premises consumption. The exact series designation can vary by county population and remains subject to Florida regulatory approval.",
  },
  {
    question: "Where can I browse current Florida 3PS licenses for sale?",
    answer:
      "Use this page for 3PS-specific market context, then open the FLLM Listings marketplace filtered to 3PS opportunities for the current statewide inventory.",
  },
  {
    question: "How much does a Florida 3PS liquor license cost?",
    answer:
      "There is no single statewide price. Asking prices vary by county, supply, buyer demand, seller terms, license status and current market conditions.",
  },
];

export default async function Florida3PsLiquorLicenseForSalePage() {
  const marketplaceListings = await getMarketplaceListings();
  const availableListings = marketplaceListings.filter(
    (listing) => Boolean(listing.sourceRef) && listing.type.includes("3PS"),
  );
  const featuredSarasotaListing = availableListings.find(
    (listing) => listing.sourceRef?.trim().toUpperCase() === "FLLM-168405",
  );
  const disclosedPrices = availableListings
    .map((listing) => listing.price)
    .filter((value): value is number => Number.isFinite(value));
  const lowestPrice = disclosedPrices.length ? Math.min(...disclosedPrices) : null;
  const medianPrice = median(disclosedPrices);
  const highestPrice = disclosedPrices.length ? Math.max(...disclosedPrices) : null;
  const activeCountyNames = new Set(availableListings.map((listing) => listing.county));

  const countyCounts = indexableCounties
    .map((county) => ({
      county,
      count: availableListings.filter((listing) => listing.county === county.name).length,
    }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count || a.county.name.localeCompare(b.county.name));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida 3PS Liquor Licenses for Sale",
      url: canonicalUrl,
      description: "Florida 3PS package-store liquor-license market context and current marketplace inventory links.",
      isPartOf: { "@type": "CollectionPage", name: "Florida Liquor Licenses for Sale", url: `${siteUrl}/listings` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor Licenses for Sale", item: `${siteUrl}/listings` },
        { "@type": "ListItem", position: 3, name: "Florida 3PS Liquor Licenses for Sale", item: canonicalUrl },
      ],
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
    <main className="seo-market-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />

      <header className="seo-market-header seo-market-shell">
        <Link className="seo-market-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="Marketplace navigation">
          <Link href="/listings">Licenses for Sale</Link>
          <Link href="/counties">Counties</Link>
          <Link className="seo-market-nav-cta" href="/sell-your-license">List Your License</Link>
        </nav>
      </header>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/listings">Florida Liquor Licenses for Sale</Link><span>›</span><strong>3PS</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Package-Store Quota Marketplace</span>
              <h1>Florida 3PS Liquor Licenses for Sale</h1>
              <p>
                Compare current 3PS-family package-store opportunities by county and disclosed asking price, then open the canonical FLLM Listings marketplace for the current statewide inventory.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href={listingsHref}>Browse All 3PS Listings</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/counties">Browse County Markets</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Current Florida 3PS marketplace snapshot">
              <span>Current 3PS Snapshot</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>{availableListings.length}</strong><small>available listings</small></div>
                <div><strong>{activeCountyNames.size}</strong><small>counties with inventory</small></div>
                <div><strong>{lowestPrice === null ? "—" : money(lowestPrice)}</strong><small>lowest disclosed ask</small></div>
                <div><strong>{medianPrice === null ? "—" : money(medianPrice)}</strong><small>median disclosed ask</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell seo-market-intro-grid">
          <article>
            <span className="seo-market-section-kicker">Package-Store License Guide</span>
            <h2>What a Florida 3PS liquor license is used for</h2>
            <p>
              The 3PS family is the quota full-liquor package-sales category commonly associated with liquor stores and package stores. It supports sealed package sales of beer, wine and distilled spirits for off-premises consumption within approved license privileges.
            </p>
            <p>
              Before purchasing, confirm the exact series, county, license status, ownership, premises requirements and transfer conditions. <Link href="/license-types/3ps-package-store">Read the 3PS license-type guide</Link>.
            </p>
          </article>
          <aside className="seo-market-callout">
            <strong>Current disclosed 3PS asking-price snapshot</strong>
            <ul>
              <li>Lowest disclosed ask: {lowestPrice === null ? "Varies" : money(lowestPrice)}</li>
              <li>Median disclosed ask: {medianPrice === null ? "Varies" : money(medianPrice)}</li>
              <li>Highest disclosed ask: {highestPrice === null ? "Varies" : money(highestPrice)}</li>
              {featuredSarasotaListing ? (
                <li><Link href={featuredSarasotaHref}><strong>Featured Sarasota County 3PS listing: {featuredSarasotaListing.priceLabel} →</strong></Link></li>
              ) : null}
              <li>Prices and availability remain subject to seller confirmation.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Active County Markets</span><h2>Florida 3PS licenses for sale by county</h2></div>
            <Link href={listingsHref}>View all 3PS listings ›</Link>
          </div>
          {countyCounts.length ? (
            <div className="seo-market-county-grid">
              {countyCounts.map(({ county, count }) => (
                <Link key={county.slug} href={`/counties/${county.slug}`}>{county.name} ({count})</Link>
              ))}
            </div>
          ) : (
            <p>No active 3PS inventory is currently displayed. Browse the full marketplace for the latest availability.</p>
          )}
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">3PS Buyer Questions</span>
          <h2>Florida 3PS liquor-license FAQs</h2>
          <div className="seo-market-faq-grid">
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="seo-market-final-cta">
        <div className="seo-market-shell">
          <div><h2>Browse current Florida 3PS opportunities</h2><p>Use the canonical FLLM Listings marketplace for live inventory, filters and individual license pages.</p></div>
          <Link className="seo-market-button seo-market-button-dark" href={listingsHref}>Open 3PS Listings</Link>
        </div>
      </section>
    </main>
  );
}
