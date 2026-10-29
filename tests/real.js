// Caleb's real spoken answers (from his practice log), each with a hand-graded fair band:  node tests/real.js [--detail]
const x = require("./load.js"), fs = require("fs"), path = require("path");
const set = JSON.parse(fs.readFileSync(path.join(__dirname, "real-answers.json")));
let ok = 0;
for (const a of set){
  const q = x.byId(a.id), r = x.Coach.analyze(q, a.answer, Math.round(a.answer.split(/\s+/).length / 2.4));
  const pass = r.overall >= a.min && r.overall <= a.max; if (pass) ok++;
  if (!pass || process.argv.includes("--detail")) console.log((pass ? "ok  " : "OFF ") + a.id.padEnd(18) + String(r.overall).padStart(3) + `  want ${a.min}-${a.max}  c${r.scores.content} a${r.scores.accuracy} | ` + (r.caps[0] ? "held: " + r.caps[0].why : "") + (r.corrections.length ? " | errors: " + r.corrections.map(c => c.slice(0, 50)).join(" / ") : "") + "\n      " + a.why);
}
console.log(`real answers in their fair band: ${ok}/${set.length}`);
