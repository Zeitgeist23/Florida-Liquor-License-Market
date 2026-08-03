import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listLeadSubmissions } from "@/lib/listing-submission-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await listLeadSubmissions();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Could not load lead database", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load leads." },
      { status: 500 }
    );
  }
}
