import { existsSync } from 'node:fs';
const required = [
  'public/index.html',
  'public/listings/index.html',
  'public/sell-your-license/index.html',
  'public/assets'
];
for (const path of required) {
  if (!existsSync(path)) throw new Error(`Missing mirrored path: ${path}`);
}
console.log('Static live-site mirror verified.');
