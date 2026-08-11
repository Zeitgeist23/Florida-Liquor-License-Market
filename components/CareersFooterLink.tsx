"use client";

import { useEffect } from "react";

export default function CareersFooterLink() {
  useEffect(() => {
    const companySections = Array.from(document.querySelectorAll<HTMLElement>("footer .footer-grid > div"));
    const companySection = companySections.find((section) =>
      section.querySelector(":scope > strong")?.textContent?.trim().toLowerCase() === "company"
    );

    if (!companySection || companySection.querySelector('a[href="/careers"]')) return;

    const link = document.createElement("a");
    link.href = "/careers";
    link.textContent = "Careers";
    companySection.appendChild(link);
  }, []);

  return null;
}
