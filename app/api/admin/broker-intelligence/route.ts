import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listBrokerInventoryObservations } from "@/lib/broker-inventory-store";
import { listMarketIntelligence, type MarketIntelligenceRecord } from "@/lib/market-intelligence-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function externalRow(row: Awaited<ReturnType<typeof listBrokerInventoryObservations>>[number]): MarketIntelligenceRecord {
  return {
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
  };
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const [marketRecords, brokerRecords] = await Promise.all([
      listMarketIntelligence(),
      listBrokerInventoryObservations(),
    ]);

    const urls = new Set(
      marketRecords.map((row) => (row.source_listing_url || "").trim().toLowerCase()).filter(Boolean),
    );
    const supplemental = brokerRecords
      .filter((row) => !urls.has((row.source_listing_url || "").trim().toLowerCase()))
      .map(externalRow);

    return NextResponse.json({
      records: [...marketRecords, ...supplemental],
      broker_inventory_records: brokerRecords.length,
      supplemental_records: supplemental.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load Broker Intelligence." },
      { status: 500 },
    );
  }
}
