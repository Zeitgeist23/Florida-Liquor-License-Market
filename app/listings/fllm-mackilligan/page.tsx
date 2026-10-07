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
import "./link-color.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalPath = "/listings/fllm-mackilligan";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/restaurant-bar-opportunity/2440698/";
const brokerProfileUrl =
  "https://galleriarealtors.com/agents/robert-mackilligan";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wilton Manors Restaurant/Bar + 4COP Full-Liquor License | Broker Preview",
  description:
    "Private FLLM broker-review mockup for Robert G. MacKilligan's Wilton Manors restaurant/bar opportunity offered at $875,000 with $1.28M gross revenue and a 4COP full-liquor license.",
  alternates: { canonical: canonicalUrl },
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
    title: "Wilton Manors Restaurant/Bar + 4COP Full-Liquor License | Broker Preview",
    description:
      "Private FLLM broker-review mockup for Robert G. MacKilligan. $875,000 Wilton Manors restaurant/bar opportunity with $1.28M gross revenue and seller financing advertised for the 4COP liquor-license component.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary",
    title: "Wilton Manors Restaurant/Bar + 4COP Full-Liquor License | Broker Preview",
    description:
      "Private FLLM broker-review mockup represented by Robert G. MacKilligan of Galleria International at Compass.",
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
  const browardFourCop = visibleListings.filter(
    (listing) =>
      listing.county === "Broward County" &&
      listing.type === "4COP Quota",
  );
  const fourCopStats = marketPriceStats(
    browardFourCop.map((listing) => listing.price),
  );
  const marketIndex = buildFloridaMarketIndex(visibleListings);
  const browardMarket = marketIndex.countyRows.find(
    (row) => row.county === "Broward County",
  );
  const medianValue =
    fourCopStats.median ?? browardMarket?.fourCop.median ?? 250_000;
  const medianLabel = money(medianValue);
  const countyPopulation = (
    browardMarket?.population ?? 2_037_472
  ).toLocaleString("en-US");

  return {
    listingReference: "FLLM-MACKILLIGAN",
    canonicalPath,
    locale: "en",
    county: "Broward County",
    countyHref: "/counties/broward",
    countyValueHref: "/counties/broward/liquor-license-value",
    countyCities: "Wilton Manors · Fort Lauderdale · Hollywood · Pompano Beach · Oakland Park",
    countyPopulation,
    askingPrice: "Included in package",
    askingPriceNumber: 0,
    marketMedianAskingPrice: medianLabel,
    marketMedianAskingPriceNumber: medianValue,
    packagePrice: "$875,000",
    packagePriceNumber: 875_000,
    licenseType: "4COP Quota",
    licenseAvailableSeparately: false,
    approvalPreview: true,
    businessLabel: "Restaurant/Bar Opportunity — Wilton Manors",
    businessLabelLinkUrl: sourceListingUrl,
    businessLabelBodyBold: false,
    packagePriceExternalLink: true,
    packagePricePhrase: "restaurant/bar opportunity is",
    heroSummary:
      "Established Wilton Manors restaurant and bar opportunity offered at $875,000 with approximately $1.28 million in gross revenue, a 59-seat operating footprint, low advertised base rent, and a 4COP full-liquor license. The source listing states that seller financing is available for the 4COP liquor-license purchase. Exact 4COP series classification and license number should be confirmed by the listing broker before publication.",
    broker: {
      name: "Robert G. MacKilligan",
      brokerage: "Galleria International at Compass",
      phone: "(954) 234-8759",
      email: "robert.mackilligan@compass.com",
      website: brokerProfileUrl,
      listingUrl: sourceListingUrl,
      credential: "Florida real estate license #679090",
    },
    additionalSellerIntro:
      "Established restaurant and bar opportunity in Wilton Manors, Florida, positioned in a prime Broward County hospitality market with six years of continuous operating history, an established customer base, and a turnkey operating framework.",
    packageIncludes:
      `The current source listing presents the operating restaurant/bar business, leased premises, existing operating infrastructure and an included Broward County 4COP Quota full-liquor license. Robert G. MacKilligan confirmed the 4COP Quota classification by phone on October 6, 2026. Seller financing is advertised for the 4COP liquor-license purchase. FLLM's current Broward County median disclosed standalone 4COP Quota asking price is ${medianLabel}; this is market context only, not an allocated license value or appraisal.`,
    businessMetrics: [
      {
        label: "Business Asking Price",
        value: "$875,000",
        description:
          "The current headline asking price shown by the source listing is $875,000. The body text still contains an older $900,000 figure, so buyers should confirm the current asking price directly with the listing broker.",
      },
      {
        label: "Gross Revenue",
        value: "$1,280,000",
        description:
          "Annual gross revenue is listed at $1,280,000. Buyers should reconcile revenue to financial statements, tax returns and supporting records during due diligence.",
      },
      {
        label: "Cash Flow (SDE)",
        value: "Not Disclosed",
        description:
          "Seller's discretionary earnings are not disclosed in the source listing.",
      },
      {
        label: "EBITDA",
        value: "Not Disclosed",
        description:
          "EBITDA is not disclosed in the source listing.",
      },
      {
        label: "Established",
        value: "2019",
        description:
          "The source listing states that the business was established in 2019.",
      },
      {
        label: "Liquor License Classification",
        value: "4COP Quota",
        description:
          "Robert G. MacKilligan confirmed by phone on October 6, 2026 that the included liquor license is a Broward County 4COP Quota license. A 4COP Quota license is a county-limited transferable full-liquor license, subject to buyer qualification, premises, zoning and DBPR/ABT approval.",
      },
      {
        label: "FLLM Broward 4COP Quota Median",
        value: medianLabel,
        description:
          `Calculated from current active standalone 4COP Quota inventory in Broward County. Current disclosed 4COP asks included in the calculation: ${fourCopStats.count}. This is market context only, not an appraisal or an allocated value for the included license.`,
        href: "/counties/broward/liquor-license-value",
      },
      {
        label: "Seller Financing",
        value: "Available on 4COP license",
        description:
          "The source listing states that the seller will finance the 4COP liquor-license purchase. Down payment, interest rate, term, amortization, security and final documentation should be confirmed with the listing broker.",
      },
      {
        label: "Seating",
        value: "59 seats",
        description:
          "The source listing describes a 59-seat restaurant/bar operation.",
      },
      {
        label: "Premises",
        value: "1,100 SF leased",
        description:
          "The source listing states that the business operates from approximately 1,100 square feet of leased premises.",
      },
      {
        label: "Monthly Base Rent",
        value: "$2,800",
        description:
          "Advertised monthly rent is $2,800. Buyers should verify base rent, CAM, taxes, insurance, assignment rights, options and landlord requirements.",
      },
      {
        label: "Real Estate",
        value: "Leased",
        description:
          "The business operates from leased premises. Real estate is not represented as included in the sale.",
      },
      {
        label: "Reason for Selling",
        value: "Retirement",
        description:
          "The stated reason for sale is owner retirement.",
      },
    ],
    sellerFinancing: {
      offered: true,
      source: "seller-reported",
      termsSummary:
        "Seller financing is advertised for the 4COP liquor-license purchase. Down payment, rate, term, amortization, collateral and final documents are subject to seller and broker confirmation.",
    },
    opportunitiesHeading: "Offering Highlights",
    opportunities: [
      "Acquire an established Wilton Manors restaurant/bar operation in a prime Broward County hospitality market.",
      "Build on advertised annual gross revenue of $1,280,000 and an operating history dating to 2019.",
      "Operate from an approximately 1,100-square-foot leased location with 59-seat capacity and advertised base rent of $2,800 per month.",
      "Continue full-liquor service through the included Broward County 4COP Quota license, subject to buyer qualification, premises, zoning and DBPR/ABT approval.",
      "Evaluate seller financing advertised for the 4COP liquor-license component directly with the listing broker.",
    ],
    transitionText:
      "The stated reason for sale is owner retirement. Qualified buyers should discuss seller transition support and operating handoff directly with the listing broker.",
    confidentialityText:
      "financial documentation and detailed operational information are represented as available to qualified buyers subject to appropriate confidentiality agreements. Buyers should independently review financial statements, lease documents, licensing records, the 4COP Quota license number and status, seller-financing terms, included assets and all transaction documents directly through the listing broker.",
    sourceDisclosure:
      "Private FLLM broker-review mockup based on the current public Restaurant/Bar Opportunity listing in Wilton Manors and public broker information. The source listing currently displays an $875,000 headline asking price while its narrative text still references $900,000. Robert G. MacKilligan confirmed by phone on October 6, 2026 that the included liquor license is a 4COP Quota license. License number, transaction structure and final asking price should be confirmed by the listing broker before any public FLLM publication.",
    countyContext:
      "Broward County includes Wilton Manors, Fort Lauderdale, Hollywood, Pompano Beach, Oakland Park, Pembroke Pines, Coral Springs, Miramar and other major South Florida restaurant, nightlife and hospitality markets.",
    singleExternalLinks: true,
    sourceListingLinkLabel: "View Original BizBuySell Listing →",
  };
}

export default async function RobertMacKilliganFeaturedListingPreviewPage() {
  const config = await buildConfig();
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
