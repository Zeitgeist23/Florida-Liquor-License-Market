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
    { title: "4COP Quota", tag: "Transferable quota", copy: "Full-liquor quota license. County-specific transferable asset." },
    { title: "3PS Quota", tag: "Transferable quota", copy: "Package-store quota series for beer, wine and spirits." },
    { title: "4COP SFS / SRX", tag: "Location-specific", copy: "Restaurant full-liquor privilege tied to qualifying premises." },
    { title: "2COP Beer & Wine", tag: "Location-specific", copy: "Beer-and-wine privileges; not a transferable quota asset." },
  ];

  return (
    <section className="market-scope" aria-labelledby="market-scope-title">
      <div className="market-scope-shell">
        <header className="market-scope-heading">
          <span>Market Scope</span>
          <h2 id="market-scope-title">{props.city} Liquor License Market</h2>
          <p>
            City and county market intelligence combining population, quota supply,
            current licenses for sale and business + liquor-license opportunities.
          </p>
        </header>

        <div className="market-scope-dashboard">
          <article className="market-scope-map-card">
            <div className="market-scope-card-head">
              <span>St. Johns County</span>
              <strong>County Market Map</strong>
            </div>
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
            <div className="market-scope-map-caption">
              <strong>{props.county}</strong>
              <span>{props.city} market</span>
            </div>
          </article>

          <section className="market-scope-summary-card">
            <div className="market-scope-card-head">
              <span>Market Snapshot</span>
              <strong>Population + quota supply</strong>
            </div>
            <div className="market-scope-compact-stats">
              <article><span>County population</span><b>{number(props.countyPopulation)}</b><small>2024 Census est.</small></article>
              <article><span>{props.city} population</span><b>{number(props.cityPopulation)}</b><small>{props.cityPopulationYear} Census est.</small></article>
              <article><span>Projected growth</span><b>{props.projectedGrowthRate.toFixed(1)}%</b><small>2025–2030 model</small></article>
              <article><span>2027 population</span><b>{number(props.projected2027Population)}</b><small>FLLM projection</small></article>
              <article><span>2026 lottery</span><b>{props.lottery2026}</b><small>DBPR new quota licenses</small></article>
              <article className="forecast"><span>2027 forecast</span><b>≈ {props.forecast2027}</b><small>FLLM estimate</small></article>
            </div>
            <p className="market-scope-source-note">2026 drawing verified {props.lotteryVerified}. 2027 is a forecast, not an announced DBPR allocation.</p>
          </section>

          <section className="market-scope-license-card">
            <div className="market-scope-card-head">
              <span>License Types</span>
              <strong>Local license structure</strong>
            </div>
            <div className="market-scope-license-list">
              {licenseCards.map((item) => (
                <article key={item.title}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.tag}</span>
                  </div>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="market-scope-inventory-grid">
          <section className="market-scope-panel">
            <div className="market-scope-card-head">
              <span>Standalone Licenses for Sale</span>
              <strong>{props.county} quota inventory</strong>
            </div>
            <div className="market-scope-inventory-stats">
              <article><span>Available</span><b>{props.standaloneCount}</b></article>
              <article><span>4COP</span><b>{props.standalone4cop}</b></article>
              <article><span>3PS</span><b>{props.standalone3ps}</b></article>
              <article><span>Low</span><b>{money(props.standaloneLow)}</b></article>
              <article><span>Median</span><b>{money(props.standaloneMedian)}</b></article>
              <article><span>High</span><b>{money(props.standaloneHigh)}</b></article>
            </div>
            <Link className="market-scope-inline-link" href="/listings?county=St.%20Johns%20County">View St. Johns County standalone inventory →</Link>
          </section>

          <section className="market-scope-panel">
            <div className="market-scope-card-head">
              <span>Businesses + Liquor Licenses for Sale</span>
              <strong>{props.city} observed opportunities</strong>
            </div>
            <div className="market-scope-package-summary">
              <span>{props.marketBusinesses.length} current package{props.marketBusinesses.length === 1 ? "" : "s"}</span>
              <small>{business4cop} 4COP Quota · {business3ps} 3PS · {businessSfs} SFS/SRX · {business2cop} 2COP</small>
            </div>

            {props.marketBusinesses.length ? (
              <div className="market-scope-business-list">
                {props.marketBusinesses.map((item) => (
                  <Link href={item.href} key={item.title} className="market-scope-business-row">
                    <div className="market-scope-business-copy">
                      <span className={`scope-category scope-category--${categoryClass(item.category)}`}>{item.category}</span>
                      <strong>{item.title}</strong>
                    </div>
                    <div className="market-scope-business-meta">
                      <span>{item.licenseType}</span>
                      <b>{item.price}</b>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="market-scope-empty">No qualifying city business-package Market Views are currently published.</p>
            )}
          </section>
        </div>

        <section className="market-scope-operating">
          <div className="market-scope-operating-head">
            <div>
              <span>Operating License Landscape</span>
              <h3>DBPR establishments + public-record entities</h3>
            </div>
            <p>
              This is where Market Scope will show active Saint Augustine license holders,
              4COP vs. 3PS counts, establishment names, business categories, DBPR licensees,
              matched Sunbiz entities and public square-foot records.
            </p>
          </div>

          <div className="market-scope-operating-columns">
            <article>
              <span>DBPR Active License Census</span>
              <strong>Public-record dataset being matched</strong>
              <p>Counts will be published only after city-level DBPR records are reconciled to the establishment address.</p>
            </article>
            <article>
              <span>Legal Entity + Premises Data</span>
              <strong>Sunbiz + public property records</strong>
              <p>Entity names, status and square footage will appear only where the public record can be matched reliably.</p>
            </article>
          </div>

          <div className="market-scope-table-head">
            <span>Establishment</span><span>Category</span><span>License</span><span>Legal Entity</span><span>Sq. Ft.</span>
          </div>
          <div className="market-scope-data-pending">Verified city operating-license records will populate here.</div>
        </section>
      </div>
    </section>
  );
}
