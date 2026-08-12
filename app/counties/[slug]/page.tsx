import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FloridaCountyMap from "@/components/FloridaCountyMap";
import { getCountyBySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import {
  countyListingDescription,
  sellerReportedStatusLabel,
} from "@/lib/county-listing-descriptions";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "./county-page.css";
import "../../listings/listings-premium.css";
import "../../listings/listings-map-size.css";
import "../../listings/listings-county-links.css";
import "../../listings/listings-conversion-cards.css";
import "../../listings/listings-card-overlap-fix.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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

function listingKey(listing: Listing) {
  return listing.sourceRef ?? `${listing.county}-${listing.type}-${listing.priceLabel}`;
}

function compactCardDescription(description: string) {
  const clean = description.trim();
  const maxCharacters = 122;
  if (clean.length <= maxCharacters) return clean;
  const tentative = clean.slice(0, maxCharacters + 1);
  const lastSpace = tentative.lastIndexOf(" ");
  const cutoff = lastSpace >= 92 ? lastSpace : maxCharacters;
  const clipped = clean.slice(0, cutoff).replace(/[,:;.!?\s]+$/g, "");
  return `${clipped}…`;
}

function ListingDescription({ listing }: { listing: Listing }) {
  const description = countyListingDescription(listing.county);
  return (
    <div className="result-description">
      <p title={description}>{compactCardDescription(description)}</p>
    </div>
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) return {};

  const canonical = `${siteUrl}/counties/${county.slug}`;
  const isDuval = county.slug === "duval";
  const title = isDuval
    ? "Duval County Liquor Licenses for Sale | Jacksonville 4COP & 3PS"
    : `${county.name} Liquor Licenses for Sale | 4COP & 3PS`;
  const cityPhrase = county.primaryCities.length
    ? ` across ${county.primaryCities.slice(0, 3).join(", ")}`
    : "";
  const description = isDuval
    ? "Browse Duval County and Jacksonville liquor licenses for sale, including current 4COP and 3PS quota opportunities, asking prices, availability, and live marketplace inventory."
    : `Browse ${county.name} liquor licenses for sale, including current 4COP and 3PS quota opportunities, asking prices, availability, and live marketplace inventory${cityPhrase}.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: county.indexable
      ? { index: true, follow: true }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Florida Liquor License Market",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CountyPage({ params }: PageProps) {
  const { slug } = await params;
  const county = getCountyBySlug(slug);
  if (!county) notFound();

  const marketplaceListings = getVisibleMarketplaceListings(await getMarketplaceListings());
  const countyListings = marketplaceListings.filter((listing) => listing.county === county.name);
  const available = countyListings.filter((listing) => Boolean(listing.sourceRef));
  const sold = countyListings.filter((listing) => !listing.sourceRef);
  const disclosedPrices = available
    .map((listing) => listing.price)
    .filter((price): price is number => Number.isFinite(price));
  const lowest = disclosedPrices.length ? Math.min(...disclosedPrices) : null;
  const highest = disclosedPrices.length ? Math.max(...disclosedPrices) : null;
  const medianPrice = median(disclosedPrices);
  const canonical = `${siteUrl}/counties/${county.slug}`;
  const filteredListingsHref = `/listings?county=${encodeURIComponent(county.name)}&status=available`;
  const cityText = county.primaryCities.length ? county.primaryCities.join(", ") : county.name.replace(" County", "");
  const countySearchSummary = `Compare current ${county.name} liquor licenses for sale, including 4COP and 3PS quota opportunities, asking prices, availability, and marketplace inventory for ${cityText}.`;
  const nearby = county.nearbyCounties
    .map((nearbySlug) => getCountyBySlug(nearbySlug))
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  const pricingAnswer = lowest === null || highest === null
    ? `There is no single fixed market price for a transferable quota liquor license in ${county.name}. Asking prices vary with license type, supply, seller terms, availability, and market conditions, so buyers should compare current inventory and confirm pricing before relying on it.`
    : lowest === highest
      ? `The current disclosed asking-price snapshot on Florida Liquor License Market includes a ${county.name} opportunity at ${money(lowest)}. Asking prices can change as listings are added, removed, repriced, or sold, so buyers should confirm current availability and terms.`
      : `Current disclosed asking prices on Florida Liquor License Market range from ${money(lowest)} to ${money(highest)} in ${county.name}${medianPrice === null ? "" : `, with a median disclosed ask of ${money(medianPrice)}`}. Asking prices can change as inventory and seller terms change.`;

  const faqs = [
    {
      question: `How much does a liquor license cost in ${county.name}?`,
      answer: pricingAnswer,
    },
    {
      question: `What liquor-license types may appear in ${county.name}?`,
      answer: `Marketplace inventory may include 4COP quota interests and 3PS quota or package-store interests. The permitted use depends on the license category, the proposed premises, local approvals, and approval of the transfer by the Florida Division of Alcoholic Beverages and Tobacco.`,
    },
    {
      question: `Are the asking prices for ${county.name} guaranteed?`,
      answer: `No. Asking prices and availability are subject to seller or broker confirmation and may change without notice. Buyers should independently verify the license, transaction structure, liens, transfer requirements, and all material terms.`,
    },
    {
      question: `Where can I browse current liquor licenses for sale in ${county.name}?`,
      answer: `Current ${county.name} marketplace inventory is displayed on this county page and can also be viewed through the Florida Liquor License Market listings page, where buyers can filter by county, license type, asking price, and availability.`,
    },
    {
      question: `Does a license listing include a business or real estate?`,
      answer: `No, not unless a listing expressly says otherwise. The marketplace generally presents liquor-license interests separately from any operating business, leasehold, equipment, inventory, or real estate.`,
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${county.name} Liquor Licenses for Sale`,
      url: canonical,
      description: countySearchSummary,
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
        { "@type": "ListItem", position: 2, name: "Florida Counties", item: `${siteUrl}/counties` },
        { "@type": "ListItem", position: 3, name: county.name, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${county.name} liquor licenses for sale`,
      url: canonical,
      numberOfItems: available.length,
      itemListElement: available.slice(0, 30).map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${listing.type} in ${county.name} — ${listing.priceLabel}`,
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
    <main className="county-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <header className="county-header county-shell">
        <Link className="county-brand" href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="County market navigation">
          <Link href="/listings">Florida Listings</Link>
          <Link href="/counties">Browse Counties</Link>
          <Link href="/financing">Financing</Link>
          <Link className="county-nav-cta" href="/sell-your-license">List Your License</Link>
        </nav>
      </header>

      <section className="county-hero">
        <div className="county-shell county-hero-grid">
          <div>
            <div className="county-breadcrumbs">
              <Link href="/">Home</Link><span>›</span><Link href="/counties">Counties</Link><span>›</span><strong>{county.name}</strong>
            </div>
            <span className="county-kicker">Florida Quota License Marketplace</span>
            <h1>{county.name} Liquor Licenses for Sale</h1>
            <p>{county.introduction}</p>
            <p>{countySearchSummary}</p>
            <div className="county-hero-actions">
              <Link className="county-button county-button-gold" href={filteredListingsHref}>Browse {county.name} Licenses for Sale</Link>
              <Link className="county-button county-button-dark" href="/sell-your-license">List a License</Link>
            </div>
          </div>
          <div className="county-map-card" aria-label={`${county.name} map`}>
            <FloridaCountyMap county={county.name} enlarged />
            <strong>{county.name}</strong>
            <span>{cityText}</span>
          </div>
        </div>
      </section>

      <section className="county-stats county-shell" aria-label={`${county.name} listing statistics`}>
        <div><span>Available Now</span><strong>{available.length}</strong></div>
        <div><span>Lowest Disclosed Ask</span><strong>{lowest === null ? "Undisclosed" : money(lowest)}</strong></div>
        <div><span>Median Disclosed Ask</span><strong>{medianPrice === null ? "Undisclosed" : money(medianPrice)}</strong></div>
        <div><span>Highest Disclosed Ask</span><strong>{highest === null ? "Undisclosed" : money(highest)}</strong></div>
      </section>

      <section className="county-inventory">
        <div className="county-shell">
          <div className="county-section-heading">
            <div><span>Current Marketplace Inventory</span><h2>Available Licenses in {county.name}</h2></div>
            <Link href={filteredListingsHref}>Browse all {county.name} liquor licenses for sale ›</Link>
          </div>
          <p className="county-disclaimer">Listings are for liquor-license interests only unless expressly stated otherwise. Prices and availability remain subject to confirmation.</p>

          {available.length ? (
            <div className="results-page county-market-results">
              <div className="results-grid">
                {available.map((listing) => (
                  <article className="result-card result-card-available" id={listing.sourceRef} key={listingKey(listing)}>
                    <span className="result-type-badge">{listing.type}</span>
                    <div className="result-photo"><FloridaCountyMap county={listing.county} enlarged /></div>
                    <div className="result-body">
                      <p className="result-county-row"><span className="result-pin" aria-hidden="true">●</span><Link className="result-county-link" href={`/counties/${county.slug}`}>{listing.county}</Link></p>
                      <h2><Link href={listingPageHref(listing)} aria-label={`View ${listing.type} listing in ${listing.county}`} style={{ color: "inherit", textDecoration: "none" }}>{listing.priceLabel}</Link></h2>
                      <div className="result-facts">
                        <span className="availability-pill" title={listing.licenseStatus ? sellerReportedStatusLabel(listing.licenseStatus) : "Status to confirm"}><span className="availability-dot" aria-hidden="true" />Available</span>
                      </div>
                      <ListingDescription listing={listing} />
                      <div className="result-actions">
                        <Link className="btn btn-gold result-view-button" href={listingPageHref(listing)}>View License <span aria-hidden="true">›</span></Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="county-empty">
              <strong>No active marketplace listings are currently displayed for {county.name}.</strong>
              <p>Inventory changes frequently. Sellers and brokers can submit a confidential listing, and buyers can review all current Florida opportunities.</p>
              <div><Link className="county-button county-button-gold" href="/sell-your-license">List a License</Link><Link className="county-button county-button-dark" href="/listings">View All Listings</Link></div>
            </div>
          )}
        </div>
      </section>

      <section className="county-guide county-shell">
        <article>
          <span>County Market Overview</span>
          <h2>Understanding the {county.name} License Market</h2>
          <p>{county.marketOverview}</p>
          <p>A quota license is county-specific. A buyer should confirm that the license category fits the proposed use and should separately evaluate the intended premises, zoning, local approvals, liens, purchase documents, and the state transfer process.</p>
        </article>
        <aside>
          <h3>Transaction checklist</h3>
          <ul>
            <li>Confirm the license number, category, county, and current status.</li>
            <li>Review asking price, deposits, liens, transfer conditions, and closing terms.</li>
            <li>Verify the intended premises and applicable local approvals.</li>
            <li>Use independent legal, tax, and financial professionals.</li>
          </ul>
          <Link href="/listings">Browse Florida liquor licenses for sale ›</Link>
        </aside>
      </section>

      <section className="county-cta">
        <div className="county-shell county-cta-grid">
          <div><span>For Buyers</span><h2>Need a license in {county.name}?</h2><p>Browse current marketplace inventory and compare available 4COP and 3PS opportunities in this county.</p><Link className="county-button county-button-gold" href={filteredListingsHref}>Browse {county.name} Licenses for Sale</Link></div>
          <div><span>For Sellers and Brokers</span><h2>Have a license to market?</h2><p>Publish the opportunity statewide while keeping confidential information off the public listing card.</p><Link className="county-button county-button-gold" href="/sell-your-license">List Your License</Link></div>
        </div>
      </section>

      <section className="county-faq county-shell">
        <div className="county-section-heading"><div><span>Buyer and Seller Guide</span><h2>{county.name} Liquor-License FAQs</h2></div></div>
        <div className="county-faq-grid">
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      {sold.length > 0 && (
        <section className="county-sales county-shell">
          <div className="county-section-heading"><div><span>Market Evidence</span><h2>Recently Sold Listings</h2></div></div>
          <div className="county-sold-grid">
            {sold.map((listing) => <div key={listingKey(listing)}><strong>{listing.priceLabel}</strong><span>{listing.type}</span><em>Sold</em></div>)}
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section className="county-nearby county-shell">
          <div className="county-section-heading"><div><span>Nearby Markets</span><h2>Explore Other Florida Counties</h2></div></div>
          <div className="county-nearby-links">
            {nearby.map((item) => <Link key={item.slug} href={`/counties/${item.slug}`}><strong>{item.name}</strong><span>View liquor licenses for sale ›</span></Link>)}
          </div>
        </section>
      )}

      <footer className="county-footer">
        <div className="county-shell"><span>© Florida Liquor License Market</span><nav><Link href="/listings">Listings</Link><Link href="/counties">Counties</Link><Link href="/financing">Financing</Link><Link href="/contact">Contact</Link></nav></div>
      </footer>
    </main>
  );
}
