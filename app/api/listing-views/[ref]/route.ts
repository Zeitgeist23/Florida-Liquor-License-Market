import { createHash, randomUUID } from "crypto";
import { cookies, headers as requestHeaders } from "next/headers";
import { NextResponse } from "next/server";

import {
  getListingViewCount,
  recordListingView,
} from "@/lib/listing-view-store";

const VIEWER_COOKIE = "fllm_listing_viewer";
const BOT_PATTERN =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|linkedinbot|twitterbot|whatsapp|google-inspectiontool|lighthouse/i;

function normalizeRef(value: string) {
  const ref = decodeURIComponent(value).trim().toUpperCase();
  return /^[A-Z0-9][A-Z0-9-]{2,79}$/.test(ref) ? ref : null;
}

function jsonResponse(count: number) {
  return NextResponse.json(
    { count },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ ref: string }> },
) {
  const { ref: rawRef } = await context.params;
  const ref = normalizeRef(rawRef);
  if (!ref) return NextResponse.json({ count: 0 }, { status: 400 });

  return jsonResponse(await getListingViewCount(ref));
}

export async function POST(
  _request: Request,
  context: { params: Promise<{ ref: string }> },
) {
  const { ref: rawRef } = await context.params;
  const ref = normalizeRef(rawRef);
  if (!ref) return NextResponse.json({ count: 0 }, { status: 400 });

  const headers = await requestHeaders();
  const userAgent = headers.get("user-agent") ?? "";

  if (!userAgent || BOT_PATTERN.test(userAgent)) {
    return jsonResponse(await getListingViewCount(ref));
  }

  const cookieStore = await cookies();
  let viewerId = cookieStore.get(VIEWER_COOKIE)?.value ?? "";

  if (!/^[a-f0-9-]{20,80}$/i.test(viewerId)) {
    viewerId = randomUUID();
    cookieStore.set(VIEWER_COOKIE, viewerId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  const viewerHash = createHash("sha256")
    .update("fllm-listing-view-v1:" + ref + ":" + viewerId)
    .digest("hex");

  return jsonResponse(await recordListingView(ref, viewerHash));
}
