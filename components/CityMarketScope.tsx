import Link from "next/link";
import MarketScopeEstablishmentTable from "@/components/MarketScopeEstablishmentTable";
import type { CityDbprMarketScope } from "@/lib/city-market-scope-dbpr";

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
  dbpr: CityDbprMarketScope;
};

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
  const business4cop = props.marketBusinesses.filter((item) => item.licenseType === "4COP Quota").length;
  const business3ps = props.marketBusinesses.filter((item) => item.licenseType.includes("3PS")).length;
  const businessSfs = props.marketBusinesses.filter((item) => item.licenseType.includes("SFS")).length;
  const business2cop = props.marketBusinesses.filter((item) => item.licenseType.includes("2COP")).length;
  return (
    <section className="market-scope" aria-labelledby="market-scope-title">
      <div className="market-scope-shell">
        <header className="market-scope-heading">
          <span>Market Scope</span>
          <h2 id="market-scope-title">{props.city} / {props.county}</h2>
          <p>
            A concise view of local license supply, operating establishments, current for-sale inventory,
            public-record entities and demographic context.
          </p>
        </header>

        <section className="market-scope-overview">
          <article className="market-scope-overview-card">
            <span>St. Johns County</span>
            <h3>County License Market</h3>
            <ul>
              <li><b>{props.dbpr.countyTotalRetailLicenses ?? "—"}</b> retail alcoholic-beverage licenses</li>
              <li><b>{props.dbpr.county4copInEffect ?? "—"}</b> 4COP quota in effect · <b>{props.dbpr.county4copInUse ?? "—"}</b> active · <b>{props.dbpr.county4copInactive ?? "—"}</b> inactive</li>
              <li><b>{props.dbpr.county3psInEffect ?? "—"}</b> 3PS quota in effect · <b>{props.dbpr.county3psInUse ?? "—"}</b> active · <b>{props.dbpr.county3psInactive ?? "—"}</b> inactive</li>
              <li><b>{props.standaloneCount}</b> standalone quota licenses currently for sale</li>
            </ul>
          </article>

          <article className="market-scope-overview-card">
            <span>City of St. Augustine</span>
            <h3>Operating License Landscape</h3>
            <ul>
              <li><b>{props.dbpr.cityTotalRetailLicenses ?? "—"}</b> active licenses in the official city grouping</li>
              <li><b>{props.dbpr.city4copInUse ?? "—"}</b> active 4COP quota establishments</li>
              <li><b>{props.dbpr.city3psInUse ?? "—"}</b> active 3PS establishments</li>
              <li><b>{props.dbpr.citySfsInUse ?? "—"}</b> active SFS/SRX establishments</li>
              <li><b>{props.dbpr.city2copInUse ?? "—"}</b> active 2COP establishments</li>
            </ul>
          </article>
        </section>

        <section className="market-scope-panel">
          <div className="market-scope-panel-heading">
            <div>
              <span>Current For-Sale Market</span>
              <h3>What is actually on the market now?</h3>
            </div>
            <p>Marketplace inventory is kept separate from the DBPR operating-license census.</p>
          </div>

          <div className="market-scope-stat-grid">
            <article><span>Standalone quota licenses</span><strong>{props.standaloneCount}</strong><small>{props.standalone4cop} 4COP · {props.standalone3ps} 3PS</small></article>
            <article><span>Low ask</span><strong>{money(props.standaloneLow)}</strong></article>
            <article><span>Median ask</span><strong>{money(props.standaloneMedian)}</strong></article>
            <article><span>High ask</span><strong>{money(props.standaloneHigh)}</strong></article>
            <article><span>Business + license packages</span><strong>{props.marketBusinesses.length}</strong><small>{business4cop} 4COP · {business3ps} 3PS · {businessSfs} SFS/SRX · {business2cop} 2COP</small></article>
          </div>

          {props.marketBusinesses.length ? (
            <div className="market-scope-business-list">
              {props.marketBusinesses.map((item) => (
                <Link href={item.href} key={item.title} className="market-scope-business-row">
                  <div className="market-scope-business-copy">
                    <span className={"scope-category scope-category--" + categoryClass(item.category)}>{item.category}</span>
                    <strong>{item.title}</strong>
                  </div>
                  <div className="market-scope-business-meta">
                    <span>{item.licenseType}</span>
                    <b>{item.price}</b>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        <section className="market-scope-panel">
          <div className="market-scope-panel-heading">
            <div>
              <span>Operating Establishments</span>
              <h3>Verified quota-license establishments</h3>
            </div>
            <p>Showing the first 10 records by default. Expand the table only when you want the full list.</p>
          </div>

          <div className="market-scope-license-summary">
            <article><span>4COP Quota</span><strong>{props.dbpr.city4copInUse ?? "—"}</strong></article>
            <article><span>3PS Quota</span><strong>{props.dbpr.city3psInUse ?? "—"}</strong></article>
            <article><span>4COP SFS / SRX</span><strong>{props.dbpr.citySfsInUse ?? "—"}</strong></article>
            <article><span>2COP</span><strong>{props.dbpr.city2copInUse ?? "—"}</strong></article>
          </div>

          <MarketScopeEstablishmentTable rows={props.dbpr.cityQuotaEstablishments} />
        </section>

        <section className="market-scope-panel market-scope-context">
          <div className="market-scope-panel-heading">
            <div>
              <span>Population + Future Supply</span>
              <h3>Growth context</h3>
            </div>
            <p>Supporting context only; the core Market Scope remains license supply and current market activity.</p>
          </div>
          <div className="market-scope-stat-grid market-scope-stat-grid--six">
            <article><span>County population</span><strong>{number(props.countyPopulation)}</strong><small>2024 Census estimate</small></article>
            <article><span>City population</span><strong>{number(props.cityPopulation)}</strong><small>{props.cityPopulationYear} Census estimate</small></article>
            <article><span>Projected growth</span><strong>{props.projectedGrowthRate.toFixed(1)}%</strong><small>2025–2030</small></article>
            <article><span>Projected 2027 population</span><strong>{number(props.projected2027Population)}</strong></article>
            <article><span>2026 quota drawing</span><strong>{props.lottery2026}</strong></article>
            <article className="forecast"><span>FLLM 2027 forecast</span><strong>≈ {props.forecast2027}</strong></article>
          </div>
          <p className="market-scope-note">2026 drawing data verified {props.lotteryVerified}. The 2027 figure is an FLLM forecast, not an announced DBPR allocation.</p>
        </section>
      </div>
    </section>
  );
}
