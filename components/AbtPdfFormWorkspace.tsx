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

import { getFriendlyAbtFieldLabel } from "@/data/abt-form-field-labels";
import {
  ABT_LICENSE_SERIES_OPTIONS,
  getAbtLicenseClassOptions,
  getAbtLicenseSeriesOption,
  getAbtLicenseSeriesOptionBySeriesAndClass,
  getDefaultAbtLicenseSeriesKey,
} from "@/data/abt-license-series-options";
import type { AbtFormDefinition } from "@/data/abt-forms";

type FieldKind = "text" | "checkbox" | "dropdown" | "radio" | "option-list" | "license-series" | "license-class";

type FormFieldDefinition = {
  name: string;
  label: string;
  kind: FieldKind;
  options: string[];
  originalIndex: number;
};

type DraftValues = Record<string, string | boolean>;

type InitialsConsent = {
  initials: string;
  acceptedAt: string;
  disclosureVersion: 1;
};

type PendingInitialsAction = "viewer" | "field" | null;

const INITIALS_CONSENT_KEY = "fllm-abt-electronic-initials-consent-v1";
const INITIALS_FORM_IDS = new Set(["abt-6001", "abt-6002", "abt-6027"]);

type PdfStringLike = {
  decodeText?: () => string;
};

type InternalAcroField = {
  getAlternateName?: () => PdfStringLike | string | undefined;
  getMappingName?: () => PdfStringLike | string | undefined;
  getPartialName?: () => PdfStringLike | string | undefined;
  getOnValue?: () => PdfStringLike | string | undefined;
};

const FIELDS_PER_STEP = 10;

function decodePdfLabel(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (!value || typeof value !== "object") return "";

  const decoder = (value as PdfStringLike).decodeText;
  if (typeof decoder !== "function") return "";

  try {
    return decoder.call(value).trim();
  } catch {
    return "";
  }
}

function internalLabelCandidates(field: unknown) {
  const acroField = (field as { acroField?: InternalAcroField }).acroField;
  if (!acroField) return [];

  const candidates: string[] = [];
  const methods: Array<keyof InternalAcroField> = [
    "getAlternateName",
    "getMappingName",
    "getPartialName",
    "getOnValue",
  ];

  methods.forEach((methodName) => {
    const method = acroField[methodName];
    if (typeof method !== "function") return;

    try {
      const decoded = decodePdfLabel(method.call(acroField));
      if (decoded) candidates.push(decoded);
    } catch {
      // Some official PDFs expose incomplete internal metadata.
    }
  });

  return candidates;
}

function isUnhelpfulFieldLabel(value: string) {
  const normalized = value
    .replace(/\[[0-9]+\]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return true;

  return /^(undefined|untitled|unknown|null|none|n\/a|yes|on|off|text|field|checkbox|check|radio|dropdown|choice)(?:\s*\d+)?$/i.test(
    normalized
  );
}

function humanizeFieldLabel(value: string) {
  const finalPart = value.split(/[.>]/).filter(Boolean).at(-1) || value;
  return finalPart
    .replace(/\[[0-9]+\]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function resolveFieldLabel(field: unknown, name: string) {
  const candidates = [...internalLabelCandidates(field), name];

  for (const candidate of candidates) {
    const decoded = decodePdfLabel(candidate);
    if (!decoded || isUnhelpfulFieldLabel(decoded)) continue;

    const humanized = humanizeFieldLabel(decoded);
    if (humanized && !isUnhelpfulFieldLabel(humanized)) return humanized;
  }

  return null;
}

function normalizedLabel(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isLicenseSeriesField(label: string) {
  return normalizedLabel(label) === "license series requested";
}

function isTypeClassField(label: string) {
  return normalizedLabel(label) === "type class requested";
}

function isApplicantInitialsField(field: FormFieldDefinition) {
  const value = normalizedLabel(`${field.name} ${field.label}`);
  return value.includes("applicant initials") || value.includes("applicants initials");
}

function normalizeInitials(value: string) {
  return value.replace(/[^a-z.-]/gi, "").toUpperCase().slice(0, 10);
}

function readInitialsConsent(): InitialsConsent | null {
  try {
    const stored = window.sessionStorage.getItem(INITIALS_CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<InitialsConsent>;
    const initials = typeof parsed.initials === "string" ? normalizeInitials(parsed.initials) : "";
    if (!initials || !/[A-Z]/.test(initials) || parsed.disclosureVersion !== 1) return null;
    return {
      initials,
      acceptedAt: typeof parsed.acceptedAt === "string" ? parsed.acceptedAt : "",
      disclosureVersion: 1,
    };
  } catch {
    window.sessionStorage.removeItem(INITIALS_CONSENT_KEY);
    return null;
  }
}

function inputType(field: FormFieldDefinition) {
  const value = `${field.name} ${field.label}`.toLowerCase();
  if (value.includes("email")) return "email";
  if (value.includes("telephone") || value.includes("phone")) return "tel";
  return "text";
}

function friendlyOptionLabel(option: string) {
  const cleaned = option
    .replace(/^\//, "")
    .replace(/[_-]\d+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (/^yes$/i.test(cleaned)) return "Yes";
  if (/^no$/i.test(cleaned)) return "No";
  return humanizeFieldLabel(cleaned || option);
}

function extractFields(pdfDocument: PDFDocument, formId: string) {
  const pdfForm = pdfDocument.getForm();
  const initialValues: DraftValues = {};
  const definitions: FormFieldDefinition[] = [];
  let skippedFieldCount = 0;

  pdfForm.getFields().forEach((field, index) => {
    const name = field.getName();
    const resolvedLabel = resolveFieldLabel(field, name);
    const label = getFriendlyAbtFieldLabel(formId, resolvedLabel || name);

    if (!label || (!resolvedLabel && isUnhelpfulFieldLabel(label))) {
      skippedFieldCount += 1;
      return;
    }

    if (field instanceof PDFTextField) {
      if (isLicenseSeriesField(label)) {
        definitions.push({
          name,
          label,
          kind: "license-series",
          options: ABT_LICENSE_SERIES_OPTIONS.map((option) => option.key),
          originalIndex: index,
        });
        initialValues[name] = getDefaultAbtLicenseSeriesKey(field.getText() || "");
      } else if (isTypeClassField(label)) {
        definitions.push({ name, label, kind: "license-class", options: [], originalIndex: index });
        initialValues[name] = field.getText() || "";
      } else {
        definitions.push({ name, label, kind: "text", options: [], originalIndex: index });
        initialValues[name] = field.getText() || "";
      }
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

  const licenseSeriesField = definitions.find((field) => field.kind === "license-series");
  const typeClassField = definitions.find((field) => isTypeClassField(field.label));

  if (licenseSeriesField && typeClassField) {
    const seriesKey = initialValues[licenseSeriesField.name];
    const currentOption = typeof seriesKey === "string" ? getAbtLicenseSeriesOption(seriesKey) : null;
    const typeClassValue = initialValues[typeClassField.name];

    if (currentOption && (typeof typeClassValue !== "string" || !typeClassValue.trim())) {
      initialValues[typeClassField.name] = currentOption.classCode;
    }
  }

  return { definitions, initialValues, skippedFieldCount };
}

function licenseSeriesGroups() {
  return ABT_LICENSE_SERIES_OPTIONS.reduce<Array<{ name: string; options: typeof ABT_LICENSE_SERIES_OPTIONS }>>(
    (groups, option) => {
      const existing = groups.find((group) => group.name === option.group);
      if (existing) {
        existing.options.push(option);
      } else {
        groups.push({ name: option.group, options: [option] });
      }
      return groups;
    },
    []
  );
}

export default function AbtPdfFormWorkspace({ form }: { form: AbtFormDefinition }) {
  const officialPdfPath = `/api/abt-forms/${form.id}/pdf`;
  const draftKey = `fllm-abt-form-draft:${form.id}`;
  const requiresInitialsConsent = INITIALS_FORM_IDS.has(form.id);
  const templateBytes = useRef<Uint8Array | null>(null);
  const [mode, setMode] = useState<"guided" | "viewer">("guided");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<FormFieldDefinition[]>([]);
  const [skippedFieldCount, setSkippedFieldCount] = useState(0);
  const [values, setValues] = useState<DraftValues>({});
  const [step, setStep] = useState(0);
  const [rememberDraft, setRememberDraft] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [initialsConsent, setInitialsConsent] = useState<InitialsConsent | null>(null);
  const [initialsModalOpen, setInitialsModalOpen] = useState(false);
  const [initialsDraft, setInitialsDraft] = useState("");
  const [initialsAgreement, setInitialsAgreement] = useState(false);
  const [pendingInitialsAction, setPendingInitialsAction] = useState<PendingInitialsAction>(null);

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
        const extracted = extractFields(pdfDocument, form.id);
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

        if (requiresInitialsConsent) {
          const storedConsent = readInitialsConsent();
          setInitialsConsent(storedConsent);
          extracted.definitions.filter(isApplicantInitialsField).forEach((field) => {
            nextValues[field.name] = storedConsent?.initials || "";
          });
        }

        setStep(0);
        setFields(extracted.definitions);
        setSkippedFieldCount(extracted.skippedFieldCount);
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
  }, [draftKey, form.id, officialPdfPath, requiresInitialsConsent]);

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
  const groupedLicenseSeries = useMemo(() => licenseSeriesGroups(), []);
  const licenseSeriesField = fields.find((field) => field.kind === "license-series");
  const selectedSeriesKey = licenseSeriesField && typeof values[licenseSeriesField.name] === "string"
    ? values[licenseSeriesField.name] as string
    : "";
  const typeClassOptions = useMemo(
    () => getAbtLicenseClassOptions(selectedSeriesKey),
    [selectedSeriesKey]
  );
  const completion = fields.length ? Math.round(((step + 1) / totalSteps) * 100) : 0;

  function updateValue(name: string, value: string | boolean) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function applyInitialsToFields(initials: string) {
    setValues((current) => {
      const next = { ...current };
      fields.filter(isApplicantInitialsField).forEach((field) => {
        next[field.name] = initials;
      });
      return next;
    });
  }

  function openInitialsDisclosure(action: PendingInitialsAction) {
    setPendingInitialsAction(action);
    setInitialsDraft(initialsConsent?.initials || "");
    setInitialsAgreement(false);
    setInitialsModalOpen(true);
  }

  function requestViewer() {
    if (requiresInitialsConsent && !initialsConsent) {
      openInitialsDisclosure("viewer");
      return;
    }
    setMode("viewer");
  }

  function closeInitialsDisclosure() {
    setInitialsModalOpen(false);
    setPendingInitialsAction(null);
    setInitialsAgreement(false);
  }

  function acceptInitialsDisclosure() {
    const initials = normalizeInitials(initialsDraft);
    if (!initials || !/[A-Z]/.test(initials) || !initialsAgreement) return;

    const consent: InitialsConsent = {
      initials,
      acceptedAt: new Date().toISOString(),
      disclosureVersion: 1,
    };
    window.sessionStorage.setItem(INITIALS_CONSENT_KEY, JSON.stringify(consent));
    setInitialsConsent(consent);
    applyInitialsToFields(initials);
    setInitialsModalOpen(false);
    setInitialsAgreement(false);

    if (pendingInitialsAction === "viewer") setMode("viewer");
    setPendingInitialsAction(null);
  }

  function updateLicenseSeries(name: string, key: string) {
    const selected = getAbtLicenseSeriesOption(key);
    const typeClassField = fields.find((field) => isTypeClassField(field.label));

    setValues((current) => {
      const next: DraftValues = { ...current, [name]: key };
      if (selected && typeClassField) next[typeClassField.name] = selected.classCode;
      return next;
    });
  }

  function updateLicenseClass(name: string, classCode: string) {
    const seriesField = fields.find((field) => field.kind === "license-series");

    setValues((current) => {
      const next: DraftValues = { ...current, [name]: classCode };
      if (!seriesField) return next;

      const currentKey = typeof current[seriesField.name] === "string" ? current[seriesField.name] as string : "";
      const currentSeries = getAbtLicenseSeriesOption(currentKey)?.series || "";
      const matchingSeries = getAbtLicenseSeriesOptionBySeriesAndClass(currentSeries, classCode);
      if (matchingSeries) next[seriesField.name] = matchingSeries.key;
      return next;
    });
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
          if (definition.kind === "license-series" && field instanceof PDFTextField) {
            const selected = typeof value === "string" ? getAbtLicenseSeriesOption(value) : null;
            field.setText(selected?.series || "");
          } else if ((definition.kind === "text" || definition.kind === "license-class") && field instanceof PDFTextField) {
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
      const completedBuffer = Uint8Array.from(completedBytes).buffer;
      const nextUrl = URL.createObjectURL(new Blob([completedBuffer], { type: "application/pdf" }));
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
          onClick={requestViewer}
        >
          Official PDF Viewer
        </button>
      </div>

      <div className="abt-privacy-note">
        <span><strong>Private by design.</strong> Information entered in the guided form stays in this browser and is used locally to create the completed PDF. FLLM does not receive or store your answers.</span>
        {requiresInitialsConsent && initialsConsent && (
          <span className="abt-initials-status">
            Electronic initials: <strong>{initialsConsent.initials}</strong>
            <button type="button" onClick={() => openInitialsDisclosure("field")}>Change initials</button>
          </span>
        )}
      </div>

      {error && <div className="abt-form-error" role="alert">{error}</div>}

      {mode === "guided" ? (
        <div className="abt-guided-panel">
          {loading ? (
            <div className="abt-loading"><span /> Reading the current official PDF and preparing its fields…</div>
          ) : fields.length === 0 ? (
            <div className="abt-no-fields">
              <h2>This official PDF does not expose clearly labeled fillable fields to the guided tool.</h2>
              <p>Use the Official PDF Viewer tab to complete available PDF fields and print or download the form without leaving FLLM.</p>
              <button className="btn btn-gold" type="button" onClick={requestViewer}>Open Official PDF Viewer</button>
            </div>
          ) : (
            <>
              <div className="abt-progress-heading">
                <div>
                  <span>Step {step + 1} of {totalSteps}</span>
                  <h2>Complete every available official form field</h2>
                </div>
                <strong>{completion}%</strong>
              </div>
              <div className="abt-progress-track"><i style={{ width: `${completion}%` }} /></div>

              {skippedFieldCount > 0 && (
                <p className="abt-viewer-help">
                  Unlabeled internal PDF controls are intentionally hidden rather than shown as “Undefined.” Review the generated PDF and use the Official PDF Viewer for any remaining selections before filing.
                </p>
              )}

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
                        <span><strong>{field.label}</strong></span>
                      </>
                    ) : (
                      <>
                        <span><strong>{field.label}</strong></span>
                        {field.kind === "license-series" ? (
                          <select
                            value={typeof values[field.name] === "string" ? values[field.name] as string : ""}
                            onChange={(event) => updateLicenseSeries(field.name, event.target.value)}
                          >
                            <option value="">Select a Florida alcoholic-beverage license type</option>
                            {groupedLicenseSeries.map((group) => (
                              <optgroup label={group.name} key={group.name}>
                                {group.options.map((option) => (
                                  <option value={option.key} key={option.key}>{option.label}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        ) : field.kind === "license-class" ? (
                          <select
                            value={typeof values[field.name] === "string" ? values[field.name] as string : ""}
                            onChange={(event) => updateLicenseClass(field.name, event.target.value)}
                            disabled={!selectedSeriesKey}
                          >
                            <option value="">
                              {selectedSeriesKey ? "Select a valid type/class" : "Select a license series first"}
                            </option>
                            {typeClassOptions.map((option) => (
                              <option value={option.classCode} key={option.classCode}>{option.label}</option>
                            ))}
                          </select>
                        ) : field.kind === "text" ? (
                          <input
                            type={inputType(field)}
                            value={typeof values[field.name] === "string" ? values[field.name] as string : ""}
                            onFocus={() => {
                              if (isApplicantInitialsField(field) && !initialsConsent) {
                                openInitialsDisclosure("field");
                              }
                            }}
                            onChange={(event) => {
                              if (isApplicantInitialsField(field) && !initialsConsent) return;
                              updateValue(field.name, isApplicantInitialsField(field)
                                ? normalizeInitials(event.target.value)
                                : event.target.value);
                            }}
                            readOnly={isApplicantInitialsField(field) && !initialsConsent}
                            maxLength={isApplicantInitialsField(field) ? 10 : undefined}
                            autoComplete="off"
                          />
                        ) : (
                          <select
                            value={typeof values[field.name] === "string" ? values[field.name] as string : ""}
                            onChange={(event) => updateValue(field.name, event.target.value)}
                          >
                            <option value="">Select an option</option>
                            {field.options.map((option) => <option value={option} key={option}>{friendlyOptionLabel(option)}</option>)}
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

      {initialsModalOpen && (
        <div className="abt-initials-modal-backdrop" onMouseDown={closeInitialsDisclosure}>
          <section
            className="abt-initials-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="abt-initials-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <span className="abt-initials-kicker">Electronic initials disclosure</span>
            <h2 id="abt-initials-modal-title">Consent to use electronic initials</h2>
            <p>
              Before entering initials on this form, confirm that you are adopting them as your own electronic initials.
            </p>
            <ul>
              <li>I am the applicant or an authorized signer and will not initial for another person.</li>
              <li>I adopt the initials shown below as my electronic initials and intend them to have the same force and effect as handwritten initials to the extent permitted by applicable law.</li>
              <li>I consent to complete this portion of the form electronically.</li>
              <li>I can review, save, and print the completed PDF before filing.</li>
              <li>I understand that signatures, notarizations, supporting documents, and DBPR/ABT filing requirements remain separate, and DBPR/ABT determines whether a submission is accepted.</li>
            </ul>

            <label className="abt-initials-entry">
              <span>Your initials</span>
              <input
                type="text"
                value={initialsDraft}
                onChange={(event) => setInitialsDraft(normalizeInitials(event.target.value))}
                placeholder="Example: JW or J.W."
                maxLength={10}
                autoFocus
                autoComplete="off"
              />
            </label>

            <label className="abt-initials-agreement">
              <input
                type="checkbox"
                checked={initialsAgreement}
                onChange={(event) => setInitialsAgreement(event.target.checked)}
              />
              <span>I have read and agree to the electronic-initials disclosure.</span>
            </label>

            <p className="abt-initials-legal-note">
              Florida law generally recognizes electronic signatures, but specific filing requirements may still apply. Review{" "}
              <a href="https://leg.state.fl.us/statutes/index.cfm/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699%2F0668%2FSections%2F0668.004.html" target="_blank" rel="noreferrer">Florida Statute 668.004</a>
              {" "}and{" "}
              <a href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699%2F0668%2FSections%2F0668.50.html" target="_blank" rel="noreferrer">Florida Statute 668.50</a>.
            </p>

            <div className="abt-initials-modal-actions">
              <button className="btn btn-outline" type="button" onClick={closeInitialsDisclosure}>Cancel</button>
              <button
                className="btn btn-gold"
                type="button"
                onClick={acceptInitialsDisclosure}
                disabled={!initialsAgreement || !/[A-Z]/.test(normalizeInitials(initialsDraft))}
              >
                I agree and use these initials
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
