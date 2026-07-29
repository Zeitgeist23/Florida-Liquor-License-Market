import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listListingSubmissions } from "@/lib/listing-submission-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const submissions = await listListingSubmissions();
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Could not load listing submissions", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load submissions." },
      { status: 500 }
    );
  }
}
