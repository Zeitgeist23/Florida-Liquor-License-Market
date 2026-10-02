import { readFileSync } from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const dir = path.join(process.cwd(), "lib", "orlando-runtime");
  const base64 = [0, 1, 2]
    .map((i) => readFileSync(path.join(dir, `chunk${i}.txt`), "utf8").trim())
    .join("");
  const bytes = Buffer.from(base64, "base64");

  return new Response(bytes, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
