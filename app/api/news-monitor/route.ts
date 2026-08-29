import { NextResponse } from "next/server";

import { getFloridaLiquorLicenseNewsSnapshot } from "@/lib/news-discovery";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const snapshot = await getFloridaLiquorLicenseNewsSnapshot();
    return NextResponse.json(
      {
        updatedAt: snapshot.updatedAt,
        refreshMinutes: 1440,
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
          "CBS Miami",
          "Miami Herald",
          "Tampa Bay Times",
          "Florida Politics",
        ],
        items: snapshot.items.slice(0, 18),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("FLLM News Monitor could not refresh", error);
    return NextResponse.json(
      {
        updatedAt: new Date().toISOString(),
        refreshMinutes: 1440,
        sources: [],
        items: [],
        error: "The live news monitor could not refresh at this moment.",
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  }
}
