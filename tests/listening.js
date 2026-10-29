// Tests for the listening pipeline in src/app.js (merge, dictionary, cleanup guards):  node tests/listening.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const x = require("./load.js");
const src = fs.readFileSync(path.join(__dirname, "..", "src", "app.js"), "utf8");
const slice = (a, b) => src.slice(src.indexOf(a), src.indexOf(b));
const mem = {};
const ctx = {SAY: {}, apiKey: "", sample: null, settings: {}, store: {get: (k, d) => mem[k] ?? d, set: (k, v) => { mem[k] = v; }}};
vm.createContext(ctx);
vm.runInContext(
  slice("const TERM_FIXES", "// Chrome can be told") +
  ";globalThis.T = {fuse: fuseTranscripts, learn: learnFromEdit, dict: applyDictionary, check: checkCleanup, polish: polishTranscript};", ctx);
const T = ctx.T;
let pass = 0, total = 0;
const eq = (name, got, want) => { total++; const ok = got === want; if (ok) pass++; console.log(ok ? "ok  " : "FAIL", name, ok ? "" : `\n     got  ${JSON.stringify(got)}\n     want ${JSON.stringify(want)}`); };

// 1. Merge: Chrome heard the expected term where Whisper heard a wrong word.
const lbo = x.byId("d2");
eq("merge takes Chrome's expected term", T.fuse("Leverage boosts the herb because the equity check is smaller.", "leverage boosts the irr because the equity check is smaller", lbo),
   "Leverage boosts the IRR because the equity check is smaller.");
eq("merge leaves agreeing text alone", T.fuse("Debt paydown increases equity value over time.", "debt paydown increases equity value over time", lbo),
   "Debt paydown increases equity value over time.");
eq("merge restores a phrase Whisper skipped", T.fuse("You project free cash flow, then you discount it back.", "you project free cash flow for five to ten years then you discount it back", x.byId("v1")),
   "You project free cash flow, for five to ten years then you discount it back.");
eq("merge ignores Chrome's plain-English guesses", T.fuse("Interest is tax-deductible, which lowers the cost.", "interest is tax deductible which lowers the coast", lbo),
   "Interest is tax-deductible, which lowers the cost.");

// 2. Dictionary: a correction you type is applied next time; plain-English edits are not learned.
T.learn("the sponsor uses a bridge loan from the Rev Oliver", "the sponsor uses a bridge loan from the revolver");
eq("dictionary applies a learned fix", T.dict("they drew down the Rev Oliver last year"), "they drew down the revolver last year");
T.learn("I think the company is great", "I believe the company is great");
eq("dictionary skips single plain-English swaps", T.dict("I think so"), "I think so");

// 3. Cleanup guards: a real fix passes; rewrites, dropped fillers and added words are rejected.
const orig = "Um, so leverage boosts the herb because, like, the equity check is smaller.";
const ok = T.check(orig, {text: "Um, so leverage boosts the IRR because, like, the equity check is smaller.", changes: [{from: "herb", to: "IRR"}]});
eq("cleanup keeps a word fix", ok && ok.text, "Um, so leverage boosts the IRR because, like, the equity check is smaller.");
eq("cleanup rejects removed fillers", T.check(orig, {text: "So leverage boosts the IRR because the equity check is smaller.", changes: []}), null);
eq("cleanup rejects a rewrite", T.check(orig, {text: "Um, leverage magnifies returns since the sponsor contributes less equity, like, overall.", changes: []}), null);
eq("cleanup rejects added content", T.check(orig, {text: orig + " It also adds a tax shield because interest is tax deductible and lowers taxes.", changes: []}), null);
console.log(`${pass}/${total} passed`);
