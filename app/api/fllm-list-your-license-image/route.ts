import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const PARTS = [
  "chunk-00.txt",
  "chunk-01.txt",
  "chunk-02.txt",
  "chunk-03.txt",
  "chunk-04.txt",
  "chunk-05.txt",
  "chunk-06.txt",
  "chunk-07.txt",
  "chunk-08.txt",
  "chunk-09.txt",
  "chunk-10.txt",
  "chunk-11.txt",
] as const;

const EXPECTED_BASE64_LENGTH = 2386832;
const EXPECTED_SHA256 =
  "2512f458a2004ca7dce1d35fd06a3d343221450f771d1f1b5e42d1ef03e1578a";

export const dynamic = "force-static";

export async function GET() {
  const directory = path.join(
    process.cwd(),
    "public",
    "assets",
    "fllm-list-your-license-final",
  );

  const encoded = (
    await Promise.all(
      PARTS.map((fileName) => readFile(path.join(directory, fileName), "utf8")),
    )
  )
    .join("")
    .replace(/\s+/g, "");

  if (encoded.length !== EXPECTED_BASE64_LENGTH) {
    return new Response("Approved image is incomplete.", { status: 500 });
  }

  const image = Buffer.from(encoded, "base64");
  const digest = createHash("sha256").update(image).digest("hex");

  if (digest !== EXPECTED_SHA256) {
    return new Response("Approved image failed integrity verification.", {
      status: 500,
    });
  }

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(image.byteLength),
    },
  });
}
