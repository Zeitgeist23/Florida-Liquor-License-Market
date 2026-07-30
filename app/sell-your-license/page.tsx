import type { Metadata } from "next";

import SellerListingForm from "@/components/SellerListingForm";

export const metadata: Metadata = {
    title: "List Your Florida Liquor License | Florida Liquor License Market",
    description: "Florida Liquor License Market List Your License page.",
    alternates: {
          canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
    },
};

export default function SellYourLicensePage() {
    return <SellerListingForm />;
}
