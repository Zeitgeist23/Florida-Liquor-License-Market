import type { Metadata } from "next";

import SellerListingForm from "@/components/SellerListingForm";
import "./legend-fix.css";

export const metadata: Metadata = {
  title: "List Your Florida Liquor License | Florida Liquor License Market",
  description:
    "Submit a Florida liquor license for confidential marketplace review, statewide buyer visibility, or broker-assisted transaction support.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
  },
  openGraph: {
    title: "List Your Florida Liquor License | Florida Liquor License Market",
    description:
      "Choose a self-directed or broker-assisted Florida liquor-license listing.",
    url: "https://www.floridaliquorlicensemarket.com/sell-your-license",
    type: "website",
  },
};

export default function SellYourLicensePage() {
  return <SellerListingForm />;
}
