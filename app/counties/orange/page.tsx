import type { Metadata } from "next";
import CountyPage from "../[slug]/page";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export const metadata: Metadata = {
  title: "Orange County Liquor License for Sale | Orlando 4COP & 3PS",
  description:
    "Find Orange County liquor licenses for sale in Orlando and Winter Park. Compare current 4COP and 3PS listings, asking prices, county market data, license values, and buyer resources on FLLM.",
  alternates: { canonical: `${siteUrl}/counties/orange` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${siteUrl}/counties/orange`,
    title: "Orange County Liquor License for Sale | Orlando 4COP & 3PS",
    description:
      "Compare current Orange County liquor licenses for sale, including Orlando-area 4COP and 3PS opportunities, asking prices, market data, and valuation resources.",
    siteName: "Florida Liquor License Market",
  },
};

export default function OrangeCountyPage() {
  return CountyPage({ params: Promise.resolve({ slug: "orange" }) });
}
