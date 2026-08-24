"use client";

import { FormEvent, useMemo, useState } from "react";

import type { AbtFormDefinition } from "@/data/abt-forms";

type ApplicationPath = {
  formId: string;
  step: string;
  title: string;
  description: string;
  result: string;
};

const APPLICATION_PATHS: ApplicationPath[] = [
  {
    formId: "abt-6001",
    step: "01",
    title: "Apply for a new license",
    description: "Start a new retail or wholesale alcoholic-beverage license application.",
    result: "New alcoholic beverage license",
  },
  {
    formId: "abt-6002",
    step: "02",
    title: "Buy or transfer a license",
    description: "Transfer ownership of an existing license or prepare a quota-license escrow filing.",
    result: "Transfer of ownership",
  },
  {
    formId: "abt-6014",
    step: "03",
    title: "Change location or series",
    description: "Request a location change or a change in the license series or type.",
    result: "Location, series or type change",
  },
  {
    formId: "abt-6027",
    step: "04",
    title: "Make a quota license inactive",
    description: "Request inactive status or an available active-operation waiver.",
    result: "Inactive status or waiver",
  },
  {
    formId: "abt-6022",
    step: "05",
    title: "Record a lender's interest",
    description: "Record a lien, mortgagee interest, assignment, renewal or extension.",
    result: "Lien or mortgagee interest",
  },
  {
    formId: "abt-6023",
    step: "06",
    title: "Request a lien search",
    description: "Ask ABT to search for recorded liens or mortgagee interests before closing.",
    result: "Alcoholic beverage license lien search",
  },
  {
    formId: "abt-6004",
    step: "07",
    title: "Change owners or officers",
    description: "Report officer, director, member, stockholder or entity-name changes.",
    result: "Officer, stockholder or entity update",
  },
  {
    formId: "abt-6009",
    step: "08",
    title: "Update name or mailing address",
    description: "Change the business name or mailing address on an existing license.",
    result: "Business-name or mailing-address update",
  },
  {
    formId: "abt-6033",
    step: "09",
    title: "Enter the quota drawing",
    description: "Prepare an entry for Florida's annual county-specific quota drawing.",
    result: "Quota beverage license drawing entry",
  },
];

type PacketFormState = {
  applicantName: string;
  businessName: string;
  county: string;
  licenseNumber: string;
  licenseSeries: string;
  email: string;
  phone: string;
  preparationPurpose: string;
  notes: string;
  confirmed: boolean;
};

const EMPTY_PACKET: PacketFormState = {
  applicantName: "",
  businessName: "",
  county: "",
  licenseNumber: "",
  licenseSeries: "",
  email: "",
  phone: "",
  preparationPurpose: "",
  notes: "",
  confirmed: false,
};

function workspaceHref(formId: string) {
  return formId === "abt-6002" ? "/dbpr-abt-6002" : `/resources/forms/${formId}`;
}

export default function FloridaAlcoholLicenseApplicationCenter({ forms }: { forms: AbtFormDefinition[] }) {
  const [selectedFormId, setSelectedFormId] = useState("abt-6001");
  const [packetOpen, setPacketOpen] = useState(false);
  const [packet, setPacket] = useState<PacketFormState>(EMPTY_PACKET);
  const [status, setStatus] = useState<"idle" | "generating" | "complete" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedPath = useMemo(
    () => APPLICATION_PATHS.find((path) => path.formId === selectedFormId) ?? APPLICATION_PATHS[0],
    [selectedFormId]
  );
  const selectedForm = useMemo(
    () => forms.find((form) => form.id === selectedFormId) ?? forms[0],
    [forms, selectedFormId]
  );

  function selectPath(formId: string) {
    setSelectedFormId(formId);
    setPacketOpen(false);
    setStatus("idle");
    setErrorMessage("");
  }

  function updatePacket<K extends keyof PacketFormState>(key: K, value: PacketFormState[K]) {
    setPacket((current) => ({ ...current, [key]: value }));
  }

  async function generatePacket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("generating");
    setErrorMessage("");

    try {
      const response = await fetch("/api/application-preparation-packet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: selectedFormId, ...packet }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(result?.error || "The preparation packet could not be generated.");
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `FLLM-${selectedForm.formNumber.replace(/DBPR\s+/i, "").replace(/[^A-Za-z0-9-]/g, "-")}-Preparation-Packet.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 2_000);
      setStatus("complete");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "The preparation packet could not be generated.");
    }
  }

  return (
    <section className="application-center" aria-labelledby="application-center-heading">
      <div className="application-center-heading">
        <div>
          <span>FLLM form finder</span>
          <h2 id="application-center-heading">What are you trying to do?</h2>
        </div>
        <p>Select the filing purpose. FLLM will identify the corresponding official Florida ABT form and prepare the next steps.</p>
      </div>

      <div className="application-path-grid" role="radiogroup" aria-label="Application purpose">
        {APPLICATION_PATHS.map((path) => {
          const selected = path.formId === selectedFormId;
          return (
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              className={selected ? "application-path is-selected" : "application-path"}
              key={path.formId}
              onClick={() => selectPath(path.formId)}
            >
              <b>{path.step}</b>
              <span><strong>{path.title}</strong><small>{path.description}</small></span>
            </button>
          );
        })}
      </div>

      <div className="application-result" aria-live="polite">
        <div className="application-result-copy">
          <span>Recommended filing</span>
          <h3>{selectedForm.formNumber}</h3>
          <h4>{selectedPath.result}</h4>
          <p>{selectedForm.description}</p>
          <div className="application-result-meta">
            <span>Official DBPR form</span>
            <span>Last verified {selectedForm.lastVerified}</span>
            <span>FLLM guided workspace</span>
          </div>
        </div>
        <div className="application-result-actions">
          <a className="btn btn-gold" href={workspaceHref(selectedFormId)}>Complete Official Form</a>
          <button className="btn btn-outline" type="button" onClick={() => setPacketOpen((value) => !value)}>
            {packetOpen ? "Close Packet Builder" : "Build FLLM Preparation Packet"}
          </button>
          <div className="application-source-links">
            <a className="application-official-source" href={selectedForm.officialPdfUrl} target="_blank" rel="noreferrer">Official form source ↗</a>
            <a className="application-official-source" href="https://www.myfloridalicense.com/" target="_blank" rel="noreferrer">DBPR Online Services ↗</a>
          </div>
        </div>
      </div>

      {packetOpen && (
        <form className="packet-builder" onSubmit={generatePacket}>
          <div className="packet-builder-heading">
            <div><span>FLLM application preparation packet</span><h3>Create your professional packet</h3></div>
            <p>The packet includes a branded cover, filing checklist and document index followed by the unchanged official form.</p>
          </div>

          <div className="packet-field-grid">
            <label><span>Applicant or contact name *</span><input value={packet.applicantName} onChange={(event) => updatePacket("applicantName", event.target.value)} autoComplete="name" required /></label>
            <label><span>Business or applicant entity</span><input value={packet.businessName} onChange={(event) => updatePacket("businessName", event.target.value)} autoComplete="organization" /></label>
            <label><span>Florida county</span><input value={packet.county} onChange={(event) => updatePacket("county", event.target.value)} placeholder="e.g. St. Johns County" /></label>
            <label><span>License number, if known</span><input value={packet.licenseNumber} onChange={(event) => updatePacket("licenseNumber", event.target.value)} placeholder="e.g. BEV6500-184" /></label>
            <label><span>License series or type</span><input value={packet.licenseSeries} onChange={(event) => updatePacket("licenseSeries", event.target.value)} placeholder="e.g. 4COP Quota" /></label>
            <label><span>Email *</span><input type="email" value={packet.email} onChange={(event) => updatePacket("email", event.target.value)} autoComplete="email" required /></label>
            <label><span>Phone</span><input type="tel" value={packet.phone} onChange={(event) => updatePacket("phone", event.target.value)} autoComplete="tel" /></label>
            <label><span>Preparation purpose</span><input value={packet.preparationPurpose} onChange={(event) => updatePacket("preparationPurpose", event.target.value)} placeholder="Purchase, transfer, refinance, opening, update..." /></label>
            <label className="packet-notes"><span>Packet notes</span><textarea value={packet.notes} onChange={(event) => updatePacket("notes", event.target.value)} placeholder="Deadline, transaction background or supporting-document notes." /></label>
          </div>

          <label className="packet-confirmation">
            <input type="checkbox" checked={packet.confirmed} onChange={(event) => updatePacket("confirmed", event.target.checked)} required />
            <span>I understand that FLLM prepares the packet for administrative convenience; I remain responsible for reviewing, signing and filing the official application and required attachments.</span>
          </label>

          {status === "error" && <div className="packet-status is-error" role="alert">{errorMessage}</div>}
          {status === "complete" && <div className="packet-status is-complete">Your packet was generated and downloaded. Complete and review the official form before submission.</div>}

          <div className="packet-builder-actions">
            <button className="btn btn-gold" type="submit" disabled={status === "generating"}>
              {status === "generating" ? "Generating PDF..." : `Download ${selectedForm.formNumber} Packet`}
            </button>
            <small>Applicant information is used to generate this download and is not retained by this page.</small>
          </div>
        </form>
      )}
    </section>
  );
}
