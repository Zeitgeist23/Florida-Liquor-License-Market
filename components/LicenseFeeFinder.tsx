"use client";

import { FormEvent, useState } from "react";

type LookupResult = {
  licenseNumber: string;
  ownerName: string;
  dba: string;
  series: string;
  modifier: string;
  county: string;
  city: string;
  primaryStatus: string;
  secondaryStatus: string;
  expirationDate: string;
  populationBand: string | null;
  annualFee: number | null;
  halfYearFee: number | null;
  feeNote: string;
};

const dbprPaymentUrl = "https://www.myfloridalicense.com/datamart/mainMenuFLDBPR.do";

function money(value: number | null) {
  if (value === null) return "DBPR confirmation required";
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: value % 1 ? 2 : 0,
  }).format(value);
}

export default function LicenseFeeFinder() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [reminderStatus, setReminderStatus] = useState("");
  const [reminderLoading, setReminderLoading] = useState(false);

  async function lookup(event: FormEvent) {
    event.preventDefault();
    setError("");
    setResult(null);
    setShowReminder(false);
    setReminderStatus("");
    setLoading(true);
    try {
      const response = await fetch(`/api/license-fees/lookup?licenseNumber=${encodeURIComponent(licenseNumber)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "License lookup failed.");
      setResult(payload.result);
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "License lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  async function scheduleReminder(event: FormEvent) {
    event.preventDefault();
    if (!result) return;
    setReminderStatus("");
    setReminderLoading(true);
    try {
      const response = await fetch("/api/license-fees/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseNumber: result.licenseNumber, email, consent }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "The reminder could not be scheduled.");
      setReminderStatus(payload.message);
    } catch (reminderError) {
      setReminderStatus(reminderError instanceof Error ? reminderError.message : "The reminder could not be scheduled.");
    } finally {
      setReminderLoading(false);
    }
  }

  return (
    <section className="fee-finder page-shell" aria-labelledby="fee-finder-heading">
      <div className="fee-finder-copy">
        <span>License-specific fee finder</span>
        <h2 id="fee-finder-heading">Look up your license and estimated renewal fee</h2>
        <p>
          Enter the DBPR license number. FLLM will match the current public DBPR record to the
          published ABT fee chart, then direct you to DBPR’s secure portal for the final balance
          and payment.
        </p>
      </div>
      <form className="fee-finder-form" onSubmit={lookup}>
        <label htmlFor="dbpr-license-number">Florida DBPR license number</label>
        <div>
          <input
            id="dbpr-license-number"
            value={licenseNumber}
            onChange={(event) => setLicenseNumber(event.target.value.toUpperCase())}
            placeholder="Example: BEV6500-184"
            autoComplete="off"
            required
          />
          <button className="btn btn-gold" disabled={loading} type="submit">
            {loading ? "Checking DBPR…" : "Find My License Fee"}
          </button>
        </div>
        <small>Lookup uses DBPR’s public retail alcoholic-beverage license extract.</small>
      </form>

      {error && <div className="fee-finder-message is-error" role="alert">{error}</div>}

      {result && (
        <article className="fee-lookup-result" aria-live="polite">
          <div className="fee-result-heading">
            <div>
              <span>DBPR public record match</span>
              <h3>{result.dba !== "Not listed" ? result.dba : result.ownerName}</h3>
              <p>{result.licenseNumber} · {result.series}{result.modifier ? ` ${result.modifier}` : ""} · {result.county} County</p>
            </div>
            <b>{result.primaryStatus} · {result.secondaryStatus}</b>
          </div>
          <div className="fee-result-grid">
            <div><span>Published annual fee</span><strong>{money(result.annualFee)}</strong></div>
            <div><span>Published half-year fee</span><strong>{money(result.halfYearFee)}</strong></div>
            <div><span>DBPR expiration date</span><strong>{result.expirationDate || "Not published"}</strong></div>
            <div><span>County fee band</span><strong>{result.populationBand || "Statewide/special fee"}</strong></div>
          </div>
          <p className="fee-result-note">{result.feeNote} DBPR determines the final amount due, including account-specific charges, credits or penalties.</p>
          <div className="fee-result-actions">
            <a className="btn btn-gold" href={dbprPaymentUrl} target="_blank" rel="noreferrer">
              Continue to Official DBPR Renewal &amp; Payment ↗
            </a>
            <button className="btn fee-reminder-button" type="button" onClick={() => setShowReminder((value) => !value)}>
              Remind Me 30 Days Before Next Year’s Expiration
            </button>
          </div>

          {showReminder && (
            <form className="fee-reminder-form" onSubmit={scheduleReminder}>
              <div>
                <span>Free FLLM renewal reminder</span>
                <h4>Would you like FLLM to remind you by email?</h4>
                <p>We will send one reminder 30 days before this license’s expiration date next year.</p>
              </div>
              <label>
                <span>Email address</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
              </label>
              <label className="fee-reminder-consent">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
                <span>I authorize FLLM to email me the requested license-renewal reminder. I understand DBPR—not FLLM—determines the amount owed and processes payment.</span>
              </label>
              <button className="btn btn-gold" disabled={reminderLoading} type="submit">
                {reminderLoading ? "Scheduling…" : "Yes — Schedule My Reminder"}
              </button>
              {reminderStatus && <div className="fee-finder-message" role="status">{reminderStatus}</div>}
            </form>
          )}
        </article>
      )}
    </section>
  );
}
