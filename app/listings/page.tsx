import type { Metadata } from "next";
import ListingsExplorer from "@/components/ListingsExplorer";

export const metadata: Metadata = {
  title: "Florida Liquor Licenses for Sale | Florida Liquor License Market",
  description: "Search Florida liquor licenses by county, license type, price, availability, and transferability.",
};

export default function ListingsPage() {
  return <ListingsExplorer />;
}
