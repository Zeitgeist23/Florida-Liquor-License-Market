import type { Metadata } from "next";

import { getMarketplaceListings } from "@/lib/listing-store";
import { listingPageHref } from "@/lib/listing-page-urls";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import ExchangeStaticClient, {
  type ExchangeMarketSnapshot,
  type ExchangeTickerListing,
} from "./ExchangeStaticClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Market",
  description:
    "The Florida Liquor License Market Exchange Board for listings, market data, valuations, financing and confidential bids.",
  alternates: {
    canonical:
      "https://www.floridaliquorlicensemarket.com/market-data/exchange-board",
  },
  robots: { index: true, follow: true },
};

export default async function ExchangeBoardPage() {
  const availableInventory = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());
  const inventory = availableInventory
    .filter((listing) => listing.price !== null)
    .sort((left, right) => (right.price ?? 0) - (left.price ?? 0));

  const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
  const averagePrice = (prices: number[]) => prices.length
    ? prices.reduce((total, price) => total + price, 0) / prices.length
    : 0;
  const pricedInventory = inventory.flatMap((listing) => listing.price === null ? [] : [listing.price]);
  const fourCopPrices = inventory.flatMap((listing) =>
    listing.type.startsWith("4COP") && listing.price !== null ? [listing.price] : [],
  );
  const marketSnapshot: ExchangeMarketSnapshot = {
    activeListings: availableInventory.length,
    counties: new Set(availableInventory.map((listing) => listing.county)).size,
    averageAskingPrice: formatCurrency(averagePrice(pricedInventory)),
    averageFourCopPrice: formatCurrency(averagePrice(fourCopPrices)),
  };

  const tickerListings: ExchangeTickerListing[] = inventory.map((listing) => ({
    county: listing.county.replace(/\s+County$/i, ""),
    href: listingPageHref(listing),
    price: formatCurrency(listing.price ?? 0),
    type: listing.type.startsWith("4COP") ? "4COP" : listing.type.startsWith("3PS") ? "3PS" : listing.type,
  }));

  return <ExchangeStaticClient marketSnapshot={marketSnapshot} tickerListings={tickerListings} />;
}
