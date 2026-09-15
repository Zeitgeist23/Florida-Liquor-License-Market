"use client";

import { useEffect } from "react";

const OLD_LABEL = "SRX / 4COP-SFS Restaurant";
const NEW_LABEL = "4COP-SFS/SRX Restaurant";

function fixLicenseTypeLabels() {
  const nodes = document.querySelectorAll<HTMLElement>(
    ".native-license-types-menu a, .home-license-types-menu a, .license-types-header-menu a, .live-license-types-menu a",
  );

  nodes.forEach((node) => {
    if ((node.textContent || "").replace(/\s+/g, " ").trim() === OLD_LABEL) {
      node.textContent = NEW_LABEL;
    }
  });
}

export default function LicenseTypesMenuLabelFix() {
  useEffect(() => {
    fixLicenseTypeLabels();

    const observer = new MutationObserver(fixLicenseTypeLabels);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    window.setTimeout(fixLicenseTypeLabels, 100);
    window.setTimeout(fixLicenseTypeLabels, 500);
    window.setTimeout(fixLicenseTypeLabels, 1500);

    return () => observer.disconnect();
  }, []);

  return null;
}
