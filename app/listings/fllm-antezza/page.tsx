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
const canonicalPath = "/listings/fllm-antezza";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pinellas County 4COP Quota Liquor License for Sale | $495,000",
  description:
    "Featured Pinellas County 4COP quota liquor license listing at $495,000. Business purchase required: the license is included with an associated upscale cocktail lounge offered as a $1.1 million total package. Contact listing broker Alessandro Antezza of SUNSHINEAGLE LLC.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Pinellas County 4COP Quota Liquor License | $495,000",
    description:
      "Featured third-party broker listing. Business purchase required; associated cocktail lounge and license package offered at $1.1 million total.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinellas County 4COP Quota Liquor License | $495,000",
    description:
      "Featured third-party broker listing represented by Alessandro Antezza of SUNSHINEAGLE LLC.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-ANTEZZA",
  canonicalPath,
  county: "Pinellas County",
  countyHref: "/counties/pinellas",
  countyValueHref: "/counties/pinellas/liquor-license-value",
  countyCities: "St. Petersburg · Clearwater · Largo · Gulf Beaches",
  askingPrice: "$495,000",
  askingPriceNumber: 495000,
  packagePrice: "$1,100,000",
  licenseType: "4COP Quota",
  businessLabel: "cocktail lounge",
  heroSummary:
    "Pinellas County 4COP quota liquor license available exclusively with the acquisition of the associated upscale cocktail lounge. The license is not currently offered separately.",
  broker: {
    name: "Alessandro Antezza",
    brokerage: "SUNSHINEAGLE LLC",
    phone: "(941) 416-4580",
    email: "info@sunshineagle.com",
    website: "https://sunshineagle.com/",
    listingUrl:
      "https://sunshineagle.com/deal-listing/upscale-cocktail-lounge-with-4cop-quota-license/?back=https%3A%2F%2Fsunshineagle.com%2Fpremium-listings%2F&source&listing_button_text=Inquire%20About%20This%20Listing&listing_button_color&css_source=7799&json_url=https://sunshineagle.dealrelations.com/listings/upscale-cocktail-lounge-with-4cop-quota-license.json?item_id=5534",
    photo:
      "https://sunshineagle.com/wp-content/uploads/2024/02/DSC02740-cut-scaled.jpg",
    credential: "Florida registration CQ1069175",
  },
  additionalSellerIntro:
    "Rare opportunity to acquire an established upscale cocktail lounge in Pinellas County together with its associated Florida 4COP quota liquor license.",
  packageIncludes:
    "The package includes the operating cocktail-lounge business, the 4COP quota liquor license, leasehold improvements, furniture, fixtures and equipment, selected inventory, branding and business goodwill, subject to definitive transaction documents and broker confirmation.",
  businessMetrics: [
    { label: "Gross Revenue", value: "$897,270" },
    { label: "Seller Discretionary Earnings", value: "$224,862" },
    { label: "EBITDA", value: "$172,862" },
    { label: "Established", value: "2019" },
    { label: "FF&E Included", value: "$50,000" },
    { label: "Inventory Included", value: "$10,000" },
    { label: "Premises", value: "2,600 SF leased" },
    { label: "Monthly Rent", value: "$10,000" },
    { label: "Lease Expiration", value: "April 15, 2028" },
    { label: "Employees", value: "2 full-time · 6 part-time" },
  ],
  opportunitiesHeading: "Growth opportunities identified by the listing broker",
  opportunities: [
    "Private events and corporate functions.",
    "Expanded marketing and premium tasting experiences.",
    "Strategic local partnerships and event programming.",
    "Additional operating and revenue-management improvements.",
  ],
  transitionText:
    "Seller transition support is represented as two weeks of training. The stated reason for sale is a change of business interest.",
  confidentialityText:
    "additional confidential business information may require buyer qualification, a signed nondisclosure agreement, and satisfactory proof of funds through the listing broker.",
  sourceDisclosure:
    "Business and financial figures are broker-reported listing information and have not been independently audited or verified by FLLM. Buyers should conduct their own financial, legal, lease, licensing, zoning, regulatory, and operational due diligence.",
  countyContext:
    "Pinellas County supports a dense restaurant, nightlife, hospitality, tourism, and entertainment market across St. Petersburg, Clearwater, Largo, the Gulf Beaches, and surrounding communities. Quota-license values can vary materially based on supply, seller terms, intended premises, timing, and transaction structure.",
};

export default function AlessandroAntezzaFeaturedListingPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
