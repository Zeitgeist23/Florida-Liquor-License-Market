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
const canonicalPath = "/listings/fllm-kopp";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/prime-location-in-miami-established-peruvian-mediterranean-restauran/2479201/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Miami Peruvian Restaurant + 2COP Beer & Wine License | Seller Preview",
  description:
    "Seller approval preview for an established Miami-Dade Peruvian-Mediterranean restaurant offered with a 2COP beer-and-wine license.",
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-US": canonicalUrl,
      "es-US": `${siteUrl}/es/listings/fllm-kopp`,
      "x-default": canonicalUrl,
    },
  },
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Miami Peruvian Restaurant + 2COP Beer & Wine License",
    description:
      "Featured direct-seller preview for an established Peruvian-Mediterranean restaurant in Miami-Dade County.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miami Peruvian Restaurant + 2COP Beer & Wine License",
    description:
      "Private featured-listing mockup for seller review and approval.",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-KOPP",
  canonicalPath,
  locale: "en",
  languageAlternates: {
    en: canonicalPath,
    es: "/es/listings/fllm-kopp",
  },
  county: "Miami-Dade County",
  countyHref: "/counties/miami-dade",
  countyValueHref: "/counties/miami-dade/liquor-license-value",
  countyCities: "Miami · Doral · Hialeah · Miami Beach",
  countyPopulation: "2,838,461",
  askingPrice: "No independent value",
  askingPriceNumber: 0,
  packagePrice: "$599,999",
  packagePriceNumber: 599_999,
  licenseType: "2COP Beer & Wine",
  licenseClass: "2cop",
  sellerDirect: true,
  businessLabel: "Peruvian-Mediterranean restaurant",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary:
    "Established Miami-Dade Peruvian-Mediterranean restaurant offered as an operating-business acquisition with a 2COP beer-and-wine license.",
  broker: {
    name: "Marianella Kopp",
    brokerage: "Seller Direct",
    phone: "(786) 477-3541",
    email: "",
    website: sourceListingUrl,
    listingUrl: sourceListingUrl,
  },
  additionalSellerIntro:
    "Opportunity to acquire an established Peruvian-Mediterranean restaurant in Miami-Dade County as a turnkey operating business.",
  packageIncludes:
    "The offering includes the operating restaurant business, its 2COP beer-and-wine license, and approximately $500,000 of furniture, fixtures and equipment. Approximately $40,000 of inventory and the separately offered real estate are excluded from the advertised business price. License use and ownership changes remain subject to DBPR approval and the approved premises.",
  businessMetrics: [
    {
      label: "Business Asking Price",
      value: "$599,999",
      description:
        "The seller's requested price for the operating restaurant business and included transaction assets. Real estate and inventory are offered separately.",
    },
    {
      label: "Annual Gross Revenue",
      value: "$980,000",
      description:
        "The business's stated annual sales before operating expenses, debt service, taxes, owner compensation and other deductions. Buyers should verify financial records directly with the seller.",
    },
    {
      label: "Established",
      value: "2007",
      description:
        "The restaurant's stated year of establishment and operating history.",
    },
    {
      label: "Furniture, Fixtures & Equipment",
      value: "Approximately $500,000",
      description:
        "The stated value of furniture, fixtures and equipment included with the operating business. Buyers should confirm ownership, condition and included items.",
    },
    {
      label: "Liquor License Type",
      value: "2COP Beer & Wine",
      description:
        "A 2COP license authorizes beer and wine for consumption on the approved licensed premises. It does not authorize distilled spirits and is not an independently transferable county quota license.",
      href: "/license-types/2cop-beer-wine",
    },
    {
      label: "Restaurant Space",
      value: "2,725 SF",
      description:
        "The stated size of the restaurant premises. Buyers should verify usable area, permitted use, occupancy and premises approval.",
    },
    {
      label: "Restaurant Seating",
      value: "80 permitted seats",
      description:
        "The restaurant's stated permitted seating. Potential expansion to 120 seats remains subject to applicable approvals.",
    },
    {
      label: "Seller Financing",
      value: "Up to 40% advertised",
      description:
        "The seller advertises financing for up to 40% of the asking price, subject to buyer qualification and mutually agreed terms.",
    },
    {
      label: "Transition Support",
      value: "Approximately two weeks",
      description:
        "The seller offers approximately two weeks of transition training, subject to the final purchase agreement.",
    },
    {
      label: "Inventory",
      value: "Approximately $40,000",
      description:
        "The stated inventory amount is excluded from the advertised business asking price and should be verified before closing.",
    },
    {
      label: "Real Estate",
      value: "Offered separately",
      description:
        "The restaurant business may be purchased without purchasing the real estate. Any separate real-estate transaction requires independent terms and due diligence.",
    },
    {
      label: "Transaction Type",
      value: "Operating business sale",
      description:
        "The offering is an acquisition of the operating restaurant business and included assets, not a sale of a standalone quota liquor license.",
    },
  ],
  opportunitiesHeading: "Offering Highlights",
  opportunities: [
    "Acquire an established Peruvian-Mediterranean restaurant operating since 2007.",
    "Continue beer-and-wine service under the included 2COP license, subject to DBPR approval and premises requirements.",
    "Acquire approximately $500,000 of stated furniture, fixtures and equipment with the operating business.",
    "Consider advertised seller financing and potential seating expansion, subject to final terms and applicable approvals.",
  ],
  transitionText:
    "The seller offers approximately two weeks of transition training, subject to the final agreement with the buyer.",
  confidentialityText:
    "the business name, exact premises, financial records, real-estate terms and licensing records may require buyer qualification and direct confirmation with the seller.",
  countyContext:
    "Miami-Dade County is Florida's largest international hospitality market, combining global tourism, finance, trade, culture, hotels, restaurants, nightlife, entertainment and dense year-round population.",
};

export default function MarianellaSellerPreview() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
