import type { Metadata } from "next";
import Link from "next/link";

import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";
import {
  business2copListings,
  businessQuotaListings,
  businessSfsListings,
} from "@/lib/business-quota-listings";
import { getMarketplaceListings } from "@/lib/listing-store";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../../fllm-official-template.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/cities/saint-augustine`;
const targetCounty = "St. Johns County";
const heroPhoto =
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/BridgeLions_StAugustineFL.jpg";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Saint Augustine Liquor License Market Data | St. Johns County | FLLM",
  description:
    "Saint Augustine liquor-license market data for St. Johns County. Compare business packages and standalone 4COP and 3PS quota-license inventory.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
};

function countyKey(value: string) {
  return value.replace(/\s+County$/i, "").trim();
}

function heatColor(count: number) {
  if (count >= 21) return "#b950e5";
  if (count >= 11) return "#8757e8";
  if (count >= 6) return "#6b75e9";
  if (count >= 3) return "#24a8d0";
  if (count >= 1) return "#168dbc";
  return "#173650";
}

function FllmMap({
  counts,
  rows,
  legendTitle,
  filterId,
}: {
  counts: Map<string, number>;
  rows: Array<{ value: number; label: string }>;
  legendTitle: string;
  filterId: string;
}) {
  return (
    <div className="mock-map-wrap">
      <svg className="mock-map" viewBox="90 -8 390 302" role="img" aria-label="Florida county map highlighting St. Johns County">
        <defs>
          <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
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
              fill={active ? "#21d0e2" : heatColor(count)}
              stroke={active ? "#d5fdff" : "#7794aa"}
              strokeWidth={active ? 1.85 : 0.7}
              filter={active ? `url(#${filterId})` : undefined}
            />
          );
        })}
        <g transform="translate(365 64)">
          <path d="M0 -12 C7 -12 12 -7 12 0 C12 8 0 20 0 20 C0 20 -12 8 -12 0 C-12 -7 -7 -12 0 -12Z" fill="#ef334e" stroke="#fff" strokeWidth="2.3"/>
          <circle cx="0" cy="0" r="4" fill="#fff"/>
        </g>
      </svg>

      <div className="mock-tip">
        <strong>St. Johns County</strong>
        {rows.map((row) => (
          <span key={row.label}><b>{row.value}</b>{row.label}</span>
        ))}
      </div>

      <div className="mock-legend">
        <strong>{legendTitle}</strong>
        <span><i style={{background:"#173650"}}/>0 listings</span>
        <span><i style={{background:"#168dbc"}}/>1–2 listings</span>
        <span><i style={{background:"#24a8d0"}}/>3–5 listings</span>
        <span><i style={{background:"#6b75e9"}}/>6–10 listings</span>
        <span><i style={{background:"#8757e8"}}/>11–20 listings</span>
        <span><i style={{background:"#b950e5"}}/>21+ listings</span>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  symbol,
  href,
}: {
  value: number;
  label: string;
  symbol: string;
  href: string;
}) {
  return (
    <Link href={href} className="mock-stat">
      <span className="mock-stat-icon">{symbol}</span>
      <span className="mock-stat-number">{value}</span>
      <span className="mock-stat-label">{label}</span>
      <span className="mock-stat-arrow">›</span>
    </Link>
  );
}

export default async function SaintAugustinePage() {
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
    <main className="mock-page">
      <style>{`
        html,body{margin:0;background:#071b2c}
        .mock-page{background:#071b2c;color:#fff;min-height:100vh;font-family:Arial,sans-serif}
        .mock-frame{width:min(1122px,100%);margin:0 auto;background:linear-gradient(180deg,#071b2c 0%,#082238 55%,#071b2c 100%)}

        .mock-header{height:68px;display:grid;grid-template-columns:168px 1fr 250px;align-items:center;padding:0 34px;border-bottom:1px solid #9c7200;background:#041522}
        .mock-logo img{width:142px;height:auto;display:block}
        .mock-nav{display:flex;align-items:center;justify-content:center;gap:31px}
        .mock-nav a{color:#fff;text-decoration:none;font-size:9px;font-weight:800;text-transform:uppercase;white-space:nowrap}
        .mock-nav a:after{content:"⌄";font-size:7px;margin-left:4px;color:#b4c2cb}
        .mock-actions{display:flex;justify-content:flex-end;gap:12px}
        .mock-actions a{height:34px;display:inline-flex;align-items:center;justify-content:center;border-radius:5px;padding:0 14px;font-size:9px;font-weight:900;text-transform:uppercase;text-decoration:none}
        .mock-contact{border:1px solid #e49c00;color:#f5aa00}
        .mock-list{background:linear-gradient(145deg,#f8b72f,#e99a00 58%,#cf7800);border:1px solid #ffbd2e;color:#07101a}

        .mock-hero{height:373px;position:relative;overflow:hidden;background:#081d2e}
        .mock-hero-photo{position:absolute;inset:0 0 0 480px;background-image:url("${heroPhoto}");background-size:cover;background-position:center center}
        .mock-hero-photo:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,27,44,.35) 0%,rgba(7,27,44,.05) 28%,rgba(7,27,44,0) 62%)}
        .mock-hero-fade{position:absolute;inset:0;background:linear-gradient(90deg,#071b2c 0%,#071b2c 38%,rgba(7,27,44,.93) 44%,rgba(7,27,44,.48) 56%,rgba(7,27,44,0) 70%)}
        .mock-hero-copy{position:absolute;left:40px;top:30px;width:455px;z-index:2}
        .mock-kicker{display:block;color:#f5aa00;font-size:10px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;margin-bottom:9px}
        .mock-hero h1{font-family:Georgia,serif;font-size:51px;line-height:.98;letter-spacing:-.018em;margin:0 0 17px;color:#fff}
        .mock-hero p{font-size:11px;line-height:1.48;color:#f5f9fb;margin:0 0 17px;max-width:448px}
        .mock-location{font-size:10px;font-weight:700;color:#fff}
        .mock-location b{color:#f5aa00;font-size:15px;margin-right:7px}
        .mock-citymark{position:absolute;right:38px;bottom:24px;z-index:2;text-align:center;font:italic 27px/1 Georgia,serif;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,.65)}
        .mock-citymark small{display:block;font:700 7px/1.45 Arial,sans-serif;letter-spacing:.26em;text-transform:uppercase;margin-top:5px}

        .mock-content{padding:17px 24px 0}
        .mock-panel{height:403px;border:1px solid #c58b00;border-radius:10px;background:linear-gradient(135deg,#082338,#071d2f);display:grid;grid-template-columns:55% 45%;overflow:hidden}
        .mock-panel + .mock-panel{margin-top:18px;height:378px}
        .mock-copy{padding:27px 33px 24px}
        .mock-copy h2{font-family:Georgia,serif;font-size:34px;line-height:1.04;margin:0 0 13px;color:#fff}
        .mock-copy>p{font-size:10px;line-height:1.55;color:#dcebf4;margin:0 0 16px;max-width:505px}
        .mock-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:15px}
        .mock-stats.two{grid-template-columns:repeat(2,1fr);max-width:520px}
        .mock-stat{height:111px;border:1px solid #16d5e8;border-radius:7px;background:linear-gradient(145deg,#082a40,#061c2c);display:grid;grid-template-columns:41px 1fr 10px;grid-template-rows:auto auto;column-gap:8px;align-items:center;padding:0 11px;text-decoration:none;box-shadow:0 0 16px rgba(22,213,232,.13)}
        .mock-stat-icon{grid-row:1/3;width:33px;height:33px;border:2px solid #16d5e8;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#16d5e8;font-size:15px}
        .mock-stat-number{align-self:end;font-family:Georgia,serif;font-size:30px;line-height:.95;color:#fff;font-weight:700}
        .mock-stat-label{align-self:start;color:#fff;font-size:8px;line-height:1.18;margin-top:5px}
        .mock-stat-arrow{grid-row:1/3;grid-column:3;color:#fff;font-size:18px}
        .mock-gold{display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 18px;margin-top:18px;border-radius:5px;border:1px solid #ffbd2e;background:linear-gradient(145deg,#f8b72f,#e99a00 58%,#cf7800);color:#07101a!important;text-decoration:none;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.02em}

        .mock-map-wrap{position:relative;height:100%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 63% 48%,rgba(22,213,232,.12),transparent 40%)}
        .mock-map{width:94%;height:auto;max-height:345px;filter:drop-shadow(0 8px 18px rgba(0,0,0,.36));transform:translate(5px,2px)}
        .mock-tip{position:absolute;right:9px;top:20px;min-width:153px;padding:9px 10px;border:1px solid #16d5e8;border-radius:7px;background:rgba(3,25,41,.97);box-shadow:0 0 16px rgba(22,213,232,.18)}
        .mock-tip strong{display:block;font:700 14px/1.1 Georgia,serif;margin-bottom:6px}
        .mock-tip span{display:block;font-size:7px;line-height:1.75;white-space:nowrap}
        .mock-tip b{display:inline-block;width:23px;font-size:11px}
        .mock-legend{position:absolute;left:55px;bottom:36px;min-width:132px;padding:10px 11px;border:1px solid #a47600;border-radius:7px;background:rgba(4,25,40,.94)}
        .mock-legend strong{display:block;color:#f5aa00;font-size:7px;line-height:1.2;text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px}
        .mock-legend span{display:flex;align-items:center;gap:6px;font-size:7px;line-height:1.55}
        .mock-legend i{display:block;width:18px;height:11px;border-radius:2px;border:1px solid rgba(255,255,255,.3)}

        .mock-intel{height:92px;margin-top:18px;border:1px solid #9e7400;border-radius:8px;background:#092236;display:grid;grid-template-columns:1.08fr 1.45fr auto;gap:20px;align-items:center;padding:0 28px}
        .mock-intel-left{display:flex;align-items:center;gap:14px}
        .mock-bars{font-size:30px;color:#25c8e3}
        .mock-intel strong{font-family:Georgia,serif;font-size:18px;color:#fff}
        .mock-intel p{font-size:8px;line-height:1.5;color:#d2e5ef;margin:0}
        .mock-outline{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 16px;border:1px solid #d99500;border-radius:5px;color:#f5aa00!important;text-decoration:none;text-transform:uppercase;font-size:8px;font-weight:900}
        .mock-footer-space{height:50px}

        @media(max-width:900px){
          .mock-header{grid-template-columns:140px 1fr;padding:0 18px}.mock-nav{display:none}.mock-actions{grid-column:2}
          .mock-frame{width:100%}.mock-hero{height:auto;min-height:430px}.mock-hero-photo{left:34%;opacity:.7}.mock-hero-copy{left:28px;top:34px;width:60%}
          .mock-content{padding:14px}.mock-panel,.mock-panel+.mock-panel{height:auto;grid-template-columns:1fr}.mock-map-wrap{height:360px}
          .mock-intel{height:auto;min-height:110px;grid-template-columns:1fr;padding:18px 22px}
        }
      `}</style>

      <div className="mock-frame">
        <header className="mock-header">
          <Link className="mock-logo" href="/"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
          <nav className="mock-nav" aria-label="Primary navigation">
            <Link href="/buy-florida-liquor-license">Buy</Link>
            <Link href="/sell-your-license">Sell</Link>
            <Link href="/financing">Finance</Link>
            <Link href="/investment-opportunities">Invest</Link>
            <Link href="/market-data">Market Data</Link>
            <Link href="/resources/florida-liquor-license-types">License Types</Link>
            <Link href="/resources">Resources</Link>
          </nav>
          <div className="mock-actions">
            <Link className="mock-contact" href="/contact">✉ Contact Us</Link>
            <Link className="mock-list" href="/sell-your-license#listing-options">List Your License</Link>
          </div>
        </header>

        <section className="mock-hero">
          <div className="mock-hero-photo" aria-hidden="true" />
          <div className="mock-hero-fade" aria-hidden="true" />
          <div className="mock-hero-copy">
            <span className="mock-kicker">Florida Market Data</span>
            <h1>Saint Augustine<br />Liquor License<br />Market Data</h1>
            <p>
              Explore current marketplace inventory and key market data for liquor license business packages and standalone quota licenses in Saint Augustine, Florida, located in St. Johns County. Compare listings, view county-level insights, and make more informed buying or selling decisions.
            </p>
            <div className="mock-location"><b>●</b>Serving Saint Augustine, Florida in St. Johns County.</div>
          </div>
          <div className="mock-citymark">Saint Augustine<small>Florida · America&apos;s Oldest City</small></div>
        </section>

        <div className="mock-content">
          <section className="mock-panel">
            <div className="mock-copy">
              <span className="mock-kicker">Business Market Overview</span>
              <h2>Businesses on the Market<br />in Saint Augustine</h2>
              <p>
                View current business acquisition opportunities with liquor licenses in Saint Augustine and throughout St. Johns County. These listings include operating businesses with existing liquor licenses and associated transaction assets where applicable.
              </p>
              <div className="mock-stats">
                <Stat value={quotaBusinesses} label="Businesses with Quota Licenses" symbol="▣" href="/listings?type=businesses&county=St.+Johns+County#business-package-results" />
                <Stat value={sfsBusinesses} label="Businesses with 4COP SFS/SRX Licenses" symbol="♨" href="/listings?type=businesses-sfs&county=St.+Johns+County#business-package-results" />
                <Stat value={twoCopBusinesses} label="Businesses with 2COP Beer & Wine Only Licenses" symbol="⌁" href="/listings?type=businesses-2cop&county=St.+Johns+County#business-package-results" />
              </div>
              <Link className="mock-gold" href="/listings?county=St.+Johns+County#business-package-results">View All Saint Augustine Business Listings&nbsp;&nbsp;›</Link>
            </div>
            <FllmMap
              counts={businessCounts}
              rows={[
                {value:quotaBusinesses,label:"Businesses w/ Quota"},
                {value:sfsBusinesses,label:"Businesses w/ 4COP"},
                {value:twoCopBusinesses,label:"Businesses w/ 2COP"},
              ]}
              legendTitle="Business Listings By County"
              filterId="mock-business-glow"
            />
          </section>

          <section className="mock-panel">
            <div className="mock-copy">
              <span className="mock-kicker">Quota License Market Overview</span>
              <h2>Standalone Quota Liquor<br />Licenses in Saint Augustine</h2>
              <p>
                Track available standalone quota liquor licenses in Saint Augustine and St. Johns County, including 4COP and 3PS license types. Compare current inventory, view market activity, and explore opportunities across Florida.
              </p>
              <div className="mock-stats two">
                <Stat value={fourCopLicenses} label="4COP Quota Licenses" symbol="▤" href="/listings?county=St.+Johns+County&type=4COP+Quota#listing-results" />
                <Stat value={threePsLicenses} label="3PS Quota Licenses" symbol="▤" href="/listings?county=St.+Johns+County&type=3PS+Quota+%2F+Package+Store#listing-results" />
              </div>
              <Link className="mock-gold" href="/counties/st-johns">View All Quota License Listings&nbsp;&nbsp;›</Link>
            </div>
            <FllmMap
              counts={licenseCounts}
              rows={[
                {value:fourCopLicenses,label:"4COP Quota Licenses"},
                {value:threePsLicenses,label:"3PS Quota Licenses"},
              ]}
              legendTitle="Quota License Listings By County"
              filterId="mock-license-glow"
            />
          </section>

          <section className="mock-intel">
            <div className="mock-intel-left">
              <span className="mock-bars">▥</span>
              <div><span className="mock-kicker">Market Intelligence</span><strong>St. Johns County at a Glance</strong></div>
            </div>
            <p>
              Saint Augustine&apos;s unique blend of historic charm, strong tourism, and growing population make it an attractive market for hospitality investment. Explore current listings and monitor market activity to find the right opportunity in St. Johns County.
            </p>
            <Link className="mock-outline" href="/counties/st-johns">View County Insights&nbsp;&nbsp;›</Link>
          </section>

          <div className="mock-footer-space" />
        </div>
      </div>
    </main>
  );
}
