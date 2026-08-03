import type { Metadata } from "next";

import AdminListingSubmissionsClient from "./AdminListingSubmissionsClient";
import "./admin-listings.css";
import "./admin-leads-link.css";

export const metadata: Metadata = {
  title: "FLLM Listing Review",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <AdminListingSubmissionsClient />;
}
