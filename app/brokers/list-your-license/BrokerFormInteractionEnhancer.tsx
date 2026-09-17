"use client";

import { useEffect } from "react";

export default function BrokerFormInteractionEnhancer() {
  useEffect(() => {
    const selects = Array.from(
      document.querySelectorAll<HTMLSelectElement>(
        'select[name="county"], select[name="license_type"]',
      ),
    );

    function openPicker(event: Event) {
      const select = event.currentTarget as HTMLSelectElement & {
        showPicker?: () => void;
      };

      try {
        select.focus({ preventScroll: true });
        select.showPicker?.();
      } catch {
        // Browsers without select.showPicker() still retain normal click behavior.
      }
    }

    selects.forEach((select) => select.addEventListener("mouseenter", openPicker));

    return () => {
      selects.forEach((select) => select.removeEventListener("mouseenter", openPicker));
    };
  }, []);

  return null;
}
