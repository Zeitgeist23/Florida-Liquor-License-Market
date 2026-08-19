"use client";

import { useEffect } from "react";

const menuItems = [
  { label: "Florida Liquor License Types", href: "/resources/florida-liquor-license-types", kind: "text" },
  { label: "4COP Quota License", subtitle: "Bars, lounges, nightclubs & full-liquor restaurants", href: "/florida-4cop-liquor-license-for-sale", image: "/assets/license-types-4cop.svg" },
  { label: "3PS Quota / Package Store", subtitle: "Liquor stores & sealed package sales", href: "/florida-3ps-liquor-license-for-sale", image: "/assets/license-types-3ps.svg" },
  { label: "2COP Beer & Wine", subtitle: "Restaurants, cafés & wine bars", href: "/resources/florida-liquor-license-types#common-license-chart", image: "/assets/license-types-2cop.svg" },
  { label: "SRX / 4COP-SFS Restaurant", subtitle: "Qualifying full-service restaurants", href: "/resources/florida-liquor-license-types", image: "/assets/license-types-srx.svg" },
  { label: "Quota License Requirements", href: "/resources/florida-liquor-license-types#population-rule-title", kind: "text" },
];

export default function HomeLicenseTypesDropdown() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".site-header .primary-nav");
    if (!nav || nav.querySelector(":scope > .home-license-types-dropdown")) return;

    const original = Array.from(nav.querySelectorAll<HTMLAnchorElement>(":scope > a"))
      .find((link) => (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase() === "license types");
    if (!original) return;

    const wrapper = document.createElement("div");
    wrapper.className = "home-license-types-dropdown";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "home-license-types-trigger";
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", "License Types menu");

    const label = document.createElement("span");
    label.textContent = "License Types";
    const chevron = document.createElement("img");
    chevron.className = "nav-chevron";
    chevron.src = "/assets/nav-chevron.png";
    chevron.alt = "";
    chevron.setAttribute("aria-hidden", "true");
    trigger.append(label, chevron);

    const menu = document.createElement("div");
    menu.className = "home-license-types-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", "License Types");

    menuItems.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.setAttribute("role", "menuitem");

      if (item.image) {
        const img = document.createElement("img");
        img.className = "home-license-types-thumb";
        img.src = item.image;
        img.alt = "";
        img.setAttribute("aria-hidden", "true");

        const copy = document.createElement("span");
        copy.className = "home-license-types-copy";
        const title = document.createElement("strong");
        title.textContent = item.label;
        const subtitle = document.createElement("small");
        subtitle.textContent = item.subtitle || "";
        copy.append(title, subtitle);
        link.append(img, copy);
      } else {
        link.className = "home-license-types-text-link";
        link.textContent = item.label;
      }

      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      });
      menu.appendChild(link);
    });

    function setOpen(open: boolean) {
      menu.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!menu.classList.contains("is-open"));
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setOpen(true);
        menu.querySelector<HTMLAnchorElement>("a")?.focus();
      }
      if (event.key === "Escape") setOpen(false);
    });
    wrapper.addEventListener("pointerenter", () => setOpen(true));
    wrapper.addEventListener("pointerleave", () => {
      if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) setOpen(false);
    });
    wrapper.addEventListener("focusout", (event) => {
      const next = event.relatedTarget;
      if (next instanceof Node && wrapper.contains(next)) return;
      setOpen(false);
    });

    const outsideClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Node && !wrapper.contains(target)) setOpen(false);
    };
    document.addEventListener("click", outsideClick);

    wrapper.append(trigger, menu);
    original.style.display = "none";
    nav.insertBefore(wrapper, original);

    return () => {
      document.removeEventListener("click", outsideClick);
      original.style.display = "";
      wrapper.remove();
    };
  }, []);

  return (
    <style>{`
      .home-license-types-dropdown{position:relative;display:inline-flex;align-items:center;flex:0 0 auto}
      .home-license-types-trigger{display:inline-flex;align-items:center;gap:5px;margin:0;padding:0;border:0;color:#fff;background:transparent;cursor:pointer;font:inherit;font-size:10px;font-weight:600;line-height:1;text-transform:uppercase;white-space:nowrap}
      .home-license-types-trigger:hover,.home-license-types-trigger:focus-visible{color:var(--gold);outline:none}
      .home-license-types-menu{position:absolute;top:calc(100% + 10px);left:50%;z-index:10060;display:none;width:440px;transform:translateX(-50%);padding:8px;border:1px solid #f6a700;border-radius:8px;background:#061728;box-shadow:0 18px 48px rgba(0,0,0,.48),0 0 0 1px rgba(246,167,0,.12)}
      .home-license-types-menu.is-open,.home-license-types-dropdown:hover .home-license-types-menu,.home-license-types-dropdown:focus-within .home-license-types-menu{display:grid;gap:6px}
      .home-license-types-menu::before{content:"";position:absolute;top:-7px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border-left:1px solid #f6a700;border-top:1px solid #f6a700;background:#061728}
      .primary-nav .home-license-types-menu a{position:relative;z-index:1;display:flex;align-items:center;gap:12px;width:100%;padding:8px;border-radius:6px;color:#fff;text-decoration:none;text-transform:none;white-space:normal;font:700 13px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.01em}
      .primary-nav .home-license-types-menu a.home-license-types-text-link{padding:12px 13px}
      .primary-nav .home-license-types-menu a:hover,.primary-nav .home-license-types-menu a:focus-visible{background:#f6a700;color:#061728;outline:none}
      .home-license-types-thumb{width:92px;height:66px;object-fit:cover;flex:0 0 auto;border-radius:5px;border:1px solid rgba(246,167,0,.35);box-shadow:0 4px 10px rgba(0,0,0,.22)}
      .home-license-types-copy{display:flex;flex-direction:column;gap:4px;min-width:0}
      .home-license-types-copy strong{font-size:14px;line-height:1.2}
      .home-license-types-copy small{font-size:11px;line-height:1.35;font-weight:600;color:#c8d3dc}
      .primary-nav .home-license-types-menu a:hover small,.primary-nav .home-license-types-menu a:focus-visible small{color:#173047}
      @media(max-width:760px){.home-license-types-dropdown{width:100%;justify-content:center}.home-license-types-menu{position:fixed;top:72px;left:12px;width:calc(100vw - 24px);max-height:72vh;transform:none;overflow:auto}.home-license-types-thumb{width:78px;height:58px}}
    `}</style>
  );
}
