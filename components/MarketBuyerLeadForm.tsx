"use client";

import { FormEvent, useMemo, useState } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "error";

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

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

const financingOptions = [
  "Any",
  "Cash",
  "SBA",
  "Seller Financing",
  "Other",
] as const;

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
  county,
  businessType,
  licenseType,
  listingUrl,
}: Props) {
  const initialBusinessType = businessTypes.includes(businessType as (typeof businessTypes)[number])
    ? businessType
    : "Other Hospitality";
  const initialLicenseType = licenseTypes.includes(licenseType as (typeof licenseTypes)[number])
    ? licenseType
    : "4COP Quota";

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

      const payload = (await response.json()) as {
        error?: string;
        currentMatches?: number;
      };
      if (!response.ok) throw new Error(payload.error || "Unable to create buyer alert.");

      setSubmittedEmail(email);
      setCurrentMatches(payload.currentMatches ?? 0);
      setStatus("sent");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to create buyer alert.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="business-market-lead-form business-market-alert-success" role="status">
        <span className="business-market-form-eyebrow">Buyer Alert Active</span>
        <h2>Your Business + Liquor License Buyer Alert is active.</h2>
        <p>
          We emailed confirmation to <strong>{submittedEmail}</strong>.
          {currentMatches > 0
            ? ` FLLM found ${currentMatches} current published match${currentMatches === 1 ? "" : "es"} under your saved criteria.`
            : " FLLM will email you when a new published opportunity matches your criteria."}
        </p>
        <button type="button" onClick={() => setStatus("idle")}>Create Another Buyer Alert</button>
      </div>
    );
  }

  return (
    <form className="business-market-lead-form" onSubmit={submit}>
      <span className="business-market-form-eyebrow">FLLM Buyer Lead + Alert</span>
      <h2>Create a Business + Liquor License Buyer Alert</h2>
      <p>
        Tell FLLM what you want to buy. We&apos;ll email you when an observed Market View or an
        authorized Featured Broker Listing matches your business type, liquor-license type,
        county and financial criteria.
      </p>

      <div className="business-market-form-row">
        <label>
          <span>First name</span>
          <input name="first_name" type="text" autoComplete="given-name" required />
        </label>
        <label>
          <span>Last name</span>
          <input name="last_name" type="text" autoComplete="family-name" required />
        </label>
      </div>

      <div className="business-market-form-row">
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
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

      <fieldset className="business-market-alert-section">
        <legend>Business type</legend>
        <div className="business-market-alert-options">
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
      </fieldset>

      <fieldset className="business-market-alert-section">
        <legend>Liquor-license type</legend>
        <div className="business-market-alert-options">
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
      </fieldset>

      <fieldset className="business-market-alert-section">
        <legend>Florida county</legend>
        <p>Choose one county, several counties, or all 67 Florida counties.</p>
        <div className="business-market-alert-county-picker">
          <select
            value={countyToAdd}
            onChange={(event) => setCountyToAdd(event.target.value)}
            aria-label="Choose another Florida county"
          >
            <option value="">Choose another county…</option>
            {availableCounties.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <button type="button" className="business-market-alert-secondary" onClick={addCounty} disabled={!countyToAdd}>
            Add County
          </button>
          <button type="button" className="business-market-alert-secondary" onClick={toggleAllCounties}>
            {selectedCounties.length === counties.length ? "Use Current County" : "All 67 Counties"}
          </button>
        </div>
        <div className="business-market-alert-chips" aria-label="Selected counties">
          {selectedCounties.length === counties.length ? (
            <button type="button" onClick={() => setSelectedCounties([county])}>
              All 67 Florida Counties <span>×</span>
            </button>
          ) : selectedCounties.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setSelectedCounties((current) => current.filter((value) => value !== item))}
            >
              {item} <span>×</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="business-market-alert-section">
        <legend>Financial criteria <small>Optional</small></legend>
        <p>
          Leave a field blank if it is not required. If you set a minimum Gross Sales, SDE or EBITDA,
          FLLM will only match opportunities where that metric is disclosed and meets your minimum.
        </p>
        <div className="business-market-alert-money-grid">
          <label>
            <span>Maximum purchase price</span>
            <div className="business-market-alert-money"><b>$</b><input inputMode="numeric" value={maxPurchasePrice} onChange={(event) => setMaxPurchasePrice(cleanMoney(event.target.value))} placeholder="1,000,000" /></div>
          </label>
          <label>
            <span>Minimum gross sales</span>
            <div className="business-market-alert-money"><b>$</b><input inputMode="numeric" value={minGrossRevenue} onChange={(event) => setMinGrossRevenue(cleanMoney(event.target.value))} placeholder="1,000,000" /></div>
          </label>
          <label>
            <span>Minimum SDE / Cash Flow</span>
            <div className="business-market-alert-money"><b>$</b><input inputMode="numeric" value={minSde} onChange={(event) => setMinSde(cleanMoney(event.target.value))} placeholder="250,000" /></div>
          </label>
          <label>
            <span>Minimum EBITDA</span>
            <div className="business-market-alert-money"><b>$</b><input inputMode="numeric" value={minEbitda} onChange={(event) => setMinEbitda(cleanMoney(event.target.value))} placeholder="250,000" /></div>
          </label>
        </div>
      </fieldset>

      <fieldset className="business-market-alert-section">
        <legend>Financing preference <small>Optional</small></legend>
        <div className="business-market-alert-options business-market-alert-options--financing">
          {financingOptions.map((item) => (
            <label className={selectedFinancing.includes(item) ? "selected" : ""} key={item}>
              <input
                type="checkbox"
                checked={selectedFinancing.includes(item)}
                onChange={() => toggleFinancing(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <small className="business-market-alert-field-note">
          Financing preference is saved with your buyer profile. Availability must be confirmed for each opportunity.
        </small>
      </fieldset>

      <label>
        <span>Anything else FLLM should know? <small>Optional</small></span>
        <textarea
          name="buyer_notes"
          rows={4}
          placeholder="Target city, concept, seating, real estate preference, acquisition timing, or other criteria."
        />
      </label>

      <label className="business-market-alert-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
        />
        <span>
          I agree to receive FLLM emails when current or future business + liquor-license opportunities
          match these criteria. I can unsubscribe from this alert at any time.
        </span>
      </label>

      {error ? <p className="business-market-form-status error" role="alert">{error}</p> : null}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Creating Buyer Alert…" : "Create My Buyer Alert"}
      </button>

      <small className="business-market-alert-disclosure">
        FLLM does not represent the observed business shown on this Market View. Your information creates
        an FLLM buyer profile used to send matching market alerts and related FLLM communications. Phone
        is required for buyer qualification and follow-up; submitting this form does not enroll you in
        automated SMS alerts.
      </small>
    </form>
  );
}
