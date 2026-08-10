import type { Metadata } from "next";
import InventoryCardExpansion from "@/components/InventoryCardExpansion";
import ListingsHeatMapEnhancement from "@/components/ListingsHeatMapEnhancement";
import ListingsPage from "@/components/ListingsPage";
import ListingsQueryFilterEnhancement from "@/components/ListingsQueryFilterEnhancement";
import MonroeMapCompletion from "@/components/MonroeMapCompletion";
import PaidListingLinkEnhancement from "@/components/PaidListingLinkEnhancement";
import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import type { Listing } from "@/data/listings";
import "./listings-premium.css";
import "./listings-header-position.css";
import "./listings-map-size.css";
import "./listings-card-expand.css";
import "./listings-county-links.css";
import "./listings-navy-refresh.css";
import "./listings-card-gold-borders.css";
import "./listings-title-highlight.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const listingsUrl = `${siteUrl}/listings`;

export const metadata: Metadata = {
  title: "Florida Liquor License Listings | Search 4COP & 3PS",
  description: "Search current Florida liquor-license marketplace inventory, including transferable 4COP quota and 3PS package-store listings. Filter by county, asking price, license type, and availability.",
  alternates: { canonical: listingsUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: listingsUrl,
    title: "Florida Liquor License Listings | Search 4COP & 3PS",
    description: "Search current Florida 4COP and 3PS quota liquor-license marketplace inventory by county, asking price, and availability.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor License Listings | Search 4COP & 3PS",
    description: "Search current Florida 4COP and 3PS liquor-license marketplace inventory.",
  },
};

export const dynamic = "force-dynamic";

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
      "@type": "WebPage",
      name: "Florida Liquor License Listings",
      url: listingsUrl,
      description: "Searchable Florida marketplace inventory for transferable 4COP and 3PS quota liquor-license opportunities.",
      isPartOf: {
        "@type": "WebSite",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Florida liquor license marketplace listings",
      url: listingsUrl,
      numberOfItems: availableListings.length,
      itemListElement: availableListings.slice(0, 50).map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${listing.type} in ${listing.county} — ${listing.priceLabel}`,
        url: `${siteUrl}${listingPageHref(listing)}`,
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
      <InventoryCardExpansion />
      <MonroeMapCompletion />
      <ListingsHeatMapEnhancement />
      <PaidListingLinkEnhancement />
    </>
  );
}
