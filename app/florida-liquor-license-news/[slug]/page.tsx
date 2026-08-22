import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import { NEWS_ARTICLES, getNewsArticle } from "@/data/news-articles";
import "@/app/resources/forms/abt-forms.css";
import "../news-insights.css";
import "../news-mobile-readability.css";
import "../current-events.css";
import "../supplemental-sources.css";
import "./article.css";

const siteUrl = "https://www.floridaliquorlicensemarket.com";

export function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};

  const url = `${siteUrl}/florida-liquor-license-news/${article.slug}`;
  return {
    title: `${article.title} | FLLM`,
    description: article.summary,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.summary,
      siteName: "Florida Liquor License Market",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function FloridaLiquorLicenseNewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const articleUrl = `${siteUrl}/florida-liquor-license-news/${article.slug}`;
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    ...(article.publishedDate ? { datePublished: article.publishedDate, dateModified: article.publishedDate } : {}),
    mainEntityOfPage: articleUrl,
    publisher: {
      "@type": "Organization",
      name: "Florida Liquor License Market",
      url: siteUrl,
    },
  };
  const structuredData = [
    articleStructuredData,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "News & Current Events", item: `${siteUrl}/florida-liquor-license-news` },
        { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
      ],
    },
  ];

  const isPublisherStory = article.sourceType === "publisher";
  const isSfsReformStory = article.slug === "florida-alcohol-licensing-reform-small-restaurants-sfs";

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
            <Link href="/">Home</Link><span>›</span><Link href="/florida-liquor-license-news">News &amp; Current Events</Link><span>›</span><strong>{article.eyebrow}</strong>
          </nav>
          <span className="news-eyebrow">{article.eyebrow}</span>
          <h1>{article.title}</h1>
          <div className="news-article-meta">
            <time>{article.date}</time>
            <span>Florida Liquor License Market</span>
          </div>
          <p className="news-article-deck">{article.summary}</p>
        </div>
      </section>

      <article className="page-shell news-article-shell news-article-body">
        {article.video && (
          <figure className="news-article-video">
            <div className="news-article-video-frame">
              <iframe
                src={article.video.embedUrl}
                title={article.video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <figcaption className="news-article-video-caption">
              <span className="news-article-video-credit">Video source</span><br />
              <strong>{article.video.provider}</strong> — video plays inside FLLM using the publisher&apos;s official embedded player.
            </figcaption>
          </figure>
        )}

        {isSfsReformStory && !article.video && (
          <figure className="news-article-video">
            <div className="news-article-video-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/oJw45KzNvtI"
                title="First Coast News report on Florida restaurant liquor-license reform"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <figcaption className="news-article-video-caption">
              <span className="news-article-video-credit">Video source</span><br />
              <strong>First Coast News</strong> — the publisher&apos;s official report plays inside FLLM while the FLLM article provides the broader statewide licensing context.
            </figcaption>
          </figure>
        )}

        <p className="news-article-intro">{article.intro}</p>

        {article.sections.map((section) => (
          <section key={section.heading} className="news-article-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && section.bullets.length > 0 && (
              <ul>
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            )}
          </section>
        ))}

        {isSfsReformStory && (
          <section className="news-article-section">
            <h2>Florida practitioner analysis</h2>
            <p>
              Lowndes published a Florida practitioner analysis on July 24, 2023 describing the same statutory change. The firm explained that the legislation reduced the prior 2,500-square-foot and 150-person thresholds to 2,000 square feet and 120 seats for qualifying special food service restaurants.
            </p>
            <p>
              Lowndes also emphasized the practical market consequence: smaller restaurants that satisfy the SFS requirements may be able to serve full liquor without purchasing a quota license on the open market. That makes SFS eligibility an important early due-diligence question for restaurant buyers and operators comparing licensing paths.
            </p>
          </section>
        )}

        <aside className={`news-article-source ${isPublisherStory ? "news-article-source-publisher" : ""}`}>
          <span>{isPublisherStory ? "Original reporting" : "Official source"}</span>
          <strong>{article.officialSourceLabel}</strong>
          <p>
            {isPublisherStory
              ? "FLLM summarizes the development for Florida liquor-license market participants while crediting the original publisher and keeping the main reading and video experience on FLLM."
              : "FLLM summarizes the development for market participants. Use the official agency source to verify current requirements, notices and source documents."}
          </p>
          {article.sourceNote && <p className="news-source-disclosure">{article.sourceNote}</p>}
          <a href={article.officialSourceUrl} target="_blank" rel="noopener noreferrer">
            {isPublisherStory ? "View Original Publisher Source" : "Open Official DBPR / ABT Source"} <span aria-hidden="true">↗</span>
          </a>
        </aside>

        {isSfsReformStory && (
          <section className="news-additional-sources" aria-labelledby="additional-practitioner-sources-title">
            <h2 id="additional-practitioner-sources-title">Additional Florida practitioner source</h2>
            <div className="news-additional-source-card">
              <span>Lowndes · Florida alcohol licensing</span>
              <strong>Change in Florida Alcohol Statute Eases Requirements for Restaurant Liquor Licenses</strong>
              <em>Published July 24, 2023</em>
              <p>
                Lowndes analyzed the same 2023 SFS reform from a Florida practitioner perspective, highlighting the reduced size and seating requirements and the potential for smaller restaurants to qualify for full-liquor service without buying a quota license.
              </p>
              <a
                href="https://www.lowndes-law.com/newsroom/insights/change-in-florida-alcohol-statute-eases-requirements-for-restaurant-liquor-licenses"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Lowndes Source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        )}

        <div className="news-article-actions">
          <Link href="/florida-liquor-license-news">← Back to Florida Liquor License News</Link>
          <Link href="/listings">Browse Current Licenses</Link>
        </div>
      </article>

      <section className="news-final-cta">
        <div className="page-shell">
          <div><span>Florida Market Intelligence</span><h2>Put the update in market context</h2><p>Use FLLM&apos;s public records, county data, valuation tools and active inventory together.</p></div>
          <div className="news-final-actions"><Link href="/license-lookup">Search Public Records</Link><Link href="/florida-liquor-license-value">Estimate License Value</Link></div>
        </div>
      </section>
    </main>
  );
}
