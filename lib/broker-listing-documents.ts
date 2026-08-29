import "server-only";

import { randomUUID } from "node:crypto";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

const BUCKET = "broker-listing-documents";
const MAX_FILE_SIZE = 4_000_000;
const allowedTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);

function settings() {
  return supabaseServiceSettings("Broker listing document storage is temporarily unavailable.");
}

function headers(contentType: string) {
  const { key } = settings();
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": contentType };
}

async function ensureBucket() {
  const { url } = settings();
  const response = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: headers("application/json"),
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: false,
      file_size_limit: MAX_FILE_SIZE,
      allowed_mime_types: Array.from(allowedTypes),
    }),
    cache: "no-store",
  });
  if (!response.ok && response.status !== 409) {
    throw new Error("The private document workspace could not be initialized.");
  }
}

function extensionFor(file: File) {
  if (file.type === "application/pdf") return "pdf";
  if (file.type === "image/png") return "png";
  return "jpg";
}

function validSignature(bytes: Uint8Array, type: string) {
  if (type === "application/pdf") return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  if (type === "image/png") return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

export async function uploadBrokerListingDocument(file: File) {
  if (!allowedTypes.has(file.type)) throw new Error("Upload a PDF, JPG or PNG document.");
  if (!file.size || file.size > MAX_FILE_SIZE) throw new Error("The supporting document must be smaller than 4 MB.");

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!validSignature(bytes, file.type)) throw new Error("The supporting document is not a valid PDF, JPG or PNG file.");

  await ensureBucket();
  const { url } = settings();
  const objectPath = `pending/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${extensionFor(file)}`;
  const response = await fetch(`${url}/storage/v1/object/${BUCKET}/${objectPath.split("/").map(encodeURIComponent).join("/")}`, {
    method: "POST",
    headers: { ...headers(file.type), "x-upsert": "false" },
    body: Buffer.from(bytes),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("The supporting document could not be stored securely.");

  return {
    objectPath,
    fileName: file.name.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 180),
    mimeType: file.type,
    size: file.size,
  };
}
