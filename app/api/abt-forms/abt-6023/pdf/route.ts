import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Serve the browser-compatible interactive ABT-6023 directly from /public.
  // This keeps existing API links working while avoiding PDF rendering issues
  // from generating the file inside the serverless route.
  return NextResponse.redirect(new URL("/abt-forms/abt-6023.pdf", request.url), 307);
}

export async function HEAD(request: Request) {
  return NextResponse.redirect(new URL("/abt-forms/abt-6023.pdf", request.url), 307);
}
