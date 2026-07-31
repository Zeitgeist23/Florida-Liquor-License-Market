import { NextResponse } from "next/server";

import {
  createPortalSession,
  createPortalUser,
  PORTAL_SESSION_COOKIE,
  PORTAL_SESSION_SECONDS,
} from "@/lib/transaction-portal-store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const user = await createPortalUser({
      fullName: body.fullName,
      email: body.email,
      password: body.password,
    });
    const token = await createPortalSession(user.id);
    const response = NextResponse.json({ user }, { status: 201 });
    response.cookies.set(PORTAL_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: PORTAL_SESSION_SECONDS,
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create the account.";
    const unavailable = message.includes("database has not been activated");
    return NextResponse.json({ error: message }, { status: unavailable ? 503 : 400 });
  }
}


