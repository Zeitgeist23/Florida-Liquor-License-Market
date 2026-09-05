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
    "Florida Liquor License Market is a specialized statewide marketplace where sellers can request full-service broker-assisted representation through FLLM itself or choose a self-directed listing. Browse Florida liquor licenses, market data, financing and valuation resources.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.floridaliquorlicensemarket.com/",
    title: "Florida Liquor License Market | Buy, Sell & Broker-Assisted Representation",
    description:
      "Choose full-service broker-assisted representation through FLLM or a self-directed marketplace listing, with statewide liquor-license inventory, market data, financing and valuation resources.",
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
