"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import AdminCodeLogin from "@/components/AdminCodeLogin";

type Prospect = {
  id:string; business_name:string|null; legal_entity_name:string|null; owner_name:string|null; owner_email:string|null; owner_phone:string|null;
  website_url:string|null; business_type:string; county:string|null; city:string|null; license_type:string|null; license_number:string|null;
  source_platform:string|null; source_url:string|null; listing_title:string|null; listing_url:string|null; broker_name:string|null; brokerage:string|null;
  identification_confidence:number|null; research_status:string; research_run_id:string|null; research_result:Record<string,unknown>; source_urls:string[];
  ownership_notes:string|null; status:string; do_not_contact:boolean; last_contacted_at:string|null; next_contact_at:string|null; notes:string|null;
  created_at:string;
};
type Message={id:string;prospect_id:string;subject_line:string;body_html:string;body_text:string;status:string;sent_at:string|null;error_message:string|null;created_at:string};
type Payload={prospects:Prospect[];messages:Message[];tinyFishConfigured:boolean;error?:string};

const emptyForm={
  business_name:"",legal_entity_name:"",owner_name:"",owner_email:"",owner_phone:"",website_url:"",
  business_type:"Restaurant",county:"",city:"",license_type:"",license_number:"",
  source_platform:"BizBuySell",source_url:"",listing_title:"",listing_url:"",broker_name:"",brokerage:"",
  identification_confidence:"",ownership_notes:"",notes:""
};

function sourceHost(url:string){
  try{return new URL(url).hostname.replace(/^www\./,"");}catch{return "Public source";}
}

export default function AdminOwnerOutreachClient(){
  const [authenticated,setAuthenticated]=useState<boolean|null>(null);
  const [prospects,setProspects]=useState<Prospect[]>([]);
  const [messages,setMessages]=useState<Message[]>([]);
  const [tinyFishConfigured,setTinyFishConfigured]=useState(false);
  const [selectedId,setSelectedId]=useState("");
  const [search,setSearch]=useState("");
  const [statusFilter,setStatusFilter]=useState("all");
  const [working,setWorking]=useState(false);
  const [error,setError]=useState("");
  const [notice,setNotice]=useState("");
  const [form,setForm]=useState(emptyForm);

  const load=useCallback(async()=>{
    setWorking(true);setError("");
    try{
      const response=await fetch("/api/admin/owner-outreach",{cache:"no-store"});
      if(response.status===401){setAuthenticated(false);return;}
      const payload=await response.json() as Payload;
      if(!response.ok) throw new Error(payload.error||"Could not load owner outreach.");
      setAuthenticated(true);setProspects(payload.prospects||[]);setMessages(payload.messages||[]);setTinyFishConfigured(Boolean(payload.tinyFishConfigured));
      if(!selectedId&&payload.prospects?.[0]) setSelectedId(payload.prospects[0].id);
    }catch(cause){setError(cause instanceof Error?cause.message:"Could not load owner outreach.");}
    finally{setWorking(false);}
  },[selectedId]);

  useEffect(()=>{void load();},[load]);

  async function action(body:Record<string,unknown>){
    setWorking(true);setError("");setNotice("");
    try{
      const response=await fetch("/api/admin/owner-outreach",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      const payload=await response.json();
      if(!response.ok) throw new Error(payload.error||"Owner outreach action failed.");
      await load();return payload;
    }catch(cause){setError(cause instanceof Error?cause.message:"Owner outreach action failed.");return null;}
    finally{setWorking(false);}
  }

  async function addProspect(event:FormEvent){
    event.preventDefault();
    const payload=await action({action:"create_prospect",...form});
    if(payload){setForm(emptyForm);setSelectedId(payload.prospect.id);setNotice("Prospect added to the owner-research queue.");}
  }
  async function logout(){await fetch("/api/admin/session",{method:"DELETE"});setAuthenticated(false);}

  const selected=prospects.find(p=>p.id===selectedId)||prospects[0]||null;
  const selectedMessages=selected?messages.filter(m=>m.prospect_id===selected.id):[];
  const latestMessage=selectedMessages[0]||null;
  const visible=useMemo(()=>{
    const q=search.trim().toLowerCase();
    return prospects.filter(p=>{
      if(statusFilter!=="all"&&p.status!==statusFilter&&p.research_status!==statusFilter)return false;
      if(!q)return true;
      return [p.business_name,p.legal_entity_name,p.owner_name,p.owner_email,p.county,p.city,p.license_type,p.listing_title,p.broker_name,p.brokerage]
        .filter(Boolean).some(v=>String(v).toLowerCase().includes(q));
    });
  },[prospects,search,statusFilter]);

  const researching=prospects.filter(p=>p.research_status==="researching").length;
  const verified=prospects.filter(p=>p.research_status==="verified").length;
  const ready=prospects.filter(p=>p.owner_email&&!p.do_not_contact).length;
  const contacted=prospects.filter(p=>p.status==="contacted").length;

  if(authenticated===false){
    return <main className="owner-outreach-page"><AdminCodeLogin title="Owner Identification & Outreach" onAuthenticated={load}/></main>;
  }

  return <main className="owner-outreach-page">
    <header className="owner-header">
      <div><span>Private FLLM administration</span><h1>Owner Identification &amp; Outreach</h1><p>Research confidential business listings, verify ownership and license classifications, then prepare neutral FLLM corporate outreach.</p></div>
      <nav>
        <Link href="/admin/broker-outreach">Broker Outreach</Link>
        <Link href="/admin/leads">Lead Database</Link>
        <button type="button" onClick={()=>void load()} disabled={working}>Refresh</button>
        <button type="button" onClick={()=>void logout()}>Sign Out</button>
      </nav>
    </header>

    <section className="owner-stats">
      <div><span>Research Records</span><strong>{prospects.length}</strong></div>
      <div><span>Researching</span><strong>{researching}</strong></div>
      <div><span>Verified / 80%+</span><strong>{verified}</strong></div>
      <div><span>Public Email Found</span><strong>{ready}</strong></div>
      <div><span>Contacted</span><strong>{contacted}</strong></div>
    </section>

    {!tinyFishConfigured&&<aside className="owner-warning"><strong>Automated research is not connected.</strong><span>Add the server-side TINYFISH_API_KEY to enable one-click public-record research. Manual prospect entry and email drafting still work.</span></aside>}
    {error&&<p className="owner-error">{error}</p>}
    {notice&&<p className="owner-notice">{notice}</p>}

    <aside className="owner-protection-note">
      <strong>Broker relationship protection:</strong>
      <span>FLLM broker featured listings are automatically excluded from this owner-email system. Owner research and direct owner outreach must not be used to bypass or compete with an FLLM featured broker relationship.</span>
    </aside>

    <section className="owner-workflow">
      <div><b>1</b><span><strong>Capture listing</strong><small>BizBuySell, BizQuest, broker site or other public source.</small></span></div>
      <div><b>2</b><span><strong>Research identity</strong><small>Match clues; verify DBPR, Sunbiz and public sources.</small></span></div>
      <div><b>3</b><span><strong>Review confidence</strong><small>Keep uncertain matches clearly labeled.</small></span></div>
      <div><b>4</b><span><strong>Prepare outreach</strong><small>Never state that the business is known to be for sale.</small></span></div>
      <div><b>5</b><span><strong>Send &amp; track</strong><small>Corporate FLLM email with opt-out ledger.</small></span></div>
    </section>

    <section className="owner-main-grid">
      <div className="owner-left">
        <form className="owner-form" onSubmit={addProspect}>
          <div className="section-title"><span>New Research Target</span><h2>Add a business-for-sale lead</h2></div>
          <div className="form-grid">
            <label className="wide">Source listing URL *<input required value={form.listing_url} onChange={e=>setForm({...form,listing_url:e.target.value,source_url:e.target.value})} placeholder="https://www.bizbuysell.com/..." /></label>
            <label className="wide">Listing title<input value={form.listing_title} onChange={e=>setForm({...form,listing_title:e.target.value})}/></label>
            <label>Source platform<input value={form.source_platform} onChange={e=>setForm({...form,source_platform:e.target.value})}/></label>
            <label>Business type<select value={form.business_type} onChange={e=>setForm({...form,business_type:e.target.value})}><option>Restaurant</option><option>Bar</option><option>Liquor Store</option><option>Nightclub</option><option>Gentlemen's Club</option><option>Marina</option><option>Country Club</option><option>Hotel / Motel</option><option>Other Hospitality</option></select></label>
            <label>County<input value={form.county} onChange={e=>setForm({...form,county:e.target.value})}/></label>
            <label>City<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></label>
            <label>Advertised license<input value={form.license_type} onChange={e=>setForm({...form,license_type:e.target.value})} placeholder="4COP / 4COP Quota / 4COP SFS"/></label>
            <label>Broker<input value={form.broker_name} onChange={e=>setForm({...form,broker_name:e.target.value})}/></label>
            <label>Brokerage<input value={form.brokerage} onChange={e=>setForm({...form,brokerage:e.target.value})}/></label>
            <label className="wide">Initial clues / notes<textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Revenue, SDE, square footage, establishment year, cuisine, lease, distinctive equipment, etc."/></label>
          </div>
          <button type="submit" disabled={working}>Add to Research Queue</button>
        </form>

        <div className="owner-list-head">
          <div className="section-title"><span>Owner Prospect Database</span><h2>Research queue</h2></div>
          <div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search business, owner, county, license"/><select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="all">All statuses</option><option value="new">New</option><option value="researching">Researching</option><option value="needs_review">Needs review</option><option value="verified">Verified</option><option value="draft_ready">Draft ready</option><option value="contacted">Contacted</option></select></div>
        </div>

        <div className="owner-list">
          {visible.map(p=><button key={p.id} className={selected?.id===p.id?"owner-row active":"owner-row"} onClick={()=>setSelectedId(p.id)}>
            <span className={"research-dot "+p.research_status}/>
            <span><strong>{p.business_name||p.listing_title||"Unidentified business"}</strong><small>{p.county||"County unknown"} · {p.license_type||"License unverified"}</small></span>
            <span className="confidence">{p.identification_confidence==null?"—":p.identification_confidence+"%"}</span>
            <span className="row-status">{p.research_status.replaceAll("_"," ")}</span>
          </button>)}
        </div>
      </div>

      <aside className="owner-detail">
        {!selected?<div className="empty">Add or select a prospect.</div>:<>
          <div className="detail-title"><span>{selected.research_status.replaceAll("_"," ")}</span><h2>{selected.business_name||"Unidentified business"}</h2><p>{selected.listing_title||"No source listing title entered"}</p></div>
          <div className="detail-actions">
            {(selected.listing_url||selected.source_url)&&<a href={selected.listing_url||selected.source_url||"#"} target="_blank">Open Source Listing</a>}
            {selected.website_url&&<a href={selected.website_url} target="_blank">Business Website</a>}
            {selected.research_status!=="researching"?<button type="button" disabled={working||!tinyFishConfigured} onClick={async()=>{const r=await action({action:"start_research",id:selected.id});if(r)setNotice("Public-record research started. Use Refresh Research in a moment to collect the results.");}}>Start Public Research</button>:<button type="button" disabled={working} onClick={async()=>{const r=await action({action:"refresh_research",id:selected.id});if(r?.run?.status==="RUNNING"||r?.run?.status==="PENDING")setNotice("Research is still running.");else if(r)setNotice("Research results collected and the prospect record was updated.");}}>Refresh Research</button>}
          </div>

          <div className="identity-grid">
            <div><span>Match confidence</span><strong>{selected.identification_confidence==null?"Not scored":selected.identification_confidence+"%"}</strong></div>
            <div><span>Legal entity</span><strong>{selected.legal_entity_name||"Not verified"}</strong></div>
            <div><span>Owner / member</span><strong>{selected.owner_name||"Not verified"}</strong></div>
            <div><span>Public email</span><strong>{selected.owner_email||"Not found"}</strong></div>
            <div><span>License</span><strong>{selected.license_type||"Not verified"}{selected.license_number?" · "+selected.license_number:""}</strong></div>
            <div><span>Broker</span><strong>{selected.broker_name||"Not entered"}{selected.brokerage?" · "+selected.brokerage:""}</strong></div>
          </div>

          {selected.ownership_notes&&<div className="research-notes"><span>Research notes</span><p>{selected.ownership_notes}</p></div>}
          {selected.source_urls?.length>0&&<div className="source-links"><span>Public record sources</span>{selected.source_urls.map((url,i)=><a key={url+i} href={url} target="_blank">{sourceHost(url)} ↗</a>)}</div>}

          <div className="email-panel">
            <div className="section-title"><span>Corporate Outreach</span><h2>Neutral owner introduction</h2></div>
            <p>The template introduces FLLM without claiming that the identified business is currently for sale or that a broker disclosed it.</p>
            {!latestMessage?<button type="button" disabled={working||!selected.owner_email} onClick={()=>void action({action:"create_message",id:selected.id})}>Create Email Draft</button>:<>
              <div className="email-meta"><span>To</span><strong>{selected.owner_email}</strong><span>Subject</span><strong>{latestMessage.subject_line}</strong><em>{latestMessage.status}</em></div>
              <iframe title="Owner outreach email preview" srcDoc={latestMessage.body_html}/>
              <div className="email-actions">
                <button type="button" disabled={working} onClick={()=>void action({action:"regenerate_message",id:latestMessage.id})}>Regenerate</button>
                {latestMessage.status!=="sent"&&<button className="send" type="button" disabled={working||selected.do_not_contact} onClick={()=>{if(window.confirm("Send this FLLM owner outreach email now?"))void action({action:"send_message",id:latestMessage.id});}}>Approve &amp; Send</button>}
              </div>
            </>}
          </div>
        </>}
      </aside>
    </section>
  </main>;
}
