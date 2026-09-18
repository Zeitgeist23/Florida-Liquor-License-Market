import {
  buildBrokerOutreachMessage,
  createBrokerProspect,
  listBrokerOutreachData,
  updateBrokerProspect,
} from "@/lib/broker-outreach";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TOKEN = "chip-redmond-draft-2489642";
const LISTING_URL = "https://www.bizbuysell.com/business-opportunity/established-liquor-store-prime-high-traffic-location-in-lake-co/2489642/";

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
  const token = typeof params.token === "string" ? params.token : "";
  if (token !== TOKEN) return <main>Unauthorized</main>;

  try {
    const data = await listBrokerOutreachData();
    let prospect = data.prospects.find(
      (item) => item.email?.toLowerCase() === "chip@tworld.com",
    );

    const patch = {
      full_name: "Chip Redmond",
      email: "chip@tworld.com",
      phone: "772-758-1678",
      brokerage: "Transworld Business Brokers of Central Florida",
      source_platform: "BizBuySell",
      source_url: LISTING_URL,
      listing_title: "Established Liquor Store – Prime High-Traffic Location in Lake Co",
      listing_url: LISTING_URL,
      county: "Lake County",
      license_type: "Florida quota liquor license (series not stated)",
      listing_kind: "business_with_license" as const,
      languages: ["English"],
      outreach_template: "neutral" as const,
      template_basis: "manual",
      status: "new",
      notes:
        "BizBuySell Ad #2489642 / Transworld listing 2301-429989. Asking price $1,200,000. Asset sale includes fixtures, equipment, inventory, goodwill and a Lake County quota liquor license. License series is not stated in the public listing.",
    };

    prospect = prospect
      ? await updateBrokerProspect(prospect.id, patch)
      : await createBrokerProspect(patch);

    if (!prospect) throw new Error("Could not save Chip Redmond as a broker prospect.");

    const built = buildBrokerOutreachMessage(prospect);
    const draft = await insertDraft({
      campaign_id: null,
      prospect_id: prospect.id,
      template_mode: prospect.outreach_template || "neutral",
      subject_line: built.subject,
      body_text: built.text,
      body_html: built.html,
      status: "draft",
      generated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return (
      <main>
        <h1>Chip Redmond broker outreach draft created</h1>
        <p>Prospect ID: {prospect.id}</p>
        <p>Draft ID: {draft.id}</p>
        <p>Subject: {built.subject}</p>
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
