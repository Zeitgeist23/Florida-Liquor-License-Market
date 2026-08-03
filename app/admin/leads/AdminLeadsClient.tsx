"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import AdminCodeLogin from "@/components/AdminCodeLogin";

type Lead = {
  id: string;
  submissionRef: string;
  fullName: string;
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
  listingTitle: string | null;
  approvedAskingPrice: number | null;
  liveListingRef: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type BuyerDetails = {
  purchaseMethod?: string | null;
  targetClosing?: string | null;
  proofOfFunds?: string | null;
  offerExpiration?: string | null;
  contingencies?: string | null;
  notes?: string | null;
};

function isBuyer(lead: Lead) {
  return lead.submissionRef.startsWith("FLLM-BUYER-");
}

function buyerDetails(lead: Lead): BuyerDetails {
  if (!isBuyer(lead) || !lead.message) return {};
  try {
    return JSON.parse(lead.message) as BuyerDetails;
  } catch {
    return { notes: lead.message };
  }
}

function money(value: number | null) {
  if (value === null) return "Not disclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function sellerStage(lead: Lead) {
  if (lead.submissionRef.startsWith("FLLM-CONSULT-")) return "Consultation requested";
  if (lead.status === "approved") return "Published seller";
  if (lead.status === "paid") return "Paid — awaiting review";
  if (lead.status === "checkout_failed") return "Checkout failed";
  if (lead.status === "rejected") return "Rejected";
  return "Payment pending";
}

function LeadCard({ lead, contactCount }: { lead: Lead; contactCount: number }) {
  const buyer = isBuyer(lead);
  const details = buyerDetails(lead);
  const amount = lead.approvedAskingPrice ?? lead.askingPrice;

  return (
    <article className="lead-card">
      <div className="lead-card-heading">
        <div>
          <div className="lead-tags">
            <span className={buyer ? "lead-type buyer" : "lead-type seller"}>{buyer ? "Buyer lead" : "Seller lead"}</span>
            <span className="lead-stage">{buyer ? "Verification pending" : sellerStage(lead)}</span>
            {contactCount > 1 && <span className="lead-repeat">{contactCount} submissions from this contact</span>}
          </div>
          <h2>{lead.fullName}</h2>
          <p>{lead.submissionRef}</p>
        </div>
        <time dateTime={lead.createdAt}>{new Date(lead.createdAt).toLocaleString()}</time>
      </div>

      <div className="lead-primary-grid">
        <div><strong>Email</strong><a href={`mailto:${lead.email}`}>{lead.email}</a></div>
        <div><strong>Phone</strong><a href={`tel:${lead.phone}`}>{lead.phone}</a></div>
        <div><strong>{buyer ? "Listing" : "County"}</strong><span>{buyer ? lead.listingTitle || `${lead.county} ${lead.licenseType}` : lead.county}</span></div>
        <div><strong>{buyer ? "Offer" : "Asking Price"}</strong><span className="lead-money">{money(amount)}</span></div>
        <div><strong>License Type</strong><span>{lead.licenseType}</span></div>
        <div><strong>{buyer ? "Listing Reference" : "Timing"}</strong><span>{buyer ? lead.liveListingRef || "Not provided" : lead.preferredTiming || "Not provided"}</span></div>
      </div>

      {buyer ? (
        <div className="lead-secondary-grid">
          <div><strong>Purchase Method</strong><span>{details.purchaseMethod || "Not provided"}</span></div>
          <div><strong>Target Closing</strong><span>{details.targetClosing || lead.preferredTiming || "Not provided"}</span></div>
          <div><strong>Proof of Funds</strong><span>{details.proofOfFunds || "Not provided"}</span></div>
          <div><strong>Offer Expiration</strong><span>{details.offerExpiration || "Not provided"}</span></div>
        </div>
      ) : (
        <div className="lead-secondary-grid">
          <div><strong>License Status</strong><span>{lead.licenseStatus}</span></div>
          <div><strong>Payment</strong><span>{lead.paidAt ? `Paid ${new Date(lead.paidAt).toLocaleDateString()}` : lead.submissionRef.startsWith("FLLM-CONSULT-") ? "No charge" : "Not confirmed"}</span></div>
        </div>
      )}

      {(details.contingencies || details.notes || (!buyer && lead.message)) && (
        <div className="lead-notes">
          {details.contingencies && <p><strong>Contingencies</strong>{details.contingencies}</p>}
          {(details.notes || (!buyer && lead.message)) && <p><strong>Notes</strong>{details.notes || lead.message}</p>}
        </div>
      )}
    </article>
  );
}

export default function AdminLeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"all" | "buyers" | "sellers">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/leads", { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        setLeads([]);
        return;
      }
      const payload = (await response.json()) as { leads?: Lead[]; error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not load leads.");
      setAuthenticated(true);
      setLeads(payload.leads || []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load leads.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const contactCounts = useMemo(() => {
    const counts = new Map<string, number>();
    leads.forEach((lead) => {
      const identity = lead.email.trim().toLowerCase() || lead.phone.replace(/\D/g, "");
      counts.set(identity, (counts.get(identity) || 0) + 1);
    });
    return counts;
  }, [leads]);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const buyer = isBuyer(lead);
      if (filter === "buyers" && !buyer) return false;
      if (filter === "sellers" && buyer) return false;
      if (!query) return true;
      return [lead.fullName, lead.email, lead.phone, lead.county, lead.licenseType, lead.submissionRef, lead.listingTitle, lead.liveListingRef]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [filter, leads, search]);

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setLeads([]);
  }

  if (authenticated === false) {
    return (
      <main className="leads-page">
        <AdminCodeLogin title="Lead Database" onAuthenticated={load} />
      </main>
    );
  }

  const buyers = leads.filter(isBuyer).length;
  const sellers = leads.length - buyers;
  const recent = leads.filter((lead) => Date.now() - new Date(lead.createdAt).getTime() <= 7 * 24 * 60 * 60 * 1000).length;

  return (
    <main className="leads-page">
      <header className="leads-header">
        <div><span>Private FLLM administration</span><h1>Buyer &amp; Seller Lead Database</h1><p>All website-generated marketplace contacts in one secure view.</p></div>
        <nav><Link href="/admin/listing-submissions">Listing Review</Link><button type="button" onClick={() => void load()} disabled={loading}>Refresh</button><button type="button" onClick={logout}>Sign Out</button></nav>
      </header>

      <section className="lead-stats" aria-label="Lead summary">
        <div><span>Total Leads</span><strong>{leads.length}</strong></div>
        <div><span>Buyer Leads</span><strong>{buyers}</strong></div>
        <div><span>Seller Leads</span><strong>{sellers}</strong></div>
        <div><span>New in 7 Days</span><strong>{recent}</strong></div>
      </section>

      <section className="lead-controls">
        <div className="lead-filter" role="group" aria-label="Lead type">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
          <button className={filter === "buyers" ? "active" : ""} onClick={() => setFilter("buyers")}>Buyers</button>
          <button className={filter === "sellers" ? "active" : ""} onClick={() => setFilter("sellers")}>Sellers</button>
        </div>
        <label><span>Search leads</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, email, phone, county, or reference" /></label>
      </section>

      {error && <p className="leads-error">{error}</p>}
      {loading && leads.length === 0 && <div className="leads-empty">Loading lead database…</div>}
      {!loading && visible.length === 0 && <div className="leads-empty">No leads match the selected filters.</div>}
      <section className="lead-list">
        {visible.map((lead) => {
          const identity = lead.email.trim().toLowerCase() || lead.phone.replace(/\D/g, "");
          return <LeadCard key={`${lead.id}-${lead.updatedAt}`} lead={lead} contactCount={contactCounts.get(identity) || 1} />;
        })}
      </section>
    </main>
  );
}
