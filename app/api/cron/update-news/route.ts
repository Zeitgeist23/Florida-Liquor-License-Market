import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getFloridaLiquorLicenseNewsSnapshot } from "@/lib/news-discovery";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

function authorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && request.headers.get("authorization") === `Bearer ${secret}`);
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidateTag("fllm-daily-news");
    const snapshot = await getFloridaLiquorLicenseNewsSnapshot();
    revalidatePath("/florida-liquor-license-news");

    const providerCounts = snapshot.items.reduce<Record<string, number>>((counts, item) => {
      const provider = item.provider.split(" · ")[0] || item.provider;
      counts[provider] = (counts[provider] ?? 0) + 1;
      return counts;
    }, {});

    return NextResponse.json({
      ok: true,
      updatedAt: snapshot.updatedAt,
      feedsChecked: snapshot.feedsChecked,
      successfulFeeds: snapshot.successfulFeeds,
      publishedItems: snapshot.items.length,
      providerCounts,
      page: "/florida-liquor-license-news",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Daily FLLM news update failed", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
