import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/assets/fllm-exchange-board-header-live.png") {
    const url = request.nextUrl.clone();
    url.pathname = "/market-data/exchange-board/hero";
    url.search = "";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/assets/fllm-exchange-board-header-live.png"],
};
