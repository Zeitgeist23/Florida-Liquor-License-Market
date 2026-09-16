"use client";

import { FormEvent, useState } from "react";

const counties = `Alachua County,Baker County,Bay County,Bradford County,Brevard County,Broward County,Calhoun County,Charlotte County,Citrus County,Clay County,Collier County,Columbia County,DeSoto County,Dixie County,Duval County,Escambia County,Flagler County,Franklin County,Gadsden County,Gilchrist County,Glades County,Gulf County,Hamilton County,Hardee County,Hendry County,Hernando County,Highlands County,Hillsborough County,Holmes County,Indian River County,Jackson County,Jefferson County,Lafayette County,Lake County,Lee County,Leon County,Levy County,Liberty County,Madison County,Manatee County,Marion County,Martin County,Miami-Dade County,Monroe County,Nassau County,Okaloosa County,Okeechobee County,Orange County,Osceola County,Palm Beach County,Pasco County,Pinellas County,Polk County,Putnam County,Santa Rosa County,Sarasota County,Seminole County,St. Johns County,St. Lucie County,Sumter County,Suwannee County,Taylor County,Union County,Volusia County,Wakulla County,Walton County,Washington County`.split(",");

type Status = "idle" | "submitting" | "sent" | "error";

export default function FinancingRequestForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) {
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("submitting");
    try {
      data.set("_subject", "Florida Liquor License Market — Financing Request");
      data.set("_template", "table");
      data.set("_captcha", "false");
      const response = await fetch("https://formsubmit.co/ajax/listings@floridaliquorlicensemarket.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Unable to submit financing request");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="financing-native-form" id="request-financing" onSubmit={submit}>
      <div className="financing-native-form-heading">
        <h2>Request Financing Options</h2>
        <p>Tell us about the proposed purchase or refinance. Fields marked * are required.</p>
      </div>
      <input type="hidden" name="form_type" value="financing" />
      <input type="hidden" name="_subject" value="Florida Liquor License Market — Financing Request" />
      <input type="hidden" name="_template" value="table" />
      <label className="financing-native-honeypot" aria-hidden="true">Leave blank<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label>
      <div className="financing-native-fields">
        <label><span>Name *</span><input name="name" type="text" autoComplete="name" required /></label>
        <label><span>Email *</span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>Phone *</span><input name="phone" type="tel" autoComplete="tel" required /></label>
        <label><span>Financing Purpose *</span><select name="financing_purpose" defaultValue="" required><option value="" disabled>Select purpose</option><option>Purchase a quota license</option><option>Refinance a quota license</option><option>Explore available options</option></select></label>
        <label><span>County *</span><select name="county" defaultValue="" required><option value="" disabled>Select county</option>{counties.map((county) => <option key={county}>{county}</option>)}</select></label>
        <label><span>License Type *</span><select name="license_type" defaultValue="" required><option value="" disabled>Select license type</option><option>4COP Quota</option><option>3PS Quota / Package Store</option><option>Other Quota License</option><option>Not Sure</option></select></label>
        <label><span>Purchase Price or License Value *</span><input name="license_value" type="text" inputMode="decimal" placeholder="$" required /></label>
        <label><span>Requested Financing Amount *</span><input name="financing_amount" type="text" inputMode="decimal" placeholder="$" required /></label>
        <label><span>Available Down Payment / Equity</span><input name="down_payment" type="text" inputMode="decimal" placeholder="$" /></label>
        <label><span>Approximate Credit Range</span><select name="credit_range" defaultValue=""><option value="">Select range</option><option>740+</option><option>700–739</option><option>660–699</option><option>620–659</option><option>Below 620</option><option>Prefer not to say</option></select></label>
        <label><span>Transaction Timeline *</span><select name="timeline" defaultValue="" required><option value="" disabled>Select timeline</option><option>Within 30 days</option><option>30–60 days</option><option>60–90 days</option><option>More than 90 days</option><option>Exploring options</option></select></label>
        <label><span>Purchase Agreement</span><select name="purchase_agreement" defaultValue=""><option value="">Select status</option><option>Signed agreement</option><option>Letter of intent</option><option>Identified a license</option><option>Still searching</option><option>Refinance request</option></select></label>
        <label className="financing-native-notes"><span>Additional Details</span><textarea name="message" rows={5} placeholder="Share relevant details about the license, transaction, or financing request." /></label>
      </div>
      <p className="financing-native-disclosure">The 10%–12% range is indicative, not a commitment or guarantee. Rates, fees, loan-to-value requirements, collateral, repayment terms, and approval vary by lender and transaction. Florida Liquor License Market is not guaranteeing financing; all financing is subject to lender underwriting and final documentation. Review the <a href="/financing-disclosure">Financing Disclosure</a>.</p>
      <button className="financing-native-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending Request…" : "Submit Confidential Financing Request"}</button>
      <p className={`financing-native-status ${status}`} role="status" aria-live="polite">
        {status === "sent" && "Thank you. Your financing request has been submitted confidentially."}
        {status === "error" && <>We couldn&apos;t send your request. Please visit the <a href="/contact">Contact page</a> for assistance.</>}
      </p>
    </form>
  );
}
