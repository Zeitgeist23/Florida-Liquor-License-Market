import Link from "next/link";
import styles from "./LockedFeaturedBrokerPreview.module.css";

type BrokerMode = "female" | "male";

const SAMPLE_BROKERS = {
  female: {
    name: "Emma Brooks",
    email: "emma.brooks@listingbroker.com",
    image: "/assets/brokers/sample-brunette-broker.svg",
    alt: "Fictitious female independent listing broker",
  },
  male: {
    name: "Alex Morgan",
    email: "alex.morgan@listingbroker.com",
    image: "/assets/brokers/alex-morgan-sample-broker.webp",
    alt: "Fictitious male independent listing broker",
  },
} as const;

// LOCKED LAYOUT: brokerMode may change only the sample broker identity fields below.
export default function LockedFeaturedBrokerPreview({ brokerMode = "female" }: { brokerMode?: BrokerMode }) {
  const broker = SAMPLE_BROKERS[brokerMode];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logoLink} aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </Link>
        <nav aria-label="Sample listing navigation">
          <span>BUY⌄</span><span>SELL⌄</span><span>FINANCE⌄</span><span>INVEST⌄</span>
          <span>MARKET DATA⌄</span><span>LICENSE TYPES⌄</span><span>RESOURCES⌄</span><span>ABOUT</span><span>CONTACT</span>
          <b>List Your License</b>
        </nav>
      </header>

      <div className={styles.shell}>
        <div className={styles.breadcrumb}>Home <i>›</i> Listings <i>›</i> St Lucie County <i>›</i> 4COP Quota License</div>

        <div className={styles.topGrid}>
          <div className={styles.mainCol}>
            <section className={styles.hero}>
              <div className={styles.heroCopy}>
                <span className={styles.premium}>PREMIUM LISTING</span>
                <span className={styles.kicker}>FEATURED THIRD-PARTY BROKER LISTING</span>
                <h1>St Lucie County<br /><span style={{ fontFamily: "Arial, Helvetica, sans-serif", fontStyle: "normal", fontWeight: 700 }}>4</span>COP Quota Liquor License<br />for Sale</h1>
                <div className={styles.price}>$285,000</div>
                <div className={styles.statusRow}>
                  <span className={styles.available}>● AVAILABLE</span>
                  <strong>LISTING FLLM-031</strong>
                  <span className={styles.featuredBadge}>FEATURED · THIRD-PARTY BROKER</span>
                </div>
                <p>4COP quota privileges include sales of beer, wine, and spirits by the drink or in sealed containers for on- or off-premises consumption, subject to applicable requirements and regulatory approval.</p>
                <div className={styles.actions}>
                  <button type="button">✉ &nbsp; Inquire About This License</button>
                  <button type="button" className={styles.offer}>＄ &nbsp; Submit an Offer</button>
                </div>
              </div>
              <div className={styles.countyCard}>
                <div className={styles.mapViewport}>
                  <img src="/api/county-map?county=St%20Lucie%20County&transparent=1" alt="Florida map with St Lucie County highlighted" />
                </div>
                <h2>St Lucie County</h2>
                <p>Principal cities and communities: Port St. Lucie, Fort Pierce, Hutchinson Island, Stuart (nearby).</p>
              </div>
            </section>

            <section className={styles.details}>
              <h2>Specific License Details</h2>
              <div className={styles.detailGrid}>
                <div><span>ASKING PRICE</span><strong>$285,000</strong></div>
                <div><span>LICENSE TYPE</span><strong>4COP Quota</strong></div>
                <div><span>COUNTY</span><strong>St Lucie County</strong></div>
                <div><span>MARKETPLACE STATUS</span><strong>Available</strong></div>
              </div>
            </section>

            <section className={`${styles.panel} ${styles.highlights}`}>
              <h3>License Highlights</h3>
              <div className={styles.highlightGrid}>
                <div><b>♜</b><span>Full-liquor<br />privileges</span></div>
                <div><b>▣</b><span>On- or<br />off-premises use</span></div>
                <div><b>☑</b><span>Generally no SFS<br />food-sales percentage</span></div>
                <div><b>♙♙</b><span>Limited St Lucie County<br />quota supply</span></div>
              </div>
            </section>

            <section className={styles.panel}>
              <h3>About This License Listing</h3>
              <p>This individual marketplace page represents the specific 4COP Quota liquor-license interest identified as FLLM-031 in St Lucie County. The displayed asking price is $285,000. Availability, price, license status, transferability, liens, and transaction terms should be confirmed before reliance or commitment.</p>
              <p>A Florida quota license may generally be changed between the 3PS Quota series and the 4COP Quota series through a DBPR-approved change of license series. Approval is subject to applicable premises, zoning, applicant, and regulatory requirements.</p>
              <p>Unless an individual listing expressly states otherwise, the offering concerns a liquor-license interest only and does not include an operating business, leasehold, equipment, inventory, or real estate.</p>
            </section>

            <section className={styles.panel}>
              <h3>Additional Seller Details</h3>
              <p>This St Lucie County 4COP quota license is offered as a license-only opportunity for a qualified buyer seeking to enter or expand in Florida&apos;s Treasure Coast market. The seller is seeking a straightforward transfer and will consider serious, qualified offers subject to the usual regulatory review and closing conditions.</p>
              <p>The license can support a restaurant, bar, lounge, entertainment venue, or other permitted full-liquor concept, and may also be changed to the 3PS quota series for package-store use through the applicable DBPR process.</p>
              <h4>Key benefits</h4>
              <ul>
                <li><b>Treasure Coast location:</b> access to a growing St Lucie County hospitality and retail market.</li>
                <li><b>Flexible full-liquor privileges:</b> suitable for on-premises or permitted off-premises use.</li>
                <li><b>License-only transaction:</b> no operating business, equipment, leasehold, inventory, or real estate is included unless separately agreed.</li>
                <li><b>Limited quota supply:</b> St Lucie County quota licenses remain supply-constrained.</li>
                <li><b>Seller consideration:</b> reasonable, qualified offers may be reviewed; proof of funds may be requested.</li>
              </ul>
              <small>This description is supplied for the sample listing presentation. Buyers should independently confirm permitted uses, transfer requirements, availability, liens, zoning, and regulatory approvals.</small>
            </section>

            <section className={`${styles.panel} ${styles.market}`}>
              <h3>St Lucie County Market Context</h3>
              <div className={styles.marketStats}>
                <div><span>APRIL 1, 2025 POPULATION ESTIMATE</span><strong>373,452</strong><b>Official Florida estimate ↗</b></div>
                <div><span>2026 DBPR QUOTA DRAWING</span><strong>1 new license</strong><b>Official DBPR notice ↗</b></div>
              </div>
              <p>St Lucie County is part of Florida&apos;s Treasure Coast, with strong population growth, expanding tourism, and a vibrant mix of restaurants, waterfront venues, and local commerce. Buyers considering a 4COP opportunity in St Lucie County should evaluate asking price and availability while separately confirming the proposed premises, zoning, transfer eligibility, liens, seller terms, and regulatory timing.</p>
              <p>Principal cities and communities: Port St. Lucie, Fort Pierce, Hutchinson Island, Stuart (nearby).</p>
              <Link href="/county/st-lucie">View the St Lucie County liquor license market →</Link>
            </section>
          </div>

          <aside className={styles.rail}>
            <section className={styles.brokerCard}>
              <div className={styles.railKicker}>LISTED BY</div>
              <h3>{broker.name}</h3>
              <img className={styles.brokerPortrait} src={broker.image} alt={broker.alt} />
              <div className={styles.contactLine}>☎ &nbsp; (555) 555-5555</div>
              <div className={styles.contactLine}>✉ &nbsp; {broker.email}</div>
              <button type="button">Call Listing Broker</button>
              <a href="#">Visit Listing Broker Website →</a>
            </section>

            <section className={styles.inquiryCard}>
              <h3>Request Information</h3>
              <input aria-label="First name" placeholder="First Name" readOnly />
              <input aria-label="Last name" placeholder="Last Name" readOnly />
              <input aria-label="Phone" placeholder="(555) 555-5555" readOnly />
              <input aria-label="Email" placeholder="Email" readOnly />
              <textarea aria-label="Message" placeholder="Message" readOnly />
              <button type="button">Send Inquiry</button>
              <small>By submitting this form, you agree to be contacted by FLLM and the listing broker regarding this license.</small>
            </section>

            <section className={styles.appraisalCard}>
              <img src="/assets/fllm-formal-appraisal-preview-v1.webp" alt="FLLM formal Florida quota liquor license appraisal" />
              <div className={styles.appraisalCopy}>
                <span>PROFESSIONAL LICENSE VALUATION</span>
                <h3>Order a Liquor License Appraisal</h3>
                <p>Get a license-specific valuation supported by county market evidence and regulatory research.</p>
                <Link href="/appraisal">Order an Appraisal</Link>
                <b>Explore the Florida License Heat Map →</b>
              </div>
            </section>

            <section className={styles.financeCard}>
              <span>LIQUOR LICENSE PURCHASE FINANCING</span>
              <h3>Finance This License</h3>
              <p>Request financing consideration through the FLLM Private Lender Network.</p>
              <Link href="/financing">Request Financing</Link>
              <small>All financing is subject to independent lender review, underwriting, and approval.</small>
            </section>
          </aside>
        </div>

        <footer className={styles.disclaimer}>Marketplace information is provided for informational purposes and remains subject to seller or broker confirmation. Florida Liquor License Market does not guarantee availability, transfer approval, price, or transaction terms. Independent legal, tax, financial, zoning, and regulatory review is recommended.</footer>
      </div>
    </main>
  );
}
