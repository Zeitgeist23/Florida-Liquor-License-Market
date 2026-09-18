import { sendFllmEmail } from "@/lib/fllm-email";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TOKEN = "chip-approval-copy-76830260";
const TEST_RECIPIENT = "JWigg023@gmail.com";
const DRAFT_ID = "76830260-3fa2-404e-8770-04ea5148ad68";

async function getDraft() {
  const { url, key } = supabaseServiceSettings("Broker outreach database is unavailable.");
  const response = await fetch(
    `${url}/rest/v1/broker_outreach_messages?select=*&id=eq.${DRAFT_ID}&limit=1`,
    {
      cache: "no-store",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Could not load broker outreach draft: ${response.status} ${await response.text()}`);
  }
  const rows = await response.json();
  return rows[0];
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  if (token !== TOKEN) return <main>Unauthorized</main>;

  try {
    const draft = await getDraft();
    if (!draft) return <main>Draft not found.</main>;

    const result = await sendFllmEmail({
      to: TEST_RECIPIENT,
      subject: `APPROVAL COPY — ${draft.subject_line}`,
      text: draft.body_text,
      html: draft.body_html,
    });

    return (
      <main>
        <h1>Approval copy sent</h1>
        <p>Recipient: {TEST_RECIPIENT}</p>
        <p>Draft ID: {DRAFT_ID}</p>
        <p>Provider message ID: {result.id}</p>
        <p>Chip Redmond was not emailed.</p>
      </main>
    );
  } catch (error) {
    return (
      <main>
        <h1>Approval copy failed</h1>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </main>
    );
  }
}
