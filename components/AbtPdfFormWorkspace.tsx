"use client";

import {
  PDFCheckBox,
  PDFDocument,
  PDFDropdown,
  PDFOptionList,
  PDFRadioGroup,
  PDFTextField,
} from "pdf-lib";
import { useEffect, useMemo, useRef, useState } from "react";

import type { AbtFormDefinition } from "@/data/abt-forms";

type FieldKind = "text" | "checkbox" | "dropdown" | "radio" | "option-list";

type FormFieldDefinition = {
  name: string;
  label: string;
  kind: FieldKind;
  options: string[];
  originalIndex: number;
};

type DraftValues = Record<string, string | boolean>;

const FIELDS_PER_STEP = 10;

function humanizeFieldName(name: string, index: number) {
  const finalPart = name.split(/[.>]/).filter(Boolean).at(-1) || name;
  const cleaned = finalPart
    .replace(/\[[0-9]+\]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned || /^(text|field|checkbox|check|radio|dropdown)\s*\d*$/i.test(cleaned)) {
    return `Official form field ${index + 1}`;
  }

  return cleaned.replace(/\b\w/g, (character) => character.toUpperCase());
}

function inputType(field: FormFieldDefinition) {
  const value = `${field.name} ${field.label}`.toLowerCase();
  if (value.includes("email")) return "email";
  if (value.includes("telephone") || value.includes("phone")) return "tel";
  return "text";
}

function extractFields(pdfDocument: PDFDocument) {
  const pdfForm = pdfDocument.getForm();
  const initialValues: DraftValues = {};
  const definitions: FormFieldDefinition[] = [];

  pdfForm.getFields().forEach((field, index) => {
    const name = field.getName();
    const label = humanizeFieldName(name, index);

    if (field instanceof PDFTextField) {
      definitions.push({ name, label, kind: "text", options: [], originalIndex: index });
      initialValues[name] = field.getText() || "";
      return;
    }

    if (field instanceof PDFCheckBox) {
      definitions.push({ name, label, kind: "checkbox", options: [], originalIndex: index });
      initialValues[name] = field.isChecked();
      return;
    }

    if (field instanceof PDFDropdown) {
      definitions.push({ name, label, kind: "dropdown", options: field.getOptions(), originalIndex: index });
      initialValues[name] = field.getSelected()[0] || "";
      return;
    }

    if (field instanceof PDFRadioGroup) {
      definitions.push({ name, label, kind: "radio", options: field.getOptions(), originalIndex: index });
      initialValues[name] = field.getSelected() || "";
      return;
    }

    if (field instanceof PDFOptionList) {
      definitions.push({ name, label, kind: "option-list", options: field.getOptions(), originalIndex: index });
      initialValues[name] = field.getSelected()[0] || "";
    }
  });

  return { definitions, initialValues };
}

export default function AbtPdfFormWorkspace({ form }: { form: AbtFormDefinition }) {
  const officialPdfPath = `/api/abt-forms/${form.id}/pdf`;
  const draftKey = `fllm-abt-form-draft:${form.id}`;
  const templateBytes = useRef<Uint8Array | null>(null);
  const [mode, setMode] = useState<"guided" | "viewer">("guided");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<FormFieldDefinition[]>([]);
  const [values, setValues] = useState<DraftValues>({});
  const [step, setStep] = useState(0);
  const [rememberDraft, setRememberDraft] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadOfficialForm() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(officialPdfPath, { cache: "no-store" });
        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(payload?.error || "The official PDF could not be loaded.");
        }

        const bytes = new Uint8Array(await response.arrayBuffer());
        const pdfDocument = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const extracted = extractFields(pdfDocument);
        if (cancelled) return;

        templateBytes.current = bytes;
        let nextValues = extracted.initialValues;
        const savedDraft = window.localStorage.getItem(draftKey);
        if (savedDraft) {
          try {
            nextValues = { ...nextValues, ...(JSON.parse(savedDraft) as DraftValues) };
            setRememberDraft(true);
          } catch {
            window.localStorage.removeItem(draftKey);
          }
        }

        setFields(extracted.definitions);
        setValues(nextValues);
        if (extracted.definitions.length === 0) setMode("viewer");
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "The official form could not be loaded.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadOfficialForm();
    return () => {
      cancelled = true;
    };
  }, [draftKey, officialPdfPath]);

  useEffect(() => {
    if (!rememberDraft || fields.length === 0) return;
    window.localStorage.setItem(draftKey, JSON.stringify(values));
  }, [draftKey, fields.length, rememberDraft, values]);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const totalSteps = Math.max(1, Math.ceil(fields.length / FIELDS_PER_STEP));
  const visibleFields = useMemo(
    () => fields.slice(step * FIELDS_PER_STEP, (step + 1) * FIELDS_PER_STEP),
    [fields, step]
  );
  const completion = fields.length ? Math.round(((step + 1) / totalSteps) * 100) : 0;

  function updateValue(name: string, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function clearSavedDraft() {
    window.localStorage.removeItem(draftKey);
    setRememberDraft(false);
  }

  async function generateCompletedPdf() {
    if (!templateBytes.current) return;
    setGenerating(true);
    setError("");

    try {
      const pdfDocument = await PDFDocument.load(templateBytes.current.slice(), { ignoreEncryption: true });
      const pdfForm = pdfDocument.getForm();

      fields.forEach((definition) => {
        const value = values[definition.name];
        try {
          const field = pdfForm.getField(definition.name);
          if (definition.kind === "text" && field instanceof PDFTextField) {
            field.setText(typeof value === "string" ? value : "");
          } else if (definition.kind === "checkbox" && field instanceof PDFCheckBox) {
            if (value === true) field.check();
            else field.uncheck();
          } else if (definition.kind === "dropdown" && field instanceof PDFDropdown) {
            if (typeof value === "string" && value) field.select(value);
          } else if (definition.kind === "radio" && field instanceof PDFRadioGroup) {
            if (typeof value === "string" && value) field.select(value);
          } else if (definition.kind === "option-list" && field instanceof PDFOptionList) {
            if (typeof value === "string" && value) field.select(value);
          }
        } catch (fieldError) {
          console.warn(`Could not populate official field ${definition.name}`, fieldError);
        }
      });

      try {
        pdfForm.updateFieldAppearances();
      } catch (appearanceError) {
        console.warn("The official form retained its existing field appearances.", appearanceError);
      }

      const completedBytes = await pdfDocument.save();
      const nextUrl = URL.createObjectURL(new Blob([completedBytes], { type: "application/pdf" }));
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return nextUrl;
      });
      window.setTimeout(() => document.getElementById("completed-form-preview")?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The completed PDF could not be generated.");
    } finally {
      setGenerating(false);
    }
  }

  function downloadCompletedPdf() {
    if (!previewUrl) return;
    const link = document.createElement("a");
    link.href = previewUrl;
    link.download = `${form.id.toUpperCase()}-completed.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <section className="abt-workspace" aria-label={`${form.formNumber} form preparation workspace`}>
      <div className="abt-mode-tabs" role="tablist" aria-label="Form completion options">
        <button
          type="button"
          className={mode === "guided" ? "is-active" : ""}
          onClick={() => setMode("guided")}
          disabled={!loading && fields.length === 0}
        >
          Guided Form Filler
        </button>
        <button
          type="button"
          className={mode === "viewer" ? "is-active" : ""}
          onClick={() => setMode("viewer")}
        >
          Official PDF Viewer
        </button>
      </div>

      <div className="abt-privacy-note">
        <strong>Private by design.</strong> Information entered in the guided form stays in this browser and is used locally to create the completed PDF. FLLM does not receive or store your answers.
      </div>

      {error && <div className="abt-form-error" role="alert">{error}</div>}

      {mode === "guided" ? (
        <div className="abt-guided-panel">
          {loading ? (
            <div className="abt-loading"><span /> Reading the current official PDF and preparing its fields…</div>
          ) : fields.length === 0 ? (
            <div className="abt-no-fields">
              <h2>This official PDF does not expose fillable fields to the guided tool.</h2>
              <p>Use the Official PDF Viewer tab to complete any available PDF fields and print or download the form without leaving FLLM.</p>
              <button className="btn btn-gold" type="button" onClick={() => setMode("viewer")}>Open Official PDF Viewer</button>
            </div>
          ) : (
            <>
              <div className="abt-progress-heading">
                <div>
                  <span>Step {step + 1} of {totalSteps}</span>
                  <h2>Complete the official form fields</h2>
                </div>
                <strong>{completion}%</strong>
              </div>
              <div className="abt-progress-track"><i style={{ width: `${completion}%` }} /></div>

              <div className="abt-field-grid">
                {visibleFields.map((field) => (
                  <label className={field.kind === "checkbox" ? "abt-field abt-checkbox-field" : "abt-field"} key={field.name}>
                    {field.kind === "checkbox" ? (
                      <>
                        <input
                          type="checkbox"
                          checked={values[field.name] === true}
                          onChange={(event) => updateValue(field.name, event.target.checked)}
                        />
                        <span><strong>{field.label}</strong><small>{field.name}</small></span>
                      </>
                    ) : (
                      <>
                        <span><strong>{field.label}</strong><small>{field.name}</small></span>
                        {field.kind === "text" ? (
                          <input
                            type={inputType(field)}
                            value={typeof values[field.name] === "string" ? values[field.name] as string : ""}
                            onChange={(event) => updateValue(field.name, event.target.value)}
                            autoComplete="off"
                          />
                        ) : (
                          <select
                            value={typeof values[field.name] === "string" ? values[field.name] as string : ""}
                            onChange={(event) => updateValue(field.name, event.target.value)}
                          >
                            <option value="">Select an option</option>
                            {field.options.map((option) => <option value={option} key={option}>{option}</option>)}
                          </select>
                        )}
                      </>
                    )}
                  </label>
                ))}
              </div>

              <div className="abt-draft-control">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberDraft}
                    onChange={(event) => {
                      setRememberDraft(event.target.checked);
                      if (!event.target.checked) window.localStorage.removeItem(draftKey);
                    }}
                  />
                  Save this draft on this device so I can continue later
                </label>
                {rememberDraft && <button type="button" onClick={clearSavedDraft}>Delete saved draft</button>}
              </div>

              <div className="abt-step-actions">
                <button className="btn btn-outline" type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Back</button>
                {step < totalSteps - 1 ? (
                  <button className="btn btn-gold" type="button" onClick={() => setStep((current) => Math.min(totalSteps - 1, current + 1))}>Continue</button>
                ) : (
                  <button className="btn btn-gold" type="button" onClick={() => void generateCompletedPdf()} disabled={generating}>
                    {generating ? "Generating…" : "Generate Completed Official PDF"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="abt-viewer-panel">
          <div className="abt-viewer-toolbar">
            <div><strong>Current official {form.formNumber}</strong><small>Last verified {form.lastVerified}</small></div>
            <div>
              <a className="btn btn-outline" href={officialPdfPath} target="_blank" rel="noreferrer">Open Full Page</a>
              <a className="btn btn-gold" href={`${officialPdfPath}?download=1`}>Download Blank Form</a>
            </div>
          </div>
          <iframe src={`${officialPdfPath}#toolbar=1&navpanes=0`} title={`Official ${form.formNumber} PDF`} />
          <p className="abt-viewer-help">Use the PDF toolbar to type into available official fields, print the form, or download a copy. The document remains displayed through Florida Liquor License Market.</p>
        </div>
      )}

      {previewUrl && (
        <div className="abt-completed-panel" id="completed-form-preview">
          <div className="abt-completed-heading">
            <div><span>Completed document</span><h2>Review, download, and print your official PDF</h2></div>
            <div>
              <button className="btn btn-outline" type="button" onClick={downloadCompletedPdf}>Download Completed PDF</button>
              <button className="btn btn-gold" type="button" onClick={() => window.open(previewUrl, "_blank", "noopener,noreferrer")}>Open &amp; Print</button>
            </div>
          </div>
          <iframe src={`${previewUrl}#toolbar=1`} title={`Completed ${form.formNumber} preview`} />
          <p>Before filing, review every page, add all required signatures and notarizations, and attach any fees or supporting documents required by DBPR/ABT.</p>
        </div>
      )}
    </section>
  );
}
