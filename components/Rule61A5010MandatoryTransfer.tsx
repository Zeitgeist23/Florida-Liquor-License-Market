import Link from "next/link";

type Rule61A5010MandatoryTransferProps = {
  context: "laws" | "abt6002";
};

export default function Rule61A5010MandatoryTransfer({
  context,
}: Rule61A5010MandatoryTransferProps) {
  const headingId = `rule-61a-5-010-${context}`;
  const heading = context === "laws"
    ? "Rule 61A-5.010 requires ABT-6002 for a transfer of ownership"
    : "Florida’s mandatory transfer-of-ownership rule";

  return (
    <section className="rule610-section" aria-labelledby={headingId}>
      <style>{`
        .rule610-section{
          padding:56px 0 62px;
          border-top:1px solid rgba(239,169,23,.48);
          border-bottom:1px solid rgba(239,169,23,.34);
          color:#eef4f7;
          background:
            radial-gradient(circle at 82% 12%,rgba(33,87,126,.22),transparent 34%),
            linear-gradient(135deg,#071d31 0%,#041421 68%,#020d16 100%);
        }
        .rule610-shell{width:min(1120px,calc(100% - 44px));margin:0 auto}
        .rule610-kicker{display:block;color:#f2aa18;font-size:11px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
        .rule610-section h2{max-width:900px;margin:9px 0 12px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:clamp(29px,4vw,44px);line-height:1.08}
        .rule610-intro{max-width:920px;margin:0;color:#bdcbd4;font-size:14px;line-height:1.68}
        .rule610-quote{max-width:940px;margin:24px 0 0;padding:24px 26px;border:1px solid rgba(239,169,23,.66);border-left:5px solid #f2aa18;border-radius:8px;background:rgba(4,20,33,.82);box-shadow:0 14px 34px rgba(0,0,0,.24)}
        .rule610-quote p{margin:0;color:#f7f3ea;font-family:Georgia,'Times New Roman',serif;font-size:clamp(18px,2.2vw,24px);line-height:1.52}
        .rule610-quote strong{color:#ffc13b;font-weight:800}
        .rule610-caption{display:block;margin-top:14px;color:#91a8b6;font-size:10px;font-weight:800;letter-spacing:.055em;text-transform:uppercase}
        .rule610-explanation{max-width:940px;margin:20px 0 0;color:#c4d1d8;font-size:13px;line-height:1.68}
        .rule610-actions{display:flex;flex-wrap:wrap;gap:11px;margin-top:22px}
        .rule610-actions a{display:inline-flex;min-height:44px;align-items:center;justify-content:center;padding:0 17px;border:1px solid #e8a418;border-radius:6px;color:#06131e;background:linear-gradient(145deg,#ffc23d,#e99b05);font-size:11px;font-weight:900;letter-spacing:.025em;text-decoration:none;text-transform:uppercase}
        .rule610-actions a+ a{color:#f4ad1c;background:#061827}
        .rule610-actions a:hover,.rule610-actions a:focus-visible{filter:brightness(1.08);outline:none;transform:translateY(-1px)}
        .rule610-note{max-width:940px;margin:16px 0 0;color:#8299a7;font-size:10px;line-height:1.55}
        @media(max-width:640px){.rule610-section{padding:43px 0 48px}.rule610-shell{width:min(100% - 28px,1120px)}.rule610-quote{padding:20px 18px}.rule610-actions a{width:100%}}
      `}</style>

      <div className="rule610-shell">
        <span className="rule610-kicker">Florida Administrative Code · Mandatory Filing Language</span>
        <h2 id={headingId}>{heading}</h2>
        <p className="rule610-intro">
          The latest adopted version of F.A.C. Rule 61A-5.010 is identified by the Florida Administrative Code as effective May 14, 2013. The rule uses the words <strong>shall</strong> and <strong>must</strong> when prescribing the application for a transfer of ownership of an existing alcoholic-beverage license.
        </p>

        <blockquote className="rule610-quote">
          <p>
            An application for transfer of ownership of an existing license <strong>shall</strong> be filed on DBPR ABT 6002, APPLICATION FOR TRANSFER OF AN ALCOHOLIC BEVERAGE LICENSE AND NEW TOBACCO PERMIT, effective February 2013, and incorporated herein by reference. The application <strong>must</strong> be completed in accordance with the list of license requirements contained in the application instructions.
          </p>
          <span className="rule610-caption">F.A.C. Rule 61A-5.010 — Applications; Transfer Fee</span>
        </blockquote>

        <p className="rule610-explanation">
          In practical terms, an application seeking transfer of ownership of an existing Florida alcoholic-beverage license is filed through the ABT-6002 process, and the official form instructions control the required filing package. FLLM presents the rule text and form access together so buyers, sellers, lenders, and transaction professionals can identify the governing transfer requirement.
        </p>

        <div className="rule610-actions">
          <a href="https://flrules.org/gateway/ruleno.asp?id=61A-5.010" target="_blank" rel="noreferrer">Open Official Rule ↗</a>
          <Link href="/resources/forms/abt-6002">Open ABT-6002 Workspace</Link>
        </div>

        <p className="rule610-note">
          FLLM is an independent marketplace and information resource, not DBPR or the Division of Alcoholic Beverages and Tobacco. The official rule, current DBPR filing system, application instructions, and agency requirements control.
        </p>
      </div>
    </section>
  );
}
