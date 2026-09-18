import {
  buildBrokerOutreachMessage,
  createBrokerProspect,
  listBrokerOutreachData,
  updateBrokerProspect,
} from "@/lib/broker-outreach";
import { supabaseServiceSettings } from "@/lib/supabase-settings";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TOKEN = "nadir-jiddou-draft-2550445";
const LISTING_URL = "https://www.bizbuysell.com/business-asset/orange-county-florida-quota-4cop-3ps-liquor-license/2550445/";

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
      (item) => item.email?.toLowerCase() === "nadir@mibizbroker.com",
    );

    const patch = {
      full_name: "Nadir Jiddou",
      email: "nadir@mibizbroker.com",
      phone: "947-219-1040",
      brokerage: "Michigan Business Broker",
      website_url: "https://michiganbusinessbroker.com/",
      source_platform: "BizBuySell",
      source_url: LISTING_URL,
      listing_title: "Orange County, Florida Quota 4COP / 3PS Liquor License!",
      listing_url: LISTING_URL,
      county: "Orange County",
      license_type: "4COP Quota / 3PS",
      listing_kind: "license_only" as const,
      languages: ["English"],
      outreach_template: "neutral" as const,
      template_basis: "manual",
      status: "new",
      notes:
        "BizBuySell Ad #2550445. Asking price $538,999. Asset sale is for an Orange County Florida quota 4COP / 3PS liquor license. Screenshot shows broker Nadir Jiddou, Michigan Business Broker, phone 947-219-1040.",
    };

    prospect = prospect
      ? await updateBrokerProspect(prospect.id, patch)
      : await createBrokerProspect(patch);

    if (!prospect) throw new Error("Could not save Nadir Jiddou as a broker prospect.");

    const built = buildBrokerOutreachMessage(prospect);
    const subject = "Additional exposure for your Orange County quota liquor license listing";

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
        <h1>Nadir Jiddou broker outreach draft created</h1>
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
