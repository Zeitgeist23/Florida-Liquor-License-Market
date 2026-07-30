import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chunksDir = path.join(root, "public", "assets", "fllm-seller-approved-q75");
const outputDir = path.join(root, "public", "assets");
const outputPath = path.join(outputDir, "fllm-seller-approved.webp");

const orderedParts = [
  "chunk-00.txt",
  "chunk-01-00.txt",
  "chunk-01-01.txt",
  "chunk-01-02.txt",
  "chunk-01-03.txt",
  "chunk-01-04.txt",
  "chunk-01-05.txt",
  "chunk-01-06.txt",
  "chunk-01-07.txt",
  "chunk-01-08.txt",
  "chunk-01-09.txt",
  "chunk-01c.txt",
  "chunk-01d.txt",
  "tail-00.txt",
  "tail-01.txt",
  "tail-02.txt",
  "tail-03.txt",
  "pair-04-05.txt",
  "pair-06-07.txt",
  "pair-08-09.txt",
  "tail-10.txt",
  "tail-11.txt",
  "tail-12.txt",
  "tail-13-00.txt",
  "tail-13-01-00.txt",
  "tail-13-01-01.txt",
  "tail-13-01-02.txt",
  "tail-13-01-03.txt",
  "tail-13-01-04.txt",
  "tail-13-01-05.txt",
  "tail-13-01-06.txt",
  "tail-13-01-07.txt",
  "tail-13-01-08.txt",
  "tail-13-01-09.txt",
  "tail-13-02.txt",
  "tail-13-03.txt",
  "tail-13-04.txt",
  "tail-14.txt",
  "tail-15.txt",
  "pair-16-17.txt",
  "tail-18.txt",
];

const expectedBase64Length = 132512;
const expectedByteLength = 99384;

const encodedParts = await Promise.all(
  orderedParts.map(async (filename) => {
    const value = await readFile(path.join(chunksDir, filename), "utf8");
    return value.replace(/\s+/g, "");
  })
);

const encoded = encodedParts.join("");
if (encoded.length !== expectedBase64Length) {
  throw new Error(
    `Approved seller artwork is incomplete: expected ${expectedBase64Length} base64 characters, received ${encoded.length}.`
  );
}

const image = Buffer.from(encoded, "base64");
const riff = image.subarray(0, 4).toString("ascii");
const webp = image.subarray(8, 12).toString("ascii");

if (image.length !== expectedByteLength || riff !== "RIFF" || webp !== "WEBP") {
  throw new Error(
    `Approved seller artwork is invalid: bytes=${image.length}, riff=${riff}, webp=${webp}.`
  );
}

const sha256 = createHash("sha256").update(image).digest("hex");
await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, image);
console.log(`Validated seller artwork: ${outputPath} (${image.length} bytes, ${sha256}).`);
