import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const fdorOffices = [
  ["Alachua", "14107 NW US Highway 441 Ste 100, Alachua, FL 32615-6390", "386-418-4444"],
  ["Coral Springs", "3301 N University Dr Ste 200, Coral Springs, FL 33065-4149", "954-346-3000"],
  ["Daytona Beach", "1180 N Williamson Blvd Ste 160, Daytona Beach, FL 32114-8179", "386-274-6600"],
  ["Fort Myers", "2295 Victoria Ave Ste 270, Fort Myers, FL 33901-3871", "239-338-2400"],
  ["Fort Pierce", "337 N US Highway 1 Ste 207B, Fort Pierce, FL 34950-4255", "772-429-2900"],
  ["Jacksonville", "921 N Davis St Ste 250A, Jacksonville, FL 32209-6829", "904-359-6070"],
  ["Lake City", "1415 W US Highway 90 Ste 115, Lake City, FL 32055-6156", "386-758-0420"],
  ["Lakeland", "115 S Missouri Ave Ste 202, Lakeland, FL 33815-4644", "863-499-2260"],
  ["Largo", "11351 Ulmerton Rd Ste 220, Largo, FL 33778-1629", "727-588-6800"],
  ["Leesburg", "900 N 14th St Ste 201, Leesburg, FL 34748-3829", "352-315-4470"],
  ["Melbourne", "100 Rialto Pl Ste 800, Melbourne, FL 32901-3004", "321-757-7070"],
  ["Miami / Doral", "3750 NW 87th Ave Ste 300, Doral, FL 33178-2430", "305-470-5001"],
  ["Orlando", "400 W Robinson St Ste N302, Orlando, FL 32801-1759", "407-648-2905"],
  ["Panama City", "2480 Saint Andrews Blvd, Panama City, FL 32405-2169", "850-872-4165"],
  ["Pensacola", "2205 La Vista Ave Ste B, Pensacola, FL 32504-8210", "850-471-6970"],
  ["Sarasota", "100 Paramount Dr Ste 200, Sarasota, FL 34232-6051", "941-343-0201"],
  ["Tallahassee", "2639 N Monroe St, Bldg B, Ste 100, Tallahassee, FL 32303-4045", "850-488-9719"],
  ["Tampa", "5483 W Waters Ave Ste 1210, Tampa, FL 33634-1236", "813-901-1100"],
  ["West Palm Beach", "2468 Metrocentre Blvd, West Palm Beach, FL 33407-3105", "561-640-2800"],
] as const;

export default function FloridaDepartmentOfRevenueLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .fdor-official-shell .fdor-page > .abt-header-wrap {
          position: relative;
          z-index: 30;
          border-bottom: 1px solid rgba(246, 167, 0, .55);
          background: #020b12;
        }

        .fdor-official-shell .fdor-page > .abt-header-wrap .forms-site-header {
          margin-inline: auto;
        }

        .fdor-official-shell .fdor-page > .abt-forms-footer {
          display: none !important;
        }

        .fdor-contact-directory {
          padding: 54px 0 58px;
          border-top: 1px solid #31495b;
          background: linear-gradient(180deg, #081a28 0%, #06131e 100%);
          color: #edf3f7;
        }

        .fdor-contact-directory .fdor-directory-shell {
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
        }

        .fdor-contact-heading {
          display: grid;
          grid-template-columns: minmax(0, .9fr) minmax(320px, 1.1fr);
          gap: 46px;
          align-items: end;
          margin-bottom: 28px;
        }

        .fdor-contact-heading > div > span {
          display: block;
          color: #f6a700;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .fdor-contact-heading h2 {
          margin: 7px 0 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(29px, 4vw, 42px);
          line-height: 1.08;
        }

        .fdor-contact-heading p {
          margin: 0;
          color: #b9c6ce;
          font-size: 15px;
          line-height: 1.72;
        }

        .fdor-statewide-contact {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }

        .fdor-statewide-contact article,
        .fdor-office-card {
          border: 1px solid #3f586a;
          border-top: 3px solid #f6a700;
          border-radius: 8px;
          background: linear-gradient(145deg, #0a2033, #06131e);
          box-shadow: 0 16px 38px rgba(0, 0, 0, .22);
        }

        .fdor-statewide-contact article {
          padding: 20px;
        }

        .fdor-statewide-contact span,
        .fdor-office-card small {
          display: block;
          color: #9fb0bb;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .07em;
          text-transform: uppercase;
        }

        .fdor-statewide-contact strong {
          display: block;
          margin: 7px 0 3px;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          line-height: 1.2;
        }

        .fdor-statewide-contact a,
        .fdor-office-card a {
          color: #f6a700;
          font-weight: 900;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .fdor-statewide-contact p {
          margin: 5px 0 0;
          color: #c4d0d7;
          font-size: 13px;
          line-height: 1.55;
        }

        .fdor-offices-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .fdor-office-card {
          padding: 18px 19px;
          transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
        }

        .fdor-office-card:hover {
          transform: translateY(-4px);
          border-color: #d89200;
          box-shadow: 0 22px 44px rgba(0, 0, 0, .32);
        }

        .fdor-office-card h3 {
          margin: 5px 0 8px;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          line-height: 1.18;
        }

        .fdor-office-card address {
          min-height: 42px;
          margin: 0 0 10px;
          color: #bcc9d1;
          font-size: 13px;
          font-style: normal;
          line-height: 1.55;
        }

        .fdor-official-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }

        .fdor-official-links a {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          border: 1px solid #d28e00;
          border-radius: 4px;
          color: #07101a;
          background: linear-gradient(145deg, #ffbd21, #ef9800);
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          text-decoration: none;
        }

        .fdor-official-links a:nth-child(n+2) {
          color: #f6a700;
          background: #06131e;
        }

        .fdor-directory-note {
          margin: 18px 0 0;
          color: #8fa0ac;
          font-size: 11px;
          line-height: 1.6;
        }

        @media (min-width: 981px) {
          .fdor-official-shell .forms-site-header.page-shell {
            width: min(1240px, calc(100% - 40px));
            gap: 18px;
          }

          .fdor-official-shell .forms-site-header .brand-lockup {
            flex: 0 0 184px;
          }

          .fdor-official-shell .forms-site-header .brand-lockup img {
            width: 168.7125px;
            height: 68.5075px;
          }

          .fdor-official-shell .forms-site-header .primary-nav {
            justify-content: center;
            gap: 42px;
          }

          .fdor-official-shell .forms-site-header .header-actions {
            transform: translateX(5px);
          }

          .fdor-official-shell .forms-site-header .header-actions .btn-outline:hover,
          .fdor-official-shell .forms-site-header .header-actions .btn-outline:focus-visible {
            border-color: #ffc13b;
            background: linear-gradient(145deg, #ffc13b, #e69a00);
            color: #07101a;
            box-shadow:
              0 0 0 1px rgba(255, 193, 59, .28),
              0 0 18px rgba(241, 166, 0, .5);
          }
        }

        @media (max-width: 900px) {
          .fdor-contact-heading,
          .fdor-statewide-contact,
          .fdor-offices-grid {
            grid-template-columns: 1fr 1fr;
          }

          .fdor-contact-heading > div,
          .fdor-contact-heading > p {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 650px) {
          .fdor-contact-directory .fdor-directory-shell {
            width: min(1240px, calc(100% - 24px));
          }

          .fdor-statewide-contact,
          .fdor-offices-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="fdor-official-shell">
        {children}

        <section className="fdor-contact-directory" aria-labelledby="fdor-office-directory-heading">
          <div className="fdor-directory-shell">
            <div className="fdor-contact-heading">
              <div>
                <span>Official Florida Department of Revenue contacts</span>
                <h2 id="fdor-office-directory-heading">FDOR offices, phone numbers and official websites</h2>
              </div>
              <p>
                Florida Department of Revenue Taxpayer Service Centers provide assistance with Florida tax and fee questions,
                account registration, returns, payments, bills, delinquency notices and credits. Service centers are generally
                open 8:00 a.m. to 5:00 p.m. local time.
              </p>
            </div>

            <div className="fdor-statewide-contact">
              <article>
                <span>Statewide taxpayer assistance</span>
                <strong>General Tax Administration</strong>
                <a href="tel:+18504886800">850-488-6800</a>
                <p>Monday–Friday, 8:00 a.m.–5:00 p.m. Eastern Time.</p>
              </article>
              <article>
                <span>Informal dispute resolution</span>
                <strong>Assessment protests</strong>
                <a href="tel:+18506178346">850-617-8346</a>
                <p>For protested agency actions involving taxes other than property tax.</p>
              </article>
              <article>
                <span>Tax payment mailing address</span>
                <strong>Florida Department of Revenue</strong>
                <p>5050 W Tennessee St<br />Tallahassee, FL 32399-0100</p>
              </article>
            </div>

            <div className="fdor-offices-grid" aria-label="Florida FDOR taxpayer service centers">
              {fdorOffices.map(([city, address, phone]) => (
                <article className="fdor-office-card" key={city}>
                  <small>Taxpayer Service Center</small>
                  <h3>{city}</h3>
                  <address>{address}</address>
                  <a href={`tel:+1${phone.replaceAll("-", "")}`}>{phone}</a>
                </article>
              ))}
            </div>

            <div className="fdor-official-links" aria-label="Official Florida Department of Revenue website links">
              <a href="https://floridarevenue.com/" target="_blank" rel="noreferrer">FDOR Official Website ↗</a>
              <a href="https://floridarevenue.com/taxes/Pages/servicecenters.aspx" target="_blank" rel="noreferrer">Official Service Center Directory ↗</a>
              <a href="https://floridarevenue.com/taxes/pages/gta_contact.aspx" target="_blank" rel="noreferrer">General Tax Administration Contacts ↗</a>
              <a href="https://floridarevenue.com/Pages/contact.aspx" target="_blank" rel="noreferrer">FDOR Contact Page ↗</a>
            </div>

            <p className="fdor-directory-note">
              Office information is presented as a convenience from the Florida Department of Revenue&apos;s published service-center and General Tax Administration contact directories. Verify hours and contact details with FDOR before traveling to an office.
            </p>
          </div>
        </section>

        <aside
          aria-label="Related Florida Department of Revenue attorney profile"
          style={{
            background: "#061522",
            borderTop: "1px solid rgba(246,167,0,.35)",
            padding: "18px 24px 24px",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          <span style={{ color: "#9dadb8", marginRight: 10 }}>Related FLLM attorney profile:</span>
          <a
            href="/resources/liquor-license-attorneys/james-h-sutton-jr"
            style={{ color: "#f6a700", fontWeight: 800 }}
          >
            Florida Department of Revenue Tax Appeals — James H. Sutton, Jr., CPA, Esq.
          </a>
        </aside>

        <footer className="directory-footer sell-license-page-footer official-directory-footer">
          <div className="directory-shell">
            <div className="directory-footer-brand">
              <Link href="/" aria-label="Florida Liquor License Market home">
                <Image
                  src="/assets/brand-sharp.svg"
                  alt="Florida Liquor License Market"
                  width={130}
                  height={53}
                />
              </Link>
              <span>© Florida Liquor License Market</span>
            </div>
            <nav aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <Link href="/florida-4cop-liquor-license-for-sale">4COP</Link>
              <Link href="/florida-3ps-liquor-license-for-sale">3PS</Link>
              <Link href="/listings">Listings</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
