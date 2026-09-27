import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketBuyerLeadForm from "@/components/MarketBuyerLeadForm";
import { floridaCounties } from "@/data/florida-counties";
import {
  businessMarketRecordHref,
  businessQuotaListingRecords,
  type BusinessQuotaListing,
} from "@/lib/business-quota-listings";

import "@/app/fllm-official-template.css";
import "@/app/fllm-design-system.css";
import "./market-record.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

const marketRecords = businessQuotaListingRecords.filter(
  (listing) =>
    listing.publicationStatus === "published" &&
    listing.listingTier === "market",
);

type PageProps = {
  params: Promise<{ reference: string }>;
};

function recordFor(reference: string) {
  const normalized = decodeURIComponent(reference).trim().toUpperCase();
  return marketRecords.find((listing) => listing.listingReference === normalized) ?? null;
}

function countyFor(listing: BusinessQuotaListing) {
  return floridaCounties.find((county) => county.name === listing.county) ?? null;
}

function categoryContext(listing: BusinessQuotaListing) {
  switch (listing.businessCategory) {
    case "Bar":
      return "Bar and lounge acquisitions are especially sensitive to location, occupancy, operating hours, entertainment format, rent, build-out condition, and the alcohol privileges attached to the premises or included license.";
    case "Cocktail Lounge":
      return "Cocktail-lounge acquisitions are driven by concept, location, occupancy, beverage mix, late-night demand, lease terms, build-out quality, and the alcohol privileges included with the transaction.";
    case "Restaurant":
      return "Restaurant acquisitions should be evaluated as operating businesses, with attention to concept, sales mix, occupancy cost, equipment, lease terms, seating, food-service requirements, and the license classification used at the premises.";
    case "Liquor Store":
      return "Liquor-store acquisitions depend on retail location, inventory, lease or real estate, sales mix, competition, and the package-store privileges attached to the included license.";
    case "Nightclub":
    case "Gentlemen's Club":
      return "Nightlife acquisitions can involve additional operating, zoning, occupancy, entertainment, security, and local-use considerations beyond the state alcoholic-beverage license itself.";
    case "Marina":
      return "Marina and waterfront hospitality acquisitions can combine beverage privileges with real estate, docks, fuel, food service, events, tourism, and other operating components that should be evaluated separately.";
    case "Hotel / Motel":
      return "Hotel and motel beverage operations should be evaluated together with lodging operations, food service, event space, premises configuration, and the license classification serving the property.";
    case "Country Club":
      return "Country-club acquisitions can combine food and beverage service, membership economics, real estate, recreation, events, and premises-specific alcohol privileges.";
    case "Bowling Alley":
      return "Bowling and entertainment businesses can combine food, beverage, events, games, occupancy, and premises-specific licensing considerations.";
    default:
      return "Hospitality-business acquisitions should be evaluated as operating businesses, with the included alcoholic-beverage license reviewed separately from the operating assets, lease, real estate, and other transaction terms.";
  }
}

function licenseContext(listing: BusinessQuotaListing) {
  if (listing.licenseType === "4COP Quota") {
    return "The advertised package includes a 4COP quota liquor license. A quota license is county-specific and transferable subject to Florida regulatory approval, buyer qualification, transaction documentation, and any applicable local requirements. This market record does not state that the license is available separately.";
  }
  if (listing.licenseType === "3PS Quota / Package Store") {
    return "The advertised package includes a 3PS quota / package-store license. Buyers should confirm the license status, county, transfer eligibility, liens, transaction structure, premises, and package-store operating requirements before relying on the advertised terms.";
  }
  if (listing.licenseType === "4COP SFS/SRX") {
    return "The advertised business uses a 4COP SFS / SRX restaurant license classification. Unlike a transferable quota license, this classification is tied to the qualifying restaurant operation and approved premises, so buyers should verify continuing eligibility and transfer requirements for the specific location.";
  }
  return "The advertised business uses a 2COP beer-and-wine license classification. Buyers should confirm the current license record, premises, transfer process, local requirements, and whether the proposed concept remains eligible for the same license privileges.";
}

function marketDescription(listing: BusinessQuotaListing) {
  const county = countyFor(listing);
  const cityText = county?.primaryCities.length
    ? ` Major markets in the county include ${county.primaryCities.join(", ")}.`
    : "";
  return `FLLM market record for an advertised ${listing.businessType.toLowerCase()} opportunity in ${listing.county} with ${listing.licenseType}, shown at an advertised package price of ${listing.packagePrice}.${cityText} Buyer matching is available through FLLM.`;
}

export function generateStaticParams() {
  return marketRecords.map((listing) => ({
    reference: listing.listingReference.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reference } = await params;
  const listing = recordFor(reference);
  if (!listing) return {};

  const canonicalPath = businessMarketRecordHref(listing);
  const description = marketDescription(listing);

  return {
    title: `${listing.title} | FLLM Market Record`,
    description,
    alternates: { canonical: `${siteUrl}${canonicalPath}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `${siteUrl}${canonicalPath}`,
      title: listing.title,
      description,
      siteName: "Florida Liquor License Market",
    },
  };
}

export default async function BusinessMarketRecordPage({ params }: PageProps) {
  const { reference } = await params;
  const listing = recordFor(reference);
  if (!listing) notFound();

  const county = countyFor(listing);
  const canonicalPath = businessMarketRecordHref(listing);
  const primaryMarkets = county?.primaryCities ?? [];
  const related = marketRecords
    .filter(
      (candidate) =>
        candidate.listingReference !== listing.listingReference &&
        (candidate.county === listing.county ||
          candidate.businessCategory === listing.businessCategory),
    )
    .slice(0, 4);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: listing.title,
      url: `${siteUrl}${canonicalPath}`,
      description: marketDescription(listing),
      about: {
        "@type": "Thing",
        name: `${listing.businessCategory} business opportunity in ${listing.county}`,
      },
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
          name: "Business Packages",
          item: `${siteUrl}/businesses-with-quota-licenses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: listing.title,
          item: `${siteUrl}${canonicalPath}`,
        },
      ],
    },
  ];

  return (
    <main className="business-market-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />

      <div className="business-market-header">
        <FormsSiteHeader />
      </div>

      <section className="business-market-hero">
        <div className="business-market-shell">
          <div className="business-market-breadcrumbs">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/businesses-with-quota-licenses">Business Packages</Link>
            <span>›</span>
            <strong>{listing.listingReference}</strong>
          </div>

          <div className="business-market-hero-grid">
            <div>
              <span className="business-market-eyebrow">FLLM Market Record</span>
              <h1>{listing.title}</h1>
              <p className="business-market-hero-copy">
                FLLM tracks this {listing.businessType.toLowerCase()} opportunity as part of its
                {" "}{listing.county} business-and-liquor-license market coverage. This is a market
                intelligence record, not a paid broker listing. Availability, price and transaction
                terms require current confirmation.
              </p>
              <div className="business-market-hero-actions">
                <a className="business-market-primary" href="#buyer-match">Find Matching Opportunities</a>
                <Link className="business-market-secondary" href={listing.countyHref}>View {listing.county} Market</Link>
              </div>
            </div>

            <div className="business-market-map-card">
              <Image
                src={`/api/county-map?county=${encodeURIComponent(listing.county)}&transparent=1`}
                alt={`Florida map highlighting ${listing.county}`}
                width={640}
                height={360}
                unoptimized
              />
              <strong>{listing.county}</strong>
              {primaryMarkets.length ? (
                <span>Primary markets: {primaryMarkets.join(" · ")}</span>
              ) : (
                <span>Florida business-package market</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="business-market-summary">
        <div className="business-market-shell">
          <div className="business-market-metrics">
            <article>
              <span>Advertised Package Price</span>
              <strong>{listing.packagePrice}</strong>
            </article>
            <article>
              <span>Business Type</span>
              <strong>{listing.businessType}</strong>
            </article>
            <article>
              <span>License Classification</span>
              <strong>{listing.licenseType}</strong>
            </article>
            <article>
              <span>Transaction Type</span>
              <strong>{listing.transactionType}</strong>
            </article>
          </div>

          <div className="business-market-grid">
            <div className="business-market-main">
              <section className="business-market-panel">
                <span className="business-market-panel-kicker">Opportunity Snapshot</span>
                <h2>What this market record tells a buyer</h2>
                <p>
                  A {listing.businessType.toLowerCase()} has been advertised in {listing.county} at
                  {" "}{listing.packagePrice} with a {listing.licenseType} included in the business
                  package. FLLM does not display the unpaid originating broker, brokerage, phone
                  number or marketplace on this record.
                </p>
                <p>
                  The purpose of the record is to document market activity, connect the business
                  category to the county and license class, and let buyers tell FLLM what type of
                  opportunity they want to pursue.
                </p>
                <div className="business-market-fact-grid">
                  <div><span>FLLM Reference</span><strong>{listing.listingReference}</strong></div>
                  <div><span>Category</span><strong>{listing.businessCategory}</strong></div>
                  <div><span>County</span><strong>{listing.county}</strong></div>
                  <div><span>Current Status</span><strong>Confirmation Required</strong></div>
                </div>
              </section>

              <section className="business-market-panel">
                <span className="business-market-panel-kicker">County + City Context</span>
                <h2>{listing.businessCategory} market context in {listing.county}</h2>
                <p>{county?.introduction ?? `${listing.county} is part of Florida's active hospitality and business-acquisition market.`}</p>
                {county?.marketOverview ? <p>{county.marketOverview}</p> : null}
                {primaryMarkets.length ? (
                  <p>
                    FLLM associates this county market with <strong>{primaryMarkets.join(", ")}</strong>.
                    Those city relationships help buyers move from a statewide search into the local
                    market where a business package is being evaluated.
                  </p>
                ) : null}
                <p>{categoryContext(listing)}</p>
              </section>

              <section className="business-market-panel">
                <span className="business-market-panel-kicker">License Context</span>
                <h2>{listing.licenseType} included with the advertised business</h2>
                <p>{licenseContext(listing)}</p>
                <p>
                  The package price shown here is the advertised price for the business transaction.
                  It should not be interpreted as a standalone liquor-license asking price unless a
                  separate license-only offering is expressly published by FLLM.
                </p>
              </section>

              <section className="business-market-panel">
                <span className="business-market-panel-kicker">Buyer Due Diligence</span>
                <h2>Confirm the opportunity before relying on advertised terms</h2>
                <div className="business-market-checklist">
                  <div><b>01</b><p>Confirm that the business is still available and that the advertised package price remains current.</p></div>
                  <div><b>02</b><p>Verify the alcoholic-beverage license number, status, county, transfer requirements and any liens or encumbrances.</p></div>
                  <div><b>03</b><p>Review revenue, cash flow, lease terms, equipment, inventory, real estate and other operating assets directly with the authorized seller or broker.</p></div>
                  <div><b>04</b><p>Confirm zoning, premises eligibility, financing, regulatory timing and closing requirements before entering a binding transaction.</p></div>
                </div>
              </section>
            </div>

            <aside className="business-market-sidebar" id="buyer-match">
              <MarketBuyerLeadForm
                listingReference={listing.listingReference}
                listingTitle={listing.title}
                county={listing.county}
                businessType={listing.businessCategory}
                licenseType={listing.licenseType}
                askingPrice={listing.packagePrice}
                listingUrl={canonicalPath}
              />
              <div className="business-market-disclosure">
                <strong>Market record, not broker advertising</strong>
                <p>
                  FLLM is not promoting the unpaid originating broker on this page. A buyer inquiry
                  goes to FLLM for market matching rather than being forwarded as a free lead to a
                  third-party marketplace.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="business-market-related">
          <div className="business-market-shell">
            <span className="business-market-panel-kicker">Related Market Activity</span>
            <h2>Other FLLM business market records</h2>
            <div className="business-market-related-grid">
              {related.map((item) => (
                <Link key={item.listingReference} href={businessMarketRecordHref(item)}>
                  <span>{item.county}</span>
                  <strong>{item.title}</strong>
                  <small>{item.packagePrice} · {item.licenseType}</small>
                  <em>View market record ›</em>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="business-market-footer">
        <div className="business-market-shell">
          <div>
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/listings">Standalone Licenses</Link>
            <Link href="/businesses-with-quota-licenses">Business Packages</Link>
            <Link href="/counties">County Markets</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
