import type { Metadata } from "next";
import CountyPage from "../[slug]/page";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonical = `${siteUrl}/counties/duval`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jacksonville Liquor License for Sale | Duval County 4COP & 3PS",
  description:
    "Find Jacksonville and Duval County liquor licenses for sale. Compare current 4COP quota and 3PS opportunities, asking prices, inventory, and transfer considerations across Jacksonville, Jacksonville Beach, Atlantic Beach, and Neptune Beach.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Jacksonville Liquor License for Sale | Duval County 4COP & 3PS",
    description:
      "Compare current Jacksonville and Duval County 4COP quota and 3PS liquor-license opportunities, asking prices, and marketplace inventory.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacksonville Liquor License for Sale | Duval County 4COP & 3PS",
    description:
      "Compare Jacksonville and Duval County 4COP quota and 3PS liquor-license inventory and asking prices.",
  },
};

export default async function DuvalCountyPage() {
  return CountyPage({ params: Promise.resolve({ slug: "duval" }) });
}
