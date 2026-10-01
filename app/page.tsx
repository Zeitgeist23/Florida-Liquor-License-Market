import type { Metadata } from "next";

import HomePage from "@/components/HomePage";
import HomeLicenseTypesDropdown from "@/components/HomeLicenseTypesDropdown";
import HomeCarouselAvailableColorFix from "@/components/HomeCarouselAvailableColorFix";
import ListYourLicenseLinkFix from "@/components/ListYourLicenseLinkFix";
import MarketReportAudioPortal from "@/components/MarketReportAudioPortal";
import CareersFooterLink from "@/components/CareersFooterLink";
import { getMarketplaceListings } from "@/lib/listing-store";
import "./home-market-insights.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Florida Liquor License Market | Buy, Sell & Broker-Assisted Representation",
  description:
    "Florida Liquor License Market is a specialized statewide marketplace for Florida liquor licenses and business-package advertising. FLLM broker-assisted representation is limited to standalone transferable 4COP Quota and 3PS liquor licenses; operating-business sales remain with the owner or independent business broker.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.floridaliquorlicensemarket.com/",
    title: "Florida Liquor License Market | Buy, Sell & Broker-Assisted Representation",
    description:
      "Choose FLLM broker-assisted representation for standalone transferable 4COP Quota and 3PS liquor licenses or use self-directed marketplace advertising. Operating-business sales remain with the owner or independent business broker.",
    siteName: "Florida Liquor License Market",
  },
};

export default async function Page() {
  const marketplaceListings = await getMarketplaceListings();

  return (
    <>
      <HomePage marketListings={marketplaceListings} />
      <HomeLicenseTypesDropdown />
      <ListYourLicenseLinkFix />
      <HomeCarouselAvailableColorFix />
      <MarketReportAudioPortal />
      <CareersFooterLink />
    </>
  );
}
