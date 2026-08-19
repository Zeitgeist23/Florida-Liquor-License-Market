import HomePage from "@/components/HomePage";
import Script from "next/script";
import HomeCarouselAvailableColorFix from "@/components/HomeCarouselAvailableColorFix";
import ListYourLicenseLinkFix from "@/components/ListYourLicenseLinkFix";
import MarketReportAudioPortal from "@/components/MarketReportAudioPortal";
import CareersFooterLink from "@/components/CareersFooterLink";
import { getMarketplaceListings } from "@/lib/listing-store";
import "./home-market-insights.css";

export const dynamic = "force-dynamic";

export default async function Page() {
  const marketplaceListings = await getMarketplaceListings();

  return (
    <>
      <HomePage marketListings={marketplaceListings} />
      <Script src="/assets/license-types-dropdown.js?v=3" strategy="afterInteractive" />
      <ListYourLicenseLinkFix />
      <HomeCarouselAvailableColorFix />
      <MarketReportAudioPortal />
      <CareersFooterLink />
    </>
  );
}