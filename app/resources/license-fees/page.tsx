import type { Metadata } from "next";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../forms/abt-forms.css";
import "./license-fees.css";

export const metadata: Metadata = {
  title: "Florida Liquor License Annual Fees | FLLM",
  description:
    "View Florida ABT annual and half-year alcoholic-beverage license fees by license type and county population, effective October 1, 2025.",
};

type PopulationFee = {
  band: string;
  counties: string[];
  fees: Array<{ type: string; fullYear: string; halfYear: string }>;
};

const populationFees: PopulationFee[] = [
  {
    band: "Population over 100,000",
    counties: [
      "Alachua*", "Bay*", "Brevard", "Broward", "Charlotte", "Citrus*", "Clay*", "Collier",
      "Dade", "Duval*", "Escambia*", "Flagler", "Hernando*", "Highlands", "Hillsborough*",
      "Indian River", "Lake*", "Lee", "Leon*", "Manatee", "Marion*", "Martin", "Nassau*",
      "Okaloosa*", "Orange*", "Osceola*", "Palm Beach", "Pasco*", "Pinellas*", "Polk",
      "St. Johns*", "St. Lucie", "Santa Rosa*", "Sarasota", "Seminole*", "Sumter*", "Volusia",
    ],
    fees: [
      { type: "1APS", fullYear: "$140", halfYear: "$70" },
      { type: "1COP", fullYear: "$280", halfYear: "$140" },
      { type: "2APS", fullYear: "$196", halfYear: "$98" },
      { type: "2COP", fullYear: "$392", halfYear: "$196" },
      { type: "4COP", fullYear: "$1,820", halfYear: "$910" },
      { type: "3PS", fullYear: "$1,365", halfYear: "$682.50" },
    ],
  },
  {
    band: "Population over 75,000 and not over 100,000",
    counties: ["Monroe", "Putnam*", "Walton*"],
    fees: [
      { type: "1APS", fullYear: "$112", halfYear: "$56" },
      { type: "1COP", fullYear: "$224", halfYear: "$112" },
      { type: "2APS", fullYear: "$168", halfYear: "$84" },
      { type: "2COP", fullYear: "$336", halfYear: "$168" },
      { type: "5COP", fullYear: "$1,560", halfYear: "$780" },
      { type: "3APS", fullYear: "$1,170", halfYear: "$585" },
    ],
  },
  {
    band: "Population over 50,000 and not over 75,000",
    counties: ["Columbia*"],
    fees: [
      { type: "1APS", fullYear: "$84", halfYear: "$42" },
      { type: "1COP", fullYear: "$168", halfYear: "$84" },
      { type: "2APS", fullYear: "$140", halfYear: "$70" },
      { type: "2COP", fullYear: "$280", halfYear: "$140" },
      { type: "6COP", fullYear: "$1,300", halfYear: "$650" },
      { type: "3BPS", fullYear: "$975", halfYear: "$487.50" },
    ],
  },
  {
    band: "Population of 25,000 and not over 50,000",
    counties: [
      "Baker*", "Bradford*", "DeSoto", "Gadsden*", "Hardee", "Hendry", "Jackson*", "Levy*",
      "Okeechobee", "Suwannee*", "Wakulla*", "Washington*",
    ],
    fees: [
      { type: "1APS", fullYear: "$56", halfYear: "$28" },
      { type: "1COP", fullYear: "$112", halfYear: "$56" },
      { type: "2APS", fullYear: "$112", halfYear: "$56" },
      { type: "2COP", fullYear: "$224", halfYear: "$112" },
      { type: "7COP", fullYear: "$858", halfYear: "$429" },
      { type: "3CPS", fullYear: "$643.50", halfYear: "$321.75" },
    ],
  },
  {
    band: "Population less than 25,000",
    counties: [
      "Calhoun*", "Dixie*", "Franklin*", "Gilchrist*", "Glades", "Gulf*", "Hamilton*",
      "Holmes*", "Jefferson*", "Lafayette*", "Liberty*", "Madison*", "Taylor*", "Union*",
    ],
    fees: [
      { type: "1APS", fullYear: "$28", halfYear: "$14" },
      { type: "1COP", fullYear: "$56", halfYear: "$28" },
      { type: "2APS", fullYear: "$84", halfYear: "$42" },
      { type: "2COP", fullYear: "$168", halfYear: "$84" },
      { type: "8COP", fullYear: "$624", halfYear: "$312" },
      { type: "3DPS", fullYear: "$468", halfYear: "$234" },
    ],
  },
];

const otherFees = [
  ["KLD", "$4,000"], ["ERB", "$4,000"], ["3M", "$1,000"], ["11C, CG", "$400"],
  ["11PA(s)", "$400"], ["14BC", "$500"], ["CIMP", "$100"], ["JDBW", "$1,250"],
  ["CMB", "$3,000"], ["3M (Theme Park)", "$1,500 / $2,500 / $3,500"], ["11CX", "$100"],
  ["GC", "$100"], ["SCX", "$250"], ["CWD/EXP", "$100"], ["AMW", "$1,000"],
  ["CMBP", "$500"], ["11CS", "$1,750"], ["ODP/SSL", "$25"], ["CDA", "$100"],
  ["CMFG", "$100"], ["DD", "$4,000"], ["IMP/BSA", "$500"], ["RTS", "$2,500"],
  ["11AL", "$500"], ["13 CT", "$1,820"], ["TWD", "$25"], ["RNPD", "No fee"],
  ["DD (CD)", "$1,000"], ["12RT", "$675"], ["M-EXP", "No fee"], ["11CG-PC", "$400"],
  ["CEP", "$1,820"], ["EVNT", "$1,820"], ["RTPD", "$50"],
];

export default function LicenseFeesPage() {
  return (
    <main className="license-fees-page">
      <div className="abt-header-wrap">
        <FormsSiteHeader />
      </div>

      <section className="license-fees-hero">
        <div className="page-shell">
          <nav className="license-fees-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span>›</span><b>License Fees</b>
          </nav>
          <span className="license-fees-eyebrow">Florida ABT official fee reference</span>
          <h1>Florida Liquor License Annual Fees</h1>
          <p>
            Annual and half-year alcoholic-beverage license fees by license type and county
            population, transcribed from the Florida Division of Alcoholic Beverages and Tobacco
            fee chart effective October 1, 2025.
          </p>
          <div className="license-fees-hero-actions">
            <a className="btn btn-gold" href="#county-fees">View Fee Tables</a>
            <a
              className="btn btn-outline"
              href="https://www2.myfloridalicense.com/abt/rules_statutes/fee_chart.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View Official ABT Chart ↗
            </a>
          </div>
        </div>
      </section>

      <section className="license-fees-intro page-shell">
        <div>
          <span>How the chart works</span>
          <h2>Find the county band, then the license type</h2>
        </div>
        <p>
          Vendor fees vary by county population. The amounts shown for 1APS, 1COP, 2APS and 2COP
          include the 40% surcharge displayed on the official chart. An asterisk identifies
          counties whose vendor and distributor license year runs October 1 through September 30.
        </p>
      </section>

      <section className="license-fees-tables page-shell" id="county-fees" aria-label="County population license fees">
        {populationFees.map((group) => (
          <article className="license-fee-card" key={group.band}>
            <div className="license-fee-card-heading">
              <div>
                <span>County population band</span>
                <h2>{group.band}</h2>
              </div>
              <b>{group.counties.length} {group.counties.length === 1 ? "county" : "counties"}</b>
            </div>
            <div className="license-fee-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">License type</th>
                    <th scope="col">Full year</th>
                    <th scope="col">Half year</th>
                  </tr>
                </thead>
                <tbody>
                  {group.fees.map((fee) => (
                    <tr key={fee.type}>
                      <th scope="row">{fee.type}</th>
                      <td>{fee.fullYear}</td>
                      <td>{fee.halfYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="license-fee-counties">
              <strong>Counties in this band</strong>
              <p>{group.counties.join(" · ")}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="other-fees page-shell" aria-labelledby="other-fees-heading">
        <div className="other-fees-heading">
          <span>Statewide and special classifications</span>
          <h2 id="other-fees-heading">Other license fees not based on county population</h2>
          <p>License codes and annual amounts are reproduced as presented on the official ABT chart.</p>
        </div>
        <div className="other-fees-grid">
          {otherFees.map(([type, fee]) => (
            <div key={`${type}-${fee}`}>
              <strong>{type}</strong>
              <span>{fee}</span>
            </div>
          ))}
        </div>
        <div className="common-carriers">
          <strong>Common carriers</strong>
          <span><b>PVP</b> $1,100</span>
          <span><b>X</b> $1,100 + $25 for each ship, bus or plane</span>
          <span><b>IX</b> $2,500 + $10 per car</span>
        </div>
      </section>

      <section className="license-fees-notes page-shell" aria-labelledby="license-fees-notes-heading">
        <div>
          <span>License-year notes</span>
          <h2 id="license-fees-notes-heading">Dates and county designations</h2>
        </div>
        <ul>
          <li><strong>Asterisk counties:</strong> vendor and distributor license year is October 1–September 30.</li>
          <li><strong>All other counties:</strong> vendor and distributor license year is April 1–March 31.</li>
          <li><strong>Manufacturers, brokers, sales agents, importers and passenger common carriers:</strong> October 1–September 30, regardless of county.</li>
          <li><strong>Dry counties listed by ABT:</strong> Lafayette and Liberty.</li>
        </ul>
      </section>

      <section className="license-fees-disclosure page-shell" aria-label="License fee disclaimer">
        <strong>Important fee information</strong>
        <p>
          Florida Liquor License Market is not the Florida Division of Alcoholic Beverages and
          Tobacco and does not provide legal or licensing advice. This page is a convenient
          transcription of ABT’s published chart. Fees, classifications, surcharges and county
          population bands may change. Confirm the current amount and any additional application,
          transfer, fingerprinting, local or temporary fees directly with ABT before filing.
        </p>
        <small>Official chart effective October 1, 2025 · FLLM source review July 31, 2026.</small>
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
