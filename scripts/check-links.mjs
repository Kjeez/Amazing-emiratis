// Crawls every internal link from the homepage and reports broken ones.
// Usage: node scripts/check-links.mjs [base URL, default http://localhost:3100]
const base = process.argv[2] || 'http://localhost:3100';
const seen = new Map();
const from = new Map();
const queue = ['/', '/ar'];
while (queue.length) {
  const p = queue.shift();
  if (seen.has(p)) continue;
  const res = await fetch(base + p, { redirect: 'manual' });
  seen.set(p, res.status);
  if (res.status >= 300 && res.status < 400) continue;
  if (!(res.headers.get('content-type') || '').includes('html')) continue;
  const html = await res.text();
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const h = m[1].replace(/&amp;/g, '&');
    if (h.startsWith('#') || /^(mailto|tel|https?):/.test(h) || h.startsWith('/_next')) continue;
    const u = new URL(h, base + p);
    const key = u.pathname + u.search;
    if (!from.has(key)) from.set(key, p);
    if (!seen.has(key) && !queue.includes(key)) queue.push(key);
  }
}
const bad = [...seen].filter(([, s]) => s >= 400);
console.log('pages crawled:', seen.size);
console.log('broken:', bad.length ? '\n' + bad.map(([p, s]) => `  ${s} ${p} (linked from ${from.get(p)})`).join('\n') : 'none');
process.exitCode = bad.length ? 1 : 0;
