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
  "chunk-01a.txt",
  "chunk-01b.txt",
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
  "tail-13.txt",
  "tail-14.txt",
  "tail-15.txt",
  "pair-16-17.txt",
  "tail-18.txt",
];

const expectedBase64Length = 132512;
const expectedByteLength = 99384;
const expectedSha256 = "dc61c3e6a6cffd35c26269fa41e07d088a1f4913687f238ef6bbfea53d50a239";

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
const sha256 = createHash("sha256").update(image).digest("hex");

if (image.length !== expectedByteLength || sha256 !== expectedSha256) {
  throw new Error(
    `Approved seller artwork failed integrity verification: bytes=${image.length}, sha256=${sha256}.`
  );
}

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, image);
console.log(`Verified approved seller artwork: ${outputPath} (${image.length} bytes, ${sha256}).`);
