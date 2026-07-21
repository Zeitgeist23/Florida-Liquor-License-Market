import type { Metadata } from "next";
import ListingsPage from "@/components/ListingsPage";
import "./listings-premium.css";
import "./listings-header-position.css";

export const metadata: Metadata = {
  title: "Florida Liquor Licenses for Sale | Florida Liquor License Market",
  description: "Search transferable Florida quota liquor license interests by county, license type, asking price, and availability.",
  alternates: { canonical: "https://www.floridaliquorlicensemarket.com/listings" },
};

export default function Page() {
  return <ListingsPage />;
}
