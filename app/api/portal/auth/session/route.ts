import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  getPortalUserFromSession,
  PORTAL_SESSION_COOKIE,
} from "@/lib/transaction-portal-store";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
    const user = await getPortalUserFromSession(token);
    return NextResponse.json({ user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not verify the session.";
    const unavailable = message.includes("database has not been activated");
    return NextResponse.json({ error: message, user: null }, { status: unavailable ? 503 : 400 });
  }
}


