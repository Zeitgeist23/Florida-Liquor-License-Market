import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listMarketIntelligence, saveMarketIntelligence, type MarketIntelligenceRecord } from "@/lib/market-intelligence-store";
import { listBrokerInventoryObservations } from "@/lib/broker-inventory-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [records, brokerInventory] = await Promise.all([
      listMarketIntelligence(),
      listBrokerInventoryObservations(),
    ]);

    const existingUrls = new Set(
      records.map((row) => (row.source_listing_url || "").trim().toLowerCase()).filter(Boolean),
    );

    const supplemental: MarketIntelligenceRecord[] = brokerInventory
      .filter((row) => !existingUrls.has((row.source_listing_url || "").trim().toLowerCase()))
      .map((row) => ({
        id: null,
        listing_reference: `BROKER-${row.source_domain.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-${row.source_listing_id}`,
        business_name: null,
        source_listing_title: row.source_listing_title,
        identification_basis: "Direct public broker marketplace observation.",
        legal_entity_name: null,
        county: row.county || "County unresolved",
        city: row.city,
        business_type: row.business_type,
        license_type: row.license_type,
        license_number: null,
        license_holder: null,
        asking_price: row.asking_price,
        gross_revenue: null,
        sde_cash_flow: null,
        fllm_est_license_value: null,
        broker_name: row.broker_name,
        brokerage: row.brokerage,
        broker_phone: null,
        broker_email: null,
        owner_name: null,
        owner_phone: null,
        owner_email: null,
        source_listing_url: row.source_listing_url,
        dbpr_url: null,
        sunbiz_url: null,
        property_url: null,
        source_urls: [row.source_listing_url],
        identification_confidence: row.classification_confidence,
        verification_status: row.classification_confidence && row.classification_confidence >= 95 ? "verified" : "probable",
        market_status: row.market_status,
        first_seen_at: row.first_seen_at,
        last_seen_at: row.last_seen_at,
        notes: row.raw_license_evidence,
        created_at: null,
        updated_at: null,
        origin: "private_database",
      }));

    return NextResponse.json({
      records: [...records, ...supplemental],
      broker_inventory_records: brokerInventory.length,
      supplemental_records: supplemental.length,
    });
  } catch (error) {
    console.error("Could not load FLLM market intelligence", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load market intelligence." },
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
    const confidence = body.identification_confidence;
    if (confidence !== null && confidence !== undefined && confidence !== "") {
      const n = Number(confidence);
      if (!Number.isFinite(n) || n < 0 || n > 100) {
        return NextResponse.json({ error: "Identification confidence must be between 0 and 100." }, { status: 400 });
      }
      body.identification_confidence = n;
    } else {
      body.identification_confidence = null;
    }

    for (const key of ["asking_price", "gross_revenue", "sde_cash_flow", "fllm_est_license_value"]) {
      body[key] = body[key] === "" || body[key] === undefined ? null : Number(body[key]);
      if (body[key] !== null && !Number.isFinite(body[key])) {
        return NextResponse.json({ error: `${key} must be numeric.` }, { status: 400 });
      }
    }

    await saveMarketIntelligence(body);
    return NextResponse.json({ records: await listMarketIntelligence() });
  } catch (error) {
    console.error("Could not save FLLM market intelligence", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save market intelligence." },
      { status: 500 },
    );
  }
}
