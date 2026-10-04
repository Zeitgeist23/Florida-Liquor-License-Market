import Link from "next/link";
import { FLORIDA_COUNTY_PATHS } from "@/components/FloridaCountyMap";

type MarketBusiness = {
  title: string;
  category: string;
  licenseType: string;
  price: string;
  href: string;
};

type Props = {
  city: string;
  county: string;
  countyPopulation: number;
  cityPopulation: number;
  cityPopulationYear: number;
  projection2030: number;
  projectedGrowthRate: number;
  projected2027Population: number;
  lottery2026: number;
  lotteryVerified: string;
  forecast2027: number;
  standaloneCount: number;
  standalone4cop: number;
  standalone3ps: number;
  standaloneLow: number | null;
  standaloneMedian: number | null;
  standaloneHigh: number | null;
  marketBusinesses: MarketBusiness[];
};

function normalizeCounty(name: string) {
  return name.replace(/\s+County$/i, "").replace(/[^a-z]/gi, "").toLowerCase();
}

function money(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function number(value: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

function categoryClass(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function CityMarketScope(props: Props) {
  const target = normalizeCounty(props.county);
  const business4cop = props.marketBusinesses.filter((item) => item.licenseType === "4COP Quota").length;
  const business3ps = props.marketBusinesses.filter((item) => item.licenseType.includes("3PS")).length;
  const businessSfs = props.marketBusinesses.filter((item) => item.licenseType.includes("SFS")).length;
  const business2cop = props.marketBusinesses.filter((item) => item.licenseType.includes("2COP")).length;

  const licenseCards = [
    ["4COP Quota", "Transferable quota", "Beer, wine and spirits privileges; county-specific quota asset."],
    ["3PS Quota", "Transferable quota", "Package-store quota series for beer, wine and spirits sales."],
    ["4COP SFS / SRX", "Location-specific", "Full-liquor restaurant privilege tied to qualifying premises and operations."],
    ["2COP Beer & Wine", "Location-specific", "Beer-and-wine privileges; not a transferable quota license."],
  ];

  return (
    <section className="market-scope" aria-labelledby="market-scope-title">
      <div className="market-scope-shell">
        <header className="market-scope-heading">
          <span>FLLM Market Scope</span>
          <h2 id="market-scope-title">{props.city} / {props.county}</h2>
          <p>
            Local liquor-license supply, population, quota-lottery context and current FLLM
            marketplace activity. Public-record operating-license and corporate-entity data are
            shown only when independently verified.
          </p>
        </header>

        <div className="market-scope-top">
          <article className="market-scope-map-card">
            <span className="market-scope-label">County market map</span>
            <svg viewBox="90 -10 380 300" role="img" aria-label={`Florida map highlighting ${props.county}`}>
              <defs>
                <linearGradient id="scope-bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0a3658" />
                  <stop offset="1" stopColor="#061b2d" />
                </linearGradient>
                <filter id="scope-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect x="90" y="-10" width="380" height="300" rx="18" fill="url(#scope-bg)" />
              {FLORIDA_COUNTY_PATHS.map((item) => {
                const active = normalizeCounty(item.name) === target;
                return (
                  <path
                    key={item.id}
                    d={item.path}
                    fill={active ? "#69d6ff" : "#244f70"}
                    stroke={active ? "#dffbff" : "#4a7592"}
                    strokeWidth={active ? 1.9 : 0.72}
                    filter={active ? "url(#scope-glow)" : undefined}
                  />
                );
              })}
            </svg>
            <strong>{props.county}</strong>
            <small>{props.city} is the primary city market shown on this page.</small>
          </article>

          <div className="market-scope-stat-grid">
            <article><span>County Population</span><strong>{number(props.countyPopulation)}</strong><small>U.S. Census Bureau Vintage 2024 estimate</small></article>
            <article><span>{props.city} Population</span><strong>{number(props.cityPopulation)}</strong><small>U.S. Census Bureau {props.cityPopulationYear} estimate</small></article>
            <article><span>Projected County Growth</span><strong>{props.projectedGrowthRate.toFixed(1)}%</strong><small>BEBR modeled growth, 2025–2030</small></article>
            <article><span>Projected 2027 Population</span><strong>{number(props.projected2027Population)}</strong><small>FLLM interpolation of BEBR projection</small></article>
            <article><span>2026 Quota Drawing</span><strong>{props.lottery2026}</strong><small>New St. Johns County quota licenses announced by DBPR · verified {props.lotteryVerified}</small></article>
            <article className="forecast"><span>FLLM 2027 Lottery Forecast</span><strong>≈ {props.forecast2027}</strong><small>Modeled potential new quota licenses from projected population growth; actual DBPR allocation may differ because threshold timing controls issuance.</small></article>
          </div>
        </div>

        <section className="market-scope-block">
          <div className="market-scope-block-heading">
            <span>License Structure</span>
            <h3>Liquor-license types in the local market</h3>
          </div>
          <div className="market-scope-license-grid">
            {licenseCards.map(([title, status, copy]) => (
              <article key={title}>
                <span>{status}</span>
                <strong>{title}</strong>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="market-scope-block">
          <div className="market-scope-block-heading">
            <span>Current Marketplace</span>
            <h3>Licenses and business packages advertised for sale</h3>
          </div>
          <div className="market-scope-market-grid">
            <article><span>Standalone Licenses</span><strong>{props.standaloneCount}</strong><small>{props.standalone4cop} 4COP · {props.standalone3ps} 3PS</small></article>
            <article><span>Low Ask</span><strong>{money(props.standaloneLow)}</strong><small>Current disclosed standalone ask</small></article>
            <article><span>Median Ask</span><strong>{money(props.standaloneMedian)}</strong><small>Current disclosed standalone asks</small></article>
            <article><span>High Ask</span><strong>{money(props.standaloneHigh)}</strong><small>Current disclosed standalone ask</small></article>
            <article><span>Business + License Packages</span><strong>{props.marketBusinesses.length}</strong><small>{business4cop} 4COP Quota · {business3ps} 3PS · {businessSfs} SFS/SRX · {business2cop} 2COP</small></article>
          </div>

          {props.marketBusinesses.length ? (
            <div className="market-scope-business-list">
              {props.marketBusinesses.map((item) => (
                <Link href={item.href} key={item.title} className="market-scope-business-row">
                  <div>
                    <span className={`scope-category scope-category--${categoryClass(item.category)}`}>{item.category}</span>
                    <strong>{item.title}</strong>
                  </div>
                  <div><span>{item.licenseType}</span><b>{item.price}</b></div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="market-scope-empty">No qualifying city business-package Market Views are currently published.</p>
          )}
        </section>

        <section className="market-scope-block market-scope-public-records">
          <div className="market-scope-block-heading">
            <span>Public-Record Operating License Census</span>
            <h3>DBPR license holders + Sunbiz legal entities</h3>
          </div>
          <p>
            Market Scope is designed to show the operating establishment, business category,
            DBPR license number and series, legal DBPR licensee, matched Sunbiz corporation or LLC,
            entity status and premises square footage when that measurement is available from a
            reliable public record.
          </p>
          <div className="market-scope-record-fields">
            {["Establishment", "Category", "License", "DBPR Licensee", "Sunbiz Entity", "Entity Status", "Sq. Ft.", "Public Source"].map((field) => <span key={field}>{field}</span>)}
          </div>
          <div className="market-scope-verification">
            <strong>Verification rule</strong>
            <p>
              FLLM will not publish an operating-license count, corporate owner/entity match or square-foot figure
              in Market Scope until the underlying public record has been independently matched to the establishment.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
