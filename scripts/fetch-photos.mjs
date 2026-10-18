// Downloads every photo listed in lib/content/photos.json into public/images/<slot>.jpg.
// Re-run safely: existing files are skipped. Usage: node scripts/fetch-photos.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const photos = JSON.parse(fs.readFileSync(path.join(root, 'lib/content/photos.json'), 'utf8'));
let ok = 0, skipped = 0, failed = [];

for (const [slot, [id]] of Object.entries(photos)) {
  const out = path.join(root, 'public/images', `${slot}.jpg`);
  if (fs.existsSync(out)) { skipped++; continue; }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const url = `https://images.unsplash.com/${id}?w=1800&q=78&fm=jpg&fit=max`;
  try {
    const res = await fetch(url);
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.startsWith('image/')) throw new Error(`${res.status} ${type}`);
    fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
    ok++;
  } catch (e) {
    failed.push(`${slot}: ${e.message}`);
  }
}
console.log(`downloaded ${ok}, skipped ${skipped}, failed ${failed.length}`);
failed.forEach((f) => console.log('  ' + f));
