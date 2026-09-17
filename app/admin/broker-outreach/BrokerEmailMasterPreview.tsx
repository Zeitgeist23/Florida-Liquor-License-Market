"use client";

import { useEffect, useMemo, useState } from "react";

type Mode = "female" | "male" | "neutral";

type Preview = {
  subject: string;
  html: string;
  text: string;
};

type Payload = {
  template_previews?: Partial<Record<Mode, Preview>>;
};

const labels: Record<Mode, string> = {
  female: "Female / Emma Brooks",
  male: "Male / Alex Morgan",
  neutral: "Neutral",
};

export default function BrokerEmailMasterPreview() {
  const [previews, setPreviews] = useState<Partial<Record<Mode, Preview>>>({});
  const [mode, setMode] = useState<Mode>("female");
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function load() {
      try {
        const response = await fetch("/api/admin/broker-outreach", { cache: "no-store" });
        if (cancelled) return;
        if (response.status === 401) {
          timer = setTimeout(load, 1500);
          return;
        }
        if (!response.ok) return;
        const payload = (await response.json()) as Payload;
        const incoming = payload.template_previews || {};
        setPreviews(incoming);
        setReady(Boolean(incoming.female || incoming.male || incoming.neutral));
        if (incoming.female || incoming.male || incoming.neutral) setOpen(true);
      } catch {
        if (!cancelled) timer = setTimeout(load, 2000);
      }
    }

    void load();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const preview = useMemo(
    () => previews[mode] || previews.female || previews.male || previews.neutral || null,
    [mode, previews],
  );

  if (!ready || !preview) return null;

  const sampleUrl = mode === "male"
    ? "/brokers/sample-featured-listing-male"
    : "/brokers/sample-featured-listing";

  return (
    <>
      <button
        type="button"
        className="broker-email-preview-launch"
        onClick={() => setOpen(true)}
      >
        ✉ VIEW BROKER EMAIL
      </button>

      {open && (
        <div className="broker-email-preview-backdrop" role="dialog" aria-modal="true" aria-label="Broker outreach email template preview">
          <div className="broker-email-preview-modal">
            <header className="broker-email-preview-toolbar">
              <div>
                <span>MASTER OUTREACH EMAIL</span>
                <h2>Broker Campaign Email Preview</h2>
                <p>This is the email brokers will receive. Weekly campaign drafts personalize this master template to each broker and listing.</p>
              </div>
              <button type="button" className="broker-email-preview-close" onClick={() => setOpen(false)} aria-label="Close email preview">×</button>
            </header>

            <div className="broker-email-preview-tabs" role="tablist" aria-label="Email presentation">
              {(["female", "male", "neutral"] as Mode[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  className={mode === item ? "active" : ""}
                  onClick={() => setMode(item)}
                >
                  {labels[item]}
                </button>
              ))}
            </div>

            <div className="broker-email-preview-meta">
              <div><span>Presentation</span><strong>{labels[mode]}</strong></div>
              <div><span>Subject</span><strong>{preview.subject}</strong></div>
              <div className="broker-email-preview-links">
                <a href={sampleUrl} target="_blank" rel="noreferrer">Open Featured Listing Sample</a>
                <a href="/brokers/list-your-license" target="_blank" rel="noreferrer">Open Broker Listing Page</a>
              </div>
            </div>

            <iframe
              className="broker-email-master-iframe"
              title={`${labels[mode]} broker outreach email`}
              srcDoc={preview.html}
            />
          </div>
        </div>
      )}
    </>
  );
}
