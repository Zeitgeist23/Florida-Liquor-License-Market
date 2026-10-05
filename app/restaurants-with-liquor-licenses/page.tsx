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
  title: "Florida Restaurants for Sale | Restaurants & Bars for Sale in Florida | FLLM",
  description:
    "Browse Florida restaurants for sale by city, county, cuisine and asking-price signal. Compare current restaurant opportunities with FLLM liquor-license intelligence for 4COP quota, 4COP SFS / SRX and 2COP licenses.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  keywords: [
    "Florida restaurants for sale",
    "Florida restaurant for sale",
    "restaurants for sale Florida",
    "restaurant businesses for sale Florida",
    "buy a restaurant in Florida",
    "Miami restaurants for sale",
    "Orlando restaurants for sale",
    "Tampa restaurants for sale",
    "Jacksonville restaurants for sale",
    "Fort Lauderdale restaurants for sale",
    "Broward restaurants for sale",
    "Miami restaurant with quota license for sale",
    "Miami restaurant for sale with 4COP quota license",
    "Miami-Dade restaurant for sale with quota liquor license",
    "Florida restaurant with liquor license for sale",
    "Florida restaurant for sale with liquor license",
    "Florida restaurant with liquor license for sale near me",
    "Florida restaurant with liquor license for sale by owner",
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
    title: "Florida Restaurants for Sale | FLLM",
    description:
      "Florida restaurant-for-sale market inventory by city, county and cuisine, with FLLM liquor-license structure and market intelligence kept visible.",
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
  const statewideRestaurantPrices = allRestaurantListings
    .map((listing) => listing.packagePriceNumber)
    .filter((price) => Number.isFinite(price) && price > 0)
    .sort((a, b) => a - b);
  const statewideRestaurantMedian = statewideRestaurantPrices.length
    ? statewideRestaurantPrices.length % 2
      ? statewideRestaurantPrices[Math.floor(statewideRestaurantPrices.length / 2)]
      : Math.round(
          (statewideRestaurantPrices[statewideRestaurantPrices.length / 2 - 1] +
            statewideRestaurantPrices[statewideRestaurantPrices.length / 2]) /
            2,
        )
    : null;
  const statewideRestaurantLow = statewideRestaurantPrices.length ? statewideRestaurantPrices[0] : null;
  const statewideRestaurantHigh = statewideRestaurantPrices.length
    ? statewideRestaurantPrices[statewideRestaurantPrices.length - 1]
    : null;
  const statewideRestaurantCounties = new Set(allRestaurantListings.map((listing) => listing.county)).size;
  const orlandoRestaurantListings = allRestaurantListings.filter(
    (listing) => listing.county === "Orange County",
  );

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Restaurants for Sale",
      url: canonicalUrl,
      description:
        "Florida restaurants for sale organized by city, county, cuisine, asking-price signals and actual liquor-license structure.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Restaurants for Sale", item: canonicalUrl },
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
        {
          "@type": "Question",
          name: "Where can I find a Florida restaurant with a liquor license for sale near me?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "FLLM organizes restaurant opportunities by Florida county and city so buyers can compare nearby businesses by actual liquor-license structure, including 4COP quota, 4COP SFS / SRX and 2COP beer-and-wine licenses.",
          },
        },
        {
          "@type": "Question",
          name: "Can I find a Florida restaurant with a liquor license for sale by owner?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Some restaurant opportunities may be marketed directly by an owner while others are represented by licensed business brokers. FLLM identifies the available market information and license structure without implying that FLLM represents the operating business unless the page expressly states otherwise.",
          },
        },
        {
          "@type": "Question",
          name: "How much does it cost to get a liquor license for a restaurant in Florida?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The answer depends on the license structure and county. A transferable 4COP quota license has a county-specific private-market value, while a qualifying 4COP SFS / SRX restaurant license and a 2COP beer-and-wine license follow different non-quota licensing structures. FLLM separates those paths and provides county market data where applicable.",
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
          pointer-events: none;
        }
        .florida-restaurants-hero__photo {
          top: 0;
          bottom: 0;
          left: 38%;
          right: 0;
          background-image: url("data:image/webp;base64,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");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #021524;
          filter: contrast(1.06) saturate(1.05) brightness(1.02);
        }
        .florida-restaurants-hero__overlay {
          inset: 0;
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
            left: 30%;
            right: -10%;
            background-size: cover;
            background-position: center right;
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
            <Link href="/">Home</Link><span>›</span><strong>Florida Restaurants for Sale</strong>
          </div>
          <span className="fllm-template-eyebrow">Florida Restaurant Market</span>
          <h1
            className="fllm-template-hero-title"
            style={{ fontSize: "clamp(36px, 3.55vw, 58px)", lineHeight: 1.0, maxWidth: "820px" }}
          >
            Florida Restaurants for Sale
          </h1>
          <p
            className="fllm-template-hero-copy"
            style={{ fontSize: "clamp(15px, 1vw, 17px)", lineHeight: 1.52, maxWidth: "760px" }}
          >
            Browse Florida restaurants and restaurant/bar businesses for sale by city, county, cuisine and asking-price signal. FLLM adds liquor-license intelligence to the broader restaurant-for-sale market by identifying transferable 4COP quota licenses, location-specific 4COP SFS / SRX privileges and 2COP beer-and-wine licenses separately.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#restaurant-inventory">View Restaurant Market</Link>
            <FllmButton href="#license-paths" variant="outline">Compare License Paths</FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep" id="florida-restaurant-market-intelligence">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Florida Restaurant Market Intelligence"
            title="Current restaurant-for-sale signals tracked by FLLM"
            copy={
              <p>
                These figures summarize FLLM&apos;s current published restaurant Market Views and update with observed
                inventory. Business asking prices are shown separately from standalone liquor-license values.
              </p>
            }
            align="center"
          />
          <FllmCardGrid columns={4}>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Observed Inventory</span>} title={String(allRestaurantListings.length)} variant="gold">
              <p>Published Florida restaurant Market Views currently tracked by FLLM.</p>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Markets Represented</span>} title={String(statewideRestaurantCounties)} variant="gold">
              <p>Florida counties represented in current restaurant inventory.</p>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Median Asking Price</span>} title={statewideRestaurantMedian !== null ? formatCurrency(statewideRestaurantMedian) : "N/A"} variant="gold">
              <p>Median observed package asking price among current restaurant Market Views with disclosed prices.</p>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Observed Range</span>} title={statewideRestaurantLow !== null && statewideRestaurantHigh !== null ? `${formatCurrency(statewideRestaurantLow)} – ${formatCurrency(statewideRestaurantHigh)}` : "N/A"} variant="gold">
              <p>Observed business-package range; not a standalone liquor-license valuation range.</p>
            </FllmCard>
          </FllmCardGrid>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/miami">Miami Restaurants for Sale</Link>
            <FllmButton href="/restaurants-for-sale/orlando" variant="outline">Orlando Restaurants</FllmButton>
            <FllmButton href="/restaurants-for-sale/tampa" variant="outline">Tampa Restaurants</FllmButton>
            <FllmButton href="/restaurants-for-sale/jacksonville" variant="outline">Jacksonville Restaurants</FllmButton>
            <FllmButton href="/restaurants-for-sale/fort-lauderdale" variant="outline">Fort Lauderdale Restaurants</FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="restaurant-with-liquor-license-for-sale">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Florida Restaurant Buyer Search"
            title="Florida Restaurant With Liquor License for Sale"
            copy={
              <p>
                Search Florida restaurant opportunities by the actual alcoholic-beverage license included with the business.
                FLLM separates transferable 4COP quota licenses from qualification-based 4COP SFS / SRX full-liquor restaurant
                licenses and 2COP beer-and-wine licenses so buyers can compare the correct license structure instead of treating
                every restaurant with alcohol service as the same kind of opportunity.
              </p>
            }
            align="center"
          />
          <div className="fllm-ui-actions" style={{ justifyContent: "center" }}>
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#quota-restaurant-inventory">
              4COP Quota Restaurants
            </Link>
            <FllmButton href="#sfs-restaurant-inventory" variant="outline">4COP SFS / SRX Restaurants</FllmButton>
            <FllmButton href="#2cop-restaurant-inventory" variant="outline">2COP Beer & Wine Restaurants</FllmButton>
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
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/miami" variant="outline">Miami Restaurants for Sale</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Broward County</span>} title="Fort Lauderdale & Broward" variant="gold">
              <p>Fort Lauderdale and Broward County restaurant opportunities organized by full-liquor and beer-and-wine license structure.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/broward-county" variant="outline">Broward County Restaurants for Sale</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Central Florida</span>} title="Orlando & Orange County" variant="gold">
              <p>Orlando-area restaurant opportunities tied to Orange County 4COP, SFS / SRX and 2COP market activity.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/orlando" variant="outline">Orlando Restaurants for Sale</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Tampa Bay</span>} title="Tampa & Hillsborough County" variant="gold">
              <p>Tampa restaurant and restaurant/bar opportunities with Hillsborough County liquor-license structures.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/tampa" variant="outline">Tampa Restaurants for Sale</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">Northeast Florida</span>} title="Jacksonville & Duval County" variant="gold">
              <p>Jacksonville restaurant opportunities involving Duval County 4COP quota, SFS / SRX and 2COP licenses.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/jacksonville" variant="outline">Jacksonville Restaurants for Sale</FllmButton></div>
            </FllmCard>
            <FllmCard eyebrow={<span className="restaurant-card-cyan-label">South Florida</span>} title="Fort Lauderdale" variant="gold">
              <p>Dedicated Fort Lauderdale restaurant market coverage for Broward County hospitality buyers.</p>
              <div className="fllm-ui-actions"><FllmButton href="/restaurants-for-sale/fort-lauderdale" variant="outline">Fort Lauderdale Restaurants for Sale</FllmButton></div>
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
