import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const assetsDir = join(root, "public", "assets");
const names = Array.from({ length: 8 }, (_, index) =>
  `fllm-static-b64-${String(index).padStart(2, "0")}.txt`,
);

const encoded = names
  .map((name) => readFileSync(join(assetsDir, name), "utf8").trim())
  .join("");

const bytes = Buffer.from(encoded, "base64");

if (bytes.length < 100000) {
  throw new Error(`Exchange static image is unexpectedly small: ${bytes.length} bytes`);
}

const riff = bytes.subarray(0, 4).toString("ascii");
const webp = bytes.subarray(8, 12).toString("ascii");
if (riff !== "RIFF" || webp !== "WEBP") {
  throw new Error("Exchange static image payload is not a valid WebP file");
}

const output = join(assetsDir, "fllm-exchange-board-static.webp");
writeFileSync(output, bytes);
console.log(`Built ${output} (${bytes.length} bytes)`);
