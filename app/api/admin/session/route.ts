import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE,
  configuredAdminToken,
  isAdminAuthenticated,
  validAdminKey,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
  const body = (await request.json()) as { key?: string };
  const secret = configuredAdminToken();
  if (!secret) {
    return NextResponse.json({ error: "Secure administrator access is not configured yet." }, { status: 503 });
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
  return response;
}
