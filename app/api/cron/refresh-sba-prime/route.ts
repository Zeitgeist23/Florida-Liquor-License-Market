import { NextResponse } from "next/server";
import { supabaseServiceSettings } from "@/lib/supabase-settings";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const CSV_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv?id=DPRIME";
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({error:"Unauthorized"},{status:401});
  }
  try {
    const start=new Date(Date.now()-35*86400000).toISOString().slice(0,10);
    const response=await fetch(`${CSV_URL}&cosd=${start}`,{cache:"no-store",signal:AbortSignal.timeout(15000)});
    if (!response.ok) throw new Error(`Prime-rate feed HTTP ${response.status}`);
    const lines=(await response.text()).trim().split(/\r?\n/);
    const rows=lines.slice(1).map(line=>line.split(",")).filter(parts=>parts.length===2 && /^\d{4}-\d{2}-\d{2}$/.test(parts[0]) && /^\d+(?:\.\d+)?$/.test(parts[1]));
    const last=rows.at(-1);
    if(!last) throw new Error("Prime-rate feed has no numeric observation");
    const rate=Number(last[1])/100;
    const observationDate=last[0];
    const lagDays=(Date.now()-new Date(observationDate+"T00:00:00Z").getTime())/86400000;
    if(!Number.isFinite(rate)||rate<0.01||rate>0.25||lagDays<0||lagDays>14) throw new Error("Invalid or stale prime-rate observation");
    const {url,key}=supabaseServiceSettings("SBA prime-rate cache unavailable");
    const saved=await fetch(`${url}/rest/v1/sba_prime_rate_cache?on_conflict=series_id`,{
      method:"POST",headers:{"apikey":key,"Authorization":`Bearer ${key}`,"Content-Type":"application/json","Prefer":"resolution=merge-duplicates"},
      body:JSON.stringify({series_id:"DPRIME",annual_rate:rate,observation_date:observationDate,source_url:CSV_URL,refreshed_at:new Date().toISOString()}),
      cache:"no-store"
    });
    if(!saved.ok) throw new Error(`Prime rate cache write HTTP ${saved.status}`);
    console.info("SBA prime-rate refresh verified", {series:"DPRIME",observationDate,annualRate:rate});
    return NextResponse.json({ok:true,observationDate,annualRate:rate});
  } catch(error) {
    console.error("SBA prime-rate refresh failed",error);
    return NextResponse.json({error:"Unable to refresh SBA reference rate; prior verified rate retained."},{status:503});
  }
}
