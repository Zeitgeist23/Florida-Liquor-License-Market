import { NextResponse } from "next/server";

import { unsubscribeLicenseAlert } from "@/lib/license-alert-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function siteOrigin(requestUrl: string) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.FLLM_SITE_URL ||
    new URL(requestUrl).origin
  ).replace(/\/$/, "");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token")?.trim() ?? "";
  let status = "invalid";

  if (token) {
    try {
      status = (await unsubscribeLicenseAlert(token)) ? "unsubscribed" : "not-found";
    } catch (error) {
      console.error("License Alert unsubscribe failed", error);
      status = "error";
    }
  }

  return NextResponse.redirect(`${siteOrigin(request.url)}/license-alerts?status=${encodeURIComponent(status)}`);
}
