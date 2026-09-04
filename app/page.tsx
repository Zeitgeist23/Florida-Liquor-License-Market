import HomePage from "@/components/HomePage";
import HomeLicenseTypesDropdown from "@/components/HomeLicenseTypesDropdown";
import HomeCarouselAvailableColorFix from "@/components/HomeCarouselAvailableColorFix";
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
      <HomeLicenseTypesDropdown />
      <HomeCarouselAvailableColorFix />
      <MarketReportAudioPortal />
      <CareersFooterLink />
    </>
  );
}
