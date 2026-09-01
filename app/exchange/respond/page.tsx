import Link from "next/link";

import { getExchangeOrder, verifyExchangeToken } from "@/lib/exchange-store";

export const dynamic = "force-dynamic";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default async function ExchangeRespondPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  const access = token ? await verifyExchangeToken(token) : null;
  const order = access?.order_id ? await getExchangeOrder(access.order_id) : null;

  if (!access || !order) {
    return <main style={{minHeight:"100vh",background:"#071a3a",color:"white",padding:"60px 20px"}}><div style={{maxWidth:760,margin:"auto"}}><h1>FLLM Exchange Link Unavailable</h1><p>This secure exchange link is invalid or expired.</p><Link href="/listings" style={{color:"#e5ad32"}}>Return to listings →</Link></div></main>;
  }

  const sellerMode = access.actor_role === "seller" && order.side === "bid";
  return (
    <main style={{minHeight:"100vh",background:"#071a3a",color:"white",padding:"44px 20px"}}>
      <div style={{maxWidth:820,margin:"auto"}}>
        <Link href="/" style={{color:"#e5ad32",textDecoration:"none",fontWeight:800}}>FLORIDA LIQUOR LICENSE MARKET</Link>
        <div style={{marginTop:24,padding:28,border:"1px solid #ba891d",borderRadius:14,background:"#0b2540"}}>
          <div style={{fontSize:11,letterSpacing:".12em",color:"#e5ad32",fontWeight:900}}>FLLM EXCHANGE</div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:34,margin:"8px 0 12px"}}>{sellerMode ? "Review Buyer Bid" : "Exchange Status"}</h1>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,margin:"20px 0"}}>
            <div style={{padding:15,background:"#061524",borderRadius:8}}><span style={{display:"block",fontSize:10,color:"#aebbc6"}}>LISTING</span><strong>{order.listingRef}</strong></div>
            <div style={{padding:15,background:"#061524",borderRadius:8}}><span style={{display:"block",fontSize:10,color:"#aebbc6"}}>{order.side === "bid" ? "BUYER BID" : "SELLER COUNTER"}</span><strong style={{fontSize:22}}>{money(order.price)}</strong></div>
            <div style={{padding:15,background:"#061524",borderRadius:8}}><span style={{display:"block",fontSize:10,color:"#aebbc6"}}>STATUS</span><strong>{order.status.replaceAll("_"," ").toUpperCase()}</strong></div>
          </div>

          {sellerMode ? <SellerResponse token={token} bid={order.price} /> : (
            <div>
              <p style={{lineHeight:1.7,color:"#d9e1e7"}}>{order.side === "ask" ? `The seller countered at ${money(order.price)}. You may return to the listing and place a new bid at or above this amount to create a price match.` : "Your bid has been recorded. The seller has a secure link to accept or counter."}</p>
              <Link href={`/listings/${order.listingRef.toLowerCase()}`} style={{display:"inline-block",marginTop:8,color:"#e5ad32",fontWeight:800}}>Return to listing →</Link>
            </div>
          )}
          <p style={{marginTop:24,fontSize:12,lineHeight:1.6,color:"#aebbc6"}}>FLLM Exchange records proposed pricing and negotiation status. An accepted bid, counteroffer or price match is not itself a binding purchase agreement. Final closing terms, contingencies, due diligence, DBPR approval and any definitive purchase agreement remain separate.</p>
        </div>
      </div>
    </main>
  );
}

function SellerResponse({ token, bid }: { token: string; bid: number }) {
  return (
    <form action="/api/exchange/respond" method="post" id="exchange-response-form" style={{marginTop:18}}>
      <input type="hidden" name="token" value={token} />
      <p style={{lineHeight:1.7,color:"#d9e1e7"}}>You can accept the buyer's proposed price or counter at a different amount. Accepting records a <strong>non-binding price match</strong> and opens the FLLM Transaction Room.</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:16}}>
        <button type="button" data-action="accept" style={{padding:"12px 18px",border:0,borderRadius:7,background:"#e2a51e",color:"#071a3a",fontWeight:900,cursor:"pointer"}}>Accept {money(bid)}</button>
        <input name="counterPrice" inputMode="numeric" placeholder="Counter price" style={{padding:"12px 13px",borderRadius:7,border:"1px solid #8090a0",minWidth:180}} />
        <button type="button" data-action="counter" style={{padding:"12px 18px",border:"1px solid #e2a51e",borderRadius:7,background:"transparent",color:"#f2c85d",fontWeight:900,cursor:"pointer"}}>Send Counteroffer</button>
      </div>
      <p id="exchange-response-status" style={{minHeight:22,marginTop:14,color:"#f6d889"}}></p>
      <script dangerouslySetInnerHTML={{__html:`(()=>{const f=document.getElementById('exchange-response-form');if(!f)return;const s=document.getElementById('exchange-response-status');f.querySelectorAll('button[data-action]').forEach(b=>b.addEventListener('click',async()=>{s.textContent='Saving…';const action=b.dataset.action;const counter=Number(String(f.counterPrice?.value||'').replace(/[^0-9.]/g,''));try{const r=await fetch('/api/exchange/respond',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:${JSON.stringify(token)},action,counterPrice:counter})});const j=await r.json();if(!r.ok)throw new Error(j.error||'Unable to save response.');if(j.matched&&j.transactionRef){window.location.href='/exchange/transactions/'+encodeURIComponent(j.transactionRef);return;}s.textContent=action==='counter'?'Counteroffer sent to buyer.':'Response saved.';}catch(e){s.textContent=e instanceof Error?e.message:'Unable to save response.';}}));})();`}} />
    </form>
  );
}
