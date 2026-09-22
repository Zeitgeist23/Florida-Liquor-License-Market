import type { Metadata } from "next";

import { getMarketplaceListings } from "@/lib/listing-store";

import AdminLeadsClient from "./AdminLeadsClient";
import "./admin-leads.css";
import "./valuation-leads.css";

export const metadata: Metadata = {
  title: "FLLM Private Lead Database",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const marketplaceListings = await getMarketplaceListings();
  const inventory = marketplaceListings
    .filter((listing): listing is typeof listing & { sourceRef: string } => Boolean(listing.sourceRef))
    .map(({ county, type, price, priceLabel, sourceRef, sourceName, sourceUrl }) => ({
      county, type, price, priceLabel, sourceRef, sourceName, sourceUrl,
    }));

  return <AdminLeadsClient inventory={inventory} />;
}
