import Link from "next/link";
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
            Market Scope measures the size and structure of the local alcoholic-beverage market:
            licenses in effect, licenses in use, quota-license utilization, operating establishments,
            public-record legal entities and current licenses or businesses advertised for sale.
          </p>
        </header>

        <section className="market-scope-glance" aria-label="Market Scope at a Glance">
          <div className="market-scope-section-heading">
            <span>Market Scope at a Glance</span>
            <h3>Saint Augustine + St. Johns County headline figures</h3>
          </div>
          <div className="market-scope-glance-grid">
            <p><b>{props.dbpr.countyTotalRetailLicenses ?? "—"}</b> St. Johns County retail alcoholic-beverage licenses</p>
            <p><b>{props.dbpr.county4copInEffect ?? "—"}</b> 4COP quota licenses in effect</p>
            <p><b>{props.dbpr.county4copInUse ?? "—"}</b> active / in use</p>
            <p><b>{props.dbpr.county4copInactive ?? "—"}</b> inactive</p>
            <p><b>{props.dbpr.county3psInEffect ?? "—"}</b> 3PS quota licenses in effect</p>
            <p><b>{props.dbpr.county3psInUse ?? "—"}</b> active / in use</p>
            <p><b>{props.dbpr.county3psInactive ?? "—"}</b> inactive</p>
            <p><b>{props.dbpr.cityTotalRetailLicenses ?? "—"}</b> active licenses in the official City of St. Augustine grouping</p>
            <p><b>{props.dbpr.city4copInUse ?? "—"}</b> active Saint Augustine 4COP quota establishments</p>
            <p><b>{props.dbpr.city3psInUse ?? "—"}</b> active Saint Augustine 3PS establishments</p>
            <p><b>{props.dbpr.citySfsInUse ?? "—"}</b> active SFS/SRX establishments</p>
            <p><b>{props.dbpr.city2copInUse ?? "—"}</b> active 2COP establishments</p>
          </div>
        </section>

        <section className="market-scope-primary">
          <div className="market-scope-section-heading">
            <span>License Census + Utilization</span>
            <h3>How large is the local liquor-license market?</h3>
            <p>
              DBPR census data belongs first. Market Scope will distinguish licenses in effect from licenses
              actively in use and from licenses currently advertised for sale.
            </p>
          </div>

          <div className="market-scope-census-grid">
            <article><span>Total alcoholic-beverage licenses</span><strong>{props.dbpr.countyTotalRetailLicenses ?? "—"}</strong><small>{props.county} retail licenses in DBPR extract</small></article>
            <article><span>4COP Quota — in effect</span><strong>{props.dbpr.county4copInEffect ?? "—"}</strong><small>Total county quota series</small></article>
            <article><span>4COP Quota — in use</span><strong>{props.dbpr.county4copInUse ?? "—"}</strong><small>DBPR secondary status Active</small></article>
            <article><span>4COP Quota — for sale</span><strong>{props.standalone4cop}</strong><small>Current FLLM standalone inventory</small></article>
            <article><span>3PS Quota — in effect</span><strong>{props.dbpr.county3psInEffect ?? "—"}</strong><small>Total county quota series</small></article>
            <article><span>3PS Quota — in use</span><strong>{props.dbpr.county3psInUse ?? "—"}</strong><small>DBPR secondary status Active</small></article>
            <article><span>3PS Quota — for sale</span><strong>{props.standalone3ps}</strong><small>Current FLLM standalone inventory</small></article>
            <article><span>Saint Augustine active retail licenses</span><strong>{props.dbpr.cityTotalRetailLicenses ?? "—"}</strong><small>DBPR city-location records</small></article>
          </div>

          <p className="market-scope-verification-note">
            DBPR census values come from the Division&apos;s retail alcoholic-beverage license extract. “In use” means the DBPR
            secondary status is Active. “For sale” is separate FLLM marketplace inventory and is not inferred from DBPR status.
          </p>
        </section>

        <section className="market-scope-operating">
          <div className="market-scope-operating-head">
            <div>
              <span>Operating Establishments</span>
              <h3>{props.city} businesses using liquor licenses</h3>
            </div>
            <p>
              This table is reserved for verified operating establishments, not businesses merely advertised for sale.
              It will show the establishment, category, license series, DBPR licensee, matched Sunbiz entity and public-record premises size.
            </p>
          </div>

          <div className="market-scope-license-summary">
            <article><span>4COP Quota operating establishments</span><strong>{props.dbpr.city4copInUse ?? "—"}</strong></article>
            <article><span>3PS Quota operating establishments</span><strong>{props.dbpr.city3psInUse ?? "—"}</strong></article>
            <article><span>4COP SFS / SRX establishments</span><strong>{props.dbpr.citySfsInUse ?? "—"}</strong></article>
            <article><span>2COP establishments</span><strong>{props.dbpr.city2copInUse ?? "—"}</strong></article>
          </div>

          <div className="market-scope-table-head">
            <span>Establishment</span>
            <span>Category</span>
            <span>License</span>
            <span>DBPR Licensee / Public-Record Entity</span>
            <span>Sq. Ft.</span>
          </div>
          {props.dbpr.cityQuotaEstablishments.length ? (
            <div className="market-scope-table-body">
              {props.dbpr.cityQuotaEstablishments.map((row) => (
                <div className="market-scope-table-row" key={row.licenseNumber}>
                  <div><strong>{row.dba}</strong><small>{row.address}{row.zip ? ` · ${row.zip}` : ""}</small></div>
                  <div><span className={"scope-category scope-category--" + categoryClass(row.category)}>{row.category}</span></div>
                  <div><strong>{row.series}</strong><small>{row.licenseNumber}</small></div>
                  <div><strong>{row.licensee}</strong><small>DBPR licensee / owner-primary name</small></div>
                  <div><strong>—</strong><small>Public property match pending</small></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="market-scope-data-pending">DBPR city quota-license records are temporarily unavailable.</div>
          )}
        </section>

        <section className="market-scope-sale-market">
          <div className="market-scope-section-heading">
            <span>Current For-Sale Market</span>
            <h3>Standalone licenses and business + license packages</h3>
          </div>

          <div className="market-scope-sale-grid">
            <article><span>Standalone quota licenses for sale</span><strong>{props.standaloneCount}</strong><small>{props.standalone4cop} 4COP · {props.standalone3ps} 3PS</small></article>
            <article><span>Standalone low ask</span><strong>{money(props.standaloneLow)}</strong></article>
            <article><span>Standalone median ask</span><strong>{money(props.standaloneMedian)}</strong></article>
            <article><span>Standalone high ask</span><strong>{money(props.standaloneHigh)}</strong></article>
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

        <section className="market-scope-secondary">
          <div className="market-scope-section-heading">
            <span>Demographics + Future Supply</span>
            <h3>Population and quota-license supply context</h3>
          </div>
          <div className="market-scope-secondary-grid">
            <article><span>{props.county} population</span><strong>{number(props.countyPopulation)}</strong><small>2024 Census estimate</small></article>
            <article><span>{props.city} population</span><strong>{number(props.cityPopulation)}</strong><small>{props.cityPopulationYear} Census estimate</small></article>
            <article><span>Projected county growth</span><strong>{props.projectedGrowthRate.toFixed(1)}%</strong><small>2025–2030 modeled growth</small></article>
            <article><span>Projected 2027 population</span><strong>{number(props.projected2027Population)}</strong><small>FLLM interpolation</small></article>
            <article><span>2026 quota drawing</span><strong>{props.lottery2026}</strong><small>DBPR announced new quota licenses</small></article>
            <article className="forecast"><span>FLLM 2027 quota forecast</span><strong>≈ {props.forecast2027}</strong><small>Forecast only; actual DBPR allocation may differ</small></article>
          </div>
          <p className="market-scope-source-note">2026 drawing data verified {props.lotteryVerified}. Lottery data is supporting supply context, not the primary Market Scope metric.</p>
        </section>
      </div>
    </section>
  );
}
