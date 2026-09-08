import { NextResponse } from "next/server";

import { getEnhancedFloridaLiquorLicenseNewsSnapshot } from "@/lib/news-monitor-enhanced";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const snapshot = await getEnhancedFloridaLiquorLicenseNewsSnapshot();
    return NextResponse.json(
      {
        updatedAt: snapshot.updatedAt,
        refreshMinutes: 360,
        feedsChecked: snapshot.feedsChecked,
        successfulFeeds: snapshot.successfulFeeds,
        sources: [
          "Google News RSS",
          "Bing News RSS",
          "Yahoo News search",
          "First Coast News",
          "WKMG News 6 / ClickOrlando",
          "WFLA",
          "FOX 13 Tampa Bay",
          "FOX 4 Now Southwest Florida",
          "NBC2 Southwest Florida",
          "FOX 35 Orlando",
          "Local 10 Miami",
          "WSVN 7News Miami",
          "CBS Miami",
          "Miami Herald",
          "Tampa Bay Times",
          "Florida Politics",
          "YouTube local-news reports",
        ],
        items: snapshot.items.slice(0, 24),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=21600",
        },
      }
    );
  } catch (error) {
    console.error("FLLM News Monitor could not refresh", error);
    return NextResponse.json(
      {
        updatedAt: new Date().toISOString(),
        refreshMinutes: 360,
        sources: [],
        items: [],
        error: "The live news monitor could not refresh at this moment.",
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  }
}
