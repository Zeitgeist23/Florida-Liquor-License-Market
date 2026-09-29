import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createOwnerMessage,
  createOwnerProspect,
  listOwnerOutreachData,
  regenerateOwnerMessage,
  sendOwnerMessage,
  updateOwnerProspect,
} from "@/lib/owner-outreach";
import { collectOwnerResearch, startOwnerResearch, tinyFishConfigured, type OwnerResearchResult } from "@/lib/owner-outreach-research";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

function bad(error: unknown, status = 400) {
  return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ ...(await listOwnerOutreachData()), tinyFishConfigured: tinyFishConfigured() });
  } catch (error) {
    return bad(error, 500);
  }
}

function s(value: unknown) {
  return value === null || value === undefined ? null : String(value).trim() || null;
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const action = String(body.action || "");

    if (action === "create_prospect") {
      const prospect = await createOwnerProspect({
        business_name: s(body.business_name),
        legal_entity_name: s(body.legal_entity_name),
        owner_name: s(body.owner_name),
        owner_email: s(body.owner_email),
        owner_phone: s(body.owner_phone),
        website_url: s(body.website_url),
        business_type: String(body.business_type || "Restaurant"),
        county: s(body.county),
        city: s(body.city),
        license_type: s(body.license_type),
        license_number: s(body.license_number),
        source_platform: s(body.source_platform),
        source_url: s(body.source_url),
        listing_title: s(body.listing_title),
        listing_url: s(body.listing_url),
        broker_name: s(body.broker_name),
        brokerage: s(body.brokerage),
        identification_confidence: body.identification_confidence === "" || body.identification_confidence == null ? null : Number(body.identification_confidence),
        ownership_notes: s(body.ownership_notes),
        notes: s(body.notes),
      });
      return NextResponse.json({ prospect });
    }

    if (action === "update_prospect") {
      const id = String(body.id || "");
      if (!id) return bad(new Error("Prospect ID is required."));
      const patch = body.patch && typeof body.patch === "object" ? body.patch as Record<string, unknown> : {};
      const prospect = await updateOwnerProspect(id, patch as never);
      return NextResponse.json({ prospect });
    }

    if (action === "start_research") {
      const id = String(body.id || "");
      const data = await listOwnerOutreachData();
      const prospect = data.prospects.find((item) => item.id === id);
      if (!prospect) return bad(new Error("Owner prospect not found."));
      const sourceUrl = prospect.listing_url || prospect.source_url;
      if (!sourceUrl) return bad(new Error("Add the public source listing URL before starting research."));
      const run = await startOwnerResearch({
        sourceUrl,
        listingTitle: prospect.listing_title,
        county: prospect.county,
        businessType: prospect.business_type,
        licenseType: prospect.license_type,
      });
      const updated = await updateOwnerProspect(id, { research_status: "researching", research_run_id: run.runId });
      return NextResponse.json({ prospect: updated, runId: run.runId });
    }

    if (action === "refresh_research") {
      const id = String(body.id || "");
      const data = await listOwnerOutreachData();
      const prospect = data.prospects.find((item) => item.id === id);
      if (!prospect?.research_run_id) return bad(new Error("No active research run exists for this prospect."));
      const run = await collectOwnerResearch(prospect.research_run_id);
      if (run.status === "PENDING" || run.status === "RUNNING") return NextResponse.json({ run });
      if (run.status !== "COMPLETED") {
        const updated = await updateOwnerProspect(id, { research_status: "failed", research_result: run.result, notes: [prospect.notes, String(run.error || "Research did not complete.")].filter(Boolean).join("\n") });
        return NextResponse.json({ run, prospect: updated });
      }
      const result = run.result as OwnerResearchResult;
      const confidence = typeof result.confidence === "number" ? Math.max(0, Math.min(100, Math.round(result.confidence))) : prospect.identification_confidence;
      const updated = await updateOwnerProspect(id, {
        business_name: s(result.business_name) || prospect.business_name,
        legal_entity_name: s(result.legal_entity_name) || prospect.legal_entity_name,
        owner_name: s(result.owner_name) || prospect.owner_name,
        owner_email: s(result.owner_email) || prospect.owner_email,
        owner_phone: s(result.owner_phone) || prospect.owner_phone,
        website_url: s(result.website_url) || prospect.website_url,
        business_type: s(result.business_type) || prospect.business_type,
        county: s(result.county) || prospect.county,
        city: s(result.city) || prospect.city,
        license_type: s(result.license_type) || prospect.license_type,
        license_number: s(result.license_number) || prospect.license_number,
        broker_name: s(result.broker_name) || prospect.broker_name,
        brokerage: s(result.brokerage) || prospect.brokerage,
        identification_confidence: confidence,
        source_urls: Array.isArray(result.source_urls) ? result.source_urls.map(String) : prospect.source_urls,
        ownership_notes: s(result.ownership_notes) || prospect.ownership_notes,
        research_result: result,
        research_status: confidence != null && confidence >= 80 ? "verified" : "needs_review",
      });
      return NextResponse.json({ run, prospect: updated });
    }

    if (action === "create_message") {
      const id = String(body.id || "");
      if (!id) return bad(new Error("Prospect ID is required."));
      return NextResponse.json({ message: await createOwnerMessage(id) });
    }

    if (action === "regenerate_message") {
      const id = String(body.id || "");
      if (!id) return bad(new Error("Message ID is required."));
      return NextResponse.json({ message: await regenerateOwnerMessage(id) });
    }

    if (action === "send_message") {
      const id = String(body.id || "");
      if (!id) return bad(new Error("Message ID is required."));
      return NextResponse.json({ message: await sendOwnerMessage(id) });
    }

    return bad(new Error("Unknown owner outreach action."));
  } catch (error) {
    return bad(error, 500);
  }
}
