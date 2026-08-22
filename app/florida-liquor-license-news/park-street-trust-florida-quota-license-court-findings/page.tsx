import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import {
  PARK_STREET_FINDINGS_CASE,
  PARK_STREET_FINDINGS_FILED,
  PARK_STREET_FINDINGS_PAGES,
  PARK_STREET_FINDINGS_TITLE,
} from "@/data/court-documents/park-street-findings";
import "@/app/resources/forms/abt-forms.css";
import "../news-insights.css";
import "../news-mobile-readability.css";
import "../current-events.css";
import "../court-decisions.css";
import "../[slug]/article.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const slug = "park-street-trust-florida-quota-license-court-findings";
const canonicalUrl = `${siteUrl}/florida-liquor-license-news/${slug}`;
const pdfUrl = "/florida-liquor-license-news/court-documents/park-street-findings";

export const metadata: Metadata = {
  title: "Florida Quota Liquor License Court Findings | FLLM",
  description:
    "FLLM summary and full 42-page reader of the St. Johns County circuit-court findings addressing a Florida quota liquor license, property interests, use rights, specific performance and lis pendens.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    title: "Florida court addresses property rights in quota liquor license dispute",
    description:
      "Read FLLM's neutral transaction-focused summary and the complete court findings inside an FLLM-styled reader.",
    siteName: "Florida Liquor License Market",
  },
};

export default function ParkStreetTrustCourtFindingsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: "Florida court addresses property rights in St. Johns County quota liquor license dispute",
      description:
        "FLLM summary and full reader of circuit-court findings concerning a Florida quota liquor license transaction.",
      datePublished: "2025-09-26",
      mainEntityOfPage: canonicalUrl,
      publisher: {
        "@type": "Organization",
        name: "Florida Liquor License Market",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "News & Current Events",
          item: `${siteUrl}/florida-liquor-license-news`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Court Decisions & Litigation",
          item: canonicalUrl,
        },
      ],
    },
  ];

  return (
    <main className="news-insights-page news-article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="abt-header-wrap news-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="news-article-hero">
        <div className="page-shell news-article-shell">
          <nav className="news-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/florida-liquor-license-news">News &amp; Current Events</Link>
            <span>›</span>
            <strong>Court Decisions &amp; Litigation</strong>
          </nav>
          <span className="news-eyebrow">Court Decisions &amp; Litigation</span>
          <h1>Florida court addresses property rights in St. Johns County quota liquor license dispute</h1>
          <div className="news-article-meta">
            <time>September 26, 2025</time>
            <span>Florida Liquor License Market</span>
          </div>
          <p className="news-article-deck">
            A St. Johns County circuit court addressed the distinction between the property interest and use rights in a Florida quota liquor license, specific performance, lis pendens, and a later purchaser&apos;s knowledge of the pending litigation.
          </p>
        </div>
      </section>

      <article className="page-shell news-article-shell news-article-body">
        <p className="news-article-intro">
          The Circuit Court for the Seventh Judicial Circuit in and for St. Johns County issued Findings of Fact and Analysis of Law following a non-jury trial in litigation involving the Park Street Revocable Trust and Beachway Restaurants. FLLM presents a neutral transaction-focused summary followed by the complete 42-page findings in an on-page reader.
        </p>

        <section className="news-article-section">
          <h2>What the trial court addressed</h2>
          <p>
            The court described a Florida quota liquor license as having two distinct interests: the property interest in the license and the use rights associated with operating under the license. The findings concluded that the property interest can have value independent of the use rights and treated regulatory approval to exercise the license privileges as a separate issue.
          </p>
          <p>
            The decision also addressed the parties&apos; closing obligations, specific performance, a recorded lis pendens, and the knowledge of a later purchaser concerning the earlier specific-performance litigation.
          </p>
        </section>

        <section className="news-article-section">
          <h2>What the court ordered</h2>
          <p>
            The trial court granted the relief sought by the Park Street Trust and entered final judgment of specific performance against Beachway as to the liquor license at issue. The court retained jurisdiction to enforce the judgment and address additional relief described in the findings.
          </p>
        </section>

        <section className="news-article-section">
          <h2>Why this matters to Florida liquor-license transactions</h2>
          <p>
            For buyers, sellers, brokers and lenders, the decision is relevant to transaction structuring, title and lien due diligence, contract remedies, pending litigation, and the distinction the trial court drew between ownership of a property interest and regulatory approval to exercise license privileges.
          </p>
          <ul>
            <li>Define precisely what interest is being bought or sold and what must be delivered at closing.</li>
            <li>Investigate liens, pending lawsuits and recorded notices before funding or closing.</li>
            <li>Address title-curing duties and specific-performance remedies expressly in the purchase agreement.</li>
            <li>Keep private transaction rights analytically separate from DBPR / ABT approval to operate under a license.</li>
          </ul>
          <p>
            This is a Florida circuit-court trial decision, not statewide appellate precedent. FLLM presents the decision for market and educational context and does not express an opinion on the correctness of the ruling or provide legal advice.
          </p>
          <p>
            For a broader explanation of how Florida law can treat a liquor license as a regulatory privilege while recognizing transferable economic and property-like characteristics in other contexts, read FLLM&apos;s <Link href="/resources/florida-liquor-license-property-or-privilege">Is a Florida Liquor License Property or a Privilege?</Link> explainer.
          </p>
          <p>
            For users seeking counsel for a Florida liquor-license dispute or appeal, FLLM also maintains an independent directory of <Link href="/resources/liquor-license-attorneys#litigation-appeals">Florida Liquor License Litigation &amp; Appeals Attorneys</Link>.
          </p>
        </section>

        <section className="news-court-document" id="full-court-findings" aria-labelledby="court-document-title">
          <div className="news-court-document-head">
            <div>
              <span>Full court findings · FLLM reader</span>
              <h2 id="court-document-title">{PARK_STREET_FINDINGS_TITLE}</h2>
              <p>{PARK_STREET_FINDINGS_CASE} · Filed {PARK_STREET_FINDINGS_FILED} · {PARK_STREET_FINDINGS_PAGES.length} pages</p>
            </div>
            <div className="news-court-document-actions">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Open Full PDF</a>
              <a href={`${pdfUrl}?download=1`}>Download PDF</a>
            </div>
          </div>

          <div className="news-court-reader-note">
            FLLM reader copy: the complete text is reproduced from the filed findings for convenient on-site reading. Typography, spacing and line breaks differ from the clerk-filed document, and this reader is not a certified court record.
          </div>

          <div className="news-court-document-scroll" tabIndex={0} aria-label="Full 42-page court findings">
            {PARK_STREET_FINDINGS_PAGES.map((page, index) => (
              <section className="news-court-page" key={`court-page-${index + 1}`}>
                <div className="news-court-page-meta">
                  <span>FLLM Court Reader</span>
                  <span>Page {index + 1} of {PARK_STREET_FINDINGS_PAGES.length}</span>
                </div>
                <pre>{page}</pre>
              </section>
            ))}
          </div>
        </section>

        <aside className="news-court-source">
          <span>Document source</span>
          <strong>Seventh Judicial Circuit, St. Johns County — filed court findings</strong>
          <p>
            FLLM displays the filed findings directly in the reader above and provides an FLLM-formatted PDF for opening or downloading. No external court-document link is used on this page.
          </p>
        </aside>

        <div className="news-article-actions">
          <Link href="/florida-liquor-license-news">← Back to Florida Liquor License News</Link>
          <Link href="/resources/florida-liquor-license-property-or-privilege">Property or Privilege Explainer</Link>
          <Link href="/resources/liquor-license-attorneys#litigation-appeals">Find Litigation &amp; Appeals Attorneys</Link>
          <Link href="/listings">Browse Current Licenses</Link>
        </div>
      </article>

      <section className="news-final-cta">
        <div className="page-shell">
          <div>
            <span>Florida Market Intelligence</span>
            <h2>Put the decision in transaction context</h2>
            <p>Use FLLM&apos;s public records, county data, valuation tools and active inventory together.</p>
          </div>
          <div className="news-final-actions">
            <Link href="/license-lookup">Search Public Records</Link>
            <Link href="/florida-liquor-license-value">Estimate License Value</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
