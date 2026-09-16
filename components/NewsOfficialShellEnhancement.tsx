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

    // Keep the news-header-wrap class intact. The News page now uses that class
    // to apply the locked official FLLM header geometry on first paint and after
    // React hydration, preventing the menu from flickering back to the legacy look.
    const primaryAction = headerWrap.querySelector<HTMLAnchorElement>(".fllm-header-list-cta");
    if (primaryAction) {
      primaryAction.textContent = "List Your License";
      primaryAction.href = "/sell-your-license";
    }
  }, [pathname]);

  return null;
}
