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
const canonicalPath = "/listings/fllm-difrancesco";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/beachside-restaurant-and-nightclub-with-liquor-license-and-steady-revenue/2397061/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Broward County Beachside Restaurant & Nightclub + 4COP Quota License | Broker Preview",
  description:
    "Private broker-review preview for Nick DiFrancesco's Broward County beachside restaurant and nightclub offered at $1,650,000 with an included transferable quota liquor license.",
  alternates: { canonical: canonicalUrl },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      noimageindex: true,
    },
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title:
      "Broward County Beachside Restaurant & Nightclub + Quota Liquor License | Broker Preview",
    description:
      "Private FLLM preview represented by Nick DiFrancesco of Business Exit Advisors.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Broward County Beachside Restaurant & Nightclub + Quota Liquor License | Broker Preview",
    description:
      "Private FLLM preview represented by Nick DiFrancesco of Business Exit Advisors.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-DIFRANCESCO",
  canonicalPath,
  county: "Broward County",
  countyHref: "/counties/broward",
  countyValueHref: "/counties/broward/liquor-license-value",
  countyCities: "Fort Lauderdale · Hollywood · Pompano Beach · Deerfield Beach",
  countyPopulation: "2,037,472",
  askingPrice: "Nearly $500,000",
  askingPriceNumber: 500000,
  packagePrice: "$1,650,000",
  packagePriceNumber: 1_650_000,
  licenseType: "4COP Quota",
  approvalPreview: true,
  businessLabel: "Beachside restaurant and nightclub",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Broward County beachside restaurant and nightclub offered as a turnkey business acquisition with steady revenue, live music and nightlife, a recently remodeled hospitality operation, and an included transferable 4COP / 3PS quota liquor license.",
  broker: {
    name: "Nick DiFrancesco",
    brokerage: "Business Exit Advisors",
    phone: "(561) 578-0584",
    email: "nick@myexitplan.com",
    website: "https://businesssaleslistings.com",
    listingUrl: sourceListingUrl,
    photo:
      "https://images.bizbuysell.com/shared/brokerdirectory/images/50260/pf_prs_headshot.jpeg",
    credential: "Florida licensed business broker · SL3626742",
  },
  additionalSellerIntro:
    "Opportunity to acquire a turnkey Broward County beachside restaurant and nightclub within walking distance of the beach, positioned for dining, live music, street dancing and nightlife traffic.",
  packageIncludes:
    "The offering includes the operating restaurant and nightclub business, approximately $15,000 of inventory, approximately $475,000 of furniture, fixtures and equipment, the recently remodeled 3,000-square-foot hospitality premises and the associated transferable quota liquor license. The included license is a coveted 4COP / 3PS liquor license valued at nearly half a million dollars. The total business asking price is $1,650,000. Buyers should confirm the exact license series, included assets, lease terms, license allocation and transaction structure directly with the listing broker.",
  businessMetrics: [
    {
      label: "Gross Revenue",
      value: "$1,616,822",
      description:
        "Gross revenue is stated at $1,616,822. Buyers should verify the reporting period and reconcile revenue to financial records.",
    },
    {
      label: "Cash Flow (SDE)",
      value: "$285,735",
      description:
        "Seller's Discretionary Earnings are stated at $285,735. Buyers should reconcile this figure to tax returns, financial statements and supporting records during due diligence.",
    },
    {
      label: "Established",
      value: "2006",
      description:
        "The business is stated to have been established in 2006.",
    },
    {
      label: "Premises",
      value: "3,000 SF",
      description:
        "The premises are approximately 3,000 square feet and configured as a turnkey restaurant operation. Buyers should verify the exact premises size, lease terms, permitted use and occupancy.",
    },
    {
      label: "Inventory",
      value: "$15,000 included",
      description:
        "Approximately $15,000 of inventory is included in the asking price.",
    },
    {
      label: "FF&E",
      value: "$475,000 included",
      description:
        "Approximately $475,000 of furniture, fixtures and equipment is included in the asking price.",
    },
    {
      label: "Employees",
      value: "11",
      description:
        "The business is stated to have 11 employees. Buyers should verify payroll, employee roles, scheduling and continued employment.",
    },
    {
      label: "License",
      value: "4COP / 3PS quota license included",
      description:
        "A coveted 4COP / 3PS liquor license is included with the business and valued at nearly half a million dollars. Buyers should confirm the exact current series, quota status, ownership and transferability with the listing broker and DBPR/ABT.",
      href: "/license-types/4cop-quota",
    },
    {
      label: "Facilities",
      value: "Remodeled interior · upgraded outdoor bar",
      description:
        "The facilities include updated bathrooms, new furniture, a redesigned interior and an upgraded outdoor bar area.",
    },
    {
      label: "Competition / Positioning",
      value: "High-traffic beachside hospitality area",
      description:
        "The business occupies a high-traffic location with full-liquor service, extended hours, dining, live music and nightlife positioning.",
    },
    {
      label: "Seller Training",
      value: "14 business days",
      description:
        "The seller will provide 14 business days of training at no cost following closing.",
    },
    {
      label: "Reason for Selling",
      value: "Family Related",
      description:
        "The stated reason for selling is family related.",
    },
  ],
  opportunitiesHeading: "Offering Highlights",
  opportunities: [
    "Acquire a turnkey Broward County beachside restaurant and nightclub within walking distance of the beach.",
    "Continue a hospitality concept known for live music, street dancing, nightlife and a community-supported weekly event.",
    "Operate with the associated transferable quota liquor license, subject to buyer, premises and DBPR/ABT approval.",
    "Use the recently remodeled interior, updated bathrooms, new furniture and upgraded outdoor bar area.",
    "Build on the reported $1,616,822 gross revenue and $285,735 SDE through stronger digital marketing, events and customer-retention initiatives.",
  ],
  transitionText:
    "The seller will provide 14 business days of training at no cost following closing. The stated reason for selling is family related.",
  confidentialityText:
    "the business name, exact premises, lease documents, financial statements, license records and other sensitive information may require buyer qualification and direct confirmation through the listing broker.",
  sourceDisclosure:
    "Business, financial, facility, staffing, asset, license-value and other figures have not been independently audited or verified by FLLM. The included 4COP / 3PS liquor license is valued at nearly half a million dollars; the ABT license number and a precise separate license allocation are not displayed. Buyers should verify the current license series, quota status, ownership, transferability, premises, zoning, lease conditions, financial performance, included assets and all transaction terms directly with Nick DiFrancesco, the seller and appropriate professional advisers.",
  countyContext:
    "Broward County supports a substantial restaurant, nightlife, hospitality and tourism market across Fort Lauderdale, Hollywood, Pompano Beach, Deerfield Beach and surrounding communities. Quota-license values can vary materially based on supply, seller terms, intended premises, timing and transaction structure.",
};

export default function NickDiFrancescoFeaturedListingPreviewPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
