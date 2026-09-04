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
  const [inquiryRoutes, setInquiryRoutes] = useState([
    "Direct email",
    "Direct phone",
    "FLLM inquiry form forwarded to broker",
  ]);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [documentName, setDocumentName] = useState("");

  const allInquiryRoutes = [
    "Direct email",
    "Direct phone",
    "FLLM inquiry form forwarded to broker",
  ];

  function toggleInquiryRoute(route: string, checked: boolean) {
    setInquiryRoutes((current) =>
      checked
        ? Array.from(new Set([...current, route]))
        : current.filter((item) => item !== route),
    );
  }

  useEffect(() => {
    function restoreFormAfterCheckout() {
      setSubmitting(false);

      if (
        new URLSearchParams(window.location.search).get("payment") ===
        "cancelled"
      ) {
        setIsError(true);
        setStatus(
          "Payment was canceled. Your broker listing has not been activated. You may resubmit when ready.",
        );
        document
          .getElementById("broker-listing-form")
          ?.scrollIntoView({ block: "start" });
        return;
      }

      setIsError(false);
      setStatus("");
    }

    restoreFormAfterCheckout();
    window.addEventListener("pageshow", restoreFormAfterCheckout);
    return () =>
      window.removeEventListener("pageshow", restoreFormAfterCheckout);
  }, []);

  useEffect(() => {
    function selectListingTier(event: Event) {
      const tier = (event as CustomEvent<{ tier?: string }>).detail?.tier;
      if (tier === "standard" || tier === "featured") {
        setListingTier(tier);
      }
    }

    window.addEventListener(
      "fllm:select-broker-listing-tier",
      selectListingTier,
    );
    return () =>
      window.removeEventListener(
        "fllm:select-broker-listing-tier",
        selectListingTier,
      );
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
            id="broker-tier-standard"
            style={{ scrollMarginTop: 110 }}
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
            <span className={styles.defaultFlag}>Default</span>
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
            id="broker-tier-featured"
            style={{ scrollMarginTop: 110 }}
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
            <small>Enter the contact details buyers should see and use.</small>
          </span>
        </legend>
        <div className={styles.fields}>
          <label>
            <span>Broker name *</span>
            <input name="broker_name" required autoComplete="name" />
          </label>
          <label>
            <span>Brokerage *</span>
            <input name="brokerage" required autoComplete="organization" />
          </label>
          <label>
            <span>Email *</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            <span>Phone *</span>
            <input
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>3</b>
          <span>
            License information
            <small>Provide the details buyers need to evaluate the opportunity.</small>
          </span>
        </legend>
        <div className={styles.fields}>
          <label>
            <span>County *</span>
            <select name="county" required defaultValue="">
              <option value="" disabled>Select county</option>
              {floridaCounties.map((county) => (
                <option key={county.name} value={county.name}>{county.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>License type *</span>
            <select name="license_type" required defaultValue="4COP Quota">
              <option value="4COP Quota">4COP Quota</option>
              <option value="3PS Quota / Package Store">3PS Quota / Package Store</option>
            </select>
          </label>
          <label>
            <span>Asking price *</span>
            <input
              name="asking_price"
              required
              inputMode="numeric"
              value={askingPrice}
              onChange={(event) => setAskingPrice(formatCurrency(event.target.value))}
              placeholder="435,000"
            />
          </label>
          <label>
            <span>License number</span>
            <input name="license_number" placeholder="Optional / may be kept private" />
          </label>
          <label className={styles.fullField}>
            <span>Listing notes</span>
            <textarea name="notes" rows={4} />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>4</b>
          <span>
            Buyer inquiry routing
            <small>Choose how buyer inquiries should reach you.</small>
          </span>
        </legend>
        <div className={styles.inquiryRouting}>
          <span>Inquiry methods</span>
          <small>Select one or more.</small>
          <div className={styles.inquiryOptions}>
            {allInquiryRoutes.map((route) => (
              <label key={route}>
                <input
                  type="checkbox"
                  name="inquiry_routes"
                  value={route}
                  checked={inquiryRoutes.includes(route)}
                  onChange={(event) => toggleInquiryRoute(route, event.target.checked)}
                />
                <span>{route}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <b>5</b>
          <span>
            Supporting document
            <small>Optional proof of authority or listing documentation.</small>
          </span>
        </legend>
        <label className={styles.fileField}>
          <input
            type="file"
            name="supporting_document"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            onChange={(event) => setDocumentName(event.target.files?.[0]?.name || "")}
          />
          <span>
            <b>{documentName || "Choose a file"}</b>
            <small>PDF, PNG, JPG or WEBP</small>
          </span>
        </label>
      </fieldset>
      <div className={styles.certifications}>
        <label>
          <input type="checkbox" name="authority_confirmed" required />
          <span>I am authorized to advertise this license and the submitted information is accurate to the best of my knowledge.</span>
        </label>
        <label>
          <input type="checkbox" name="terms_confirmed" required />
          <span>I understand FLLM provides marketplace advertising and inquiry routing and does not become my client&apos;s broker through this listing submission.</span>
        </label>
      </div>
      <div className={styles.formFooter}>
        <div>
          <strong>{listingTier === "featured" ? "$24.95 Featured" : "$14.95 Standard"}</strong>
          <small>One-time listing fee</small>
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Opening checkout…" : "Continue to Secure Checkout"}
        </button>
      </div>
      {status ? (
        <p className={isError ? styles.formError : styles.formStatus} role="status">{status}</p>
      ) : null}
    </form>
  );
}
