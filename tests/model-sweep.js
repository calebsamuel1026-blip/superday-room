// Every written model answer is a correct answer: it should score high and never be marked wrong.
// node tests/model-sweep.js [--list]    (2,597 technical answers; a few seconds)
const x = require("./load.js"), fs = require("fs"), path = require("path"), vm = require("vm");
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "src", "data-say.js"), "utf8") + ";globalThis.S = SAY_BANK;", ctx);
let n = 0, wrongErr = 0, low = 0; const list = [];
for (const q of x.all){
  const a = ctx.S[q.id]; if (!a || q.t === "beh") continue; n++;
  const r = x.Coach.analyze(q, a, Math.round(a.split(/\s+/).length / 2.4));
  if (r.corrections.length) wrongErr++;
  if (r.overall <= 6){ low++; list.push(`${q.id} ${r.overall} ${(r.caps[0] || {}).why || ""} ${r.corrections[0] ? "| " + r.corrections[0].slice(0, 70) : ""}`); }
}
if (process.argv.includes("--list")) list.forEach(l => console.log(l));
console.log(`model answers: ${n} | marked with a factual error: ${wrongErr} | scored 6 or less: ${low}`);
