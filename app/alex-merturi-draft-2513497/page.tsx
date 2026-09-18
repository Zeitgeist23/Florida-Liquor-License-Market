import {
  buildBrokerOutreachMessage,
  createBrokerProspect,
  listBrokerOutreachData,
  updateBrokerProspect,
} from "@/lib/broker-outreach";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TOKEN = "alex-merturi-draft-2513497";
const LISTING_URL = "https://www.bizbuysell.com/business-opportunity/30-years-landmark-pub-florida-4cop-quota-liquor-license-included/2513497/";

async function insertDraft(row: Record<string, unknown>) {
  const { url, key } = supabaseServiceSettings("Broker outreach database is unavailable.");
  const response = await fetch(`${url}/rest/v1/broker_outreach_messages`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not create broker outreach draft: ${response.status} ${await response.text()}`);
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
  if (params.token !== TOKEN) return <main>Unauthorized</main>;

  try {
    const data = await listBrokerOutreachData();
    let prospect = data.prospects.find(
      (item) => item.email?.toLowerCase() === "alex@assignyourlease.com",
    );

    const patch = {
      full_name: "Alex Merturi",
      email: "alex@assignyourlease.com",
      phone: "475-250-2609",
      brokerage: "Assign Your Lease Better Business Brokerage",
      website_url: "https://alexmerturi.com/",
      source_platform: "BizBuySell",
      source_url: LISTING_URL,
      listing_title: "30+ Years Landmark Pub Florida 4COP Quota Liquor License Included",
      listing_url: LISTING_URL,
      county: "Hillsborough County",
      license_type: "4COP Quota",
      listing_kind: "business_with_license" as const,
      languages: ["English"],
      outreach_template: "neutral" as const,
      template_basis: "manual",
      status: "new",
      notes:
        "BizBuySell Ad #2513497. Asking price $949,000. Gross revenue shown as $1,200,000. Business listing states a Florida 4COP Quota liquor license is included. Broker shown as Alex Merturi, Assign Your Lease Better Business Brokerage.",
    };

    prospect = prospect
      ? await updateBrokerProspect(prospect.id, patch)
      : await createBrokerProspect(patch);

    if (!prospect) throw new Error("Could not save Alex Merturi as a broker prospect.");

    const built = buildBrokerOutreachMessage(prospect);
    const subject = "Additional liquor-license exposure for your Hillsborough County pub listing";

    const draft = await insertDraft({
      campaign_id: null,
      prospect_id: prospect.id,
      template_mode: prospect.outreach_template || "neutral",
      subject_line: subject,
      body_text: built.text,
      body_html: built.html,
      status: "draft",
      generated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return (
      <main>
        <h1>Alex Merturi broker outreach draft created</h1>
        <p>Prospect ID: {prospect.id}</p>
        <p>Draft ID: {draft.id}</p>
        <p>Subject: {subject}</p>
        <p>No email was sent.</p>
      </main>
    );
  } catch (error) {
    return (
      <main>
        <h1>Draft creation failed</h1>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </main>
    );
  }
}
