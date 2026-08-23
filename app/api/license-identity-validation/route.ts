import { NextResponse } from "next/server";

import {
  isValidFloridaRetailLicenseNumber,
  validateFloridaRetailLicenseIdentity,
} from "@/lib/license-fee-lookup";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const licenseNumber = searchParams.get("licenseNumber") ?? "";
    const county = searchParams.get("county") ?? "";
    const licenseType = searchParams.get("licenseType") ?? "";

    if (!licenseNumber.trim() || !county.trim() || !licenseType.trim()) {
      return NextResponse.json(
        { status: "invalid", error: "License number, county and license type are required for DBPR verification." },
        { status: 400 },
      );
    }

    if (!isValidFloridaRetailLicenseNumber(licenseNumber)) {
      return NextResponse.json(
        { status: "invalid", error: "Enter a valid Florida DBPR license number." },
        { status: 400 },
      );
    }

    const validation = await validateFloridaRetailLicenseIdentity(licenseNumber, county, licenseType);
    if (validation.status === "not_found") {
      return NextResponse.json(
        {
          ...validation,
          error: "That license number was not found in DBPR’s current public retail beverage license records.",
        },
        { status: 404 },
      );
    }

    if (validation.status === "mismatch") {
      return NextResponse.json(validation, { status: 409 });
    }

    return NextResponse.json(validation);
  } catch (error) {
    return NextResponse.json(
      {
        status: "unavailable",
        error: error instanceof Error ? error.message : "DBPR license verification is temporarily unavailable.",
      },
      { status: 503 },
    );
  }
}
