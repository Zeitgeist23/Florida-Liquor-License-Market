"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const clusterPaths = new Set([
  "/brokers/list-your-license",
  "/sell-your-license",
  "/florida-liquor-license-broker",
  "/how-to-sell-florida-liquor-license",
  "/florida-liquor-license-appraisal",
  "/financing",
]);

const brokerFaqs = [
  {
    q: "What is a Florida liquor license broker listing service?",
    a: "A broker listing service gives a Florida broker another place to advertise a client’s transferable quota liquor license. On FLLM, the submitting broker remains the identified representative and transaction contact.",
  },
  {
    q: "Where can I list a client liquor license in Florida?",
    a: "Florida brokers can submit eligible 4COP quota and 3PS package-store inventory to the Florida Liquor License Market statewide marketplace for review and publication.",
  },
  {
    q: "Can I use FLLM as a Florida liquor license marketplace for brokers?",
    a: "Yes. FLLM is designed to give brokers statewide marketplace exposure without replacing the broker, taking over the client relationship, or claiming a share of the broker’s commission.",
  },
  {
    q: "Does the broker stay the primary transaction contact?",
    a: "Yes. Approved broker-submitted listings identify the broker or brokerage contact designated for buyer inquiries and transaction communications.",
  },
  {
    q: "Does FLLM charge a recurring fee or commission on broker listings?",
    a: "No. Standard and Featured broker listing charges are one-time submission fees, and FLLM does not take a share of the submitting broker’s commission.",
  },
];

const sellerFaqs = [
  {
    q: "How do I list a Florida liquor license for sale?",
    a: "A Florida liquor-license owner can use FLLM to request broker-assisted representation or choose a self-directed marketplace listing, depending on how much transaction support the seller wants.",
  },
  {
    q: "Can I sell a Florida liquor license online myself?",
    a: "A self-directed seller can advertise an eligible quota liquor license through FLLM and manage buyer communications directly, subject to the applicable transfer, licensing, zoning, and closing requirements.",
  },
  {
    q: "Can I use my own broker and still advertise on FLLM?",
    a: "Yes. A broker can list a client’s license through the FLLM broker marketplace while remaining the listing representative and primary transaction contact.",
  },
  {
    q: "Can I list either a 4COP quota or 3PS package-store license?",
    a: "Yes. FLLM supports eligible 4COP quota and 3PS-family package-store listings, with the county, series, asking price, and status reviewed before publication.",
  },
  {
    q: "Is there a recurring marketplace fee?",
    a: "FLLM listing options use one-time submission fees rather than a recurring marketplace subscription. Any separate broker-assisted representation is governed by its own written agreement.",
  },
];

export default function ListingServiceSeoCluster() {
  const pathname = usePathname();
  const faqSectionRef = useRef<HTMLElement>(null);
  const showCluster = clusterPaths.has(pathname);
  const showBrokerFaqs = pathname === "/brokers/list-your-license";
  const showSellerFaqs = pathname === "/sell-your-license";

  useEffect(() => {
    if (!showBrokerFaqs) return;

    const section = faqSectionRef.current;
    if (!section) return;

    const items = Array.from(section.querySelectorAll<HTMLDetailsElement>("details"));
    if (!items.length) return;

    let animationFrame = 0;
    let hoveredItem: HTMLDetailsElement | null = null;
    let scrollActivated = false;
    let activeIndex = -1;
    let lastAutoChangeAt = 0;

    // Always begin with the broker FAQ cluster fully collapsed, including
    // when the browser restores a previous scroll position after refresh.
    for (const item of items) item.open = false;

    const closeAll = () => {
      for (const item of items) item.open = false;
      activeIndex = -1;
    };

    const openOnly = (target: HTMLDetailsElement) => {
      const index = items.indexOf(target);
      for (const item of items) item.open = item === target;
      if (index >= 0) activeIndex = index;
    };

    const updateOpenQuestion = () => {
      animationFrame = 0;
      if (hoveredItem || !scrollActivated) return;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const sectionRect = section.getBoundingClientRect();

      if (sectionRect.top > viewportHeight * 0.92 || sectionRect.bottom < viewportHeight * 0.08) {
        closeAll();
        return;
      }

      const focusLine = viewportHeight * 0.5;
      let candidateIndex = -1;
      let closestDistance = Number.POSITIVE_INFINITY;

      // Use the summary row rather than the expanded details height. This keeps
      // the activation order stable even while the previous answer is open.
      items.forEach((item, index) => {
        const summary = item.querySelector("summary");
        const rect = summary?.getBoundingClientRect() ?? item.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewportHeight) return;

        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(rowCenter - focusLine);
        if (distance < closestDistance) {
          closestDistance = distance;
          candidateIndex = index;
        }
      });

      if (candidateIndex < 0) return;

      // Never skip over a question. If the geometry moves by more than one item
      // while an answer expands/collapses, advance only one FAQ at a time.
      let nextIndex = candidateIndex;
      if (activeIndex >= 0) {
        if (candidateIndex > activeIndex + 1) nextIndex = activeIndex + 1;
        if (candidateIndex < activeIndex - 1) nextIndex = activeIndex - 1;
      }

      const now = performance.now();
      if (activeIndex >= 0 && nextIndex !== activeIndex && now - lastAutoChangeAt < 220) {
        return;
      }

      if (nextIndex !== activeIndex) {
        openOnly(items[nextIndex]);
        lastAutoChangeAt = now;
      }
    };

    const scheduleUpdate = () => {
      if (!scrollActivated || animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateOpenQuestion);
    };

    const activateScroll = () => {
      scrollActivated = true;
    };

    const activateScrollFromKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        scrollActivated = true;
      }
    };

    const listeners = items.map((item) => {
      const onEnter = () => {
        hoveredItem = item;
        openOnly(item);
      };
      const onLeave = () => {
        if (hoveredItem === item) hoveredItem = null;
        item.open = false;
        scheduleUpdate();
      };
      const onFocusIn = () => {
        hoveredItem = item;
        openOnly(item);
      };
      const onFocusOut = (event: FocusEvent) => {
        const next = event.relatedTarget as Node | null;
        if (!next || !item.contains(next)) {
          if (hoveredItem === item) hoveredItem = null;
          item.open = false;
          scheduleUpdate();
        }
      };

      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);
      item.addEventListener("focusin", onFocusIn);
      item.addEventListener("focusout", onFocusOut);

      return { item, onEnter, onLeave, onFocusIn, onFocusOut };
    });

    window.addEventListener("wheel", activateScroll, { passive: true });
    window.addEventListener("touchmove", activateScroll, { passive: true });
    window.addEventListener("pointerdown", activateScroll, { passive: true });
    window.addEventListener("keydown", activateScrollFromKey);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("wheel", activateScroll);
      window.removeEventListener("touchmove", activateScroll);
      window.removeEventListener("pointerdown", activateScroll);
      window.removeEventListener("keydown", activateScrollFromKey);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      listeners.forEach(({ item, onEnter, onLeave, onFocusIn, onFocusOut }) => {
        item.removeEventListener("mouseenter", onEnter);
        item.removeEventListener("mouseleave", onLeave);
        item.removeEventListener("focusin", onFocusIn);
        item.removeEventListener("focusout", onFocusOut);
      });
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [showBrokerFaqs]);

  if (!showCluster && !showBrokerFaqs && !showSellerFaqs) return null;

  return (
    <>
      <style>{`
        .fllm-listing-service-faq__grid {
          align-items: start;
        }

        .fllm-listing-service-faq__grid details {
          position: relative;
          align-self: start;
          overflow: hidden;
          border: 1px solid #d2d9dd !important;
          border-radius: 12px !important;
          background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.96),
            0 7px 16px rgba(7,24,39,.07),
            0 16px 30px rgba(7,24,39,.07) !important;
          transform: translateY(0) scale(1);
          transition:
            transform .2s ease,
            border-color .2s ease,
            box-shadow .2s ease,
            background .2s ease,
            filter .2s ease;
        }

        .fllm-listing-service-faq__grid details:hover,
        .fllm-listing-service-faq__grid details[open] {
          transform: translateY(-5px) scale(1.008);
          border-color: rgba(232,164,10,.92) !important;
          background:
            radial-gradient(circle at 18% 0%, rgba(71,214,255,.11), transparent 38%),
            radial-gradient(circle at 86% 10%, rgba(246,167,0,.10), transparent 34%),
            linear-gradient(180deg, #ffffff 0%, #fbfdff 100%) !important;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            inset 0 0 24px rgba(72,211,255,.07),
            0 16px 30px rgba(7,24,39,.13),
            0 26px 46px rgba(7,24,39,.11),
            0 0 24px rgba(246,167,0,.14) !important;
          filter: brightness(1.015);
        }

        .fllm-listing-service-faq__grid details summary {
          transition: color .18s ease, text-shadow .18s ease;
        }

        .fllm-listing-service-faq__grid details:hover summary,
        .fllm-listing-service-faq__grid details[open] summary {
          color: #d89200 !important;
          text-shadow: 0 0 12px rgba(246,167,0,.16);
        }

        .fllm-listing-service-faq__grid details p {
          font-size: 18px !important;
          line-height: 1.75 !important;
          color: #415665 !important;
        }

        @media (max-width: 720px) {
          .fllm-listing-service-faq__grid details:hover,
          .fllm-listing-service-faq__grid details[open] {
            transform: translateY(-3px);
          }
        }
      `}</style>

      {showCluster ? (
        <aside className="fllm-listing-service-cluster" aria-label="Florida liquor license listing service resources">
          <div className="fllm-listing-service-cluster__inner">
            <span>Florida Liquor License Listing Service</span>
            <p>
              <Link href="/florida-liquor-license-broker">Florida Liquor License Broker Services</Link>
              <b aria-hidden="true">•</b>
              <Link href="/sell-your-license">List a Florida Liquor License for Sale</Link>
              <b aria-hidden="true">•</b>
              <Link href="/brokers/list-your-license">Advertise a Client License</Link>
              <b aria-hidden="true">•</b>
              <Link href="/listings">Florida Liquor License Marketplace</Link>
            </p>
          </div>
        </aside>
      ) : null}

      {showBrokerFaqs || showSellerFaqs ? (
        <section
          ref={faqSectionRef}
          className="fllm-listing-service-faq"
          aria-label={showBrokerFaqs ? "Florida broker listing service questions" : "Florida liquor license seller listing questions"}
        >
          <div className="fllm-listing-service-faq__inner">
            <span>{showBrokerFaqs ? "Broker Listing Service Questions" : "Seller Listing Questions"}</span>
            <h2>{showBrokerFaqs ? "Florida liquor license marketplace questions for brokers" : "How to list and sell a Florida liquor license"}</h2>
            <div className="fllm-listing-service-faq__grid">
              {(showBrokerFaqs ? brokerFaqs : sellerFaqs).map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
