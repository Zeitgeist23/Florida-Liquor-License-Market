import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./florida-liquor-license-types.css";

export const metadata: Metadata = {
  title: "Types of Florida Liquor Licenses | FLLM",
  description:
    "Compare Florida alcoholic-beverage license types including 1APS, 2APS, 1COP, 2COP, 3PS package-store quota licenses, 4COP quota licenses, and specialty licenses.",
  alternates: {
    canonical: "https://www.floridaliquorlicensemarket.com/resources/florida-liquor-license-types",
  },
};

const commonLicenses = [
  {
    series: "1APS",
    category: "Package sales",
    products: "Beer",
    sales: "Sealed containers for off-premises consumption only.",
    availability: "Non-quota; annual fee varies by county population.",
    typicalUse: "Convenience stores and other qualifying retailers selling beer to go.",
  },
  {
    series: "2APS",
    category: "Package sales",
    products: "Beer and wine",
    sales: "Sealed containers for off-premises consumption only.",
    availability: "Non-quota; annual fee varies by county population.",
    typicalUse: "Grocery, convenience, specialty food, and wine retailers.",
  },
  {
    series: "1COP",
    category: "Consumption on premises",
    products: "Beer",
    sales: "By the drink or sealed containers for consumption on or off premises.",
    availability: "Non-quota; annual fee varies by county population.",
    typicalUse: "Beer-focused bars, taprooms, and qualifying food-service businesses.",
  },
  {
    series: "2COP",
    category: "Consumption on premises",
    products: "Beer and wine",
    sales: "By the drink or sealed containers for consumption on or off premises.",
    availability: "Non-quota; annual fee varies by county population.",
    typicalUse: "Restaurants, wine bars, cafés, and beer-and-wine venues.",
  },
  {
    series: "3PS family",
    category: "Quota package store",
    products: "Beer, wine, and liquor",
    sales: "Package sales for off-premises consumption.",
    availability: "County-limited quota license; series may appear as 3DPS, 3CPS, 3BPS, 3APS, or 3PS based on county population.",
    typicalUse: "Full-liquor package stores. Transfers require DBPR approval and must satisfy applicable law.",
    emphasized: true,
  },
  {
    series: "4COP family",
    category: "Quota consumption",
    products: "Beer, wine, and liquor",
    sales: "By the drink or sealed containers for consumption on or off premises.",
    availability: "County-limited quota license; series may appear as 8COP, 7COP, 6COP, 5COP, or 4COP based on county population.",
    typicalUse: "Bars, restaurants, nightclubs, and other full-liquor venues. Transfers require DBPR approval and applicable compliance.",
    emphasized: true,
  },
];

const specialtyLicenses = [
  {
    series: "SFS",
    name: "Special Food Service",
    description:
      "Full beer, wine, and liquor service for a qualifying restaurant. DBPR's current summary lists minimum service-area, seating, meal-service, and food/nonalcoholic-revenue requirements. It is tied to the qualifying restaurant and is not a general quota license.",
  },
  {
    series: "13CT",
    name: "Caterer",
    description:
      "Beer, wine, and liquor by the drink at catered events where the licensed caterer also provides prepared food. Event-level food and nonalcoholic-revenue requirements apply.",
  },
  {
    series: "S / SH / SHQM",
    name: "Special Hotel or Motel",
    description:
      "Full alcoholic-beverage privileges for qualifying lodging establishments. Room, revenue, historic-property, ownership, location, and renewal conditions depend on the particular class.",
  },
  {
    series: "SBX and related classes",
    name: "Bowling, Civic, Airport and Facility Licenses",
    description:
      "Special full-liquor licenses available only to qualifying facilities such as bowling alleys, civic centers, airport lounges, and certain other statutorily authorized locations.",
  },
  {
    series: "11C / 11CG and related classes",
    name: "Club Licenses",
    description:
      "Full alcoholic-beverage privileges for qualifying clubs, lodges, veterans' organizations, golf clubs, and similar organizations, generally for members and eligible guests under the applicable class requirements.",
  },
  {
    series: "EVNT / 11PA and related classes",
    name: "Event and Performing-Arts Facilities",
    description:
      "Licenses for qualifying event centers, theaters, performing-arts organizations, fairs, and expositions. Privileges and operating restrictions depend on the facility and statutory class.",
  },
  {
    series: "ODP / SSL",
    name: "Temporary or Special Sales Permits",
    description:
      "Short-duration permissions for eligible nonprofit, civic, charitable, municipal, county, or other qualifying events. These are permits rather than general transferable retail licenses.",
  },
  {
    series: "AMW / CMB / DD / DD(CD)",
    name: "Manufacturing Licenses",
    description:
      "Authorize qualifying wine, malt-beverage, distilled-spirit, or craft-distillery production. Wholesale distribution and direct consumer privileges depend on the exact class and statute.",
  },
  {
    series: "KLD / JDBW / IMPR and related classes",
    name: "Distributor and Importer Licenses",
    description:
      "Authorize qualifying wholesale distribution or importation within Florida's regulated three-tier system. These are supply-chain licenses rather than consumer-facing retail licenses.",
  },
];

export default function FloridaLiquorLicenseTypesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Types of Florida Liquor Licenses",
    description:
      "A practical FLLM comparison of common Florida alcoholic-beverage license types and specialty license categories.",
    dateModified: "2026-08-01",
    author: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
    },
  };

  return (
    <main className="license-types-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="license-types-hero">
        <div className="page-shell">
          <nav className="license-types-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <a href="/resources/forms">Resources</a>
            <span>›</span>
            <b>Types of Florida Liquor Licenses</b>
          </nav>
          <span className="license-types-eyebrow">FLLM licensing reference</span>
          <h1>Types of Florida Liquor Licenses</h1>
          <p>
            Compare the products each license covers, whether sales may occur on or off premises,
            and the important difference between quota licenses and qualification-based specialty
            licenses.
          </p>
          <div className="license-types-hero-actions">
            <a className="btn btn-gold" href="#common-license-chart">View License Chart</a>
            <a className="btn btn-outline" href="#specialty-license-chart">View Specialty Types</a>
          </div>
        </div>
      </section>

      <section className="license-types-intro page-shell" aria-labelledby="license-types-intro-title">
        <div>
          <span>Start with the license privilege</span>
          <h2 id="license-types-intro-title">The series code tells only part of the story</h2>
        </div>
        <p>
          A license must fit the alcoholic beverages sold, where customers will consume them, the
          business or facility operating the premises, and the county. DBPR approval is required,
          and local zoning or other agency approvals may also apply.
        </p>
      </section>

      <section className="license-types-key page-shell" aria-label="Key license distinctions">
        <article>
          <span>APS</span>
          <div>
            <h2>Package sales</h2>
            <p>Sealed alcoholic beverages sold for consumption away from the licensed premises.</p>
          </div>
        </article>
        <article>
          <span>COP</span>
          <div>
            <h2>Consumption on premises</h2>
            <p>Alcoholic beverages sold by the drink, with privileges determined by the series.</p>
          </div>
        </article>
        <article>
          <span>Quota</span>
          <div>
            <h2>County-limited full liquor</h2>
            <p>Full-liquor licenses limited by Florida’s county quota system and transferable only with approval.</p>
          </div>
        </article>
      </section>

      <section className="license-types-section page-shell" id="common-license-chart" aria-labelledby="common-license-title">
        <div className="license-types-section-heading">
          <div>
            <span>Common retail vendor licenses</span>
            <h2 id="common-license-title">Florida retail license comparison</h2>
          </div>
          <p>
            The quota series number changes with the population band used in DBPR’s current chart.
            “4COP” and “3PS” are the familiar names used in the largest population band.
          </p>
        </div>

        <div className="license-types-table-wrap">
          <table className="license-types-table">
            <thead>
              <tr>
                <th scope="col">Series</th>
                <th scope="col">Category</th>
                <th scope="col">Products</th>
                <th scope="col">Permitted sales</th>
                <th scope="col">Availability</th>
                <th scope="col">Common use</th>
              </tr>
            </thead>
            <tbody>
              {commonLicenses.map((license) => (
                <tr className={license.emphasized ? "is-quota" : undefined} key={license.series}>
                  <th scope="row"><span>{license.series}</span></th>
                  <td>{license.category}</td>
                  <td>{license.products}</td>
                  <td>{license.sales}</td>
                  <td>{license.availability}</td>
                  <td>{license.typicalUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="license-types-quota page-shell" aria-labelledby="quota-explainer-title">
        <div>
          <span>Why 3PS and 4COP receive special attention</span>
          <h2 id="quota-explainer-title">Quota licenses can carry separate market value</h2>
          <p>
            Florida limits quota beverage licenses by county. Because new availability is restricted,
            existing quota licenses are commonly bought and sold in private transactions, subject to
            DBPR approval, county limitations, statutory restrictions, and the condition of the license.
          </p>
        </div>
        <div className="license-types-quota-cards">
          <article>
            <b>3PS family</b>
            <span>Full liquor · package sales</span>
            <p>Designed for sealed-container sales for consumption away from the licensed premises.</p>
          </article>
          <article>
            <b>4COP family</b>
            <span>Full liquor · on and off premises</span>
            <p>Allows by-the-drink service and sealed-container sales within the license privileges.</p>
          </article>
        </div>
      </section>

      <section className="license-types-section page-shell" id="specialty-license-chart" aria-labelledby="specialty-license-title">
        <div className="license-types-section-heading">
          <div>
            <span>Qualification-based and industry licenses</span>
            <h2 id="specialty-license-title">Specialty license categories</h2>
          </div>
          <p>
            Specialty licenses depend on the operator, premises, facility, revenue mix, event, or
            industry role. They should not be treated as interchangeable with a general quota license.
          </p>
        </div>

        <div className="specialty-license-grid">
          {specialtyLicenses.map((license) => (
            <article key={license.series}>
              <span>{license.series}</span>
              <h3>{license.name}</h3>
              <p>{license.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="license-types-sources page-shell" aria-labelledby="license-types-sources-title">
        <div>
          <span>Official reference</span>
          <h2 id="license-types-sources-title">Confirm the exact class before applying or transferring</h2>
          <p>
            License privileges and eligibility can turn on facts not shown in this overview. Use the
            current DBPR materials and obtain qualified professional guidance for a particular premises
            or transaction.
          </p>
        </div>
        <div className="license-types-source-links">
          <a href="https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf" target="_blank" rel="noreferrer">
            Official DBPR License Types ↗
          </a>
          <a href="https://www2.myfloridalicense.com/abt/rules_statutes/fee_chart.pdf" target="_blank" rel="noreferrer">
            Official DBPR Fee Chart ↗
          </a>
          <a href="/resources/forms">Florida ABT Forms →</a>
          <a href="/license-lookup">Florida Liquor License Lookup →</a>
        </div>
      </section>

      <section className="license-types-disclosure page-shell" aria-label="License types disclaimer">
        <strong>Educational overview—not a licensing determination</strong>
        <p>
          This FLLM chart summarizes selected Florida alcoholic-beverage license categories for general
          educational use. It does not determine eligibility, transferability, zoning compliance, license
          status, permitted conduct, or the approvals required for a particular business. Series labels,
          fees, qualifications, and restrictions can change. Confirm current requirements directly with
          the Florida Division of Alcoholic Beverages and Tobacco and qualified legal, licensing, tax, and
          transaction professionals before relying on a classification.
        </p>
        <small>Official DBPR license materials reviewed August 1, 2026.</small>
      </section>

      <footer className="abt-forms-footer">
        <div className="page-shell">
          <img src="/assets/brand-footer.svg" alt="Florida Liquor License Market" />
          <span>Florida’s marketplace for buying, selling and financing liquor licenses.</span>
          <a href="/">Return to Florida Liquor License Market</a>
        </div>
      </footer>
    </main>
  );
}

