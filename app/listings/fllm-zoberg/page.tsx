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
const canonicalPath = "/listings/fllm-zoberg";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/turnkey-mexican-latin-dining-and-entertainment-concept-with-full-liquor/2545461/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Miami Mexican Restaurant + 4COP SFS / SRX | Broker Preview",
  description:
    "Broker approval preview for a Miami-Dade Mexican-Latin restaurant and entertainment venue operating with a location-specific 4COP SFS / SRX restaurant license.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-US": canonicalUrl,
      "es-US": `${siteUrl}/es/listings/fllm-zoberg`,
      "x-default": canonicalUrl,
    },
  },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Miami Mexican-Latin Restaurant + 4COP SFS / SRX License",
    description:
      "Featured third-party broker preview represented by Brian Zoberg of Suncoast Business Consultants.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miami Mexican-Latin Restaurant + 4COP SFS / SRX License",
    description:
      "Private featured-listing mockup for broker review and approval.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-ZOBERG",
  canonicalPath,
  locale: "en",
  languageAlternates: {
    en: canonicalPath,
    es: "/es/listings/fllm-zoberg",
  },
  county: "Miami-Dade County",
  countyHref: "/counties/miami-dade",
  countyValueHref: "/counties/miami-dade/liquor-license-value",
  countyCities: "Miami · Doral · Hialeah · Miami Beach",
  countyPopulation: "2,838,461",
  askingPrice: "Not separately valued",
  askingPriceNumber: 0,
  packagePrice: "$1,200,000",
  packagePriceNumber: 1_200_000,
  licenseType: "4COP SFS/SRX",
  licenseClass: "sfs",
  businessLabel: "Mexican-Latin restaurant and entertainment venue",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Established Miami-Dade Mexican-Latin restaurant and entertainment venue offered as a turnkey business acquisition with location-specific 4COP SFS / SRX full-liquor privileges.",
  broker: {
    name: "Brian Zoberg",
    brokerage: "Suncoast Business Consultants",
    phone: "(305) 301-2443",
    email: "Brian@suncoastbiz.net",
    website: "https://suncoastbiz.net/about-us/",
    listingUrl: sourceListingUrl,
    photo:
      "https://suncoastbiz.net/wp-content/uploads/2026/09/Brian-Pic-2026-Left-upper.jpg",
    credential: "Florida real estate broker license BK3289133",
  },
  additionalSellerIntro:
    "Opportunity to acquire a well-established full-service Mexican restaurant, cocktail program and entertainment venue in Miami-Dade County as a turnkey operating business.",
  packageIncludes:
    "The offering includes the operating restaurant business, established systems, furniture, fixtures and equipment, commercial kitchen and bar infrastructure, leasehold interests and associated goodwill. The restaurant operates with a 4COP SFS / SRX special restaurant license tied to the qualifying operation and approved premises.",
  businessMetrics: [
    {
      label: "Business Asking Price",
      value: "$1,200,000",
      description:
        "The seller's requested price for the operating business and included transaction assets. Final price, included assets, working capital and transaction costs remain subject to negotiation and verification.",
    },
    {
      label: "Gross Revenue",
      value: "$3,280,000",
      description:
        "The business's annual sales before operating expenses, debt service, taxes, owner compensation and other deductions.",
    },
    {
      label: "Cash Flow (SDE)",
      value: "$388,520",
      description:
        "SDE means Seller's Discretionary Earnings: business earnings adjusted to reflect the economic benefit available to one owner-operator before items such as owner compensation, interest, taxes, depreciation, amortization and certain discretionary or nonrecurring expenses.",
    },
    {
      label: "Adjusted SDE",
      value: "$362,000",
      description:
        "An adjusted estimate of Seller's Discretionary Earnings after stated normalization changes. Buyers should request the adjustment schedule and reconcile it to tax returns and financial statements.",
    },
    {
      label: "License Classification",
      value: "4COP SFS / SRX",
      description:
        "4COP denotes full-liquor consumption-on-premises privileges. SFS means Special Food Service and SRX is commonly used for the special restaurant category. This qualification-based license depends on the restaurant and approved premises rather than constituting a separately transferable quota asset.",
      href: "/license-types/4cop-sfs-restaurant",
    },
    {
      label: "Premises",
      value: "5,242 SF leased",
      description:
        "The total stated size of the leased restaurant premises. Buyers should verify usable area, lease terms, permitted use, renewal options and assignment rights.",
    },
    {
      label: "Monthly Rent",
      value: "$33,162",
      description:
        "The amount paid each month to occupy the business premises. Confirm whether this figure includes common-area charges, property taxes, insurance, percentage rent or other occupancy costs.",
    },
    {
      label: "Employees",
      value: "28 full-time · 4 part-time",
      description:
        "The number of full-time and part-time employees associated with the business. Payroll, contractor status, benefits, scheduling and continued employment should be independently verified.",
    },
    {
      label: "Food Service",
      value: "Full kitchen, hood and grease trap",
      description:
        "The kitchen systems and equipment used for food preparation and service. Equipment condition, ownership, permits, code compliance and maintenance obligations require inspection and verification.",
    },
    {
      label: "Entertainment",
      value: "Live music · DJs · private events",
      description:
        "The types of entertainment offered at the premises. Buyers should confirm zoning, occupancy, noise, late-hours and entertainment approvals.",
    },
    {
      label: "Revenue Channels",
      value: "Dine-in · takeout · delivery · catering",
      description:
        "The ways the business generates sales. Buyers should verify the revenue contribution, margins and contracts associated with each channel.",
    },
    {
      label: "Visa Positioning",
      value: "E-2 / L-1 / EB-5 advertised",
      description:
        "Immigration categories that may be considered in connection with a qualifying business investment. This is not a guarantee of eligibility or approval; buyers should obtain advice from a qualified immigration attorney.",
    },
  ],
  opportunitiesHeading: "Offering Highlights",
  opportunities: [
    "Acquire a turnkey full-service Mexican-Latin restaurant with an established customer base and operating systems.",
    "Continue dine-in, takeout, delivery, catering, private-event and beverage revenue streams.",
    "Operate the existing full-liquor restaurant concept subject to DBPR approval and continuing SFS qualification.",
    "Expand marketing, catering, private events, additional locations or franchising initiatives.",
  ],
  transitionText:
    "The seller offers transition training and post-closing consultation, subject to final agreement with the buyer.",
  confidentialityText:
    "the business name, exact premises, financial records, lease documents and licensing records may require buyer qualification and direct confirmation through the listing broker.",
  countyContext:
    "Miami-Dade County is Florida's largest international hospitality market, combining global tourism, finance, trade, culture, hotels, restaurants, nightlife, entertainment, and dense year-round population.",
};

export default function BrianZobergFeaturedListingPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
