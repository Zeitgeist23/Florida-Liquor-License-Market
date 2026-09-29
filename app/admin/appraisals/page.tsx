import type { Metadata } from "next";

import AdminAppraisalsClient from "./AdminAppraisalsClient";
import "./appraisals.css";

export const metadata: Metadata = {
  title: "FLLM Appraisal Workbench",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <AdminAppraisalsClient />;
}
