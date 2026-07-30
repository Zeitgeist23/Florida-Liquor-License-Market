"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import styles from "@/app/sell-your-license/seller.module.css";

const COUNTIES = [
  "Alachua", "Baker", "Bay", "Bradford", "Brevard", "Broward", "Calhoun", "Charlotte",
  "Citrus", "Clay", "Collier", "Columbia", "DeSoto", "Dixie", "Duval", "Escambia",
  "Flagler", "Franklin", "Gadsden", "Gilchrist", "Glades", "Gulf", "Hamilton", "Hardee",
  "Hendry", "Hernando", "Highlands", "Hillsborough", "Holmes", "Indian River", "Jackson",
  "Jefferson", "Lafayette", "Lake", "Lee", "Leon", "Levy", "Liberty", "Madison", "Manatee",
  "Marion", "Martin", "Miami-Dade", "Monroe", "Nassau", "Okaloosa", "Okeechobee", "Orange",
  "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam", "Santa Rosa", "Sarasota",
  "Seminole", "St. Johns", "St. Lucie", "Sumter", "Suwannee", "Taylor", "Union", "Volusia",
  "Wakulla", "Walton", "Washington",
];

type SaleMethod = "Self-Directed Listing" | "Broker-Assisted Listing";

export default function SellerListingForm() {
  const [saleMethod, setSaleMethod] = useState<SaleMethod>("Broker-Assisted Listing");
  const [isCompact, setIsCompact] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 980px)");
    const updateCompactLayout = () => setIsCompact(compactQuery.matches);
    updateCompactLayout();
    compactQuery.addEventListener("change", updateCompactLayout);

    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "cancelled") {
      setIsError(true);
      setStatus("Payment was canceled. Your listing has not been submitted. You may continue when ready.");
    }

    return () => compactQuery.removeEventListener("change", updateCompactLayout);
  }, []);

  function openReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsError(false);
    setStatus("");
    setReviewOpen(true);
  }

  async function submitListing() {
    const form = formRef.current;
    if (!form || submitting) return;
    if (!form.reportValidity()) return;
    const data = new FormData(form);

    setSubmitting(true);
    setIsError(false);
    setStatus("Saving your listing and opening secure Stripe checkout…");

    try {
      const notes = [`Sale method: ${saleMethod}`];
      if (saleMethod === "Broker-Assisted Listing") {
        notes.push(
          `Currently represented by another broker: ${String(data.get("broker_currently_represented") || "Not provided")}`,
          `Preferred contact method: ${String(data.get("broker_contact_method") || "Not provided")}`
        );
      }
      const sellerMessage = String(data.get("message") || "").trim();
      if (sellerMessage) notes.push(`Additional seller details: ${sellerMessage}`);

      const response = await fetch("/api/listing-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          county: String(data.get("county") || ""),
          license_type: String(data.get("license_type") || ""),
          asking_price: String(data.get("asking_price") || ""),
          license_status: "Initial confidential listing submission",
          preferred_timing: "",
          message: notes.join("\n\n"),
          seller_certification: Boolean(data.get("seller_certification")),
          fee_agreement: Boolean(data.get("fee_agreement")),
          honey: String(data.get("_honey") || ""),
        }),
      });

      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Unable to create secure checkout.");
      }
      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setSubmitting(false);
      setIsError(true);
      setStatus(cause instanceof Error ? cause.message : "We could not save your listing. Please try again.");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/" aria-label="Florida Liquor License Market home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
          </a>
          <nav aria-label="Seller page navigation">
            <a href="/">Return Home</a>
            <i aria-hidden="true" />
            <a href="/contact">Contact Us</a>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.content}>
          {!isCompact && <section className={styles.intro} aria-labelledby="seller-page-title">
            <span className={styles.kicker}>Confidential Seller Representation</span>
            <h1 id="seller-page-title">List Your<br />Florida Liquor<br />License</h1>
            <p>Choose how you want to sell, then<br />complete your confidential listing.</p>

            {/* Exact Florida artwork extracted from the approved production mockup. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.florida} src="/assets/florida-network-approved.png" alt="" aria-hidden="true" />

            <div className={styles.marketGrid} aria-label="Florida liquor license market indicators">
              <article className={styles.marketCard}>
                <h2>Market Activity</h2>
                <div className={styles.activityChart}>
                  <span>100</span><span>50</span><span>0</span>
                  <svg viewBox="0 0 190 82" aria-hidden="true">
                    <polyline points="3,64 22,72 41,45 60,68 79,48 98,61 117,39 136,55 155,22 174,49 188,17" />
                    <polyline className={styles.buyerLine} points="3,68 22,50 41,59 60,45 79,56 98,41 117,47 136,27 155,42 174,29 188,36" />
                  </svg>
                </div>
                <div className={styles.legend}><span>Listings</span><span>Buyers</span></div>
              </article>

              <article className={styles.marketCard}>
                <h2>Active Buyer Demand</h2>
                <div className={styles.demandRing}><strong>72%</strong></div>
                <p>High Demand</p><b>Strong buyer activity</b>
              </article>

              <article className={styles.marketCard}>
                <h2>License Value Index</h2>
                <div className={styles.valueRow}><strong>118.4</strong><div className={styles.valueBars}><i /><i /><i /><i /><i /></div></div>
                <b>+6.7%</b><p>MoM Change</p>
              </article>

              <article className={styles.marketCard}>
                <h2>Market Insights</h2>
                <ul>
                  <li>Growing demand in<br />tourist corridors</li>
                  <li>Inventory remains<br />limited</li>
                  <li>Premium for scarce<br />license types</li>
                </ul>
              </article>
            </div>
          </section>}

          <form ref={formRef} className={styles.form} onSubmit={openReview}>
            <label className={styles.honeypot} aria-hidden="true">
              Leave blank<input type="text" tabIndex={-1} autoComplete="off" name="_honey" />
            </label>

            <header className={styles.formHeading}>
              <h2>List Your Florida Liquor License</h2>
              <p>Choose how you want to sell, then complete your confidential listing.</p>
            </header>

            <fieldset className={styles.methodFieldset}>
              <legend>How would you like to sell your license?</legend>
              <div className={styles.methodOptions}>
                <label className={saleMethod === "Self-Directed Listing" ? styles.methodSelected : styles.methodOption}>
                  <input type="radio" name="sale_method" value="Self-Directed Listing" checked={saleMethod === "Self-Directed Listing"} onChange={() => setSaleMethod("Self-Directed Listing")} />
                  <span className={styles.personIcon} aria-hidden="true" />
                  <strong>Self-Directed</strong>
                  <small>Manage buyer inquiries and<br />negotiations yourself.</small>
                </label>
                <label className={saleMethod === "Broker-Assisted Listing" ? styles.methodSelected : styles.methodOption}>
                  <input type="radio" name="sale_method" value="Broker-Assisted Listing" checked={saleMethod === "Broker-Assisted Listing"} onChange={() => setSaleMethod("Broker-Assisted Listing")} />
                  <span className={styles.brokerIcon} aria-hidden="true"><i /><i /><i /><i /></span>
                  <strong>Broker-Assisted</strong>
                  <small>Request help from an<br />FLLM-affiliated broker.</small>
                </label>
              </div>
            </fieldset>

            <div className={styles.fields}>
              <label><span>Full Name</span><input type="text" autoComplete="name" required name="name" /></label>
              <label><span>Email</span><input type="email" autoComplete="email" required name="email" /></label>
              <label><span>Phone</span><input type="tel" autoComplete="tel" required name="phone" /></label>
              <label><span>County</span><select name="county" required defaultValue=""><option value="" disabled>Select county</option>{COUNTIES.map((county) => <option key={county}>{county} County</option>)}</select></label>
              <label><span>License Type</span><select name="license_type" required defaultValue=""><option value="" disabled>Select license type</option><option>4COP Quota</option><option>3PS Quota / Package Store</option><option>2COP Beer &amp; Wine</option><option>Specialty / Qualified Business License</option><option>Not Sure</option></select></label>
              <label><span>Asking Price</span><input type="text" inputMode="decimal" placeholder="$" name="asking_price" /></label>
              <label className={styles.notes}><span>Additional Details</span><textarea name="message" rows={2} /></label>
            </div>

            <button className={styles.continueButton} type="submit">
              Continue to Listing <span aria-hidden="true">›</span>
            </button>
            <div className={styles.assurances}><span>♢</span> Confidential <i /> Secure <i /> No Obligation</div>
            <p className={isError ? styles.errorStatus : styles.status} role="status" aria-live="polite">{status}</p>

            {reviewOpen && (
              <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => {
                if (event.target === event.currentTarget && !submitting) setReviewOpen(false);
              }}>
                <section className={styles.reviewModal} role="dialog" aria-modal="true" aria-labelledby="review-heading">
                  <button className={styles.closeButton} type="button" aria-label="Close review" disabled={submitting} onClick={() => setReviewOpen(false)}>×</button>
                  <span className={styles.reviewKicker}>Final Review</span>
                  <h2 id="review-heading">Continue Your Listing</h2>
                  <p>Your information is ready. Review the terms below before opening secure Stripe checkout.</p>

                  {saleMethod === "Broker-Assisted Listing" && (
                    <div className={styles.brokerQuestions}>
                      <label><span>Are you currently represented by another broker?</span><select name="broker_currently_represented" required defaultValue=""><option value="" disabled>Select one</option><option>No</option><option>Yes</option><option>Not sure</option></select></label>
                      <label><span>Preferred contact method</span><select name="broker_contact_method" required defaultValue=""><option value="" disabled>Select one</option><option>Phone</option><option>Email</option><option>Either phone or email</option></select></label>
                      <p>Choosing Broker-Assisted does not create a brokerage relationship or require a commission. An FLLM representative will contact you to discuss available services and terms.</p>
                    </div>
                  )}

                  <div className={styles.agreements}>
                    <label><input type="checkbox" required name="seller_certification" value="Certified" /><span>I certify that I own the license or am authorized to advertise it, and that the information submitted is accurate.</span></label>
                    <label><input type="checkbox" required name="fee_agreement" value="Accepted" /><span>I understand that $14.95 is a one-time listing-submission fee. Payment does not guarantee publication, and rejected submissions are eligible for a refund.</span></label>
                  </div>
                  <div className={styles.feeRow}><span>Listing Submission Fee</span><strong>$14.95</strong></div>
                  <button className={styles.paymentButton} type="button" disabled={submitting} onClick={submitListing}>
                    {submitting ? "Creating Secure Checkout…" : "Proceed to Secure Payment — $14.95"}
                  </button>
                  <p className={isError ? styles.errorStatus : styles.status} role="status" aria-live="polite">{status}</p>
                </section>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
