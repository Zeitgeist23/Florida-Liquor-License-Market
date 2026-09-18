import { sendFllmEmail } from "@/lib/fllm-email";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const p = await searchParams;
  if (p.token !== "nadir-copy-f9b82a43") return <main>Unauthorized</main>;

  const { url, key } = supabaseServiceSettings("Broker outreach database is unavailable.");
  const response = await fetch(
    `${url}/rest/v1/broker_outreach_messages?select=subject_line,body_text,body_html&id=eq.f9b82a43-67c4-4b40-9f24-d3d8e7bd8a50&limit=1`,
    {cache:"no-store",headers:{apikey:key,Authorization:`Bearer ${key}`}}
  );
  if (!response.ok) return <main>Draft lookup failed.</main>;
  const [draft] = await response.json();
  if (!draft) return <main>Draft not found.</main>;

  const result = await sendFllmEmail({
    to:"JWigg023@gmail.com",
    subject:`APPROVAL COPY — ${draft.subject_line}`,
    text:draft.body_text,
    html:draft.body_html,
  });

  return <main><h1>Approval copy sent</h1><p>{result.id}</p><p>Nadir was not emailed.</p></main>;
}
