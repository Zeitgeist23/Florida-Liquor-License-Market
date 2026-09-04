import Link from "next/link";
import styles from "./BrokerDetailPreview.module.css";

type Tier = "standard" | "featured";

export default function BrokerDetailPreview({ tier }: { tier: Tier }) {
  const featured = tier === "featured";
  const href = featured
    ? "/brokers/sample-featured-listing"
    : "/brokers/sample-standard-listing";

  return (
    <div className={styles.wrap}>
      <div className={styles.label}>
        <span>{featured ? "Featured Detail Page" : "Standard Detail Page"}</span>
        <small>cropped preview</small>
      </div>
      <div className={styles.frame} aria-label={`${tier} listing detail page preview`}>
        <div className={styles.browser} aria-hidden="true">
          <i className={styles.dot} />
          <i className={styles.dot} />
          <i className={styles.dot} />
        </div>
        <div className={styles.scene}>
          <div className={styles.hero}>
            {featured ? <span className={styles.featuredFlag}>Featured Listing</span> : null}
            <span className={styles.kicker}>Sample 4COP Quota Listing</span>
            <h4>Orange County 4COP Quota Liquor License</h4>
            <p className={styles.price}>$435,000</p>
            <div className={styles.facts}>
              <div><span>County</span><strong>Orange</strong></div>
              <div><span>License</span><strong>4COP Quota</strong></div>
              <div><span>Status</span><strong>Available</strong></div>
            </div>
          </div>
          <aside className={styles.rail}>
            <div className={styles.ad}>
              <b>FLLM Appraisal</b>
              <strong>Know the market value</strong>
              <p>Order a Florida liquor-license appraisal.</p>
            </div>
            <div className={styles.ad}>
              <b>FLLM Financing</b>
              <strong>Explore purchase financing</strong>
              <p>Review lender and financing options.</p>
            </div>
            {featured ? (
              <div className={styles.broker}>
                <img src="/assets/brokers/sample-broker.svg" alt="Fictitious sample broker" />
                <div>
                  <b>Listing Broker</b>
                  <strong>Alex Morgan</strong>
                  <span>Sample Florida Brokerage</span>
                  <a href="#" tabIndex={-1}>(407) 555-0148</a>
                  <a href="#" tabIndex={-1}>Sample broker website</a>
                </div>
              </div>
            ) : null}
          </aside>
        </div>
        <div className={styles.fade} />
      </div>
      <div className={styles.action}>
        <Link href={href}>View Full Sample</Link>
      </div>
      <p className={styles.note}>
        {featured
          ? "Featured adds the broker profile, photo, direct phone and website exposure while keeping FLLM appraisal and financing in the right rail."
          : "Standard keeps the complete FLLM license detail experience, including appraisal and financing, without the premium broker profile block."}
      </p>
    </div>
  );
}
