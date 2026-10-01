import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSearchPerformance, upsertSearchDaily } from "@/lib/search-performance-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getSearchPerformance());
  } catch (error) {
    console.error("Could not load FLLM search performance", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load search performance." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json() as {
      date?: string;
      clicks?: number;
      impressions?: number;
      averagePosition?: number | null;
      status?: "finalized" | "preliminary" | "manual";
      sourceNote?: string | null;
    };

    if (!body.date || !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
      return NextResponse.json({ error: "A valid date is required." }, { status: 400 });
    }
    if (!Number.isInteger(body.clicks) || Number(body.clicks) < 0) {
      return NextResponse.json({ error: "Clicks must be a non-negative whole number." }, { status: 400 });
    }
    if (!Number.isInteger(body.impressions) || Number(body.impressions) < 0) {
      return NextResponse.json({ error: "Impressions must be a non-negative whole number." }, { status: 400 });
    }

    await upsertSearchDaily({
      date: body.date,
      clicks: Number(body.clicks),
      impressions: Number(body.impressions),
      averagePosition: body.averagePosition === null || body.averagePosition === undefined
        ? null
        : Number(body.averagePosition),
      status: body.status ?? "finalized",
      sourceNote: body.sourceNote ?? null,
    });

    return NextResponse.json(await getSearchPerformance());
  } catch (error) {
    console.error("Could not save FLLM search performance", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save search performance." },
      { status: 500 },
    );
  }
}
