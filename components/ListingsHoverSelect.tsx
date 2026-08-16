"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import styles from "./ListingsHoverSelect.module.css";

export type ListingsHoverSelectOption = {
  value: string;
  label: string;
};

type ListingsHoverSelectProps = {
  ariaLabel: string;
  value: string;
  options: readonly ListingsHoverSelectOption[];
  onChange: (value: string) => void;
};

const OPEN_DELAY_MS = 140;
const CLOSE_DELAY_MS = 240;
const DESKTOP_MIN_WIDTH = 821;
const OPEN_EVENT = "fllm:listings-filter-open";

export default function ListingsHoverSelect({
  ariaLabel,
  value,
  options,
  onChange,
}: ListingsHoverSelectProps) {
  const reactId = useId().replace(/:/g, "");
  const instanceId = `fllm-filter-${reactId}`;
  const listboxId = `${instanceId}-listbox`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const typeaheadTimerRef = useRef<number | null>(null);
  const typeaheadBufferRef = useRef("");
  const [open, setOpen] = useState(false);

  const selectedIndex = useMemo(() => {
    const index = options.findIndex((option) => option.value === value);
    return index >= 0 ? index : 0;
  }, [options, value]);

  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const selectedOption = options[selectedIndex] ?? options[0];

  const clearOpenTimer = () => {
    if (openTimerRef.current !== null) window.clearTimeout(openTimerRef.current);
    openTimerRef.current = null;
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const clearTypeaheadTimer = () => {
    if (typeaheadTimerRef.current !== null) window.clearTimeout(typeaheadTimerRef.current);
    typeaheadTimerRef.current = null;
  };

  const openMenu = (nextIndex = selectedIndex) => {
    clearOpenTimer();
    clearCloseTimer();
    document.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: instanceId }));
    setActiveIndex(nextIndex);
    setOpen(true);
  };

  const closeMenu = (restoreFocus = false) => {
    clearOpenTimer();
    clearCloseTimer();
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const scheduleOpen = () => {
    clearCloseTimer();
    clearOpenTimer();
    openTimerRef.current = window.setTimeout(() => openMenu(), OPEN_DELAY_MS);
  };

  const scheduleClose = () => {
    clearOpenTimer();
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => closeMenu(), CLOSE_DELAY_MS);
  };

  const selectIndex = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setActiveIndex(index);
    closeMenu(true);
  };

  const moveActive = (direction: 1 | -1) => {
    setActiveIndex((current) => {
      const next = (current + direction + options.length) % options.length;
      return next;
    });
  };

  useEffect(() => {
    setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, open]);

  useEffect(() => {
    const handleOtherMenuOpen = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail !== instanceId) closeMenu();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !rootRef.current?.contains(target)) closeMenu();
    };

    document.addEventListener(OPEN_EVENT, handleOtherMenuOpen);
    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener(OPEN_EVENT, handleOtherMenuOpen);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      clearOpenTimer();
      clearCloseTimer();
      clearTypeaheadTimer();
    };
  }, [instanceId]);

  const handleTypeahead = (key: string) => {
    typeaheadBufferRef.current += key.toLowerCase();
    clearTypeaheadTimer();
    typeaheadTimerRef.current = window.setTimeout(() => {
      typeaheadBufferRef.current = "";
    }, 700);

    const matchIndex = options.findIndex((option) =>
      option.label.toLowerCase().startsWith(typeaheadBufferRef.current),
    );
    if (matchIndex >= 0) {
      if (!open) openMenu(matchIndex);
      else setActiveIndex(matchIndex);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${open ? styles.rootOpen : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch" && window.innerWidth >= DESKTOP_MIN_WIDTH) scheduleOpen();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch" && window.innerWidth >= DESKTOP_MIN_WIDTH) scheduleClose();
      }}
      onFocusCapture={() => clearCloseTimer()}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !rootRef.current?.contains(next)) scheduleClose();
      }}
    >
      <select
        className={styles.nativeSelect}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-hidden="true"
        tabIndex={-1}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <button
        ref={buttonRef}
        className={styles.trigger}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open ? `${instanceId}-option-${activeIndex}` : undefined}
        onClick={() => {
          if (open) closeMenu();
          else openMenu();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            if (!open) openMenu(selectedIndex);
            else moveActive(1);
            return;
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            if (!open) openMenu(selectedIndex);
            else moveActive(-1);
            return;
          }

          if (event.key === "Home") {
            event.preventDefault();
            if (!open) openMenu(0);
            else setActiveIndex(0);
            return;
          }

          if (event.key === "End") {
            event.preventDefault();
            if (!open) openMenu(options.length - 1);
            else setActiveIndex(options.length - 1);
            return;
          }

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (open) selectIndex(activeIndex);
            else openMenu();
            return;
          }

          if (event.key === "Escape" && open) {
            event.preventDefault();
            closeMenu(true);
            return;
          }

          if (event.key.length === 1 && /\S/.test(event.key)) handleTypeahead(event.key);
        }}
      >
        <span>{selectedOption?.label ?? "Select"}</span>
        <i className={styles.chevron} aria-hidden="true" />
      </button>

      <div
        id={listboxId}
        className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
        role="listbox"
        aria-label={ariaLabel}
        aria-hidden={!open}
      >
        {options.map((option, index) => {
          const selected = option.value === value;
          const active = index === activeIndex;
          return (
            <button
              ref={(element) => { optionRefs.current[index] = element; }}
              id={`${instanceId}-option-${index}`}
              className={`${styles.option} ${active ? styles.optionActive : ""} ${selected ? styles.optionSelected : ""}`}
              key={option.value}
              type="button"
              role="option"
              aria-selected={selected}
              tabIndex={-1}
              onPointerEnter={() => setActiveIndex(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => selectIndex(index)}
            >
              <span>{option.label}</span>
              {selected ? <b aria-hidden="true">✓</b> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
