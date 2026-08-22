import Link from "next/link";
import { ADDITIONAL_NEWS_ARTICLES } from "@/data/additional-news-articles";

const supplementalCards = [
  {
    eyebrow: "Legislation & Restaurant Licensing",
    title: "Florida's alcohol licensing reform opened the door to more small restaurants",
    date: "October 12, 2023",
    copy: "University of Miami Business Law Review analyzed Florida's 2023 special food service reform and the lower size and seating thresholds for qualifying restaurants.",
    href: "/florida-liquor-license-news/florida-alcohol-licensing-reform-small-restaurants-sfs",
    source: "University of Miami Business Law Review",
  },
  ...ADDITIONAL_NEWS_ARTICLES.map((article) => ({
    eyebrow: article.eyebrow,
    title: article.title,
    date: article.date,
    copy: article.summary,
    href: `/florida-liquor-license-news/${article.slug}`,
    source: article.officialSourceLabel,
  })),
];

export default function SupplementalNewsCoverage() {
  return (
    <>
      <section className="news-latest news-supplemental-coverage" aria-labelledby="supplemental-news-title">
        <div className="page-shell">
          <div className="news-section-heading">
            <div>
              <span>Additional Florida Coverage</span>
              <h2 id="supplemental-news-title">Florida liquor-license articles, cases and industry developments</h2>
            </div>
            <span className="news-source-note">FLLM summaries with publisher attribution</span>
          </div>
          <div className="news-card-grid">
            {supplementalCards.map((item) => (
              <article className="news-card" key={item.href}>
                <div className="news-card-meta"><span>{item.eyebrow}</span><time>{item.date}</time></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <a href={item.href}>Read Inside FLLM <span aria-hidden="true">›</span></a>
                <small>Source: {item.source}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="news-videos news-supplemental-videos" aria-labelledby="supplemental-video-title">
        <div className="page-shell">
          <div className="news-section-heading news-section-heading-light">
            <div><span>Additional Publisher Video</span><h2 id="supplemental-video-title">Florida liquor-license video coverage inside FLLM</h2></div>
          </div>
          <div className="news-video-grid">
            <Link className="news-video-card news-video-primary" href="/florida-liquor-license-news/florida-bar-owners-liquor-license-renewal-relief-covid">
              <div className="news-video-preview">
                <img src="https://i.ytimg.com/vi/f_0E98RqARw/hqdefault.jpg" alt="WKMG News 6 liquor license renewal report" />
                <span className="news-play" aria-hidden="true">▶</span>
              </div>
              <div>
                <span>WKMG News 6 / ClickOrlando</span>
                <strong>Bar owners urge state regulator for relief on liquor-license renewals</strong>
                <p>The August 2020 publisher video is embedded on the FLLM article with a licensing and renewal-context summary.</p>
              </div>
            </Link>

            <Link className="news-video-card" href="/florida-liquor-license-news/desantis-signs-law-easier-restaurants-liquor-licenses">
              <div className="news-video-preview news-video-text-preview">
                <span className="news-play" aria-hidden="true">▶</span>
                <strong>First Coast News</strong>
                <small>Restaurant liquor-license reform</small>
              </div>
              <div>
                <span>First Coast News</span>
                <strong>Gov. DeSantis signs law making it easier for some restaurants to get liquor licenses</strong>
                <p>Read FLLM's summary of the 2023 restaurant-licensing change and open the publisher source from the article.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .news-supplemental-coverage{border-top:1px solid #d9dfe4}
        .news-supplemental-videos{border-top:1px solid rgba(246,167,0,.24)}
        .news-video-text-preview{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:radial-gradient(circle at 50% 45%,#173956,#020b13 72%);color:#fff;text-align:center}
        .news-video-text-preview strong{margin:72px 20px 0;font-size:24px;line-height:1.1}
        .news-video-text-preview small{color:#f6a700;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.08em}
      `}</style>
    </>
  );
}
