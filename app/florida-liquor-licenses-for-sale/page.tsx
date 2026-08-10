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
import "./seo-market.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-licenses-for-sale`;

export const metadata: Metadata = {
  title: "Florida Liquor Licenses for Sale | 4COP & 3PS Marketplace",
  description:
    "Browse Florida liquor licenses for sale, including current 4COP quota and 3PS package-store opportunities. Compare asking prices, counties, license types and live marketplace inventory.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor Licenses for Sale | 4COP & 3PS Marketplace",
    description:
      "Search current Florida 4COP and 3PS liquor-license opportunities by county, asking price and availability.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor Licenses for Sale | 4COP & 3PS Marketplace",
    description:
      "Browse current Florida liquor licenses for sale and compare marketplace inventory by county and asking price.",
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

export default async function FloridaLiquorLicensesForSalePage() {
  const marketplaceListings = await getMarketplaceListings();
  const availableListings = marketplaceListings.filter((listing) => Boolean(listing.sourceRef));
  const disclosedPrices = availableListings
    .map((listing) => listing.price)
    .filter((value): value is number => Number.isFinite(value));

  const fourCopCount = availableListings.filter((listing) => listing.type === "4COP Quota").length;
  const threePsCount = availableListings.filter((listing) => listing.type.includes("3PS")).length;
  const activeCountyNames = new Set(availableListings.map((listing) => listing.county));
  const lowestPrice = disclosedPrices.length ? Math.min(...disclosedPrices) : null;
  const medianPrice = median(disclosedPrices);
  const highestPrice = disclosedPrices.length ? Math.max(...disclosedPrices) : null;

  const countyCounts = indexableCounties
    .map((county) => ({
      county,
      count: availableListings.filter((listing) => listing.county === county.name).length,
    }))
    .sort((a, b) => b.count - a.count || a.county.name.localeCompare(b.county.name));

  const previewListings = [...availableListings]
    .sort((a, b) => {
      const byCounty = a.county.localeCompare(b.county);
      if (byCounty !== 0) return byCounty;
      if (a.price === null) return 1;
      if (b.price === null) return -1;
      return a.price - b.price;
    })
    .slice(0, 9);

  const faqs = [
    {
      question: "Where can I find Florida liquor licenses for sale?",
      answer:
        "Florida Liquor License Market organizes current marketplace inventory by county, license type, asking price and availability. Buyers can browse statewide inventory, open a dedicated 4COP or 3PS page, or use a county market page to compare local opportunities.",
    },
    {
      question: "What is a Florida 4COP quota liquor license?",
      answer:
        "A 4COP quota license is a county-limited full-liquor license used within its approved privileges for beer, wine and spirits. It is commonly associated with bars, taverns, cocktail lounges, nightclubs and full-liquor restaurant concepts, subject to state and local approvals.",
    },
    {
      question: "What is a Florida 3PS liquor license?",
      answer:
        "A 3PS-family quota license is generally used for package-store sales of sealed beer, wine and spirits for consumption away from the licensed premises. The exact series designation may vary with county population.",
    },
    {
      question: "What does a Florida liquor license cost?",
      answer:
        "There is no single statewide market price for transferable quota licenses. Asking prices vary by county, license category, supply, seller terms, transaction structure and market conditions. Current listings provide a live marketplace snapshot.",
    },
    {
      question: "Can I search Florida liquor licenses by county?",
      answer:
        "Yes. Florida Liquor License Market provides permanent county pages and listing filters so buyers can focus on the county where the license will be used and compare asking prices and available license types.",
    },
    {
      question: "Does a liquor-license listing include a restaurant or real estate?",
      answer:
        "Not unless an individual listing expressly says so. Marketplace listings generally describe the liquor-license interest separately from any operating business, lease, equipment, inventory or real estate.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor Licenses for Sale",
      url: canonicalUrl,
      description:
        "Current Florida marketplace inventory for 4COP quota and 3PS liquor-license opportunities, organized by county and asking price.",
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
        { "@type": "ListItem", position: 2, name: "Florida Liquor Licenses for Sale", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida liquor licenses for sale",
      url: canonicalUrl,
      numberOfItems: availableListings.length,
      itemListElement: availableListings.slice(0, 50).map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${listing.type} in ${listing.county} — ${listing.priceLabel}`,
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
          <Link href="/listings">Listings</Link>
          <Link href="/counties">Counties</Link>
          <Link href="/financing">Financing</Link>
          <Link className="seo-market-nav-cta" href="/sell-your-license">List Your License</Link>
        </nav>
      </header>

      <section className="seo-market-hero">
        <div className="seo-market-shell">
          <div className="seo-market-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><strong>Florida Liquor Licenses for Sale</strong>
          </div>
          <div className="seo-market-hero-grid">
            <div>
              <span className="seo-market-kicker">Florida Statewide Marketplace</span>
              <h1>Florida Liquor Licenses for Sale</h1>
              <p>
                Search current Florida 4COP quota and 3PS package-store liquor-license opportunities by county, license type, asking price and availability. Compare the market, open individual listing details and contact the marketplace about a license you want to buy.
              </p>
              <div className="seo-market-actions">
                <Link className="seo-market-button seo-market-button-gold" href="/listings">Browse All Current Listings</Link>
                <Link className="seo-market-button seo-market-button-dark" href="/counties">Search by Florida County</Link>
              </div>
            </div>
            <aside className="seo-market-snapshot" aria-label="Current Florida liquor license marketplace snapshot">
              <span>Current Marketplace Snapshot</span>
              <div className="seo-market-snapshot-grid">
                <div><strong>{availableListings.length}</strong><small>available listings</small></div>
                <div><strong>{activeCountyNames.size}</strong><small>counties with inventory</small></div>
                <div><strong>{fourCopCount}</strong><small>4COP opportunities</small></div>
                <div><strong>{threePsCount}</strong><small>3PS opportunities</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="seo-market-intro">
        <div className="seo-market-shell seo-market-intro-grid">
          <article>
            <span className="seo-market-section-kicker">Live Florida Market</span>
            <h2>Compare Florida liquor-license inventory before you buy</h2>
            <p>
              Florida liquor-license asking prices can differ substantially from one county to another. This statewide marketplace page brings current inventory into one place so buyers can compare counties, license types, asking prices and availability before making an inquiry.
            </p>
            <p>
              Start with the license privilege you need, then the county where it will be used. Buyers shopping for full on-premises liquor privileges can review <Link href="/florida-4cop-liquor-license-for-sale">Florida 4COP liquor licenses for sale</Link>, while package-store buyers can review <Link href="/florida-3ps-liquor-license-for-sale">Florida 3PS liquor licenses for sale</Link>.
            </p>
          </article>
          <aside className="seo-market-callout">
            <strong>Current disclosed asking-price snapshot</strong>
            <ul>
              <li>Lowest disclosed ask: {lowestPrice === null ? "Varies" : money(lowestPrice)}</li>
              <li>Median disclosed ask: {medianPrice === null ? "Varies" : money(medianPrice)}</li>
              <li>Highest disclosed ask: {highestPrice === null ? "Varies" : money(highestPrice)}</li>
              <li>Inventory updates as marketplace listings change.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="seo-market-guide">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Shop by License Type</span>
          <h2>Find the Florida liquor license that fits the business</h2>
          <div className="seo-market-guide-grid">
            <article className="seo-market-guide-card">
              <span>4COP</span>
              <h3>Full-liquor bars, lounges, nightclubs and restaurants</h3>
              <p>Compare county-specific 4COP quota opportunities, asking prices and current marketplace inventory.</p>
              <Link href="/florida-4cop-liquor-license-for-sale">Browse Florida 4COP licenses for sale ›</Link>
            </article>
            <article className="seo-market-guide-card">
              <span>3PS</span>
              <h3>Liquor stores and package-store operations</h3>
              <p>Compare 3PS-family package-store opportunities for sealed beer, wine and spirits sales.</p>
              <Link href="/florida-3ps-liquor-license-for-sale">Browse Florida 3PS licenses for sale ›</Link>
            </article>
            <article className="seo-market-guide-card">
              <span>Guide</span>
              <h3>Not sure which Florida license you need?</h3>
              <p>Compare 4COP, 3PS, 2COP, 2APS, SRX and other Florida alcoholic-beverage license categories.</p>
              <Link href="/resources/florida-liquor-license-types">Compare Florida liquor-license types ›</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="seo-market-inventory">
        <div className="seo-market-shell seo-market-listings-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">Current Opportunities</span>
              <h2>Florida liquor licenses currently for sale</h2>
            </div>
            <Link href="/listings">View the full Listings page ›</Link>
          </div>
          <div className="results-page seo-market-preview-results">
            <div className="results-grid">
              {previewListings.map((listing) => (
                <article className="result-card" key={listing.sourceRef ?? `${listing.county}-${listing.price}`}>
                  <div className="result-photo">
                    <FloridaCountyMap county={listing.county} />
                    <span className="result-type-badge">{listing.type}</span>
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
          <div className="seo-market-actions" style={{ marginTop: 28 }}>
            <Link className="seo-market-button seo-market-button-gold" href="/listings">Search All Florida Liquor Licenses</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-counties">
        <div className="seo-market-shell">
          <div className="seo-market-section-heading">
            <div>
              <span className="seo-market-section-kicker">County Markets</span>
              <h2>Florida liquor licenses for sale by county</h2>
            </div>
            <Link href="/counties">Browse all county markets ›</Link>
          </div>
          <div className="seo-market-county-grid">
            {countyCounts.map(({ county, count }) => (
              <Link key={county.slug} href={`/counties/${county.slug}`}>
                {county.name}{count > 0 ? ` (${count})` : ""}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-market-guide">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Buying Guide</span>
          <h2>How to buy a Florida liquor license</h2>
          <p>
            Start by identifying the county and the license privileges the business needs. Then compare current marketplace inventory and asking prices before investigating the specific license and transfer.
          </p>
          <div className="seo-market-guide-grid">
            <article className="seo-market-guide-card">
              <span>1</span><h3>Choose the county</h3><p>Quota licenses are county-specific, so start with the Florida county where the license will be used.</p>
            </article>
            <article className="seo-market-guide-card">
              <span>2</span><h3>Compare license opportunities</h3><p>Review license type, asking price, availability and individual listing details before contacting the marketplace.</p>
            </article>
            <article className="seo-market-guide-card">
              <span>3</span><h3>Verify before closing</h3><p>Confirm status, liens, ownership, transaction terms, proposed premises, zoning, transfer paperwork and other required approvals.</p>
            </article>
          </div>
          <div className="seo-market-actions" style={{ marginTop: 28 }}>
            <Link className="seo-market-button seo-market-button-dark" href="/financing">Explore Liquor License Financing</Link>
            <Link className="seo-market-button seo-market-button-gold" href="/sell-your-license">Sell a Florida Liquor License</Link>
          </div>
        </div>
      </section>

      <section className="seo-market-faq">
        <div className="seo-market-shell">
          <span className="seo-market-section-kicker">Florida Liquor License FAQs</span>
          <h2>Questions buyers ask before searching for a license</h2>
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

      <section className="seo-market-final-cta">
        <div className="seo-market-shell">
          <div>
            <h2>Ready to search the Florida market?</h2>
            <p>Filter current inventory by county, license type, asking price and availability, then open a listing to inquire or submit an offer.</p>
          </div>
          <Link className="seo-market-button seo-market-button-dark" href="/listings">Browse Florida Liquor Licenses for Sale</Link>
        </div>
      </section>

      <footer className="seo-market-footer">
        <div className="seo-market-shell">
          <span>© Florida Liquor License Market</span>
          <nav>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP Licenses</Link>
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
