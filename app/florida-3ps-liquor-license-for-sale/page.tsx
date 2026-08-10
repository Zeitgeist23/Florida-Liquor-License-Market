import type { Metadata } from "next";
import Link from "next/link";
import FloridaCountyMap from "@/components/FloridaCountyMap";
import InventoryCardExpansion from "@/components/InventoryCardExpansion";
import { countySlug, indexableCounties } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import {
  marketplaceListingDescriptionParts,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import "../listings/listings-premium.css";
import "../listings/listings-map-size.css";
import "../listings/listings-card-expand.css";
import "../listings/listings-county-links.css";
import "../florida-liquor-licenses-for-sale/seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-3ps-liquor-license-for-sale`;
const listingsHref = "/listings?type=3PS%20Quota%20%2F%20Package%20Store&status=available";

export const metadata: Metadata = {
  title: "Florida 3PS Liquor Licenses for Sale | Package Store Listings",
  description:
    "Browse current Florida 3PS quota liquor licenses for sale by county and asking price. Compare package-store liquor-license opportunities for sealed beer, wine and spirits sales.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida 3PS Liquor Licenses for Sale | Package Store Listings",
    description:
      "Compare current Florida 3PS package-store liquor-license listings by county, asking price and availability.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida 3PS Liquor Licenses for Sale",
    description: "Browse current Florida 3PS package-store liquor-license marketplace inventory.",
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
  return sorted.length % 2
    ? sorted[middle]
    : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

function ListingDescription({ listing }: { listing: Listing }) {
  const description = marketplaceListingDescriptionParts({
    county: listing.county,
    licenseType: listing.type,
    licenseStatus: listing.licenseStatus,
    preferredTiming: listing.preferredTiming,
  });

  return (
    <div className="result-description">
      <p>{description.license}</p>
      <p>{description.county}</p>
      {description.cities && <p className="result-cities">{description.cities}</p>}
    </div>
  );
}

export default async function Florida3PsLiquorLicenseForSalePage() {
  const marketplaceListings = await getMarketplaceListings();
  const availableListings = marketplaceListings.filter(
    (listing) => Boolean(listing.sourceRef) && listing.type.includes("3PS"),
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

  const previewListings = [...availableListings]
    .sort((a, b) => {
      const byCounty = a.county.localeCompare(b.county);
      if (byCounty !== 0) return byCounty;
      if (a.price === null) return 1;
      if (b.price === null) return -1;
      return a.price - b.price;
    })
    .slice(0, 12);

  const faqs = [
    {
      question: "What is a Florida 3PS liquor license?",
      answer:
        "A Florida 3PS-family quota license is generally used for package-store sales of beer, wine and spirits in sealed containers for consumption away from the licensed premises. The exact series designation can vary with county population, and the proposed premises and transfer remain subject to applicable approvals.",
    },
    {
      question: "Is a 3PS license the Florida liquor-store license?",
      answer:
        "The 3PS family is the quota full-liquor package-sales category commonly associated with liquor stores and package stores. Buyers should confirm the exact series code, privileges and premises requirements for the county and transaction being considered.",
    },
    {
      question: "Can a Florida 3PS quota license be moved to another county?",
      answer:
        "Quota licenses are county-specific. Buyers should search within the county where the license will be used and confirm the proposed transfer and premises with the Florida Division of Alcoholic Beverages and Tobacco.",
    },
    {
      question: "How much does a Florida 3PS liquor license cost?",
      answer:
        "There is no single statewide market price. Asking prices vary by county, supply, demand, seller terms, license status and market conditions. Current disclosed asking prices on this page provide a marketplace snapshot rather than a guaranteed valuation.",
    },
    {
      question: "Where can I find a Florida liquor-store license for sale?",
      answer:
        "Use this page to compare current 3PS-family package-store opportunities, then open the full filtered Listings page or a county market page to review available inventory and make an inquiry.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida 3PS Liquor Licenses for Sale",
      url: canonicalUrl,
      description:
        "Current Florida 3PS package-store liquor-license marketplace inventory organized by county, asking price and availability.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor Licenses for Sale", item: `${siteUrl}/florida-liquor-licenses-for-sale` },
        { "@type": "ListItem", position: 3, name: "Florida 3PS Liquor Licenses for Sale", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida 3PS liquor licenses for sale",
      url: canonicalUrl,
      numberOfItems: availableListings.length,
      itemListElement: availableListings.slice(0, 50).map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `3PS package-store liquor license in ${listing.county} — ${listing.priceLabel}`,
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
    <main className="seo-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <style>{`
        .seo-market-listings-shell { width: min(1480px, calc(100% - 60px)); }
        .seo-market-preview-results { min-height: 0 !important; background: transparent !important; color: inherit !important; }
        @media (max-width: 720px) { .seo-market-listings-shell { width: min(100% - 24px, 1480px); } }
      `}</style>

      <header className="seo-market-header seo-market-shell">
        <Link className="seo-market-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="Marketplace navigation">
          <Link href="/florida-liquor-licenses-for-sale">Licenses for Sale</Link>
          <Link href="/listings">Listings</Link>
          <Link href="/counties">Counties</Link>
          <Link className="seo-market-nav-cta" href="/sell-your-license">List Your License</Link>
        </nav>
      </header>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-licenses-for-sale">Florida Liquor Licenses for Sale</Link><span>›</span><strong>3PS</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Package-Store Quota Marketplace</span>
              <h1>Florida 3PS Liquor Licenses for Sale</h1>
              <p>
                Browse current Florida 3PS-family quota liquor-license opportunities by county and asking price. Compare package-store licenses used for sealed beer, wine and spirits sales for off-premises consumption, subject to state and local approvals.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href={listingsHref}>Browse All 3PS Listings</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/counties">Search by County</Link>
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
              The 3PS family is the full-liquor package-sales category buyers commonly search for when opening or acquiring a liquor-store operation. It supports sealed package sales of beer, wine and spirits for consumption away from the licensed premises within the approved license privileges.
            </p>
            <p>
              The exact series designation can vary with county population. Before buying, confirm the license series, county, premises, zoning, ownership structure and transfer requirements. <Link href="/resources/florida-liquor-license-types">Compare Florida liquor-license types</Link>.
            </p>
          </article>
          <aside className="seo-market-callout">
            <strong>Current disclosed 3PS asking-price snapshot</strong>
            <ul>
              <li>Lowest disclosed ask: {lowestPrice === null ? "Varies" : money(lowestPrice)}</li>
              <li>Median disclosed ask: {medianPrice === null ? "Varies" : money(medianPrice)}</li>
              <li>Highest disclosed ask: {highestPrice === null ? "Varies" : money(highestPrice)}</li>
              <li>Prices and availability remain subject to seller confirmation.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="seo-market-inventory">
        <div className="seo-market-shell seo-market-listings-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Current Opportunities</span><h2>3PS liquor licenses currently for sale in Florida</h2></div>
            <Link href={listingsHref}>View all 3PS listings ›</Link>
          </div>
          {previewListings.length ? (
            <div className="results-page seo-market-preview-results">
              <div className="results-grid">
                {previewListings.map((listing) => (
                  <article className="result-card" key={listing.sourceRef ?? `${listing.county}-${listing.price}`}>
                    <div className="result-photo">
                      <FloridaCountyMap county={listing.county} />
                      <span className="result-type-badge">3PS Package Store</span>
                    </div>
                    <div className="result-body">
                      <p>● <Link className="result-county-link" href={`/counties/${countySlug(listing.county)}`}>{listing.county}</Link></p>
                      <h2><Link href={listingPageHref(listing)} style={{ color: "inherit", textDecoration: "none" }}>{listing.priceLabel}</Link></h2>
                      <div className="result-facts">
                        <span>{listing.type}</span>
                        <span>{listing.licenseStatus ? `${sellerReportedStatusLabel(listing.licenseStatus)} / Available` : "Available / Status to confirm"}</span>
                      </div>
                      <ListingDescription listing={listing} />
                      <div className="result-actions">
                        <Link className="btn btn-gold" href={`/contact?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Inquire</Link>
                        <Link className="btn offer-button" href={`/submit-offer?listing=${encodeURIComponent(`${listing.county} ${listing.type}`)}&ref=${listing.sourceRef}`}>Submit an Offer</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="seo-market-callout">
              <strong>No active 3PS listings are displayed right now.</strong>
              <p>Inventory changes frequently. Buyers can still review county markets or contact FLLM about current package-store opportunities.</p>
            </div>
          )}
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Active County Markets</span><h2>Florida 3PS licenses for sale by county</h2></div>
            <Link href="/counties">Browse all county markets ›</Link>
          </div>
          {countyCounts.length ? (
            <div className="seo-market-county-grid">
              {countyCounts.map(({ county, count }) => (
                <Link key={county.slug} href={`/counties/${county.slug}`}>{county.name} ({count})</Link>
              ))}
            </div>
          ) : (
            <p>Use the statewide county directory to identify the Florida market where a package-store license is needed.</p>
          )}
        </div>
      </section>

      <section className="seo-market-guide">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buyer Process</span>
          <h2>How to buy a Florida 3PS liquor license</h2>
          <p>Start with the county, confirm the package-store privileges needed, compare current inventory and then verify the specific license and transfer before committing funds.</p>
          <div className="seo-market-guide-grid">
            <article className="seo-market-guide-card"><span>1</span><h3>Choose the county</h3><p>A quota license is county-specific, so begin in the county where the package store will operate.</p></article>
            <article className="seo-market-guide-card"><span>2</span><h3>Compare 3PS opportunities</h3><p>Review asking prices, exact series designation, status, seller terms and listing details.</p></article>
            <article className="seo-market-guide-card"><span>3</span><h3>Verify and transfer</h3><p>Confirm liens, ownership, premises, zoning, transfer paperwork and required state or local approvals before closing.</p></article>
          </div>
          <div className="seo-market-actions" style={{ marginTop: 28 }}>
            <Link className="seo-market-button seo-market-button-gold" href={listingsHref}>Search Florida 3PS Licenses</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/financing">Explore Liquor License Financing</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Florida 3PS FAQs</span>
          <h2>Questions buyers ask about package-store licenses</h2>
          <div className="seo-market-faq-grid">
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="seo-market-final-cta">
        <div className="seo-market-shell">
          <div><h2>Looking for a Florida liquor-store license?</h2><p>Open the live marketplace inventory and filter current 3PS package-store opportunities by county, price and availability.</p></div>
          <Link className="seo-market-button seo-market-button-dark" href={listingsHref}>Browse 3PS Liquor Licenses for Sale</Link>
        </div>
      </section>

      <footer className="seo-market-footer">
        <div className="seo-market-shell">
          <span>© Florida Liquor License Market</span>
          <nav>
            <Link href="/florida-liquor-licenses-for-sale">Florida Licenses for Sale</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP Licenses</Link>
            <Link href="/counties">Counties</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
      <InventoryCardExpansion />
    </main>
  );
}
