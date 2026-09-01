import "server-only";

import { FLLM_GMAIL_SIGNATURE_IMAGE_BASE64 } from "@/lib/fllm-gmail-signature";

const FLLM_SIGNATURE_CID_PLACEHOLDER = "__FLLM_SIGNATURE_CID__";

export type ResendEmailInput = {
  to: string;
  cc?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{
    fileName: string;
    contentType: string;
    content: Uint8Array;
  }>;
};

function senderEmail() {
  return (
    process.env.RESEND_FROM_EMAIL ||
    process.env.GOOGLE_SENDER_EMAIL ||
    "listings@floridaliquorlicensemarket.com"
  );
}

export async function sendViaResend(input: ResendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const signatureContentId = `fllm-signature-${Date.now()}-${Math.random().toString(16).slice(2)}@floridaliquorlicensemarket.com`;
  const html = input.html.replaceAll(
    FLLM_SIGNATURE_CID_PLACEHOLDER,
    signatureContentId,
  );

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Florida Liquor License Market <${senderEmail()}>`,
      to: input.to,
      ...(input.cc ? { cc: input.cc } : {}),
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      subject: input.subject,
      text: input.text,
      html,
      attachments: [
        {
          filename: "Florida Liquor License Market.png",
          content: FLLM_GMAIL_SIGNATURE_IMAGE_BASE64,
          content_id: signatureContentId,
        },
        ...(input.attachments ?? []).map((attachment) => ({
          filename: attachment.fileName.replace(/["\r\n]/g, "_"),
          content: Buffer.from(attachment.content).toString("base64"),
        })),
      ],
    }),
    cache: "no-store",
  });

  const responseText = await response.text();
  let payload: { id?: string; message?: string } = {};
  try {
    payload = JSON.parse(responseText) as typeof payload;
  } catch {
    // Keep the raw response text for the error below.
  }

  if (!response.ok || !payload.id) {
    throw new Error(
      `Resend API send failed: ${response.status} ${payload.message || responseText || "Unknown error"}`,
    );
  }

  return { id: payload.id, threadId: payload.id };
}
