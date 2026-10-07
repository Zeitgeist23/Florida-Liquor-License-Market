"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./BusinessBuyerInterestButton.module.css";

type Props = {
  listingReference: string;
  listingTitle: string;
  county: string;
  businessType: string;
  licenseType: "4COP Quota" | "3PS Quota / Package Store" | "4COP SFS/SRX" | "2COP Beer & Wine";
  askingPrice: string;
};

type SubmitState = "idle" | "submitting" | "sent" | "error";

function phoneFormat(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function BusinessBuyerInterestButton({
  listingReference,
  listingTitle,
  county,
  businessType,
  licenseType,
  askingPrice,
}: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/business-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(form.get("firstName") || "").trim(),
          lastName: String(form.get("lastName") || "").trim(),
          email: String(form.get("email") || "").trim(),
          phone,
          businessTypes: [businessType],
          licenseTypes: [licenseType],
          counties: [county],
          maxPurchasePrice: String(form.get("maxPurchasePrice") || "").trim(),
          financingPreferences: ["Any"],
          notes: `Specific buyer interest from inventory card. Listing: ${listingReference}. ${listingTitle}. Asking price: ${askingPrice}.`,
          consent: Boolean(form.get("consent")),
          sourceMarketViewRef: listingReference,
          sourceMarketViewUrl: window.location.href,
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Unable to submit buyer interest.");
      setStatus("sent");
    } catch (cause) {
      setStatus("error");
      setError(cause instanceof Error ? cause.message : "Unable to submit buyer interest.");
    }
  }

  return (
    <>
      <button
        className={styles.trigger}
        type="button"
        onClick={() => {
          setStatus("idle");
          setError("");
          setOpen(true);
        }}
      >
        I&apos;m Interested
      </button>

      {open ? (
        <div
          className={styles.backdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Buyer interest form">
            <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Close">×</button>
            {status === "sent" ? (
              <div className={styles.success}>
                <span>FLLM Buyer Interest</span>
                <h2>Your interest has been recorded.</h2>
                <p>FLLM now has your contact information and the specific opportunity you selected. We can also alert you to similar opportunities.</p>
                <button type="button" onClick={() => setOpen(false)}>Close</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <span className={styles.eyebrow}>FLLM Buyer Interest</span>
                <h2>{businessType} · {county}</h2>
                <p className={styles.context}>{licenseType} · {askingPrice}<br />Reference {listingReference}</p>

                <div className={styles.grid}>
                  <label><span>First name</span><input name="firstName" required /></label>
                  <label><span>Last name</span><input name="lastName" required /></label>
                  <label><span>Email</span><input name="email" type="email" required /></label>
                  <label><span>Phone</span><input name="phone" type="tel" value={phone} onChange={(e) => setPhone(phoneFormat(e.target.value))} required /></label>
                  <label className={styles.full}><span>Maximum purchase price <small>(optional)</small></span><input name="maxPurchasePrice" inputMode="numeric" placeholder="$" /></label>
                </div>

                <label className={styles.consent}>
                  <input name="consent" type="checkbox" required />
                  <span>Send me information about this opportunity and alerts for similar FLLM business + liquor-license opportunities.</span>
                </label>

                {status === "error" ? <p className={styles.error}>{error}</p> : null}

                <button className={styles.submit} type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting…" : "Send Buyer Interest"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
