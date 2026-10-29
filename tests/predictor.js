// Tests for the smart term predictor in src/app.js:  node tests/predictor.js
// Mishearings must be fixed; ordinary English must come through unchanged.
const fs = require("fs"), path = require("path"), vm = require("vm");
const x = require("./load.js");
const src = fs.readFileSync(path.join(__dirname, "..", "src", "app.js"), "utf8");
const a = src.indexOf("/* ---------- Smart term predictor"), b = src.indexOf("// Chrome can be told");
const fixA = src.indexOf("const TERM_FIXES"), fixB = src.indexOf("function fixTerms");
const ctx = {SAY: {}, store: {get: (k, d) => d, set: () => {}}};
vm.createContext(ctx);
vm.runInContext(src.slice(fixA, fixB) + src.slice(fixB, src.indexOf("\n", fixB) + 1) + src.slice(a, b) + "\n;globalThis.P = predictTerms; globalThis.F = fixTerms;", ctx);
const q = id => x.byId(id) || null;
const cases = [
  // [question id, heard, expected]
  ["v1", "then you discount it back at the whack", "then you discount it back at the WACC"],
  ["v1", "you take e bit da and subtract cap ex", "you take EBITDA and subtract CapEx"],
  ["v1", "the terminal value uses the gordon grove method", "the terminal value uses the Gordon Growth method"],
  ["a20", "on the cash flow statement you add back the depriciation", "on the cash flow statement you add back the depreciation"],
  ["a20", "pp and e goes down and a mortization is non cash", "PP&E goes down and amortization is non cash"],
  ["d1", "the sponsor puts in equity and raises mezz a nine debt", "the sponsor puts in equity and raises mezzanine debt"],
  ["d1", "we look at the moyk and the i r r", "we look at the MOIC and the IRR"],
  ["q-0041", "goodwill is tested for im pairment every year", "goodwill is tested for impairment every year"],
  // must NOT change
  ["v1", "I would like to walk you through it", "I would like to walk you through it"],
  ["a20", "the company has a creative marketing team", "the company has a creative marketing team"],
  ["b2", "I want to work on deals and learn quickly", "I want to work on deals and learn quickly"],
  ["b7", "my teammate and I had a gap in the schedule so we met at the cafe", "my teammate and I had a gap in the schedule so we met at the cafe"],
  ["v2", "equity value is what common shareholders own", "equity value is what common shareholders own"],
];
let pass = 0;
for (const [id, heard, want] of cases){
  const got = ctx.P(ctx.F(heard), q(id));
  const ok = got === want; if (ok) pass++;
  console.log(ok ? "ok  " : "FAIL", id.padEnd(8), JSON.stringify(heard), "->", JSON.stringify(got), ok ? "" : "   want " + JSON.stringify(want));
}
console.log(`${pass}/${cases.length} passed`);
// Real Whisper mishearings from tests/speech (clips), must be fixed or left alone.
for (const [heard, want] of [
  ["In a leveraged buyout, the firm funds the purchase", "In a leveraged buyout, the firm funds the purchase"],
  ["Leverage magnifies the herb because the equity check is smaller.", "Leverage magnifies the IRR because the equity check is smaller."],
  ["Leverage magnifies the ir because the equity check is smaller.", "Leverage magnifies the IRR because the equity check is smaller."],
  ["the herb garden needs water", "the herb garden needs water"],
]){ const got = ctx.P(ctx.F(heard), null); console.log(got === want ? "ok  " : "FAIL", JSON.stringify(heard), "->", JSON.stringify(got)); }
