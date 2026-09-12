import type { Metadata } from "next";
import ExchangeStaticClient from "./ExchangeStaticClient";

export const metadata: Metadata = {
  title: "FLLM Exchange Board | Florida Liquor License Market",
  description:
    "The official FLLM Exchange Board market overview from Florida Liquor License Market.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/market-data/exchange-board",
  },
  robots: { index: true, follow: true },
};

export default function ExchangeBoardStaticPage() {
  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        background: "#020d18",
        overflowX: "hidden",
      }}
    >
      <ExchangeStaticClient />
    </main>
  );
}
