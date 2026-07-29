"use client";

import { useEffect } from "react";

type DropdownConfig = {
  matches: string[];
  title: string;
  yesLabel: string;
  ariaLabel: string;
};

type EnhancedField = {
  label: HTMLLabelElement;
  wrapper: HTMLDivElement;
  select: HTMLSelectElement;
  checkbox: HTMLInputElement;
  sync: () => void;
};

const DROPDOWN_CONFIGS: DropdownConfig[] = [
  {
    matches: ["increase in series"],
    title: "Increase in Series",
    yesLabel: "Yes — Increase the license series",
    ariaLabel: "Increase in Series",
  },
  {
    matches: [
      "change of officer stockholder amended corporate name",
      "change of officer stockholder member amended corporate name",
      "change officer stockholder amended corporate name",
    ],
    title: "Change of Officer, Stockholder, Member, or Corporate Name",
    yesLabel: "Yes — Change officer, stockholder, member, or corporate name",
    ariaLabel: "Change of Officer, Stockholder, Member, or Corporate Name",
  },
];

function normalizedText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getDropdownConfig(labelText: string) {
  const normalized = normalizedText(labelText);
  return DROPDOWN_CONFIGS.find((config) => config.matches.includes(normalized)) || null;
}

export default function AbtIncreaseInSeriesSelect() {
  useEffect(() => {
    const enhanced = new Map<HTMLInputElement, EnhancedField>();

    function removeDisconnectedFields() {
      enhanced.forEach((field, checkbox) => {
        if (checkbox.isConnected && field.label.isConnected) return;
        field.wrapper.remove();
        enhanced.delete(checkbox);
      });
    }

    function enhanceFields() {
      removeDisconnectedFields();

      document.querySelectorAll<HTMLLabelElement>("label.abt-checkbox-field").forEach((label) => {
        const strong = label.querySelector("strong");
        const config = getDropdownConfig(strong?.textContent || "");
        if (!config) return;

        const checkbox = label.querySelector<HTMLInputElement>('input[type="checkbox"]');
        if (!checkbox) return;

        const existing = enhanced.get(checkbox);
        if (existing) {
          existing.sync();
          return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "abt-field abt-checkbox-select";
        wrapper.dataset.abtCheckboxSelect = "true";

        const heading = document.createElement("span");
        const title = document.createElement("strong");
        title.textContent = config.title;
        heading.appendChild(title);

        const select = document.createElement("select");
        select.setAttribute("aria-label", config.ariaLabel);

        const noOption = document.createElement("option");
        noOption.value = "no";
        noOption.textContent = "No";

        const yesOption = document.createElement("option");
        yesOption.value = "yes";
        yesOption.textContent = config.yesLabel;

        select.append(noOption, yesOption);

        const sync = () => {
          select.value = checkbox.checked ? "yes" : "no";
        };

        select.addEventListener("change", () => {
          const shouldBeChecked = select.value === "yes";
          if (checkbox.checked !== shouldBeChecked) checkbox.click();
          window.requestAnimationFrame(sync);
        });
        checkbox.addEventListener("change", sync);

        wrapper.append(heading, select);
        label.style.display = "none";
        label.insertAdjacentElement("afterend", wrapper);
        enhanced.set(checkbox, { label, wrapper, select, checkbox, sync });
        sync();
      });
    }

    enhanceFields();
    const observer = new MutationObserver(enhanceFields);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      enhanced.forEach((field) => {
        field.checkbox.removeEventListener("change", field.sync);
        field.label.style.removeProperty("display");
        field.wrapper.remove();
      });
      enhanced.clear();
    };
  }, []);

  return null;
}
