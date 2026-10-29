// Short, correct answers to simple questions must score 7 or more:  node tests/concise.js [--detail]
const x = require("./load.js"), fs = require("fs"), path = require("path");
const ans = JSON.parse(fs.readFileSync(path.join(__dirname, "concise-answers.json")));
const frozen = JSON.parse(fs.readFileSync(path.join(__dirname, "concise-questions.json")));
let ok = 0;
for (const a of ans){
  const q = frozen.find(z => z.id === a.id) || x.byId(a.id);
  const r = x.Coach.analyze(q, a.answer, Math.round(a.answer.split(/\s+/).length / 2.4));
  const pass = r.overall >= a.min; if (pass) ok++;
  if (process.argv.includes("--detail") || !pass) console.log((pass ? "ok  " : "LOW ") + a.id.padEnd(17) + String(r.overall).padStart(3) + "  c" + r.scores.content + " | " + (r.caps[0] ? "held: " + r.caps[0].why + " | " : "") + r.coverage.map(p => p.status[0] + (p.core === false ? "*" : "")).join(""));
}
console.log(`concise answers at 7+: ${ok}/${ans.length}`);
