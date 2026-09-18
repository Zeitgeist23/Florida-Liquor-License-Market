"use client";

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
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

type HoverSelectOption = {
  value: string;
  label: string;
};

type HoverSelectProps = {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  options: HoverSelectOption[];
  onChange: (value: string) => void;
};

function HoverSelect({ id, name, value, placeholder, options, onChange }: HoverSelectProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((option) => option.value === value)?.label || placeholder;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function choose(valueToSelect: string) {
    onChange(valueToSelect);
    setOpen(false);
  }

  return (
    <div
      className={`broker-hover-select${open ? " is-open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        className="broker-hover-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
      >
        <span>{selectedLabel}</span>
        <i aria-hidden="true">⌄</i>
      </button>

      {open ? (
        <div className="broker-hover-select-menu" role="listbox" aria-labelledby={id}>
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                className={selected ? "is-selected" : undefined}
                onClick={() => choose(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function BrokerListingForm() {
  const [listingTier, setListingTier] = useState<"standard" | "featured">("standard");
  const [askingPrice, setAskingPrice] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [licenseType, setLicenseType] = useState("4COP Quota");
  const [offeringStructure, setOfferingStructure] = useState("");
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

  const countyOptions = floridaCounties.map((item) => ({ value: item.name, label: item.name }));
  const licenseTypeOptions = [
    { value: "4COP Quota", label: "4COP Quota" },
    { value: "3PS Quota / Package Store", label: "3PS Quota / Package Store" },
  ];
  const offeringOptions = [
    { value: "standalone", label: "Stand-alone liquor license" },
    { value: "business_required", label: "License included with a business — business purchase required" },
    { value: "either", label: "Available either separately or with the business" },
  ];
  const includesBusiness = offeringStructure === "business_required" || offeringStructure === "either";

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
      if (new URLSearchParams(window.location.search).get("payment") === "cancelled") {
        setIsError(true);
        setStatus("Payment was canceled. Your broker listing has not been activated. You may resubmit when ready.");
        document.getElementById("broker-listing-form")?.scrollIntoView({ block: "start" });
        return;
      }
      setIsError(false);
      setStatus("");
    }
    restoreFormAfterCheckout();
    window.addEventListener("pageshow", restoreFormAfterCheckout);
    return () => window.removeEventListener("pageshow", restoreFormAfterCheckout);
  }, []);

  useEffect(() => {
    function selectListingTier(event: Event) {
      const tier = (event as CustomEvent<{ tier?: string }>).detail?.tier;
      if (tier === "standard" || tier === "featured") setListingTier(tier);
    }
    window.addEventListener("fllm:select-broker-listing-tier", selectListingTier);
    return () => window.removeEventListener("fllm:select-broker-listing-tier", selectListingTier);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (!county) {
      setIsError(true);
      setStatus("Please select a county before continuing.");
      document.getElementById("broker-county-select")?.focus();
      return;
    }

    if (!licenseType) {
      setIsError(true);
      setStatus("Please select a license type before continuing.");
      document.getElementById("broker-license-type-select")?.focus();
      return;
    }

    if (!offeringStructure) {
      setIsError(true);
      setStatus("Please tell us whether the license is stand-alone or connected to a business.");
      document.getElementById("broker-offering-structure-select")?.focus();
      return;
    }

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
      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) throw new Error(result.error || "The broker listing could not be submitted.");
      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setSubmitting(false);
      setIsError(true);
      setStatus(cause instanceof Error ? cause.message : "The broker listing could not be submitted.");
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} encType="multipart/form-data">
      <style>{`
        .broker-select-field {
          min-width: 0;
        }
        .broker-select-field > span {
          display: block;
          margin-bottom: 8px;
          color: #071827;
          font-size: 13px;
          font-weight: 800;
        }
        .broker-full-select {
          grid-column: 1 / -1;
        }
        .broker-business-note {
          grid-column: 1 / -1;
          margin: -2px 0 2px;
          padding: 13px 15px;
          border: 1px solid rgba(25,155,190,.28);
          border-left: 3px solid #28c6e5;
          border-radius: 7px;
          color: #415665;
          background: linear-gradient(180deg, #f7fdff 0%, #f3fafc 100%);
          font-size: 13px;
          line-height: 1.55;
        }
        .broker-hover-select {
          position: relative;
          z-index: 20;
          width: 100%;
        }
        .broker-hover-select.is-open {
          z-index: 60;
        }
        .broker-hover-select-trigger {
          display: flex;
          width: 100%;
          min-height: 54px;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 0 16px;
          border: 1px solid #b9c6cd;
          border-radius: 7px;
          color: #071827;
          background: linear-gradient(180deg, #ffffff 0%, #fbfdfe 100%);
          box-shadow:
            inset 0 1px 2px rgba(7,24,39,.06),
            0 6px 14px rgba(7,24,39,.07);
          font: inherit;
          font-size: 16px;
          text-align: left;
          cursor: pointer;
          transition:
            transform .18s ease,
            border-color .18s ease,
            box-shadow .18s ease,
            background .18s ease;
        }
        .broker-hover-select-trigger:hover,
        .broker-hover-select.is-open .broker-hover-select-trigger {
          transform: translateY(-1px);
          border-color: #d69a14;
          background: #fff;
          box-shadow:
            0 0 0 3px rgba(246,167,0,.10),
            0 10px 22px rgba(7,24,39,.12);
        }
        .broker-hover-select-trigger:focus-visible {
          outline: none;
          border-color: #d69a14;
          box-shadow:
            0 0 0 3px rgba(246,167,0,.16),
            0 10px 22px rgba(7,24,39,.12);
        }
        .broker-hover-select-trigger i {
          flex: 0 0 auto;
          color: #213744;
          font-size: 20px;
          font-style: normal;
          line-height: 1;
          transform: translateY(-2px) rotate(0deg);
          transition: transform .16s ease;
        }
        .broker-hover-select.is-open .broker-hover-select-trigger i {
          transform: translateY(2px) rotate(180deg);
        }
        .broker-hover-select-menu {
          position: absolute;
          z-index: 70;
          top: calc(100% - 1px);
          right: 0;
          left: 0;
          max-height: 340px;
          overflow-y: auto;
          border: 1px solid #d69a14;
          border-top: 0;
          border-radius: 0 0 8px 8px;
          background: #fff;
          box-shadow: 0 18px 34px rgba(7,24,39,.18);
        }
        .broker-hover-select-menu button {
          display: block;
          width: 100%;
          padding: 10px 16px;
          border: 0;
          border-bottom: 1px solid rgba(7,24,39,.06);
          color: #071827;
          background: #fff;
          font: inherit;
          font-size: 16px;
          line-height: 1.25;
          text-align: left;
          cursor: pointer;
        }
        .broker-hover-select-menu button:last-child {
          border-bottom: 0;
        }
        .broker-hover-select-menu button:hover,
        .broker-hover-select-menu button:focus-visible {
          outline: none;
          color: #071827;
          background: #eaf9fd;
        }
        .broker-hover-select-menu button.is-selected {
          color: #071827;
          background: #fff4d7;
          font-weight: 800;
        }
        .${styles.fields} label:has(input[name="package_asking_price"]) {
          position: relative;
        }
        .${styles.fields} label:has(input[name="package_asking_price"])::after {
          content: "$";
          position: absolute;
          z-index: 2;
          left: 14px;
          bottom: 13px;
          color: #334b5a;
          font-size: 16px;
          font-weight: 700;
          pointer-events: none;
        }
        .${styles.fields} input[name="package_asking_price"] {
          padding-left: 30px !important;
          font-variant-numeric: tabular-nums;
        }
        @media (max-width: 620px) {
          .${styles.sectionHeading} > span { font-size: 16px !important; line-height: 1.35 !important; letter-spacing: .12em !important; }
          .${styles.form} legend > span { font-size: 18px !important; line-height: 1.35 !important; }
          .${styles.form} legend small { font-size: 17px !important; line-height: 1.55 !important; margin-top: 5px !important; color:#44596a !important; }
          .${styles.tierDescription} { font-size: 16px !important; line-height: 1.55 !important; }
          .${styles.tierBenefits} { font-size: 15px !important; line-height: 1.9 !important; }
          .${styles.fields} label > span,
          .${styles.inquiryRouting} > span,
          .broker-select-field > span { font-size: 15px !important; }
          .${styles.fields} input,
          .${styles.fields} select,
          .${styles.fields} textarea,
          .broker-hover-select-trigger,
          .broker-hover-select-menu button { font-size: 16px !important; }
          .${styles.inquiryRouting} > small { font-size: 17px !important; line-height: 1.55 !important; color:#44596a !important; }
          .${styles.inquiryOptions} label > span { font-size: 16px !important; line-height: 1.4 !important; }
          .${styles.fileField} b { font-size: 17px !important; }
          .${styles.fileField} small { font-size: 17px !important; line-height:1.5 !important; color:#44596a !important; }
          .${styles.certifications} label { font-size: 16px !important; line-height: 1.6 !important; }
          .${styles.formFooter} strong { font-size: 19px !important; }
          .${styles.formFooter} small { font-size: 15px !important; line-height: 1.45 !important; }
          .${styles.formFooter} button { font-size: 13px !important; }
          .broker-business-note { font-size: 15px; }
        }
      `}</style>
      <label className={styles.honeypot} aria-hidden="true">
        Leave blank
        <input name="_honey" tabIndex={-1} autoComplete="off" />
      </label>
      <fieldset>
        <legend><b>1</b><span>Choose your marketplace listing<small>Both options are one-time fees with no recurring charge or FLLM commission.</small></span></legend>
        <div className={styles.tierGrid}>
          <label id="broker-tier-standard" style={{ scrollMarginTop: 110 }} onMouseEnter={() => setListingTier("standard")} className={listingTier === "standard" ? styles.tierSelected : styles.tierOption}>
            <input type="radio" name="listing_tier" value="standard" checked={listingTier === "standard"} onChange={() => setListingTier("standard")} />
            <span className={styles.defaultFlag}>Default</span>
            <span className={styles.tierTop}><b>Standard</b><strong>$14.95</strong></span>
            <span className={styles.tierDescription}>A professional marketplace listing with your brokerage and designated contact information.</span>
            <span className={styles.tierBenefits}><i>✓</i> Marketplace publication after review<br /><i>✓</i> Buyer inquiries routed to you<br /><i>✓</i> Listing remains active until sold or withdrawn</span>
          </label>
          <label id="broker-tier-featured" style={{ scrollMarginTop: 110 }} onMouseEnter={() => setListingTier("featured")} className={listingTier === "featured" ? styles.tierSelected : styles.tierOption}>
            <input type="radio" name="listing_tier" value="featured" checked={listingTier === "featured"} onChange={() => setListingTier("featured")} />
            <span className={styles.tierTop}><b>Featured</b><strong>$24.95</strong></span>
            <span className={styles.tierDescription}>Everything in Standard, plus stronger launch visibility and listing-specific SEO work by FLLM.</span>
            <span className={styles.tierBenefits}><i>✓</i> Featured badge for 30 days<br /><i>✓</i> Priority placement for 30 days<br /><i>✓</i> Listing-specific SEO work by FLLM<br /><i>✓</i> Reverts to a Standard listing afterward<br /><small>Search placement is not guaranteed.</small></span>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend><b>2</b><span>Broker and brokerage information<small>Enter the contact details buyers should see and use.</small></span></legend>
        <div className={styles.fields}>
          <label><span>Broker name *</span><input name="broker_name" required autoComplete="name" /></label>
          <label><span>Brokerage name *</span><input name="brokerage" required autoComplete="organization" /></label>
          <label><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
          <label><span>Phone *</span><input name="phone" required inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} /></label>
          <label className={styles.fullField}><span>Brokerage website</span><input name="brokerage_website" type="url" inputMode="url" autoComplete="url" placeholder="https://www.yourbrokerage.com" /></label>
        </div>
      </fieldset>
      <fieldset>
        <legend><b>3</b><span>License information<small>Provide the details buyers need to evaluate the opportunity.</small></span></legend>
        <div className={styles.fields}>
          <div className="broker-select-field">
            <span>County *</span>
            <HoverSelect
              id="broker-county-select"
              name="county"
              value={county}
              placeholder="Select county"
              options={countyOptions}
              onChange={setCounty}
            />
          </div>
          <div className="broker-select-field">
            <span>License type *</span>
            <HoverSelect
              id="broker-license-type-select"
              name="license_type"
              value={licenseType}
              placeholder="Select license type"
              options={licenseTypeOptions}
              onChange={setLicenseType}
            />
          </div>
          <label><span>License asking price *</span><input name="asking_price" required inputMode="numeric" value={askingPrice} onChange={(event) => setAskingPrice(formatCurrency(event.target.value))} placeholder="435,000" /></label>
          <label><span>License number</span><input name="license_number" placeholder="Optional / may be kept private" /></label>
          <div className="broker-select-field broker-full-select">
            <span>How is this license being offered? *</span>
            <HoverSelect
              id="broker-offering-structure-select"
              name="offering_structure"
              value={offeringStructure}
              placeholder="Select how the license is offered"
              options={offeringOptions}
              onChange={setOfferingStructure}
            />
          </div>
          {includesBusiness ? (
            <>
              <div className="broker-business-note">
                Add the business-package details so buyers can distinguish the license value from the total transaction price.
              </div>
              <label><span>Business type *</span><input name="business_type" required placeholder="Cocktail lounge, restaurant, liquor store, nightclub…" /></label>
              <label><span>Business name / concept</span><input name="business_name" placeholder="Optional / may be kept confidential" /></label>
              <label className={styles.fullField}><span>Total business + license package asking price *</span><input name="package_asking_price" required inputMode="numeric" value={packagePrice} onChange={(event) => setPackagePrice(formatCurrency(event.target.value))} placeholder="1,100,000" /></label>
            </>
          ) : null}
          <label className={styles.fullField}><span>Listing notes</span><textarea name="notes" rows={4} /></label>
        </div>
      </fieldset>
      <fieldset>
        <legend><b>4</b><span>Buyer inquiry routing<small>Choose how buyer inquiries should reach you.</small></span></legend>
        <div className={styles.inquiryRouting}>
          <span>Inquiry methods</span><small>Select one or more.</small>
          <div className={styles.inquiryOptions}>
            {allInquiryRoutes.map((route) => (<label key={route}><input type="checkbox" name="inquiry_routes" value={route} checked={inquiryRoutes.includes(route)} onChange={(event) => toggleInquiryRoute(route, event.target.checked)} /><span>{route}</span></label>))}
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend><b>5</b><span>Supporting document<small>Optional proof of authority or listing documentation.</small></span></legend>
        <label className={styles.fileField}>
          <input type="file" name="supporting_document" accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={(event) => setDocumentName(event.target.files?.[0]?.name || "")} />
          <span><b>{documentName || "Choose a file"}</b><small>PDF, PNG, JPG or WEBP</small></span>
        </label>
      </fieldset>
      <div className={styles.certifications}>
        <label><input type="checkbox" name="authority_confirmed" required /><span>I am authorized to advertise this license and the submitted information is accurate to the best of my knowledge.</span></label>
        <label><input type="checkbox" name="terms_confirmed" required /><span>I understand FLLM provides marketplace advertising and inquiry routing and does not become my client&apos;s broker through this listing submission.</span></label>
      </div>
      <div className={styles.formFooter}>
        <div><strong>{listingTier === "featured" ? "$24.95 Featured" : "$14.95 Standard"}</strong><small>One-time listing fee</small></div>
        <button type="submit" disabled={submitting}>{submitting ? "Opening checkout…" : "Continue to Secure Checkout"}</button>
      </div>
      {status ? (<p className={isError ? styles.formError : styles.formStatus} role="status">{status}</p>) : null}
    </form>
  );
}
