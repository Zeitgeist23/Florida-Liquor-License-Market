import { NextResponse } from "next/server";

import { sendLicenseAlertConfirmation } from "@/lib/license-alert-email";
import { createLicenseAlert } from "@/lib/license-alert-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const validTypes = new Set(["4COP Quota", "3PS Quota / Package Store"] as const);

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeCounty(value: string) {
  const cleaned = value.trim();
  return / County$/i.test(cleaned) ? cleaned : `${cleaned} County`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
      firstName?: string;
      address?: string;
      phone?: string;
      counties?: string[];
      licenseTypes?: string[];
      maxPrice?: number | string | null;
      consent?: boolean;
    };

    const email = body.email?.trim().toLowerCase() ?? "";
    const name = (body.name ?? body.firstName ?? "").trim();
    const address = body.address?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";

    if (!name) {
      return NextResponse.json({ error: "Enter your name." }, { status: 400 });
    }
    if (!address) {
      return NextResponse.json({ error: "Enter your address." }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: "Enter your phone number." }, { status: 400 });
    }
    if (!validEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (!body.consent) {
      return NextResponse.json({ error: "Please confirm that you want to receive FLLM License Alerts." }, { status: 400 });
    }

    const counties = Array.from(
      new Set((body.counties ?? []).map(normalizeCounty).filter((county) => county.length > 7))
    );
    if (!counties.length) {
      return NextResponse.json({ error: "Select at least one Florida county." }, { status: 400 });
    }

    const licenseTypes = Array.from(new Set(body.licenseTypes ?? []))
      .filter((type): type is "4COP Quota" | "3PS Quota / Package Store" => validTypes.has(type as never));
    if (!licenseTypes.length) {
      return NextResponse.json({ error: "Select at least one license type." }, { status: 400 });
    }

    let maxPrice: number | null = null;
    if (body.maxPrice !== null && body.maxPrice !== undefined && String(body.maxPrice).trim() !== "") {
      const parsed = Number(String(body.maxPrice).replace(/[$,\s]/g, ""));
      if (!Number.isFinite(parsed) || parsed <= 0) {
        return NextResponse.json({ error: "Enter a valid maximum price or leave it blank." }, { status: 400 });
      }
      maxPrice = Math.round(parsed);
    }

    const alert = await createLicenseAlert({
      email,
      firstName: name,
      address,
      phone,
      counties,
      licenseTypes,
      maxPrice,
    });

    try {
      await sendLicenseAlertConfirmation(alert);
    } catch (error) {
      console.error("License Alert confirmation email failed", error);
    }

    return NextResponse.json({
      ok: true,
      message: "Your License Alert is active.",
      alert: {
        id: alert.id,
        counties: alert.counties,
        licenseTypes: alert.license_types,
        maxPrice: alert.max_price,
      },
    });
  } catch (error) {
    console.error("License Alert signup failed", error);
    return NextResponse.json(
      { error: "We could not create your License Alert. Please try again." },
      { status: 500 }
    );
  }
}
