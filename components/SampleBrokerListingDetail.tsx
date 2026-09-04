import Link from "next/link";
import styles from "./SampleBrokerListingDetail.module.css";

export default function SampleBrokerListingDetail({ featured }: { featured: boolean }) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
        <nav><Link href="/brokers/list-your-license">Back to Broker Listings</Link><Link href="/listings">Marketplace Listings</Link></nav>
      </header>
      <section className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.copy}>
            {featured ? <span className={styles.badge}>Featured Listing</span> : null}
            <span className={styles.kicker}>Sample Listing — Fictitious Example</span>
            <h1>Orange County 4COP Quota Liquor License for Sale</h1>
            <p className={styles.price}>$435,000</p>
            <span className={styles.availability}>● Available</span>
            <p className={styles.notice}>This is a demonstration page only. The license, broker identity, contact information and asking price are fictitious and are not part of FLLM inventory.</p>
          </div>
          <div className={styles.mapBox}><img src="/api/county-map?county=Orange%20County&transparent=1" alt="Florida map with Orange County highlighted" /></div>
        </div>
      </section>
      <section className={`${styles.shell} ${styles.body}`}>
        <div>
          <section className={styles.panel}>
            <h2>License Highlights</h2>
            <div className={styles.facts}>
              <div><span>County</span><strong>Orange County</strong></div>
              <div><span>License Type</span><strong>4COP Quota</strong></div>
              <div><span>Asking Price</span><strong>$435,000</strong></div>
              <div><span>Status</span><strong>Available</strong></div>
            </div>
          </section>
          <section className={styles.panel}>
            <h2>Sample Listing Details</h2>
            <p>Transferable Florida 4COP quota liquor-license opportunity presented as a fictitious example for brokers evaluating FLLM advertising options.</p>
            <ul><li>Beer, wine and spirits privileges subject to applicable law and approval.</li><li>No statewide SRX food-sales threshold applies merely because the license is a quota 4COP.</li><li>Transfer, premises and zoning approvals remain separate requirements.</li></ul>
          </section>
          <section className={styles.panel}>
            <h2>County Market Context</h2>
            <p>Orange County is one of Florida&apos;s largest hospitality and tourism markets. FLLM detail pages connect buyers to county-level market information, current listings, valuation resources and financing pathways.</p>
          </section>
        </div>
        <aside className={`${styles.rail} ${!featured ? styles.railStandard : ""}`}>
          <div className={styles.ad}><b>FLLM Appraisal</b><strong>Know the market value before you transact</strong><p>Order a Florida liquor-license appraisal using FLLM market data and comparable listings.</p><Link href="/appraisal">View Appraisal Options</Link></div>
          <div className={styles.ad}><b>FLLM Financing</b><strong>Explore liquor-license financing</strong><p>Review private-lender and other financing options for qualified purchases.</p><Link href="/financing">Explore Financing</Link></div>
          {featured ? <div className={styles.broker}><small>Featured Broker Profile</small><h3>Alex Morgan</h3><img src="/assets/brokers/sample-broker.svg" alt="Fictitious sample broker Alex Morgan" /><p>Sample Florida Brokerage</p><div className={styles.brokerMeta}><a href="tel:+14075550148">(407) 555-0148</a><a href="#">alex@example-broker.test</a><a href="#">Visit Sample Broker Website</a></div><p>Fictitious broker profile shown only to demonstrate the premium Featured detail-page treatment.</p></div> : null}
          <Link className={styles.back} href="/brokers/list-your-license">← Return to listing options</Link>
        </aside>
      </section>
    </main>
  );
}
