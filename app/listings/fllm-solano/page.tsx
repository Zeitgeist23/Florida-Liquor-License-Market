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
const canonicalPath = "/listings/fllm-solano";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/restaurant-bar-with-outside-seating-on-main-boulevard-in-hollywood-fl/2543711/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hollywood Restaurant/Bar + 4COP SFS / SRX Full-Liquor License | Broker Preview",
  description:
    "Broker-review mockup for a Hollywood, Florida restaurant/bar business offered at $499,000 with a location-specific 4COP SFS / SRX full-liquor license.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-US": canonicalUrl,
      "es-US": `${siteUrl}/es/listings/fllm-solano`,
      "x-default": canonicalUrl,
    },
  },
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Hollywood Restaurant/Bar + 4COP SFS / SRX License | Broker Preview",
    description:
      "Private broker-review mockup represented by Aquiles Solano Jr., P.A. of Southeast Florida Realty & Management Corp.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hollywood Restaurant/Bar + 4COP SFS / SRX License | Broker Preview",
    description:
      "Broward County restaurant/bar business package with a qualification-based 4COP SFS / SRX full-liquor license.",
  },
};

const config = defineOfficial4CopSfsBusinessListing({
  listingReference: "FLLM-SOLANO",
  canonicalPath,
  locale: "en",
  languageAlternates: {
    en: canonicalPath,
    es: "/es/listings/fllm-solano",
  },
  county: "Broward County",
  countyHref: "/counties/broward",
  countyValueHref: "/counties/broward/liquor-license-value",
  countyCities: "Fort Lauderdale · Hollywood · Pompano Beach · Coral Springs",
  countyPopulation: "2,037,472",
  askingPrice: "No independent transferable value",
  askingPriceNumber: 0,
  packagePrice: "$499,000",
  packagePriceNumber: 499_000,
  businessLabel: "Hollywood restaurant/bar with outdoor seating",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Established Hollywood restaurant and bar offered as a turnkey operating-business acquisition with indoor and outdoor dining, a high-traffic Broward County location, and a qualification-based 4COP SFS / SRX full-liquor license.",
  broker: {
    name: "Aquiles Solano Jr., P.A.",
    brokerage: "Southeast Florida Realty & Management Corp",
    phone: "(305) 525-9962",
    email: "solanojr@sfrmc.com",
    website: "https://www.sfrmc.com/",
    listingUrl: sourceListingUrl,
    photo:
      "https://images.bizbuysell.com/shared/brokerdirectory/images/29626/pf_prs_AquilesJr6.jpg",
    credential: "Florida real estate license 3269585",
  },
  additionalSellerIntro:
    "Opportunity to acquire a full-service restaurant and bar on Hollywood's main boulevard with 120-seat capacity, indoor and outdoor dining configurations, established operating systems, and strong visibility to local and tourist traffic.",
  packageIncludes:
    "The offering is presented as a turnkey acquisition of the operating restaurant/bar, its existing operational infrastructure and leasehold position. The source listing identifies a hood, kitchen equipment, freezers, coolers, dishwashing and prep areas, storage, two restrooms, office, indoor and outdoor tables and chairs, music system and full bar. Buyers should confirm the final included assets, inventory, permits, lease assignment terms and other transaction items directly with the listing broker.",
  businessMetrics: [
    {
      label: "Business Asking Price",
      value: "$499,000",
      description:
        "The seller's requested price for the operating restaurant/bar business. Buyers should confirm the final transaction structure, included assets, inventory, working capital and closing terms directly with the listing broker.",
    },
    {
      label: "Gross Revenue",
      value: "$1,000,000",
      description:
        "The source listing states annual gross revenue of $1,000,000. Buyers should reconcile revenue to tax returns, financial statements and source records during due diligence.",
    },
    {
      label: "Cash Flow (SDE)",
      value: "Not Disclosed",
      description:
        "Seller's Discretionary Earnings were not disclosed in the source listing. Detailed financial documentation is stated to be available to qualified buyers after execution of a non-disclosure agreement.",
    },
    {
      label: "EBITDA",
      value: "Not Disclosed",
      description:
        "EBITDA was not disclosed in the source listing. Buyers should request financial statements and supporting documentation through the listing broker.",
    },
    {
      label: "Established",
      value: "2025",
      description:
        "The source listing states that the current business was established in 2025.",
    },
    {
      label: "License Classification",
      value: "4COP SFS / SRX",
      description:
        "This is a qualification-based 4COP SFS / SRX full-liquor license tied to the qualifying restaurant operation and approved premises. It is not an independently transferable quota license, and FLLM assigns no separate transferable value to the license.",
      href: "/license-types/4cop-sfs-restaurant",
    },
    {
      label: "Food / Liquor Designation",
      value: "51% food · 49% liquor",
      description:
        "The source listing states a 51% food / 49% liquor designation. Buyers should independently confirm current DBPR qualification, reporting, premises and operational requirements.",
    },
    {
      label: "Premises",
      value: "1,740 SF leased",
      description:
        "The source listing states 1,740 square feet of leased premises in Hollywood, Florida. Buyers should verify usable area, permitted use, occupancy and lease terms.",
    },
    {
      label: "Monthly Rent",
      value: "$7,600",
      description:
        "The source listing states monthly rent of $7,600. Confirm whether additional occupancy charges, taxes, insurance, CAM or percentage-rent obligations apply.",
    },
    {
      label: "Lease Expiration",
      value: "12/19/2030",
      description:
        "The source listing states a lease expiration date of December 19, 2030. Assignment rights, options and landlord approval should be independently verified.",
    },
    {
      label: "Seating Capacity",
      value: "120 guests",
      description:
        "The source listing states total seating capacity of 120 guests with indoor and outdoor dining configurations.",
    },
    {
      label: "Employees",
      value: "7 · 4 full-time · 3 part-time",
      description:
        "The source listing reports seven employees consisting of four full-time and three part-time workers. Buyers should verify payroll, roles, benefits and continued employment.",
    },
    {
      label: "Facilities",
      value: "Full kitchen · full bar · outdoor seating",
      description:
        "The source listing identifies a hood, kitchen equipment, freezers, coolers, dishwashing, prep and storage areas, two restrooms, office, inside and outside tables and chairs, music system and full bar.",
    },
    {
      label: "Competition",
      value: "Many nearby restaurants and bars",
      description:
        "The source listing describes the location as excellent and notes many restaurants and bars in the surrounding market.",
    },
    {
      label: "Reason for Selling",
      value: "Partners going separate ways",
      description:
        "The source listing states that the owner partners disagree and are going separate ways.",
    },
  ],
  opportunitiesHeading: "Offering Highlights",
  opportunities: [
    "Acquire a turnkey full-service Hollywood restaurant and bar with an established customer base and existing operational infrastructure.",
    "Operate from a high-visibility main-boulevard location serving local clientele and tourist traffic with indoor and outdoor dining.",
    "Continue full-liquor restaurant operations subject to DBPR approval and continuing 4COP SFS / SRX qualification.",
    "Build on the stated $1,000,000 gross-revenue history, 120-seat capacity and scalable outdoor dining component.",
  ],
  confidentialityText:
    "detailed financial documentation and operational metrics are stated to be available to qualified buyers upon execution of a non-disclosure agreement. The exact business identity, premises, financial records, lease documents, included assets and licensing records should be confirmed directly through the listing broker.",
  sourceDisclosure:
    "Broker-review mockup based on the source listing identified as BizBuySell Ad #2543711 and public broker-profile information. FLLM has not independently verified the seller-provided business information.",
  countyContext:
    "Broward County anchors South Florida around Fort Lauderdale and Hollywood, with dense population, beaches, boating, tourism, restaurants, nightlife, entertainment and year-round hospitality demand.",
});

export default function AquilesSolanoBrokerPreviewPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
