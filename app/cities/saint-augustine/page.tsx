import type { Metadata } from "next";
import FormsSiteHeader from "@/components/FormsSiteHeader";
import hero1 from "./hero-chunk-1";
import hero2 from "./hero-chunk-2";
import hero3 from "./hero-chunk-3";
import hero4 from "./hero-chunk-4";

import "../../fllm-official-template.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/cities/saint-augustine`;
const streetHero = `data:image/webp;base64,${hero1}${hero2}${hero3}${hero4}`;

export const metadata: Metadata = {
  title: "Saint Augustine Liquor License Market Data | St. Johns County | FLLM",
  description:
    "Saint Augustine liquor-license market data for St. Johns County, Florida.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

export default function SaintAugustineCityPage() {
  return (
    <main className="sa-page">
      <style>{`
        .sa-page{
          min-height:100vh;
          margin:0;
          background:#061a2a;
          color:#fff;
        }

        .sa-header-wrap{
          background:#031522;
          border-bottom:1px solid rgba(229,157,0,.68);
        }

        .sa-hero{
          position:relative;
          overflow:hidden;
          min-height:430px;
          background:#061a2a;
          border-bottom:1px solid rgba(229,157,0,.68);
        }

        .sa-hero__photo{
          position:absolute;
          inset:0 0 0 39%;
          background-image:url("${streetHero}");
          background-size:cover;
          background-position:center 50%;
          background-repeat:no-repeat;
        }

        .sa-hero__veil{
          position:absolute;
          inset:0;
          background:
            linear-gradient(
              90deg,
              #061a2a 0%,
              #061a2a 35%,
              rgba(6,26,42,.97) 42%,
              rgba(6,26,42,.83) 49%,
              rgba(6,26,42,.52) 60%,
              rgba(6,26,42,.18) 72%,
              rgba(6,26,42,0) 86%
            );
        }

        .sa-hero__inner{
          position:relative;
          z-index:2;
          width:100%;
          margin:0;
          min-height:430px;
          display:flex;
          align-items:center;
          padding-left:40px;
          padding-right:40px;
        }

        .sa-hero__copy{
          width:46%;
          padding:34px 0 38px;
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
          margin:0 0 20px;
          max-width:620px;
          color:#fff;
          font-family:Georgia,"Times New Roman",serif;
          font-size:clamp(48px,4.55vw,70px);
          line-height:.97;
          letter-spacing:-.025em;
          text-shadow:0 3px 14px rgba(0,0,0,.34);
        }

        .sa-hero__description{
          margin:0 0 18px;
          max-width:575px;
          color:#f3f7fa;
          font-size:14px;
          line-height:1.58;
        }

        .sa-hero__location{
          display:flex;
          align-items:center;
          gap:9px;
          margin:0;
          color:#fff;
          font-size:13px;
          line-height:1.35;
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
            width:72%;
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
            font-size:42px;
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
              Saint Augustine
              <br />
              Liquor License
              <br />
              Market Data
            </h1>
            <p className="sa-hero__description">
              Explore current marketplace inventory and key market data for liquor
              license business packages and standalone quota licenses in Saint
              Augustine, Florida, located in St. Johns County. Compare listings,
              view county-level insights, and make more informed buying or selling
              decisions.
            </p>
            <p className="sa-hero__location">
              <span className="sa-hero__pin" aria-hidden="true">●</span>
              Serving Saint Augustine, Florida in St. Johns County.
            </p>
          </div>
        </div>

        <div className="sa-hero__citymark">
          Saint Augustine
          <small>Florida · America&apos;s Oldest City</small>
        </div>
      </section>

      <div className="sa-under-hero" aria-hidden="true" />
    </main>
  );
}
