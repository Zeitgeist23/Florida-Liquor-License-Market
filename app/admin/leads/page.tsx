import type { Metadata } from "next";

import AdminLeadsClient from "./AdminLeadsClient";
import "./admin-leads.css";
import "./valuation-leads.css";

export const metadata: Metadata = {
  title: "FLLM Private Lead Database",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <AdminLeadsClient />;
}
