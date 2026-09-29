import type { Metadata } from "next";

import FeaturedThirdPartyBusinessListingPage from "@/components/FeaturedThirdPartyBusinessListingPage";
import {
  defineOfficial4CopSfsBusinessListing,
} from "@/lib/listings/official4CopSfsBusinessListing";

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
const canonicalPath = "/listings/fllm-greene";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/popular-mexican-restaurant-and-lounge-in-downtown-sanford-area/2535289/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sanford Mexican Restaurant & Lounge + 4COP SFS / SRX License | FLLM",
  description:
    "Broker-review FLLM mockup for a $350,000 Sanford Mexican restaurant and lounge with $1.425M gross revenue, $293,050 SDE and a location-specific 4COP SFS / SRX full-liquor license.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Sanford Mexican Restaurant & Lounge + 4COP SFS / SRX License",
    description:
      "FLLM third-party broker page mockup for Mek Greene. $350,000 Sanford restaurant and nightlife opportunity with a location-specific 4COP SFS / SRX full-liquor license.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary",
    title: "Sanford Mexican Restaurant & Lounge + 4COP SFS / SRX License",
    description:
      "FLLM broker-page mockup for a $350,000 Sanford restaurant and lounge opportunity represented by Mek Greene.",
  },
};

const config = defineOfficial4CopSfsBusinessListing({
  listingReference: "FLLM-GREENE",
  canonicalPath,
  locale: "en",
  county: "Seminole County",
  countyHref: "/counties/seminole",
  countyValueHref: "/counties/seminole/liquor-license-value",
  countyCities: "Sanford · Lake Mary · Altamonte Springs · Oviedo · Winter Springs",
  countyPopulation: "494,605",
  askingPrice: "No independent transferable value",
  askingPriceNumber: 0,
  packagePrice: "$350,000",
  packagePriceNumber: 350_000,
  businessLabel: "Popular Mexican Restaurant and Lounge in Downtown Sanford Area",
  businessLabelLinkUrl: sourceListingUrl,
  businessLabelBodyBold: true,
  heroSummary:
    "Turnkey Mexican restaurant and lounge opportunity in the Downtown Sanford area with an established local following, commercial kitchen, bar/lounge buildout and a location-specific 4COP SFS / SRX full-liquor license tied to the qualifying restaurant operation and approved premises.",
  broker: {
    name: "Mek Greene",
    brokerage: "Results Real Estate Partners, LLC",
    phone: "(386) 216-9466",
    email: "mek@resultsrepartners.com",
    website: "https://resultsrepartners.com/",
    listingUrl: sourceListingUrl,
  },
  additionalSellerIntro:
    "Turnkey restaurant and local nightlife opportunity in Sanford, Florida, positioned in a high-visibility, high-foot-traffic corridor with a strong local following and a layout designed for high-volume dining and nightlife service.",
  packageIncludes:
    "The business package includes the operating Mexican restaurant and lounge, approximately $230,000 of furniture, fixtures and equipment, the leasehold position, commercial kitchen and bar/lounge infrastructure, and the associated location-specific 4COP SFS / SRX full-liquor license. The SFS / SRX license is qualification-based and tied to the qualifying restaurant operation and approved premises rather than being an independently transferable quota asset.",
  businessMetrics: [
    {
      label: "Business Asking Price",
      value: "$350,000",
      description:
        "The complete operating-business package is offered at $350,000.",
    },
    {
      label: "Gross Revenue",
      value: "$1,425,056",
      description:
        "Annual gross revenue is $1,425,056.",
    },
    {
      label: "Cash Flow (SDE)",
      value: "$293,050",
      description:
        "Seller's Discretionary Earnings are $293,050.",
    },
    {
      label: "EBITDA",
      value: "Not Disclosed",
      description:
        "EBITDA is not disclosed in the source listing.",
    },
    {
      label: "Established",
      value: "2021",
      description:
        "The source listing states that the business was established in 2021.",
    },
    {
      label: "License Classification",
      value: "4COP SFS / SRX",
      description:
        "This is a qualification-based full-liquor restaurant license tied to the qualifying restaurant operation and approved premises. It is not an independently transferable 4COP quota license, and FLLM assigns no separate transferable quota value to it.",
      href: "/license-types/4cop-sfs-restaurant",
    },
    {
      label: "Liquor License Value",
      value: "Location-specific",
      description:
        "A 4COP SFS / SRX license derives from the qualifying restaurant operation and approved premises rather than from a separately transferable quota-license asset. No standalone quota-license value is assigned.",
      href: "/license-types/4cop-sfs-restaurant",
    },
    {
      label: "Furniture, Fixtures & Equipment",
      value: "$230,000 included",
      description:
        "Approximately $230,000 of furniture, fixtures and equipment are included in the asking price.",
    },
    {
      label: "Employees",
      value: "27 · 3 full-time · 24 part-time",
      description:
        "The business has 27 employees consisting of three full-time and 24 part-time employees.",
    },
    {
      label: "Premises",
      value: "3,058 SF leased",
      description:
        "The business operates from approximately 3,058 square feet of leased premises in Sanford, Florida.",
    },
    {
      label: "Monthly Rent",
      value: "$16,000",
      description:
        "Monthly rent is $16,000.",
    },
    {
      label: "Real Estate",
      value: "Leased",
      description:
        "The real estate is not advertised as included in the sale. Buyers should independently verify lease assignment rights and landlord approval requirements.",
    },
    {
      label: "Support & Training",
      value: "10 business days",
      description:
        "The seller will provide 10 business days of training and support.",
    },
    {
      label: "Reason for Selling",
      value: "Retiring",
      description:
        "The seller is retiring.",
    },
  ],
  opportunitiesHeading: "Offering Highlights",
  opportunities: [
    "Acquire an established Downtown Sanford-area Mexican restaurant and lounge with a strong local following and active nightlife positioning.",
    "Build on $1,425,056 in advertised gross revenue and $293,050 in advertised seller's discretionary earnings.",
    "Operate from a 3,058-square-foot leased location with a fully equipped commercial kitchen and bar/lounge buildout.",
    "Acquire approximately $230,000 in advertised furniture, fixtures and equipment as part of the business package.",
    "Continue full-liquor restaurant operations subject to DBPR approval and continuing 4COP SFS / SRX qualification.",
  ],
  transitionText:
    "The seller is retiring and will provide 10 business days of training and support.",
  confidentialityText:
    "NDA and proof of funds are required for additional confidential information. Buyers should independently review financial statements, lease documents, licensing records, food-service qualification, included-asset schedules and all transaction documents directly through the listing broker.",
  sourceDisclosure:
    "Featured third-party broker-page mockup for the Popular Mexican Restaurant and Lounge in Downtown Sanford Area listing. Business, financial, lease, asset and liquor-license information is based on the source advertisement and public broker information and should be independently verified during due diligence before reliance or closing.",
  countyContext:
    "Seminole County includes Sanford, Lake Mary, Altamonte Springs, Oviedo, Winter Springs, Longwood and surrounding Central Florida communities.",
  singleExternalLinks: false,
  sourceListingLinkLabel: "View Original BizBuySell Listing →",
});

export default function MekGreeneFeaturedListingMockupPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
