import type { Metadata } from "next";
import CountyPage from "../[slug]/page";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export const metadata: Metadata = {
  title: "Palm Beach County Liquor License for Sale | 4COP & 3PS",
  description:
    "Find Palm Beach County liquor licenses for sale in West Palm Beach, Boca Raton, and Delray Beach. Compare current 4COP and 3PS listings, asking prices, county market data, and license values on FLLM.",
  alternates: { canonical: `${siteUrl}/counties/palm-beach` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${siteUrl}/counties/palm-beach`,
    title: "Palm Beach County Liquor License for Sale | 4COP & 3PS",
    description:
      "Compare current Palm Beach County liquor licenses for sale, including 4COP and 3PS opportunities, asking prices, market data, and valuation resources.",
    siteName: "Florida Liquor License Market",
  },
};

export default function PalmBeachCountyPage() {
  return CountyPage({ params: Promise.resolve({ slug: "palm-beach" }) });
}
