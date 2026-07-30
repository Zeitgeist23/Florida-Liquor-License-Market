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
  "chunk-06-07.txt",
  "chunk-08-09.txt",
  "chunk-10-11.txt",
  "chunk-12-13.txt",
  "chunk-14-15.txt",
  "chunk-16-17.txt",
] as const;

const EXPECTED_BASE64_LENGTH = 136448;
const EXPECTED_SHA256 =
  "ae4dbeafaa44214d01649dcacf5ca4fd1173200842b280cf3cedcac52d0dd711";

export const dynamic = "force-static";

export async function GET() {
  const directory = path.join(
    process.cwd(),
    "public",
    "assets",
    "fllm-list-your-license-approved",
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
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(image.byteLength),
    },
  });
}
