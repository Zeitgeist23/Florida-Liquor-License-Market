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
const canonicalUrl = `${siteUrl}/restaurants-for-sale/miami`;

export const metadata: Metadata = {
  title: "Miami Restaurants for Sale | Miami-Dade Restaurant Market | FLLM",
  description:
    "Browse Miami restaurants for sale in Miami-Dade County by concept, cuisine and asking-price signal. FLLM also shows the actual liquor-license structure, including 4COP quota, 4COP SFS / SRX and 2COP.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "restaurants for sale in Miami Florida",
    "restaurant for sale Miami FL",
    "restaurant for sale Miami Florida",
    "full liquor restaurant for sale Miami Florida",
    "restaurant for sale with full liquor license Miami Florida",
    "4COP restaurant for sale Miami Florida",
    "Miami-Dade County restaurants for sale",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Miami Restaurants for Sale | FLLM",
    description:
      "Miami and Miami-Dade County restaurant opportunities organized by cuisine, business type and liquor-license structure.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function MiamiRestaurantsForSalePage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );

  const browardRestaurantListings = [
    ...withMarketLicenseValues(businessQuotaListings, standaloneListings),
    ...withMarketLicenseValues(businessSfsListings, standaloneListings),
    ...withMarketLicenseValues(business2copListings, standaloneListings),
  ].filter(
    (listing) =>
      listing.county === "Miami-Dade County" &&
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

  const exactMiamiListings = browardRestaurantListings.filter((listing) =>
    /\bmiami\b/i.test(`${listing.title} ${listing.businessType}`),
  );

  const nearbyBrowardListings = browardRestaurantListings.filter(
    (listing) => !exactMiamiListings.includes(listing),
  );

  const miamiFaqs = [
    {
      question: "Where can I search for restaurants for sale in Miami, Florida?",
      answer: "FLLM's Miami restaurant market page organizes Miami buyer searches around Miami-Dade County restaurant activity, full-liquor privileges, 4COP license structures and cuisine while preserving the actual location of each Market View.",
    },
    {
      question: "What does full liquor mean for a restaurant for sale in Miami?",
      answer: "Full liquor is common buyer language. In Florida, distilled-spirit restaurant privileges may involve a transferable 4COP quota license or a qualifying location-specific 4COP SFS / SRX restaurant license.",
    },
    {
      question: "Where can I find restaurants for sale near Miami?",
      answer: "FLLM links Miami restaurant searches to its Miami-Dade County and restaurant market pages. Nearby Market Views retain their actual city and county rather than being presented as businesses physically located in Miami.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Miami, Florida Restaurants for Sale",
      url: canonicalUrl,
      description:
        "FLLM local-market coverage for Miami and nearby Miami-Dade County restaurant opportunities, including full-liquor, 4COP and restaurant searches.",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: miamiFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
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
          name: "Miami Restaurants for Sale",
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
            <strong>Miami</strong>
          </div>
          <span className="fllm-template-eyebrow">Miami · Miami-Dade County Restaurant Market</span>
          <h1 className="fllm-template-hero-title">Miami Restaurants for Sale</h1>
          <p className="fllm-template-hero-copy">
            Search the Miami restaurant-for-sale market through FLLM by restaurant concept, cuisine, asking-price signal and
            location. FLLM then adds the alcoholic-beverage license structure so buyers can compare Miami-Dade County
            restaurant Market Views while keeping each listing&apos;s actual location explicit. Buyers can compare
            full-liquor opportunities, 4COP quota and 4COP SFS / SRX structures, restaurant Market Views,
            and other nearby Miami-Dade County restaurant businesses.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#miami-market-inventory">
              View Miami-Area Restaurant Market Views
            </Link>
            <FllmButton href="/counties/miami-dade" variant="outline">
              Miami-Dade County Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Miami Restaurant Search Paths"
            title="Full liquor, restaurants and Miami-Dade County opportunities"
            copy={
              <p>
                Buyers do not always search by Florida license-series terminology. FLLM organizes the same market
                using the phrases buyers actually use, including full liquor, restaurant, 4COP restaurant,
                restaurant and bar, and Miami-Dade County restaurant-for-sale searches.
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
                Miami-area full-liquor searches may involve a transferable 4COP quota license or a qualifying
                4COP SFS / SRX restaurant license. FLLM separates those structures so buyers can evaluate the
                correct type of opportunity.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="#full-liquor-miami">
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
                Browse restaurant opportunities serving the Miami and broader Miami-Dade County search market.
                Listings retain their actual city and county location rather than being relabeled as Miami inventory.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/italian">
                  Browse Italian Restaurants
                </Link>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Miami-Dade County</span>}
              title="Nearby Restaurant Opportunities"
              variant="gold"
            >
              <p>
                Miami is part of the Miami-Dade County hospitality market. Nearby inventory may appear in Miami Beach, Coral Gables, Doral, Kendall and other Miami-Dade communities.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/counties/miami-dade" variant="outline">
                  Miami-Dade County Listings
                </FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="miami-market-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Miami & Miami-Dade Restaurant Market"
            title="Restaurant opportunities relevant to Miami buyers"
            copy={
              <p>
                {exactMiamiListings.length
                  ? `FLLM currently shows ${exactMiamiListings.length} restaurant Market View${exactMiamiListings.length === 1 ? "" : "s"} explicitly located in Miami, plus additional Miami-Dade County restaurant Market Views.`
                  : "FLLM does not currently show a published restaurant Market View explicitly located in Miami. The inventory below is current Miami-Dade County restaurant Market Views displayed with its actual location so Miami buyers can compare nearby opportunities without location ambiguity."}
              </p>
            }
          />

          <BusinessPackageLocalMarkets
            listings={browardRestaurantListings}
            label="Miami-Dade County restaurant markets represented in current inventory"
          />

          {exactMiamiListings.length ? (
            <div className="business-quota-grid">
              {exactMiamiListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : null}

          {nearbyBrowardListings.length ? (
            <>
              <FllmSectionHeading
                eyebrow="Nearby Miami-Dade County Inventory"
                title="Restaurant businesses near the Miami market"
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

      <section className="fllm-template-section" id="full-liquor-miami">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Miami Full-Liquor Restaurant Search"
            title="Full-liquor restaurant opportunities in the Miami and Broward market"
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
            <FllmCard title="No current Broward full-liquor restaurant Market Views." variant="gold">
              <p>FLLM will show qualifying 4COP restaurant opportunities here as they are published.</p>
            </FllmCard>
          )}
        </div>
      </section>

      {italianRestaurantListings.length ? (
        <section className="fllm-template-section fllm-template-section--deep" id="italian-miami">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Miami Italian Restaurant Search"
              title="restaurants for sale in the Miami and Miami-Dade County market"
              copy={
                <p>
                  FLLM currently tracks observed restaurant market activity in Miami-Dade County. The Market Views below
                  preserve the actual location while helping buyers research the broader Miami restaurant market.
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
            <span className="fllm-template-eyebrow">Miami Restaurant Market</span>
            <h2>Search Miami without confusing the actual location of the business.</h2>
            <p>
              FLLM can target Miami buyer intent while keeping Miami-Dade County inventory factually labeled by its real
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
