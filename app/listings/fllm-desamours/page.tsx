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
  title: "Martin County 4COP Quota Liquor License for Sale | $600,000",
  description:
    "Featured Martin County 4COP quota liquor license listing at approximately $600,000 within a $650,000 Jensen Beach bar asset-sale package represented by JR DesAmours of Business Exit Advisors.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Martin County 4COP Quota Liquor License | $600,000",
    description:
      "Featured third-party broker preview. Business purchase required; Jensen Beach bar and 4COP quota license asset-sale package offered at $650,000 total.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin County 4COP Quota Liquor License | $600,000",
    description:
      "Featured third-party broker preview represented by JR DesAmours of Business Exit Advisors.",
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
  licenseType: "4COP Quota",
  businessLabel: "Iconic Jensen Beach bar",
  heroSummary:
    "Martin County 4COP quota liquor license available exclusively with the acquisition of the associated long-established Jensen Beach bar through an asset-sale transaction. The license is not currently offered separately.",
  broker: {
    name: "JR DesAmours",
    brokerage: "Business Exit Advisors",
    phone: "(772) 758-1817",
    email: "JRDesAmours@myexitplan.com",
    website: "https://myexitplan.com/broker/j-r-desamours/",
    listingUrl:
      "https://www.bizbuysell.com/business-opportunity/iconic-jensen-beach-bar-for-sale-w-4-cop-license/2486902/",
    photo: "data:image/jpeg;base64,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",
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
