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
const targetCounty = "St. Johns County";
const heroPhoto =
  "https://fhwaapps.fhwa.dot.gov/bywaysp/uploads/asset_files/2477/52282_SA_Sunset_Over_Lions_Bridge.jpg";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Saint Augustine Liquor License Market Data | St. Johns County | FLLM",
  description:
    "Saint Augustine liquor-license market data for St. Johns County. Compare businesses with quota, 4COP SFS/SRX and 2COP licenses plus standalone 4COP and 3PS quota inventory.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Saint Augustine Liquor License Market Data | FLLM",
    description:
      "City-specific Florida liquor-license market intelligence for Saint Augustine and St. Johns County.",
    siteName: "Florida Liquor License Market",
  },
};

function normalizeCountyName(name: string) {
  return name.replace(/\s+County$/i, "").trim();
}

function bandColor(count: number) {
  if (count >= 21) return "#b14fe2";
  if (count >= 11) return "#8757e9";
  if (count >= 6) return "#6279ea";
  if (count >= 3) return "#1ca9d2";
  if (count >= 1) return "#1590be";
  return "#173752";
}

function FloridaMarketMap({
  counts,
  title,
  stJohnsRows,
}: {
  counts: Map<string, number>;
  title: string;
  stJohnsRows: Array<{ value: number; label: string }>;
}) {
  return (
    <div className="sa-map-wrap">
      <div className="sa-map-tooltip">
        <strong>St. Johns County</strong>
        {stJohnsRows.map((row) => (
          <span key={row.label}><b>{row.value}</b>{row.label}</span>
        ))}
      </div>

      <svg className="sa-map" viewBox="90 -6 380 294" role="img" aria-label="Florida county market map with St. Johns County highlighted">
        <defs>
          <filter id={title.replaceAll(" ", "-")} x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {FLORIDA_COUNTY_PATHS.map((item) => {
          const countyKey = normalizeCountyName(item.name);
          const count = counts.get(countyKey) ?? 0;
          const active = countyKey === "St. Johns";
          return (
            <path
              key={item.id}
              d={item.path}
              fill={active ? "#20d4e5" : bandColor(count)}
              stroke={active ? "#e7fdff" : "#7897b0"}
              strokeWidth={active ? 1.9 : 0.7}
              filter={active ? `url(#${title.replaceAll(" ", "-")})` : undefined}
            />
          );
        })}
        <circle cx="365.5" cy="64" r="7" fill="#ef2d46" stroke="#fff" strokeWidth="2.3" />
        <circle cx="365.5" cy="64" r="2.4" fill="#fff" />
      </svg>

      <div className="sa-map-legend">
        <strong>{title}</strong>
        {[
          ["#173752", "0 listings"],
          ["#1590be", "1–2 listings"],
          ["#1ca9d2", "3–5 listings"],
          ["#6279ea", "6–10 listings"],
          ["#8757e9", "11–20 listings"],
          ["#b14fe2", "21+ listings"],
        ].map(([color, label]) => (
          <span key={label}><i style={{ background: color }} />{label}</span>
        ))}
      </div>
    </div>
  );
}

function MarketStat({
  value,
  label,
  icon,
  href,
}: {
  value: number;
  label: string;
  icon: string;
  href: string;
}) {
  return (
    <Link className="sa-stat-card" href={href}>
      <i className="sa-stat-icon" aria-hidden="true">{icon}</i>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
      <b aria-hidden="true">›</b>
    </Link>
  );
}

export default async function SaintAugustineCityMarketPage() {
  const standaloneListings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());

  const quotaBusinesses = businessQuotaListings.filter((listing) => listing.county === targetCounty).length;
  const sfsBusinesses = businessSfsListings.filter((listing) => listing.county === targetCounty).length;
  const twoCopBusinesses = business2copListings.filter((listing) => listing.county === targetCounty).length;

  const fourCopLicenses = standaloneListings.filter(
    (listing) => listing.county === targetCounty && listing.type === "4COP Quota",
  ).length;
  const threePsLicenses = standaloneListings.filter(
    (listing) => listing.county === targetCounty && listing.type === "3PS Quota / Package Store",
  ).length;

  const businessCounts = new Map<string, number>();
  for (const listing of [...businessQuotaListings, ...businessSfsListings, ...business2copListings]) {
    const key = normalizeCountyName(listing.county);
    businessCounts.set(key, (businessCounts.get(key) ?? 0) + 1);
  }

  const quotaCounts = new Map<string, number>();
  for (const listing of standaloneListings) {
    if (listing.type !== "4COP Quota" && listing.type !== "3PS Quota / Package Store") continue;
    const key = normalizeCountyName(listing.county);
    quotaCounts.set(key, (quotaCounts.get(key) ?? 0) + 1);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Saint Augustine Liquor License Market Data",
    url: canonicalUrl,
    description:
      "Saint Augustine and St. Johns County market intelligence for businesses with liquor licenses and standalone quota liquor licenses.",
    spatialCoverage: { "@type": "Place", name: "Saint Augustine, Florida" },
    isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
  };

  return (
    <FllmPageShell className="sa-city-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <style>{`
        .sa-city-page{background:#061b2b;color:#fff;min-height:100vh}
        .sa-city-shell{width:min(1090px,calc(100% - 48px));margin:0 auto}
        .sa-city-hero{position:relative;overflow:hidden;height:372px;border-bottom:1px solid #bf8200;background:#071e2e}
        .sa-city-hero-photo{position:absolute;top:0;right:0;width:64%;height:100%;background-image:url("${heroPhoto}");background-size:cover;background-position:center center}
        .sa-city-hero-fade{position:absolute;inset:0;background:linear-gradient(90deg,#061c2c 0%,#061c2c 37%,rgba(6,28,44,.93) 45%,rgba(6,28,44,.55) 57%,rgba(6,28,44,.06) 76%)}
        .sa-city-hero-content{position:relative;z-index:2;padding:30px 0 28px;width:49%}
        .sa-eyebrow{display:block;color:#f5a800;font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px}
        .sa-city-hero h1{font-family:Georgia,serif;color:#fff;font-size:54px;line-height:.96;letter-spacing:-.02em;margin:0 0 18px;text-shadow:0 2px 8px rgba(0,0,0,.38)}
        .sa-city-hero p{font-size:13px;line-height:1.55;color:#f3f8fb;margin:0 0 17px}
        .sa-city-location{font-size:12px;font-weight:700;color:#fff;display:flex;align-items:center;gap:8px}
        .sa-city-location i{color:#f5a800;font-style:normal;font-size:15px}
        .sa-city-hero-citymark{position:absolute;right:34px;bottom:24px;z-index:2;text-align:center;color:#fff;font-family:Georgia,serif;font-size:31px;font-style:italic;text-shadow:0 2px 7px rgba(0,0,0,.7)}
        .sa-city-hero-citymark small{display:block;font-family:Arial,sans-serif;font-style:normal;font-size:8px;letter-spacing:.28em;text-transform:uppercase;margin-top:4px}

        .sa-market-section{margin:18px auto 0;border:1px solid #c28a00;border-radius:10px;background:linear-gradient(135deg,#082236 0%,#071d2e 100%);box-shadow:inset 0 0 30px rgba(11,74,102,.11);overflow:hidden}
        .sa-market-grid{display:grid;grid-template-columns:1.08fr .92fr;min-height:384px}
        .sa-market-copy{padding:28px 28px 24px}
        .sa-market-copy h2{font-family:Georgia,serif;color:#fff;font-size:34px;line-height:1.02;margin:0 0 13px}
        .sa-market-copy>p{color:#deedf5;font-size:13px;line-height:1.55;max-width:520px;margin:0 0 18px}
        .sa-stat-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:17px}
        .sa-stat-grid.two{grid-template-columns:repeat(2,minmax(0,1fr));max-width:520px}
        .sa-stat-card{position:relative;display:grid;grid-template-columns:42px 1fr 14px;gap:8px;align-items:center;min-height:107px;padding:11px 12px;border:1px solid #13d2e7;border-radius:8px;background:linear-gradient(145deg,#08283d,#061b2a);box-shadow:0 0 17px rgba(17,206,229,.15);text-decoration:none}
        .sa-stat-icon{width:36px;height:36px;border-radius:50%;border:2px solid #13d2e7;display:flex;align-items:center;justify-content:center;color:#13d2e7;font-style:normal;font-size:18px}
        .sa-stat-card strong{display:block;color:#fff;font-family:Georgia,serif;font-size:31px;line-height:.95}
        .sa-stat-card span{display:block;color:#fff;font-size:10px;line-height:1.25;margin-top:6px}
        .sa-stat-card b{color:#fff;font-size:21px}
        .sa-gold-btn{display:inline-flex;min-height:40px;align-items:center;padding:0 18px;margin-top:18px;border:1px solid #f4b329;border-radius:5px;background:linear-gradient(145deg,#f8b72f,#e99a00 58%,#cf7800);color:#06101a!important;text-decoration:none;font-size:10px;font-weight:900;letter-spacing:.03em;text-transform:uppercase;box-shadow:0 5px 14px rgba(0,0,0,.24)}

        .sa-map-wrap{position:relative;min-height:384px;padding:22px 12px 8px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 62% 45%,rgba(18,195,220,.16),transparent 41%)}
        .sa-map{width:100%;height:auto;max-height:330px;filter:drop-shadow(0 10px 20px rgba(0,0,0,.34))}
        .sa-map-tooltip{position:absolute;right:8px;top:19px;z-index:3;min-width:164px;padding:9px 10px;border:1px solid #13d4e8;border-radius:7px;background:rgba(4,26,42,.96);box-shadow:0 0 15px rgba(19,212,232,.22)}
        .sa-map-tooltip strong{display:block;font:700 15px/1.1 Georgia,serif;color:#fff;margin-bottom:6px}
        .sa-map-tooltip span{display:block;color:#e9f9fb;font-size:8px;line-height:1.7;white-space:nowrap}
        .sa-map-tooltip b{display:inline-block;width:22px;color:#fff;font-size:12px}
        .sa-map-legend{position:absolute;left:35px;bottom:28px;z-index:3;padding:11px 12px;border:1px solid #a57b00;border-radius:7px;background:rgba(4,25,40,.92);min-width:145px}
        .sa-map-legend strong{display:block;color:#f5aa00;font-size:8px;line-height:1.2;text-transform:uppercase;letter-spacing:.05em;margin-bottom:7px}
        .sa-map-legend span{display:flex;align-items:center;gap:6px;color:#fff;font-size:8px;line-height:1.5}
        .sa-map-legend i{width:20px;height:13px;border-radius:2px;border:1px solid rgba(255,255,255,.35)}

        .sa-market-intel{margin:18px auto 28px;border:1px solid #9f7600;border-radius:8px;background:#092235;display:grid;grid-template-columns:1.1fr 1.5fr auto;align-items:center;gap:22px;padding:19px 28px}
        .sa-intel-title{display:flex;align-items:center;gap:15px}
        .sa-intel-icon{font-size:32px;color:#22c4df}
        .sa-intel-title strong{display:block;font-family:Georgia,serif;font-size:20px;color:#fff}
        .sa-market-intel p{font-size:10px;line-height:1.5;color:#d2e5ef;margin:0}
        .sa-outline-btn{display:inline-flex;min-height:40px;align-items:center;padding:0 18px;border:1px solid #df9900;border-radius:5px;color:#f5aa00!important;font-size:9px;font-weight:900;text-transform:uppercase;text-decoration:none;white-space:nowrap}
        .sa-disclosure{width:min(1090px,calc(100% - 48px));margin:0 auto 30px;color:#9eb8c7;font-size:9px;line-height:1.45}

        @media(max-width:900px){
          .sa-city-shell{width:min(100% - 28px,1090px)}
          .sa-city-hero{height:auto;min-height:470px}
          .sa-city-hero-photo{width:100%;opacity:.42}
          .sa-city-hero-fade{background:linear-gradient(90deg,rgba(6,28,44,.96),rgba(6,28,44,.7))}
          .sa-city-hero-content{width:78%;padding:34px 0 60px}
          .sa-city-hero h1{font-size:45px}
          .sa-market-grid{grid-template-columns:1fr}
          .sa-market-intel{grid-template-columns:1fr}
        }
        @media(max-width:620px){
          .sa-city-hero-content{width:100%}.sa-city-hero h1{font-size:39px}.sa-city-hero-citymark{display:none}
          .sa-stat-grid,.sa-stat-grid.two{grid-template-columns:1fr}
          .sa-map-wrap{min-height:340px}.sa-map-tooltip{position:relative;right:auto;top:auto;margin-left:8px}
          .sa-map-legend{left:12px;bottom:12px}
        }
      `}</style>

      <section className="sa-city-hero">
        <div className="sa-city-hero-photo" aria-hidden="true" />
        <div className="sa-city-hero-fade" aria-hidden="true" />
        <div className="sa-city-shell sa-city-hero-content">
          <span className="sa-eyebrow">Florida Market Data</span>
          <h1>Saint Augustine<br />Liquor License<br />Market Data</h1>
          <p>
            Explore current marketplace inventory and key market data for liquor license business packages and standalone
            quota licenses in Saint Augustine, Florida, located in St. Johns County. Compare listings, view county-level
            insights, and make more informed buying or selling decisions.
          </p>
          <div className="sa-city-location"><i>●</i>Serving Saint Augustine, Florida in St. Johns County.</div>
        </div>
        <div className="sa-city-hero-citymark">Saint Augustine<small>Florida · America&apos;s Oldest City</small></div>
      </section>

      <section className="sa-city-shell sa-market-section">
        <div className="sa-market-grid">
          <div className="sa-market-copy">
            <span className="sa-eyebrow">Business Market Overview</span>
            <h2>Businesses on the Market<br />in Saint Augustine</h2>
            <p>
              View current business acquisition opportunities with liquor licenses in Saint Augustine and throughout
              St. Johns County. These listings include operating businesses with existing liquor licenses and related
              transaction assets where applicable.
            </p>
            <div className="sa-stat-grid">
              <MarketStat value={quotaBusinesses} label="Businesses with Quota Licenses" icon="▣" href="/listings?type=businesses&county=St.+Johns+County#business-package-results" />
              <MarketStat value={sfsBusinesses} label="Businesses with 4COP SFS/SRX Licenses" icon="♨" href="/listings?type=businesses-sfs&county=St.+Johns+County#business-package-results" />
              <MarketStat value={twoCopBusinesses} label="Businesses with 2COP Beer & Wine Only Licenses" icon="⌁" href="/listings?type=businesses-2cop&county=St.+Johns+County#business-package-results" />
            </div>
            <Link className="sa-gold-btn" href="/listings?county=St.+Johns+County#business-package-results">View All Saint Augustine Business Listings&nbsp;&nbsp;›</Link>
          </div>
          <FloridaMarketMap
            counts={businessCounts}
            title="Business Listings By County"
            stJohnsRows={[
              { value: quotaBusinesses, label: "Businesses w/ Quota" },
              { value: sfsBusinesses, label: "Businesses w/ 4COP" },
              { value: twoCopBusinesses, label: "Businesses w/ 2COP" },
            ]}
          />
        </div>
      </section>

      <section className="sa-city-shell sa-market-section">
        <div className="sa-market-grid">
          <div className="sa-market-copy">
            <span className="sa-eyebrow">Quota License Market Overview</span>
            <h2>Standalone Quota Liquor<br />Licenses in Saint Augustine</h2>
            <p>
              Track available standalone quota liquor licenses in Saint Augustine and St. Johns County, including 4COP
              and 3PS license types. Compare current inventory, view market activity, and explore opportunities across Florida.
            </p>
            <div className="sa-stat-grid two">
              <MarketStat value={fourCopLicenses} label="4COP Quota Licenses" icon="▤" href="/listings?county=St.+Johns+County&type=4COP+Quota#listing-results" />
              <MarketStat value={threePsLicenses} label="3PS Quota Licenses" icon="▤" href="/listings?county=St.+Johns+County&type=3PS+Quota+%2F+Package+Store#listing-results" />
            </div>
            <Link className="sa-gold-btn" href="/counties/st-johns">View All Quota License Listings&nbsp;&nbsp;›</Link>
          </div>
          <FloridaMarketMap
            counts={quotaCounts}
            title="Quota License Listings By County"
            stJohnsRows={[
              { value: fourCopLicenses, label: "4COP Quota Licenses" },
              { value: threePsLicenses, label: "3PS Quota Licenses" },
            ]}
          />
        </div>
      </section>

      <section className="sa-city-shell sa-market-intel">
        <div className="sa-intel-title">
          <span className="sa-intel-icon">▥</span>
          <div><span className="sa-eyebrow">Market Intelligence</span><strong>St. Johns County at a Glance</strong></div>
        </div>
        <p>
          Saint Augustine&apos;s historic tourism economy and growing population support an active hospitality market.
          Explore current listings and monitor market activity across St. Johns County.
        </p>
        <Link className="sa-outline-btn" href="/counties/st-johns">View County Insights&nbsp;&nbsp;›</Link>
      </section>

      <p className="sa-disclosure">
        Business-package counts are county-level FLLM market observations for St. Johns County. Market observations are
        based on publicly available listing information. FLLM is not the listing broker and does not represent the seller
        unless a listing is expressly identified as an authorized FLLM or Featured Broker Listing.
      </p>
    </FllmPageShell>
  );
}
