"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

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

type DisplaySelectProps = {
  className: string;
  name: string;
  value: string;
  initialText: string;
  required?: boolean;
  children: ReactNode;
  onChange: (value: string) => void;
};

function DisplaySelect({ className, name, value, initialText, required, children, onChange }: DisplaySelectProps) {
  const changed = value !== "" && value !== initialText;
  return (
    <label className={`${styles.selectWrap} ${className} ${changed ? styles.changed : ""}`}>
      <span className={styles.selectDisplay}>{value || initialText}</span>
      <select name={name} value={value} required={required} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  );
}

export default function SellerListingForm() {
  const [saleMethod, setSaleMethod] = useState<SaleMethod>("Broker-Assisted Listing");
  const [represented, setRepresented] = useState("");
  const [arrangement, setArrangement] = useState("No preference / need guidance");
  const [contactMethod, setContactMethod] = useState("");
  const [desiredNet, setDesiredNet] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "cancelled") {
      setIsError(true);
      setStatus("Payment was canceled. Your listing has not been submitted for review. You may complete the form again when ready.");
    }
  }, []);

  async function submitListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const data = new FormData(event.currentTarget);
    setSubmitting(true);
    setIsError(false);
    setStatus("Saving your listing and opening secure Stripe checkout…");

    try {
      const assistanceSummary = [`Sale method: ${saleMethod}`];
      if (saleMethod === "Broker-Assisted Listing") {
        assistanceSummary.push(
          `Currently represented by another broker: ${String(data.get("broker_currently_represented") || "Not provided")}`,
          `Preferred broker arrangement: ${String(data.get("broker_arrangement") || "No preference / need guidance")}`,
          `Desired net amount: ${String(data.get("desired_net_amount") || "Not provided")}`,
          `Preferred contact method: ${String(data.get("broker_contact_method") || "Not provided")}`,
          `ABT application preparation and transaction coordination: ${data.get("abt_transaction_coordination") ? "Requested" : "Not requested"}`
        );
      }

      const sellerMessage = String(data.get("message") || "").trim();
      let combinedMessage = assistanceSummary.join("\n");
      if (sellerMessage) combinedMessage += `\n\nAdditional seller details:\n${sellerMessage}`;

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
          license_status: String(data.get("license_status") || ""),
          preferred_timing: String(data.get("preferred_timing") || ""),
          message: combinedMessage,
          seller_certification: Boolean(data.get("seller_certification")),
          fee_agreement: Boolean(data.get("fee_agreement")),
          honey: String(data.get("_honey") || ""),
        }),
      });

      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "Unable to create secure checkout.");
      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setSubmitting(false);
      setIsError(true);
      setStatus(cause instanceof Error ? cause.message : "We could not save your listing. Please try again.");
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={submitListing}>
        <section className={styles.referenceHero} aria-label="List Your Florida Liquor License">
          <a className={`${styles.hit} ${styles.logoHit}`} href="/" aria-label="Florida Liquor License Market home">Home</a>
          <a className={`${styles.hit} ${styles.homeHit}`} href="/">Return Home</a>
          <a className={`${styles.hit} ${styles.contactHit}`} href="/contact">Contact Us</a>

          <div className={styles.mobileContent}>
            <img src="/assets/brand-sharp.svg" alt="Florida Liquor License Market" />
            <span>Confidential Seller Representation</span>
            <h1>List Your Florida Liquor License</h1>
            <p>Publish a self-directed listing or request broker-assisted marketing and transaction support.</p>
          </div>

          <label className={`${styles.method} ${styles.selfMethod} ${saleMethod === "Self-Directed Listing" ? styles.active : ""}`}>
            <input type="radio" name="sale_method" value="Self-Directed Listing" checked={saleMethod === "Self-Directed Listing"} onChange={() => setSaleMethod("Self-Directed Listing")} />
            <span className={styles.mobileCardText}><strong>Self-Directed Listing</strong><small>I will communicate directly with buyers and manage negotiations, documentation, and the license-transfer process.</small></span>
          </label>

          <label className={`${styles.method} ${styles.brokerMethod} ${saleMethod === "Broker-Assisted Listing" ? styles.active : ""}`}>
            <input type="radio" name="sale_method" value="Broker-Assisted Listing" checked={saleMethod === "Broker-Assisted Listing"} onChange={() => setSaleMethod("Broker-Assisted Listing")} />
            <span className={styles.mobileCardText}><strong>Broker-Assisted Listing</strong><small>I would like an FLLM-affiliated broker to contact me about marketing, buyer communications, offer negotiations, and transaction coordination.</small></span>
          </label>

          {saleMethod === "Broker-Assisted Listing" && (
            <>
              <DisplaySelect className={styles.represented} name="broker_currently_represented" value={represented} initialText="Select one" required onChange={setRepresented}>
                <option value="">Select one</option><option>No</option><option>Yes</option><option>Not sure</option>
              </DisplaySelect>
              <DisplaySelect className={styles.arrangement} name="broker_arrangement" value={arrangement} initialText="No preference / need guidance" onChange={setArrangement}>
                <option>No preference / need guidance</option><option>Non-exclusive arrangement</option><option>Exclusive arrangement</option>
              </DisplaySelect>
              <input className={`${styles.amount} ${desiredNet ? styles.filled : ""}`} type="text" inputMode="decimal" name="desired_net_amount" placeholder="$" value={desiredNet} onChange={(event) => setDesiredNet(event.target.value)} />
              <DisplaySelect className={styles.contactMethod} name="broker_contact_method" value={contactMethod} initialText="Select one" required onChange={setContactMethod}>
                <option value="">Select one</option><option>Phone</option><option>Email</option><option>Either phone or email</option>
              </DisplaySelect>
            </>
          )}
        </section>

        <section className={styles.detailsSection} aria-labelledby="details-heading">
          <div className={styles.detailsPanel}>
            <h2 id="details-heading">Complete Listing Details</h2>
            <label className={styles.honeypot} aria-hidden="true">Leave blank<input type="text" tabIndex={-1} autoComplete="off" name="_honey" /></label>

            <div className={styles.fields}>
              <label><span>Full Name *</span><input type="text" autoComplete="name" required name="name" /></label>
              <label><span>Email *</span><input type="email" autoComplete="email" required name="email" /></label>
              <label><span>Phone *</span><input type="tel" autoComplete="tel" required name="phone" /></label>
              <label><span>County *</span><select name="county" required defaultValue=""><option value="" disabled>Select county</option>{COUNTIES.map((county) => <option key={county}>{county} County</option>)}</select></label>
              <label><span>License Type *</span><select name="license_type" required defaultValue=""><option value="" disabled>Select license type</option><option>4COP Quota</option><option>3PS Quota / Package Store</option><option>2COP Beer &amp; Wine</option><option>Specialty / Qualified Business License</option><option>Not Sure</option></select></label>
              <label><span>Asking Price</span><input type="text" inputMode="decimal" placeholder="$" name="asking_price" /></label>
              <label><span>License Status *</span><select name="license_status" required defaultValue=""><option value="" disabled>Select status</option><option>Active at a location</option><option>Inactive / in escrow</option><option>Part of a business sale</option><option>Not sure</option></select></label>
              <label><span>Preferred Timing</span><select name="preferred_timing" defaultValue=""><option value="">Select timing</option><option>As soon as possible</option><option>Within 30 days</option><option>Within 60–90 days</option><option>Exploring options</option></select></label>
              {saleMethod === "Broker-Assisted Listing" && <label className={styles.abtChoice}><input type="checkbox" name="abt_transaction_coordination" value="Requested" /><span>I would also like information about ABT application preparation and transaction coordination.</span></label>}
              <label className={styles.notes}><span>Additional Details</span><textarea name="message" rows={5} placeholder="Share relevant details about the license, location, or transaction." /></label>
            </div>

            <div className={styles.agreements}>
              <label><input type="checkbox" required name="seller_certification" value="Certified" /><span>I certify that I own the license or am authorized to advertise it, and that the submitted information is accurate.</span></label>
              <label><input type="checkbox" required name="fee_agreement" value="Accepted" /><span>I understand that $14.95 is a one-time listing-submission fee, payment does not guarantee publication, and rejected submissions are eligible for a refund.</span></label>
            </div>

            <div className={styles.paymentSummary}><span>Listing Submission Fee</span><strong>$14.95</strong></div>
            <button className={styles.submit} type="submit" disabled={submitting}>{submitting ? "Creating Secure Checkout…" : "Continue to Secure Payment — $14.95"}</button>
            <p className={styles.paymentNote}>Your information is saved first. Stripe securely processes the payment. We publish only after matching the payer email and reviewing the listing.</p>
            <p className={isError ? styles.errorStatus : styles.status} role="status" aria-live="polite">{status}</p>
          </div>
        </section>
      </form>
    </main>
  );
}
