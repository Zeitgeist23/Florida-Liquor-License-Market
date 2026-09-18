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
