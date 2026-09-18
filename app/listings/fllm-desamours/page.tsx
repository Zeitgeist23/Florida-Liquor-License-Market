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
