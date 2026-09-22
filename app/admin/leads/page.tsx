import type { Metadata } from "next";

import { listings } from "@/data/listings";

import AdminLeadsClient from "./AdminLeadsClient";
import "./admin-leads.css";
import "./valuation-leads.css";

export const metadata: Metadata = {
  title: "FLLM Private Lead Database",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  const inventory = listings
    .filter((listing): listing is typeof listing & { sourceRef: string } => Boolean(listing.sourceRef))
    .map(({ county, type, price, priceLabel, sourceRef, sourceName, sourceUrl }) => ({
      county, type, price, priceLabel, sourceRef, sourceName, sourceUrl,
    }));

  return <AdminLeadsClient inventory={inventory} />;
}
