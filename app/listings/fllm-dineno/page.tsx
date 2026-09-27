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
const canonicalPath = "/listings/fllm-dineno";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/sports-themed-family-bar-and-grill-with-full-liquor/2552142/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Hillsborough County Sports-Themed Family Bar & Grill + Full Liquor | Broker Preview",
  description:
    "Private broker-review preview for Chris DiNeno's Tampa sports-themed family bar and grill offered at $499,000 with full-liquor service and a turnkey restaurant/bar buildout.",
  alternates: {
    canonical: canonicalUrl,
  },
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
      "Hillsborough County Sports-Themed Family Bar & Grill + Full Liquor | Broker Preview",
    description:
      "Private FLLM preview represented by Chris DiNeno of Restaurant Traders.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Hillsborough County Sports-Themed Family Bar & Grill + Full Liquor | Broker Preview",
    description:
      "Private FLLM preview represented by Chris DiNeno of Restaurant Traders.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-DINENO",
  canonicalPath,
  locale: "en",
  county: "Hillsborough County",
  countyHref: "/counties/hillsborough",
  countyValueHref: "/counties/hillsborough/liquor-license-value",
  countyCities: "Tampa · Temple Terrace · Plant City · Brandon",
  askingPrice: "$499,000",
  askingPriceNumber: 499000,
  packagePrice: "$499,000",
  packagePriceNumber: 499000,
  licenseType: "4COP SFS/SRX",
  licenseClass: "sfs",
  approvalPreview: true,
  businessLabel: "Sports-themed family bar & grill",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Tampa / Hillsborough County sports-themed family bar and grill offered as a turnkey business acquisition in a grocery-anchored shopping center, with a full-liquor bar, covered outdoor patio, nightly live entertainment, high-quality restaurant infrastructure and strong visibility in a family-oriented North Tampa growth corridor.",
  broker: {
    name: "Chris DiNeno",
    brokerage: "Restaurant Traders",
    phone: "(813) 789-2468",
    email: "ChrisD@EnterDine.com",
    website: "https://restauranttraders.com/",
    listingUrl: sourceListingUrl,
    photo:
      "https://images.bizquest.com/shared/brokerdirectory/images/19031/lg_cmp_20260128_131849137_iOS.jpg",
    credential: "Florida licensed broker · BK3137276",
  },
  additionalSellerIntro:
    "Opportunity to acquire a thriving, beautifully built-out sports-themed bar and grill in a desirable North Tampa growth corridor with strong family demographics, high visibility and a grocery-anchored retail setting.",
  packageIncludes:
    "The advertised $499,000 asking price includes the operating restaurant and bar business and approximately $250,000 of furniture, fixtures and equipment. The source listing describes a full-liquor license as part of the operation, a highly popular covered outdoor patio, live entertainment programming and a turnkey restaurant/bar buildout. The business premises are leased. Buyers should confirm the exact Florida liquor-license series, current license record, continuing qualification requirements, lease terms, included assets and transaction structure directly with the listing broker before relying on the advertised package.",
  businessMetrics: [
    {
      label: "Gross Revenue",
      value: "Not Disclosed",
      description:
        "Gross revenue is not publicly disclosed in the source listing. Qualified buyers should obtain and verify financial records through the listing broker after satisfying confidentiality requirements.",
    },
    {
      label: "Cash Flow (SDE)",
      value: "Not Disclosed",
      description:
        "Seller's Discretionary Earnings are not publicly disclosed in the source listing. Buyers should reconcile any later-provided SDE figure to tax returns, financial statements and supporting records.",
    },
    {
      label: "License Classification",
      value: "Full liquor included · exact series to confirm",
      description:
        "The source listing advertises a full-liquor license but does not publicly identify the exact DBPR series. This private FLLM preview uses the restaurant-license presentation pending broker confirmation of the exact license classification.",
      href: "/resources/florida-liquor-license-types",
    },
    {
      label: "FF&E",
      value: "$250,000 included",
      description:
        "The source listing reports approximately $250,000 of furniture, fixtures and equipment included in the asking price.",
    },
    {
      label: "Inventory",
      value: "Not Disclosed",
      description:
        "Inventory is not publicly disclosed in the source listing and should be confirmed directly with the broker.",
    },
    {
      label: "Employees",
      value: "Not Disclosed",
      description:
        "Employee count is not publicly disclosed in the source listing. Buyers should verify staffing, payroll, scheduling and employment continuity during due diligence.",
    },
    {
      label: "Established",
      value: "Not Disclosed",
      description:
        "The source listing does not publicly disclose the year the business was established.",
    },
    {
      label: "Premises",
      value: "Leased · grocery-anchored endcap",
      description:
        "The business operates from leased premises described as an endcap in a well-maintained, grocery-anchored shopping center at a busy intersection.",
    },
    {
      label: "Facilities",
      value: "Covered patio · turnkey buildout · live entertainment",
      description:
        "The source listing highlights a high-quality interior, well-maintained kitchen equipment, a covered outdoor patio and established nightly live entertainment.",
    },
    {
      label: "Competition / Positioning",
      value: "North Tampa family-growth corridor",
      description:
        "The source listing emphasizes surrounding planned developments, affluent family neighborhoods, youth sports activity, equestrian communities and built-in retail traffic.",
    },
    {
      label: "Seller Training",
      value: "Up to 14 days",
      description:
        "The seller offers up to 14 days of transition training at no additional cost to the buyer.",
    },
    {
      label: "Reason for Selling",
      value: "Retirement",
      description:
        "The stated seller motivation in the source listing is retirement.",
    },
  ],
  opportunitiesHeading: "Offering Highlights",
  opportunities: [
    "Acquire a turnkey sports-themed family bar and grill in a high-growth North Tampa hospitality corridor.",
    "Build on a prime endcap position within a grocery-anchored retail center at a busy intersection.",
    "Use the covered outdoor patio and established live-entertainment programming to support year-round traffic and events.",
    "Leverage the existing full-liquor bar, well-maintained kitchen equipment and high-quality buildout rather than starting from a raw shell.",
    "Expand catering, neighborhood marketing, weekday lunch, weekend brunch or late-night service as potential growth initiatives identified in the source listing.",
  ],
  transitionText:
    "The seller will provide up to 14 days of training at no additional cost to the buyer. The stated reason for selling is retirement.",
  confidentialityText:
    "the business name, exact premises, lease documents, financial information, liquor-license records and other sensitive information require buyer qualification and a signed NDA before release by the listing broker.",
  sourceDisclosure:
    "Broker Preview Note: Business information is based on the broker's public BizBuySell / BizQuest listing and has not been independently verified by FLLM. The public listing describes a full-liquor license but does not state the exact DBPR license series; the exact license classification must be confirmed with Chris DiNeno / Restaurant Traders before publication.",
  countyContext:
    "Hillsborough County supports one of Florida's largest restaurant, bar and hospitality markets, anchored by Tampa and surrounding high-growth residential communities. Buyers evaluating a full-liquor restaurant or bar acquisition should separately verify the business financials, lease economics, license classification, continuing license eligibility, premises approvals, transfer requirements and local zoning.",
};

export default function ChrisDiNenoFeaturedListingPreviewPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
