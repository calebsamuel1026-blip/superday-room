// Checks the reworded questions and merges the good ones into src/data-rephrase.json.
//   node rephrase/check.js            (report + merge)
// A rewording is kept only if it: exists, really differs, keeps every number, keeps the same
// Part / Follow-up labels, stays about the same length, and has no em dash.
const fs = require("fs"), path = require("path");
const IN = path.join(__dirname, "in"), OUT = path.join(__dirname, "out");
const nums = s => (String(s).replace(/(\d),(\d{3})/g, "$1$2").match(/\d+(?:\.\d+)?/g) || []).sort().join(" ");
const labels = s => (String(s).match(/\b(?:part\s*\d+|follow[- ]?up(?:\s*\d+)?)\b/gi) || []).map(x => x.toLowerCase().replace(/[\s-]+/g, "")).join(" ");
const plain = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const good = {}, bad = [], missing = [];
let total = 0;
for (const f of fs.readdirSync(IN).filter(f => f.endsWith(".json")).sort()){
  const items = JSON.parse(fs.readFileSync(path.join(IN, f), "utf8"));
  let out = {};
  try { out = JSON.parse(fs.readFileSync(path.join(OUT, f), "utf8")); } catch (e) { console.log(`${f}: no output yet`); }
  for (const { id, q } of items){
    total++;
    const r = out[id];
    if (typeof r !== "string" || !r.trim()){ missing.push(id); continue; }
    const why = [];
    if (plain(r) === plain(q)) why.push("unchanged");
    if (nums(r) !== nums(q)) why.push(`numbers ${nums(q)} -> ${nums(r)}`);
    if (labels(r) !== labels(q)) why.push(`parts ${labels(q)} -> ${labels(r)}`);
    const ratio = r.length / Math.max(1, q.length);
    if (q.length > 40 && (ratio < 0.55 || ratio > 1.7)) why.push(`length x${ratio.toFixed(2)}`);
    if (/—/.test(r)) why.push("em dash");
    if (why.length) bad.push({ id, why: why.join("; "), q: q.slice(0, 110), r: r.slice(0, 110) });
    else good[id] = r.trim();
  }
}
fs.writeFileSync(path.join(__dirname, "..", "src", "data-rephrase.json"), JSON.stringify(good, null, 0));
console.log(`kept ${Object.keys(good).length} of ${total} | rejected ${bad.length} | missing ${missing.length}`);
for (const b of bad.slice(0, Number(process.argv[2] || 15))) console.log(`- ${b.id}: ${b.why}\n    Q: ${b.q}\n    R: ${b.r}`);
fs.writeFileSync(path.join(__dirname, "rejected.json"), JSON.stringify({ bad, missing }, null, 1));
