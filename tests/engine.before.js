/* ==========================================================================
   Interview Coach engine — runs fully offline.
   analyze(question, answer, seconds) -> report
   Scores content against the answer key, catches common factual mistakes,
   and coaches delivery: filler, hedging, rambling, structure, wording, STAR.
   ========================================================================== */
const Coach = (() => {

/* ---------- Normalisation ---------- */
// Finance phrases -> one canonical token, so "PP and E", "PP&E" and
// "property plant and equipment" all match each other.
const PHRASES = [
  [/\bdepreciation (?:and|&) amortization\b|\bd ?(?:&|and|n) ?a\b/g, " da "],
  [/\bproperty,? plant,? (?:and|&) equipment\b|\bpp ?(?:&|and|n) ?e\b|\bppe\b/g, " ppe "],
  [/\baccounts receivables?\b|\ba\/r\b|\breceivables\b/g, " ar "],
  [/\baccounts payables?\b|\ba\/p\b|\bpayables\b/g, " ap "],
  [/\baccrued (?:expenses|liabilities)\b|\baccruals\b/g, " accrued "],
  [/\bdeferred revenues?\b|\bunearned revenues?\b/g, " deferredrevenue "],
  [/\bdeferred tax liabilit(?:y|ies)\b|\bdtls?\b/g, " dtl "],
  [/\bdeferred tax assets?\b|\bdtas?\b/g, " dta "],
  [/\bnet operating loss(?:es)?\b|\bnols?\b/g, " nol "],
  [/\bnet income\b|\bnet earnings\b|\bbottom line\b/g, " netincome "],
  [/\bincome statement\b|\bp ?(?:&|and|n) ?l\b|\bprofit and loss(?: statement)?\b/g, " incomestatement "],
  [/\bbalance sheet\b/g, " balancesheet "],
  [/\bcash flow statement\b|\bstatement of cash flows\b|\bcfs\b/g, " cfs "],
  [/\bcash flow from operations\b|\bcash flows? from operating(?: activities)?\b|\boperating cash flow\b|\bcfo\b/g, " cfo "],
  [/\bcash flow from investing(?: activities)?\b|\binvesting cash flow\b|\bcfi\b/g, " cfi "],
  [/\bcash flow from financing(?: activities)?\b|\bfinancing cash flow\b|\bcff\b/g, " cff "],
  [/\bshareholders'? equity\b|\bstockholders'? equity\b|\bowners'? equity\b|\bbook value of equity\b/g, " shequity "],
  [/\bretained earnings\b/g, " retainedearnings "],
  [/\badditional paid[- ]in capital\b|\bapic\b/g, " apic "],
  [/\btreasury stock\b|\bshare (?:buybacks?|repurchases?)\b|\bstock buybacks?\b/g, " treasury "],
  [/\bstock[- ]based comp(?:ensation)?\b|\bsbc\b/g, " sbc "],
  [/\bcapital expenditures?\b|\bcap ?ex\b/g, " capex "],
  [/\bnet working capital\b|\bworking capital\b|\bnwc\b/g, " nwc "],
  [/\bcost of goods sold\b|\bcogs\b|\bcost of sales\b/g, " cogs "],
  [/\bselling,? general (?:and|&) administrative\b|\bsg ?(?:&|and) ?a\b/g, " sga "],
  [/\bearnings before interest,? taxes,? depreciation,? (?:and|&) amortization\b|\be ?bit ?da\b|\bebitda\b/g, " ebitda "],
  [/\bearnings before interest (?:and|&) taxes\b|\boperating income\b|\boperating profit\b|\bebit\b/g, " ebit "],
  [/\benterprise value\b|\bev\b|\bfirm value\b|\btransaction value\b/g, " ev "],
  [/\bequity value\b|\bmarket cap(?:italization)?\b|\bmarket value of equity\b/g, " equityvalue "],
  [/\bweighted average cost of capital\b|\bwacc\b|\bwhack\b/g, " wacc "],
  [/\bcost of equity\b/g, " costequity "],
  [/\bcost of debt\b/g, " costdebt "],
  [/\bcapital asset pricing model\b|\bcapm\b|\bcap m\b/g, " capm "],
  [/\bequity risk premium\b|\bmarket risk premium\b|\berp\b/g, " erp "],
  [/\brisk[- ]free rate\b/g, " riskfree "],
  [/\bfree cash flow\b|\bfcf\b|\bufcf\b|\blfcf\b/g, " fcf "],
  [/\bterminal value\b|\bexit value\b/g, " terminalvalue "],
  [/\bperpetuity growth\b|\bgordon growth\b|\bperpetual growth\b/g, " gordon "],
  [/\bexit multiples?\b|\bmultiples method\b/g, " exitmultiple "],
  [/\bdiscounted cash flows?\b|\bdcf\b/g, " dcf "],
  [/\bleveraged buy ?outs?\b|\blbos?\b/g, " lbo "],
  [/\binternal rate of return\b|\birr\b/g, " irr "],
  [/\bmultiple of (?:invested capital|money)\b|\bmoic\b|\bcash[- ]on[- ]cash\b/g, " moic "],
  [/\bmergers? (?:and|&) acquisitions?\b|\bm ?(?:&|and|n) ?a\b/g, " mna "],
  [/\bprice[- ]to[- ]earnings\b|\bp ?\/ ?e\b|\bpe ratio\b|\bp e\b/g, " pe "],
  [/\bearnings per share\b|\beps\b/g, " eps "],
  [/\bnet operating profit after tax(?:es)?\b|\bnopat\b/g, " nopat "],
  [/\bcomparable compan(?:y|ies)\b|\btrading comps?\b|\bpublic comps?\b|\bcomps\b/g, " comps "],
  [/\bprecedent transactions?\b|\bprecedents\b|\btransaction comps\b|\bdeal comps\b/g, " precedents "],
  [/\bsources (?:and|&) uses\b/g, " sourcesuses "],
  [/\bnon[- ]?controlling interests?\b|\bminority interests?\b|\bnci\b/g, " nci "],
  [/\bpreferred (?:stock|equity|shares)\b/g, " preferred "],
  [/\bgoodwill\b/g, " goodwill "],
  [/\bintangible assets?\b|\bintangibles\b/g, " intangibles "],
  [/\binterest expense\b/g, " interestexpense "],
  [/\bdividends?\b/g, " dividend "],
  [/\brevolving credit facility\b|\brevolver\b/g, " revolver "],
  [/\bsynerg(?:y|ies)\b/g, " synergy "],
  [/\baccretive\b|\baccretion\b/g, " accretive "],
  [/\bdilutive\b|\bdilution\b/g, " dilutive "],
  [/\bpre[- ]?tax income\b|\bearnings before tax(?:es)?\b|\bebt\b/g, " pretax "],
  [/\bfederal reserve\b|\bthe fed\b/g, " fed "],
  [/\binterest rates?\b/g, " rates "],
  [/\bper ?cent\b|%/g, " percent "],
  // behavioral concepts
  [/\bempath\w*|\blisten\w*|\b(?:their|his|her|the other) (?:side|perspective|point of view)\b|\bunderstood (?:why|what|that|where)\b|\bperspective\b/g, " empathy "],
  [/\blessons?\b|\bi learned\b|\blearned\b|\btakeaways?\b|\btaught me\b/g, " lesson "],
  [/\bas a result\b|\boutcomes?\b|\bin the end\b|\bended up\b/g, " outcome "],
  [/\bresolv\w*|\bresolution\b|\bcompromis\w*|\bworked it out\b/g, " resolve "],
];
const DIR_UP = /^(?:up|increase[sd]?|increasing|rise[sn]?|rising|rose|grow[sn]?|grew|growing|higher|goes up|gain|gains|plus|positive|add|adds|added|boost)$/;
const DIR_DOWN = /^(?:down|decrease[sd]?|decreasing|fall[sn]?|falling|fell|decline[sd]?|declining|drop[sp]?(?:ed)?|lower|reduce[sd]?|reducing|minus|negative|subtract(?:s|ed)?|less|loss|losses|shrink[s]?)$/;
const NUMWORDS = {zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100};
const STOP = new Set(("a an the and or but if then so of to in on at by for with from as is are was were be been being it its it's this that these those there their they them we our you your i me my he she his her not no do does did done have has had will would can could should may might also just than too very more most such into over under about out up down off per via each any all both some other own same only i'm we're you're it'll which who whom what when where why how while because also e.g eg i.e ie etc vs versus like using use used one".split(" ")).filter(w=>w!=="up"&&w!=="down"&&w!=="not"&&w!=="no"));

function wordsToNumbers(s){
  // "forty" -> 40, "a hundred" -> 100, "one point five" -> 1.5, "ten dollars" -> 10
  return s.replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[- ](one|two|three|four|five|six|seven|eight|nine)\b/g,(m,a,b)=>String(NUMWORDS[a]+NUMWORDS[b]))
          .replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten|a) hundred\b/g,(m,a)=>String((a==="a"?1:NUMWORDS[a])*100))
          .replace(/\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)\b/g,m=>String(NUMWORDS[m]))
          .replace(/\b(\d+) point (\d+)\b/g,"$1.$2");
}
function normalize(text){
  let s = " " + String(text||"")
    .replace(/\bIS\b/g," income statement ").replace(/\bBS\b/g," balance sheet ")
    .replace(/\bNI\b/g," net income ").replace(/\bOI\b/g," operating income ")
    .replace(/\bTV\b/g," terminal value ").replace(/\bCF\b/g," cash flow ")
    .toLowerCase()
    .replace(/[’‘]/g,"'").replace(/[–—−]/g," - ")
    .replace(/\$\s?(\d)/g,"$1").replace(/(\d),(\d{3})/g,"$1$2")
    .replace(/(\d)\s?(k|m|mm|bn|b)\b/g,"$1 $2")
    .replace(/\bdollars?\b|\bbucks?\b|\busd\b/g," ") + " ";
  s = wordsToNumbers(s);
  for (const [re, rep] of PHRASES) s = s.replace(re, rep);
  return s.replace(/[^a-z0-9.%\s]/g," ").replace(/(\D)\.|\.(\D)/g,"$1 $2").replace(/\s+/g," ").trim();
}
function stem(w){
  if (/^\d/.test(w) || w.length <= 4) return w;
  return w.replace(/(?:ational|ization|ations|ation|ingly|ments|ment|ness|ities|ity|ings|ing|edly|ies|ied|ed|es|ly|s)$/,"")
          .replace(/(.)\1$/,"$1");
}
const DOMAIN = new Set(["da","ppe","ar","ap","accrued","deferredrevenue","dtl","dta","nol","netincome","incomestatement","balancesheet","cfs","cfo","cfi","cff","shequity","retainedearnings","apic","treasury","sbc","capex","nwc","cogs","sga","ebitda","ebit","ev","equityvalue","wacc","costequity","costdebt","capm","erp","riskfree","fcf","terminalvalue","gordon","exitmultiple","dcf","lbo","irr","moic","mna","pe","eps","nopat","comps","precedents","sourcesuses","nci","preferred","goodwill","intangibles","interestexpense","dividend","revolver","synergy","accretive","dilutive","pretax","beta","inventory","cash","debt","equity","revenue","tax","taxes","interest","depreciation","amortization","impairment","premium","leverage","multiple","discount","growth","margin","valuation","asset","liability","liabilities","assets","fed","rates","inflation","yield","spread","bond","coupon","duration","convexity"]);
function tokens(text){ return normalize(text).split(" ").filter(Boolean); }
function sigTokens(text){
  return tokens(text).filter(w => !STOP.has(w) && (w.length > 2 || DOMAIN.has(w) || /^\d/.test(w))).map(stem);
}

/* ---------- Answer-key parsing ---------- */
function keyPoints(q){
  const raw = (q.k || []).map(x => String(x).trim()).filter(Boolean);
  const pts = [];
  for (let i = 0; i < raw.length; i++){
    const line = raw[i];
    // "The three statements are:" style lead-ins carry no content of their own.
    if (/:$/.test(line) && line.split(/\s+/).length <= 10) continue;
    const toks = [...new Set(sigTokens(line))];
    if (!toks.length) continue;
    pts.push({text: line, toks, label: shortLabel(line)});
  }
  return pts;
}
function shortLabel(line){
  const head = line.split(/[:–—]| - /)[0].trim();
  return head.length > 4 && head.length < 60 ? head : line.slice(0, 70) + (line.length > 70 ? "…" : "");
}
const META = new Set(["star","structur","structure","show","specific","concret","concrete","exampl","example","avoid","mention","answer","clear","strong","good","candidat","interview","interviewer","explain","demonstr","highlight","discuss","brief","briefly","emphas","ensur","focus","includ","situat","task","action","result","quantifi","possibl","sound","real","genuin","persona","relev","relevant","detail","short","long","generic","answers"].map(stem));
const GENERIC = new Set(["detail","details","compan","company","show","shows","present","presents","categoriz","categorized","includ","includes","typic","typically","general","main","key","overall","firm","business","busines","provid","provides","certain","various","specif","specific","particular","usual","usually","differ","different","import","important","term","terms","way","ways","make","makes","impact","affect","affects","help","helps"].map(stem));
function weightOf(t){ return DOMAIN.has(t) || /^\d/.test(t) ? 2 : GENERIC.has(t) ? 0.35 : 1; }

/* ---------- Content coverage ---------- */
function lev1(a,b){ // edit distance <= 1, cheap
  if (Math.abs(a.length-b.length) > 1) return false;
  let i=0,j=0,e=0;
  while(i<a.length && j<b.length){ if(a[i]===b[j]){i++;j++;continue;} if(++e>1) return false; if(a.length>b.length) i++; else if(b.length>a.length) j++; else {i++;j++;} }
  return e + (a.length-i) + (b.length-j) <= 1;
}
function hasTok(set, arr, t){
  if (set.has(t)) return true;
  if (t.length >= 6 && !/^\d/.test(t)) return arr.some(x => x.length >= 5 && lev1(x, t));
  return false;
}
function coverage(points, ansToks){
  const set = new Set(ansToks), arr = [...set];
  return points.map(p => {
    let tot = 0, got = 0; const hit = [], miss = [];
    for (const t of p.toks){ const w = weightOf(t); tot += w; if (hasTok(set, arr, t)){ got += w; hit.push(t); } else miss.push(t); }
    const ratio = tot ? got / tot : 0;
    const need = p.toks.length <= 3 ? 0.99 : p.toks.length <= 6 ? 0.6 : 0.5;
    const status = ratio >= need ? "hit" : ratio >= need * 0.5 ? "partial" : "miss";
    return {...p, ratio, status, hit, miss};
  });
}

/* ---------- Sentences ---------- */
function sentences(text){
  const t = String(text).replace(/\s+/g," ").trim();
  if (!t) return [];
  let parts = t.split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/);
  // Speech-to-text often has no punctuation: chunk on discourse markers instead.
  if (parts.length === 1 && t.split(" ").length > 35){
    parts = t.split(/\s+(?=(?:so|and then|then|next|after that|finally|also|but|because|which means|that means|first|second|third|lastly)\b)/i);
    const merged = []; let buf = "";
    for (const p of parts){ buf = buf ? buf + " " + p : p; if (buf.split(" ").length >= 10){ merged.push(buf); buf = ""; } }
    if (buf) merged.length ? merged[merged.length-1] += " " + buf : merged.push(buf);
    parts = merged;
  }
  return parts.map(s => s.trim()).filter(Boolean);
}
const wc = s => (String(s).match(/\S+/g) || []).length;

/* ---------- Delivery patterns ---------- */
const FILLERS = [
  {re:/\b(?:um+|uh+|uhm+|erm+|er|ah+|hmm+|mm+)\b/gi, label:"um / uh"},
  {re:/\byou know\b(?! (?:what|how|that|the|if|when|why|where))/gi, label:"you know"},
  {re:/\bi mean\b/gi, label:"I mean"},
  {re:/\bbasically\b/gi, label:"basically"},
  {re:/\bliterally\b/gi, label:"literally"},
  {re:/\bactually\b/gi, label:"actually"},
  {re:/\b(?:kind|sort) of\b(?= (?:like|a|an|the|just|\w+(?:ing|ed)\b))/gi, label:"kind of / sort of"},
  {re:/(?:^|[,.]\s*|\b(?:and|so|but|was|is|it's|were|just|um|uh)\s+)like\b(?!\s+(?:to|the way|this|that|a|an|it|them|him|her|me|us|you|i|we|they)\b)/gi, label:"like"},
  {re:/\bso yeah\b|\byeah so\b/gi, label:"so yeah"},
  {re:/\bor something(?: like that)?\b|\band stuff\b|\band things like that\b|\bor whatever\b|\bblah blah\b/gi, label:"or something / and stuff"},
  {re:/\bright\?/gi, label:"right?"},
  {re:/\bokay so\b|\balright so\b/gi, label:"okay so"},
  {re:/\bpretty much\b/gi, label:"pretty much"},
];
const HEDGES = [
  {re:/\bi think\b/gi, label:"I think"}, {re:/\bi guess\b/gi, label:"I guess"},
  {re:/\bi believe\b/gi, label:"I believe"}, {re:/\bi feel like\b/gi, label:"I feel like"},
  {re:/\bmaybe\b/gi, label:"maybe"}, {re:/\bprobably\b/gi, label:"probably"},
  {re:/\bi'?m not (?:100% |a hundred percent |totally |completely |really )?sure\b|\bnot sure\b/gi, label:"I'm not sure"},
  {re:/\bi don'?t (?:really )?know\b/gi, label:"I don't know"},
  {re:/\bmight be\b|\bcould be\b/gi, label:"might / could be"},
  {re:/\bif (?:that|this) makes sense\b|\bdoes (?:that|this) make sense\b/gi, label:"if that makes sense"},
  {re:/\bhopefully\b/gi, label:"hopefully"}, {re:/\bi would say\b|\bi'd say\b/gi, label:"I'd say"},
  {re:/\bsomewhat\b|\bkinda\b|\bsorta\b/gi, label:"somewhat / kinda"},
];
const WORDING = [
  {re:/\b(?:a lot of|lots of|tons of|a bunch of)\b/gi, from:"a lot of", to:"a number: “three”, “40%”, “$2M”", why:"Vague quantity. Bankers trust numbers."},
  {re:/\bstuff\b|\bthings\b/gi, from:"stuff / things", to:"name the item: “working capital”, “the debt schedule”", why:"Generic nouns sound like you don't know the specific term."},
  {re:/\bgonna\b/gi, from:"gonna", to:"going to / will", why:"Too casual for a superday."},
  {re:/\bwanna\b/gi, from:"wanna", to:"want to", why:"Too casual for a superday."},
  {re:/\bgotta\b/gi, from:"gotta", to:"have to / need to", why:"Too casual for a superday."},
  {re:/\byou guys\b/gi, from:"you guys", to:"your team / the firm", why:"Too casual for an interviewer."},
  {re:/\bobviously\b/gi, from:"obviously", to:"(cut it)", why:"Can sound condescending, and if it were obvious they wouldn't ask."},
  {re:/\bjust\b/gi, from:"just", to:"(cut it)", why:"Minimises what you did or said."},
  {re:/\breally\b|\bvery\b|\bsuper\b/gi, from:"really / very / super", to:"a stronger single word or a number", why:"Intensifiers add length, not meaning."},
  {re:/\btry(?:ing)? to\b/gi, from:"try to", to:"state what you do or did", why:"Signals you didn't follow through."},
  {re:/\bhelped (?:with|out)\b/gi, from:"helped with", to:"a concrete verb: built, led, analysed, drafted", why:"Says nothing about what YOU did."},
  {re:/\bworked on\b/gi, from:"worked on", to:"built / modelled / owned / delivered", why:"Weak verb; it hides your contribution."},
  {re:/\bresponsible for\b/gi, from:"responsible for", to:"what you actually did and the result", why:"Duties aren't results."},
  {re:/\bpassionate\b/gi, from:"passionate", to:"proof: what you did because you cared", why:"Every candidate says it; show it instead."},
  {re:/\bthat'?s a (?:great|good) question\b|\bgreat question\b|\bgood question\b/gi, from:"great question", to:"(start with the answer)", why:"Stalling filler. Interviewers notice."},
  {re:/\bsorry\b/gi, from:"sorry", to:"(drop it; pause, then restate)", why:"Apologising undercuts confidence."},
  {re:/\bto be honest\b|\bhonestly\b|\bto tell (?:you )?the truth\b/gi, from:"honestly", to:"(cut it)", why:"Implies your other answers weren't honest."},
  {re:/\bin order to\b/gi, from:"in order to", to:"to", why:"Same meaning, fewer words."},
  {re:/\bdue to the fact that\b/gi, from:"due to the fact that", to:"because", why:"Same meaning, fewer words."},
  {re:/\bat the end of the day\b/gi, from:"at the end of the day", to:"ultimately / (cut it)", why:"Cliché."},
  {re:/\bgoes away\b|\bdisappears\b/gi, from:"goes away", to:"flows to / is offset by / decreases by $X", why:"Name exactly where it moves on the statements."},
];
const RESTARTS = /\b(?:wait|no wait|let me (?:rephrase|restart|start over|think)|scratch that|actually no|i mean no|hold on|where was i)\b/gi;
const TRAIL = /(?:so yeah|and stuff|or something|i guess|etc\.?|and so on|whatever|yeah)\W*$/i;
const OPENER_WEAK = /^(?:\W*(?:um+|uh+|so+|well|okay|ok|alright|yeah|hmm+|great question|good question|that'?s a (?:great|good) question|basically|i think|i guess|let me think)\b)+/i;

function findAll(text, list){
  const out = [];
  for (const f of list){ f.re.lastIndex = 0; let m; while ((m = f.re.exec(text))){ out.push({i:m.index, len:m[0].length, text:m[0], label:f.label || f.from, rule:f}); if (!f.re.global) break; } }
  return out.sort((a,b)=>a.i-b.i);
}
function repeatedPhrases(text){
  const w = tokens(text).filter(x=>!STOP.has(x));
  const seen = {}, rep = new Set();
  for (let i = 0; i + 3 <= w.length; i++){ const g = w.slice(i,i+3).join(" "); if (/\d/.test(g)) continue; seen[g] = (seen[g]||0)+1; if (seen[g] === 2) rep.add(g); }
  return [...rep];
}

/* ---------- Common factual mistakes (technical) ---------- */
// Each rule: pattern in the normalised answer, optional "unless" (negation
// present nearby means they said it correctly), and the correction.
const NEG = "(?:not|n't|never|no|doesn t|don t|isn t|aren t|won t|cannot|can t)";
const M = (re, fix, opts={}) => ({re: new RegExp(re), fix, ...opts});
const MISTAKES = [
  M("goodwill (?:\\w+ ){0,4}(?:amortiz|gets amortiz|is amortiz)", "Goodwill is NOT amortized under US GAAP. It stays on the balance sheet and is tested for impairment.", {unless:new RegExp("goodwill (?:\\w+ ){0,5}"+NEG+"|"+NEG+" (?:\\w+ ){0,3}amortiz")}),
  M("deferredrevenue (?:\\w+ ){0,4}(?:is|as|counts as)(?: \\w+){0,2} (?:current )?asset", "Deferred revenue is a LIABILITY. The company owes the customer a product or service it was already paid for."),
  M("(?:ar|inventory|prepaid) (?:\\w+ ){0,3}(?:is|are) (?:a |an )?liabilit", "AR, inventory and prepaid expenses are ASSETS."),
  M("(?:ap|accrued) (?:\\w+ ){0,3}(?:is|are) (?:a |an )?(?:current )?asset", "Accounts payable and accrued expenses are LIABILITIES."),
  M("dividend (?:\\w+ ){0,5}(?:incomestatement|tax deductible|reduce (?:\\w+ )?tax|lower (?:\\w+ )?tax|expense)", "Dividends don't touch the income statement and aren't tax-deductible. They hit CFF and retained earnings.", {unless:new RegExp("dividend (?:\\w+ ){0,5}"+NEG)}),
  M("(?:capex|purchase of ppe|buy(?:ing)? ppe) (?:\\w+ ){0,4}(?:on|hits|appears on|goes on|shows up on) (?:the )?incomestatement", "CapEx does NOT go on the income statement. It is in CFI and only hits the income statement over time through depreciation.", {unless:new RegExp("capex (?:\\w+ ){0,6}"+NEG)}),
  M("(?:repay|pay(?:ing)? (?:back|down|off)|issu\\w*) (?:\\w+ ){0,3}debt (?:principal )?(?:\\w+ ){0,3}(?:on|hits|appears on) (?:the )?incomestatement", "Issuing or repaying debt principal never hits the income statement. Only interest expense does.", {unless:new RegExp(NEG+" (?:\\w+ ){0,4}incomestatement")}),
  M("interest (?:expense )?(?:\\w+ ){0,2}(?:is )?"+NEG+" (?:\\w+ )?tax deductible", "Interest expense IS tax-deductible. That's the tax shield on debt."),
  M("(?:depreciation|da) (?:\\w+ ){0,3}(?:is|as)(?: \\w+){0,2} cash (?:expense|cost|charge|item|outflow)", "Depreciation is a NON-cash expense. It only affects cash through the lower tax bill.", {unless:new RegExp(NEG+" (?:\\w+ ){0,2}cash|non ?cash")}),
  M("ev (?:\\w+ ){0,6}(?:subtract|minus|less|take away|deduct)\\w* (?:\\w+ ){0,2}(?:debt|preferred|nci)", "To get from equity value to EV, you ADD debt, preferred stock and noncontrolling interest, and SUBTRACT cash.", {group:"ev", unless:/equityvalue (?:\w+ ){0,3}(?:from|to get) /}),
  M("(?:equityvalue|ev) (?:\\w+ ){0,6}(?:add|plus)\\w* (?:\\w+ ){0,2}cash", "When you go from equity value to EV, you SUBTRACT cash (it's non-operating). You'd add cash only going EV → equity value.", {group:"ev", unless:/(?:ev to equityvalue|from ev|ev back|bridge back)/}),
  M("precedents (?:\\w+ ){0,4}(?:lowest|lower|cheapest|smallest)", "Precedent transactions usually give the HIGHEST value because they include a control premium.", {unless:new RegExp("precedents (?:\\w+ ){0,4}"+NEG)}),
  M("wacc (?:\\w+ ){0,8}book (?:value|weights)", "Use MARKET values (not book values) for the WACC weights.", {unless:new RegExp(NEG+" (?:\\w+ ){0,3}book|instead of book|rather than book")}),
  M("(?:higher|increase\\w*|rais\\w*) (?:\\w+ ){0,2}(?:wacc|discount rate) (?:\\w+ ){0,6}(?:higher|increase\\w*|rais\\w*|more) (?:\\w+ ){0,2}(?:valuation|value|price|ev|dcf)", "A higher WACC / discount rate LOWERS the present value, so valuation goes DOWN."),
  M("(?:leverage|more debt) (?:\\w+ ){0,4}(?:lower|reduce|decrease|hurt)\\w* (?:\\w+ ){0,2}(?:irr|returns)", "More leverage usually INCREASES IRR because the equity check is smaller (with more risk).", {unless:/too much|interest (?:\w+ )?(?:exceed|too high)|default/}),
  M("buyer\\w* (?:\\w+ ){0,3}(?:lower|smaller) pe (?:\\w+ ){0,6}accretive", "In an all-stock deal, it's accretive when the BUYER's P/E is HIGHER than the seller's."),
  M("terminalvalue (?:\\w+ ){0,5}(?:small|tiny|minor|little) (?:portion|part|percent|share)", "Terminal value is usually the MAJORITY of a DCF, often 60–80% of the total."),
  M("beta (?:\\w+ ){0,4}(?:total|overall|all) (?:\\w+ )?risk", "Beta measures SYSTEMATIC (market) risk, not total risk."),
  M("treasury (?:\\w+ ){0,3}(?:is|as) (?:an |a )?asset", "Treasury stock is a CONTRA-EQUITY account (negative in shareholders' equity), not an asset."),
  M("dtl (?:\\w+ ){0,6}(?:paid|pay|paying) (?:\\w+ )?(?:more|too much|higher)", "A DTL means the company has paid LESS tax than its book tax expense; it pays more later."),
  M("(?:ebitda) (?:\\w+ ){0,2}(?:is|equals|same as|=) (?:\\w+ )?(?:cash flow|fcf|cfo)", "EBITDA is NOT cash flow. It ignores CapEx, working capital, interest and taxes.", {unless:new RegExp(NEG+" (?:\\w+ ){0,2}(?:cash|fcf)|proxy|rough")}),
  M("sbc (?:\\w+ ){0,3}(?:is|as)(?: \\w+){0,2} cash (?:expense|cost)", "Stock-based compensation is a NON-cash expense, added back on the CFS (though it dilutes shareholders).", {unless:new RegExp(NEG+" (?:\\w+ ){0,2}cash|non ?cash")}),
  M("(?:netincome) (?:\\w+ ){0,3}(?:top|first) (?:line|item) (?:\\w+ ){0,3}(?:balancesheet)", "Net income flows to the top of the CFS and into retained earnings on the balance sheet, not to the top of the balance sheet."),
];

/* ---------- Direction / number checks against the key ---------- */
const ITEM_TOKS = ["netincome","cash","ar","ap","inventory","ppe","accrued","deferredrevenue","debt","retainedearnings","shequity","apic","ebit","pretax","tax","taxes","revenue","cogs","da","dtl","dta","goodwill","assets","liabilities","eps","ev","equityvalue","wacc","irr","fcf","cfo","cfi","cff","interestexpense","prepaid","sbc"];
function dirFacts(toks){
  // (item, direction, number) triples: "netincome down 6", "cash up 4"
  const out = [];
  for (let i = 0; i < toks.length; i++){
    if (!ITEM_TOKS.includes(toks[i])) continue;
    let dir = null, num = null;
    for (let j = i+1; j < Math.min(toks.length, i+6); j++){
      const t = toks[j];
      if (ITEM_TOKS.includes(t) && j > i+1) break;
      if (!dir && DIR_UP.test(t)) dir = "up";
      else if (!dir && DIR_DOWN.test(t)) dir = "down";
      else if (num === null && /^\d+(?:\.\d+)?$/.test(t)) num = t;
      if (dir && num !== null) break;
    }
    if (dir || num !== null) out.push({item:toks[i], dir, num});
  }
  return out;
}
const NICE = {netincome:"Net Income", cash:"Cash", ar:"AR", ap:"AP", inventory:"Inventory", ppe:"PP&E", accrued:"Accrued Expenses", deferredrevenue:"Deferred Revenue", debt:"Debt", retainedearnings:"Retained Earnings", shequity:"Shareholders' Equity", apic:"Common Stock & APIC", ebit:"Operating Income", pretax:"Pre-Tax Income", tax:"Taxes", taxes:"Taxes", revenue:"Revenue", cogs:"COGS", da:"D&A", dtl:"DTL", dta:"DTA", goodwill:"Goodwill", assets:"Assets", liabilities:"Liabilities", eps:"EPS", ev:"Enterprise Value", equityvalue:"Equity Value", wacc:"WACC", irr:"IRR", fcf:"FCF", cfo:"Cash Flow from Operations", cfi:"Cash Flow from Investing", cff:"Cash Flow from Financing", interestexpense:"Interest Expense", prepaid:"Prepaid Expenses", sbc:"SBC"};
function factChecks(q, answer){
  const keyText = (q.k || []).join(". ");
  const kf = dirFacts(tokens(keyText)), af = dirFacts(tokens(answer));
  const wrong = [];
  const keyBy = {};
  kf.forEach(f => { (keyBy[f.item] = keyBy[f.item] || []).push(f); });
  for (const a of af){
    const ks = keyBy[a.item]; if (!ks) continue;
    // Only flag when every key mention agrees and the answer contradicts it.
    const dirs = [...new Set(ks.map(k=>k.dir).filter(Boolean))];
    if (a.dir && dirs.length === 1 && dirs[0] !== a.dir){
      const k = ks.find(k=>k.dir);
      wrong.push(`You said ${NICE[a.item]||a.item} goes ${a.dir}. It goes ${k.dir}${k.num?` by ${k.num}`:""}.`);
      continue;
    }
    const nums = [...new Set(ks.map(k=>k.num).filter(n=>n!==null))];
    if (a.num !== null && nums.length === 1 && nums[0] !== a.num && Number(a.num) > 0 && Number(nums[0]) > 0){
      wrong.push(`Check your number: you said ${NICE[a.item]||a.item} ${a.dir?`goes ${a.dir} `:""}by ${a.num}. The key has ${nums[0]}.`);
    }
  }
  return [...new Set(wrong)];
}

/* ---------- Behavioral checks ---------- */
const STORY_Q = /tell me about a time|describe a (?:time|situation)|give (?:me )?an example|example of a time|walk me through a time|a time when|have you ever|biggest (?:challenge|failure|mistake|accomplishment)|proudest|most difficult|toughest/i;
function behavioralChecks(q, answer, norm){
  const out = {flags:[], star:null, praise:[]};
  const qq = q.q.toLowerCase();
  const isStory = STORY_Q.test(q.q);
  if (isStory){
    const s = {
      situation: /\b(?:when i was|while i was|last (?:year|summer|semester|spring|fall)|during (?:my|the|our)|at my|in my (?:role|job|internship|freshman|sophomore|junior|senior|first)|back in|in 20\d\d|my (?:freshman|sophomore|junior|senior) year|this (?:past )?(?:summer|semester))\b/i.test(answer),
      task: /\b(?:my (?:role|job|task|goal|responsibility)|i was (?:responsible|tasked|asked|in charge)|we needed to|i needed to|the goal was|the problem was|the challenge was|had to)\b/i.test(answer),
      action: (answer.match(/\bi (?:decided|built|created|led|organized|organised|reached out|proposed|set up|started|designed|analy[sz]ed|scheduled|called|wrote|met|talked|spoke|took|made|pushed|restructured|delegated|trained|negotiated|launched|figured|asked|stepped|coordinated|researched|modeled|modelled|presented|implemented|fixed|changed|focused|split|broke)\b/gi) || []).length,
      result: /\b(?:as a result|in the end|ended up|result(?:ed)? (?:was|in)|outcome|we (?:won|finished|delivered|raised|grew|cut|saved|hit|closed)|which (?:led|meant)|increased|decreased|reduced|saved|grew|improved|\d+ ?(?:%|percent)|\$ ?\d)/i.test(answer),
      lesson: /\b(?:i learned|taught me|lesson|takeaway|now i|since then|going forward|next time|i realized|i realised)\b/i.test(answer),
    };
    out.star = s;
    if (!s.situation) out.flags.push({sev:2, title:"Set the scene in one line", body:"Open with where and when (\"Last spring, as treasurer of…\"). Without it the story floats."});
    if (!s.task) out.flags.push({sev:2, title:"State the stakes or your goal", body:"Say what had to happen and why it mattered. That's what makes the action impressive."});
    if (s.action < 2) out.flags.push({sev:3, title:"Show what YOU did", body:"Use 2–3 \"I + strong verb\" actions (\"I rebuilt the schedule\", \"I called each member\"). This is the part interviewers score."});
    if (!s.result) out.flags.push({sev:3, title:"Land a concrete result", body:"Finish with an outcome, ideally a number: \"we raised $4,000\", \"cut turnaround from 5 days to 2\"."});
    if (!s.lesson && /fail|mistake|weak|conflict|challenge|wrong/i.test(qq)) out.flags.push({sev:2, title:"Close with the lesson", body:"For failure and conflict questions, end with what you changed afterwards and proof it stuck."});
    const iCount = (answer.match(/\bi\b/gi)||[]).length, weCount = (answer.match(/\bwe\b/gi)||[]).length;
    if (weCount > iCount && weCount >= 4) out.flags.push({sev:2, title:"Too much \"we\", not enough \"I\"", body:`You said "we" ${weCount}× and "I" ${iCount}×. Credit the team once, then own your actions with "I".`});
    if (s.action >= 2 && s.result) out.praise.push("Clear actions and a result. That's the core of a good story.");
  }
  if (/\b(?:lazy|stupid|idiot|incompetent|useless|annoying|hated|his fault|her fault|their fault|didn'?t do anything|did nothing|blame)\b/i.test(answer))
    out.flags.push({sev:3, title:"Don't blame or criticise others", body:"Negativity about a teammate reads as a red flag. Describe the situation neutrally and focus on what you did."});
  if (/why (?:investment banking|ib|banking|finance)|why do you want to|why this (?:role|job)/i.test(qq) && /\b(?:money|salary|pay(?:s|ing)? (?:well|a lot)|compensation|bonus|rich|prestig|exit opp|exit opportunit)/i.test(answer))
    out.flags.push({sev:3, title:"Money, prestige or exit opps", body:"Leave them out. Lead with the learning curve, deal exposure and a real experience that pulled you in."});
  if (/five years|5 years|long[- ]term|future goals|career goals/i.test(qq) && /\b(?:private equity|hedge fund|buy[- ]side|business school|mba|start (?:my own|a) (?:company|business)|leave)\b/i.test(answer))
    out.flags.push({sev:2, title:"Don't signal you'll leave", body:"Mentioning PE, a hedge fund or business school suggests you're using banking as a stepping stone. Talk about growing into associate-level work."});
  if (/weakness/i.test(qq)){
    if (/\b(?:perfectionist|work too hard|care too much|too detail|too dedicated|overachiev|too hard on myself)\b/i.test(answer))
      out.flags.push({sev:3, title:"That's a disguised strength", body:"\"Perfectionist\" and \"I work too hard\" are the answers interviewers hear most and trust least. Pick a real, fixable weakness."});
    if (/\b(?:attention to detail|careless|excel|math|numbers|time management|deadlines|organi[sz]ation|work ethic)\b/i.test(answer) && !/\bimprov|working on|fixed|now i\b/i.test(answer))
      out.flags.push({sev:3, title:"Weakness hits a core banking skill", body:"Detail, Excel, deadlines and work ethic are the job. If you use one, show the system you built that fixed it."});
    if (!/\b(?:improv|working on|i now|now i|started|began|use|built|system|habit|checklist|since then)\b/i.test(answer))
      out.flags.push({sev:2, title:"Show the fix", body:"After naming the weakness, spend most of the answer on the concrete steps you took and the evidence it's improving."});
  }
  if (/why (?:our|this) (?:bank|firm|company)|why (?:us|here)/i.test(qq)){
    if (/\b(?:great culture|good culture|prestig|best bank|top bank|great reputation|reputation|big name|well known)\b/i.test(answer) && !/\b(?:spoke|talked|met|coffee|call|chat)\b/i.test(answer))
      out.flags.push({sev:3, title:"Too generic for \"why us\"", body:"\"Great culture\" and \"reputation\" fit any bank. Name a group, a recent deal and a person you spoke with."});
    if (!/\b(?:spoke|talked|met|coffee|call|chat|conversation)\b/i.test(answer))
      out.flags.push({sev:2, title:"Mention who you spoke with", body:"\"When I spoke with [name] in the industrials group…\" is the strongest signal of genuine interest."});
  }
  if (/about yourself|walk me through your (?:resume|background)/i.test(qq)){
    if (!/\b(?:why|that'?s why|which is why|led me|brought me|now i'?m|today|here|this role|banking)\b/i.test(answer.slice(-220)))
      out.flags.push({sev:2, title:"End on why you're here", body:"Your story should finish with what brought you to banking and to this interview."});
  }
  if (/deal|transaction|acquisition/i.test(qq) && /follow|recent|tell me about a deal/i.test(qq)){
    const need = [[/\b(?:billion|million|\$|\bbn\b|\d)/i,"the deal size"],[/\b(?:multiple|x ebitda|times|premium)\b/i,"the multiple or premium"],[/\b(?:synerg|rationale|because|strategic|why)\b/i,"the strategic rationale"],[/\b(?:risk|concern|downside|worry|challenge)\b/i,"a risk"]];
    const miss = need.filter(([re]) => !re.test(answer)).map(x=>x[1]);
    if (miss.length) out.flags.push({sev:2, title:"Add the deal facts", body:"A strong deal answer includes " + miss.join(", ") + "."});
  }
  return out;
}

/* ---------- Model answer from the key ---------- */
function modelAnswer(q, points){
  if (!points.length) return "";
  const beh = q.t === "beh";
  const lines = points.map(p => p.text.replace(/\s+/g," ").replace(/[;]\s*/g,", ").replace(/\.$/,""));
  if (beh) return lines.map(l => "• " + l).join("\n");
  const joiners = ["", "Then ", "Next, ", "On top of that, ", "Also, ", "Finally, "];
  return lines.map((l,i) => {
    const j = i === 0 ? "" : i === lines.length-1 && lines.length > 2 ? "Finally, " : joiners[Math.min(i, joiners.length-2)];
    const body = j ? l.charAt(0).toLowerCase() + l.slice(1) : l;
    return (j + (/^[A-Z]{2,}/.test(l) ? l : body)) + ".";
  }).join(" ");
}

/* ---------- Tightened version of their own answer ---------- */
function tighten(answer){
  let s = " " + answer + " ";
  const cut = [/\b(?:um+|uh+|uhm+|erm+|er|ah+|hmm+)\b[,.]?/gi, /\byou know,?\s/gi, /\bi mean,?\s/gi, /\bbasically,?\s/gi, /\bliterally\s/gi, /\bactually,?\s/gi,
               /\b(?:kind|sort) of\s/gi, /,?\s*like,\s/gi, /\bso yeah\b[,.]?/gi, /\s*(?:or something(?: like that)?|and stuff|and things like that|or whatever)\b/gi,
               /\bpretty much\s/gi, /\bi think (?:that )?/gi, /\bi guess,?\s/gi, /\bi feel like\s/gi, /\bjust\s/gi, /\b(?:really|very|super)\s(?=\w)/gi,
               /\b(?:that'?s a (?:great|good) question|great question|good question)[,.!]?\s*/gi, /\bto be honest,?\s|\bhonestly,?\s/gi, /,?\s*if (?:that|this) makes sense\??/gi, /\bobviously,?\s/gi,
               /^\s*(?:so|okay so|well|alright),?\s/i, /\bokay so,?\s/gi, /,?\s*\b(?:and )?yeah\b,?(?: so\b)?/gi, /,?\s*\bi'?m not (?:really |totally )?sure\b,?/gi];
  for (const re of cut) s = s.replace(re, " ");
  s = s.replace(/\bin order to\b/gi,"to").replace(/\bdue to the fact that\b/gi,"because").replace(/\bgonna\b/gi,"going to").replace(/\bwanna\b/gi,"want to")
       .replace(/\s+([,.!?])/g,"$1").replace(/([,.]){2,}/g,"$1").replace(/\s{2,}/g," ").trim();
  return s.replace(/(^|[.!?]\s+)([a-z])/g,(m,a,b)=>a+b.toUpperCase());
}

/* ---------- Main ---------- */
function clamp(x, a=0, b=10){ return Math.max(a, Math.min(b, x)); }
function analyze(q, answer, seconds){
  answer = String(answer || "").trim();
  const beh = q.t === "beh";
  const words = wc(answer);
  const target = q.s || 60;                      // seconds
  const targetWords = Math.round(target * 2.2);  // ~130 wpm with natural pauses
  const lenRatio = words / targetWords;
  const secs = seconds && seconds >= 5 ? seconds : null;
  const wpm = secs ? Math.round(words / (secs / 60)) : null;
  const sents = sentences(answer);
  const norm = normalize(answer);
  const ansToks = sigTokens(answer);

  /* content */
  const points = keyPoints(q).map(p => beh ? {...p, toks: p.toks.filter(t => !META.has(t))} : p).filter(p => p.toks.length);
  const cov = coverage(points, ansToks).map(p => {
    if (!beh) return p;
    // guidance points are satisfied loosely
    const status = p.ratio >= 0.34 ? "hit" : p.ratio >= 0.15 ? "partial" : "miss";
    return {...p, status};
  });
  const contentRatio = cov.length ? cov.reduce((s,p)=>s + (p.status==="hit"?1:p.status==="partial"?0.5:0), 0) / cov.length : null;

  /* accuracy */
  const corrections = [];
  if (!beh){
    const groups = new Set();
    for (const m of MISTAKES){
      if (m.re.test(norm) && !(m.unless && m.unless.test(norm)) && !(m.group && groups.has(m.group))){ corrections.push(m.fix); if (m.group) groups.add(m.group); }
    }
    corrections.push(...factChecks(q, answer));
  }
  const uniqCorr = [...new Set(corrections)];

  /* delivery */
  const fillers = findAll(answer, FILLERS);
  const hedges = findAll(answer, HEDGES);
  const wording = findAll(answer, WORDING);
  const restarts = (answer.match(RESTARTS) || []).length;
  const fillerRate = words ? fillers.length / words * 100 : 0;     // per 100 words
  const hedgeRate = words ? hedges.length / words * 100 : 0;
  const reps = repeatedPhrases(answer);

  /* relevance: sentences that share nothing with the question or key */
  const vocab = new Set([...sigTokens(q.q), ...points.flatMap(p=>p.toks)]);
  const offTopic = beh ? [] : sents.filter(s => { const t = sigTokens(s); return t.length >= 6 && !t.some(x => vocab.has(x)); });
  const longSents = sents.filter(s => wc(s) > 40);
  const andChains = sents.filter(s => (s.match(/\band\b/gi)||[]).length >= 4);

  /* structure */
  const first = sents[0] || "";
  const weakOpen = OPENER_WEAK.test(answer);
  const firstToks = new Set(sigTokens(first));
  const bluf = beh ? true : points.length ? [...firstToks].some(t => vocab.has(t) && (DOMAIN.has(t) || points[0].toks.includes(t))) : true;
  const signposts = (answer.match(/\b(?:first(?:ly)?|second(?:ly)?|third(?:ly)?|finally|lastly|next|then|to start|to begin|there are (?:two|three|four|\d) (?:main |key )?(?:ways|reasons|things|steps|parts|methods)|in summary|overall|bottom line)\b/gi) || []).length;
  const trails = TRAIL.test(answer);
  const itDepends = /\bit depends\b/i.test(answer) && !/\bit depends (?:on|whether|if)\b/i.test(answer);
  const behx = beh ? behavioralChecks(q, answer, norm) : {flags:[], star:null, praise:[]};

  /* ---------- scores (0–10) ---------- */
  let content;
  if (beh){
    // Behavioral keys are guidance ("use STAR", "show empathy"), so blend
    // key coverage with a rubric for what actually persuades a banker.
    const s = behx.star;
    const numbers = (answer.match(/\b\d[\d,.]*\s?(?:%|percent|k|million|billion|people|members|teams|hours|days|weeks)?\b|\$\s?\d/gi) || []).length;
    const proper = (answer.slice(1).match(/(?<![.!?]\s)\b[A-Z][a-z]{2,}/g) || []).filter(w => !/^(?:I|The|This|That|When|While|After|Before|Then|And|But|So|My|We|Our|Last|First|Second|Finally|Also|It|In|At|On|For|As)$/.test(w)).length;
    const example = /\b(?:for example|for instance|when i|at my|in my|during my|last (?:year|summer|spring|fall|semester)|i (?:led|built|started|worked|interned|founded|managed|organized))\b/i.test(answer);
    let rub;
    if (s) rub = ((s.situation?1:0) + (s.task?1:0) + Math.min(s.action,3)/3*2 + (s.result?2:0) + (s.lesson?1:0) + (numbers?1:0)) / 8;
    else rub = ((example?1:0) + Math.min(numbers,2)/2 + Math.min(proper,3)/3 + (lenRatio >= 0.3 ? 1 : lenRatio/0.3)) / 4;
    rub -= behx.flags.filter(f => f.sev >= 3).length * 0.12;
    const blended = contentRatio === null ? rub : rub * 0.7 + contentRatio * 0.3;
    content = clamp(Math.round(Math.max(0, blended) * 10));
  } else {
    content = contentRatio === null ? 5 : clamp(Math.round(contentRatio * 10 + (contentRatio > 0.85 ? 0.5 : 0)));
  }
  const accuracy = beh ? null : clamp(10 - uniqCorr.length * 3);
  let structure = 10;
  if (weakOpen) structure -= 1.5;
  if (!bluf) structure -= 2;
  if (!beh && points.length >= 3 && signposts === 0 && words > 60) structure -= 1.5;
  if (trails) structure -= 1;
  if (longSents.length) structure -= Math.min(2, longSents.length);
  if (behx.star){ const s = behx.star; structure -= (!s.situation?1:0) + (!s.task?1:0) + (s.action<2?2:0) + (!s.result?2:0); }
  structure = clamp(Math.round(structure));
  let concision = 10;
  if (lenRatio > 1.25) concision -= Math.min(5, (lenRatio - 1.25) * 6 + 1);
  if (lenRatio < 0.3 && !(contentRatio >= 0.8)) concision -= Math.min(5, (0.3 - lenRatio) * 15 + 1);
  concision -= Math.min(3, offTopic.length * 1.5);
  concision -= Math.min(2, reps.length * 0.7);
  concision -= Math.min(1.5, andChains.length * 0.75);
  concision = clamp(Math.round(concision));
  let delivery = 10;
  delivery -= Math.min(4, fillerRate * 0.9);
  delivery -= Math.min(3, hedgeRate * 1.1);
  delivery -= Math.min(2, restarts * 0.8);
  if (wpm && (wpm > 185 || wpm < 105)) delivery -= 1.5;
  delivery -= Math.min(1.5, wording.length * 0.25);
  delivery = clamp(Math.round(delivery));

  // Structure, delivery, concision and accuracy only count when there's a real
  // answer to judge. "No mistakes" in two sentences isn't a 10 — cap each one
  // by how much substance the answer actually has.
  const lenFactor = clamp(words / (targetWords * 0.35), 0, 1);
  const contentFactor = clamp(content / 6, 0, 1);
  const substance = contentFactor * (0.5 + 0.5 * lenFactor);
  const cap = Math.round(2 + 8 * substance);
  structure = Math.min(structure, cap);
  concision = Math.min(concision, cap);
  delivery = Math.min(delivery, cap);
  let accuracyOut = accuracy;
  if (!beh){
    if ((contentRatio ?? 0) < 0.15 && !uniqCorr.length) accuracyOut = null;   // too little said to judge
    else if (!uniqCorr.length) accuracyOut = Math.min(accuracy, cap);
  }
  const accuracyForScore = accuracyOut ?? 0;

  let overall = beh
    ? content*0.30 + structure*0.30 + concision*0.15 + delivery*0.25
    : content*0.50 + accuracyForScore*0.20 + structure*0.10 + concision*0.10 + delivery*0.10;
  if (uniqCorr.length) overall = Math.min(overall, 6 - (uniqCorr.length-1));
  if (words < 12) overall = Math.min(overall, 2);
  if (beh){
    const red = behx.flags.filter(f => f.sev >= 3).length;
    if (red) overall = Math.min(overall, 6 - red);
    if (words < 30) overall = Math.min(overall, 4);
  }
  if (!beh && contentRatio !== null && contentRatio < 0.25) overall = Math.min(overall, 4);
  overall = clamp(Math.round(overall));

  /* ---------- coaching list ---------- */
  const fixes = [];
  const add = (sev, title, body, tag) => fixes.push({sev, title, body, tag});
  uniqCorr.forEach(c => add(5, "Factual error", c, "Accuracy"));
  if (substance < 0.35 && words >= 3) add(5, "Not enough of an answer yet",
    beh ? "There isn't a real example or story here yet, so structure and delivery can't score well. Use the hint, pick one concrete experience, and walk through it."
        : "This doesn't cover the key points, so there's nothing to give structure, delivery or accuracy credit for. Tap Hint to see what to cover, then answer again.", "Content");
  const missed = cov.filter(p=>p.status==="miss"), partial = cov.filter(p=>p.status==="partial");
  if (missed.length) add(4, `You missed ${missed.length} key point${missed.length>1?"s":""}`, missed.slice(0,3).map(p=>p.label).join(" · "), "Content");
  if (partial.length) add(2, "Go one level deeper", `You touched on ${partial.slice(0,2).map(p=>"“"+p.label+"”").join(" and ")} but left out the specifics.`, "Content");
  if (!bluf && !beh) add(3, "Lead with the answer", "Your first sentence should answer the question directly. Context comes after. Interviewers decide in the first 10 seconds.", "Structure");
  if (weakOpen) add(2, "Cut the warm-up", `You opened with “${(answer.match(OPENER_WEAK)||[""])[0].trim()}”. Pause silently for a second instead, then start with the answer.`, "Structure");
  if (!beh && points.length >= 3 && signposts === 0 && words > 60) add(2, "Signpost your structure", `Say how many parts there are (“There are ${Math.min(points.length,3)} main pieces…”) and number them. It makes long answers easy to follow.`, "Structure");
  behx.flags.forEach(f => add(f.sev, f.title, f.body, beh ? "Story" : "Structure"));
  if (lenRatio > 1.25) add(lenRatio > 1.8 ? 4 : 3, "You're rambling", `About ${words} words for a ~${target}s answer (aim for ${Math.round(targetWords*0.45)}–${Math.round(targetWords*1.1)}). Cut background and stop once you've made your last key point.`, "Concision");
  if (lenRatio < 0.3 && words >= 12 && !(contentRatio >= 0.8)) add(3, "Too thin", `Only ${words} words. A strong answer here runs about ${Math.round(targetWords*0.45)}–${Math.round(targetWords*1.1)} words. Add the missing points${beh ? " and a concrete example" : ""}.`, "Concision");
  if (offTopic.length) add(3, "Tangent detected", `This doesn't connect to the question: “${offTopic[0].slice(0,110)}${offTopic[0].length>110?"…":""}”. Cut anything that doesn't answer what was asked.`, "Concision");
  if (reps.length) add(2, "You repeated yourself", `“${reps[0]}” came up more than once. Say each point once, clearly.`, "Concision");
  if (longSents.length) add(2, "Break up long sentences", `One sentence ran ${wc(longSents[0])} words. Spoken answers land better in short sentences with a pause between them.`, "Delivery");
  if (andChains.length) add(1, "Too many “and”s", "Chaining ideas with “and… and… and” sounds like stream of consciousness. Finish the sentence and start a new one.", "Delivery");
  if (fillers.length >= 2) add(fillerRate > 4 ? 3 : 2, `${fillers.length} filler words`, `${countLabels(fillers)}. Replace each with a silent pause; pauses sound confident, fillers don't.`, "Delivery");
  if (hedges.length >= 1 && !beh) add(hedges.length >= 3 ? 3 : 2, "Hedging", `${countLabels(hedges)}. On technical questions, state facts directly. If you're unsure, say “I'd assume X because Y” once, not throughout.`, "Delivery");
  if (hedges.length >= 3 && beh) add(2, "Hedging", `${countLabels(hedges)}. Own your story. You were there, so say it with certainty.`, "Delivery");
  if (restarts) add(2, "Restarts", "You stopped and restarted. If you lose your place, pause, then say “Let me take that from the top” once and give the clean version.", "Delivery");
  if (wpm && wpm > 185) add(2, "Slow down", `About ${wpm} words per minute. Aim for 130–165. Speed reads as nerves.`, "Delivery");
  if (wpm && wpm < 105 && words > 30) add(2, "Pick up the pace", `About ${wpm} words per minute. Aim for 130–165. Too slow sounds like you're unsure.`, "Delivery");
  if (trails) add(1, "Finish strong", "You trailed off at the end. Close with a one-line summary, then stop talking.", "Structure");
  if (itDepends) add(2, "“It depends” on what?", "Never leave “it depends” hanging. Say what it depends on and give the answer for the most common case.", "Structure");
  if (wording.length) add(1, "Word choice", `${wording.length} phrase${wording.length>1?"s":""} to upgrade. See the wording section below.`, "Wording");
  fixes.sort((a,b)=>b.sev-a.sev);

  /* ---------- strengths ---------- */
  const strengths = [];
  const hits = cov.filter(p=>p.status==="hit");
  if (hits.length) strengths.push(`Covered ${hits.length} of ${cov.length} key points.`);
  if (!beh && bluf && words > 15 && !uniqCorr.length && contentRatio > 0.3) strengths.push("Led with a direct answer.");
  if (signposts >= 2) strengths.push("Clear signposting made it easy to follow.");
  if (words >= 12 && fillerRate < 1.5) strengths.push("Very few filler words.");
  if (words >= 12 && !hedges.length) strengths.push("Confident: no hedging.");
  if (!beh && !uniqCorr.length && words >= 25 && contentRatio > 0.4) strengths.push("No factual errors caught.");
  if (lenRatio >= 0.35 && lenRatio <= 1.15) strengths.push("Good length for the question.");
  if (wpm && wpm >= 125 && wpm <= 170) strengths.push(`Good pace (${wpm} wpm).`);
  strengths.push(...behx.praise);

  const verdict = overall >= 9 ? "Interview-ready. This would pass on a superday."
    : overall >= 7 ? "Solid. A couple of fixes make this a top answer."
    : overall >= 5 ? "Getting there, but an interviewer would push you on what's missing."
    : overall >= 3 ? "This wouldn't pass yet. Focus on the top fixes below."
    : "Start over with the structure below and aim for the key points.";

  return {
    overall, verdict, beh,
    scores: {content, accuracy: accuracyOut, structure, concision, delivery}, substance,
    coverage: cov, corrections: uniqCorr, fixes, strengths,
    stats: {words, targetWords, target, secs, wpm, fillers: fillers.length, hedges: hedges.length, fillerRate: +fillerRate.toFixed(1), sentences: sents.length, longest: Math.max(0, ...sents.map(wc))},
    marks: {fillers, hedges, wording, offTopic, reps},
    star: behx.star,
    wording: dedupeWording(wording),
    tightened: tighten(answer),
    model: modelAnswer(q, points),
  };
}
function countLabels(list){
  const c = {}; list.forEach(x => { const k = x.label; c[k] = (c[k]||0)+1; });
  return Object.entries(c).sort((a,b)=>b[1]-a[1]).map(([k,n]) => `“${k}” ×${n}`).join(", ");
}
function dedupeWording(list){
  const seen = new Map();
  for (const w of list){ const k = w.rule.from; if (!seen.has(k)) seen.set(k, {...w.rule, said: w.text, n:1}); else seen.get(k).n++; }
  return [...seen.values()];
}

/* Highlight ranges for the transcript view. */
function highlights(answer, report){
  const r = [];
  report.marks.fillers.forEach(m => r.push({i:m.i, j:m.i+m.len, kind:"filler", tip:"Filler: replace with a pause"}));
  report.marks.hedges.forEach(m => r.push({i:m.i, j:m.i+m.len, kind:"hedge", tip:"Hedge: state it directly"}));
  report.marks.wording.forEach(m => r.push({i:m.i, j:m.i+m.len, kind:"word", tip:`${m.rule.why} Try: ${m.rule.to}`}));
  report.marks.offTopic.forEach(s => { const i = answer.indexOf(s); if (i >= 0) r.push({i, j:i+s.length, kind:"tangent", tip:"Tangent: doesn't answer the question"}); });
  r.sort((a,b)=>a.i-b.i || (b.j-b.i)-(a.j-a.i));
  // drop overlaps, keeping the first/longest
  const out = []; let end = -1;
  for (const x of r){ if (x.i >= end){ out.push(x); end = x.j; } else if (x.kind === "tangent") continue; }
  return out;
}

return {analyze, highlights, normalize, keyPoints, tighten};
})();
if (typeof module !== "undefined") module.exports = Coach;
