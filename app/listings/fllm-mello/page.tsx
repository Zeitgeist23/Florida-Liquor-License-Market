import type { Metadata } from "next";

import FeaturedThirdPartyBusinessListingPage, {
  type FeaturedThirdPartyBusinessListingConfig,
} from "@/components/FeaturedThirdPartyBusinessListingPage";

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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Delray Beach Restaurant + 4COP Quota License | Broker Preview",
  description:
    "Broker approval preview for a Delray Beach restaurant offered at $159,000 with a transferable Palm Beach County 4COP quota license stated at $200,000.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Delray Beach Restaurant + 4COP Quota License",
    description:
      "Featured third-party broker preview. The restaurant is offered at $159,000 and the associated transferable 4COP quota license is stated at $200,000.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delray Beach Restaurant + 4COP Quota License",
    description:
      "Featured third-party broker preview represented by Leonard Mello of We Sell Restaurants.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
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
  businessLabel: "Delray Beach restaurant and bar",
  businessLabelLinkUrl:
    "https://www.bizbuysell.com/business-opportunity/delray-beach-restaurant-for-sale-steps-from-atlantic-ave/2543468/",
  heroSummary:
    "Palm Beach County 4COP quota liquor license available with the acquisition of the associated turnkey Delray Beach restaurant and leasehold rights. The business is offered at $159,000, and the transferable license is separately stated at $200,000.",
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
    "Opportunity to acquire turnkey restaurant and bar leasehold rights just off Atlantic Avenue in Delray Beach together with the associated transferable Palm Beach County 4COP quota liquor license.",
  packageIncludes:
    "The broker-reported offering consists of the restaurant leasehold rights, furniture, fixtures and equipment, the operating restaurant and bar infrastructure, and the transferable 4COP liquor license. The current restaurant name, recipes, menu and concept are not included. The business asking price is $159,000; the license is separately stated at $200,000 and is described as seller-financed at 6% interest-only, with the stated $1,000 monthly license payment included in rent, subject to definitive transaction documents and broker confirmation.",
  businessMetrics: [
    { label: "Business / Leasehold Asking Price", value: "$159,000" },
    { label: "4COP License Price", value: "$200,000" },
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
    "Use the existing commercial kitchen, full-service bar, indoor dining area and outdoor seating.",
    "Benefit from proximity to Delray Beach tourism, dining, retail, festivals and year-round local traffic.",
  ],
  transitionText:
    "The offering is presented as a sale of leasehold rights. No seller training is included, and the stated reason for sale is other interests.",
  confidentialityText:
    "additional business, lease and license information may require buyer qualification and direct confirmation through the listing broker.",
  sourceDisclosure:
    "Business, financial, lease, facility, license-price and financing figures are broker-reported listing information and have not been independently audited or verified by FLLM. The source advertisement describes a transferable 4COP license but does not publish its ABT license number. Buyers should verify the license series, quota status, ownership, transferability, financing terms, lease conditions, zoning, regulatory compliance and all other transaction information directly with the listing broker and appropriate professionals.",
  countyContext:
    "Palm Beach County supports a substantial restaurant, nightlife, hospitality and tourism market across West Palm Beach, Boca Raton, Delray Beach, Jupiter and surrounding communities. Quota-license values can vary materially based on supply, seller terms, intended premises, timing and transaction structure.",
};

export default function LeonardMelloFeaturedListingPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
