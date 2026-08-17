import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import QuotaLotteryEntryForm from "@/components/QuotaLotteryEntryForm";
import { getQuotaDrawingSourceStatus, QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import "@/app/resources/forms/abt-forms.css";
import "./quota-lottery.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-lottery`;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "2026 Florida Liquor License Lottery | Quota Drawing Entry Guide",
  description:
    "See the 2026 Florida quota liquor license drawing counties, available licenses, entry dates, $100 entry fee, ABT-6033 requirements and FLLM form-preparation workspace.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "2026 Florida Liquor License Lottery & Quota Drawing Entry",
    description:
      "Current 2026 DBPR quota drawing availability, entry rules, county chart and ABT-6033 preparation workspace.",
    siteName: "Florida Liquor License Market",
  },
};

const steps = [
  {
    number: "01",
    title: "Choose an eligible county",
    copy: "A separate entry applies to one county. The county must appear on DBPR’s current-year availability notice.",
  },
  {
    number: "02",
    title: "Complete ABT-6033",
    copy: "Choose an Individual or Business entry, provide the entrant’s contact information, and disclose all interested persons.",
  },
  {
    number: "03",
    title: "Pay the entry fee",
    copy: "The 2026 entry fee is $100 per entry and is non-refundable. Online entries may be paid by credit card; mailed entries use check or money order.",
  },
  {
    number: "04",
    title: "Drawing establishes priority",
    copy: "A selected entrant earns the right to apply for the available quota license. Selection does not itself issue the liquor license.",
  },
] as const;

const rules = [
  "An entrant, whether an individual or business, may submit only one entry form per county.",
  "A person with a direct or indirect interest may not appear on more than one entry for the same county.",
  "A separate ABT-6033 entry form is required for each county entered.",
  "All interested persons must be disclosed with full names and dates of birth.",
  "DBPR must receive the entry before the published deadline.",
] as const;

export default async function FloridaLiquorLicenseLotteryPage() {
  const sourceStatus = await getQuotaDrawingSourceStatus();
  const maxLicenses = Math.max(...QUOTA_DRAWING_2026.counties.map((item) => item.licenses));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "2026 Florida Liquor License Lottery and Quota Drawing Entry Guide",
      url: canonicalUrl,
      description:
        "Current 2026 Florida DBPR quota beverage license drawing availability, county license counts, entry rules and ABT-6033 preparation.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "2026 Quota Lottery Entry", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="quota-lottery-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="abt-header-wrap quota-header-wrap">
        <FormsSiteHeader primaryActionHref="#entry-form" primaryActionLabel="Prepare Lottery Entry" />
      </div>

      <section className="quota-hero">
        <div className="page-shell">
          <nav className="quota-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><strong>2026 Quota Lottery Entry</strong>
          </nav>
          <div className="quota-hero-grid">
            <div>
              <span className="quota-eyebrow">Florida DBPR · 2026 Quota Beverage License Drawing</span>
              <h1>Florida Liquor License Lottery Entry</h1>
              <p>
                Learn how Florida’s annual quota drawing works, see exactly which counties have new quota licenses available in 2026, and prepare your ABT-6033 entry information through FLLM.
              </p>
              <div className="quota-hero-actions">
                <a href="#availability">See 2026 County Availability</a>
                <a href="#entry-form">Prepare an Entry</a>
              </div>
            </div>
            <aside className="quota-hero-stats" aria-label="2026 quota drawing summary">
              <article><strong>{QUOTA_DRAWING_2026.totalLicenses}</strong><span>Licenses available</span></article>
              <article><strong>{QUOTA_DRAWING_2026.totalCounties}</strong><span>Eligible counties</span></article>
              <article><strong>${QUOTA_DRAWING_2026.entryFee}</strong><span>Entry fee</span></article>
            </aside>
          </div>
        </div>
      </section>

      <section className="quota-window page-shell" aria-label="2026 entry window">
        <div><span>Entry opens</span><strong>{QUOTA_DRAWING_2026.entryOpens}</strong></div>
        <div><span>Entry deadline</span><strong>{QUOTA_DRAWING_2026.entryCloses}</strong></div>
        <a href={QUOTA_DRAWING_2026.sourceNoticeUrl} target="_blank" rel="noopener noreferrer">
          View Official 2026 DBPR Notice <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="quota-explainer page-shell">
        <div className="quota-section-heading">
          <span>How the Florida quota drawing works</span>
          <h2>The drawing determines who gets the first opportunity to apply</h2>
          <p>
            Florida creates additional quota licenses as county population increases. When licenses are available, DBPR opens an annual entry period and conducts a drawing to establish the order in which applications for those licenses will be considered.
          </p>
        </div>
        <div className="quota-step-grid">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quota-availability" id="availability">
        <div className="page-shell">
          <div className="quota-section-heading quota-section-heading-row">
            <div>
              <span>Current 2026 DBPR availability</span>
              <h2>63 quota licenses across 30 Florida counties</h2>
              <p>
                The figures below are transcribed from DBPR’s official 2026 Quota Beverage License Drawing Entry Period notice and checked against the live DBPR source.
              </p>
            </div>
            <aside className={sourceStatus.reachable ? "quota-source-status is-live" : "quota-source-status"}>
              <i aria-hidden="true" />
              <span>{sourceStatus.reachable ? "DBPR source reachable" : "Using last verified DBPR data"}</span>
              <small>Verified {QUOTA_DRAWING_2026.lastVerified}</small>
            </aside>
          </div>

          <div className="quota-chart" role="table" aria-label="2026 Florida quota drawing licenses by county">
            <div className="quota-chart-head" role="row">
              <span role="columnheader">County</span>
              <span role="columnheader">Available licenses</span>
              <span role="columnheader">Relative availability</span>
            </div>
            {[...QUOTA_DRAWING_2026.counties]
              .sort((left, right) => right.licenses - left.licenses || left.county.localeCompare(right.county))
              .map((item) => (
                <div className="quota-chart-row" role="row" key={item.county}>
                  <strong role="cell">{item.county}{item.county === "Dade" ? " (Miami-Dade)" : ""}</strong>
                  <span className="quota-license-count" role="cell">{item.licenses}</span>
                  <span className="quota-bar-track" role="cell" aria-label={`${item.licenses} licenses available`}>
                    <i style={{ width: `${(item.licenses / maxLicenses) * 100}%` }} />
                  </span>
                </div>
              ))}
          </div>

          <div className="quota-source-links">
            <a href={QUOTA_DRAWING_2026.sourceNoticeUrl} target="_blank" rel="noopener noreferrer">Official 2026 Notice ↗</a>
            <a href={QUOTA_DRAWING_2026.quotaInformationUrl} target="_blank" rel="noopener noreferrer">DBPR Quota License Information ↗</a>
          </div>
        </div>
      </section>

      <section className="quota-rules page-shell">
        <div className="quota-section-heading">
          <span>Entry rules that matter</span>
          <h2>Before you submit an ABT-6033</h2>
        </div>
        <div className="quota-rules-grid">
          <ul>{rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
          <aside>
            <strong>Winning the drawing is not the license</strong>
            <p>
              DBPR describes the selected entrant as earning the right to apply for an available quota license. The applicant must still qualify under Florida Beverage Law before the license can be issued.
            </p>
          </aside>
        </div>
      </section>

      <section className="quota-form-section" id="entry-form">
        <div className="page-shell">
          <div className="quota-section-heading quota-form-heading">
            <span>FLLM form preparation</span>
            <h2>Prepare your DBPR ABT-6033 quota drawing entry</h2>
            <p>
              Fill out the FLLM preparation form below, save the draft on your device, and then continue to the correct official DBPR Individual or Business entry. FLLM does not submit the entry or collect the state’s $100 fee.
            </p>
          </div>

          <QuotaLotteryEntryForm />

          <div className="quota-official-actions quota-official-actions-after-form">
            <a href={QUOTA_DRAWING_2026.individualEntryUrl} target="_blank" rel="noopener noreferrer">DBPR Individual Entry ↗</a>
            <a href={QUOTA_DRAWING_2026.businessEntryUrl} target="_blank" rel="noopener noreferrer">DBPR Business Entry ↗</a>
            <a href={QUOTA_DRAWING_2026.officialFormUrl} target="_blank" rel="noopener noreferrer">Official ABT-6033 PDF ↗</a>
          </div>
        </div>
      </section>

      <section className="quota-final-cta">
        <div className="page-shell">
          <div>
            <span>Already looking beyond the lottery?</span>
            <h2>Compare licenses already available on the open market</h2>
            <p>The lottery is one path. Existing Florida quota licenses can also be bought and sold in the secondary market.</p>
          </div>
          <div className="quota-final-actions">
            <Link href="/listings">Browse Licenses</Link>
            <Link href="/florida-liquor-license-value">Estimate License Value</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
