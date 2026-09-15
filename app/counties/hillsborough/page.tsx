import type { Metadata } from "next";
import CountyPage from "../[slug]/page";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/counties/hillsborough`;

export const metadata: Metadata = {
  title: "Tampa Liquor License for Sale | Hillsborough 4COP & 3PS",
  description:
    "Find Tampa liquor licenses for sale in Hillsborough County. Compare current 4COP and 3PS quota-license listings, asking prices, county market data, financing and license values on FLLM.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Tampa Liquor License for Sale | Hillsborough 4COP & 3PS",
    description:
      "Compare Tampa-area 4COP and 3PS liquor licenses for sale in Hillsborough County, including current inventory, asking prices, market data and buyer resources.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function HillsboroughCountyPage() {
  return CountyPage({ params: Promise.resolve({ slug: "hillsborough" }) });
}
