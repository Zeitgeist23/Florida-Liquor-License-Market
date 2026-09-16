"use client";

import { FormEvent, useState } from "react";

export default function InvestmentLenderForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("_honey") || "").trim()) return;

    setStatus("sending");
    setMessage("Submitting confidential lender interest…");

    data.set("form_type", "investment");
    data.set("_subject", "Florida Liquor License Market — Private Lender Interest");
    data.set("_template", "table");
    data.set("_captcha", "false");

    try {
      const response = await fetch("https://formsubmit.co/ajax/listings@floridaliquorlicensemarket.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Unable to submit lender interest.");
      form.reset();
      setStatus("sent");
      setMessage("Thank you. Your confidential lender-interest request has been submitted.");
    } catch {
      setStatus("error");
      setMessage("The request could not be submitted. Please contact FLLM directly.");
    }
  }

  return (
    <form className="investment-native-form" onSubmit={submit}>
      <div className="investment-native-form-heading">
        <h2>Join the Private Lender Network</h2>
        <p>Tell us what types of opportunities you would like to review. Fields marked * are required.</p>
      </div>

      <label className="investment-native-honeypot" aria-hidden="true">
        Leave blank<input type="text" tabIndex={-1} autoComplete="off" name="_honey" />
      </label>

      <div className="investment-native-fields">
        <label><span>Name *</span><input type="text" autoComplete="name" required name="name" /></label>
        <label><span>Email *</span><input type="email" autoComplete="email" required name="email" /></label>
        <label><span>Phone *</span><input type="tel" autoComplete="tel" required name="phone" /></label>
        <label><span>Investor Type *</span><select name="investor_type" required defaultValue=""><option value="" disabled>Select type</option><option>Individual investor</option><option>Self-directed IRA</option><option>Entity / investment company</option><option>Family office</option><option>Other</option></select></label>
        <label><span>Available Capital *</span><select name="available_capital" required defaultValue=""><option value="" disabled>Select range</option><option>Under $100,000</option><option>$100,000–$249,999</option><option>$250,000–$499,999</option><option>$500,000–$999,999</option><option>$1,000,000+</option></select></label>
        <label><span>Source of Funds *</span><select name="source_of_funds" required defaultValue=""><option value="" disabled>Select source</option><option>Checking / savings</option><option>Money-market account</option><option>Self-directed IRA</option><option>Business or entity funds</option><option>Other eligible funds</option></select></label>
        <label><span>Preferred Loan Size</span><select name="preferred_loan_size" defaultValue=""><option value="">Select range</option><option>Under $100,000</option><option>$100,000–$249,999</option><option>$250,000–$499,999</option><option>$500,000+</option></select></label>
        <label><span>Investment Timeline *</span><select name="timeline" required defaultValue=""><option value="" disabled>Select timeline</option><option>Ready now</option><option>Within 30 days</option><option>Within 60–90 days</option><option>Researching opportunities</option></select></label>
        <label><span>Private Lending Experience</span><select name="lending_experience" defaultValue=""><option value="">Select experience</option><option>First private loan</option><option>1–3 prior loans</option><option>Experienced private lender</option><option>Professional investor</option></select></label>
        <label><span>Self-Directed IRA Custodian</span><input type="text" placeholder="If applicable" name="ira_custodian" /></label>
        <label className="investment-native-notes"><span>Investment Preferences or Questions</span><textarea name="message" rows={5} placeholder="Tell us about preferred counties, loan sizes, terms, or other criteria." /></label>
      </div>

      <label className="investment-native-agreement"><input type="checkbox" required name="risk_acknowledgment" value="Acknowledged" /><span>I understand that this form is an expression of interest, not an offer or investment commitment; private lending involves risk, returns are not guaranteed, and I should obtain independent legal, tax, and investment advice.</span></label>

      <p className="investment-native-disclosure">No funds are accepted through this website. Submission does not create a lender relationship, reserve an opportunity, or constitute an offer to sell a security. Any transaction is subject to separate diligence, eligibility review, legal documentation, and acceptance by all parties. Review the <a href="/private-lending-disclosure">Private-Lending Risk Disclosure</a>.</p>

      <button className="investment-native-submit" type="submit" disabled={status === "sending"}>Submit Confidential Lender Interest</button>
      <p className={`investment-native-status ${status}`} role="status" aria-live="polite">{message}</p>
    </form>
  );
}
