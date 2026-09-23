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

const sourceListingUrl = "https://www.bizbuysell.com/business-opportunity/prime-location-in-miami-established-peruvian-mediterranean-restauran/2479201/";

export const metadata: Metadata = {
  title: "Miami Peruvian Restaurant + 2COP Beer & Wine | Seller Review Preview",
  description: "Unpublished direct-seller review draft for a Miami Peruvian-Mediterranean restaurant business with seller-reported beer-and-wine privileges.",
  robots: { index: false, follow: false, noarchive: true },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-KOPP",
  canonicalPath: "/listings/fllm-kopp",
  county: "Miami-Dade County",
  countyHref: "/counties/miami-dade",
  countyValueHref: "/counties/miami-dade/liquor-license-value",
  countyCities: "Miami · Doral · Hialeah · Miami Beach",
  askingPrice: "No separate quota value",
  askingPriceNumber: 0,
  packagePrice: "$599,999",
  packagePriceNumber: 599999,
  licenseType: "2COP Beer & Wine",
  licenseClass: "2cop",
  sellerDirect: true,
  approvalPreview: true,
  businessLabel: "Peruvian-Mediterranean Restaurant",
  businessLabelLinkUrl: sourceListingUrl,
  heroSummary: "Established Miami Peruvian-Mediterranean restaurant offered directly by the seller. The seller advertises beer-and-wine privileges with the business. This draft is for seller review; FLLM has not verified the exact 2COP license record or the operating figures.",
  broker: {
    name: "Marianella Kopp",
    brokerage: "Seller Direct",
    phone: "(786) 477-3541",
    email: "",
    website: sourceListingUrl,
    listingUrl: sourceListingUrl,
  },
  additionalSellerIntro: "The seller's BizBuySell advertisement describes an established Peruvian-Mediterranean restaurant in Miami, operating since 2007, with a furnished dining room and commercial kitchen. Details below reflect the seller's advertisement and remain subject to confirmation.",
  packageIncludes: "The seller reports approximately $500,000 of furniture, fixtures, and equipment included. Approximately $40,000 of inventory and the separately offered real estate are excluded from the advertised business price; verify these terms with the seller.",
  businessMetrics: [
    { label: "Business Asking Price", value: "$599,999", description: "Seller-advertised business asking price. Real estate and inventory are advertised separately." },
    { label: "Reported Annual Gross", value: "$980,000", description: "Seller-reported revenue. FLLM has not reviewed financial records." },
    { label: "Established", value: "2007", description: "Operating history stated in the seller's advertisement." },
    { label: "Restaurant Space", value: "2,725 sq. ft.", description: "Premises size stated by the seller. Real estate is offered separately." },
    { label: "Restaurant Seating", value: "80 permitted", description: "Seller reports possible expansion to 120 seats, subject to approvals." },
    { label: "License Series", value: "2COP reported", description: "Beer-and-wine privileges are seller-reported. Verify the exact DBPR record and premises.", href: "/license-types/2cop-beer-wine" },
  ],
  sellerFinancing: {
    offered: true,
    source: "seller-reported",
    termsSummary: "The seller advertises financing up to 40% of the asking price. Availability and final terms require direct seller confirmation.",
  },
  opportunitiesHeading: "Restaurant Acquisition Highlights",
  opportunities: [
    "Established Peruvian-Mediterranean restaurant concept in Miami with seller-reported beer-and-wine privileges.",
    "Seller advertises equipment and fixtures with the operating business; inventory and real estate are separate.",
    "Seller offers approximately two weeks of transition training, subject to agreement.",
  ],
  transitionText: "The seller's advertisement describes a two-week training period. Confirm the exact transition scope and timing directly with Marianella before signing a purchase agreement.",
  confidentialityText: "This is a seller review preview. Buyer inquiries are disabled until the seller approves the page and pays the $24.95 listing fee.",
  sourceDisclosure: "Source: seller's BizBuySell advertisement #2479201. Price, operating metrics, included assets, financing, seating, and license status are seller-reported and have not been independently verified by FLLM. No restaurant photographs are reproduced in this draft.",
  countyContext: "Miami-Dade County is the location stated in the seller's restaurant advertisement. This is a business sale with reported 2COP beer-and-wine privileges, not a separately priced quota-license listing. Verify the restaurant premises and license status before making a transaction decision.",
};

export default function MarianellaSellerPreview() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
