import { NextRequest, NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { ingestWsrFloridaInventory, listBrokerInventoryObservations } from "@/lib/broker-inventory-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const records = await listBrokerInventoryObservations();
    return NextResponse.json({ records });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not load broker inventory." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (body.action !== "ingest-wsr-florida") return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
    const result = await ingestWsrFloridaInventory({
      batchSize: Number(body.batch_size || 30),
      cursor: Number(body.cursor || 0),
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Broker inventory ingestion failed." }, { status: 500 });
  }
}
