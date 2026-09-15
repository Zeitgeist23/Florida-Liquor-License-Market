"use client";

import { useEffect } from "react";

export default function FloridaDepartmentOfRevenueTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".fdor-page .fdor-hero");
    const shell = hero?.querySelector<HTMLElement>(":scope > .page-shell");
    if (!hero || !shell || shell.querySelector(".fdor-hero-quick-contact")) return;

    hero.classList.add("fdor-hero-quick-contact-active");

    const card = document.createElement("aside");
    card.className = "fdor-hero-quick-contact";
    card.setAttribute("aria-label", "Florida Department of Revenue quick contact information");
    card.innerHTML = `
      <span class="fdor-hero-contact-kicker">Official FDOR contact</span>
      <h2>Florida Department of Revenue</h2>
      <div class="fdor-hero-contact-block">
        <small>Tax payment mailing address</small>
        <address>
          Florida Department of Revenue<br />
          5050 W Tennessee St<br />
          Tallahassee, FL 32399-0100
        </address>
      </div>
      <div class="fdor-hero-contact-block">
        <small>General tax information / Taxpayer Services</small>
        <a class="fdor-hero-contact-phone" href="tel:+18504886800">850-488-6800</a>
        <span>Monday–Friday · 8:00 a.m.–5:00 p.m. ET</span>
      </div>
      <div class="fdor-hero-contact-links">
        <a href="https://floridarevenue.com/taxes/pages/gta_contact.aspx" target="_blank" rel="noreferrer">FDOR Tax Contacts ↗</a>
        <a href="https://floridarevenue.com/" target="_blank" rel="noreferrer">Official FDOR Website ↗</a>
      </div>
    `;

    shell.appendChild(card);

    return () => {
      card.remove();
      hero.classList.remove("fdor-hero-quick-contact-active");
    };
  }, []);

  return (
    <>
      <style>{`
        .fdor-hero.fdor-hero-quick-contact-active > .page-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(310px, 365px);
          column-gap: 44px;
          align-items: start;
        }

        .fdor-hero.fdor-hero-quick-contact-active > .page-shell > .fdor-breadcrumbs {
          grid-column: 1 / -1;
        }

        .fdor-hero.fdor-hero-quick-contact-active > .page-shell > .fdor-eyebrow,
        .fdor-hero.fdor-hero-quick-contact-active > .page-shell > h1,
        .fdor-hero.fdor-hero-quick-contact-active > .page-shell > p,
        .fdor-hero.fdor-hero-quick-contact-active > .page-shell > .fdor-hero-actions {
          grid-column: 1;
        }

        .fdor-hero.fdor-hero-quick-contact-active > .page-shell > h1 {
          max-width: 780px;
          font-size: clamp(34px, 3.8vw, 50px);
          line-height: 1.03;
        }

        .fdor-hero.fdor-hero-quick-contact-active > .page-shell > p {
          max-width: 735px;
          font-size: 15px;
          line-height: 1.66;
        }

        .fdor-hero-quick-contact {
          grid-column: 2;
          grid-row: 2 / 6;
          align-self: start;
          margin-top: 4px;
          padding: 22px 22px 20px;
          border: 1px solid #486176;
          border-top: 4px solid #f6a700;
          border-radius: 9px;
          background: linear-gradient(145deg, rgba(12, 42, 65, .97), rgba(5, 19, 30, .98));
          box-shadow: 0 22px 48px rgba(0, 0, 0, .36), inset 0 0 0 1px rgba(255, 255, 255, .025);
        }

        .fdor-hero-contact-kicker {
          display: block;
          margin-bottom: 7px;
          color: #f6a700;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .fdor-hero-quick-contact h2 {
          margin: 0 0 16px;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          line-height: 1.12;
        }

        .fdor-hero-contact-block {
          padding: 13px 0;
          border-top: 1px solid #344c5f;
        }

        .fdor-hero-contact-block small {
          display: block;
          margin-bottom: 6px;
          color: #9fb0bb;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .07em;
          text-transform: uppercase;
        }

        .fdor-hero-contact-block address,
        .fdor-hero-contact-block > span {
          display: block;
          margin: 0;
          color: #d7e0e5;
          font-size: 13px;
          font-style: normal;
          line-height: 1.55;
        }

        .fdor-hero-contact-phone {
          display: inline-block;
          margin: 0 0 4px;
          color: #f6a700;
          font-size: 19px;
          font-weight: 900;
          line-height: 1.1;
          text-decoration: none;
        }

        .fdor-hero-contact-phone:hover,
        .fdor-hero-contact-phone:focus-visible {
          color: #ffc23a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .fdor-hero-contact-links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 13px;
          border-top: 1px solid #344c5f;
        }

        .fdor-hero-contact-links a {
          color: #f6a700;
          font-size: 10px;
          font-weight: 900;
          line-height: 1.4;
          text-decoration: none;
        }

        .fdor-hero-contact-links a:hover,
        .fdor-hero-contact-links a:focus-visible {
          color: #ffc23a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        @media (max-width: 980px) {
          .fdor-hero.fdor-hero-quick-contact-active > .page-shell {
            grid-template-columns: 1fr;
          }

          .fdor-hero.fdor-hero-quick-contact-active > .page-shell > .fdor-breadcrumbs,
          .fdor-hero.fdor-hero-quick-contact-active > .page-shell > .fdor-eyebrow,
          .fdor-hero.fdor-hero-quick-contact-active > .page-shell > h1,
          .fdor-hero.fdor-hero-quick-contact-active > .page-shell > p,
          .fdor-hero.fdor-hero-quick-contact-active > .page-shell > .fdor-hero-actions,
          .fdor-hero-quick-contact {
            grid-column: 1;
          }

          .fdor-hero-quick-contact {
            grid-row: auto;
            width: 100%;
            max-width: 620px;
            margin-top: 24px;
          }
        }

        @media (max-width: 650px) {
          .fdor-hero.fdor-hero-quick-contact-active > .page-shell > h1 {
            font-size: clamp(32px, 10vw, 43px);
          }

          .fdor-hero-quick-contact {
            padding: 19px 18px 18px;
          }
        }
      `}</style>
      {children}
    </>
  );
}
