import type { Metadata } from "next";

import FeaturedThirdPartyBusinessListingPage, {
  type FeaturedThirdPartyBusinessListingConfig,
} from "@/components/FeaturedThirdPartyBusinessListingPage";
import { marketPriceStats } from "@/lib/florida-market-index";
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
const canonicalPath = "/listings/fllm-paquet";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/prime-italian-restaurant-for-sale-miami-beach/2552485/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prime Italian Restaurant for Sale – Miami Beach + 4COP Quota | FLLM",
  description:
    "Broker-review FLLM mockup for a $590,000 Miami Beach Italian restaurant with $1.35M gross revenue, $255,891 SDE and a separately offered 4COP Quota license with seller financing available.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Prime Italian Restaurant for Sale – Miami Beach + 4COP Quota",
    description:
      "FLLM third-party broker page mockup for Thierry Paquet de Villejust. $590,000 Miami Beach restaurant opportunity with a separately offered 4COP Quota license and seller financing available.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary",
    title: "Prime Italian Restaurant for Sale – Miami Beach + 4COP Quota",
    description:
      "FLLM broker-page mockup for a $590,000 South of Fifth Miami Beach restaurant opportunity.",
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
  const miamiDadeFourCop = visibleListings.filter(
    (listing) =>
      listing.county === "Miami-Dade County" &&
      listing.type === "4COP Quota",
  );
  const fourCopStats = marketPriceStats(
    miamiDadeFourCop.map((listing) => listing.price),
  );
  const medianValue = fourCopStats.median ?? 210_000;
  const medianLabel = money(medianValue);

  return {
    listingReference: "FLLM-PAQUET",
    canonicalPath,
    county: "Miami-Dade County",
    countyHref: "/counties/miami-dade",
    countyValueHref: "/counties/miami-dade/liquor-license-value",
    countyCities: "Miami Beach · South Beach · Brickell · Coral Gables",
    askingPrice: "Offered separately",
    askingPriceNumber: 0,
    marketMedianAskingPrice: medianLabel,
    marketMedianAskingPriceNumber: medianValue,
    licenseType: "4COP Quota",
    licenseAvailableSeparately: true,
    separateLicenseOfferSummary:
      "4COP Quota offered separately · Seller financing available",
    packagePrice: "$590,000",
    packagePriceNumber: 590_000,
    businessLabel: "Prime Italian Restaurant for Sale – Miami Beach",
    businessLabelLinkUrl: sourceListingUrl,
    heroSummary:
      "Prime Italian restaurant opportunity in Miami Beach's South of Fifth neighborhood. The business is presented as a beautifully remodeled, turnkey operation with strong cash flow, a full kitchen, indoor and outdoor seating. A transferable 4COP Quota full-liquor license is also offered separately, with seller financing available.",
    broker: {
      name: "Thierry Paquet de Villejust",
      brokerage: "Listing Broker",
      phone: "407-928-0725",
      email: "",
      website: "https://casaamoremiami.com/",
      listingUrl: sourceListingUrl,
    },
    additionalSellerIntro:
      "Opportunity to acquire a turnkey Italian restaurant in Miami Beach's South of Fifth area, approximately 300 meters from the beach, with a recently remodeled dining operation, full kitchen, indoor and outdoor seating, and strong year-round hospitality demand.",
    packageIncludes:
      `The $590,000 asking price applies to the operating restaurant business, business assets and leasehold position. Inventory and furniture, fixtures and equipment are included in the business asking price. A transferable 4COP Quota full-liquor license is offered separately from the restaurant, with seller financing available. FLLM's current Miami-Dade County median disclosed asking price for active standalone 4COP quota-license inventory is ${medianLabel}. This median is market context and is not the seller's stated license price or an appraisal. Buyers should confirm the separate license price, seller-financing terms, current ABT record, liens, transfer requirements, final included assets, premises lease terms, permits and transaction structure directly with the listing broker.`,
    businessMetrics: [
      {
        label: "Business Asking Price",
        value: "$590,000",
        description:
          "The operating business is offered at $590,000. Buyers should confirm the final transaction structure and included assets directly with the listing broker.",
      },
      {
        label: "Gross Revenue",
        value: "$1,351,144",
        description:
          "Annual gross revenue is listed at $1,351,144. Buyers should reconcile revenue to financial statements, tax returns and supporting records during due diligence.",
      },
      {
        label: "Cash Flow (SDE)",
        value: "$255,891",
        description:
          "Seller's discretionary earnings are listed at $255,891. Buyers should verify the calculation methodology and supporting financial records.",
      },
      {
        label: "EBITDA",
        value: "Not Disclosed",
        description: "EBITDA is not disclosed.",
      },
      {
        label: "Established",
        value: "2025",
        description: "The current restaurant operation was established in 2025.",
      },
      {
        label: "License Classification",
        value: "4COP Quota",
        description:
          "A 4COP Quota license is a county-limited transferable quota license that can support full-liquor privileges subject to the approved series, premises, zoning and DBPR/ABT approval.",
        href: "/license-types/4cop-quota",
      },
      {
        label: "License Offer",
        value: "Offered separately",
        description:
          "The 4COP Quota license is offered separately from the restaurant business. Seller financing is available, with final price, down payment, interest rate, term, amortization, security and documentation subject to seller-approved terms.",
      },
      {
        label: "FLLM Miami-Dade 4COP Median",
        value: medianLabel,
        description:
          `Calculated from current active standalone 4COP Quota inventory in Miami-Dade County. Current disclosed 4COP asks included in the calculation: ${fourCopStats.count}. This is market context, not an appraisal or the seller's stated asking price for this license.`,
        href: "/counties/miami-dade/liquor-license-value",
      },
      {
        label: "Seating",
        value: "90 seats · 60 inside · 30 terrace",
        description:
          "The restaurant offers seating for 90 guests, consisting of 60 interior seats and 30 seats on a spacious outdoor terrace.",
      },
      {
        label: "Employees",
        value: "17 full-time",
        description:
          "The business has 17 full-time employees. Buyers should verify payroll, roles, benefits and continued employment during due diligence.",
      },
      {
        label: "Inventory",
        value: "$5,000 included",
        description:
          "Approximately $5,000 of inventory is included in the asking price.",
      },
      {
        label: "Furniture, Fixtures & Equipment",
        value: "$80,000 included",
        description:
          "Furniture, fixtures and equipment valued at approximately $80,000 are included in the asking price.",
      },
      {
        label: "Lease Term",
        value: "Approximately 8 years remaining",
        description:
          "The restaurant has approximately eight years remaining on its premises lease. Buyers should confirm the exact lease dates, assignment rights, options and landlord approval requirements.",
      },
      {
        label: "Reason for Selling",
        value: "Partnership dissolution",
        description: "The stated reason for sale is partnership dissolution.",
      },
      {
        label: "Support & Training",
        value: "2 weeks",
        description: "Two weeks of training with support are included.",
      },
      {
        label: "Business Website",
        value: "casaamoremiami.com",
        href: "https://casaamoremiami.com/",
        description: "Business website.",
      },
    ],
    sellerFinancing: {
      offered: true,
      source: "seller-reported",
      termsSummary:
        "Seller financing is available on the separately offered 4COP Quota license. Down payment, interest rate, term, amortization, security and final documentation are subject to seller approval.",
    },
    opportunitiesHeading: "Offering Highlights",
    opportunities: [
      "Acquire a turnkey Italian restaurant in Miami Beach's South of Fifth neighborhood, approximately 300 meters from the beach.",
      "Operate from a beautifully remodeled restaurant with a brand-new kitchen, new equipment, updated furniture and indoor/outdoor seating.",
      "Build on $1,351,144 in gross revenue and $255,891 in seller's discretionary earnings.",
      "Acquire the 4COP Quota license separately from the restaurant, with seller financing available subject to seller-approved terms and DBPR/ABT transfer requirements.",
      "Benefit from proximity to luxury condominium demand, year-round tourism and strong South Beach foot traffic.",
    ],
    transitionText:
      "The restaurant is a new but proven concept created by experienced Miami restaurateurs. The reason for sale is partnership dissolution, and two weeks of training with support are included.",
    confidentialityText:
      "serious inquiries only; confidentiality assured. Buyers should independently review financial statements, lease documents, licensing records, seller-financing terms, included-asset schedules and all transaction documents directly through the listing broker.",
    sourceDisclosure:
      "Featured third-party broker-page mockup for the Prime Italian Restaurant for Sale – Miami Beach. Business, financial, license, financing and lease information should be independently verified during due diligence before reliance or closing.",
    countyContext:
      `Miami-Dade County supports one of Florida's deepest restaurant, nightlife, hospitality and tourism markets across Miami Beach, South Beach, Brickell, Coral Gables and surrounding communities. FLLM's current median disclosed asking price for active Miami-Dade County 4COP Quota inventory is ${medianLabel}. Restaurant and liquor-license economics can vary materially based on location, license status, seller terms, traffic profile, operating performance and transaction structure.`,
  };
}

export default async function ThierryPaquetFeaturedListingMockupPage() {
  const config = await buildConfig();
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
