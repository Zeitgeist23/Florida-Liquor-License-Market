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
          left: 42%;
          right: -4%;
          background-image: url("data:image/webp;base64,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");
          background-size: cover;
          background-position: center right;
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
