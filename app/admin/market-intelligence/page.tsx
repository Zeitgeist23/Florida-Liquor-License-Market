import type { Metadata } from "next";

import MarketIntelligenceClient from "./MarketIntelligenceClient";
import "./market-intelligence.css";

export const metadata: Metadata = {
  title: "FLLM Private Market Intelligence",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <MarketIntelligenceClient />;
}
