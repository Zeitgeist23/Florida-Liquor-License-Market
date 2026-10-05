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
          left: 40%;
          right: 0;
          background-image: url("data:image/webp;base64,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[... huge omitted in analysis?]");
          background-size: cover;
          background-position: 58% center;
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
