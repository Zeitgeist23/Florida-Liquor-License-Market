import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import "@/app/resources/forms/abt-forms.css";
import "./news-insights.css";
import "./news-mobile-readability.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";
const canonicalUrl = `${siteUrl}/florida-liquor-license-news`;

export const metadata: Metadata = {
  title: "Florida Liquor License News & Insights | FLLM",
  description:
    "Follow Florida liquor license news, DBPR and ABT updates, quota drawing developments, 4COP and 3PS market trends, transaction data and FLLM video briefings.",
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Florida Liquor License News & Insights",
    description:
      "Florida liquor license news, official DBPR updates, quota drawing developments, market trends and FLLM briefings.",
    siteName: "Florida Liquor License Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florida Liquor License News & Insights",
    description:
      "Florida liquor license news, DBPR updates, quota drawing developments and market trends from FLLM.",
  },
};

const officialUpdates = [
  {
    eyebrow: "Quota Drawing",
    title: "2025 Florida quota drawing results are posted",
    date: "May 6, 2026",
    copy:
      "Florida DBPR reports that the public drawing for the 2025 quota alcoholic beverage license entry period was held May 6, 2026, covering counties across the state.",
    href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/quota-license-information/",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "DBPR Update",
    title: "Online account requirement for ABT licensees and applicants",
    date: "Current DBPR notice",
    copy:
      "DBPR says Alcoholic Beverages and Tobacco licensees, permit holders and applicants must create and maintain an account in the Division's online system.",
    href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/faqs/",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "Rulemaking Watch",
    title: "Quota drawing procedures are part of current ABT rulemaking notices",
    date: "Current rulemaking notice",
    copy:
      "The Division's News & Notices page includes rulemaking activity addressing quota drawing entry procedures and related beverage-license rules.",
    href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/news-and-notices/",
    source: "Florida DBPR / ABT",
  },
  {
    eyebrow: "License Data",
    title: "Track active and inactive Florida quota license lists",
    date: "Updated by DBPR",
    copy:
      "DBPR publishes downloadable active and inactive quota-license listings that can help owners, buyers and market participants follow statewide license status data.",
    href: "https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/quota-license-information/",
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
      name: "Florida Liquor License News & Insights",
      url: canonicalUrl,
      description:
        "Florida liquor license news, DBPR and ABT updates, quota drawing developments, market trends and FLLM briefings.",
      isPartOf: { "@type": "WebSite", name: "Florida Liquor License Market", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "News & Insights", item: canonicalUrl },
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
            <Link href="/">Home</Link><span>›</span><strong>News &amp; Insights</strong>
          </nav>
          <div className="news-hero-grid">
            <div>
              <span className="news-eyebrow">Florida Liquor License Market Intelligence</span>
              <h1>Florida Liquor License News &amp; Insights</h1>
              <p>
                Follow the developments that can matter to Florida liquor-license buyers, sellers, brokers, investors and operators—from DBPR notices and quota drawings to 4COP and 3PS market activity.
              </p>
              <div className="news-hero-actions">
                <a href="#latest">Latest Updates</a>
                <a href="#videos">Video Briefings</a>
              </div>
            </div>
            <aside className="news-hero-panel">
              <span>FLLM News Desk</span>
              <strong>One place for Florida license-market developments</strong>
              <p>Official updates are linked to their original sources. FLLM market tools and commentary are clearly identified separately.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="news-feature page-shell" aria-labelledby="news-feature-title">
        <div className="news-feature-copy">
          <span>FLLM Briefing · August 16, 2026</span>
          <h2 id="news-feature-title">Florida quota drawing season: what applicants should watch next</h2>
          <p>
            Florida&apos;s annual quota drawing process is one of the most closely watched events in the state&apos;s liquor-license market. DBPR states that drawing entries are accepted for 45 days beginning on the third Monday in August when quota licenses are available. Before entering, applicants should confirm the current DBPR notice, eligible counties, filing deadline and ABT-6033 requirements directly with the Division.
          </p>
          <div className="news-feature-actions">
            <a href="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=17270&clientCode=4087&xactCode=1030" target="_blank" rel="noopener noreferrer">Check Official Drawing Requirements <span aria-hidden="true">↗</span></a>
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
            <div><span>Latest Updates</span><h2>Florida liquor-license developments</h2></div>
            <a href="https://www2.myfloridalicense.com/alcoholic-beverages-and-tobacco/" target="_blank" rel="noopener noreferrer">Florida DBPR / ABT <span aria-hidden="true">↗</span></a>
          </div>
          <div className="news-card-grid">
            {officialUpdates.map((item) => (
              <article className="news-card" key={item.title}>
                <div className="news-card-meta"><span>{item.eyebrow}</span><time>{item.date}</time></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer">Read Official Source <span aria-hidden="true">↗</span></a>
                <small>Source: {item.source}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="news-market page-shell" aria-labelledby="market-trends-title">
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
            <div><span>Video &amp; Briefings</span><h2>Watch and listen to FLLM market coverage</h2></div>
          </div>
          <div className="news-video-grid">
            <Link className="news-video-card news-video-primary" href="/#market-data">
              <div className="news-video-preview">
                <img src="/assets/market-report-studio.png" alt="Florida Liquor License Market Report studio" />
                <span className="news-play" aria-hidden="true">▶</span>
              </div>
              <div><span>FLLM Market Report</span><strong>Florida Market Insights</strong><p>Open the latest FLLM market-insights section and market report from the homepage.</p></div>
            </Link>
            <Link className="news-video-card" href="/#market-report">
              <div className="news-video-preview news-video-how-it-works">
                <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
                <span className="news-play" aria-hidden="true">▶</span>
              </div>
              <div><span>Marketplace Briefing</span><strong>How Florida Liquor License Market Works</strong><p>See the marketplace flow for buyers, sellers, financing sources and investors.</p></div>
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
