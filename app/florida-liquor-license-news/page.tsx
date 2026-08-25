import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import CourtDecisionsFeature from "@/components/news/CourtDecisionsFeature";
import LiveNewsMonitor from "@/components/news/LiveNewsMonitor";
import "@/app/resources/forms/abt-forms.css";
import "./news-insights.css";
import "./news-mobile-readability.css";
import "./current-events.css";
import "./court-decisions.css";
import "./supplemental-sources.css";
import "./live-news-monitor.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-news`;
const pageUpdatedLabel = "August 25, 2026";
const pageUpdatedIso = "2026-08-25";

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
    eyebrow: "2026 Quota Drawing",
    title: "Florida announces 63 quota liquor licenses across 30 counties",
    date: "August 19, 2026",
    dateTime: "2026-08-19",
    copy:
      "DBPR's 2026 quota drawing entry period offers 63 licenses across 30 counties. Entries close September 30, 2026 at 5 p.m. EDT, and selection gives an entrant the right to apply rather than an issued license.",
    href: "/florida-liquor-license-news/florida-quota-drawing-season-what-applicants-should-watch-next",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "Quota Drawing",
    title: "2025 Florida quota drawing results are posted",
    date: "May 6, 2026",
    dateTime: "2026-05-06",
    copy:
      "Florida DBPR reports that the public drawing for the 2025 quota alcoholic beverage license entry period was held May 6, 2026, covering counties across the state.",
    href: "/florida-liquor-license-news/2025-florida-quota-drawing-results-posted",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "DBPR Update",
    title: "Online account requirement for ABT licensees and applicants",
    date: "Reviewed August 24, 2026",
    dateTime: "2026-08-24",
    copy:
      "DBPR says Alcoholic Beverages and Tobacco licensees, permit holders and applicants must create and maintain an account in the Division's online system.",
    href: "/florida-liquor-license-news/online-account-requirement-abt-licensees-applicants",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "Rulemaking Watch",
    title: "Quota drawing procedures are part of current ABT rulemaking notices",
    date: "Reviewed August 24, 2026",
    dateTime: "2026-08-24",
    copy:
      "The Division's News & Notices page includes rulemaking activity addressing quota drawing entry procedures and related beverage-license rules.",
    href: "/florida-liquor-license-news/quota-drawing-procedures-current-abt-rulemaking",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "License Data",
    title: "Track active and inactive Florida quota license lists",
    date: "Reviewed August 24, 2026",
    dateTime: "2026-08-24",
    copy:
      "DBPR publishes downloadable active and inactive quota-license listings that can help owners, buyers and market participants follow statewide license status data.",
    href: "/florida-liquor-license-news/track-active-inactive-florida-quota-license-lists",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "Legislation & Licensing Reform",
    title: "Florida's alcohol licensing reform opened the door to more small restaurants",
    date: "October 12, 2023",
    dateTime: "2023-10-12",
    copy:
      "The University of Miami Business Law Review examined Florida's 2023 special food service licensing reform, which lowered the size and seating thresholds for qualifying restaurants while retaining the 51% food and nonalcoholic beverage revenue requirement.",
    href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs",
    source: "University of Miami Business Law Review",
  },
] as const;

const supplementalCoverage = [
  {
    eyebrow: "Tied House & Licensing",
    title: "Burger King's Whopper Bar wins Florida alcohol license after 14 years",
    date: "December 16, 2024",
    dateTime: "2024-12-16",
    copy:
      "Greenspoon Marder reported that Florida DABT closed a long-running tied-house licensing dispute and granted the Miami Beach Whopper Bar a 2COP license subject to a consent-order restriction.",
    source: "Greenspoon Marder",
    sourceUrl: "https://www.gmlaw.com/news/a-new-chapter-for-tied-house-laws-burger-kings-whopper-bar-wins-florida-alcohol-license-after-14-years/",
  },
  {
    eyebrow: "Restaurant Licensing Video",
    title: "Gov. DeSantis signs law making it easier for some restaurants to get liquor licenses",
    date: "Published in 2023",
    dateTime: "2023",
    copy:
      "First Coast News covered Florida's restaurant-licensing reform that lowered the special food service size and seating thresholds for qualifying restaurants while preserving the food-sales requirement.",
    source: "First Coast News",
    sourceUrl: "https://www.firstcoastnews.com/",
  },
  {
    eyebrow: "Enforcement & Administrative Licensing",
    title: "DeSantis seeks to revoke alcohol license for Miami Hyatt over drag event",
    date: "March 15, 2023",
    dateTime: "2023-03-15",
    copy:
      "CBS News reported that Florida regulators moved to revoke the Hyatt Regency Miami liquor license after a December event. Hyatt said the license remained valid while it addressed the administrative complaint.",
    source: "CBS News / MoneyWatch",
    sourceUrl: "https://www.cbsnews.com/news/desantis-miami-hyatt-liquor-license-drag-show/",
  },
  {
    eyebrow: "Alcohol Law & Interstate Commerce",
    title: "Florida wine retailer loses challenge to Missouri liquor licensing rules",
    date: "February 16, 2021",
    dateTime: "2021-02-16",
    copy:
      "Courthouse News Service reported that the Eighth Circuit rejected a Florida wine retailer's challenge to Missouri liquor-license residency and physical-presence rules.",
    source: "Courthouse News Service",
    sourceUrl: "https://www.courthousenews.com/florida-wine-retailer-loses-challenge-to-missouri-liquor-licensing-rules/",
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
      dateModified: pageUpdatedIso,
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
              <p className="news-last-updated">
                <span aria-hidden="true" /> Last updated <time dateTime={pageUpdatedIso}>{pageUpdatedLabel}</time>
              </p>
              <div className="news-hero-actions">
                <a href="#current-events">Current Events</a>
                <a href="#live-monitor">Live News Monitor</a>
                <a href="#court-decisions">Court Decisions</a>
                <a href="#videos">Video Briefings</a>
              </div>
            </div>
            <aside className="news-hero-panel">
              <span>FLLM News Desk</span>
              <strong>Florida license news without losing the FLLM experience</strong>
              <p>FLLM publishes its own summaries, credits the original publisher, agency or court source, and keeps important videos and public-document readers inside FLLM whenever practical. The automated News Monitor also checks Google News, Bing News and selected Florida publishers for fresh liquor-license coverage.</p>
            </aside>
          </div>
        </div>
      </section>

      <nav className="news-category-nav" aria-label="Florida liquor license news categories">
        <div className="page-shell">
          <a href="#current-events">Current Events</a>
          <a href="#live-monitor">Live Monitor</a>
          <a href="#historical-enforcement">Historical Enforcement</a>
          <a href="#court-decisions">Court Decisions &amp; Litigation</a>
          <a href="#latest">Legislation &amp; Reform</a>
          <a href="#latest">DBPR &amp; ABT</a>
          <a href="#latest">Quota Drawings</a>
          <a href="#market-trends">Market Data</a>
          <a href="#videos">Video</a>
        </div>
      </nav>

      <section className="news-feature page-shell" id="current-events" aria-labelledby="current-event-title">
        <div className="news-feature-copy">
          <span>Current 2026 Development · August 19, 2026</span>
          <h2 id="current-event-title">Florida announces 63 quota liquor licenses across 30 counties</h2>
          <p>
            DBPR&apos;s August 19 announcement confirms 63 quota licenses across 30 counties. Entries close September 30, 2026 at 5 p.m. EDT. Selection provides the right to apply for a license; it does not itself issue one.
          </p>
          <div className="news-feature-actions">
            <Link href="/florida-liquor-license-news/florida-quota-drawing-season-what-applicants-should-watch-next">Read the 2026 FLLM Briefing</Link>
            <Link href="/resources/forms/abt-6033">View ABT-6033 Resources</Link>
          </div>
          <small className="news-feature-verified">Official DBPR announcement verified August 25, 2026</small>
        </div>
        <div className="news-feature-stat" aria-label="2026 quota drawing summary">
          <small>2026 quota licenses announced</small>
          <strong>63</strong>
          <span>licenses</span>
          <p>Across 30 Florida counties; entry closes September 30, 2026 at 5 p.m. EDT.</p>
        </div>
      </section>

      <LiveNewsMonitor />

      <CourtDecisionsFeature />

      <section className="news-latest" id="latest">
        <div className="page-shell">
          <div className="news-section-heading">
            <div><span>Dated News &amp; Regulatory Updates</span><h2>Florida liquor-license developments</h2></div>
            <span className="news-source-note">Each item shows its publication or FLLM review date</span>
          </div>
          <div className="news-card-grid">
            {officialUpdates.map((item) => (
              <article className="news-card" key={item.title}>
                <div className="news-card-meta"><span>{item.eyebrow}</span><time dateTime={item.dateTime}>{item.date}</time></div>
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

      <section className="news-latest" id="industry-coverage">
        <div className="page-shell">
          <div className="news-section-heading">
            <div><span>Additional Industry Coverage</span><h2>Florida liquor-license articles and cases</h2></div>
            <span className="news-source-note">FLLM summaries with publisher attribution</span>
          </div>
          <div className="news-card-grid">
            {supplementalCoverage.map((item) => (
              <article className="news-card" key={item.title}>
                <div className="news-card-meta"><span>{item.eyebrow}</span><time dateTime={item.dateTime}>{item.date}</time></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">View Original Source <span aria-hidden="true">↗</span></a>
                <small>Source: {item.source}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="news-current-event news-historical-event page-shell" id="historical-enforcement" aria-labelledby="historical-enforcement-title">
        <div className="news-section-heading">
          <div><span>Historical Enforcement Coverage</span><h2 id="historical-enforcement-title">Prior Florida licensing cases</h2></div>
          <span className="news-source-note">Archived by event date—not presented as current news</span>
        </div>
        <div className="news-current-event-card">
          <div className="news-current-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/kFBjJpE5iNo"
              title="WKMG News 6 report on the February 2023 Orlando venue liquor-license suspension action"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="news-current-copy">
            <span>Historical Case · February 3, 2023</span>
            <h2>Officials moved to suspend Orlando venue&apos;s liquor license after 2022 event</h2>
            <p>
              WKMG News 6 / ClickOrlando reported in February 2023 that Florida officials moved to suspend an Orlando performing arts venue&apos;s liquor license after a December 2022 event. This item is retained as historical enforcement context and is not a current 2026 development.
            </p>
            <div className="news-current-meta"><time dateTime="2023-02-03">Published February 3, 2023</time><span>Source: WKMG News 6 / ClickOrlando</span></div>
            <div className="news-current-actions">
              <Link href="/florida-liquor-license-news/orlando-venue-liquor-license-suspension-drag-show">Read Historical FLLM Summary</Link>
              <a href="https://www.clickorlando.com/video/news/2023/02/04/officials-move-to-suspend-orlando-venues-liquor-license-after-drag-show-attended-by-children/" target="_blank" rel="noopener noreferrer">Original Source ↗</a>
            </div>
          </div>
        </div>
      </section>

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

          <div className="news-current-event-card" style={{ marginTop: "22px" }}>
            <div className="news-current-video">
              <iframe
                src="https://www.youtube-nocookie.com/embed/f_0E98RqARw"
                title="Bar owners urge state regulator for relief on liquor license renewals"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="news-current-copy">
              <span>WKMG News 6 / ClickOrlando · License Renewals</span>
              <h2>Bar owners urge state regulator for relief on liquor-license renewals</h2>
              <p>
                WKMG News 6 / ClickOrlando reported on bars and breweries seeking relief from liquor-license renewal burdens while COVID-19 operating restrictions kept many businesses closed or restricted. The publisher video plays directly inside FLLM.
              </p>
              <div className="news-current-meta"><span>August 2020</span><span>Source: WKMG News 6 / ClickOrlando</span></div>
              <div className="news-current-actions">
                <a href="https://www.youtube.com/watch?v=f_0E98RqARw" target="_blank" rel="noopener noreferrer">Open Publisher Video ↗</a>
              </div>
            </div>
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
