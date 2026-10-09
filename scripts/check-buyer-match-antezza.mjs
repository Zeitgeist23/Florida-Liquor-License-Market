import fs from "node:fs";
const source=fs.readFileSync("lib/business-quota-listings.ts","utf8");
const match=source.match(/listingReference: "FLLM-ANTEZZA"([\s\S]*?)\n\s*\},/);
if(!match) throw new Error("Antezza registry listing is missing");
const fields=Object.fromEntries(["grossRevenueNumber","sdeNumber","ebitdaNumber"].map(field=>{
 const m=match[1].match(new RegExp(field + ":\\s*([\\d_]+)"));
 return [field,m?Number(m[1].replace(/_/g,"")):null];
}));
const qualifies = fields.sdeNumber >= 125000 && fields.ebitdaNumber >= 150000 && 899000<=1925000;
if(!qualifies) throw new Error("Antezza financial regression: "+JSON.stringify(fields));
console.log("PASS Antezza qualifies at SDE $125,000 and EBITDA $150,000:",JSON.stringify(fields));
