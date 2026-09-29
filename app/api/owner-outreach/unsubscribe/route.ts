import { NextRequest, NextResponse } from "next/server";

import { unsubscribeOwnerProspect } from "@/lib/owner-outreach";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") || "";
  const email = request.nextUrl.searchParams.get("email") || "";
  const ok = id && email ? await unsubscribeOwnerProspect(id, email) : false;
  const title = ok ? "You have been unsubscribed." : "We could not verify this unsubscribe request.";
  const copy = ok
    ? "Florida Liquor License Market will not send further owner-outreach emails to this address."
    : "Please contact listings@floridaliquorlicensemarket.com if you would like FLLM owner outreach stopped.";
  return new NextResponse(`<!doctype html><html><head><meta charset="utf-8"><title>FLLM Owner Outreach</title></head><body style="margin:0;background:#041522;color:#fff;font-family:Arial,sans-serif;padding:60px 24px"><main style="max-width:720px;margin:auto;border:1px solid #b78512;padding:32px;background:#071f32"><div style="color:#f1a600;font-weight:800;letter-spacing:.12em;text-transform:uppercase">Florida Liquor License Market</div><h1 style="font-family:Georgia,serif">${title}</h1><p style="line-height:1.7;color:#d7e1e6">${copy}</p><p><a href="https://www.floridaliquorlicensemarket.com" style="color:#f1a600">Return to FLLM</a></p></main></body></html>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
