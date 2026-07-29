import type { Metadata } from "next";

import ListingSubmissionSuccessClient from "./ListingSubmissionSuccessClient";

export const metadata: Metadata = {
  title: "Listing Payment Received | Florida Liquor License Market",
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  return <ListingSubmissionSuccessClient sessionId={params.session_id || ""} />;
}
