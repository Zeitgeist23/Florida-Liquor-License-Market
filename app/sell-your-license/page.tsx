import type { Metadata } from "next";

import ListYourLicenseMockup from "@/components/ListYourLicenseMockup";
import "@/app/resources/forms/abt-forms.css";
import "@/app/sell-your-license-preview/list-your-license-preview.css";

export const metadata: Metadata = {
  title: "Sell a Florida Liquor License | List Your License for Sale",
  description:
    "Learn how to sell your Florida liquor license and list it for sale through Florida Liquor License Market. Choose self-directed or broker-assisted selling, review Florida quota-license pricing, and prepare for the transfer process.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.floridaliquorlicensemarket.com/sell-your-license",
    title: "Sell a Florida Liquor License | Florida Liquor License Market",
    description:
      "Learn how to sell or list a Florida liquor license with confidential self-directed or broker-assisted options.",
    siteName: "Florida Liquor License Market",
  },
};

export default function SellYourLicensePage() {
  return <ListYourLicenseMockup />;
}
