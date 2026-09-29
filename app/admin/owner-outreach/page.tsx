import type { Metadata } from "next";

import AdminOwnerOutreachClient from "./AdminOwnerOutreachClient";
import "./owner-outreach.css";

export const metadata: Metadata = {
  title: "FLLM Owner Identification & Outreach",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default function Page(){
  return <AdminOwnerOutreachClient/>;
}
