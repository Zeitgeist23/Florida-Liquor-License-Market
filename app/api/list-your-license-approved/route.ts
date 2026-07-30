import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const PARTS = Array.from(
  { length: 31 },
  (_, index) => `chunk-${String(index).padStart(2, "0")}.txt`,
);

const EXPECTED_BASE64_LENGTH = 1853960;
const EXPECTED_SHA256 =
  "e96dc43e1a2d7a2ee1692328715a01312dca6ff7244d2f6eecbb507fb8abf4d5";

export const dynamic = "force-static";

export async function GET() {
  const directory = path.join(
    process.cwd(),
    "public",
    "assets",
    "list-your-license-approved-2026-07-30",
  );

  const encoded = (
    await Promise.all(
      PARTS.map((fileName) => readFile(path.join(directory, fileName), "utf8")),
    )
  )
    .join("")
    .replace(/\s+/g, "");

  if (encoded.length !== EXPECTED_BASE64_LENGTH) {
    return new Response("Approved seller artwork is incomplete.", {
      status: 500,
    });
  }

  const image = Buffer.from(encoded, "base64");
  const digest = createHash("sha256").update(image).digest("hex");

  if (digest !== EXPECTED_SHA256) {
    return new Response("Approved seller artwork failed integrity verification.", {
      status: 500,
    });
  }

  return new Response(image, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(image.byteLength),
    },
  });
}
