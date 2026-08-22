"use client";

import { FormEvent, useMemo, useState } from "react";

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

const licenseTypes = [
  { value: "4COP Quota", label: "4COP Quota", detail: "Full-liquor quota license" },
  { value: "3PS Quota / Package Store", label: "3PS Quota / Package Store", detail: "Package-store quota license" },
] as const;

type LicenseType = (typeof licenseTypes)[number]["value"];

export default function LicenseAlertForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);
  const [countyToAdd, setCountyToAdd] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<LicenseType[]>(["4COP Quota"]);
  const [maxPrice, setMaxPrice] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const availableCounties = useMemo(
    () => counties.filter((county) => !selectedCounties.includes(county)),
    [selectedCounties]
  );

  function addCounty() {
    if (!countyToAdd || selectedCounties.includes(countyToAdd)) return;
    setSelectedCounties((current) => [...current, countyToAdd]);
    setCountyToAdd("");
  }

  function toggleAllCounties() {
    setSelectedCounties((current) => current.length === counties.length ? [] : [...counties]);
    setCountyToAdd("");
  }

  function toggleType(type: LicenseType) {
    setSelectedTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim()) {
      setError("Enter your name.");
      return;
    }
    if (!address.trim()) {
      setError("Enter your address.");
      return;
    }
    if (!phone.trim()) {
      setError("Enter your phone number.");
      return;
    }
    if (!selectedCounties.length) {
      setError("Select at least one Florida county.");
      return;
    }
    if (!selectedTypes.length) {
      setError("Select at least one license type.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/license-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          phone,
          email,
          counties: selectedCounties,
          licenseTypes: selectedTypes,
          maxPrice,
          consent,
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "We could not create your License Alert.");
      setSuccess(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We could not create your License Alert.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="license-alert-success" role="status">
        <span className="license-alert-success-mark" aria-hidden="true">✓</span>
        <h2>Your License Alert is active.</h2>
        <p>We’ll email <strong>{email}</strong> when one or more new FLLM listings match your selected Florida counties, license types, and price preference.</p>
        <button type="button" onClick={() => setSuccess(false)}>Create another alert</button>
      </div>
    );
  }

  return (
    <form className="license-alert-form" onSubmit={submit}>
      <div className="license-alert-form-heading">
        <span>FLLM Buyer Alert Intake</span>
        <h2>Get a Florida License Alert</h2>
        <p>Enter your contact information and the Florida licenses you want FLLM to watch for.</p>
      </div>

      <div className="license-alert-field-row">
        <label>
          <span>Name</span>
          <input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Full name" />
        </label>
        <label>
          <span>Email address</span>
          <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" />
        </label>
      </div>

      <label className="license-alert-phone">
        <span>Address</span>
        <input required value={address} onChange={(event) => setAddress(event.target.value)} autoComplete="street-address" placeholder="Street address, city, state, ZIP" />
      </label>

      <label className="license-alert-phone">
        <span>Phone number</span>
        <input type="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" placeholder="(555) 555-5555" />
      </label>

      <fieldset className="license-alert-section">
        <legend>1. Florida county</legend>
        <p>Choose one county, several counties, or all 67 Florida counties.</p>
        <div className="license-alert-county-picker">
          <select value={countyToAdd} onChange={(event) => setCountyToAdd(event.target.value)} aria-label="Choose a Florida county">
            <option value="">Choose a county…</option>
            {availableCounties.map((county) => <option key={county} value={county}>{county}</option>)}
          </select>
          <button type="button" className="license-alert-secondary" onClick={addCounty} disabled={!countyToAdd}>Add County</button>
          <button type="button" className="license-alert-secondary" onClick={toggleAllCounties}>
            {selectedCounties.length === counties.length ? "Clear All" : "All 67 Counties"}
          </button>
        </div>
        {selectedCounties.length > 0 && (
          <div className="license-alert-chips" aria-label="Selected counties">
            {selectedCounties.length === counties.length ? (
              <button type="button" onClick={() => setSelectedCounties([])}>All 67 Florida Counties <span>×</span></button>
            ) : selectedCounties.map((county) => (
              <button type="button" key={county} onClick={() => setSelectedCounties((current) => current.filter((item) => item !== county))}>
                {county} <span>×</span>
              </button>
            ))}
          </div>
        )}
      </fieldset>

      <fieldset className="license-alert-section">
        <legend>2. License type</legend>
        <div className="license-alert-type-grid">
          {licenseTypes.map((type) => {
            const checked = selectedTypes.includes(type.value);
            return (
              <label className={checked ? "selected" : ""} key={type.value}>
                <input type="checkbox" checked={checked} onChange={() => toggleType(type.value)} />
                <span>
                  <strong>{type.label}</strong>
                  <small>{type.detail}</small>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="license-alert-section">
        <legend>3. Maximum asking price <small>Optional</small></legend>
        <p>Leave this blank to receive alerts for every matching FLLM listing regardless of asking price.</p>
        <div className="license-alert-price-wrap">
          <span>$</span>
          <input inputMode="numeric" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value.replace(/[^0-9,]/g, ""))} placeholder="500,000" aria-label="Maximum asking price" />
        </div>
      </fieldset>

      <label className="license-alert-consent">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
        <span>I agree to receive FLLM emails when one or more liquor-license listings matching these preferences appear on the FLLM listings page. I can unsubscribe from this alert at any time.</span>
      </label>

      {error && <div className="license-alert-error" role="alert">{error}</div>}

      <button className="license-alert-submit" type="submit" disabled={submitting}>
        {submitting ? "Creating Alert…" : "Get My License Alert"}
      </button>
      <p className="license-alert-privacy">FLLM uses your contact information and alert preferences to deliver the requested license alerts and related marketplace communications. Your information and alert preferences are not displayed publicly.</p>
    </form>
  );
}
