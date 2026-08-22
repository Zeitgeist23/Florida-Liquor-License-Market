"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

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
  requestorName: "",
  mailingAddress: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  telephone: "",
  telephoneExt: "",
  contactPerson: "",
  contactTelephone: "",
  contactTelephoneExt: "",
  contactEmail: "",
  licenseNumber: "",
  ownerName: "",
  businessName: "",
  checkNumber: "",
  lienAccountNumber: "",
  checklistApplication: false,
  checklistFee: false,
};

const fieldStyle = {
  width: "100%",
  minHeight: 42,
  borderRadius: 8,
  border: "1px solid #8ea2b6",
  background: "#f7fbff",
  color: "#071827",
  padding: "9px 11px",
  fontSize: 15,
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "grid",
  gap: 6,
  fontSize: 13,
  fontWeight: 800,
  color: "#d7e7f5",
};

const sectionStyle = {
  border: "1px solid #355069",
  borderRadius: 12,
  overflow: "hidden",
  background: "#061522",
};

const sectionTitleStyle = {
  margin: 0,
  padding: "12px 16px",
  background: "#c7d4df",
  color: "#071827",
  fontSize: 16,
  fontWeight: 900,
  letterSpacing: ".02em",
};

function safe(v: string) {
  return v.trim() || "____________________________";
}

export default function Abt6023HtmlForm({ form }: { form: AbtFormDefinition }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [generating, setGenerating] = useState(false);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function downloadCompletedPdf() {
    setGenerating(true);
    try {
      const doc = await PDFDocument.create();
      const regular = await doc.embedFont(StandardFonts.Helvetica);
      const bold = await doc.embedFont(StandardFonts.HelveticaBold);
      const italic = await doc.embedFont(StandardFonts.HelveticaOblique);
      const page = doc.addPage([612, 792]);
      const black = rgb(0, 0, 0);
      const gray = rgb(.83, .83, .83);

      const center = (text: string, y: number, size: number, font = bold) => {
        page.drawText(text, { x: (612 - font.widthOfTextAtSize(text, size)) / 2, y, size, font, color: black });
      };
      const line = (label: string, value: string, y: number) => {
        page.drawText(label, { x: 72, y, size: 9.5, font: bold, color: black });
        page.drawText(safe(value), { x: 220, y, size: 9.5, font: regular, color: black });
      };
      const section = (title: string, y: number) => {
        page.drawRectangle({ x: 60, y: y - 18, width: 492, height: 20, color: gray, borderColor: black, borderWidth: 1 });
        page.drawText(title, { x: 70, y: y - 12, size: 10.5, font: bold, color: black });
      };

      center("DBPR ABT-6023 - Division of Alcoholic Beverages and Tobacco", 758, 10);
      center("Request for Alcoholic Beverage License Lien Search", 744, 10);
      center("STATE OF FLORIDA", 716, 12);
      center("DEPARTMENT OF BUSINESS AND PROFESSIONAL REGULATION", 700, 11);
      page.drawText("FLLM browser-completed working copy based on DBPR ABT-6023. Verify against the current official DBPR form before filing.", {
        x: 62, y: 675, size: 8.5, font: italic, color: black,
      });

      section("SECTION 1 - REQUESTOR INFORMATION", 646);
      line("Name of Requestor:", values.requestorName, 610);
      line("Mailing Address:", values.mailingAddress, 588);
      line("City:", values.city, 566);
      page.drawText(`State: ${safe(values.state)}   ZIP: ${safe(values.zip)}`, { x: 330, y: 566, size: 9.5, font: regular, color: black });
      line("E-mail Address:", values.email, 544);
      page.drawText(`Telephone: ${safe(values.telephone)}   Ext: ${safe(values.telephoneExt)}`, { x: 330, y: 544, size: 9.5, font: regular, color: black });
      line("Contact Person:", values.contactPerson, 522);
      line("Contact Telephone:", values.contactTelephone, 500);
      page.drawText(`Ext: ${safe(values.contactTelephoneExt)}   E-mail: ${safe(values.contactEmail)}`, { x: 330, y: 500, size: 9.5, font: regular, color: black });

      section("SECTION 2 - LICENSE INFORMATION", 465);
      line("License number:", values.licenseNumber, 430);
      line("Owner Name:", values.ownerName, 408);
      line("Business Name (DBA):", values.businessName, 386);

      section("SECTION 3 - PAYMENT INFORMATION", 350);
      line("Check/Money Order Number:", values.checkNumber, 315);
      line("Lien Account Number:", values.lienAccountNumber, 293);

      section("REQUEST CHECKLIST", 255);
      page.drawText(`${values.checklistApplication ? "[X]" : "[ ]"} Complete DBPR ABT-6023 request`, { x: 74, y: 220, size: 10, font: regular, color: black });
      page.drawText(`${values.checklistFee ? "[X]" : "[ ]"} $20.00 fee included`, { x: 74, y: 198, size: 10, font: regular, color: black });

      page.drawText("Auth. 61A-5.0012, FAC", { x: 60, y: 34, size: 8, font: bold, color: black });
      page.drawText("Generated through FloridaLiquorLicenseMarket.com", { x: 330, y: 34, size: 8, font: italic, color: black });

      const bytes = await doc.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ABT-6023-completed.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <section className="abt-workspace" aria-label="ABT-6023 browser form workspace">
      <div className="abt-viewer-panel" style={{ display: "grid", gap: 18 }}>
        <div className="abt-viewer-toolbar" style={{ alignItems: "center" }}>
          <div>
            <strong>Browser Fillable {form.formNumber}</strong>
            <small>No embedded PDF is used. Tab moves naturally through every field and the checkboxes are standard browser controls.</small>
          </div>
          <div>
            <a className="btn btn-outline" href={form.officialPdfUrl} target="_blank" rel="noreferrer">View Official DBPR PDF</a>
            <button className="btn btn-outline" type="button" onClick={() => setValues(EMPTY)}>Clear Form</button>
            <button className="btn btn-gold" type="button" onClick={downloadCompletedPdf} disabled={generating}>
              {generating ? "Creating PDF…" : "Download Completed PDF"}
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
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
        </div>

        <p className="abt-viewer-help">
          This browser form avoids Chrome's embedded-PDF problems entirely. It does not replace the official DBPR form; use the official-PDF button to confirm the current state form before filing. The completed PDF generated here is a working copy containing the information entered above.
        </p>
      </div>
    </section>
  );
}
