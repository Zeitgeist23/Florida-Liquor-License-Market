import type { Metadata } from "next";

import FormalLicenseAppraisalSuccessClient from "./FormalLicenseAppraisalSuccessClient";

export const metadata: Metadata = {
  title: "Formal Appraisal Order Received | Florida Liquor License Market",
  robots: { index: false, follow: false },
};

export default async function FormalLicenseAppraisalSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId = "" } = await searchParams;
  return <FormalLicenseAppraisalSuccessClient sessionId={sessionId} />;
}
