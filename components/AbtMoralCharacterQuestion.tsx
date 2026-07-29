"use client";

import { useEffect } from "react";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function setReactInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  if (setter) setter.call(input, value);
  else input.value = value;

  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function createMoralCharacterRadios() {
  const wrapper = document.createElement("div");
  wrapper.className = "abt-field abt-yes-no-question";
  wrapper.dataset.abtMoralCharacterQuestion = "true";
  wrapper.setAttribute("role", "group");
  wrapper.setAttribute("aria-label", "Do you meet the standards of the moral character rule?");
  wrapper.style.gridColumn = "1 / -1";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.gap = "16px";

  const heading = document.createElement("strong");
  heading.textContent = "Do You Meet the Standards of the Moral Character Rule?";

  const choices = document.createElement("div");
  choices.style.display = "flex";
  choices.style.alignItems = "center";
  choices.style.gap = "32px";
  choices.style.flexWrap = "wrap";

  const groupName = "abt-6002-moral-character";

  const yesLabel = document.createElement("label");
  yesLabel.style.display = "inline-flex";
  yesLabel.style.alignItems = "center";
  yesLabel.style.gap = "9px";
  yesLabel.style.cursor = "pointer";
  const yesRadio = document.createElement("input");
  yesRadio.type = "radio";
  yesRadio.name = groupName;
  yesRadio.value = "yes";
  yesRadio.setAttribute("aria-label", "Yes");
  const yesText = document.createElement("strong");
  yesText.textContent = "Yes";
  yesLabel.append(yesRadio, yesText);

  const noLabel = document.createElement("label");
  noLabel.style.display = "inline-flex";
  noLabel.style.alignItems = "center";
  noLabel.style.gap = "9px";
  noLabel.style.cursor = "pointer";
  const noRadio = document.createElement("input");
  noRadio.type = "radio";
  noRadio.name = groupName;
  noRadio.value = "no";
  noRadio.setAttribute("aria-label", "No");
  const noText = document.createElement("strong");
  noText.textContent = "No";
  noLabel.append(noRadio, noText);

  choices.append(yesLabel, noLabel);
  wrapper.append(heading, choices);

  return { wrapper, yesRadio, noRadio };
}

export default function AbtMoralCharacterQuestion() {
  useEffect(() => {
    if (!window.location.pathname.toLowerCase().includes("/resources/forms/abt-6002")) return;

    let cleanupCurrent: (() => void) | null = null;

    function enhance() {
      if (document.querySelector("[data-abt-moral-character-question='true']")) return;

      const labels = Array.from(
        document.querySelectorAll<HTMLLabelElement>("label.abt-field:not(.abt-checkbox-field)")
      );
      const moralIndex = labels.findIndex((label) =>
        normalize(label.querySelector("strong")?.textContent || "").startsWith(
          "do you meet the standards of the moral character rule"
        )
      );
      if (moralIndex < 0) return;

      const moralLabel = labels[moralIndex];
      const yesInput = moralLabel.querySelector<HTMLInputElement>('input:not([type="checkbox"])');
      if (!yesInput) return;

      const noLabel = labels.slice(moralIndex + 1).find((label) => {
        const title = normalize(label.querySelector("strong")?.textContent || "");
        return title === "no" && Boolean(label.querySelector('input:not([type="checkbox"])'));
      }) || null;
      const noInput = noLabel?.querySelector<HTMLInputElement>('input:not([type="checkbox"])') || null;

      const { wrapper, yesRadio, noRadio } = createMoralCharacterRadios();

      const sync = () => {
        const yesValue = normalize(yesInput.value);
        const noValue = normalize(noInput?.value || "");
        yesRadio.checked = yesValue === "yes" || yesValue === "y" || yesValue === "true";
        noRadio.checked = noValue === "no" || noValue === "n" || noValue === "true" || yesValue === "no";
      };

      const handleChange = () => {
        if (yesRadio.checked) {
          setReactInputValue(yesInput, "Yes");
          if (noInput) setReactInputValue(noInput, "");
        } else if (noRadio.checked) {
          setReactInputValue(yesInput, "");
          if (noInput) setReactInputValue(noInput, "No");
          else setReactInputValue(yesInput, "No");
        }
        window.requestAnimationFrame(sync);
      };

      yesRadio.addEventListener("change", handleChange);
      noRadio.addEventListener("change", handleChange);
      yesInput.addEventListener("input", sync);
      yesInput.addEventListener("change", sync);
      noInput?.addEventListener("input", sync);
      noInput?.addEventListener("change", sync);

      moralLabel.style.display = "none";
      if (noLabel) noLabel.style.display = "none";
      moralLabel.insertAdjacentElement("afterend", wrapper);
      sync();

      cleanupCurrent = () => {
        yesRadio.removeEventListener("change", handleChange);
        noRadio.removeEventListener("change", handleChange);
        yesInput.removeEventListener("input", sync);
        yesInput.removeEventListener("change", sync);
        noInput?.removeEventListener("input", sync);
        noInput?.removeEventListener("change", sync);
        moralLabel.style.removeProperty("display");
        noLabel?.style.removeProperty("display");
        wrapper.remove();
      };
    }

    enhance();
    const observer = new MutationObserver(() => {
      if (cleanupCurrent && !document.querySelector("[data-abt-moral-character-question='true']")) {
        cleanupCurrent();
        cleanupCurrent = null;
      }
      enhance();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanupCurrent?.();
    };
  }, []);

  return null;
}
