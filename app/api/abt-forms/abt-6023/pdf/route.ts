import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const pdfUrl = new URL("/abt-forms/abt-6023.pdf", request.url);
  return NextResponse.redirect(pdfUrl, 307);
}
