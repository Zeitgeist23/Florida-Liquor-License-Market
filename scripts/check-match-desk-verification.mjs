// Regression tests for actual Match Desk source classification code.
// Run with: node scripts/check-match-desk-verification.mjs
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync("app/admin/leads/AdminLeadsClient.tsx", "utf8");
const route = fs.readFileSync("app/api/admin/leads/source-verification/route.ts", "utf8");
const ast = ts.createSourceFile("AdminLeadsClient.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const needed = new Set(["BROKEN_SOURCE_REFS", "normalizedSourceUrl", "genericSourceUrl", "sourceAudit"]);
const statements = ast.statements.filter((node) => {
  if (ts.isFunctionDeclaration(node)) return needed.has(node.name?.text);
  if (ts.isVariableStatement(node)) return node.declarationList.declarations.some((d) => ts.isIdentifier(d.name) && needed.has(d.name.text));
  return false;
});
assert.equal(statements.length, 4, "Source classification helpers must remain testable");
const extracted = statements.map((x) => x.getText(ast)).join("\n");
const compiled = ts.transpileModule(extracted, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}}).outputText;
const context = vm.createContext({URL, Set, Map});
vm.runInContext(compiled + "\nthis.audit = sourceAudit; this.norm = normalizedSourceUrl;", context);
const list = (ref, url) => ({sourceRef:ref,sourceUrl:url});
const counts = new Map();
const verify = (ref,url) => context.audit(list(ref,url),counts).status;
assert.equal(verify("FLLM-133","https://www.bizquest.com/asset-sales/3ps-liquor-license-manattee-county-florida/BW2399365/"),"broken");
assert.equal(verify("FLLM-095","https://www.bizbuysell.com/florida/escambia-county/liquor-stores-for-sale/"),"generic");
assert.equal(verify("FLLM-076","https://liquorlicenseauctioneers.com/florida/counties/palm-beach/types/4cop-3ps"),"generic");
assert.equal(verify("FLLM-023","https://www.bizbuysell.com/business-asset/st-lucie-county-4cop-3ps-quota-liquor-license-for-sale/2464222/"),"unverified");
const sampleUrl = context.norm("https://www.bizbuysell.com/business-asset/example/1234/");
counts.set(sampleUrl,2);
assert.equal(verify("FLLM-888","https://www.bizbuysell.com/business-asset/example/1234/"),"duplicate");
assert.equal(verify("FLLM-888",""),"missing");
assert.match(source,/verificationByRef\.get\(listing\.sourceRef\)/,"Buyer comparison must inspect persistent status");
assert.match(source,/verification_status !== "verified_active"/,"Unverified listings must not enter buyer comparison");
assert.match(source,/seenVerified\.has\(url\)/,"Verified advertisements must be deduplicated");
assert.match(route,/isAdminAuthenticated\(\)/,"Verification API must be admin protected");
assert.match(route,/note\.length<12/,"Verification must require evidence");
assert.match(route,/verified_at:/,"Verification must record a timestamp");
console.log("Match Desk verification regression checks passed (classification, gating, duplicates, admin protection).");
