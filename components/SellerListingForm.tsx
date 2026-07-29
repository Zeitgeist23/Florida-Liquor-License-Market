"use client";

import { FormEvent, useEffect, useState } from "react";

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

type SaleMethod = "" | "Self-Directed Listing" | "Broker-Assisted Listing";

export default function SellerListingForm() {
  const [saleMethod, setSaleMethod] = useState<SaleMethod>("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "cancelled") {
      setIsError(true);
      setStatus(
        "Payment was canceled. Your listing has not been submitted for review. You may complete the form again when ready."
      );
    }
  }, []);

  async function submitListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const selectedMethod = String(data.get("sale_method") || "") as SaleMethod;

    if (!selectedMethod) {
      setIsError(true);
      setStatus("Please choose Self-Directed Listing or Broker-Assisted Listing.");
      return;
    }

    setSubmitting(true);
    setIsError(false);
    setStatus("Saving your listing and opening secure Stripe checkout…");

    try {
      const assistanceSummary = [`Sale method: ${selectedMethod}`];

      if (selectedMethod === "Broker-Assisted Listing") {
        assistanceSummary.push(
          `Currently represented by another broker: ${String(
            data.get("broker_currently_represented") || "Not provided"
          )}`,
          `Preferred broker arrangement: ${String(
            data.get("broker_arrangement") || "No preference / need guidance"
          )}`,
          `Desired net amount: ${String(data.get("desired_net_amount") || "Not provided")}`,
          `Preferred contact method: ${String(data.get("broker_contact_method") || "Not provided")}`,
          `ABT application preparation and transaction coordination: ${
            data.get("abt_transaction_coordination") ? "Requested" : "Not requested"
          }`
        );
      }

      const sellerMessage = String(data.get("message") || "").trim();
      let combinedMessage = assistanceSummary.join("\n");
      if (sellerMessage) combinedMessage += `\n\nAdditional seller details:\n${sellerMessage}`;

      const response = await fetch("/api/listing-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          county: String(data.get("county") || ""),
          license_type: String(data.get("license_type") || ""),
          asking_price: String(data.get("asking_price") || ""),
          license_status: String(data.get("license_status") || ""),
          preferred_timing: String(data.get("preferred_timing") || ""),
          message: combinedMessage,
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
        <a className={styles.brand} href="/" aria-label="Florida Liquor License Market home">
          <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
        </a>
        <nav aria-label="Seller page navigation">
          <a href="/">Return Home</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.layout}>
          <aside className={styles.intro}>
            <span className={styles.kicker}>Confidential Seller Representation</span>
            <h1>List Your Florida Liquor License</h1>
            <p>
              Publish a self-directed listing or request broker-assisted marketing and transaction support.
            </p>
            <ul>
              <li>One-time $14.95 submission fee</li>
              <li>Confidential marketplace review</li>
              <li>Statewide buyer visibility</li>
              <li>Seller-selected service level</li>
            </ul>
            <div className={styles.trust}>
              <img src="/assets/hero-trusted-shield.png" alt="" aria-hidden="true" />
              <span>
                <strong>Discreet. Secure. Trusted.</strong>
                <small>Your information is used only to evaluate and respond to your submission.</small>
              </span>
            </div>
          </aside>

          <form className={styles.form} onSubmit={submitListing}>
            <div className={styles.formHeading}>
              <h2>Submit Your License</h2>
              <p>Choose how you would like to sell, then complete the listing information.</p>
            </div>

            <label className={styles.honeypot} aria-hidden="true">
              Leave blank
              <input type="text" tabIndex={-1} autoComplete="off" name="_honey" />
            </label>

            <fieldset className={styles.methodFieldset}>
              <legend>How would you like to sell your license? *</legend>
              <p>Choose the level of assistance you would like. You may change your selection later.</p>
              <div className={styles.methodOptions}>
                <label className={saleMethod === "Self-Directed Listing" ? styles.methodSelected : styles.methodOption}>
                  <input
                    type="radio"
                    name="sale_method"
                    value="Self-Directed Listing"
                    required
                    checked={saleMethod === "Self-Directed Listing"}
                    onChange={() => setSaleMethod("Self-Directed Listing")}
                  />
                  <span>
                    <strong>Self-Directed Listing</strong>
                    <small>
                      I will communicate directly with buyers and manage negotiations, documentation, and the
                      license-transfer process. FLLM will publish my listing and forward inquiries to me.
                    </small>
                  </span>
                </label>

                <label className={saleMethod === "Broker-Assisted Listing" ? styles.methodSelected : styles.methodOption}>
                  <input
                    type="radio"
                    name="sale_method"
                    value="Broker-Assisted Listing"
                    required
                    checked={saleMethod === "Broker-Assisted Listing"}
                    onChange={() => setSaleMethod("Broker-Assisted Listing")}
                  />
                  <span>
                    <strong>Broker-Assisted Listing</strong>
                    <small>
                      I would like an FLLM-affiliated broker to contact me about marketing, buyer communications,
                      offer negotiations, and transaction and ABT-transfer coordination.
                    </small>
                  </span>
                </label>
              </div>
              <p className={styles.disclosure}>
                Selecting Broker-Assisted Listing does not create a brokerage relationship or require a commission.
                An FLLM representative will discuss broker availability, services, commission terms, and the required
                written agreement.
              </p>

              {saleMethod === "Broker-Assisted Listing" && (
                <div className={styles.brokerDetails}>
                  <p>Tell us how you would like a broker to assist.</p>
                  <label>
                    <span>Are you currently represented by another broker? *</span>
                    <select name="broker_currently_represented" required defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option>No</option>
                      <option>Yes</option>
                      <option>Not sure</option>
                    </select>
                  </label>
                  <label>
                    <span>Preferred arrangement</span>
                    <select name="broker_arrangement" defaultValue="">
                      <option value="">No preference / need guidance</option>
                      <option>Non-exclusive arrangement</option>
                      <option>Exclusive arrangement</option>
                    </select>
                  </label>
                  <label>
                    <span>Desired net amount</span>
                    <input type="text" inputMode="decimal" name="desired_net_amount" placeholder="$" />
                  </label>
                  <label>
                    <span>Preferred contact method *</span>
                    <select name="broker_contact_method" required defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option>Phone</option>
                      <option>Email</option>
                      <option>Either phone or email</option>
                    </select>
                  </label>
                  <label className={styles.abtChoice}>
                    <input type="checkbox" name="abt_transaction_coordination" value="Requested" />
                    <span>I would also like information about ABT application preparation and transaction coordination.</span>
                  </label>
                </div>
              )}
            </fieldset>

            <div className={styles.fields}>
              <label><span>Full Name *</span><input type="text" autoComplete="name" required name="name" /></label>
              <label><span>Email *</span><input type="email" autoComplete="email" required name="email" /></label>
              <label><span>Phone *</span><input type="tel" autoComplete="tel" required name="phone" /></label>
              <label>
                <span>County *</span>
                <select name="county" required defaultValue="">
                  <option value="" disabled>Select county</option>
                  {COUNTIES.map((county) => <option key={county}>{county} County</option>)}
                </select>
              </label>
              <label>
                <span>License Type *</span>
                <select name="license_type" required defaultValue="">
                  <option value="" disabled>Select license type</option>
                  <option>4COP Quota</option>
                  <option>3PS Quota / Package Store</option>
                  <option>2COP Beer &amp; Wine</option>
                  <option>Specialty / Qualified Business License</option>
                  <option>Not Sure</option>
                </select>
              </label>
              <label><span>Asking Price</span><input type="text" inputMode="decimal" placeholder="$" name="asking_price" /></label>
              <label>
                <span>License Status *</span>
                <select name="license_status" required defaultValue="">
                  <option value="" disabled>Select status</option>
                  <option>Active at a location</option>
                  <option>Inactive / in escrow</option>
                  <option>Part of a business sale</option>
                  <option>Not sure</option>
                </select>
              </label>
              <label>
                <span>Preferred Timing</span>
                <select name="preferred_timing" defaultValue="">
                  <option value="">Select timing</option>
                  <option>As soon as possible</option>
                  <option>Within 30 days</option>
                  <option>Within 60–90 days</option>
                  <option>Exploring options</option>
                </select>
              </label>
              <label className={styles.notes}>
                <span>Additional Details</span>
                <textarea name="message" rows={5} placeholder="Share relevant details about the license, location, or transaction." />
              </label>
            </div>

            <div className={styles.agreements}>
              <label>
                <input type="checkbox" required name="seller_certification" value="Certified" />
                <span>I certify that I own the license or am authorized to advertise it, and that the submitted information is accurate.</span>
              </label>
              <label>
                <input type="checkbox" required name="fee_agreement" value="Accepted" />
                <span>I understand that $14.95 is a one-time listing-submission fee, payment does not guarantee publication, and rejected submissions are eligible for a refund.</span>
              </label>
            </div>

            <div className={styles.paymentSummary}><span>Listing Submission Fee</span><strong>$14.95</strong></div>
            <button className={styles.submit} type="submit" disabled={submitting}>
              {submitting ? "Creating Secure Checkout…" : "Continue to Secure Payment — $14.95"}
            </button>
            <p className={styles.paymentNote}>
              Your information is saved first. Stripe securely processes the payment. We publish only after matching
              the payer email and reviewing the listing.
            </p>
            <p className={isError ? styles.errorStatus : styles.status} role="status" aria-live="polite">{status}</p>
          </form>
        </div>
      </section>
    </main>
  );
}
