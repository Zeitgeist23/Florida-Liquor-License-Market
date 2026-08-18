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
      <Script src="/assets/buy-dropdown.js?v=2" strategy="afterInteractive" />
      <Script src="/assets/market-data-dropdown.js?v=12" strategy="afterInteractive" />
      <Script src="/assets/resources-dropdown.js?v=11" strategy="afterInteractive" />
      <Script src="/assets/header-menu-coordinator.js?v=4" strategy="afterInteractive" />
      <Script src="/assets/header-menu-hover.js?v=2" strategy="afterInteractive" />
      <ListYourLicenseLinkFix />
      <HomeCarouselAvailableColorFix />
      <MarketReportAudioPortal />
      <CareersFooterLink />
    </>
  );
}
