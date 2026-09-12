import type { Metadata } from "next";

import ExchangeStaticClient from "./ExchangeStaticClient";

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

export default function ExchangeBoardPage() {
  return <ExchangeStaticClient />;
}
