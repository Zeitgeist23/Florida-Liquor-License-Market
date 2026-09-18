"use client";

import { useEffect, useState } from "react";

export function FeaturedBrokerBusinessInteractions({
  listingReference,
}: {
  listingReference: string;
}) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(
      `.results-page[data-featured-broker-listing="${listingReference}"][data-featured-broker-business-listing="true"]`,
    );
    const glimmerLinks = root
      ? Array.from(
          root.querySelectorAll<HTMLElement>(
            ".featured-business-disclosure-link, .featured-business-glimmer-link",
          ),
        )
      : [];

    if (glimmerLinks.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          (entry.target as HTMLElement).classList.toggle(
            "is-visible",
            entry.isIntersecting,
          );
        });
      },
      { threshold: 0.35 },
    );

    glimmerLinks.forEach((link) => observer.observe(link));
    return () => observer.disconnect();
  }, [listingReference]);

  return null;
}

export function FeaturedBrokerEmailCopyButton({
  email,
}: {
  email: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      setState("copied");
      window.setTimeout(() => setState("idle"), 1400);
    } catch {
      setState("error");
      window.setTimeout(() => setState("idle"), 1400);
    }
  }

  return (
    <button
      type="button"
      className="featured-business-copy-email-button"
      onClick={copyEmail}
      title={state === "copied" ? "Copied" : state === "error" ? "Copy failed" : "Copy broker email"}
      aria-label={`Copy broker email address ${email}`}
    >
      {state === "copied" ? "✓" : state === "error" ? "!" : "⧉"}
    </button>
  );
}
