"use client";

import { useState } from "react";

import { floridaCounties } from "@/data/florida-counties";

function formatUsPhone(value: string) {
  const raw = value.replace(/\D/g, "");
  const digits = (raw.length === 11 && raw.startsWith("1") ? raw.slice(1) : raw).slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function FormalLicenseAppraisalOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/formal-license-appraisal-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          phone: String(formData.get("phone") || ""),
          county: String(formData.get("county") || ""),
          license_type: String(formData.get("license_type") || ""),
          license_number: String(formData.get("license_number") || ""),
          current_holder_of_record: String(formData.get("current_holder_of_record") || ""),
          ordering_party: String(formData.get("ordering_party") || ""),
          intended_use: String(formData.get("intended_use") || ""),
          institution_name: String(formData.get("institution_name") || ""),
          effective_date: String(formData.get("effective_date") || ""),
          notes: String(formData.get("notes") || ""),
          terms_accepted: formData.get("terms_accepted") === "Accepted",
          lender_disclosure_accepted: formData.get("lender_disclosure_accepted") === "Accepted",
        }),
      });

      const result = (await response.json()) as { checkoutUrl?: string | null; error?: string };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Unable to open secure formal-appraisal checkout.");
      }
      window.location.href = result.checkoutUrl;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unable to open secure checkout.";
      setError(
        /fetch failed|failed to fetch|networkerror/i.test(message)
          ? "Secure checkout could not be reached. Please try again in a moment."
          : message,
      );
      setLoading(false);
    }
  }

  return (
    <section id="order-form" className="formal-appraisal-order" aria-labelledby="formal-appraisal-order-title">
      <div className="seo-market-shell formal-appraisal-order-grid">
        <div className="formal-appraisal-offer">
          <span className="seo-market-section-kicker">Separate Premium Report</span>
          <h2 id="formal-appraisal-order-title">Order an FLLM Formal Quota License Appraisal</h2>
          <p>
            A lender-oriented valuation assignment for one identified Florida 3PS or 4COP quota license, prepared for a defined intended use and effective date.
          </p>
          <div className="formal-appraisal-price">
            <span>One-time appraisal fee</span>
            <strong>$995</strong>
          </div>
          <h3>Included in the assignment</h3>
          <ul>
            <li>Subject-license and DBPR record verification</li>
            <li>Separate same-county 3PS and 4COP offering analyses</li>
            <li>Available verified recent-sale and transfer evidence</li>
            <li>Quota-series conversion and regulatory analysis</li>
            <li>ABT-6014 regulatory exhibit when applicable</li>
            <li>Signed value reconciliation, assumptions and limitations</li>
          </ul>
          <p className="formal-appraisal-bank-note">
            Designed for bank, lender, attorney, fiduciary and professional review. The receiving institution determines whether it will accept the report and whether it requires a particular appraisal credential or additional scope.
          </p>
        </div>

        <form className="formal-appraisal-form" onSubmit={submit}>
          <div className="formal-appraisal-form-heading">
            <span>Secure appraisal order</span>
            <h3>Subject license and assignment</h3>
            <p>FLLM verifies the DBPR county and license series before opening checkout.</p>
          </div>

          <label>
            <span>Florida County</span>
            <select name="county" defaultValue="" required>
              <option value="" disabled>Select county</option>
              {floridaCounties.map((county) => <option key={county.slug}>{county.name}</option>)}
            </select>
          </label>
          <label>
            <span>Subject License Series</span>
            <select name="license_type" defaultValue="" required>
              <option value="" disabled>Select series</option>
              <option>4COP Quota</option>
              <option>3PS Quota / Package Store</option>
            </select>
          </label>
          <label>
            <span>License Number</span>
            <input name="license_number" placeholder="e.g. BEV6500-184" maxLength={80} required />
          </label>
          <label>
            <span>Current Holder of Record <small>If known</small></span>
            <input name="current_holder_of_record" placeholder="Name shown in DBPR records" maxLength={180} />
          </label>
          <label>
            <span>Ordering Party</span>
            <select name="ordering_party" defaultValue="" required>
              <option value="" disabled>Select ordering party</option>
              <option>License Owner</option>
              <option>Buyer / Prospective Buyer</option>
              <option>Bank / Commercial Lender</option>
              <option>Attorney / CPA / Advisor</option>
              <option>Estate / Fiduciary</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            <span>Intended Use</span>
            <select name="intended_use" defaultValue="" required>
              <option value="" disabled>Select intended use</option>
              <option>Loan Underwriting</option>
              <option>Refinance / Collateral Review</option>
              <option>Purchase or Sale Decision</option>
              <option>Estate or Legal Matter</option>
              <option>Financial Reporting</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            <span>Bank or Institution <small>If applicable</small></span>
            <input name="institution_name" placeholder="Intended lender or report user" maxLength={180} />
          </label>
          <label>
            <span>Effective Valuation Date <small>Optional</small></span>
            <input name="effective_date" type="date" />
          </label>
          <label>
            <span>Full Name</span>
            <input name="name" autoComplete="name" maxLength={160} required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" maxLength={254} required />
          </label>
          <label className="formal-appraisal-phone">
            <span>Phone</span>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={14}
              onInput={(event) => { event.currentTarget.value = formatUsPhone(event.currentTarget.value); }}
              required
            />
          </label>
          <label className="formal-appraisal-notes">
            <span>Assignment Instructions <small>Optional</small></span>
            <textarea name="notes" rows={4} maxLength={5000} placeholder="Lender contact, deadline, transaction background, litigation date, or other assignment requirements." />
          </label>
          <label className="formal-appraisal-consent">
            <input name="terms_accepted" type="checkbox" value="Accepted" required />
            <span>I authorize FLLM to research the identified license and prepare the appraisal for the stated intended use.</span>
          </label>
          <label className="formal-appraisal-consent">
            <input name="lender_disclosure_accepted" type="checkbox" value="Accepted" required />
            <span>I understand that each lender or institution determines report acceptance and may require a particular credential, format, reliance language or additional scope.</span>
          </label>

          {error ? <p className="formal-appraisal-error" role="alert">{error}</p> : null}

          <button className="formal-appraisal-submit" type="submit" disabled={loading}>
            {loading ? "Opening Secure Checkout…" : "Continue to Secure Checkout — $995"}
          </button>
        </form>
      </div>
    </section>
  );
}
