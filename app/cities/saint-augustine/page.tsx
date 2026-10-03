import type { Metadata } from "next";
import Link from "next/link";

import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";
import { FllmPageShell } from "@/components/FllmDesignSystem";
import {
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../../fllm-official-template.css";
import "../../fllm-design-system.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/cities/saint-augustine`;
const county = "St. Johns County";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Saint Augustine Liquor License Market Data | St. Johns County | FLLM",
  description:
    "Explore Saint Augustine and St. Johns County liquor-license market data. Compare businesses with quota, 4COP SFS/SRX and 2COP licenses plus standalone 4COP and 3PS quota inventory.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Saint Augustine Liquor License Market Data | FLLM",
    description:
      "City-focused Florida liquor-license market intelligence for Saint Augustine and St. Johns County.",
    siteName: "Florida Liquor License Market",
  },
};

function CityCountyMap({
  quotaBusinesses,
  sfsBusinesses,
  twoCopBusinesses,
  fourCopLicenses,
  threePsLicenses,
  mode,
}: {
  quotaBusinesses: number;
  sfsBusinesses: number;
  twoCopBusinesses: number;
  fourCopLicenses: number;
  threePsLicenses: number;
  mode: "business" | "license";
}) {
  return (
    <div className="sa-city-map-stage" aria-label="Florida map highlighting St. Johns County">
      <svg viewBox="90 -10 380 300" role="img" aria-label="Florida counties with St. Johns County highlighted">
        <defs>
          <filter id={`sa-glow-${mode}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {FLORIDA_COUNTY_PATHS.map((item) => {
          const active = item.name === "St. Johns";
          return (
            <path
              key={item.id}
              d={item.path}
              fill={active ? "#19d7e7" : "#163653"}
              stroke={active ? "#baf8ff" : "#5f88a8"}
              strokeWidth={active ? 1.9 : 0.7}
              filter={active ? `url(#sa-glow-${mode})` : undefined}
            />
          );
        })}
        <circle cx="366" cy="63" r="6" fill="#ffb000" stroke="#fff7d6" strokeWidth="2" />
        <circle cx="366" cy="63" r="12" fill="none" stroke="#19d7e7" strokeWidth="2" opacity=".75" />
      </svg>
      <div className="sa-city-map-tooltip">
        <strong>St. Johns County</strong>
        {mode === "business" ? (
          <>
            <span><b>{quotaBusinesses}</b> Businesses w/ Quota</span>
            <span><b>{sfsBusinesses}</b> Businesses w/ 4COP SFS/SRX</span>
            <span><b>{twoCopBusinesses}</b> Businesses w/ 2COP</span>
          </>
        ) : (
          <>
            <span><b>{fourCopLicenses}</b> 4COP Quota Licenses</span>
            <span><b>{threePsLicenses}</b> 3PS Quota Licenses</span>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label, href }: { value: number; label: string; href: string }) {
  return (
    <Link className="sa-city-stat" href={href}>
      <strong>{value}</strong>
      <span>{label}</span>
      <b aria-hidden="true">›</b>
    </Link>
  );
}

export default async function SaintAugustineMarketDataPage() {
  const standalone = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());

  const quotaBusinesses = businessQuotaListings.filter((listing) => listing.county === county).length;
  const sfsBusinesses = businessSfsListings.filter((listing) => listing.county === county).length;
  const twoCopBusinesses = business2copListings.filter((listing) => listing.county === county).length;

  const fourCopLicenses = standalone.filter(
    (listing) => listing.county === county && listing.type === "4COP Quota",
  ).length;
  const threePsLicenses = standalone.filter(
    (listing) => listing.county === county && listing.type === "3PS Quota / Package Store",
  ).length;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Saint Augustine Liquor License Market Data",
    url: canonicalUrl,
    description:
      "Saint Augustine and St. Johns County marketplace inventory for licensed businesses and standalone Florida quota liquor licenses.",
    spatialCoverage: { "@type": "Place", name: "Saint Augustine, Florida" },
    isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
  };

  return (
    <FllmPageShell className="sa-city-market-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <style>{`
        .sa-city-market-page{background:linear-gradient(180deg,#031725 0%,#061d2d 48%,#031522 100%);min-height:100vh;color:#fff}
        .sa-city-shell{width:min(1460px,calc(100% - 48px));margin:0 auto}
        .sa-city-hero{position:relative;overflow:hidden;border-bottom:1px solid rgba(245,167,0,.45);min-height:410px;background:#031827}
        .sa-city-hero__photo{position:absolute;inset:0 0 0 42%;background-image:url("https://upload.wikimedia.org/wikipedia/commons/5/52/Bridge_of_Lions.jpg");background-size:cover;background-position:center;filter:saturate(1.08) contrast(1.03)}
        .sa-city-hero__veil{position:absolute;inset:0;background:linear-gradient(90deg,#031827 0%,#031827 38%,rgba(3,24,39,.92) 49%,rgba(3,24,39,.48) 67%,rgba(3,24,39,.08) 100%)}
        .sa-city-hero__content{position:relative;z-index:2;padding:58px 0 54px;max-width:680px}
        .sa-city-eyebrow{display:block;color:#f6aa00;font-weight:800;font-size:12px;letter-spacing:.11em;text-transform:uppercase;margin-bottom:12px}
        .sa-city-hero h1{font-family:Georgia,serif;font-size:clamp(40px,5vw,72px);line-height:.96;margin:0 0 20px;max-width:650px;color:#fff;text-shadow:0 3px 14px rgba(0,0,0,.5)}
        .sa-city-hero p{max-width:630px;font-size:16px;line-height:1.6;color:#e8f4fb;margin:0 0 18px}
        .sa-city-location{display:flex;gap:9px;align-items:center;color:#fff;font-weight:700;font-size:14px}
        .sa-city-location i{color:#ffb000;font-style:normal}
        .sa-city-photo-credit{position:absolute;right:22px;bottom:12px;z-index:3;font-size:10px;color:rgba(255,255,255,.78);background:rgba(2,16,27,.6);padding:5px 8px;border-radius:5px}
        .sa-city-section{margin:28px auto 0;border:1px solid rgba(246,170,0,.72);border-radius:13px;background:linear-gradient(145deg,rgba(5,31,48,.98),rgba(5,24,39,.98));box-shadow:0 16px 38px rgba(0,0,0,.25);overflow:hidden}
        .sa-city-section__inner{display:grid;grid-template-columns:minmax(0,1.03fr) minmax(480px,.97fr);gap:28px;padding:32px}
        .sa-city-section h2{font-family:Georgia,serif;font-size:clamp(31px,3vw,48px);line-height:1.02;margin:0 0 14px;color:#fff}
        .sa-city-section p{font-size:15px;line-height:1.58;color:#cfe4f2;max-width:690px;margin:0 0 22px}
        .sa-city-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
        .sa-city-stats--two{grid-template-columns:repeat(2,minmax(0,1fr))}
        .sa-city-stat{position:relative;display:flex;flex-direction:column;min-height:122px;padding:18px;border:1px solid #12cfe4;border-radius:9px;background:linear-gradient(145deg,#08273b,#061c2c);box-shadow:0 0 18px rgba(14,211,232,.12);text-decoration:none}
        .sa-city-stat strong{font:700 38px/1 Georgia,serif;color:#fff}
        .sa-city-stat span{color:#eefaff;font-size:13px;line-height:1.35;margin-top:9px;max-width:150px}
        .sa-city-stat b{position:absolute;right:14px;bottom:14px;color:#12d4e9;font-size:22px}
        .sa-city-map-stage{position:relative;min-height:390px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 68% 44%,rgba(0,201,226,.18),transparent 36%)}
        .sa-city-map-stage svg{width:100%;height:auto;max-height:420px;filter:drop-shadow(0 8px 20px rgba(0,0,0,.35))}
        .sa-city-map-tooltip{position:absolute;right:14px;top:16px;display:flex;flex-direction:column;gap:7px;padding:13px 14px;border:1px solid #17d8e9;border-radius:9px;background:rgba(2,23,37,.95);box-shadow:0 0 20px rgba(17,215,233,.22);font-size:12px;min-width:220px}
        .sa-city-map-tooltip strong{font:700 18px/1.1 Georgia,serif;color:#fff;margin-bottom:4px}
        .sa-city-map-tooltip span{color:#dff7fb}.sa-city-map-tooltip b{color:#fff;font-size:16px;margin-right:6px}
        .sa-city-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}
        .sa-city-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 19px;border-radius:7px;background:linear-gradient(145deg,#f8b72f,#e99a00 58%,#cf7800);color:#07101a!important;font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:.02em;text-decoration:none;border:1px solid #ffbd2e;box-shadow:0 7px 16px rgba(0,0,0,.2)}
        .sa-city-footnote{margin:22px auto 36px;padding:18px 22px;border:1px solid rgba(18,207,228,.38);border-radius:10px;color:#bcd9e8;background:rgba(4,24,39,.7);font-size:12px;line-height:1.55}
        @media(max-width:980px){.sa-city-hero__photo{left:28%}.sa-city-hero__veil{background:linear-gradient(90deg,#031827 0%,rgba(3,24,39,.96) 50%,rgba(3,24,39,.55) 100%)}.sa-city-section__inner{grid-template-columns:1fr}.sa-city-map-stage{min-height:320px}.sa-city-stats{grid-template-columns:1fr 1fr}.sa-city-stat:last-child{grid-column:1/-1}.sa-city-stats--two .sa-city-stat:last-child{grid-column:auto}}
        @media(max-width:680px){.sa-city-shell{width:min(100% - 24px,1460px)}.sa-city-hero{min-height:520px}.sa-city-hero__photo{left:0;opacity:.42}.sa-city-hero__veil{background:rgba(3,24,39,.72)}.sa-city-hero__content{padding:38px 0}.sa-city-section__inner{padding:22px 16px}.sa-city-stats,.sa-city-stats--two{grid-template-columns:1fr}.sa-city-stat:last-child{grid-column:auto}.sa-city-map-tooltip{position:relative;right:auto;top:auto;margin:8px auto 0;width:calc(100% - 20px)}.sa-city-map-stage{display:block;padding-bottom:8px}}
      `}</style>

      <section className="sa-city-hero">
        <div className="sa-city-hero__photo" aria-hidden="true" />
        <div className="sa-city-hero__veil" aria-hidden="true" />
        <div className="sa-city-shell sa-city-hero__content">
          <span className="sa-city-eyebrow">Florida Market Data · Saint Augustine</span>
          <h1>Saint Augustine Liquor License Market Data</h1>
          <p>
            Explore current marketplace inventory for licensed businesses and standalone quota liquor licenses
            serving Saint Augustine and St. Johns County. Compare business-package inventory with the underlying
            4COP and 3PS quota-license market in one city-focused FLLM market-intelligence page.
          </p>
          <div className="sa-city-location"><i>●</i> Serving Saint Augustine, Florida in St. Johns County.</div>
        </div>
        <span className="sa-city-photo-credit">Saint Augustine · Bridge of Lions · CC0 / Wikimedia Commons</span>
      </section>

      <section className="sa-city-shell sa-city-section">
        <div className="sa-city-section__inner">
          <div>
            <span className="sa-city-eyebrow">Business Market Overview</span>
            <h2>Businesses on the Market Serving Saint Augustine</h2>
            <p>
              Current FLLM-observed business packages in St. Johns County, separated by license structure so buyers
              can distinguish transferable quota licenses from premises-dependent restaurant and beer-and-wine privileges.
            </p>
            <div className="sa-city-stats">
              <Stat value={quotaBusinesses} label="Businesses with Quota Licenses" href="/listings?type=businesses&county=St.+Johns+County#business-package-results" />
              <Stat value={sfsBusinesses} label="Businesses with 4COP SFS/SRX Licenses" href="/listings?type=businesses-sfs&county=St.+Johns+County#business-package-results" />
              <Stat value={twoCopBusinesses} label="Businesses with 2COP Beer & Wine Licenses" href="/listings?type=businesses-2cop&county=St.+Johns+County#business-package-results" />
            </div>
            <div className="sa-city-actions">
              <Link className="sa-city-btn" href="/listings?county=St.+Johns+County#business-package-results">View St. Johns Business Market</Link>
            </div>
          </div>
          <CityCountyMap
            quotaBusinesses={quotaBusinesses}
            sfsBusinesses={sfsBusinesses}
            twoCopBusinesses={twoCopBusinesses}
            fourCopLicenses={fourCopLicenses}
            threePsLicenses={threePsLicenses}
            mode="business"
          />
        </div>
      </section>

      <section className="sa-city-shell sa-city-section">
        <div className="sa-city-section__inner">
          <div>
            <span className="sa-city-eyebrow">Quota License Market Overview</span>
            <h2>Standalone Quota Liquor Licenses in St. Johns County</h2>
            <p>
              Compare the currently visible standalone quota-license inventory underlying the Saint Augustine market,
              separated between 4COP full-liquor quota licenses and 3PS package-store quota licenses.
            </p>
            <div className="sa-city-stats sa-city-stats--two">
              <Stat value={fourCopLicenses} label="4COP Quota Licenses" href="/listings?county=St.+Johns+County&type=4COP+Quota#listing-results" />
              <Stat value={threePsLicenses} label="3PS Quota Licenses" href="/listings?county=St.+Johns+County&type=3PS+Quota+%2F+Package+Store#listing-results" />
            </div>
            <div className="sa-city-actions">
              <Link className="sa-city-btn" href="/counties/st-johns">View St. Johns County Market</Link>
            </div>
          </div>
          <CityCountyMap
            quotaBusinesses={quotaBusinesses}
            sfsBusinesses={sfsBusinesses}
            twoCopBusinesses={twoCopBusinesses}
            fourCopLicenses={fourCopLicenses}
            threePsLicenses={threePsLicenses}
            mode="license"
          />
        </div>
      </section>

      <div className="sa-city-shell sa-city-footnote">
        Business-package counts reflect current FLLM-observed market inventory for St. Johns County and are not represented as
        city-boundary counts unless the source identifies Saint Augustine specifically. Standalone license counts reflect visible
        St. Johns County marketplace inventory. Market observations are based on publicly available listing information; FLLM is
        not the listing broker and does not represent the seller unless a listing is expressly identified as an authorized FLLM or
        Featured Broker Listing.
      </div>
    </FllmPageShell>
  );
}
