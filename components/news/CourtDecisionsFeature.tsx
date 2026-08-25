import Link from "next/link";

export default function CourtDecisionsFeature() {
  return (
    <section
      className="news-court-feature page-shell"
      id="court-decisions"
      aria-labelledby="court-decisions-title"
    >
      <div className="news-section-heading">
        <div>
          <span>Court Decisions &amp; Litigation</span>
          <h2 id="court-decisions-title">Florida liquor-license cases with transaction impact</h2>
        </div>
        <span className="news-source-note">Full findings available inside FLLM</span>
      </div>

      <article className="news-court-feature-card">
        <div className="news-court-feature-label">
          <span>St. Johns County · Circuit Court</span>
          <div>
            <strong>42</strong>
            <small>page findings</small>
          </div>
          <em>Filed September 26, 2025</em>
        </div>

        <div className="news-court-feature-copy">
          <span>Court Decisions &amp; Litigation</span>
          <h3>Florida court addresses property rights in St. Johns County quota liquor license dispute</h3>
          <p>
            In findings following a non-jury trial, the Seventh Judicial Circuit addressed the distinction between the property interest and use rights in a Florida quota liquor license, specific performance, lis pendens, and a later purchaser&apos;s knowledge of the pending litigation.
          </p>
          <p className="news-court-feature-context">
            FLLM presents a neutral transaction-focused summary and the complete filed findings in a scrollable FLLM reader. The document can also be opened or downloaded as an FLLM-formatted PDF without sending the reader to an outside court site.
          </p>
          <div className="news-court-feature-actions">
            <Link href="/florida-liquor-license-court-decisions">
              Browse Court Decisions &amp; Case Law
            </Link>
            <Link href="/florida-liquor-license-news/park-street-trust-florida-quota-license-court-findings">
              Read Findings Inside FLLM
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
