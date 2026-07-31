import { NextResponse } from "next/server";

import { lookupFloridaRetailLicense } from "@/lib/license-fee-lookup";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const licenseNumber = new URL(request.url).searchParams.get("licenseNumber") ?? "";
    const result = await lookupFloridaRetailLicense(licenseNumber);
    if (!result) {
      return NextResponse.json(
        { error: "No active, inactive, escrow, temporary or delinquent retail beverage license matched that number in DBPR’s current public data." },
        { status: 404 }
      );
    }
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "License lookup failed." },
      { status: 400 }
    );
  }
}
