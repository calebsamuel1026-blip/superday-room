// Scores every sample answer and reports how well the engine separates quality levels.
//   node tests/eval.js [--detail]
const x = require("./load.js"), fs = require("fs"), path = require("path");
// Questions are frozen in the test files so bank re-imports can't change what is graded.
const qs = [...JSON.parse(fs.readFileSync(path.join(__dirname, "questions.json"))), ...JSON.parse(fs.readFileSync(path.join(__dirname, "holdout-questions.json")))];
const ans = JSON.parse(fs.readFileSync(path.join(__dirname, "answers.json")));
const detail = process.argv.includes("--detail");
const ORDER = ["excellent", "good", "partial", "rambling", "wrong", "keyword_salad"];
const rows = [];
for (const a of ans) {
  const q = qs.find(z => z.id === a.id) || x.byId(a.id);
  const secs = Math.round(a.answer.split(/\s+/).length / 2.4);
  const r = x.Coach.analyze(q, a.answer, secs);
  rows.push({...a, t: q.t, score: r.overall, sub: r.scores, caught: r.corrections.length, ok: r.overall >= a.min && r.overall <= a.max, r});
}
const by = v => rows.filter(r => r.variant === v);
console.log("variant        mean  in-band  (band)");
for (const v of ORDER) { const g = by(v); if (!g.length) continue;
  const m = g.reduce((s, r) => s + r.score, 0) / g.length;
  console.log(v.padEnd(14), m.toFixed(2).padStart(5), `${g.filter(r => r.ok).length}/${g.length}`.padStart(8), ` (${g[0].min}-${g[0].max})`); }
// pairwise ordering within each question
const pairs = [["excellent","good"],["excellent","partial"],["good","partial"],["excellent","wrong"],["good","wrong"],["partial","keyword_salad"],["excellent","keyword_salad"],["excellent","rambling"]];
let agree = 0, ties = 0, tot = 0;
for (const id of new Set(rows.map(r => r.id))) for (const [hi, lo] of pairs) {
  const a = rows.find(r => r.id === id && r.variant === hi), b = rows.find(r => r.id === id && r.variant === lo);
  if (!a || !b) continue; tot++; if (a.score > b.score) agree++; else if (a.score === b.score) ties++; }
console.log(`ordering: ${agree}/${tot} correct, ${ties} ties`);
const w = by("wrong").filter(r => r.t !== "beh");
console.log(`technical errors caught: ${w.filter(r => r.caught).length}/${w.length}`);
const wb = by("wrong").filter(r => r.t === "beh");
console.log(`behavioral red flags flagged: ${wb.filter(r => r.r.fixes.some(f => f.sev >= 3)).length}/${wb.length}`);
console.log(`overall in-band: ${rows.filter(r => r.ok).length}/${rows.length}`);
if (detail) for (const r of rows.filter(r => !r.ok)) console.log(`  ${r.id.padEnd(16)} ${r.variant.padEnd(13)} got ${r.score} want ${r.min}-${r.max}  c${r.sub.content} a${r.sub.accuracy} s${r.sub.structure} k${r.sub.concision} d${r.sub.delivery}`);
module.exports = rows;
