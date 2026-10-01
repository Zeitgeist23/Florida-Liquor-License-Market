import type { Metadata } from "next";

import FeaturedThirdPartyBusinessListingPage, {
  type FeaturedThirdPartyBusinessListingConfig,
} from "@/components/FeaturedThirdPartyBusinessListingPage";
import { buildFloridaMarketIndex, marketPriceStats } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "@/app/listings/listings-premium.css";
import "@/app/listings/listings-header-position.css";
import "@/app/listings/listings-map-size.css";
import "@/app/listings/listings-county-links.css";
import "@/app/listings/listings-navy-refresh.css";
import "@/app/listings/listings-card-gold-borders.css";
import "@/app/listings/listings-title-highlight.css";
import "@/app/listings/listings-regression-fix.css";
import "@/app/listings/listings-filter-depth.css";
import "@/app/listings/listings-logo-3pct-lock.css";
import "@/app/listings/listings-conversion-cards.css";
import "@/app/listings/listings-card-overlap-fix.css";
import "@/app/listings/listings-masthead-darker.css";
import "@/app/listings/listings-mobile-header-fix.css";
import "@/app/listings/listings-focused-card.css";
import "../[slug]/listing-detail.css";
import "../third-party-business-listing-standard.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalPath = "/listings/fllm-mello";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const socialImageUrl = "https://www.floridaliquorlicensemarket.com/assets/brokers/leonard-mello.png";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Delray Beach Restaurant with Full Liquor License for Sale | 4COP Quota",
  description:
    "Delray Beach restaurant with full liquor license for sale: turnkey restaurant and bar with a transferable Palm Beach County 4COP Quota full-liquor license. $359,000 total package.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Delray Beach Restaurant with Full Liquor License | 4COP Quota",
    description:
      "Turnkey Delray Beach restaurant and bar for sale with a transferable Palm Beach County 4COP Quota full-liquor license. $359,000 total package.",
    siteName: "Florida Liquor License Market",
    images: [{ url: socialImageUrl, alt: "Leonard Mello — FLLM featured listing" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImageUrl],
    title: "Delray Beach Restaurant with Full Liquor License | 4COP Quota",
    description:
      "Delray Beach restaurant and bar + Palm Beach County 4COP quota license package represented by Leonard Mello of We Sell Restaurants.",
  },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

async function buildConfig(): Promise<FeaturedThirdPartyBusinessListingConfig> {
  const visibleListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );
  const palmBeachFourCop = visibleListings.filter(
    (listing) =>
      listing.county === "Palm Beach County" &&
      listing.type === "4COP Quota",
  );
  const fourCopStats = marketPriceStats(
    palmBeachFourCop.map((listing) => listing.price),
  );
  const marketIndex = buildFloridaMarketIndex(visibleListings);
  const palmBeachMarket = marketIndex.countyRows.find(
    (row) => row.county === "Palm Beach County",
  );
  const medianValue =
    fourCopStats.median ?? palmBeachMarket?.fourCop.median ?? 200_000;
  const medianLabel = money(medianValue);

  return {
  listingReference: "FLLM-MELLO",
  canonicalPath,
  county: "Palm Beach County",
  countyHref: "/counties/palm-beach",
  countyValueHref: "/counties/palm-beach/liquor-license-value",
  countyCities: "West Palm Beach · Boca Raton · Delray Beach · Jupiter",
  askingPrice: "$200,000",
  askingPriceNumber: 200000,
  packagePrice: "$359,000",
  packagePriceNumber: 359000,
  licenseType: "4COP Quota",
  businessLabel: "Delray Beach Restaurant with Full Liquor License",
  businessLabelLinkUrl:
    "https://www.bizbuysell.com/business-opportunity/delray-beach-restaurant-for-sale-steps-from-atlantic-ave/2543468/",
  heroSummary:
    "Turnkey Delray Beach restaurant and bar for sale with an included transferable Palm Beach County 4COP Quota full liquor license. Located just off Atlantic Avenue, the business is offered at $159,000 and the transferable license is separately stated at $200,000.",
  broker: {
    name: "Leonard Mello",
    brokerage: "We Sell Restaurants",
    phone: "(754) 262-3368",
    email: "Leonard@wesellrestaurants.com",
    website:
      "https://www.wesellrestaurants.com/restaurants-for-sale/Gold-Coast-Florida-Leonard-Mello",
    listingUrl:
      "https://www.wesellrestaurants.com/restaurant-for-sale/delray-beach-restaurant-for-sale-steps-from-atlantic-ave/33116",
    photo: "/assets/brokers/leonard-mello.png",
    credential: "Florida sales associate license SL3659241",
  },
  additionalSellerIntro:
    "Opportunity to acquire a turnkey Delray Beach restaurant and bar with a full liquor license, located just off Atlantic Avenue. The package includes a transferable Palm Beach County 4COP Quota license. Unlike a premises-qualified 4COP SFS/SRX restaurant license, a quota license is a transferable county-limited license interest, subject to buyer qualification, zoning, premises and DBPR/ABT approval.",
  packageIncludes:
    `The offering consists of the restaurant leasehold rights, furniture, fixtures and equipment, the operating restaurant and bar infrastructure, and the transferable 4COP Quota liquor license. The current restaurant name, recipes, menu and concept are not included. The business asking price is $159,000 and the license is separately stated at $200,000. For FLLM market context, the current Palm Beach County median disclosed asking price for standalone 4COP Quota licenses is ${medianLabel}, based on ${fourCopStats.count} active standalone listing${fourCopStats.count === 1 ? "" : "s"} in the current FLLM market set. The license is offered with seller financing at 6% interest-only, with the stated $1,000 monthly license payment included in rent, subject to definitive transaction documents and confirmation with the listing broker.`,
  businessMetrics: [
    { label: "Business / Leasehold Asking Price", value: "$159,000" },
    { label: "4COP License Price", value: "$200,000" },
    {
      label: "FLLM Palm Beach 4COP Quota Median",
      value: medianLabel,
      description:
        `Current median disclosed asking price calculated from ${fourCopStats.count} active standalone 4COP Quota listing${fourCopStats.count === 1 ? "" : "s"} in Palm Beach County. Market context only; not an appraisal of the specific license included in this transaction.`,
      href: "/counties/palm-beach/liquor-license-value",
    },
    {
      label: "Comparable Standalone 4COP Quota Listings",
      value: String(fourCopStats.count),
      description:
        "Count of active standalone Palm Beach County 4COP Quota listings currently included in the FLLM market set.",
      href: "/counties/palm-beach",
    },
    {
      label: "License Structure",
      value: "Transferable 4COP Quota",
      description:
        "A county-limited transferable quota-license interest, distinct from a premises-qualified 4COP SFS/SRX restaurant license. Transfer remains subject to buyer qualification, zoning, premises and DBPR/ABT approval.",
      href: "/license-types/4cop-quota",
    },
    { label: "Gross Revenue", value: "$600,000" },
    { label: "Established", value: "2017" },
    { label: "Premises", value: "1,405 SF leased" },
    { label: "Monthly Rent", value: "$13,182 incl. CAM + license payment" },
    { label: "Lease Expiration", value: "June 27, 2027" },
    { label: "Renewal Options", value: "Two 5-year options" },
    { label: "Indoor Seating", value: "50 guests" },
    { label: "Outdoor Seating", value: "10 guests" },
    { label: "Bar Seating", value: "10 guests" },
    { label: "Employees", value: "6 full-time · 2 part-time" },
  ],
  opportunitiesHeading:
    "Offering highlights identified in the broker listing",
  opportunities: [
    "Bring a new full-service restaurant concept to an equipped Delray Beach location near Atlantic Avenue.",
    "Operate a full-liquor bar using the associated transferable 4COP quota license, subject to regulatory approval.",
    "Compare the separately stated $200,000 license price with FLLM's current Palm Beach County 4COP Quota market median and active standalone inventory.",
    "Review the stated 6% interest-only seller-financing structure for the license directly with the listing broker and transaction professionals.",
    "Use the existing commercial kitchen, full-service bar, indoor dining area and outdoor seating.",
    "Benefit from proximity to Delray Beach tourism, dining, retail, festivals and year-round local traffic.",
  ],
  transitionText:
    "The offering is presented as a sale of leasehold rights. No seller training is included, and the stated reason for sale is other interests.",
  confidentialityText:
    "additional business, lease and license information may require buyer qualification and direct confirmation through the listing broker.",
  sourceDisclosure:
    "Business, financial, lease, facility, license-price and financing information has not been independently audited or verified by FLLM. The public listing describes a transferable 4COP license but does not publish its ABT license number. Buyers should verify the license series, quota status, ownership, transferability, financing terms, lease conditions, zoning, regulatory compliance and all other transaction information directly with the listing broker and appropriate professionals.",
  countyContext:
    "Palm Beach County supports a substantial restaurant, nightlife, hospitality and tourism market across West Palm Beach, Boca Raton, Delray Beach, Jupiter and surrounding communities. Quota-license values can vary materially based on supply, seller terms, intended premises, timing and transaction structure.",
  };
}

export default async function LeonardMelloFeaturedListingPage() {
  const config = await buildConfig();
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
