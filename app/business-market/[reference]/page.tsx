import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BusinessPackageHeatMap, {
  type BusinessPackageHeatMapRow,
} from "@/components/BusinessPackageHeatMap";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import MarketBuyerLeadForm from "@/components/MarketBuyerLeadForm";
import { countySlug, floridaCounties } from "@/data/florida-counties";
import {
  businessMarketRecordHref,
  businessQuotaListingRecords,
  type BusinessQuotaListing,
} from "@/lib/business-quota-listings";

import "@/app/fllm-official-template.css";
import "@/app/fllm-design-system.css";
import "@/app/counties/counties-page.css";
import "@/app/market-data/heat-map/business-package-heat-map.css";
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

function buildMarketMapRows(
  listings: BusinessQuotaListing[],
  licenseType: string,
): BusinessPackageHeatMapRow[] {
  const grouped = new Map<string, BusinessQuotaListing[]>();

  for (const listing of listings) {
    const group = grouped.get(listing.county) ?? [];
    group.push(listing);
    grouped.set(listing.county, group);
  }

  return Array.from(grouped.entries())
    .map(([county, countyListings]) => {
      const prices = countyListings
        .map((item) => item.packagePriceNumber)
        .filter(
          (price): price is number =>
            typeof price === "number" && Number.isFinite(price) && price > 0,
        );

      return {
        name: county,
        slug: countySlug(county),
        listingCount: countyListings.length,
        averagePrice: prices.length
          ? prices.reduce((sum, price) => sum + price, 0) / prices.length
          : null,
        licenseType,
        businessCategories: Array.from(
          new Set(countyListings.map((item) => item.businessCategory)),
        ).sort(),
      };
    })
    .sort(
      (left, right) =>
        right.listingCount - left.listingCount ||
        left.name.localeCompare(right.name),
    );
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
  const mapListings = businessQuotaListingRecords.filter(
    (candidate) =>
      candidate.publicationStatus === "published" &&
      candidate.licenseType === listing.licenseType &&
      candidate.businessCategory === listing.businessCategory,
  );
  const mapRows = buildMarketMapRows(mapListings, listing.licenseType);
  const mapListingType: "businesses" | "businesses-sfs" | "businesses-2cop" =
    listing.licenseClass === "sfs"
      ? "businesses-sfs"
      : listing.licenseClass === "2cop"
        ? "businesses-2cop"
        : "businesses";
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
            <strong>{listing.county}</strong>
          </div>

          <div className="business-market-hero-grid">
            <div className="business-market-hero-copy-block">
              <span className="business-market-eyebrow">FLLM Market Opportunity</span>
              <h1>{listing.title}</h1>
              <p className="business-market-hero-copy">
                Explore this {listing.businessCategory.toLowerCase()} opportunity in {listing.county},
                including the advertised package price, liquor-license classification and local market context.
              </p>

              <div className="business-market-hero-stats">
                <div>
                  <span>Package Price</span>
                  <strong>{listing.packagePrice}</strong>
                </div>
                <div>
                  <span>License Included</span>
                  <strong>{listing.licenseType}</strong>
                </div>
                <div>
                  <span>Business Type</span>
                  <strong>{listing.businessType}</strong>
                </div>
              </div>

              <div className="business-market-hero-actions">
                <a className="business-market-primary" href="#buyer-match">Ask FLLM About This Opportunity</a>
                <Link className="business-market-secondary" href={listing.countyHref}>Explore {listing.county}</Link>
              </div>
            </div>

            <div className="business-market-map-card">
              <span className="business-market-map-label">Florida Market</span>
              <Image
                src={`/api/county-map?county=${encodeURIComponent(listing.county)}&transparent=1`}
                alt={`Florida map highlighting ${listing.county}`}
                width={640}
                height={360}
                unoptimized
              />
              <strong>{listing.county}</strong>
              {primaryMarkets.length ? (
                <span className="business-market-city-line">{primaryMarkets.join(" · ")}</span>
              ) : (
                <span className="business-market-city-line">Florida business market</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="business-market-interactive-map">
        <BusinessPackageHeatMap
          rows={mapRows}
          licenseType={listing.licenseType}
          listingType={mapListingType}
          businessTypeLabel={listing.businessCategory}
        />
      </div>

      <section className="business-market-content">
        <div className="business-market-shell">
          <div className="business-market-grid">
            <div className="business-market-main">
              <section className="business-market-panel business-market-overview">
                <div className="business-market-section-heading">
                  <span>Opportunity Overview</span>
                  <h2>{listing.businessCategory} + {listing.licenseType}</h2>
                </div>
                <p>
                  FLLM is tracking an advertised {listing.businessType.toLowerCase()} opportunity in
                  {" "}{listing.county} at {listing.packagePrice}. The business package includes a
                  {" "}{listing.licenseType}.
                </p>

                <div className="business-market-fact-grid">
                  <div><span>County</span><strong>{listing.county}</strong></div>
                  <div><span>Business Category</span><strong>{listing.businessCategory}</strong></div>
                  <div><span>Transaction Type</span><strong>{listing.transactionType}</strong></div>
                  <div><span>FLLM Market Ref.</span><strong>{listing.listingReference}</strong></div>
                </div>
              </section>

              <section className="business-market-panel">
                <div className="business-market-section-heading">
                  <span>Local Market</span>
                  <h2>{listing.county} business market</h2>
                </div>

                {primaryMarkets.length ? (
                  <div className="business-market-city-pills" aria-label={`Primary markets in ${listing.county}`}>
                    {primaryMarkets.map((city) => <span key={city}>{city}</span>)}
                  </div>
                ) : null}

                <p>{county?.introduction ?? `${listing.county} is part of Florida's active hospitality and business-acquisition market.`}</p>
                {county?.marketOverview ? <p>{county.marketOverview}</p> : null}
                <p>{categoryContext(listing)}</p>
              </section>

              <section className="business-market-panel business-market-license-panel">
                <div className="business-market-section-heading">
                  <span>License Included</span>
                  <h2>{listing.licenseType}</h2>
                </div>
                <p>{licenseContext(listing)}</p>
                <div className="business-market-license-links">
                  <Link href={listing.countyHref}>View {listing.county} license market ›</Link>
                  <Link href="/resources/florida-liquor-license-types">Compare Florida license types ›</Link>
                  {listing.businessCategory === "Gentlemen's Club" ? (
                    <Link href="/businesses-with-quota-licenses/gentlemens-clubs">More Florida gentlemen's clubs for sale ›</Link>
                  ) : null}
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

              <div className="business-market-side-card">
                <span>More Options</span>
                <strong>Want to see similar opportunities too?</strong>
                <p>
                  FLLM can also use your county, budget and business preferences to identify
                  comparable business-and-license opportunities in the same market.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="business-market-related">
          <div className="business-market-shell">
            <div className="business-market-section-heading business-market-section-heading--center">
              <span>More Market Listings</span>
              <h2>Related Florida business opportunities</h2>
            </div>
            <div className="business-market-related-grid">
              {related.map((item) => (
                <Link key={item.listingReference} href={businessMarketRecordHref(item)}>
                  <span>{item.county}</span>
                  <strong>{item.businessCategory}</strong>
                  <small>{item.packagePrice} · {item.licenseType}</small>
                  <em>View Market Listing ›</em>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="business-market-note">
        <div className="business-market-shell">
          Market availability and pricing can change. FLLM will confirm current opportunities when a buyer requests a match.
        </div>
      </section>

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
