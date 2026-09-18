import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  addAndSendBrokerProspect,
  createBrokerProspect,
  generateWeeklyBrokerCampaign,
  listBrokerOutreachData,
  regenerateBrokerMessage,
  sendBrokerCampaign,
  sendBrokerMessage,
  updateBrokerProspect,
  type BrokerListingKind,
  type BrokerTemplateMode,
} from "@/lib/broker-outreach";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

function bad(error: unknown, status = 400) {
  return NextResponse.json(
    { error: error instanceof Error ? error.message : String(error) },
    { status },
  );
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await listBrokerOutreachData());
  } catch (error) {
    return bad(error, 500);
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const action = String(body.action || "");

    if (action === "quick_send_prospect") {
      const fullName = String(body.full_name || "").trim();
      const email = String(body.email || "").trim();
      const listingKind = String(body.listing_kind || "") as BrokerListingKind;
      const licenseType = String(body.license_type || "").trim();
      if (listingKind !== "license_only" && listingKind !== "business_with_license") {
        return bad(new Error("Choose License only or Business + quota license before sending."));
      }

      const result = await addAndSendBrokerProspect({
        full_name: fullName,
        email,
        phone: body.phone ? String(body.phone) : null,
        brokerage: body.brokerage ? String(body.brokerage) : null,
        website_url: body.website_url ? String(body.website_url) : null,
        source_platform: body.source_platform ? String(body.source_platform) : null,
        source_url: body.source_url ? String(body.source_url) : null,
        listing_title: body.listing_title ? String(body.listing_title) : null,
        listing_url: body.listing_url ? String(body.listing_url) : null,
        county: body.county ? String(body.county) : null,
        license_type: licenseType,
        listing_kind: listingKind,
        languages: Array.isArray(body.languages) ? body.languages.map(String) : [],
        notes: body.notes ? String(body.notes) : null,
        force: Boolean(body.force),
      });
      return NextResponse.json(result);
    }

    if (action === "create_prospect") {
      const fullName = String(body.full_name || "").trim();
      if (!fullName) return bad(new Error("Broker name is required."));
      const prospect = await createBrokerProspect({
        full_name: fullName,
        email: body.email ? String(body.email) : null,
        phone: body.phone ? String(body.phone) : null,
        brokerage: body.brokerage ? String(body.brokerage) : null,
        website_url: body.website_url ? String(body.website_url) : null,
        source_platform: body.source_platform ? String(body.source_platform) : null,
        source_url: body.source_url ? String(body.source_url) : null,
        listing_title: body.listing_title ? String(body.listing_title) : null,
        listing_url: body.listing_url ? String(body.listing_url) : null,
        county: body.county ? String(body.county) : null,
        license_type: body.license_type ? String(body.license_type) : null,
        listing_kind: (body.listing_kind || "unknown") as BrokerListingKind,
        languages: Array.isArray(body.languages) ? body.languages.map(String) : [],
        outreach_template: (body.outreach_template || "neutral") as BrokerTemplateMode,
        template_basis: "manual",
        status: body.status ? String(body.status) : "new",
        notes: body.notes ? String(body.notes) : null,
      });
      return NextResponse.json({ prospect });
    }

    if (action === "update_prospect") {
      const id = String(body.id || "");
      if (!id) return bad(new Error("Prospect ID is required."));
      const patch = (body.patch && typeof body.patch === "object" ? body.patch : {}) as Record<string, unknown>;
      const prospect = await updateBrokerProspect(id, {
        full_name: patch.full_name !== undefined ? String(patch.full_name) : undefined,
        email: patch.email !== undefined ? String(patch.email || "") || null : undefined,
        phone: patch.phone !== undefined ? String(patch.phone || "") || null : undefined,
        brokerage: patch.brokerage !== undefined ? String(patch.brokerage || "") || null : undefined,
        website_url: patch.website_url !== undefined ? String(patch.website_url || "") || null : undefined,
        source_platform: patch.source_platform !== undefined ? String(patch.source_platform || "") || null : undefined,
        source_url: patch.source_url !== undefined ? String(patch.source_url || "") || null : undefined,
        listing_title: patch.listing_title !== undefined ? String(patch.listing_title || "") || null : undefined,
        listing_url: patch.listing_url !== undefined ? String(patch.listing_url || "") || null : undefined,
        county: patch.county !== undefined ? String(patch.county || "") || null : undefined,
        license_type: patch.license_type !== undefined ? String(patch.license_type || "") || null : undefined,
        listing_kind: patch.listing_kind !== undefined ? String(patch.listing_kind) as BrokerListingKind : undefined,
        languages: Array.isArray(patch.languages) ? patch.languages.map(String) : undefined,
        outreach_template: patch.outreach_template !== undefined ? String(patch.outreach_template) as BrokerTemplateMode : undefined,
        template_basis: patch.template_basis !== undefined ? String(patch.template_basis) : undefined,
        status: patch.status !== undefined ? String(patch.status) : undefined,
        do_not_contact: patch.do_not_contact !== undefined ? Boolean(patch.do_not_contact) : undefined,
        last_contacted_at: patch.last_contacted_at !== undefined ? (patch.last_contacted_at ? String(patch.last_contacted_at) : null) : undefined,
        next_contact_at: patch.next_contact_at !== undefined ? (patch.next_contact_at ? String(patch.next_contact_at) : null) : undefined,
        notes: patch.notes !== undefined ? String(patch.notes || "") || null : undefined,
      });
      return NextResponse.json({ prospect });
    }

    if (action === "generate_campaign") {
      const result = await generateWeeklyBrokerCampaign(Boolean(body.force));
      return NextResponse.json(result);
    }

    if (action === "regenerate_message") {
      const id = String(body.id || "");
      if (!id) return bad(new Error("Message ID is required."));
      return NextResponse.json({ message: await regenerateBrokerMessage(id) });
    }

    if (action === "send_message") {
      const id = String(body.id || "");
      if (!id) return bad(new Error("Message ID is required."));
      return NextResponse.json({ message: await sendBrokerMessage(id) });
    }

    if (action === "send_campaign") {
      const id = String(body.id || "");
      if (!id) return bad(new Error("Campaign ID is required."));
      return NextResponse.json(await sendBrokerCampaign(id));
    }

    return bad(new Error("Unknown broker outreach action."));
  } catch (error) {
    return bad(error, 500);
  }
}
