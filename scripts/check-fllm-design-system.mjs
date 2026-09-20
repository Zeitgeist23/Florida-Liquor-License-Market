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

for(const page of pages){
  const source=fs.readFileSync(page,"utf8");
  if(!source.includes(marker)) continue;

  if(!source.includes("fllm-official-template.css")){
    violations.push([page,"missing fllm-official-template.css import"]);
  }
  if(!source.includes("fllm-design-system.css")){
    violations.push([page,"missing fllm-design-system.css import"]);
  }
  if(!source.includes("FormsSiteHeader")){
    violations.push([page,"missing FormsSiteHeader"]);
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
