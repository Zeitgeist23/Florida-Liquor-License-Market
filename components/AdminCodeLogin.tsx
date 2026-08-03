"use client";

import { useState } from "react";

import styles from "./AdminCodeLogin.module.css";

export default function AdminCodeLogin({ title, onAuthenticated }: { title: string; onAuthenticated: () => Promise<void> }) {
  const [ownerCode, setOwnerCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: ownerCode }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "The owner access code could not be verified.");
      setOwnerCode("");
      await onAuthenticated();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The owner access code could not be verified.");
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
      <p className={styles.description}>Enter your private FLLM owner access code.</p>

      <form className={styles.form} onSubmit={signIn}>
        <label htmlFor="fllm-owner-code">Owner access code</label>
        <input
          id="fllm-owner-code"
          type="password"
          autoComplete="current-password"
          value={ownerCode}
          onChange={(event) => setOwnerCode(event.target.value)}
          autoFocus
          required
        />
        <button className={styles.primary} disabled={loading || !ownerCode.trim()}>
          {loading ? "Signing In…" : "Sign In"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
}
