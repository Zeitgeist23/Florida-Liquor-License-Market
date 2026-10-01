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
const canonicalUrl = `${siteUrl}/restaurants-for-sale/fort-lauderdale`;

export const metadata: Metadata = {
  title: "Fort Lauderdale, FL Restaurants for Sale | Full Liquor & Italian Market | FLLM",
  description:
    "Explore the Fort Lauderdale, Florida restaurant-for-sale market through FLLM, including full-liquor, 4COP, Italian restaurant and nearby Broward County opportunities. Exact listing locations are identified on each card.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "restaurants for sale in Fort Lauderdale Florida",
    "restaurant for sale Fort Lauderdale FL",
    "Italian restaurant for sale Fort Lauderdale Florida",
    "full liquor restaurant for sale Fort Lauderdale Florida",
    "restaurant for sale with full liquor license Fort Lauderdale Florida",
    "4COP restaurant for sale Fort Lauderdale Florida",
    "Broward County restaurants for sale",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Fort Lauderdale, FL Restaurants for Sale | Full Liquor & Italian Market | FLLM",
    description:
      "Fort Lauderdale and Broward County restaurant opportunities organized by cuisine, business type and liquor-license structure.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function Fort LauderdaleRestaurantsForSalePage() {
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

  const exactFort LauderdaleListings = browardRestaurantListings.filter((listing) =>
    /\bfort-lauderdale\b/i.test(`${listing.title} ${listing.businessType}`),
  );

  const nearbyBrowardListings = browardRestaurantListings.filter(
    (listing) => !exactFort LauderdaleListings.includes(listing),
  );

  const fort-lauderdaleFaqs = [
    {
      question: "Where can I search for restaurants for sale in Fort Lauderdale, Florida?",
      answer: "FLLM's Fort Lauderdale restaurant market page organizes Fort Lauderdale buyer searches around Broward County restaurant activity, full-liquor privileges, 4COP license structures and cuisine while preserving the actual location of each Market View.",
    },
    {
      question: "What does full liquor mean for a restaurant for sale in Fort Lauderdale?",
      answer: "Full liquor is common buyer language. In Florida, distilled-spirit restaurant privileges may involve a transferable 4COP quota license or a qualifying location-specific 4COP SFS / SRX restaurant license.",
    },
    {
      question: "Where can I find Italian restaurants for sale near Fort Lauderdale?",
      answer: "FLLM links Fort Lauderdale restaurant searches to its Broward County and Italian restaurant market pages. Nearby Market Views retain their actual city and county rather than being presented as businesses physically located in Fort Lauderdale.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Fort Lauderdale, Florida Restaurants for Sale",
      url: canonicalUrl,
      description:
        "FLLM local-market coverage for Fort Lauderdale and nearby Broward County restaurant opportunities, including full-liquor, 4COP and Italian restaurant searches.",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: fort-lauderdaleFaqs.map((faq) => ({
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
          name: "Fort Lauderdale Restaurants for Sale",
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
            <strong>Fort Lauderdale</strong>
          </div>
          <span className="fllm-template-eyebrow">Fort Lauderdale · Broward County Restaurant Market</span>
          <h1 className="fllm-template-hero-title">Restaurants for Sale in Fort Lauderdale, Florida</h1>
          <p className="fllm-template-hero-copy">
            Search the Fort Lauderdale restaurant-for-sale market through FLLM by restaurant concept, cuisine and
            alcoholic-beverage license structure. FLLM connects Fort Lauderdale search demand to current Broward County
            restaurant Market Views while keeping each listing&apos;s actual location explicit. Buyers can compare
            full-liquor opportunities, 4COP quota and 4COP SFS / SRX structures, Italian restaurant Market Views,
            and other nearby Broward County restaurant businesses.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#fort-lauderdale-market-inventory">
              View Fort Lauderdale-Area Restaurant Market Views
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
            eyebrow="Fort Lauderdale Restaurant Search Paths"
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
                Fort Lauderdale-area full-liquor searches may involve a transferable 4COP quota license or a qualifying
                4COP SFS / SRX restaurant license. FLLM separates those structures so buyers can evaluate the
                correct type of opportunity.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="#full-liquor-fort-lauderdale">
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
                Browse Italian restaurant opportunities serving the Fort Lauderdale and broader Broward County search market.
                Listings retain their actual city and county location rather than being relabeled as Fort Lauderdale inventory.
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
                Fort Lauderdale is part of the Broward County hospitality market. Nearby inventory may appear in Hollywood, Pompano Beach, Oakland Park, Weston and other Broward communities.
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

      <section className="fllm-template-section fllm-template-section--deep" id="fort-lauderdale-market-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Current Fort Lauderdale & Broward Restaurant Market"
            title="Restaurant opportunities relevant to Fort Lauderdale buyers"
            copy={
              <p>
                {exactFort LauderdaleListings.length
                  ? `FLLM currently shows ${exactFort LauderdaleListings.length} restaurant Market View${exactFort LauderdaleListings.length === 1 ? "" : "s"} explicitly located in Fort Lauderdale, plus additional Broward County restaurant Market Views.`
                  : "FLLM does not currently show a published restaurant Market View explicitly located in Fort Lauderdale. The inventory below is current Broward County restaurant Market Views displayed with its actual location so Fort Lauderdale buyers can compare nearby opportunities without location ambiguity."}
              </p>
            }
          />

          <BusinessPackageLocalMarkets
            listings={browardRestaurantListings}
            label="Broward County restaurant markets represented in current inventory"
          />

          {exactFort LauderdaleListings.length ? (
            <div className="business-quota-grid">
              {exactFort LauderdaleListings.map((listing) => (
                <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
              ))}
            </div>
          ) : null}

          {nearbyBrowardListings.length ? (
            <>
              <FllmSectionHeading
                eyebrow="Nearby Broward County Inventory"
                title="Restaurant businesses near the Fort Lauderdale market"
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

      <section className="fllm-template-section" id="full-liquor-fort-lauderdale">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Fort Lauderdale Full-Liquor Restaurant Search"
            title="Full-liquor restaurant opportunities in the Fort Lauderdale and Broward market"
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
        <section className="fllm-template-section fllm-template-section--deep" id="italian-fort-lauderdale">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Fort Lauderdale Italian Restaurant Search"
              title="Italian restaurants for sale in the Fort Lauderdale and Broward County market"
              copy={
                <p>
                  FLLM currently tracks observed Italian restaurant market activity in Broward County. The Market Views below
                  preserve the actual location while helping buyers research the broader Fort Lauderdale restaurant market.
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
            <span className="fllm-template-eyebrow">Fort Lauderdale Restaurant Market</span>
            <h2>Search Fort Lauderdale without confusing the actual location of the business.</h2>
            <p>
              FLLM can target Fort Lauderdale buyer intent while keeping Broward County inventory factually labeled by its real
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
