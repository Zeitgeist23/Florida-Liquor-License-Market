import {
  buildBrokerOutreachMessage,
  listBrokerOutreachData,
} from "@/lib/broker-outreach";
import { sendFllmEmail } from "@/lib/fllm-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TEST_TOKEN = "fllm-links-email-6f3c9a2d7e";
const TEST_RECIPIENT = "JWigg023@gmail.com";
const SOURCE_BROKER_EMAIL = "lin.floridarealty@gmail.com";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";

  if (token !== TEST_TOKEN) {
    return <main>Unauthorized</main>;
  }

  try {
    const { prospects } = await listBrokerOutreachData();
    const prospect = prospects.find(
      (item) => item.email?.toLowerCase() === SOURCE_BROKER_EMAIL,
    );

    if (!prospect) return <main>Source broker prospect not found.</main>;

    const built = buildBrokerOutreachMessage(prospect);
    const result = await sendFllmEmail({
      to: TEST_RECIPIENT,
      subject: `[FLLM UPDATED LINKS] ${built.subject}`,
      text: built.text,
      html: built.html,
    });

    return (
      <main>
        <h1>FLLM updated broker email links test</h1>
        <p>ok: true</p>
        <p>recipient: {TEST_RECIPIENT}</p>
        <p>provider message id: {result.id}</p>
      </main>
    );
  } catch (error) {
    return (
      <main>
        <h1>FLLM updated broker email links test</h1>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </main>
    );
  }
}
