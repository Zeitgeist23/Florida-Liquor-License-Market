import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const file = readFileSync(
      join(process.cwd(), "public/assets/fllm-exchange-board-header-live.png"),
    );

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new Response("Hero image unavailable", { status: 404 });
  }
}
