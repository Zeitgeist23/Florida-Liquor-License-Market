import type { Metadata } from "next";

import ListYourLicenseMockup from "@/components/ListYourLicenseMockup";
import "@/app/resources/forms/abt-forms.css";
import "@/app/sell-your-license-preview/list-your-license-preview.css";

export const metadata: Metadata = {
  title: "List Your Florida Liquor License | Florida Liquor License Market",
  description:
    "Choose a self-directed or broker-assisted listing and submit your Florida liquor license confidentially.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
  },
};

export default function SellYourLicensePage() {
  return <ListYourLicenseMockup />;
}

