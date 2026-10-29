// Loads the question banks and the engine into Node for testing.
const fs = require("fs"), path = require("path"), vm = require("vm");
const SRC = path.join(__dirname, "..", "src");
const ctx = {module: {}, console};
vm.createContext(ctx);
for (const f of ["data.js", "data-guides.js", "engine.js"]) {
  const p = path.join(SRC, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8") + "\n;globalThis.__x = {BANK: typeof BANK!=='undefined'?BANK:[], PRACTICE: typeof PRACTICE_BANK!=='undefined'?PRACTICE_BANK:[], GUIDES: typeof GUIDE_BANK!=='undefined'?GUIDE_BANK:[], Coach: typeof Coach!=='undefined'?Coach:null};", ctx, {filename: f});
}
const x = ctx.__x;
x.all = [...x.BANK, ...x.PRACTICE, ...x.GUIDES];
x.byId = id => x.all.find(q => q.id === id);
module.exports = x;
