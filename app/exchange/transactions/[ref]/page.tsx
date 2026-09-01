import Link from "next/link";
import { notFound } from "next/navigation";

import { getExchangeTransaction } from "@/lib/exchange-transaction";

export const dynamic = "force-dynamic";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default async function ExchangeTransactionPage({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const tx = await getExchangeTransaction(decodeURIComponent(ref));
  if (!tx) notFound();

  return (
    <main style={{minHeight:"100vh",background:"linear-gradient(160deg,#061524,#0a2642)",color:"#f7fafc",padding:"44px 20px"}}>
      <div style={{maxWidth:940,margin:"auto"}}>
        <Link href="/" style={{color:"#e4ab2e",fontWeight:900,textDecoration:"none",letterSpacing:".04em"}}>FLORIDA LIQUOR LICENSE MARKET</Link>
        <section style={{marginTop:24,padding:30,border:"1px solid #b98418",borderRadius:16,background:"rgba(7,26,58,.86)",boxShadow:"0 24px 55px rgba(0,0,0,.28)"}}>
          <div style={{fontSize:11,fontWeight:900,letterSpacing:".14em",color:"#e4ab2e"}}>FLLM TRANSACTION ROOM</div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:40,lineHeight:1.08,margin:"8px 0 10px"}}>Price Match Reached</h1>
          <p style={{maxWidth:760,color:"#cfd9e2",lineHeight:1.7}}>The buyer and seller have reached the same proposed price. FLLM has opened this transaction room to organize the remaining terms. This screen records price alignment only; it is not a binding purchase agreement.</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12,margin:"24px 0"}}>
            <div style={{padding:17,border:"1px solid rgba(255,255,255,.11)",borderRadius:9,background:"#041321"}}><span style={{display:"block",fontSize:10,color:"#9fb0bf",marginBottom:6}}>TRANSACTION</span><strong>{tx.transactionRef}</strong></div>
            <div style={{padding:17,border:"1px solid rgba(255,255,255,.11)",borderRadius:9,background:"#041321"}}><span style={{display:"block",fontSize:10,color:"#9fb0bf",marginBottom:6}}>LISTING</span><strong>{tx.listingRef}</strong></div>
            <div style={{padding:17,border:"1px solid rgba(255,255,255,.11)",borderRadius:9,background:"#041321"}}><span style={{display:"block",fontSize:10,color:"#9fb0bf",marginBottom:6}}>MATCHED PRICE</span><strong style={{fontSize:24,color:"#f2c65d"}}>{money(tx.matchedPrice)}</strong></div>
            <div style={{padding:17,border:"1px solid rgba(255,255,255,.11)",borderRadius:9,background:"#041321"}}><span style={{display:"block",fontSize:10,color:"#9fb0bf",marginBottom:6}}>STATUS</span><strong>{tx.status.replaceAll("_"," ").toUpperCase()}</strong></div>
          </div>

          <h2 style={{fontFamily:"Georgia,serif",fontSize:25,margin:"28px 0 12px"}}>Terms Still to Be Completed</h2>
          <div style={{border:"1px solid rgba(255,255,255,.12)",borderRadius:10,overflow:"hidden"}}>
            {[
              ["Proposed Purchase Price", money(tx.matchedPrice), "Matched"],
              ["Deposit / Escrow", "To be agreed", "Pending"],
              ["Target Closing Date", "To be agreed", "Pending"],
              ["Financing / Proof of Funds", "To be confirmed", "Pending"],
              ["Lien / Encumbrance Review", "Due diligence required", "Pending"],
              ["DBPR Transfer / Regulatory Approval", "Required", "Pending"],
              ["Definitive Purchase Agreement", "Not yet executed", "Pending"],
            ].map(([term,value,status],index)=><div key={term} style={{display:"grid",gridTemplateColumns:"minmax(180px,1.2fr) minmax(180px,1fr) 100px",gap:12,padding:"14px 16px",background:index%2?"rgba(255,255,255,.025)":"rgba(0,0,0,.08)",borderBottom:index<6?"1px solid rgba(255,255,255,.08)":"0"}}><strong>{term}</strong><span style={{color:"#d4dde5"}}>{value}</span><span style={{color:status==="Matched"?"#f1c75f":"#a9b7c3",fontWeight:800}}>{status}</span></div>)}
          </div>

          <div style={{marginTop:24,padding:18,borderLeft:"4px solid #e4ab2e",background:"rgba(228,171,46,.08)",lineHeight:1.65}}>
            <strong>Important:</strong> “Price Match Reached” means the buyer bid and seller ask/counter have aligned on a proposed price. It does not itself transfer the license, create a binding purchase contract, establish escrow, satisfy liens, or constitute DBPR approval.
          </div>
          <div style={{marginTop:22,display:"flex",gap:12,flexWrap:"wrap"}}>
            <Link href={`/listings/${tx.listingRef.toLowerCase()}`} style={{padding:"12px 16px",borderRadius:7,background:"#e2a51e",color:"#071a3a",fontWeight:900,textDecoration:"none"}}>Return to License</Link>
            <Link href="/contact" style={{padding:"12px 16px",borderRadius:7,border:"1px solid #e2a51e",color:"#f1c75f",fontWeight:900,textDecoration:"none"}}>Contact FLLM</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
