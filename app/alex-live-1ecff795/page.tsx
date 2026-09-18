import { sendBrokerMessage } from "@/lib/broker-outreach";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  if (params.token !== "alex-live-1ecff795") return <main>Unauthorized</main>;

  const message = await sendBrokerMessage("1ecff795-c74a-462b-ae93-63df5ffa9e14");

  return (
    <main>
      <h1>Alex Merturi outreach</h1>
      <p>Status: {message?.status}</p>
      <p>Provider message ID: {message?.provider_message_id}</p>
    </main>
  );
}
