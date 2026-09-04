import type { Metadata } from "next";
import CountyPage from "../[slug]/page";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export const metadata: Metadata = {
  title: "Marion County Liquor License for Sale | Ocala 4COP & 3PS",
  description:
    "Find Marion County liquor licenses for sale in Ocala. Compare current 4COP and 3PS listings, asking prices, county market data, availability, and buyer resources on FLLM.",
  alternates: { canonical: `${siteUrl}/counties/marion` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${siteUrl}/counties/marion`,
    title: "Marion County Liquor License for Sale | Ocala 4COP & 3PS",
    description:
      "Compare current Marion County liquor licenses for sale in the Ocala market, including 4COP and 3PS opportunities, asking prices, and county market data.",
    siteName: "Florida Liquor License Market",
  },
};

export default function MarionCountyPage() {
  return CountyPage({ params: Promise.resolve({ slug: "marion" }) });
}
