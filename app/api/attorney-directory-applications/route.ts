import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import {
  notifyFllmOfAttorneyApplication,
  sendAttorneyApplicationAcknowledgement,
  type AttorneyDirectoryApplicationEmail,
} from "@/lib/fllm-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RequestBody = {
  fullName?: unknown;
  firm?: unknown;
  barNumber?: unknown;
  email?: unknown;
  phone?: unknown;
  city?: unknown;
  counties?: unknown;
  website?: unknown;
  portraitUrl?: unknown;
  biography?: unknown;
  services?: unknown;
  additionalInformation?: unknown;
  attorneyCertification?: unknown;
  publicationConsent?: unknown;
  reviewAgreement?: unknown;
  honey?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validUrl(value: string, required = true) {
  if (!value) return !required;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;

    if (text(body.honey, 200)) {
      return NextResponse.json({ ok: true, reference: "FLLM-RECEIVED" });
    }

    const services = Array.isArray(body.services)
      ? body.services.map((service) => text(service, 160)).filter(Boolean).slice(0, 12)
      : [];

    const application: AttorneyDirectoryApplicationEmail = {
      reference: `ATT-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
      fullName: text(body.fullName, 120),
      firm: text(body.firm, 160),
      barNumber: text(body.barNumber, 12),
      email: text(body.email, 254).toLowerCase(),
      phone: text(body.phone, 30),
      city: text(body.city, 100),
      counties: text(body.counties, 300),
      website: text(body.website, 500),
      portraitUrl: text(body.portraitUrl, 500),
      biography: text(body.biography, 1600),
      services,
      additionalInformation: text(body.additionalInformation, 1200),
      submittedAt: new Date().toISOString(),
    };

    if (
      !application.fullName ||
      !application.firm ||
      !application.barNumber ||
      !application.email ||
      !application.phone ||
      !application.city ||
      !application.counties ||
      !application.website ||
      !application.biography ||
      services.length === 0
    ) {
      return NextResponse.json(
        { error: "Please complete every required field and select at least one service." },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(application.email)) {
      return NextResponse.json({ error: "Please enter a valid professional email." }, { status: 400 });
    }
    if (!/^[0-9]{4,12}$/.test(application.barNumber.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Please enter a valid Florida Bar number." }, { status: 400 });
    }
    if (!validUrl(application.website) || !validUrl(application.portraitUrl, false)) {
      return NextResponse.json(
        { error: "Please enter complete website addresses beginning with https:// or http://." },
        { status: 400 }
      );
    }
    if (
      body.attorneyCertification !== true ||
      body.publicationConsent !== true ||
      body.reviewAgreement !== true
    ) {
      return NextResponse.json(
        { error: "Please accept all three required certifications." },
        { status: 400 }
      );
    }

    await notifyFllmOfAttorneyApplication(application);

    try {
      await sendAttorneyApplicationAcknowledgement(application);
    } catch (acknowledgementError) {
      console.error("Attorney application acknowledgement failed", acknowledgementError);
    }

    return NextResponse.json({ ok: true, reference: application.reference });
  } catch (error) {
    console.error("Attorney directory application failed", error);
    return NextResponse.json(
      { error: "The application could not be submitted. Please try again shortly." },
      { status: 500 }
    );
  }
}

