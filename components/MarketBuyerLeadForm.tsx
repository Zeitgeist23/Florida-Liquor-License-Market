"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "error";

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

const businessTypes = [
  "Restaurant",
  "Restaurant / Bar",
  "Bar",
  "Cocktail Lounge",
  "Nightclub",
  "Gentlemen's Club",
  "Liquor Store",
  "Convenience Store",
  "Marina",
  "Hotel / Motel",
  "Country Club",
  "Bowling Alley",
  "Other Hospitality",
] as const;

const licenseTypes = [
  "4COP Quota",
  "3PS Quota / Package Store",
  "4COP SFS/SRX",
  "2COP Beer & Wine",
] as const;

const financingOptions = ["Any", "Cash", "SBA", "Seller Financing", "Other"] as const;

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)})${digits.slice(3)}`;
  return `(${digits.slice(0, 3)})${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function cleanMoney(value: string) {
  return value.replace(/[^0-9,]/g, "");
}

type Props = {
  listingReference: string;
  listingTitle: string;
  county: string;
  businessType: string;
  licenseType: string;
  askingPrice: string;
  listingUrl: string;
};

export default function MarketBuyerLeadForm({
  listingReference,
  listingTitle,
  county,
  businessType,
  licenseType,
  askingPrice,
  listingUrl,
}: Props) {
  const initialBusinessType = businessTypes.includes(businessType as (typeof businessTypes)[number])
    ? businessType
    : "Other Hospitality";
  const initialLicenseType = licenseTypes.includes(licenseType as (typeof licenseTypes)[number])
    ? licenseType
    : "4COP Quota";

  const [open, setOpen] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<SubmitState>("idle");
  const [inquiryError, setInquiryError] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [currentMatches, setCurrentMatches] = useState(0);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>([initialBusinessType]);
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState<string[]>([initialLicenseType]);
  const [selectedCounties, setSelectedCounties] = useState<string[]>([county]);
  const [countyToAdd, setCountyToAdd] = useState("");
  const [selectedFinancing, setSelectedFinancing] = useState<string[]>(["Any"]);
  const [maxPurchasePrice, setMaxPurchasePrice] = useState("");
  const [minGrossRevenue, setMinGrossRevenue] = useState("");
  const [minSde, setMinSde] = useState("");
  const [minEbitda, setMinEbitda] = useState("");
  const [consent, setConsent] = useState(false);

  const availableCounties = useMemo(
    () => counties.filter((item) => !selectedCounties.includes(item)),
    [selectedCounties],
  );

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function toggleValue(value: string, values: string[], setValues: (next: string[]) => void) {
    setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  function toggleFinancing(value: string) {
    if (value === "Any") {
      setSelectedFinancing(["Any"]);
      return;
    }
    setSelectedFinancing((current) => {
      const withoutAny = current.filter((item) => item !== "Any");
      const next = withoutAny.includes(value)
        ? withoutAny.filter((item) => item !== value)
        : [...withoutAny, value];
      return next.length ? next : ["Any"];
    });
  }

  function addCounty() {
    if (!countyToAdd || selectedCounties.includes(countyToAdd)) return;
    setSelectedCounties((current) => [...current, countyToAdd]);
    setCountyToAdd("");
  }

  function toggleAllCounties() {
    setSelectedCounties((current) => current.length === counties.length ? [county] : [...counties]);
    setCountyToAdd("");
  }

  async function submitSpecificInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInquiryStatus("submitting");
    setInquiryError("");
    try {
      const form = new FormData(event.currentTarget);
      form.set("inquiry_type", "Business Market Opportunity Inquiry");
      form.set("listing_reference", listingReference);
      form.set("listing_requested", listingTitle);
      form.set("listing_county", county);
      form.set("preferred_county", county);
      form.set("license_type", licenseType);
      form.set("asking_price", askingPrice);
      form.set("listing_url", listingUrl);
      form.set("listing_status", "Independent FLLM Market View — no broker representation");
      const response = await fetch("/api/inquiry", { method: "POST", body: form });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to submit inquiry.");
      }
      setInquiryStatus("sent");
    } catch (error) {
      setInquiryError(error instanceof Error ? error.message : "Unable to submit inquiry.");
      setInquiryStatus("error");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();

    if (!selectedBusinessTypes.length) {
      setError("Select at least one business type.");
      setStatus("error");
      return;
    }
    if (!selectedLicenseTypes.length) {
      setError("Select at least one liquor-license type.");
      setStatus("error");
      return;
    }
    if (!selectedCounties.length) {
      setError("Select at least one Florida county.");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/business-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(formData.get("first_name") || "").trim(),
          lastName: String(formData.get("last_name") || "").trim(),
          email,
          phone,
          businessTypes: selectedBusinessTypes,
          licenseTypes: selectedLicenseTypes,
          counties: selectedCounties,
          maxPurchasePrice,
          minGrossRevenue,
          minSde,
          minEbitda,
          financingPreferences: selectedFinancing,
          notes: String(formData.get("buyer_notes") || "").trim(),
          consent,
          sourceMarketViewRef: listingReference,
          sourceMarketViewUrl: listingUrl,
        }),
      });

      const payload = (await response.json()) as { error?: string; currentMatches?: number };
      if (!response.ok) throw new Error(payload.error || "Unable to create buyer alert.");

      setSubmittedEmail(email);
      setCurrentMatches(payload.currentMatches ?? 0);
      setStatus("sent");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to create buyer alert.");
      setStatus("error");
    }
  }

  return (
    <>
      <section id="specific-market-inquiry" className="business-market-specific-inquiry" aria-labelledby="business-market-inquiry-title">
        <span className="business-market-form-eyebrow">Specific Business + License Inquiry</span>
        <h2 id="business-market-inquiry-title">Interested in This Business + Liquor License?</h2>
        <p>Ask FLLM about this observed {businessType.toLowerCase()} and {licenseType} opportunity in {county}. Your inquiry will be linked to this Market View.</p>
        <div className="business-market-specific-inquiry-context">
          <span>{county}</span><span>{licenseType}</span><span>{askingPrice}</span>
        </div>
        {inquiryStatus === "sent" ? (
          <div role="status" className="business-market-specific-inquiry-result">Thank you. FLLM received your inquiry and will follow up regarding available market information and next steps.</div>
        ) : (
          <form onSubmit={submitSpecificInquiry} className="business-market-specific-inquiry-form">
            <label htmlFor="market-contact-name">Your name</label>
            <input id="market-contact-name" name="name" required maxLength={160} autoComplete="name" placeholder="Full name" />
            <label htmlFor="market-contact-email">Email address</label>
            <input id="market-contact-email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" />
            <label htmlFor="market-contact-phone">Phone (optional)</label>
            <input id="market-contact-phone" name="phone" type="tel" maxLength={60} autoComplete="tel" placeholder="(555) 555-5555" />
            <label htmlFor="market-contact-message">What would you like to know?</label>
            <textarea id="market-contact-message" name="message" required maxLength={5000} rows={3} defaultValue={`I'm interested in the ${businessType} with a ${licenseType} license in ${county}. Please contact me about this Market View and any available next steps.`} />
            <button type="submit" disabled={inquiryStatus === "submitting"}>{inquiryStatus === "submitting" ? "Sending inquiry…" : "Request Info About This Opportunity →"}</button>
            {inquiryStatus === "error" && <p className="business-market-specific-inquiry-error" role="alert">{inquiryError}</p>}
          </form>
        )}
        <small>FLLM provides independent market information and buyer matching. This is not an authorized seller or broker listing; FLLM cannot guarantee that the business is available or arrange contact with its seller.</small>
      </section>
      <section className="business-market-alert-card" aria-labelledby="buyer-alert-title">
        <span className="business-market-form-eyebrow">FLLM Buyer Alerts</span>
        <h2 id="buyer-alert-title">Get New Opportunities Like This</h2>
        <p>
          Save your acquisition criteria and receive email alerts for matching FLLM Market Views
          and authorized Featured Broker Listings.
        </p>
        <div className="business-market-alert-summary">
          <div><span>Business</span><strong>{businessType}</strong></div>
          <div><span>License</span><strong>{licenseType}</strong></div>
          <div><span>County</span><strong>{county}</strong></div>
        </div>
        <button type="button" onClick={() => { setStatus("idle"); setError(""); setOpen(true); }}>
          Create Buyer Alert
        </button>
        <small>
          Customize business type, license type, counties, purchase price, gross sales,
          SDE / cash flow, EBITDA and financing preference.
        </small>
      </section>

      {open ? (
        <div className="business-market-alert-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setOpen(false);
        }}>
          <div className="business-market-alert-modal" role="dialog" aria-modal="true" aria-labelledby="buyer-alert-modal-title">
            <button className="business-market-alert-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close buyer alert form">×</button>

            {status === "sent" ? (
              <div className="business-market-alert-modal-success" role="status">
                <span className="business-market-form-eyebrow">Buyer Alert Active</span>
                <h2 id="buyer-alert-modal-title">Your Business + Liquor License Buyer Alert is active.</h2>
                <p>
                  Confirmation was emailed to <strong>{submittedEmail}</strong>.
                  {currentMatches > 0
                    ? ` FLLM found ${currentMatches} current published match${currentMatches === 1 ? "" : "es"} under your saved criteria.`
                    : " FLLM will email you when a new published opportunity matches your criteria."}
                </p>
                <div className="business-market-alert-modal-success-actions">
                  <button type="button" onClick={() => setOpen(false)}>Close</button>
                  <button type="button" className="secondary" onClick={() => setStatus("idle")}>Create Another Alert</button>
                </div>
              </div>
            ) : (
              <form className="business-market-lead-form business-market-alert-modal-form" onSubmit={submit}>
                <header className="business-market-alert-modal-header">
                  <div>
                    <span className="business-market-form-eyebrow">FLLM Buyer Lead + Alert</span>
                    <h2 id="buyer-alert-modal-title">Create a Business + Liquor License Buyer Alert</h2>
                    <p>
                      Tell FLLM what you want to buy. We&apos;ll email you when a matching observed
                      Market View or authorized Featured Broker Listing is published.
                    </p>
                  </div>
                  <div className="business-market-alert-modal-context">
                    <span>Starting from this Market View</span>
                    <strong>{businessType} · {licenseType}</strong>
                    <small>{county}</small>
                  </div>
                </header>

                <div className="business-market-alert-modal-grid">
                  <section className="business-market-alert-modal-column">
                    <div className="business-market-alert-block">
                      <h3>Buyer Contact</h3>
                      <div className="business-market-form-row">
                        <label><span>First name</span><input name="first_name" type="text" autoComplete="given-name" required /></label>
                        <label><span>Last name</span><input name="last_name" type="text" autoComplete="family-name" required /></label>
                      </div>
                      <div className="business-market-form-row">
                        <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
                        <label>
                          <span>Phone</span>
                          <input
                            name="phone"
                            type="tel"
                            autoComplete="tel-national"
                            inputMode="tel"
                            maxLength={13}
                            value={phone}
                            onChange={(event) => setPhone(formatPhoneNumber(event.target.value))}
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <div className="business-market-alert-block">
                      <h3>Business Type</h3>
                      <div className="business-market-alert-options business-market-alert-options--modal">
                        {businessTypes.map((item) => (
                          <label className={selectedBusinessTypes.includes(item) ? "selected" : ""} key={item}>
                            <input
                              type="checkbox"
                              checked={selectedBusinessTypes.includes(item)}
                              onChange={() => toggleValue(item, selectedBusinessTypes, setSelectedBusinessTypes)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="business-market-alert-block">
                      <h3>Liquor-License Type</h3>
                      <div className="business-market-alert-options business-market-alert-options--licenses">
                        {licenseTypes.map((item) => (
                          <label className={selectedLicenseTypes.includes(item) ? "selected" : ""} key={item}>
                            <input
                              type="checkbox"
                              checked={selectedLicenseTypes.includes(item)}
                              onChange={() => toggleValue(item, selectedLicenseTypes, setSelectedLicenseTypes)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="business-market-alert-modal-column">
                    <div className="business-market-alert-block">
                      <h3>Florida County</h3>
                      <div className="business-market-alert-county-picker">
                        <select value={countyToAdd} onChange={(event) => setCountyToAdd(event.target.value)} aria-label="Choose another Florida county">
                          <option value="">Choose another county…</option>
                          {availableCounties.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                        <button type="button" className="business-market-alert-secondary" onClick={addCounty} disabled={!countyToAdd}>Add</button>
                        <button type="button" className="business-market-alert-secondary" onClick={toggleAllCounties}>
                          {selectedCounties.length === counties.length ? "Current County" : "All 67"}
                        </button>
                      </div>
                      <div className="business-market-alert-chips">
                        {selectedCounties.length === counties.length ? (
                          <button type="button" onClick={() => setSelectedCounties([county])}>All 67 Florida Counties <span>×</span></button>
                        ) : selectedCounties.map((item) => (
                          <button type="button" key={item} onClick={() => setSelectedCounties((current) => current.filter((value) => value !== item))}>
                            {item} <span>×</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="business-market-alert-block">
                      <h3>Financial Criteria <small>Optional</small></h3>
                      <p>
                        If a minimum Gross Sales, SDE or EBITDA is entered, FLLM only matches opportunities where that metric is disclosed and meets the minimum.
                      </p>
                      <div className="business-market-alert-money-grid">
                        <label><span>Maximum purchase price</span><div className="business-market-alert-money"><b>$</b><input inputMode="numeric" value={maxPurchasePrice} onChange={(event) => setMaxPurchasePrice(cleanMoney(event.target.value))} placeholder="1,000,000" /></div></label>
                        <label><span>Minimum gross sales</span><div className="business-market-alert-money"><b>$</b><input inputMode="numeric" value={minGrossRevenue} onChange={(event) => setMinGrossRevenue(cleanMoney(event.target.value))} placeholder="1,000,000" /></div></label>
                        <label><span>Minimum SDE / Cash Flow</span><div className="business-market-alert-money"><b>$</b><input inputMode="numeric" value={minSde} onChange={(event) => setMinSde(cleanMoney(event.target.value))} placeholder="250,000" /></div></label>
                        <label><span>Minimum EBITDA</span><div className="business-market-alert-money"><b>$</b><input inputMode="numeric" value={minEbitda} onChange={(event) => setMinEbitda(cleanMoney(event.target.value))} placeholder="250,000" /></div></label>
                      </div>
                    </div>

                    <div className="business-market-alert-block">
                      <h3>Financing Preference <small>Optional</small></h3>
                      <div className="business-market-alert-options business-market-alert-options--financing">
                        {financingOptions.map((item) => (
                          <label className={selectedFinancing.includes(item) ? "selected" : ""} key={item}>
                            <input type="checkbox" checked={selectedFinancing.includes(item)} onChange={() => toggleFinancing(item)} />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="business-market-alert-block business-market-alert-block--notes">
                      <h3>Additional Criteria <small>Optional</small></h3>
                      <textarea
                        name="buyer_notes"
                        rows={3}
                        placeholder="Target city, concept, seating, real estate preference, acquisition timing, or other criteria."
                      />
                    </div>
                  </section>
                </div>

                <footer className="business-market-alert-modal-footer">
                  <label className="business-market-alert-consent">
                    <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
                    <span>
                      I agree to receive FLLM emails when current or future business + liquor-license opportunities
                      match these criteria. I can unsubscribe at any time.
                    </span>
                  </label>

                  {error ? <p className="business-market-form-status error" role="alert">{error}</p> : null}

                  <div className="business-market-alert-modal-submit-row">
                    <p>
                      FLLM does not represent the observed business shown on this Market View. Phone is required for buyer qualification and follow-up; this form does not enroll you in automated SMS alerts.
                    </p>
                    <button type="submit" disabled={status === "submitting"}>
                      {status === "submitting" ? "Creating Buyer Alert…" : "Create My Buyer Alert"}
                    </button>
                  </div>
                </footer>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
