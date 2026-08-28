"use client";

import { useEffect, useMemo, useState } from "react";

import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";

type InterestedPerson = {
  id: string;
  name: string;
  dateOfBirth: string;
};

type EntryDraft = {
  entryType: "individual" | "business";
  entrantName: string;
  county: string;
  mailingAddress: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  interestedPersons: InterestedPerson[];
  affirmation: boolean;
};

const STORAGE_KEY = "fllm-quota-drawing-entry-2026-v1";

function emptyInterestedPerson(): InterestedPerson {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`,
    name: "",
    dateOfBirth: "",
  };
}

const EMPTY_DRAFT: EntryDraft = {
  entryType: "individual",
  entrantName: "",
  county: "",
  mailingAddress: "",
  city: "",
  state: "FL",
  zip: "",
  phone: "",
  email: "",
  interestedPersons: [emptyInterestedPerson()],
  affirmation: false,
};

export default function QuotaLotteryEntryForm() {
  const [draft, setDraft] = useState<EntryDraft>(EMPTY_DRAFT);
  const [saveStatus, setSaveStatus] = useState("");
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<EntryDraft>;
        setDraft({
          ...EMPTY_DRAFT,
          ...parsed,
          entryType: parsed.entryType === "business" ? "business" : "individual",
          interestedPersons: Array.isArray(parsed.interestedPersons) && parsed.interestedPersons.length
            ? parsed.interestedPersons.map((person) => ({
                id: person.id || emptyInterestedPerson().id,
                name: person.name || "",
                dateOfBirth: person.dateOfBirth || "",
              }))
            : [emptyInterestedPerson()],
          affirmation: Boolean(parsed.affirmation),
        });
        setSaveStatus("Saved draft restored from this device.");
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setRestored(true);
    }
  }, []);

  useEffect(() => {
    function handleCountySelection(event: Event) {
      const county = (event as CustomEvent<{ county?: string }>).detail?.county;
      if (!county || !QUOTA_DRAWING_2026.counties.some((item) => item.county === county)) return;
      setDraft((current) => ({ ...current, county }));
      setSaveStatus(`${county === "Dade" ? "Miami-Dade" : county} County selected from the map.`);
    }

    window.addEventListener("fllm:lottery-county-selected", handleCountySelection);
    return () => window.removeEventListener("fllm:lottery-county-selected", handleCountySelection);
  }, []);

  const selectedCounty = useMemo(
    () => QUOTA_DRAWING_2026.counties.find((item) => item.county === draft.county) || null,
    [draft.county]
  );

  const requiredComplete = Boolean(
    draft.entrantName.trim()
      && draft.county
      && draft.mailingAddress.trim()
      && draft.city.trim()
      && draft.state.trim()
      && draft.zip.trim()
      && draft.phone.trim()
      && draft.email.trim()
      && draft.affirmation
  );

  function update<K extends keyof EntryDraft>(key: K, value: EntryDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaveStatus("");
  }

  function updateInterestedPerson(id: string, key: "name" | "dateOfBirth", value: string) {
    setDraft((current) => ({
      ...current,
      interestedPersons: current.interestedPersons.map((person) =>
        person.id === id ? { ...person, [key]: value } : person
      ),
    }));
    setSaveStatus("");
  }

  function addInterestedPerson() {
    setDraft((current) => ({
      ...current,
      interestedPersons: [...current.interestedPersons, emptyInterestedPerson()],
    }));
  }

  function removeInterestedPerson(id: string) {
    setDraft((current) => {
      const next = current.interestedPersons.filter((person) => person.id !== id);
      return { ...current, interestedPersons: next.length ? next : [emptyInterestedPerson()] };
    });
  }

  function saveDraft() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setSaveStatus("Draft saved on this device.");
  }

  function clearDraft() {
    window.localStorage.removeItem(STORAGE_KEY);
    setDraft({ ...EMPTY_DRAFT, interestedPersons: [emptyInterestedPerson()] });
    setSaveStatus("Draft cleared.");
  }

  function continueToDbpr() {
    saveDraft();
    const href = draft.entryType === "business"
      ? QUOTA_DRAWING_2026.businessEntryUrl
      : QUOTA_DRAWING_2026.individualEntryUrl;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="quota-native-form" aria-label="FLLM quota drawing entry preparation form">
      <div className="quota-native-form-head">
        <div>
          <span>2026 FLLM Entry Preparation</span>
          <h3>Prepare your Florida quota drawing information</h3>
          <p>
            Use this free FLLM tool to prepare one lottery entry for the county you select. Your draft stays on this device.
          </p>
        </div>
        <div className="quota-native-form-badge">
          <strong>ABT-6033</strong>
          <span>Preparation workspace</span>
        </div>
      </div>

      <div className="quota-native-form-disclosure" role="note">
        <div>
          <strong>One entry. One potential license.</strong>
          <span>Each entry is for a chance to receive one quota license in the selected county.</span>
        </div>
        <div>
          <strong>No fee is paid to FLLM.</strong>
          <span>FLLM does not submit your entry or collect the $100 fee. Submit and pay DBPR directly.</span>
        </div>
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title"><span>1</span><div><strong>Entry type and county</strong><small>Choose one entrant type and one eligible county.</small></div></div>
        <div className="quota-entry-type" role="radiogroup" aria-label="Entry type">
          <label className={draft.entryType === "individual" ? "is-selected" : ""}>
            <input type="radio" name="entryType" value="individual" checked={draft.entryType === "individual"} onChange={() => update("entryType", "individual")} />
            <span><strong>Individual</strong><small>Enter in your own name</small></span>
          </label>
          <label className={draft.entryType === "business" ? "is-selected" : ""}>
            <input type="radio" name="entryType" value="business" checked={draft.entryType === "business"} onChange={() => update("entryType", "business")} />
            <span><strong>Business</strong><small>Enter through a legal business entity</small></span>
          </label>
        </div>
        <div className="quota-native-grid quota-native-grid-two">
          <label>
            <span>{draft.entryType === "business" ? "Business / entity name" : "Entrant full legal name"}</span>
            <input value={draft.entrantName} onChange={(event) => update("entrantName", event.target.value)} autoComplete="name" />
          </label>
          <label>
            <span>2026 drawing county</span>
            <select value={draft.county} onChange={(event) => update("county", event.target.value)}>
              <option value="">Select an eligible county</option>
              {QUOTA_DRAWING_2026.counties.map((item) => (
                <option key={item.county} value={item.county}>{item.county === "Dade" ? "Miami-Dade" : item.county} County — {item.licenses} license{item.licenses === 1 ? "" : "s"}</option>
              ))}
            </select>
          </label>
        </div>
        {selectedCounty && (
          <div className="quota-county-confirmation">
            <span>2026 DBPR availability</span>
            <strong>{selectedCounty.county === "Dade" ? "Miami-Dade" : selectedCounty.county} County: {selectedCounty.licenses} quota license{selectedCounty.licenses === 1 ? "" : "s"}</strong>
          </div>
        )}
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title"><span>2</span><div><strong>Contact information</strong><small>Use the contact information you intend to provide to DBPR.</small></div></div>
        <div className="quota-native-grid quota-native-grid-two">
          <label className="quota-grid-wide"><span>Mailing address</span><input value={draft.mailingAddress} onChange={(event) => update("mailingAddress", event.target.value)} autoComplete="street-address" /></label>
          <label><span>City</span><input value={draft.city} onChange={(event) => update("city", event.target.value)} autoComplete="address-level2" /></label>
          <div className="quota-native-grid quota-native-grid-state">
            <label><span>State</span><input value={draft.state} onChange={(event) => update("state", event.target.value.toUpperCase().slice(0, 2))} autoComplete="address-level1" /></label>
            <label><span>ZIP</span><input value={draft.zip} onChange={(event) => update("zip", event.target.value)} inputMode="numeric" autoComplete="postal-code" /></label>
          </div>
          <label><span>Phone</span><input value={draft.phone} onChange={(event) => update("phone", event.target.value)} type="tel" autoComplete="tel" /></label>
          <label><span>Email</span><input value={draft.email} onChange={(event) => update("email", event.target.value)} type="email" autoComplete="email" /></label>
        </div>
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title quota-form-section-title-actions">
          <span>3</span>
          <div><strong>Interested persons</strong><small>DBPR requires full names and dates of birth for persons with a direct or indirect interest in the entry.</small></div>
          <button type="button" onClick={addInterestedPerson}>+ Add Person</button>
        </div>
        <div className="quota-interested-list">
          {draft.interestedPersons.map((person, index) => (
            <div className="quota-interested-row" key={person.id}>
              <strong>Person {index + 1}</strong>
              <label><span>Full legal name</span><input value={person.name} onChange={(event) => updateInterestedPerson(person.id, "name", event.target.value)} /></label>
              <label><span>Date of birth</span><input type="date" value={person.dateOfBirth} onChange={(event) => updateInterestedPerson(person.id, "dateOfBirth", event.target.value)} /></label>
              <button type="button" onClick={() => removeInterestedPerson(person.id)} aria-label={`Remove person ${index + 1}`}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title"><span>4</span><div><strong>Review and affirmation</strong><small>This FLLM checkbox is a preparation aid and is not a substitute for the signature or certification required by DBPR.</small></div></div>
        <label className="quota-affirmation">
          <input type="checkbox" checked={draft.affirmation} onChange={(event) => update("affirmation", event.target.checked)} />
          <span>I have reviewed this preparation draft and understand that the final entry must be completed and submitted through DBPR with the required $100 state entry fee.</span>
        </label>
      </div>

      <div className="quota-form-footer">
        <div>
          <button className="quota-save-draft" type="button" onClick={saveDraft}>Save Draft</button>
          <button className="quota-clear-draft" type="button" onClick={clearDraft}>Clear</button>
          {restored && saveStatus && <span role="status">{saveStatus}</span>}
        </div>
        <button className="quota-dbpr-handoff" type="button" onClick={continueToDbpr} disabled={!requiredComplete}>
          Continue to Official DBPR {draft.entryType === "business" ? "Business" : "Individual"} Entry <span aria-hidden="true">↗</span>
        </button>
      </div>

      {!requiredComplete && (
        <p className="quota-form-required-note">Complete the entrant name, eligible county, mailing address, phone, email and review affirmation to activate the DBPR handoff.</p>
      )}
    </div>
  );
}
