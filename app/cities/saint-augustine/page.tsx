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
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/The_Bridge_of_Lions_in_St._Augustine%2C_FL.jpg/1280px-The_Bridge_of_Lions_in_St._Augustine%2C_FL.jpg";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Saint Augustine Liquor License Market Data | St. Johns County | FLLM",
  description:
    "Saint Augustine liquor-license market data for St. Johns County. Compare businesses with quota, 4COP SFS/SRX and 2COP licenses plus standalone 4COP and 3PS quota inventory.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

function countyKey(value: string) {
  return value.replace(/\s+County$/i, "").trim();
}

function countColor(count: number) {
  if (count >= 21) return "#b354e8";
  if (count >= 11) return "#8757e9";
  if (count >= 6) return "#6479ea";
  if (count >= 3) return "#1aa9d4";
  if (count >= 1) return "#158dbd";
  return "#173651";
}

function FloridaMarketMap({
  counts,
  legendTitle,
  tooltipRows,
  filterId,
}: {
  counts: Map<string, number>;
  legendTitle: string;
  tooltipRows: Array<{ value: number; label: string }>;
  filterId: string;
}) {
  return (
    <div className="sa-map-stage">
      <svg className="sa-map-svg" viewBox="90 -8 390 302" role="img" aria-label="Florida map highlighting St. Johns County">
        <defs>
          <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {FLORIDA_COUNTY_PATHS.map((item) => {
          const key = countyKey(item.name);
          const active = key === "St. Johns";
          const count = counts.get(key) ?? 0;
          return (
            <path
              key={item.id}
              d={item.path}
              fill={active ? "#1ccfe2" : countColor(count)}
              stroke={active ? "#c7fbff" : "#718aa2"}
              strokeWidth={active ? 1.75 : 0.7}
              filter={active ? `url(#${filterId})` : undefined}
            />
          );
        })}
        <g transform="translate(365 64)">
          <path d="M0 -12 C7 -12 12 -7 12 0 C12 8 0 20 0 20 C0 20 -12 8 -12 0 C-12 -7 -7 -12 0 -12Z" fill="#ef334e" stroke="#fff" strokeWidth="2"/>
          <circle cx="0" cy="0" r="4" fill="#fff"/>
        </g>
      </svg>

      <div className="sa-map-tooltip">
        <strong>St. Johns County</strong>
        {tooltipRows.map((row) => (
          <span key={row.label}><b>{row.value}</b>{row.label}</span>
        ))}
      </div>

      <div className="sa-map-legend">
        <strong>{legendTitle}</strong>
        <span><i style={{ background:"#173651" }} />0 listings</span>
        <span><i style={{ background:"#158dbd" }} />1–2 listings</span>
        <span><i style={{ background:"#1aa9d4" }} />3–5 listings</span>
        <span><i style={{ background:"#6479ea" }} />6–10 listings</span>
        <span><i style={{ background:"#8757e9" }} />11–20 listings</span>
        <span><i style={{ background:"#b354e8" }} />21+ listings</span>
      </div>
    </div>
  );
}

function StatCard({
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
      <span className="sa-stat-icon" aria-hidden="true">{icon}</span>
      <span className="sa-stat-value">{value}</span>
      <span className="sa-stat-label">{label}</span>
      <span className="sa-stat-arrow" aria-hidden="true">›</span>
    </Link>
  );
}

export default async function SaintAugustineMarketDataPage() {
  const standalone = getVisibleAvailableMarketplaceListings(await getMarketplaceListings());

  const quotaBusinesses = businessQuotaListings.filter((x) => x.county === targetCounty).length;
  const sfsBusinesses = businessSfsListings.filter((x) => x.county === targetCounty).length;
  const twoCopBusinesses = business2copListings.filter((x) => x.county === targetCounty).length;

  const fourCopLicenses = standalone.filter(
    (x) => x.county === targetCounty && x.type === "4COP Quota",
  ).length;
  const threePsLicenses = standalone.filter(
    (x) => x.county === targetCounty && x.type === "3PS Quota / Package Store",
  ).length;

  const businessCounts = new Map<string, number>();
  for (const listing of [...businessQuotaListings, ...businessSfsListings, ...business2copListings]) {
    const key = countyKey(listing.county);
    businessCounts.set(key, (businessCounts.get(key) ?? 0) + 1);
  }

  const licenseCounts = new Map<string, number>();
  for (const listing of standalone) {
    if (listing.type !== "4COP Quota" && listing.type !== "3PS Quota / Package Store") continue;
    const key = countyKey(listing.county);
    licenseCounts.set(key, (licenseCounts.get(key) ?? 0) + 1);
  }

  return (
    <FllmPageShell className="sa-mock-page">
      <style>{`
        .sa-mock-page{background:linear-gradient(180deg,#061a2a 0%,#082238 55%,#061a2a 100%);color:#fff;min-height:100vh}
        .sa-shell{width:calc(100% - 48px);max-width:1490px;margin:0 auto}
        .sa-hero{position:relative;height:375px;overflow:hidden;border-bottom:1px solid rgba(232,159,0,.65);background:#061a2a}
        .sa-hero-photo{position:absolute;top:0;right:0;width:64%;height:100%;background-image:url("${heroPhoto}");background-size:cover;background-position:center 48%}
        .sa-hero-fade{position:absolute;inset:0;background:linear-gradient(90deg,#061a2a 0%,#061a2a 34%,rgba(6,26,42,.98) 40%,rgba(6,26,42,.73) 53%,rgba(6,26,42,.18) 72%,rgba(6,26,42,0) 100%)}
        .sa-hero-inner{position:relative;z-index:2;height:100%;display:flex;align-items:center}
        .sa-hero-copy{width:47%;padding-left:8px}
        .sa-kicker{display:block;color:#f5aa00;font-size:12px;font-weight:900;letter-spacing:.075em;text-transform:uppercase;margin-bottom:9px}
        .sa-hero h1{font-family:Georgia,serif;font-size:clamp(50px,4.8vw,72px);line-height:.98;letter-spacing:-.018em;color:#fff;margin:0 0 18px;text-shadow:0 2px 8px rgba(0,0,0,.35)}
        .sa-hero p{font-size:13px;line-height:1.55;color:#f1f7fb;margin:0 0 16px;max-width:650px}
        .sa-location{font-size:12px;font-weight:700;color:#fff;display:flex;align-items:center;gap:9px}
        .sa-location span{color:#f5aa00;font-size:16px}
        .sa-city-sign{position:absolute;right:34px;bottom:26px;z-index:3;text-align:center;color:#fff;font:italic 30px/1 Georgia,serif;text-shadow:0 2px 8px rgba(0,0,0,.65)}
        .sa-city-sign small{display:block;font:700 8px/1.4 Arial,sans-serif;letter-spacing:.28em;text-transform:uppercase;margin-top:6px}

        .sa-panel{margin-top:18px;border:1px solid #c78e00;border-radius:10px;background:linear-gradient(135deg,#082338 0%,#071d2f 100%);overflow:hidden;box-shadow:inset 0 0 40px rgba(20,116,155,.06)}
        .sa-panel-grid{display:grid;grid-template-columns:1.03fr .97fr;min-height:395px}
        .sa-panel-copy{padding:28px 28px 24px}
        .sa-panel h2{font-family:Georgia,serif;font-size:clamp(34px,3vw,46px);line-height:1.03;color:#fff;margin:0 0 14px}
        .sa-panel-copy>p{font-size:13px;line-height:1.52;color:#d9e9f2;max-width:630px;margin:0 0 17px}
        .sa-stat-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px;margin-top:17px}
        .sa-stat-grid.two{grid-template-columns:repeat(2,minmax(0,1fr));max-width:585px}
        .sa-stat-card{position:relative;display:grid;grid-template-columns:48px 1fr 14px;grid-template-rows:auto auto;column-gap:9px;align-items:center;min-height:111px;padding:12px 13px;border:1px solid #16d5e8;border-radius:7px;background:linear-gradient(145deg,#082a40,#061c2c);box-shadow:0 0 18px rgba(22,213,232,.15);text-decoration:none}
        .sa-stat-icon{grid-row:1/3;width:38px;height:38px;border:2px solid #16d5e8;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#16d5e8;font-size:17px}
        .sa-stat-value{font-family:Georgia,serif;color:#fff;font-size:33px;line-height:.95;font-weight:700;align-self:end}
        .sa-stat-label{color:#fff;font-size:10px;line-height:1.2;align-self:start;margin-top:5px}
        .sa-stat-arrow{grid-column:3;grid-row:1/3;color:#fff;font-size:22px;align-self:center}
        .sa-gold-btn{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 19px;margin-top:18px;border:1px solid #ffbd2e;border-radius:5px;background:linear-gradient(145deg,#f8b72f 0%,#e99a00 58%,#cf7800 100%);box-shadow:0 6px 15px rgba(0,0,0,.24);color:#07101a!important;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.02em;text-decoration:none}

        .sa-map-stage{position:relative;min-height:395px;display:flex;align-items:center;justify-content:center;padding:18px 8px;background:radial-gradient(circle at 63% 46%,rgba(22,213,232,.12),transparent 39%)}
        .sa-map-svg{width:100%;max-height:345px;filter:drop-shadow(0 10px 20px rgba(0,0,0,.35))}
        .sa-map-tooltip{position:absolute;right:10px;top:20px;z-index:4;min-width:175px;padding:10px 11px;border:1px solid #17d9eb;border-radius:7px;background:rgba(3,25,41,.96);box-shadow:0 0 18px rgba(23,217,235,.2)}
        .sa-map-tooltip strong{display:block;font:700 16px/1.1 Georgia,serif;color:#fff;margin-bottom:7px}
        .sa-map-tooltip span{display:block;color:#edfaff;font-size:8px;line-height:1.8;white-space:nowrap}
        .sa-map-tooltip b{display:inline-block;width:25px;color:#fff;font-size:12px}
        .sa-map-legend{position:absolute;left:42px;bottom:27px;z-index:4;min-width:150px;padding:11px 12px;border:1px solid #a67800;border-radius:7px;background:rgba(4,25,40,.94)}
        .sa-map-legend strong{display:block;color:#f5aa00;font-size:8px;line-height:1.15;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}
        .sa-map-legend span{display:flex;align-items:center;gap:6px;color:#fff;font-size:8px;line-height:1.55}
        .sa-map-legend i{display:block;width:21px;height:13px;border:1px solid rgba(255,255,255,.32);border-radius:2px}

        .sa-intel{margin:18px auto 28px;border:1px solid #a47900;border-radius:8px;background:#092236;display:grid;grid-template-columns:1.05fr 1.45fr auto;align-items:center;gap:22px;padding:18px 28px}
        .sa-intel-left{display:flex;align-items:center;gap:16px}
        .sa-intel-bars{font-size:34px;color:#23c9e3}
        .sa-intel-left strong{font-family:Georgia,serif;font-size:20px;color:#fff}
        .sa-intel p{font-size:10px;line-height:1.5;color:#d2e5ef;margin:0}
        .sa-outline{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 18px;border:1px solid #d99500;border-radius:5px;color:#f5aa00!important;font-size:9px;font-weight:900;text-transform:uppercase;text-decoration:none;white-space:nowrap}

        @media(max-width:1000px){
          .sa-shell{width:calc(100% - 28px)}
          .sa-hero{height:auto;min-height:490px}
          .sa-hero-photo{width:100%;opacity:.43}
          .sa-hero-fade{background:linear-gradient(90deg,rgba(6,26,42,.97),rgba(6,26,42,.72))}
          .sa-hero-copy{width:80%;padding:42px 0 70px}
          .sa-panel-grid{grid-template-columns:1fr}
          .sa-intel{grid-template-columns:1fr}
        }
        @media(max-width:700px){
          .sa-hero-copy{width:100%}.sa-city-sign{display:none}
          .sa-stat-grid,.sa-stat-grid.two{grid-template-columns:1fr}
          .sa-map-stage{min-height:340px}
          .sa-map-tooltip{position:relative;right:auto;top:auto;margin-left:10px}
          .sa-map-legend{left:12px;bottom:12px}
        }
      `}</style>

      <section className="sa-hero">
        <div className="sa-hero-photo" aria-hidden="true" />
        <div className="sa-hero-fade" aria-hidden="true" />
        <div className="sa-shell sa-hero-inner">
          <div className="sa-hero-copy">
            <span className="sa-kicker">Florida Market Data</span>
            <h1>Saint Augustine<br />Liquor License<br />Market Data</h1>
            <p>
              Explore current marketplace inventory and key market data for liquor license business packages and standalone
              quota licenses in Saint Augustine, Florida, located in St. Johns County. Compare listings, view county-level
              insights, and make more informed buying or selling decisions.
            </p>
            <div className="sa-location"><span>●</span>Serving Saint Augustine, Florida in St. Johns County.</div>
          </div>
        </div>
        <div className="sa-city-sign">Saint Augustine<small>Florida · America&apos;s Oldest City</small></div>
      </section>

      <section className="sa-shell sa-panel">
        <div className="sa-panel-grid">
          <div className="sa-panel-copy">
            <span className="sa-kicker">Business Market Overview</span>
            <h2>Businesses on the Market<br />in Saint Augustine</h2>
            <p>
              View current business acquisition opportunities with liquor licenses in Saint Augustine and throughout St. Johns County.
              These listings include operating businesses with existing liquor licenses and associated transaction assets where applicable.
            </p>
            <div className="sa-stat-grid">
              <StatCard value={quotaBusinesses} label="Businesses with Quota Licenses" icon="▣" href="/listings?type=businesses&county=St.+Johns+County#business-package-results" />
              <StatCard value={sfsBusinesses} label="Businesses with 4COP SFS/SRX Licenses" icon="♨" href="/listings?type=businesses-sfs&county=St.+Johns+County#business-package-results" />
              <StatCard value={twoCopBusinesses} label="Businesses with 2COP Beer & Wine Only Licenses" icon="⌁" href="/listings?type=businesses-2cop&county=St.+Johns+County#business-package-results" />
            </div>
            <Link className="sa-gold-btn" href="/listings?county=St.+Johns+County#business-package-results">View All Saint Augustine Business Listings&nbsp;&nbsp;›</Link>
          </div>

          <FloridaMarketMap
            counts={businessCounts}
            legendTitle="Business Listings By County"
            tooltipRows={[
              { value: quotaBusinesses, label: "Businesses w/ Quota" },
              { value: sfsBusinesses, label: "Businesses w/ 4COP" },
              { value: twoCopBusinesses, label: "Businesses w/ 2COP" },
            ]}
            filterId="sa-business-glow"
          />
        </div>
      </section>

      <section className="sa-shell sa-panel">
        <div className="sa-panel-grid">
          <div className="sa-panel-copy">
            <span className="sa-kicker">Quota License Market Overview</span>
            <h2>Standalone Quota Liquor<br />Licenses in Saint Augustine</h2>
            <p>
              Track available standalone quota liquor licenses in Saint Augustine and St. Johns County, including 4COP and 3PS
              license types. Compare current inventory, view market activity, and explore opportunities across Florida.
            </p>
            <div className="sa-stat-grid two">
              <StatCard value={fourCopLicenses} label="4COP Quota Licenses" icon="▤" href="/listings?county=St.+Johns+County&type=4COP+Quota#listing-results" />
              <StatCard value={threePsLicenses} label="3PS Quota Licenses" icon="▤" href="/listings?county=St.+Johns+County&type=3PS+Quota+%2F+Package+Store#listing-results" />
            </div>
            <Link className="sa-gold-btn" href="/counties/st-johns">View All Quota License Listings&nbsp;&nbsp;›</Link>
          </div>

          <FloridaMarketMap
            counts={licenseCounts}
            legendTitle="Quota License Listings By County"
            tooltipRows={[
              { value: fourCopLicenses, label: "4COP Quota Licenses" },
              { value: threePsLicenses, label: "3PS Quota Licenses" },
            ]}
            filterId="sa-license-glow"
          />
        </div>
      </section>

      <section className="sa-shell sa-intel">
        <div className="sa-intel-left">
          <span className="sa-intel-bars">▥</span>
          <div>
            <span className="sa-kicker">Market Intelligence</span>
            <strong>St. Johns County at a Glance</strong>
          </div>
        </div>
        <p>
          Saint Augustine&apos;s unique blend of historic charm, tourism, and population growth supports an active hospitality market.
          Explore current listings and monitor market activity across St. Johns County.
        </p>
        <Link className="sa-outline" href="/counties/st-johns">View County Insights&nbsp;&nbsp;›</Link>
      </section>
    </FllmPageShell>
  );
}
