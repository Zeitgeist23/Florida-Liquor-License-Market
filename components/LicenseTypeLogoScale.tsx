"use client";

import { usePathname } from "next/navigation";

const licenseTypePaths = new Set([
  "/resources/florida-liquor-license-types",
  "/resources/florida-liquor-license-system",
  "/license-types/4cop-quota",
  "/license-types/3ps-package-store",
  "/license-types/2cop-beer-wine",
  "/license-types/4cop-sfs-restaurant",
]);

export default function LicenseTypeLogoScale() {
  const pathname = usePathname();
  if (!licenseTypePaths.has(pathname)) return null;

  return (
    <style>{`
      .forms-site-header .brand-lockup {
        flex: 0 0 183.92px !important;
      }

      .forms-site-header .brand-lockup img {
        width: 165.44px !important;
        height: 66.88px !important;
      }

      .license-explainer-page .lt-brand img {
        width: 184.8px !important;
        height: auto !important;
      }
    `}</style>
  );
}
