import { NextResponse } from "next/server";

import { getFloridaQuotaInventory } from "@/lib/quota-license-inventory";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams.get("county")?.trim().toLowerCase();
    const inventory = await getFloridaQuotaInventory();

    if (!query) {
      return NextResponse.json(inventory, {
        headers: { "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400" },
      });
    }

    const normalized = query.replace(/\s+county$/i, "");
    const county = inventory.counties.find((item) =>
      item.county.toLowerCase() === normalized || item.countyCode === normalized,
    );
    if (!county) {
      return NextResponse.json({ error: "Florida county not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        source: inventory.source,
        sourceUrl: inventory.sourceUrl,
        methodology: inventory.methodology,
        county,
      },
      { headers: { "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "DBPR quota inventory is temporarily unavailable." },
      { status: 503 },
    );
  }
}
