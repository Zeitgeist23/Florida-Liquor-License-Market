import type { Metadata } from "next";

import ListYourLicenseMockup from "@/components/ListYourLicenseMockup";
import "@/app/resources/forms/abt-forms.css";
import "@/app/sell-your-license-preview/list-your-license-preview.css";

export const metadata: Metadata = {
  title: "List Your Florida Liquor License for Sale | FLLM",
  description:
    "List a Florida quota liquor license for sale through Florida Liquor License Market. Choose a self-directed marketplace listing or request broker-assisted transaction support.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.floridaliquorlicensemarket.com/sell-your-license",
    title: "List Your Florida Liquor License for Sale | FLLM",
    description:
      "Create a self-directed Florida liquor-license listing or request broker-assisted transaction support.",
    siteName: "Florida Liquor License Market",
  },
};

export default function SellYourLicensePage() {
  return <ListYourLicenseMockup />;
}
