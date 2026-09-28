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
const canonicalPath = "/listings/fllm-paquet";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/prime-italian-restaurant-for-sale-miami-beach/2552485/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prime Italian Restaurant for Sale – Miami Beach + 4COP Quota | FLLM",
  description:
    "Broker-review FLLM mockup for a $590,000 Miami Beach Italian restaurant with $1.35M gross revenue, $255,891 SDE and a 4COP Quota full-liquor license available via lease.",
  alternates: { canonical: canonicalUrl },
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Prime Italian Restaurant for Sale – Miami Beach + 4COP Quota",
    description:
      "FLLM third-party broker page mockup for Thierry Paquet de Villejust. $590,000 Miami Beach restaurant opportunity with a 4COP Quota full-liquor license available via lease.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary",
    title: "Prime Italian Restaurant for Sale – Miami Beach + 4COP Quota",
    description:
      "FLLM broker-page mockup for a $590,000 South of Fifth Miami Beach restaurant opportunity.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-PAQUET",
  canonicalPath,
  county: "Miami-Dade County",
  countyHref: "/counties/miami-dade",
  countyValueHref: "/counties/miami-dade/liquor-license-value",
  countyCities: "Miami Beach · South Beach · Brickell · Coral Gables",
  askingPrice: "Available via lease",
  askingPriceNumber: 0,
  licenseType: "4COP Quota",
  quotaLeaseOnly: true,
  quotaLeaseSummary: "4COP Quota available via lease · License not offered for sale",
  packagePrice: "$590,000",
  packagePriceNumber: 590_000,
  businessLabel: "Prime Italian Restaurant for Sale – Miami Beach",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Prime Italian restaurant opportunity in Miami Beach's South of Fifth neighborhood. The business is presented as a beautifully remodeled, turnkey operation with strong cash flow, a full kitchen, indoor and outdoor seating, and a transferable 4COP Quota full-liquor license available via lease.",
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
    "The $590,000 offering includes the operating restaurant business, business assets and leasehold position. Inventory and furniture, fixtures and equipment are included in the asking price. A transferable 4COP Quota full-liquor license is available via lease and is not being sold as part of the business purchase. Buyers should confirm the license owner, lease terms, current ABT record, transfer or placement requirements, final included assets, premises lease terms, permits and transaction structure directly with the listing broker.",
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
      description:
        "EBITDA is not disclosed.",
    },
    {
      label: "Established",
      value: "2025",
      description:
        "The current restaurant operation was established in 2025.",
    },
    {
      label: "License Classification",
      value: "4COP Quota",
      description:
        "A 4COP Quota liquor license is available via lease. A 4COP Quota license is a county-limited transferable quota license that can support full-liquor privileges subject to the approved series, premises, zoning and DBPR/ABT approval.",
      href: "/license-types/4cop-quota",
    },
    {
      label: "License Arrangement",
      value: "Available via lease",
      description:
        "The 4COP Quota liquor license is available via lease. Buyers should confirm the license owner, lessor, lease terms, monthly license payment, current ABT record, liens, transfer or placement requirements, premises approval and all DBPR/ABT requirements directly with the listing broker and applicable professionals.",
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
        "The restaurant has approximately eight years remaining on its lease. Buyers should confirm the exact lease dates, assignment rights, options and landlord approval requirements.",
    },
    {
      label: "Reason for Selling",
      value: "Partnership dissolution",
      description:
        "The stated reason for sale is partnership dissolution.",
    },
    {
      label: "Support & Training",
      value: "2 weeks",
      description:
        "Two weeks of training with support are included.",
    },
    {
      label: "Business Website",
      value: "casaamoremiami.com",
      href: "https://casaamoremiami.com/",
      description:
        "Business website.",
    },
  ],
  opportunitiesHeading: "Offering Highlights",
  opportunities: [
    "Acquire a turnkey Italian restaurant in Miami Beach's South of Fifth neighborhood, approximately 300 meters from the beach.",
    "Operate from a beautifully remodeled restaurant with a brand-new kitchen, new equipment, updated furniture and indoor/outdoor seating.",
    "Build on $1,351,144 in gross revenue and $255,891 in seller's discretionary earnings.",
    "Continue full-liquor restaurant operations using a leased 4COP Quota license, subject to the license lease, premises approval and DBPR/ABT requirements.",
    "Benefit from proximity to luxury condominium demand, year-round tourism and strong South Beach foot traffic.",
  ],
  transitionText:
    "The restaurant is a new but proven concept created by experienced Miami restaurateurs. The reason for sale is partnership dissolution, and two weeks of training with support are included.",
  confidentialityText:
    "serious inquiries only; confidentiality assured. Buyers should independently review financial statements, lease documents, licensing records, included-asset schedules and all transaction documents directly through the listing broker.",
  sourceDisclosure:
    "Featured third-party broker-page mockup for the Prime Italian Restaurant for Sale – Miami Beach. Business, financial, lease and license information should be independently verified during due diligence before reliance or closing.",
  countyContext:
    "Miami-Dade County supports one of Florida's deepest restaurant, nightlife, hospitality and tourism markets across Miami Beach, South Beach, Brickell, Coral Gables and surrounding communities. Restaurant and liquor-license economics can vary materially based on location, lease structure, license terms, traffic profile, operating performance and transaction structure.",
};

export default function ThierryPaquetFeaturedListingMockupPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
