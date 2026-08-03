"use client";

import { useState } from "react";

import styles from "./AdminCodeLogin.module.css";

export default function AdminCodeLogin({ title, onAuthenticated }: { title: string; onAuthenticated: () => Promise<void> }) {
  const [codeRequested, setCodeRequested] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function requestCode() {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request_code" }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not send the sign-in code.");
      setCodeRequested(true);
      setNotice("A six-digit code was sent to the FLLM corporate inbox. It expires in 10 minutes.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send the sign-in code.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "The code could not be verified.");
      setCode("");
      await onAuthenticated();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The code could not be verified.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.panel}>
      <div className={styles.brand} aria-label="Florida Liquor License Market">
        <img className={styles.mark} src="/api/email-logo" alt="Florida Liquor License Market seal" />
        <div className={styles.brandName}>
          <strong>Florida Liquor License</strong>
          <span>Market</span>
        </div>
      </div>
      <p className={styles.eyebrow}>Secure owner access</p>
      <h1>{title}</h1>
      <p className={styles.description}>
        {codeRequested
          ? "Enter the code from the FLLM corporate email account."
          : "We’ll email a temporary sign-in code to the FLLM corporate account. No administrator key is needed."}
      </p>

      {codeRequested ? (
        <form className={styles.form} onSubmit={verifyCode}>
          <label htmlFor="fllm-admin-code">Six-digit sign-in code</label>
          <input id="fllm-admin-code" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} autoFocus required />
          <button className={styles.primary} disabled={loading || code.length !== 6}>{loading ? "Verifying…" : "Verify & Open"}</button>
          <button className={styles.secondary} type="button" onClick={requestCode} disabled={loading}>Send a new code</button>
        </form>
      ) : (
        <div className={styles.form}>
          <button className={styles.primary} type="button" onClick={requestCode} disabled={loading}>{loading ? "Sending…" : "Email My Sign-In Code"}</button>
        </div>
      )}

      {notice && <p className={styles.notice}>{notice}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
}
