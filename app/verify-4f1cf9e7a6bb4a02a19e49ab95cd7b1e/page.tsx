import { emailShell, sendFllmEmail } from "@/lib/fllm-email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TEST_RECIPIENT = "jwigg023@gmail.com";
const TEST_SUBJECT = "FINAL FLLM CORPORATE SIGNATURE TEST";
const LIVE_LISTING_URL =
  "https://www.floridaliquorlicensemarket.com/listings/desoto-4cop-quota-fllm-152-oavxap";

export default async function OneTimeEmailVerificationPage() {
  try {
    const content = `
      <p style="margin:0 0 18px;">Hello James,</p>
      <p style="margin:0 0 18px;">Florida Liquor License Market has published a new liquor-license listing that may be relevant to your clients.</p>
      <p style="margin:0 0 18px;">
        <strong>Listing:</strong> DeSoto County 4COP Liquor License for Sale<br>
        <strong>County:</strong> DeSoto County<br>
        <strong>License Type:</strong> 4COP Quota<br>
        <strong>Asking Price:</strong> $99,000<br>
        <strong>Reference:</strong> FLLM-152
      </p>
      <p style="margin:0 0 22px;">
        <a href="${LIVE_LISTING_URL}" style="display:inline-block;background:#071a3a;color:#ffffff;font-weight:bold;text-decoration:none;padding:12px 20px;border-radius:4px;">View the live listing</a>
      </p>
      <p style="margin:0 0 18px;">Availability, price, license status, and transfer eligibility remain subject to confirmation and applicable regulatory requirements.</p>
      <p style="margin:0;">If you prefer not to receive approved FLLM listing notices, reply to this email and we will remove you from the outreach directory.</p>`;

    const text = `Hello James,

Florida Liquor License Market has published a new liquor-license listing that may be relevant to your clients.

Listing: DeSoto County 4COP Liquor License for Sale
County: DeSoto County
License Type: 4COP Quota
Asking Price: $99,000
Reference: FLLM-152

View the live listing: ${LIVE_LISTING_URL}

Availability, price, license status, and transfer eligibility remain subject to confirmation and applicable regulatory requirements.

If you prefer not to receive approved FLLM listing notices, reply to this email and we will remove you from the outreach directory.

Florida Liquor License Market
listings@floridaliquorlicensemarket.com
https://www.floridaliquorlicensemarket.com`;

    const result = await sendFllmEmail({
      to: TEST_RECIPIENT,
      subject: TEST_SUBJECT,
      text,
      html: emailShell(content),
    });

    return (
      <main style={{ maxWidth: 720, margin: "64px auto", padding: "0 24px", fontFamily: "Arial, sans-serif" }}>
        <h1>Test email sent</h1>
        <p>Recipient: <strong>{TEST_RECIPIENT}</strong></p>
        <p>Message ID: <code>{result.id}</code></p>
        <p>No broker emails were sent.</p>
      </main>
    );
  } catch (error) {
    return (
      <main style={{ maxWidth: 720, margin: "64px auto", padding: "0 24px", fontFamily: "Arial, sans-serif" }}>
        <h1>Test email failed</h1>
        <p>{error instanceof Error ? error.message : "Unknown error"}</p>
      </main>
    );
  }
}
