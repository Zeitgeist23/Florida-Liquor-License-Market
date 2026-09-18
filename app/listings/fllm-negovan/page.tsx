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
const canonicalPath = "/listings/fllm-negovan";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Miami-Dade County 4COP Quota Liquor License for Sale | $250,000",
  description:
    "Featured Miami-Dade County 4COP quota liquor license listing at $250,000. Business purchase required: the license is included with a premium Miami adult nightclub offered as a $3.5 million total package. Contact listing broker Julie Negovan of Patricia Burnside Realty.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Miami-Dade County 4COP Quota Liquor License | $250,000",
    description:
      "Featured third-party broker listing. Business purchase required; premium Miami adult nightclub and license package offered at $3.5 million total.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miami-Dade County 4COP Quota Liquor License | $250,000",
    description:
      "Featured third-party broker listing represented by Julie Negovan of Patricia Burnside Realty.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-NEGOVAN",
  canonicalPath,
  county: "Miami-Dade County",
  countyHref: "/counties/miami-dade",
  countyValueHref: "/counties/miami-dade/liquor-license-value",
  countyCities: "Miami · Miami Beach · Hialeah · Doral",
  askingPrice: "$250,000",
  askingPriceNumber: 250000,
  packagePrice: "$3,500,000",
  licenseType: "4COP Quota",
  businessLabel: "premium Miami adult nightclub",
  heroSummary:
    "Miami-Dade County 4COP quota liquor license available exclusively with the acquisition of the associated premium Miami adult nightclub. The license is not currently offered separately.",
  broker: {
    name: "Julie Negovan",
    brokerage: "Patricia Burnside Realty",
    phone: "(305) 389-5800",
    email: "julie@patsburnside.com",
    website: "https://www.patburnsiderealty.com/",
    listingUrl:
      "https://www.bizbuysell.com/business-opportunity/premium-miami-adult-nightclub/2506980/",
    photo:
      "https://images.bizbuysell.com/shared/brokerdirectory/images/2638/pf_prs_Julie_headshot.jpg",
    credential: "Florida broker license BK3449363",
  },
  additionalSellerIntro:
    "Opportunity to acquire a premium Miami adult nightclub in Miami-Dade County together with its associated Florida 4COP quota liquor license.",
  packageIncludes:
    "The package includes the operating business, furniture, fixtures and equipment, goodwill, and licenses for operation, including the Miami-Dade County 4COP quota liquor license, subject to definitive transaction documents and broker confirmation.",
  businessMetrics: [
    { label: "Package Price", value: "$3,500,000" },
    { label: "Liquor License Component", value: "$250,000" },
    { label: "Premises", value: "8,500 SF standalone" },
    { label: "Monthly Rent", value: "$15,250" },
    { label: "Lease Term", value: "Through 2030 + two 5-year options" },
    { label: "FF&E Included", value: "Yes" },
    { label: "Goodwill Included", value: "Yes" },
    { label: "Full Kitchen", value: "Included" },
    { label: "Parking", value: "Ample parking" },
    { label: "Hours", value: "Noon to 5am" },
    { label: "Private Rooms / VIP Areas", value: "Included" },
    { label: "Established", value: "Not Disclosed" },
  ],
  opportunitiesHeading:
    "Operational highlights identified by the listing broker",
  opportunities: [
    "Premium beverage sales supported by full-liquor privileges.",
    "Private rooms and VIP bottle-service revenue opportunities.",
    "Quality dining supported by a commercial kitchen.",
    "Established entertainment operation with experienced staff and DJs.",
    "Prime Miami-Dade location with strong visibility and consistent traffic.",
    "Infrastructure in place for regular patrons and private events.",
  ],
  confidentialityText:
    "additional confidential business information may require buyer qualification, a signed nondisclosure agreement, and satisfactory proof of funds through the listing broker.",
  sourceDisclosure:
    "Business, facility, lease, operating and license-value figures are broker-reported listing information and have not been independently audited or verified by FLLM. Buyers should conduct their own financial, legal, lease, licensing, zoning, regulatory, and operational due diligence.",
  countyContext:
    "Miami-Dade County supports a dense hospitality, nightlife, tourism, and entertainment market across Miami, Miami Beach, Hialeah, Doral, and surrounding communities. Quota-license values can vary materially based on supply, seller terms, intended premises, timing, and transaction structure.",
};

export default function JulieNegovanFeaturedListingPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
