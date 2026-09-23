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


type ListingMatch = {
  county: string;
  type: string;
  price: number | null;
  priceLabel: string;
  sourceRef: string;
  sourceName?: string;
  sourceUrl?: string;
};

type MatchMode = "all" | "buyer_name" | "county" | "listing_ref" | "buyer_ref";

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

function isOwnerInquiry(lead: Lead) {
  const email = lead.email.trim().toLowerCase();
  const name = lead.fullName.trim().toLowerCase();
  return (
    email === "jwigg023@gmail.com" ||
    name === "james wigg" ||
    name === "ted bundy" ||
    name === "george washington"
  );
}
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

type SourceContact = {
  name: string;
  phone?: string;
  note?: string;
};

const SOURCE_CONTACTS: Record<string, SourceContact> = {
  "FLLM-042": { name: "Liquor License Auctioneers", phone: "818-345-2226" },
  "FLLM-060": { name: "LiquorLicense.com", phone: "800-222-5777" },
  "FLLM-084": { name: "Liquor License Auctioneers", phone: "818-345-2226" },
  "FLLM-165": { name: "Broker not publicly available", note: "Source listing is no longer active" },
  "FLLM-189": { name: "Del Ogorelkoff — BeachFront Realty, Inc.", phone: "954-245-0714" },
  "FLLM-195": { name: "Seller or broker not publicly disclosed", note: "Contact through the source listing" },
};

function sourceContact(listing: ListingMatch): SourceContact {
  const exact = SOURCE_CONTACTS[listing.sourceRef];
  if (exact) return exact;
  if (listing.sourceName === "Liquor License Auctioneers") {
    return { name: "Liquor License Auctioneers", phone: "818-345-2226" };
  }
  if (listing.sourceName === "LiquorLicense.com") {
    return { name: "LiquorLicense.com", phone: "800-222-5777" };
  }
  return { name: "Broker not publicly disclosed", note: "Review the source listing" };
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

export default function AdminLeadsClient({ inventory }: { inventory: ListingMatch[] }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"all" | "buyers" | "valuations" | "sellers">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [matchQuery, setMatchQuery] = useState("");
  const [matchMode, setMatchMode] = useState<MatchMode>("all");
  const [copied, setCopied] = useState(false);

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
      setLeads((payload.leads || []).filter((lead) => !isOwnerInquiry(lead)));
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

  const matchResult = useMemo(() => {
    const rawQuery = matchQuery.trim();
    if (!rawQuery) return null;

    const query = rawQuery.toLowerCase();
    const code = rawQuery.toUpperCase();
    const digits = rawQuery.replace(/\D/g, "");
    const buyerLeads = leads.filter(isBuyer);
    const inventoryCounties = Array.from(new Set(inventory.map((listing) => listing.county)));

    const countyForQuery = inventoryCounties.find((county) => {
      const normalized = county.toLowerCase();
      const short = normalized.replace(/\s+county$/, "");
      return normalized === query || short === query || normalized.includes(query);
    }) || "";

    const nameMatches = buyerLeads.filter((lead) => {
      if (matchMode === "buyer_ref") return lead.submissionRef.toUpperCase() === code;
      if (matchMode === "listing_ref") return lead.liveListingRef?.toUpperCase() === code;
      if (matchMode === "county") return countyForQuery ? lead.county === countyForQuery : lead.county.toLowerCase().includes(query);
      if (matchMode === "buyer_name") return lead.fullName.toLowerCase().includes(query);

      const phoneDigits = lead.phone.replace(/\D/g, "");
      return (
        lead.submissionRef.toUpperCase() === code ||
        lead.liveListingRef?.toUpperCase() === code ||
        lead.fullName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (digits.length >= 4 && phoneDigits.includes(digits))
      );
    });

    let requested: ListingMatch | null =
      inventory.find((listing) => listing.sourceRef.toUpperCase() === code) || null;

    let buyers = nameMatches;
    let county = "";
    let licenseType = "";
    let countyWide = matchMode === "county";

    if (!requested && matchMode === "all" && countyForQuery) {
      countyWide = true;
      buyers = buyerLeads.filter((lead) => lead.county === countyForQuery);
    }

    const primaryBuyer =
      buyers.find((lead) => lead.submissionRef.toUpperCase() === code) ||
      buyers.find((lead) => lead.liveListingRef?.toUpperCase() === code) ||
      buyers[0] ||
      null;

    if (!requested && primaryBuyer?.liveListingRef) {
      requested =
        inventory.find((listing) => listing.sourceRef === primaryBuyer.liveListingRef) || null;
    }

    if (countyWide) {
      county = countyForQuery || primaryBuyer?.county || "";
    } else {
      county = primaryBuyer?.county || requested?.county || countyForQuery || "";
      licenseType = primaryBuyer?.licenseType || requested?.type || "";
    }

    if (requested && !buyers.length) {
      buyers = buyerLeads.filter((lead) =>
        lead.liveListingRef?.toUpperCase() === requested?.sourceRef.toUpperCase() ||
        (lead.county === requested?.county && lead.licenseType === requested?.type),
      );
    }

    if (!county && !requested && !buyers.length) {
      return {
        buyer: null,
        buyers: [] as Lead[],
        requested: null,
        matches: [] as ListingMatch[],
        draft: "",
        county: "",
        licenseType: "",
        countyWide: false,
      };
    }

    const matches = inventory
      .filter((listing) => {
        if (!county) return false;
        if (listing.county !== county) return false;
        return countyWide || !licenseType || listing.type === licenseType;
      })
      .sort((a, b) => {
        if (a.type !== b.type) return a.type.localeCompare(b.type);
        return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
      });

    const buyer = primaryBuyer;
    const disclosed = matches.filter((listing) => listing.price !== null);
    const prices = disclosed.map((listing) => listing.price as number);
    const low = prices.length ? Math.min(...prices) : null;
    const high = prices.length ? Math.max(...prices) : null;
    const firstName = buyer?.fullName.split(/\s+/)[0] || "there";
    const inventoryLines = matches.map((listing) =>
      `• ${listing.sourceRef} — ${listing.type} — ${listing.priceLabel} — availability and terms subject to confirmation`,
    ).join("\n");
    const range = low === null ? "with prices available upon confirmation" : `from ${money(low)} to ${money(high)}`;
    const marketLabel = countyWide ? county : `${county} ${licenseType}`;
    const draft = buyer && matches.length
      ? `Hello ${firstName},\n\nThank you for your inquiry. FLLM currently tracks ${matches.length} ${marketLabel} opportunit${matches.length === 1 ? "y" : "ies"} ${range}.\n\n${inventoryLines}\n\nThese are market opportunities identified by FLLM. Availability, pricing, license status, transferability, liens, and transaction terms remain subject to seller or broker confirmation and independent due diligence.\n\nPlease let me know which references you would like us to investigate further.\n\nFlorida Liquor License Market`
      : "";

    return { buyer, buyers, requested, matches, draft, county, licenseType, countyWide };
  }, [inventory, leads, matchMode, matchQuery]);

  async function copyBuyerDraft() {
    if (!matchResult?.draft) return;
    await navigator.clipboard.writeText(matchResult.draft);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
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

      <section className="lead-match-desk" aria-labelledby="lead-match-title">
        <div className="lead-match-heading">
          <div>
            <span>Private inventory intelligence</span>
            <h2 id="lead-match-title">Lead Match Desk</h2>
            <p>Search by buyer name, county, buyer inquiry code, or FLLM listing reference. FLLM will connect matching buyer leads with current license inventory in the same market.</p>
          </div>
          <div className="lead-match-search">
            <div className="lead-match-mode" role="group" aria-label="Lead Match Desk search type">
              {([
                ["all", "All"],
                ["buyer_name", "Buyer Name"],
                ["county", "County"],
                ["listing_ref", "Listing Ref"],
                ["buyer_ref", "Buyer Ref"],
              ] as Array<[MatchMode, string]>).map(([mode, label]) => (
                <button key={mode} type="button" className={matchMode === mode ? "active" : ""} onClick={() => { setMatchMode(mode); setCopied(false); }}>
                  {label}
                </button>
              ))}
            </div>
            <label>
              <span>Lead or market search</span>
              <input
                value={matchQuery}
                onChange={(event) => { setMatchQuery(event.target.value); setCopied(false); }}
                placeholder={matchMode === "county" ? "Marion County" : matchMode === "buyer_name" ? "Michael Gagne" : matchMode === "listing_ref" ? "FLLM-042" : matchMode === "buyer_ref" ? "FLLM-BUYER-…" : "Michael Gagne, Marion County, FLLM-042…"}
              />
            </label>
          </div>
        </div>

        {matchQuery.trim() && matchResult && !matchResult.buyers.length && !matchResult.requested && !matchResult.matches.length && <p className="lead-match-empty">No buyer lead, county, or inventory listing matches that search.</p>}
        {matchResult && (matchResult.buyers.length > 0 || matchResult.requested || matchResult.matches.length > 0) && (
          <div className="lead-match-results">
            <div className="lead-match-summary">
              <div><span>Buyer matches</span><strong>{matchResult.buyers.length === 1 ? matchResult.buyers[0].fullName : `${matchResult.buyers.length} buyer leads`}</strong><small>{matchResult.buyers.length === 1 ? matchResult.buyers[0].email : matchResult.buyers.length ? "Matching the selected market" : "No linked buyer lead"}</small></div>
              <div><span>Requested market</span><strong>{matchResult.county || "Unknown"}</strong><small>{matchResult.countyWide ? "All quota license types" : matchResult.licenseType || "Unknown license type"}</small></div>
              <div><span>Originating source</span><strong>{matchResult.requested?.sourceName || (matchResult.requested ? "Source not recorded" : "Market search")}</strong>{matchResult.requested?.sourceUrl ? <a href={matchResult.requested.sourceUrl} target="_blank" rel="noopener noreferrer">Open private source ↗</a> : <small>{matchResult.requested ? "No source URL recorded" : "No single originating listing"}</small>}</div>
              <div><span>Matching inventory</span><strong>{matchResult.matches.length}</strong><small>{matchResult.countyWide ? "All current county inventory" : "Same county and license type"}</small></div>
            </div>

            {matchResult.buyers.length ? (
              <div className="lead-match-buyers">
                <div className="lead-match-section-title"><span>Matching buyer leads</span><strong>{matchResult.buyers.length}</strong></div>
                <div className="lead-match-table-wrap">
                  <table className="lead-match-table">
                    <thead><tr><th>Buyer</th><th>Contact</th><th>Requested listing</th><th>Market</th><th>Inquiry code</th></tr></thead>
                    <tbody>{matchResult.buyers.map((lead) => (
                      <tr key={lead.id}>
                        <td><strong>{lead.fullName}</strong></td>
                        <td><a href={`mailto:${lead.email}`}>{lead.email}</a>{lead.phone ? <><br /><a href={`tel:${lead.phone}`}>{lead.phone}</a></> : null}</td>
                        <td>{lead.liveListingRef || "General market inquiry"}</td>
                        <td>{lead.county}<br /><small>{lead.licenseType}</small></td>
                        <td><strong>{lead.submissionRef}</strong></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {matchResult.matches.length ? (
              <>
                <div className="lead-match-table-wrap">
                  <table className="lead-match-table">
                    <thead><tr><th>FLLM reference</th><th>Asking price</th><th>Potential source</th><th>Source contact</th><th>Source listing</th></tr></thead>
                    <tbody>{matchResult.matches.map((listing) => {
                      const contact = sourceContact(listing);
                      return (
                        <tr key={listing.sourceRef}>
                          <td><strong>{listing.sourceRef}</strong></td>
                          <td>{listing.priceLabel}</td>
                          <td>{listing.sourceName || "Source not recorded"}</td>
                          <td><strong>{contact.name}</strong>{contact.phone ? <><br /><a href={`tel:${contact.phone}`}>{contact.phone}</a></> : contact.note ? <><br /><small>{contact.note}</small></> : null}</td>
                          <td>{listing.sourceUrl ? <a href={listing.sourceUrl} target="_blank" rel="noopener noreferrer">Review source ↗</a> : "Not recorded"}</td>
                        </tr>
                      );
                    })}</tbody>
                  </table>
                </div>
                {matchResult.draft ? (
                  <div className="lead-match-draft">
                    <div><span>Buyer-ready comparison</span><button type="button" onClick={() => void copyBuyerDraft()}>{copied ? "Copied" : "Copy Buyer Message"}</button></div>
                    <textarea readOnly value={matchResult.draft} aria-label="Buyer-ready comparison message" />
                    <small>Source identities stay inside the private admin view; the buyer receives FLLM references, prices, and confirmation language.</small>
                  </div>
                ) : (
                  <p className="lead-match-empty">This is a market-level search. Select or search a specific buyer to generate a buyer-ready comparison message.</p>
                )}
              </>
            ) : <p className="lead-match-empty">The lead was found, but no same-county inventory matches are currently recorded.</p>}
          </div>
        )}
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
