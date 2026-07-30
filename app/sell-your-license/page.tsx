import type { Metadata } from "next";

import SellerListingForm from "@/components/SellerListingForm";

export const metadata: Metadata = {
  title: "List Your Florida Liquor License | Florida Liquor License Market",
  description:
    "Choose a self-directed or broker-assisted sale and submit your Florida liquor license confidentially.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
  },
};

export default function SellYourLicensePage() {
  return <SellerListingForm />;
}
