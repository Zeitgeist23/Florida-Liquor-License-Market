import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/assets/fllm-exchange-board-header-live.png") {
    const url = request.nextUrl.clone();
    url.pathname = "/market-data/exchange-board/hero";
    url.search = "";
    return NextResponse.rewrite(url);
  }

  // The legacy financing page also exists as a static public directory, which can
  // bypass next.config rewrites on some deployments. Force the canonical
  // /financing route through the enhanced HTML transformer so the official FLLM
  // header/menu and footer are always applied while keeping the financing form.
  if (request.nextUrl.pathname === "/financing") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/financing-page";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/assets/fllm-exchange-board-header-live.png",
    "/financing",
  ],
};
