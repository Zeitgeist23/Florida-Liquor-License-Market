import Link from "next/link";
import MarketScopeEstablishmentTable from "@/components/MarketScopeEstablishmentTable";
import MarketScopeMetricLink from "@/components/MarketScopeMetricLink";
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
  standalone4copMedian: number | null;
  standalone3psMedian: number | null;
  standalone3psMedianIsProxy?: boolean;
  standaloneLow: number | null;
  standaloneMedian: number | null;
  standaloneHigh: number | null;
  marketBusinesses: MarketBusiness[];
  marketBusinessesVisible?: number;
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
  const visibleMarketBusinesses =
    typeof props.marketBusinessesVisible === "number"
      ? props.marketBusinesses.slice(0, props.marketBusinessesVisible)
      : props.marketBusinesses;
  const hiddenMarketBusinesses = props.marketBusinesses.length - visibleMarketBusinesses.length;
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
            <span>{props.county}</span>
            <h3>County License Market</h3>
            <ul>
              <li>
                <MarketScopeMetricLink ariaLabel={`Show all ${props.city} establishments`}>
                  <b>{props.dbpr.available ? props.dbpr.countyTotalRetailLicenses : "Refreshing"}</b> retail alcoholic-beverage licenses
                </MarketScopeMetricLink>
              </li>
              <li className="market-scope-metric-segments">
                <MarketScopeMetricLink licenseType="4COP Quota" ariaLabel={`Show ${props.city} 4COP quota establishments`}>
                  <b>{props.dbpr.available ? props.dbpr.county4copInEffect : "Refreshing"}</b> 4COP quota in effect
                </MarketScopeMetricLink>
                {props.dbpr.available ? (
                  <>
                    <span className="market-scope-metric-separator">·</span>
                    <MarketScopeMetricLink licenseType="4COP Quota" status="Active" ariaLabel={`Show active ${props.city} 4COP quota establishments`}>
                      <b>{props.dbpr.county4copInUse}</b> active
                    </MarketScopeMetricLink>
                    <span className="market-scope-metric-separator">·</span>
                    <MarketScopeMetricLink licenseType="4COP Quota" status="Inactive" ariaLabel={`Show inactive 4COP quota license records`}>
                      <b>{props.dbpr.county4copInactive}</b> inactive
                    </MarketScopeMetricLink>
                  </>
                ) : null}
              </li>
              <li className="market-scope-metric-segments">
                <MarketScopeMetricLink licenseType="3PS Quota" ariaLabel={`Show ${props.city} 3PS establishments`}>
                  <b>{props.dbpr.available ? props.dbpr.county3psInEffect : "Refreshing"}</b> 3PS quota in effect
                </MarketScopeMetricLink>
                {props.dbpr.available ? (
                  <>
                    <span className="market-scope-metric-separator">·</span>
                    <MarketScopeMetricLink licenseType="3PS Quota" status="Active" ariaLabel={`Show active ${props.city} 3PS establishments`}>
                      <b>{props.dbpr.county3psInUse}</b> active
                    </MarketScopeMetricLink>
                    <span className="market-scope-metric-separator">·</span>
                    <MarketScopeMetricLink licenseType="3PS Quota" status="Inactive" ariaLabel="Show inactive 3PS license records">
                      <b>{props.dbpr.county3psInactive}</b> inactive
                    </MarketScopeMetricLink>
                  </>
                ) : null}
              </li>
              <li>
                <a className="market-scope-metric-link" href="#current-for-sale-market">
                  <b>{props.standaloneCount}</b> standalone quota licenses currently for sale
                </a>
              </li>
            </ul>
          </article>

          <article className="market-scope-overview-card">
            <span>City of {props.city}</span>
            <h3>Operating License Landscape</h3>
            <ul>
              <li>
                <MarketScopeMetricLink ariaLabel={`Show all ${props.city} establishments`}>
                  <b>{props.dbpr.available ? props.dbpr.cityTotalRetailLicenses : "Refreshing"}</b> active licenses in the official city grouping
                </MarketScopeMetricLink>
              </li>
              <li>
                <MarketScopeMetricLink licenseType="4COP Quota" ariaLabel="Show active 4COP quota establishments">
                  <b>{props.dbpr.available ? props.dbpr.city4copInUse : "Refreshing"}</b> active 4COP quota establishments
                </MarketScopeMetricLink>
              </li>
              <li>
                <MarketScopeMetricLink licenseType="3PS Quota" ariaLabel="Show active 3PS establishments">
                  <b>{props.dbpr.available ? props.dbpr.city3psInUse : "Refreshing"}</b> active 3PS establishments
                </MarketScopeMetricLink>
              </li>
              <li>
                <MarketScopeMetricLink licenseType="4COP SFS / SRX" ariaLabel="Show active SFS/SRX establishments">
                  <b>{props.dbpr.available ? props.dbpr.citySfsInUse : "Refreshing"}</b> active SFS/SRX establishments
                </MarketScopeMetricLink>
              </li>
              <li>
                <MarketScopeMetricLink licenseType="2COP" ariaLabel="Show active 2COP establishments">
                  <b>{props.dbpr.available ? props.dbpr.city2copInUse : "Refreshing"}</b> active 2COP establishments
                </MarketScopeMetricLink>
              </li>
            </ul>
          </article>
        </section>

        <section className="market-scope-panel" id="current-for-sale-market">
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
              {visibleMarketBusinesses.map((item) => (
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
              {hiddenMarketBusinesses > 0 ? (
                <details className="market-scope-business-more">
                  <summary className="market-scope-business-row market-scope-business-row--more">
                    <div className="market-scope-business-copy">
                      <strong>View all {props.marketBusinesses.length} business + license packages</strong>
                    </div>
                    <div className="market-scope-business-meta">
                      <span>{hiddenMarketBusinesses} more</span>
                    </div>
                  </summary>
                  <div className="market-scope-business-more-list">
                    {props.marketBusinesses.slice(visibleMarketBusinesses.length).map((item) => (
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
                </details>
              ) : null}
            </div>
          ) : null}
        </section>

        <section className="market-scope-panel market-scope-panel--operating">
          <div className="market-scope-panel-heading">
            <div>
              <span>Operating Establishments</span>
              <h3>Verified alcoholic-beverage establishments</h3>
            </div>
            <p>Search and filter the full City of {props.city} operating-license dataset by business type, license type, DBA, legal entity or license number.</p>
          </div>

          <style>{`
            .market-scope-license-summary .market-scope-license-card{
              position:relative;
              overflow:hidden;
              border:1px solid rgba(124,230,255,.62) !important;
              background:
                linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,0) 34%),
                linear-gradient(145deg,#114b76 0%,#0b3557 58%,#071f35 100%) !important;
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.16),
                inset 0 -2px 0 rgba(0,0,0,.34),
                0 3px 0 rgba(2,12,22,.55),
                0 12px 24px rgba(0,0,0,.26) !important;
              transform:translateY(0) scale(1);
              transition:
                transform .18s ease,
                border-color .18s ease,
                box-shadow .18s ease,
                filter .18s ease,
                background .18s ease !important;
            }
            .market-scope-license-summary .market-scope-license-card::before{
              content:"";
              position:absolute;
              inset:0;
              pointer-events:none;
              opacity:.42;
              background:
                radial-gradient(circle at 50% 0%,rgba(124,230,255,.19),transparent 52%);
              transition:opacity .18s ease;
            }
            .market-scope-license-summary .market-scope-license-card:hover{
              transform:translateY(-5px) scale(1.035) !important;
              border-color:#8ff0ff !important;
              filter:brightness(1.16) saturate(1.08);
              background:
                linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,0) 36%),
                linear-gradient(145deg,#17618d 0%,#0e446b 58%,#092b48 100%) !important;
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,.22),
                inset 0 -2px 0 rgba(0,0,0,.28),
                0 4px 0 rgba(2,12,22,.5),
                0 18px 34px rgba(0,0,0,.32),
                0 0 30px rgba(105,214,255,.30) !important;
            }
            .market-scope-license-summary .market-scope-license-card:hover::before{
              opacity:.9;
            }
            .market-scope-license-summary .market-scope-license-card:hover span{
              color:#e0fbff !important;
              text-shadow:0 0 12px rgba(105,214,255,.65);
            }
            .market-scope-license-summary .market-scope-license-card:hover strong{
              color:#fff !important;
              text-shadow:0 0 12px rgba(255,255,255,.3);
            }
          `}</style>
          <MarketScopeEstablishmentTable
            rows={props.dbpr.cityEstablishments ?? props.dbpr.cityQuotaEstablishments}
            inactiveRows={props.dbpr.countyInactiveEstablishments ?? []}
            standaloneMarket={{
              county: props.county,
              totalCount: props.standaloneCount,
              overallMedian: props.standaloneMedian,
              fourCopCount: props.standalone4cop,
              fourCopMedian: props.standalone4copMedian,
              threePsCount: props.standalone3ps,
              threePsMedian: props.standalone3psMedian,
              threePsMedianIsProxy: props.standalone3psMedianIsProxy ?? false,
            }}
            summaryCounts={{
              fourCopQuota: props.dbpr.city4copInUse ?? 0,
              threePsQuota: props.dbpr.city3psInUse ?? 0,
              sfs: props.dbpr.citySfsInUse ?? 0,
              twoCop: props.dbpr.city2copInUse ?? 0,
            }}
          />
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
