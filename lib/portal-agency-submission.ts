import "server-only";

import { PDFDocument } from "pdf-lib";

import { getAbtLicensingDistrictOffice } from "@/lib/abt-district-offices";
import { createDbprPackageCover } from "@/lib/dbpr-package-pdf";
import { sendFllmEmail } from "@/lib/fllm-email";
import {
  documentDefinitions,
  downloadPortalDocument,
  getPortalDocumentRecord,
  recordPortalSubmission,
  updatePortalDocument,
  uploadPortalDocument,
} from "@/lib/portal-document-workflow";
import type { PortalTransaction, PortalUser } from "@/lib/transaction-portal-store";

const FDOR_BEVERAGE_APPROVAL_EMAIL = "GTA_Beverage_License_Approval@floridarevenue.com";
const FDOR_AUTHORIZATION = "I authorize Florida Liquor License Market to transmit the exact stored signed application to the Florida Department of Revenue, copy me on the message, and retain the transmission record in this project.";
const FDOR_EMAIL_RISK = "I understand the agency instructs applicants to submit this application by email and direct FLLM to use that method.";
const FDOR_AUTHORITY = "I confirm that I am the applicant or am authorized by the applicant to direct this transmission.";
const DBPR_DELIVERY_AUTHORIZATION = "I confirm that the package was actually sent or delivered to the listed DBPR/ABT licensing office and authorize FLLM to record the details as the project submission record.";

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function acceptableCompletedStatus(status: string) {
  return status === "Completed" || status === "Submitted";
}

export async function submitProjectToFdor(input: {
  user: PortalUser;
  transaction: PortalTransaction;
  businessPartnerNumber: unknown;
  salesTaxCertificateNumber: unknown;
  authorizationAccepted: unknown;
  emailMethodAccepted: unknown;
  authorityAccepted: unknown;
}) {
  if (input.authorizationAccepted !== true || input.emailMethodAccepted !== true || input.authorityAccepted !== true) {
    throw new Error("All applicant authorization confirmations are required before transmission.");
  }
  const businessPartnerNumber = clean(input.businessPartnerNumber, 40);
  const salesTaxCertificateNumber = clean(input.salesTaxCertificateNumber, 40);
  if (!businessPartnerNumber || !salesTaxCertificateNumber) {
    throw new Error("Enter the FDOR business partner number and sales-and-use-tax certificate number.");
  }

  const abtRecord = await getPortalDocumentRecord(input.user.id, input.transaction, "abt-6002");
  if (!abtRecord || !acceptableCompletedStatus(abtRecord.status) || abtRecord.versions.length === 0) {
    throw new Error("Complete and upload the signed ABT-6002 before sending it to FDOR.");
  }
  const fdorRecord = await getPortalDocumentRecord(input.user.id, input.transaction, "fdor-clearance");
  if (fdorRecord?.status === "Submitted") throw new Error("This FDOR application has already been transmitted.");
  const stored = await downloadPortalDocument(input.user.id, input.transaction, "abt-6002");
  if (!stored) throw new Error("The signed ABT-6002 PDF could not be loaded from the project.");
  if (stored.bytes.length > 18 * 1024 * 1024) {
    throw new Error("The signed ABT-6002 is too large for reliable agency email delivery. Upload a PDF smaller than 18 MB.");
  }

  const applicantName = input.user.fullName;
  const licenseLabel = input.transaction.licenseNumber || "License number not yet assigned";
  const subject = `Alcoholic Beverage License Approval — ${input.transaction.reference}`;
  const text = `Florida Department of Revenue Beverage License Approval Team,

Florida Liquor License Market is transmitting the attached completed and signed alcoholic-beverage license application at the express direction of the authenticated portal user identified below, who affirmed authority to direct this transmission for the applicant.

Authorized portal contact: ${applicantName}
Contact email: ${input.user.email}
FLLM project reference: ${input.transaction.reference}
County: ${input.transaction.county}
License type: ${input.transaction.licenseType}
License number: ${licenseLabel}
FDOR business partner number: ${businessPartnerNumber}
Sales and use tax certificate number: ${salesTaxCertificateNumber}

Please direct application questions and agency correspondence to the applicant at ${input.user.email}.

Attachment: ${stored.version.fileName}`;
  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#111">
    <p>Florida Department of Revenue Beverage License Approval Team,</p>
    <p>Florida Liquor License Market is transmitting the attached completed and signed alcoholic-beverage license application at the express direction of the authenticated portal user identified below, who affirmed authority to direct this transmission for the applicant.</p>
    <p><strong>Authorized portal contact:</strong> ${escapeHtml(applicantName)}<br>
    <strong>Contact email:</strong> ${escapeHtml(input.user.email)}<br>
    <strong>FLLM project reference:</strong> ${escapeHtml(input.transaction.reference)}<br>
    <strong>County:</strong> ${escapeHtml(input.transaction.county)}<br>
    <strong>License type:</strong> ${escapeHtml(input.transaction.licenseType)}<br>
    <strong>License number:</strong> ${escapeHtml(licenseLabel)}<br>
    <strong>FDOR business partner number:</strong> ${escapeHtml(businessPartnerNumber)}<br>
    <strong>Sales and use tax certificate number:</strong> ${escapeHtml(salesTaxCertificateNumber)}</p>
    <p>Please direct application questions and agency correspondence to the applicant at <a href="mailto:${escapeHtml(input.user.email)}">${escapeHtml(input.user.email)}</a>.</p>
  </body></html>`;

  const result = await sendFllmEmail({
    to: FDOR_BEVERAGE_APPROVAL_EMAIL,
    cc: input.user.email,
    replyTo: input.user.email,
    subject,
    text,
    html,
    attachments: [{
      fileName: stored.version.fileName,
      contentType: "application/pdf",
      content: stored.bytes,
    }],
  });
  const submittedAt = new Date().toISOString();
  return recordPortalSubmission(
    input.user.id,
    input.user.email,
    input.transaction,
    "fdor-clearance",
    {
      agency: "FDOR",
      method: "email",
      recipient: FDOR_BEVERAGE_APPROVAL_EMAIL,
      submittedAt,
      confirmationId: result.id,
      details: {
        businessPartnerNumber,
        salesTaxCertificateNumber,
        attachmentVersionId: stored.version.id,
        copiedApplicant: input.user.email,
        threadId: result.threadId,
      },
      authorization: `${FDOR_AUTHORITY} ${FDOR_AUTHORIZATION} ${FDOR_EMAIL_RISK}`,
    }
  );
}

export async function prepareDbprSubmissionPackage(input: {
  user: PortalUser;
  transaction: PortalTransaction;
  documentKeys: unknown;
}) {
  const office = getAbtLicensingDistrictOffice(input.transaction.county);
  if (!office) throw new Error("FLLM could not determine the current ABT licensing office for this county.");
  const packageRecord = await getPortalDocumentRecord(input.user.id, input.transaction, "dbpr-submission");
  if (packageRecord?.status === "Submitted") throw new Error("This DBPR package is already recorded as submitted.");
  const requested = Array.isArray(input.documentKeys) ? input.documentKeys.map((key) => clean(key, 80)) : [];
  const uniqueKeys = [...new Set(["abt-6002", ...requested])];
  const definitions = documentDefinitions(input.transaction);
  const allowed = new Set(
    definitions
      .filter((definition) => !["dbpr-submission", "fdor-clearance", "transfer-fee"].includes(definition.key))
      .map((definition) => definition.key)
  );
  const selectedKeys = uniqueKeys.filter((key) => allowed.has(key));
  const sourceDocuments: Array<{ title: string; bytes: Uint8Array }> = [];
  for (const key of selectedKeys) {
    const record = await getPortalDocumentRecord(input.user.id, input.transaction, key);
    if (key === "abt-6002" && (!record || !acceptableCompletedStatus(record.status))) {
      throw new Error("Complete and upload the signed ABT-6002 before preparing the DBPR package.");
    }
    if (!record?.versions.length) {
      if (key === "abt-6002") throw new Error("The signed ABT-6002 PDF is missing from the project.");
      continue;
    }
    const stored = await downloadPortalDocument(input.user.id, input.transaction, key);
    if (stored) sourceDocuments.push({ title: record.title, bytes: stored.bytes });
  }
  if (!sourceDocuments.some((document) => document.title === "DBPR/ABT-6002")) {
    throw new Error("The signed ABT-6002 must be included in the DBPR package.");
  }

  const packagePdf = await createDbprPackageCover({
    transaction: input.transaction,
    office,
    includedTitles: sourceDocuments.map((document) => document.title),
  });
  for (const sourceDocument of sourceDocuments) {
    try {
      const source = await PDFDocument.load(sourceDocument.bytes, { ignoreEncryption: true });
      const pages = await packagePdf.copyPages(source, source.getPageIndices());
      pages.forEach((page) => packagePdf.addPage(page));
    } catch {
      throw new Error(`${sourceDocument.title} could not be merged. Upload a standard, non-encrypted PDF and try again.`);
    }
  }
  const bytes = await packagePdf.save();
  await uploadPortalDocument(
    input.user.id,
    input.user.email,
    input.transaction,
    "dbpr-submission",
    {
      bytes,
      fileName: `${input.transaction.reference}-DBPR-submission-package.pdf`,
      mimeType: "application/pdf",
    }
  );
  const result = await updatePortalDocument(
    input.user.id,
    input.user.email,
    input.transaction,
    "dbpr-submission",
    {
      status: "Completed",
      draftData: {
        office,
        includedTitles: sourceDocuments.map((document) => document.title),
      },
    }
  );
  return { ...result, office, includedTitles: sourceDocuments.map((document) => document.title) };
}

export async function recordDbprDelivery(input: {
  user: PortalUser;
  transaction: PortalTransaction;
  method: unknown;
  deliveryDate: unknown;
  confirmation: unknown;
  authorizationAccepted: unknown;
}) {
  if (input.authorizationAccepted !== true) throw new Error("Confirm actual delivery before recording submission.");
  const method = clean(input.method, 30) as "mail" | "hand delivery" | "appointment" | "courier";
  if (!["mail", "hand delivery", "appointment", "courier"].includes(method)) {
    throw new Error("Select how the DBPR package was delivered.");
  }
  const deliveryDate = clean(input.deliveryDate, 10);
  const parsedDate = new Date(`${deliveryDate}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(deliveryDate) || Number.isNaN(parsedDate.getTime())) {
    throw new Error("Enter the actual DBPR delivery or mailing date.");
  }
  if (parsedDate.getTime() > Date.now() + 24 * 60 * 60 * 1000) {
    throw new Error("The DBPR delivery date cannot be in the future.");
  }
  const confirmation = clean(input.confirmation, 180);
  if (confirmation.length < 3) {
    throw new Error("Enter a tracking number, stamped-receipt reference, appointment confirmation, or delivery note.");
  }
  const office = getAbtLicensingDistrictOffice(input.transaction.county);
  if (!office) throw new Error("FLLM could not determine the current ABT licensing office for this county.");
  const packageRecord = await getPortalDocumentRecord(input.user.id, input.transaction, "dbpr-submission");
  if (!packageRecord || packageRecord.status !== "Completed" || packageRecord.versions.length === 0) {
    throw new Error("Prepare and review the DBPR submission package before recording delivery.");
  }
  const submittedAt = new Date().toISOString();
  return recordPortalSubmission(
    input.user.id,
    input.user.email,
    input.transaction,
    "dbpr-submission",
    {
      agency: "DBPR/ABT",
      method,
      recipient: `${office.name}, ${office.addressLines.join(", ")}`,
      submittedAt,
      confirmationId: confirmation,
      details: {
        deliveryDate,
        officeName: office.name,
        officeAddress: office.addressLines.join(", "),
        officePhone: office.phone,
        packageVersionId: packageRecord.versions.at(-1)?.id || "",
      },
      authorization: DBPR_DELIVERY_AUTHORIZATION,
    }
  );
}

export const agencySubmissionDisclosures = {
  fdorAuthorization: FDOR_AUTHORIZATION,
  fdorEmailMethod: FDOR_EMAIL_RISK,
  fdorAuthority: FDOR_AUTHORITY,
  dbprDeliveryAuthorization: DBPR_DELIVERY_AUTHORIZATION,
};
