import { sendBrokerMessage } from "@/lib/broker-outreach";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  if (params.token !== "chip-live-approval-76830260") return <main>Unauthorized</main>;

  const message = await sendBrokerMessage("76830260-3fa2-404e-8770-04ea5148ad68");

  return (
    <main>
      <h1>Chip Redmond outreach</h1>
      <p>Status: {message?.status}</p>
      <p>Provider message ID: {message?.provider_message_id}</p>
    </main>
  );
}
