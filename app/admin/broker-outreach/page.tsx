import type { Metadata } from "next";

import AdminBrokerOutreachClient from "./AdminBrokerOutreachClient";
import "./broker-outreach.css";

export const metadata: Metadata = {
  title: "FLLM Broker Outreach",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// Keep the admin outreach dashboard focused on prospects and campaign management.
// The experimental broker email preview has been intentionally removed.
export default function Page() {
  return <AdminBrokerOutreachClient />;
}
