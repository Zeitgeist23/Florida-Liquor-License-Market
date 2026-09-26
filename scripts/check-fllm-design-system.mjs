import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appRoot = path.join(root, "app");
const marker = 'data-fllm-design-system="v2"';
const forbidden = [
  ["color", /(^|[;{\s])color\s*:/i],
  ["background", /background(?:-color|-image)?\s*:/i],
  ["border", /border(?:-color|-style|-width|-radius|-(?:top|right|bottom|left)(?:-color|-style|-width|-radius)?)?\s*:/i],
  ["box-shadow", /box-shadow\s*:/i],
  ["font", /font(?:-family|-size|-weight|-style|-variant|\s*)\s*:/i],
  ["line-height", /line-height\s*:/i],
  ["text-transform", /text-transform\s*:/i],
  ["text-shadow", /text-shadow\s*:/i],
  ["transition", /transition(?:-[a-z-]+)?\s*:/i],
  ["transform", /(^|[;{\s])transform\s*:/i],
  ["filter", /(^|[;{\s])filter\s*:/i],
];

function walk(dir, files=[]){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,entry.name);
    if(entry.isDirectory()) walk(full,files);
    else files.push(full);
  }
  return files;
}

const pages=walk(appRoot).filter((file)=>file.endsWith("page.tsx"));
const violations=[];

const designSystemPath = path.join(root, "app", "fllm-design-system.css");
if (fs.existsSync(designSystemPath)) {
  const designCss = fs.readFileSync(designSystemPath, "utf8");
  const canonicalBaseImport = '@import "./florida-liquor-licenses-for-sale/seo-market.css";';
  const canonicalLockedImport = '@import "./fllm-market-page-template.css";';
  const baseIndex = designCss.indexOf(canonicalBaseImport);
  const lockedIndex = designCss.indexOf(canonicalLockedImport);
  if (baseIndex < 0) {
    violations.push([designSystemPath, "missing canonical seo-market.css base import"]);
  }
  if (lockedIndex < 0) {
    violations.push([designSystemPath, "missing canonical fllm-market-page-template.css import"]);
  }
  if (baseIndex >= 0 && lockedIndex >= 0 && baseIndex > lockedIndex) {
    violations.push([designSystemPath, "canonical imports are in the wrong order; base must load before locked template"]);
  }
}

// Official FLLM header is a locked sitewide primitive.
const officialHeaderCssPath = path.join(root, "app", "fllm-official-header.css");
const officialHeaderComponentPath = path.join(root, "components", "FormsSiteHeader.tsx");

const lockedOfficialHeaderCss = [
  ["official desktop height", "height:82px !important;"],
  ["official logo width", "width:150px !important;"],
  ["official logo height", "height:61px !important;"],
  ["compact menu font size", "font-size:10px !important;"],
  ["compact menu font weight", "font-weight:600 !important;"],
  ["official menu white", "color:#fff !important;"],
  ["official menu gold hover", "color:#f6a700 !important;"],
  ["official wide desktop menu gap", "gap:42px !important;"],
  ["official compact action height", "height:33px !important;"],
];

if (!fs.existsSync(officialHeaderCssPath)) {
  violations.push([officialHeaderCssPath, "missing locked official FLLM header stylesheet"]);
} else {
  const officialHeaderCss = fs.readFileSync(officialHeaderCssPath, "utf8");
  for (const [name, token] of lockedOfficialHeaderCss) {
    if (!officialHeaderCss.includes(token)) {
      violations.push([officialHeaderCssPath, `locked official header changed: ${name}`]);
    }
  }
}

if (!fs.existsSync(officialHeaderComponentPath)) {
  violations.push([officialHeaderComponentPath, "missing official FormsSiteHeader component"]);
} else {
  const officialHeaderComponent = fs.readFileSync(officialHeaderComponentPath, "utf8");
  if (!officialHeaderComponent.includes("fllm-official-shared-header")) {
    violations.push([officialHeaderComponentPath, "FormsSiteHeader missing official shared-header lock class"]);
  }
}

// Approved business-with-quota inventory cards are a locked FLLM primitive.
// Keep these checks explicit so future listing work cannot silently resize,
// restyle, or reword the standardized marketplace card.
const businessCardCssPath = path.join(
  root,
  "app",
  "businesses-with-quota-licenses",
  "business-inventory.css",
);
const businessCardComponentPath = path.join(
  root,
  "components",
  "BusinessQuotaListingCard.tsx",
);

const lockedBusinessCardCss = [
  ["312px fixed card height", "min-height: 312px;\n  height: 312px;"],
  ["approved body/map column proportions", "grid-template-columns: minmax(0, 1.08fr) minmax(172px, .92fr);"],
  ["approved map height", "min-height: 312px;\n  display: flex;"],
  ["approved map maximum size", "max-width: 215px;\n  max-height: 250px;"],
  ["three-card desktop inventory", "grid-template-columns: repeat(3, minmax(0, 1fr));"],
  ["business badge upper spacing", "margin: 9px 0 0;"],
  ["business badge lower spacing", "margin-top: 17px;"],
  ["two-line license statement", "white-space: normal;"],
  ["approved broker-name green", "color: #58c94f;"],
  ["approved gold action height", "min-height: 43px;"],
  ["approved gold action fill", "background: linear-gradient(145deg,#ffc13a 0%,#e99b00 100%);"],
  ["approved dimensional gold frame", "box-shadow:\n    0 0 0 1px rgba(105,67,10,.44),"],
];

if (!fs.existsSync(businessCardCssPath)) {
  violations.push([businessCardCssPath, "missing locked business-with-quota card stylesheet"]);
} else {
  const businessCardCss = fs.readFileSync(businessCardCssPath, "utf8");
  for (const [name, token] of lockedBusinessCardCss) {
    if (!businessCardCss.includes(token)) {
      violations.push([businessCardCssPath, `locked business card changed: ${name}`]);
    }
  }
}

const lockedBusinessCardComponent = [
  ["dynamic license-type badge", "{listing.licenseType} Included"],
  ["standardized business-category badge", "{listing.businessCategory}"],
  ["two-line included-license wording", "{listing.licenseType} liquor license included<br />"],
  ["not-separately-offered disclosure", "and not offered separately."],
  ["standard package action", "View Business + License Package"],
];

if (!fs.existsSync(businessCardComponentPath)) {
  violations.push([businessCardComponentPath, "missing locked business-with-quota card component"]);
} else {
  const businessCardComponent = fs.readFileSync(businessCardComponentPath, "utf8");
  for (const [name, token] of lockedBusinessCardComponent) {
    if (!businessCardComponent.includes(token)) {
      violations.push([businessCardComponentPath, `locked business card changed: ${name}`]);
    }
  }
}

for(const page of pages){
  const source=fs.readFileSync(page,"utf8");
  const usesV2Shell = source.includes("FllmPageShell");
  if(!source.includes(marker) && !usesV2Shell) continue;

  if(!usesV2Shell){
    violations.push([page,"v2 pages must use FllmPageShell"]);
  }

  if(!source.includes("fllm-official-template.css")){
    violations.push([page,"missing fllm-official-template.css import"]);
  }
  if(!source.includes("fllm-design-system.css")){
    violations.push([page,"missing fllm-design-system.css import"]);
  }
  if(!usesV2Shell && !source.includes("FormsSiteHeader")){
    violations.push([page,"missing FormsSiteHeader or FllmPageShell"]);
  }

  const importMatches=[...source.matchAll(/import\s+["']([^"']+\.css)["'];/g)];
  for(const match of importMatches){
    const spec=match[1];
    const resolved=path.resolve(path.dirname(page),spec);
    const normalized=resolved.split(path.sep).join("/");
    if(
      normalized.endsWith("/app/fllm-official-template.css") ||
      normalized.endsWith("/app/fllm-design-system.css") ||
      normalized.endsWith("/app/fllm-market-page-template.css") ||
      normalized.endsWith("/app/businesses-with-quota-licenses/business-inventory.css") ||
      normalized.includes("/app/listings/")
    ) continue;
    if(!fs.existsSync(resolved)) continue;
    const css=fs.readFileSync(resolved,"utf8");
    for(const [name,re] of forbidden){
      if(re.test(css)) violations.push([resolved,`route-local CSS redefines locked ${name}`]);
    }
  }
}

if(violations.length){
  console.error("\nFLLM design-system violations:\n");
  for(const [file,msg] of violations){
    console.error(`- ${path.relative(root,file)}: ${msg}`);
  }
  console.error("\nMove visual styling into app/fllm-design-system.css or use an approved shared primitive.\n");
  process.exit(1);
}

console.log("FLLM design-system check passed.");
