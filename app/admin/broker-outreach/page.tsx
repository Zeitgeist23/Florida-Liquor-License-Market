import type { Metadata } from "next";

import AdminBrokerOutreachClient from "./AdminBrokerOutreachClient";
import BrokerEmailMasterPreview from "./BrokerEmailMasterPreview";
import "./broker-outreach.css";
import "./broker-email-preview-fix.css";

export const metadata: Metadata = {
  title: "FLLM Broker Outreach",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <AdminBrokerOutreachClient />
      <BrokerEmailMasterPreview />
    </>
  );
}