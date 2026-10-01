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
const canonicalUrl = `${siteUrl}/restaurants-for-sale/delray-beach`;

export const metadata: Metadata = {
  title: "Delray Beach, FL Restaurants for Sale | Full Liquor & Italian Market | FLLM",
  description:
    "Explore the Delray Beach, Florida restaurant-for-sale market through FLLM, including full-liquor, 4COP, Italian restaurant and nearby Palm Beach County opportunities. Exact listing locations are identified on each card.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "restaurants for sale in Delray Beach Florida",
    "restaurant for sale Delray Beach FL",
    "Italian restaurant for sale Delray Beach Florida",
    "full liquor restaurant for sale Delray Beach Florida",
    "restaurant for sale with full liquor license Delray Beach Florida",
    "4COP restaurant for sale Delray Beach Florida",
    "Palm Beach County restaurants for sale",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Delray Beach, FL Restaurants for Sale | Full Liquor & Italian Market | FLLM",
    description:
      "Delray Beach and Palm Beach County restaurant opportunities organized by cuisine, business type and liquor-license structure.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function DelrayBeachRestaurantsForSalePage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );

  const browardRestaurantListings = [
    ...withMarketLicenseValues(businessQuotaListings, standaloneListings),
    ...withMarketLicenseValues(businessSfsListings, standaloneListings),
    ...withMarketLicenseValues(business2copListings, standaloneListings),
  ].filter(
    (listing) =>
      listing.county === "Palm Beach County" &&
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

  const exactDelrayBeachListings = browardRestaurantListings.filter((listing) =>
    /\bdelray beach\b/i.test(`${listing.title} ${listing.businessType}`),
  );

  const nearbyBrowardListings = browardRestaurantListings.filter(
    (listing) => !exactDelrayBeachListings.includes(listing),
  );

  const delrayBeachFaqs = [
    {
      question: "Where can I search for restaurants for sale in Delray Beach, Florida?",
      answer: "FLLM's Delray Beach restaurant market page organizes Delray Beach buyer searches around Palm Beach County restaurant activity, full-liquor privileges, 4COP license structures and cuisine while preserving the actual location of each Market View.",
    },
    {
      question: "What does full liquor mean for a restaurant for sale in Delray Beach?",
      answer: "Full liquor is common buyer language. In Florida, distilled-spirit restaurant privileges may involve a transferable 4COP quota license or a qualifying location-specific 4COP SFS / SRX restaurant license.",
    },
    {
      question: "Where can I find Italian restaurants for sale near Delray Beach?",
      answer: "FLLM links Delray Beach restaurant searches to its Palm Beach County and Italian restaurant market pages. Nearby Market Views retain their actual city and county rather than being presented as businesses physically located in Delray Beach.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Delray Beach, Florida Restaurants for Sale",
      url: canonicalUrl,
      description:
        "FLLM local-market coverage for Delray Beach and nearby Palm Beach County restaurant opportunities, including full-liquor, 4COP and Italian restaurant searches.",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: delrayBeachFaqs.map((faq) => ({
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
          name: "Delray Beach Restaurants for Sale",
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
            <strong>Delray Beach</strong>
          </div>
          <span className="fllm-template-eyebrow">Delray Beach · Palm Beach County Restaurant Market</span>
          <h1 className="fllm-template-hero-title">Restaurants for Sale in Delray Beach, Florida</h1>
          <p className="fllm-template-hero-copy">
            Search the Delray Beach restaurant-for-sale market through FLLM by restaurant concept, cuisine and
            alcoholic-beverage license structure. FLLM connects Delray Beach search demand to current Palm Beach County
            restaurant Market Views while keeping each listing&apos;s actual location explicit. Buyers can compare
            full-liquor opportunities, 4COP quota and 4COP SFS / SRX structures, Italian restaurant Market Views,
            and other nearby Palm Beach County restaurant businesses.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#delray-beach-market-inventory">
              View Delray Beach-Area Restaurant Market Views
            </Link>
            <FllmButton href="/counties/palm-beach" variant="outline">
              Palm Beach County Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Delray Beach Restaurant Search Paths"
            title="Full liquor, Italian restaurants and Palm Beach County opportunities"
            copy={
              <p>
                Buyers do not always search by Florida license-series terminology. FLLM organizes the same market
                using the phrases buyers actually use, including full liquor, Italian restaurant, 4COP restaurant,
                restaurant and bar, and Palm Beach County restaurant-for-sale searches.
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
                Delray Beach-area full-liquor searches may involve a transferable 4COP quota license or a qualifying
                4COP SFS / SRX restaurant license. FLLM separates those structures so buyers can evaluate the
                correct type of opportunity.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="#full-liquor-delray-beach">
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
                Browse Italian restaurant opportunities serving the Delray Beach and broader Palm Beach County search market.
                Listings retain their actual city and county location rather than being relabeled as Delray Beach inventory.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/italian">
                  Browse Italian Restaurants
                </Link>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Palm Beach County</span>}
              title="Nearby Restaurant Opportunities"
              variant="gold"
            >
              <p>
                Delray Beach is part of the Palm Beach County hospitality market. Nearby inventory may appear in Boca Raton, West Palm Beach, Boynton Beach, Jupiter and other Palm Beach County communities.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/counties/palm-beach" variant="outline">
                  Palm Beach County Listings
                </FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="delray-beach-market-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Delray Beach & Broward Restaurant Market"
            title="Restaurant opportunities relevant to Delray Beach buyers"
            copy={
              <p>
                {exactDelrayBeachListings.length
                  ? `FLLM currently shows ${exactDelrayBeachListings.length} restaurant Market View${exactDelrayBeachListings.length === 1 ? "" : "s"} explicitly located in Delray Beach, plus additional Palm Beach County restaurant Market Views.`
                  : "FLLM does not currently show a published restaurant Market View explicitly located in Delray Beach. The inventory below is current Palm Beach County restaurant Market Views displayed with its actual location so Delray Beach buyers can compare nearby opportunities without location ambiguity."}
              </p>
            }
          />

          <BusinessPackageLocalMarkets
            listings={browardRestaurantListings}
            label="Palm Beach County restaurant markets represented in current inventory"
          />

          {exactDelrayBeachListings.length ? (
            <div className="business-quota-grid">
              {exactDelrayBeachListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : null}

          {nearbyBrowardListings.length ? (
            <>
              <FllmSectionHeading
                eyebrow="Nearby Palm Beach County Inventory"
                title="Restaurant businesses near the Delray Beach market"
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

      <section className="fllm-template-section" id="full-liquor-delray-beach">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Delray Beach Full-Liquor Restaurant Search"
            title="Full-liquor restaurant opportunities in the Delray Beach and Broward market"
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
        <section className="fllm-template-section fllm-template-section--deep" id="italian-delray-beach">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Delray Beach Italian Restaurant Search"
              title="Italian restaurants for sale in the Delray Beach and Palm Beach County market"
              copy={
                <p>
                  FLLM currently tracks observed Italian restaurant market activity in Palm Beach County. The Market Views below
                  preserve the actual location while helping buyers research the broader Delray Beach restaurant market.
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
            <span className="fllm-template-eyebrow">Delray Beach Restaurant Market</span>
            <h2>Search Delray Beach without confusing the actual location of the business.</h2>
            <p>
              FLLM can target Delray Beach buyer intent while keeping Palm Beach County inventory factually labeled by its real
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
