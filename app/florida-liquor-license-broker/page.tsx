import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "../resources/forms/abt-forms.css";
import "../fllm-official-template.css";
import "./broker-page.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-broker`;

export const metadata: Metadata = {
  title: "Florida Liquor License Broker | Buy, Sell & Finance | FLLM",
  description:
    "Florida liquor license broker-assisted services for buyers and sellers. Buy, sell, value, finance and coordinate transfers of 4COP and 3PS quota licenses across Florida.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License Broker | Buy, Sell & Finance | FLLM",
    description:
      "Statewide Florida liquor license brokerage and transaction support for buyers and sellers of 4COP and 3PS quota licenses.",
    siteName: "Florida Liquor License Market",
  },
};

const faqs = [
  {
    question: "What does a Florida liquor license broker do?",
    answer:
      "Depending on the written engagement, a Florida liquor license broker may help identify suitable licenses, analyze county-market pricing, market a seller's license, communicate with buyers or sellers, negotiate business terms, organize due diligence and coordinate transaction milestones through closing.",
  },
  {
    question: "Can FLLM help both buyers and sellers?",
    answer:
      "Yes. Florida Liquor License Market offers broker-assisted services for license owners seeking representation and for buyers seeking help identifying and evaluating suitable opportunities. The exact representation role and scope are defined in a written agreement.",
  },
  {
    question: "How much does a Florida liquor license broker charge?",
    answer:
      "Broker compensation depends on the engagement and is established in the written brokerage agreement. FLLM maintains a separate broker-fees page explaining common fee structures and the distinction between full-service representation and self-directed marketplace listings.",
  },
  {
    question: "Do I need a broker to buy a Florida liquor license?",
    answer:
      "No. A buyer can pursue a transaction directly. A broker can be useful when a buyer wants help defining the target county and license series, comparing market evidence, finding opportunities, communicating with sellers, negotiating terms and coordinating the transaction.",
  },
  {
    question: "Can a broker help finance a Florida liquor license?",
    answer:
      "A broker can help coordinate financing discussions and connect transaction parties with financing resources. Loan approval, collateral requirements, underwriting and loan terms are determined by the lender, not by the broker.",
  },
  {
    question: "How is a Florida 4COP or 3PS liquor license valued?",
    answer:
      "Florida quota licenses are county-specific. Market value can be influenced by license type, county supply and demand, current inventory, recent asking-price evidence, license status, transferability, transaction terms and timing. FLLM provides market-data and appraisal resources for buyers, sellers and lenders.",
  },
  {
    question: "Does a liquor license broker approve the transfer?",
    answer:
      "No. Florida's Department of Business and Professional Regulation, through the Division of Alcoholic Beverages and Tobacco, administers alcoholic-beverage licensing and transfer approval. A broker can coordinate a transaction but cannot guarantee transfer approval or closing.",
  },
];

const services = [
  ["01", "County-market pricing", "Review current inventory, disclosed asking prices and county-specific market conditions before setting or evaluating a price."],
  ["02", "Buyer and seller matching", "Identify suitable opportunities or qualified prospects while keeping the representation role clear."],
  ["03", "Marketing strategy", "Coordinate public or confidential marketing for transferable Florida liquor-license inventory."],
  ["04", "Negotiation support", "Help organize and negotiate price and other business terms while the client retains final decision authority."],
  ["05", "Due diligence coordination", "Organize license information, transaction documents and professional involvement needed for diligence and transfer preparation."],
  ["06", "Closing coordination", "Track milestones and coordinate with attorneys, licensing professionals, lenders, escrow providers and other transaction participants."],
];

export default function FloridaLiquorLicenseBrokerPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Florida Liquor License Broker",
      description:
        "Florida liquor license broker-assisted services for buyers and sellers of 4COP, 3PS and other transferable liquor licenses across Florida.",
      url: canonicalUrl,
      datePublished: "2026-08-26",
      dateModified: "2026-09-15",
      publisher: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Florida Liquor License Brokerage and Transaction Support",
      serviceType: "Florida liquor license brokerage and transaction coordination",
      provider: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
      areaServed: { "@type": "State", name: "Florida" },
      audience: [
        { "@type": "Audience", audienceType: "Florida liquor license sellers" },
        { "@type": "Audience", audienceType: "Florida liquor license buyers" },
      ],
      url: canonicalUrl,
      description:
        "Broker-assisted services for Florida liquor-license buyers and sellers, including market analysis, marketing, opportunity identification, negotiation and transaction coordination as defined by written agreement.",
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Florida Liquor License Broker", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="broker-service-page fllm-official-page" data-fllm-template="county-v1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="broker-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="broker-hero">
        <div className="broker-shell">
          <nav className="broker-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><strong>Florida Liquor License Broker</strong>
          </nav>

          <div className="broker-hero-grid">
            <div>
              <span className="broker-eyebrow">Statewide brokerage & transaction support</span>
              <h1>Florida Liquor License Broker</h1>
              <p className="broker-hero-copy">
                Buy, sell, value, finance and coordinate the transfer of Florida liquor licenses with market data and transaction support built around the state&apos;s county-specific quota system. FLLM works with 4COP, 3PS and other transferable license opportunities across Florida.
              </p>
              <div className="broker-actions">
                <Link className="broker-button" href="/listings">View Licenses for Sale</Link>
                <Link className="broker-button broker-button--outline" href="/sell-your-license">Sell Your License</Link>
                <Link className="broker-button broker-button--outline" href="/florida-liquor-license-value">Request a Valuation</Link>
              </div>
              <p className="broker-disclosure">
                Broker representation begins only under a written agreement defining the client, representative, scope of services, compensation and other material terms. DBPR&apos;s Division of Alcoholic Beverages and Tobacco retains authority over license transfers and approvals.
              </p>
            </div>

            <aside className="broker-hero-panel" aria-label="FLLM Florida liquor license brokerage services">
              <div>
                <span>Florida liquor license services</span>
                <h2>One specialized platform for the transaction lifecycle</h2>
              </div>
              <div className="broker-panel-grid">
                <div><strong>Buy</strong><small>identify and compare available licenses</small></div>
                <div><strong>Sell</strong><small>market and negotiate transferable inventory</small></div>
                <div><strong>Value</strong><small>county-level market and appraisal resources</small></div>
                <div><strong>Finance</strong><small>coordinate lender and transaction resources</small></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="broker-section">
        <div className="broker-shell">
          <div className="broker-section-heading">
            <div>
              <span className="broker-section-kicker">Brokerage built around Florida&apos;s quota market</span>
              <h2>Start with the transaction you are trying to complete</h2>
              <p>Florida quota liquor licenses are county-specific, so brokerage strategy begins with the license series, county, intended use and current market conditions.</p>
            </div>
          </div>
          <div className="broker-stat-grid">
            <article className="broker-stat-card"><strong>4COP</strong><span>Full-liquor quota licenses</span><p>Brokerage support for transferable 4COP quota opportunities and sales.</p></article>
            <article className="broker-stat-card"><strong>3PS</strong><span>Package-store quota licenses</span><p>Buyer and seller support for 3PS-family package-store licenses.</p></article>
            <article className="broker-stat-card"><strong>67</strong><span>Florida counties</span><p>County-specific market data and transaction research across Florida.</p></article>
            <article className="broker-stat-card"><strong>1</strong><span>Integrated transaction path</span><p>Market data, listings, valuation, financing and transaction resources in one platform.</p></article>
          </div>
        </div>
      </section>

      <section className="broker-section broker-section--deep">
        <div className="broker-shell">
          <div className="broker-section-heading">
            <div>
              <span className="broker-section-kicker">Buyer and seller representation</span>
              <h2>Broker-assisted service for both sides of the market</h2>
              <p>FLLM supports license owners seeking professional sale representation and buyers who want help identifying, evaluating and negotiating suitable opportunities.</p>
            </div>
          </div>

          <div className="broker-path-grid">
            <article className="broker-path-card">
              <span className="broker-card-label">For license owners</span>
              <h3>Sell a Florida liquor license with broker-assisted representation</h3>
              <p>Use county-market evidence to position the license, then coordinate marketing, buyer communications, negotiation and transaction milestones.</p>
              <ul>
                <li>County-market review and pricing strategy</li>
                <li>Public or confidential marketing</li>
                <li>Prospective-buyer screening and communications</li>
                <li>Negotiation of price and business terms</li>
                <li>Due-diligence and transfer coordination</li>
                <li>Closing and professional-party coordination</li>
              </ul>
              <div className="broker-card-actions">
                <Link className="broker-button" href="/sell-your-license">Request Seller Representation</Link>
                <Link className="broker-button broker-button--outline" href="/florida-liquor-license-broker-fees">Broker Fees</Link>
              </div>
            </article>

            <article className="broker-path-card">
              <span className="broker-card-label">For license buyers</span>
              <h3>Find and acquire the right Florida liquor license</h3>
              <p>Define the county and license type, compare available inventory and market evidence, then coordinate seller communication, negotiation and the transaction process.</p>
              <ul>
                <li>Define the target county, series and intended use</li>
                <li>Review current public and broker-represented opportunities</li>
                <li>Compare asking prices and county-market evidence</li>
                <li>Coordinate seller and listing-representative communications</li>
                <li>Assist with negotiation and due diligence</li>
                <li>Coordinate financing, transfer and closing milestones</li>
              </ul>
              <div className="broker-card-actions">
                <Link className="broker-button" href="/contact">Request Buyer Assistance</Link>
                <Link className="broker-button broker-button--outline" href="/listings">Browse Current Listings</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="broker-section broker-section--gradient">
        <div className="broker-shell">
          <div className="broker-section-heading">
            <div>
              <span className="broker-section-kicker">What a Florida liquor license broker can do</span>
              <h2>Commercial support from pricing through closing</h2>
              <p>The exact services depend on the written engagement, but broker-assisted representation can span the major commercial stages of a Florida liquor-license transaction.</p>
            </div>
          </div>
          <div className="broker-service-grid">
            {services.map(([number, title, copy]) => (
              <article className="broker-service-card" key={title}>
                <b>{number}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="broker-section">
        <div className="broker-shell broker-two-column">
          <div className="broker-copy">
            <span className="broker-section-kicker">County expertise matters</span>
            <h2>Florida liquor-license pricing is local, not statewide</h2>
            <p>Quota licenses are tied to county markets. A 4COP or 3PS asking price in one county may not be useful evidence for another county because supply, demand, inventory and transaction activity differ.</p>
            <p style={{ marginTop: 16 }}>
              FLLM&apos;s <Link href="/counties">Florida county market-data center</Link> organizes active inventory, current disclosed asking-price evidence, population context and quota-drawing information across all 67 counties. Buyers and sellers can use that market evidence before negotiating a transaction.
            </p>
            <div className="broker-actions">
              <Link className="broker-button" href="/counties">Compare County Markets</Link>
              <Link className="broker-button broker-button--outline" href="/florida-quota-liquor-license-market-report">Open Market Report</Link>
            </div>
          </div>
          <aside className="broker-info-card">
            <h3>Market questions to answer before negotiating</h3>
            <ul>
              <li>Which county and exact license series are involved?</li>
              <li>What comparable licenses are currently offered for sale?</li>
              <li>What asking-price range is visible in the county?</li>
              <li>Is the license active, inactive or subject to transfer conditions?</li>
              <li>Does the proposed use require local zoning or premises approvals?</li>
              <li>Will financing, escrow or third-party professional support be needed?</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="broker-section broker-section--deep">
        <div className="broker-shell">
          <div className="broker-section-heading">
            <div>
              <span className="broker-section-kicker">Florida liquor license transfer process</span>
              <h2>Brokerage coordinates the deal; the state approves the license transfer</h2>
              <p>A broker can help organize the commercial transaction, but DBPR/ABT retains licensing authority. Buyers and sellers should confirm the exact application, tax-clearance, ownership, premises and local-approval requirements that apply to their transaction.</p>
            </div>
          </div>
          <div className="broker-step-grid">
            <article className="broker-step-card"><b>1</b><h3>Define the transaction</h3><p>Confirm the county, license series, buyer, seller, intended use and proposed transaction structure.</p></article>
            <article className="broker-step-card"><b>2</b><h3>Negotiate business terms</h3><p>Address price, deposits, financing, contingencies, due diligence, closing and other material commercial terms.</p></article>
            <article className="broker-step-card"><b>3</b><h3>Prepare transfer requirements</h3><p>Coordinate the appropriate state forms, supporting records, local approvals and professional review needed for the transfer.</p></article>
            <article className="broker-step-card"><b>4</b><h3>Coordinate approval and closing</h3><p>Track state approval and closing milestones while the parties and their professional advisers complete the transaction.</p></article>
          </div>
          <div className="broker-actions">
            <Link className="broker-button" href="/transaction-services">Transaction Services</Link>
            <Link className="broker-button broker-button--outline" href="/resources/application-center">Application Center</Link>
          </div>
        </div>
      </section>

      <section className="broker-section broker-section--gradient">
        <div className="broker-shell">
          <div className="broker-section-heading">
            <div>
              <span className="broker-section-kicker">Valuation, financing and market resources</span>
              <h2>Use the rest of FLLM&apos;s transaction infrastructure</h2>
              <p>The brokerage page connects directly into the tools buyers, sellers and lenders may need before and during a transaction.</p>
            </div>
          </div>
          <div className="broker-link-grid">
            <Link className="broker-link-card" href="/listings"><strong>Florida Liquor Licenses for Sale</strong><span>Browse current statewide 4COP, 3PS and other marketplace opportunities.</span></Link>
            <Link className="broker-link-card" href="/florida-liquor-license-value"><strong>Florida Liquor License Value</strong><span>Review county-market evidence and estimate where a license may fit in the current market.</span></Link>
            <Link className="broker-link-card" href="/florida-liquor-license-appraisal"><strong>Liquor License Appraisals</strong><span>Explore appraisal resources for transactions, lending and other valuation needs.</span></Link>
            <Link className="broker-link-card" href="/financing"><strong>Finance a Liquor License</strong><span>Review financing resources and transaction structures available to qualified buyers.</span></Link>
            <Link className="broker-link-card" href="/florida-4cop-liquor-license-for-sale"><strong>4COP Licenses for Sale</strong><span>Compare current full-liquor quota opportunities and asking prices.</span></Link>
            <Link className="broker-link-card" href="/florida-3ps-liquor-license-for-sale"><strong>3PS Licenses for Sale</strong><span>Compare current package-store quota opportunities across Florida counties.</span></Link>
          </div>
        </div>
      </section>

      <section className="broker-section">
        <div className="broker-shell">
          <div className="broker-section-heading">
            <div>
              <span className="broker-section-kicker">Frequently asked questions</span>
              <h2>Florida liquor license broker questions</h2>
            </div>
          </div>
          <div className="broker-faq">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="broker-final">
        <div className="broker-shell broker-final-grid">
          <div>
            <span className="broker-section-kicker">Ready to discuss a transaction?</span>
            <h2>Request Florida liquor license broker assistance</h2>
            <p>Owners can request seller representation for pricing, marketing, buyer communications, negotiation and transaction coordination. Buyers can request help identifying and evaluating suitable county and license-type opportunities.</p>
          </div>
          <div className="broker-actions">
            <Link className="broker-button" href="/sell-your-license">Seller Representation</Link>
            <Link className="broker-button broker-button--outline" href="/contact">Buyer Assistance</Link>
          </div>
        </div>
      </section>

      <footer className="directory-footer broker-official-footer">
        <div className="directory-shell">
          <div className="directory-footer-brand">
            <Link href="/" aria-label="Florida Liquor License Market home">
              <Image src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" width={130} height={53} />
            </Link>
            <span>© Florida Liquor License Market</span>
          </div>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
            <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
            <Link href="/listings">Listings</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
