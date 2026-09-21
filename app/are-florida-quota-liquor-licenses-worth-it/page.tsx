import type { Metadata } from "next";
import Link from "next/link";

import { getMarketplaceListings } from "@/lib/listing-store";
import { FllmPageShell } from "@/components/FllmDesignSystem";
import { getVisibleAvailableMarketplaceListings } from "@/lib/visible-marketplace-listings";

import "../fllm-official-template.css";
import "../fllm-design-system.css";
import "./worth-it.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/are-florida-quota-liquor-licenses-worth-it`;
const statuteUrl =
  "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0561/Sections/0561.20.html";
const dbprTypesUrl =
  "https://www2.myfloridalicense.com/abt/rules_statutes/license_types.pdf";

export const dynamic = "force-dynamic";

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

function floridaDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

async function getFourCopMarket() {
  const listings = getVisibleAvailableMarketplaceListings(await getMarketplaceListings()).filter(
    (listing) => listing.type === "4COP Quota",
  );
  const prices = listings
    .map((listing) => listing.price)
    .filter((value): value is number => Number.isFinite(value));

  return {
    listings,
    prices,
    countyCount: new Set(listings.map((listing) => listing.county)).size,
    low: prices.length ? Math.min(...prices) : null,
    median: median(prices),
    high: prices.length ? Math.max(...prices) : null,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const market = await getFourCopMarket();
  const marketText =
    market.median === null
      ? ""
      : ` FLLM's current disclosed 4COP median asking price is ${money(market.median)}.`;

  const description =
    "Are Florida quota liquor licenses worth it? Compare 4COP quota-license value with Florida 4COP-SFS/SRX restaurant licensing, the 51% food-and-nonalcoholic revenue test, current FLLM market data, and options for selling a quota license to free up equity." +
    marketText;

  return {
    title: "Are Florida Quota Liquor Licenses Worth It? | FLLM",
    description,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: "Are Florida Quota Liquor Licenses Worth It? | FLLM",
      description,
      siteName: "Florida Liquor License Market",
    },
    twitter: {
      card: "summary_large_image",
      title: "Are Florida Quota Liquor Licenses Worth It?",
      description,
    },
  };
}

const revenueExamples = [1_000_000, 2_000_000, 3_000_000];

const faqs = [
  {
    question: "Are Florida quota liquor licenses worth it?",
    answer:
      "They can be worth it when a business needs transferable full-liquor quota privileges and does not fit or does not want to depend on a special restaurant license. For a qualifying restaurant that naturally satisfies the 4COP-SFS/SRX requirements, tying up substantial capital in a quota license may be unnecessary. The answer depends on the operating model, county market value, financing, desired flexibility and regulatory fit.",
  },
  {
    question: "When might a restaurant not need a 4COP quota license?",
    answer:
      "A bona fide food service establishment may qualify for Florida's special food service full-liquor license if it satisfies the current statutory requirements, including the applicable service-area, seating, meal-service and food-and-nonalcoholic revenue tests. The special license has an annual state fee and is not the same transferable quota asset.",
  },
  {
    question: "What is the 51% food-sales rule for a Florida 4COP-SFS/SRX license?",
    answer:
      "The current statute requires at least 51% of gross food-and-beverage revenue to come from food and nonalcoholic beverages. That means alcoholic-beverage revenue can represent no more than 49% of that combined food-and-beverage revenue for the period being tested.",
  },
  {
    question: "Can a restaurant sell its 4COP quota license and use an SFS/SRX license instead?",
    answer:
      "Potentially, if the restaurant independently qualifies for the special license and the licensing transition is approved and properly sequenced. The owner should not sell or surrender the quota asset before confirming the replacement licensing path and timing with DBPR/DABT and the professionals handling the transaction.",
  },
  {
    question: "How can FLLM help an owner sell a quota license?",
    answer:
      "FLLM can assist with county market analysis, license valuation and appraisal, marketing and listing, broker-assisted representation, buyer outreach, transaction resources, financing coordination and ABT transfer-process support. Independent legal, tax, escrow and other regulated professional services remain separate.",
  },
];

export default async function AreFloridaQuotaLicensesWorthItPage() {
  const market = await getFourCopMarket();
  const updatedLabel = floridaDateLabel();
  const highestTierSfsAnnualFee = 1820;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Are Florida Quota Liquor Licenses Worth It?",
      url: canonicalUrl,
      dateModified: new Date().toISOString(),
      author: { "@type": "Organization", name: "Florida Liquor License Market" },
      publisher: { "@type": "Organization", name: "Florida Liquor License Market" },
      description:
        "A decision framework comparing Florida 4COP quota licenses with special food service restaurant licensing using current FLLM market data and Florida's 51% food-and-nonalcoholic revenue rule.",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Florida 4COP Quota Licenses",
          item: `${siteUrl}/florida-4cop-liquor-license-for-sale`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Are Florida Quota Liquor Licenses Worth It?",
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <FllmPageShell className="worth-it-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <section className="seo-market-hero">
        <div className="seo-market-shell"><div className="seo-market-hero-grid">
          <div>
            <div className="seo-market-breadcrumbs">
              <Link href="/">Home</Link><span>›</span>
              <Link href="/florida-4cop-liquor-license-for-sale">4COP Quota</Link><span>›</span>
              <strong>Are Quota Licenses Worth It?</strong>
            </div>
            <span className="seo-market-kicker">Florida 4COP Decision Guide · Market Data + Operating Economics</span>
            <h1 className="fllm-ui-hero-title--long">Are Florida Quota Liquor Licenses <em>Worth It?</em></h1>
            <p >
              Sometimes absolutely. Sometimes they tie up capital a qualifying restaurant may not need to keep
              invested in a transferable quota asset. The economic answer depends on the business model, the county
              market value of the license, food-to-alcohol revenue mix, financing cost, desired operating flexibility
              and whether the business can independently qualify for Florida&apos;s 4COP-SFS / SRX special restaurant license.
            </p>
            <div className="seo-market-actions">
              <a className="seo-market-button seo-market-button-gold" href="#decision-framework">See the Decision Framework</a>
              <Link className="seo-market-button seo-market-button-dark" href="/florida-liquor-license-value">
                Estimate License Value
              </Link>
            </div>
            <p className="four-cop-updated">FLLM marketplace snapshot updated {updatedLabel}.</p>
          </div>

          <aside className="seo-market-snapshot" aria-label="Current FLLM 4COP Quota market snapshot">
            <span>Current FLLM 4COP Quota Snapshot</span>
            <div className="seo-market-snapshot-grid">
              <div><strong>{market.listings.length}</strong><small>active 4COP Quota listings</small></div>
              <div><strong>{market.countyCount}</strong><small>counties represented</small></div>
              <div><strong>{market.median === null ? "—" : money(market.median)}</strong><small>median disclosed ask</small></div>
              <div><strong>{market.low === null ? "—" : money(market.low)}</strong><small>lowest disclosed ask</small></div>
            </div>
            <p className="four-cop-updated">Asking-price data is marketplace evidence, not completed-sale pricing or an appraisal.</p>
          </aside>
        </div></div>
      </section>

      <section className="fllm-template-section worth-it-answer" id="decision-framework">
        <div className="fllm-template-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <span className="fllm-template-eyebrow">The Short Answer</span>
            <h2>A quota license is worth it when the flexibility is worth the capital</h2>
            <p>
              The core question is not simply whether a 4COP quota license has value. It usually does. The better
              question is whether this particular business needs to keep that much value tied up in the license.
            </p>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--3">
            <article className="fllm-template-card fllm-template-card--gold fllm-ui-card--center">
              <span className="fllm-ui-card-kicker">Often Worth It</span>
              <h3>Bars, nightclubs and concepts that do not qualify for SFS/SRX</h3>
              <p>
                A transferable quota license can be essential for a full-liquor concept that cannot reliably satisfy
                the special restaurant requirements or wants operating flexibility not conditioned on the SFS/SRX model.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold fllm-ui-card--center">
              <span className="fllm-ui-card-kicker">Run the Numbers</span>
              <h3>Restaurants that naturally exceed 51% food + nonalcoholic revenue</h3>
              <p>
                If the restaurant already operates well above the statutory food-and-nonalcoholic threshold and also
                satisfies the current space, seating and meal-service requirements, keeping a high-value quota asset may
                be an expensive way to obtain privileges available through a special restaurant license.
              </p>
            </article>
            <article className="fllm-template-card fllm-template-card--gold fllm-ui-card--center">
              <span className="fllm-ui-card-kicker">Flexibility Has Value</span>
              <h3>Restaurants close to the 51% line or changing concepts</h3>
              <p>
                A quota license may still be economically rational where the revenue mix is volatile, the concept may
                become more alcohol-driven, package-sale flexibility matters, or the owner does not want the license
                dependent on continued SFS/SRX qualification.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep worth-it-revenue">
        <div className="fllm-template-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <span className="fllm-template-eyebrow">The 51% Test in Dollars</span>
            <h2>What the restaurant revenue requirement actually means</h2>
            <p>
              Florida&apos;s current special food service rule requires at least 51% of gross food-and-beverage revenue
              to come from food and nonalcoholic beverages. Alcoholic-beverage revenue can therefore account for no more
              than 49% of that combined revenue during the tested period.
            </p>
          </div>

          <div className="fllm-template-table-wrap">
            <table className="fllm-ui-table">
              <thead>
                <tr>
                  <th>Annual Food + Beverage Revenue</th>
                  <th>Minimum Food + Nonalcoholic Revenue (51%)</th>
                  <th>Maximum Alcohol Revenue at 49%</th>
                </tr>
              </thead>
              <tbody>
                {revenueExamples.map((revenue) => (
                  <tr key={revenue}>
                    <td>{money(revenue)}</td>
                    <td>{money(Math.round(revenue * 0.51))}</td>
                    <td>{money(Math.round(revenue * 0.49))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fllm-ui-ratio-grid">
            <article className="fllm-ui-ratio-card"><strong>60% / 40%</strong><span>Food + nonalcoholic / alcohol</span><p>Comfortably above the 51% revenue threshold, assuming all other requirements are met.</p></article>
            <article className="fllm-ui-ratio-card"><strong>51% / 49%</strong><span>Threshold mix</span><p>Qualifies on the revenue ratio, but leaves little cushion if alcohol sales rise or food sales soften.</p></article>
            <article className="fllm-ui-ratio-card"><strong>50% / 50%</strong><span>Below the threshold</span><p>Does not satisfy the special restaurant revenue test for the covered period.</p></article>
          </div>

          <div className="fllm-template-disclosure">
            <strong>Revenue is only one requirement.</strong> The current statute also requires a bona fide restaurant
            with at least 2,000 square feet of service area, capacity to serve meals to 120 persons at one time and at
            least 120 physical seats available during operating hours. Verify the current requirements before relying
            on an SFS/SRX strategy.
          </div>
        </div>
      </section>

      <section className="fllm-template-section worth-it-cost">
        <div className="fllm-template-shell">
          <div className="fllm-template-heading">
            <div>
              <span className="fllm-template-eyebrow">Capital Allocation</span>
              <h2>Why a qualifying restaurant may decide a quota license is too much capital</h2>
            </div>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--3">
            <article className="fllm-ui-value-card">
              <span>Current FLLM Market Evidence</span>
              <strong>{market.median === null ? "Varies by county" : money(market.median)}</strong>
              <p>Median disclosed asking price among currently visible FLLM 4COP quota listings.</p>
              <small>
                Range: {market.low === null ? "—" : money(market.low)} to {market.high === null ? "—" : money(market.high)}
              </small>
            </article>

            <article className="fllm-ui-value-card">
              <span>Special Restaurant State License Fee</span>
              <strong>{money(highestTierSfsAnnualFee)} / year</strong>
              <p>
                Current 4COP-SFS annual state fee in the highest county-population fee tier. Lower series have lower
                annual fees. Application, local, professional and transaction costs may also apply.
              </p>
            </article>

            <article className="fllm-ui-value-card">
              <span>Economic Question</span>
              <strong>What else could the equity do?</strong>
              <p>
                If the restaurant already qualifies for SFS/SRX, the quota asset may represent hundreds of thousands
                of dollars of saleable equity that could instead support debt reduction, renovations, working capital,
                expansion or owner liquidity.
              </p>
            </article>
          </div>

          <div className="fllm-template-disclosure">
            This is not a simple “quota price ÷ annual fee” ROI calculation. A quota license is a transferable asset that
            may retain or change value over time, while the SFS/SRX license is a qualification-based operating license.
            The relevant comparison is the value of quota flexibility and resale value versus the cost of keeping capital
            tied up in the asset.
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--gradient worth-it-convert">
        <div className="fllm-template-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <span className="fllm-template-eyebrow">Already Own a 4COP Quota?</span>
            <h2>A qualifying restaurant may be able to monetize the quota asset</h2>
            <p>
              A restaurant that independently qualifies for 4COP-SFS / SRX may want to evaluate whether keeping the
              quota asset still makes economic sense. If the replacement licensing path is approved and properly
              sequenced, selling the quota license can potentially free equity without ending full-liquor restaurant service.
            </p>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--4">
            <article className="fllm-ui-process-card"><b>01</b><h3>Confirm qualification</h3><p>Verify the restaurant meets the current statutory revenue, seating, service-area and operating requirements.</p></article>
            <article className="fllm-ui-process-card"><b>02</b><h3>Value the quota asset</h3><p>Use county market evidence, a preliminary market report or an appraisal to estimate the license component.</p></article>
            <article className="fllm-ui-process-card"><b>03</b><h3>Plan the licensing sequence</h3><p>Coordinate the SFS/SRX application or series strategy with DBPR/DABT before the quota license is sold or transferred.</p></article>
            <article className="fllm-ui-process-card"><b>04</b><h3>Market and sell the quota license</h3><p>List, broker or privately market the asset, then coordinate buyer qualification, contract, FDOR and ABT transfer workstreams.</p></article>
          </div>

          <div className="fllm-ui-actions worth-it-process-actions">
            <Link className="fllm-template-button" href="/florida-liquor-license-value">Value My License</Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/sell-your-license">Sell My License</Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/florida-liquor-license-broker">Broker Representation</Link>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep worth-it-audits">
        <div className="fllm-template-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <span className="fllm-template-eyebrow">Current SFS/SRX Audit Structure</span>
            <h2>The farther above 51%, the less frequent the scheduled audit cycle</h2>
          </div>
          <div className="fllm-ui-grid fllm-ui-grid--4">
            <article className="fllm-ui-ratio-card"><strong>51%–60%</strong><span>Level 1</span><p>Audit every year.</p></article>
            <article className="fllm-ui-ratio-card"><strong>61%–75%</strong><span>Level 2</span><p>Audit every 2 years.</p></article>
            <article className="fllm-ui-ratio-card"><strong>76%–90%</strong><span>Level 3</span><p>Audit every 3 years.</p></article>
            <article className="fllm-ui-ratio-card"><strong>91%–100%</strong><span>Level 4</span><p>Audit every 4 years.</p></article>
          </div>
          <div className="fllm-template-disclosure">
            The statute also specifies initial testing periods and consequences for failing the required percentage.
            Businesses should use current DBPR/DABT guidance and professional advice for compliance decisions.
          </div>
        </div>
      </section>

      <section className="fllm-template-section worth-it-services">
        <div className="fllm-template-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <span className="fllm-template-eyebrow">FLLM Can Help Execute the Decision</span>
            <h2>From “is the quota license worth keeping?” to valuation, marketing and transfer</h2>
          </div>

          <div className="fllm-ui-grid fllm-ui-grid--3">
            <Link className="fllm-ui-link-card" href="/florida-liquor-license-value"><strong>Valuation</strong><span>County market evidence and preliminary value analysis.</span></Link>
            <Link className="fllm-ui-link-card" href="/florida-liquor-license-appraisal"><strong>Appraisal</strong><span>License-specific appraisal resources for supported valuation needs.</span></Link>
            <Link className="fllm-ui-link-card" href="/sell-your-license"><strong>Marketing & Listing</strong><span>Place the license in front of Florida quota-license buyers.</span></Link>
            <Link className="fllm-ui-link-card" href="/florida-liquor-license-broker"><strong>Brokerage</strong><span>Broker-assisted representation when the owner wants transaction support.</span></Link>
            <Link className="fllm-ui-link-card" href="/transaction-services"><strong>Transaction Services</strong><span>Coordinate valuation, financing, FDOR, ABT transfer and closing resources.</span></Link>
            <Link className="fllm-ui-link-card" href="/dbpr-abt-6002"><strong>ABT Transfer Process</strong><span>Review the ownership-transfer workflow and ABT-6002 preparation resources.</span></Link>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--gradient worth-it-official">
        <div className="fllm-template-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <span className="fllm-template-eyebrow">Official Florida References</span>
            <h2>Verify the licensing rule before making the capital decision</h2>
          </div>
          <div className="fllm-ui-grid fllm-ui-grid--3">
            <a className="fllm-ui-link-card" href={statuteUrl} target="_blank" rel="noreferrer"><strong>Florida Statute § 561.20</strong><span>Current special food service qualifications, revenue test and audit schedule.</span></a>
            <a className="fllm-ui-link-card" href={dbprTypesUrl} target="_blank" rel="noreferrer"><strong>DBPR Alcoholic Beverage License Types</strong><span>Current SFS license privileges, fees and operating restrictions.</span></a>
            <Link className="fllm-ui-link-card" href="/license-types/4cop-sfs-restaurant"><strong>FLLM 4COP-SFS / SRX Guide</strong><span>Plain-English comparison of the special restaurant licensing path.</span></Link>
            <Link className="fllm-ui-link-card" href="/license-types/4cop-quota"><strong>FLLM 4COP Quota Guide</strong><span>Privileges, transferability and quota-market considerations.</span></Link>
          </div>
        </div>
      </section>

      <section className="fllm-template-section fllm-template-section--deep worth-it-faq">
        <div className="fllm-template-shell">
          <div className="fllm-ui-heading fllm-ui-heading--center">
            <span className="fllm-template-eyebrow">Frequently Asked Questions</span>
            <h2>Florida quota-license economics and restaurant alternatives</h2>
          </div>
          <div className="fllm-ui-faq-grid fllm-ui-faq-grid--2">
            {faqs.map((faq) => (
              <details className="fllm-ui-faq" key={faq.question}>
                <summary>{faq.question}</summary>
                <div className="fllm-ui-faq-answer"><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="fllm-ui-final-cta">
        <div className="fllm-template-shell">
          <div>
            <span className="fllm-template-eyebrow">Turn License Equity Into a Decision</span>
            <h2>Find out what the quota license is worth before deciding whether to keep it</h2>
            <p>
              Compare the county market, estimate the license value and evaluate whether quota flexibility or released
              equity better serves the business.
            </p>
          </div>
          <div className="fllm-ui-final-actions">
            <Link className="fllm-template-button" href="/florida-liquor-license-value">Estimate Value</Link>
            <Link className="fllm-template-button fllm-template-button--outline" href="/contact">Discuss the Transaction</Link>
          </div>
        </div>
      </section>


    </FllmPageShell>
  );
}
