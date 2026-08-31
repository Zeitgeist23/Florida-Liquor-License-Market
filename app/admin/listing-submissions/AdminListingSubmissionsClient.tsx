"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import AdminCodeLogin from "@/components/AdminCodeLogin";

type Submission = {
  id: string;
  submissionRef: string;
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
  county: string;
  licenseType: string;
  askingPrice: number | null;
  askingPriceText: string | null;
  licenseStatus: string;
  preferredTiming: string | null;
  message: string | null;
  status: string;
  paidAt: string | null;
  paymentEmailStatus: string;
  listingTitle: string | null;
  approvedLicenseType: "4COP Quota" | "3PS Quota / Package Store" | null;
  approvedAskingPrice: number | null;
  liveListingUrl: string | null;
  approvedAt: string | null;
  approvalEmailStatus: string;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
};

function money(value: number | null) {
  if (value === null) return "Price undisclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function SubmissionCard({ submission, reload }: { submission: Submission; reload: () => Promise<void> }) {
  const consultationRequested = submission.submissionRef.startsWith("FLLM-CONSULT-");
  const initialType =
    submission.approvedLicenseType ||
    (submission.licenseType === "3PS Quota / Package Store"
      ? "3PS Quota / Package Store"
      : "4COP Quota");
  const [title, setTitle] = useState(
    submission.listingTitle || `${initialType} License – ${submission.county}`
  );
  const [licenseType, setLicenseType] = useState<"4COP Quota" | "3PS Quota / Package Store">(
    initialType
  );
  const [price, setPrice] = useState(
    String(submission.approvedAskingPrice ?? submission.askingPrice ?? "")
  );
  const [email, setEmail] = useState(submission.email);
  const [phone, setPhone] = useState(submission.phone);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  async function approve() {
    setWorking(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/listing-submissions/${submission.id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          licenseType,
          askingPrice: price.trim() ? Number(price.replace(/[^0-9.]/g, "")) : null,
          email,
          phone,
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Approval failed.");
      await reload();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Approval failed.");
    } finally {
      setWorking(false);
    }
  }

  const canApprove = submission.status === "paid" || submission.status === "approved";

  return (
    <article className="admin-submission-card">
      <div className="admin-card-heading">
        <div>
          <span className={`admin-status ${consultationRequested ? "status-consultation_requested" : `status-${submission.status}`}`}>
            {consultationRequested ? "consultation requested" : submission.status.replaceAll("_", " ")}
          </span>
          <h2>{submission.fullName}</h2>
          <p>{submission.submissionRef}</p>
        </div>
        <div className="admin-date">Submitted {new Date(submission.createdAt).toLocaleString()}</div>
      </div>

      <div className="admin-detail-grid">
        <div><strong>Email</strong><a href={`mailto:${submission.email}`}>{submission.email}</a></div>
        <div><strong>Phone</strong><span>{submission.phone}</span></div>
        <div><strong>County</strong><span>{submission.county}</span></div>
        <div><strong>Submitted Type</strong><span>{submission.licenseType}</span></div>
        <div><strong>Submitted Price</strong><span>{money(submission.askingPrice)}</span></div>
        <div><strong>Payment</strong><span>{consultationRequested ? "No charge" : submission.paidAt ? `Paid ${new Date(submission.paidAt).toLocaleString()}` : "Not confirmed"}</span></div>
        <div><strong>Payment Email</strong><span>{consultationRequested ? "Not applicable" : submission.paymentEmailStatus}</span></div>
        <div><strong>Approval Email</strong><span>{submission.approvalEmailStatus}</span></div>
      </div>

      {submission.message && <div className="admin-notes"><strong>Seller Notes</strong><p>{submission.message}</p></div>}

      <div className="admin-contact-fields">
        <label>
          <span>Seller Email Used for Buyer Inquiries</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          <span>Seller Phone Used for Buyer Inquiries</span>
          <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </label>
      </div>

      <div className="admin-approval-fields">
        <label>
          <span>Live Listing Title</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label>
          <span>Approved License Type</span>
          <select value={licenseType} onChange={(event) => setLicenseType(event.target.value as typeof licenseType)}>
            <option>4COP Quota</option>
            <option>3PS Quota / Package Store</option>
          </select>
        </label>
        <label>
          <span>Approved Asking Price</span>
          <input inputMode="numeric" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Leave blank for undisclosed" />
        </label>
      </div>

      <div className="admin-actions">
        <button type="button" onClick={approve} disabled={!canApprove || working}>
          {working ? "Publishing…" : submission.status === "approved" ? "Republish / Retry Email" : "Approve & Publish"}
        </button>
        {submission.liveListingUrl && <a href={submission.liveListingUrl} target="_blank" rel="noreferrer">Open Live Listing</a>}
      </div>
      {!canApprove && (
        <p className="admin-warning">
          {consultationRequested
            ? "Contact this seller about the requested broker-assisted consultation. No listing fee was charged."
            : "Stripe payment must be confirmed before approval."}
        </p>
      )}
      {submission.lastError && <p className="admin-error">Last error: {submission.lastError}</p>}
      {error && <p className="admin-error">{error}</p>}
    </article>
  );
}

export default function AdminListingSubmissionsClient() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/listing-submissions", { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        setSubmissions([]);
        return;
      }
      const payload = (await response.json()) as { submissions?: Submission[]; error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not load submissions.");
      setAuthenticated(true);
      setSubmissions(payload.submissions || []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load submissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setSubmissions([]);
  }

  if (authenticated === false) {
    return (
      <main className="admin-review-page">
        <AdminCodeLogin title="Listing Review" onAuthenticated={load} />
      </main>
    );
  }

  return (
    <main className="admin-review-page">
      <header className="admin-review-header">
        <div><span>Florida Liquor License Market</span><h1>Listing &amp; Consultation Review</h1></div>
        <div><Link className="admin-leads-link" href="/admin/leads">Lead Database</Link><button type="button" onClick={() => void load()} disabled={loading}>Refresh</button><button type="button" onClick={logout}>Sign Out</button></div>
      </header>
      {error && <p className="admin-error">{error}</p>}
      {loading && submissions.length === 0 ? <p>Loading submissions…</p> : null}
      {!loading && submissions.length === 0 ? <div className="admin-empty">No listing submissions have been received.</div> : null}
      <section className="admin-submission-list">
        {submissions.map((submission) => (
          <SubmissionCard key={`${submission.id}-${submission.updatedAt}`} submission={submission} reload={load} />
        ))}
      </section>
    </main>
  );
}
