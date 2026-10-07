import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  recentIdentityRuns,
  runIdentityResolution,
  saveIdentityFacts,
  syncKnownIdentitiesToCandidatePool,
} from "@/lib/identity-resolution-engine";
import {
  recentWebResearch,
  researchIdentityOnOpenWeb,
  researchPriorityIdentityQueue,
} from "@/lib/identity-web-research";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const listingReference = request.nextUrl.searchParams.get("listing_reference");
  if (!listingReference) {
    return NextResponse.json({ error: "listing_reference is required." }, { status: 400 });
  }

  try {
    const [runs, webResearch] = await Promise.all([
      recentIdentityRuns(listingReference),
      recentWebResearch(listingReference),
    ]);
    return NextResponse.json({ runs, webResearch });
  } catch (error) {
    console.error("Could not load identity-resolution history", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load identity-resolution history." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const action = body.action || "run";

    if (action === "sync-candidates") {
      const count = await syncKnownIdentitiesToCandidatePool();
      return NextResponse.json({ ok: true, synced: count });
    }

    if (action === "research-priority-web") {
      const results = await researchPriorityIdentityQueue(Number(body.limit || 4));
      return NextResponse.json({ ok: true, results });
    }

    if (action === "save-facts") {
      if (!body.listing_reference) {
        return NextResponse.json({ error: "listing_reference is required." }, { status: 400 });
      }
      await saveIdentityFacts({
        listing_reference: String(body.listing_reference),
        established_year: body.established_year === "" || body.established_year == null ? null : Number(body.established_year),
        square_feet: body.square_feet === "" || body.square_feet == null ? null : Number(body.square_feet),
        seats: body.seats === "" || body.seats == null ? null : Number(body.seats),
        employees: body.employees === "" || body.employees == null ? null : Number(body.employees),
        monthly_rent: body.monthly_rent === "" || body.monthly_rent == null ? null : Number(body.monthly_rent),
        operating_days: Array.isArray(body.operating_days) ? body.operating_days : [],
        keywords: Array.isArray(body.keywords)
          ? body.keywords
          : String(body.keywords || "").split(",").map((x) => x.trim()).filter(Boolean),
        notes: body.notes ? String(body.notes) : null,
      });
      return NextResponse.json({ ok: true });
    }

    if (!body.listing_reference) {
      return NextResponse.json({ error: "listing_reference is required." }, { status: 400 });
    }

    if (action === "research-web") {
      const result = await researchIdentityOnOpenWeb(String(body.listing_reference), {
        autoApply: Boolean(body.auto_apply),
      });
      return NextResponse.json(result);
    }

    const result = await runIdentityResolution(String(body.listing_reference), {
      autoApply: Boolean(body.auto_apply),
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("FLLM identity resolution failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Identity resolution failed." },
      { status: 500 },
    );
  }
}
