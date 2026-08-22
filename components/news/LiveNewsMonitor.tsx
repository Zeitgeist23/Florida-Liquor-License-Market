"use client";

import { useEffect, useMemo, useState } from "react";

type MonitorItem = {
  slug: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string | null;
  category: string;
  provider: string;
  relevanceScore: number;
  videoEmbedUrl?: string;
  monitorNote: string;
};

type MonitorResponse = {
  updatedAt: string;
  refreshMinutes: number;
  sources: string[];
  items: MonitorItem[];
  error?: string;
};

function formatDate(value: string | null) {
  if (!value) return "Recently discovered";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently discovered";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function LiveNewsMonitor() {
  const [data, setData] = useState<MonitorResponse | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const response = await fetch("/api/news-monitor", { cache: "no-store" });
        const payload = (await response.json()) as MonitorResponse;
        if (!cancelled) setData(payload);
      } catch {
        if (!cancelled) {
          setData({
            updatedAt: new Date().toISOString(),
            refreshMinutes: 30,
            sources: [],
            items: [],
            error: "The live monitor is temporarily unavailable.",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void refresh();
    const timer = window.setInterval(refresh, 30 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const visibleItems = useMemo(() => data?.items?.slice(0, 12) ?? [], [data]);

  return (
    <section className="live-news-monitor page-shell" id="live-monitor" aria-labelledby="live-monitor-title">
      <div className="news-section-heading live-news-monitor-heading">
        <div>
          <span>Automated Discovery · FLLM News Monitor</span>
          <h2 id="live-monitor-title">Fresh Florida liquor-license coverage from across the web</h2>
        </div>
        <div className="live-news-monitor-status">
          <strong>{loading ? "Scanning sources…" : "Monitor active"}</strong>
          <small>Refreshes about every 30 minutes</small>
        </div>
      </div>

      <div className="live-news-monitor-explainer">
        <p>
          FLLM checks Google News and Bing News feeds plus Florida publishers including First Coast News, ClickOrlando, WFLA, FOX 13 Tampa Bay, CBS Miami, Miami Herald, Tampa Bay Times and Florida Politics. Stories are scored for Florida liquor-license relevance and duplicates are removed automatically.
        </p>
        <span>Current FLLM articles and playable videos remain unchanged above and below this monitor.</span>
      </div>

      {data?.error && visibleItems.length === 0 ? (
        <div className="live-news-monitor-empty">
          <strong>Live discovery is temporarily unavailable.</strong>
          <p>The curated FLLM News Desk, court coverage and video library remain available while the monitor refreshes.</p>
        </div>
      ) : null}

      {!loading && !data?.error && visibleItems.length === 0 ? (
        <div className="live-news-monitor-empty">
          <strong>No new high-relevance stories found in the latest scan.</strong>
          <p>FLLM filters out low-relevance and duplicate stories rather than filling the page with unrelated alcohol news.</p>
        </div>
      ) : null}

      <div className="live-news-monitor-grid">
        {visibleItems.map((item) => {
          const isOpen = expanded === item.slug;
          return (
            <article className={`live-news-monitor-card${isOpen ? " is-open" : ""}`} key={item.slug}>
              <div className="live-news-monitor-meta">
                <span>{item.category}</span>
                <time>{formatDate(item.publishedAt)}</time>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="live-news-monitor-source">
                <strong>{item.source}</strong>
                <small>{item.provider}</small>
              </div>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : item.slug)}
              >
                {isOpen ? "Close FLLM Reader" : "Read Inside FLLM"}
                <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen ? (
                <div className="live-news-monitor-reader">
                  {item.videoEmbedUrl ? (
                    <div className="live-news-monitor-video">
                      <iframe
                        src={item.videoEmbedUrl}
                        title={item.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                  <span>FLLM News Monitor Reader</span>
                  <h4>{item.title}</h4>
                  <p>{item.summary}</p>
                  <div className="live-news-monitor-why">
                    <strong>Why FLLM surfaced this</strong>
                    <p>{item.monitorNote}</p>
                  </div>
                  <p className="live-news-monitor-rights-note">
                    FLLM shows the source-provided headline and summary inside this reader and does not reproduce the publisher&apos;s full copyrighted article. When a publisher exposes an embeddable video, FLLM plays it here without sending the viewer away from the site.
                  </p>
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                    View original publisher source ↗
                  </a>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {data?.updatedAt ? (
        <p className="live-news-monitor-updated">Last scan: {new Date(data.updatedAt).toLocaleString()}</p>
      ) : null}
    </section>
  );
}
