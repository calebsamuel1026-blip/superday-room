// False-correction sweep: run the predictor over every written model answer (correct English).
// Every change it makes is a mistake.   node tests/predictor-sweep.js
const fs = require("fs"), vm = require("vm"), path = require("path"); const x = require("./load.js");
const src = fs.readFileSync(path.join(__dirname, "..", "src", "app.js"), "utf8");
const a = src.indexOf("/* ---------- Smart term predictor"), b = src.indexOf("// Chrome can be told");
const say = JSON.parse(/^const SAY_BANK = (.*);$/m.exec(fs.readFileSync(path.join(__dirname, "..", "src", "data-say.js"), "utf8"))[1]);
const ctx = {SAY: say, store: {get: (k, d) => d, set: () => {}}}; vm.createContext(ctx); vm.runInContext(src.slice(a, b) + ";globalThis.P=predictTerms;", ctx);
let changed = 0, words = 0, wordChanges = 0; const ex = {}; const t0 = Date.now();
for (const [id, text] of Object.entries(say)){
  const low = text, out = ctx.P(low, x.byId(id));
  const A = low.split(/\s+/), B = out.split(/\s+/); words += A.length;
  if (out.replace(/\s+/g, " ") !== low.replace(/\s+/g, " ")){
    changed++;
    for (let i = 0, j = 0; i < A.length && j < B.length; i++, j++) if (A[i] !== B[j]){ wordChanges++; const k = A.slice(i, i + 3).join(" ") + "  ->  " + B[j]; ex[k] = (ex[k] || 0) + 1; break; }
  }
}
console.log(`ms per answer: ${((Date.now() - t0) / Object.keys(say).length).toFixed(1)} | answers changed: ${changed} of ${Object.keys(say).length} | words: ${words}`);
console.log(Object.entries(ex).sort((p, q) => q[1] - p[1]).slice(0, 30).map(e => `${e[1]}x  ${e[0]}`).join("\n"));
