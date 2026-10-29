// Spoken-style answers (plain words, own phrasing, some with one real mistake) with the band an
// interviewer would give:  node tests/interviewer.js [--holdout] [--detail]  (tune on the main set, check on --holdout)
const x = require("./load.js"), fs = require("fs"), path = require("path");
const file = process.argv.includes("--holdout") ? "interviewer-holdout.json" : "interviewer-answers.json";
const set = JSON.parse(fs.readFileSync(path.join(__dirname, file)));
let ok = 0, good = 0, goodOk = 0, bad = 0, badOk = 0;
for (const a of set){
  const q = x.byId(a.id), r = x.Coach.analyze(q, a.answer, Math.round(a.answer.split(/\s+/).length / 2.4));
  const pass = r.overall >= a.min && r.overall <= a.max; if (pass) ok++;
  if (a.min >= 7){ good++; if (pass) goodOk++; } else { bad++; if (pass) badOk++; }
  if (!pass || process.argv.includes("--detail")) console.log((pass ? "ok  " : "OFF ") + a.id.padEnd(11) + String(r.overall).padStart(3) + `  want ${a.min}-${a.max}  c${r.scores.content} a${r.scores.accuracy} | ` + (r.caps[0] ? "held: " + r.caps[0].why : "") + (r.corrections.length ? " | errors: " + r.corrections.map(c => c.slice(0, 60)).join(" / ") : "") + "\n      " + a.why);
}
console.log(`interviewer set: ${ok}/${set.length} in band (correct answers ${goodOk}/${good}, flawed answers ${badOk}/${bad})`);
