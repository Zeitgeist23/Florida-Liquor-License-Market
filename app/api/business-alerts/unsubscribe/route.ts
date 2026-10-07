import { NextResponse } from "next/server";

import { unsubscribeBusinessBuyerAlert } from "@/lib/business-buyer-alert-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token")?.trim() ?? "";
  let status: "success" | "not-found" | "error" = "not-found";

  if (token) {
    try {
      status = (await unsubscribeBusinessBuyerAlert(token)) ? "success" : "not-found";
    } catch (error) {
      console.error("Business buyer alert unsubscribe failed", error);
      status = "error";
    }
  }

  const message =
    status === "success"
      ? "Your FLLM Business + Liquor License Buyer Alert has been unsubscribed."
      : status === "error"
        ? "We could not update your alert right now. Please try again or contact FLLM."
        : "That buyer alert could not be found or may already be inactive.";

  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><title>FLLM Buyer Alert</title></head>
    <body style="margin:0;padding:48px 20px;background:#071a2b;color:#fff;font-family:Arial,Helvetica,sans-serif">
      <main style="max-width:680px;margin:0 auto;padding:30px;border:1px solid #c58b16;border-radius:10px;background:#0b2c47">
        <div style="color:#f1a600;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase">Florida Liquor License Market</div>
        <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:30px">Buyer Alert</h1>
        <p style="color:#d6e1e8;line-height:1.65">${message}</p>
        <p><a href="https://www.floridaliquorlicensemarket.com/" style="color:#69d6ff">Return to FLLM →</a></p>
      </main>
    </body></html>`,
    {
      status: status === "error" ? 500 : 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}
