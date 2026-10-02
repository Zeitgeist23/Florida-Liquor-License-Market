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
  businessMarketDisplayTitle,
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { withMarketLicenseValues } from "@/lib/business-quota-market-values";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import { restaurantCuisines, restaurantCuisineHref } from "@/data/restaurant-cuisines";

import "../fllm-official-template.css";
import "../fllm-design-system.css";
import "../listings/listings-premium.css";
import "../businesses-with-quota-licenses/business-inventory.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/restaurants-with-liquor-licenses`;

export const metadata: Metadata = {
  title: "Florida Restaurants With Full Liquor for Sale | 4COP, SFS & 2COP | FLLM",
  description:
    "Browse Florida restaurants with full liquor for sale, including 4COP quota and 4COP SFS / SRX opportunities, plus clearly identified 2COP beer-and-wine restaurant listings by county.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Miami restaurant with quota license for sale",
    "Miami restaurant for sale with 4COP quota license",
    "Miami-Dade restaurant for sale with quota liquor license",
    "Florida restaurant for sale with liquor license",
    "Florida restaurants with full liquor for sale",
    "Florida restaurants for sale with full liquor",
    "Florida restaurant with full liquor for sale",
    "restaurant bar with full liquor for sale Florida",
    "turnkey restaurant with full liquor Florida",
    "restaurants for sale with full liquor Florida",
    "restaurant for sale with full liquor license",
    "full liquor restaurant for sale",
    "4COP quota restaurant for sale",
    "Orlando restaurants for sale with liquor license",
    "Orlando restaurant for sale with 4COP SFS SRX license",
    "Orange County restaurant for sale with liquor license",
    "South Florida restaurants for sale with full liquor license",
    "Miami restaurants for sale with full liquor license",
    "Fort Lauderdale restaurants for sale with full liquor license",
    "Delray Beach restaurants for sale with full liquor license",
    "Tampa restaurant with liquor license for sale",
    "Jacksonville restaurant with liquor license for sale",
    "Broward restaurant with liquor license for sale",
    "Fort Lauderdale restaurant with liquor license for sale",
  ],
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Restaurants With Full Liquor for Sale | FLLM",
    description:
      "Browse Florida restaurants with full liquor for sale, including transferable 4COP quota and qualifying 4COP SFS / SRX restaurant opportunities, with other license classes clearly identified.",
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
  const publishedCuisineLabels = new Set(
    allRestaurantListings.flatMap((listing) => listing.cuisines ?? []),
  );
  const activeCuisineDefinitions = restaurantCuisines.filter((definition) =>
    publishedCuisineLabels.has(definition.label),
  );
  const allQuotaRestaurantListings = quotaListingsWithValues.filter(
    (listing) =>
      listing.licenseType === "4COP Quota" &&
      (listing.businessCategory === "Restaurant" ||
        /restaurant/i.test(`${listing.title} ${listing.businessType}`)),
  );
  const allSfsRestaurantListings = sfsListingsWithValues.filter(
    (listing) =>
      listing.businessCategory === "Restaurant" ||
      /restaurant/i.test(`${listing.title} ${listing.businessType}`),
  );
  const allTwoCopRestaurantListings = twoCopListingsWithValues.filter(
    (listing) =>
      listing.licenseType === "2COP Beer & Wine" &&
      (listing.businessCategory === "Restaurant" ||
        /restaurant/i.test(`${listing.title} ${listing.businessType}`)),
  );
  const quotaRestaurantListings = allQuotaRestaurantListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);
  const sfsRestaurantListings = allSfsRestaurantListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);
  const twoCopRestaurantListings = allTwoCopRestaurantListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);
  const restaurantListings = allRestaurantListings.slice(0, BUSINESS_LISTING_DISPLAY_LIMIT);
  const stJohnsRestaurantListings = allRestaurantListings.filter(
    (listing) => listing.county === "St. Johns County",
  );
  const stJohnsQuotaRestaurantListings = allQuotaRestaurantListings.filter(
    (listing) => listing.county === "St. Johns County",
  );
  const stJohnsRestaurantPrices = stJohnsRestaurantListings
    .map((listing) => listing.packagePriceNumber)
    .filter((price) => Number.isFinite(price) && price > 0);
  const stJohnsRestaurantPriceLow = stJohnsRestaurantPrices.length ? Math.min(...stJohnsRestaurantPrices) : null;
  const stJohnsRestaurantPriceHigh = stJohnsRestaurantPrices.length ? Math.max(...stJohnsRestaurantPrices) : null;
  const stJohnsRestaurantLicenseTypes = Array.from(new Set(stJohnsRestaurantListings.map((listing) => listing.licenseType)));
  const miamiRestaurantListings = allRestaurantListings.filter(
    (listing) => listing.county === "Miami-Dade County",
  );
  const miamiQuotaRestaurantListings = allQuotaRestaurantListings.filter(
    (listing) => listing.county === "Miami-Dade County",
  );
  const miamiRestaurantPrices = miamiRestaurantListings
    .map((listing) => listing.packagePriceNumber)
    .filter((price) => Number.isFinite(price) && price > 0);
  const miamiRestaurantPriceLow = miamiRestaurantPrices.length ? Math.min(...miamiRestaurantPrices) : null;
  const miamiRestaurantPriceHigh = miamiRestaurantPrices.length ? Math.max(...miamiRestaurantPrices) : null;
  const miamiRestaurantLicenseTypes = Array.from(new Set(miamiRestaurantListings.map((listing) => listing.licenseType)));
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  const orlandoRestaurantListings = allRestaurantListings.filter(
    (listing) => listing.county === "Orange County",
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Restaurants With Full Liquor for Sale",
      url: canonicalUrl,
      description:
        "Florida restaurants with full liquor for sale, including 4COP quota and 4COP SFS / SRX opportunities, with other restaurant liquor-license classes clearly identified.",
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
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does full liquor mean when searching for a Florida restaurant for sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Full liquor is common marketplace shorthand rather than a Florida license-series name. A restaurant with distilled-spirit privileges may operate with a transferable 4COP quota license or, when the premises and business qualify, a location-specific 4COP SFS / SRX license. FLLM identifies the license structure separately.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I find Florida restaurants for sale with full liquor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "FLLM organizes Florida restaurant-market information by county, cuisine and liquor-license structure. Buyers can compare restaurant opportunities involving transferable 4COP quota licenses, location-specific 4COP SFS / SRX licenses and 2COP beer-and-wine licenses.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I search restaurants for sale by city or cuisine in Florida?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "FLLM provides original location and cuisine market pages, including dedicated Weston and Italian restaurant market pages, so city and cuisine searches are handled by FLLM market-intelligence pages rather than individual Market Views.",
          },
        },
        {
          "@type": "Question",
          name: "What is a 2COP liquor license in Florida?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A Florida 2COP is a non-quota beer-and-wine license that generally supports beer and wine sales for consumption on the licensed premises and package sales within the approved privileges. It does not authorize distilled spirits and is not a transferable quota asset.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a 4COP liquor license cost in Florida?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no single statewide market price for a transferable 4COP quota license. Quota-license supply and asking prices are county-specific, so FLLM compares current county market data and disclosed asks rather than presenting one statewide value.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I find restaurants for sale in Florida?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "FLLM organizes Florida restaurant opportunities by county, city, cuisine and liquor-license structure, including restaurants with transferable 4COP quota licenses, qualifying 4COP SFS / SRX full-liquor privileges and 2COP beer-and-wine licenses.",
          },
        },
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
        name: businessMarketDisplayTitle(listing),
        url: `${siteUrl}${listing.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida Restaurants With 2COP Beer & Wine Licenses for Sale",
      numberOfItems: twoCopRestaurantListings.length,
      itemListElement: twoCopRestaurantListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: businessMarketDisplayTitle(listing),
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
        name: businessMarketDisplayTitle(listing),
        url: `${siteUrl}${listing.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Miami and Miami-Dade restaurants for sale with liquor licenses",
      numberOfItems: miamiRestaurantListings.length,
      itemListElement: miamiRestaurantListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: businessMarketDisplayTitle(listing),
        url: `${siteUrl}${listing.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "St. Augustine and St. Johns County restaurants for sale with quota liquor licenses",
      numberOfItems: stJohnsRestaurantListings.length,
      itemListElement: stJohnsRestaurantListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: businessMarketDisplayTitle(listing),
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

      <style>{`
        .florida-restaurants-hero {
          position: relative;
          overflow: hidden;
          background: #021524;
          min-height: 0;
        }
        .florida-restaurants-hero .fllm-template-shell {
          position: relative;
          z-index: 2;
          padding-top: 54px;
          padding-bottom: 54px;
        }
        .florida-restaurants-hero__photo,
        .florida-restaurants-hero__overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .florida-restaurants-hero__photo {
          background-image: url('/assets/florida-restaurants-beachside-hero.webp');
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          filter: contrast(1.12) saturate(1.08) brightness(1.03);
        }
        .florida-restaurants-hero__overlay {
          background: linear-gradient(
            90deg,
            rgba(2, 21, 36, 0.995) 0%,
            rgba(2, 21, 36, 0.98) 33%,
            rgba(2, 21, 36, 0.80) 49%,
            rgba(2, 21, 36, 0.38) 66%,
            rgba(2, 21, 36, 0.10) 100%
          );
        }
        @media (max-width: 900px) {
          .florida-restaurants-hero__photo {
            background-position: 64% center;
          }
          .florida-restaurants-hero__overlay {
            background: linear-gradient(
              90deg,
              rgba(2, 21, 36, 0.995) 0%,
              rgba(2, 21, 36, 0.95) 58%,
              rgba(2, 21, 36, 0.58) 100%
            );
          }
        }
      `}</style>

      <section className="fllm-template-hero florida-restaurants-hero">
        <div className="florida-restaurants-hero__photo" aria-hidden="true" />
        <div className="florida-restaurants-hero__overlay" aria-hidden="true" />
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span><strong>Restaurants With Full Liquor for Sale</strong>
          </div>
          <span className="fllm-template-eyebrow">Florida Restaurants With Full Liquor for Sale</span>
          <h1
            className="fllm-template-hero-title"
            style={{ fontSize: "clamp(36px, 3.55vw, 58px)", lineHeight: 1.0, maxWidth: "820px" }}
          >
            Florida Restaurants With Full Liquor for Sale
          </h1>
          <p
            className="fllm-template-hero-copy"
            style={{ fontSize: "clamp(15px, 1vw, 17px)", lineHeight: 1.52, maxWidth: "760px" }}
          >
            Browse Florida restaurants with full liquor for sale, including businesses with transferable 4COP quota licenses and qualifying 4COP SFS / SRX full-liquor privileges. FLLM also identifies 2COP beer-and-wine opportunities separately so buyers can distinguish the actual Florida license structure.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#restaurant-inventory">View Restaurant Market</Link>
            <FllmButton href="#license-paths" variant="outline">Compare License Paths</FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="local-restaurant-markets">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Local Florida Restaurant Markets"
            title="Search restaurant opportunities by major Florida market"
            copy={
              <p>
                FLLM local landing pages connect city and county restaurant searches to current Market Views while
                preserving the actual business location and liquor-license structure.
              </p>
            }
            align="center"
          />
          <FllmCardGrid columns={3}>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">South Florida</span>} title="Miami & Miami-Dade" variant="gold">
              <p>Restaurants with 4COP quota, 4COP SFS / SRX and 2COP license structures in the Miami-Dade market.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/miami" variant="outline">Miami Restaurant Market</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Broward County</span>} title="Fort Lauderdale & Broward" variant="gold">
              <p>Fort Lauderdale and Broward County restaurant opportunities organized by full-liquor and beer-and-wine license structure.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/broward-county" variant="outline">Broward Restaurant Market</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Central Florida</span>} title="Orlando & Orange County" variant="gold">
              <p>Orlando-area restaurant opportunities tied to Orange County 4COP, SFS / SRX and 2COP market activity.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/orlando" variant="outline">Orlando Restaurant Market</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Tampa Bay</span>} title="Tampa & Hillsborough County" variant="gold">
              <p>Tampa restaurant and restaurant/bar opportunities with Hillsborough County liquor-license structures.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/tampa" variant="outline">Tampa Restaurant Market</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Northeast Florida</span>} title="Jacksonville & Duval County" variant="gold">
              <p>Jacksonville restaurant opportunities involving Duval County 4COP quota, SFS / SRX and 2COP licenses.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/jacksonville" variant="outline">Jacksonville Restaurant Market</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">South Florida</span>} title="Fort Lauderdale" variant="gold">
              <p>Dedicated Fort Lauderdale restaurant market coverage for Broward County hospitality buyers.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/fort-lauderdale" variant="outline">Fort Lauderdale Market</FllmButton></div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section" id="license-paths">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Search Florida Restaurants by License Type"
            title="4COP Quota · 4COP SFS / SRX · 2COP Beer & Wine"
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
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="#sfs-restaurant-inventory">Browse SFS / SRX Restaurants</Link>
                <FllmButton href="/license-types/4cop-sfs-restaurant" variant="outline">SFS / SRX Guide</FllmButton>
              </div>
            </FllmCard>

            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Beer & wine</span>} title="Restaurants With 2COP Licenses" variant="gold">
              <p>
                Restaurant businesses using a 2COP beer-and-wine license rather than distilled-spirit privileges. These
                listings remain separate from quota-license inventory.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="#2cop-restaurant-inventory">Browse 2COP Restaurants</Link>
                <FllmButton href="/license-types/2cop-beer-wine" variant="outline">2COP Guide</FllmButton>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="restaurant-search-intent">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Florida Restaurant Search"
            title="Search restaurants for sale by full liquor, cuisine and local market"
            copy={
              <p>
                FLLM concentrates buyer-intent SEO on original market pages rather than individual Market Views.
                Use these research paths for common searches such as restaurants for sale with full liquor,
                Italian restaurants for sale, 4COP restaurant opportunities and city-specific restaurant markets.
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
                Compare Florida restaurant-market activity involving transferable 4COP quota licenses and
                qualifying 4COP SFS / SRX full-liquor restaurant licenses.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="#full-liquor-restaurants" variant="outline">Full-Liquor Restaurant Guide</FllmButton>
              </div>
            </FllmCard>
            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Cuisine</span>}
              title="Italian Restaurants for Sale"
              variant="gold"
            >
              <p>
                Use FLLM&apos;s Italian restaurant market page for Florida and Broward County cuisine searches,
                with license types and actual market locations kept distinct.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/italian">
                  Italian Restaurant Market
                </Link>
              </div>
            </FllmCard>
            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Local Market</span>}
              title="Weston, Florida Restaurants for Sale"
              variant="gold"
            >
              <p>
                Search the Weston and Broward County restaurant market for full-liquor, 4COP and Italian restaurant
                activity without relabeling nearby Broward businesses as Weston locations.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/weston">
                  Weston Restaurant Market
                </Link>
              </div>
            </FllmCard>
            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Regional Market</span>}
              title="South Florida Restaurants With Full Liquor"
              variant="gold"
            >
              <p>
                Compare restaurant opportunities across Miami-Dade, Broward and Palm Beach counties using the buyer-language phrase
                “full liquor” while preserving the actual 4COP Quota or 4COP SFS / SRX license structure.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/south-florida">
                  South Florida Restaurant Market
                </Link>
              </div>
            </FllmCard>
            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Miami-Dade</span>}
              title="Miami Restaurants for Sale With Full Liquor"
              variant="gold"
            >
              <p>
                Browse Miami and Miami-Dade restaurant opportunities with full-liquor privileges, including transferable 4COP Quota
                and qualification-based 4COP SFS / SRX structures.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/miami">
                  Miami Restaurant Market
                </Link>
              </div>
            </FllmCard>
            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Broward County</span>}
              title="Fort Lauderdale Restaurants With Full Liquor"
              variant="gold"
            >
              <p>
                Explore Fort Lauderdale and nearby Broward County restaurant opportunities with full-liquor privileges and clearly
                identified 4COP license structures.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/fort-lauderdale">
                  Fort Lauderdale Restaurant Market
                </Link>
              </div>
            </FllmCard>
            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Palm Beach County</span>}
              title="Delray Beach Restaurants With Full Liquor"
              variant="gold"
            >
              <p>
                Research Delray Beach and Palm Beach County restaurant opportunities with full-liquor licenses, including the
                transferable 4COP Quota structure featured in FLLM broker listings such as the Mello opportunity.
              </p>
              <div className="fllm-ui-actions">
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/delray-beach">
                  Delray Beach Restaurant Market
                </Link>
              </div>
            </FllmCard>
          </FllmCardGrid>
        </div>
      </section>

      <section className="fllm-template-section" id="restaurant-cuisines">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Browse Restaurants by Cuisine"
            title="Search Florida restaurant opportunities by cuisine and license type"
            copy={
              <p>
                FLLM now organizes restaurant inventory by cuisine as well as county and alcoholic-beverage license
                structure. Cuisine pages show the actual location of each listing and keep transferable 4COP quota,
                location-specific 4COP SFS / SRX, and 2COP beer-and-wine licenses clearly separated.
              </p>
            }
            align="center"
          />

          <FllmCardGrid columns={3}>
            {activeCuisineDefinitions.map((definition) => {
              const count = allRestaurantListings.filter((listing) =>
                listing.cuisines?.includes(definition.label),
              ).length;
              return (
                <FllmCard
                  key={definition.slug}
                  eyebrow={<span className="restaurant-card-cyan-label">Cuisine Marketplace</span>}
                  title={`${definition.label} Restaurants for Sale`}
                  variant="gold"
                >
                  <p>
                    {definition.shortDescription} {count} published opportunit{count === 1 ? "y" : "ies"} currently
                    match this cuisine on FLLM.
                  </p>
                  <div className="fllm-ui-actions">
                    <Link
                      className="btn btn-gold fllm-ui-official-gold-button"
                      href={restaurantCuisineHref(definition.slug)}
                    >
                      Browse {definition.label} Restaurants
                    </Link>
                  </div>
                </FllmCard>
              );
            })}
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

      <section className="fllm-template-section" id="sfs-restaurant-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Full-Liquor Restaurant Licenses"
            title="Florida Restaurants With 4COP SFS / SRX Licenses for Sale"
            copy={
              <p>
                Browse qualifying Florida restaurant opportunities operating with location-specific 4COP SFS / SRX
                full-liquor privileges. These restaurant licenses are tied to the qualifying operation and premises and
                are not the same independently transferable county quota asset as a 4COP quota license.
              </p>
            }
          />
          {sfsRestaurantListings.length ? (
            <div className="business-quota-grid">
              {sfsRestaurantListings.map((listing) => (
                <BusinessQuotaListingCard key={`sfs-${listing.listingReference}`} listing={listing} />
              ))}
            </div>
          ) : (
            <FllmCard title="No published 4COP SFS / SRX restaurant opportunities are available right now." variant="gold">
              <p>FLLM will display qualifying full-liquor restaurant opportunities here as they are published.</p>
            </FllmCard>
          )}
          <div className="fllm-ui-actions">
            <FllmButton href="/license-types/4cop-sfs-restaurant" variant="outline">4COP SFS / SRX Guide</FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="2cop-restaurant-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Beer & Wine Restaurant Market"
            title="Florida Restaurants With 2COP Beer & Wine Licenses for Sale"
            copy={
              <p>
                Browse Florida restaurants for sale with included 2COP beer-and-wine licenses. A 2COP is a non-quota
                beer-and-wine license and does not authorize distilled spirits. FLLM keeps these opportunities separate
                from transferable 4COP quota packages and 4COP SFS / SRX full-liquor restaurant licenses.
              </p>
            }
          />
          <BusinessPackageLocalMarkets
            listings={allTwoCopRestaurantListings}
            label="Florida markets for restaurants with 2COP beer-and-wine licenses in current inventory"
          />
          {twoCopRestaurantListings.length ? (
            <div className="business-quota-grid">
              {twoCopRestaurantListings.map((listing) => (
                <BusinessQuotaListingCard key={`2cop-${listing.listingReference}`} listing={listing} />
              ))}
            </div>
          ) : (
            <FllmCard title="No published restaurant + 2COP packages are available right now." variant="gold">
              <p>FLLM will display qualifying restaurant opportunities with included 2COP beer-and-wine licenses here as they are published.</p>
            </FllmCard>
          )}
          <div className="fllm-ui-actions">
            <FllmButton href="/license-types/2cop-beer-wine" variant="outline">What Is a 2COP License?</FllmButton>
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="/listings?type=businesses-2cop">
              View All 2COP Business Listings
            </Link>
          </div>
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

      <section className="fllm-template-section" id="weston-restaurant-market">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Weston & Broward County"
            title="Restaurants for sale in the Weston, Florida market"
            copy={
              <p>
                FLLM organizes Weston-area restaurant searches around the buyer language used in the market, including
                full liquor, Italian restaurants, 4COP restaurant opportunities, and nearby Broward County inventory.
                Listing cards retain the actual location and license structure of each business.
              </p>
            }
          />
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/weston">
              Explore Weston Restaurant Market
            </Link>
            <FllmButton href="/restaurants-for-sale/italian" variant="outline">
              Italian Restaurants
            </FllmButton>
            <FllmButton href="/counties/broward" variant="outline">
              Broward County Market
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="miami-dade-quota-restaurants">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Miami & Miami-Dade County"
            title="Miami restaurants for sale with liquor licenses"
            copy={
              <p>
                FLLM tracks Miami and Miami-Dade restaurant businesses for sale by the actual alcoholic-beverage
                license included with the opportunity. Current inventory can include transferable 4COP quota licenses,
                location-specific 4COP SFS / SRX full-liquor licenses, and 2COP beer-and-wine licenses. Quota-license
                opportunities remain clearly separated from non-quota restaurant licenses.
              </p>
            }
          />

          {miamiRestaurantListings.length ? (
            <>
              <FllmCardGrid columns={3}>
                <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Current Miami-Dade Inventory</span>} title={`${miamiRestaurantListings.length} published restaurant opportunit${miamiRestaurantListings.length === 1 ? "y" : "ies"}`} variant="gold">
                  <p>Operating-business listings currently published on FLLM for Miami-Dade County, separate from standalone liquor-license offers.</p>
                </FllmCard>
                <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Advertised Package Prices</span>} title={miamiRestaurantPriceLow !== null && miamiRestaurantPriceHigh !== null ? `${formatCurrency(miamiRestaurantPriceLow)} – ${formatCurrency(miamiRestaurantPriceHigh)}` : "See current listings"} variant="gold">
                  <p>Package prices refer to the advertised business opportunity; any separately stated license value is identified on the listing.</p>
                </FllmCard>
                <FllmCard eyebrow={<span className="restaurant-card-cyan-label">License Types in Current Inventory</span>} title={miamiRestaurantLicenseTypes.length ? miamiRestaurantLicenseTypes.join(" • ") : "No current inventory"} variant="gold">
                  <p>FLLM labels each Miami restaurant by its actual license structure so buyers can distinguish quota, SFS / SRX, and 2COP opportunities.</p>
                </FllmCard>
              </FllmCardGrid>
              <div className="business-quota-grid">
                {miamiRestaurantListings.map((listing) => (
                  <BusinessQuotaListingCard key={`miami-${listing.listingReference}`} listing={listing} />
                ))}
              </div>
            </>
          ) : null}

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
        <section className="fllm-template-section" id="st-augustine-quota-restaurants">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="St. Augustine & St. Johns County"
              title="St. Augustine restaurants for sale with quota liquor licenses"
              copy={
                <p>
                  FLLM tracks St. Augustine and St. Johns County restaurant and restaurant/bar opportunities by the
                  alcoholic-beverage license included with the business. Current listings can include transferable
                  4COP quota licenses as well as other restaurant license structures, while standalone St. Johns County
                  quota-license inventory remains separate from operating-business packages.
                </p>
              }
            />

            <FllmCardGrid columns={3}>
              <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Current St. Johns Inventory</span>} title={`${stJohnsRestaurantListings.length} published restaurant opportunit${stJohnsRestaurantListings.length === 1 ? "y" : "ies"}`} variant="gold">
                <p>Operating-business listings currently published on FLLM for St. Augustine and St. Johns County.</p>
              </FllmCard>
              <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Advertised Package Prices</span>} title={stJohnsRestaurantPriceLow !== null && stJohnsRestaurantPriceHigh !== null ? `${formatCurrency(stJohnsRestaurantPriceLow)} – ${formatCurrency(stJohnsRestaurantPriceHigh)}` : "See current listings"} variant="gold">
                <p>Package prices refer to the operating business. Any separately stated quota-license value is identified on the listing.</p>
              </FllmCard>
              <FllmCard eyebrow={<span className="restaurant-card-cyan-label">License Types in Current Inventory</span>} title={stJohnsRestaurantLicenseTypes.length ? stJohnsRestaurantLicenseTypes.join(" • ") : "No current inventory"} variant="gold">
                <p>FLLM distinguishes transferable 4COP quota licenses from qualification-based or beer-and-wine restaurant licenses.</p>
              </FllmCard>
            </FllmCardGrid>

            <div className="business-quota-grid">
              {stJohnsRestaurantListings.map((listing) => (
                <BusinessQuotaListingCard key={`st-johns-${listing.listingReference}`} listing={listing} />
              ))}
            </div>

            {stJohnsQuotaRestaurantListings.length ? (
              <FllmCard
                eyebrow={<span className="restaurant-card-cyan-label">4COP Quota Restaurant Package</span>}
                title="St. Augustine restaurant businesses with transferable 4COP quota licenses"
                variant="gold"
              >
                <p>
                  FLLM currently identifies {stJohnsQuotaRestaurantListings.length} St. Johns County restaurant or
                  restaurant/bar package{stJohnsQuotaRestaurantListings.length === 1 ? "" : "s"} with an included
                  transferable 4COP quota license. These are operating-business opportunities rather than standalone
                  quota-license listings.
                </p>
              </FllmCard>
            ) : null}

            <div className="fllm-ui-actions">
              <FllmButton href="/counties/st-johns" variant="outline">
                St. Johns County Liquor License Market
              </FllmButton>
              <Link className="btn btn-gold fllm-ui-official-gold-button" href="/license-alerts">
                Get a St. Johns License Alert
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="fllm-template-section" id="full-liquor-restaurants">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Full-Liquor Restaurant Search"
            title="Restaurants for sale with full liquor in Florida"
            copy={
              <p>
                “Full liquor” is common buyer and broker search language, but it is not a Florida license-series name.
                Restaurant opportunities with distilled-spirit privileges may involve a transferable 4COP quota license
                or, when the premises and business qualify, a location-specific 4COP SFS / SRX restaurant license.
                FLLM identifies the license structure separately so buyers can compare the correct type of opportunity.
              </p>
            }
          />
          <FllmCard
            eyebrow={<span className="restaurant-card-cyan-label">Full liquor FAQ</span>}
            title="What does “full liquor” mean when searching for a Florida restaurant for sale?"
            variant="gold"
          >
            <p>
              Buyers often use “full liquor” to describe a restaurant that can sell distilled spirits in addition to beer
              and wine. In Florida, that privilege may be associated with a transferable 4COP quota license or a qualifying
              4COP SFS / SRX license tied to the restaurant premises and operating requirements. FLLM labels each listing by
              its actual license structure rather than treating all full-liquor restaurant opportunities as the same.
            </p>
          </FllmCard>
        </div>
      </section>

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
            <Link className="btn btn-gold fllm-ui-official-gold-button restaurant-list-cta" href="/sell-florida-restaurant">Sell / List a Restaurant</Link>
            <FllmButton href="/contact" variant="outline">Contact FLLM</FllmButton>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
