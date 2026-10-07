import { NextResponse } from "next/server";

import type { BusinessQuotaCategory } from "@/lib/business-quota-listings";
import {
  createBusinessBuyerAlert,
  type BusinessBuyerAlertFinancingPreference,
  type BusinessBuyerAlertLicenseType,
} from "@/lib/business-buyer-alert-store";
import { activateBusinessBuyerAlert } from "@/lib/business-buyer-alert-notifications";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const validBusinessTypes = new Set<BusinessQuotaCategory>([
  "Bar",
  "Cocktail Lounge",
  "Nightclub",
  "Restaurant",
  "Restaurant / Bar",
  "Convenience Store",
  "Bowling Alley",
  "Liquor Store",
  "Marina",
  "Gentlemen's Club",
  "Hotel / Motel",
  "Country Club",
  "Other Hospitality",
]);

const validLicenseTypes = new Set<BusinessBuyerAlertLicenseType>([
  "4COP Quota",
  "3PS Quota / Package Store",
  "4COP SFS/SRX",
  "2COP Beer & Wine",
]);

const validFinancing = new Set<BusinessBuyerAlertFinancingPreference>([
  "Any",
  "Cash",
  "SBA",
  "Seller Financing",
  "Other",
]);

function clean(value: unknown, max = 5000) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, max);
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeCounty(value: string) {
  const cleaned = value.trim();
  return / County$/i.test(cleaned) ? cleaned : `${cleaned} County`;
}

function optionalMoney(value: unknown) {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const parsed = Number(String(value).replace(/[$,\s]/g, ""));
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100_000_000) {
    throw new Error("Enter valid financial criteria or leave the field blank.");
  }
  return Math.round(parsed);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      businessTypes?: string[];
      licenseTypes?: string[];
      counties?: string[];
      maxPurchasePrice?: string | number | null;
      minGrossRevenue?: string | number | null;
      minSde?: string | number | null;
      minEbitda?: string | number | null;
      financingPreferences?: string[];
      notes?: string;
      consent?: boolean;
      sourceMarketViewRef?: string;
      sourceMarketViewUrl?: string;
    };

    const firstName = clean(body.firstName, 80);
    const lastName = clean(body.lastName, 80);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 60);

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "First name, last name, email, and phone number are required." },
        { status: 400 },
      );
    }
    if (!validEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (!body.consent) {
      return NextResponse.json(
        { error: "Please confirm that you want to receive FLLM buyer-alert emails." },
        { status: 400 },
      );
    }

    const businessTypes = Array.from(new Set(body.businessTypes ?? []))
      .filter((item): item is BusinessQuotaCategory => validBusinessTypes.has(item as BusinessQuotaCategory));
    const licenseTypes = Array.from(new Set(body.licenseTypes ?? []))
      .filter((item): item is BusinessBuyerAlertLicenseType => validLicenseTypes.has(item as BusinessBuyerAlertLicenseType));
    const counties = Array.from(
      new Set((body.counties ?? []).map((item) => normalizeCounty(clean(item, 100))).filter((item) => item.length > 7)),
    );
    const financingPreferences = Array.from(new Set(body.financingPreferences ?? []))
      .filter((item): item is BusinessBuyerAlertFinancingPreference => validFinancing.has(item as BusinessBuyerAlertFinancingPreference));

    if (!businessTypes.length) {
      return NextResponse.json({ error: "Select at least one business type." }, { status: 400 });
    }
    if (!licenseTypes.length) {
      return NextResponse.json({ error: "Select at least one liquor-license type." }, { status: 400 });
    }
    if (!counties.length) {
      return NextResponse.json({ error: "Select at least one Florida county." }, { status: 400 });
    }

    const alert = await createBusinessBuyerAlert({
      firstName,
      lastName,
      email,
      phone,
      businessTypes,
      licenseTypes,
      counties,
      maxPurchasePrice: optionalMoney(body.maxPurchasePrice),
      minGrossRevenue: optionalMoney(body.minGrossRevenue),
      minSde: optionalMoney(body.minSde),
      minEbitda: optionalMoney(body.minEbitda),
      financingPreferences: financingPreferences.length ? financingPreferences : ["Any"],
      notes: clean(body.notes, 3000),
      sourceMarketViewRef: clean(body.sourceMarketViewRef, 100),
      sourceMarketViewUrl: clean(body.sourceMarketViewUrl, 500),
    });

    let currentMatches = 0;
    try {
      currentMatches = (await activateBusinessBuyerAlert(alert)).currentMatches;
    } catch (emailError) {
      console.error("Business buyer alert activation email failed", emailError);
    }

    return NextResponse.json({
      ok: true,
      leadReference: alert.submission_ref,
      currentMatches,
    });
  } catch (error) {
    console.error("Business buyer alert signup failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "We could not create your buyer alert. Please try again." },
      { status: 500 },
    );
  }
}
