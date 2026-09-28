import type { Metadata } from "next";

import AdminLienSearchClient from "./AdminLienSearchClient";
import "./lien-search.css";

export const metadata: Metadata = {
  title: "FLLM Appraisal Lien & Encumbrance Search",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <AdminLienSearchClient />;
}
