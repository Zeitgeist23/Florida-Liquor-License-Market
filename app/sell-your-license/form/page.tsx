import type { Metadata } from "next";

import SellerListingForm from "@/components/SellerListingForm";

export const metadata: Metadata = {
  title: "Confidential License Listing Form | Florida Liquor License Market",
  description:
    "Complete a confidential self-directed or broker-assisted Florida liquor license listing submission.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SellYourLicenseFormPage() {
  return <SellerListingForm />;
}

