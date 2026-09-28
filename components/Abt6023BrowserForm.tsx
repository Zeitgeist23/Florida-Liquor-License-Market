"use client";

import {
  PDFCheckBox,
  PDFDocument,
  PDFTextField,
} from "pdf-lib";
import { useEffect, useRef, useState } from "react";

type InitialValues = {
  licenseNumber?: string;
  ownerName?: string;
  businessName?: string;
};

type BrowserFieldName =
  | "requestorName"
  | "mailingAddress"
  | "city"
  | "state"
  | "zip"
  | "email"
  | "telephone"
  | "telephoneExt"
  | "contactPerson"
  | "contactTelephone"
  | "contactTelephoneExt"
  | "contactEmail"
  | "licenseNumber"
  | "ownerName"
  | "businessName"
  | "checkNumber"
  | "lienAccountNumber";

const TEXT_FIELD_ALIASES: Record<BrowserFieldName, string[]> = {
  requestorName: ["name of requestor"],
  mailingAddress: ["mailing address"],
  city: ["city"],
  state: ["state"],
  zip: ["zip code", "zip"],
  email: ["requestor e mail address", "requestor email address", "e mail address"],
  telephone: ["requestor telephone number", "telephone number"],
  telephoneExt: ["requestor telephone extension", "telephone extension"],
  contactPerson: ["contact person"],
  contactTelephone: ["contact telephone number", "contact telephone"],
  contactTelephoneExt: ["contact telephone extension"],
  contactEmail: ["contact e mail address", "contact email address"],
  licenseNumber: ["license number to be researched", "license number"],
  ownerName: ["owner name"],
  businessName: ["business name dba", "business name"],
  checkNumber: ["check money order number", "check or money order number", "check number"],
  lienAccountNumber: ["lien account number"],
};

const CHECKBOX_ALIASES = {
  checklistApplication: ["abt6023 checklist complete application", "complete application"],
  checklistFee: ["abt6023 checklist pay 20 fee", "pay 20 fee"],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function aliasScore(fieldName: string, aliases: string[]) {
  const normalizedField = normalize(fieldName);
  let best = 0;

  aliases.forEach((alias) => {
    const normalizedAlias = normalize(alias);
    if (!normalizedAlias) return;
    if (normalizedField === normalizedAlias) {
      best = Math.max(best, 1000 + normalizedAlias.length);
      return;
    }
    if (normalizedField.includes(normalizedAlias) || normalizedAlias.includes(normalizedField)) {
      best = Math.max(best, 500 + Math.min(normalizedField.length, normalizedAlias.length));
      return;
    }

    const words = normalizedAlias.split(" ").filter(Boolean);
    const matches = words.filter((word) => normalizedField.includes(word)).length;
    if (matches === words.length && words.length) {
      best = Math.max(best, 100 + matches);
    }
  });

  return best;
}

function findFieldByAliases<T extends { getName(): string }>(fields: T[], aliases: string[]) {
  return fields
    .map((field) => ({ field, score: aliasScore(field.getName(), aliases) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)[0]?.field;
}

function completedPdfFilename(licenseNumber: string) {
  const safeLicense = licenseNumber.trim().replace(/[^a-z0-9-]+/gi, "-") || "license";
  return `DBPR-ABT-6023-${safeLicense}-completed.pdf`;
}

export default function Abt6023BrowserForm({
  officialPdfUrl,
  initialValues = {},
}: {
  officialPdfUrl: string;
  initialValues?: InitialValues;
}) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewFilename, setPreviewFilename] = useState("DBPR-ABT-6023-completed.pdf");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const previewFrame = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  async function generateCompletedPdf(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGenerating(true);
    setError("");
    setStatus("Preparing completed official DBPR ABT-6023…");

    try {
      const formData = new FormData(event.currentTarget);
      const sourceResponse = await fetch("/abt-forms/abt-6023.pdf", { cache: "no-store" });
      if (!sourceResponse.ok) {
        throw new Error("The official ABT-6023 PDF could not be loaded.");
      }

      const sourceBytes = new Uint8Array(await sourceResponse.arrayBuffer());
      const pdfDocument = await PDFDocument.load(sourceBytes, { ignoreEncryption: true });
      const pdfForm = pdfDocument.getForm();
      const textFields = pdfForm.getFields().filter((field): field is PDFTextField => field instanceof PDFTextField);
      const checkboxes = pdfForm.getFields().filter((field): field is PDFCheckBox => field instanceof PDFCheckBox);

      const unmapped: string[] = [];

      (Object.keys(TEXT_FIELD_ALIASES) as BrowserFieldName[]).forEach((browserFieldName) => {
        const value = String(formData.get(browserFieldName) || "").trim();
        if (!value) return;

        const target = findFieldByAliases(textFields, TEXT_FIELD_ALIASES[browserFieldName]);
        if (!target) {
          unmapped.push(browserFieldName);
          return;
        }

        try {
          target.setText(value);
        } catch {
          unmapped.push(browserFieldName);
        }
      });

      const applicationChecked = formData.get("checklistApplication") === "on";
      const feeChecked = formData.get("checklistFee") === "on";

      const applicationCheckbox = findFieldByAliases(checkboxes, CHECKBOX_ALIASES.checklistApplication);
      if (applicationCheckbox) {
        if (applicationChecked) applicationCheckbox.check();
        else applicationCheckbox.uncheck();
      } else if (applicationChecked) {
        unmapped.push("checklistApplication");
      }

      const feeCheckbox = findFieldByAliases(checkboxes, CHECKBOX_ALIASES.checklistFee);
      if (feeCheckbox) {
        if (feeChecked) feeCheckbox.check();
        else feeCheckbox.uncheck();
      } else if (feeChecked) {
        unmapped.push("checklistFee");
      }

      try {
        pdfForm.updateFieldAppearances();
      } catch {
        // The source PDF already contains appearance dictionaries. The entered
        // values remain valid even if a viewer regenerates appearances itself.
      }

      // Flatten the completed copy so the values render reliably when printed
      // or opened in browsers that do not fully support AcroForm appearances.
      try {
        pdfForm.flatten();
      } catch {
        // Keep the populated AcroForm copy if a field cannot be flattened.
      }

      const completedBytes = await pdfDocument.save({ useObjectStreams: false });
      const completedBuffer = Uint8Array.from(completedBytes).buffer;
      const nextUrl = URL.createObjectURL(new Blob([completedBuffer], { type: "application/pdf" }));
      const licenseNumber = String(formData.get("licenseNumber") || "");
      const nextFilename = completedPdfFilename(licenseNumber);

      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return nextUrl;
      });
      setPreviewFilename(nextFilename);

      if (unmapped.length) {
        setStatus(
          `Completed PDF generated. Review it carefully: ${unmapped.length} entered field${unmapped.length === 1 ? "" : "s"} could not be matched automatically to the official PDF.`,
        );
      } else {
        setStatus("Completed official ABT-6023 generated. Review it below, then print or download.");
      }

      window.setTimeout(() => {
        document.getElementById("abt-6023-completed-preview")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The completed ABT-6023 could not be generated.");
      setStatus("");
    } finally {
      setGenerating(false);
    }
  }

  function printCompletedPdf() {
    if (!previewUrl) return;

    const frame = previewFrame.current;
    if (frame?.contentWindow) {
      try {
        frame.contentWindow.focus();
        frame.contentWindow.print();
        return;
      } catch {
        // Fall through to opening the PDF in a new browser tab.
      }
    }

    window.open(previewUrl, "_blank", "noopener,noreferrer");
  }

  function clearGeneratedPdf() {
    setError("");
    setStatus("");
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return "";
    });
  }

  return (
    <section className="abt-workspace" aria-label="ABT-6023 browser form workspace">
      <div className="abt-guided-panel" id="abt-6023-browser-form-wrap">
        <div className="abt-progress-heading">
          <div>
            <span>Browser-based form</span>
            <h2>Complete DBPR ABT-6023 and generate the printable official PDF</h2>
          </div>
          <strong>100%</strong>
        </div>
        <div className="abt-progress-track"><i style={{ width: "100%" }} /></div>

        <p className="abt-viewer-help">
          Enter the information below once. FLLM will transfer it to the official ABT-6023 PDF so you can review, print and download the completed request.
        </p>

        <form id="abt-6023-browser-form" className="abt-field-grid" onSubmit={generateCompletedPdf}>
          <label className="abt-field">
            <span><strong>Name of Requestor</strong></span>
            <input name="requestorName" type="text" autoComplete="name" />
          </label>
          <label className="abt-field">
            <span><strong>Mailing Address</strong></span>
            <input name="mailingAddress" type="text" autoComplete="street-address" />
          </label>
          <label className="abt-field">
            <span><strong>City</strong></span>
            <input name="city" type="text" autoComplete="address-level2" />
          </label>
          <label className="abt-field">
            <span><strong>State</strong></span>
            <input name="state" type="text" maxLength={2} autoComplete="address-level1" />
          </label>
          <label className="abt-field">
            <span><strong>ZIP</strong></span>
            <input name="zip" type="text" autoComplete="postal-code" />
          </label>
          <label className="abt-field">
            <span><strong>E-mail Address</strong></span>
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label className="abt-field">
            <span><strong>Telephone</strong></span>
            <input name="telephone" type="tel" autoComplete="tel" />
          </label>
          <label className="abt-field">
            <span><strong>Telephone Ext.</strong></span>
            <input name="telephoneExt" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Contact Person (if applicable)</strong></span>
            <input name="contactPerson" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Contact Telephone</strong></span>
            <input name="contactTelephone" type="tel" />
          </label>
          <label className="abt-field">
            <span><strong>Contact Telephone Ext.</strong></span>
            <input name="contactTelephoneExt" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Contact E-mail Address</strong></span>
            <input name="contactEmail" type="email" />
          </label>
          <label className="abt-field">
            <span><strong>License number to be researched</strong></span>
            <input name="licenseNumber" type="text" defaultValue={initialValues.licenseNumber || ""} />
          </label>
          <label className="abt-field">
            <span><strong>Owner Name</strong></span>
            <input name="ownerName" type="text" defaultValue={initialValues.ownerName || ""} />
          </label>
          <label className="abt-field">
            <span><strong>Business Name (DBA)</strong></span>
            <input name="businessName" type="text" defaultValue={initialValues.businessName || ""} />
          </label>
          <label className="abt-field">
            <span><strong>Check / Money Order Number</strong></span>
            <input name="checkNumber" type="text" />
          </label>
          <label className="abt-field">
            <span><strong>Lien Account Number (if applicable)</strong></span>
            <input name="lienAccountNumber" type="text" />
          </label>
          <label className="abt-field abt-checkbox-field">
            <input name="checklistApplication" type="checkbox" />
            <span><strong>Complete DBPR ABT-6023 request</strong></span>
          </label>
          <label className="abt-field abt-checkbox-field">
            <input name="checklistFee" type="checkbox" />
            <span><strong>$20.00 fee included</strong></span>
          </label>
        </form>

        <div className="abt-step-actions abt-6023-generate-actions">
          <button
            className="btn btn-outline"
            type="reset"
            form="abt-6023-browser-form"
            onClick={clearGeneratedPdf}
          >
            Clear Form
          </button>
          <button
            className="btn btn-gold"
            type="submit"
            form="abt-6023-browser-form"
            disabled={generating}
          >
            {generating ? "Generating Completed PDF…" : "Generate Completed ABT-6023"}
          </button>
          <a className="btn btn-outline" href={officialPdfUrl} target="_blank" rel="noreferrer">
            View Blank Official DBPR PDF
          </a>
        </div>

        {error && <p className="abt-6023-generation-status is-error" role="alert">{error}</p>}
        {status && <p className="abt-6023-generation-status is-complete" role="status">{status}</p>}

        {previewUrl && (
          <section
            className="abt-6023-completed-panel"
            id="abt-6023-completed-preview"
            aria-label="Completed ABT-6023 PDF preview"
          >
            <div className="abt-6023-completed-heading">
              <div>
                <span>Completed official PDF</span>
                <h3>Review, print or download ABT-6023</h3>
                <p>
                  The completed copy is generated in your browser from the official form. Review every field before sending it to DBPR/ABT.
                </p>
              </div>
              <div className="abt-6023-completed-actions">
                <button className="btn btn-gold" type="button" onClick={printCompletedPdf}>
                  Print Completed PDF
                </button>
                <a className="btn btn-outline" href={previewUrl} download={previewFilename}>
                  Download Completed PDF
                </a>
                <a className="btn btn-outline" href={previewUrl} target="_blank" rel="noreferrer">
                  Open Full-Size PDF
                </a>
              </div>
            </div>
            <iframe
              ref={previewFrame}
              className="abt-6023-completed-frame"
              src={previewUrl}
              title="Completed DBPR ABT-6023"
            />
          </section>
        )}

        <p className="abt-viewer-help">
          The FLLM browser form is provided for administrative convenience. Before filing, compare the completed PDF with the current official DBPR ABT-6023 and follow DBPR/ABT submission and fee requirements.
        </p>

        <aside className="abt-6023-ucc-companion" aria-label="Additional Florida UCC due diligence">
          <div>
            <span>Additional secured-transaction due diligence</span>
            <h3>Also search the Florida UCC registry</h3>
            <p>
              ABT-6023 is used to request the Division&apos;s search for recorded liens or mortgagee interests involving the alcoholic-beverage license. For broader debtor-level secured-transaction diligence, also search the Florida Secured Transaction Registry for UCC financing statements filed under the business or debtor name.
            </p>
            <small>
              A UCC search is a separate public-record check and should not be treated by itself as confirmation that a liquor license or transaction is free of every lien, claim, tax obligation, judgment or other encumbrance.
            </small>
          </div>
          <a
            className="btn btn-gold"
            href="https://floridaucc.com/search"
            target="_blank"
            rel="noopener noreferrer"
          >
            Search Florida UCC Records
          </a>
        </aside>
      </div>
    </section>
  );
}
