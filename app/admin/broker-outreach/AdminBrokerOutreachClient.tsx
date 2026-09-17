"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import AdminCodeLogin from "@/components/AdminCodeLogin";

type Prospect = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  brokerage: string | null;
  website_url: string | null;
  source_platform: string | null;
  source_url: string | null;
  listing_title: string | null;
  listing_url: string | null;
  county: string | null;
  license_type: string | null;
  listing_kind: "license_only" | "business_with_license" | "unknown";
  languages: string[];
  outreach_template: "female" | "male" | "neutral";
  template_basis: string;
  status: string;
  do_not_contact: boolean;
  last_contacted_at: string | null;
  next_contact_at: string | null;
  notes: string | null;
  created_at: string;
};

type Campaign = {
  id: string;
  campaign_week: string;
  name: string;
  subject_line: string;
  status: string;
  created_at: string;
};

type Message = {
  id: string;
  campaign_id: string | null;
  prospect_id: string;
  template_mode: "female" | "male" | "neutral";
  subject_line: string;
  body_text: string;
  body_html: string;
  status: string;
  sent_at: string | null;
  error_message: string | null;
  created_at: string;
};

type Payload = { prospects: Prospect[]; campaigns: Campaign[]; messages: Message[]; error?: string };

const emptyForm = {
  full_name: "",
  email: "",
  phone: "",
  brokerage: "",
  website_url: "",
  source_platform: "",
  listing_title: "",
  listing_url: "",
  county: "",
  license_type: "4COP Quota",
  listing_kind: "license_only",
  languages: "English",
  outreach_template: "neutral",
  notes: "",
};

export default function AdminBrokerOutreachClient() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState("");
  const [search, setSearch] = useState("");
  const [kindFilter, setKindFilter] = useState("all");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setWorking(true);
    setError("");
    try {
      const response = await fetch("/api/admin/broker-outreach", { cache: "no-store" });
      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }
      const payload = (await response.json()) as Payload;
      if (!response.ok) throw new Error(payload.error || "Could not load broker outreach.");
      setAuthenticated(true);
      setProspects(payload.prospects || []);
      setCampaigns(payload.campaigns || []);
      setMessages(payload.messages || []);
      if (!selectedMessageId && payload.messages?.[0]) setSelectedMessageId(payload.messages[0].id);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load broker outreach.");
    } finally {
      setWorking(false);
    }
  }, [selectedMessageId]);

  useEffect(() => { void load(); }, [load]);

  async function action(body: Record<string, unknown>) {
    setWorking(true);
    setError("");
    try {
      const response = await fetch("/api/admin/broker-outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Broker outreach action failed.");
      await load();
      return payload;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Broker outreach action failed.");
      return null;
    } finally {
      setWorking(false);
    }
  }

  async function addProspect(event: FormEvent) {
    event.preventDefault();
    const payload = await action({
      action: "create_prospect",
      ...form,
      languages: form.languages.split(",").map((v) => v.trim()).filter(Boolean),
    });
    if (payload) setForm(emptyForm);
  }

  async function updateProspect(id: string, patch: Record<string, unknown>) {
    await action({ action: "update_prospect", id, patch });
  }

  const visibleProspects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return prospects.filter((p) => {
      if (kindFilter !== "all" && p.listing_kind !== kindFilter) return false;
      if (!query) return true;
      return [p.full_name, p.email, p.phone, p.brokerage, p.county, p.license_type, p.listing_title, p.source_platform]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [kindFilter, prospects, search]);

  const prospectMap = useMemo(() => new Map(prospects.map((p) => [p.id, p])), [prospects]);
  const selectedMessage = messages.find((m) => m.id === selectedMessageId) || messages[0] || null;
  const selectedProspect = selectedMessage ? prospectMap.get(selectedMessage.prospect_id) : null;
  const latestCampaign = campaigns[0] || null;
  const latestMessages = latestCampaign ? messages.filter((m) => m.campaign_id === latestCampaign.id) : [];
  const queued = prospects.filter((p) => ["new", "queued", "follow_up"].includes(p.status) && !p.do_not_contact && p.email).length;
  const contacted = prospects.filter((p) => p.status === "contacted").length;
  const optedOut = prospects.filter((p) => p.do_not_contact).length;

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
  }

  if (authenticated === false) {
    return <main className="outreach-page"><AdminCodeLogin title="Broker Outreach" onAuthenticated={load} /></main>;
  }

  return (
    <main className="outreach-page">
      <header className="outreach-header">
        <div>
          <span>Private FLLM administration</span>
          <h1>Broker Outreach</h1>
          <p>Prospect database, broker-specific email builder and weekly draft campaign queue.</p>
        </div>
        <nav>
          <Link href="/admin/leads">Lead Database</Link>
          <Link href="/admin/listing-submissions">Listing Review</Link>
          <button type="button" onClick={() => void load()} disabled={working}>Refresh</button>
          <button type="button" onClick={() => void logout()}>Sign Out</button>
        </nav>
      </header>

      <section className="outreach-stats">
        <div><span>Broker Prospects</span><strong>{prospects.length}</strong></div>
        <div><span>Ready for Campaign</span><strong>{queued}</strong></div>
        <div><span>Contacted</span><strong>{contacted}</strong></div>
        <div><span>Opted Out</span><strong>{optedOut}</strong></div>
      </section>

      {error && <p className="outreach-error">{error}</p>}

      <section className="campaign-panel">
        <div>
          <span>Weekly Campaign Queue</span>
          <h2>{latestCampaign ? latestCampaign.name : "No weekly campaign generated yet"}</h2>
          <p>The Monday automation creates drafts only. Nothing is sent until you approve it here.</p>
        </div>
        <div className="campaign-actions">
          <button type="button" onClick={() => void action({ action: "generate_campaign" })} disabled={working}>Generate This Week’s Drafts</button>
          {latestCampaign && latestMessages.some((m) => m.status !== "sent") && (
            <button className="send" type="button" disabled={working} onClick={() => {
              if (window.confirm(`Send ${latestMessages.filter((m) => m.status !== "sent").length} broker outreach emails now?`)) {
                void action({ action: "send_campaign", id: latestCampaign.id });
              }
            }}>Approve &amp; Send Campaign</button>
          )}
        </div>
      </section>

      <section className="email-builder">
        <div className="email-list">
          <div className="section-title"><span>Email Builder</span><h2>Review every generated broker email</h2></div>
          {latestMessages.length === 0 && <div className="empty">Generate a weekly campaign after adding eligible broker prospects.</div>}
          {latestMessages.map((message) => {
            const prospect = prospectMap.get(message.prospect_id);
            return (
              <button key={message.id} className={selectedMessageId === message.id ? "email-row active" : "email-row"} onClick={() => setSelectedMessageId(message.id)}>
                <span>{message.template_mode}</span>
                <strong>{prospect?.full_name || "Unknown broker"}</strong>
                <small>{prospect?.listing_kind === "business_with_license" ? "Business + quota license" : "License only"} · {message.status}</small>
              </button>
            );
          })}
        </div>
        <div className="email-preview">
          {selectedMessage ? (
            <>
              <div className="email-preview-head">
                <div><span>To</span><strong>{selectedProspect?.email || "No email"}</strong><span>Subject</span><strong>{selectedMessage.subject_line}</strong></div>
                <div className="preview-actions">
                  <a href={selectedMessage.template_mode === "male" ? "/brokers/sample-featured-listing-male" : "/brokers/sample-featured-listing"} target="_blank">Open Sample Listing</a>
                  <button type="button" onClick={() => void action({ action: "regenerate_message", id: selectedMessage.id })} disabled={working}>Regenerate</button>
                  {selectedMessage.status !== "sent" && <button className="send" type="button" onClick={() => void action({ action: "send_message", id: selectedMessage.id })} disabled={working}>Send This Email</button>}
                </div>
              </div>
              <iframe title="Broker outreach email preview" srcDoc={selectedMessage.body_html} />
            </>
          ) : <div className="empty">Select a generated email to preview it.</div>}
        </div>
      </section>

      <section className="sample-links">
        <div><span>Female presentation</span><strong>Emma Brooks</strong><p>Use only when the presentation mode has been manually confirmed or selected.</p><Link href="/brokers/sample-featured-listing" target="_blank">Open Emma sample →</Link></div>
        <div><span>Male presentation</span><strong>Alex Morgan</strong><p>Uses the existing fictitious AI-generated male broker portrait and sample identity.</p><Link href="/brokers/sample-featured-listing-male" target="_blank">Open Alex sample →</Link></div>
        <div><span>Neutral presentation</span><strong>No inferred gender</strong><p>Default for prospects where no presentation preference or confirmed information exists.</p></div>
      </section>

      <section className="prospect-section">
        <div className="prospect-top">
          <div className="section-title"><span>Broker Prospect Database</span><h2>License listings and businesses with quota licenses</h2></div>
          <div className="prospect-filters">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search broker, county, listing or brokerage" />
            <select value={kindFilter} onChange={(e) => setKindFilter(e.target.value)}><option value="all">All prospect types</option><option value="license_only">License only</option><option value="business_with_license">Business + license</option><option value="unknown">Unknown</option></select>
          </div>
        </div>

        <form className="prospect-form" onSubmit={addProspect}>
          <h3>Add a Broker Prospect</h3>
          <div className="form-grid">
            <label>Name *<input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label>
            <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
            <label>Brokerage<input value={form.brokerage} onChange={(e) => setForm({ ...form, brokerage: e.target.value })} /></label>
            <label>County<input value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} /></label>
            <label>License type<select value={form.license_type} onChange={(e) => setForm({ ...form, license_type: e.target.value })}><option>4COP Quota</option><option>3PS Quota / Package Store</option></select></label>
            <label>Listing type<select value={form.listing_kind} onChange={(e) => setForm({ ...form, listing_kind: e.target.value })}><option value="license_only">License only</option><option value="business_with_license">Business + quota license</option><option value="unknown">Unknown</option></select></label>
            <label>Presentation<select value={form.outreach_template} onChange={(e) => setForm({ ...form, outreach_template: e.target.value })}><option value="neutral">Neutral</option><option value="female">Female / Emma</option><option value="male">Male / Alex</option></select></label>
            <label>Languages<input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} placeholder="English, Spanish" /></label>
            <label>Source platform<input value={form.source_platform} onChange={(e) => setForm({ ...form, source_platform: e.target.value })} /></label>
            <label className="wide">Listing title<input value={form.listing_title} onChange={(e) => setForm({ ...form, listing_title: e.target.value })} /></label>
            <label className="wide">Listing URL<input value={form.listing_url} onChange={(e) => setForm({ ...form, listing_url: e.target.value })} /></label>
            <label className="wide">Website<input value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} /></label>
            <label className="wide">Notes<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
          </div>
          <button type="submit" disabled={working}>Add Broker Prospect</button>
        </form>

        <div className="prospect-list">
          {visibleProspects.map((prospect) => (
            <article key={prospect.id} className="prospect-card">
              <div className="prospect-heading">
                <div><span>{prospect.listing_kind === "business_with_license" ? "Business + quota license" : prospect.listing_kind === "license_only" ? "License only" : "Unclassified"}</span><h3>{prospect.full_name}</h3><p>{prospect.brokerage || "Brokerage not entered"}</p></div>
                <div className="prospect-status">{prospect.status}</div>
              </div>
              <div className="prospect-grid">
                <div><strong>Email</strong><a href={prospect.email ? `mailto:${prospect.email}` : undefined}>{prospect.email || "Not entered"}</a></div>
                <div><strong>Phone</strong><span>{prospect.phone || "Not entered"}</span></div>
                <div><strong>County</strong><span>{prospect.county || "Not entered"}</span></div>
                <div><strong>License</strong><span>{prospect.license_type || "Not entered"}</span></div>
                <div><strong>Languages</strong><span>{prospect.languages?.join(", ") || "Not entered"}</span></div>
                <div><strong>Presentation</strong><select value={prospect.outreach_template} onChange={(e) => void updateProspect(prospect.id, { outreach_template: e.target.value, template_basis: "manual" })}><option value="neutral">Neutral</option><option value="female">Female / Emma</option><option value="male">Male / Alex</option></select></div>
              </div>
              {prospect.listing_title && <p className="listing-title"><strong>Listing:</strong> {prospect.listing_title}</p>}
              <div className="prospect-actions">
                {prospect.listing_url && <a href={prospect.listing_url} target="_blank">Open Source Listing</a>}
                <select value={prospect.status} onChange={(e) => void updateProspect(prospect.id, { status: e.target.value })}><option value="new">New</option><option value="queued">Queued</option><option value="contacted">Contacted</option><option value="follow_up">Follow-up</option><option value="converted">Converted</option><option value="not_interested">Not interested</option><option value="opted_out">Opted out</option></select>
                <label><input type="checkbox" checked={prospect.do_not_contact} onChange={(e) => void updateProspect(prospect.id, { do_not_contact: e.target.checked, status: e.target.checked ? "opted_out" : prospect.status })} /> Do not contact</label>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
