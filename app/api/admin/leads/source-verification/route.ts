import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
const statuses = new Set(["review_required","verified_active","source_unavailable","generic_source","duplicate_source","withdrawn"]);
function settings() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Verification database not configured");
  return {url, headers: {apikey:key, Authorization:`Bearer ${key}`, "Content-Type":"application/json"}};
}
export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({error:"Unauthorized"},{status:401});
  try {
    const {url,headers}=settings();
    const response=await fetch(`${url}/rest/v1/match_desk_source_verification?select=source_ref,source_url,verification_status,verified_at,evidence_note,canonical_ref&limit=1000`,{headers,cache:"no-store"});
    if (!response.ok) throw new Error(`Verification lookup HTTP ${response.status}`);
    return NextResponse.json({records:await response.json()});
  } catch(error) {return NextResponse.json({error:String(error)},{status:500});}
}
export async function POST(request:Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({error:"Unauthorized"},{status:401});
  try {
    const body=await request.json();
    const ref=String(body.source_ref||"").trim().toUpperCase();
    const status=String(body.verification_status||"");
    const note=String(body.evidence_note||"").trim();
    if(!/^FLLM-[A-Z0-9-]{1,30}$/.test(ref)||!statuses.has(status)) return NextResponse.json({error:"Invalid reference or status"},{status:400});
    if(status==="verified_active" && note.length<12) return NextResponse.json({error:"Verification requires an evidence note identifying who confirmed availability and when."},{status:400});
    const {url,headers}=settings();
    const record={source_ref:ref,source_url:String(body.source_url||"").slice(0,2000)||null,verification_status:status,evidence_note:note||null,verified_at:status==="verified_active"?new Date().toISOString():null,canonical_ref:body.canonical_ref||null,updated_at:new Date().toISOString()};
    const response=await fetch(`${url}/rest/v1/match_desk_source_verification?on_conflict=source_ref`,{method:"POST",headers:{...headers,Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify(record),cache:"no-store"});
    if(!response.ok) throw new Error(`Verification save HTTP ${response.status}: ${await response.text()}`);
    return NextResponse.json({record:(await response.json())[0]});
  } catch(error) {return NextResponse.json({error:String(error)},{status:500});}
}
