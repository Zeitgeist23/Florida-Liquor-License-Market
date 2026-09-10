import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const encoded = await readFile(
    path.join(process.cwd(), "public", "assets", "james-h-sutton-verified.b64"),
    "utf8"
  );

  return new Response(Buffer.from(encoded.trim(), "base64"), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
