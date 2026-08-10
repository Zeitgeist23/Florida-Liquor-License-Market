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
const canonicalUrl = `${siteUrl}/florida-4cop-liquor-license-for-sale`;
const listingsHref = "/listings?type=4COP%20Quota&status=available";

export const metadata: Metadata = {
  title: "Florida 4COP Liquor Licenses for Sale | Current Listings",
  description:
    "Browse current Florida 4COP quota liquor licenses for sale by county and asking price. Compare transferable full-liquor marketplace opportunities for bars, taverns, nightclubs and restaurant concepts.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida 4COP Liquor Licenses for Sale | Current Listings",
    description:
      "Compare current Florida 4COP quota liquor-license listings by county, asking price and availability.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida 4COP Liquor Licenses for Sale",
    description: "Browse current Florida 4COP quota liquor-license marketplace inventory.",
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

export default async function Florida4CopLiquorLicenseForSalePage() {
  const marketplaceListings = await getMarketplaceListings();
  const availableListings = marketplaceListings.filter(
    (listing) => Boolean(listing.sourceRef) && listing.type === "4COP Quota",
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
      question: "What is a Florida 4COP quota liquor license?",
      answer:
        "A Florida 4COP quota license is a county-limited full-liquor license used for beer, wine and spirits sales within its approved privileges. It is commonly associated with bars, taverns, cocktail lounges, nightclubs and full-liquor restaurant concepts. The proposed premises, local zoning and state transfer approval still matter.",
    },
    {
      question: "How many Florida 4COP quota licenses are available?",
      answer:
        "Florida limits quota licenses by county population. State guidance explains that a new quota license is created for each increase of 7,500 county residents, subject to the applicable statutes and quota process. Existing quota licenses may also be bought and transferred with approval.",
    },
    {
      question: "Can a 4COP quota license be moved to another Florida county?",
      answer:
        "Quota licenses are county-specific. A buyer should select the county where the license will be used and confirm the proposed transfer, ownership and premises with the Florida Division of Alcoholic Beverages and Tobacco before closing.",
    },
    {
      question: "How much does a Florida 4COP liquor license cost?",
      answer:
        "There is no single statewide price. Asking prices vary by county, supply, demand, license status, seller terms and market conditions. The live listings on this page provide a current marketplace snapshot of disclosed asking prices.",
    },
    {
      question: "Where can I buy a Florida 4COP liquor license?",
      answer:
        "Use the current marketplace inventory on this page to compare 4COP opportunities by county and asking price, then open an individual listing or the full filtered Listings page to inquire or submit an offer.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida 4COP Liquor Licenses for Sale",
      url: canonicalUrl,
      description:
        "Current Florida 4COP quota liquor-license marketplace inventory organized by county, asking price and availability.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor Licenses for Sale", item: `${siteUrl}/florida-liquor-licenses-for-sale` },
        { "@type": "ListItem", position: 3, name: "Florida 4COP Liquor Licenses for Sale", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida 4COP liquor licenses for sale",
      url: canonicalUrl,
      numberOfItems: availableListings.length,
      itemListElement: availableListings.slice(0, 50).map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `4COP quota liquor license in ${listing.county} — ${listing.priceLabel}`,
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
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-licenses-for-sale">Florida Liquor Licenses for Sale</Link><span>›</span><strong>4COP</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Full-Liquor Quota Marketplace</span>
              <h1>Florida 4COP Liquor Licenses for Sale</h1>
              <p>
                Browse current Florida 4COP quota liquor-license opportunities by county and asking price. Compare available full-liquor licenses for bars, taverns, cocktail lounges, nightclubs and restaurant concepts, subject to state and local approvals.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href={listingsHref}>Browse All 4COP Listings</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/counties">Search by County</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Current Florida 4COP marketplace snapshot">
              <span>Current 4COP Snapshot</span>
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
            <span className="seo-market-section-kicker">What Buyers Are Shopping For</span>
            <h2>What a Florida 4COP quota license is used for</h2>
            <p>
              A 4COP quota license is the principal transferable full-liquor license buyers search for when a Florida hospitality concept needs beer, wine and spirits privileges beyond beer-and-wine service. Common uses include bars, taverns, lounges, nightclubs and qualifying restaurant operations.
            </p>
            <p>
              Quota licenses are county-specific. Before buying, confirm that the license category, proposed premises, zoning, ownership structure and transaction satisfy the applicable Florida Division of Alcoholic Beverages and Tobacco requirements. <Link href="/resources/florida-liquor-license-types">Compare Florida liquor-license types</Link>.
            </p>
          </article>
          <aside className="seo-market-callout">
            <strong>Current disclosed 4COP asking-price snapshot</strong>
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
            <div><span className="seo-market-section-kicker">Current Opportunities</span><h2>4COP liquor licenses currently for sale in Florida</h2></div>
            <Link href={listingsHref}>View all 4COP listings ›</Link>
          </div>
          <div className="results-page seo-market-preview-results">
            <div className="results-grid">
              {previewListings.map((listing) => (
                <article className="result-card" key={listing.sourceRef ?? `${listing.county}-${listing.price}`}>
                  <div className="result-photo">
                    <FloridaCountyMap county={listing.county} />
                    <span className="result-type-badge">4COP Quota</span>
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
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div><span className="seo-market-section-kicker">Active County Markets</span><h2>Florida 4COP licenses for sale by county</h2></div>
            <Link href="/counties">Browse all county markets ›</Link>
          </div>
          <div className="seo-market-county-grid">
            {countyCounts.map(({ county, count }) => (
              <Link key={county.slug} href={`/counties/${county.slug}`}>{county.name} ({count})</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-guide">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buyer Process</span>
          <h2>How to buy a Florida 4COP liquor license</h2>
          <p>Start with the county, compare current inventory and asking prices, then verify the specific license and transaction before committing funds.</p>
          <div className="seo-market-guide-grid">
            <article className="seo-market-guide-card"><span>1</span><h3>Choose the county</h3><p>A quota license is county-specific, so begin in the county where the license will be used.</p></article>
            <article className="seo-market-guide-card"><span>2</span><h3>Compare current listings</h3><p>Review asking prices, license status, seller terms and individual listing details.</p></article>
            <article className="seo-market-guide-card"><span>3</span><h3>Verify and transfer</h3><p>Confirm liens, ownership, premises, zoning, transfer paperwork and required state or local approvals before closing.</p></article>
          </div>
          <div className="seo-market-actions" style={{ marginTop: 28 }}>
            <Link className="seo-market-button seo-market-button-gold" href={listingsHref}>Search Florida 4COP Licenses</Link>
            <Link className="seo-market-button seo-market-button-dark" href="/financing">Explore Liquor License Financing</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Florida 4COP FAQs</span>
          <h2>Questions buyers ask about 4COP quota licenses</h2>
          <div className="seo-market-faq-grid">
            {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="seo-market-final-cta">
        <div className="seo-market-shell">
          <div><h2>Ready to compare Florida 4COP licenses?</h2><p>Open the live marketplace inventory and filter current 4COP opportunities by county, price and availability.</p></div>
          <Link className="seo-market-button seo-market-button-dark" href={listingsHref}>Browse 4COP Liquor Licenses for Sale</Link>
        </div>
      </section>

      <footer className="seo-market-footer">
        <div className="seo-market-shell">
          <span>© Florida Liquor License Market</span>
          <nav>
            <Link href="/florida-liquor-licenses-for-sale">Florida Licenses for Sale</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS Licenses</Link>
            <Link href="/counties">Counties</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
      <InventoryCardExpansion />
    </main>
  );
}
