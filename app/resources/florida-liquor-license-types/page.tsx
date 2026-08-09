import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./florida-liquor-license-types.css";

export const metadata: Metadata = {
  title: "Florida Liquor License Types: 4COP, 3PS & SRX | FLLM",
  description:
    "Compare Florida liquor license types including 4COP quota, 3PS package store, 2COP, 2APS and 4COP-SFS/SRX restaurant licenses.",
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
    category: "Quota liquor store / package sales",
    products: "Beer, wine, and liquor",
    sales: "Package sales for off-premises consumption.",
    availability: "County-limited quota license; series may appear as 3DPS, 3CPS, 3BPS, 3APS, or 3PS based on county population.",
    typicalUse: "Liquor stores and package stores, including stand-alone shops and dedicated liquor-store locations operated by qualifying retailers.",
    emphasized: true,
  },
  {
    series: "4COP family",
    category: "Quota bar / restaurant / nightclub",
    products: "Beer, wine, and liquor",
    sales: "By the drink or sealed containers for consumption on or off premises.",
    availability: "County-limited quota license; series may appear as 8COP, 7COP, 6COP, 5COP, or 4COP based on county population.",
    typicalUse: "Bars, taverns, cocktail lounges, nightclubs, full-liquor restaurants, and other approved hospitality venues.",
    emphasized: true,
  },
];

const specialtyLicenses = [
  {
    series: "4COP-SFS / SRX",
    name: "Special Restaurant License",
    description:
      "Full beer, wine, and liquor service for a qualifying restaurant. DBPR's current guidance requires at least 51% of gross food-and-beverage revenue from food and nonalcoholic beverages, together with other restaurant qualifications. It is tied to the qualifying restaurant and is not a general quota license.",
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

const frequentlyAskedQuestions = [
  {
    question: "What is the difference between a 4COP quota license and a 3PS license?",
    answer:
      "A 4COP quota license is commonly used by bars, taverns, cocktail lounges, nightclubs, and full-liquor restaurants, and permits beer, wine, and liquor sales by the drink and in sealed containers within its approved privileges. A 3PS-family quota license is a liquor-store or package-store license for sealed sales consumed away from the licensed premises.",
  },
  {
    question: "Is a 2COP license a quota license?",
    answer:
      "No. A 2COP is a non-quota beer-and-wine license. It can permit sales by the drink and in sealed containers for consumption on or off premises, subject to DBPR approval and applicable local requirements.",
  },
  {
    question: "What is an SRX or 4COP-SFS restaurant license?",
    answer:
      "It is a qualification-based full-liquor license for an eligible restaurant. It is an exception to the county quota system, but the restaurant must continuously satisfy DBPR's food-revenue and other operating requirements.",
  },
  {
    question: "Can a Florida quota liquor license be moved to another county?",
    answer:
      "Florida quota licenses are county-specific. A proposed transfer, relocation, or change in ownership requires DBPR review, and buyers should confirm the exact license status and permitted transaction before closing.",
  },
];

export default function FloridaLiquorLicenseTypesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Types of Florida Liquor Licenses",
    description:
      "A practical FLLM comparison of common Florida alcoholic-beverage license types and specialty license categories.",
    dateModified: "2026-08-09",
    author: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: frequentlyAskedQuestions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <main className="license-types-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
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
            <a className="btn btn-outline" href="/listings">Browse Available Licenses</a>
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

      <section className="license-types-population-rule page-shell" aria-labelledby="population-rule-title">
        <div className="license-types-population-number" aria-label="One quota license for every 7,500 county residents">
          <strong>1</strong>
          <span>quota license for each</span>
          <b>7,500</b>
          <span>county residents</span>
        </div>
        <div>
          <span className="license-types-rule-eyebrow">Florida’s statutory quota formula</span>
          <h2 id="population-rule-title">Why 4COP and 3PS quota licenses are limited in number</h2>
          <p>
            Florida Statute §561.20(1) limits the number of quota alcoholic-beverage licenses within
            each county to no more than <strong>one license for every 7,500 residents</strong>. New
            quota-license availability is generally created when the county population increases by
            another 7,500 residents, using the population estimates specified by Florida law.
          </p>
          <p>
            Because the supply is restricted by county population, existing quota licenses can be
            bought and sold in the private market, subject to DBPR approval and applicable transfer,
            location, ownership, and compliance requirements.
          </p>
          <a href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&amp;Search_String=61.30&amp;SubMenu=1&amp;URL=0500-0599%2F0561%2FSections%2F0561.20.html&amp;mode=View+Statutes" target="_blank" rel="noreferrer">
            Read Florida Statute §561.20 ↗
          </a>
        </div>
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
          <span>What businesses use these licenses?</span>
          <h2 id="quota-explainer-title">4COP and 3PS serve different business models</h2>
          <p>
            Both are full-liquor quota licenses, but a 4COP is commonly used for on-premises service,
            while a 3PS is the familiar Florida liquor-store or package-store license.
          </p>
        </div>
        <div className="license-types-quota-cards">
          <article>
            <b>4COP quota</b>
            <span>Bars · taverns · restaurants · nightclubs</span>
            <p>Common business uses include:</p>
            <ul>
              <li>Bars and cocktail lounges</li>
              <li>Taverns and pubs</li>
              <li>Nightclubs and dance clubs</li>
              <li>Full-liquor restaurants</li>
              <li>Other approved hospitality or entertainment venues</li>
            </ul>
            <small>Permits beer, wine, and spirits by the drink and sealed-container sales within the approved license privileges.</small>
          </article>
          <article>
            <b>3PS quota</b>
            <span>Liquor store · package store</span>
            <p>Common business uses include:</p>
            <ul>
              <li>Stand-alone liquor stores</li>
              <li>Package stores</li>
              <li>Dedicated liquor-store locations operated by qualifying retailers</li>
              <li>Other approved full-liquor retail package outlets</li>
            </ul>
            <small>Permits sealed beer, wine, and spirits for off-premises consumption; it does not authorize on-premises drinking.</small>
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

      <section className="license-types-faq page-shell" aria-labelledby="license-types-faq-title">
        <div className="license-types-section-heading">
          <div>
            <span>Buyer and operator questions</span>
            <h2 id="license-types-faq-title">Florida liquor license FAQs</h2>
          </div>
          <p>
            These answers explain the most common distinctions. The exact license, premises, county,
            ownership, and proposed use must still be reviewed before a transaction or application.
          </p>
        </div>
        <div className="license-types-faq-grid">
          {frequentlyAskedQuestions.map(({ question, answer }) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="license-types-market-cta page-shell" aria-label="Florida liquor license marketplace">
        <div>
          <span>Ready to use the guide?</span>
          <h2>Find the right Florida liquor license opportunity</h2>
          <p>Browse current quota-license listings or submit a license for confidential marketplace exposure.</p>
        </div>
        <div>
          <a className="btn btn-gold" href="/listings">Browse Licenses</a>
          <a className="btn btn-outline" href="/sell-your-license">List Your License</a>
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
          <a href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&amp;Search_String=61.30&amp;SubMenu=1&amp;URL=0500-0599%2F0561%2FSections%2F0561.20.html&amp;mode=View+Statutes" target="_blank" rel="noreferrer">
            Florida Statute §561.20 — Quota Limit ↗
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
        <small>Official DBPR license materials reviewed August 9, 2026.</small>
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

