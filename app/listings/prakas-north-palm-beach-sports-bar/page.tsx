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
const canonicalPath = "/listings/prakas-north-palm-beach-sports-bar";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const sourceListingUrl =
  "https://www.bizbuysell.com/business-opportunity/freestanding-sports-bar-and-grill-w-full-liquor-n-palm-beach-county/2519933/";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "North Palm Beach Sports Bar + 4COP SFS | Broker Preview",
  description:
    "Private FLLM broker-review mockup for a North Palm Beach sports bar and grill offered at $395,000 with an included full-liquor 4COP SFS/SRX restaurant license.",
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
    title: "North Palm Beach Sports Bar + 4COP SFS | Broker Preview",
    description:
      "Private FLLM broker-review mockup for a Prakas & Co. North Palm Beach sports bar and grill opportunity with full liquor.",
    siteName: "Florida Liquor License Market",
  },
};

const config: FeaturedThirdPartyBusinessListingConfig = {
  listingReference: "FLLM-PRAKAS-NPB",
  canonicalPath,
  county: "Palm Beach County",
  countyHref: "/counties/palm-beach",
  countyValueHref: "/counties/palm-beach/liquor-license-value",
  countyCities: "West Palm Beach · Boca Raton · Delray Beach · Jupiter · North Palm Beach",
  askingPrice: "Included with business",
  askingPriceNumber: 0,
  packagePrice: "$395,000",
  packagePriceNumber: 395_000,
  licenseType: "4COP SFS/SRX",
  licenseClass: "sfs",
  licenseAvailableSeparately: false,
  approvalPreview: true,
  businessLabel: "Freestanding Sports Bar & Grill",
  businessLabelLinkUrl: sourceListingUrl,
  businessLabelBodyBold: false,
  packagePriceExternalLink: true,
  heroSummary:
    "North Palm Beach-area freestanding sports bar and grill offered at $395,000 with an included full-liquor 4COP SFS / SRX restaurant license, approximately 4,750 square feet, a recent buildout, all FF&E in place and a long-term lease.",
  broker: {
    name: "Tom Prakas",
    brokerage: "Prakas & Co.",
    phone: "(954) 953-3676",
    email: "tom@prakascompany.com",
    website: "https://prakascompany.com/",
    listingUrl: sourceListingUrl,
    photo: "https://prakascompany.com/wp-content/uploads/2022/08/TomPrakasBio-1.jpg",
    credential: "Owner/Founder — Prakas & Co.",
  },
  additionalSellerIntro:
    "Established neighborhood sports bar and grill opportunity in northern Palm Beach County operating from an approximately 4,750-square-foot freestanding building on a high-traffic corridor.",
  packageIncludes:
    "The $395,000 asset-sale package includes the operating sports bar and grill infrastructure, full commercial kitchen, bar buildout, dining and viewing areas, kitchen equipment, bar equipment, AV/TV systems, furniture, operating systems and the included full-liquor 4COP SFS / SRX restaurant license. The real estate is not included in the business sale.",
  businessMetrics: [
    {
      label: "Gross Revenue",
      value: "Not Disclosed",
      description:
        "Gross revenue has not been publicly disclosed. Qualified buyers should review financial statements and supporting records during due diligence.",
    },
    {
      label: "Cash Flow (SDE)",
      value: "Not Disclosed",
      description:
        "Seller's Discretionary Earnings have not been publicly disclosed.",
    },
    {
      label: "Business Asking Price",
      value: "$395,000",
      description:
        "The current asking price for the business asset-sale package is $395,000.",
    },
    {
      label: "Business Type",
      value: "Sports Bar & Grill",
      description:
        "The current concept is an established neighborhood sports bar and grill.",
    },
    {
      label: "Liquor License",
      value: "Included",
      description:
        "A full-liquor restaurant license conveys with the business sale.",
    },
    {
      label: "Liquor License Classification",
      value: "4COP SFS / SRX",
      description:
        "The included license is identified as a full SFS / Special Restaurant Service license. FLLM categorizes this as a 4COP SFS / SRX restaurant license; qualification and transfer remain subject to the premises, food-service requirements, zoning and DBPR/ABT approval.",
      href: "/license-types/4cop-sfs-restaurant",
    },
    {
      label: "Building Size",
      value: "Approx. 4,750 SF",
      description:
        "The business operates from an approximately 4,750-square-foot freestanding building.",
    },
    {
      label: "Monthly Rent",
      value: "$17,000 Gross",
      description:
        "Current rent is $17,000 per month gross. Buyers should verify the lease, assignment terms, options, landlord requirements and all occupancy costs.",
    },
    {
      label: "Lease",
      value: "Approx. 9 Years Remaining",
      description:
        "The public listing states approximately nine years remain on the lease, with the listed lease expiration shown as December 12, 2035.",
    },
    {
      label: "Furniture, Fixtures & Equipment",
      value: "Included",
      description:
        "All FF&E is included, including kitchen equipment, bar equipment, AV/TVs, furniture and operating systems.",
    },
    {
      label: "Buildout",
      value: "Recent Renovations",
      description:
        "The premises include a recent buildout and renovations throughout.",
    },
    {
      label: "Parking",
      value: "On-Site + Overflow",
      description:
        "The property has on-site parking with additional overflow access via an adjacent lot.",
    },
    {
      label: "Premises",
      value: "Leased",
      description:
        "The business operates from leased premises in a freestanding building.",
    },
    {
      label: "Real Estate",
      value: "Not Included",
      description:
        "The business sale is separate from the real estate. Any potential real-estate transaction would be a distinct matter with the landlord.",
    },
    {
      label: "Support & Training",
      value: "Available",
      description:
        "The seller will provide a reasonable transition and training period, with specific terms to be agreed with the buyer.",
    },
  ],
  opportunitiesHeading: "Offering Highlights",
  opportunities: [
    "Acquire an established freestanding sports bar and grill in northern Palm Beach County.",
    "Operate with an included full-liquor 4COP SFS / SRX restaurant license, subject to buyer qualification, premises, zoning and DBPR/ABT approval.",
    "Take over approximately 4,750 square feet with a recent buildout, full commercial kitchen and complete bar infrastructure.",
    "Acquire all FF&E, including kitchen equipment, bar equipment, AV/TV systems, furniture and operating systems.",
    "Continue the existing concept or reposition the space under a new brand using the existing infrastructure.",
    "Benefit from on-site parking, overflow access and a long-term lease in an affluent, year-round northern Palm Beach County market.",
  ],
  transitionText:
    "The seller will provide a reasonable transition and training period. Specific transition terms should be confirmed directly through the listing broker.",
  confidentialityText:
    "serious inquiries should confirm the business identity, financial records, lease documents, licensing records, included assets and transaction terms directly through the listing broker before reliance or closing.",
  sourceDisclosure:
    "Business, lease, license, operating and financial information should be independently verified during due diligence before reliance or closing.",
  countyContext:
    "Palm Beach County includes West Palm Beach, Boca Raton, Delray Beach, Jupiter, North Palm Beach and other major South Florida restaurant and hospitality markets.",
  singleExternalLinks: true,
  sourceListingLinkLabel: "View Original BizBuySell Listing →",
};

export default function PrakasNorthPalmBeachSportsBarPreviewPage() {
  return <FeaturedThirdPartyBusinessListingPage config={config} />;
}
