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

type ValuationDetails = {
  licenseNumber?: string | null;
  currentHolderOfRecord?: string | null;
  estimate?: {
    count?: number;
    median?: number | null;
    typicalLow?: number | null;
    typicalHigh?: number | null;
    confidence?: string | null;
  };
};

function isBuyer(lead: Lead) {
  return lead.submissionRef.startsWith("FLLM-BUYER-");
}

function isValuation(lead: Lead) {
  return lead.submissionRef.startsWith("FLLM-VALUE-");
}

function buyerDetails(lead: Lead): BuyerDetails {
  if (!isBuyer(lead) || !lead.message) return {};
  try {
    return JSON.parse(lead.message) as BuyerDetails;
  } catch {
    return { notes: lead.message };
  }
}

function valuationDetails(lead: Lead): ValuationDetails {
  if (!isValuation(lead) || !lead.message) return {};
  try {
    return JSON.parse(lead.message) as ValuationDetails;
  } catch {
    return {};
  }
}

function estimatedRange(details: ValuationDetails) {
  const low = details.estimate?.typicalLow ?? null;
  const high = details.estimate?.typicalHigh ?? null;
  if (low === null && high === null) return "No exact county range";
  if (low === high || high === null) return money(low);
  if (low === null) return money(high);
  return `${money(low)}–${money(high)}`;
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
  if (isValuation(lead)) return "Estimate follow-up requested";
  if (lead.submissionRef.startsWith("FLLM-CONSULT-")) return "Consultation requested";
  if (lead.status === "approved") return "Published seller";
  if (lead.status === "paid") return "Paid — awaiting review";
  if (lead.status === "checkout_failed") return "Checkout failed";
  if (lead.status === "rejected") return "Rejected";
  return "Payment pending";
}

function LeadCard({ lead, contactCount }: { lead: Lead; contactCount: number }) {
  const buyer = isBuyer(lead);
  const valuation = isValuation(lead);
  const details = buyerDetails(lead);
  const valuationData = valuationDetails(lead);
  const amount = lead.approvedAskingPrice ?? lead.askingPrice;
  const valuationLicenseNumber = lead.liveListingRef || valuationData.licenseNumber || "Not provided";
  const valuationHolder = valuationData.currentHolderOfRecord || "Not provided";

  return (
    <article className="lead-card">
      <div className="lead-card-heading">
        <div>
          <div className="lead-tags">
            <span className={`lead-type ${buyer ? "buyer" : valuation ? "valuation" : "seller"}`}>{buyer ? "Buyer lead" : valuation ? "Valuation lead" : "Seller lead"}</span>
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
        <div><strong>{buyer ? "Offer" : valuation ? "Target Price" : "Asking Price"}</strong><span className="lead-money">{money(amount)}</span></div>
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
      ) : valuation ? (
        <div className="lead-secondary-grid">
          <div><strong>License Number</strong><span>{valuationLicenseNumber}</span></div>
          <div><strong>Current Holder of Record</strong><span>{valuationHolder}</span></div>
          <div><strong>Estimated Range</strong><span>{estimatedRange(valuationData)}</span></div>
          <div><strong>Estimated Median</strong><span>{money(valuationData.estimate?.median ?? null)}</span></div>
          <div><strong>Exact Comparables</strong><span>{valuationData.estimate?.count ?? 0}</span></div>
          <div><strong>Confidence</strong><span>{valuationData.estimate?.confidence || "Unavailable"}</span></div>
          <div><strong>License Status</strong><span>{lead.licenseStatus}</span></div>
          <div><strong>Contact Consent</strong><span>Authorized</span></div>
        </div>
      ) : (
        <div className="lead-secondary-grid">
          <div><strong>License Status</strong><span>{lead.licenseStatus}</span></div>
          <div><strong>Payment</strong><span>{lead.paidAt ? `Paid ${new Date(lead.paidAt).toLocaleDateString()}` : lead.submissionRef.startsWith("FLLM-CONSULT-") ? "No charge" : "Not confirmed"}</span></div>
        </div>
      )}

      {(details.contingencies || details.notes || (!buyer && !valuation && lead.message)) && (
        <div className="lead-notes">
          {details.contingencies && <p><strong>Contingencies</strong>{details.contingencies}</p>}
          {(details.notes || (!buyer && !valuation && lead.message)) && <p><strong>Notes</strong>{details.notes || lead.message}</p>}
        </div>
      )}
    </article>
  );
}

export default function AdminLeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"all" | "buyers" | "valuations" | "sellers">("all");
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
      const valuation = isValuation(lead);
      if (filter === "buyers" && !buyer) return false;
      if (filter === "valuations" && !valuation) return false;
      if (filter === "sellers" && (buyer || valuation)) return false;
      if (!query) return true;
      const valuationData = valuationDetails(lead);
      return [
        lead.fullName,
        lead.email,
        lead.phone,
        lead.county,
        lead.licenseType,
        lead.submissionRef,
        lead.listingTitle,
        lead.liveListingRef,
        valuationData.licenseNumber,
        valuationData.currentHolderOfRecord,
      ]
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
  const valuations = leads.filter(isValuation).length;
  const sellers = leads.length - buyers - valuations;

  return (
    <main className="leads-page">
      <header className="leads-header">
        <div><span>Private FLLM administration</span><h1>Buyer &amp; Seller Lead Database</h1><p>All website-generated marketplace contacts in one secure view.</p></div>
        <nav><Link href="/admin/listing-submissions">Listing Review</Link><button type="button" onClick={() => void load()} disabled={loading}>Refresh</button><button type="button" onClick={logout}>Sign Out</button></nav>
      </header>

      <section className="lead-stats" aria-label="Lead summary">
        <div><span>Total Leads</span><strong>{leads.length}</strong></div>
        <div><span>Buyer Leads</span><strong>{buyers}</strong></div>
        <div><span>Valuation Leads</span><strong>{valuations}</strong></div>
        <div><span>Seller Leads</span><strong>{sellers}</strong></div>
      </section>

      <section className="lead-controls">
        <div className="lead-filter" role="group" aria-label="Lead type">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
          <button className={filter === "buyers" ? "active" : ""} onClick={() => setFilter("buyers")}>Buyers</button>
          <button className={filter === "valuations" ? "active" : ""} onClick={() => setFilter("valuations")}>Valuations</button>
          <button className={filter === "sellers" ? "active" : ""} onClick={() => setFilter("sellers")}>Sellers</button>
        </div>
        <label><span>Search leads</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, email, phone, county, license number, holder, or reference" /></label>
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
