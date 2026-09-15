"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NewsOfficialShellEnhancement() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/florida-liquor-license-news") return;

    const page = document.querySelector<HTMLElement>(".news-insights-page");
    if (!page) return;

    const headerWrap = page.querySelector<HTMLElement>(":scope > .abt-header-wrap");
    if (!headerWrap) return;

    // Remove the news-only header geometry so this route inherits the locked
    // official FormsSiteHeader presentation used across FLLM.
    headerWrap.classList.remove("news-header-wrap");

    const primaryAction = headerWrap.querySelector<HTMLAnchorElement>(".fllm-header-list-cta");
    if (primaryAction) {
      primaryAction.textContent = "List Your License";
      primaryAction.href = "/sell-your-license";
    }
  }, [pathname]);

  return null;
}
