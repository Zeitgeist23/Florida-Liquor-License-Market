import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import CourtDecisionsFeature from "@/components/news/CourtDecisionsFeature";
import SupplementalNewsCoverage from "@/components/news/SupplementalNewsCoverage";
import "@/app/resources/forms/abt-forms.css";
import "./news-insights.css";
import "./news-mobile-readability.css";
import "./current-events.css";
import "./court-decisions.css";
import "./supplemental-sources.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-news`;

export const metadata: Metadata = {
  title: "Florida Liquor License News & Current Events | FLLM",
  description:
    "Follow Florida liquor license news and current events, DBPR and ABT updates, enforcement matters, court decisions, licensing reform, quota drawing developments, 4COP and 3PS market trends, transaction data and FLLM video briefings.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License News & Current Events",
    description:
      "Florida liquor license news, current events, enforcement developments, court decisions, licensing reform, official DBPR updates, quota drawing developments and market trends.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor License News & Current Events",
    description:
      "Florida liquor license news, current events, court decisions, licensing reform, DBPR updates, enforcement matters and market trends from FLLM.",
  },
};

const officialUpdates = [
  {
    eyebrow: "Legislation & Licensing Reform",
    title: "Florida's alcohol licensing reform opened the door to more small restaurants",
    date: "October 12, 2023",
    copy:
      "The University of Miami Business Law Review examined Florida's 2023 special food service licensing reform, which lowered the size and seating thresholds for qualifying restaurants while retaining the 51% food and nonalcoholic beverage revenue requirement.",
    href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs",
    source: "University of Miami Business Law Review",
  },
  {
    eyebrow: "Enforcement & Current Events",
    title: "Officials move to suspend Orlando venue's liquor license after drag show attended by children",
    date: "February 3, 2023",
    copy:
      "WKMG News 6 / ClickOrlando reported that Florida officials moved to suspend an Orlando performing arts venue's liquor license after a December 2022 event.",
    href: "/florida-liquor-license-news/orlando-venue-liquor-license-suspension-drag-show",
    source: "WKMG News 6 / ClickOrlando",
  },
  {
    eyebrow: "Quota Drawing",
    title: "2025 Florida quota drawing results are posted",
    date: "May 6, 2026",
    copy:
      "Florida DBPR reports that the public drawing for the 2025 quota alcoholic beverage license entry period was held May 6, 2026, covering counties across the state.",
    href: "/florida-liquor-license-news/2025-florida-quota-drawing-results-posted",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "DBPR Update",
    title: "Online account requirement for ABT licensees and applicants",
    date: "Current DBPR notice",
    copy:
      "DBPR says Alcoholic Beverages and Tobacco licensees, permit holders and applicants must create and maintain an account in the Division's online system.",
    href: "/florida-liquor-license-news/online-account-requirement-abt-licensees-applicants",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "Rulemaking Watch",
    title: "Quota drawing procedures are part of current ABT rulemaking notices",
    date: "Current rulemaking notice",
    copy:
      "The Division's News & Notices page includes rulemaking activity addressing quota drawing entry procedures and related beverage-license rules.",
    href: "/florida-liquor-license-news/quota-drawing-procedures-current-abt-rulemaking",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "License Data",
    title: "Track active and inactive Florida quota license lists",
    date: "Updated by DBPR",
    copy:
      "DBPR publishes downloadable active and inactive quota-license listings that can help owners, buyers and market participants follow statewide license status data.",
    href: "/florida-liquor-license-news/track-active-inactive-florida-quota-license-lists",
    source: "Florida DBPR / ABT",
  },
] as const;

const marketLinks = [
  {
    title: "Florida Liquor License Value Estimator",
    copy: "Check county-specific asking-price evidence for 4COP and 3PS licenses.",
    href: "/florida-liquor-license-value",
  },
  {
    title: "Recent Florida Transactions",
    copy: "Review licenses FLLM currently identifies as sold in the marketplace.",
    href: "/listings?status=sold",
  },
  {
    title: "Florida Licenses by County",
    copy: "Move from statewide news into county-specific market pages and inventory.",
    href: "/counties",
  },
] as const;

export default function FloridaLiquorLicenseNewsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Florida Liquor License News & Current Events",
      url: canonicalUrl,
      description:
        "Florida liquor license news, current events, DBPR and ABT updates, enforcement matters, court decisions, licensing reform, quota drawing developments, market trends and FLLM briefings.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "News & Current Events", item: canonicalUrl },
      ],
    },
  ];

  return (
    <main className="news-insights-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />

      <div className="abt-header-wrap news-header-wrap">
        <FormsSiteHeader primaryActionHref="/sell-your-license" primaryActionLabel="Sell Your License" />
      </div>

      <section className="news-hero">
        <div className="page-shell">
          <nav className="news-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><strong>News &amp; Current Events</strong>
          </nav>
          <div className="news-hero-grid">
            <div>
              <span className="news-eyebrow">Florida Liquor License News Desk</span>
              <h1>Florida Liquor License News &amp; Current Events</h1>
              <p>
                Follow Florida liquor-license headlines, enforcement matters, court decisions, licensing reform, DBPR and ABT notices, quota drawings, legislation, market activity and video reports—all presented inside an FLLM-style news experience.
              </p>
              <div className="news-hero-actions">
                <a href="#current-events">Current Events</a>
                <a href="#court-decisions">Court Decisions</a>
                <a href="#latest">Latest Updates</a>
                <a href="#videos">Video Briefings</a>
              </div>
            </div>
            <aside className="news-hero-panel">
              <span>FLLM News Desk</span>
              <strong>Florida license news without losing the FLLM experience</strong>
              <p>FLLM publishes its own summaries, credits the original publisher, agency or court source, and keeps important videos and public-document readers inside FLLM whenever practical.</p>
            </aside>
          </div>
        </div>
      </section>

      <nav className="news-category-nav" aria-label="Florida liquor license news categories">
        <div className="page-shell">
          <a href="#current-events">Current Events</a>
          <a href="#latest">Enforcement</a>
          <a href="#court-decisions">Court Decisions &amp; Litigation</a>
          <a href="#latest">Legislation &amp; Reform</a>
          <a href="#latest">DBPR &amp; ABT</a>
          <a href="#latest">Quota Drawings</a>
          <a href="#market-trends">Market Data</a>
          <a href="#videos">Video</a>
        </div>
      </nav>

      <section className="news-current-event page-shell" id="current-events" aria-labelledby="current-event-title">
        <div className="news-section-heading">
          <div><span>Featured Current Event</span><h2>Florida liquor-license enforcement in the news</h2></div>
          <span className="news-source-note">Publisher video stays inside FLLM</span>
        </div>
        <div className="news-current-event-card">
          <div className="news-current-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/kFBjJpE5iNo"
              title="WKMG News 6 report on Orlando venue liquor-license suspension action"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="news-current-copy">
            <span>Enforcement &amp; Current Events</span>
            <h2 id="current-event-title">Officials move to suspend Orlando venue&apos;s liquor license after drag show attended by children</h2>
            <p>
              WKMG News 6 / ClickOrlando reported that Florida officials moved to suspend an Orlando performing arts venue&apos;s liquor license after a December 2022 event. FLLM summarizes the licensing significance while the station&apos;s official video plays directly on this page.
            </p>
            <div className="news-current-meta"><span>February 3, 2023</span><span>Source: WKMG News 6 / ClickOrlando</span></div>
            <div className="news-current-actions">
              <Link href="/florida-liquor-license-news/orlando-venue-liquor-license-suspension-drag-show">Read FLLM Summary</Link>
              <a href="https://www.clickorlando.com/video/news/2023/02/04/officials-move-to-suspend-orlando-venues-liquor-license-after-drag-show-attended-by-children/" target="_blank" rel="noopener noreferrer">Original Source ↗</a>
            </div>
          </div>
        </div>
      </section>

      <CourtDecisionsFeature />

      <section className="news-feature page-shell" aria-labelledby="news-feature-title">
        <div className="news-feature-copy">
          <span>FLLM Briefing · August 16, 2026</span>
          <h2 id="news-feature-title">Florida quota drawing season: what applicants should watch next</h2>
          <p>
            Florida&apos;s annual quota drawing process is one of the most closely watched events in the state&apos;s liquor-license market. DBPR states that drawing entries are accepted for 45 days beginning on the third Monday in August when quota licenses are available. Before entering, applicants should confirm the current DBPR notice, eligible counties, filing deadline and ABT-6033 requirements directly with the Division.
          </p>
          <div className="news-feature-actions">
            <Link href="/florida-liquor-license-news/florida-quota-drawing-season-what-applicants-should-watch-next">Read FLLM Briefing</Link>
            <Link href="/resources/forms/abt-6033">View ABT-6033 Resources</Link>
          </div>
        </div>
        <div className="news-feature-stat" aria-label="Quota drawing entry period">
          <small>DBPR annual entry window</small>
          <strong>45</strong>
          <span>days</span>
          <p>Beginning the third Monday in August when one or more quota licenses are available.</p>
        </div>
      </section>

      <section className="news-latest" id="latest">
        <div className="page-shell">
          <div className="news-section-heading">
            <div><span>News &amp; Regulatory Updates</span><h2>Florida liquor-license developments</h2></div>
            <span className="news-source-note">FLLM summaries with original source attribution</span>
          </div>
          <div className="news-card-grid">
            {officialUpdates.map((item) => (
              <article className="news-card" key={item.title}>
                <div className="news-card-meta"><span>{item.eyebrow}</span><time>{item.date}</time></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <Link href={item.href}>Read Inside FLLM <span aria-hidden="true">›</span></Link>
                <small className={item.source.includes("ClickOrlando") || item.source.includes("University of Miami") ? "news-card-source-publisher" : undefined}>Source: {item.source}</small>
              </article>
            ))}
          </div>

          <aside className="news-practitioner-source" aria-label="Additional practitioner source for the 2023 restaurant liquor-license reform">
            <div>
              <span>Legislation &amp; Reform · Additional Source</span>
              <h3>Lowndes: Change in Florida Alcohol Statute Eases Requirements for Restaurant Liquor Licenses</h3>
              <p>
                Lowndes also analyzed the 2023 special food service reform, emphasizing that the reduced size and seating thresholds can allow more small restaurants to qualify for full-liquor service without purchasing a quota license on the open market.
              </p>
            </div>
            <div className="news-practitioner-source-meta">
              <span>July 24, 2023 · Lowndes</span>
              <Link href="/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs">Read the FLLM Reform Analysis</Link>
              <a href="https://www.lowndes-law.com/newsroom/insights/change-in-florida-alcohol-statute-eases-requirements-for-restaurant-liquor-licenses" target="_blank" rel="noopener noreferrer">View Lowndes Source ↗</a>
            </div>
          </aside>
        </div>
      </section>

      <SupplementalNewsCoverage />

      <section className="news-market page-shell" id="market-trends" aria-labelledby="market-trends-title">
        <div className="news-section-heading">
          <div><span>Market Trends</span><h2 id="market-trends-title">Turn the news into market context</h2></div>
          <Link href="/listings">Browse Current Inventory</Link>
        </div>
        <div className="news-market-grid">
          {marketLinks.map((item) => (
            <Link href={item.href} key={item.title}>
              <span>FLLM Market Data</span>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
              <small>Open ›</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="news-videos" id="videos">
        <div className="page-shell">
          <div className="news-section-heading news-section-heading-light">
            <div><span>Video &amp; Briefings</span><h2>Watch Florida liquor-license coverage inside FLLM</h2></div>
          </div>
          <div className="news-video-grid">
            <Link className="news-video-card news-video-primary" href="/florida-liquor-license-news/orlando-venue-liquor-license-suspension-drag-show">
              <div className="news-video-preview">
                <img src="https://i.ytimg.com/vi/kFBjJpE5iNo/hqdefault.jpg" alt="WKMG News 6 Orlando liquor-license enforcement report" />
                <span className="news-play" aria-hidden="true">▶</span>
              </div>
              <div><span>Publisher Video</span><strong>Orlando liquor-license enforcement report</strong><p>Watch the WKMG News 6 / ClickOrlando report and read FLLM&apos;s licensing summary without leaving the FLLM article.</p></div>
            </Link>
            <Link className="news-video-card" href="/#market-data">
              <div className="news-video-preview">
                <img src="/assets/market-report-studio.png" alt="Florida Liquor License Market Report studio" />
                <span className="news-play" aria-hidden="true">▶</span>
              </div>
              <div><span>FLLM Market Report</span><strong>Florida Market Insights</strong><p>Open the latest FLLM market-insights section and market report from the homepage.</p></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="news-final-cta">
        <div className="page-shell">
          <div><span>Florida Market Intelligence</span><h2>From a headline to a license opportunity</h2><p>Use FLLM&apos;s news, valuation tools, county data and active inventory together.</p></div>
          <div className="news-final-actions"><Link href="/listings">Browse Licenses</Link><Link href="/florida-liquor-license-value">Estimate License Value</Link></div>
        </div>
      </section>
    </main>
  );
}