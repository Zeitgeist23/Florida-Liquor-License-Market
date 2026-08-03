import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE,
  configuredAdminToken,
  isAdminAuthenticated,
  validAdminKey,
} from "@/lib/admin-auth";
import { sendFllmEmail } from "@/lib/fllm-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_CODE_COOKIE = "fllm_admin_email_code";
const CODE_LIFETIME_MS = 10 * 60 * 1000;

function adminEmail() {
  return process.env.FLLM_ADMIN_EMAIL || process.env.GOOGLE_SENDER_EMAIL || "listings@floridaliquorlicensemarket.com";
}

function codeDigest(code: string, issuedAt: number, expiresAt: number, secret: string) {
  return createHmac("sha256", secret).update(`${issuedAt}:${expiresAt}:${code}`, "utf8").digest("hex");
}

function equalText(leftValue: string, rightValue: string) {
  const left = Buffer.from(leftValue);
  const right = Buffer.from(rightValue);
  return left.length === right.length && timingSafeEqual(left, right);
}

function setSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, configuredAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function GET() {
  return NextResponse.json({ authenticated: await isAdminAuthenticated() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { action?: string; code?: string; key?: string };
  const secret = configuredAdminToken();
  if (!secret) {
    return NextResponse.json({ error: "Secure administrator access is not configured yet." }, { status: 503 });
  }

  if (body.action === "request_code") {
    const store = await cookies();
    const existing = store.get(ADMIN_CODE_COOKIE)?.value ?? "";
    const [issuedText] = existing.split(".");
    const issuedAt = Number(issuedText);
    if (Number.isFinite(issuedAt) && Date.now() - issuedAt < 45_000) {
      return NextResponse.json({ error: "A code was just sent. Please wait a moment before requesting another." }, { status: 429 });
    }

    const code = String(randomInt(100000, 1000000));
    const issued = Date.now();
    const expires = issued + CODE_LIFETIME_MS;
    const digest = codeDigest(code, issued, expires, secret);

    try {
      await sendFllmEmail({
        to: adminEmail(),
        subject: "Your FLLM Administrator Sign-In Code",
        text: `Your Florida Liquor License Market sign-in code is ${code}.\n\nThis code expires in 10 minutes. If you did not request it, you can ignore this email.`,
        html: `<p>Your Florida Liquor License Market sign-in code is:</p><p style="margin:20px 0;font-size:32px;font-weight:800;letter-spacing:6px;color:#071a3a;">${code}</p><p>This code expires in 10 minutes. If you did not request it, you can ignore this email.</p>`,
      });
    } catch (cause) {
      console.error("FLLM admin code email failed", cause);
      return NextResponse.json({ error: "The sign-in email could not be sent. Please try again shortly." }, { status: 502 });
    }

    const response = NextResponse.json({ codeSent: true });
    response.cookies.set(ADMIN_CODE_COOKIE, `${issued}.${expires}.${digest}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/admin/session",
      maxAge: Math.ceil(CODE_LIFETIME_MS / 1000),
    });
    return response;
  }

  if (body.code) {
    const code = body.code.trim();
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: "Enter the six-digit code from the email." }, { status: 401 });
    }

    const store = await cookies();
    const challenge = store.get(ADMIN_CODE_COOKIE)?.value ?? "";
    const [issuedText, expiresText, storedDigest] = challenge.split(".");
    const issued = Number(issuedText);
    const expires = Number(expiresText);
    if (!issued || !expires || !storedDigest || Date.now() > expires) {
      return NextResponse.json({ error: "That code has expired. Request a new sign-in code." }, { status: 401 });
    }

    const expected = codeDigest(code, issued, expires, secret);
    if (!equalText(storedDigest, expected)) {
      return NextResponse.json({ error: "That sign-in code is incorrect." }, { status: 401 });
    }

    const response = NextResponse.json({ authenticated: true });
    setSessionCookie(response);
    response.cookies.set(ADMIN_CODE_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/admin/session",
      maxAge: 0,
    });
    return response;
  }

  if (!validAdminKey(body.key ?? "")) {
    return NextResponse.json({ error: "The sign-in information is incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  setSessionCookie(response);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(ADMIN_CODE_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/admin/session",
    maxAge: 0,
  });
  return response;
}
