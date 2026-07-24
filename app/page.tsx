import HomePage from "@/components/HomePage";
import HomeCarouselAvailableColorFix from "@/components/HomeCarouselAvailableColorFix";
import MarketReportAudioPortal from "@/components/MarketReportAudioPortal";
import { getMarketplaceListings } from "@/lib/listing-store";
import "./home-market-insights.css";

export const dynamic = "force-dynamic";

export default async function Page() {
  const marketplaceListings = await getMarketplaceListings();

  return (
    <>
      <HomePage marketListings={marketplaceListings} />
      <HomeCarouselAvailableColorFix />
      <MarketReportAudioPortal />
    </>
  );
}
