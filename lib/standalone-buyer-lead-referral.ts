export type StandaloneBuyerLeadReferralInput = {
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string | null;
  county: string;
  licenseType: string;
  brokerName?: string | null;
};

export type StandaloneBuyerLeadReferralVerification = {
  availabilityConfirmed: true;
  confirmedBy: "phone" | "email";
  confirmedAt: string;
  brokerEmail: string;
};

export function buildStandaloneBuyerLeadReferralEmail(
  input: StandaloneBuyerLeadReferralInput,
  verification: StandaloneBuyerLeadReferralVerification,
) {
  const subject = `FLLM Buyer Lead — ${input.county} ${input.licenseType} License`;
  const buyerPhone = input.buyerPhone?.trim() || "Not provided";
  const listingUrl = "https://www.floridaliquorlicensemarket.com/brokers/list-your-license";

  const text = [
    "Florida Liquor License Market",
    "Buyer Lead Notification",
    "",
    `Florida Liquor License Market recently received an inquiry from a prospective buyer seeking to purchase a ${input.county} ${input.licenseType} liquor license.`,
    "",
    `FLLM has confirmed that you currently have ${input.county} ${input.licenseType} inventory available and is providing the buyer's contact information below for direct follow-up.`,
    "",
    "Buyer Contact Information",
    "",
    `Name: ${input.buyerName}`,
    `Email: ${input.buyerEmail}`,
    `Phone: ${buyerPhone}`,
    `Preferred County: ${input.county}`,
    `License Interest: ${input.licenseType}`,
    "",
    `Please contact the buyer directly regarding your available ${input.county} ${input.licenseType} license inventory, current pricing, availability, and transaction terms.`,
    "",
    "FLLM provides targeted marketplace exposure and buyer-lead generation for Florida liquor-license inventory. Brokers and license sellers can also add available inventory to FLLM to reach buyers specifically searching for Florida liquor licenses.",
    "",
    "If you would like to add additional Florida liquor-license inventory to FLLM, you can review the Featured Broker Listing options here:",
    listingUrl,
    "",
    "Florida Liquor License Market",
    "Client Services",
    "(407) 589-5522",
    "clientservices@floridaliquorlicensemarket.com",
    "www.floridaliquorlicensemarket.com",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#071a3a;line-height:1.55;">
      <p style="margin:0 0 4px;font-weight:700;">Florida Liquor License Market</p>
      <p style="margin:0 0 22px;font-weight:700;">Buyer Lead Notification</p>

      <p>Florida Liquor License Market recently received an inquiry from a prospective buyer seeking to purchase a <strong>${input.county} ${input.licenseType} liquor license</strong>.</p>

      <p>FLLM has confirmed that you currently have ${input.county} ${input.licenseType} inventory available and is providing the buyer's contact information below for direct follow-up.</p>

      <p style="margin:22px 0 8px;font-weight:700;">Buyer Contact Information</p>
      <p style="margin:0 0 18px;">
        <strong>Name:</strong> ${input.buyerName}<br>
        <strong>Email:</strong> <a href="mailto:${input.buyerEmail}">${input.buyerEmail}</a><br>
        <strong>Phone:</strong> ${buyerPhone}<br>
        <strong>Preferred County:</strong> ${input.county}<br>
        <strong>License Interest:</strong> ${input.licenseType}
      </p>

      <p>Please contact the buyer directly regarding your available ${input.county} ${input.licenseType} license inventory, current pricing, availability, and transaction terms.</p>

      <p>FLLM provides targeted marketplace exposure and buyer-lead generation for Florida liquor-license inventory. Brokers and license sellers can also add available inventory to FLLM to reach buyers specifically searching for Florida liquor licenses.</p>

      <p>If you would like to add additional Florida liquor-license inventory to FLLM, you can review the Featured Broker Listing options here:</p>

      <p><a href="${listingUrl}">${listingUrl}</a></p>
    </div>
  `;

  return {
    to: verification.brokerEmail,
    subject,
    text,
    html,
    internalVerification: {
      availabilityConfirmed: true,
      confirmedBy: verification.confirmedBy,
      confirmedAt: verification.confirmedAt,
    },
  };
}
