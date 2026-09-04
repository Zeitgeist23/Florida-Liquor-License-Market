import type { Metadata } from "next";
import CountyPage from "../[slug]/page";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export const metadata: Metadata = {
  title: "Hillsborough County Liquor License for Sale | Tampa 4COP & 3PS",
  description:
    "Find Hillsborough County liquor licenses for sale in Tampa, Temple Terrace, and Plant City. Compare current 4COP and 3PS listings, asking prices, county market data, and license values on FLLM.",
  alternates: { canonical: `${siteUrl}/counties/hillsborough` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${siteUrl}/counties/hillsborough`,
    title: "Hillsborough County Liquor License for Sale | Tampa 4COP & 3PS",
    description:
      "Compare current Hillsborough County liquor licenses for sale, including Tampa-area 4COP and 3PS opportunities, asking prices, market data, and valuation resources.",
    siteName: "Florida Liquor License Market",
  },
};

export default function HillsboroughCountyPage() {
  return CountyPage({ params: Promise.resolve({ slug: "hillsborough" }) });
}
