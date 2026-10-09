/**
 * Synchronize displayed financial metrics from authorized Featured Broker pages.
 * Runs automatically before next build; never reads confidential admin records.
 * Only literal, numeric businessMetrics labels/values are imported.
 */
import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const registry=fs.readFileSync(path.join(root,"lib/business-quota-listings.ts"),"utf8");
const output={};
const numeric=(text)=>{
  if(typeof text!=="string" || !/^\$[\d,]+(?:\.\d{1,2})?$/.test(text.trim()))return null;
  const n=Number(text.replace(/[$,]/g,""));
  return Number.isFinite(n)&&n>0?n:null;
};
const kind=(label)=>{
 const lower=label.toLowerCase().replace(/\s+/g," ").trim();
 if(/\b(ebitda)\b/.test(lower))return "ebitda";
 if(/\b(sde|seller(?:.?s)? discretionary earnings|cash flow|cashflow)\b/.test(lower))return "sde";
 if(/\b(gross revenue|gross sales|annual revenue|annual sales|annual gross revenue)\b/.test(lower))return "gross";
 return null;
};
// Listing tier is often omitted on approved featured listings. Collect reference and
// page path from each registry object without searching across the next record.
const chunks=registry.split(/\n\s*\{\s*\n\s*listingReference:\s*/).slice(1);
for(const chunk of chunks){
 const ref=chunk.match(/^"([^"]+)"/)?.[1];
 const href=chunk.match(/\bhref:\s*"\/listings\/([^"]+)"/)?.[1];
 if(!ref||!href||!ref.startsWith("FLLM-")||chunk.match(/\blistingTier:\s*"market"/))continue;
 if(!/\bpublicationStatus:\s*"published"/.test(chunk))continue;
 const filename=path.join(root,"app/listings",href,"page.tsx");
 if(!fs.existsSync(filename))continue;
 const source=fs.readFileSync(filename,"utf8");
 const start=source.search(/businessMetrics:\s*\[/);
 if(start<0)continue;
 const tail=source.slice(start);
 const end=tail.search(/\n\s*\],/);
 if(end<0)continue;
 const metrics=tail.slice(0,end);
 // Each metric must use literal label/value strings. Dynamic expressions are ignored.
 const rows=[...metrics.matchAll(/label:\s*["']([^"'\n]+)["']\s*,\s*value:\s*["']([^"'\n]+)["']/g)];
 const financial={};
 for(const [,label,value] of rows){
  const field=kind(label),amount=numeric(value);
  if(field&&amount!==null)financial[field]=amount;
 }
 if(Object.keys(financial).length)output[ref]=financial;
}
const target=path.join(root,"data/featured-listing-financials.generated.json");
fs.mkdirSync(path.dirname(target),{recursive:true});
fs.writeFileSync(target,JSON.stringify(output,null,2)+"\n");
console.log("Synchronized financial metrics for "+Object.keys(output).length+" published featured listings.");
