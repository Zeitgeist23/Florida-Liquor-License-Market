import "server-only";

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

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.FLLM_SITE_URL ||
    "https://www.floridaliquorlicensemarket.com"
  ).replace(/\/$/, "");
}

function resendDomain() {
  return (process.env.RESEND_EMAIL_DOMAIN || "floridaliquorlicensemarket.com")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "");
}

function exchangeEmail() {
  return `exchange@${resendDomain()}`;
}

function senderIdentity(input: ResendEmailInput) {
  const exchangeAddress = exchangeEmail();
  const isExchange = input.replyTo?.trim().toLowerCase() === exchangeAddress.toLowerCase();
  if (isExchange) {
    return {
      name: "Florida Liquor License Market Exchange",
      email: exchangeAddress,
    };
  }
  return {
    name: "Florida Liquor License Market",
    email: process.env.RESEND_FROM_EMAIL || `listings@${resendDomain()}`,
  };
}

export async function sendViaResend(input: ResendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const html = input.html.replaceAll(
    `cid:${FLLM_SIGNATURE_CID_PLACEHOLDER}`,
    `${siteUrl()}/assets/fllm-email-logo.png`,
  );
  const sender = senderIdentity(input);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${sender.name} <${sender.email}>`,
      to: input.to,
      ...(input.cc ? { cc: input.cc } : {}),
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      subject: input.subject,
      text: input.text,
      html,
      ...(input.attachments?.length
        ? {
            attachments: input.attachments.map((attachment) => ({
              filename: attachment.fileName.replace(/["\r\n]/g, "_"),
              content: Buffer.from(attachment.content).toString("base64"),
            })),
          }
        : {}),
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
