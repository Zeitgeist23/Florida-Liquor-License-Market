"use client";

import { FormEvent, useEffect, useState } from "react";
import { floridaCounties } from "@/data/florida-counties";
import styles from "./broker-listing.module.css";

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

export default function BrokerListingForm() {
  const [listingTier, setListingTier] = useState<"standard" | "featured">(
    "standard",
  );
  const [askingPrice, setAskingPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [documentName, setDocumentName] = useState("");

  useEffect(() => {
    if (
      new URLSearchParams(window.location.search).get("payment") === "cancelled"
    ) {
      setIsError(true);
      setStatus(
        "Payment was canceled. Your broker listing has not been activated. You may resubmit when ready.",
      );
      document
        .getElementById("broker-listing-form")
        ?.scrollIntoView({ block: "start" });
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSubmitting(true);
    setIsError(false);
    setStatus("Saving the broker listing and opening secure Stripe checkout…");

    try {
      const response = await fetch("/api/broker-listing-submissions", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };
      if (!response.ok || !result.checkoutUrl)
        throw new Error(
          result.error || "The broker listing could not be submitted.",
        );
      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setSubmitting(false);
      setIsError(true);
      setStatus(
        cause instanceof Error
          ? cause.message
          : "The broker listing could not be submitted.",
      );
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={submit}
      encType="multipart/form-data"
    >
      <label className={styles.honeypot} aria-hidden="true">
        Leave blank
        <input name="_honey" tabIndex={-1} autoComplete="off" />
      </label>
      <fieldset>
        <legend>
          <b>1</b>
          <span>
            Choose your marketplace listing
            <small>
              Both options are one-time fees with no recurring charge or FLLM
              commission.
            </small>
          </span>
        </legend>
        <div className={styles.tierGrid}>
          <label
            className={
              listingTier === "standard"
                ? styles.tierSelected
                : styles.tierOption
            }
          >
            <input
              type="radio"
              name="listing_tier"
              value="standard"
              checked={listingTier === "standard"}
              onChange={() => setListingTier("standard")}
            />
            <span className={styles.tierTop}>
              <b>Standard</b>
              <strong>$14.95</strong>
            </span>
            <span className={styles.tierDescription}>
              A professional marketplace listing with your brokerage and
              designated contact information.
            </span>
            <span className={styles.tierBenefits}>
              <i>✓</i> Marketplace publication after review
              <br />
              <i>✓</i> Buyer inquiries routed to you
              <br />
              <i>✓</i> Listing remains active until sold or withdrawn
            </span>
          </label>
          <label
            className={
              listingTier === "featured"
                ? styles.tierSelected
                : styles.tierOption
            }
          >
            <input
              type="radio"
              name="listing_tier"
              value="featured"
              checked={listingTier === "featured"}
              onChange={() => setListingTier("featured")}
            />
            <span className={styles.featuredFlag}>Recommended</span>
            <span className={styles.tierTop}>
              <b>Featured</b>
              <strong>$24.95</strong>
            </span>
            <span className={styles.tierDescription}>
              Everything in Standard, plus stronger visibility during the
              listing&apos;s launch.
            </span>
            <span className={styles.tierBenefits}>
              <i>✓</i> Featured badge for 30 days
              <br />
              <i>✓</i> Priority placement for 30 days
              <br />
              <i>✓</i> Reverts to a Standard listing afterward
            </span>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>2</b>
          <span>
            Broker and brokerage information
            <small>
              This information identifies the independent listing
              representative.
            </small>
          </span>
        </legend>
        <div className={styles.fields}>
          <label>
            <span>Broker&apos;s full name *</span>
            <input name="name" required autoComplete="name" maxLength={160} />
          </label>
          <label>
            <span>Brokerage or company *</span>
            <input
              name="brokerage_name"
              required
              autoComplete="organization"
              maxLength={180}
            />
          </label>
          <label>
            <span>Business email *</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={254}
            />
          </label>
          <label>
            <span>Business phone *</span>
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
            <span>Broker or registration number</span>
            <input
              name="broker_license_number"
              maxLength={100}
              placeholder="If applicable"
            />
          </label>
          <label>
            <span>Brokerage website</span>
            <input
              name="brokerage_website"
              type="url"
              maxLength={300}
              placeholder="https://"
            />
          </label>
          <label className={styles.fullField}>
            <span>Buyer inquiry routing *</span>
            <select name="contact_preference" required defaultValue="">
              <option value="" disabled>
                Select preferred contact route
              </option>
              <option>Email</option>
              <option>Phone</option>
              <option>Email and phone</option>
              <option>FLLM inquiry form forwarded to broker</option>
            </select>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>3</b>
          <span>
            Client license information
            <small>FLLM reviews these details before publication.</small>
          </span>
        </legend>
        <div className={styles.fields}>
          <label>
            <span>Florida county *</span>
            <select name="county" required defaultValue="">
              <option value="" disabled>
                Select county
              </option>
              {floridaCounties.map((county) => (
                <option key={county.slug}>{county.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>License type *</span>
            <select name="license_type" required defaultValue="">
              <option value="" disabled>
                Select license type
              </option>
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
              onChange={(event) =>
                setAskingPrice(formatCurrency(event.target.value))
              }
              placeholder="$0"
            />
          </label>
          <label>
            <span>License status *</span>
            <select name="license_status" required defaultValue="">
              <option value="" disabled>
                Select current status
              </option>
              <option>Active</option>
              <option>Inactive / Escrowed</option>
              <option>Pending transfer</option>
              <option>Status being confirmed</option>
            </select>
          </label>
          <label>
            <span>License number</span>
            <input
              name="license_number"
              maxLength={100}
              placeholder="Optional; kept private unless authorized"
            />
          </label>
          <label>
            <span>Preferred sale timing *</span>
            <select name="preferred_timing" required defaultValue="">
              <option value="" disabled>
                Select timing
              </option>
              <option>Immediately</option>
              <option>Within 30 days</option>
              <option>Within 60–90 days</option>
              <option>Flexible</option>
            </select>
          </label>
          <label className={styles.fullField}>
            <span>Public license-number preference *</span>
            <select
              name="license_number_visibility"
              required
              defaultValue="Keep license number private"
            >
              <option>Keep license number private</option>
              <option>Display license number after FLLM review</option>
            </select>
          </label>
          <label className={styles.fullField}>
            <span>Listing description and confidential notes</span>
            <textarea
              name="message"
              rows={5}
              maxLength={3500}
              placeholder="Describe the license, availability, transaction considerations, or information FLLM should know."
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>4</b>
          <span>
            Optional supporting document
            <small>
              Used privately by FLLM for review; never published automatically.
            </small>
          </span>
        </legend>
        <label className={styles.fileField}>
          <input
            name="supporting_document"
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            onChange={(event) =>
              setDocumentName(event.target.files?.[0]?.name || "")
            }
          />
          <span>
            <b>{documentName || "Choose a PDF, JPG or PNG"}</b>
            <small>
              Optional license record or authorization document · Maximum 4 MB
            </small>
          </span>
        </label>
      </fieldset>
      <div className={styles.certifications}>
        <label>
          <input
            type="checkbox"
            name="authority_certification"
            required
            value="Accepted"
          />
          <span>
            I certify that I am authorized by the license owner to advertise
            this license and provide the submitted information to FLLM.
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            name="accuracy_certification"
            required
            value="Accepted"
          />
          <span>
            I certify that the information is accurate to the best of my
            knowledge and will promptly report material changes in price, status
            or availability.
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            name="marketplace_acknowledgment"
            required
            value="Accepted"
          />
          <span>
            I understand this is an advertising-only marketplace submission.
            FLLM does not become my client&apos;s broker, participate in the
            transaction or receive any portion of my commission.
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            name="fee_agreement"
            required
            value="Accepted"
          />
          <span>
            I understand the selected{" "}
            {listingTier === "featured" ? "$24.95 Featured" : "$14.95 Standard"}{" "}
            fee is a one-time listing-submission fee. Payment does not guarantee
            publication, and rejected submissions are eligible for a refund.
          </span>
        </label>
      </div>
      <div className={styles.formFooter}>
        <div>
          <strong>
            {listingTier === "featured"
              ? "Featured Listing — $24.95"
              : "Standard Listing — $14.95"}
          </strong>
          <span>One-time fee · Secure payment through Stripe</span>
        </div>
        <button type="submit" disabled={submitting} aria-busy={submitting}>
          {submitting
            ? "Opening Secure Checkout…"
            : `Continue to Payment — ${listingTier === "featured" ? "$24.95" : "$14.95"}`}
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
