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
const canonicalPath = "/listings/rumija";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/semi-absentee-restaurant-for-sale/2524432/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lee County Semi-Absentee Pizzeria for Sale + 4COP SFS/SRX | FLLM",
  description:
    "Lee County semi-absentee pizzeria for sale at $900,000 with $400,000 Cash Flow (SDE), leased premises, an included 4COP SFS/SRX full-liquor license, and seller financing available with 50% down.",
  alternates: { canonical: canonicalUrl },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Lee County Semi-Absentee Pizzeria for Sale + 4COP SFS/SRX",
    description:
      "Featured broker listing represented by Marjan Rumija of Krise Commercial Group, LLC: $900,000 asking price, $400,000 Cash Flow (SDE), leased premises and an included 4COP SFS/SRX full-liquor license.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary",
    title: "Lee County Semi-Absentee Pizzeria for Sale + 4COP SFS/SRX",
    description:
      "Featured Lee County pizzeria business listing with $400,000 Cash Flow (SDE) and an included 4COP SFS/SRX full-liquor license.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-RUMIJA",
  canonicalPath,
  county: "Lee County",
  countyHref: "/counties/lee",
  countyValueHref: "/counties/lee/liquor-license-value",
  countyCities: "Fort Myers · Cape Coral · Bonita Springs · Estero",
  askingPrice: "Included with business",
  askingPriceNumber: 0,
  packagePrice: "$900,000",
  packagePriceNumber: 900_000,
  licenseType: "4COP SFS/SRX",
  licenseClass: "sfs",
  licenseAvailableSeparately: false,
  approvalPreview: false,
  businessLabel: "Semi-Absentee Pizzeria",
  businessLabelLinkUrl: sourceListingUrl,
  businessLabelBodyBold: false,
  packagePriceExternalLink: true,
  heroSummary:
    "Semi-absentee Lee County pizzeria opportunity for sale for $900,000 with $400,000 in annual Cash Flow (SDE), leased premises and an included 4COP SFS / SRX full-liquor license. The business requires a cash buyer or seller financing with 50% down and is not SBA financeable.",
  broker: {
    name: "Marjan Rumija",
    brokerage: "Krise Commercial Group, LLC",
    phone: "(239) 285-8922",
    email: "OnlyCommercialProperties@gmail.com",
    website: "https://totalcommercial.com/agents/21455",
    listingUrl: sourceListingUrl,
    photo: "https://totalcommercial.com/media/142055/legacy-photo-505945.jpg",
    credential: "Florida real estate professional",
  },
  additionalSellerIntro:
    "Semi-absentee pizzeria opportunity in Lee County, Florida offered at $900,000 with $400,000 in annual Cash Flow (SDE), leased premises, recently remodeled operations and an included 4COP SFS / SRX full-liquor license.",
  packageIncludes:
    "The business includes approximately $160,000 in furniture, fixtures and equipment, approximately $36,000 in inventory, the existing restaurant operating infrastructure and an included 4COP SFS / SRX full-liquor license. Monthly rent is $7,300. The opportunity requires a cash buyer or seller financing with 50% down and is not SBA financeable.",
  businessMetrics: [
    {
      label: "Cash Flow (SDE)",
      value: "$400,000",
      description:
        "Annual Cash Flow (SDE) is $400,000. Buyers should reconcile the figure to financial statements, tax returns and supporting records during due diligence.",
    },
    {
      label: "Gross Revenue",
      value: "Not Disclosed",
      description:
        "Gross revenue has not been disclosed.",
    },
    {
      label: "Business Asking Price",
      value: "$900,000",
      description:
        "The business asking price is $900,000.",
    },
    {
      label: "EBITDA",
      value: "Not Disclosed",
      description:
        "EBITDA has not been disclosed.",
    },
    {
      label: "Business Type",
      value: "Pizzeria",
      description:
        "The operating concept is a pizzeria.",
    },
    {
      label: "Liquor License",
      value: "Included",
      description:
        "A full-liquor license is included with the business.",
    },
    {
      label: "Liquor License Classification",
      value: "4COP SFS / SRX",
      description:
        "The included full-liquor license is identified as a 4COP SFS / SRX license for this featured broker listing.",
      href: "/license-types/4cop-sfs-restaurant",
    },
    {
      label: "Furniture, Fixtures & Equipment",
      value: "$160,000",
      description:
        "Approximately $160,000 in furniture, fixtures and equipment is included with the business.",
    },
    {
      label: "Inventory",
      value: "$36,000",
      description:
        "Approximately $36,000 in inventory is included with the business.",
    },
    {
      label: "Monthly Rent",
      value: "$7,300",
      description:
        "Monthly rent is $7,300. Buyers should verify lease terms, assignment rights, options, CAM and landlord requirements.",
    },
    {
      label: "Premises",
      value: "Leased",
      description:
        "The operating premises are leased.",
    },
    {
      label: "Remodeled",
      value: "2024",
      description:
        "The restaurant was remodeled in 2024.",
    },
    {
      label: "Buyer Requirement",
      value: "Cash Buyer or Seller Financing",
      description:
        "The opportunity requires either a cash buyer or seller financing with 50% down.",
    },
    {
      label: "Seller Financing",
      value: "Available — 50% Down",
      description:
        "Seller financing is available with 50% down. Buyers should confirm final financing terms and qualification requirements directly with the listing broker.",
    },
    {
      label: "SBA Financing",
      value: "Not SBA Financeable",
      description:
        "The business is not SBA financeable.",
    },
    {
      label: "Support & Training",
      value: "Available",
      description:
        "Support and training are available as part of the transition.",
    },
    {
      label: "Reason for Selling",
      value: "Other business interests",
      description:
        "The seller is focusing on other business interests.",
    },
  ],
  opportunitiesHeading: "Offering Highlights",
  opportunities: [
    "Acquire a semi-absentee pizzeria operation in Lee County, Florida.",
    "Build on $400,000 in annual Cash Flow (SDE).",
    "Acquire approximately $160,000 in furniture, fixtures and equipment plus approximately $36,000 in inventory.",
    "Operate from leased premises with monthly rent of $7,300 and a restaurant remodeled in 2024.",
    "Acquire the business with an included 4COP SFS / SRX full-liquor license.",
    "Pursue the opportunity as a cash buyer or with seller financing at 50% down; the business is not SBA financeable.",
  ],
  sellerFinancing: {
    offered: true,
    source: "broker-reported",
    termsSummary:
      "Seller financing is available with 50% down. Final financing terms and buyer qualification should be confirmed directly with the listing broker.",
  },
  transitionText:
    "Support and training are available to help transition the business to a qualified buyer.",
  confidentialityText:
    "serious inquiries should confirm financial records, lease documents, licensing records, included assets and transaction terms directly through the listing broker before reliance or closing.",
  sourceDisclosure:
    "Business, financial, lease, license and operating information should be independently verified during due diligence before reliance or closing.",
  countyContext:
    "Lee County includes Fort Myers, Cape Coral, Bonita Springs, Estero and other Southwest Florida restaurant and hospitality markets.",
  singleExternalLinks: true,
  sourceListingLinkLabel: "View Original BizBuySell Listing →",
};

export default function MarjanRumijaFeaturedListingPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
