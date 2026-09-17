import { NextRequest } from "next/server";

import { unsubscribeBrokerProspect } from "@/lib/broker-outreach";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function page(title: string, message: string, ok: boolean) {
  return new Response(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body style="margin:0;background:#061827;color:#eef4f7;font-family:Arial,Helvetica,sans-serif"><main style="max-width:720px;margin:10vh auto;padding:34px;border:1px solid #a9790b;border-radius:10px;background:#092238"><div style="color:#f1a600;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase">Florida Liquor License Market</div><h1 style="font-family:Georgia,'Times New Roman',serif;font-size:36px;margin:12px 0 14px">${title}</h1><p style="font-size:16px;line-height:1.7;color:#c9d5dc">${message}</p><a href="https://www.floridaliquorlicensemarket.com" style="display:inline-block;margin-top:18px;padding:11px 16px;border-radius:5px;background:${ok ? "#f1a600" : "#1a3448"};color:${ok ? "#061827" : "#eef4f7"};font-weight:800;text-decoration:none">Return to FLLM</a></main></body></html>`, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") || "";
  const email = request.nextUrl.searchParams.get("email") || "";
  if (!id || !email) return page("Unable to update preferences", "The opt-out link is incomplete. Please contact listings@floridaliquorlicensemarket.com if you would like to stop broker outreach emails.", false);
  try {
    const updated = await unsubscribeBrokerProspect(id, email);
    if (!updated) return page("Unable to update preferences", "We could not match this opt-out request to a current broker outreach record.", false);
    return page("You have been unsubscribed", "FLLM will not send additional broker outreach campaigns to this email address. This does not affect transactional messages related to listings or inquiries you initiate.", true);
  } catch {
    return page("Unable to update preferences", "We could not update your preferences at this time. Please contact listings@floridaliquorlicensemarket.com.", false);
  }
}
