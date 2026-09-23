import type { Metadata } from "next";
import Link from "next/link";

import FormsSiteHeader from "@/components/FormsSiteHeader";
import styles from "./preview.module.css";

const sourceUrl = "https://www.bizbuysell.com/business-opportunity/prime-location-in-miami-established-peruvian-mediterranean-restauran/2479201/";
const photos = [
  { src: "https://images.bizbuysell.com/shared/listings/247/2479201/899b04d1-b1b6-49d0-ab76-61c8f551a3ff-W768.webp", alt: "Dining room photographed for the seller's BizBuySell advertisement" },
  { src: "https://images.bizbuysell.com/shared/listings/247/2479201/7c50cfae-a727-461e-82dd-2b7db430be13-W768.webp", alt: "Restaurant entrance photographed for the seller's BizBuySell advertisement" },
  { src: "https://images.bizbuysell.com/shared/listings/247/2479201/c5ddea83-c1fd-482e-b716-09b8f15ee6bd-W768.webp", alt: "Kitchen photographed for the seller's BizBuySell advertisement" },
  { src: "https://images.bizbuysell.com/shared/listings/247/2479201/0e1e0ed3-108e-4044-9739-b1831ddf03ab-W768.webp", alt: "Dining area photographed for the seller's BizBuySell advertisement" },
];

export const metadata: Metadata = {
  title: "Marianella Kopp Peruvian Restaurant | Seller Approval Preview",
  description: "Unpublished seller review draft for a Miami Peruvian restaurant business with a reported 2COP beer-and-wine license.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function MarianellaSellerPreview() {
  return (
    <main className={styles.page}>
      <FormsSiteHeader />
      <div className={styles.shell}>
        <div className={styles.previewNotice} role="status">
          <strong>SELLER REVIEW DRAFT</strong>
          <span>Not published in FLLM inventory. Seller approval and $24.95 listing payment pending.</span>
        </div>

        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/listings?type=businesses-2cop">Businesses with 2COP Beer &amp; Wine Licenses</Link>
          <span>›</span>
          <span>Miami-Dade County</span>
        </nav>

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>SELLER DIRECT · BUSINESS + 2COP BEER &amp; WINE</p>
            <h1>Miami Peruvian Restaurant <span>for Sale</span></h1>
            <p className={styles.summary}>
              Established Peruvian-Mediterranean restaurant in Miami offered directly by owner Marianella Kopp.
              The seller reports an active beer-and-wine license with the operating business. The 2COP series,
              license status, and ownership-change requirements should be confirmed with DBPR before publication.
            </p>
            <div className={styles.tags}>
              <span>Miami-Dade County</span><span>Restaurant Business</span><span>2COP reported by seller</span>
            </div>
          </div>
          <aside className={styles.priceCard}>
            <span>BUSINESS ASKING PRICE</span>
            <strong>$599,999</strong>
            <p>Real estate is offered separately and is not included in this business asking price. Inventory is also reported separately.</p>
            <small>Seller direct · FLLM reference FLLM-KOPP</small>
          </aside>
        </header>

        <section className={styles.photoSection} aria-label="Restaurant photographs from the seller's advertisement">
          <div className={styles.gallery}>
            {photos.map((photo, index) => (
              <a className={index === 0 ? styles.primaryPhoto : styles.secondaryPhoto} href={sourceUrl} target="_blank" rel="noopener noreferrer" key={photo.src} aria-label={`View original seller advertisement: ${photo.alt}`}>
                {/* External seller-ad photos are displayed only in this approval mockup. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} loading={index === 0 ? "eager" : "lazy"} />
              </a>
            ))}
          </div>
          <p>Photos displayed from Marianella&apos;s BizBuySell advertisement for mockup review. Confirm photo use with the seller before publication.</p>
        </section>

        <section className={styles.section} aria-labelledby="highlights">
          <h2 id="highlights">Business at a glance</h2>
          <div className={styles.grid}>
            <article><span>Reported annual revenue</span><strong>$980,000</strong><p>Seller-reported; financial records have not been verified by FLLM.</p></article>
            <article><span>Established</span><strong>2007</strong><p>Operating history reported in the seller&apos;s BizBuySell advertisement.</p></article>
            <article><span>Restaurant space</span><strong>2,725 sq. ft.</strong><p>Premises size is seller-reported; property offered separately.</p></article>
            <article><span>Seating</span><strong>80 permitted</strong><p>Seller reports potential for 120; buyer must verify approvals.</p></article>
            <article><span>Beer &amp; wine license</span><strong>2COP reported</strong><p>No separate quota-license value is included or implied.</p></article>
            <article><span>Seller financing</span><strong>Up to 40% stated</strong><p>Availability and final terms require direct seller confirmation.</p></article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="offering">
          <h2 id="offering">What the advertised offering describes</h2>
          <div className={styles.twoColumns}>
            <div>
              <p>The seller advertises an established restaurant business, furnished dining area, commercial kitchen, equipment, and two weeks of transition training. The $500,000 stated FF&amp;E figure is included in the asking price; $40,000 of stated inventory is not.</p>
              <p>The separately owned real estate is outside the $599,999 business asking price. Buyers should confirm occupancy terms if purchasing the business without the property.</p>
            </div>
            <div className={styles.disclosure}>
              <h3>License and transaction review</h3>
              <p>A 2COP beer-and-wine license is distinct from a scarce 4COP quota license and does not authorize spirits. Confirm the precise license record, premises, permitted privileges, and requirements for the buyer&apos;s operation directly with Florida DBPR.</p>
              <Link href="/license-types/2cop-beer-wine">Read the FLLM 2COP guide →</Link>
            </div>
          </div>
        </section>

        <section className={styles.sellerPanel} aria-label="Seller and inquiry preview">
          <div>
            <span>DIRECT SELLER</span>
            <h2>Marianella Kopp</h2>
            <p>Owner-posted restaurant opportunity in Miami-Dade County. Buyer inquiries can be routed directly to the seller once she confirms her preferred contact details and approves publication.</p>
          </div>
          <div className={styles.pendingAction} aria-label="Inquiries unavailable until publication">CONTACT SELLER · AVAILABLE AFTER APPROVAL</div>
        </section>

        <section className={styles.review} aria-label="Seller review steps">
          <div><span>PREPUBLICATION REVIEW</span><h2>Confirm the details before this ad goes live</h2>
            <p>Marianella can review the description, asking price, included assets, photos, license documentation, and preferred buyer contact method. FLLM will add the listing to the 2COP business category only after her approval and $24.95 payment.</p>
            <p className={styles.source}>Draft facts and preview images from the seller&apos;s <a href={sourceUrl} target="_blank" rel="noopener noreferrer">BizBuySell advertisement #2479201</a>. The images are linked from that advertisement for seller review; obtain approved image files before publication. No financial, license, or ownership representations have been independently verified by FLLM.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
