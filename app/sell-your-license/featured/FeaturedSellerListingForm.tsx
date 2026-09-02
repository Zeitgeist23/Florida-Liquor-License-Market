"use client";

import { FormEvent, useEffect, useState } from "react";

import { floridaCounties } from "@/data/florida-counties";
import styles from "@/app/brokers/list-your-license/broker-listing.module.css";

function formatCurrency(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function FeaturedSellerListingForm() {
  const [askingPrice, setAskingPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("payment") === "cancelled") {
      setIsError(true);
      setStatus("Payment was canceled. Your Featured listing has not been activated. You may continue when ready.");
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    setSubmitting(true);
    setIsError(false);
    setStatus("Saving your Featured listing and opening secure Stripe checkout…");

    try {
      const additionalNotes = String(data.get("message") || "").trim();
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
          message: [
            "Sale method: Self-Directed Listing",
            `Preferred buyer contact method: ${String(data.get("contact_method") || "Not provided")}`,
            additionalNotes ? `Additional seller details: ${additionalNotes}` : "",
          ].filter(Boolean).join("\n\n"),
          sale_method: "Self-Directed Listing",
          listing_tier: "featured",
          seller_certification: Boolean(data.get("seller_certification")),
          fee_agreement: Boolean(data.get("fee_agreement")),
          honey: String(data.get("_honey") || ""),
        }),
      });

      const result = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error || "The Featured listing could not be submitted.");
      }

      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setSubmitting(false);
      setIsError(true);
      setStatus(
        cause instanceof Error
          ? cause.message
          : "The Featured listing could not be submitted.",
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label className={styles.honeypot} aria-hidden="true">
        Leave blank
        <input name="_honey" tabIndex={-1} autoComplete="off" />
      </label>

      <fieldset>
        <legend>
          <b>1</b>
          <span>
            Seller contact information
            <small>Buyer inquiries may be directed to the contact information you provide.</small>
          </span>
        </legend>
        <div className={styles.fields}>
          <label>
            <span>Full name *</span>
            <input name="name" required autoComplete="name" maxLength={160} />
          </label>
          <label>
            <span>Email *</span>
            <input name="email" type="email" required autoComplete="email" maxLength={254} />
          </label>
          <label>
            <span>Phone *</span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
            />
          </label>
          <label>
            <span>Preferred buyer contact *</span>
            <select name="contact_method" required defaultValue="">
              <option value="" disabled>Select contact method</option>
              <option>Phone</option>
              <option>Email</option>
              <option>Either phone or email</option>
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <b>2</b>
          <span>
            License information
            <small>FLLM reviews the submission before marketplace publication.</small>
          </span>
        </legend>
        <div className={styles.fields}>
          <label>
            <span>Florida county *</span>
            <select name="county" required defaultValue="">
              <option value="" disabled>Select county</option>
              {floridaCounties.map((county) => (
                <option key={county.slug}>{county.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>License type *</span>
            <select name="license_type" required defaultValue="">
              <option value="" disabled>Select license type</option>
              <option>4COP Quota</option>
              <option>3PS Quota / Package Store</option>
            </select>
          </label>
          <label>
            <span>Asking price *</span>
            <input
              name="asking_price"
              required
              inputMode="numeric"
              value={askingPrice ? `$${askingPrice}` : ""}
              onChange={(event) => setAskingPrice(formatCurrency(event.target.value))}
              placeholder="$0"
            />
          </label>
          <label>
            <span>License status *</span>
            <select name="license_status" required defaultValue="">
              <option value="" disabled>Select current status</option>
              <option>Active and current</option>
              <option>Inactive</option>
              <option>In escrow (DBPR/ABT)</option>
              <option>Transfer pending</option>
              <option>Not sure</option>
            </select>
          </label>
          <label>
            <span>Preferred sale timing *</span>
            <select name="preferred_timing" required defaultValue="">
              <option value="" disabled>Select timing</option>
              <option>Immediately</option>
              <option>Within 30 days</option>
              <option>Within 31–60 days</option>
              <option>Within 61–90 days</option>
              <option>Flexible</option>
            </select>
          </label>
          <label className={styles.fullField}>
            <span>Additional listing details</span>
            <textarea
              name="message"
              rows={5}
              maxLength={3500}
              placeholder="Describe the license, availability, transaction considerations, or other information FLLM should know."
            />
          </label>
        </div>
      </fieldset>

      <div className={styles.certifications}>
        <label>
          <input
            type="checkbox"
            required
            name="seller_certification"
            value="Certified"
          />
          <span>
            I certify that I own the license or am authorized to advertise it, and that the submitted information is accurate to the best of my knowledge.
          </span>
        </label>
        <label>
          <input type="checkbox" required name="fee_agreement" value="Accepted" />
          <span>
            I understand that $24.95 is a one-time Featured listing-submission fee. Featured placement lasts 30 days after publication, then the listing continues as a Standard listing until sold, withdrawn, or otherwise removed. Payment does not guarantee publication, and rejected submissions are eligible for a refund.
          </span>
        </label>
      </div>

      <div className={styles.formFooter}>
        <div>
          <strong>Featured Self-Directed Listing — $24.95</strong>
          <span>One-time fee · 30-day priority placement · Secure Stripe checkout</span>
        </div>
        <button type="submit" disabled={submitting} aria-busy={submitting}>
          {submitting ? "Opening Secure Checkout…" : "Continue to Payment — $24.95"}
          <i>›</i>
        </button>
      </div>

      <p
        className={isError ? styles.errorStatus : styles.formStatus}
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </form>
  );
}
