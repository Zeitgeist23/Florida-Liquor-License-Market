import type { Metadata } from "next";

import SellerListingForm from "@/components/SellerListingForm";
import styles from "./approved-background.module.css";

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
  return (
    <div className={styles.wrapper}>
      {/* This is intentionally a real HTML image rather than a generated CSS background. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.approvedArtwork}
        src="/api/fllm-list-your-license-image"
        alt="Approved Florida Liquor License Market List Your License page artwork"
      />
      <SellerListingForm />
    </div>
  );
}
