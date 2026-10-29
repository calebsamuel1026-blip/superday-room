// Scores a voice-audit run:  node tests/speech/stress/score.js <results.json>
// results.json is what index.html#acctestbatch=tests/speech/stress/clips/list.json prints.
// Word error rate on the grader's own normalized words (so "seven fifty" = "7.50", "PP and E" = "PP&E"),
// plus words the engine invented (insertions) and dropped (deletions) per clip and per condition.
const fs = require("fs"), path = require("path");
const x = require("../../load.js");
const list = JSON.parse(fs.readFileSync(path.join(__dirname, "clips", "list.json")));
const res = JSON.parse(fs.readFileSync(process.argv[2]));
const words = s => x.Coach.normalize(String(s).replace(/\b(?:um+|uh+)\b,?/gi, " ")).split(" ").filter(Boolean);
function align(a, b){
  const d = Array.from({length: a.length + 1}, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  const ins = [], del = [], sub = []; let i = a.length, j = b.length;
  while (i > 0 || j > 0){
    if (i > 0 && j > 0 && d[i][j] === d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1)){ if (a[i-1] !== b[j-1]) sub.push(a[i-1] + "->" + b[j-1]); i--; j--; }
    else if (i > 0 && d[i][j] === d[i-1][j] + 1){ del.push(a[i-1]); i--; }
    else { ins.push(b[j-1]); j--; }
  }
  return {errs: d[a.length][b.length], ins: ins.reverse(), del: del.reverse(), sub: sub.reverse()};
}
const by = {};
for (const r of res){
  const ref = list.find(l => l.file === r.file); if (!ref) continue;
  if (r.error){ console.log("ERROR", r.file, r.error); (by[r.cond] = by[r.cond] || {e:0, n:0, fail:0}).fail++; continue; }
  const a = words(ref.text), b = words(r.text), al = align(a, b), wer = al.errs / a.length;
  const g = by[r.cond] = by[r.cond] || {e:0, n:0, fail:0}; g.e += al.errs; g.n += a.length;
  const fillers = (r.raw.match(/\b(?:um+|uh+)\b/gi) || []).length, saidF = (ref.text.match(/\b(?:um+|uh+)\b/gi) || []).length;
  if (wer > 0 || process.argv.includes("--all")) console.log(`${r.file.padEnd(24)} WER ${(wer * 100).toFixed(1).padStart(5)}%  ${r.secs}s  fillers ${fillers}/${saidF}` + (al.sub.length ? "\n   swapped: " + al.sub.join(", ") : "") + (al.ins.length ? "\n   invented: " + al.ins.join(" ") : "") + (al.del.length ? "\n   dropped: " + al.del.join(" ") : ""));
}
console.log("\nby condition:");
for (const [c, g] of Object.entries(by)) console.log(`  ${c.padEnd(12)} WER ${(g.n ? g.e / g.n * 100 : 0).toFixed(1).padStart(5)}%` + (g.fail ? `  (${g.fail} failed)` : ""));
const tot = Object.values(by).reduce((s, g) => ({e: s.e + g.e, n: s.n + g.n}), {e:0, n:0});
console.log(`  overall      WER ${(tot.e / tot.n * 100).toFixed(1)}%`);
