"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import QuotaLotterySignaturePad from "@/components/QuotaLotterySignaturePad";
import { QUOTA_DRAWING_2026 } from "@/data/quota-drawing-2026";
import {
  createAbt6033Pdf,
  type Abt6033Draft,
  type Abt6033ElectronicSignature,
  type Abt6033InterestedPerson,
} from "@/lib/abt-6033-pdf";

type EntryDraft = Abt6033Draft;
type InterestedPerson = Abt6033InterestedPerson;
type PortalUser = { id: string; email: string; fullName: string };
type PortalTransaction = {
  id: string;
  transactionName: string;
  county: string;
  licenseType: string;
  updatedAt: string;
};
type PendingAction = "save" | "generate" | null;
type SignatureMode = "wet" | "typed" | "drawn";

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
  };
}

function mergeBlankProfile(draft: EntryDraft, profile: Partial<EntryDraft>) {
  const next = { ...draft };
  const keys: Array<keyof Pick<EntryDraft,
    "entrantName" | "mailingAddress" | "city" | "mailingCounty" | "state" | "zip" | "phone" | "phoneExtension" | "email"
  >> = ["entrantName", "mailingAddress", "city", "mailingCounty", "state", "zip", "phone", "phoneExtension", "email"];
  keys.forEach((key) => {
    if (!String(next[key]).trim() && profile[key]) next[key] = String(profile[key]);
  });
  return next;
}

function displayCounty(county: string) {
  return county === "Dade" ? "Miami-Dade" : county;
}

function signerName(person: InterestedPerson) {
  return [person.firstName, person.middleName, person.lastName].filter(Boolean).join(" ");
}

async function requestJson(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
  });
  const data = (await response.json()) as Record<string, unknown>;
  if (!response.ok) throw new Error(String(data.error ?? "The request could not be completed."));
  return data;
}

export default function QuotaLotteryEntryForm() {
  const [draft, setDraft] = useState<EntryDraft>(EMPTY_DRAFT);
  const [user, setUser] = useState<PortalUser | null>(null);
  const [transactions, setTransactions] = useState<PortalTransaction[]>([]);
  const [transactionId, setTransactionId] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [error, setError] = useState("");
  const [restored, setRestored] = useState(false);
  const [busy, setBusy] = useState(false);
  const [authGate, setAuthGate] = useState(false);
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [signatureMode, setSignatureMode] = useState<SignatureMode>("wet");
  const [signerId, setSignerId] = useState("");
  const [typedSignature, setTypedSignature] = useState("");
  const [drawnSignature, setDrawnSignature] = useState("");
  const [signatureConsent, setSignatureConsent] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfFileName, setPdfFileName] = useState("");

  useEffect(() => {
    let active = true;
    void (async () => {
      let initial = EMPTY_DRAFT;
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
          ?? window.localStorage.getItem("fllm-quota-drawing-entry-2026-v1");
        if (stored) initial = normalizeDraft(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }

      try {
        const session = await requestJson("/api/portal/auth/session");
        const account = (session.user ?? null) as PortalUser | null;
        if (account) {
          initial = mergeBlankProfile(initial, { entrantName: account.fullName, email: account.email });
          const transactionData = await requestJson("/api/portal/transactions");
          const allTransactions = (transactionData.transactions ?? []) as PortalTransaction[];
          const lotteryTransactions = allTransactions
            .filter((item) => item.licenseType === "2026 Quota Drawing Entry")
            .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
          const requestedCounty = initial.county ? `${displayCounty(initial.county)} County` : "";
          const matching = lotteryTransactions.find((item) => item.county === requestedCounty)
            ?? (!initial.county ? lotteryTransactions[0] : undefined);
          if (matching) {
            const documentData = await requestJson(`/api/portal/transactions/${matching.id}/documents/abt-6033`);
            const record = documentData.document as { draftData?: unknown } | undefined;
            if (record?.draftData) {
              const saved = normalizeDraft(record.draftData);
              const locallyBlank = !initial.county && !initial.mailingAddress && !initial.phone;
              initial = locallyBlank ? saved : mergeBlankProfile(initial, saved);
            }
            setTransactionId(matching.id);
          }
          if (active) {
            setUser(account);
            setTransactions(allTransactions);
          }
        }
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "Your account could not be loaded.");
      } finally {
        if (active) {
          setDraft(initial);
          setRestored(true);
        }
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    function handleCountySelection(event: Event) {
      const county = (event as CustomEvent<{ county?: string }>).detail?.county;
      if (!county || !QUOTA_DRAWING_2026.counties.some((item) => item.county === county)) return;
      setDraft((current) => ({ ...current, county }));
      setTransactionId("");
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
  const validPeople = draft.interestedPersons.filter((person) =>
    person.firstName.trim() && person.lastName.trim() && person.dateOfBirth
  );
  const signer = draft.interestedPersons.find((person) => person.id === signerId) ?? null;
  const signatureReady = signatureMode === "wet" || Boolean(
    signerId && signatureConsent && (signatureMode === "typed" ? typedSignature.trim() : drawnSignature)
  );
  const requiredComplete = Boolean(
    draft.entrantName.trim() && draft.county && draft.mailingAddress.trim() && draft.city.trim()
      && draft.mailingCounty.trim() && draft.state.trim() && draft.zip.trim() && draft.phone.trim()
      && draft.email.trim() && validPeople.length && draft.affirmation && signatureReady
  );

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
    if (signerId === id) setSignerId("");
  }

  function saveLocal() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }

  function clearDraft() {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem("fllm-quota-drawing-entry-2026-v1");
    setDraft({ ...EMPTY_DRAFT, interestedPersons: [emptyInterestedPerson()] });
    setTransactionId("");
    setSignerId("");
    setDrawnSignature("");
    setTypedSignature("");
    setSignatureConsent(false);
    setSaveStatus("Draft cleared.");
  }

  async function ensureLotteryTransaction() {
    if (transactionId) return transactionId;
    const countyName = `${displayCounty(draft.county)} County`;
    const existing = transactions.find((item) =>
      item.licenseType === "2026 Quota Drawing Entry" && item.county === countyName
    );
    if (existing) {
      setTransactionId(existing.id);
      return existing.id;
    }
    const data = await requestJson("/api/portal/transactions", {
      method: "POST",
      body: JSON.stringify({
        transactionName: `2026 Lottery Entry — ${countyName}`,
        participantRole: "Lottery Entrant",
        county: countyName,
        licenseType: "2026 Quota Drawing Entry",
        licenseNumber: "",
        financedPurchase: false,
        representativeAssistance: false,
      }),
    });
    const created = data.transaction as PortalTransaction;
    setTransactions((current) => [created, ...current]);
    setTransactionId(created.id);
    return created.id;
  }

  async function saveToAccount(account: PortalUser) {
    if (!draft.county) throw new Error("Select an eligible county before saving this entry.");
    saveLocal();
    const id = await ensureLotteryTransaction();
    await requestJson(`/api/portal/transactions/${id}/documents/abt-6033`, {
      method: "PATCH",
      body: JSON.stringify({ status: "In progress", draftData: draft }),
    });
    setSaveStatus(`Saved securely to ${account.email}. Your signature is not stored in the reusable profile.`);
    return id;
  }

  async function generatePdf(account: PortalUser) {
    if (!requiredComplete) throw new Error("Complete all required fields, at least one interested person, the affirmation, and your selected signature step.");
    const id = await saveToAccount(account);
    const templateResponse = await fetch("/abt-forms/abt-6033.pdf", { cache: "no-store" });
    if (!templateResponse.ok) throw new Error("The verified 2026 DBPR ABT-6033 template could not be loaded.");

    let signature: Abt6033ElectronicSignature | undefined;
    if (signatureMode === "typed") signature = { mode: "typed", signerId, typedName: typedSignature };
    else if (signatureMode === "drawn") signature = { mode: "drawn", signerId, imageDataUrl: drawnSignature };
    const bytes = await createAbt6033Pdf(await templateResponse.arrayBuffer(), draft, signature);
    const fileName = `ABT-6033-2026-${displayCounty(draft.county).replace(/[^a-z0-9]+/gi, "-")}-prepared.pdf`;
    const blob = new Blob([new Uint8Array(bytes).buffer], { type: "application/pdf" });
    const nextUrl = URL.createObjectURL(blob);
    setPdfUrl((current) => { if (current) URL.revokeObjectURL(current); return nextUrl; });
    setPdfFileName(fileName);

    const form = new FormData();
    form.set("file", new File([blob], fileName, { type: "application/pdf" }));
    const upload = await fetch(`/api/portal/transactions/${id}/documents/abt-6033`, { method: "POST", body: form });
    const uploadData = (await upload.json()) as Record<string, unknown>;
    if (!upload.ok) throw new Error(String(uploadData.error ?? "The prepared PDF could not be saved."));
    await requestJson(`/api/portal/transactions/${id}/documents/abt-6033`, {
      method: "PATCH",
      body: JSON.stringify({ status: "Awaiting signatures", draftData: draft }),
    });
    setSaveStatus("Your populated ABT-6033 is ready and saved in your FLLM account as Awaiting signatures.");
  }

  async function perform(action: Exclude<PendingAction, null>, account: PortalUser) {
    setBusy(true);
    setError("");
    try {
      if (action === "save") await saveToAccount(account);
      else await generatePdf(account);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The lottery entry could not be prepared.");
    } finally {
      setBusy(false);
    }
  }

  function requestAction(action: Exclude<PendingAction, null>) {
    if (!user) {
      setPendingAction(action);
      setAuthGate(true);
      setAuthError("");
      return;
    }
    void perform(action, user);
  }

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setAuthBusy(true);
    setAuthError("");
    try {
      const data = await requestJson(`/api/portal/auth/${authMode === "register" ? "register" : "login"}`, {
        method: "POST",
        body: JSON.stringify({ fullName: form.get("fullName"), email: form.get("email"), password: form.get("password") }),
      });
      const account = data.user as PortalUser;
      setUser(account);
      setDraft((current) => mergeBlankProfile(current, { entrantName: account.fullName, email: account.email }));
      setAuthGate(false);
      const action = pendingAction;
      setPendingAction(null);
      setSaveStatus(`Signed in as ${account.email}. Blank name and email fields were prefilled.`);
      if (action) await perform(action, account);
    } catch (caught) {
      setAuthError(caught instanceof Error ? caught.message : "Your account could not be opened.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function signOut() {
    await fetch("/api/portal/auth/logout", { method: "POST" });
    setUser(null);
    setTransactions([]);
    setTransactionId("");
    setSaveStatus("Signed out. Your local recovery draft remains on this device.");
  }

  function continueToDbpr() {
    const href = draft.entryType === "business" ? QUOTA_DRAWING_2026.businessEntryUrl : QUOTA_DRAWING_2026.individualEntryUrl;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="quota-native-form" aria-label="FLLM quota drawing entry preparation form">
      <div className="quota-native-form-head">
        <div><span>2026 FLLM Entry Preparation</span><h3>Populate your official ABT-6033</h3><p>Enter the information once, save it to your FLLM account, and generate a county-specific copy of the current DBPR form.</p></div>
        <div className="quota-native-form-badge"><strong>ABT-6033</strong><span>Secure preparation workspace</span></div>
      </div>

      <div className="quota-native-form-disclosure" role="note">
        <div><strong>One entry. One potential license.</strong><span>This prepares one entry for a chance to receive one quota license in the selected county—not every license available there.</span></div>
        <div><strong>The $100 fee is paid only to DBPR.</strong><span>FLLM never collects the lottery fee and cannot submit payment for you. You finish and pay through the official DBPR process.</span></div>
      </div>

      <div className={`quota-account-state ${user ? "is-signed-in" : ""}`}>
        {user ? (
          <><div><strong>FLLM account connected</strong><span>{user.fullName} · {user.email}</span><small>Your saved contact profile prefills blank fields. Signatures are never reused.</small></div><div><a href="/transaction-portal">Open My Account</a><button type="button" onClick={signOut}>Sign out</button></div></>
        ) : (
          <><div><strong>Start now; create an account when you save</strong><span>An FLLM account is required to store the draft and generated PDF securely.</span></div><button type="button" onClick={() => { setPendingAction(null); setAuthGate(true); }}>Create Account or Sign In</button></>
        )}
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title"><span>1</span><div><strong>Entry type and county</strong><small>Choose one entrant type and one eligible county.</small></div></div>
        <div className="quota-entry-type" role="radiogroup" aria-label="Entry type">
          <label className={draft.entryType === "individual" ? "is-selected" : ""}><input type="radio" name="entryType" checked={draft.entryType === "individual"} onChange={() => update("entryType", "individual")} /><span><strong>Individual</strong><small>Enter in your own name</small></span></label>
          <label className={draft.entryType === "business" ? "is-selected" : ""}><input type="radio" name="entryType" checked={draft.entryType === "business"} onChange={() => update("entryType", "business")} /><span><strong>Business</strong><small>Enter through a legal business entity</small></span></label>
        </div>
        <div className="quota-native-grid quota-native-grid-two">
          <label><span>{draft.entryType === "business" ? "Business / entity name" : "Entrant full legal name"}</span><input value={draft.entrantName} onChange={(event) => update("entrantName", event.target.value)} autoComplete="name" /></label>
          <label><span>2026 drawing county</span><select value={draft.county} onChange={(event) => { update("county", event.target.value); setTransactionId(""); }}><option value="">Select an eligible county</option>{QUOTA_DRAWING_2026.counties.map((item) => <option key={item.county} value={item.county}>{displayCounty(item.county)} County — {item.licenses} license{item.licenses === 1 ? "" : "s"}</option>)}</select></label>
        </div>
        {selectedCounty && <div className="quota-county-confirmation"><span>2026 DBPR availability</span><strong>{displayCounty(selectedCounty.county)} County: {selectedCounty.licenses} quota license{selectedCounty.licenses === 1 ? "" : "s"} available; this form is one entry for one potential license.</strong></div>}
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title"><span>2</span><div><strong>Mailing and contact information</strong><small>These fields match Section 3 of ABT-6033.</small></div></div>
        <div className="quota-native-grid quota-native-grid-two">
          <label className="quota-grid-wide"><span>Mailing address</span><input value={draft.mailingAddress} onChange={(event) => update("mailingAddress", event.target.value)} autoComplete="street-address" /></label>
          <label><span>City</span><input value={draft.city} onChange={(event) => update("city", event.target.value)} autoComplete="address-level2" /></label>
          <label><span>Mailing county</span><input value={draft.mailingCounty} onChange={(event) => update("mailingCounty", event.target.value)} /></label>
          <div className="quota-native-grid quota-native-grid-state"><label><span>State</span><input value={draft.state} onChange={(event) => update("state", event.target.value.toUpperCase().slice(0, 2))} autoComplete="address-level1" /></label><label><span>ZIP</span><input value={draft.zip} onChange={(event) => update("zip", event.target.value)} inputMode="numeric" autoComplete="postal-code" /></label></div>
          <div className="quota-native-grid quota-native-grid-phone"><label><span>Phone</span><input value={draft.phone} onChange={(event) => update("phone", event.target.value)} type="tel" autoComplete="tel" /></label><label><span>Extension</span><input value={draft.phoneExtension} onChange={(event) => update("phoneExtension", event.target.value)} /></label></div>
          <label className="quota-grid-wide"><span>Email</span><input value={draft.email} onChange={(event) => update("email", event.target.value)} type="email" autoComplete="email" /></label>
        </div>
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title quota-form-section-title-actions"><span>3</span><div><strong>Interested persons</strong><small>Enter the separate last, first and middle names and date of birth exactly as Section 4 requests. Maximum four on this form.</small></div><button type="button" onClick={addInterestedPerson} disabled={draft.interestedPersons.length >= 4}>+ Add Person</button></div>
        <div className="quota-interested-list">
          {draft.interestedPersons.map((person, index) => (
            <div className="quota-interested-row" key={person.id}><strong>Person {index + 1}</strong><label><span>Last name</span><input value={person.lastName} onChange={(event) => updateInterestedPerson(person.id, "lastName", event.target.value)} /></label><label><span>First name</span><input value={person.firstName} onChange={(event) => updateInterestedPerson(person.id, "firstName", event.target.value)} /></label><label><span>Middle name</span><input value={person.middleName} onChange={(event) => updateInterestedPerson(person.id, "middleName", event.target.value)} /></label><label><span>Date of birth</span><input type="date" value={person.dateOfBirth} onChange={(event) => updateInterestedPerson(person.id, "dateOfBirth", event.target.value)} /></label><button type="button" onClick={() => removeInterestedPerson(person.id)} aria-label={`Remove person ${index + 1}`}>Remove</button></div>
          ))}
        </div>
      </div>

      <div className="quota-form-section-block">
        <div className="quota-form-section-title"><span>4</span><div><strong>Review the official affirmation</strong><small>Review Section 5 in the official ABT-6033 before signing.</small></div></div>
        <label className="quota-affirmation"><input type="checkbox" checked={draft.affirmation} onChange={(event) => update("affirmation", event.target.checked)} /><span>I reviewed the official Section 5 affirmations and understand that my final signed entry must be truthful, complete, submitted to DBPR on time, and accompanied by the $100 DBPR entry fee.</span></label>
      </div>

      <div className="quota-form-section-block quota-signature-section">
        <div className="quota-form-section-title"><span>5</span><div><strong>Choose how to sign</strong><small>Wet ink is the safest default. Electronic signing is offered only with express consent and may still need DBPR confirmation.</small></div></div>
        <div className="quota-signature-methods" role="radiogroup" aria-label="Signature method">
          <label className={signatureMode === "wet" ? "is-selected" : ""}><input type="radio" name="signatureMode" checked={signatureMode === "wet"} onChange={() => setSignatureMode("wet")} /><span><strong>Print and sign with wet ink</strong><small>The generated form leaves signature lines blank.</small></span></label>
          <label className={signatureMode === "typed" ? "is-selected" : ""}><input type="radio" name="signatureMode" checked={signatureMode === "typed"} onChange={() => setSignatureMode("typed")} /><span><strong>Type my signature</strong><small>Adopt a typed name as your electronic signature.</small></span></label>
          <label className={signatureMode === "drawn" ? "is-selected" : ""}><input type="radio" name="signatureMode" checked={signatureMode === "drawn"} onChange={() => setSignatureMode("drawn")} /><span><strong>Draw my signature</strong><small>Draw one account holder’s signature now.</small></span></label>
        </div>
        {signatureMode !== "wet" && (
          <div className="quota-electronic-signature">
            <label><span>Which interested person is the FLLM account holder signing now?</span><select value={signerId} onChange={(event) => { const id = event.target.value; setSignerId(id); const person = draft.interestedPersons.find((item) => item.id === id); if (person) setTypedSignature(signerName(person)); }}><option value="">Select the signer</option>{validPeople.map((person) => <option key={person.id} value={person.id}>{signerName(person)}</option>)}</select></label>
            {signatureMode === "typed" && <label><span>Typed electronic signature</span><input value={typedSignature} onChange={(event) => setTypedSignature(event.target.value)} placeholder={signer ? signerName(signer) : "Full legal name"} /></label>}
            {signatureMode === "drawn" && <QuotaLotterySignaturePad onChange={setDrawnSignature} />}
            <label className="quota-signature-consent"><input type="checkbox" checked={signatureConsent} onChange={(event) => setSignatureConsent(event.target.checked)} /><span>I am the selected signer, I intend this mark to be my electronic signature, and—if signing for a business—I am authorized to sign. FLLM will not reuse this signature. I understand DBPR may require an original or replacement signature.</span></label>
            {draft.entryType === "individual" && validPeople.length > 1 && <p className="quota-signature-warning">Every individual listed in Section 4 must sign. This tool applies only the account holder’s electronic signature; print the PDF for all other required signatures.</p>}
          </div>
        )}
      </div>

      <div className="quota-form-footer">
        <div><button className="quota-save-draft" type="button" onClick={() => requestAction("save")} disabled={busy}>{busy ? "Working…" : "Save to My FLLM Account"}</button><button className="quota-clear-draft" type="button" onClick={clearDraft} disabled={busy}>Clear</button>{restored && saveStatus && <span role="status">{saveStatus}</span>}</div>
        <button className="quota-dbpr-handoff" type="button" onClick={() => requestAction("generate")} disabled={!requiredComplete || busy}>{busy ? "Preparing…" : "Generate My Populated ABT-6033"}</button>
      </div>
      {!requiredComplete && <p className="quota-form-required-note">Complete every contact field, at least one interested person, the affirmation and the selected signature step to generate the official form.</p>}
      {error && <p className="quota-form-error" role="alert">{error}</p>}

      {pdfUrl && (
        <section className="quota-pdf-result" aria-live="polite">
          <div><span>Prepared PDF ready</span><h4>Review every page before submitting</h4><p>Your populated form is saved in your FLLM account as <strong>Awaiting signatures</strong>. FLLM has not submitted it and has not collected the $100 DBPR fee.</p></div>
          <iframe src={pdfUrl} title="Prepared ABT-6033 preview" />
          <div className="quota-pdf-actions"><a href={pdfUrl} download={pdfFileName}>Download ABT-6033</a><button type="button" onClick={() => window.open(pdfUrl, "_blank", "noopener,noreferrer")}>Open to Print</button><button type="button" onClick={continueToDbpr}>Continue to Official DBPR &amp; Pay $100 <span aria-hidden="true">↗</span></button></div>
          <small>DBPR is the only filing authority. Confirm that all required people have signed and follow the official filing instructions and deadline.</small>
        </section>
      )}

      {authGate && (
        <div className="quota-account-gate-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setAuthGate(false); }}>
          <section className="quota-account-gate" role="dialog" aria-modal="true" aria-labelledby="quota-account-title">
            <button className="quota-account-close" type="button" onClick={() => setAuthGate(false)} aria-label="Close account dialog">×</button>
            <span>Secure FLLM workspace</span><h4 id="quota-account-title">{authMode === "register" ? "Create your FLLM account" : "Sign in to your FLLM account"}</h4><p>Your account stores the draft and generated ABT-6033 privately, so you can return without starting over.</p>
            <div className="quota-account-tabs"><button type="button" className={authMode === "register" ? "is-active" : ""} onClick={() => { setAuthMode("register"); setAuthError(""); }}>Create Account</button><button type="button" className={authMode === "login" ? "is-active" : ""} onClick={() => { setAuthMode("login"); setAuthError(""); }}>Sign In</button></div>
            <form onSubmit={handleAuth}>
              {authMode === "register" && <label><span>Full legal name</span><input name="fullName" defaultValue={draft.entrantName} required autoComplete="name" /></label>}
              <label><span>Email</span><input name="email" type="email" defaultValue={draft.email} required autoComplete="email" /></label>
              <label><span>Password</span><input name="password" type="password" minLength={12} required autoComplete={authMode === "register" ? "new-password" : "current-password"} /><small>{authMode === "register" ? "Use at least 12 characters." : "Enter your account password."}</small></label>
              {authError && <p role="alert">{authError}</p>}
              <button type="submit" disabled={authBusy}>{authBusy ? "Please wait…" : authMode === "register" ? "Create Account & Continue" : "Sign In & Continue"}</button>
            </form>
            <small>FLLM does not collect the DBPR fee and does not submit your lottery entry.</small>
          </section>
        </div>
      )}
    </div>
  );
}
