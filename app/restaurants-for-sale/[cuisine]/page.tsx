import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BusinessPackageLocalMarkets from "@/components/BusinessPackageLocalMarkets";
import BusinessQuotaListingCard from "@/components/BusinessQuotaListingCard";
import {
  FllmButton,
  FllmCard,
  FllmPageShell,
  FllmSectionHeading,
} from "@/components/FllmDesignSystem";
import {
  getRestaurantCuisineDefinition,
  restaurantCuisines,
  restaurantCuisineHref,
} from "@/data/restaurant-cuisines";
import {
  business2copListings,
  businessMarketDisplayTitle,
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

type PageProps = {
  params: Promise<{ cuisine: string }>;
};

const publishedRestaurantListings = [
  ...businessQuotaListings,
  ...businessSfsListings,
  ...business2copListings,
].filter((listing) => listing.businessCategory === "Restaurant");

function hasPublishedCuisine(slug: string) {
  const definition = getRestaurantCuisineDefinition(slug);
  return Boolean(
    definition &&
      publishedRestaurantListings.some((listing) =>
        listing.cuisines?.includes(definition.label),
      ),
  );
}

export function generateStaticParams() {
  return restaurantCuisines
    .filter((definition) => hasPublishedCuisine(definition.slug))
    .map((definition) => ({ cuisine: definition.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cuisine } = await params;
  const definition = getRestaurantCuisineDefinition(cuisine);
  if (!definition || !hasPublishedCuisine(cuisine)) return {};

  const canonicalUrl = `${siteUrl}${restaurantCuisineHref(definition.slug)}`;
  return {
    title: `${definition.label} Restaurants for Sale in Florida | FLLM`,
    description: `${definition.shortDescription} Compare active Florida ${definition.label.toLowerCase()} restaurant listings by county and liquor-license type on FLLM.`,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    keywords: [...definition.searchTerms],
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${definition.label} Restaurants for Sale in Florida | FLLM`,
      description: definition.shortDescription,
      siteName: "Florida Liquor License Market",
    },
  };
}

export default async function RestaurantCuisinePage({ params }: PageProps) {
  const { cuisine } = await params;
  const definition = getRestaurantCuisineDefinition(cuisine);
  if (!definition || !hasPublishedCuisine(cuisine)) notFound();

  const standaloneListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );
  const allRestaurantListings = [
    ...withMarketLicenseValues(businessQuotaListings, standaloneListings),
    ...withMarketLicenseValues(businessSfsListings, standaloneListings),
    ...withMarketLicenseValues(business2copListings, standaloneListings),
  ].filter(
    (listing) =>
      listing.businessCategory === "Restaurant" &&
      listing.cuisines?.includes(definition.label),
  );

  const counties = Array.from(new Set(allRestaurantListings.map((listing) => listing.county))).sort();
  const browardListings = allRestaurantListings.filter(
    (listing) => listing.county === "Broward County",
  );
  const canonicalUrl = `${siteUrl}${restaurantCuisineHref(definition.slug)}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${definition.label} Restaurants for Sale in Florida`,
      url: canonicalUrl,
      description: definition.shortDescription,
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
          name: `${definition.label} Restaurants for Sale`,
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${definition.label} restaurant opportunities in Florida`,
      numberOfItems: allRestaurantListings.length,
      itemListElement: allRestaurantListings.map((listing, index) => ({
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

      <section className="fllm-template-hero">
        <div className="fllm-template-shell">
          <div className="fllm-ui-breadcrumbs">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/restaurants-with-liquor-licenses">Restaurants</Link><span>›</span>
            <strong>{definition.label}</strong>
          </div>
          <span className="fllm-template-eyebrow">Florida Restaurant Marketplace · Cuisine Search</span>
          <h1 className="fllm-template-hero-title">{definition.label} Restaurants for Sale in Florida</h1>
          <p className="fllm-template-hero-copy">
            {definition.shortDescription} FLLM keeps cuisine and restaurant concept separate from the alcoholic-beverage
            license structure so buyers can search by the kind of restaurant they want and still distinguish transferable
            4COP quota licenses, location-specific 4COP SFS / SRX licenses, and 2COP beer-and-wine licenses.
          </p>
          <div className="fllm-ui-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="#cuisine-inventory">
              View {definition.label} Restaurant Listings
            </Link>
            <FllmButton href="/restaurants-with-liquor-licenses" variant="outline">
              All Florida Restaurants
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-template-section" id="cuisine-inventory">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow={`${definition.label} Restaurant Inventory`}
            title={`Current ${definition.label} restaurant opportunities on FLLM`}
            copy={
              <p>
                FLLM currently identifies {allRestaurantListings.length} published {definition.label.toLowerCase()}
                restaurant opportunit{allRestaurantListings.length === 1 ? "y" : "ies"} across {counties.length}
                Florida count{counties.length === 1 ? "y" : "ies"}. Listing cards identify the business package and
                alcoholic-beverage license structure separately.
              </p>
            }
          />

          <BusinessPackageLocalMarkets
            listings={allRestaurantListings}
            label={`Florida markets with published ${definition.label} restaurant inventory`}
          />

          <div className="business-quota-grid">
            {allRestaurantListings.map((listing) => (
              <BusinessQuotaListingCard key={listing.listingReference} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {definition.slug === "italian" && browardListings.length ? (
        <section className="fllm-template-section fllm-template-section--deep" id="broward-italian-restaurants">
          <div className="fllm-template-shell">
            <FllmSectionHeading
              eyebrow="Broward County Italian Restaurant Market"
              title="Italian restaurants for sale in Broward County"
              copy={
                <p>
                  FLLM currently carries published Italian restaurant inventory in Broward County, including
                  Fort Lauderdale opportunities. Broward County also includes Weston, Hollywood, Pompano Beach,
                  Pembroke Pines, Coral Springs and other local markets, so buyers can use the county inventory
                  to compare nearby restaurant opportunities and the license structure attached to each business.
                </p>
              }
            />

            <FllmCard
              eyebrow={<span className="restaurant-card-cyan-label">Local Market Coverage</span>}
              title="Explore Broward restaurant markets by location"
              variant="gold"
            >
              <p>
                This cuisine page is designed to rank for Italian restaurant searches across Florida and Broward County.
                For location-specific searches around Weston, use FLLM&apos;s dedicated Weston restaurant market page,
                which organizes nearby restaurant inventory by full-liquor privileges, 4COP structure, cuisine and
                actual business location.
              </p>
              <div className="fllm-ui-actions">
                <FllmButton href="/counties/broward" variant="outline">
                  Broward County Market
                </FllmButton>
                <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-for-sale/weston">
                  Weston Restaurant Market
                </Link>
              </div>
            </FllmCard>
          </div>
        </section>
      ) : null}

      <section className="fllm-template-section">
        <div className="fllm-template-shell">
          <FllmSectionHeading
            eyebrow="Browse By Restaurant Type"
            title="Search Florida restaurant opportunities by cuisine and concept"
            copy={
              <p>
                Cuisine is one layer of the FLLM restaurant marketplace. Business-category pages separately organize
                bars, lounges, nightclubs and other hospitality concepts, while each listing keeps its liquor-license
                classification explicit.
              </p>
            }
          />
          <div className="fllm-ui-actions">
            {restaurantCuisines
              .filter((item) => item.slug !== definition.slug && hasPublishedCuisine(item.slug))
              .map((item) => (
                <FllmButton key={item.slug} href={restaurantCuisineHref(item.slug)} variant="outline">
                  {item.label} Restaurants
                </FllmButton>
              ))}
            <FllmButton href="/businesses-with-quota-licenses/bars" variant="outline">
              Bars
            </FllmButton>
            <FllmButton href="/businesses-with-quota-licenses/nightclubs" variant="outline">
              Nightclubs
            </FllmButton>
          </div>
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Florida Restaurant Search</span>
            <h2>Find the restaurant concept and understand the license that comes with it.</h2>
            <p>
              FLLM organizes restaurant opportunities by cuisine, county, business category and alcoholic-beverage
              license structure so buyers can narrow the market without treating every liquor license as the same asset.
            </p>
          </div>
          <div className="fllm-ui-final-actions">
            <Link className="btn btn-gold fllm-ui-official-gold-button" href="/restaurants-with-liquor-licenses">
              Browse All Restaurants
            </Link>
            <FllmButton href="/contact" variant="outline">Contact FLLM</FllmButton>
          </div>
        </div>
      </section>
    </FllmPageShell>
  );
}
