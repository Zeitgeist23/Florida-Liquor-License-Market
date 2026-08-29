import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const GUIDE_FILE = "/downloads/FLLM_Official_Buyers_and_Sellers_Guide_2026.pdf";
const VISITOR_COOKIE = "fllm_guide_visitor";
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;

function clean(value: string | null, maxLength = 240) {
  return (value || "").trim().slice(0, maxLength);
}

function safeReferrer(value: string | null) {
  const raw = clean(value, 1000);
  if (!raw) return "";

  try {
    const parsed = new URL(raw);
    return `${parsed.origin}${parsed.pathname}`.slice(0, 500);
  } catch {
    return raw.slice(0, 500);
  }
}

function validVisitorId(value: string | undefined) {
  return Boolean(value && /^[a-z0-9-]{16,80}$/i.test(value));
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const existingVisitorId = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorId = validVisitorId(existingVisitorId) ? existingVisitorId! : randomUUID();

  const event = {
    event: "buyers_sellers_guide_download",
    guide: "FLLM Official Buyer's and Seller's Guide 2026",
    timestamp: new Date().toISOString(),
    visitor_id: visitorId,
    returning_visitor: Boolean(validVisitorId(existingVisitorId)),
    source: clean(url.searchParams.get("source"), 100) || "unknown",
    action: clean(url.searchParams.get("action"), 100) || "download-request",
    source_page: clean(url.searchParams.get("source_page"), 300),
    entry_referrer: safeReferrer(url.searchParams.get("entry_referrer")),
    request_referrer: safeReferrer(request.headers.get("referer")),
    utm_source: clean(url.searchParams.get("utm_source"), 120),
    utm_medium: clean(url.searchParams.get("utm_medium"), 120),
    utm_campaign: clean(url.searchParams.get("utm_campaign"), 160),
    utm_content: clean(url.searchParams.get("utm_content"), 160),
    utm_term: clean(url.searchParams.get("utm_term"), 160),
    user_agent: clean(request.headers.get("user-agent"), 500),
  };

  console.info("FLLM_GUIDE_DOWNLOAD", JSON.stringify(event));

  const fileUrl = new URL(GUIDE_FILE, request.url);
  fileUrl.searchParams.set("fllm_raw", "1");

  const response = NextResponse.redirect(fileUrl, 307);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.cookies.set(VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    maxAge: VISITOR_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
