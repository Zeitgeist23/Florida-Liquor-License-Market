import type { Metadata } from "next";
import SubmitOfferPage from "@/components/SubmitOfferPage";
import "./submit-offer.css";

export const metadata: Metadata = {
  title: "Submit an Offer | Florida Liquor License Market",
  description: "Submit a confidential offer for a Florida liquor license marketplace listing.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/submit-offer" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SubmitOfferPage />;
}
