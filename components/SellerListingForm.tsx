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

function formatCurrency(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  if (!digits) return "";
  return `${digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function CurrencyInput({
  name,
  value,
  onChange,
  onComplete,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onComplete?: () => void;
}) {
  return (
    <input
      type="text"
      inputMode="numeric"
      autoComplete="off"
      name={name}
      placeholder="$"
      value={value}
      onChange={(event) => onChange(formatCurrency(event.target.value))}
      onBlur={onComplete}
    />
  );
}

export default function SellerListingForm() {
  const [saleMethod, setSaleMethod] = useState<SaleMethod>("Self-Directed Listing");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [askingPrice, setAskingPrice] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("method") === "self") {
      setSaleMethod("Self-Directed Listing");
    } else if (params.get("method") === "broker") {
      setSaleMethod("Broker-Assisted Listing");
    }
    if (params.get("payment") === "cancelled") {
      setIsError(true);
      setStatus("Payment was canceled. Your listing has not been submitted. You may continue when ready.");
    }
  }, []);

  function openReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    advanceIfComplete();
  }

  function advanceIfComplete() {
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const requiredFields = saleMethod === "Broker-Assisted Listing"
      ? ["broker_currently_represented", "broker_arrangement", "desired_net_amount", "broker_contact_method"]
      : ["self_license_status", "self_preferred_timing", "self_asking_price", "self_contact_method"];

    const complete = requiredFields.every((field) => String(data.get(field) || "").trim());
    if (!complete) return;

    setIsError(false);
    setStatus("");
    setReviewOpen(true);
  }

  async function submitListing() {
    const form = formRef.current;
    if (!form || submitting || !form.reportValidity()) return;

    const data = new FormData(form);
    setSubmitting(true);
    setIsError(false);
    setStatus("Saving your listing and opening secure Stripe checkout…");

    try {
      const notes = [`Sale method: ${saleMethod}`];
      if (saleMethod === "Broker-Assisted Listing") {
        notes.push(
          `Currently represented by another broker: ${String(data.get("broker_currently_represented") || "Not provided")}`,
          `Preferred arrangement: ${String(data.get("broker_arrangement") || "No preference / need guidance")}`,
          `Desired net amount: ${String(data.get("desired_net_amount") || "Not provided")}`,
          `Preferred contact method: ${String(data.get("broker_contact_method") || "Not provided")}`,
        );
      } else {
        notes.push(
          `License status: ${String(data.get("self_license_status") || "Not provided")}`,
          `Preferred sale timing: ${String(data.get("self_preferred_timing") || "Not provided")}`,
          `Asking price: ${String(data.get("self_asking_price") || "Not provided")}`,
          `Preferred contact method: ${String(data.get("self_contact_method") || "Not provided")}`,
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
          asking_price: String(data.get("asking_price") || data.get("self_asking_price") || ""),
          license_status: String(data.get("self_license_status") || "Initial confidential listing submission"),
          preferred_timing: String(data.get("self_preferred_timing") || ""),
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

  const brokerAssisted = saleMethod === "Broker-Assisted Listing";

  return (
    <main className={styles.page}>
      <section className={styles.stage} aria-labelledby="seller-page-title">
        {/* The approved 1567 × 1004 artwork is the literal visual reference layer.
            The controls below are real HTML elements aligned to it by percentage. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.approvedArtwork}
          src="/api/list-your-license-approved"
          alt=""
          aria-hidden="true"
        />
        <div className={styles.screenCleanup} aria-hidden="true">
          <span className={styles.screenLeftMask} />
          <span className={styles.screenBottomMask} />
          <span className={styles.screenRightMask} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.approvedScreenArtwork}
          src="/api/list-your-license-approved"
          alt=""
          aria-hidden="true"
        />

        <a className={styles.homeLink} href="/" aria-label="Return home" />
        <a className={styles.contactLink} href="/contact" aria-label="Contact us" />

        <div className={styles.mobileHeader}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="/" aria-label="Florida Liquor License Market home"><img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" /></a>
          <nav><a href="/">Return Home</a><a href="/contact">Contact Us</a></nav>
        </div>

        <form ref={formRef} className={styles.overlayForm} onSubmit={openReview}>
          <label className={styles.honeypot} aria-hidden="true">
            Leave blank<input type="text" tabIndex={-1} autoComplete="off" name="_honey" />
          </label>

          <div className={styles.mobileIntro}>
            <span>Confidential Seller Representation</span>
            <h1 id="seller-page-title">Submit Your License</h1>
            <p>Choose how you would like to sell, then complete the listing information.</p>
          </div>

          <div className={styles.screenControls}>
            <fieldset className={styles.methodFieldset}>
              <legend>How would you like to sell your license?</legend>
              <p>Choose the level of assistance you would like. You may change your selection later.</p>

              <label className={`${styles.methodChoice} ${styles.selfChoice} ${!brokerAssisted ? styles.methodSelected : styles.methodUnselected}`}>
                <input
                  type="radio"
                  name="sale_method"
                  value="Self-Directed Listing"
                  checked={!brokerAssisted}
                  onChange={() => setSaleMethod("Self-Directed Listing")}
                />
                <span className={styles.choiceMarker} aria-hidden="true" />
                <span className={styles.mobileChoiceCopy}>
                  <strong>Self-Directed Listing</strong>
                  <small>I will communicate directly with buyers and manage negotiations, documentation, and the license-transfer process.</small>
                </span>
              </label>

              <label className={`${styles.methodChoice} ${styles.brokerChoice} ${brokerAssisted ? styles.methodSelected : styles.methodUnselected}`}>
                <input
                  type="radio"
                  name="sale_method"
                  value="Broker-Assisted Listing"
                  checked={brokerAssisted}
                  onChange={() => setSaleMethod("Broker-Assisted Listing")}
                />
                <span className={styles.choiceMarker} aria-hidden="true" />
                <span className={styles.mobileChoiceCopy}>
                  <strong>Broker-Assisted Listing</strong>
                  <small>I would like an FLLM-affiliated broker to contact me about marketing, buyer communications, negotiations, and transaction coordination.</small>
                </span>
              </label>
            </fieldset>

            <div className={`${styles.brokerFields} ${!brokerAssisted ? styles.selfDirectedFields : ""}`}>
              {brokerAssisted ? (
                <>
                  <label className={styles.representedField}>
                    <span>Are you currently represented by another broker?</span>
                    <select name="broker_currently_represented" required defaultValue="" onChange={advanceIfComplete}>
                      <option value="" disabled>Select one</option>
                      <option>No</option>
                      <option>Yes</option>
                      <option>Not sure</option>
                    </select>
                  </label>

                  <label className={styles.arrangementField}>
                    <span>Preferred arrangement</span>
                    <select name="broker_arrangement" defaultValue="No preference / need guidance" onChange={advanceIfComplete}>
                      <option>No preference / need guidance</option>
                      <option>Non-exclusive arrangement</option>
                      <option>Exclusive arrangement</option>
                    </select>
                  </label>

                  <label className={styles.netField}>
                    <span>Desired net amount</span>
                    <input type="text" inputMode="decimal" name="desired_net_amount" placeholder="$" onBlur={advanceIfComplete} />
                  </label>

                  <label className={styles.contactMethodField}>
                    <span>Preferred contact method</span>
                    <select name="broker_contact_method" required defaultValue="" onChange={advanceIfComplete}>
                      <option value="" disabled>Select one</option>
                      <option>Phone</option>
                      <option>Email</option>
                      <option>Either phone or email</option>
                    </select>
                  </label>
                </>
              ) : (
                <>
                  <label className={styles.representedField}>
                    <span>License status</span>
                    <select name="self_license_status" required defaultValue="" onChange={advanceIfComplete}>
                      <option value="" disabled>Select one</option>
                      <option>Active and current</option>
                      <option>Inactive</option>
                      <option>Transfer pending</option>
                      <option>Not sure</option>
                    </select>
                  </label>

                  <label className={styles.arrangementField}>
                    <span>Preferred sale timing</span>
                    <select name="self_preferred_timing" required defaultValue="" onChange={advanceIfComplete}>
                      <option value="" disabled>Select one</option>
                      <option>Immediately</option>
                      <option>Within 30 days</option>
                      <option>Within 31–60 days</option>
                      <option>Within 61–90 days</option>
                      <option>Flexible</option>
                    </select>
                  </label>

                  <label className={styles.netField}>
                    <span>Asking price</span>
                    <CurrencyInput
                      name="self_asking_price"
                      value={askingPrice}
                      onChange={setAskingPrice}
                      onComplete={advanceIfComplete}
                    />
                  </label>

                  <label className={styles.contactMethodField}>
                    <span>Preferred contact method</span>
                    <select name="self_contact_method" required defaultValue="" onChange={advanceIfComplete}>
                      <option value="" disabled>Select one</option>
                      <option>Phone</option>
                      <option>Email</option>
                      <option>Either phone or email</option>
                    </select>
                  </label>
                </>
              )}
            </div>

          </div>

          {reviewOpen && (
            <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => {
              if (event.target === event.currentTarget && !submitting) setReviewOpen(false);
            }}>
              <section className={styles.reviewModal} role="dialog" aria-modal="true" aria-labelledby="review-heading">
                <button className={styles.closeButton} type="button" aria-label="Close review" disabled={submitting} onClick={() => setReviewOpen(false)}>×</button>
                <span className={styles.reviewKicker}>Confidential Listing</span>
                <h2 id="review-heading">Complete Your License Details</h2>
                <p>Your service selection has been saved. Complete the license and contact information below before secure checkout.</p>

                <div className={styles.reviewFields}>
                  <label><span>Full Name *</span><input type="text" autoComplete="name" required name="name" /></label>
                  <label><span>Email *</span><input type="email" autoComplete="email" required name="email" /></label>
                  <label><span>Phone *</span><input type="tel" autoComplete="tel" required name="phone" /></label>
                  <label><span>County *</span><select name="county" required defaultValue=""><option value="" disabled>Select county</option>{COUNTIES.map((county) => <option key={county}>{county} County</option>)}</select></label>
                  <label><span>License Type *</span><select name="license_type" required defaultValue=""><option value="" disabled>Select license type</option><option>4COP Quota</option><option>3PS Quota / Package Store</option><option>2COP Beer &amp; Wine</option><option>Specialty / Qualified Business License</option><option>Not Sure</option></select></label>
                  <label>
                    <span>Asking Price</span>
                    <CurrencyInput name="asking_price" value={askingPrice} onChange={setAskingPrice} />
                  </label>
                  <label className={styles.notes}><span>Additional Details</span><textarea name="message" rows={3} /></label>
                </div>

                <div className={styles.agreements}>
                  <label><input type="checkbox" required name="seller_certification" value="Certified" /><span>I certify that I own the license or am authorized to advertise it, and that the submitted information is accurate.</span></label>
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
      </section>
    </main>
  );
}

