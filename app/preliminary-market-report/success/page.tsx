import type { Metadata } from "next";

import PreliminaryMarketReportSuccessClient from "./PreliminaryMarketReportSuccessClient";

export const metadata: Metadata = {
  title: "Market Report Order Received | Florida Liquor License Market",
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  return <PreliminaryMarketReportSuccessClient sessionId={params.session_id || ""} />;
}
