"use client";

import type { CSSProperties } from "react";

export default function Abt6023HtmlForm({ formNumber, officialPdfUrl }: { formNumber: string; officialPdfUrl: string }) {
  const inputStyle: CSSProperties = { width: "100%", minHeight: 42, borderRadius: 8, border: "1px solid #8ea2b6", background: "#f7fbff", color: "#071827", padding: "9px 11px", fontSize: 15, boxSizing: "border-box" };
  const labelStyle: CSSProperties = { display: "grid", gap: 6, fontSize: 13, fontWeight: 800, color: "#d7e7f5" };
  const sectionStyle: CSSProperties = { border: "1px solid #355069", borderRadius: 12, overflow: "hidden", background: "#061522" };
  const headingStyle: CSSProperties = { margin: 0, padding: "12px 16px", background: "#c7d4df", color: "#071827", fontSize: 16, fontWeight: 900 };

  return (
    <section className="abt-workspace" aria-label="ABT-6023 browser form workspace">
      <div className="abt-viewer-panel" style={{ display: "grid", gap: 18 }}>
        <div className="abt-viewer-toolbar" style={{ alignItems: "center" }}>
          <div>
            <strong>Browser Fillable {formNumber}</strong>
            <small>No PDF viewer is used here. Tab moves through the fields normally and the checkboxes are native browser controls.</small>
          </div>
          <div>
            <a className="btn btn-outline" href={officialPdfUrl} target="_blank" rel="noreferrer">View Official DBPR PDF</a>
            <button className="btn btn-outline" type="reset" form="abt6023-browser-form">Clear Form</button>
            <button className="btn btn-gold" type="button" onClick={() => window.print()}>Print / Save as PDF</button>
          </div>
        </div>

        <form id="abt6023-browser-form" style={{ display: "grid", gap: 16 }}>
          <section style={sectionStyle}>
            <h3 style={headingStyle}>SECTION 1 - REQUESTOR INFORMATION</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={labelStyle}>Name of Requestor<input autoFocus name="requestorName" style={inputStyle} /></label>
              <label style={labelStyle}>Mailing Address<input name="mailingAddress" style={inputStyle} /></label>
              <div style={{ display: "grid", gridTemplateColumns: "2fr .65fr 1fr", gap: 12 }}>
                <label style={labelStyle}>City<input name="city" style={inputStyle} /></label>
                <label style={labelStyle}>State<input name="state" maxLength={2} style={inputStyle} /></label>
                <label style={labelStyle}>ZIP<input name="zip" style={inputStyle} /></label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr .45fr", gap: 12 }}>
                <label style={labelStyle}>E-mail Address<input name="email" type="email" style={inputStyle} /></label>
                <label style={labelStyle}>Telephone<input name="telephone" type="tel" style={inputStyle} /></label>
                <label style={labelStyle}>Ext<input name="telephoneExt" style={inputStyle} /></label>
              </div>
              <label style={labelStyle}>Contact Person (if applicable)<input name="contactPerson" style={inputStyle} /></label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr .45fr 1.5fr", gap: 12 }}>
                <label style={labelStyle}>Telephone Number<input name="contactTelephone" type="tel" style={inputStyle} /></label>
                <label style={labelStyle}>Ext<input name="contactTelephoneExt" style={inputStyle} /></label>
                <label style={labelStyle}>E-mail Address<input name="contactEmail" type="email" style={inputStyle} /></label>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h3 style={headingStyle}>SECTION 2 - LICENSE INFORMATION</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={labelStyle}>License number to be researched<input name="licenseNumber" style={inputStyle} /></label>
              <label style={labelStyle}>Owner Name<input name="ownerName" style={inputStyle} /></label>
              <label style={labelStyle}>Business Name (DBA)<input name="businessName" style={inputStyle} /></label>
            </div>
          </section>

          <section style={sectionStyle}>
            <h3 style={headingStyle}>SECTION 3 - PAYMENT INFORMATION</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={labelStyle}>Check / Money Order Number<input name="checkNumber" style={inputStyle} /></label>
              <label style={labelStyle}>Lien Account Number (if applicable)<input name="lienAccountNumber" style={inputStyle} /></label>
            </div>
          </section>

          <section style={sectionStyle}>
            <h3 style={headingStyle}>REQUEST CHECKLIST</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 8, alignItems: "center", color: "#d7e7f5", fontWeight: 800 }}>
                <input type="checkbox" name="checklistApplication" style={{ width: 18, height: 18 }} />
                Complete DBPR ABT-6023 request
              </label>
              <label style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 8, alignItems: "center", color: "#d7e7f5", fontWeight: 800 }}>
                <input type="checkbox" name="checklistFee" style={{ width: 18, height: 18 }} />
                $20.00 fee included
              </label>
            </div>
          </section>
        </form>

        <p className="abt-viewer-help">
          This browser-based workspace avoids Chrome's embedded-PDF problem entirely. Complete the fields here, use Tab to move through them, check the boxes normally, and use Print / Save as PDF for a saved copy. Use the official DBPR PDF button to compare against the current state form before filing.
        </p>
      </div>
    </section>
  );
}
