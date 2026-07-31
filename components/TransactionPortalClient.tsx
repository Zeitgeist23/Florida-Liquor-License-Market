"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type PortalUser = { id: string; email: string; fullName: string };
type PortalTransaction = {
  id: string;
  reference: string;
  transactionName: string;
  participantRole: string;
  county: string;
  licenseType: string;
  licenseNumber: string | null;
  financedPurchase: boolean;
  representativeAssistance: boolean;
  status: string;
  updatedAt: string;
};

type DocumentItem = {
  title: string;
  description: string;
  label: string;
  href?: string;
  conditional?: boolean;
  professional?: boolean;
};

const counties = [
  "Alachua County", "Baker County", "Bay County", "Bradford County", "Brevard County",
  "Broward County", "Calhoun County", "Charlotte County", "Citrus County", "Clay County",
  "Collier County", "Columbia County", "DeSoto County", "Dixie County", "Duval County",
  "Escambia County", "Flagler County", "Franklin County", "Gadsden County", "Gilchrist County",
  "Glades County", "Gulf County", "Hamilton County", "Hardee County", "Hendry County",
  "Hernando County", "Highlands County", "Hillsborough County", "Holmes County", "Indian River County",
  "Jackson County", "Jefferson County", "Lafayette County", "Lake County", "Lee County",
  "Leon County", "Levy County", "Liberty County", "Madison County", "Manatee County",
  "Marion County", "Martin County", "Miami-Dade County", "Monroe County", "Nassau County",
  "Okaloosa County", "Okeechobee County", "Orange County", "Osceola County", "Palm Beach County",
  "Pasco County", "Pinellas County", "Polk County", "Putnam County", "St. Johns County",
  "St. Lucie County", "Santa Rosa County", "Sarasota County", "Seminole County", "Sumter County",
  "Suwannee County", "Taylor County", "Union County", "Volusia County", "Wakulla County",
  "Walton County", "Washington County",
];

function documentsFor(transaction: PortalTransaction): DocumentItem[] {
  const documents: DocumentItem[] = [
    {
      title: "DBPR/ABT-6002",
      description: "Application for transfer of ownership of an alcoholic-beverage license.",
      label: "Complete ABT-6002",
      href: "/resources/forms/abt-6002",
    },
    {
      title: "Quota License Transfer Fee",
      description: "Enter the applicable three-year sales figures and calculate the estimated transfer fee.",
      label: "Open transfer-fee calculator",
      href: "/resources/quota-transfer-fee-calculator",
    },
    {
      title: "FDOR Clearance or Compliance Request",
      description: "Review whether the transaction calls for a Certificate of Compliance or Tax Clearance Letter.",
      label: "Open FDOR workspace",
      href: "/resources/florida-department-of-revenue",
    },
  ];

  if (transaction.representativeAssistance) {
    documents.push({
      title: "FDOR Form DR-835",
      description: "Power of Attorney for a qualified representative handling specified Florida tax matters.",
      label: "Complete FLLM fillable DR-835",
      href: "/api/fdor/dr835/pdf",
      conditional: true,
    });
  }

  if (transaction.financedPurchase) {
    documents.push({
      title: "Financing and License-Lien Documents",
      description: "Security agreement, lien notice or authorization, and any related filing documents selected for the financed purchase.",
      label: "Find professional assistance",
      href: "/resources/liquor-license-attorneys",
      conditional: true,
      professional: true,
    });
  }

  documents.push({
    title: "Transaction and Closing Documents",
    description: "Purchase, escrow, closing, occupancy, entity, fingerprint, and supporting documents may apply based on the transaction.",
    label: "Review with your advisers",
    href: "/resources/liquor-license-attorneys",
    professional: true,
  });

  return documents;
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

export default function TransactionPortalClient() {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState<PortalUser | null>(null);
  const [transactions, setTransactions] = useState<PortalTransaction[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");

  const selected = useMemo(
    () => transactions.find((transaction) => transaction.id === selectedId) ?? transactions[0] ?? null,
    [selectedId, transactions]
  );

  async function loadTransactions() {
    const data = await requestJson("/api/portal/transactions");
    const next = (data.transactions ?? []) as PortalTransaction[];
    setTransactions(next);
    if (next[0]) setSelectedId((current) => current ?? next[0].id);
  }

  useEffect(() => {
    void (async () => {
      try {
        const data = await requestJson("/api/portal/auth/session");
        const currentUser = (data.user ?? null) as PortalUser | null;
        setUser(currentUser);
        if (currentUser) await loadTransactions();
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "The portal could not be loaded.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const data = await requestJson(`/api/portal/auth/${authMode === "register" ? "register" : "login"}`, {
        method: "POST",
        body: JSON.stringify({
          fullName: form.get("fullName"),
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      setUser(data.user as PortalUser);
      setTransactions([]);
      setShowNew(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The account request failed.");
    } finally {
      setBusy(false);
    }
  }

  async function createTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const data = await requestJson("/api/portal/transactions", {
        method: "POST",
        body: JSON.stringify({
          transactionName: form.get("transactionName"),
          participantRole: form.get("participantRole"),
          county: form.get("county"),
          licenseType: form.get("licenseType"),
          licenseNumber: form.get("licenseNumber"),
          financedPurchase: form.get("financedPurchase") === "on",
          representativeAssistance: form.get("representativeAssistance") === "on",
        }),
      });
      const transaction = data.transaction as PortalTransaction;
      setTransactions((current) => [transaction, ...current]);
      setSelectedId(transaction.id);
      setShowNew(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The workspace could not be created.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setBusy(true);
    try {
      await requestJson("/api/portal/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setTransactions([]);
      setSelectedId(null);
      setBusy(false);
    }
  }

  if (loading) {
    return <section className="portal-loading page-shell">Opening the secure transaction portal...</section>;
  }

  if (!user) {
    return (
      <section className="portal-auth-section page-shell">
        <div className="portal-auth-copy">
          <span className="portal-eyebrow">Your private FLLM account</span>
          <h2>Start and return to a transaction workspace.</h2>
          <p>
            Use your email address as your username. Your password is protected on the server and
            never placed in a form document or sent back to your browser.
          </p>
          <ul>
            <li>Save more than one license transaction</li>
            <li>See which documents may apply</li>
            <li>Return directly to FLLM forms and calculators</li>
          </ul>
        </div>
        <div className="portal-auth-card">
          <div className="portal-auth-tabs" role="tablist" aria-label="Account access">
            <button className={authMode === "register" ? "is-active" : ""} type="button" onClick={() => { setAuthMode("register"); setError(""); }}>Create account</button>
            <button className={authMode === "login" ? "is-active" : ""} type="button" onClick={() => { setAuthMode("login"); setError(""); }}>Sign in</button>
          </div>
          <form onSubmit={submitAuth}>
            {authMode === "register" && (
              <label>Full name<input name="fullName" autoComplete="name" required /></label>
            )}
            <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
            <label>Password<input name="password" type="password" autoComplete={authMode === "register" ? "new-password" : "current-password"} minLength={12} required /></label>
            {authMode === "register" && <small>Use at least 12 characters. Email verification and multifactor authentication are planned for the production-security phase.</small>}
            {error && <p className="portal-error" role="alert">{error}</p>}
            <button className="portal-primary-button" type="submit" disabled={busy}>
              {busy ? "Please wait..." : authMode === "register" ? "Create Secure Account" : "Sign In to Portal"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="portal-dashboard page-shell">
      <header className="portal-dashboard-header">
        <div>
          <span className="portal-eyebrow">FLLM transaction portal</span>
          <h2>Welcome, {user.fullName.split(" ")[0]}</h2>
          <p>{user.email}</p>
        </div>
        <div>
          <button className="portal-secondary-button" type="button" onClick={() => setShowNew(true)}>+ Start New Transaction</button>
          <button className="portal-text-button" type="button" disabled={busy} onClick={signOut}>Sign out</button>
        </div>
      </header>

      {error && <p className="portal-error" role="alert">{error}</p>}

      {showNew && (
        <form className="portal-new-transaction" onSubmit={createTransaction}>
          <div className="portal-form-heading">
            <div><span>New workspace</span><h3>Tell us about the transaction</h3></div>
            <button type="button" onClick={() => setShowNew(false)} aria-label="Close new transaction form">X</button>
          </div>
          <div className="portal-form-grid">
            <label>Workspace name<input name="transactionName" placeholder="Example: Broward 4COP purchase" required /></label>
            <label>Your role<select name="participantRole" defaultValue=""><option value="" disabled>Select your role</option>{["Buyer", "Seller", "Broker", "Attorney", "Lender", "Other"].map((role) => <option key={role}>{role}</option>)}</select></label>
            <label>County<select name="county" defaultValue="" required><option value="" disabled>Select county</option>{counties.map((county) => <option key={county}>{county}</option>)}</select></label>
            <label>License type<select name="licenseType" defaultValue="" required><option value="" disabled>Select license type</option><option>4COP Quota</option><option>3PS Quota / Package Store</option><option>Other / Not sure</option></select></label>
            <label>License number <small>(if known)</small><input name="licenseNumber" placeholder="Example: BEV1623456" /></label>
          </div>
          <div className="portal-conditional-questions">
            <label><input type="checkbox" name="financedPurchase" /><span><strong>Financed purchase</strong>The buyer or lender expects a lien or security interest in the license.</span></label>
            <label><input type="checkbox" name="representativeAssistance" /><span><strong>Tax representative involved</strong>An attorney, CPA, or other qualified representative may request confidential FDOR information.</span></label>
          </div>
          <div className="portal-form-actions">
            <button className="portal-primary-button" type="submit" disabled={busy}>{busy ? "Creating..." : "Create Guided Workspace"}</button>
          </div>
        </form>
      )}

      {!showNew && transactions.length === 0 && (
        <div className="portal-empty-state">
          <span>01</span><h3>Create your first transaction workspace</h3>
          <p>The portal will build a preliminary checklist from the information you provide.</p>
          <button className="portal-primary-button" type="button" onClick={() => setShowNew(true)}>Start a Transaction</button>
        </div>
      )}

      {!showNew && transactions.length > 0 && selected && (
        <div className="portal-workspace-layout">
          <aside className="portal-transaction-list">
            <span className="portal-section-label">Your transactions</span>
            {transactions.map((transaction) => (
              <button key={transaction.id} className={transaction.id === selected.id ? "is-active" : ""} type="button" onClick={() => setSelectedId(transaction.id)}>
                <strong>{transaction.transactionName}</strong>
                <span>{transaction.county} | {transaction.licenseType}</span>
                <small>{transaction.reference}</small>
              </button>
            ))}
          </aside>
          <div className="portal-workspace">
            <header>
              <div><span className="portal-section-label">Guided document workspace</span><h3>{selected.transactionName}</h3><p>{selected.reference}</p></div>
              <span className="portal-status">{selected.status}</span>
            </header>
            <div className="portal-summary-grid">
              <div><span>County</span><strong>{selected.county}</strong></div>
              <div><span>License type</span><strong>{selected.licenseType}</strong></div>
              <div><span>Your role</span><strong>{selected.participantRole}</strong></div>
              <div><span>License number</span><strong>{selected.licenseNumber || "Not provided"}</strong></div>
            </div>
            <div className="portal-checklist-heading">
              <div><span className="portal-section-label">Preliminary checklist</span><h3>Documents and transaction steps</h3></div>
              <small>Based on the information provided</small>
            </div>
            <div className="portal-document-list">
              {documentsFor(selected).map((document, index) => (
                <article key={document.title}>
                  <span className="portal-document-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><h4>{document.title}</h4><p>{document.description}</p><div className="portal-document-tags">{document.conditional && <span>Conditional</span>}{document.professional && <span>Professional review</span>}</div></div>
                  {document.href && <a href={document.href}>{document.label} <span aria-hidden="true">&gt;</span></a>}
                </article>
              ))}
            </div>
            <div className="portal-notice">
              <strong>Checklist notice</strong>
              <p>This is a guided starting checklist, not a determination that the listed items are the only documents required. DBPR/ABT, FDOR, a lender, or your professional advisers may require additional information.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

