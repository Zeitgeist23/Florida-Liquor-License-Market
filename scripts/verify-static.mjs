import { existsSync, readFileSync } from 'node:fs';
const required = [
  'public/index.html',
  'public/listings/index.html',
  'public/sell-your-license/index.html',
  'public/assets'
];
for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing mirrored path: ${path}`);
}
const combined = readFileSync('public/index.html', 'utf8') + readFileSync('public/listings/index.html', 'utf8');
for (const invalid of ['2COP Quota', '3COP License', '2COP Beer & Wine', 'Specialty / Qualified Business License']) {
  if (combined.includes(invalid)) throw new Error(`Invalid classification remains: ${invalid}`);
}
console.log('Static live-site mirror and classification corrections verified.');
