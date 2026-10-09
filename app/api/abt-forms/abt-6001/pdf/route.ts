import { readFile } from "node:fs/promises";
import path from "node:path";
import { brotliDecompressSync } from "node:zlib";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function readFllmAbt6001Pdf() {
  const encoded = await readFile(
    path.join(
      process.cwd(),
      "public",
      "abt-forms",
      "fllm-abt6001",
      "abt6001.br64"
    ),
    "utf8"
  );
  const compressed = Buffer.from(encoded.trim(), "base64");
  const pdf = brotliDecompressSync(compressed);
  return new Uint8Array(pdf.buffer, pdf.byteOffset, pdf.byteLength);
}

export async function GET(request: Request) {
  const pdfBytes = await readFllmAbt6001Pdf();
  const body = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength
  ) as ArrayBuffer;
  const download = new URL(request.url).searchParams.get("download") === "1";

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="ABT-6001-FLLM-Fillable.pdf"`,
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-FLLM-PDF-Variant": "FLLM-9-page-fillable",
    },
  });
}
