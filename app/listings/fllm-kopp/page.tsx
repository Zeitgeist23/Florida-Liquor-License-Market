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
  countyPopulation: "2,838,461",
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
  heroSummary: "Established Miami-Dade Peruvian-Mediterranean restaurant offered as an operating-business acquisition. The seller reports beer-and-wine service under a 2COP license associated with the restaurant—not a separately priced quota license.",
  broker: {
    name: "Marianella Kopp",
    brokerage: "Seller Direct",
    phone: "(786) 477-3541",
    email: "",
    website: sourceListingUrl,
    listingUrl: sourceListingUrl,
  },
  additionalSellerIntro: "Opportunity to acquire an established Peruvian-Mediterranean restaurant in Miami-Dade County as an operating business. The seller advertises financing for up to 40% of the asking price, subject to final terms agreed with the buyer.",
  packageIncludes: "The seller reports approximately $500,000 of furniture, fixtures, and equipment included. Approximately $40,000 of inventory and the separately offered real estate are excluded from the advertised business price; verify these terms with the seller.",
  businessMetrics: [
    { label: "Business Asking Price", value: "$599,999", description: "Seller-advertised business asking price. Real estate and inventory are advertised separately." },
    { label: "Reported Annual Gross", value: "$980,000", description: "Seller-reported revenue. FLLM has not reviewed financial records." },
    { label: "Established", value: "2007", description: "Operating history stated in the seller's advertisement." },
    { label: "Restaurant Space", value: "2,725 sq. ft.", description: "Premises size stated by the seller. Real estate is offered separately." },
    { label: "Restaurant Seating", value: "80 permitted", description: "Seller reports possible expansion to 120 seats, subject to approvals." },
    { label: "License Series", value: "2COP reported", description: "Beer-and-wine privileges are seller-reported. Verify the exact DBPR record and premises.", href: "/license-types/2cop-beer-wine" },
  ],
  opportunitiesHeading: "Offering highlights identified in the seller listing",
  opportunities: [
    "Established Peruvian-Mediterranean restaurant concept in Miami with seller-reported beer-and-wine privileges.",
    "Seller advertises equipment and fixtures with the operating business; inventory and real estate are separate.",
    "Seller offers approximately two weeks of transition training, subject to agreement.",
  ],
  transitionText: "The seller is reported to provide approximately two weeks of transition training, subject to final agreement with the buyer.",
  confidentialityText: "the business name, exact premises, financial records, lease documents and licensing records may require buyer qualification and direct confirmation with the seller.",
  countyContext: "Miami-Dade County is Florida's largest international hospitality market, combining global tourism, finance, trade, culture, hotels, restaurants, nightlife, entertainment, and dense year-round population.",
};

export default function MarianellaSellerPreview() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
