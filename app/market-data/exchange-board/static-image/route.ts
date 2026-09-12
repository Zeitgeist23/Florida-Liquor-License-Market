import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-dynamic";

export async function GET() {
  const names = [
    "fllm-static-b64-00.txt",
    "fllm-static-b64-01.txt",
    "fllm-static-b64-02.txt",
    "fllm-static-b64-03.txt",
    "fllm-static-b64-04.txt",
    "fllm-static-b64-05.txt",
    "fllm-static-b64-06.txt",
    "fllm-static-b64-07.txt",
  ];

  const encoded = names
    .map((name) =>
      readFileSync(join(process.cwd(), "public", "assets", name), "utf8").trim(),
    )
    .join("");

  const bytes = Buffer.from(encoded, "base64");

  return new Response(bytes, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
