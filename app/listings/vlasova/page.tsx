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
const canonicalPath = "/listings/vlasova";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/turnkey-downtown-hollywood-nightclub-1-1m-gross-revenue-4cop-lice/2494332/";
const socialImageUrl =
  "https://images.bizbuysell.com/shared/brokerdirectory/images/52324/pf_prs_IMG_3680.JPG";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Downtown Hollywood Nightclub + 4COP Quota License | Broker Preview",
  description:
    "Private broker-review FLLM mockup for Mariya Vlasova's Downtown Hollywood nightclub opportunity offered at $790,000 with $1.1M gross revenue and an included Broward County 4COP quota liquor license.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-US": canonicalUrl,
      "es-US": `${siteUrl}/es/listings/vlasova`,
      "ru-RU": `${siteUrl}/ru/listings/vlasova`,
      "x-default": canonicalUrl,
    },
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
    title: "Downtown Hollywood Nightclub + 4COP Quota License | Broker Preview",
    description:
      "Private FLLM broker-review mockup represented by Mariya Vlasova of Mariya Vlasova Real Estate.",
    siteName: "Florida Liquor License Market",
    images: [{ url: socialImageUrl, alt: "Mariya Vlasova — FLLM broker review preview" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImageUrl],
    title: "Downtown Hollywood Nightclub + 4COP Quota License | Broker Preview",
    description:
      "Private FLLM broker-review mockup represented by Mariya Vlasova of Mariya Vlasova Real Estate.",
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
    listingReference: "FLLM-VLASOVA",
    canonicalPath,
    locale: "en",
    county: "Broward County",
    countyHref: "/counties/broward",
    countyValueHref: "/counties/broward/liquor-license-value",
    countyCities: "Hollywood · Fort Lauderdale · Pompano Beach · Pembroke Pines",
    countyPopulation,
    askingPrice: "Included in package",
    askingPriceNumber: 0,
    marketMedianAskingPrice: medianLabel,
    marketMedianAskingPriceNumber: medianValue,
    packagePrice: "$790,000",
    packagePriceNumber: 790_000,
    licenseType: "4COP Quota",
    licenseAvailableSeparately: false,
    approvalPreview: true,
    languageAlternates: { en: "/listings/vlasova", es: "/es/listings/vlasova", ru: "/ru/listings/vlasova" },
    businessLabel: "Turnkey Downtown Hollywood Nightclub",
    businessLabelLinkUrl: sourceListingUrl,
    businessLabelBodyBold: false,
    packagePriceExternalLink: true,
    packagePricePhrase: "nightclub + 4COP quota liquor license package is",
    heroSummary:
      "Turnkey Downtown Hollywood nightlife opportunity offered as an operating restaurant, bar, lounge, and nightclub business with an included Broward County 4COP quota liquor license. Business + 4COP Quota Liquor License package: $790,000.",
    broker: {
      name: "Mariya Vlasova",
      brokerage: "Mariya Vlasova Real Estate",
      phone: "(321) 209-7182",
      email: "vlasovarealestate@gmail.com",
      website: "https://www.vlasovarealestate.com/",
      listingUrl: sourceListingUrl,
      photo: socialImageUrl,
      credential: "Florida real estate license SL3550830",
    },
    additionalSellerIntro:
      "Turnkey Downtown Hollywood restaurant, bar, lounge, and nightclub opportunity in a prime entertainment location with an included full-liquor 4COP quota license.",
    packageIncludes:
      `The $790,000 business package includes the operating nightlife business, the Broward County 4COP quota license, furniture, fixtures and equipment, bar setup, kitchen equipment, dining and lounge seating, décor, lighting, sound and entertainment setup, website, branding, and existing business infrastructure. The business is offered without real estate. FLLM's current Broward County median disclosed 4COP asking price is ${medianLabel}; this is market context only, not an allocated license value or appraisal.`,
    businessMetrics: [
      {
        label: "Gross Revenue",
        value: "$1,100,000",
        description:
          "Annual gross revenue is $1,100,000. Buyers should reconcile revenue to financial statements, tax returns, and supporting records during due diligence.",
      },
      {
        label: "Cash Flow (SDE)",
        value: "Not Disclosed",
        description:
          "The broker has not disclosed seller's discretionary earnings.",
      },
      {
        label: "Business Asking Price",
        value: "$790,000",
        description:
          "The operating business package is offered at $790,000. Buyers should confirm the final transaction structure and included assets directly with the listing broker.",
      },
      {
        label: "EBITDA",
        value: "Not Disclosed",
        description: "The broker has not disclosed EBITDA.",
      },
      {
        label: "Established",
        value: "2021",
        description:
          "The business was established in 2021.",
      },
      {
        label: "Liquor License Classification",
        value: "4COP Quota",
        description:
          "A hard-liquor license is included. A 4COP quota license is a county-limited transferable quota license that may support full-liquor privileges subject to the approved series, premises, zoning, and DBPR/ABT approval.",
        href: "/license-types/4cop-quota",
      },
      {
        label: "FLLM Broward 4COP Quota Median",
        value: medianLabel,
        description:
          `Calculated from current active standalone 4COP Quota inventory in Broward County. Current disclosed 4COP asks included in the calculation: ${fourCopStats.count}. This is market context, not an appraisal or an allocated value for this included license.`,
        href: "/counties/broward/liquor-license-value",
      },
      {
        label: "Furniture, Fixtures & Equipment",
        value: "$200,000 included",
        description:
          "Approximately $200,000 of furniture, fixtures, and equipment is included in the asking price.",
      },
      {
        label: "Employees",
        value: "8 full-time",
        description:
          "The business has eight full-time employees. Buyers should verify payroll, roles, benefits, and continued employment during due diligence.",
      },
      {
        label: "Premises",
        value: "7,828 SF leased",
        description:
          "The operating premises contain approximately 7,828 square feet and are leased.",
      },
      {
        label: "Monthly Rent",
        value: "$17,490",
        description:
          "Monthly rent is $17,490. Buyers should verify the lease, assignment rights, options, CAM, and landlord requirements.",
      },
      {
        label: "Real Estate",
        value: "Not Included",
        description:
          "This is a business-only sale; real estate is not included.",
      },
      {
        label: "Reason for Selling",
        value: "Other business interests",
        description:
          "The seller is pursuing other business interests.",
      },
    ],
    opportunitiesHeading: "Offering Highlights",
    opportunities: [
      "Acquire a turnkey Downtown Hollywood restaurant, bar, lounge, and nightclub operation in an established nightlife district.",
      "Operate with an included Broward County 4COP quota full-liquor license, subject to buyer qualification, premises, zoning, and DBPR/ABT approval.",
      "Acquire approximately $200,000 of furniture, fixtures, and equipment included in the asking price.",
      "Build on annual gross revenue of $1,100,000 and the venue's existing dining, nightlife, entertainment, and event infrastructure.",
      "Pursue additional private events, VIP reservations, digital marketing, entertainment programming, themed nights, strategic partnerships, and extended brand promotion.",
    ],
    transitionText:
      "The seller is willing to provide a reasonable transition period to familiarize the buyer with daily operations, staff workflow, vendor relationships, menu concept, event format, and general business procedures.",
    confidentialityText:
      "serious inquiries should confirm business identity, financial records, lease documents, licensing records, included assets, and transaction terms directly through the listing broker before reliance.",
    sourceDisclosure:
      "Business, financial, lease, license, and operating information should be independently verified during due diligence before reliance or closing.",
    countyContext:
      "Broward County includes Hollywood, Fort Lauderdale, Pompano Beach, Pembroke Pines, Coral Springs, Miramar, and other major South Florida hospitality and nightlife markets.",
    singleExternalLinks: true,
    sourceListingLinkLabel: "View Original BizBuySell Listing →",
  };
}

export default async function MariyaVlasovaFeaturedListingPreviewPage() {
  const config = await buildConfig();
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
