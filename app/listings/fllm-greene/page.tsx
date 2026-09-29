import type { Metadata } from "next";

import FeaturedThirdPartyBusinessListingPage, {
  type FeaturedThirdPartyBusinessListingConfig,
} from "@/components/FeaturedThirdPartyBusinessListingPage";
import { buildFloridaMarketIndex, marketPriceStats } from "@/lib/florida-market-index";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

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
  title: "Popular Mexican Restaurant & Lounge – Sanford + 4COP | FLLM",
  description:
    "Broker-review FLLM mockup for a $350,000 Sanford Mexican restaurant and lounge with $1.425M gross revenue, $293,050 SDE and an included Seminole County 4COP liquor license.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Popular Mexican Restaurant & Lounge – Sanford + 4COP",
    description:
      "FLLM third-party broker page mockup for Mek Greene. $350,000 Sanford restaurant and nightlife opportunity with an included Seminole County 4COP liquor license.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary",
    title: "Popular Mexican Restaurant & Lounge – Sanford + 4COP",
    description:
      "FLLM broker-page mockup for a $350,000 Sanford restaurant and lounge opportunity represented by Mek Greene.",
  },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

async function buildConfig(): Promise<FeaturedThirdPartyBusinessListingConfig> {
  const visibleListings = getVisibleAvailableMarketplaceListings(
    await getMarketplaceListings(),
  );
  const seminoleFourCop = visibleListings.filter(
    (listing) =>
      listing.county === "Seminole County" &&
      listing.type === "4COP Quota",
  );
  const fourCopStats = marketPriceStats(
    seminoleFourCop.map((listing) => listing.price),
  );
  const marketIndex = buildFloridaMarketIndex(visibleListings);
  const seminoleMarket = marketIndex.countyRows.find(
    (row) => row.county === "Seminole County",
  );
  const medianValue = fourCopStats.median ?? seminoleMarket?.fourCop.median ?? 270_000;
  const medianLabel = money(medianValue);
  const countyPopulation = (seminoleMarket?.population ?? 494_605).toLocaleString("en-US");

  return {
    listingReference: "FLLM-GREENE",
    canonicalPath,
    county: "Seminole County",
    countyHref: "/counties/seminole",
    countyValueHref: "/counties/seminole/liquor-license-value",
    countyCities: "Sanford · Lake Mary · Altamonte Springs · Oviedo · Winter Springs",
    countyPopulation,
    askingPrice: "Included / Not Separately Priced",
    askingPriceNumber: 0,
    marketMedianAskingPrice: medianLabel,
    marketMedianAskingPriceNumber: medianValue,
    licenseType: "4COP Quota",
    packagePrice: "$350,000",
    packagePriceNumber: 350_000,
    businessLabel: "Popular Mexican Restaurant and Lounge in Downtown Sanford Area",
    heroSummary:
      "Turnkey Mexican restaurant and lounge opportunity in the Downtown Sanford area with an established local following, commercial kitchen, bar/lounge buildout and an advertised Seminole County 4COP liquor license included with the business package.",
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
      `The advertised business package includes the operating Mexican restaurant and lounge, approximately $230,000 of furniture, fixtures and equipment, the leasehold position, commercial kitchen and bar/lounge infrastructure, and an advertised Seminole County 4COP liquor license. The source listing does not assign a separate asking price to the license. FLLM's current Seminole County median disclosed standalone 4COP Quota asking price is ${medianLabel}; this is market context only, not an appraisal or an allocated value for the specific license included in this business package. Buyers should confirm the exact DBPR license number, classification and transfer structure directly with the listing broker.`,
    businessMetrics: [
      {
        label: "Business Asking Price",
        value: "$350,000",
        description:
          "The complete operating-business package is advertised at $350,000. Buyers should confirm the final transaction structure and included assets directly with the listing broker.",
      },
      {
        label: "Gross Revenue",
        value: "$1,425,056",
        description:
          "Annual gross revenue is advertised at $1,425,056. Buyers should reconcile revenue to tax returns, financial statements and supporting records during due diligence.",
      },
      {
        label: "Cash Flow (SDE)",
        value: "$293,050",
        description:
          "Seller's Discretionary Earnings are advertised at $293,050. Buyers should verify the calculation methodology, add-backs and supporting financial records.",
      },
      {
        label: "EBITDA",
        value: "Not Disclosed",
        description: "EBITDA is not disclosed in the source listing.",
      },
      {
        label: "Established",
        value: "2021",
        description:
          "The source listing states that the business was established in 2021.",
      },
      {
        label: "Liquor License Classification",
        value: "Advertised 4COP · Seminole County",
        description:
          "The source listing states that the business package includes a Seminole County 4COP liquor license. This FLLM broker-review mockup presents the package in the 4COP Quota format pending broker confirmation of the exact DBPR license number and modifier/classification.",
        href: "/license-types/4cop-quota",
      },
      {
        label: "Liquor License Offer",
        value: "Included With Business",
        description:
          "The source listing identifies the Seminole County 4COP liquor license as an included business asset and does not advertise it as a separate license-only offering.",
      },
      {
        label: "FLLM Seminole 4COP Quota Median",
        value: medianLabel,
        description:
          `Calculated from current active standalone Seminole County 4COP Quota inventory tracked by FLLM. Current disclosed 4COP asks included in the calculation: ${fourCopStats.count}. This is market context only, not an appraisal or a seller-stated value for the included license.`,
        href: "/counties/seminole",
      },
      {
        label: "Furniture, Fixtures & Equipment",
        value: "$230,000 included",
        description:
          "The source listing states that approximately $230,000 of furniture, fixtures and equipment are included in the asking price.",
      },
      {
        label: "Employees",
        value: "27 · 3 full-time · 24 part-time",
        description:
          "The source listing reports 27 employees consisting of three full-time and 24 part-time employees. Buyers should verify payroll, roles, schedules and continued employment.",
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
          "The source listing states monthly rent of $16,000. Buyers should confirm whether CAM, taxes, insurance, percentage rent or other occupancy costs are included.",
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
          "The source listing states that the seller will provide 10 business days of training and support.",
      },
      {
        label: "Reason for Selling",
        value: "Retiring",
        description:
          "The source listing states that the seller is retiring.",
      },
    ],
    opportunitiesHeading: "Offering Highlights",
    opportunities: [
      "Acquire an established Downtown Sanford-area Mexican restaurant and lounge with a strong local following and active nightlife positioning.",
      "Build on $1,425,056 in advertised gross revenue and $293,050 in advertised seller's discretionary earnings.",
      "Operate from a 3,058-square-foot leased location with a fully equipped commercial kitchen and stylish bar/lounge buildout.",
      "Acquire approximately $230,000 in advertised furniture, fixtures and equipment as part of the business package.",
      "Acquire the advertised Seminole County 4COP liquor license with the business, subject to confirmation of the exact DBPR license record and applicable transfer requirements.",
    ],
    transitionText:
      "The source listing states that the seller is retiring and will provide 10 business days of training and support.",
    confidentialityText:
      "NDA and proof of funds are required for additional confidential information. Buyers should independently review financial statements, lease documents, licensing records, included-asset schedules and all transaction documents directly through the listing broker.",
    sourceDisclosure:
      "Featured third-party broker-page mockup for the Popular Mexican Restaurant and Lounge in Downtown Sanford Area listing. Business, financial, lease, asset and liquor-license information is based on the source advertisement and public broker information and should be independently verified during due diligence before reliance or closing.",
    countyContext:
      "Seminole County includes Sanford, Lake Mary, Altamonte Springs, Oviedo, Winter Springs, Longwood and surrounding Central Florida communities.",
    singleExternalLinks: true,
    sourceListingLinkLabel: "View Original BizBuySell Listing →",
  };
}

export default async function MekGreeneFeaturedListingMockupPage() {
  const config = await buildConfig();
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
