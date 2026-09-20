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
const canonicalPath = "/listings/fllm-desamours";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jensen Beach Bar + 4COP Quota License | $650,000",
  description:
    "Jensen Beach bar and Martin County 4COP quota license business package offered at $650,000. The allocated license value is approximately $600,000 and the license is not offered separately.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Jensen Beach Bar + 4COP Quota License | $650,000",
    description:
      "Featured third-party broker preview. Business purchase required; Jensen Beach bar and 4COP quota license asset-sale package offered at $650,000 total.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jensen Beach Bar + 4COP Quota License | $650,000",
    description:
      "Featured third-party broker preview for a Jensen Beach business and 4COP quota-license package represented by JR DesAmours.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-DESAMOURS",
  canonicalPath,
  county: "Martin County",
  countyHref: "/counties/martin",
  countyValueHref: "/counties/martin/liquor-license-value",
  countyCities: "Stuart · Palm City · Jensen Beach · Hobe Sound",
  askingPrice: "$600,000",
  askingPriceNumber: 600000,
  packagePrice: "$650,000",
  packagePriceNumber: 650000,
  licenseType: "4COP Quota",
  businessLabel: "Iconic Jensen Beach bar",
  businessLabelLinkUrl: "https://myexitplan.com/listing/iconic-jensen-beach-bar-for-sale-w-4-cop-license/",
  heroSummary:
    "Martin County 4COP quota liquor license available exclusively with the acquisition of the associated long-established Jensen Beach bar through an asset-sale transaction. The license is not currently offered separately.",
  broker: {
    name: "JR DesAmours",
    brokerage: "Business Exit Advisors",
    phone: "(772) 356-2926",
    email: "JRDesAmours@myexitplan.com",
    website: "https://myexitplan.com/broker/j-r-desamours/",
    listingUrl:
      "https://www.bizbuysell.com/business-opportunity/iconic-jensen-beach-bar-for-sale-w-4-cop-license/2486902/",
    photo: "https://myexitplan.com/wp-content/uploads/2025/11/j_r_desamours_broker_-wpcf_250x250.jpg",
  },
  additionalSellerIntro:
    "Opportunity to acquire a long-established neighborhood bar in Jensen Beach, Florida, together with its highly sought-after Martin County 4COP quota liquor license through an asset-sale structure.",
  packageIncludes:
    "The broker-reported package includes the 4COP quota liquor license valued at approximately $600,000, approximately $100,000 in furniture, fixtures and equipment, $20,000 in leasehold improvements, $8,000 in inventory, the operating bar assets, and a fully equipped currently unused kitchen, subject to definitive transaction documents and broker confirmation.",
  businessMetrics: [
    { label: "Package Price", value: "$650,000" },
    { label: "Liquor License Component", value: "Approx. $600,000" },
    { label: "Gross Revenue", value: "$504,209" },
    { label: "Cash Flow (SDE)", value: "$44,372" },
    { label: "Established", value: "2004" },
    { label: "FF&E Included", value: "Approx. $100,000" },
    { label: "Leasehold Improvements", value: "$20,000" },
    { label: "Inventory Included", value: "$8,000" },
    { label: "Real Estate", value: "Leased" },
    { label: "Structure", value: "Asset Sale" },
    { label: "Kitchen", value: "Fully equipped / unused" },
    { label: "Training", value: "14 days after sale" },
  ],
  opportunitiesHeading:
    "Growth opportunities identified by the listing broker",
  opportunities: [
    "Activate the fully equipped unused kitchen to add food service and increase revenue.",
    "Build on more than 20 years of operating history and an established neighborhood customer base.",
    "Preserve the simple bar-only operating model or expand the concept subject to applicable approvals.",
    "Leverage scarce Martin County quota-license supply and the substantial asset value concentrated in the 4COP license.",
  ],
  transitionText:
    "The listing broker reports that the seller will provide 14 days of training after the sale. The stated reason for selling is other business opportunities.",
  confidentialityText:
    "additional confidential business information is available through the listing broker and may require buyer qualification and execution of a nondisclosure agreement.",
  sourceDisclosure:
    "Business, financial, facility, asset and license-value figures are broker-reported listing information and have not been independently audited or verified by FLLM. Buyers should conduct their own financial, legal, lease, licensing, zoning, regulatory, asset-value, and operational due diligence.",
  countyContext:
    "Martin County supports an active coastal hospitality market centered around Stuart, Jensen Beach, Palm City, Hobe Sound, and surrounding communities. Quota-license values can vary materially based on supply, seller terms, intended premises, timing, and transaction structure.",
};

export default function JRDesAmoursFeaturedListingPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
