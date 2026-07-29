"use client";

import { useEffect } from "react";

type DemographicConfig = {
  label: string;
  options: string[];
};

type EnhancedDemographicField = {
  label: HTMLLabelElement;
  wrapper: HTMLDivElement;
  select: HTMLSelectElement;
  input: HTMLInputElement;
  sync: () => void;
  handleSelectChange: () => void;
  handleInputChange: () => void;
};

const DEMOGRAPHIC_FIELDS: Record<string, DemographicConfig> = {
  race: {
    label: "Race",
    options: [
      "American Indian or Alaska Native",
      "Asian",
      "Black or African American",
      "Hispanic or Latino",
      "Native Hawaiian or Other Pacific Islander",
      "White",
      "Other",
      "Unknown / Not specified",
    ],
  },
  "eye color": {
    label: "Eye Color",
    options: [
      "Black",
      "Blue",
      "Brown",
      "Gray",
      "Green",
      "Hazel",
      "Maroon",
      "Multicolored",
      "Pink",
      "Unknown / Not specified",
    ],
  },
  "hair color": {
    label: "Hair Color",
    options: [
      "Bald",
      "Black",
      "Blond / Blonde",
      "Brown",
      "Gray",
      "Red / Auburn",
      "Sandy",
      "White",
      "Other",
      "Unknown / Not specified",
    ],
  },
};

function normalizedText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isAbt6002Workspace() {
  return window.location.pathname.toLowerCase().includes("/resources/forms/abt-6002");
}

function setReactInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  if (setter) setter.call(input, value);
  else input.value = value;

  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function addOption(select: HTMLSelectElement, value: string, label: string) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  select.appendChild(option);
}

function ensureCurrentOption(select: HTMLSelectElement, value: string) {
  if (!value || Array.from(select.options).some((option) => option.value === value)) return;
  addOption(select, value, `${value} — Current saved value`);
}

function createSelectWrapper(config: DemographicConfig) {
  const wrapper = document.createElement("div");
  wrapper.className = "abt-field abt-checkbox-select";
  wrapper.dataset.abtDemographicSelect = "true";

  const heading = document.createElement("span");
  const title = document.createElement("strong");
  title.textContent = config.label;
  heading.appendChild(title);

  const select = document.createElement("select");
  select.setAttribute("aria-label", config.label);
  addOption(select, "", `Select ${config.label.toLowerCase()}`);
  config.options.forEach((option) => addOption(select, option, option));

  wrapper.append(heading, select);
  return { wrapper, select };
}

export default function AbtDemographicSelects() {
  useEffect(() => {
    if (!isAbt6002Workspace()) return;

    const enhancedFields = new Map<HTMLInputElement, EnhancedDemographicField>();

    function removeDisconnectedFields() {
      enhancedFields.forEach((field, input) => {
        if (input.isConnected && field.label.isConnected) return;
        field.wrapper.remove();
        enhancedFields.delete(input);
      });
    }

    function enhanceFields() {
      removeDisconnectedFields();

      document.querySelectorAll<HTMLLabelElement>("label.abt-field:not(.abt-checkbox-field)").forEach((label) => {
        const strong = label.querySelector("strong");
        const normalized = normalizedText(strong?.textContent || "");
        const config = DEMOGRAPHIC_FIELDS[normalized];
        if (!config) return;

        const input = label.querySelector<HTMLInputElement>('input:not([type="checkbox"])');
        if (!input) return;

        const existing = enhancedFields.get(input);
        if (existing) {
          existing.sync();
          return;
        }

        const { wrapper, select } = createSelectWrapper(config);

        const sync = () => {
          ensureCurrentOption(select, input.value);
          select.value = input.value;
        };

        const handleSelectChange = () => {
          setReactInputValue(input, select.value);
          window.requestAnimationFrame(sync);
        };

        const handleInputChange = sync;
        select.addEventListener("change", handleSelectChange);
        input.addEventListener("input", handleInputChange);
        input.addEventListener("change", handleInputChange);

        label.style.display = "none";
        label.insertAdjacentElement("afterend", wrapper);
        enhancedFields.set(input, {
          label,
          wrapper,
          select,
          input,
          sync,
          handleSelectChange,
          handleInputChange,
        });
        sync();
      });
    }

    enhanceFields();
    const observer = new MutationObserver(enhanceFields);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      enhancedFields.forEach((field) => {
        field.select.removeEventListener("change", field.handleSelectChange);
        field.input.removeEventListener("input", field.handleInputChange);
        field.input.removeEventListener("change", field.handleInputChange);
        field.label.style.removeProperty("display");
        field.wrapper.remove();
      });
      enhancedFields.clear();
    };
  }, []);

  return null;
}
