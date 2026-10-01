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
const canonicalUrl = `${siteUrl}/restaurants-for-sale/south-florida`;

export const metadata: Metadata = {
  title: "South Florida Restaurants for Sale With Full Liquor Licenses | FLLM",
  description:
    "Explore South Florida restaurants for sale with full liquor licenses across Miami-Dade, Broward and Palm Beach counties. Compare 4COP Quota, 4COP SFS / SRX and restaurant market opportunities by actual location.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "South Florida restaurants for sale with full liquor license",
    "South Florida restaurant for sale",
    "South Florida restaurant with liquor license for sale",
    "full liquor restaurant for sale South Florida",
    "restaurant for sale with full liquor license South Florida",
    "4COP restaurant for sale South Florida",
    "Miami-Dade Broward Palm Beach restaurants for sale",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "South Florida Restaurants for Sale With Full Liquor Licenses | FLLM",
    description:
      "South Florida restaurant opportunities across Miami-Dade, Broward and Palm Beach counties organized by business type and liquor-license structure.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function SouthFloridaRestaurantsForSalePage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );

  const browardRestaurantListings = [
    ...withMarketLicenseValues(businessQuotaListings, standaloneListings),
    ...withMarketLicenseValues(businessSfsListings, standaloneListings),
    ...withMarketLicenseValues(business2copListings, standaloneListings),
  ].filter(
    (listing) =>
      ["Miami-Dade County", "South Florida", "Palm Beach County"].includes(listing.county) &&
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

  const exactSouth FloridaListings = browardRestaurantListings.filter((listing) =>
    /\bsouth-florida\b/i.test(`${listing.title} ${listing.businessType}`),
  );

  const nearbyBrowardListings = browardRestaurantListings.filter(
    (listing) => !exactSouth FloridaListings.includes(listing),
  );

  const south-floridaFaqs = [
    {
      question: "Where can I search for restaurants for sale in South Florida?",
      answer: "FLLM's South Florida restaurant market page organizes South Florida buyer searches around South Florida restaurant activity, full-liquor privileges, 4COP license structures and cuisine while preserving the actual location of each Market View.",
    },
    {
      question: "What does full liquor mean for a restaurant for sale in South Florida?",
      answer: "Full liquor is common buyer language. In Florida, distilled-spirit restaurant privileges may involve a transferable 4COP quota license or a qualifying location-specific 4COP SFS / SRX restaurant license.",
    },
    {
      question: "Where can I find Italian restaurants for sale near South Florida?",
      answer: "FLLM links South Florida restaurant searches to its South Florida and Italian restaurant market pages. Nearby Market Views retain their actual city and county rather than being presented as businesses physically located in South Florida.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "South Florida Restaurants for Sale",
      url: canonicalUrl,
      description:
        "FLLM local-market coverage for South Florida and nearby South Florida restaurant opportunities, including full-liquor, 4COP and Italian restaurant searches.",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: south-floridaFaqs.map((faq) => ({
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
          name: "South Florida Restaurants for Sale",
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
            <strong>South Florida</strong>
          </div>
          <span className="fllm-template-eyebrow">South Florida Restaurant Market</span>
          <h1 className="fllm-template-hero-title">South Florida Restaurants for Sale With Full Liquor Licenses</h1>
          <p className="fllm-template-hero-copy">
            Search the South Florida restaurant-for-sale market through FLLM by restaurant concept, cuisine and
            alcoholic-beverage license structure. FLLM connects South Florida search demand to current South Florida
            restaurant Market Views while keeping each listing&apos;s actual location explicit. Buyers can compare
            full-liquor opportunities, 4COP quota and 4COP SFS / SRX structures, Italian restaurant Market Views,
            and other nearby South Florida restaurant businesses.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#south-florida-market-inventory">
              View South Florida-Area Restaurant Market Views
            </Link>
            <FllmButton href="/restaurants-with-liquor-licenses" variant="outline">
              South Florida Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="South Florida Restaurant Search Paths"
            title="Full liquor, Italian restaurants and South Florida opportunities"
            copy={
              <p>
                Buyers do not always search by Florida license-series terminology. FLLM organizes the same market
                using the phrases buyers actually use, including full liquor, Italian restaurant, 4COP restaurant,
                restaurant and bar, and South Florida restaurant-for-sale searches.
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
                South Florida-area full-liquor searches may involve a transferable 4COP quota license or a qualifying
                4COP SFS / SRX restaurant license. FLLM separates those structures so buyers can evaluate the
                correct type of opportunity.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="#full-liquor-south-florida">
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
                Browse Italian restaurant opportunities serving the South Florida and broader South Florida search market.
                Listings retain their actual city and county location rather than being relabeled as South Florida inventory.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/italian">
                  Browse Italian Restaurants
                </Link>
              </div>
            </FllmCard>

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">South Florida</span>}
              title="Nearby Restaurant Opportunities"
              variant="gold"
            >
              <p>
                South Florida is part of the South Florida hospitality market. Nearby inventory may appear in Fort Lauderdale,
                Hollywood, Pompano Beach, Oakland Park and other Broward communities.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/restaurants-with-liquor-licenses" variant="outline">
                  South Florida Listings
                </FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="south-florida-market-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current South Florida & Broward Restaurant Market"
            title="Restaurant opportunities relevant to South Florida buyers"
            copy={
              <p>
                {exactSouth FloridaListings.length
                  ? `FLLM currently shows ${exactSouth FloridaListings.length} restaurant Market View${exactSouth FloridaListings.length === 1 ? "" : "s"} within the South Florida tri-county market, plus additional South Florida restaurant Market Views.`
                  : "FLLM does not currently show a published restaurant Market View within the South Florida tri-county market. The inventory below is current Miami-Dade, Broward and Palm Beach restaurant Market Views displayed with its actual location so South Florida buyers can compare opportunities without location ambiguity."}
              </p>
            }
          />

          <BusinessPackageLocalMarkets
            listings={browardRestaurantListings}
            label="South Florida restaurant markets represented in current inventory"
          />

          {exactSouth FloridaListings.length ? (
            <div className="business-quota-grid">
              {exactSouth FloridaListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : null}

          {nearbyBrowardListings.length ? (
            <>
              <FllmSectionHeading
                eyebrow="Nearby South Florida Inventory"
                title="Restaurant businesses near the South Florida market"
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

      <section className="fllm-template-section" id="full-liquor-south-florida">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="South Florida Full-Liquor Restaurant Search"
            title="Full-liquor restaurant opportunities in the South Florida and Broward market"
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
        <section className="fllm-template-section fllm-template-section--deep" id="italian-south-florida">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="South Florida Italian Restaurant Search"
              title="Italian restaurants for sale in the South Florida and South Florida market"
              copy={
                <p>
                  FLLM currently tracks observed Italian restaurant market activity in South Florida. The Market Views below
                  preserve the actual location while helping buyers research the broader South Florida restaurant market.
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
            <span className="fllm-template-eyebrow">South Florida Restaurant Market</span>
            <h2>Search South Florida without confusing the actual city and county of the business.</h2>
            <p>
              FLLM can target South Florida buyer intent while keeping South Florida inventory factually labeled by its real
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
