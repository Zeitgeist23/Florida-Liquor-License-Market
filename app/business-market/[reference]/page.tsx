import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BusinessPackageHeatMap, {
  type BusinessPackageHeatMapRow,
} from "@/components/BusinessPackageHeatMap";
import BusinessMarketHeroMap from "@/components/BusinessMarketHeroMap";
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
    return "The advertised business uses a 4COP SFS / SRX restaurant license classification. This is a non-quota, restaurant-qualified license and should not be confused with a transferable 4COP quota license. It is tied to the qualifying restaurant operation and approved premises, so buyers should verify continuing eligibility and transfer requirements for the specific location.";
  }
  return "The advertised business uses a 2COP beer-and-wine license classification. This is a non-quota license and is not a transferable 4COP quota license. It authorizes beer-and-wine privileges rather than distilled spirits, subject to the approved premises and regulatory requirements. Buyers should confirm the current license record, premises, transfer process, local requirements, and whether the proposed concept remains eligible for the same license privileges.";
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

function isStJohnsQuotaTarget(listing: BusinessQuotaListing) {
  return listing.listingReference === "FLLM-MKT-Q-004";
}

function isStJohnsSfs(listing: BusinessQuotaListing) {
  return listing.county === "St. Johns County" && listing.licenseClass === "sfs";
}

function isMiamiNonQuotaRestaurant(listing: BusinessQuotaListing) {
  return (
    listing.county === "Miami-Dade County" &&
    listing.businessCategory === "Restaurant" &&
    (listing.licenseClass === "sfs" || listing.licenseClass === "2cop")
  );
}

function isOrlandoRestaurant(listing: BusinessQuotaListing) {
  return (
    listing.county === "Orange County" &&
    listing.businessCategory === "Restaurant" &&
    (listing.licenseClass === "sfs" || listing.licenseClass === "2cop")
  );
}

function localMarketOverview(listing: BusinessQuotaListing, county: ReturnType<typeof countyFor>) {
  if (isMiamiNonQuotaRestaurant(listing)) {
    return "Miami-Dade County is one of Florida's largest restaurant and hospitality markets. This page covers a non-quota restaurant license classification, so the business opportunity should be evaluated separately from Miami-Dade's transferable 4COP quota-license market.";
  }
  if (isOrlandoRestaurant(listing)) {
    return "Orlando and Orange County form one of Florida's largest tourism, convention, dining and entertainment markets. This restaurant page covers a non-quota license classification; buyers looking specifically for a transferable 4COP quota license should evaluate Orange County quota inventory separately.";
  }
  return county?.marketOverview ?? null;
}

function metadataTitle(listing: BusinessQuotaListing) {
  if (isStJohnsQuotaTarget(listing)) {
    return "Restaurant for Sale in St. Johns County with 4COP Quota License | FLLM";
  }
  if (isStJohnsSfs(listing)) {
    return `${listing.title} | Non-Quota Restaurant License | FLLM`;
  }
  if (isMiamiNonQuotaRestaurant(listing)) {
    return `${listing.title} | Non-Quota Restaurant License | FLLM`;
  }
  if (isOrlandoRestaurant(listing)) {
    return listing.licenseClass === "2cop"
      ? "Orlando Restaurant for Sale With 2COP Beer & Wine License | FLLM"
      : "Orlando Restaurant for Sale With 4COP SFS/SRX Liquor License | FLLM";
  }
  return `${listing.title} | FLLM Market Record`;
}

function marketDescription(listing: BusinessQuotaListing) {
  if (isStJohnsQuotaTarget(listing)) {
    return "St. Augustine restaurant for sale in St. Johns County, Florida with a 4COP quota liquor license. Advertised package price $999,000. FLLM market record for a sports bar and restaurant business package that includes a county-specific transferable quota license.";
  }
  if (isStJohnsSfs(listing)) {
    return `FLLM market record for an advertised ${listing.businessType.toLowerCase()} opportunity in St. Johns County with a non-quota, restaurant-qualified 4COP SFS/SRX license. This is not a transferable 4COP quota license. Advertised package price: ${listing.packagePrice}.`;
  }
  if (isMiamiNonQuotaRestaurant(listing)) {
    const licenseLabel =
      listing.licenseClass === "2cop"
        ? "non-quota 2COP beer-and-wine license"
        : "non-quota, restaurant-qualified 4COP SFS/SRX license";
    return `Miami-Dade restaurant business opportunity with a ${licenseLabel}. This page is not a Miami 4COP quota-license listing and should not be confused with a restaurant package that includes a transferable 4COP quota license. Advertised package price: ${listing.packagePrice}.`;
  }
  if (isOrlandoRestaurant(listing)) {
    const licenseLabel =
      listing.licenseClass === "2cop"
        ? "2COP Beer & Wine license"
        : "4COP SFS/SRX full-liquor restaurant license";
    return `Orlando restaurant for sale in Orange County, Florida with a ${licenseLabel}. Advertised package price: ${listing.packagePrice}. This is a non-quota restaurant-license opportunity, with local Orlando market context and FLLM buyer matching.`;
  }

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
    title: metadataTitle(listing),
    description,
    alternates: { canonical: `${siteUrl}${canonicalPath}` },
    robots: { index: true, follow: true },
    keywords: isStJohnsQuotaTarget(listing)
      ? [
          "restaurant for sale in St. Johns County Florida with quota license",
          "St. Augustine restaurant for sale with 4COP quota license",
          "St. Johns County 4COP quota restaurant",
          "St. Augustine bar restaurant 4COP quota license",
        ]
      : isStJohnsSfs(listing)
        ? [
            "St. Johns County restaurant 4COP SFS",
            "St. Augustine restaurant 4COP SFS SRX",
            "non-quota restaurant liquor license",
          ]
        : isMiamiNonQuotaRestaurant(listing)
          ? listing.licenseClass === "2cop"
            ? [
                "Miami restaurant 2COP beer wine license",
                "Miami-Dade restaurant 2COP license",
                "non-quota restaurant liquor license Miami",
              ]
            : [
                "Miami restaurant 4COP SFS SRX",
                "Miami-Dade restaurant SFS license",
                "non-quota restaurant liquor license Miami",
              ]
          : isOrlandoRestaurant(listing)
            ? listing.licenseClass === "2cop"
              ? [
                  "Orlando restaurant for sale with liquor license",
                  "Orlando restaurant for sale 2COP",
                  "Orange County restaurant 2COP license",
                ]
              : [
                  "Orlando restaurants for sale with liquor license",
                  "Orlando restaurant for sale 4COP SFS SRX",
                  "Orange County restaurant full liquor license",
                ]
            : undefined,
    openGraph: {
      type: "website",
      url: `${siteUrl}${canonicalPath}`,
      title: metadataTitle(listing),
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
  const otherCountyListingsCount = businessQuotaListingRecords.filter(
    (candidate) =>
      candidate.publicationStatus === "published" &&
      candidate.county === listing.county &&
      candidate.listingReference !== listing.listingReference,
  ).length;
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
  const featuredBrokerListings = businessQuotaListingRecords
    .filter(
      (candidate) =>
        candidate.publicationStatus === "published" &&
        candidate.featured &&
        candidate.listingReference !== listing.listingReference &&
        candidate.county === listing.county &&
        (candidate.licenseType === listing.licenseType ||
          candidate.businessCategory === listing.businessCategory),
    )
    .sort((left, right) => {
      const leftExact =
        Number(left.licenseType === listing.licenseType) +
        Number(left.businessCategory === listing.businessCategory);
      const rightExact =
        Number(right.licenseType === listing.licenseType) +
        Number(right.businessCategory === listing.businessCategory);
      return rightExact - leftExact || left.title.localeCompare(right.title);
    })
    .slice(0, 3);

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
                {isStJohnsQuotaTarget(listing)
                  ? "Restaurant for sale in St. Johns County, Florida with a 4COP Quota liquor license, located in the St. Augustine market. Review the advertised $999,000 business package, quota-license classification and local market context."
                  : isStJohnsSfs(listing)
                    ? `Explore this ${listing.businessCategory.toLowerCase()} opportunity in St. Johns County with a non-quota 4COP SFS/SRX restaurant license. This classification is restaurant-qualified and is not a transferable 4COP quota license.`
                    : isMiamiNonQuotaRestaurant(listing)
                      ? listing.licenseClass === "2cop"
                        ? "Explore this Miami-Dade restaurant opportunity with a non-quota 2COP Beer & Wine license. A 2COP license does not provide distilled-spirit privileges and is not a transferable 4COP quota license."
                        : "Explore this Miami-Dade restaurant opportunity with a non-quota, restaurant-qualified 4COP SFS/SRX license. This is not a transferable 4COP quota license."
                      : isOrlandoRestaurant(listing)
                        ? listing.licenseClass === "2cop"
                          ? "Orlando restaurant for sale with a 2COP Beer & Wine license in Orange County, Florida. Review the advertised package price, non-quota license classification and local Orlando restaurant market context."
                          : "Orlando restaurant for sale with a 4COP SFS/SRX full-liquor restaurant license in Orange County, Florida. Review the advertised package price, non-quota restaurant-license classification and local Orlando market context."
                        : `Explore this ${listing.businessCategory.toLowerCase()} opportunity in ${listing.county}, including the advertised package price, liquor-license classification and local market context.`}
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

            <BusinessMarketHeroMap
              county={listing.county}
              primaryMarkets={primaryMarkets}
              title={listing.title}
              packagePrice={listing.packagePrice}
              licenseType={listing.licenseType}
              businessType={listing.businessType}
              otherListingsCount={otherCountyListingsCount}
            />
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
                  {isStJohnsQuotaTarget(listing)
                    ? "FLLM is tracking this St. Augustine restaurant and sports-bar opportunity in St. Johns County at an advertised package price of $999,000. The business package includes a 4COP Quota liquor license, a county-specific transferable quota license subject to regulatory approval and buyer qualification."
                    : isStJohnsSfs(listing)
                      ? `FLLM is tracking an advertised ${listing.businessType.toLowerCase()} opportunity in St. Johns County at ${listing.packagePrice}. The business uses a 4COP SFS/SRX restaurant license, which is non-quota and tied to the qualifying restaurant operation rather than a separately transferable quota license.`
                      : isMiamiNonQuotaRestaurant(listing)
                        ? listing.licenseClass === "2cop"
                          ? `FLLM is tracking an advertised ${listing.businessType.toLowerCase()} opportunity in Miami-Dade County at ${listing.packagePrice}. The business uses a 2COP Beer & Wine license, a non-quota license that should not be confused with a transferable 4COP quota license.`
                          : `FLLM is tracking an advertised ${listing.businessType.toLowerCase()} opportunity in Miami-Dade County at ${listing.packagePrice}. The business uses a 4COP SFS/SRX restaurant license, a non-quota classification tied to the qualifying restaurant operation and premises.`
                        : isOrlandoRestaurant(listing)
                          ? listing.licenseClass === "2cop"
                            ? `FLLM is tracking this Orlando restaurant opportunity in Orange County at ${listing.packagePrice}. The business uses a 2COP Beer & Wine license, a non-quota restaurant license for beer-and-wine privileges.`
                            : `FLLM is tracking this Orlando restaurant and bar opportunity in Orange County at ${listing.packagePrice}. The business uses a 4COP SFS/SRX restaurant license, a non-quota full-liquor classification tied to the qualifying restaurant operation and approved premises.`
                          : `FLLM is tracking an advertised ${listing.businessType.toLowerCase()} opportunity in ${listing.county} at ${listing.packagePrice}. The business package includes a ${listing.licenseType}.`}
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
                {localMarketOverview(listing, county) ? <p>{localMarketOverview(listing, county)}</p> : null}
                <p>{categoryContext(listing)}</p>
              </section>

              <section className="business-market-panel business-market-license-panel">
                <div className="business-market-section-heading">
                  <span>{isStJohnsSfs(listing) || isMiamiNonQuotaRestaurant(listing) || isOrlandoRestaurant(listing) ? "Non-Quota Restaurant License" : "License Included"}</span>
                  <h2>{listing.licenseType}</h2>
                </div>
                <p>{licenseContext(listing)}</p>
                <div className="business-market-license-links">
                  <Link href={listing.countyHref}>View {listing.county} license market ›</Link>
                  <Link href="/resources/florida-liquor-license-types">Compare Florida license types ›</Link>
                  {listing.businessCategory === "Gentlemen's Club" ? (
                    <Link href="/businesses-with-quota-licenses/gentlemens-clubs">More Florida gentlemen's clubs for sale ›</Link>
                  ) : null}
                  {listing.businessCategory === "Restaurant" && listing.licenseType === "4COP Quota" ? (
                    <Link href="/restaurants-with-liquor-licenses#quota-restaurant-inventory">More Florida restaurants for sale with 4COP quota licenses ›</Link>
                  ) : null}
                  {isStJohnsSfs(listing) ? (
                    <Link href="/business-market/fllm-mkt-q-004">Looking for a St. Johns County restaurant with a 4COP Quota license? ›</Link>
                  ) : null}
                  {isMiamiNonQuotaRestaurant(listing) ? (
                    <Link href="/restaurants-with-liquor-licenses#miami-dade-quota-restaurants">Looking for a Miami restaurant with a transferable 4COP Quota license? ›</Link>
                  ) : null}
                  {isOrlandoRestaurant(listing) ? (
                    <Link href="/restaurants-with-liquor-licenses#orlando-restaurant-listings">More Orlando restaurants for sale with liquor licenses ›</Link>
                  ) : null}
                </div>
              </section>

              {featuredBrokerListings.length ? (
                <section className="business-market-panel business-market-featured-brokers">
                  <div className="business-market-section-heading">
                    <span>Featured FLLM Broker Listings</span>
                    <h2>Broker-represented opportunities in {listing.county}</h2>
                  </div>
                  <p>
                    FLLM also has broker-represented listings in this county. These featured
                    listings link directly to the broker's dedicated FLLM page.
                  </p>
                  <div className="business-market-featured-broker-grid">
                    {featuredBrokerListings.map((item) => (
                      <Link key={item.listingReference} href={item.href}>
                        <span>{item.brokerName ? `Featured broker · ${item.brokerName}` : "Featured FLLM listing"}</span>
                        <strong>{item.title}</strong>
                        <small>{item.packagePrice} · {item.licenseType}</small>
                        <em>View Featured Listing ›</em>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
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
