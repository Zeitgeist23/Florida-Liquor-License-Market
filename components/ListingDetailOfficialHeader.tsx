"use client";

import { usePathname } from "next/navigation";

import FormsSiteHeader from "@/components/FormsSiteHeader";

export default function ListingDetailOfficialHeader() {
  const pathname = usePathname();
  const isListingDetail = pathname.startsWith("/listings/") && pathname !== "/listings";

  if (!isListingDetail) return null;

  return (
    <div className="listing-detail-official-header fllm-official-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>
    </div>
  );
}
