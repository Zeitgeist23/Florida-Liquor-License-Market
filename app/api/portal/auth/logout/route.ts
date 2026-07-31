import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  deletePortalSession,
  PORTAL_SESSION_COOKIE,
} from "@/lib/transaction-portal-store";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  try {
    if (token) await deletePortalSession(token);
  } catch {
    // The local cookie is still cleared if the database is temporarily unavailable.
  }
  const response = NextResponse.json({ signedOut: true });
  response.cookies.set(PORTAL_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}


