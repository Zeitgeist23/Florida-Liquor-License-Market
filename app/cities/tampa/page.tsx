import type { Metadata } from "next";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import CityMarketScope from "@/components/CityMarketScope";
import CityMarketOverviewMaps from "@/components/CityMarketOverviewMaps";
import { getTampaDbprMarketScope } from "@/lib/city-market-scope-dbpr";
import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import { countyPopulations2024 } from "@/data/county-populations-2024";
import {
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";
import "../../fllm-official-template.css";
import "../city-market-overview.css";
import "../city-market-scope.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/cities/tampa`;

export const metadata: Metadata = {
  title: "Tampa Liquor License Market Data | Hillsborough County | FLLM",
  description:
    "Tampa liquor-license market data for Hillsborough County, including bars and restaurants for sale with 4COP full-liquor licenses, standalone quota licenses, and local pricing context.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[midpoint]
    : Math.round((sorted[midpoint - 1] + sorted[midpoint]) / 2);
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TampaCityPage() {
  const [allStandalone, dbprMarketScope] = await Promise.all([
    getMarketplaceListings().then(getVisibleAvailableMarketplaceListings),
    getTampaDbprMarketScope(),
  ]);
  const standalone = allStandalone.filter(
    (listing) => listing.county === "Hillsborough County",
  );

  const allBusinesses = [
    ...businessQuotaListings,
    ...businessSfsListings,
    ...business2copListings,
  ];

  const standalonePrices = standalone
    .map((listing) => listing.price)
    .filter((price): price is number => typeof price === "number" && Number.isFinite(price));

  const businessInventory = allBusinesses
    .filter((listing) => listing.county === "Hillsborough County")
    .filter((listing) =>
      /\btampa\b/i.test(`${listing.title} ${listing.businessType}`),
    )
    .map((listing) => ({
      title: listing.title,
      category: listing.businessCategory,
      licenseType: listing.licenseType,
      price: listing.packagePrice,
      href: listing.marketViewHref || listing.href,
    }));

  const drawing2026 =
    QUOTA_DRAWING_2026.counties.find((item) => item.county === "Hillsborough")?.licenses ?? 0;

  // BEBR 2026 county projection series: 1,575,637 (2025) to 1,685,000 (2030).
  const bebr2025 = 1_575_637;
  const bebr2030 = 1_685_000;
  const growthRate = ((bebr2030 / bebr2025) - 1) * 100;
  const annualGrowthFactor = Math.pow(bebr2030 / bebr2025, 1 / 5);
  const projected2027Population = Math.round(bebr2025 * Math.pow(annualGrowthFactor, 2));
  const forecast2027 = Math.max(1, Math.round((projected2027Population - bebr2025) / 7_500));

  return (
    <main className="sa-page fllm-official-page">
      <style>{`
        .sa-page{
          min-height:100vh;
          margin:0;
          background:#061a2a;
          color:#fff;
        }

        .sa-header-wrap{
          position:sticky;
          top:0;
          z-index:1400;
          background:#020b12;
          border-bottom:1px solid rgba(241,166,0,.62);
          box-shadow:0 5px 15px rgba(0,0,0,.22);
        }

        .sa-hero{
          position:relative;
          overflow:hidden;
          min-height:390px;
          background:#061a2a;
          border-bottom:1px solid rgba(229,157,0,.68);
        }

        .sa-hero__photo{
          position:absolute;
          inset:0 0 0 34%;
          background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/Downtown%20Tampa%20overlooking%20Seddon%20Channel%20-%20Eric%20Statzer.jpg");
          background-size:cover;
          background-position:52% 50%;
          background-repeat:no-repeat;
        }

        .sa-hero__veil{
          position:absolute;
          inset:0;
          background:
            linear-gradient(
              90deg,
              #061a2a 0%,
              #061a2a 31%,
              rgba(6,26,42,.97) 40%,
              rgba(6,26,42,.84) 50%,
              rgba(6,26,42,.60) 60%,
              rgba(6,26,42,.32) 70%,
              rgba(6,26,42,.10) 79%,
              rgba(6,26,42,0) 88%
            );
        }

        .sa-hero__inner{
          position:relative;
          z-index:2;
          width:100%;
          margin:0;
          min-height:390px;
          display:flex;
          align-items:center;
          padding:30px clamp(22px,2.6vw,40px);
        }

        .sa-hero__copy{
          width:min(58%,820px);
          margin-left:clamp(12px,2vw,30px);
          padding:2px 0 38px;
        }

        .sa-hero__eyebrow{
          display:block;
          margin:0 0 10px;
          color:#f5a800;
          font-size:12px;
          line-height:1;
          font-weight:900;
          letter-spacing:.09em;
          text-transform:uppercase;
        }

        .sa-hero h1{
          margin:0 0 15px;
          max-width:780px;
          color:#fff;
          font-family:Georgia,"Times New Roman",serif;
          font-size:clamp(53px,4.9vw,74px);
          line-height:.94;
          letter-spacing:-.03em;
          text-shadow:0 4px 18px rgba(0,0,0,.62);
        }

        .sa-hero__description{
          margin:0 0 16px;
          max-width:640px;
          color:#f3f7fa;
          font-size:18px;
          line-height:1.62;
          text-shadow:0 2px 10px rgba(0,0,0,.58);
        }

        .sa-hero__bullets{
          display:grid;
          gap:8px;
        }

        .sa-hero__location{
          display:flex;
          align-items:center;
          gap:9px;
          margin:0;
          color:#fff;
          font-size:15px;
          line-height:1.45;
          font-weight:700;
        }

        .sa-hero__pin{
          color:#f5a800;
          font-size:17px;
          line-height:1;
        }

        .sa-hero__citymark{
          position:absolute;
          right:34px;
          bottom:24px;
          z-index:3;
          color:#fff;
          text-align:center;
          font-family:Georgia,"Times New Roman",serif;
          font-size:30px;
          line-height:1;
          font-style:italic;
          text-shadow:0 2px 8px rgba(0,0,0,.72);
        }

        .sa-hero__citymark small{
          display:block;
          margin-top:7px;
          font-family:Arial,sans-serif;
          font-size:8px;
          line-height:1.2;
          font-style:normal;
          font-weight:800;
          letter-spacing:.26em;
          text-transform:uppercase;
        }

        .sa-under-hero{
          min-height:150px;
          background:#082238;
        }

        @media(max-width:900px){
          .sa-hero{
            min-height:500px;
          }

          .sa-hero__photo{
            inset:0;
            opacity:.58;
          }

          .sa-hero__veil{
            background:linear-gradient(
              90deg,
              rgba(6,26,42,.98) 0%,
              rgba(6,26,42,.92) 48%,
              rgba(6,26,42,.46) 100%
            );
          }

          .sa-hero__inner{
            min-height:500px;
          }

          .sa-hero__copy{
            width:min(82%,760px);
            margin-left:0;
          }
        }

        @media(max-width:620px){
          .sa-hero__inner{
            width:min(100% - 28px,1120px);
          }

          .sa-hero__copy{
            width:100%;
          }

          .sa-hero h1{
            font-size:46px;
          }

          .sa-hero__citymark{
            display:none;
          }
        }
      `}</style>

      <div className="sa-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="sa-hero">
        <div className="sa-hero__photo" aria-hidden="true" />
        <div className="sa-hero__veil" aria-hidden="true" />

        <div className="sa-hero__inner">
          <div className="sa-hero__copy">
            <span className="sa-hero__eyebrow">Florida Market Data</span>
            <h1>
              Tampa
              <br />
              Liquor License Market Data
            </h1>
            <p className="sa-hero__description">
              Explore current liquor-license market activity in Tampa and Hillsborough
              County, including bars and restaurants for sale with full-liquor licenses,
              standalone quota licenses for sale, and local pricing context.
            </p>
            <div className="sa-hero__bullets">
              <p className="sa-hero__location">
                <span className="sa-hero__pin" aria-hidden="true">●</span>
                Tampa bars and restaurants for sale with 4COP full-liquor licenses.
              </p>
              <p className="sa-hero__location">
                <span className="sa-hero__pin" aria-hidden="true">●</span>
                Standalone 4COP and 3PS quota liquor licenses for sale.
              </p>
              <p className="sa-hero__location">
                <span className="sa-hero__pin" aria-hidden="true">●</span>
                Hillsborough County liquor-license pricing and market data.
              </p>
            </div>
          </div>
        </div>

        <div className="sa-hero__citymark">
          Tampa
          <small>Florida · Tampa Bay</small>
        </div>
      </section>

      <CityMarketOverviewMaps
        standalone={allStandalone}
        businesses={allBusinesses}
        city="Tampa"
        county="Hillsborough County"
        markerX={333}
        markerY={145}
      />

      <CityMarketScope
        city="Tampa"
        county="Hillsborough County"
        countyPopulation={countyPopulations2024["Hillsborough County"]}
        cityPopulation={413_554}
        cityPopulationYear={2025}
        projectedGrowthRate={growthRate}
        projected2027Population={projected2027Population}
        lottery2026={drawing2026}
        lotteryVerified={QUOTA_DRAWING_2026.lastVerified}
        forecast2027={forecast2027}
        standaloneCount={standalone.length}
        standalone4cop={standalone.filter((listing) => listing.type === "4COP Quota").length}
        standalone3ps={standalone.filter((listing) => listing.type === "3PS Quota / Package Store").length}
        standaloneLow={standalonePrices.length ? Math.min(...standalonePrices) : null}
        standaloneMedian={median(standalonePrices)}
        standaloneHigh={standalonePrices.length ? Math.max(...standalonePrices) : null}
        marketBusinesses={businessInventory}
        dbpr={dbprMarketScope}
      />
    </main>
  );
}
