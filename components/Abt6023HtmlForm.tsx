"use client";

import { useState } from "react";
import type { AbtFormDefinition } from "@/data/abt-forms";

type Values = {
  requestorName: string;
  mailingAddress: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  telephone: string;
  telephoneExt: string;
  contactPerson: string;
  contactTelephone: string;
  contactTelephoneExt: string;
  contactEmail: string;
  licenseNumber: string;
  ownerName: string;
  businessName: string;
  checkNumber: string;
  lienAccountNumber: string;
  checklistApplication: boolean;
  checklistFee: boolean;
};

const EMPTY: Values = {
  requestorName: "", mailingAddress: "", city: "", state: "", zip: "", email: "", telephone: "", telephoneExt: "",
  contactPerson: "", contactTelephone: "", contactTelephoneExt: "", contactEmail: "", licenseNumber: "", ownerName: "",
  businessName: "", checkNumber: "", lienAccountNumber: "", checklistApplication: false, checklistFee: false,
};

const fieldStyle = { width: "100%", minHeight: 42, borderRadius: 8, border: "1px solid #8ea2b6", background: "#f7fbff", color: "#071827", padding: "9px 11px", fontSize: 15, boxSizing: "border-box" as const };
const labelStyle = { display: "grid", gap: 6, fontSize: 13, fontWeight: 800, color: "#d7e7f5" };
const sectionStyle = { border: "1px solid #355069", borderRadius: 12, overflow: "hidden", background: "#061522" };
const sectionTitleStyle = { margin: 0, padding: "12px 16px", background: "#c7d4df", color: "#071827", fontSize: 16, fontWeight: 900, letterSpacing: ".02em" };

export default function Abt6023HtmlForm({ form }: { form: AbtFormDefinition }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const set = <K extends keyof Values>(key: K, value: Values[K]) => setValues((v) => ({ ...v, [key]: value }));

  return (
    <section className="abt-workspace" aria-label="ABT-6023 browser form workspace">
      <div className="abt-viewer-panel" style={{ display: "grid", gap: 18 }}>
        <div className="abt-viewer-toolbar" style={{ alignItems: "center" }}>
          <div>
            <strong>Browser Fillable {form.formNumber}</strong>
            <small>This version does not embed a PDF. Tab moves through the fields normally and the checkboxes are native browser controls.</small>
          </div>
          <div>
            <a className="btn btn-outline" href={form.officialPdfUrl} target="_blank" rel="noreferrer">View Official DBPR PDF</a>
            <button className="btn btn-outline" type="button" onClick={() => setValues(EMPTY)}>Clear Form</button>
            <button className="btn btn-gold" type="button" onClick={() => window.print()}>Print / Save as PDF</button>
          </div>
        </div>

        <form style={{ display: "grid", gap: 16 }}>
          <section style={sectionStyle}>
            <h3 style={sectionTitleStyle}>SECTION 1 - REQUESTOR INFORMATION</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={labelStyle}>Name of Requestor<input autoFocus style={fieldStyle} value={values.requestorName} onChange={(e) => set("requestorName", e.target.value)} /></label>
              <label style={labelStyle}>Mailing Address<input style={fieldStyle} value={values.mailingAddress} onChange={(e) => set("mailingAddress", e.target.value)} /></label>
              <div style={{ display: "grid", gridTemplateColumns: "2fr .65fr 1fr", gap: 12 }}>
                <label style={labelStyle}>City<input style={fieldStyle} value={values.city} onChange={(e) => set("city", e.target.value)} /></label>
                <label style={labelStyle}>State<input maxLength={2} style={fieldStyle} value={values.state} onChange={(e) => set("state", e.target.value.toUpperCase())} /></label>
                <label style={labelStyle}>ZIP<input style={fieldStyle} value={values.zip} onChange={(e) => set("zip", e.target.value)} /></label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr .45fr", gap: 12 }}>
                <label style={labelStyle}>E-mail Address<input type="email" style={fieldStyle} value={values.email} onChange={(e) => set("email", e.target.value)} /></label>
                <label style={labelStyle}>Telephone<input type="tel" style={fieldStyle} value={values.telephone} onChange={(e) => set("telephone", e.target.value)} /></label>
                <label style={labelStyle}>Ext<input style={fieldStyle} value={values.telephoneExt} onChange={(e) => set("telephoneExt", e.target.value)} /></label>
              </div>
              <label style={labelStyle}>Contact Person (if applicable)<input style={fieldStyle} value={values.contactPerson} onChange={(e) => set("contactPerson", e.target.value)} /></label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr .45fr 1.5fr", gap: 12 }}>
                <label style={labelStyle}>Telephone Number<input type="tel" style={fieldStyle} value={values.contactTelephone} onChange={(e) => set("contactTelephone", e.target.value)} /></label>
                <label style={labelStyle}>Ext<input style={fieldStyle} value={values.contactTelephoneExt} onChange={(e) => set("contactTelephoneExt", e.target.value)} /></label>
                <label style={labelStyle}>E-mail Address<input type="email" style={fieldStyle} value={values.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} /></label>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h3 style={sectionTitleStyle}>SECTION 2 - LICENSE INFORMATION</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={labelStyle}>License number to be researched<input style={fieldStyle} value={values.licenseNumber} onChange={(e) => set("licenseNumber", e.target.value)} /></label>
              <label style={labelStyle}>Owner Name<input style={fieldStyle} value={values.ownerName} onChange={(e) => set("ownerName", e.target.value)} /></label>
              <label style={labelStyle}>Business Name (DBA)<input style={fieldStyle} value={values.businessName} onChange={(e) => set("businessName", e.target.value)} /></label>
            </div>
          </section>

          <section style={sectionStyle}>
            <h3 style={sectionTitleStyle}>SECTION 3 - PAYMENT INFORMATION</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={labelStyle}>Check / Money Order Number<input style={fieldStyle} value={values.checkNumber} onChange={(e) => set("checkNumber", e.target.value)} /></label>
              <label style={labelStyle}>Lien Account Number (if applicable)<input style={fieldStyle} value={values.lienAccountNumber} onChange={(e) => set("lienAccountNumber", e.target.value)} /></label>
            </div>
          </section>

          <section style={sectionStyle}>
            <h3 style={sectionTitleStyle}>REQUEST CHECKLIST</h3>
            <div style={{ padding: 16, display: "grid", gap: 14 }}>
              <label style={{ ...labelStyle, gridTemplateColumns: "22px 1fr", alignItems: "center" }}>
                <input type="checkbox" checked={values.checklistApplication} onChange={(e) => set("checklistApplication", e.target.checked)} style={{ width: 18, height: 18 }} />
                Complete DBPR ABT-6023 request
              </label>
              <label style={{ ...labelStyle, gridTemplateColumns: "22px 1fr", alignItems: "center" }}>
                <input type="checkbox" checked={values.checklistFee} onChange={(e) => set("checklistFee", e.target.checked)} style={{ width: 18, height: 18 }} />
                $20.00 fee included
              </label>
            </div>
          </section>
        </form>

        <p className="abt-viewer-help">
          This browser-based workspace avoids Chrome's embedded-PDF failure completely. Complete the fields here, use Tab to move through them, check the boxes normally, then use Print / Save as PDF if you want a saved copy. Use the official DBPR PDF button to compare against the current state form before filing.
        </p>
      </div>
    </section>
  );
}
