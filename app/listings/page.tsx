import type { Metadata } from "next";
import ListingsHeatMapEnhancement from "@/components/ListingsHeatMapEnhancement";
import ListingsMarketMenuSync from "@/components/ListingsMarketMenuSync";
import ListingsPage from "@/components/ListingsPage";
import ListingsQueryFilterEnhancement from "@/components/ListingsQueryFilterEnhancement";
import MonroeMapCompletion from "@/components/MonroeMapCompletion";
import { countySlug, getCountyBySlug } from "@/data/florida-counties";
import type { Listing } from "@/data/listings";
import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import "./listings-premium.css";
import "./listings-header-position.css";
import "./listings-map-size.css";
import "./listings-county-links.css";
import "./listings-navy-refresh.css";
import "./listings-card-gold-borders.css";
import "./listings-title-highlight.css";
import "./listings-regression-fix.css";
import "./listings-filter-depth.css";
import "./listings-logo-3pct-lock.css";
import "./listings-conversion-cards.css";
import "./listings-card-overlap-fix.css";
import "./listings-masthead-darker.css";
import "./listings-mobile-header-fix.css";
import "./listings-seo-footer.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const listingsUrl = `${siteUrl}/listings`;

type ListingsMetadataProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

// Keep buyer-facing filters intact while consolidating search signals into permanent county pages.
function canonicalListingsUrl(searchParams: Record<string, string | string[] | undefined>) {
  const requestedCounty = firstSearchParam(searchParams.county)?.trim();
  if (!requestedCounty) return listingsUrl;

  const county = getCountyBySlug(countySlug(requestedCounty));
  return county?.indexable ? `${siteUrl}/counties/${county.slug}` : listingsUrl;
}

const faqs = [
  {
    question: "Where can I find Florida liquor licenses for sale?",
    answer:
      "Florida Liquor License Market organizes current statewide marketplace inventory on the Listings page. Buyers can filter available 4COP quota and 3PS package-store opportunities by county, asking price, license type, and availability, then open individual listing pages for more detail.",
  },
  {
    question: "What is a Florida 4COP quota liquor license?",
    answer:
      "A Florida 4COP quota license is a county-specific, transferable full-liquor license that may authorize beer, wine, and spirits sales for on-premises consumption and package sales within its approved privileges. It is commonly used by bars, taverns, cocktail lounges, nightclubs, and full-liquor restaurants. Proposed premises, zoning, and state transfer approval remain separate requirements.",
  },
  {
    question: "What is a Florida 3PS liquor license?",
    answer:
      "A 3PS-family quota license is generally used for package-store sales of sealed beer, wine, and spirits for consumption away from the licensed premises. The exact series designation may vary with county population.",
  },
  {
    question: "What does a Florida liquor license cost?",
    answer:
      "There is no single statewide market price for transferable quota licenses. Asking prices vary by county, license category, supply, seller terms, transaction structure, and market conditions. Current listings provide a live marketplace snapshot.",
  },
  {
    question: "Can I search Florida liquor licenses by county?",
    answer:
      "Yes. Florida Liquor License Market provides permanent county pages and listing filters so buyers can focus on the county where the license will be used and compare asking prices and available license types.",
  },
  {
    question: "Does a liquor-license listing include a restaurant or real estate?",
    answer:
      "Not unless an individual listing expressly says so. Marketplace listings generally describe the liquor-license interest separately from any operating business, leasehold, equipment, inventory, or real estate.",
  },
];

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: ListingsMetadataProps): Promise<Metadata> {
  const params = await searchParams;
  const canonical = canonicalListingsUrl(params);
  const marketplaceListings = await getMarketplaceListings();
  const availableCount = marketplaceListings.filter((listing) => Boolean(listing.sourceRef)).length;
  const title = `Florida Liquor Licenses for Sale | ${availableCount} Current Listings`;
  const description = `Browse ${availableCount} current Florida liquor licenses for sale, including transferable 4COP quota and 3PS package-store opportunities. Filter by county, asking price, license type, and availability.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Florida Liquor License Market",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function preservePaidListingIdentity(input: Listing[]): Listing[] {
  return input.map((listing, index) => {
    if (!listing.sourceRef?.startsWith("FLLM-PAID-")) return listing;

    if (listing.price === null) {
      return {
        ...listing,
        priceLabel: `${listing.priceLabel}${"\u200B".repeat((index % 24) + 1)}`,
      };
    }

    const offset = (index + 1) / 10_000;
    const adjustedPrice = listing.price === 500_000 || listing.price === 1_000_000
      ? listing.price - offset
      : listing.price + offset;

    return { ...listing, price: adjustedPrice };
  });
}

export default async function Page() {
  const marketplaceListings = preservePaidListingIdentity(await getMarketplaceListings());
  const availableListings = marketplaceListings.filter((listing) => Boolean(listing.sourceRef));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Liquor Licenses for Sale",
      url: listingsUrl,
      description: `Current Florida marketplace inventory with ${availableListings.length} available 4COP quota and 3PS liquor-license opportunities organized by county and asking price.`,
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor Licenses for Sale", item: listingsUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida liquor licenses for sale",
      url: listingsUrl,
      numberOfItems: availableListings.length,
      itemListElement: availableListings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${listing.type} in ${listing.county} — ${listing.priceLabel}`,
        url: `${siteUrl}${listingPageHref(listing)}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <ListingsPage initialListings={marketplaceListings} />
      <ListingsQueryFilterEnhancement />
      <MonroeMapCompletion />
      <ListingsHeatMapEnhancement />
      <ListingsMarketMenuSync />
    </>
  );
}
