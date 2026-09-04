import Link from "next/link";
import styles from "./SampleBrokerListingDetail.module.css";

function StandardSampleListing() {
  return (
    <main className={styles.standardPreviewPage} data-standard-preview>
      <div className={styles.standardBrowser}>
        <div className={styles.browserChrome}>
          <div className={styles.browserDots} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.browserControls} aria-hidden="true">‹ &nbsp; › &nbsp; ↻</div>
          <div className={styles.addressBar}>🔒&nbsp; floridaliquorlicensemarket.com/listings/orange-county-4cop-quota-fllm-demo-001</div>
          <div className={styles.browserTools} aria-hidden="true">☆ &nbsp; ⋮</div>
        </div>

        <div className={styles.standardSite}>
          <header className={styles.standardHeader}>
            <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
            <nav aria-label="Sample site navigation">
              <span>BUY⌄</span><span>SELL⌄</span><span>FINANCE⌄</span><span>INVEST⌄</span>
              <span>MARKET DATA⌄</span><span>LICENSE TYPES⌄</span><span>RESOURCES⌄</span><span>CONTACT US</span>
            </nav>
          </header>

          <div className={styles.standardShell}>
            <div className={styles.sampleFlag}>SAMPLE STANDARD LISTING PAGE — EXAMPLE ONLY</div>
            <div className={styles.breadcrumb}>Florida Liquor Licenses for Sale <b>›</b> Orange County <b>›</b> <strong>FLLM-DEMO-001</strong></div>

            <section className={styles.standardHero}>
              <div className={styles.heroCopy}>
                <h1>Orange County<br />4COP Quota Liquor License<br />for Sale</h1>
                <div className={styles.standardPrice}>$435,000</div>
                <div className={styles.statusLine}>
                  <span className={styles.available}>● AVAILABLE</span>
                  <span className={styles.divider}>|</span>
                  <b>LISTING FLLM-DEMO-001</b>
                  <span className={styles.divider}>|</span>
                  <span className={styles.standardBadge}>STANDARD LISTING</span>
                </div>
                <p>4COP quota privileges include sales of beer, wine, and spirits by the drink or in sealed containers for on- or off-premises consumption, subject to applicable requirements and regulatory approval.</p>
                <div className={styles.heroButtons}>
                  <span className={styles.primaryButton}>Inquire About This License</span>
                  <span className={styles.secondaryButton}>Submit an Offer</span>
                </div>
              </div>

              <div className={styles.countyCard}>
                <img src="/api/county-map?county=Orange%20County&transparent=1" alt="Florida map with Orange County highlighted" />
                <h2>Orange County</h2>
                <p>Principal cities and communities: Orlando, Winter Park, Kissimmee, Apopka, Ocoee.</p>
              </div>
            </section>

            <section className={styles.standardContentGrid}>
              <div className={styles.standardMainColumn}>
                <section className={styles.detailsSection}>
                  <div className={styles.sectionKicker}>SPECIFIC LICENSE DETAILS</div>
                  <h2>4COP Quota in Orange County</h2>
                  <div className={styles.detailCards}>
                    <div><span>ASKING PRICE</span><strong>$435,000</strong></div>
                    <div><span>LICENSE TYPE</span><strong>4COP Quota</strong></div>
                    <div><span>COUNTY</span><strong>Orange County</strong></div>
                    <div><span>MARKETPLACE STATUS</span><strong>Active and<br />Currently Available</strong></div>
                    <div><span>TRANSFERABILITY</span><strong>Fully Transferable*</strong></div>
                  </div>
                </section>

                <section className={`${styles.standardPanel} ${styles.highlightsPanel}`} data-highlights>
                  <h3>License Highlights</h3>
                  <div className={styles.highlightGrid}>
                    <div><span className={styles.highlightIcon}>♜</span><b>Full liquor<br />privileges</b></div>
                    <div><span className={styles.highlightIcon}>▣</span><b>On- or<br />off-premises use</b></div>
                    <div><span className={styles.highlightIcon}>▤</span><b>Generally 5% food<br />sales percentage</b></div>
                    <div><span className={styles.highlightIcon}>♙♙</span><b>Limited Orange County<br />quota supply</b></div>
                  </div>
                </section>

                <section className={styles.standardPanel}>
                  <h3>About This License Listing</h3>
                  <p>This individual marketplace page represents a sample 4COP Quota liquor license listing for demonstration purposes only. Listing FLLM-DEMO-001 in Orange County illustrates the typical information, structure, and layout used for active listings on the Florida Liquor License Market.</p>
                  <p>A Florida quota license may generally be changed between the 3PS Quota series and the 4COP Quota series through a county approval change of license series. Approval is subject to applicable premises, zoning, applicant, and regulatory requirements.</p>
                  <p>Unless an individual listing expressly states otherwise, the offering concerns a liquor-license interest only and does not include an operating business, leasehold, equipment, inventory, or real estate.</p>
                </section>

                <section className={styles.standardPanel}>
                  <h3>Orange County Market Context</h3>
                  <div className={styles.marketStats}>
                    <div><span>APRIL 1, 2025 POPULATION ESTIMATE</span><strong>1,515,301</strong><b>Official Florida estimate ↗</b></div>
                    <div><span>2025 4COP QUOTA DRAWING</span><strong>0 new licenses</strong><b>Official DBPR notice ↗</b></div>
                  </div>
                  <p>Orange County is one of Florida&apos;s fastest-growing counties and a major tourism and hospitality hub, anchored by the Orlando market and world-renowned attractions. Buyers consider Orange County 4COP and 3PS opportunities highly desirable due to strong population growth, diverse demand, and consistent long-term market fundamentals.</p>
                  <p>Principal cities and communities: Orlando, Winter Park, Kissimmee, Apopka, Ocoee.</p>
                  <div className={styles.marketLink}>View the Orange County liquor license market →</div>
                </section>
              </div>

              <aside className={styles.standardRail}>
                <section className={`${styles.railPanel} ${styles.appraisalPanel}`} data-appraisal>
                  <div className={styles.sectionKicker}>PROFESSIONAL LICENSE VALUATION</div>
                  <h3>Order a Liquor License Appraisal</h3>
                  <p>Get a license-specific valuation supported by county market evidence and regulatory research.</p>
                  <div className={styles.railButton}>Order an Appraisal</div>
                  <div className={styles.railTextLink}>Explore the Florida License Market Map →</div>
                  <img className={styles.appraisalImage} src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="FLLM professional liquor license appraisal preview" />
                </section>

                <section className={styles.railPanel}>
                  <div className={styles.sectionKicker}>LIQUOR LICENSE PURCHASE FINANCING</div>
                  <h3>Finance This License</h3>
                  <p>Request financing consideration through the FLLM Private Lender Network.</p>
                  <div className={styles.railButton}>Request Financing</div>
                  <small>All financing is subject to independent lender review, underwriting, and approval.</small>
                </section>
              </aside>
            </section>

            <div className={styles.sampleDisclaimer}>This is a sample listing page for demonstration purposes only. All information is fictional and provided for illustrative purposes. Florida Liquor License Market does not guarantee the availability, price, or terms of any license. Independent legal, tax, financial, zoning, and regulatory review is recommended.</div>
          </div>
        </div>
      </div>
      <div className={styles.sampleBottomLabel}><span />⌕ <b>View Sample Standard Listing Page</b><span /></div>
    </main>
  );
}

export default function SampleBrokerListingDetail({ featured }: { featured: boolean }) {
  if (!featured) return <StandardSampleListing />;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></Link>
        <nav><Link href="/brokers/list-your-license">Back to Broker Listings</Link><Link href="/listings">Marketplace Listings</Link></nav>
      </header>
      <section className={styles.hero}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.copy}>
            <span className={styles.badge}>Featured Listing</span>
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
        <aside className={styles.rail}>
          <div className={styles.ad}><b>FLLM Appraisal</b><strong>Know the market value before you transact</strong><p>Order a Florida liquor-license appraisal using FLLM market data and comparable listings.</p><Link href="/appraisal">View Appraisal Options</Link></div>
          <div className={styles.ad}><b>FLLM Financing</b><strong>Explore liquor-license financing</strong><p>Review private-lender and other financing options for qualified purchases.</p><Link href="/financing">Explore Financing</Link></div>
          <div className={styles.broker}><small>Featured Broker Profile</small><h3>Alex Morgan</h3><img src="/assets/brokers/sample-broker.svg" alt="Fictitious sample broker Alex Morgan" /><p>Sample Florida Brokerage</p><div className={styles.brokerMeta}><a href="tel:+14075550148">(407) 555-0148</a><a href="#">alex@example-broker.test</a><a href="#">Visit Sample Broker Website</a></div><p>Fictitious broker profile shown only to demonstrate the premium Featured detail-page treatment.</p></div>
          <Link className={styles.back} href="/brokers/list-your-license">← Return to listing options</Link>
        </aside>
      </section>
    </main>
  );
}
