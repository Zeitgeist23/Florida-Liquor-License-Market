import { NextResponse } from "next/server";

import { discoverFloridaLiquorLicenseNews } from "@/lib/news-discovery";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const items = await discoverFloridaLiquorLicenseNews(18);
    return NextResponse.json(
      {
        updatedAt: new Date().toISOString(),
        refreshMinutes: 30,
        sources: [
          "Google News RSS",
          "Bing News RSS",
          "First Coast News",
          "WKMG News 6 / ClickOrlando",
          "WFLA",
          "FOX 13 Tampa Bay",
          "CBS Miami",
          "Miami Herald",
          "Tampa Bay Times",
          "Florida Politics",
        ],
        items,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("FLLM News Monitor could not refresh", error);
    return NextResponse.json(
      {
        updatedAt: new Date().toISOString(),
        refreshMinutes: 30,
        sources: [],
        items: [],
        error: "The live news monitor could not refresh at this moment.",
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  }
}
