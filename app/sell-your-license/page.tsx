import type { Metadata } from "next";

import ApprovedArtworkImage from "./ApprovedArtworkImage";
import styles from "./approved-background.module.css";

export const metadata: Metadata = {
  title: "List Your Florida Liquor License | Florida Liquor License Market",
  description: "Florida Liquor License Market List Your License page.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/sell-your-license",
  },
};

export default function SellYourLicensePage() {
  return (
    <main className={styles.wrapper}>
      <ApprovedArtworkImage />
    </main>
  );
}
