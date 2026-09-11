import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-dynamic";

export async function GET() {
  const encoded = readFileSync(
    join(process.cwd(), "public/assets/fllm-exchange-board-header-live.png"),
    "utf8",
  ).replace(/\s+/g, "");

  const bytes = Buffer.from(encoded, "base64");

  return new Response(bytes, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
