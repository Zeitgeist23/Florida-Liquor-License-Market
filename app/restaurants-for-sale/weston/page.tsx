import type { Metadata } from "next";
import Link from "next/link";

import BusinessPackageLocalMarkets from "@/components/BusinessPackageLocalMarkets";
import BusinessQuotaListingCard from "@/components/BusinessQuotaListingCard";
import {
  FllmButton,
  FllmCard,
  FllmCardGrid,
  FllmPageShell,
  FllmSectionHeading,
} from "@/components/FllmDesignSystem";
import {
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../../fllm-official-template.css";
import "../../fllm-design-system.css";
import "../../listings/listings-premium.css";
import "../../businesses-with-quota-licenses/business-inventory.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/restaurants-for-sale/weston`;

export const metadata: Metadata = {
  title: "Weston, FL Restaurants for Sale | Full Liquor & Italian Market | FLLM",
  description:
    "Explore the Weston, Florida restaurant-for-sale market through FLLM, including full-liquor, 4COP, Italian restaurant and nearby Broward County opportunities. Exact listing locations are identified on each card.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "restaurants for sale in Weston Florida",
    "restaurant for sale Weston FL",
    "Italian restaurant for sale Weston Florida",
    "full liquor restaurant for sale Weston Florida",
    "restaurant for sale with full liquor license Weston Florida",
    "4COP restaurant for sale Weston Florida",
    "Broward County restaurants for sale",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Weston, FL Restaurants for Sale | Full Liquor & Italian Market | FLLM",
    description:
      "Weston and Broward County restaurant opportunities organized by cuisine, business type and liquor-license structure.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function WestonRestaurantsForSalePage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );

  const browardRestaurantListings = [
    ...withMarketLicenseValues(businessQuotaListings, standaloneListings),
    ...withMarketLicenseValues(businessSfsListings, standaloneListings),
    ...withMarketLicenseValues(business2copListings, standaloneListings),
  ].filter(
    (listing) =>
      listing.county === "Broward County" &&
      (listing.businessCategory === "Restaurant" ||
        /restaurant/i.test(`${listing.title} ${listing.businessType}`)),
  );

  const fullLiquorRestaurantListings = browardRestaurantListings.filter(
    (listing) =>
      listing.licenseType === "4COP Quota" ||
      listing.licenseType === "4COP SFS/SRX",
  );

  const italianRestaurantListings = browardRestaurantListings.filter(
    (listing) =>
      listing.cuisines?.includes("Italian") ||
      /italian/i.test(`${listing.title} ${listing.businessType}`),
  );

  const exactWestonListings = browardRestaurantListings.filter((listing) =>
    /\bweston\b/i.test(`${listing.title} ${listing.businessType}`),
  );

  const nearbyBrowardListings = browardRestaurantListings.filter(
    (listing) => !exactWestonListings.includes(listing),
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Weston, Florida Restaurants for Sale",
      url: canonicalUrl,
      description:
        "FLLM local-market coverage for Weston and nearby Broward County restaurant opportunities, including full-liquor, 4COP and Italian restaurant searches.",
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
          name: "Florida Restaurants for Sale",
          item: `${siteUrl}/restaurants-with-liquor-licenses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Weston Restaurants for Sale",
          item: canonicalUrl,
        },
      ],
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
            <Link href="/">Home</Link><span>›</span>
            <Link href="/restaurants-with-liquor-licenses">Restaurants</Link><span>›</span>
            <strong>Weston</strong>
          </div>
          <span className="fllm-template-eyebrow">Weston · Broward County Restaurant Market</span>
          <h1 className="fllm-template-hero-title">Restaurants for Sale in Weston, Florida</h1>
          <p className="fllm-template-hero-copy">
            Search the Weston restaurant-for-sale market through FLLM by restaurant concept, cuisine and
            alcoholic-beverage license structure. FLLM connects Weston search demand to current Broward County
            restaurant inventory while keeping each listing&apos;s actual location explicit. Buyers can compare
            full-liquor opportunities, 4COP quota and 4COP SFS / SRX structures, Italian restaurant inventory,
            and other nearby Broward County restaurant businesses.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#weston-market-inventory">
              View Weston-Area Restaurant Inventory
            </Link>
            <FllmButton href="/counties/broward" variant="outline">
              Broward County Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Weston Restaurant Search Paths"
            title="Full liquor, Italian restaurants and Broward County opportunities"
            copy={
              <p>
                Buyers do not always search by Florida license-series terminology. FLLM organizes the same market
                using the phrases buyers actually use, including full liquor, Italian restaurant, 4COP restaurant,
                restaurant and bar, and Broward County restaurant-for-sale searches.
              </p>
            }
            align="center"
          />
          <FllmCardGrid columns={3}>
            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Full Liquor</span>}
              title="Restaurants for Sale With Full Liquor"
              variant="gold"
            >
              <p>
                Weston-area full-liquor searches may involve a transferable 4COP quota license or a qualifying
                4COP SFS / SRX restaurant license. FLLM separates those structures so buyers can evaluate the
                correct type of opportunity.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="#full-liquor-weston">
                  View Full-Liquor Inventory
                </Link>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Italian</span>}
              title="Italian Restaurants for Sale"
              variant="gold"
            >
              <p>
                Browse Italian restaurant opportunities serving the Weston and broader Broward County search market.
                Listings retain their actual city and county location rather than being relabeled as Weston inventory.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/italian">
                  Browse Italian Restaurants
                </Link>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Broward County</span>}
              title="Nearby Restaurant Opportunities"
              variant="gold"
            >
              <p>
                Weston is part of the Broward County hospitality market. Nearby inventory may appear in Fort Lauderdale,
                Hollywood, Pompano Beach, Oakland Park and other Broward communities.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/counties/broward" variant="outline">
                  Broward County Listings
                </FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="weston-market-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Weston & Broward Restaurant Market"
            title="Restaurant opportunities relevant to Weston buyers"
            copy={
              <p>
                {exactWestonListings.length
                  ? `FLLM currently shows ${exactWestonListings.length} restaurant listing${exactWestonListings.length === 1 ? "" : "s"} explicitly located in Weston, plus additional Broward County restaurant inventory.`
                  : "FLLM does not currently show a published restaurant listing explicitly located in Weston. The inventory below is current Broward County restaurant inventory displayed with its actual location so Weston buyers can compare nearby opportunities without location ambiguity."}
              </p>
            }
          />

          <BusinessPackageLocalMarkets
            listings={browardRestaurantListings}
            label="Broward County restaurant markets represented in current inventory"
          />

          {exactWestonListings.length ? (
            <div className="business-quota-grid">
              {exactWestonListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : null}

          {nearbyBrowardListings.length ? (
            <>
              <FllmSectionHeading
                eyebrow="Nearby Broward County Inventory"
                title="Restaurant businesses near the Weston market"
              />
              <div className="business-quota-grid">
                {nearbyBrowardListings.map((listing) => (
                  <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className="fllm-template-section" id="full-liquor-weston">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Weston Full-Liquor Restaurant Search"
            title="Full-liquor restaurant opportunities in the Weston and Broward market"
            copy={
              <p>
                “Full liquor” is common buyer language. In Florida, a restaurant may have distilled-spirit privileges
                through a transferable 4COP quota license or, if the operation qualifies, a location-specific
                4COP SFS / SRX license. FLLM identifies which structure applies to each business.
              </p>
            }
          />
          {fullLiquorRestaurantListings.length ? (
            <div className="business-quota-grid">
              {fullLiquorRestaurantListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : (
            <FllmCard title="No current Broward full-liquor restaurant inventory." variant="gold">
              <p>FLLM will show qualifying 4COP restaurant opportunities here as they are published.</p>
            </FllmCard>
          )}
        </div>
      </section>

      {italianRestaurantListings.length ? (
        <section className="fllm-template-section fllm-template-section--deep" id="italian-weston">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Weston Italian Restaurant Search"
              title="Italian restaurants for sale in the Weston and Broward County market"
              copy={
                <p>
                  FLLM currently tracks Italian restaurant opportunities in Broward County. The cards below preserve the
                  actual listing location while making those businesses discoverable to buyers searching the broader Weston
                  restaurant market.
                </p>
              }
            />
            <div className="business-quota-grid">
              {italianRestaurantListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Weston Restaurant Market</span>
            <h2>Search Weston without confusing the actual location of the business.</h2>
            <p>
              FLLM can target Weston buyer intent while keeping Broward County inventory factually labeled by its real
              city, license type and restaurant concept.
            </p>
          </div>
          <div className="fllm-ui-final-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-with-liquor-licenses">
              All Florida Restaurants
            </Link>
            <FllmButton href="/license-alerts" variant="outline">Get a Listing Alert</FllmButton>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
