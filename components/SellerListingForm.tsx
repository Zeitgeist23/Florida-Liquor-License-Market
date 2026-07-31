"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import styles from "@/app/sell-your-license/seller.module.css";
import FloridaCountyMap from "@/components/FloridaCountyMap";
import FormsSiteHeader from "@/components/FormsSiteHeader";

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
      placeholder="$0"
      value={value ? `$${value}` : ""}
      onChange={(event) => onChange(formatCurrency(event.target.value))}
      onBlur={onComplete}
    />
  );
}

export default function SellerListingForm() {
  const [saleMethod, setSaleMethod] = useState<SaleMethod>("Self-Directed Listing");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [askingPrice, setAskingPrice] = useState("");
  const [county, setCounty] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [selfLicenseStatus, setSelfLicenseStatus] = useState("");
  const [selfPreferredTiming, setSelfPreferredTiming] = useState("");
  const [selfContactMethod, setSelfContactMethod] = useState("");
  const [brokerCurrentlyRepresented, setBrokerCurrentlyRepresented] = useState("");
  const [brokerArrangement, setBrokerArrangement] = useState("No preference / need guidance");
  const [desiredNetAmount, setDesiredNetAmount] = useState("");
  const [brokerContactMethod, setBrokerContactMethod] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("method") === "self") {
      setSaleMethod("Self-Directed Listing");
    } else if (params.get("method") === "broker") {
      setSaleMethod("Broker-Assisted Listing");
    }
    setCounty(params.get("county") || "");
    setLicenseType(params.get("license_type") || "");
    setAskingPrice(formatCurrency(params.get("self_asking_price") || ""));
    setSelfLicenseStatus(params.get("self_license_status") || "");
    setSelfPreferredTiming(params.get("self_preferred_timing") || "");
    setSelfContactMethod(params.get("self_contact_method") || "");
    setBrokerCurrentlyRepresented(params.get("broker_currently_represented") || "");
    setBrokerArrangement(params.get("broker_arrangement") || "No preference / need guidance");
    setDesiredNetAmount(params.get("desired_net_amount") || "");
    setBrokerContactMethod(params.get("broker_contact_method") || "");
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
  const previewCategory = licenseType.startsWith("3PS")
    ? "Package Store"
    : licenseType.startsWith("2COP")
      ? "Beer & Wine"
      : "Restaurant / Bar";

  return (
    <main className={`${styles.page} ${styles.modernPage}`}>
      <div className="abt-header-wrap">
        <FormsSiteHeader
          primaryActionHref="/sell-your-license#listing-options"
          primaryActionLabel="Back to Listing Options"
        />
      </div>
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
            <span>Confidential seller intake · Step 2</span>
            <h1 id="seller-page-title">
              Complete Your {brokerAssisted ? "Broker-Assisted" : "Self-Directed"} Listing
            </h1>
            <p>
              Your selections from the first screen have been carried forward. Confirm them below,
              then continue to your contact and license details.
            </p>
          </div>

          <div className={styles.screenControls}>
            <div className={styles.methodSummary}>
              <input type="hidden" name="sale_method" value={saleMethod} />
              <span>Selected listing option</span>
              <strong>{saleMethod}</strong>
              <small>
                {brokerAssisted
                  ? "An FLLM-affiliated broker will contact you about marketing and transaction support."
                  : "You will communicate directly with buyers and manage the transaction with your chosen advisors."}
              </small>
            </div>

            <div className={styles.selectedLicenseDetails} aria-label="Selected license details">
              <div className={county ? styles.selectionConfirmed : styles.selectionPending}>
                <span>County</span>
                <strong>{county || "County not selected"}</strong>
              </div>
              <div className={licenseType ? styles.selectionConfirmed : styles.selectionPending}>
                <span>License type</span>
                <strong>{licenseType || "License type not selected"}</strong>
              </div>
            </div>

            <div className={!brokerAssisted ? styles.selfStepLayout : undefined}>
              <div className={`${styles.brokerFields} ${!brokerAssisted ? styles.selfDirectedFields : ""}`}>
              {brokerAssisted ? (
                <>
                  <label className={styles.representedField}>
                    <span>Are you currently represented by another broker?</span>
                    <select
                      name="broker_currently_represented"
                      required
                      value={brokerCurrentlyRepresented}
                      onChange={(event) => {
                        setBrokerCurrentlyRepresented(event.target.value);
                        advanceIfComplete();
                      }}
                    >
                      <option value="" disabled>Select one</option>
                      <option>No</option>
                      <option>Yes</option>
                      <option>Not sure</option>
                    </select>
                  </label>

                  <label className={styles.arrangementField}>
                    <span>Preferred arrangement</span>
                    <select
                      name="broker_arrangement"
                      value={brokerArrangement}
                      onChange={(event) => {
                        setBrokerArrangement(event.target.value);
                        advanceIfComplete();
                      }}
                    >
                      <option>No preference / need guidance</option>
                      <option>Non-exclusive arrangement</option>
                      <option>Exclusive arrangement</option>
                    </select>
                  </label>

                  <label className={styles.netField}>
                    <span>Desired net amount</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      name="desired_net_amount"
                      placeholder="$"
                      value={desiredNetAmount}
                      onChange={(event) => setDesiredNetAmount(event.target.value)}
                      onBlur={advanceIfComplete}
                    />
                  </label>

                  <label className={styles.contactMethodField}>
                    <span>Preferred contact method</span>
                    <select
                      name="broker_contact_method"
                      required
                      value={brokerContactMethod}
                      onChange={(event) => {
                        setBrokerContactMethod(event.target.value);
                        advanceIfComplete();
                      }}
                    >
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
                    <select
                      name="self_license_status"
                      required
                      value={selfLicenseStatus}
                      onChange={(event) => {
                        setSelfLicenseStatus(event.target.value);
                        advanceIfComplete();
                      }}
                    >
                      <option value="" disabled>Select one</option>
                      <option>Active and current</option>
                      <option>Inactive</option>
                      <option>In escrow (DBPR/ABT)</option>
                      <option>Transfer pending</option>
                      <option>Not sure</option>
                    </select>
                  </label>

                  <label className={styles.arrangementField}>
                    <span>Preferred sale timing</span>
                    <select
                      name="self_preferred_timing"
                      required
                      value={selfPreferredTiming}
                      onChange={(event) => {
                        setSelfPreferredTiming(event.target.value);
                        advanceIfComplete();
                      }}
                    >
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
                    <select
                      name="self_contact_method"
                      required
                      value={selfContactMethod}
                      onChange={(event) => {
                        setSelfContactMethod(event.target.value);
                        advanceIfComplete();
                      }}
                    >
                      <option value="" disabled>Select one</option>
                      <option>Phone</option>
                      <option>Email</option>
                      <option>Either phone or email</option>
                    </select>
                  </label>
                </>
              )}
              </div>

              {!brokerAssisted && (
                <aside className={styles.listingPreview} aria-label="Marketplace listing preview">
                  <div className={styles.previewHeading}>
                    <span>Listing preview</span>
                    <small>Click to enlarge</small>
                  </div>
                  <article
                    className={`${styles.previewCard} ${styles.previewCardInteractive}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Open a larger marketplace listing preview"
                    onClick={() => setPreviewOpen(true)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setPreviewOpen(true);
                      }
                    }}
                  >
                    <div className={styles.previewMap}>
                      <FloridaCountyMap county={county || "No county selected"} />
                      <span>{licenseType || "Florida liquor license"}</span>
                    </div>
                    <div className={styles.previewBody}>
                      <p><i aria-hidden="true" /> {county || "Florida county"}</p>
                      <h2>{askingPrice ? `$${askingPrice}` : "Asking price"}</h2>
                      <div className={styles.previewFacts}>
                        <span>{licenseType || previewCategory}</span>
                        <span>Transferable / Available</span>
                      </div>
                      <small>
                        {selfLicenseStatus || "License status"} · {selfPreferredTiming || "Sale timing"}.
                        Additional listing details will appear here after review.
                      </small>
                      <div className={styles.previewActions} aria-hidden="true">
                        <span>Inquire</span>
                        <span>Submit an Offer</span>
                      </div>
                    </div>
                  </article>
                </aside>
              )}
            </div>

            <div className={`${styles.modernFormActions} ${!brokerAssisted ? styles.selfFormActions : ""}`}>
              <a href="/sell-your-license#listing-options">← Change listing option</a>
              <button type="submit">Continue to Contact Details</button>
            </div>
          </div>

          {previewOpen && !brokerAssisted && (
            <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => {
              if (event.target === event.currentTarget) setPreviewOpen(false);
            }}>
              <section className={styles.previewModal} role="dialog" aria-modal="true" aria-labelledby="preview-modal-heading">
                <button className={styles.closeButton} type="button" aria-label="Close listing preview" onClick={() => setPreviewOpen(false)}>×</button>
                <span className={styles.reviewKicker}>Marketplace Listing Preview</span>
                <h2 id="preview-modal-heading">Review Your Listing</h2>
                <p>This enlarged preview shows how your advertisement will appear in the live marketplace.</p>

                <article className={`${styles.previewCard} ${styles.expandedPreviewCard}`}>
                  <div className={styles.previewMap}>
                    <FloridaCountyMap county={county || "No county selected"} />
                    <span>{licenseType || "Florida liquor license"}</span>
                  </div>
                  <div className={styles.previewBody}>
                    <p><i aria-hidden="true" /> {county || "Florida county"}</p>
                    <h2>{askingPrice ? `$${askingPrice}` : "Asking price"}</h2>
                    <div className={styles.previewFacts}>
                      <span>{licenseType || previewCategory}</span>
                      <span>Transferable / Available</span>
                    </div>
                    <small>
                      {selfLicenseStatus || "License status"} · {selfPreferredTiming || "Sale timing"}.
                      Additional listing details will appear here after review.
                    </small>
                    <div className={styles.previewActions} aria-hidden="true">
                      <span>Inquire</span>
                      <span>Submit an Offer</span>
                    </div>
                  </div>
                </article>

                <button
                  className={styles.previewContinueButton}
                  type="button"
                  onClick={() => {
                    setPreviewOpen(false);
                    advanceIfComplete();
                  }}
                >
                  Continue to Contact Details
                </button>
              </section>
            </div>
          )}

          {reviewOpen && (
            <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => {
              if (event.target === event.currentTarget && !submitting) setReviewOpen(false);
            }}>
              <section className={styles.reviewModal} role="dialog" aria-modal="true" aria-labelledby="review-heading">
                <button className={styles.closeButton} type="button" aria-label="Close review" disabled={submitting} onClick={() => setReviewOpen(false)}>×</button>
                <span className={styles.reviewKicker}>Confidential Listing · Step 3 of 3</span>
                <h2 id="review-heading">Complete Your License Details</h2>
                <p>Your service selection has been saved. Complete the license and contact information below before secure checkout.</p>

                <div className={styles.reviewFields}>
                  <label><span>Full Name *</span><input type="text" autoComplete="name" required name="name" /></label>
                  <label><span>Email *</span><input type="email" autoComplete="email" required name="email" /></label>
                  <label><span>Phone *</span><input type="tel" autoComplete="tel" required name="phone" /></label>
                  <div className={styles.lockedField}>
                    <span>County *</span>
                    <strong>{county || "Not selected"}</strong>
                    <input type="hidden" name="county" value={county} />
                  </div>
                  <div className={styles.lockedField}>
                    <span>License Type *</span>
                    <strong>{licenseType || "Not selected"}</strong>
                    <input type="hidden" name="license_type" value={licenseType} />
                  </div>
                  <div className={styles.lockedField}>
                    <span>Asking Price</span>
                    <strong>{askingPrice ? `${askingPrice}` : "Not provided"}</strong>
                    <input type="hidden" name="asking_price" value={askingPrice} />
                  </div>
                  <div className={styles.lockedField}>
                    <span>License Status</span>
                    <strong>{selfLicenseStatus || "Not selected"}</strong>
                  </div>
                  <label className={styles.notes}><span>Additional Details</span><textarea name="message" rows={3} /></label>
                </div>

                <div className={styles.agreements}>
                  <label><input type="checkbox" required name="seller_certification" value="Certified" /><span>I certify that I own the license or am authorized to advertise it, and that the submitted information is accurate.</span></label>
                  <label><input type="checkbox" required name="fee_agreement" value="Accepted" /><span>I understand that $14.95 is a one-time listing-submission fee. Payment does not guarantee publication, and rejected submissions are eligible for a refund.</span></label>
                </div>

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

