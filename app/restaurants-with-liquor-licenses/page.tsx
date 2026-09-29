import type { Metadata } from "next";
import Link from "next/link";

import BusinessQuotaListingCard from "@/components/BusinessQuotaListingCard";
import BusinessPackageLocalMarkets from "@/components/BusinessPackageLocalMarkets";
import {
  FllmButton,
  FllmCard,
  FllmCardGrid,
  FllmPageShell,
  FllmSectionHeading,
} from "@/components/FllmDesignSystem";
import {
  BUSINESS_LISTING_DISPLAY_LIMIT,
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../fllm-official-template.css";
import "../fllm-design-system.css";
import "../listings/listings-premium.css";
import "../businesses-with-quota-licenses/business-inventory.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/restaurants-with-liquor-licenses`;

export const metadata: Metadata = {
  title: "Florida Restaurants for Sale With Liquor Licenses | 4COP, SFS & 2COP | FLLM",
  description:
    "Browse Florida restaurants for sale with 4COP quota liquor licenses, 4COP SFS / SRX licenses and 2COP beer-and-wine licenses. Compare active restaurant opportunities by license type and county.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Miami restaurant with quota license for sale",
    "Miami restaurant for sale with 4COP quota license",
    "Miami-Dade restaurant for sale with quota liquor license",
    "Florida restaurant for sale with liquor license",
    "4COP quota restaurant for sale",
    "Orlando restaurants for sale with liquor license",
    "Orlando restaurant for sale with 4COP SFS SRX license",
    "Orange County restaurant for sale with liquor license",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Restaurants for Sale With Liquor Licenses | 4COP, SFS & 2COP | FLLM",
    description:
      "Browse Florida restaurants for sale with transferable 4COP quota licenses, 4COP SFS / SRX restaurant licenses, and 2COP beer-and-wine licenses.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function RestaurantsWithLiquorLicensesPage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );
  const quotaListingsWithValues = withMarketLicenseValues(
    businessQuotaListings,
    standaloneListings,
  );
  const sfsListingsWithValues = withMarketLicenseValues(
    businessSfsListings,
    standaloneListings,
  );
  const twoCopListingsWithValues = withMarketLicenseValues(
    business2copListings,
    standaloneListings,
  );
  const allRestaurantListings = [
    ...quotaListingsWithValues,
    ...sfsListingsWithValues,
    ...twoCopListingsWithValues,
  ].filter(
    (listing) =>
      listing.businessCategory === "Restaurant" ||
      /restaurant/i.test(`${listing.title} ${listing.businessType}`),
  );
  const allQuotaRestaurantListings = quotaListingsWithValues.filter(
    (listing) =>
      listing.licenseType === "4COP Quota" &&
      (listing.businessCategory === "Restaurant" ||
        /restaurant/i.test(`${listing.title} ${listing.businessType}`)),
  );
  const quotaRestaurantListings = allQuotaRestaurantListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);
  const restaurantListings = allRestaurantListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);
  const stJohnsRestaurantListings = allRestaurantListings.filter(
    (listing) => listing.county === "St. Johns County",
  );
  const miamiRestaurantListings = allRestaurantListings.filter(
    (listing) => listing.county === "Miami-Dade County",
  );
  const miamiQuotaRestaurantListings = allQuotaRestaurantListings.filter(
    (listing) => listing.county === "Miami-Dade County",
  );
  const orlandoRestaurantListings = allRestaurantListings.filter(
    (listing) => listing.county === "Orange County",
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Restaurants for Sale With Liquor Licenses",
      url: canonicalUrl,
      description:
        "Florida restaurants for sale with 4COP quota liquor licenses, 4COP SFS / SRX licenses, and 2COP beer-and-wine licenses.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Restaurants With Liquor Licenses", item: canonicalUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Restaurants for Sale With 4COP Quota Licenses in Florida",
      numberOfItems: quotaRestaurantListings.length,
      itemListElement: quotaRestaurantListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.title,
        url: `${siteUrl}${listing.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida restaurant businesses with liquor licenses",
      numberOfItems: restaurantListings.length,
      itemListElement: restaurantListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.title,
        url: `${siteUrl}${listing.href}`,
      })),
    },
  ];

  return (
    <FllmPageShell className="restaurants-with-liquor-licenses-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="fllm-template-hero">
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><strong>Restaurants With Liquor Licenses</strong>
          </div>
          <span className="fllm-template-eyebrow">Florida Restaurants for Sale + Liquor License Market</span>
          <h1 className="fllm-template-hero-title">Florida Restaurants for Sale With Liquor Licenses</h1>
          <p className="fllm-template-hero-copy">
            Browse Florida restaurants and restaurant/bar businesses for sale with 4COP quota liquor licenses,
            4COP SFS / SRX licenses and 2COP beer-and-wine licenses. FLLM keeps transferable quota-license packages
            separate from qualification-based restaurant licenses while bringing all three restaurant license paths
            into one marketplace hub.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#restaurant-inventory">View Restaurant Listings</Link>
            <FllmButton href="#license-paths" variant="outline">Compare License Paths</FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="license-paths">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Restaurant License Paths"
            title="One restaurant market. Different Florida license structures."
            copy={
              <p>
                The appropriate license depends on the alcohol privileges, operating model, premises and regulatory
                qualifications. Use these FLLM paths to reach the matching inventory or license information.
              </p>
            }
            align="center"
          />

          <FllmCardGrid columns={3}>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Transferable full-liquor asset</span>} title="Restaurants With 4COP Quota Licenses" variant="gold">
              <p>
                Restaurant acquisitions that include a county-specific transferable 4COP quota license. The license can
                represent a separately valued asset within the business transaction.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="#quota-restaurant-inventory">Browse 4COP Quota Restaurants</Link>
                <FllmButton href="/license-types/4cop-quota" variant="outline">4COP Quota Guide</FllmButton>
              </div>
            </FllmCard>

            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Qualification-based full liquor</span>} title="Restaurants With 4COP SFS / SRX Licenses" variant="gold">
              <p>
                Qualifying restaurant businesses operating with premises-dependent full-liquor privileges under Florida's
                special food-service framework.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/listings?type=businesses-sfs">Browse SFS / SRX Listings</Link>
                <FllmButton href="/license-types/4cop-sfs-restaurant" variant="outline">SFS / SRX Guide</FllmButton>
              </div>
            </FllmCard>

            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Beer & wine</span>} title="Restaurants With 2COP Licenses" variant="gold">
              <p>
                Restaurant businesses using a 2COP beer-and-wine license rather than distilled-spirit privileges. These
                listings remain separate from quota-license inventory.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/listings?type=businesses-2cop">Browse 2COP Listings</Link>
                <FllmButton href="/license-types/2cop-beer-wine" variant="outline">2COP Guide</FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="quota-restaurant-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Transferable 4COP Quota Restaurant Packages"
            title="Restaurants for Sale With 4COP Quota Licenses in Florida"
            copy={
              <p>
                Browse Florida restaurants and bar-and-grill businesses for sale with transferable 4COP quota liquor
                licenses included in the acquisition. These opportunities are separate from restaurants operating under
                location-specific 4COP SFS / SRX licenses, because a 4COP quota license is a county-limited transferable
                asset that can carry a separately analyzed license value within the business transaction.
              </p>
            }
          />
          <BusinessPackageLocalMarkets
            listings={allQuotaRestaurantListings}
            label="Florida markets for restaurants with 4COP quota licenses in current inventory"
          />

          {quotaRestaurantListings.length ? (
            <div className="business-quota-grid">
              {quotaRestaurantListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <FllmCard title="No published restaurant + 4COP quota packages are available right now." variant="gold">
              <p>FLLM will display qualifying restaurant acquisitions with included transferable 4COP quota licenses here as they are published.</p>
            </FllmCard>
          )}
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="restaurant-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Restaurant Inventory"
            title="Florida restaurant businesses currently published on FLLM"
          />
          {/* Restaurant inventory explanatory copy intentionally omitted. */}
          <BusinessPackageLocalMarkets listings={allRestaurantListings} />


          {restaurantListings.length ? (
            <div className="business-quota-grid">
              {restaurantListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <FllmCard title="No published restaurant packages are available right now." variant="gold">
              <p>Use the listing categories above to monitor new restaurant opportunities as they are published.</p>
            </FllmCard>
          )}
        </div>
      </section>

      <section className="fllm-template-section" id="miami-dade-quota-restaurants">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Miami & Miami-Dade County"
            title="Miami restaurants for sale with 4COP quota liquor licenses"
            copy={
              <p>
                FLLM keeps Miami-Dade restaurant opportunities with transferable 4COP quota licenses separate from
                non-quota 4COP SFS / SRX and 2COP restaurant listings. A 4COP quota license is a county-limited
                transferable full-liquor license; 4COP SFS / SRX and 2COP licenses are different license structures
                and should not be treated as quota inventory.
              </p>
            }
          />

          {miamiQuotaRestaurantListings.length ? (
            <div className="business-quota-grid">
              {miamiQuotaRestaurantListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <FllmCard title="No published Miami-Dade restaurant + 4COP quota package is currently available on FLLM." variant="gold">
              <p>
                Current Miami-Dade restaurant inventory on FLLM includes other license structures, but those listings
                are not quota licenses. Buyers seeking a transferable 4COP quota restaurant package can monitor this
                section, review the Miami-Dade quota-license market, or request an alert for new inventory.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/counties/miami-dade" variant="outline">Miami-Dade Quota License Market</FllmButton>
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/license-alerts">Get a License Alert</Link>
              </div>
            </FllmCard>
          )}

          {miamiRestaurantListings.length ? (
            <div className="fllm-ui-actions">
              <Link className="btn btn-gold fllm-ui-official-gold-button" href="#restaurant-inventory">
                View All Miami-Dade Restaurant License Types
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {orlandoRestaurantListings.length ? (
        <section className="fllm-template-section fllm-template-section--deep" id="orlando-restaurant-listings">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Orlando & Orange County"
              title="Orlando restaurants for sale with liquor licenses"
              copy={
                <p>
                  Browse FLLM's Orlando and Orange County restaurant opportunities by license structure. Current
                  restaurant inventory may include non-quota 4COP SFS / SRX full-liquor restaurant licenses and
                  2COP beer-and-wine licenses. These classifications are kept separate from transferable 4COP quota
                  licenses so buyers can compare the correct license path for each Orlando restaurant opportunity.
                </p>
              }
            />
            <div className="business-quota-grid">
              {orlandoRestaurantListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
            <div className="fllm-ui-actions">
              <FllmButton href="/counties/orange" variant="outline">Orange County Liquor License Market</FllmButton>
              <Link className="btn btn-gold fllm-ui-official-gold-button" href="/listings?county=Orange%20County">
                View Orange County Listings
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {stJohnsRestaurantListings.length ? (
        <section className="fllm-template-section">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="St. Augustine & St. Johns County"
              title="Restaurants for sale with liquor licenses in St. Augustine and St. Johns County"
              copy={
                <p>
                  FLLM currently tracks {stJohnsRestaurantListings.length} restaurant or restaurant/bar business
                  package{stJohnsRestaurantListings.length === 1 ? "" : "s"} in St. Johns County, including
                  transferable 4COP quota and qualification-based 4COP SFS / SRX opportunities. These business
                  packages are kept separate from standalone St. Johns County liquor-license inventory.
                </p>
              }
            />
            <div className="fllm-ui-actions">
              <Link className="btn btn-gold fllm-ui-official-gold-button" href="#restaurant-inventory">
                View St. Johns Restaurant Packages
              </Link>
              <FllmButton href="/counties/st-johns" variant="outline">
                St. Johns County License Market
              </FllmButton>
            </div>
          </div>
        </section>
      ) : null}

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">For Buyers, Sellers & Brokers</span>
            <h2>Use FLLM for the restaurant and liquor-license side of the transaction.</h2>
            <p>
              Compare current listings, review license structures, evaluate market information and connect with FLLM
              transaction resources without mixing restaurant-license categories with standalone quota inventory.
            </p>
          </div>
          <div className="fllm-ui-final-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button restaurant-list-cta" href="/brokers/list-your-license">List a Restaurant Opportunity</Link>
            <FllmButton href="/contact" variant="outline">Contact FLLM</FllmButton>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
