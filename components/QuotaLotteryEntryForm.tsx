"use client";

import { useEffect, useMemo, useState } from "react";

import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import {
  createAbt6033Pdf,
  type Abt6033Draft,
  type Abt6033InterestedPerson,
} from "@/lib/abt-6033-pdf";

type EntryDraft = Abt6033Draft;
type InterestedPerson = Abt6033InterestedPerson;
type MissingRequirement = { label: string; targetId: string };

const STORAGE_KEY = "fllm-quota-drawing-entry-2026-v2";

function uniqueId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function emptyInterestedPerson(): InterestedPerson {
  return { id: uniqueId(), lastName: "", firstName: "", middleName: "", dateOfBirth: "" };
}

const EMPTY_DRAFT: EntryDraft = {
  entryType: "individual",
  entrantName: "",
  county: "",
  mailingAddress: "",
  city: "",
  mailingCounty: "",
  state: "FL",
  zip: "",
  phone: "",
  phoneExtension: "",
  email: "",
  interestedPersons: [emptyInterestedPerson()],
  affirmation: false,
  mailingFeeIncluded: false,
};

function legacyNameParts(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts.at(0) ?? "",
    middleName: parts.length > 2 ? parts.slice(1, -1).join(" ") : "",
    lastName: parts.length > 1 ? parts.at(-1) ?? "" : "",
  };
}

function normalizeDraft(value: unknown, fallback: EntryDraft = EMPTY_DRAFT): EntryDraft {
  const input = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const people = Array.isArray(input.interestedPersons) ? input.interestedPersons : [];
  return {
    entryType: input.entryType === "business" ? "business" : "individual",
    entrantName: String(input.entrantName ?? fallback.entrantName ?? ""),
    county: String(input.county ?? fallback.county ?? ""),
    mailingAddress: String(input.mailingAddress ?? fallback.mailingAddress ?? ""),
    city: String(input.city ?? fallback.city ?? ""),
    mailingCounty: String(input.mailingCounty ?? fallback.mailingCounty ?? ""),
    state: String(input.state ?? fallback.state ?? "FL"),
    zip: String(input.zip ?? fallback.zip ?? ""),
    phone: String(input.phone ?? fallback.phone ?? ""),
    phoneExtension: String(input.phoneExtension ?? fallback.phoneExtension ?? ""),
    email: String(input.email ?? fallback.email ?? ""),
    interestedPersons: people.length
      ? people.slice(0, 4).map((raw) => {
          const person = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
          const legacy = legacyNameParts(String(person.name ?? ""));
          return {
            id: String(person.id ?? uniqueId()),
            lastName: String(person.lastName ?? legacy.lastName),
            firstName: String(person.firstName ?? legacy.firstName),
            middleName: String(person.middleName ?? legacy.middleName),
            dateOfBirth: String(person.dateOfBirth ?? ""),
          };
        })
      : fallback.interestedPersons.length ? fallback.interestedPersons : [emptyInterestedPerson()],
    affirmation: Boolean(input.affirmation ?? fallback.affirmation),
    mailingFeeIncluded: Boolean(input.mailingFeeIncluded ?? fallback.mailingFeeIncluded),
  };
}

function displayCounty(county: string) {
  return county === "Dade" ? "Miami-Dade" : county;
}

export default function QuotaLotteryEntryForm() {
  const [draft, setDraft] = useState<EntryDraft>(EMPTY_DRAFT);
  const [saveStatus, setSaveStatus] = useState("");
  const [error, setError] = useState("");
  const [restored, setRestored] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfFileName, setPdfFileName] = useState("");

  useEffect(() => {
    let active = true;
    let initial = EMPTY_DRAFT;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
        ?? window.localStorage.getItem("fllm-quota-drawing-entry-2026-v1");
      if (stored) initial = normalizeDraft(JSON.parse(stored));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem("fllm-quota-drawing-entry-2026-v1");
    }
    if (active) {
      setDraft(initial);
      setRestored(true);
    }
    return () => { active = false; };
  }, []);

  useEffect(() => {
    function handleCountySelection(event: Event) {
      const county = (event as CustomEvent<{ county?: string }>).detail?.county;
      if (!county || !QUOTA_DRAWING_2026.counties.some((item) => item.county === county)) return;
      setDraft((current) => ({ ...current, county }));
      setSaveStatus(`${displayCounty(county)} County selected. Complete the form to generate its ABT-6033.`);
      setPdfUrl((current) => { if (current) URL.revokeObjectURL(current); return ""; });
    }
    window.addEventListener("fllm:lottery-county-selected", handleCountySelection);
    return () => window.removeEventListener("fllm:lottery-county-selected", handleCountySelection);
  }, []);

  useEffect(() => () => { if (pdfUrl) URL.revokeObjectURL(pdfUrl); }, [pdfUrl]);

  const selectedCounty = useMemo(
    () => QUOTA_DRAWING_2026.counties.find((item) => item.county === draft.county) || null,
    [draft.county]
  );
  const validPeople = useMemo(() => draft.interestedPersons.filter((person) =>
    person.firstName.trim() && person.lastName.trim() && person.dateOfBirth
  ), [draft.interestedPersons]);

  const missingRequirements = useMemo(() => {
    const missing: MissingRequirement[] = [];
    if (!draft.entrantName.trim()) missing.push({ label: "entrant legal name in Section 1", targetId: "quota-entrant-name" });
    if (!draft.county) missing.push({ label: "drawing county in Section 1", targetId: "quota-drawing-county" });
    if (!draft.mailingAddress.trim()) missing.push({ label: "mailing address in Section 2", targetId: "quota-mailing-address" });
    if (!draft.city.trim()) missing.push({ label: "city in Section 2", targetId: "quota-city" });
    if (!draft.mailingCounty.trim()) missing.push({ label: "mailing county in Section 2", targetId: "quota-mailing-county" });
    if (!draft.state.trim()) missing.push({ label: "state in Section 2", targetId: "quota-state" });
    if (!draft.zip.trim()) missing.push({ label: "ZIP code in Section 2", targetId: "quota-zip" });
    if (!draft.phone.trim()) missing.push({ label: "phone number in Section 2", targetId: "quota-phone" });
    if (!draft.email.trim()) missing.push({ label: "email address in Section 2", targetId: "quota-email" });
    if (!validPeople.length) {
      const person = draft.interestedPersons[0];
      const targetId = !person?.lastName.trim()
        ? "quota-person-0-last-name"
        : !person.firstName.trim()
          ? "quota-person-0-first-name"
          : "quota-person-0-date-of-birth";
      missing.push({ label: "one complete interested person in Section 3", targetId });
    }
    if (!draft.affirmation) missing.push({ label: "official affirmation in Section 4", targetId: "quota-affirmation" });

    return missing;
  }, [draft, validPeople]);
  const requiredComplete = missingRequirements.length === 0;

  function focusFirstMissing() {
    const first = missingRequirements[0];
    if (!first) return;
    const control = document.getElementById(first.targetId);
    setError(`Please complete the ${first.label} before generating your populated ABT-6033.`);
    control?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => control?.focus({ preventScroll: true }), 450);
  }

  function handleGenerate() {
    if (!requiredComplete) {
      focusFirstMissing();
      return;
    }
    void perform("generate");
  }

  function update<K extends keyof EntryDraft>(key: K, value: EntryDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaveStatus("");
    setError("");
  }

  function updateInterestedPerson(id: string, key: keyof Omit<InterestedPerson, "id">, value: string) {
    setDraft((current) => ({
      ...current,
      interestedPersons: current.interestedPersons.map((person) =>
        person.id === id ? { ...person, [key]: value } : person
      ),
    }));
    setSaveStatus("");
  }

  function addInterestedPerson() {
    setDraft((current) => current.interestedPersons.length >= 4
      ? current
      : { ...current, interestedPersons: [...current.interestedPersons, emptyInterestedPerson()] });
  }

  function removeInterestedPerson(id: string) {
    setDraft((current) => {
      const next = current.interestedPersons.filter((person) => person.id !== id);
      return { ...current, interestedPersons: next.length ? next : [emptyInterestedPerson()] };
    });
  }

  function saveLocal() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }

  function clearDraft() {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem("fllm-quota-drawing-entry-2026-v1");
    setDraft({ ...EMPTY_DRAFT, interestedPersons: [emptyInterestedPerson()] });
    setPdfUrl((current) => { if (current) URL.revokeObjectURL(current); return ""; });
    setError("");
    setSaveStatus("Draft cleared.");
  }

  async function preparePdfOnDevice() {
    if (!requiredComplete) throw new Error(`Still required: ${missingRequirements.map((item) => item.label).join(", ")}.`);
    saveLocal();
    const templateResponse = await fetch("/abt-forms/abt-6033.pdf", { cache: "no-store" });
    if (!templateResponse.ok) throw new Error("The verified 2026 DBPR ABT-6033 template could not be loaded.");

    const bytes = await createAbt6033Pdf(await templateResponse.arrayBuffer(), draft);
    const fileName = `ABT-6033-2026-${displayCounty(draft.county).replace(/[^a-z0-9]+/gi, "-")}-prepared.pdf`;
    const nextUrl = URL.createObjectURL(new Blob([new Uint8Array(bytes).buffer], { type: "application/pdf" }));
    setPdfUrl((current) => { if (current) URL.revokeObjectURL(current); return nextUrl; });
    setPdfFileName(fileName);
  }

  async function perform(action: "save" | "generate") {
    setBusy(true);
    setError("");
    try {
      if (action === "save") {
        saveLocal();
        setSaveStatus("Saved on this device. Use Clear when finished, especially on a shared device.");
      } else {
        await preparePdfOnDevice();
        setSaveStatus("Your populated ABT-6033 was generated in this browser session. Download it before leaving this page.");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The lottery entry could not be prepared.");
    } finally {
      setBusy(false);
    }
  }

  function requestAction(action: "save" | "generate") {
    void perform(action);
  }

  function continueToDbpr() {
    const href = draft.entryType === "business" ? QUOTA_DRAWING_2026.businessEntryUrl : QUOTA_DRAWING_2026.individualEntryUrl;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="quota-native-form" aria-label="FLLM quota drawing entry preparation form">
      <div className="quota-native-form-head">
        <div><span>2026 FLLM Entry Preparation</span><h3>Populate your official ABT-6033</h3><p>Enter the information once, save a recovery draft on this device, and generate a county-specific copy of the current DBPR form.</p></div>
        <div className="quota-native-form-badge"><strong>ABT-6033</strong><span>Device-only PDF tool</span></div>
      </div>

      <div className="quota-native-form-disclosure" role="note">
        <div><strong>One entry. One potential license.</strong><span>This prepares one entry for a chance to receive one quota license in the selected county—not every license available there.</span></div>
        <div><strong>The $100 fee is paid only to DBPR.</strong><span>FLLM never collects the lottery fee and cannot submit payment for you. You finish and pay through the official DBPR process.</span></div>
      </div>

      <div className="quota-account-state quota-device-storage-note" role="note">
        <div><strong>Private, device-only preparation</strong><span>Your recovery draft stays in this browser and is not sent to FLLM account storage. The populated PDF is generated on this device.</span><small>Do not use this tool on a public or shared device unless you press Clear and remove downloaded copies when finished.</small></div>
        <div><a href="#lottery-privacy">Privacy &amp; device storage</a></div>
      </div>

      <details className="quota-privacy-disclosure" id="lottery-privacy" open>
        <summary>How FLLM handles the information entered here</summary>
        <div>
          <p>The name, address, contact information, date of birth and signature information entered in this workspace remain in this browser while you prepare the form. FLLM does not transmit this draft to its account service or to DBPR.</p>
          <ul>
            <li><strong>Save on This Device</strong> stores the form draft in this browser so it can be restored later on the same device.</li>
            <li>The populated ABT-6033 is created in your browser. You decide whether to download, print or submit it.</li>
            <li><strong>Clear</strong> removes the locally saved draft and clears the signature from this page. It cannot remove PDF copies you already downloaded or printed.</li>
            <li>FLLM does not submit the entry, receive the $100 fee or send the information to DBPR.</li>
          </ul>
        </div>
      </details>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title"><span>1</span><div><strong>Entry type and county</strong><small>Choose one entrant type and one eligible county.</small></div></div>
        <div className="quota-entry-type" role="radiogroup" aria-label="Entry type">
          <label className={draft.entryType === "individual" ? "is-selected" : ""}><input type="radio" name="entryType" checked={draft.entryType === "individual"} onChange={() => update("entryType", "individual")} /><span><strong>Individual</strong><small>Enter in your own name</small></span></label>
          <label className={draft.entryType === "business" ? "is-selected" : ""}><input type="radio" name="entryType" checked={draft.entryType === "business"} onChange={() => update("entryType", "business")} /><span><strong>Business</strong><small>Enter through a legal business entity</small></span></label>
        </div>
        <div className="quota-native-grid quota-native-grid-two">
          <label><span>{draft.entryType === "business" ? "Business / entity name" : "Entrant full legal name"}</span><input id="quota-entrant-name" value={draft.entrantName} onChange={(event) => update("entrantName", event.target.value)} autoComplete="name" /></label>
          <label><span>2026 drawing county</span><select id="quota-drawing-county" value={draft.county} onChange={(event) => update("county", event.target.value)}><option value="">Select an eligible county</option>{QUOTA_DRAWING_2026.counties.map((item) => <option key={item.county} value={item.county}>{displayCounty(item.county)} County — {item.licenses} license{item.licenses === 1 ? "" : "s"}</option>)}</select></label>
        </div>
        {selectedCounty && <div className="quota-county-confirmation"><span>2026 DBPR availability</span><strong>{displayCounty(selectedCounty.county)} County: {selectedCounty.licenses} quota license{selectedCounty.licenses === 1 ? "" : "s"} available; this form is one entry for one potential license.</strong></div>}
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title"><span>2</span><div><strong>Mailing and contact information</strong><small>These fields match Section 3 of ABT-6033.</small></div></div>
        <div className="quota-native-grid quota-native-grid-two">
          <label className="quota-grid-wide"><span>Mailing address</span><input id="quota-mailing-address" value={draft.mailingAddress} onChange={(event) => update("mailingAddress", event.target.value)} autoComplete="street-address" /></label>
          <label><span>City</span><input id="quota-city" value={draft.city} onChange={(event) => update("city", event.target.value)} autoComplete="address-level2" /></label>
          <label><span>Mailing county</span><input id="quota-mailing-county" value={draft.mailingCounty} onChange={(event) => update("mailingCounty", event.target.value)} /></label>
          <div className="quota-native-grid quota-native-grid-state"><label><span>State</span><input id="quota-state" value={draft.state} onChange={(event) => update("state", event.target.value.toUpperCase().slice(0, 2))} autoComplete="address-level1" /></label><label><span>ZIP</span><input id="quota-zip" value={draft.zip} onChange={(event) => update("zip", event.target.value)} inputMode="numeric" autoComplete="postal-code" /></label></div>
          <div className="quota-native-grid quota-native-grid-phone"><label><span>Phone</span><input id="quota-phone" value={draft.phone} onChange={(event) => update("phone", event.target.value)} type="tel" autoComplete="tel" /></label><label><span>Extension</span><input value={draft.phoneExtension} onChange={(event) => update("phoneExtension", event.target.value)} /></label></div>
          <label className="quota-grid-wide"><span>Email</span><input id="quota-email" value={draft.email} onChange={(event) => update("email", event.target.value)} type="email" autoComplete="email" /></label>
        </div>
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title quota-form-section-title-actions"><span>3</span><div><strong>Interested persons</strong><small>Enter the separate last, first and middle names and date of birth exactly as Section 4 requests. Maximum four on this form.</small></div><button type="button" onClick={addInterestedPerson} disabled={draft.interestedPersons.length >= 4}>+ Add Person</button></div>
        <div className="quota-interested-list">
          {draft.interestedPersons.map((person, index) => (
            <div className="quota-interested-row" key={person.id}><strong>Person {index + 1}</strong><label><span>Last name</span><input id={`quota-person-${index}-last-name`} value={person.lastName} onChange={(event) => updateInterestedPerson(person.id, "lastName", event.target.value)} /></label><label><span>First name</span><input id={`quota-person-${index}-first-name`} value={person.firstName} onChange={(event) => updateInterestedPerson(person.id, "firstName", event.target.value)} /></label><label><span>Middle name</span><input value={person.middleName} onChange={(event) => updateInterestedPerson(person.id, "middleName", event.target.value)} /></label><label><span>Date of birth</span><input id={`quota-person-${index}-date-of-birth`} type="date" value={person.dateOfBirth} onChange={(event) => updateInterestedPerson(person.id, "dateOfBirth", event.target.value)} /></label><button type="button" onClick={() => removeInterestedPerson(person.id)} aria-label={`Remove person ${index + 1}`}>Remove</button></div>
          ))}
        </div>
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title"><span>4</span><div><strong>Review the official affirmation</strong><small>Review Section 5 in the official ABT-6033 before signing.</small></div></div>
        <label className="quota-affirmation"><input id="quota-affirmation" type="checkbox" checked={draft.affirmation} onChange={(event) => update("affirmation", event.target.checked)} /><span>I reviewed the official Section 5 affirmations and understand that my final signed entry must be truthful, complete, submitted to DBPR on time, and accompanied by the $100 DBPR entry fee.</span></label>
        <div className="quota-pdf-checklist" aria-labelledby="quota-pdf-checklist-title">
          <div><strong id="quota-pdf-checklist-title">Page 1 PDF checklist</strong><span>These choices control the two large checklist boxes on the printable ABT-6033.</span></div>
          <label>
            <input type="checkbox" checked={false} readOnly disabled />
            <span><strong>Entry Form DBPR ABT-6033</strong><small>Will remain blank. Sign the printed form with wet ink, then check this box by hand.</small></span>
          </label>
          <label>
            <input type="checkbox" checked={draft.mailingFeeIncluded} onChange={(event) => update("mailingFeeIncluded", event.target.checked)} />
            <span><strong>Entry Fee</strong><small>Mark this in the PDF only if you will include a $100 check or money order payable to the Division of Alcoholic Beverages and Tobacco with the mailed form.</small></span>
          </label>
        </div>
      </div>

      <div className="quota-form-section-block quota-signature-section">
        <div className="quota-form-section-title"><span>5</span><div><strong>Choose how to sign</strong><small>Wet ink is the required method in this tool unless DBPR confirms another method in writing.</small></div></div>
        <div className="quota-signature-methods" role="radiogroup" aria-label="Signature method">
          <label className="is-selected"><input type="radio" name="signatureMode" checked readOnly /><span><strong>Print and sign with wet ink</strong><small>The generated form leaves signature lines blank.</small></span></label>
          <label className="is-disabled"><input type="radio" name="signatureMode" checked={false} readOnly disabled aria-describedby="quota-electronic-signature-policy" /><span><strong>Type my signature</strong><small>Unavailable pending written DBPR confirmation.</small></span></label>
          <label className="is-disabled"><input type="radio" name="signatureMode" checked={false} readOnly disabled aria-describedby="quota-electronic-signature-policy" /><span><strong>Draw my signature</strong><small>Unavailable pending written DBPR confirmation.</small></span></label>
        </div>
        <p className="quota-signature-policy" id="quota-electronic-signature-policy">For the safest submission, FLLM currently generates a form with blank signature lines for wet-ink signing. Typed and drawn electronic signatures will remain disabled unless DBPR confirms in writing that it accepts them on this generated form.</p>
      </div>

      <div className="quota-form-footer">
        <div><button className="quota-save-draft" type="button" onClick={() => requestAction("save")} disabled={busy}>{busy ? "Working…" : "Save on This Device"}</button><button className="quota-clear-draft" type="button" onClick={clearDraft} disabled={busy}>Clear</button>{restored && saveStatus && <span role="status">{saveStatus}</span>}</div>
        <button className="quota-dbpr-handoff" type="button" onClick={handleGenerate} disabled={busy}>{busy ? "Preparing…" : "Generate My Populated ABT-6033"}</button>
      </div>
      {!requiredComplete && <div className="quota-form-required-note"><p><strong>Still required:</strong> {missingRequirements.map((item) => item.label).join(", ")}.</p><button type="button" onClick={focusFirstMissing}>Go to first missing field</button></div>}
      {error && <p className="quota-form-error" role="alert">{error}</p>}

      {pdfUrl && (
        <section className="quota-pdf-result" aria-live="polite">
          <div><span>Prepared PDF ready</span><h4>Review every page before submitting</h4><p>Your populated form was created in this browser session and is not stored by FLLM. <strong>Download it before leaving this page.</strong> FLLM has not submitted it and has not collected the $100 DBPR fee.</p></div>
          <iframe src={pdfUrl} title="Prepared ABT-6033 preview" />
          <div className="quota-pdf-actions"><a href={pdfUrl} download={pdfFileName}>Download ABT-6033</a><button type="button" onClick={() => window.open(pdfUrl, "_blank", "noopener,noreferrer")}>Open to Print</button><button type="button" onClick={continueToDbpr}>Start Official DBPR Online Entry <span aria-hidden="true">↗</span></button></div>
          <small>DBPR requires you to sign in or create a DBPR account, complete its online entry, and pay the $100 fee at DBPR&apos;s final payment step. DBPR does not provide a public link that skips directly to payment, and your FLLM-prepared PDF will not automatically populate DBPR&apos;s online system.</small>
        </section>
      )}

    </div>
  );
}
