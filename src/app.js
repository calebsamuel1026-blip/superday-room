/* ==========================================================================
   Superday Room — app
   Views: Drill · Mock interview · Mastery · Question bank · Progress
   ========================================================================== */
(() => {
"use strict";

/* ---------- Icons (SF Symbols-style) ---------- */
const P = {
  mic:'<path d="M12 15a3.5 3.5 0 0 0 3.5-3.5v-6a3.5 3.5 0 1 0-7 0v6A3.5 3.5 0 0 0 12 15Z" fill="currentColor"/><path d="M18 11.4a6 6 0 0 1-12 0M12 17.4V21M8.8 21h6.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  person2:'<circle cx="9" cy="8" r="3.4" fill="currentColor"/><path d="M2.8 19.5c.6-3.6 3.1-5.6 6.2-5.6s5.6 2 6.2 5.6Z" fill="currentColor"/><circle cx="16.6" cy="8.8" r="2.7" fill="currentColor" opacity=".7"/><path d="M15.6 13.6c3.1-.3 5.3 1.6 5.7 4.9h-4.4c-.2-1.9-.6-3.4-1.3-4.9Z" fill="currentColor" opacity=".7"/>',
  target:'<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>',
  books:'<rect x="3.5" y="4" width="4.5" height="16" rx="1.2" fill="currentColor"/><rect x="9.5" y="4" width="4.5" height="16" rx="1.2" fill="currentColor" opacity=".75"/><path d="m15.6 5.6 4.2-1.2 3 14.3-4.3 1.1Z" fill="currentColor" opacity=".55"/>',
  chart:'<rect x="4" y="12" width="3.6" height="8" rx="1" fill="currentColor"/><rect x="10.2" y="7" width="3.6" height="13" rx="1" fill="currentColor"/><rect x="16.4" y="3.5" width="3.6" height="16.5" rx="1" fill="currentColor"/>',
  gear:'<path d="M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Zm8.4 4.6-1.8-.4a6.8 6.8 0 0 0-.6-1.5l1-1.5a.9.9 0 0 0-.1-1.2l-1.1-1.1a.9.9 0 0 0-1.2-.1l-1.5 1a6.8 6.8 0 0 0-1.5-.6l-.4-1.8a.9.9 0 0 0-.9-.7h-1.6a.9.9 0 0 0-.9.7l-.4 1.8a6.8 6.8 0 0 0-1.5.6l-1.5-1a.9.9 0 0 0-1.2.1L4.1 8.6a.9.9 0 0 0-.1 1.2l1 1.5a6.8 6.8 0 0 0-.6 1.5l-1.8.4a.9.9 0 0 0-.7.9v1.6c0 .4.3.8.7.9l1.8.4c.1.5.3 1 .6 1.5l-1 1.5a.9.9 0 0 0 .1 1.2l1.1 1.1c.3.3.8.4 1.2.1l1.5-1c.5.3 1 .5 1.5.6l.4 1.8c.1.4.5.7.9.7h1.6c.4 0 .8-.3.9-.7l.4-1.8c.5-.1 1-.3 1.5-.6l1.5 1c.4.3.9.2 1.2-.1l1.1-1.1c.3-.3.4-.8.1-1.2l-1-1.5c.3-.5.5-1 .6-1.5l1.8-.4c.4-.1.7-.5.7-.9v-1.6a.9.9 0 0 0-.7-.9Z" fill="currentColor" transform="translate(0 -1.2)"/>',
  sidebar:'<rect x="3" y="4.5" width="18" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9.5 4.5v15" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 8h2M5.5 11h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  speaker:'<path d="M4 9.5h3l4.4-3.7c.5-.4 1.1 0 1.1.6v11.2c0 .6-.7 1-1.1.6L7 14.5H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" fill="currentColor"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  bulb:'<path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" fill="currentColor"/><path d="M9.6 18.4h4.8M10.4 21h3.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  forward:'<path d="M4 6.3v11.4c0 .8.9 1.3 1.5.8L12 13.3v4.4c0 .8.9 1.3 1.5.8l7.2-5.7a1 1 0 0 0 0-1.6l-7.2-5.7c-.6-.5-1.5 0-1.5.8v4.4L5.5 5.5C4.9 5 4 5.5 4 6.3Z" fill="currentColor"/>',
  retry:'<path d="M5 12a7 7 0 1 0 2.2-5.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5.2 3.6v4.2h4.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  sparkles:'<path d="M10 3.5c.4 3.6 2.5 5.9 6 6.4-3.5.6-5.6 2.8-6 6.4-.4-3.6-2.5-5.8-6-6.4 3.5-.5 5.6-2.8 6-6.4Z" fill="currentColor"/><path d="M17.5 13.5c.2 1.8 1.2 2.9 3 3.2-1.8.3-2.8 1.4-3 3.2-.2-1.8-1.2-2.9-3-3.2 1.8-.3 2.8-1.4 3-3.2ZM18 3c.15 1.2.8 1.9 2 2.1-1.2.2-1.85.9-2 2.1-.15-1.2-.8-1.9-2-2.1 1.2-.2 1.85-.9 2-2.1Z" fill="currentColor" opacity=".75"/>',
  check:'<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="m7.5 12.3 3 3 6-6.3" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  half:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor"/>',
  xmark:'<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="m8.5 8.5 7 7m0-7-7 7" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>',
  warn:'<path d="M10.3 4.2a2 2 0 0 1 3.4 0l7.5 13a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3Z" fill="currentColor"/><path d="M12 9v4.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="16.7" r="1.3" fill="#fff"/>',
  wand:'<path d="m4 20 10.5-10.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="m14.5 9.5 2-2" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity=".5"/><path d="M17.5 2.5l.6 1.9 1.9.6-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6ZM20.5 9.5l.4 1.2 1.2.4-1.2.4-.4 1.2-.4-1.2-1.2-.4 1.2-.4ZM10.5 3.5l.4 1.2 1.2.4-1.2.4-.4 1.2-.4-1.2-1.2-.4 1.2-.4Z" fill="currentColor"/>',
  quote:'<path d="M5 6h5v5c0 3.5-1.6 6-4.8 7l-.7-1.4c1.6-.8 2.4-2 2.5-3.6H5Zm9 0h5v5c0 3.5-1.6 6-4.8 7l-.7-1.4c1.6-.8 2.4-2 2.5-3.6H14Z" fill="currentColor"/>',
  scissors:'<circle cx="6" cy="7" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="17" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.5 8.8 20 17M8.5 15.2 20 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  text:'<path d="M4 5.5h16M4 10h16M4 14.5h10M4 19h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  bubble:'<path d="M12 4c4.7 0 8.5 3 8.5 6.8s-3.8 6.8-8.5 6.8c-.9 0-1.8-.1-2.6-.3L5 19.5l1-3.6C4.4 14.7 3.5 12.9 3.5 10.8 3.5 7 7.3 4 12 4Z" fill="currentColor"/>',
  thumbs:'<path d="M7 10.5v9H4.5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Zm2 9h7.6a2 2 0 0 0 2-1.6l1.2-6a2 2 0 0 0-2-2.4h-4.2l.6-3.3a1.8 1.8 0 0 0-3.4-1.1L9 10.5Z" fill="currentColor"/>',
  list:'<circle cx="5" cy="6.5" r="1.6" fill="currentColor"/><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="5" cy="17.5" r="1.6" fill="currentColor"/><path d="M9.5 6.5H20M9.5 12H20M9.5 17.5H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  stopwatch:'<circle cx="12" cy="13.5" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 13.5V9.5M10 2.8h4M18.5 6.5l1.2-1.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  gauge:'<path d="M3.5 16a8.5 8.5 0 1 1 17 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="m12 16 4-5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="16" r="1.8" fill="currentColor"/>',
  flame:'<path d="M12 2.5c.6 3.2 4.8 5.3 4.8 10.2A4.8 4.8 0 0 1 12 17.5a4.8 4.8 0 0 1-4.8-4.8c0-2.2 1.2-3.6 2.2-4.7.2 1.5 1 2.4 2 2.7-.5-3.6.3-5.8.6-8.2Z" fill="currentColor"/><path d="M8 21h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".5"/>',
  calc:'<rect x="5" y="3" width="14" height="18" rx="2.5" fill="currentColor"/><rect x="7.5" y="5.5" width="9" height="3.5" rx="1" fill="#fff" opacity=".9"/><g fill="#fff"><circle cx="8.8" cy="12.5" r="1.1"/><circle cx="12" cy="12.5" r="1.1"/><circle cx="15.2" cy="12.5" r="1.1"/><circle cx="8.8" cy="16.5" r="1.1"/><circle cx="12" cy="16.5" r="1.1"/><circle cx="15.2" cy="16.5" r="1.1"/></g>',
  dollar:'<circle cx="12" cy="12" r="9.5" fill="currentColor"/><path d="M14.8 9c-.4-1-1.4-1.6-2.8-1.6-1.6 0-2.7.8-2.7 2s1 1.7 2.7 2.1c1.8.4 2.9 1 2.9 2.3s-1.2 2.2-2.9 2.2c-1.5 0-2.6-.6-3-1.8M12 6v1.4M12 16v1.6" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/>',
  merge:'<path d="M6 4v5.5c0 2 1.2 3.5 3.3 4.2l2.7 1V20M18 4v5.5c0 2-1.2 3.5-3.3 4.2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="6" cy="4" r="2" fill="currentColor"/><circle cx="18" cy="4" r="2" fill="currentColor"/>',
  globe:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c2.5 2.5 3.6 5.4 3.6 9S14.5 18.5 12 21c-2.5-2.5-3.6-5.4-3.6-9S9.5 5.5 12 3Z" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  person:'<circle cx="12" cy="8" r="4" fill="currentColor"/><path d="M4 20.5c.8-4 4-6.5 8-6.5s7.2 2.5 8 6.5Z" fill="currentColor"/>',
  building:'<path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V9h3.5A1.5 1.5 0 0 1 20 10.5V21Z" fill="currentColor"/><g fill="#fff" opacity=".9"><rect x="7" y="7" width="2" height="2" rx=".4"/><rect x="10.5" y="7" width="2" height="2" rx=".4"/><rect x="7" y="11" width="2" height="2" rx=".4"/><rect x="10.5" y="11" width="2" height="2" rx=".4"/><rect x="16" y="12" width="2" height="2" rx=".4"/><rect x="16" y="16" width="2" height="2" rx=".4"/><rect x="8.5" y="16" width="3" height="5" rx=".4"/></g>',
  note:'<path d="M6 3h8l5 5v11.5A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5v-15A1.5 1.5 0 0 1 6 3Z" fill="currentColor"/><path d="M14 3v5h5" fill="#fff" opacity=".5"/><path d="M8.5 12.5h7M8.5 16h5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>',
  arrowL:'<path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  arrowR:'<path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  chevron:'<path d="m1.5 1.5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  close:'<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 5.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h.5" fill="none" stroke="currentColor" stroke-width="2"/>',
  star:'<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8Z" fill="currentColor"/>',
  play:'<path d="M7 4.8v14.4c0 .8.9 1.3 1.6.8l11-7.2a1 1 0 0 0 0-1.6l-11-7.2C7.9 3.5 7 4 7 4.8Z" fill="currentColor"/>',
  key:'<circle cx="8" cy="15.5" r="4.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m11.3 12.2 8.7-8.7M17 6.5l2.5 2.5M14.5 9l2 2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
};
const ic = (name, cls="i") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name]||""}</svg>`;
const chevEl = () => h("span", {style:{display:"inline-flex"}, html:`<svg class="chev" viewBox="0 0 8 13" aria-hidden="true">${P.chevron}</svg>`});
document.querySelectorAll("[data-icon]").forEach(e => e.innerHTML = ic(e.dataset.icon));

/* ---------- Tiny DOM helper ---------- */
function h(tag, props, ...kids){
  const e = document.createElement(tag);
  if (props) for (const [k,v] of Object.entries(props)){
    if (v == null || v === false) continue;
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k === "text") e.textContent = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (k === "style" && typeof v === "object") Object.assign(e.style, v);
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()){ if (c == null || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(String(c))); }
  return e;
}
const $ = id => document.getElementById(id);

/* ---------- Storage adapter ----------
   Everything goes through `store`, so a remote backend (accounts) can be
   dropped in later without touching the views. */
// Account data (progress, history, custom) lives under a per-user prefix when
// signed in, and is mirrored to the cloud. Device preferences stay global.
const ACCOUNT_KEYS = new Set(["progress","history","custom","log"]);
let acctPrefix = "sdr:";
const store = {
  key(k){ return (ACCOUNT_KEYS.has(k) ? acctPrefix : "sdr:") + k; },
  get(k, d){ try{ const v = localStorage.getItem(this.key(k)); return v ? JSON.parse(v) : d; }catch{ return d; } },
  set(k, v){ try{ localStorage.setItem(this.key(k), JSON.stringify(v)); }catch{} if (ACCOUNT_KEYS.has(k) && typeof Cloud !== "undefined") Cloud.queueSave(); },
};
let progress = store.get("progress", {});   // id -> {scores:[], q, t, last, flag}
let history = store.get("history", []);     // graded attempts with sub-scores
let custom = store.get("custom", []);
// Practice log: every graded answer with what was heard and how it was graded, so the coach
// can be checked and tuned against real answers. Synced with the account like progress.
let log = store.get("log", []);
function loadAccountData(){ progress = store.get("progress", {}); history = store.get("history", []); custom = store.get("custom", []); log = store.get("log", []); migrateQuestionProgress(); }
function writeAccountData(d){
  try{ for (const k of ACCOUNT_KEYS) localStorage.setItem(store.key(k), JSON.stringify(d[k] || (k === "progress" ? {} : []))); }catch{}
  loadAccountData();
}
if (typeof Cloud !== "undefined") Cloud.setSnapshot(() => ({progress, history, custom, log}));
// Another tab of this site saved: fold its data in, so this tab's next save doesn't wipe it out.
window.addEventListener("storage", e => {
  if (!e.key || !e.key.startsWith(acctPrefix) || typeof Cloud === "undefined") return;
  const k = e.key.slice(acctPrefix.length); if (!ACCOUNT_KEYS.has(k)) return;
  const other = {progress: store.get("progress", {}), history: store.get("history", []), custom: store.get("custom", []), log: store.get("log", [])};
  const m = Cloud.merge(other, {progress, history, custom, log});
  progress = m.progress; history = m.history; custom = m.custom; log = m.log;
});
const settings = Object.assign({autoGrade:false, accurate:true, speechModel:"fast", smartCleanup:true, voice:"", strict:"standard", theme:"light", aiMode:"auto", aiModel:"claude-opus-5-5", order:"smart"}, store.get("settings", {}));
const saveSettings = () => store.set("settings", settings);
const bankFilter = Object.assign({collection:"all", topic:"", level:"", search:""}, store.get("bankFilter", {}));
let HAS_PRACTICE = typeof PRACTICE_BANK !== "undefined" && PRACTICE_BANK.length > 0;
const PRACTICE = HAS_PRACTICE ? PRACTICE_BANK.slice() : [];
let HAS_GUIDES = typeof GUIDE_BANK !== "undefined" && GUIDE_BANK.length > 0;
const GUIDES = HAS_GUIDES ? GUIDE_BANK.slice() : [];
// Full spoken model answers ("what to say"), by question id.
const SAY = Object.assign({}, typeof SAY_BANK !== "undefined" ? SAY_BANK : {});
// The page's own banks, restored on sign-out after an account's private bank replaced them.
const PAGE_BANKS = {practice: PRACTICE.slice(), guides: GUIDES.slice(), say: Object.assign({}, SAY)};
const importedQuestionIds = new Map();
function normalizePrivateBank(bank){
  const known = PAGE_BANKS.practice.concat(PAGE_BANKS.guides);
  const byId = new Map(known.map(q => [q.id, q]));
  const byText = new Map();
  known.forEach(q => { const entries = byText.get(q.q) || []; entries.push(q); byText.set(q.q, entries); });
  const result = {practice:[], guides:[], say:{}};
  const usedIds = new Set();
  for (const value of Object.values(bank || {})){
    if (!Array.isArray(value)) continue;
    for (const item of value){
      if (!item || !item.id || !item.q) continue;
      const candidates = byText.get(item.q) || [];
      const canonical = byId.get(item.id) || candidates.find(q => !usedIds.has(q.id) && JSON.stringify(q.k) === JSON.stringify(item.k)) || (candidates.length === 1 && !usedIds.has(candidates[0].id) ? candidates[0] : null);
      const collection = canonical ? canonical.collection : item.collection === "guides" ? "guides" : "practice";
      const q = canonical ? {...canonical} : Object.fromEntries(Object.entries(item).filter(([key]) => ["id","t","l","s","q","k","answer","figures","ref","study","section","topic","tags"].includes(key)));
      q.collection = collection;
      if (usedIds.has(q.id)) continue;
      usedIds.add(q.id);
      importedQuestionIds.set(item.id, q.id);
      result[collection].push(q);
    }
  }
  for (const [id, answer] of Object.entries(bank.say || {})) result.say[importedQuestionIds.get(id) || id] = answer;
  return result;
}
function useBanks(input){
  const b = normalizePrivateBank(input);
  const swap = (arr, next) => { arr.length = 0; arr.push(...next); };
  if (b.say && typeof b.say === "object"){ if (input === PAGE_BANKS) for (const k in SAY) delete SAY[k]; Object.assign(SAY, b.say); }
  if (b.practice.length || Array.isArray(input.practice)) swap(PRACTICE, b.practice);
  if (b.guides.length || Array.isArray(input.guides)) swap(GUIDES, b.guides);
  HAS_PRACTICE = PRACTICE.length > 0; HAS_GUIDES = GUIDES.length > 0;
  migrateQuestionProgress();
}
if ((!HAS_PRACTICE && bankFilter.collection === "practice") || (!HAS_GUIDES && bankFilter.collection === "guides")) bankFilter.collection = "original";
const GUIDE_TITLES = {accounting:"Accounting guide", ev:"Equity & Enterprise Value guide", dcf:"Valuation & DCF guide", merger:"Merger Model guide", lbo:"LBO guide"};
const collectionOk = q => bankFilter.collection === "all" || (bankFilter.collection === "original" ? q.collection !== "practice" && q.collection !== "guides" : q.collection === bankFilter.collection);
let apiKey = (() => { try{ return localStorage.getItem("sdr:apikey") || ""; }catch{ return ""; } })();

// White with black text is the default look (10-28). Anyone who had "Automatic" from before is moved
// to light once; picking a theme in Settings afterwards is respected.
if (settings.theme === "system" && !settings.themeChosen) settings.theme = "light";
function applyTheme(){ if (settings.theme === "system") document.documentElement.removeAttribute("data-theme"); else document.documentElement.dataset.theme = settings.theme; if (themeBtnReady) paintThemeBtn(); }
let themeBtnReady = false;   // set once the top-bar toggle exists (applyTheme runs before it is defined)
applyTheme();

/* ---------- Question pool ---------- */
const allQs = () => BANK.concat(PRACTICE, GUIDES, custom);
function migrateQuestionProgress(){
  const questions = allQs(), ids = new Set(questions.map(q => q.id));
  const match = text => { const candidates = questions.filter(q => q.q === text); return candidates.length === 1 ? candidates[0].id : null; };
  let changed = false;
  for (const [id, record] of Object.entries(progress)){
    if (ids.has(id)) continue;
    const next = importedQuestionIds.get(id) || match(record.q);
    if (!next || next === id) continue;
    importedQuestionIds.set(id, next);
    if (!progress[next] || (record.last || 0) > (progress[next].last || 0)) progress[next] = record;
    delete progress[id]; changed = true;
  }
  for (const list of [history, log]) for (const entry of list){
    const next = importedQuestionIds.get(entry.id) || match(entry.q);
    if (next && next !== entry.id){ entry.id = next; changed = true; }
  }
  const position = store.get("coursePos", null);
  if (importedQuestionIds.has(position)) store.set("coursePos", importedQuestionIds.get(position));
  if (changed) for (const [key, value] of Object.entries({progress, history, log})) store.set(key, value);
}
migrateQuestionProgress();
function filtered(){
  const query = (bankFilter.search||"").trim().toLowerCase();
  return allQs().filter(q =>
    collectionOk(q) &&
    (!bankFilter.topic || q.topic === bankFilter.topic) &&
    (!bankFilter.level || q.l === bankFilter.level) &&
    (!query || [q.q, q.topic, ...(q.tags||[])].join(" ").toLowerCase().includes(query)));
}
const TRACK_STYLE = {acct:["calc","c-blue"], beh:["person","c-orange"], val:["dollar","c-green"], deal:["merge","c-purple"], mkt:["globe","c-teal"], sector:["building","c-indigo"], mine:["note","c-pink"]};
const trackName = id => (TRACKS.find(t=>t.id===id)||{name:"Follow-up"}).name;
const firmTag = q => (q.tags||[]).map(t => (t.match(/Reported in (.+?) Interview/)||[])[1]).find(Boolean);

/* ---------- Mastery ---------- */
const LEVELS = [
  {id:"mastered", name:"Mastered", color:"green", short:"Mastered"},
  {id:"close", name:"Getting there", color:"blue", short:"Close"},
  {id:"work", name:"Needs work", color:"orange", short:"Work"},
  {id:"redo", name:"Really needs work", color:"red", short:"Redo"},
  {id:"new", name:"Not started", color:"gray", short:"New"},
];
const LV = Object.fromEntries(LEVELS.map(l=>[l.id,l]));
function levelOf(id){
  const p = progress[id];
  if (!p || !p.scores.length) return p && p.flag ? p.flag : p && p.out ? "mastered" : "new";
  if (p.flag) return p.flag;
  const s = p.scores, last = s.at(-1), prev = s.at(-2);
  if (last >= 8 && (prev === undefined ? last >= 9 : prev >= 7)) return "mastered";
  if (last >= 6) return "close";
  if (last >= 4) return "work";
  return "redo";
}
function mix(qs){
  const c = {mastered:0, close:0, work:0, redo:0, new:0};
  qs.forEach(q => c[levelOf(q.id)]++);
  return c;
}
function mixBar(c, total){
  const bar = h("div", {class:"bar", style:{display:"flex", height:"8px", borderRadius:"4px"}});
  ["mastered","close","work","redo"].forEach(k => { if (c[k]) bar.append(h("i", {style:{width:(c[k]/total*100)+"%", background:`var(--${LV[k].color})`, borderRadius:0}})); });
  return bar;
}
function topicLevel(c){
  const tried = c.mastered + c.close + c.work + c.redo;
  if (!tried) return "new";
  const score = (c.mastered*4 + c.close*3 + c.work*2 + c.redo*1) / tried;
  return score >= 3.5 ? "mastered" : score >= 2.75 ? "close" : score >= 2 ? "work" : "redo";
}
const SKILLS = [
  {k:"content", name:"Content", icon:"list", color:"pink", tip:"Covering the key points interviewers listen for."},
  {k:"accuracy", name:"Technical accuracy", icon:"calc", color:"red", tip:"No wrong numbers, directions or definitions."},
  {k:"structure", name:"Structure", icon:"text", color:"green", tip:"Answer first, signposts, clean close, STAR for stories."},
  {k:"concision", name:"Concision", icon:"scissors", color:"teal", tip:"Right length, no tangents, no repeating yourself."},
  {k:"delivery", name:"Delivery", icon:"bubble", color:"indigo", tip:"Few fillers and hedges, steady pace, no restarts."},
];
function skillStats(){
  const recent = history.slice(-20);
  return SKILLS.map(s => {
    const v = recent.map(x => x.sub && x.sub[s.k]).filter(x => typeof x === "number");
    const avg = v.length ? v.reduce((a,b)=>a+b,0)/v.length : null;
    const lvl = avg === null ? "new" : avg >= 8.5 ? "mastered" : avg >= 6.5 ? "close" : avg >= 4.5 ? "work" : "redo";
    return {...s, avg, n:v.length, lvl};
  });
}

/* ---------- Claude (optional) ---------- */
let sample = null;
setTimeout(async () => { if (!window.claude) return; try{ sample = await window.claude.use("sample"); }catch{ sample = null; } render(); });
const aiAvailable = () => !!(sample || apiKey);
const STYLE = {
  standard:"a first-round investment banking analyst interviewer: fair, direct, specific",
  tough:"a tough managing director at a top investment bank: strict and blunt, with zero credit for vague or rambling answers",
  coach:"a supportive interview coach: encouraging, but honest about every mistake",
};
const AI_SCHEMA = {type:"object", additionalProperties:false,
  required:["score","verdict","got_right","missed","corrections","wording","rambling","structure","improved_version","model_answer","follow_up","follow_up_keys"],
  properties:{
    score:{type:"integer"}, verdict:{type:"string"},
    got_right:{type:"array", items:{type:"string"}}, missed:{type:"array", items:{type:"string"}}, corrections:{type:"array", items:{type:"string"}},
    wording:{type:"array", items:{type:"object", additionalProperties:false, required:["said","better","why"], properties:{said:{type:"string"}, better:{type:"string"}, why:{type:"string"}}}},
    rambling:{type:"string"}, structure:{type:"string"}, improved_version:{type:"string"}, model_answer:{type:"string"},
    follow_up:{type:"string"}, follow_up_keys:{type:"array", items:{type:"string"}},
  }};
function aiPrompt(q, answer, secs, local){
  const beh = q.t === "beh";
  return `You are ${STYLE[settings.strict]}. Grade a candidate's SPOKEN answer to an investment banking interview question and coach them to a better answer.
The answer came from speech-to-text, so ignore spelling and punctuation and obvious mis-transcriptions ("a R" = AR, "PP and E" = PP&E). Do judge content, accuracy, filler, rambling, structure, length and word choice, because they matter when spoken.

QUESTION (${q.l || "general"}, ${beh ? "behavioral/fit" : "technical"}): ${q.q}
ANSWER KEY (points a strong answer covers):
${(q.k||[]).map(k=>"- "+k).join("\n") || "- (none given; use expert judgment)"}
${q.answer && q.answer.length ? `FULL REFERENCE ANSWER (from the study guide):\n${q.answer.join("\n").slice(0, 3000)}\n` : ""}${local.corrections.length ? `POSSIBLE ERRORS FLAGGED BY AN AUTOMATED CHECK (verify each; drop any that are wrong):\n${local.corrections.map(c => "- " + c).join("\n")}\n` : ""}TARGET LENGTH: about ${q.s||60} seconds. ACTUAL: ${secs ? secs+" seconds" : "unknown"}, ${local.stats.words} words.
AUTOMATED DELIVERY CHECK: ${local.stats.fillers} filler words, ${local.stats.hedges} hedges${local.stats.wpm ? ", "+local.stats.wpm+" wpm" : ""}.
${beh ? "For behavioral answers judge structure (STAR for stories), specificity, ownership (\"I\" not \"we\"), authenticity, concision and whether it would persuade a banker. The candidate's personal facts are theirs; don't penalize what you can't verify, and don't invent facts in rewrites." : "For technical answers any factual error or wrong number is a major deduction. Check every number and direction (up/down) they say."}

CANDIDATE ANSWER:
"""${answer.slice(0, 6000)}"""

Return JSON:
- score: integer 0-10, the score a real interviewer would give
- verdict: one sentence spoken directly to the candidate
- got_right: short points they nailed
- missed: key points they left out
- corrections: anything they said that is WRONG, as "what they said -> what's correct" (empty if none)
- wording: up to 5 specific phrases from their answer to upgrade: {said, better, why}
- rambling: one or two sentences on what to cut or tighten (empty string if concise)
- structure: one or two sentences on how to order the answer better
- improved_version: their own answer rewritten to a 9/10, keeping their voice and facts, sized to the target length
- model_answer: an ideal spoken answer, natural style, sized to the target length
- follow_up: one realistic follow-up question an interviewer would ask next, based on their answer
- follow_up_keys: 2-4 points a strong follow-up answer covers`;
}
async function callClaude(prompt, signal){
  if (sample) return sample.json(prompt + "\n\nReply with only the JSON object.", {signal, cache:false});
  if (!apiKey) throw {code:"no_ai"};
  const body = {model: settings.aiModel || "claude-opus-5-5", max_tokens: 8000,
    messages:[{role:"user", content: prompt}],
    output_config:{format:{type:"json_schema", schema: AI_SCHEMA}}};
  const headers = {"content-type":"application/json", "x-api-key":apiKey, "anthropic-version":"2023-06-01", "anthropic-dangerous-direct-browser-access":"true"};
  const r = await fetch("https://api.anthropic.com/v1/messages", {method:"POST", headers, body: JSON.stringify(body), signal});
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw {code: r.status === 401 ? "bad_key" : r.status === 429 ? "rate_limited" : "api_error", message: data.error && data.error.message};
  if (data.stop_reason === "refusal") throw {code:"refusal"};
  const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  try { return JSON.parse(text); } catch { throw {code:"invalid_json"}; }
}

/* No spoken audio: the app never talks. */
const synth = null;

/* ---------- Speech in + level meter ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = {rec:null, on:false, base:"", final:"", stream:null, ctx:null, raf:0, pcm:[], rate:16000, proc:null, session:0};

// Finance words speech engines mishear, written the way an interviewer would see them.
const TERM_FIXES = [
  [/\b(?:e[\s-]?bit[\s-]?d[\s-]?a|ebit da|eb it da|a bit da|e bitda|ebita\b(?= (?:margin|multiple|of|is|was|minus|plus)))/gi, "EBITDA"],
  [/\b(?:whack|wack|w a c c|wac|whac|rack)\b(?! (?:up|of (?:the|my)|on)\b)/gi, "WACC"], [/\be[\s-]bit\b/gi, "EBIT"],
  [/\b(?:cap[\s-]?ex|cap x|capx)\b/gi, "CapEx"], [/\bop[\s-]?ex\b/gi, "OpEx"],
  [/\bp\s?(?:and|&|n)\s?l\b/gi, "P&L"], [/\bp\s?p\s?(?:and|&|n)\s?e\b/gi, "PP&E"], [/\bd\s?(?:and|&|n)\s?a\b(?! (?:lot|few|couple|bit))/g, "D&A"],
  [/\bm\s?(?:and|&|n)\s?a\b/gi, "M&A"], [/\bs\s?g\s?(?:and|&|n)\s?a\b/gi, "SG&A"],
  // "debt principal" heard as "principle"; "pre-tax" as "free tax"; "appear on the IS" as "appeal"
  [/\b((?:repay\w*|pay(?:ing|s)? (?:back|down|off)|debt|loan|bond|the|that|its|of) )principles?\b(?! of\b)/gi, (m, a) => a + (/s$/i.test(m) ? "principals" : "principal")],
  [/\bprinciples? (repayments?|payments?|amount|balance|outstanding)\b/gi, "principal $1"],
  [/\bfree[\s-]tax\b/gi, "pre-tax"],
  // "cash from operations" heard as "cash reform operations"; "cash on the balance sheet" as "cash economy balance sheet"
  [/\bcash reform\b/gi, "cash from"], [/\bcash economy balance sheet\b/gi, "cash on the balance sheet"],
  // Heard in real practice answers: statement and line-item names misheard as everyday words.
  [/\bincome (?:standard|statements?\s?ment|stamen)\b/gi, "income statement"],
  [/\b(?:password|cash low|cash fow|cash flo|cashflow) statements?\b/gi, m => /s$/i.test(m) ? "cash flow statements" : "cash flow statement"],
  [/\b(?:written|return|returned|retain|retaining) earnings\b/gi, "retained earnings"],
  [/\b(?:share (?:sales|sale|of all this|holders|holder)|shares sold as|shareholder) equity\b/gi, "shareholders' equity"],
  [/\b(?:neck[\s-]chang(?:e|ing)|net[\s-]changing) (?:in )?cash\b/gi, "net change in cash"],
  [/\bcost a good sold\b|\bcost of good sold\b/gi, "cost of goods sold"],
  [/\bpre[\s-]?taxing income\b/gi, "pre-tax income"],
  [/\bevita\b/gi, "EBITDA"],
  [/\bother side of the library\b/gi, "other side, liabilities"],
  [/(\$?\d[\d,.]*) (game)(s?)\b/gi, "$1 gain$3"],
  [/\bappeal (in|on) (the )?income statement\b/gi, "appear $1 $2income statement"],
  // "the parent company" heard as "the farther company" / "the father company"
  [/\b(the|a|its|our) (?:farther|father|fair it|pairing) compan(y|ies)\b/gi, "$1 parent compan$2"],
  // "deferred revenue" heard as "the further revenue" / "differed revenue" / "referred revenue"
  [/\b(?:(?:the |a |as )further|(?:the |a )?(?:differed|refereed|referred|deferment|ferg|ferd|furred|fergus|the ferg)) revenues?\b(?! growth)/gi, m => ((m.match(/^(?:the|a|as) /i) || [""])[0]) + (/s$/i.test(m) ? "deferred revenues" : "deferred revenue")],
  // "accrued expenses" heard as "crude expenses" / "a crude expenses"
  [/\b(?:a |the )?(?:crude|a crude|accrude|acrude|a crewed|crewed) (expenses?|liabilit(?:y|ies)|interest|revenue)\b/gi, (m, w) => (/^the /i.test(m) ? "the " : "") + "accrued " + w],
  [/\bd c f\b/gi, "DCF"], [/\bmo[iy]k\b/gi, "MOIC"], [/\bA(DCF|LBO|WACC|IRR)\b/g, "a $1"], [/\bDNA\b/g, "D&A"], [/\b(?:networking|network and|network) capital\b/gi, "net working capital"],
  [/\bin (?:the )?bit\b/gi, m => m], [/\bcash flow from (?:operating|operations) activities\b/gi, "cash flow from operating activities"], [/\bl b o\b/gi, "LBO"], [/\bi r r\b/gi, "IRR"], [/\be p s\b/gi, "EPS"], [/\bm o i c\b|\bmoik\b/gi, "MOIC"],
  [/\bc o g s\b|\bcogs\b/gi, "COGS"], [/\ba pick\b|\bapick\b/gi, "APIC"], [/\b(?:n o l|knoll)s?\b/gi, m => /s$/i.test(m) ? "NOLs" : "NOL"],
  [/\bd t l\b/gi, "DTL"], [/\bd t a\b/gi, "DTA"], [/\bn w c\b/gi, "NWC"], [/\bt e v\b/gi, "TEV"], [/\be v\b(?= ?(?:\/|to|is|of|equals|goes|would|will))/gi, "EV"],
  [/\b(up|down|by|is|of|was) for\b(?=[\s.,;!?]|$)(?! (?:the|a|an|each|every|that|this|it|us|them|example|instance|me|you)\b)/gi, "$1 four"],
  [/\b(up|down|by|is|of|was) to\b(?=[.,;!?]|$)/gi, "$1 two"],
  // IRR heard as "the ir" or "the herb" ("leverage magnifies the herb")
  [/\b((?:magnif|boost|increas|reduc|lower|rais|hurt|improv|driv|lift|cut|dent|juic|enhanc)\w* (?:the |your |their |our )?)herb\b/gi, "$1IRR"],
  [/\b(the|an|your|our|their|higher|lower|levered|unlevered) (?:ir|i r)\b/gi, "$1 IRR"], [/\bir\b(?=[\s.,;!?]|$)/g, "IRR"],
];
function fixTerms(t){ let s = String(t || ""); for (const [re, rep] of TERM_FIXES) s = s.replace(re, rep); return s; }

/* ---------- Smart term predictor ----------
   Speech engines guess the nearest everyday word when they hear jargon ("whack" for WACC).
   For each question we know which terms to expect: a finance vocabulary plus the terms in
   the question, its key and its model answer. Any 1-3 word stretch of the transcript that
   SOUNDS like an expected term (same phonetic key, at most one sound off) and isn't plain
   English is replaced with the term. Everyday words are never touched, except when they
   sound exactly like a term this question is about ("a creative" in an accretion question). */
const FIN_TERMS = [
  ["EBITDA","ebitda","e bit da","ee bit dah","a bit da","eebitda"], ["EBIT","ebit","e bit","ee bit"], ["EBITDAR","ebitdar"],
  ["WACC","wack","whack","wak"], ["CapEx","capex","cap ex","cap x","capx"], ["OpEx","opex","op ex"], ["APIC","a pick","apic","a pic"],
  ["MOIC","moic","moyk","moik","mo ick"], ["NOL","noll","knoll"], ["NOLs","nolls","knolls"], ["COGS","cogs","cogz","cogues"], ["CAPM","cap m","capem","capm"],
  ["GAAP","gap"], ["IFRS","ifrs"], ["LIFO","lifo","life oh","lie foe"], ["FIFO","fifo","fife oh","fie foe"], ["SOFR","sofer","sofa","sofr"], ["PIK","pick"],
  ["amortization","amortization","a mortization","amortisation","amore tization"], ["amortize","amortize","a mortize"], ["amortized","amortized","a mortized"],
  ["accretive","accretive","a cretive","acreative"], ["accretion","accretion","a cretion"], ["dilutive","dilutive","delutive","dilutive"], ["dilution","dilution","delution"],
  ["depreciation","depreciation","depriciation"], ["impairment","impairment","im pairment"], ["goodwill","goodwill","good will"],
  ["receivables","receivables","receivable s"], ["payables","payables","payable s"], ["accruals","accruals"], ["accrued","accrued"],
  ["unlevered","unlevered","un levered","unleavened"], ["levered","levered","leavered"], ["recapitalization","recapitalization","re capitalization"],
  ["mezzanine","mezzanine","mezz a nine","mezzinine"], ["tranche","tranche","tranch","traunch"], ["tranches","tranches","traunches"], ["covenants","covenants"], ["covenant","covenant"],
  ["revolver","revolver"], ["synergies","synergies","sinergies"], ["precedent transactions","precedent transactions","president transactions"], ["precedents","precedents","presidents"],
  ["comps","comps","comms"], ["perpetuity","perpetuity","perpetuity"], ["Gordon Growth","gordon growth","gordon grove"], ["terminal value","terminal value"],
  ["enterprise value","enterprise value"], ["equity value","equity value"], ["net debt","net debt","net dead"], ["pro forma","pro forma","pro former","proforma"],
  ["divestiture","divestiture","divest a ture"], ["carve-out","carveout"], ["spin-off","spinoff"],
  ["fairness opinion","fairness opinion"], ["CIM","sim"], ["LOI","l o i"], ["IPO","i p o"], ["bookrunner","book runner"], 
  ["basis points","basis points"], ["convexity","convexity","convex ity"], ["sensitivities","sensitivities"], ["football field","football field"],
  ["deferred revenue","deferred revenue","differed revenue"], ["deferred tax","deferred tax","differed tax"], ["dividends","dividends","divid ends"],
  ["treasury stock","treasury stock"], ["preferred stock","preferred stock","prefered stock"], ["convertible","convertible","convert able"], ["warrants","warrants"],
  ["leveraged buyout","leveraged buyout","leverage buyout","leveraged by out"], ["LBO","elbow"], ["beta","beta"], ["unlevered beta","unlevered beta"],
];
// Plain English, including plurals, possessives, -ed/-ing forms and hyphenated words.
// Everyday finance words that are right as heard, never mishearings of a term.
const FIN_PLAIN = new Set("lever levers relever delever overlevered underlevered inflow inflows outflow outflows upside downside payback writedown writeoff markup buyback buybacks rollover dropdown earnout earnouts holdco opco topline bottomline paydown payout payouts".split(" "));
function isCommon(w){
  const base = String(w).toLowerCase().replace(/[’'](?:s|d|ll|re|ve|m)$|n[’']t$|s[’']$|[’']$/, "");
  if (!base || COMMON.has(base) || FIN_PLAIN.has(base.replace(/-/g, ""))) return true;
  if (base.includes("-")) return base.split("-").every(p => !p || p.length <= 3 || isCommon(p));
  if (/ies$/.test(base) && COMMON.has(base.slice(0, -3) + "y")) return true;
  for (const suf of ["s", "es", "ed", "d", "ing", "ly", "er", "ers", "ment", "ments", "al"]) if (base.endsWith(suf) && COMMON.has(base.slice(0, -suf.length))) return true;
  if (/ing$/.test(base) && COMMON.has(base.slice(0, -3) + "e")) return true;
  return false;
}
const stemOf = w => String(w).toLowerCase().replace(/[’']s$/, "").replace(/(?:ies|es|s|ed|ing)$/, "");
const COMMON = new Set("the of and to a in for is on that by this with i you it not or be are from at as your all have new more an was we will home can us about if page my has search free but our one other do no information time they site he up may what which their news out use any there see only so his when contact here business who web also now help get pm view online first am been would how were me services some these click its like service than find price date back top people had list name just over state year day into email two health world re next used go work last most products music buy data make them should product system post her city add policy number such please available copyright support message after best software then jan good video well where info rights public books high school through each links she review years order very privacy book items company read group need many user said de does set under general research university january mail full map reviews program life know games way days management part could great united hotel real item international center ebay must store travel comments made development report off member details line terms before hotels did send right type because local those using results office education national car design take posted internet address community within states area want phone dvd shipping reserved subject between forum family long based code show even black check special prices website index being women much sign file link open today technology south case project same pages uk version section own found sports house related security both county american photo game members power while care network down computer systems three total place end following download him without per access think north resources current posts big media law control water history pictures size art personal since including guide shop directory board location change white text small rating rate government children during usa return students shopping account times sites level digital profile previous form events love old john main call hours image department title description non insurance another why shall property class cd still money quality every listing content country private little visit save tools low reply customer december compare movies include college value article york man card jobs provide food source author different press learn sale around print course job canada process teen room stock training too credit point join science men categories advanced west sales look english left team estate box conditions select windows photos gay thread week category note live large gallery table register however june october november market library really action start series model features air industry plan human provided tv yes required second hot accessories cost movie forums march la september better say questions july yahoo going medical test friend come dec server pc study application cart staff articles san feedback again play looking issues april never users complete street topic comment financial things working against standard tax person below mobile less got blog party payment equipment login student let programs offers legal above recent park stores side act problem red give memory performance social august quote language story sell options experience rates create key body young america important field few east paper single ii age activities club example girls additional password latest something road gift question changes night ca hard texas oct pay four poker status browse issue range building seller court february always result audio light write war nov offer blue groups al easy given files event release analysis request fax china making picture needs possible might professional yet month major star areas future space committee hand sun cards problems london washington meeting rss become interest id child keep enter california share similar garden schools million added reference companies listed baby learning energy run delivery net popular term film stories put computers journal reports co try welcome central images president notice original head radio until cell color self council away includes track australia discussion archive once others entertainment agreement format least society months log safety friends sure faq trade edition cars messages marketing tell further updated association able having provides david fun already green studies close common drive specific several gold feb living sep collection called short arts lot ask display limited powered solutions means director daily beach past natural whether due et electronics five upon period planning database says official weather mar land average done technical window france pro region island record direct microsoft conference environment records st district calendar costs style url front statement update parts aug ever downloads early miles sound resource present applications either ago document word works material bill apr written talk federal hosting rules final adult tickets thing centre requirements via cheap kids finance true minutes else mark third rock gifts europe reading topics bad individual tips plus auto cover usually edit together videos percent fast function fact unit getting global tech meet far economic en player projects lyrics often subscribe submit germany amount watch included feel though bank risk thanks everything deals various words linux jul production commercial james weight town heart advertising received choose treatment newsletter archives points knowledge magazine error camera jun girl currently construction toys registered clear golf receive domain methods chapter makes protection policies loan wide beauty manager india position taken sort listings models michael known half cases step engineering florida simple quick none wireless license paul friday lake whole annual published later basic sony shows corporate google church method purchase customers active response practice hardware figure materials fire holiday chat enough designed along among death writing speed html countries loss face brand discount higher effects created remember standards oil bit yellow political increase advertise kingdom base near environmental thought stuff french storage oh japan doing loans shoes entry stay nature orders availability africa summary turn mean growth notes agency king monday european activity copy although drug pics western income force cash employment overall bay river commission ad package contents seen players engine port album regional stop supplies started administration bar institute views plans double dog build screen exchange types soon sponsored lines electronic continue across benefits needed season apply someone held ny anything printer condition effective believe organization effect asked eur mind sunday selection casino pdf lost tour menu volume cross anyone mortgage hope silver corporation wish inside solution mature role rather weeks addition came supply nothing certain usr executive running lower necessary union jewelry according dc clothing mon com particular fine names robert homepage hour gas skills six bush islands advice career military rental decision leave british teens pre huge sat woman facilities zip bid kind sellers middle move cable opportunities taking values division coming tuesday object lesbian appropriate machine logo length actually nice score statistics client ok returns capital follow sample investment sent shown saturday christmas england culture band flash ms lead george choice went starting registration fri thursday courses consumer hi airport foreign artist outside furniture levels channel letter mode phones ideas wednesday structure fund summer allow degree contract button releases wed homes super male matter custom virginia almost took located multiple asian distribution editor inn industrial cause potential song cnet ltd los hp focus late fall featured idea rooms female responsible inc communications win associated thomas primary cancer numbers reason tool browser spring foundation answer voice eg friendly schedule documents communication purpose feature bed comes police everyone independent ip approach cameras brown physical operating hill maps medicine deal hold ratings chicago forms glass happy tue smith wanted developed thank safe unique survey prior telephone sport ready feed animal sources mexico population pa regular secure navigation operations therefore simply evidence station christian round paypal favorite understand option master valley recently probably thu rentals sea built publications blood cut worldwide improve connection publisher hall larger anti networks earth parents nokia impact transfer introduction kitchen strong tel carolina wedding properties hospital ground overview ship accommodation owners disease tx excellent paid italy perfect hair opportunity kit classic basis command cities william express award distance tree peter assessment ensure thus wall ie involved el extra especially interface partners budget rated guides success maximum ma operation existing quite selected boy amazon patients restaurants beautiful warning wine locations horse vote forward flowers stars significant lists technologies owner retail animals useful directly manufacturer ways est son providing rule mac housing takes iii gmt bring catalog searches max trying mother authority considered told xml traffic programme joined input strategy feet agent valid bin modern senior ireland teaching door grand testing trial charge units instead canadian cool normal wrote enterprise ships entire educational md leading metal positive fl fitness chinese opinion mb asia football abstract uses output funds mr greater likely develop employees artists alternative processing responsibility resolution java guest seems publication pass relations trust van contains session multi photography republic fees components vacation century academic assistance completed skin graphics indian prev ads mary il expected ring grade dating pacific mountain organizations pop filter mailing vehicle longer consider int northern behind panel floor german buying match proposed default require iraq boys outdoor deep morning otherwise allows rest protein plant reported hit transportation mm pool mini politics partner disclaimer authors boards faculty parties fish membership mission eye string sense modified pack released stage internal goods recommended born unless richard detailed japanese race approved background target except character usb maintenance ability maybe functions ed moving brands places php pretty trademarks phentermine spain southern yourself etc winter battery youth pressure submitted boston debt keywords medium television interested core break purposes throughout sets dance wood msn itself defined papers playing awards fee studio reader virtual device established answers rent las remote dark programming external apple le regarding instructions min offered theory enjoy remove aid surface minimum visual host variety teachers isbn martin manual block subjects agents increased repair fair civil steel understanding songs fixed wrong beginning hands associates finally az updates desktop classes paris ohio gets sector capacity requires jersey un fat fully father electric saw instruments quotes officer driver businesses dead respect unknown specified restaurant mike trip pst worth mi procedures poor teacher eyes relationship workers farm georgia peace traditional campus tom showing creative coast benefit progress funding devices lord grant sub agree fiction hear sometimes watches careers beyond goes families led museum themselves fan transport interesting blogs wife evaluation accepted former implementation ten hits zone complex th cat galleries references die presented jack flat flow agencies literature respective parent spanish michigan columbia setting dr scale stand economy highest helpful monthly critical frame musical definition secretary angeles networking path australian employee chief gives kb bottom magazines packages detail francisco laws changed pet heard begin individuals colorado royal clean switch russian largest african guy titles relevant guidelines justice connect bible dev cup basket applied weekly vol installation described demand pp suite vegas na square chris attention advance skip diet army auction gear lee os difference allowed correct charles nation selling lots piece sheet firm seven older illinois regulations elements species jump cells module resort facility random pricing dvds certificate minister motion looks fashion directions visitors documentation monitor trading forest calls whose coverage couple giving chance vision ball ending clients actions listen discuss accept automotive naked goal successful sold wind communities clinical situation sciences markets lowest highly publishing appear emergency developing lives currency leather determine temperature palm announcements patient actual historical stone bob commerce ringtones perhaps persons difficult scientific satellite fit tests village accounts amateur ex met pain xbox particularly factors coffee www settings buyer cultural steve easily oral ford poster edge functional root au fi closed holidays ice pink zealand balance monitoring graduate replies shot nc architecture initial label thinking scott llc sec recommend canon league waste minute bus provider optional dictionary cold accounting manufacturing sections chair fishing effort phase fields bag fantasy po letters motor va professor context install shirt apparel generally continued foot mass crime count breast techniques ibm rd johnson sc quickly dollars websites religion claim driving permission surgery patch heat wild measures generation kansas miss chemical doctor task reduce brought himself nor component enable exercise bug santa mid guarantee leader diamond israel se processes soft servers alone meetings seconds jones arizona keyword interests flight congress fuel username walk produced italian paperback classifieds wait supported pocket saint rose freedom argument competition creating jim drugs joint premium providers fresh characters attorney upgrade di factor growing thousands km stream apartments pick hearing eastern auctions therapy entries dates generated signed upper administrative serious prime samsung limit began louis steps errors shops del efforts informed ga ac thoughts creek ft worked quantity urban practices sorted reporting essential myself tours platform load affiliate labor immediately admin nursing defense machines designated tags heavy covered recovery joe guys integrated configuration merchant comprehensive expert universal protect drop solid cds presentation languages became orange compliance vehicles prevent theme rich im campaign marine improvement vs guitar finding pennsylvania examples ipod saying spirit ar claims challenge motorola acceptance strategies mo seem affairs touch intended towards sa goals hire election suggest branch charges serve affiliates reasons magic mount smart talking gave ones latin multimedia xp avoid certified manage corner rank computing oregon element birth virus abuse interactive requests separate quarter procedure leadership tables define racing religious facts breakfast kong column plants faith chain developer identify avenue missing died approximately domestic sitemap recommendations moved houston reach comparison mental viewed moment extended sequence inch attack sorry centers opening damage lab reserve recipes cvs gamma plastic produce snow placed truth counter failure follows eu weekend dollar camp ontario automatically des minnesota films bridge native fill williams movement printing baseball owned approval draft chart played contacts cc jesus readers clubs lcd wa jackson equal adventure matching offering shirts profit leaders posters institutions assistant variable ave dj advertisement expect parking headlines yesterday compared determined wholesale workshop russia gone codes kinds extension seattle statements golden completely teams fort cm wi lighting senate forces funny brother gene turned portable tried electrical applicable disc returned pattern ct boat named theatre laser earlier manufacturers sponsor classical icon warranty dedicated indiana direction harry basketball objects ends delete evening assembly nuclear taxes mouse signal criminal issued brain sexual wisconsin powerful dream obtained false da cast flower felt personnel passed supplied identified falls pic soul aids opinions promote stated stats hawaii professionals appears carry flag decided nj covers hr em advantage hello designs maintain tourism priority newsletters adults clips savings iv graphic atom payments rw estimated binding brief ended winning eight anonymous iron straight script served wants miscellaneous prepared void dining alert integration atlanta dakota tag interview mix framework disk installed queen vhs credits clearly fix handle sweet desk criteria pubmed dave massachusetts diego hong vice associate ne truck behavior enlarge ray frequently revenue measure changing votes du duty looked discussions bear gain festival laboratory ocean flights experts signs lack depth iowa whatever logged laptop vintage train exactly dry explore maryland spa concept nearly eligible checkout reality forgot handling origin knew gaming feeds billion destination scotland faster intelligence dallas bought con ups nations route followed specifications broken tripadvisor frank alaska zoom blow battle residential anime speak decisions industries protocol query clip partnership editorial nt expression es equity provisions speech wire principles suggestions rural shared sounds replacement tape strategic judge spam economics acid bytes cent forced compatible fight apartment height null zero speaker filed gb netherlands obtain bc consulting recreation offices designer remain managed pr failed marriage roll korea banks fr participants secret bath aa kelly leads negative austin favorites toronto theater springs missouri andrew var perform healthy translation estimates font assets injury mt joseph ministry drivers lawyer figures married protected proposal sharing philadelphia portal waiting birthday beta fail gratis banking officials brian toward won slightly assist conduct contained lingerie legislation calling parameters jazz serving bags profiles miami comics matters houses doc postal relationships tennessee wear controls breaking combined ultimate wales representative frequency introduced minor finish departments residents noted displayed mom reduced physics rare spent performed extreme samples davis daniel bars reviewed row oz forecast removed helps singles administrator cycle amounts contain accuracy dual rise usd sleep mg bird pharmacy brazil creation static scene hunter addresses lady crystal famous writer chairman violence fans oklahoma speakers drink academy dynamic gender eat permanent agriculture dell cleaning constitutes portfolio practical delivered collectibles infrastructure exclusive seat concerns vendor originally intel utilities philosophy regulation officers reduction aim bids referred supports nutrition recording regions junior toll les cape ann rings meaning tip secondary wonderful mine ladies henry ticket announced guess agreed prevention whom ski soccer math import posting presence instant mentioned automatic healthcare viewing maintained ch increasing majority connected christ dan dogs sd directors aspects austria ahead moon participation scheme utility preview fly manner matrix containing combination devel amendment despite strength guaranteed turkey libraries proper distributed degrees singapore enterprises delta fear seeking inches phoenix rs convention shares principal daughter standing comfort colors wars cisco ordering kept alpha appeal cruise bonus certification previously hey bookmark buildings specials beat disney household batteries adobe smoking bbc becomes drives arms alabama tea improved trees avg achieve positions dress subscription dealer contemporary sky utah nearby rom carried happen exposure panasonic hide permalink signature gambling refer miller provision outdoors clothes caused luxury babes frames certainly indeed newspaper toy circuit layer printed slow removal easier src liability trademark hip printers faqs nine adding kentucky mostly eric spot taylor trackback prints spend factory interior revised grow americans optical promotion relative amazing clock dot hiv identity suites conversion feeling hidden reasonable victoria serial relief revision broadband influence ratio pda importance rain onto dsl planet webmaster copies recipe zum permit seeing proof dna diff tennis bass prescription bedroom empty instance hole pets ride licensed orlando specifically tim bureau maine sql represent conservation pair ideal specs recorded don pieces finished parks dinner lawyers sydney stress cream ss runs trends yeah discover ap patterns boxes louisiana hills javascript fourth nm advisor mn marketplace nd evil aware wilson shape evolution irish certificates objectives stations suggested gps op remains acc greatest firms concerned euro operator structures generic encyclopedia usage cap ink charts continuing mixed census interracial peak tn competitive exist wheel transit suppliers salt compact poetry lights tracking angel bell keeping preparation attempt receiving matches accordance width noise engines forget array discussed accurate stephen elizabeth climate reservations pin playstation alcohol greek instruction managing annotation sister raw differences walking explain smaller newest establish gnu happened expressed jeff extent sharp lesbians ben lane paragraph kill mathematics aol compensation ce export managers aircraft modules sweden conflict conducted versions employer occur percentage knows mississippi describe concern backup requested citizens connecticut heritage personals immediate holding trouble spread coach kevin agricultural expand supporting audience assigned jordan collections ages participate plug specialist cook affect virgin experienced investigation raised hat institution directed dealers searching sporting helping perl affected lib bike totally plate expenses indicate blonde ab proceedings transmission anderson utc characteristics der lose organic seek experiences albums cheats extremely verzeichnis contracts guests hosted diseases concerning developers equivalent chemistry tony neighborhood nevada kits thailand variables agenda anyway continues tracks advisory cam curriculum logic template prince circle soil grants anywhere psychology responses atlantic wet circumstances edward investor identification ram leaving wildlife appliances matt elementary cooking speaking sponsors fox unlimited respond sizes plain exit entered iran arm keys launch wave checking costa belgium printable holy acts guidance mesh trail enforcement symbol crafts highway buddy hardcover observed dean setup poll booking glossary fiscal celebrity styles denver unix filled bond channels ericsson appendix notify blues chocolate pub portion scope hampshire supplier cables cotton bluetooth controlled requirement authorities biology dental killed border ancient debate representatives starts pregnancy causes arkansas biography leisure attractions learned transactions notebook explorer historic attached opened tm husband disabled authorized crazy upcoming britain concert retirement scores financing efficiency sp comedy adopted efficient weblog linear commitment specialty bears jean hop carrier edited constant visa mouth jewish meter linked portland interviews concepts nh gun reflect pure deliver wonder lessons fruit begins qualified reform lens alerts treated discovery draw mysql classified relating assume confidence alliance fm confirm warm neither lewis howard offline leaves engineer lifestyle consistent replace clearance connections inventory converter organisation babe checks reached becoming safari objective indicated sugar crew legs sam stick securities allen pdt relation enabled genre slide montana volunteer tested rear democratic enhance switzerland exact bound parameter adapter processor node formal dimensions contribute lock hockey storm micro colleges laptops mile showed challenges editors mens threads bowl supreme brothers recognition presents ref tank submission dolls estimate encourage navy kid regulatory inspection consumers cancel limits territory transaction manchester weapons paint delay pilot outlet contributions continuous db czech resulting cambridge initiative novel pan execution disability increases ultra winner idaho contractor ph episode examination potter dish plays bulletin ia pt indicates modify oxford adam truly epinions painting committed extensive affordable universe candidate databases patent slot psp outstanding ha eating perspective planned watching lodge messenger mirror tournament consideration ds discounts sterling sessions kernel stocks buyers journals gray catalogue ea jennifer antonio charged broad taiwan und chosen demo greece lg swiss sarah clark hate terminal publishers nights behalf caribbean liquid rice nebraska loop salary reservation foods gourmet guard properly orleans saving nfl remaining empire resume twenty newly raise prepare avatar gary depending illegal expansion vary hundreds rome arab lincoln helped premier tomorrow purchased milk decide consent drama visiting performing downtown keyboard contest collected nw bands boot suitable ff absolutely millions lunch audit push chamber guinea findings muscle featuring iso implement clicking scheduled polls typical tower yours sum misc calculator significantly chicken temporary attend shower alan sending jason tonight dear sufficient holdem shell province catholic oak vat awareness vancouver governor beer seemed contribution measurement swimming spyware formula constitution packaging solar jose catch jane pakistan ps reliable consultation northwest sir doubt earn finder unable periods classroom tasks democracy attacks kim wallpaper merchandise const resistance doors symptoms resorts biggest memorial visitor twin forth insert baltimore gateway ky dont alumni drawing candidates charlotte ordered biological fighting transition happens preferences spy romance instrument bruce split themes powers heaven br bits pregnant twice classification focused egypt physician hollywood bargain wikipedia cellular norway vermont asking blocks normally lo spiritual hunting diabetes suit ml shift chip res sit bodies photographs cutting wow simon writers marks flexible loved mapping numerous relatively birds satisfaction represents char indexed pittsburgh superior preferred saved paying cartoon shots intellectual moore granted choices carbon spending comfortable magnetic interaction listening effectively registry crisis outlook massive denmark employed bright treat header cs poverty formed piano echo que grid sheets patrick experimental puerto revolution consolidation displays plasma allowing earnings voip mystery landscape dependent mechanical journey delaware bidding consultants risks banner applicant charter fig barbara cooperation counties acquisition ports implemented sf directories recognized dreams blogger notification kg licensing stands teach occurred textbooks rapid pull hairy diversity cleveland ut reverse deposit seminar investments latina nasa wheels specify accessibility dutch sensitive templates formats tab depends boots holds router concrete si editing poland folder womens css completion upload pulse universities technique contractors voting courts notices subscriptions calculate mc detroit alexander broadcast converted metro toshiba anniversary improvements strip specification pearl accident nick accessible accessory resident plot qty possibly airline typically representation regard pump exists arrangements smooth conferences uniprotkb strike consumption birmingham flashing lp narrow afternoon threat surveys sitting putting consultant controller ownership committees legislative researchers vietnam trailer anne castle gardens missed malaysia unsubscribe antique labels willing bio molecular acting heads stored exam logos residence attorneys antiques density hundred ryan operators strange sustainable philippines statistical beds mention innovation pcs employers grey parallel honda amended operate bills bold bathroom stable opera definitions von doctors lesson cinema asset ag scan elections drinking reaction blank enhanced entitled severe generate stainless newspapers hospitals vi deluxe humor aged monitors exception lived duration bulk successfully indonesia pursuant sci fabric edt visits primarily tight domains capabilities pmid contrast recommendation flying recruitment sin berlin cute organized ba para siemens adoption improving cr expensive meant capture pounds buffalo organisations plane pg explained seed programmes desire expertise mechanism camping ee jewellery meets welfare peer caught eventually marked driven measured medline bottle agreements considering innovative marshall massage rubber conclusion closing tampa thousand meat legend grace susan ing ks adams python monster alex bang villa bone columns disorders bugs collaboration hamilton detection ftp cookies inner formation tutorial med engineers entity cruises gate holder proposals moderator sw tutorials settlement portugal lawrence roman duties valuable tone collectables ethics forever dragon busy captain fantastic imagine brings heating leg neck hd wing governments purchasing scripts abc stereo appointed taste dealing commit tiny operational rail airlines liberal livecam jay trips gap sides tube turns corresponding descriptions cache belt jacket determination animation oracle er matthew lease productions aviation hobbies proud excess disaster console commands jr telecommunications instructor giant achieved injuries shipped seats approaches biz alarm voltage anthony nintendo usual loading stamps appeared franklin angle rob vinyl highlights mining designers melbourne ongoing worst imaging betting scientists liberty wyoming blackjack argentina era convert possibility analyst commissioner dangerous garage exciting reliability thongs gcc unfortunately respectively volunteers attachment ringtone finland morgan derived pleasure honor asp oriented eagle desktops pants columbus nurse prayer appointment workshops hurricane quiet luck postage producer represented mortgages dial responsibilities cheese comic carefully jet productivity investors crown par underground diagnosis maker crack principle picks vacations gang semester calculated fetish applies casinos appearance smoke apache filters incorporated nv craft cake notebooks apart fellow blind lounge mad algorithm semi coins andy gross strongly cafe valentine hilton ken proteins horror su exp familiar capable douglas debian till involving pen investing christopher admission epson shoe elected carrying victory sand madison terrorism joy editions cpu mainly ethnic ran parliament actor finds seal situations fifth allocated citizen vertical corrections structural municipal describes prize sr occurs jon absolute disabilities consists anytime substance prohibited addressed lies pipe soldiers nr guardian lecture simulation layout initiatives ill concentration classics lbs lay interpretation horses lol dirty deck wayne donate taught bankruptcy mp worker optimization alive temple substances prove discovered wings breaks genetic restrictions participating waters promise thin exhibition prefer ridge cabinet modem harris mph bringing sick dose evaluate tiffany tropical collect bet composition toyota streets nationwide vector definitely shaved turning buffer purple existence commentary larry limousines developments def immigration destinations lets mutual pipeline necessarily syntax li attribute prison skill chairs nl everyday apparently surrounding mountains moves popularity inquiry ethernet checked exhibit throw trend sierra visible cats desert postposted ya oldest rhode nba coordinator obviously mercury steven handbook greg navigate worse summit victims epa spaces fundamental burning escape coupons somewhat receiver substantial tr progressive cialis bb boats glance scottish championship arcade richmond sacramento impossible ron russell tells obvious fiber depression graph covering platinum judgment bedrooms talks filing foster modeling passing awarded testimonials trials tissue nz memorabilia clinton masters bonds cartridge alberta explanation folk org commons cincinnati subsection fraud electricity permitted spectrum arrival okay pottery emphasis roger aspect workplace awesome mexican confirmed counts priced wallpapers hist crash lift desired inter closer assumes heights shadow riding infection firefox lisa expense grove eligibility venture clinic korean healing princess mall entering packet spray studios involvement dad buttons placement observations vbulletin funded thompson winners extend roads subsequent pat dublin rolling fell motorcycle yard disclosure establishment memories nelson te arrived creates faces tourist av mayor murder sean adequate senator yield presentations grades cartoons pour digest reg lodging tion dust hence wiki entirely replaced radar rescue undergraduate losses combat reducing stopped occupation lakes donations associations citysearch closely radiation diary seriously kings shooting kent adds nsw ear flags pci baker launched elsewhere pollution conservative guestbook shock effectiveness walls abroad ebony tie ward drawn arthur ian visited roof walker demonstrate atmosphere suggests kiss beast ra operated experiment targets overseas purchases dodge counsel federation pizza invited yards assignment chemicals gordon mod farmers rc queries bmw rush ukraine absence nearest cluster vendors mpeg whereas yoga serves woods surprise lamp rico partial shoppers phil everybody couples nashville ranking jokes cst http ceo simpson twiki sublime counseling palace acceptable satisfied glad wins measurements verify globe trusted copper milwaukee rack medication warehouse shareware ec rep dicke kerry receipt supposed ordinary nobody ghost violation configure stability mit applying southwest boss pride institutional expectations independence knowing reporter metabolism keith champion cloudy linda ross personally chile anna plenty solo sentence throat ignore maria uniform excellence wealth tall rm somewhere vacuum dancing attributes recognize brass writes plaza pdas outcomes survival quest publish sri screening toe thumbnail trans jonathan whenever nova lifetime api pioneer booty forgotten acrobat plates acres venue athletic thermal essays vital telling fairly coastal config cf charity intelligent edinburgh vt excel modes obligation campbell wake stupid harbor hungary traveler urw segment realize regardless lan enemy puzzle rising aluminum wells wishlist opens insight sms restricted republican secrets lucky latter merchants thick trailers repeat syndrome philips attendance penalty drum glasses enables nec iraqi builder vista jessica chips terry flood foto ease arguments amsterdam arena adventures pupils stewart announcement tabs outcome appreciate expanded casual grown polish lovely extras gm centres jerry clause smile lands ri troops indoor bulgaria armed broker charger regularly believed pine cooling tend gulf rt rick trucks cp mechanisms divorce laura shopper tokyo partly nikon customize tradition candy pills tiger donald folks sensor exposed telecom hunt angels deputy indicators sealed thai emissions physicians loaded fred complaint scenes experiments afghanistan dd boost spanking scholarship governance mill founded supplements chronic icons moral den catering aud finger keeps pound locate camcorder pl trained burn implementing roses labs ourselves bread tobacco wooden motors tough roberts incident gonna dynamics lie crm rf conversation decrease chest pension billy revenues emerging worship capability ak fe craig herself producing churches precision damages reserves contributed solve shorts reproduction minority td diverse amp ingredients sb ah johnny sole franchise recorder complaints facing sm nancy promotions tones passion rehabilitation maintaining sight laid clay defence patches weak refund usc towns environments trembl divided blvd reception amd wise emails cyprus wv odds correctly insider seminars consequences makers hearts geography appearing integrity worry ns discrimination eve carter legacy marc pleased danger vitamin widely processed phrase genuine raising implications functionality paradise hybrid reads roles intermediate emotional sons leaf pad glory platforms ja bigger billing diesel versus combine overnight geographic exceed bs rod saudi fault cuba hrs preliminary districts introduce silk promotional kate chevrolet babies bi karen compiled romantic revealed specialists generator albert examine jimmy graham suspension bristol margaret compaq sad correction wolf slowly authentication communicate rugby supplement showtimes cal portions infant promoting sectors samuel fluid grounds fits kick regards meal ta hurt machinery bandwidth unlike equation baskets probability pot dimension wright img barry proven schedules admissions cached warren slip studied reviewer involves quarterly rpm profits devil grass comply marie florist illustrated cherry continental alternate deutsch achievement limitations kenya webcam cuts funeral nutten earrings enjoyed automated chapters pee charlie quebec passenger convenient dennis mars francis tvs sized manga noticed socket silent literary egg mhz signals caps orientation pill theft childhood swing symbols lat meta humans analog facial choosing talent dated flexibility seeker wisdom shoot boundary mint packard offset payday philip elite gi spin holders believes swedish poems deadline jurisdiction robot displaying witness collins equipped stages encouraged sur winds powder broadway acquired assess wash cartridges stones entrance gnome roots declaration losing attempts gadgets noble glasgow automation impacts rev gospel advantages shore loves induced ll knight preparing loose aims recipient linking extensions appeals cl earned illness islamic athletics southeast ieee ho alternatives pending parker determining lebanon corp personalized kennedy gt sh conditioning teenage soap ae triple cooper nyc vincent jam secured unusual answered partnerships destruction slots increasingly migration disorder routine toolbar basically rocks conventional titans applicants wearing axis sought genes mounted habitat firewall median guns scanner herein occupational animated judicial rio hs adjustment hero integer treatments bachelor attitude camcorders engaged falling basics montreal carpet rv struct lenses binary genetics attended difficulty punk collective coalition pi dropped enrollment duke walter ai pace besides wage producers ot collector arc hosts interfaces advertisers moments atlas strings dawn representing observation feels torture carl deleted coat mitchell mrs rica restoration convenience returning ralph opposition container yr defendant warner confirmation app embedded inkjet supervisor wizard corps actors liver peripherals liable brochure morris bestsellers petition eminem recall antenna picked assumed departure minneapolis belief killing bikini memphis shoulder decor lookup texts harvard brokers roy ion diameter ottawa doll ic podcast seasons peru interactions refine bidder singer evans herald literacy fails aging nike intervention fed plugin attraction diving invite modification alice latinas suppose customized reed involve moderate terror younger thirty mice opposite understood rapidly dealtime ban temp intro mercedes zus assurance clerk happening vast mills outline amendments tramadol holland receives jeans metropolitan compilation verification fonts ent odd wrap refers mood favor veterans quiz mx sigma gr attractive xhtml occasion recordings jefferson victim demands sleeping careful ext beam gardening obligations arrive orchestra sunset tracked moreover minimal polyphonic lottery tops framed aside outsourcing licence adjustable allocation michelle essay discipline amy ts demonstrated dialogue identifying alphabetical camps declared dispatched aaron handheld trace disposal shut florists packs ge installing switches romania voluntary ncaa thou consult phd greatly blogging mask cycling midnight ng commonly pe photographer inform turkish coal cry messaging pentium quantum murray intent tt zoo largely pleasant announce constructed additions requiring spoke aka arrow engagement sampling rough weird tee refinance lion inspired holes weddings blade suddenly oxygen cookie meals canyon goto meters merely calendars arrangement conclusions passes bibliography pointer compatibility stretch durham furthermore permits cooperative muslim xl neil sleeve netscape cleaner cricket beef feeding stroke township rankings measuring cad hats robin robinson jacksonville strap headquarters sharon crowd tcp transfers surf olympic transformation remained attachments dv dir entities customs administrators personality rainbow hook roulette decline gloves israeli medicare cord skiing cloud facilitate subscriber valve val hewlett explains proceed flickr feelings knife jamaica priorities shelf bookstore timing liked parenting adopt denied fotos incredible britney freeware donation outer crop deaths rivers commonwealth pharmaceutical manhattan tales katrina workforce islam nodes tu fy thumbs seeds cited lite ghz hub targeted organizational skype realized twelve founder decade gamecube rr dispute portuguese tired titten adverse everywhere excerpt eng steam discharge ef drinks ace voices acute halloween climbing stood sing tons perfume carol honest albany hazardous restore stack methodology somebody sue ep housewares reputation resistant democrats recycling hang gbp curve creator amber qualifications museums coding slideshow tracker variation passage transferred trunk hiking lb pierre jelsoft headset photograph oakland colombia waves camel distributor lamps underlying hood wrestling suicide archived photoshop jp chi bt arabia gathering projection juice chase mathematical logical sauce fame extract specialized diagnostic panama indianapolis af payable corporations courtesy criticism automobile confidential rfc statutory accommodations athens northeast downloaded judges sl seo retired isp remarks detected decades paintings walked arising nissan bracelet ins eggs juvenile injection yorkshire populations protective afraid acoustic railway cassette initially indicator pointed hb jpg causing mistake norton locked eliminate tc fusion mineral sunglasses ruby steering beads fortune preference canvas threshold parish claimed screens cemetery planner croatia flows stadium venezuela exploration mins fewer sequences coupon nurses ssl stem proxy astronomy lanka opt edwards drew contests flu translate announces mlb costume tagged berkeley voted killer bikes gates adjusted rap tune bishop pulled corn gp shaped compression seasonal establishing farmer counters puts constitutional grew perfectly tin slave instantly cultures norfolk coaching examined trek encoding litigation submissions oem heroes painted lycos ir zdnet broadcasting horizontal artwork cosmetic resulted portrait terrorist informational ethical carriers ecommerce mobility floral builders ties struggle schemes suffering neutral fisher rat spears prospective bedding ultimately joining heading equally artificial bearing spectacular coordination connector brad combo seniors worlds guilty affiliated activation naturally haven tablet jury dos tail subscribers charm lawn violent mitsubishi underwear basin soup potentially ranch constraints crossing inclusive dimensional cottage drunk considerable crimes resolved mozilla byte toner nose latex branches anymore oclc delhi holdings alien locator selecting processors pantyhose plc broke nepal zimbabwe difficulties juan complexity msg constantly browsing resolve barcelona presidential documentary cod territories melissa moscow thesis thru jews nylon palestinian discs rocky bargains frequent trim nigeria ceiling pixels ensuring hispanic cv cb legislature hospitality gen anybody procurement diamonds espn fleet untitled bunch totals marriott singing theoretical afford exercises starring referral nhl surveillance optimal quit distinct protocols lung highlight substitute inclusion hopefully brilliant turner sucking cents reuters ti fc gel todd spoken omega evaluated stayed civic assignments fw manuals doug sees termination watched saver thereof grill households gs redeem rogers grain aaa authentic regime wanna wishes bull montgomery architectural louisville depend differ macintosh movements ranging monica repairs breath amenities virtually cole mart candle hanging colored authorization tale verified lynn formerly projector bp situated comparative std seeks herbal loving strictly routing docs stanley psychological surprised retailer vitamins elegant gains renewal vid genealogy opposed deemed scoring expenditure brooklyn liverpool sisters critics connectivity spots oo algorithms hacker madrid similarly margin coin solely fake salon collaborative norman fda excluding turbo headed voters cure madonna commander arch ni murphy thinks thats suggestion hdtv soldier phillips asin aimed justin bomb harm interval mirrors spotlight tricks reset brush investigate thy expansys panels repeated assault connecting spare logistics deer kodak tongue bowling tri danish pal monkey proportion filename skirt florence invest honey um analyzes drawings significance scenario ye fs lovers atomic approx symposium arabic gauge essentials junction protecting nn faced mat rachel solving transmitted weekends screenshots produces oven ted intensive chains kingston sixth engage deviant noon switching quoted adapters correspondence farms imports supervision cheat bronze expenditures sandy separation testimony suspect celebrities macro sender mandatory boundaries crucial syndication gym celebration kde adjacent filtering tuition spouse exotic viewer signup threats luxembourg puzzles reaching vb damaged cams receptor laugh joel surgical destroy citation pitch autos yo premises perry proved offensive imperial dozen benjamin deployment teeth cloth studying colleagues stamp lotus salmon olympus separated proc cargo tan directive fx salem mate dl starter upgrades likes butter pepper weapon luggage burden chef tapes zones races isle stylish slim maple luke grocery offshore governing retailers depot kenneth comp alt pie blend harrison ls julie occasionally cbs attending emission pete spec finest realty janet bow penn recruiting apparent instructional phpbb autumn traveling probe midi permissions biotechnology toilet ranked jackets routes packed excited outreach helen mounting recover tied lopez balanced prescribed catherine timely talked debug delayed chuck reproduced hon dale explicit calculation villas ebook consolidated exclude peeing occasions brooks equations newton oils sept exceptional anxiety bingo whilst spatial respondents unto lt ceramic prompt precious minds annually considerations scanners atm xanax eq pays fingers sunny ebooks delivers je queensland necklace musicians leeds composite unavailable cedar arranged lang theaters advocacy raleigh stud fold essentially designing threaded uv qualify blair hopes assessments cms mason diagram burns pumps footwear sg vic beijing peoples victor mario pos attach licenses utils removing advised brunswick spider phys ranges pairs sensitivity trails preservation hudson isolated calgary interim assisted divine streaming approve chose compound intensity technological syndicate abortion dialog venues blast wellness calcium newport antivirus addressing pole discounted indians shield harvest membrane prague previews bangladesh constitute locally concluded pickup desperate mothers nascar iceland demonstration governmental manufactured candles graduation mega bend sailing variations moms sacred addiction morocco chrome tommy springfield refused brake exterior greeting ecology oliver congo glen botswana nav delays synthesis olive undefined unemployment cyber verizon scored enhancement newcastle clone velocity lambda relay composed tears performances oasis baseline cab angry fa societies silicon brazilian identical petroleum compete ist norwegian lover belong honolulu beatles lips retention exchanges pond rolls thomson barnes soundtrack wondering malta daddy lc ferry rabbit profession seating dam cnn separately physiology lil collecting das exports omaha tire participant scholarships recreational dominican chad electron loads friendship heather passport motel unions treasury warrant sys solaris frozen occupied josh royalty scales rally observer sunshine strain drag ceremony somehow arrested expanding provincial investigations icq ripe yamaha rely medications hebrew gained rochester dying laundry stuck solomon placing stops homework adjust assessed advertiser enabling encryption filling downloadable sophisticated imposed silence scsi focuses soviet possession cu laboratories treaty vocal trainer organ stronger volumes advances vegetables lemon toxic dns thumbnails darkness pty ws nuts nail bizrate vienna implied span stanford sox stockings joke respondent packing statute rejected satisfy destroyed shelter chapel gamespot manufacture layers wordpress guided vulnerability accountability celebrate accredited appliance compressed bahamas powell mixture bench univ tub rider scheduling radius perspectives mortality logging hampton christians borders therapeutic pads butts inns bobby impressive sheep accordingly architect railroad lectures challenging wines nursery harder cups ash microwave cheapest accidents travesti relocation stuart contributors salvador ali salad np monroe tender violations foam temperatures paste clouds competitions discretion tft tanzania preserve jvc poem unsigned staying cosmetics easter theories repository praise jeremy venice concentrations estonia christianity veteran streams landing signing executed katie negotiations realistic dt cgi showcase integral asks relax namibia generating christina congressional synopsis hardly prairie reunion composer bean sword absent photographic sells ecuador hoping accessed spirits modifications coral pixel float colin bias imported paths bubble por acquire contrary millennium tribune vessel acids focusing viruses cheaper admitted dairy admit mem fancy equality samoa gc achieving tap stickers fisheries exceptions reactions leasing lauren beliefs ci macromedia companion squad analyze ashley scroll relate divisions swim wages additionally suffer forests fellowship nano invalid concerts martial males victorian retain execute tunnel genres cambodia patents copyrights yn chaos lithuania mastercard wheat chronicles obtaining beaver updating distribute readings decorative kijiji confused compiler enlargement eagles bases vii accused bee campaigns unity loud conjunction bride rats defines airports instances indigenous begun cfr brunette packets anchor socks validation parade corruption stat trigger incentives cholesterol gathered essex slovenia notified differential beaches folders dramatic surfaces terrible routers cruz pendant dresses baptist scientist starsmerchant hiring clocks arthritis bios females wallace nevertheless reflects taxation fever pmc cuisine surely practitioners transcript myspace theorem inflation thee nb ruth pray stylus compounds pope drums contracting arnold structured reasonably jeep chicks bare hung cattle mba radical graduates rover recommends controlling treasure reload distributors flame levitra tanks assuming monetary elderly pit arlington mono particles floating extraordinary tile indicating bolivia spell hottest stevens coordinate kuwait exclusively emily alleged limitation widescreen compile webster struck rx illustration plymouth warnings construct apps inquiries bridal annex mag gsm inspiration tribal curious affecting freight rebate meetup eclipse sudan ddr downloading rec shuttle aggregate stunning cycles affects forecasts detect actively ciao ampland knee prep pb complicated chem fastest butler shopzilla injured decorating payroll cookbook expressions ton courier uploaded shakespeare hints collapse americas connectors unlikely oe gif pros conflicts techno beverage tribute wired elvis immune latvia travelers forestry barriers cant jd rarely gpl infected offerings martha genesis barrier argue incorrect trains metals bicycle furnishings letting arise guatemala celtic thereby irc jamie particle perception minerals advise humidity bottles boxing wy dm bangkok renaissance pathology sara bra ordinance hughes photographers infections jeffrey chess operates brisbane configured survive oscar festivals menus joan possibilities duck reveal canal amino phi contributing herbs clinics mls cow manitoba analytical missions watson lying costumes strict dive saddam circulation drill offense bryan cet protest assumption jerusalem hobby tries transexuales invention nickname fiji technician inline executives enquiries washing audi staffing cognitive exploring trick enquiry closure raid ppc timber volt intense div playlist registrar showers supporters ruling steady dirt statutes withdrawal myers drops predicted wider saskatchewan jc cancellation plugins enrolled sensors screw ministers publicly hourly blame geneva freebsd veterinary acer prostores reseller dist handed suffered intake informal relevance incentive butterfly tucson mechanics heavily swingers fifty headers mistakes numerical ons geek uncle defining counting reflection sink accompanied assure invitation devoted princeton jacob sodium randy spirituality hormone meanwhile proprietary timothy childrens brick grip naval thumbzilla medieval porcelain avi bridges pichunter captured watt thehun decent casting dayton translated shortly cameron columnists pins carlos reno donna andreas warrior diploma cabin innocent scanning ide consensus polo valium copying rpg delivering cordless patricia horn eddie uganda fired journalism pd prot trivia adidas perth frog grammar intention syria disagree klein harvey tires logs undertaken tgp hazard retro leo statewide semiconductor gregory episodes boolean circular anger diy mainland illustrations suits chances interact snap happiness arg substantially bizarre glenn ur auckland olympics fruits identifier geo ribbon calculations doe jpeg conducting startup suzuki trinidad ati kissing wal handy swap exempt crops reduces accomplished calculators geometry impression abs slovakia flip guild correlation gorgeous capitol sim dishes rna barbados chrysler nervous refuse extends fragrance mcdonald replica plumbing brussels tribe neighbors trades superb buzz transparent nuke rid trinity charleston handled legends boom calm champions floors selections projectors inappropriate exhaust comparing shanghai speaks burton vocational davidson copied scotia farming gibson pharmacies fork troy ln roller introducing batch organize appreciated alter nicole latino ghana edges uc mixing handles skilled fitted albuquerque harmony distinguished asthma projected assumptions shareholders twins developmental rip zope regulated triangle amend anticipated oriental reward windsor zambia completing gmbh buf ld hydrogen webshots sprint comparable chick advocate sims confusion copyrighted tray inputs warranties genome escorts documented thong medal paperbacks coaches vessels walks sol keyboards sage knives eco vulnerable arrange artistic bat honors booth indie reflected unified bones breed detector ignored polar fallen precise sussex respiratory notifications msgid transexual mainstream invoice evaluating lip subcommittee sap gather suse maternity backed alfred colonial mf carey motels forming embassy cave journalists danny rebecca slight proceeds indirect amongst wool foundations msgstr arrest volleyball mw adipex horizon nu deeply toolbox ict marina liabilities prizes bosnia browsers decreased patio dp tolerance surfing creativity lloyd describing optics pursue lightning overcome eyed ou quotations grab inspector attract brighton beans bookmarks ellis disable snake succeed leonard lending oops reminder xi searched behavioral riverside bathrooms plains sku ht raymond insights abilities initiated sullivan za midwest karaoke trap lonely fool ve nonprofit lancaster suspended hereby observe julia containers attitudes karl berry collar simultaneously racial integrate bermuda amanda sociology mobiles screenshot exhibitions kelkoo confident retrieved exhibits officially consortium dies terrace bacteria pts replied seafood novels rh rrp recipients ought delicious traditions fg jail safely finite kidney periodically fixes sends durable mazda allied throws moisture hungarian roster referring symantec spencer wichita nasdaq uruguay ooo hz transform timer tablets tuning gotten educators tyler futures vegetable verse highs humanities independently wanting custody scratch launches ipaq alignment henderson bk britannica comm ellen competitors nhs rocket aye bullet towers racks lace nasty visibility latitude consciousness ste tumor ugly deposits beverly mistress encounter trustees watts duncan reprints hart bernard resolutions ment accessing forty tubes attempted col midlands priest floyd ronald analysts queue dx sk trance locale nicholas biol yu bundle hammer invasion witnesses runner rows administered notion sq skins mailed oc fujitsu spelling arctic exams rewards beneath strengthen defend aj frederick medicaid treo infrared seventh gods une welsh belly aggressive tex advertisements quarters stolen cia sublimedirectory soonest haiti disturbed determines sculpture poly ears dod wp fist naturals neo motivation lenders pharmacology fitting fixtures bloggers mere agrees passengers quantities petersburg consistently powerpoint cons surplus elder sonic obituaries cheers dig taxi punishment appreciation subsequently om belarus nat zoning gravity providence thumb restriction incorporate backgrounds treasurer guitars essence flooring lightweight ethiopia tp mighty athletes humanity transcription jm holmes complications scholars dpi scripting gis remembered galaxy chester snapshot caring loc worn synthetic shaw vp segments testament expo dominant twist specifics itunes stomach partially buried cn newbie minimize darwin ranks wilderness debut generations tournaments bradley deny anatomy bali judy sponsorship headphones fraction trio proceeding cube defects volkswagen uncertainty breakdown milton marker reconstruction subsidiary strengths clarity rugs sandra adelaide encouraging furnished monaco settled folding emirates terrorists airfare comparisons beneficial distributions vaccine belize fate viewpicture promised volvo penny robust bookings threatened minolta republicans discusses gui porter gras jungle ver rn responded rim abstracts zen ivory alpine dis prediction pharmaceuticals andale fabulous remix alias thesaurus individually battlefield literally newer kay ecological spice oval implies cg soma ser cooler appraisal consisting maritime periodic submitting overhead ascii prospect shipment breeding citations geographical donor mozambique tension href benz trash shapes wifi tier fwd earl manor envelope diane homeland disclaimers championships excluded andrea breeds rapids disco sheffield bailey aus endif finishing emotions wellington incoming prospects lexmark cleaners bulgarian hwy eternal cashiers guam cite aboriginal remarkable rotation nam preventing productive boulevard eugene ix gdp pig metric compliant minus penalties bennett imagination hotmail refurbished joshua armenia varied grande closest activated actress mess conferencing assign armstrong politicians trackbacks lit accommodate tigers aurora una slides milan premiere lender villages shade chorus christine rhythm digit argued dietary symphony clarke sudden accepting precipitation marilyn lions findlaw ada pools tb lyric claire isolation speeds sustained matched approximate rope carroll rational programmer fighters chambers dump greetings inherited warming incomplete vocals chronicle fountain chubby grave legitimate biographies burner yrs foo investigator gba plaintiff finnish gentle bm prisoners deeper muslims hose mediterranean nightlife footage howto worthy reveals architects saints entrepreneur carries sig freelance duo excessive devon screensaver helena saves regarded valuation unexpected cigarette fog characteristic marion lobby egyptian tunisia metallica outlined consequently headline treating punch appointments str gotta cowboy narrative bahrain enormous karma consist betty queens academics pubs quantitative lucas screensavers subdivision tribes vip defeat clicks distinction honduras naughty hazards insured harper livestock mardi exemption tenant sustainability cabinets tattoo shake algebra shadows holly formatting silly nutritional yea mercy hartford freely marcus sunrise wrapping mild fur nicaragua weblogs timeline tar belongs rj readily affiliation soc fence nudist infinite diana ensures relatives lindsay clan legally shame satisfactory revolutionary bracelets sync civilian telephony mesa fatal remedy realtors breathing briefly thickness adjustments graphical genius discussing aerospace fighter meaningful flesh retreat adapted barely wherever estates rug democrat borough maintains failing shortcuts ka retained voyeurweb pamela andrews marble extending jesse specifies hull logitech surrey briefing belkin dem accreditation wav blackberry highland meditation modular microphone macedonia combining brandon instrumental giants organizing shed balloon moderators winston memo ham solved tide kazakhstan hawaiian standings partition invisible gratuit consoles funk fbi qatar magnet translations porsche cayman jaguar reel sheer commodity posing kilometers rp bind thanksgiving rand hopkins urgent guarantees infants gothic cylinder witch buck indication eh congratulations tba cohen sie usgs puppy kathy acre graphs surround cigarettes revenge expires enemies lows controllers aqua chen emma consultancy finances accepts enjoying conventions eva patrol smell pest hc italiano coordinates rca fp carnival roughly sticker promises responding reef physically divide stakeholders hydrocodone gst consecutive cornell satin bon deserve attempting mailto promo jj representations chan worried tunes garbage competing combines mas beth bradford len phrases kai peninsula chelsea boring reynolds dom jill accurately speeches reaches schema considers sofa catalogs ministries vacancies quizzes parliamentary obj prefix lucia savannah barrel typing nerve dans planets deficit boulder pointing renew coupled viii myanmar metadata harold circuits floppy texture handbags jar ev somerset incurred acknowledge thoroughly antigua nottingham thunder tent caution identifies questionnaire qualification locks modelling namely miniature dept hack dare euros interstate pirates aerial hawk consequence rebel systematic perceived origins hired makeup textile lamb madagascar nathan tobago presenting cos troubleshooting uzbekistan indexes pac rl erp centuries gl magnitude ui richardson hindu dh fragrances vocabulary licking earthquake vpn fundraising fcc markers weights albania geological assessing lasting wicked eds introduces kills roommate webcams pushed webmasters ro df computational acdbentity participated junk handhelds wax lucy answering hans impressed slope reggae failures poet conspiracy surname theology nails evident whats rides rehab epic saturn organizer nut allergy sake twisted combinations preceding merit enzyme cumulative zshops planes edmonton tackle disks condo pokemon amplifier ambien arbitrary prominent retrieve lexington vernon sans worldcat titanium irs fairy builds contacted shaft lean bye cdt recorders occasional leslie casio deutsche ana postings innovations kitty postcards dude drain monte fires algeria blessed luis reviewing cardiff cornwall favors potato panic explicitly sticks leone transsexual ez citizenship excuse reforms basement onion strand pf sandwich uw lawsuit alto informative girlfriend bloomberg cheque hierarchy influenced banners reject eau abandoned bd circles italic beats merry mil scuba gore complement cult dash passive mauritius valued cage checklist requesting courage verde lauderdale scenarios gazette hitachi divx extraction batman elevation hearings coleman hugh lap utilization beverages calibration jake eval efficiently anaheim ping textbook dried entertaining prerequisite luther frontier settle stopping refugees knights hypothesis palmer medicines flux derby sao peaceful altered pontiac regression doctrine scenic trainers muze enhancements renewable intersection passwords sewing consistency collectors conclude munich oman celebs gmc propose hh azerbaijan lighter rage adsl uh prix astrology advisors pavilion tactics trusts occurring supplemental travelling talented annie pillow induction derek precisely shorter harley spreading provinces relying finals paraguay steal parcel refined fd bo fifteen widespread incidence fears predict boutique acrylic rolled tuner avon incidents peterson rays asn shannon toddler enhancing flavor alike walt homeless horrible hungry metallic acne blocked interference warriors palestine listprice libs undo cadillac atmospheric malawi wm pk sagem knowledgestorm dana halo ppm curtis parental referenced strikes lesser publicity marathon ant proposition gays pressing gasoline apt dressed scout belfast exec dealt niagara inf eos warcraft charms catalyst trader bucks allowance vcr denial uri designation thrown prepaid raises gem duplicate electro criterion badge wrist civilization analyzed vietnamese heath tremendous ballot lexus varying remedies validity trustee maui weighted angola performs plastics realm corrected jenny helmet salaries postcard elephant yemen encountered tsunami scholar nickel internationally surrounded psi buses expedia geology pct wb creatures coating commented wallet cleared smilies vids accomplish boating drainage shakira corners broader vegetarian rouge yeast yale newfoundland sn qld pas clearing investigated dk ambassador coated intend stephanie contacting vegetation doom findarticles louise kenny specially owen routines hitting yukon beings bite issn aquatic reliance habits striking myth infectious podcasts singh gig gilbert sas ferrari continuity brook fu outputs phenomenon ensemble insulin assured biblical weed conscious accent mysimon eleven wives ambient utilize mileage oecd prostate adaptor auburn unlock hyundai pledge vampire angela relates nitrogen xerox dice merger softball referrals quad dock differently firewire mods nextel framing musician blocking rwanda sorts integrating vsnet limiting dispatch revisions papua restored hint armor riders chargers remark dozens varies msie reasoning wn liz rendered picking charitable guards annotated ccd sv convinced openings buys burlington replacing researcher watershed councils occupations acknowledged kruger pockets granny pork zu equilibrium viral inquire pipes characterized laden aruba cottages realtor merge privilege edgar develops qualifying chassis dubai estimation barn pushing llp fleece pediatric boc fare dg asus pierce allan dressing techrepublic sperm vg bald filme craps fuji frost leon institutes mold dame fo sally yacht tracy prefers drilling brochures herb tmp alot ate breach whale traveller appropriations suspected tomatoes benchmark beginners instructors highlighted bedford stationery idle mustang unauthorized clusters antibody competent momentum fin wiring io pastor mud calvin uni shark contributor demonstrates phases grateful emerald gradually laughing grows cliff desirable tract ul ballet ol journalist abraham js bumper afterwards webpage religions garlic hostels shine senegal explosion pn banned wendy briefs signatures diffs cove mumbai ozone disciplines casa mu daughters conversations radios tariff nvidia opponent pasta simplified muscles serum wrapped swift motherboard runtime inbox focal bibliographic eden distant incl champagne ala decimal hq deviation superintendent propecia dip nbc samba hostel housewives employ mongolia penguin magical influences inspections irrigation miracle manually reprint reid wt hydraulic centered robertson flex yearly penetration wound belle rosa conviction hash omissions writings hamburg lazy mv mpg retrieval qualities cindy fathers carb charging cas marvel lined cio dow prototype importantly rb petite apparatus upc terrain dui pens explaining yen strips gossip rangers nomination empirical mh rotary worm dependence discrete beginner boxed lid sexuality polyester cubic deaf commitments suggesting sapphire kinase skirts mats remainder crawford labeled privileges televisions specializing marking commodities pvc serbia sheriff griffin declined guyana spies blah mime neighbor motorcycles elect highways thinkpad concentrate intimate reproductive preston deadly feof bunny chevy molecules rounds longest refrigerator tions intervals sentences dentists usda exclusion workstation holocaust keen flyer peas dosage receivers urls disposition variance navigator investigators cameroon baking marijuana adaptive computed needle baths enb gg cathedral brakes og nirvana ko fairfield owns til invision sticky destiny generous madness emacs climb blowing fascinating landscapes heated lafayette jackie wto computation hay cardiovascular ww sparc cardiac salvation dover adrian predictions accompanying vatican brutal learners gd selective arbitration configuring token editorials zinc sacrifice seekers guru isa removable convergence yields gibraltar levy suited numeric anthropology skating kinda aberdeen emperor grad malpractice dylan bras belts blacks educated rebates reporters burke proudly pix necessity rendering mic inserted pulling basename kyle obesity curves suburban touring clara vertex bw hepatitis nationally tomato andorra waterproof expired mj travels flush waiver pale specialties hayes humanitarian invitations functioning delight survivor garcia cingular economies alexandria bacterial moses counted undertake declare continuously johns valves gaps impaired achievements donors tear jewel teddy lf convertible ata teaches ventures nil bufing stranger tragedy julian nest pam dryer painful velvet tribunal ruled nato pensions prayers funky secretariat nowhere cop paragraphs gale joins adolescent nominations wesley dim lately cancelled scary mattress mpegs brunei likewise banana introductory slovak cakes stan reservoir occurrence idol mixer remind wc worcester sbjct demographic charming mai tooth disciplinary annoying respected stays disclose affair drove washer upset restrict springer beside mines portraits rebound logan mentor interpreted evaluations fought baghdad elimination metres hypothetical immigrants complimentary helicopter pencil freeze hk performer abu titled commissions sphere powerseller moss ratios concord graduated endorsed ty surprising walnut lance ladder italia unnecessary dramatically liberia sherman cork maximize cj hansen senators workout mali yugoslavia bleeding characterization colon likelihood lanes purse fundamentals contamination mtv endangered compromise optimize stating dome caroline leu expiration namespace align peripheral bless engaging negotiation crest opponents triumph nominated confidentiality electoral changelog welding deferred alternatively heel alloy condos plots polished yang gently greensboro tulsa locking casey controversial draws fridge blanket bloom qc simpsons lou elliott recovered fraser justify upgrading blades pgp loops surge frontpage trauma aw tahoe advert possess demanding defensive sip flashers subaru forbidden tf vanilla programmers pj monitored installations deutschland picnic souls arrivals spank cw practitioner motivated wr dumb smithsonian hollow vault securely examining fioricet groove revelation rg pursuit delegation wires bl dictionaries mails backing greenhouse sleeps vc blake transparency dee travis wx endless figured orbit currencies niger bacon survivors positioning heater colony cannon circus promoted forbes mae moldova mel descending paxil spine trout enclosed feat temporarily ntsc cooked thriller transmit apnic fatty gerald pressed frequencies scanned reflections hunger mariah sic municipality usps joyce detective surgeon cement experiencing fireplace endorsement bg planners disputes textiles missile intranet closes seq psychiatry persistent deborah conf marco assists summaries glow gabriel auditor wma aquarium violin prophet cir bracket looksmart isaac oxide oaks magnificent erik colleague naples promptly modems adaptation hu harmful paintball prozac sexually enclosure acm dividend newark kw paso glucose phantom norm playback supervisors westminster turtle ips distances absorption treasures dsc warned neural ware fossil mia hometown badly transcripts apollo wan disappointed persian continually communist collectible handmade greene entrepreneurs robots grenada creations jade scoop acquisitions foul keno gtk earning mailman sanyo nested biodiversity excitement somalia movers verbal blink presently seas carlo workflow mysterious novelty bryant tiles voyuer librarian subsidiaries switched stockholm tamil garmin ru pose fuzzy indonesian grams therapist richards mrna budgets toolkit promising relaxation goat render carmen ira sen thereafter hardwood erotica temporal sail forge commissioners dense dts brave forwarding qt awful nightmare airplane reductions southampton istanbul impose organisms sega telescope viewers asbestos portsmouth cdna meyer enters pod savage advancement wu harassment willow resumes bolt gage throwing existed generators lu wagon barbie dat soa knock urge smtp generates potatoes thorough replication inexpensive kurt receptors peers roland optimum neon interventions quilt huntington creature ours mounts syracuse internship lone refresh aluminium snowboard beastality webcast michel evanescence subtle coordinated notre shipments maldives stripes firmware antarctica cope shepherd lm canberra cradle chancellor mambo lime kirk flour controversy legendary bool sympathy choir avoiding beautifully blond expects cho jumping fabrics antibodies polymer hygiene wit poultry virtue burst examinations surgeons bouquet immunology promotes mandate wiley departmental bbs spas ind corpus johnston terminology gentleman fibre reproduce convicted shades jets indices roommates adware qui intl threatening spokesman zoloft activists frankfurt prisoner daisy halifax encourages ultram cursor assembled earliest donated stuffed restructuring insects terminals crude morrison maiden simulations cz sufficiently examines viking myrtle bored cleanup yarn knit conditional mug crossword bother budapest conceptual knitting attacked hl bhutan liechtenstein mating compute redhead arrives translator automobiles tractor allah continent ob unwrap fares longitude resist challenged telecharger hoped pike safer insertion instrumentation ids hugo wagner constraint groundwater touched strengthening cologne gzip wishing ranger smallest insulation newman marsh ricky ctrl scared theta infringement bent laos subjective monsters asylum lightbox robbie stake cocktail outlets swaziland varieties arbor mediawiki configurations poison".split(" "));
function phon(s){
  let w = String(s).toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return "";
  w = w.replace(/^h(?=[aeiouy])/, "").replace(/^kn|^gn|^pn|^wr/, m => m[1]).replace(/^x/, "s").replace(/ph/g, "f").replace(/ck/g, "k").replace(/sch/g, "sk")
       .replace(/dg/g, "j").replace(/tch/g, "ch").replace(/c(?=[eiy])/g, "s").replace(/c/g, "k").replace(/q/g, "k").replace(/x/g, "ks")
       .replace(/z/g, "s").replace(/wh/g, "w").replace(/([bcdfgjklmnpqrstvwxz])h/g, "$1").replace(/v/g, "f");
  const first = w[0];
  const rest = w.slice(1).replace(/[aeiouy]/g, "").replace(/(.)\1+/g, "$1");
  return (/[aeiouy]/.test(first) ? "a" : first) + rest;
}
function lev(a, b){
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({length: a.length + 1}, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return d[a.length][b.length];
}
// Expected terms for one question: the finance list, plus jargon that question's own texts use.
const predictCache = new Map();
function expectedTerms(q){
  const id = q ? q.id : "_";
  if (predictCache.has(id)) return predictCache.get(id);
  const terms = FIN_TERMS.map(([show, ...forms]) => ({show, forms, local:false}));
  if (q){
    const text = [q.q, ...(q.k || []), SAY[q.id] || "", ...((q.answer || []).slice(0, 6))].join(" ");
    const own = new Set();
    for (const m of text.match(/\b[A-Z][A-Z&\/]{1,6}s?\b/g) || []) if (!/^(?:I|A|IS|BS|OK|US|THE|AND)$/.test(m)) own.add(m);
    for (const m of text.match(/\b[a-z]{7,}\b/gi) || []) if (!isCommon(m)) own.add(m.toLowerCase());
    const mentioned = new Set(text.toLowerCase().split(/[^a-z&\/]+/));
    for (const t of terms) if (t.forms.some(f => text.toLowerCase().includes(f)) || mentioned.has(t.show.toLowerCase())) t.local = true;
    for (const o of own) if (!terms.some(t => t.show.toLowerCase() === o.toLowerCase())) terms.push({show:o, forms:[o.toLowerCase()], local:true});
  }
  const out = [];
  for (const t of terms) for (const f of t.forms){ const k = phon(f); if (k.length >= 3) out.push({show:t.show, form:f.replace(/[^a-z]/g, ""), raw:f, key:k, words:f.split(" ").length, local:t.local, spelled: /^[A-Z&\/]{2,6}s?$/.test(t.show)}); }
  out.localShows = new Set(terms.filter(t => t.local).map(t => t.show.toLowerCase()));
  // Index by first sound, so each heard word is only compared with terms that could match.
  out.byFirst = new Map();
  for (const t of out){ const f = t.key[0]; if (!out.byFirst.has(f)) out.byFirst.set(f, []); out.byFirst.get(f).push(t); }
  predictCache.set(id, out);
  return out;
}
const termWordCache = new WeakMap();
function termWords(terms){
  if (!termWordCache.has(terms)) termWordCache.set(terms, new Set(terms.filter(t => t.words === 1).map(t => t.show.toLowerCase())));
  return termWordCache.get(terms);
}
function predictTerms(text, q){
  if (!text) return text;
  const terms = expectedTerms(q);
  const parts = String(text).split(/(\s+)/);                 // keep the original spacing
  const idx = []; parts.forEach((p, i) => { if (p.trim()) idx.push(i); });
  const bare = i => parts[i].replace(/^[^\w]+|[^\w]+$/g, "");
  const lower = i => bare(i).toLowerCase();
  let w = 0;
  while (w < idx.length){
    let done = false;
    for (let n = 3; n >= 1 && !done; n--){
      if (w + n > idx.length) continue;
      const span = idx.slice(w, w + n);
      const words = span.map(lower);
      if (words.some(x => !x || /\d|[\/&]/.test(x))) continue;
      // Already a known form ("EBITDA", "WACC") or capitalized jargon: leave it.
      if (span.some(i => /^[A-Z&\/]{2,}s?$/.test(bare(i)) && !COMMON.has(lower(i)))) continue;
      const allCommon = words.every(x => isCommon(x) || x.length <= 1);
      // Merging several heard words: real words of two or more letters, or a trailing
      // "a"/"I", belong to the sentence, not to the term ("an enterprise", "value I").
      const mergeable = n === 1 || words.every((x, k) => !isCommon(x) || (x.length === 1 && k < n - 1) || (k === 0 && x.length <= 2 && /^(?:a|e|i|o|u|im|in|un|re|de)$/.test(x)));
      const spelled = words.every(x => x.length === 1) && n >= 2;
      // A single everyday word is never a mishearing ("about" is not "EBIT"), and neither is a
      // word that is already a term, or a real hyphenated compound ("re-levered", "over-optimism").
      if (n === 1 && (isCommon(words[0]) || words[0].length <= 2 || termWords(terms).has(words[0].replace(/-/g, "")))) continue;
      if (words.some(x => /^[a-z]{2,}(?:-[a-z]{2,})+$/.test(x) && x.split("-").filter(p => p.length >= 3).length >= 1 && x.split("-").every(p => p.length >= 2))) continue;
      const key = phon(words.join("")), heardStr = words.join("").replace(/[^a-z]/g, "");
      if (key.length < 3) continue;
      // A word that is already a term (or a correct form of one) is never merged with its neighbours.
      if (n > 1 && words.some(x => termWords(terms).has(x))) continue;
      let best = null, bd = 9;
      for (const t of terms.byFirst.get(key[0]) || []){
        if (Math.abs(t.words - n) > 1 && !spelled) continue;
        if (Math.abs(t.key.length - key.length) > 2) continue;
        const knownMishearing = n > 1 && words.join(" ") === t.raw;
        if (t.show.toLowerCase() === words.join(" ")) { best = null; bd = 9; break; }   // already correct
        const d = key === t.key ? 0 : lev(key, t.key);
        const allowed = key.length >= 7 ? 2 : key.length >= 4 ? 1 : 0;
        if (d > allowed) continue;
        // Merging several heard words into a shorter term needs an exact sound match
        // ("a mortization" -> amortization), so a real neighbouring word is never swallowed.
        if (n !== t.words && !spelled && (d !== 0 || !mergeable)) continue;
        // It must be spelled close to the term too, not just share consonants ("acquirer's" is not "IFRS").
        if (lev(heardStr, t.form) > (t.form.length <= 5 ? 1 : Math.ceil(t.form.length * 0.35))) continue;
        // Everyday phrases only become short acronyms never, long jargon only on an exact sound match.
        if (allCommon && !spelled && !knownMishearing && t.key.length < 5) continue;
        // Never swap a word for a variant of itself ("balance" -> "balances", "levers" -> "leverage").
        if (n === 1){
          const s = stemOf(words[0]), real = t.show.toLowerCase().replace(/[^a-z]/g, "");
          if (s.length >= 3 && [t.form, real].some(f => f.startsWith(s) || s.startsWith(stemOf(f)))) continue;
        }
        // Same word as the term, different formatting ("pro-forma", "tax-deductible"): already right.
        if (n === 1 && heardStr === t.show.toLowerCase().replace(/[^a-z]/g, "")) continue;
        // Several heard words must be either a listed mishearing word for word ("mezz a nine")
        // or fragments that aren't real words ("a mortization"); "dividend is" stays.
        if (n > 1 && !spelled && words.join(" ") !== t.raw && !mergeable) continue;
        // Plain English is only replaced by an exact sound match for a term this question is about,
        // or when it is a known mishearing word for word ("im pairment", "good will").
        if (allCommon && !spelled && !knownMishearing && !(d === 0 && t.local)) continue;
        if (allCommon && !spelled && n === 1 && !t.local) continue;
        if (d < bd || (d === bd && best && t.local && !best.local)){ best = t; bd = d; }
      }
      if (best){
        const lead = parts[span[0]].match(/^[^\w]*/)[0], tail = parts[span[span.length - 1]].match(/[^\w]*$/)[0];
        parts[span[0]] = lead + best.show + tail;
        for (const i of span.slice(1)){ parts[i] = ""; if (parts[i - 1] !== undefined && !parts[i - 1].trim()) parts[i - 1] = ""; }
        w += n; done = true;
      }
    }
    if (!done) w++;
  }
  return parts.join("").replace(/\s{2,}/g, " ");
}
/* ---------- Listening pipeline (built like a dictation app) ----------
   1. Whisper on this device gives the main transcript; Chrome's live recognizer gives a second opinion.
   2. Known mishearings are fixed, then your own dictionary (learned from your edits) is applied.
   3. The two transcripts are lined up word by word: where they disagree and Chrome heard a term
      this question expects, Chrome's word wins; a phrase Whisper skipped entirely is put back.
   4. The term predictor fixes jargon heard as everyday words.
   5. With a Claude key, Claude reads the transcript with the question and fixes only words that
      were misheard, never your wording, fillers or mistakes (the coach grades those). Its result
      is thrown away if it changed too much. */
const plainWords = s => String(s).toLowerCase().replace(/[^a-z0-9&'\s-]/g, " ").split(/\s+/).filter(Boolean);
function alignWords(a, b){
  // Word-level edit alignment; returns pairs [i in a | -1, j in b | -1].
  const n = a.length, m = b.length, d = Array.from({length: n + 1}, () => new Uint16Array(m + 1));
  for (let i = 0; i <= n; i++) d[i][0] = i;
  for (let j = 0; j <= m; j++) d[0][j] = j;
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++)
    d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  const out = []; let i = n, j = m;
  while (i > 0 || j > 0){
    if (i > 0 && j > 0 && d[i][j] === d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1)){ out.push([i-1, j-1]); i--; j--; }
    else if (i > 0 && d[i][j] === d[i-1][j] + 1){ out.push([i-1, -1]); i--; }
    else { out.push([-1, j-1]); j--; }
  }
  return out.reverse();
}
function fuseTranscripts(main, live, q){
  const L = plainWords(live);
  if (!L.length || L.length > 900) return main;
  const parts = String(main).split(/(\s+)/), idx = [];
  parts.forEach((p, i) => { if (p.trim()) idx.push(i); });
  const M = idx.map(i => parts[i].toLowerCase().replace(/[^a-z0-9&'-]/g, ""));
  if (M.length > 900) return main;
  const terms = expectedTerms(q), expected = terms.localShows || new Set();
  const pairs = alignWords(M, L);
  // Substitutions: Chrome heard an expected term where Whisper heard a sound-alike.
  for (const [i, j] of pairs){
    if (i < 0 || j < 0 || M[i] === L[j]) continue;
    const word = L[j], mw = M[i].replace(/[-']/g, "");
    if (mw.includes(word) || word.includes(mw)) continue;                     // "tax-deductible" vs "deductible"
    const pa = phon(mw), pb = phon(word);
    if (lev(pa, pb) > Math.max(1, Math.round(Math.max(pa.length, pb.length) * 0.4))) continue;   // not a sound-alike
    if (expected.has(word) && !expected.has(M[i])){
      const lead = parts[idx[i]].match(/^[^\w]*/)[0], tail = parts[idx[i]].match(/[^\w]*$/)[0];
      const show = (terms.find(t => t.show.toLowerCase() === word) || {show: /^[a-z]{2,5}$/.test(word) && word === word.toLowerCase() && expected.has(word) ? word.toUpperCase() : word}).show;
      parts[idx[i]] = lead + show + tail;
    }
  }
  // Insertions: a run of 3+ words Chrome heard that Whisper skipped, between words both heard.
  const inserts = [];
  for (let k = 0; k < pairs.length; k++){
    if (pairs[k][0] !== -1) continue;
    let e = k; while (e < pairs.length && pairs[e][0] === -1) e++;
    const run = pairs.slice(k, e).map(p => L[p[1]]);
    const before = pairs[k - 1], after = pairs[e];
    if (run.length >= 3 && before && after && before[0] >= 0 && after[0] >= 0 && before[1] >= 0 && after[1] >= 0 && M[before[0]] === L[before[1]] && M[after[0]] === L[after[1]])
      inserts.push({at: before[0], words: run.join(" ")});
    k = e - 1;
  }
  for (const ins of inserts.reverse()) parts[idx[ins.at]] += " " + ins.words;
  return parts.join("");
}

// Your dictionary: corrections you make to a transcript are remembered and applied next time.
let personalDict = store.get("speechDict", {});
function applyDictionary(text){
  let s = String(text);
  for (const [from, entry] of Object.entries(personalDict)){
    if (!entry || !entry.to) continue;
    const re = new RegExp("\\b" + from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+") + "\\b", "gi");
    s = s.replace(re, entry.to);
  }
  return s;
}
function learnFromEdit(before, after){
  const A = String(before).split(/\s+/).filter(Boolean), B = String(after).split(/\s+/).filter(Boolean);
  if (!A.length || !B.length || Math.abs(A.length - B.length) > 12) return 0;
  const clean = w => w.toLowerCase().replace(/^[^\w&]+|[^\w&]+$/g, "");
  const pairs = alignWords(A.map(clean), B.map(clean));
  let learned = 0, k = 0;
  while (k < pairs.length){
    if (pairs[k][0] >= 0 && pairs[k][1] >= 0 && clean(A[pairs[k][0]]) === clean(B[pairs[k][1]])){ k++; continue; }
    let e = k; while (e < pairs.length && !(pairs[e][0] >= 0 && pairs[e][1] >= 0 && clean(A[pairs[e][0]]) === clean(B[pairs[e][1]]))) e++;
    const from = pairs.slice(k, e).filter(p => p[0] >= 0).map(p => clean(A[p[0]])).join(" ");
    const to = pairs.slice(k, e).filter(p => p[1] >= 0).map(p => B[p[1]].replace(/^[^\w&]+|[^\w&]+$/g, "")).join(" ");
    // Only short word swaps that look like mishearings, not rewrites or plain-English edits.
    const fw = from.split(" ").filter(Boolean), tw = to.split(" ").filter(Boolean);
    if (fw.length && tw.length && fw.length <= 3 && tw.length <= 3 && from !== to.toLowerCase() && !(fw.every(w => isCommon(w)) && fw.length === 1)){
      const prev = personalDict[from];
      personalDict[from] = {to, n: prev && prev.to === to ? prev.n + 1 : 1, at: Date.now()};
      learned++;
    }
    k = e;
  }
  if (learned){
    const keep = Object.entries(personalDict).sort((x, y) => (y[1].at || 0) - (x[1].at || 0)).slice(0, 300);
    personalDict = Object.fromEntries(keep); store.set("speechDict", personalDict);
  }
  return learned;
}

// Claude reads the transcript in context and fixes only misheard words.
const CLEAN_SCHEMA = {type:"object", additionalProperties:false, required:["text","changes"],
  properties:{text:{type:"string"}, changes:{type:"array", items:{type:"object", additionalProperties:false, required:["from","to"], properties:{from:{type:"string"}, to:{type:"string"}}}}}};
async function claudeCleanup(text, live, q){
  if (!(apiKey || sample) || settings.smartCleanup === false || !q) return null;
  const terms = [...new Set(expectedTerms(q).filter(t => t.local).map(t => t.show))].slice(0, 60);
  const prompt = `You correct speech-recognition errors in a transcript of a student answering an investment banking interview question out loud.

QUESTION: ${q.q}
TERMS THIS ANSWER IS LIKELY TO USE: ${terms.join(", ") || "(general finance)"}
SECOND RECOGNIZER'S VERSION (less accurate, but useful evidence where they differ): """${String(live || "").slice(0, 4000)}"""

TRANSCRIPT TO CORRECT: """${text.slice(0, 6000)}"""

Fix ONLY words that were clearly misheard by the speech recognizer, using the question, the terms and the second version as context (e.g. "the herb" -> "the IRR", "whack" -> "WACC", "Bunso purchase" -> "funds the purchase").
Do NOT change anything the student actually said: keep every filler (um, uh, like, you know, so), repetition, false start, grammar mistake, informal wording and every factually wrong statement exactly as spoken, because the transcript is being graded. Do not add, remove, reorder or rephrase words. Do not fix their finance. Fix punctuation only where it is missing.
Return the corrected transcript in "text" and each word-level fix in "changes". If nothing was misheard, return the transcript unchanged with an empty "changes" list.`;
  const body = {model: "claude-haiku-5-5", max_tokens: 4000, messages:[{role:"user", content: prompt}], output_config:{format:{type:"json_schema", schema: CLEAN_SCHEMA}}};
  let out;
  try{
    if (sample) out = await sample.json(prompt + "\n\nReply with only the JSON object: {\"text\": ..., \"changes\": [{\"from\": ..., \"to\": ...}]}.", {cache:false});
    else {
      const r = await fetch("https://api.anthropic.com/v1/messages", {method:"POST", headers:{"content-type":"application/json", "x-api-key":apiKey, "anthropic-version":"2023-06-01", "anthropic-dangerous-direct-browser-access":"true"}, body: JSON.stringify(body)});
      const data = await r.json().catch(() => ({}));
      if (!r.ok || data.stop_reason === "refusal") return null;
      out = JSON.parse((data.content || []).filter(b => b.type === "text").map(b => b.text).join(""));
    }
  }catch{ return null; }
  return checkCleanup(text, out);
}
// Safety checks: the cleanup may only swap a few misheard words, never rewrite the answer.
const FILLER_RE = /\b(?:um+|uh+|uhm+|er|like|you know|basically|kind of|sort of|i mean)\b/gi;
function checkCleanup(orig, out){
  if (!out || typeof out.text !== "string" || !out.text.trim()) return null;
  const A = plainWords(orig), B = plainWords(out.text);
  if (Math.abs(A.length - B.length) > Math.max(3, A.length * 0.06)) return null;                 // added or dropped words
  if ((out.text.match(FILLER_RE) || []).length < (orig.match(FILLER_RE) || []).length) return null;   // removed fillers
  const edits = alignWords(A, B).filter(([i, j]) => i < 0 || j < 0 || A[i] !== B[j]).length;
  if (edits > Math.max(4, A.length * 0.12)) return null;                                           // rewrote too much
  return {text: out.text, changes: (out.changes || []).filter(c => c && c.from && c.to && c.from !== c.to).slice(0, 20)};
}

async function polishTranscript(raw, live, q){
  let t = predictTerms(fuseTranscripts(applyDictionary(fixTerms(raw)), live, q), q);
  // A term swapped in at the start of a sentence keeps the capital ("unlevered" -> "Unlevered").
  t = t.replace(/(^|[.!?]\s+)([a-z])/g, (m, a, b) => a + b.toUpperCase())
    .replace(/([,;]\s+)(Then|And|But|So|Which|Plus|Or|Because|Minus|Times)\b/g, (m, a, b) => a + b.toLowerCase());   // ", Then subtracts"
  const fixes = [];
  const c = await claudeCleanup(t, live, q);
  if (c){ t = c.text; fixes.push(...c.changes); }
  return {text: t, fixes};
}

// Chrome can be told which phrases to expect (contextual biasing), where supported.
let noPhrases = false;
function biasRecognizer(rec, q){
  try{
    if (noPhrases || !q || !("phrases" in rec) || typeof SpeechRecognitionPhrase === "undefined") return;
    const seen = new Set(), list = [];
    for (const t of expectedTerms(q)) if (t.local && !seen.has(t.show)){ seen.add(t.show); list.push(new SpeechRecognitionPhrase(t.show, 5)); }
    rec.phrases = list.slice(0, 50);
  }catch{}
}

/* Accurate transcription: Whisper running on this device in a background worker.
   The browser's live recognizer shows words while you talk; when you stop, the
   Whisper transcript replaces it. The model (~77 MB) downloads once and is cached. */
// Fast: Whisper base (77 MB). Most accurate: distil-Whisper small, about 30% fewer errors in our
// tests but about 3x slower on a laptop CPU (172 MB). Both run on this device.
const SPEECH_MODELS = {fast:{id:"onnx-community/whisper-base.en", mb:77}, best:{id:"onnx-community/distil-small.en", mb:172}};
const ACC = {busy:0, worker:null, ready:false, loading:false, failed:false, progress:0, jobs:new Map(), seq:0, listeners:new Set()};
const ACC_SRC = `
let asr = null;
self.onmessage = async (e) => {
  const m = e.data;
  try {
    if (m.type === "load") {
      if (asr) { self.postMessage({type: "ready"}); return; }
      const { pipeline, env } = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1");
      env.allowLocalModels = false;
      // On a cross-origin isolated page (see sw.js) WebAssembly can use several cores: 3-5x faster.
      if (self.crossOriginIsolated) env.backends.onnx.wasm.numThreads = Math.min(8, Math.max(2, (navigator.hardwareConcurrency || 4) - 1));
      const files = {};
      asr = await pipeline("automatic-speech-recognition", m.model || "onnx-community/whisper-base.en", {
        dtype: "q8", device: "wasm",
        progress_callback: p => {
          if (p.status === "progress" && p.total) { files[p.file] = [p.loaded, p.total];
            const v = Object.values(files); self.postMessage({type: "progress", value: v.reduce((s, x) => s + x[0], 0) / v.reduce((s, x) => s + x[1], 0)}); }
        },
      });
      self.postMessage({type: "ready"});
    } else if (m.type === "run") {
      // Pieces run one at a time, in order, so each can be primed with the text before it.
      queue = queue.then(() => run(m)).catch(err => self.postMessage({type: "error", id: m.id, error: String(err && err.message || err)}));
    }
  } catch (err) { self.postMessage({type: "error", id: m.id, error: String(err && err.message || err)}); }
};
let queue = Promise.resolve(), prev = {session: -1, text: ""};
async function run(m){
  // Level the volume: a quiet laptop mic otherwise sounds like silence to the model.
  const a = m.audio; let pk = 0; for (let i = 0; i < a.length; i++) pk = Math.max(pk, Math.abs(a[i]));
  const g = Math.min(30, 0.9 / Math.max(pk, 1e-6)); for (let i = 0; i < a.length; i++) a[i] *= g;
  if (prev.session !== m.session) prev = {session: m.session, text: ""};
  let text;
  try {
    // Prime Whisper with the question, its key terms and what you just said, the way it
    // takes a "previous text" prompt: it then spells "deferred revenue", not "the bird revenue".
    const tok = asr.tokenizer, id = t => tok.model.tokens_to_ids.get(t);
    const prompt = (m.prompt || "") + " " + prev.text.split(/\\s+/).slice(-40).join(" ");
    const init = [id("<|startofprev|>"), ...tok.encode(" " + prompt.trim(), {add_special_tokens: false}).slice(-200), id("<|startoftranscript|>"), id("<|notimestamps|>")];
    if (init.some(x => x == null)) throw new Error("no prompt tokens");
    const feats = await asr.processor(a);
    const out = await asr.model.generate({inputs: feats.input_features, decoder_input_ids: [init], max_new_tokens: 200});
    text = tok.decode(out.tolist()[0].map(Number).slice(init.length), {skip_special_tokens: true}).trim();
  } catch { text = ((await asr(a)).text || "").trim(); }
  if (text && !m.interim) prev.text += " " + text;   // a live draft isn't context yet
  self.postMessage({type: "done", id: m.id, text});
}`;
function accEmit(){ ACC.listeners.forEach(fn => { try{ fn(); }catch{} }); }
function accLoad(){
  if (ACC.worker || ACC.failed || !window.Worker) return;
  try{
    ACC.worker = new Worker(URL.createObjectURL(new Blob([ACC_SRC], {type:"text/javascript"})), {type:"module"});
  }catch{ ACC.failed = true; return; }
  ACC.loading = true;
  ACC.worker.onmessage = e => {
    const m = e.data;
    if (m.type === "progress"){ ACC.progress = m.value; accEmit(); }
    else if (m.type === "ready"){ ACC.ready = true; ACC.loading = false; accEmit(); }
    else if (m.type === "done" || m.type === "error"){
      const job = ACC.jobs.get(m.id); ACC.jobs.delete(m.id); ACC.busy = Math.max(0, ACC.busy - 1);
      if (m.type === "error" && !ACC.ready){ ACC.failed = true; ACC.loading = false; accEmit(); }
      if (job) m.type === "done" ? job.resolve(m.text) : job.reject(new Error(m.error));
    }
  };
  ACC.worker.onerror = () => { ACC.failed = true; ACC.loading = false; accEmit(); for (const j of ACC.jobs.values()) j.reject(new Error("worker failed")); ACC.jobs.clear(); };
  ACC.model = SPEECH_MODELS[settings.speechModel] || SPEECH_MODELS.fast;
  ACC.worker.postMessage({type:"load", model: ACC.model.id});
}
function accRun(audio, extra){
  return new Promise((resolve, reject) => {
    if (!ACC.worker || ACC.failed) return reject(new Error("unavailable"));
    const id = ++ACC.seq; ACC.jobs.set(id, {resolve, reject}); ACC.busy++;
    ACC.worker.postMessage({type:"run", id, audio, ...(extra || {})}, [audio.buffer]);
  });
}
const accurateOn = () => settings.accurate !== false && !!window.Worker && !!(window.AudioContext || window.webkitAudioContext);
// Record the raw audio whenever an accurate transcript can be made: by the server (everyone, no
// setting) or by the on-device backup model. Gating this on the on-device switch alone meant that
// turning the switch off silently left every answer on Chrome's rough live text.
const captureOn = () => (accurateOn() || cloudSpeech()) && !!(window.AudioContext || window.webkitAudioContext);
// Self-test for the accurate transcript: index.html#acctest=<wav url> runs a recording through
// the same pipeline as the mic (chunking + Whisper + term fixes) and prints the result.
if (/#acctest=/.test(location.hash)) setTimeout(async () => {
  const out = document.body.appendChild(Object.assign(document.createElement("pre"), {id:"acctest", textContent:"running"}));
  try{
    // "#acctest=clip.wav&realtime" plays the clip at speaking speed, like a live recording, and
    // reports how long the transcript takes after "stop".
    const [file, mode] = decodeURIComponent(location.hash.split("#acctest=")[1]).split("&"), t0 = performance.now();
    const bufs = await Promise.all(file.split("+").map(async f => new OfflineAudioContext(1, 16000 * 600, 16000).decodeAudioData(await (await fetch(f)).arrayBuffer())));
    const audio = {getChannelData: () => concatAll(bufs.map(b => b.getChannelData(0)))};
    mic.rate = 16000; accState.parts = []; accState.drafts = []; accState.interim = null; accState.full = []; accState.pending = []; accState.carry = null; accState.session = ++mic.session; mic.whisperLive = false;
    accLoad(); await new Promise(r => { const ok = () => { if (ACC.ready || ACC.failed){ ACC.listeners.delete(ok); r(); } }; ACC.listeners.add(ok); ok(); });
    // "&repeat=N" tiles the clip (a long answer); "&mic48" feeds it at 48 kHz like a laptop mic.
    const opt = decodeURIComponent(location.hash), rep = +((opt.match(/repeat=(\d+)/) || [])[1] || 1), m48 = /mic48/.test(opt);
    // "&q=<id>" answers a specific question (its terms become the hint).
    const qid = (opt.match(/[&#]q=([\w-]+)/) || [])[1], qq = qid && allQs().find(x => x.id === qid); if (qq) state.current = qq;
    let pcm = audio.getChannelData(0);
    if (rep > 1){ const t = new Float32Array(pcm.length * rep); for (let k = 0; k < rep; k++) t.set(pcm, k * pcm.length); pcm = t; }
    if (m48){ const u = new Float32Array(pcm.length * 3); for (let i = 0; i < u.length; i++){ const a = i / 3, j = Math.floor(a), f = a - j; u[i] = pcm[j] * (1 - f) + (pcm[j + 1] || 0) * f; } pcm = u; mic.rate = 48000; }
    const live = mode === "realtime", step = mic.rate * 0.4;
    // Feed it the way the mic does: 0.4 s at a time, at speaking speed, while "recording".
    mic.on = true; mic.base = ""; const renders = [];
    const t = $("ans"); let lastVal = t ? t.value : "";
    const poll = setInterval(() => { const v = $("ans") ? $("ans").value : ""; if (v !== lastVal){ lastVal = v; renders.push({at: performance.now() - t0, words: v.split(/\s+/).filter(Boolean).length}); } }, 50);
    for (let i = 0; i < pcm.length; i += step){ mic.pcm = [pcm.slice(i, i + step)]; accFlush(false); if (live) await new Promise(r => setTimeout(r, 400)); }
    const stop = performance.now();
    mic.on = false; clearInterval(poll);
    accFlush(true);
    await Promise.allSettled(accState.pending);
    if (/cloud/.test(location.hash) && cloudSpeech()){ const c0 = performance.now(); const ct = await cloudTranscribe(accState.full, state.current); const pt = await polishTranscript(ct, "", state.current); out.textContent = JSON.stringify({engine:"cloud", afterStop: +((performance.now() - stop) / 1000).toFixed(1), cloudSecs: +((performance.now() - c0) / 1000).toFixed(1), raw: ct, text: pt.text}); return; }
    // Live lag: when the box showed N words vs. when those words were spoken (~2.5 words/s).
    const spoken = (stop - t0) / 1000, totalWords = joinPieces(accState.parts).split(/\s+/).length, wps = totalWords / spoken;
    const lags = renders.map(r => +(r.at / 1000 - r.words / wps).toFixed(1));
    out.textContent = JSON.stringify({updates: renders.length, typicalLag: lags.sort((a, b) => a - b)[Math.floor(lags.length / 2)], wordsShownAtStop: renders.length ? renders.at(-1).words : 0, totalWords, seconds: +((performance.now() - t0) / 1000).toFixed(1), afterStop: +((performance.now() - stop) / 1000).toFixed(1), pieces: accState.parts.length, text: predictTerms(fixTerms(joinPieces(accState.parts)), state.current)});
  }catch(e){ out.textContent = "error: " + e; }
}, 500);

// Voice audit: index.html#acctestbatch=<list.json> runs every clip in the list ({file, q, cond})
// through the real path (48 kHz mic rate -> downsample -> server -> clean-up) under the question
// it answers, paced for the server's per-visitor limit, and prints [{file, cond, raw, text}].
if (/#acctestbatch=/.test(location.hash)) setTimeout(async () => {
  const out = document.body.appendChild(Object.assign(document.createElement("pre"), {id:"acctest", textContent:"running"}));
  const list = decodeURIComponent(location.hash.split("#acctestbatch=")[1]), base = list.replace(/[^/]*$/, "");
  const items = await (await fetch(list)).json(), res = [];
  for (const it of items){
    const t0 = performance.now();
    try{
      const buf = await new OfflineAudioContext(1, 16000 * 600, 16000).decodeAudioData(await (await fetch(base + it.file)).arrayBuffer());
      const pcm = buf.getChannelData(0), up = new Float32Array(pcm.length * 3);
      for (let i = 0; i < up.length; i++){ const a = i / 3, j = Math.floor(a), f = a - j; up[i] = pcm[j] * (1 - f) + (pcm[j + 1] || 0) * f; }
      state.current = allQs().find(x => x.id === it.q) || null;
      const raw = await cloudTranscribe([to16k([up], 48000)], state.current);
      const p = await polishTranscript(raw, "", state.current);
      res.push({file: it.file, cond: it.cond, secs: +((performance.now() - t0) / 1000).toFixed(1), raw, text: p.text});
    }catch(e){ res.push({file: it.file, cond: it.cond, error: String(e && e.message || e)}); }
    out.textContent = "running " + res.length + "/" + items.length;
    await new Promise(r => setTimeout(r, 11000));
  }
  out.textContent = JSON.stringify(res);
}, 800);

// Raw audio for Whisper: mono Float32 at the context's rate, resampled to 16 kHz.
function to16k(chunks, rate){
  const n = chunks.reduce((s, c) => s + c.length, 0), all = new Float32Array(n);
  let o = 0; for (const c of chunks){ all.set(c, o); o += c.length; }
  if (rate === 16000) return all;
  // Average each output sample's window of input samples (a simple low-pass) before thinning
  // 48 kHz down to 16 kHz. Picking every third sample folds high-pitched noise into the speech band.
  const ratio = rate / 16000, out = new Float32Array(Math.floor(n / ratio));
  for (let i = 0; i < out.length; i++){
    const a = Math.floor(i * ratio), b = Math.min(n, Math.max(a + 1, Math.floor((i + 1) * ratio)));
    let s = 0; for (let j = a; j < b; j++) s += all[j];
    out[i] = s / (b - a);
  }
  return out;
}
// Answers are sent to Whisper in short pieces while you're still talking, each cut at the
// quietest moment between 4 and 8 seconds so no word is split. (Each read costs about the same
// whatever its length, so a few longer pieces beat many short ones.) When you stop, only the
// last few seconds are left to transcribe.
const PIECE_MIN = 4, PIECE_MAX = 8;
function cutPoint(a){
  const sr = 16000, win = sr * 0.25;
  let best = Math.min(a.length, sr * PIECE_MAX), bestE = Infinity;
  for (let s = sr * PIECE_MIN; s + win <= Math.min(a.length, sr * PIECE_MAX); s += win / 2){
    let e = 0; for (let i = s; i < s + win; i++) e += a[i] * a[i];
    if (e < bestE){ bestE = e; best = s + win / 2; }
  }
  return Math.floor(best);
}
const accState = {parts:[], drafts:[], pending:[], carry:null, session:0, interim:null, full:[]};
function accFlush(final){
  if (!captureOn()) return;
  const audio = to16k(mic.pcm, mic.rate); mic.pcm = [];
  if (audio.length) accState.full.push(audio);
  let buf = accState.carry ? concatF32(accState.carry, audio) : audio; accState.carry = null;
  const session = accState.session;
  while (buf.length > 16000 * PIECE_MAX || (final && buf.length > 16000 * 0.4)){
    const cut = buf.length > 16000 * PIECE_MAX ? cutPoint(buf) : buf.length;
    const piece = buf.slice(0, cut); buf = buf.slice(cut);
    const idx = accState.parts.length; accState.parts.push(null);
    // Until the final read of this piece comes back, show the live draft that covered it.
    accState.drafts[idx] = accState.interim && accState.interim.at === idx ? accState.interim.text : ""; accState.interim = null;
    // Skip only true digital silence. Quiet speech is real speech: the worker turns it up.
    let pk = 0; for (let i = 0; i < piece.length; i += 2) pk = Math.max(pk, Math.abs(piece[i]));
    if (pk < 0.0015){ accState.parts[idx] = ""; continue; }
    if ((cloudSpeech() && SR) || !accurateOn()) continue;   // the server reads the whole answer; Chrome types live
    accLoad();
    accState.pending.push(accRunWhenReady(piece, {session, prompt: speechPrompt(state.current)}).then(t => { if (accState.session === session){ accState.parts[idx] = cleanPiece(t); renderLive(); } }).catch(() => {}));
  }
  if (buf.length) accState.carry = buf;
  if (!final) liveDraft(session);
}
// Live words normally come from the browser's recognizer, instantly. If it isn't giving any
// (another browser, or it's blocked), re-read the unfinished piece as a draft when the model is free.
const chromeLive = () => !!(mic.final + " " + (mic.interim || "")).trim();
function liveDraft(session){
  const c = accState.carry;
  if (chromeLive() || !ACC.ready || ACC.busy || !mic.on || !c || c.length < 16000 * 1.5) return;
  if (Date.now() - (accState.draftAt || 0) < 1500) return;
  accState.draftAt = Date.now();
  const at = accState.parts.length;
  accRun(c.slice(), {session, prompt: speechPrompt(state.current), interim: true}).then(t => {
    if (accState.session !== session || accState.parts.length !== at) return;   // that audio was already sent as a piece
    accState.interim = {at, text: cleanPiece(t)}; renderLive();
  }).catch(() => {});
}
// If the speech model is already in this browser's cache, start it while the page is idle so
// the first recording doesn't wait for it. (Never starts a fresh download on its own.)
async function accPreload(){
  try{
    if (!accurateOn() || ACC.worker || !("caches" in window)) return;
    const m = (SPEECH_MODELS[settings.speechModel] || SPEECH_MODELS.fast).id;
    const cache = await caches.open("transformers-cache");
    const hit = await cache.match(`https://huggingface.co/${m}/resolve/main/onnx/encoder_model_quantized.onnx`);
    if (hit && !(cloudSpeech() && SR)) accLoad();
  }catch{}
}
setTimeout(() => (window.requestIdleCallback || setTimeout)(accPreload), 2500);

// Whisper ends every piece with a full stop, even mid-sentence. When the next piece carries on
// the same sentence ("…the tax rate." + "plus D&A…", "…the discount rate." + "Which is…"), join them.
const CONTINUES = /^(?:which|using|and|plus|or|but|because|where|while|since|then|to|of|for|with|in|on|that|than|minus|times|divided|so that|as)\b/i;
function joinPieces(parts){
  const ps = parts.filter(Boolean).map(p => p.trim().replace(/^\+\s*/, "plus "));
  let out = "";
  for (const p of ps){
    if (!out){ out = p; continue; }
    const cont = /^[a-z]/.test(p) || CONTINUES.test(p);
    const lower = s => /^[A-Z][a-z]/.test(s) && !/^(?:I|I'm|I'd|I've)\b/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;
    if (cont && /\.$/.test(out) && !/\b(?:etc|Inc|Co|vs|e\.g|i\.e)\.$/.test(out)) out = out.slice(0, -1) + " " + lower(p);
    else if (/[,;:]$/.test(out) && CONTINUES.test(p)) out += " " + lower(p);   // "…amortization," + "Then subtracts…"
    else out += " " + p;
  }
  return out.replace(/\s+/g, " ").trim();
}

// Nothing is shown while you talk (Caleb, 10-28): half-heard words that change as you speak looked
// worse than no words. The clean transcript appears once, when you stop.
function renderLive(){}
// What Whisper is told to expect: the finance terms in the question's answer key, never the
// question itself. Given the question, the models "heard" lines of it in pauses ("Part 2, After one
// year", "Part 2, A$10, Cp.").
function speechPrompt(q){
  if (!q) return "";
  const terms = [...new Set(expectedTerms(q).filter(t => t.local).map(t => t.show))].slice(0, 25);
  return terms.length ? terms.join(", ") + "." : "";
}
// Whisper's stock phrases for silence or noise, never part of an interview answer.
function cleanPiece(t){
  const s = String(t || "").trim();
  if (/^(?:\[.*\]|\(.*\)|thank you\.?|thanks for watching[.!]?|you\.?|bye\.?|\.+)$/i.test(s)) return "";
  return s.replace(/\[[^\]]{0,40}\]|\((?:[a-z]+ ){0,4}(?:music|silence|noise|whirring|running|fizzing|buzzing|humming|static|beeping|breathing|clicking|typing|sighs?|coughs?|laughs?)\)/gi, "").replace(/\s{2,}/g, " ").trim();
}
function concatF32(a, b){ const o = new Float32Array(a.length + b.length); o.set(a); o.set(b, a.length); return o; }
function accRunWhenReady(audio, extra){
  if (ACC.ready) return accRun(audio, extra);
  return new Promise((resolve, reject) => {
    const check = () => { if (ACC.ready){ ACC.listeners.delete(check); accRun(audio, extra).then(resolve, reject); } else if (ACC.failed){ ACC.listeners.delete(check); reject(new Error("unavailable")); } };
    ACC.listeners.add(check); check();
  });
}
const DICTATE = "Tip: click in the answer box and use your keyboard's dictation (Win+H on Windows, press Fn twice on Mac). It works the same way.";
function setMicNote(t){ const n = $("micNote"); if (n){ n.textContent = t || ""; n.hidden = !t; } }
// The accurate transcript arrived after you started editing: your edit stays; one tap swaps it in.
function offerTranscript(text, heard){
  const n = $("micNote"); if (!n) return;
  n.replaceChildren("You edited the answer while it was transcribing, so your version was kept. ",
    h("button", {class:"btn plain", style:{padding:"2px 8px"}, onclick:() => { const t = $("ans"); if (!t) return; t.value = text; state.answer = text; state.polished = text; state.heard = {...heard, shown:text}; updateWC(); setMicNote(""); }, text:"Use the accurate transcript"}));
  n.hidden = false;
}
async function startMeter(){
  const wave = $("wave"); if (!wave) return;
  wave.classList.add("on");
  const bars = [...wave.children];
  try{
    // Create the audio context now, while the tap still counts as a user gesture. Made after the
    // mic prompt, browsers can start it paused, and then nothing is recorded for the transcript.
    mic.ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Raw audio, no noise suppression or gain riding: those clip soft word endings, and Whisper
    // is trained on natural audio. (The browser's live recognizer does its own processing.)
    mic.stream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false, noiseSuppression:false, autoGainControl:false, channelCount:1}});
    if (mic.ctx.state !== "running") await mic.ctx.resume().catch(() => {});
    const an = mic.ctx.createAnalyser(); an.fftSize = 64;
    const src = mic.ctx.createMediaStreamSource(mic.stream); src.connect(an);
    if (captureOn()){
      // Keep the raw audio for the accurate transcript.
      mic.rate = mic.ctx.sampleRate; mic.capturing = true;
      const proc = mic.proc = mic.ctx.createScriptProcessor(2048, 1, 1);
      let since = 0;
      proc.onaudioprocess = e => {
        if (!mic.recording) return;
        const ch = e.inputBuffer.getChannelData(0); mic.pcm.push(new Float32Array(ch));
        since += ch.length; if (since > mic.rate * 0.4){ since = 0; accFlush(false); }
      };
      src.connect(proc); proc.connect(mic.ctx.destination);
    }
    const buf = new Uint8Array(an.frequencyBinCount);
    const loop = () => { an.getByteFrequencyData(buf); bars.forEach((b,i) => { const v = buf[(i*2+2) % buf.length] / 255; b.style.height = (3 + v*23) + "px"; }); mic.raf = requestAnimationFrame(loop); };
    loop();
    return true;
  }catch{
    const loop = () => { bars.forEach(b => b.style.height = (4 + Math.random()*18) + "px"); mic.raf = setTimeout(loop, 110); };
    loop();
    return false;
  }
}
function stopMeter(){
  cancelAnimationFrame(mic.raf); clearTimeout(mic.raf);
  try{ mic.stream && mic.stream.getTracks().forEach(t => t.stop()); }catch{}
  try{ mic.ctx && mic.ctx.close(); }catch{}
  try{ mic.proc && mic.proc.disconnect(); }catch{}
  mic.stream = mic.ctx = mic.proc = null;
  const wave = $("wave"); if (wave){ wave.classList.remove("on"); [...wave.children].forEach(b => b.style.height = "3px"); }
}
async function startMic(){
  if (synth) synth.cancel();
  if (mic.on || mic.starting) return;
  const acc = captureOn();
  if (!SR && !acc){ $("ans").focus(); setMicNote("This browser can't transcribe from the page. " + DICTATE); return; }
  mic.base = $("ans").value.trim() ? $("ans").value.trim() + " " : ""; mic.final = ""; mic.interim = ""; mic.finalSrc = ""; mic.finalFixed = "";
  mic.pcm = []; mic.capturing = false; mic.finishing = null;
  accState.parts = []; accState.drafts = []; accState.interim = null; accState.full = []; accState.pending = []; accState.carry = null; accState.session = ++mic.session; mic.whisperLive = false;
  if (accurateOn() && !(cloudSpeech() && SR)) accLoad();
  // Open the microphone first and start recording the moment audio flows, then show
  // "Listening". Starting the recognizer before the mic was open lost your first words.
  mic.starting = true; mic.recording = true; state.spoken = true;
  let told = false; try{ told = localStorage.getItem("sdr:micinfo") === "1"; localStorage.setItem("sdr:micinfo", "1"); }catch{}
  if (!told && cloudSpeech()) setMicNote("Your voice is sent securely to a speech-to-text service to turn it into text, and isn't stored there. See Privacy at the bottom of the page.");
  const lbl = $("recLabel"); if (lbl) lbl.textContent = "Starting…";
  await startMeter();
  mic.starting = false;
  timer.start();
  if (SR){
    const rec = mic.rec = new SR(); rec.continuous = true; rec.interimResults = true; rec.lang = "en-US"; rec.maxAlternatives = 1;
    biasRecognizer(rec, state.current);
    rec.onresult = e => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++){ const r = e.results[i]; if (r.isFinal) mic.final += r[0].transcript.trim() + " "; else interim += r[0].transcript; }
      mic.interim = interim;
      // Correct the finished part once, and only the still-changing tail on every update.
      if (mic.finalSrc !== mic.final){ mic.finalSrc = mic.final; mic.finalFixed = predictTerms(fixTerms(mic.final), state.current); }
      // Chrome's words are kept only as a fallback; they are not shown while you talk.
    };
    rec.onerror = e => {
      // Word hints only work with Chrome's on-device recognizer; elsewhere they stop live text
      // altogether. Drop them for good and carry on.
      if (/phrases|language-not-supported/.test(e.error)){ noPhrases = true; try{ rec.phrases = []; }catch{} return; }
      if (/not-allowed|service-not-allowed|audio-capture/.test(e.error)){ mic.on = false; mic.recording = false; setMicUI(false); stopMeter(); timer.stop(); setMicNote("The page couldn't use the microphone. " + DICTATE); $("ans").focus(); } };
    // Chrome ends a session after a pause and throws away words it hadn't finalized yet.
    // Keep those words, then restart so nothing you say is dropped.
    rec.onend = () => {
      if (mic.interim.trim()){ mic.final += mic.interim.trim() + " "; mic.interim = ""; }
      if (mic.on){ try{ rec.start(); }catch{ setTimeout(() => { if (mic.on) try{ rec.start(); }catch{} }, 250); } }
    };
    try{ rec.start(); }catch{ if (!acc){ setMicNote("The microphone didn't start. " + DICTATE); timer.stop(); mic.recording = false; stopMeter(); return; } }
  }
  mic.on = true; setMicUI(true);
  setMicNote(SR ? "" : "Listening. Your words will appear when you stop.");
}
function stopMic(auto=true){
  if (!mic.on) return;
  mic.on = false; try{ mic.rec && mic.rec.stop(); }catch{}
  setMicUI(false); timer.stop();
  const useAcc = captureOn() && mic.capturing;
  if (!useAcc){
    mic.recording = false; stopMeter();
    // No recording to send for the accurate transcript: say so, rather than pass rough text off as final.
    if ((mic.final || "").trim()){
      const t = $("ans"); if (t){ t.value = mic.base + predictTerms(fixTerms((mic.final + " " + (mic.interim || "")).trim()), state.current); state.answer = t.value; updateWC(); }
      setMicNote("This is Chrome's rougher live transcript (" + (captureOn() ? "the microphone recording didn't start" : "accurate transcription isn't available in this browser") + "). Check it before you analyze.");
      state.heard = {whisper:"", live:(mic.final + " " + (mic.interim || "")).trim(), shown:$("ans") ? $("ans").value : "", at:Date.now(), engine:"live", err: captureOn() ? "no recording" : "no capture"};
    }
    if (auto && settings.autoGrade && $("ans") && $("ans").value.trim().length > 15) setTimeout(grade, 700);
    return;
  }
  // Keep recording a moment after you tap stop, so the last word isn't clipped.
  mic.finishing = new Promise(resolve => setTimeout(() => {
    mic.recording = false; accFlush(true); stopMeter();
    finishAccurate(auto).then(resolve, resolve);
  }, 350));
  const ta = $("ans");
  if (ta && ta.dataset.ph){ ta.placeholder = "Transcribing…"; mic.finishing.then(() => { if ($("ans") === ta) ta.placeholder = ta.dataset.ph; }); }
}
/* Server-quality transcript: the whole answer goes to Whisper large-v3-turbo (Groq, free tier)
   through the site's own Supabase function, which keeps the key server-side. Works for anyone
   who opens the page; no sign-in. If it's unavailable, the on-device model and Chrome's live
   words take over. */
const CLOUD = {broken:0};
const cloudSpeech = () => typeof Cloud !== "undefined" && Cloud.hasFunctions && settings.cloudSpeech !== false && Date.now() > CLOUD.broken;
function wavBlob(chunks){
  const n = chunks.reduce((t, c) => t + c.length, 0), buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const str = (o, x) => { for (let i = 0; i < x.length; i++) v.setUint8(o + i, x.charCodeAt(i)); };
  str(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); str(8, "WAVE"); str(12, "fmt "); v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, 16000, true); v.setUint32(28, 32000, true);
  v.setUint16(32, 2, true); v.setUint16(34, 16, true); str(36, "data"); v.setUint32(40, n * 2, true);
  // Level the volume first: quiet laptop mics are common.
  let pk = 0; for (const c of chunks) for (let i = 0; i < c.length; i++) pk = Math.max(pk, Math.abs(c[i]));
  const g = Math.min(30, 0.9 / Math.max(pk, 1e-6));
  let o = 44; for (const c of chunks) for (let i = 0; i < c.length; i++, o += 2) v.setInt16(o, Math.max(-1, Math.min(1, c[i] * g)) * 0x7fff, true);
  return new Blob([buf], {type: "audio/wav"});
}
// Whisper sometimes "hears" its hint at the end of a long recording ("Terms, depreciation,
// subtracting."). Drop trailing sentences made only of hint words that repeat or start with "Terms".
function dropEcho(text, prompt){
  const hint = new Set(plainWords(prompt).concat(["terms", "term"]));
  const ss = String(text).split(/(?<=[.!?])\s+/);
  while (ss.length > 1){
    const w = plainWords(ss[ss.length - 1]);
    if (w.length && w.length <= 12 && (w[0] === "terms" || w[0] === "term") && w.every(x => hint.has(x))) ss.pop();
    else break;
  }
  return ss.join(" ").replace(/(\b[^.!?]{3,80}[.!?])(?:\s+\1)+$/, "$1");
}
// One request: a hiccup (network, busy, slow start) is retried once before giving up.
async function cloudRead(audio, prompt){
  for (let attempt = 0; ; attempt++){
    const fd = new FormData();
    fd.append("file", wavBlob([audio]), "answer.wav");
    fd.append("prompt", prompt);
    const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 12000 + audio.length / 16000 * 150);
    try{
      const r = await fetch(Cloud.functionUrl("transcribe"), {method: "POST", body: fd, signal: ctl.signal, headers: Cloud.functionHeaders()});
      const j = await r.json().catch(() => ({}));
      if (r.ok) return dropEcho(cleanPiece(j.text || ""), prompt);
      // Not set up, or blocked: stop trying for a while and use the on-device model.
      if (r.status === 503 || r.status === 403 || r.status === 404){ CLOUD.broken = Date.now() + 10 * 60e3; throw new Error(j.error || "unavailable " + r.status); }
      if (attempt) throw new Error(j.error || "server " + r.status);
    }catch(e){ if (attempt || CLOUD.broken > Date.now()) throw e; }
    finally{ clearTimeout(timer); }
    await new Promise(r => setTimeout(r, 700));
  }
}
// The server takes about 3 minutes of audio per request, so a longer answer goes in parts cut
// at a pause, read at the same time and joined.
const CLOUD_PART = 16000 * 150;
// Pauses are where speech models make things up. Shorten every pause over 0.6 s to 0.5 s (gaps
// between words stay as they are), judged against this recording's own quiet and loud levels.
function squeezeSilence(a){
  const F = 320, n = Math.floor(a.length / F); if (n < 50) return a;
  const rms = new Float32Array(n);
  for (let f = 0; f < n; f++){ let s = 0; for (let i = f * F; i < (f + 1) * F; i++) s += a[i] * a[i]; rms[f] = Math.sqrt(s / F); }
  const sorted = Array.from(rms).sort((x, y) => x - y), floor = sorted[Math.floor(n * 0.1)], loud = sorted[Math.floor(n * 0.95)];
  const th = Math.max(floor * 2.5, loud * 0.06);
  const keep = []; let f = 0;
  while (f < n){
    if (rms[f] >= th){ keep.push([f, f + 1]); f++; continue; }
    let e = f; while (e < n && rms[e] < th) e++;
    if (e - f > 30){ keep.push([f, f + 12]); keep.push([e - 13, e]); } else keep.push([f, e]);
    f = e;
  }
  let len = 0; for (const [s, e] of keep) len += (e - s) * F;
  const out = new Float32Array(len + (a.length - n * F)); let o = 0;
  for (const [s, e] of keep){ out.set(a.subarray(s * F, e * F), o); o += (e - s) * F; }
  out.set(a.subarray(n * F), o);
  return out;
}
// A short phrase repeated word for word ("Part 2, A$10, Cp." four times) is the model looping, not speech.
function dropLoops(text){
  const ss = String(text).split(/(?<=[.!?])\s+/), key = s => s.toLowerCase().replace(/[^a-z0-9$%]+/g, " ").trim();
  const count = {}; for (const s of ss) count[key(s)] = (count[key(s)] || 0) + 1;
  return ss.filter(s => !(count[key(s)] >= 2 && key(s).split(" ").length <= 6)).join(" ");
}
async function cloudTranscribe(chunks, q){
  const all = squeezeSilence(concatAll(chunks));
  if (all.length < 16000 * 0.6) return "";
  const parts = [];
  let buf = all;
  while (buf.length > CLOUD_PART + 16000 * 20){
    // the quietest quarter-second in the 20 s before the limit
    let cut = CLOUD_PART, low = Infinity;
    for (let s = CLOUD_PART - 16000 * 20; s < CLOUD_PART; s += 2000){ let e = 0; for (let i = s; i < s + 4000; i++) e += buf[i] * buf[i]; if (e < low){ low = e; cut = s + 2000; } }
    parts.push(buf.slice(0, cut)); buf = buf.slice(cut);
  }
  parts.push(buf);
  const prompt = speechPrompt(q).slice(0, 600);
  const texts = await Promise.all(parts.map(p => cloudRead(p, prompt)));
  return dropLoops(joinPieces(texts));
}
/* Your last 10 recordings, kept in this browser only (never uploaded), with what each engine heard.
   Settings → "Download recordings" saves them with the practice log, so transcription can be
   tuned on your real voice, not test clips. Turn it off in Settings. */
const REC_KEEP = 10;
const keepRecordings = () => settings.keepRecordings !== false;
function recDB(){
  return new Promise((res, rej) => { try{ const r = indexedDB.open("sdr-rec", 1); r.onupgradeneeded = () => r.result.createObjectStore("rec", {keyPath:"at"}); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }catch(e){ rej(e); } });
}
async function recSave(chunks, meta){
  if (!keepRecordings() || !window.indexedDB || !chunks.length) return;
  try{
    const db = await recDB(), tx = db.transaction("rec", "readwrite"), st = tx.objectStore("rec");
    st.put({at: Date.now(), wav: wavBlob(chunks), ...meta});
    const keys = await new Promise(r => { const q = st.getAllKeys(); q.onsuccess = () => r(q.result); q.onerror = () => r([]); });
    keys.sort((a, b) => a - b).slice(0, Math.max(0, keys.length - REC_KEEP)).forEach(k => st.delete(k));
  }catch{}
}
async function recAll(){
  try{ const db = await recDB(); return await new Promise(r => { const q = db.transaction("rec").objectStore("rec").getAll(); q.onsuccess = () => r(q.result || []); q.onerror = () => r([]); }); }catch{ return []; }
}
async function recClear(){ try{ const db = await recDB(); db.transaction("rec", "readwrite").objectStore("rec").clear(); }catch{} }
const blobB64 = b => new Promise(r => { const f = new FileReader(); f.onload = () => r(String(f.result).split(",")[1] || ""); f.onerror = () => r(""); f.readAsDataURL(b); });
async function finishAccurate(auto){
  if (cloudSpeech()){
    const session0 = accState.session, ta0 = $("ans"), before0 = ta0 ? ta0.value : "";
    setMicNote("Transcribing…");
    const secs = accState.full.reduce((n, c) => n + c.length, 0) / 16000;
    const live = (mic.final + " " + (mic.interim || "")).replace(/\s+/g, " ").trim();
    let text = null, err = "";
    if (secs < 0.6 && live) err = "no audio was recorded";
    else { try{ text = await cloudTranscribe(accState.full, state.current); }catch(e){ text = null; const m = String(e && (e.name === "AbortError" ? "timeout" : e.message) || e); err = /busy|429/.test(m) ? "the speech server was busy" : /timeout|abort/i.test(m) ? "the speech server took too long" : /fetch|network/i.test(m) ? "no connection to the speech server" : "the speech server had an error"; } }
    if (session0 !== accState.session) return;
    if (text !== null){
      const t = $("ans");
      if (text && t && t.value === before0 && !state.report){
        // The server's read is far better than Chrome's, so Chrome's words are never mixed in:
        // only the targeted finance-term fixes and your own corrections apply.
        const p = await polishTranscript(text, "", state.current);
        if (session0 !== accState.session || $("ans") !== t || t.value !== before0 || state.report) return;
        t.value = mic.base + p.text; state.answer = t.value; state.polished = t.value; updateWC();
        state.heard = {whisper:text, live, shown:p.text, at:Date.now(), engine:"cloud", secs:+secs.toFixed(1)};
        recSave(accState.full, {q: state.current ? state.current.id : "", question: state.current ? String(state.current.q).slice(0, 300) : "", engine:"cloud", server:text, live, shown:p.text});
        setMicNote(p.fixes.length ? "Fixed misheard words: " + p.fixes.slice(0, 6).map(f => `“${f.from}” → “${f.to}”`).join(", ") + ". Edit anything still wrong and the app will remember it." : "");
      } else if (!text && live && t && t.value === before0 && !state.report){
        t.value = mic.base + predictTerms(fixTerms(live), state.current); state.answer = t.value; updateWC();
        state.heard = {whisper:"", live, shown:t.value, at:Date.now(), engine:"live", err:"server heard nothing", secs:+secs.toFixed(1)};
        setMicNote("The accurate transcript came back empty, so this is the rougher live transcript. Check it before you analyze.");
      } else if (text && t && t.value !== before0 && !state.report){
        const ready = mic.base + (await polishTranscript(text, "", state.current)).text;
        offerTranscript(ready, {whisper:text, live, at:Date.now(), engine:"cloud", secs:+secs.toFixed(1)});
      } else setMicNote("");
      if (auto && settings.autoGrade && t && t.value.trim().length > 15 && !state.report && t.value === before0) setTimeout(grade, 300);
      return;
    }
    // The server read failed: fall back to the on-device model on the whole answer.
    accState.cloudErr = err;
    if (accurateOn() && !accState.pending.length && accState.full.length && secs >= 0.6){
      accLoad();
      const all = concatAll(accState.full); const idx = accState.parts.length; accState.parts.push(null);
      accState.pending.push(accRunWhenReady(all, {session: accState.session, prompt: speechPrompt(state.current)}).then(t => { accState.parts[idx] = cleanPiece(t); }).catch(() => {}));
    }
  }
  return finishLocal(auto);
}
function concatAll(chunks){ const n = chunks.reduce((t, c) => t + c.length, 0), o = new Float32Array(n); let k = 0; for (const c of chunks){ o.set(c, k); k += c.length; } return o; }
async function finishLocal(auto){
  const session = accState.session, ta = $("ans"), before = ta ? ta.value : "";
  const note = () => setMicNote(ACC.ready ? "Making your transcript more accurate…"
    : ACC.failed ? "" : `Getting the accurate speech model ready (one-time download, about ${(ACC.model || SPEECH_MODELS.fast).mb} MB): ${Math.round(ACC.progress * 100)}%. You can analyze now with the live transcript or wait.`);
  ACC.listeners.add(note); note();
  await Promise.allSettled(accState.pending);
  ACC.listeners.delete(note);
  if (session !== accState.session) return;                      // a new recording started
  const text = dropLoops(joinPieces(accState.parts));
  const live = (mic.final + " " + (mic.interim || "")).replace(/\s+/g, " ").trim();
  const t = $("ans");
  if ((text || live) && t && t.value === before && !state.report){
    if (apiKey || sample) setMicNote("Checking your transcript against the question…");
    // Whisper's text is the main transcript; without it, the live text gets the same clean-up.
    const p = await polishTranscript(text || live, text ? live : "", state.current);
    if (session !== accState.session || $("ans") !== t || t.value !== before || state.report) return;
    t.value = mic.base + p.text; state.answer = t.value; state.polished = t.value; updateWC();
    state.heard = {whisper:text, live, shown:p.text, at:Date.now(), engine: text ? "device" : "live", err: accState.cloudErr || (text ? "" : "on-device model unavailable")};
    recSave(accState.full, {q: state.current ? state.current.id : "", question: state.current ? String(state.current.q).slice(0, 300) : "", engine: state.heard.engine, err: state.heard.err, device:text, live, shown:p.text});
    const why = accState.cloudErr ? ` (${accState.cloudErr})` : "";
    setMicNote(p.fixes.length ? "Fixed misheard words: " + p.fixes.slice(0, 6).map(f => `“${f.from}” → “${f.to}”`).join(", ") + (p.fixes.length > 6 ? "…" : "") + ". Edit anything still wrong and the app will remember it."
      : !text ? "This is the rougher live transcript" + why + ". Check it before you analyze." : why ? "Transcribed on this device" + why + "." : "");
  } else setMicNote(ACC.failed && !text ? "Accurate transcription isn't available in this browser, so this is the live transcript." : "");
  accState.cloudErr = "";
  if (auto && settings.autoGrade && t && t.value.trim().length > 15 && !state.report) setTimeout(grade, 300);
}
function setMicUI(on){
  const ta = $("ans");
  if (ta){
    if (on){ ta.dataset.ph = ta.dataset.ph || ta.placeholder; ta.placeholder = "Listening… your answer will appear here when you stop."; }
    else if (ta.dataset.ph){ ta.placeholder = mic.finishing ? "Transcribing…" : ta.dataset.ph; }
    ta.classList.toggle("listening", on); ta.readOnly = on;
    const comp = ta.closest(".composer"); if (comp) comp.classList.toggle("listening", on);
  }
  const b = $("recBtn"); if (!b) return;
  b.classList.toggle("on", on);
  b.setAttribute("aria-label", on ? "Stop recording" : "Start recording");
  $("recLabel").textContent = on ? "Stop" : "Answer out loud";
}

/* ---------- Timer ---------- */
const timer = {t0:0, id:null, el:0,
  start(){ if (this.id) return; this.t0 = Date.now() - this.el*1000; this.id = setInterval(() => this.tick(), 250); },
  stop(){ clearInterval(this.id); this.id = null; },
  reset(){ this.stop(); this.el = 0; this.paint(); },
  tick(){ this.el = Math.floor((Date.now()-this.t0)/1000); this.paint(); },
  paint(){ const c = $("clock"); if (!c) return; c.textContent = Math.floor(this.el/60) + ":" + String(this.el%60).padStart(2,"0"); c.classList.toggle("over", !!(state.current && this.el > (state.current.s||90)*1.4)); },
};
function updateWC(){ const n = (($("ans")||{}).value || "").trim().match(/\S+/g)?.length || 0; const w = $("wc"); if (w) w.textContent = n + (n===1?" word":" words"); }

/* ---------- App state ---------- */
const state = {view:"drill", track: store.get("track","acct"), current:null, report:null, ai:null, aiBusy:false, mock:null, answer:"", bankShown:150, course: store.get("courseOn", false)};
const NAV = [
  {id:"course", name:"Course", icon:"list", color:"c-teal"},
  {id:"drill", name:"Drill", icon:"mic", color:"c-red"},
  {id:"mock", name:"Mock interview", icon:"person2", color:"c-indigo"},
  {id:"mastery", name:"Mastery", icon:"target", color:"c-green"},
  {id:"bank", name:"Question bank", icon:"books", color:"c-orange"},
  {id:"progress", name:"Progress", icon:"chart", color:"c-blue"},
];

function go(view){
  if (mic.on) stopMic(false);
  if (view !== "mock") camStop();
  if (view === "drill" || view === "mock") exitCourse();   // the Drill tab is free practice
  if (view === "mock" && (!state.mock || state.mock.done)) state.mock = {intro:true, qs:[], results:[], i:0, done:false};
  state.view = view;
  closeDrawer();
  render();
  window.scrollTo({top:0});
}

/* ---------- Top bar, menu drawer + tab bar ---------- */
// Which questions to practise: extended practice, the GUIDES guides, the core drills, or all of them.
function collectionPicker(style){
  const opts = [HAS_PRACTICE && ["practice","Extended practice"], HAS_GUIDES && ["guides","Study guides"], ["original","Core drills"], ["all","All questions"]].filter(Boolean);
  return h("select", {class:"selectbtn", "aria-label":"Question collection", style: style || null,
    onchange:e => { bankFilter.collection = e.target.value; bankFilter.topic = ""; bankFilter.level = ""; applyFilters(); }},
    ...opts.map(([k,n]) => h("option", {value:k, selected: bankFilter.collection===k, text:`${n} (${allQs().filter(q => k==="all" || (k==="original" ? q.collection!=="practice" && q.collection!=="guides" : q.collection===k)).length.toLocaleString()})`})));
}
function renderNav(){
  const m = $("navMain"); m.replaceChildren();
  const redo = allQs().filter(q => ["work","redo"].includes(levelOf(q.id)) && progress[q.id]).length;
  const tn = $("navTop");
  if (tn){
    tn.replaceChildren();
    NAV.forEach(n => tn.append(h("button", {class:"toplink", "aria-current": String(state.view===n.id), onclick:() => go(n.id)},
      n.id === "bank" ? "Questions" : n.name, n.id === "mastery" && redo ? h("span", {class:"badge", text:String(redo)}) : null)));
  }
  NAV.forEach(n => m.append(h("button", {class:"nav", "aria-current": String(state.view===n.id), onclick:() => go(n.id)},
    h("span", {class:"ic "+n.color, html:ic(n.icon)}), n.name,
    n.id === "mastery" && redo ? h("span", {class:"cnt badge", text:String(redo)}) : null)));
  const t = $("navTopics"); t.replaceChildren();
  const pool = filtered();
  if (HAS_PRACTICE || HAS_GUIDES) t.append(collectionPicker({margin:"0 8px 6px", width:"calc(100% - 16px)"}));
  TRACKS.forEach(tr => {
    const qs = pool.filter(q => q.t === tr.id); if (!qs.length) return;
    const c = mix(qs); const done = c.mastered;
    const [icon, col] = TRACK_STYLE[tr.id] || ["list","c-gray"];
    t.append(h("button", {class:"nav", "aria-current": String(state.view==="drill" && state.track===tr.id), title:`${done} of ${qs.length} mastered`, onclick:() => { setTrack(tr.id); go("drill"); }},
      h("span", {class:"ic "+col, html:ic(icon)}), tr.name,
      h("span", {class:"meter"}, h("i", {style:{width: (done/qs.length*100)+"%"}})),
      h("span", {class:"cnt", text:String(qs.length)})));
  });
  const tb = $("tabbar"); tb.replaceChildren();
  NAV.forEach(n => tb.append(h("button", {"aria-current": String(state.view===n.id), onclick:() => go(n.id)}, h("span", {html:ic(n.icon)}), n.id==="mock" ? "Mock" : n.id==="bank" ? "Bank" : n.name)));
}
function setTrack(id){ exitCourse(); state.track = id; store.set("track", id); pickNext(); }
["sideSearch", "topSearch"].forEach(id => { const el = $(id); if (el) el.addEventListener("input", debounce(e => { bankFilter.search = e.target.value; store.set("bankFilter", bankFilter); state.bankShown = 150; if (state.view !== "bank") state.view = "bank"; render(); const s = $(id); if (s) s.focus(); }, 250)); });
$("navSettings").onclick = openSettings;
$("topSettings").onclick = openSettings;
// Light / dark toggle in the top bar: a moon in light mode, a sun in dark mode.
const MOON = '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"/></svg>';
const SUN = '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></svg>';
const isDark = () => settings.theme === "dark" || (settings.theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
function paintThemeBtn(){
  const b = $("themeBtn"); if (!b) return;
  const dark = isDark();
  b.innerHTML = dark ? SUN : MOON;
  b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  b.title = dark ? "Light mode" : "Dark mode";
}
$("themeBtn").onclick = () => { settings.theme = isDark() ? "light" : "dark"; settings.themeChosen = true; saveSettings(); applyTheme(); paintThemeBtn(); };
themeBtnReady = true; paintThemeBtn();
$("topBrand").onclick = () => go("home");
$("footPrivacy").onclick = openPrivacy;
$("footHow").onclick = () => go("home");
$("menuBtn").onclick = () => { const s = $("sidebar"); s.classList.add("open"); const sc = h("div", {class:"drawer-scrim", id:"drawerScrim", onclick: closeDrawer}); document.body.append(sc); };
function closeDrawer(){ $("sidebar").classList.remove("open"); const s = $("drawerScrim"); if (s) s.remove(); }
window.addEventListener("scroll", () => $("toolbar").classList.toggle("scrolled", window.scrollY > 30), {passive:true});
function debounce(fn, ms){ let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

/* ---------- Course: every question in learning order ----------
   Units go from the foundations up (accounting before valuation before deals), and inside a
   unit all basic questions come before intermediate before advanced. Within a level, lessons
   follow the curated order: core drills, then the GUIDES guides section by section, then extended practice. */
const COURSE_UNITS = [
  {id:"acct",   name:"Accounting",                       test:q => q.t === "acct"},
  {id:"ev",     name:"Equity Value & Enterprise Value",  test:q => q.t === "val" && (/enterprise|equity value/i.test((q.topic||"") + " " + (q.section||"")) || (q.ref && q.ref.guide === "ev") || (!q.topic && /enterprise value|equity value/i.test(q.q)))},
  {id:"val",    name:"Valuation & DCF",                  test:q => q.t === "val"},
  {id:"ma",     name:"Mergers & Acquisitions",           test:q => q.t === "deal" && !/lbo|leveraged|buyout|restructuring|distress/i.test((q.topic||"") + " " + (q.section||"") + " " + (q.ref ? q.ref.guide : "")) && !(!q.topic && /\bLBO\b|leverag|private equity/i.test(q.q))},
  {id:"lbo",    name:"LBOs",                             test:q => q.t === "deal" && !/restructuring|distress/i.test(q.topic||"")},
  {id:"rx",     name:"Restructuring",                    test:q => q.t === "deal"},
  {id:"mkt",    name:"Markets & brainteasers",           test:q => q.t === "mkt"},
  {id:"sector", name:"Industry groups",                  test:q => q.t === "sector"},
  {id:"beh",    name:"Behavioral & fit",                 test:q => q.t === "beh"},
];
const TIER = l => /^(?:advanced|brainteaser)$/i.test(l || "") ? 2 : /^intermediate$/i.test(l || "") ? 1 : 0;
const TIER_NAME = ["Basics", "Intermediate", "Advanced"];
const COLLECTION_RANK = q => q.collection === "guides" ? 1 : q.collection === "practice" ? 2 : q.collection === "mine" || q.custom ? 3 : 0;
let courseCache = null;
function courseData(){
  const pool = allQs().filter(collectionOk);
  const key = bankFilter.collection + ":" + pool.length;
  if (courseCache && courseCache.key === key) return courseCache;
  const seen = new Set(), units = COURSE_UNITS.map(u => ({...u, qs:[]}));
  pool.forEach((q, i) => {
    const norm = q.q.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (seen.has(norm)) return; seen.add(norm);
    const u = units.find(u => u.test(q)); if (!u) return;
    u.qs.push({q, i, tier: TIER(q.l), lesson: q.section || (q.collection === "practice" ? q.topic : "") || "Essentials"});
  });
  const order = [], lessons = [];
  for (const u of units){
    u.qs.sort((a, b) => a.tier - b.tier || COLLECTION_RANK(a.q) - COLLECTION_RANK(b.q) || a.i - b.i);
    u.lessons = [];
    // Group consecutive questions into lessons; long groups become sets of 15.
    const groups = [];
    for (const x of u.qs){
      const name = `${TIER_NAME[x.tier]} · ${x.lesson}`;
      const g = groups[groups.length - 1];
      if (!g || g.name !== name) groups.push({name, items:[x]}); else g.items.push(x);
    }
    for (const g of groups){
      const sets = g.items.length > 20 ? Math.ceil(g.items.length / 15) : 1;
      for (let s = 0; s < sets; s++){
        const items = sets > 1 ? g.items.slice(s * 15, (s + 1) * 15) : g.items;
        const name = sets > 1 ? `${g.name} · Set ${s + 1} of ${sets}` : g.name;
        const l = {name, unit:u, qs: items.map(x => x.q), key: u.id + "|" + name};
        u.lessons.push(l); lessons.push(l);
        for (const x of items) order.push({q:x.q, unit:u, lesson:l});
      }
    }
  }
  courseCache = {key, units: units.filter(u => u.qs.length), lessons, order, pos: new Map(order.map((o, k) => [o.q.id, k]))};
  return courseCache;
}
// A question is passed once its best score reaches 7, you marked it mastered, or you tested out of its lesson.
const coursePassed = id => { const p = progress[id]; return !!p && (p.flag === "mastered" || !!p.out || (p.scores || []).some(s => s >= 7)); };
function courseNext(fromId){
  const c = courseData();
  const start = fromId != null && c.pos.has(fromId) ? c.pos.get(fromId) + 1 : 0;
  for (let k = start; k < c.order.length; k++) if (!coursePassed(c.order[k].q.id)) return c.order[k];
  for (let k = 0; k < Math.min(start, c.order.length); k++) if (!coursePassed(c.order[k].q.id)) return c.order[k];
  return null;
}
function startCourse(fromId){
  const c = courseData();
  const at = fromId && c.pos.has(fromId) ? c.order[c.pos.get(fromId)] : courseNext(store.get("coursePos", null));
  if (!at){ go("course"); return; }
  state.course = true; store.set("courseOn", true);
  state.track = at.q.t; state.view = "drill";
  store.set("coursePos", at.q.id);
  showQuestion(at.q);
  window.scrollTo({top:0});
}
function exitCourse(){ state.course = false; store.set("courseOn", false); state.testout = null; }

/* ---------- Test out: one hard question per lesson ----------
   Already know a unit? Answer the hardest question of each lesson instead of all of them.
   Score TEST_BAR or more and the whole lesson counts as done (and its questions as mastered,
   until you answer one of them yourself). Miss it and the lesson stays in your course. */
const TEST_BAR = 8;
function testQuestion(lesson){
  // The hardest question you haven't passed: highest level first, then the one whose answer
  // key asks for the most; a new one over one you've seen. Ties break at random.
  const open = lesson.qs.filter(q => !coursePassed(q.id));
  const pool = open.length ? open : lesson.qs;
  const rank = q => TIER(q.l) * 100 + Math.min(40, (q.k || []).length * 3) + (progress[q.id] ? 0 : 5) + Math.random() * 6;
  return pool.slice().sort((a, b) => rank(b) - rank(a))[0];
}
function startTestOut(unit, lesson){
  const lessons = (lesson ? [lesson] : unit.lessons).filter(l => !l.qs.every(q => coursePassed(q.id)));
  if (!lessons.length) return;
  exitCourse();
  state.testout = {unit, lessons, i:0, results:[], done:false, q:null};
  state.view = "drill";
  testShow();
}
function testShow(){
  const t = state.testout;
  t.q = testQuestion(t.lessons[t.i]);
  state.track = t.q.t;
  showQuestion(t.q);
  window.scrollTo({top:0});
}
function testResult(q, score){
  // Any try on the test question counts (Caleb, 10-28): a later 8 passes the lesson. A pass is
  // never undone by a weaker retry.
  const t = state.testout; if (!t || t.done || t.q !== q || (t.results[t.i] && t.results[t.i].pass)) return;
  const l = t.lessons[t.i], pass = score >= TEST_BAR;
  t.results[t.i] = {lesson:l, q, score, pass};
  if (pass){
    const now = Date.now();
    l.qs.forEach(x => { const p = progress[x.id] || {scores:[], q:x.q, t:x.t}; p.out = true; p.last = Math.max(p.last || 0, now); progress[x.id] = p; });
    store.set("progress", progress);
  }
}
function testAdvance(){
  const t = state.testout;
  if (!t.results[t.i]) t.results[t.i] = {lesson:t.lessons[t.i], q:t.q, score:null, pass:false};
  if (t.i < t.lessons.length - 1){ t.i++; testShow(); return; }
  t.done = true; if (mic.on) stopMic(false); render(); window.scrollTo({top:0});
}
function viewTestDone(v){
  const t = state.testout, res = t.results.filter(Boolean), passed = res.filter(r => r.pass);
  const cleared = passed.reduce((n, r) => n + r.lesson.qs.length, 0);
  v.append(h("h1", {class:"largetitle", text:"Test-out results"}));
  v.append(h("p", {class:"subtitle", text: passed.length
    ? `You passed ${passed.length} of ${res.length} lessons in ${t.unit.name}, so ${cleared} questions count as done. The lessons you missed stay in your course.`
    : `No lessons passed this time. Work through ${t.unit.name} in the course, then try again.`}));
  v.append(h("div", {class:"list"}, res.map(r => h("button", {class:"li qrow", onclick:() => { exitCourse(); state.track = r.q.t; state.view = "drill"; showQuestion(r.q); }},
    h("span", {class:"lic " + (r.pass ? "c-green" : r.score === null ? "c-gray" : "c-red"), html: ic(r.pass ? "check" : r.score === null ? "forward" : "warn")}),
    h("div", {class:"lit"}, h("b", {text:r.lesson.name}), h("span", {text: r.pass ? `Passed · ${r.lesson.qs.length} questions done` : r.score === null ? "Skipped" : "Not yet · stays in your course"})),
    h("span", {class:"trail"}, r.score !== null ? h("span", {class:`score-chip sc-${band(r.score)}`, text: r.score + "/10"}) : null, chevEl())))));
  v.append(h("div", {class:"row"},
    h("button", {class:"btn lg fill", onclick:() => { state.testout = null; startCourse(); }, html: ic("forward") + "Continue the course"}),
    h("button", {class:"btn lg tint", onclick:() => { state.testout = null; go("course"); }, text:"Course map"})));
}

/* ---------- Picking questions ---------- */
function pickNext(opts={}){
  if (state.testout && !state.testout.done) return testAdvance();
  if (state.course){
    // Course mode: the next question you haven't passed yet, in learning order.
    const nx = courseNext(state.current ? state.current.id : store.get("coursePos", null));
    if (nx){ state.track = nx.q.t; store.set("coursePos", nx.q.id); return showQuestion(nx.q, opts); }
    exitCourse();
  }
  const pool = filtered().filter(q => q.t === state.track);
  if (!pool.length){ state.current = null; return; }
  const cand = pool.filter(q => !state.current || q.id !== state.current.id);
  const list = cand.length ? cand : pool;
  const w = q => {
    const lv = levelOf(q.id);
    if (settings.order === "weak") return {redo:8, work:6, close:2, new:1, mastered:0.1}[lv];
    if (settings.order === "new") return lv === "new" ? 10 : 0.2;
    if (settings.order === "random") return 1;
    return {new:3, redo:4, work:3, close:1.5, mastered:0.3}[lv];
  };
  let r = Math.random() * list.reduce((s,q)=>s+w(q),0);
  for (const q of list){ r -= w(q); if (r <= 0) return showQuestion(q, opts); }
  showQuestion(list[list.length-1], opts);
}
// Alternate between a question's original wording and its reworded version: random the first
// time, then the other one each time it comes back.
function pickWording(q){
  const alt = typeof REPHRASE !== "undefined" && REPHRASE[q.id];
  if (!alt || q.followup) return q.q;
  const seen = store.get("wording", {});
  const useAlt = seen[q.id] === undefined ? Math.random() < 0.5 : seen[q.id] === 0;
  seen[q.id] = useAlt ? 1 : 0; store.set("wording", seen);
  return useAlt ? alt : q.q;
}
function showQuestion(q, opts={}){
  if (mic.on) stopMic(false);
  // Remember where you came from so ‹ can go back (last 50 questions).
  if (state.current && q && state.current.id !== q.id && !opts.back && !state.current.followup) state.back = [...(state.back || []), state.current.id].slice(-50);
  state.current = q; state.report = null; state.ai = null; state.answer = ""; state.revealed = null; state.spoken = false;
  timer.reset();
  if (opts.render !== false) render();
}

/* ---------- Grading ---------- */
let aiCtl = null;
async function grade(){
  const q = state.current; if (!q) return;
  if (mic.on) stopMic(false);
  // If the accurate transcript is on its way (model already loaded), wait for it so the
  // grade uses every word you said, not the rougher live text.
  if (mic.finishing && (ACC.ready || cloudSpeech())){
    // Wait a few seconds at most; past that, grade with the live text rather than keep you waiting.
    setMicNote("Finishing your transcript…");
    // With the browser's live words already in the box, don't hold you up for more than 3 s.
    const recSecs = accState.full.reduce((n, c) => n + c.length, 0) / 16000;
    await Promise.race([mic.finishing, new Promise(r => setTimeout(r, cloudSpeech() ? Math.min(15000, 5000 + recSecs * 40) : (mic.final || "").trim() ? 3000 : 6000))]); mic.finishing = null;
    if (state.current !== q) return;
  }
  const ta = $("ans"); const answer = (ta ? ta.value : state.answer).trim();
  state.answer = answer;
  // Corrections you typed into the transcript become your personal dictionary.
  if (state.polished && answer !== state.polished.trim()) learnFromEdit(state.polished, answer);
  state.polished = null;
  if (answer.split(/\s+/).length < 3){ setMicNote("Say or type an answer first, then tap Analyze."); ta && ta.focus(); return; }
  // Analyzing ends the answer: stop the clock (typing starts it, and only the mic used to stop it).
  timer.stop();
  // Pace (words per minute) only means something for a spoken answer, not typing time.
  const secs = state.spoken ? timer.el || null : null;
  const rep = Coach.analyze(q, answer, secs);
  state.report = rep; state.ai = null;
  record(q, rep.overall, rep);
  logAttempt(q, answer, secs, rep);
  testResult(q, rep.overall);
  if (state.view === "mock" && state.mock && state.mock.qs.length){
    rep.presence = presenceSummary(cam.take, answer, rep, q);
    state.mock.results[state.mock.i] = {q, score: rep.overall, verdict: rep.verdict, presence: rep.presence};
  }
  render();
  requestAnimationFrame(() => { const r = $("report"); r && r.scrollIntoView({behavior:"smooth", block:"start"}); });
  if (aiAvailable() && settings.aiMode === "auto") runAI();
}
async function runAI(){
  const q = state.current, rep = state.report; if (!q || !rep || state.aiBusy) return;
  state.aiBusy = true; state.aiErr = null; paintAI();
  aiCtl = new AbortController();
  try{
    const r = await callClaude(aiPrompt(q, state.answer, timer.el || null, rep), aiCtl.signal);
    if (state.current !== q) return;
    const s = Math.max(0, Math.min(10, Math.round(Number(r.score) || 0)));
    r.score = s;
    state.ai = r;
    const blended = Math.round(s*0.7 + rep.overall*0.3);
    rep.blended = blended;
    record(q, blended, rep, true);
    if (state.testout && state.testout.q === q){ state.testout.results[state.testout.i] = null; testResult(q, blended); }
    if (state.view === "mock" && state.mock && state.mock.qs.length) state.mock.results[state.mock.i] = {...(state.mock.results[state.mock.i] || {}), q, score: blended, verdict: r.verdict};
  }catch(e){
    state.aiErr = ({cancelled:"Stopped.", no_ai:"", bad_key:"Your API key was rejected. Check it in Settings.", rate_limited:"Usage limit hit. Try again in a minute.", refusal:"Claude declined to grade this one.", not_granted:"Claude isn't enabled for this page.", sampling_disabled:"Claude isn't available on this account."})[e && e.code] ?? ("Claude review failed" + (e && e.message ? ": " + e.message : ". Check your connection."));
    if (e && e.name === "AbortError") state.aiErr = "Stopped.";
  }finally{ state.aiBusy = false; }
  if (state.view === "drill" || state.view === "mock") render();
}
function record(q, score, rep, replaceLast){
  if (q.followup) return;
  const p = progress[q.id] || {scores:[], q:q.q, t:q.t};
  if (replaceLast && p.scores.length) p.scores[p.scores.length-1] = score; else p.scores.push(score);
  p.scores = p.scores.slice(-10); p.last = Date.now();
  if (p.flag && !replaceLast) delete p.flag;   // a fresh attempt replaces a manual mark
  progress[q.id] = p; store.set("progress", progress);
  const entry = {id:q.id, t:q.t, topic:q.topic||trackName(q.t), ts:Date.now(), score, sub:rep.scores, words:rep.stats.words, wpm:rep.stats.wpm, fillers:rep.stats.fillers, hedges:rep.stats.hedges};
  if (replaceLast && history.length && history.at(-1).id === q.id) history[history.length-1] = entry; else history.push(entry);
  history = history.slice(-500); store.set("history", history);
  renderNav();
}
function logAttempt(q, answer, secs, rep){
  if (q.followup) return;
  const heard = state.heard && state.heard.at > Date.now() - 15 * 60e3 ? state.heard : null;
  const entry = {id:q.id, ts:Date.now(), q:String(q.q || "").slice(0, 300), answer, secs,
    heard: heard ? {whisper:heard.whisper, live:heard.live, shown:heard.shown, engine:heard.engine || "", err:heard.err || "", secs:heard.secs} : null,
    score:rep.overall, sub:rep.scores, caps:(rep.caps || []).map(c => c.why),
    points:(rep.coverage || []).map(p => ({s:p.status, core:p.core !== false, t:p.text.slice(0, 90)})),
    errors:rep.corrections || [], fixes:(rep.fixes || []).map(f => f.title), fair:null, note:""};
  state.heard = null; state.logTs = entry.ts;
  log.push(entry); log = log.slice(-300); store.set("log", log);
}
// "Was this score fair?": your verdict on a grade, kept with the logged answer.
function rateGrade(fair, note){
  const e = log.find(x => x.ts === state.logTs); if (!e) return;
  if (fair !== undefined) e.fair = fair;
  if (note !== undefined) e.note = note;
  e.upd = Date.now(); store.set("log", log);
}
function setFlag(id, flag){
  const q = allQs().find(x => x.id === id);
  const p = progress[id] || {scores:[], q: q ? q.q : "", t: q ? q.t : ""};
  if (flag) p.flag = flag; else delete p.flag;
  p.last = Date.now();   // so the flag change wins when copies are merged
  progress[id] = p; store.set("progress", progress);
}

/* ---------- Views ---------- */
function render(){
  renderNav();
  if (typeof renderAccountRow === "function") renderAccountRow();
  const v = $("view"); v.replaceChildren();
  $("tbRight").replaceChildren();
  const views = {home:viewHome, course:viewCourse, drill:viewDrill, mock:viewDrill, mastery:viewMastery, bank:viewBank, progress:viewProgress};
  (views[state.view] || viewDrill)(v);
  $("tbTitle").textContent = state.view === "drill" ? trackName(state.track) : (NAV.find(n=>n.id===state.view)||{}).name || "";
  camTile();
}

/* ----- Drill / Mock ----- */
function viewDrill(v){
  const isMock = state.view === "mock";
  const m = state.mock;
  if (isMock && m && m.done) return viewMockDone(v);
  if (isMock && m && m.intro) return viewMockIntro(v);
  if (!isMock && state.testout && state.testout.done) return viewTestDone(v);
  if (!state.current && !isMock) pickNext({render:false, speak:false});
  const q = state.current;

  v.append(h("h1", {class:"largetitle", text: isMock ? "Mock interview" : trackName(state.track)}));
  if (!state.course) v.append(h("p", {class:"subtitle", text: isMock ? `Question ${m.i+1} of ${m.qs.length}. Answer each one like it's the real thing.` : subtitleFor(state.track)}));

  if (!isMock && state.testout && q){
    const t = state.testout, l = t.lessons[t.i], r = t.results[t.i];
    v.append(h("section", {class:"card", "aria-label":"Test out", style:{padding:"12px 16px"}},
      h("div", {class:"row", style:{justifyContent:"space-between", gap:"8px", flexWrap:"wrap"}},
        h("div", {style:{minWidth:0}},
          h("div", {style:{fontSize:"12px", fontWeight:700, textTransform:"uppercase", letterSpacing:".04em", color:"var(--purple, var(--blue))"}, text:`Test out · ${t.unit.name} · lesson ${t.i + 1} of ${t.lessons.length}`}),
          h("b", {text: l.name}),
          h("div", {style:{fontSize:"13px", color: r ? (r.pass ? "var(--green)" : "var(--red)") : "var(--label2)"}, text: r
            ? (r.pass ? `Passed with ${r.score}/10. All ${l.qs.length} questions in this lesson count as done.` : `${r.score}/10, under ${TEST_BAR}. Try again to pass, or go to the next lesson (this one stays in your course).`)
            : `Score ${TEST_BAR}+ on this one hard question and the lesson's ${l.qs.length} questions count as done.`})),
        h("div", {class:"row", style:{gap:"6px"}},
          h("button", {class:"btn tint", onclick:() => pickNext(), text: t.i < t.lessons.length - 1 ? "Next lesson" : "See results"}),
          h("button", {class:"btn plain", onclick:() => { t.done = true; if (mic.on) stopMic(false); render(); }, text:"End test"})))));
  }
  if (!isMock && state.course && q){
    // Course banner: where you are in the learning path.
    const c = courseData(), at = c.order[c.pos.get(q.id)];
    if (at){
      const ui = c.units.indexOf(at.unit), inLesson = at.lesson.qs.indexOf(q) + 1;
      const passedL = at.lesson.qs.filter(x => coursePassed(x.id)).length;
      v.append(h("nav", {class:"crumbs", "aria-label":"Course progress"},
        h("button", {onclick:() => go("course"), text:"Course"}), h("span", {class:"sep", text:"/"}),
        h("button", {onclick:() => { courseOpen = at.unit.id; go("course"); }, text:`${at.unit.name}`}), h("span", {class:"sep", text:"/"}),
        h("b", {text: at.lesson.name.replace(/^(Basics|Intermediate|Advanced) · /, "$1 · ")}),
        h("span", {class:"aside"}, h("span", {text:`${passedL} of ${at.lesson.qs.length} passed`}),
          h("button", {onclick:() => { exitCourse(); render(); }, text:"Exit course"}))),
        h("div", {class:"crumbline", role:"progressbar", "aria-valuenow": passedL, "aria-valuemax": at.lesson.qs.length}, h("i", {style:{width: (passedL / at.lesson.qs.length * 100) + "%"}})));
    }
  }
  if (!isMock && !state.course && !state.testout){
    const strip = h("div", {class:"topics-strip", role:"group", "aria-label":"Topic"});
    TRACKS.forEach(t => { const n = filtered().filter(q=>q.t===t.id).length; if (n) strip.append(h("button", {"aria-pressed":String(t.id===state.track), onclick:() => { setTrack(t.id); render(); }, text:t.name})); });
    if (HAS_PRACTICE || HAS_GUIDES) strip.append(collectionPicker());
    v.append(strip);
    const ord = h("select", {class:"selectbtn", "aria-label":"Question order", onchange:e => { settings.order = e.target.value; saveSettings(); }},
      ...[["smart","Smart order"],["weak","Needs work first"],["new","New questions first"],["random","Random"]].map(([k,n]) => h("option", {value:k, selected: settings.order===k, text:n})));
    strip.append(ord);   // with the topics, not in the top bar (it crowded the links on laptops)
  }
  if (!q){ v.append(h("div", {class:"card empty", text:"No questions match. Change the filters in Question bank."})); return; }

  /* question card: question first, tags under it, then arrows, Hint and "Show answer" in one row, a footer */
  const card = h("section", {class:"card qcard", "aria-labelledby":"qText"});
  if (isMock){ const bar = h("div", {class:"mockbar"}); m.qs.forEach((_,i) => bar.append(h("i", {class: i < m.i ? "done" : i === m.i ? "cur" : ""}))); card.append(bar); }
  const lv = levelOf(q.id), p = progress[q.id];
  const firm = firmTag(q);
  const meta = h("div", {class:"qmeta"},
    h("span", {class:"tag", text: q.t === "beh" ? "Behavioral" : "Technical"}),
    firm ? h("span", {class:"tag firm", text: `Reported in ${firm} Interview`}) : null,
    h("span", {class:"tag", text: q.topic || trackName(q.t)}),
    q.l ? h("span", {class:"tag", text:q.l}) : null,
    p && (p.scores.length || p.flag || p.out) ? h("span", {class:"tag", style:{color:`var(--${LV[lv].color})`}, text: p.scores.length ? `${LV[lv].name} · best ${Math.max(...p.scores)}/10` : LV[lv].name}) : null);
  // The question is asked in its original wording or an alternate one (so the wording can't be
  // memorized); the same wording holds through "Try again". Grading always uses the original.
  if (state.qTextFor !== q.id){ state.qText = pickWording(q); state.qTextFor = q.id; }
  card.append(h("h2", {class:"qtext", id:"qText", text: state.qText}), meta);
  const hintBox = h("div", {class:"hint", hidden:true});

  const back = (state.back || []).length && !isMock && !state.testout;
  card.append(h("div", {class:"qnav"},
    isMock ? null : h("button", {class:"sqbtn", "aria-label":"Previous question", disabled: !back, onclick:() => { const id = state.back.pop(); const pq = allQs().find(x => x.id === id); if (pq){ state.track = pq.t; showQuestion(pq, {back:true}); window.scrollTo({top:0}); } }, html: ic("arrowL")}),
    h("button", {class:"sqbtn", "aria-label": isMock ? "Skip" : "Next question", onclick:() => { isMock ? mockAdvance() : pickNext(); window.scrollTo({top:0}); }, html: ic("arrowR")}),
    h("button", {class:"btn", disabled: !(q.k && q.k.length), onclick:() => { hintBox.hidden = !hintBox.hidden; }, html: ic("bulb") + "Hint"}),
    isMock ? null : h("button", {class:"btn showans", onclick:() => revealAnswer(q), text: state.revealed === q.id ? "Answer shown below" : "Show answer"})));
  const pts = Coach.keyPoints(q);
  hintBox.append(h("span", {html:ic("bulb")}), h("div", null, h("b", {text:"Structure to hit: "}), pts.map(p => p.label).join("  →  ")));
  card.append(hintBox);
  // Where you are: lesson position in the course, the mock's question number, or the topic's.
  let pos = "";
  if (isMock) pos = `Question ${m.i + 1} of ${m.qs.length}`;
  else if (state.testout) pos = `Lesson ${state.testout.i + 1} of ${state.testout.lessons.length}`;
  else if (state.course){ const c = courseData(), at = c.order[c.pos.get(q.id)]; if (at) pos = `Question ${at.lesson.qs.indexOf(q) + 1} of ${at.lesson.qs.length}`; }
  else { const pool = filtered().filter(x => x.t === q.t), i = pool.indexOf(q); if (i >= 0) pos = `Question ${(i + 1).toLocaleString()} of ${pool.length.toLocaleString()}`; }
  const keys = h("div", {hidden:true, style:{fontSize:"12px", color:"var(--label2)", marginTop:"10px", display:"flex", gap:"14px", flexWrap:"wrap"}},
    h("span", null, h("span", {class:"kbd", text:"N"}), " next question"),
    h("span", null, h("span", {class:"kbd", text:"Ctrl"}), " + ", h("span", {class:"kbd", text:"Enter"}), " analyze answer"));
  card.append(h("div", {class:"qfoot"}, h("button", {class:"lnk", onclick:() => { keys.hidden = !keys.hidden; }, text:"View shortcuts"}), h("span", {text: pos})), keys);
  v.append(card);

  /* answer composer: the text box, with one bar under it for the mic, the count and Analyze */
  const rc = h("section", {class:"card composer", "aria-label":"Your answer"});
  const wave = h("div", {class:"wave", id:"wave"}); for (let i=0;i<14;i++) wave.append(h("i"));
  const ta = h("textarea", {class:"ans", id:"ans", placeholder:"Answer out loud with the button below, or type here. You can edit what it hears.", "aria-label":"Your answer"});
  ta.value = state.answer;
  ta.addEventListener("input", () => { state.answer = ta.value; updateWC(); if (!timer.id && !mic.on && ta.value.length === 1) timer.start(); });
  ta.addEventListener("keydown", e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter"){ e.preventDefault(); grade(); } });
  const tgt = q.s <= 45 ? "30–45 sec" : q.s <= 60 ? "45–60 sec" : q.s <= 90 ? "60–90 sec" : "90 sec–2 min";
  rc.append(ta,
    h("div", {class:"cbar"},
      h("button", {class:"recpill", id:"recBtn", "aria-label":"Start recording", onclick:() => mic.on ? stopMic() : startMic()},
        h("span", {class:"micdot"}), h("span", {id:"recLabel", text:"Answer out loud"}), h("span", {class:"clock", id:"clock", text:"0:00"})),
      wave,
      h("span", {class:"meta"}, h("span", {id:"wc", text:"0 words"}), h("span", {class:"dot tgt", text:"·"}), h("span", {class:"tgt", text:"Target " + tgt})),
      h("span", {class:"sp"}),
      h("button", {class:"btn plain", onclick:() => { state.answer = ""; ta.value = ""; updateWC(); timer.reset(); state.spoken = false; state.report = null; state.ai = null; render(); }, text:"Clear"}),
      h("button", {class:"btn fill", onclick: grade, title:"Ctrl/⌘ + Enter", html: ic("wand") + "Analyze"})),
    h("div", {class:"note", id:"micNote", hidden:true}));
  v.append(rc);
  if (!SR) setTimeout(() => setMicNote("This browser can't transcribe from the page. " + DICTATE));
  updateWC(); timer.paint();

  if (state.report) v.append(viewReport(q, state.report));
  else if (state.revealed === q.id) v.append(viewReveal(q));
}
function subtitleFor(t){
  return {acct:"The three statements, how they link, and what changes when one line moves.", beh:"Your story, why banking, and STAR answers that prove it.", val:"DCF, multiples, EV vs. equity value, WACC.", deal:"Merger models, accretion/dilution, LBOs.", mkt:"Markets, rates, pitches and mental math.", sector:"Industry groups and product knowledge.", mine:"Questions from your own material."}[t] || "";
}

/* ----- Report ----- */
// The score dial: one arc for the overall score (the breakdown is listed beside it; status colours live in the chips).
function ringSVG(vals){
  const v = vals[0] || 0, r = 58, c = 2 * Math.PI * r, off = c * (1 - Math.max(0.02, v / 10));
  const col = "var(--label)";
  return `<svg viewBox="0 0 132 132" aria-hidden="true"><circle cx="66" cy="66" r="${r}" stroke="var(--fill2)" stroke-width="8"/>` +
    `<circle cx="66" cy="66" r="${r}" stroke="${col}" stroke-width="8" stroke-dasharray="${c}" stroke-dashoffset="${c}" style="transition:stroke-dashoffset .8s ease" data-off="${off}"/></svg>`;
}
function band(s){ return s >= 8 ? "g" : s >= 6 ? "w" : "b"; }
function fairRow(rep){
  const e = log.find(x => x.ts === state.logTs);
  if (!e) return null;
  const row = h("div", {class:"row", style:{gap:"6px", marginTop:"10px", flexWrap:"wrap", alignItems:"center"}});
  const paint = () => {
    row.replaceChildren(h("span", {style:{fontSize:"13px", color:"var(--label2)"}, text:"Was this score fair?"}),
      ...[["low","Too low"],["ok","About right"],["high","Too high"]].map(([k, label]) => h("button", {class:"btn plain" + (e.fair === k ? " on" : ""),
        style:{padding:"3px 10px", fontSize:"13px", fontWeight: e.fair === k ? 700 : 400, color: e.fair === k ? "var(--blue)" : ""},
        onclick:() => { rateGrade(e.fair === k ? null : k); paint(); }, text:label})),
      e.fair && e.fair !== "ok" ? h("input", {type:"text", placeholder:"What should it have said? (optional)", value:e.note || "",
        style:{flex:"1 1 220px", minWidth:"180px", fontSize:"13px", padding:"5px 9px", border:"1px solid var(--sep, rgba(127,127,127,.35))", borderRadius:"8px", background:"transparent", color:"inherit", outline:"none"}, oninput:debounce(ev => rateGrade(undefined, ev.target.value), 600)}) : "");   // replaceChildren would print null
  };
  paint();
  return row;
}
// "I don't know": show the answer straight away, and bring the question back soon.
function revealAnswer(q){
  if (mic.on) stopMic(false);
  state.revealed = q.id;
  if (!(progress[q.id] || {}).flag) setFlag(q.id, "work");
  testResult(q, 0);
  render();
  requestAnimationFrame(() => { const r = $("reveal"); r && r.scrollIntoView({behavior:"smooth", block:"start"}); });
}
function viewReveal(q){
  const wrap = h("div", {id:"reveal", class:"fade-in"});
  const model = SAY[q.id] || Coach.analyze(q, "", 0).model || "";
  if (model){
    wrap.append(h("h3", {class:"sechead"}, "The answer", h("small", {text: SAY[q.id] ? "What to say, word for word" : "What a strong answer covers"})));
    wrap.append(h("section", {class:"card"}, h("div", {class:"quote", style:{whiteSpace:"pre-line"}, text:model}),
      h("div", {class:"row", style:{marginTop:"10px"}},
        h("button", {class:"btn tint", onclick:e => copyText(model, e.currentTarget), html: ic("copy") + "Copy"}),
        h("button", {class:"btn fill", onclick:() => { state.revealed = null; render(); requestAnimationFrame(() => { const b = $("recBtn"); b && b.scrollIntoView({behavior:"smooth", block:"center"}); }); }, text:"Now say it in your own words"}))));
  }
  if (q.answer && q.answer.length){
    wrap.append(h("h3", {class:"sechead"}, "Guide answer", h("small", {text: q.ref ? `${GUIDE_TITLES[q.ref.guide] || "Guide"}, page ${q.ref.page}` : ""})));
    wrap.append(h("section", {class:"card"}, ...q.answer.map(p => h("p", {class:"quote", style:{margin:"0 0 10px"}, text:p})),
      ...(q.figures || []).map(f => figureEl(f))));
  }
  if (q.study){
    const more = h("div", {hidden:true}, h("p", {class:"quote", style:{whiteSpace:"pre-wrap", margin:"10px 0 0"}, text:q.study.excerpt + (q.study.excerpt.length >= 700 ? "…" : "")}));
    wrap.append(h("h3", {class:"sechead"}, "Study it", h("small", {text:"Where the guide teaches this"})));
    wrap.append(h("section", {class:"card"},
      h("div", null, h("b", {text:`${GUIDE_TITLES[q.study.guide] || "Guide"}, page ${q.study.page}`}), q.study.title ? h("span", {class:"t-gray", text:" · " + q.study.title}) : null),
      h("div", {class:"row", style:{marginTop:"8px"}}, h("button", {class:"btn tint", onclick:e => { more.hidden = !more.hidden; e.currentTarget.textContent = more.hidden ? "Show the page" : "Hide the page"; }, text:"Show the page"})),
      more));
  }
  wrap.append(h("p", {class:"t-gray", style:{fontSize:"13px", margin:"6px 2px 18px"}, text:"Marked “Really needs work”, so this question comes back soon. Answer it later to clear that."}));
  return wrap;
}
function viewReport(q, rep){
  const ai = state.ai;
  const wrap = h("div", {id:"report", class:"fade-in"});
  const score = rep.blended ?? rep.overall;
  const sc = rep.scores;
  const structureRing = Math.round((sc.structure + sc.concision)/2);
  const contentRing = sc.accuracy == null ? sc.content : Math.round(sc.content*0.7 + sc.accuracy*0.3);

  /* summary */
  const rings = h("div", {class:"rings", html: ringSVG([score, structureRing, sc.delivery])},
    h("div", {class:"big"}, h("div", null, h("b", {text:String(score)}), h("small", {text:"OUT OF 10"}))));
  setTimeout(() => rings.querySelectorAll("circle[data-off]").forEach(c => c.style.strokeDashoffset = c.dataset.off), 30);
  const lv = levelOf(q.id);
  const sum = h("section", {class:"card"},
    h("div", {class:"summary"}, rings,
      h("div", {style:{minWidth:0}},
        h("div", {class:"row", style:{gap:"6px"}},
          h("span", {class:`score-chip sc-${band(score)}`, text: score >= 8 ? "Interview-ready" : score >= 6 ? "Close" : "Needs work"}),
          h("span", {class:"tag", style:{color:`var(--${LV[lv].color})`}, text: LV[lv].name}),
          ai ? h("span", {class:"ai-badge", html: ic("sparkles") + "Claude reviewed"}) : null),
        h("p", {class:"verdict", text: ai ? ai.verdict : rep.verdict}),
        h("div", {class:"legend"},
          h("span", null, h("i", {style:{background:"var(--ring1)"}}), "Content ", h("b", {text: contentRing + "/10"})),
          h("span", null, h("i", {style:{background:"var(--ring2)"}}), "Structure ", h("b", {text: structureRing + "/10"})),
          h("span", null, h("i", {style:{background:"var(--ring3)"}}), "Delivery ", h("b", {text: sc.delivery + "/10"})),
          sc.accuracy != null ? h("span", {class:"t-gray"}, "Accuracy ", h("b", {text: sc.accuracy + "/10"})) : null))),
    metricsRow(rep), fairRow(rep));
  wrap.append(sum);
  if (state.view === "mock" && rep.presence) wrap.append(presenceCard(rep.presence));
  wrap.append(accountNudge() || "");

  /* next try: the three changes that would move the score most */
  if (rep.plan && rep.plan.length && score < 9){
    wrap.append(h("section", {class:"card", "aria-label":"Your next try"},
      h("b", {text:"Your next try"}),
      h("ol", {style:{margin:"8px 0 0", paddingLeft:"20px", lineHeight:"1.6"}}, rep.plan.map(p => h("li", {text:p.title})))));
  }

  /* answer check: every key point, what you said for it, and what to add or correct */
  wrap.append(answerCheck(rep, ai));

  /* AI layer */
  const aiBox = h("div", {id:"aiBox"}); wrap.append(aiBox); paintAI(aiBox);

  /* top fixes (missed and partial points are already in the answer check) */
  const fixes = rep.fixes.filter(f => f.tag !== "Accuracy" && !/^Add (?:this point|these)|^Go one level deeper/.test(f.title));
  if (fixes.length){
    wrap.append(h("h3", {class:"sechead"}, "How to improve ", h("small", {text: fixes.length + " fixes, most important first"})));
    const sevCol = s => s >= 4 ? "c-red" : s === 3 ? "c-orange" : s === 2 ? "c-yellow" : "c-gray";
    const tagIcon = {Content:"list", Structure:"text", Story:"person", Concision:"scissors", Delivery:"bubble", Wording:"quote"};
    wrap.append(h("div", {class:"list"}, fixes.slice(0, 8).map(f => h("div", {class:"li"},
      h("span", {class:"lic " + sevCol(f.sev), html: ic(tagIcon[f.tag] || "warn")}),
      h("div", {class:"lit"}, h("b", {text:f.title}), h("span", {style:{whiteSpace:"pre-line"}, text:f.body})),
      h("span", {class:"trail", text:f.tag})))));
  }


  /* STAR */
  if (rep.star){
    const s = rep.star;
    const parts = [["S","Situation",s.situation],["T","Task",s.task],["A","Action",s.action>=2],["R","Result",s.result],["L","Lesson",s.lesson]];
    wrap.append(h("h3", {class:"sechead"}, "Story structure"));
    wrap.append(h("section", {class:"card"}, h("div", {class:"star"}, parts.map(([k,n,on]) => h("div", {class: on ? "on" : ""}, h("b", {text:k}), n)))));
  }

  /* transcript */
  wrap.append(h("h3", {class:"sechead"}, "Your transcript"));
  const tr = h("div", {class:"transcript"});
  // Sentences that earned a key point are underlined green, ones with a factual error red;
  // filler, hedges and weak words are highlighted inside them.
  const ans = state.answer, sentMarks = [];
  const findSent = s => { const words = String(s).replace(/…$/, "").trim().split(/\s+/).filter(Boolean); if (!words.length) return null;
    const m = new RegExp(words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("\\s+")).exec(ans); return m ? [m.index, m.index + m[0].length] : null; };
  (rep.coverage || []).forEach(p => { if (p.quoteFull && p.status !== "miss"){ const r = findSent(p.quoteFull); if (r) sentMarks.push({i:r[0], j:r[1], kind:"good"}); } });
  Object.values(rep.said || {}).forEach(s => { const r = s && findSent(s); if (r) sentMarks.push({i:r[0], j:r[1], kind:"bad"}); });
  const sentAt = i => { let k = null; for (const m of sentMarks) if (i >= m.i && i < m.j){ if (m.kind === "bad") return "bad"; k = "good"; } return k; };
  const SENT_STYLE = {good:{textDecoration:"underline", textDecorationColor:"var(--green)", textDecorationThickness:"2px", textUnderlineOffset:"3px"},
                      bad:{textDecoration:"underline wavy", textDecorationColor:"var(--red)", textDecorationThickness:"1.5px", textUnderlineOffset:"3px"}};
  const marks = Coach.highlights(ans, rep);
  const cuts = new Set([0, ans.length]);
  marks.forEach(m => { cuts.add(m.i); cuts.add(m.j); }); sentMarks.forEach(m => { cuts.add(m.i); cuts.add(m.j); });
  const pts = [...cuts].sort((a, b) => a - b);
  for (let x = 0; x < pts.length - 1; x++){
    const a = pts[x], b = pts[x + 1]; if (a >= b) continue;
    const piece = ans.slice(a, b), mk = marks.find(m => a >= m.i && a < m.j), sk = sentAt(a);
    let node = mk ? h("mark", {class:mk.kind, title:mk.tip, tabindex:"0"}, piece) : document.createTextNode(piece);
    if (sk) node = h("span", {style:SENT_STYLE[sk], title: sk === "good" ? "Earned a key point" : "Factual error"}, node);
    tr.append(node);
  }
  wrap.append(h("section", {class:"card"}, tr, h("div", {class:"keys"},
    h("span", null, h("i", {style:{background:"transparent", borderBottom:"2px solid var(--green)", borderRadius:0}}), "Earned a key point"),
    rep.said && Object.keys(rep.said).length ? h("span", null, h("i", {style:{background:"transparent", borderBottom:"2px dotted var(--red)", borderRadius:0}}), "Factual error") : null,
    h("span", null, h("i", {style:{background:"color-mix(in srgb,var(--orange) 30%,transparent)"}}), `Filler (${rep.stats.fillers})`),
    h("span", null, h("i", {style:{background:"color-mix(in srgb,var(--purple) 30%,transparent)"}}), `Hedge (${rep.stats.hedges})`),
    h("span", null, h("i", {style:{background:"color-mix(in srgb,var(--blue) 25%,transparent)"}}), "Word choice"),
    h("span", null, h("i", {style:{background:"color-mix(in srgb,var(--gray) 30%,transparent)"}}), "Tangent"),
    SR ? h("span", {text:"Chrome's transcription may drop “um” and “uh”."}) : null)));

  /* wording */
  const words = ai && ai.wording && ai.wording.length ? ai.wording.map(w => ({said:w.said, to:w.better, why:w.why})) : rep.wording.map(w => ({said:w.said + (w.n > 1 ? `  ×${w.n}` : ""), to:w.to, why:w.why}));
  if (words.length){
    wrap.append(h("h3", {class:"sechead"}, "Wording"));
    wrap.append(h("div", {class:"list noicon"}, words.map(w => h("div", {class:"li"}, h("div", {class:"lit"},
      h("div", {class:"wordrow"}, h("span", {class:"said", text:w.said}), h("span", {class:"t-gray", text:"→"}), h("span", {class:"try", text:w.to})),
      h("div", {class:"why", text:w.why}))))));
  }

  /* rewrites */
  const improved = ai ? ai.improved_version : rep.tightened;
  wrap.append(h("h3", {class:"sechead"}, ai ? "Your answer at a 9/10" : "Your answer, tightened", h("small", {text: ai ? "Your facts, rewritten" : "Fillers and hedges removed"})));
  wrap.append(h("section", {class:"card"}, h("div", {class:"quote", text: improved}), h("div", {class:"row", style:{marginTop:"10px"}},
    h("button", {class:"btn tint", onclick:e => copyText(improved, e.currentTarget), html: ic("copy") + "Copy"}))));
  // The model answer is the full spoken answer to say; the guide's text (GUIDES) follows it for study.
  const written = !ai && SAY[q.id];
  const model = ai ? ai.model_answer : (written || (q.answer && q.answer.length ? "" : rep.model));
  if (model){
    wrap.append(h("h3", {class:"sechead"}, ai || written ? "Model answer" : rep.beh ? "What a strong answer includes" : "Model answer", written ? h("small", {text:"What to say, word for word"}) : null));
    wrap.append(h("section", {class:"card"}, h("div", {class:"quote", style:{whiteSpace:"pre-line"}, text:model}),
      h("div", {class:"row", style:{marginTop:"10px"}}, h("button", {class:"btn tint", onclick:e => copyText(model, e.currentTarget), html: ic("copy") + "Copy"}))));
  }
  if (q.answer && q.answer.length){
    wrap.append(h("h3", {class:"sechead"}, "Guide answer", h("small", {text: q.ref ? `${GUIDE_TITLES[q.ref.guide] || "Guide"}, page ${q.ref.page}` : ""})));
    wrap.append(h("section", {class:"card"}, ...q.answer.map(p => h("p", {class:"quote", style:{margin:"0 0 10px"}, text:p})),
      ...(q.figures || []).map(f => figureEl(f))));
  }
  if (q.study){
    const more = h("div", {hidden:true}, h("p", {class:"quote", style:{whiteSpace:"pre-wrap", margin:"10px 0 0"}, text:q.study.excerpt + (q.study.excerpt.length >= 700 ? "…" : "")}));
    wrap.append(h("h3", {class:"sechead"}, "Study it", h("small", {text:"Where the guide teaches this"})));
    wrap.append(h("section", {class:"card"},
      h("div", null, h("b", {text:`${GUIDE_TITLES[q.study.guide] || "Guide"}, page ${q.study.page}`}), q.study.title ? h("span", {class:"t-gray", text:" · " + q.study.title}) : null),
      h("div", {class:"row", style:{marginTop:"8px"}}, h("button", {class:"btn tint", onclick:e => { more.hidden = !more.hidden; e.currentTarget.textContent = more.hidden ? "Show the page" : "Hide the page"; }, text:"Show the page"})),
      more));
  }

  /* mastery override + actions */
  const seg = h("div", {class:"seg", role:"group", "aria-label":"Mark this question"});
  [["mastered","Mastered"],["work","Needs work"],["redo","Really needs work"]].forEach(([k,n]) => seg.append(h("button", {"aria-pressed": String((progress[q.id]||{}).flag === k), onclick:() => { setFlag(q.id, (progress[q.id]||{}).flag === k ? null : k); render(); }, text:n})));
  wrap.append(h("h3", {class:"sechead"}, "Mark this question ", h("small", {text:"Overrides the automatic level"})));
  wrap.append(h("div", {style:{marginBottom:"18px", overflowX:"auto"}}, seg));
  const act = h("div", {class:"row"});
  act.append(h("button", {class:"btn lg tint", onclick:() => { state.answer = ""; state.report = null; state.ai = null; state.spoken = false; timer.reset(); render(); window.scrollTo({top:0, behavior:"smooth"}); }, html: ic("retry") + "Try again"}));
  if (ai && ai.follow_up && state.view === "drill"){
    const parent = q;
    act.append(h("button", {class:"btn lg tint", onclick:() => { showQuestion({id:"fu-"+Date.now(), t:parent.t, l:"Follow-up", topic:parent.topic, s:60, q:ai.follow_up, k:ai.follow_up_keys||[], followup:true}); window.scrollTo({top:0, behavior:"smooth"}); }, html: ic("bubble") + "Answer the follow-up"}));
  }
  act.append(h("button", {class:"btn lg fill", onclick:() => { state.view === "mock" ? mockAdvance() : pickNext(); window.scrollTo({top:0, behavior:"smooth"}); }, html: ic("forward") + (state.view === "mock" ? (state.mock.i >= state.mock.qs.length-1 ? "Finish interview" : "Next question") : "Next question")}));
  wrap.append(act);
  return wrap;
}
const TERM = {da:"D&A", ppe:"PP&E", ar:"accounts receivable", ap:"accounts payable", accrued:"accrued expenses", deferredrevenue:"deferred revenue", dtl:"deferred tax liability", dta:"deferred tax asset", nol:"NOLs", netincome:"net income", incomestatement:"income statement", balancesheet:"balance sheet", cfs:"cash flow statement", cfo:"cash flow from operations", cfi:"cash flow from investing", cff:"cash flow from financing", shequity:"shareholders' equity", retainedearnings:"retained earnings", apic:"APIC", treasury:"treasury stock", sbc:"stock-based comp", capex:"CapEx", nwc:"working capital", cogs:"COGS", sga:"SG&A", ebitda:"EBITDA", ebit:"EBIT / operating income", ev:"enterprise value", equityvalue:"equity value", wacc:"WACC", costequity:"cost of equity", costdebt:"cost of debt", capm:"CAPM", erp:"equity risk premium", riskfree:"risk-free rate", fcf:"free cash flow", terminalvalue:"terminal value", gordon:"perpetuity growth", exitmultiple:"exit multiple", dcf:"DCF", lbo:"LBO", irr:"IRR", moic:"MoIC", mna:"M&A", pe:"P/E", eps:"EPS", nopat:"NOPAT", comps:"comparable companies", precedents:"precedent transactions", sourcesuses:"sources & uses", nci:"noncontrolling interest", preferred:"preferred stock", goodwill:"goodwill", intangibles:"intangibles", interestexpense:"interest expense", dividend:"dividends", revolver:"revolver", synergy:"synergies", accretive:"accretion", dilutive:"dilution", pretax:"pre-tax income"};
// One place to see how the answer did, point by point: wrong statements first, then every key
// point in order with the sentence that earned it (or what to add), then the delivery strengths.
function answerCheck(rep, ai){
  const box = h("div", {"aria-label":"Answer check"});
  const pts = rep.coverage || [];
  const wrong = ai && ai.corrections && ai.corrections.length
    ? ai.corrections.map(c => ({fix:c, said:null}))
    : rep.corrections.map(c => ({fix:c, said: rep.said && rep.said[c]}));
  const opt = p => p.status === "miss" && p.core === false;   // detail beyond what was asked
  const n = k => pts.filter(p => p.status === k && !opt(p)).length;
  const nOpt = pts.filter(opt).length;
  const STATUS = {
    wrong:   {icon:"xmark", col:"red",    label:"Wrong"},
    hit:     {icon:"check", col:"green",  label:"Covered"},
    partial: {icon:"half",  col:"orange", label:"Partly"},
    miss:    {icon:"xmark", col:"red",    label:"Missed"},
  };
  const chip = (k, count) => count ? h("span", {class:"tag", style:{color:`var(--${STATUS[k].col})`, fontWeight:600}, html: ic(STATUS[k].icon) + `${count} ${STATUS[k].label.toLowerCase()}`}) : null;
  box.append(h("h3", {class:"sechead"}, "Answer check ",
    h("small", {text: pts.length ? `${n("hit")} of ${pts.length - nOpt} key points covered` : ""})));
  box.append(h("div", {class:"row", style:{gap:"6px", margin:"-4px 0 10px", flexWrap:"wrap"}},
    chip("hit", n("hit")), chip("partial", n("partial")), chip("miss", n("miss")), chip("wrong", wrong.length)));

  const said = text => h("div", {style:{margin:"6px 0 0", padding:"6px 10px", borderLeft:"3px solid var(--sep, rgba(127,127,127,.35))", fontSize:"14px", color:"var(--label2)"}},
    h("span", {style:{fontSize:"12px", textTransform:"uppercase", letterSpacing:".04em", display:"block", marginBottom:"2px"}, text:"You said"}), `“${text}”`);
  const todo = (label, text, col) => h("div", {style:{margin:"6px 0 0", fontSize:"14px"}},
    h("span", {style:{color:`var(--${col})`, fontWeight:700, display:"inline"}, text: label + " "}), text);
  const row = (k, title, ...body) => h("div", {class:"li", style:{alignItems:"flex-start"}},
    h("span", {class:"status t-" + STATUS[k].col, title: STATUS[k].label, style:{marginTop:"2px"}, html: ic(STATUS[k].icon, "status")}),
    h("div", {class:"lit"},
      h("div", {style:{fontSize:"12px", fontWeight:700, textTransform:"uppercase", letterSpacing:".04em", color:`var(--${STATUS[k].col})`}, text: STATUS[k].label}),
      h("b", {text:title}), ...body));

  const list = h("div", {class:"list noicon pts"});
  wrong.forEach(w => list.append(row("wrong", w.said ? `“${w.said}”` : "Something in your answer was wrong", todo("Correct:", w.fix, "green"))));
  pts.forEach(p => {
    const text = p.text.replace(/\s+/g, " ");
    if (p.status === "hit") list.append(row("hit", text, p.quote ? said(p.quote) : null));
    else if (p.status === "partial") list.append(row("partial", text, p.quote ? said(p.quote) : null,
      todo("Add:", (p.missWords && p.missWords.length ? p.missWords.slice(0, 6).join(", ") : "the specifics in this point") + ".", "orange")));
    else if (!opt(p)) list.append(row("miss", text, todo("Add:", "this point wasn't in your answer. Say it next time.", "red")));
  });
  const extras = pts.filter(opt);
  if (extras.length) list.append(h("details", {class:"li", style:{display:"block"}},
    h("summary", {style:{cursor:"pointer", fontSize:"14px", color:"var(--label2)"}, text:`Could also mention (${extras.length}): extra detail, not needed for full marks`}),
    ...extras.map(p => h("div", {style:{margin:"6px 0 0 4px", fontSize:"14px", color:"var(--label2)"}, text: "• " + p.text.replace(/\s+/g, " ")}))));
  if (!list.childElementCount) list.append(h("div", {class:"li"}, h("div", {class:"lit", text:"No answer key for this question. See the model answer below."})));
  box.append(list);

  const good = ai && ai.got_right && ai.got_right.length ? ai.got_right : rep.strengths.filter(s => !/key points\.$/.test(s));
  if (good.length) box.append(h("div", {class:"row", style:{gap:"6px", margin:"10px 0 4px", flexWrap:"wrap"}},
    h("span", {style:{fontSize:"13px", color:"var(--label2)", marginRight:"2px"}, text:"Also did well:"}),
    ...good.map(s => h("span", {class:"tag", style:{color:"var(--green)"}, html: ic("thumbs") + s.replace(/\.$/, "")}))));
  return box;
}

// A table or screenshot from the guide, transcribed as text with markdown tables.
function figureEl(f){
  const box = h("div", {style:{margin:"6px 0 12px", padding:"10px 12px", borderRadius:"10px", background:"var(--fill, rgba(127,127,127,.12))", overflowX:"auto"}},
    h("div", {style:{fontSize:"12px", color:"var(--label2)", marginBottom:"6px"}, text:`Table from the guide, page ${f.page}`}));
  const lines = String(f.text).split("\n");
  for (let i = 0; i < lines.length; i++){
    if (/^\s*\|/.test(lines[i])){
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])){ if (!/^\s*\|[\s:|-]+\|\s*$/.test(lines[i])) rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim().replace(/\*\*/g, ""))); i++; }
      i--;
      box.append(h("table", {style:{borderCollapse:"collapse", fontSize:"13px", width:"100%"}}, ...rows.map((r, ri) => h("tr", null,
        ...r.map(c => h(ri === 0 ? "th" : "td", {style:{border:"1px solid var(--sep, rgba(127,127,127,.3))", padding:"3px 6px", textAlign:"left", whiteSpace:"nowrap"}, text:c}))))));
    } else if (lines[i].trim()) box.append(h("p", {style:{margin:"4px 0", fontSize:"13px"}, text: lines[i].replace(/\*\*/g, "").replace(/^#+\s*/, "")}));
  }
  return box;
}
function missingText(p){
  if (p.missWords && p.missWords.length) return "Missing: " + p.missWords.slice(0,5).join(", ");
  const terms = p.miss.filter(t => TERM[t] || /^\d/.test(t)).map(t => TERM[t] || t);
  return terms.length ? "Missing: " + [...new Set(terms)].slice(0,5).join(", ") : "Add the specifics from this point.";
}
function metricsRow(rep){
  const s = rep.stats;
  const lo = Math.round(s.targetWords*0.45), hi = Math.round(s.targetWords*1.1), max = Math.max(hi*1.6, s.words*1.05);
  const lenTile = h("div", {class:"metric"},
    h("div", {class:"k t-teal", html: ic("text") + "Length"}),
    h("div", {class:"v"}, String(s.words), h("small", {text:"words"})),
    h("div", {class:"lengthbar"}, h("div", {class:"ok", style:{left:(lo/max*100)+"%", width:((hi-lo)/max*100)+"%"}}), h("div", {class:"dot", style:{left: Math.min(100, s.words/max*100)+"%"}})),
    h("div", {class:"s", text:`Aim ${lo}–${hi}`}));
  return h("div", {class:"metrics"},
    lenTile,
    h("div", {class:"metric"}, h("div", {class:"k t-orange", html: ic("bubble") + "Fillers"}), h("div", {class:"v"}, String(s.fillers)), h("div", {class:"s", text: s.fillerRate + " per 100 words"})),
    h("div", {class:"metric"}, h("div", {class:"k t-purple", html: ic("gauge") + "Hedges"}), h("div", {class:"v"}, String(s.hedges)), h("div", {class:"s", text: s.hedges ? "State facts directly" : "Confident"})),
    h("div", {class:"metric"}, h("div", {class:"k t-blue", html: ic("stopwatch") + "Pace"}), h("div", {class:"v"}, s.wpm ? String(s.wpm) : "–", h("small", {text: s.wpm ? "wpm" : ""})), h("div", {class:"s", text: s.wpm ? (s.wpm > 185 ? "Too fast" : s.wpm < 105 ? "Too slow" : "Aim 130–165") : "Use the mic to time it"})));
}
function paintAI(box){
  box = box || $("aiBox"); if (!box) return;
  box.replaceChildren();
  if (state.aiBusy){
    box.append(h("section", {class:"card"}, h("div", {class:"thinking"}, h("span", {class:"spinner"}), h("span", {text:"Claude is reviewing your answer like an interviewer…"}), h("button", {class:"btn plain", style:{marginLeft:"auto"}, onclick:() => aiCtl && aiCtl.abort(), text:"Stop"}))));
    return;
  }
  const ai = state.ai;
  if (ai){
    const extra = [];
    if (ai.missed && ai.missed.length) extra.push(["xmark","c-red","What you missed", ai.missed.join(" · ")]);
    if (ai.rambling) extra.push(["scissors","c-teal","What to cut", ai.rambling]);
    if (ai.structure) extra.push(["text","c-green","Structure", ai.structure]);
    if (extra.length){
      box.append(h("h3", {class:"sechead"}, "Interviewer notes ", h("span", {class:"ai-badge", html: ic("sparkles") + "Claude · " + ai.score + "/10"})));
      box.append(h("div", {class:"list"}, extra.map(([i,c,t,b]) => h("div", {class:"li"}, h("span", {class:"lic "+c, html:ic(i)}), h("div", {class:"lit"}, h("b", {text:t}), h("span", {text:b}))))));
    }
    return;
  }
  if (state.aiErr) box.append(h("p", {class:"err", text: state.aiErr}));
  if (aiAvailable() && settings.aiMode !== "auto")
    box.append(h("div", {class:"row", style:{margin:"0 0 16px"}}, h("button", {class:"btn tint", onclick: runAI, html: ic("sparkles") + "Get Claude's interviewer review"})));

}
function copyText(t, btn){
  const done = () => { const o = btn.innerHTML; btn.textContent = "Copied"; setTimeout(() => btn.innerHTML = o, 1200); };
  try{ navigator.clipboard.writeText(t).then(done, () => {}); }catch{}
}

/* After the first graded answer, one gentle offer to save progress (never a wall). */
function accountNudge(){
  let off = false; try{ off = localStorage.getItem("sdr:nudged") === "1"; }catch{}
  if (off || typeof Cloud === "undefined" || !Cloud.enabled || Cloud.user) return null;
  const hide = () => { try{ localStorage.setItem("sdr:nudged", "1"); }catch{} card.remove(); };
  const card = h("section", {class:"card nudge"},
    h("div", {style:{minWidth:0}}, h("b", {text:"Keep your progress"}), h("span", {text:"Create a free account to save your scores and mastery on every device."})),
    h("div", {class:"row", style:{gap:"6px", flex:"none"}},
      h("button", {class:"btn fill", onclick:() => { hide(); openAccount("signup"); }, text:"Create free account"}),
      h("button", {class:"btn plain", onclick: hide, text:"Not now"})));
  return card;
}

/* ----- Home (first visit) ----- */
function viewHome(v){
  const done = n => { try{ localStorage.setItem("sdr:welcomed", "1"); }catch{} n(); };
  const total = allQs().length;
  v.append(h("section", {class:"hero"},
    h("p", {class:"eyebrow", text:"Investment banking interview prep"}),
    h("h1", {class:"herotitle", text:"Practice your superday out loud. Get graded in seconds."}),
    h("p", {class:"herosub", text:`${total.toLocaleString()} real technical and behavioral questions, many reported in actual bank interviews. Answer the way you would in the room, and see what an interviewer would catch.`}),
    h("div", {class:"row", style:{gap:"10px", marginTop:"22px"}},
      h("button", {class:"btn fill lg", onclick:() => done(() => startCourse()), text:"Start the course"}),
      h("button", {class:"btn lg", onclick:() => done(() => go("drill")), text:"Try a question"}),
      Cloud.enabled && !Cloud.user ? h("button", {class:"btn plain", onclick:() => openAccount("signin"), text:"Sign in"}) : null)));
  const steps = [
    ["1", "Pick a question", "Follow the course from the basics up, or jump to any topic, bank or question."],
    ["2", "Answer out loud", "Tap the mic and talk it through. Your answer is transcribed when you stop. You can also type."],
    ["3", "See your score", "Every answer is scored out of 10: key points covered, factual errors, structure and delivery, with the exact fix."],
  ];
  v.append(h("div", {class:"steps"}, steps.map(([n, t, d]) => h("div", {class:"step"}, h("span", {class:"stepn", text:n}), h("b", {text:t}), h("p", {text:d})))));
  v.append(h("p", {class:"homefoot", text:"Free to use. Your progress saves in this browser; create a free account to keep it on every device."}));
}

/* ----- Mock intro ----- */
function viewMockIntro(v){
  v.append(h("h1", {class:"largetitle", text:"Mock interview"}));
  v.append(h("p", {class:"subtitle", text:"A short first round: about 7 questions, mixing behavioral and technical, in the order an interviewer would ask them."}));
  v.append(h("section", {class:"card"},
    h("div", {class:"list noicon", style:{border:0, boxShadow:"none", margin:0}},
      ...[["About 15 minutes", "Plan for 1 to 2 minutes per answer."], ["One take per question", "Answer like it's the real thing. You can skip any question."], ["Camera on, like a video call", "You'll see yourself in a small tile. Eye contact, expression, steadiness and framing are analyzed on this device; video is never uploaded or saved. You can turn the camera off any time."], ["Results at the end", "Your average score, your presence on camera, and what to drill next."]]
        .map(([t, d]) => h("div", {class:"li"}, h("div", {class:"lit"}, h("b", {text:t}), h("span", {text:d}))))),
    h("div", {class:"row", style:{marginTop:"14px"}}, h("button", {class:"btn fill lg", onclick:() => { startMock(); render(); window.scrollTo({top:0}); }, text:"Start the mock interview"}))));
}

/* ----- Privacy ----- */
function openPrivacy(){
  const layer = $("layer");
  const close = () => { layer.replaceChildren(); document.removeEventListener("keydown", esc); };
  const esc = e => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", esc);
  const para = t => h("p", {style:{margin:"0 0 12px", fontSize:"14.5px", lineHeight:"1.6", color:"var(--label2)"}, text:t});
  const sheet = h("div", {class:"sheet", role:"dialog", "aria-modal":"true", "aria-labelledby":"privTitle"},
    h("div", {class:"sheethead"}, h("span"), h("b", {id:"privTitle", text:"Privacy"}), h("button", {class:"tbtn", onclick:close, text:"Done", style:{fontWeight:600}})),
    h("div", {style:{padding:"18px 22px 4px"}},
      para("Your voice: when you answer out loud, the recording is sent over an encrypted connection to a speech-to-text service (Whisper, run by Groq) through Superday Room's own server, only to turn it into text. Superday Room doesn't keep the audio on any server."),
      para("Your camera (mock interview only): the video is analyzed on this device, in the page, to measure eye contact, expression, head movement and framing. Video is never uploaded, recorded or saved; only the resulting scores are kept with your answers. You can turn the camera off at any time."),
      para("Your answers and scores: without an account they stay in this browser. With a free account they're saved to your account (hosted by Supabase) so you can use them on any device. You can reset everything in Settings."),
      para("On this device: your last 10 recordings are kept in this browser so transcription can be checked and improved. Turn that off in Settings at any time."),
      para("Superday Room doesn't sell your data, show ads, or use tracking cookies.")));
  layer.replaceChildren(h("div", {class:"scrim", onclick:e => { if (e.target === e.currentTarget) close(); }}, sheet));
  sheet.querySelector("button").focus();
}

/* ----- Camera presence (mock interview) -----
   The mock runs like a video call: a self-view tile, and while you answer out loud a face model
   (MediaPipe Face Landmarker) reads a few frames a second IN THIS PAGE. Only numbers come out
   (where you looked, head angle, smile, brow); frames are never uploaded, kept or drawn anywhere. */
const MP_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35";
const FACE_MODEL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
const cam = {stream:null, on:false, starting:false, want: store.get("camOn", true), err:"", lm:null, loading:null, modelErr:false, timer:0, last:0, gap:125, ms:0, take:null};
const CAM_IC = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="6.5" width="13" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 10.5l5-3v9l-5-3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
const camWanted = () => state.view === "mock" && !!state.mock && !state.mock.intro && !state.mock.done;

function camTile(){
  let t = cam.tile;   // one tile, moved into each question's card
  if (!camWanted()){ if (t) t.hidden = true; if (cam.on || cam.starting) camStop(); return; }
  if (!t){
    const vid = document.createElement("video");
    vid.id = "camVid"; vid.muted = true; vid.autoplay = true; vid.setAttribute("playsinline", ""); vid.setAttribute("aria-label", "Your camera");
    t = h("div", {id:"camTile", class:"camtile", role:"region", "aria-label":"Camera"},
      vid, h("span", {class:"camlive", id:"camLive", hidden:true}, h("i"), "Analyzing"),
      h("button", {class:"cambtn", id:"camBtn", onclick: camToggle}));
    cam.tile = t;
  }
  // It sits in the question card, beside the question, like the other side of a video call.
  const card = document.querySelector(".qcard");
  if (card && t.parentNode !== card){ const bar = card.querySelector(".mockbar"); bar ? bar.after(t) : card.prepend(t); }
  t.hidden = false;
  camPaint();
}
function camPaint(){
  const t = $("camTile"), b = $("camBtn"), v = $("camVid"); if (!t || !b) return;
  t.classList.toggle("off", !cam.on);
  if (v && cam.stream && v.srcObject !== cam.stream) v.srcObject = cam.stream;
  if (v && cam.stream && v.paused) v.play().catch(() => {});   // moving the tile to the next question's card pauses it
  b.innerHTML = cam.starting ? "Starting camera…" : cam.on ? CAM_IC + "Camera off" : cam.err ? CAM_IC + "Camera unavailable · retry" : CAM_IC + "Turn camera on";
  b.title = cam.err || (cam.on ? "Your video is analyzed on this device and never uploaded or saved." : "");
  b.setAttribute("aria-pressed", String(cam.on));
  const live = $("camLive"); if (live) live.hidden = !(cam.on && mic.on && cam.lm);
}
async function camStart(){
  if (cam.on || cam.starting || !camWanted()) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){ cam.err = "This browser can't open a camera, so the mock runs with voice only."; camPaint(); return; }
  cam.starting = true; cam.err = ""; camPaint();
  try{
    const s = await navigator.mediaDevices.getUserMedia({video:{facingMode:"user", width:{ideal:640}, height:{ideal:480}, frameRate:{ideal:24, max:30}}, audio:false});
    cam.stream = s;
    // Unplugged, or taken by another app: fall back to voice only.
    s.getVideoTracks().forEach(t => t.addEventListener("ended", () => { if (cam.stream !== s) return; camStop(); cam.err = "The camera disconnected, so the mock carries on with voice only."; camPaint(); }));
    if (!camWanted()){ cam.starting = false; camStop(); return; }   // the mock ended while you were deciding
    cam.on = true;
    if ($("micNote") && /camera/i.test($("micNote").textContent)) setMicNote("");
    camModel();
    clearInterval(cam.timer); cam.timer = setInterval(camSample, 60);
  }catch(e){
    const n = (e && e.name) || "";
    cam.err = /NotAllowed|Permission|Security/i.test(n) ? "Camera blocked, so the mock runs with voice only. To turn it on, allow the camera in your browser's site settings."
      : /NotFound|DevicesNotFound|Overconstrained/i.test(n) ? "No camera found, so the mock runs with voice only."
      : "The camera didn't start (another app may be using it), so the mock runs with voice only.";
    setMicNote(cam.err);
  }finally{ cam.starting = false; camPaint(); }
}
function camStop(){
  clearInterval(cam.timer); cam.timer = 0;
  try{ cam.stream && cam.stream.getTracks().forEach(t => t.stop()); }catch{}
  cam.stream = null; cam.on = false;
  const v = $("camVid"); if (v) v.srcObject = null;
  camPaint();
}
function camToggle(){
  if (cam.on){ cam.want = false; store.set("camOn", false); camStop(); }
  else { cam.want = true; store.set("camOn", true); camStart(); }
}
// The face model loads once, in the background, the first time the camera is on (about 15 MB, then cached).
function camModel(){
  if (cam.lm || cam.loading || cam.modelErr) return cam.loading;
  cam.loading = (async () => {
    const mp = await import(MP_URL + "/vision_bundle.mjs");
    const files = await mp.FilesetResolver.forVisionTasks(MP_URL + "/wasm");
    const make = delegate => mp.FaceLandmarker.createFromOptions(files, {baseOptions:{modelAssetPath:FACE_MODEL, delegate}, runningMode:"VIDEO", numFaces:1, outputFaceBlendshapes:true, outputFacialTransformationMatrixes:true});
    try{ cam.lm = await make("GPU"); }catch{ cam.lm = await make("CPU"); }
    camPaint();
  })().catch(e => { cam.modelErr = true; console.warn("Face model didn't load:", e); });
  return cam.loading;
}
// Sample only while you're answering out loud: ~8 frames a second, 4 on slower phones.
function camSample(){
  const live = $("camLive"); if (live) live.hidden = !(cam.on && cam.lm && mic.on);
  if (!cam.on || !cam.lm || !mic.on || !state.current) return;
  const v = $("camVid"); if (!v || v.readyState < 2 || !v.videoWidth) return;
  const now = performance.now(); if (now - cam.last < cam.gap) return;
  cam.last = now;
  let r; const t0 = performance.now();
  try{ r = cam.lm.detectForVideo(v, now); }catch{ return; }
  const ms = performance.now() - t0; cam.ms = cam.ms ? cam.ms * 0.8 + ms * 0.2 : ms;
  cam.gap = cam.ms > 50 ? 250 : 125;
  presenceFrame(r);
}
const avg2 = (b, a, c) => ((b[a] || 0) + (b[c] || 0)) / 2;
function presenceFrame(r){
  const q = state.current, t = (Date.now() - timer.t0) / 1000;
  let k = cam.take;
  if (!k || k.qid !== q.id || t < k.lastT - 1) k = cam.take = {qid:q.id, frames:[], lastT:0, prev:null};   // a new question or a cleared retake
  k.lastT = t;
  const L = r && r.faceLandmarks && r.faceLandmarks[0];
  if (!L){ k.frames.push({t, face:false}); k.prev = null; return; }
  const b = {}; (((r.faceBlendshapes || [])[0] || {}).categories || []).forEach(c => b[c.categoryName] = c.score);
  const m = ((r.facialTransformationMatrixes || [])[0] || {}).data;
  // Head angles from the face's rotation (4x4, column-major); 0,0 is facing the camera.
  const yaw = m ? Math.asin(Math.max(-1, Math.min(1, -m[2]))) * 57.3 : 0;
  const pitch = m ? Math.atan2(m[6], m[10]) * 57.3 : 0;
  // Where the eyes point (from the iris): sideways, down, up.
  const gx = ((b.eyeLookOutLeft || 0) - (b.eyeLookInLeft || 0) + (b.eyeLookInRight || 0) - (b.eyeLookOutRight || 0)) / 2;
  const gDown = avg2(b, "eyeLookDownLeft", "eyeLookDownRight"), gUp = avg2(b, "eyeLookUpLeft", "eyeLookUpRight");
  const blink = avg2(b, "eyeBlinkLeft", "eyeBlinkRight") > 0.5;
  const eyeY = (L[33].y + L[263].y) / 2, nr = (L[1].y - eyeY) / Math.max(0.01, L[152].y - eyeY);   // nose drops toward the chin when the head tips down
  const headDown = Math.abs(pitch) >= 15 && nr > 0.36;
  const look = Math.abs(yaw) < 15 && Math.abs(pitch) < 17 && Math.abs(gx) < 0.4 && gDown < 0.45 && gUp < 0.45;
  const down = !look && (gDown >= 0.45 || headDown);
  const fw = Math.abs(L[454].x - L[234].x), nx = L[1].x, ny = L[1].y;
  const smile = avg2(b, "mouthSmileLeft", "mouthSmileRight");
  // A big smile pulls the brow down too, so tension only counts without one.
  const tense = smile < 0.3 ? Math.max(avg2(b, "browDownLeft", "browDownRight") - 0.15, avg2(b, "mouthPressLeft", "mouthPressRight")) : 0;
  const brow = ((b.browInnerUp || 0) + avg2(b, "browOuterUpLeft", "browOuterUpRight")) / 2;
  const f = {t, face:true, look, down, blink, smile, tense, brow, yaw, pitch, nx, ny, fw,
    centered: Math.abs(nx - 0.5) < 0.18 && ny > 0.22 && ny < 0.72, size: fw < 0.13 ? "far" : fw > 0.62 ? "near" : "ok"};
  // Head movement: turning (degrees) plus shifting around (a face-width of shift counts as 60).
  f.dt = k.prev ? t - k.prev.t : 0;
  f.move = k.prev ? Math.abs(yaw - k.prev.yaw) + Math.abs(pitch - k.prev.pitch) + Math.hypot(nx - k.prev.nx, ny - k.prev.ny) / Math.max(0.05, fw) * 60 : 0;
  k.frames.push(f); k.prev = f;
}
const NUM_WORD = /\d|percent|million|billion|thousand|hundred|basis|multiple|times\b|x\b/i;
// One answer's presence: eye contact, expression, steadiness and framing from the camera, plus
// pace, fillers, hedges and structure from the words. Scored on its own; it never touches the content score.
function presenceSummary(k, answer, rep, q){
  const st = rep.stats, sc = rep.scores;
  const speech = {wpm: st.wpm || null, fillerRate: Math.round((st.fillerRate || 0) * 10) / 10, fillers: st.fillers || 0, hedges: st.hedges || 0, structure: sc.structure, delivery: sc.delivery};
  const tips = [];
  const F = k && q && k.qid === q.id ? k.frames : [];
  const dur = F.length ? F[F.length - 1].t - F[0].t : 0;
  let out = {video:false, speech, tips, score:null};
  if (F.length >= 10 && dur >= 4){
    const faces = F.filter(f => f.face), open = faces.filter(f => !f.blink);
    const share = (a, fn) => a.length ? a.filter(fn).length / a.length : 0;
    const inFrame = faces.length / F.length;
    const eye = share(open, f => f.look), down = share(open, f => f.down);
    const framed = F.filter(f => f.face && f.centered && f.size === "ok").length / F.length;
    const far = share(faces, f => f.size === "far"), near = share(faces, f => f.size === "near"), offc = share(faces, f => !f.centered);
    const smile = share(faces, f => f.smile > 0.3), tense = share(faces, f => f.tense > 0.35);
    const bm = faces.reduce((s, f) => s + f.brow, 0) / Math.max(1, faces.length);
    const browSd = Math.sqrt(faces.reduce((s, f) => s + (f.brow - bm) ** 2, 0) / Math.max(1, faces.length));
    const moves = faces.filter(f => f.dt > 0 && f.dt < 1);
    const mdt = moves.reduce((s, f) => s + f.dt, 0);
    const move = mdt > 2 ? moves.reduce((s, f) => s + f.move, 0) / mdt : 0;   // degrees of head movement per second
    const start = open.filter(f => f.t < F[0].t + 5), half = F[0].t + dur / 2;
    const eyeStart = start.length >= 4 ? share(start, f => f.look) : null;
    const eye1 = share(open.filter(f => f.t < half), f => f.look), eye2 = share(open.filter(f => f.t >= half), f => f.look);
    const smiledEarly = faces.some(f => f.t < F[0].t + 6 && f.smile > 0.3);
    const fps = F.length / dur;
    let blinks = 0; for (let i = 1; i < faces.length; i++) if (faces[i].blink && !faces[i - 1].blink) blinks++;
    const blinkRate = fps >= 6 && faces.length > 20 ? Math.round(blinks / (dur / 60)) : null;
    // Looking down while saying numbers: map each frame to the words being said at that moment.
    const words = String(answer).split(/\s+/).filter(Boolean);
    let numDown = null;
    if (words.length >= 15){
      const near = new Set(); words.forEach((w, i) => { if (NUM_WORD.test(w)) for (let j = i - 3; j <= i + 3; j++) near.add(j); });
      const at = f => Math.min(words.length - 1, Math.floor((f.t - F[0].t) / dur * words.length));
      const onNum = open.filter(f => near.has(at(f))), rest = open.filter(f => !near.has(at(f)));
      if (onNum.length >= 6) numDown = {on: share(onNum, f => f.down), off: share(rest, f => f.down)};
    }
    // Strict scores out of 10: 80% eye contact is the bar for full marks.
    const clamp10 = x => Math.max(0, Math.min(10, x));
    const eyeS = clamp10((eye - 0.35) / 0.45 * 10);
    const frameS = clamp10((framed - 0.5) / 0.4 * 10);
    const stiff = move < 1.5 && browSd < 0.025;
    const steadyS = stiff ? 7 : clamp10(10 - Math.max(0, move - 12) / 2);
    const flat = smile < 0.03 && browSd < 0.03;
    let exprS = 5 + (smile >= 0.08 ? 3 : smile > 0 ? 1 : 0) + (browSd >= 0.04 ? 2 : 0) - (tense >= 0.3 ? 3 : 0) - (flat ? 2 : 0);
    exprS = clamp10(exprS);
    let score = eyeS * 0.35 + exprS * 0.2 + steadyS * 0.15 + frameS * 0.1 + (sc.delivery ?? 5) * 0.2;
    if (inFrame < 0.7) score = Math.min(score, 4); else if (framed < 0.5) score = Math.min(score, 7);
    if (eye < 0.5) score = Math.min(score, 5); else if (eye < 0.65) score = Math.min(score, 7);
    score = Math.round(score);
    const pct = x => Math.round(x * 100) + "%";
    if (inFrame < 0.85) tips.push([3, "Stay in the frame", `Your face was out of view for ${pct(1 - inFrame)} of the answer. Sit square to the camera and stay in it.`]);
    else if (framed < 0.75) tips.push([1, "Fix your framing", far > 0.3 ? "You're far from the camera. Sit closer so your head and shoulders fill the frame." : near > 0.3 ? "You're too close to the camera. Sit back so your shoulders show." : "Center yourself in the frame, eyes about a third from the top."]);
    if (eye < 0.65) tips.push([3, "Hold eye contact", `You looked at the camera ${pct(eye)} of the time. Look at the lens, not your own video, and land the end of every point on it.`]);
    if (numDown && numDown.on >= 0.35 && numDown.on > numDown.off + 0.15) tips.push([2, "Numbers to the camera", "You looked down while giving numbers. Know them cold and say them to the interviewer; it's when they're judging whether you know the material."]);
    else if (down >= 0.25) tips.push([2, "Stop looking down", `You looked down ${pct(down)} of the time, which reads as reading notes or unsure. Keep your chin up.`]);
    if (eyeStart !== null && eyeStart < 0.5 && eye >= 0.5) tips.push([1, "Open on the camera", "You looked away as you started. Take a breath, look at the lens, then give your first sentence."]);
    if (eye1 - eye2 > 0.2 && eye2 < 0.7) tips.push([1, "Finish strong", "Your eye contact faded in the second half. It reads as losing confidence; finish on the camera."]);
    if (tense >= 0.3) tips.push([2, "Relax your face", "Your brow was furrowed or lips pressed for much of the answer. Relax your jaw and brow between points."]);
    if (!smiledEarly && (q.t === "beh" || flat)) tips.push([q.t === "beh" ? 2 : 1, "Smile when you start", "No smile in the first few seconds. A quick smile as you begin reads as warm and confident."]);
    else if (flat) tips.push([1, "More expression", "Your expression stayed flat. Let your face move with the points you care about."]);
    if (move > 20) tips.push([2, "Keep your head still", "Your head moved a lot while you talked. Sit back, keep still and let your voice do the emphasis."]);
    else if (stiff && dur > 15) tips.push([1, "Loosen up", "You were very still, almost frozen. A nod or small gesture on key points looks natural."]);
    if (blinkRate && blinkRate > 40) tips.push([1, "Slow down and breathe", `You blinked about ${blinkRate} times a minute, which often reads as nerves. Breathe out before you answer.`]);
    out = {video:true, speech, tips, score, eye, down, inFrame, framed, smile, tense, move: Math.round(move), blinkRate, flat, stiff, smiledEarly,
      parts:{eye: Math.round(eyeS), expression: Math.round(exprS), steadiness: Math.round(steadyS), framing: Math.round(frameS)}};
  }
  if (speech.wpm && speech.wpm > 175) tips.push([2, "Slow down", `${speech.wpm} words a minute. Slow to 140–160 so your numbers land.`]);
  else if (speech.wpm && speech.wpm < 110) tips.push([1, "Pick up the pace", `${speech.wpm} words a minute sounds hesitant. Aim for 130–160.`]);
  if (speech.fillerRate > 3) tips.push([2, "Fewer fillers", `${speech.fillerRate} fillers per 100 words. Pause in silence instead.`]);
  if (speech.hedges >= 2) tips.push([1, "Drop the hedges", `${speech.hedges} hedges ("I think", "maybe"). State it like you know it.`]);
  if (speech.structure != null && speech.structure < 6) tips.push([1, "Lead with the answer", "Give the answer first, then two or three points, then stop."]);
  tips.sort((a, b) => b[0] - a[0]);
  return out;
}
const PCT = x => Math.round(x * 100) + "%";
// Two rows of four: what the camera saw, then what the words showed.
const presTiles = (label, tiles) => [h("div", {class:"preslabel", text:label}), h("div", {class:"metrics"}, tiles.map(([k, v, sub]) => h("div", {class:"metric"}, h("div", {class:"k", text:k}), h("div", {class:"v", text:v}), h("div", {class:"s", text:sub}))))];
function presenceCard(p){
  const s = p.speech, cams = p.video ? [["Eye contact", PCT(p.eye), p.eye >= 0.8 ? "At the bar (80%+)" : "Aim for 80%+"],
      ["Expression", p.parts.expression + "/10", p.smile >= 0.08 ? (p.tense >= 0.3 ? "Smiled, but tense" : "Engaged") : p.flat ? "Flat" : p.tense >= 0.3 ? "Tense" : "Neutral"],
      ["Steadiness", p.parts.steadiness + "/10", (p.move > 20 ? "Fidgety" : p.stiff ? "Very still" : "Steady") + (p.blinkRate ? ` · ${p.blinkRate} blinks/min` : "")],
      ["Framing", PCT(p.framed), p.inFrame < 0.85 ? "Left the frame" : p.framed >= 0.9 ? "Centered" : "Off center"]] : null;
  const voice = [["Pace", s.wpm ? String(s.wpm) : "–", s.wpm ? "wpm, aim 130–165" : "Spoken answers only"], ["Fillers", String(s.fillerRate), "per 100 words"], ["Hedges", String(s.hedges), s.hedges ? "State it directly" : "Confident"], ["Structure", s.structure != null ? s.structure + "/10" : "–", "Answer first, then points"]];
  const head = h("div", {class:"preshead"},
    h("div", null, h("b", {text:"Presence & delivery"}), h("span", {text: p.video ? "How you came across on camera. Scored separately from your content." : cam.on ? "Answer out loud with the camera on to get eye contact, expression and framing." : "Camera off, so only your voice was measured."})),
    p.score != null ? h("span", {class:`score-chip sc-${band(p.score)}`, text: p.score + "/10"}) : null);
  return h("section", {class:"card pres", "aria-label":"Presence and delivery"}, head,
    cams ? presTiles("On camera", cams) : null, presTiles("Voice", voice),
    p.tips.length ? h("div", {class:"list noicon prestips"}, p.tips.slice(0, 4).map(([, t, d]) => h("div", {class:"li"}, h("div", {class:"lit"}, h("b", {text:t}), h("span", {text:d})))))
      : p.video ? h("p", {class:"presok", text:"Strong presence: steady eye contact, good framing and a calm, engaged face. Keep it."}) : null);
}
// The mock's results: presence across every answer, and the habits that showed up most.
function presenceRollup(res){
  const ps = res.map(r => r.presence).filter(Boolean);
  if (!ps.length) return null;
  const vid = ps.filter(p => p.video);
  const mean = (a, f) => a.length ? a.reduce((s, x) => s + f(x), 0) / a.length : null;
  const sp = ps.map(p => p.speech), wpm = mean(sp.filter(x => x.wpm), x => x.wpm);
  const count = {}; ps.forEach(p => p.tips.forEach(([w, t, d]) => { (count[t] = count[t] || {n:0, w, d}).n++; }));
  const top = Object.entries(count).sort((a, b) => b[1].n - a[1].n || b[1].w - a[1].w).slice(0, 4);
  const score = vid.length ? Math.round(mean(vid, p => p.score)) : null;
  const cams = vid.length ? [["Eye contact", PCT(mean(vid, p => p.eye)), "average, aim 80%+"], ["Smiled", `${vid.filter(p => p.smile >= 0.08).length} of ${vid.length}`, "answers"], ["Steadiness", Math.round(mean(vid, p => p.parts.steadiness)) + "/10", "average"], ["Framing", PCT(mean(vid, p => p.framed)), "average"]] : null;
  const st = sp.filter(x => x.structure != null);
  const voice = [["Pace", wpm ? String(Math.round(wpm)) : "–", "wpm average"], ["Fillers", (Math.round(mean(sp, x => x.fillerRate) * 10) / 10).toString(), "per 100 words"], ["Hedges", String(sp.reduce((n, x) => n + x.hedges, 0)), "in total"], ["Structure", st.length ? Math.round(mean(st, x => x.structure)) + "/10" : "–", "average"]];
  return h("section", {class:"card pres", "aria-label":"Presence and delivery"},
    h("div", {class:"preshead"},
      h("div", null, h("b", {text:"Presence & delivery"}), h("span", {text: vid.length ? `On camera for ${vid.length} of ${ps.length} answers. Scored separately from your answers' content.` : "The camera was off, so only your voice was measured."})),
      score != null ? h("span", {class:`score-chip sc-${band(score)}`, text: score + "/10"}) : null),
    cams ? presTiles("On camera", cams) : null, presTiles("Voice", voice),
    top.length ? h("div", {class:"list noicon prestips"}, top.map(([t, x]) => h("div", {class:"li"}, h("div", {class:"lit"}, h("b", {text: t + (x.n > 1 ? ` · ${x.n} answers` : "")}), h("span", {text:x.d})))))
      : vid.length ? h("p", {class:"presok", text:"Strong presence across the interview. Keep it."}) : null);
}

/* ----- Mock ----- */
function shuffle(a){ a = a.slice(); for (let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function startMock(){
  const pool = filtered();
  const take = (t,n) => shuffle(pool.filter(q=>q.t===t)).slice(0,n);
  let qs = [...take("beh",1), ...take("acct",2), ...take("val",1), ...take("deal",1), ...take("beh",1)];
  const intro = BANK.find(q => q.id === "b1");
  if (intro && (bankFilter.collection === "original" || bankFilter.collection === "all")) qs.unshift(intro);
  qs = qs.filter((q,i,a) => q && a.findIndex(x => x.id === q.id) === i).slice(0,7);
  if (qs.length < 2) qs = shuffle(pool).slice(0,6);
  state.mock = {qs, i:0, results:[], done:false};
  state.current = null; cam.take = null;
  showQuestion(qs[0], {render:false});
  if (cam.want) setTimeout(camStart);   // after the tile is on the page
}
function mockAdvance(){
  const m = state.mock;
  if (m.i < m.qs.length-1){ m.i++; showQuestion(m.qs[m.i]); window.scrollTo({top:0}); return; }
  m.done = true; if (mic.on) stopMic(false); camStop(); render();
  const res = m.results.filter(Boolean);
}
function viewMockDone(v){
  const m = state.mock, res = m.results.filter(Boolean);
  const a = res.length ? res.reduce((s,r)=>s+r.score,0)/res.length : null;
  v.append(h("h1", {class:"largetitle", text:"Interview complete"}));
  v.append(h("p", {class:"subtitle", text: a === null ? "You skipped every question. Answer at least one to get a result." : `${res.filter(r=>r.score>=7).length} of ${res.length} answers were at the bar.`}));
  const s = a === null ? 0 : Math.round(a);
  const rings = h("div", {class:"rings", html: ringSVG([s, res.length/m.qs.length*10, res.filter(r=>r.score>=7).length/Math.max(1,res.length)*10])}, h("div", {class:"big"}, h("div", null, h("b", {text: a === null ? "–" : a.toFixed(1)}), h("small", {text:"AVERAGE"}))));
  setTimeout(() => rings.querySelectorAll("circle[data-off]").forEach(c => c.style.strokeDashoffset = c.dataset.off), 30);
  v.append(h("section", {class:"card"}, h("div", {class:"summary"}, rings, h("div", null,
    h("p", {class:"verdict", text: a === null ? "No grades yet." : s >= 8 ? "Strong interview. You'd likely advance." : s >= 6 ? "Borderline. Tighten the weak answers below." : "Not there yet. Drill the red ones and run it again."}),
    h("div", {class:"legend"}, h("span", null, "Answered ", h("b", {text: `${res.length} of ${m.qs.length}`})), h("span", null, "At the bar (7+) ", h("b", {text: String(res.filter(r=>r.score>=7).length)})))))));
  const roll = presenceRollup(res); if (roll) v.append(roll);
  v.append(h("div", {class:"list"}, m.qs.map((q,i) => { const r = m.results[i];
    return h("button", {class:"li qrow", onclick:() => { state.track = q.t; state.view = "drill"; showQuestion(q); }},
      h("span", {class:"lic " + (r ? (r.score >= 7 ? "c-green" : r.score >= 5 ? "c-orange" : "c-red") : "c-gray"), html: ic(r ? (r.score >= 7 ? "check" : "warn") : "forward")}),
      h("div", {class:"lit"}, h("b", {text:q.q}), h("span", {text: r ? r.verdict + (r.presence && r.presence.score != null ? ` · Presence ${r.presence.score}/10` : "") : "Skipped"})),
      h("span", {class:"trail"}, r ? h("span", {class:`score-chip sc-${band(r.score)}`, text: r.score + "/10"}) : null, chevEl())); })));
  v.append(h("div", {class:"row"}, h("button", {class:"btn lg fill", onclick:() => { startMock(); render(); }, html: ic("retry") + "Run another mock"}), h("button", {class:"btn lg tint", onclick:() => { state.mock = null; go("drill"); }, text:"Back to drills"})));
}

/* ----- Course ----- */
let courseOpen = null;
function viewCourse(v){
  const c = courseData();
  const total = c.order.length, passed = c.order.filter(o => coursePassed(o.q.id)).length;
  const next = courseNext(store.get("coursePos", null));
  v.append(h("h1", {class:"largetitle", text:"Course"}));
  v.append(h("p", {class:"subtitle", text:"Every question in learning order: the basics of each topic first, then intermediate, then advanced, and accounting before valuation before deals. You move on as you go; anything you score under 7 on comes back later. Already know a unit? Open it and test out: one hard question per lesson, and each one you nail (8+) clears the whole lesson."}));
  const srcName = {practice:"Extended practice", guides:"Study guides", original:"Core drills", all:"All questions"}[bankFilter.collection] || "All questions";
  v.append(h("section", {class:"card"},
    h("div", {class:"row", style:{justifyContent:"space-between", gap:"10px", flexWrap:"wrap"}},
      h("div", null,
        h("b", {style:{fontSize:"18px"}, text: `${passed.toLocaleString()} of ${total.toLocaleString()} questions passed`}),
        h("div", {style:{fontSize:"13px", color:"var(--label2)"}, text:`Using: ${srcName}. Change it with the picker in the sidebar.`}),
        next ? h("div", {style:{fontSize:"14px", marginTop:"6px"}}, h("span", {class:"t-gray", text:"Up next: "}), `${next.unit.name} · ${next.lesson.name}`) : h("div", {style:{marginTop:"6px"}, text:"You've passed every question. Nice work."})),
      next ? h("button", {class:"btn lg fill", onclick:() => startCourse(next.q.id), html: ic("forward") + (passed ? "Continue" : "Start the course")}) : null),
    h("div", {class:"bar", style:{marginTop:"10px"}}, h("i", {style:{width: (total ? passed / total * 100 : 0) + "%", background:"var(--green)"}}))));

  const list = h("div", {class:"list"});
  c.units.forEach((u, ui) => {
    const up = u.qs.filter(x => coursePassed(x.q.id)).length, open = courseOpen === u.id;
    const [icon, col] = TRACK_STYLE[u.qs[0].q.t] || ["list", "c-gray"];
    list.append(h("button", {class:"li", "aria-expanded": String(open), onclick:() => { courseOpen = open ? null : u.id; render(); }},
      h("span", {class:"lic " + col, html: ic(icon)}),
      h("div", {class:"lit"}, h("b", {text:`${ui + 1}. ${u.name}`}),
        h("span", {text:`${up} of ${u.qs.length} passed · ${u.lessons.length} lessons`}),
        h("div", {class:"bar"}, h("i", {style:{width:(up / u.qs.length * 100) + "%", background:"var(--green)"}}))),
      h("span", {class:"trail"}, chevEl())));
    const openLessons = u.lessons.filter(l => !l.qs.every(q => coursePassed(q.id)));
    if (open && u.id !== "beh" && openLessons.length) list.append(h("div", {class:"li", style:{paddingLeft:"52px"}},
      h("div", {class:"lit"}, h("b", {text:"Already know this? Test out"}), h("span", {text:`One hard question for each of the ${openLessons.length} lessons left. Score ${TEST_BAR}+ and that lesson is done.`})),
      h("span", {class:"trail"}, h("button", {class:"btn fill", onclick:() => startTestOut(u), html: ic("target") + "Test out"}))));
    if (open) u.lessons.forEach(l => {
      const lp = l.qs.filter(q => coursePassed(q.id)).length;
      const first = l.qs.find(q => !coursePassed(q.id)) || l.qs[0];
      list.append(h("div", {class:"li", style:{paddingLeft:"52px"}},
        h("div", {class:"lit"}, h("b", {style:{fontWeight:500}, text:l.name}), h("span", {text:`${lp} of ${l.qs.length} passed`})),
        h("span", {class:"trail"},
          u.id !== "beh" && lp < l.qs.length && l.qs.length > 1 ? h("button", {class:"btn plain", onclick:() => startTestOut(u, l), title:`One hard question. Score ${TEST_BAR}+ and all ${l.qs.length} count as done.`, text:"Test out"}) : null,
          h("button", {class:"btn tint", onclick:() => startCourse(first.id), text: lp === l.qs.length ? "Review" : lp ? "Resume" : "Start here"}))));
    });
  });
  v.append(h("h3", {class:"sechead"}, "Units"), list);
}

/* ----- Mastery ----- */
let masteryOpen = null, masteryLevel = "all";
function viewMastery(v){
  const pool = filtered();
  const c = mix(pool), tried = pool.length - c.new;
  v.append(h("h1", {class:"largetitle", text:"Mastery"}));
  v.append(h("p", {class:"subtitle", text:"Where you stand on every concept. Levels update after each answer; you can also mark them yourself."}));

  /* overall */
  const tiles = h("div", {class:"tiles"});
  LEVELS.forEach(l => tiles.append(h("button", {class:"tile", style:{border:0, textAlign:"left", cursor:"pointer", outline: masteryLevel===l.id ? `2px solid var(--${l.color})` : "none"}, onclick:() => { masteryLevel = masteryLevel === l.id ? "all" : l.id; render(); }},
    h("div", {class:"k", style:{color:`var(--${l.color})`}, html: ic(l.id==="mastered"?"check":l.id==="close"?"half":l.id==="new"?"list":"warn") + l.name}),
    h("div", {class:"v", text:String(c[l.id])}),
    h("div", {class:"s", text: pool.length ? Math.round(c[l.id]/pool.length*100) + "% of questions" : ""}))));
  v.append(tiles);

  /* skills */
  v.append(h("h3", {class:"sechead"}, "Interview skills ", h("small", {text:"From your last 20 answers"})));
  const sk = skillStats();
  v.append(h("div", {class:"list"}, sk.map(s => h("div", {class:"li"},
    h("span", {class:"lic c-"+s.color, html:ic(s.icon)}),
    h("div", {class:"lit"}, h("b", {text:s.name}), h("span", {text:s.tip}),
      s.avg !== null ? h("div", {class:"bar"}, h("i", {style:{width:(s.avg*10)+"%", background:`var(--${LV[s.lvl].color})`}})) : null),
    h("span", {class:"trail"}, h("span", {style:{color:`var(--${LV[s.lvl].color})`, fontWeight:600}, text: s.avg === null ? "Not started" : LV[s.lvl].name}), s.avg !== null ? h("span", {text: s.avg.toFixed(1)}) : null)))));

  /* concepts (topics) */
  v.append(h("h3", {class:"sechead"}, "Concepts ", h("small", {text: tried ? `${tried} of ${pool.length} questions attempted` : "Answer questions to start tracking"})));
  const groups = {};
  pool.forEach(q => { const k = q.topic || trackName(q.t); (groups[k] = groups[k] || []).push(q); });
  const order = ["redo","work","close","new","mastered"];
  const rows = Object.entries(groups).map(([name, qs]) => ({name, qs, c: mix(qs), lvl: topicLevel(mix(qs))}))
    .filter(r => masteryLevel === "all" || r.c[masteryLevel] > 0)
    .sort((a,b) => order.indexOf(a.lvl) - order.indexOf(b.lvl) || b.qs.length - a.qs.length);
  const list = h("div", {class:"list"});
  rows.forEach(r => {
    const open = masteryOpen === r.name;
    const t = r.qs[0].t; const [icon, col] = TRACK_STYLE[t] || ["list","c-gray"];
    list.append(h("button", {class:"li", "aria-expanded": String(open), onclick:() => { masteryOpen = open ? null : r.name; render(); }},
      h("span", {class:"lic "+col, html:ic(icon)}),
      h("div", {class:"lit"}, h("b", {text:r.name}),
        h("span", {text: `${r.c.mastered} mastered · ${r.c.close} close · ${r.c.work + r.c.redo} need work · ${r.c.new} new`}),
        mixBar(r.c, r.qs.length)),
      h("span", {class:"trail"}, h("span", {style:{color:`var(--${LV[r.lvl].color})`, fontWeight:600}, text: LV[r.lvl].name}), chevEl())));
    if (open){
      const qs = r.qs.filter(q => masteryLevel === "all" || levelOf(q.id) === masteryLevel)
        .sort((a,b) => order.indexOf(levelOf(a.id)) - order.indexOf(levelOf(b.id))).slice(0, 60);
      qs.forEach(q => list.append(questionRow(q, true)));
      list.append(h("div", {class:"li"}, h("div", {class:"lit"}), h("button", {class:"btn tint", onclick:() => { drillConcept(r.name, r.qs); }, html: ic("mic") + "Drill this concept"})));
    }
  });
  if (!rows.length) list.append(h("div", {class:"empty", text:"Nothing at this level yet."}));
  v.append(list);
}
function drillConcept(name, qs){
  exitCourse();
  const practice = qs.some(q => q.collection === "practice" || q.collection === "guides");
  if (practice && qs[0].topic){ bankFilter.topic = qs[0].topic; store.set("bankFilter", bankFilter); }
  state.track = qs[0].t; store.set("track", state.track);
  settings.order = "weak"; saveSettings();
  state.view = "drill"; pickNext(); render();
}
function questionRow(q, withFlag){
  const lv = levelOf(q.id), p = progress[q.id];
  const last = p && p.scores.length ? p.scores.at(-1) : null;
  const row = h("div", {class:"li qrow"},
    h("span", {class:"status", style:{color:`var(--${LV[lv].color})`}, title: LV[lv].name, html: ic(lv==="mastered"?"check":lv==="close"?"half":lv==="new"?"list":"warn", "status")}),
    h("button", {class:"lit", style:{all:"unset", cursor:"pointer", flex:1, minWidth:0}, onclick:() => { exitCourse(); state.track = q.t; store.set("track", q.t); state.view = "drill"; showQuestion(q); window.scrollTo({top:0}); }},
      h("b", {style:{display:"block", fontWeight:500, fontSize:"15px"}, text:q.q}),
      h("span", {style:{display:"block", fontSize:"13px", color:"var(--label2)"}, text: [q.topic || trackName(q.t), q.l, firmTag(q)].filter(Boolean).join(" · ")})),
    h("span", {class:"trail"}, last !== null ? h("span", {class:`score-chip sc-${band(last)}`, text: last + "/10"}) : null,
      withFlag ? flagMenu(q) : chevEl()));
  return row;
}
function flagMenu(q){
  const cur = (progress[q.id]||{}).flag || "";
  const s = h("select", {class:"selectbtn", "aria-label":"Set level", onchange:e => { setFlag(q.id, e.target.value || null); render(); }},
    h("option", {value:"", text:"Auto"}), ...["mastered","close","work","redo"].map(k => h("option", {value:k, selected: cur===k, text:LV[k].name})));
  s.addEventListener("click", e => e.stopPropagation());
  return s;
}

/* ----- Bank ----- */
function viewBank(v){
  v.append(h("h1", {class:"largetitle", text:"Question bank"}));
  const pool = filtered();
  v.append(h("p", {class:"subtitle", text:`${pool.length.toLocaleString()} questions · ${pool.filter(q=>progress[q.id]).length} attempted`}));
  const f = h("div", {class:"filters"});
  if (HAS_PRACTICE || HAS_GUIDES){
    const seg = h("div", {class:"seg", role:"group", "aria-label":"Collection"});
    [HAS_PRACTICE && ["practice","Extended practice"], HAS_GUIDES && ["guides","Study guides"], ["original","Core drills"], ["all","All"]].filter(Boolean).forEach(([k,n]) => seg.append(h("button", {"aria-pressed":String(bankFilter.collection===k), onclick:() => { bankFilter.collection = k; bankFilter.topic = ""; bankFilter.level = ""; applyFilters(); }, text:n})));
    f.append(seg);
  }
  const topics = [...new Set(allQs().filter(collectionOk).map(q => q.topic).filter(Boolean))].sort();
  if (topics.length) f.append(h("select", {class:"selectbtn", "aria-label":"Topic", onchange:e => { bankFilter.topic = e.target.value; applyFilters(); }}, h("option", {value:"", text:"All topics"}), ...topics.map(t => h("option", {value:t, selected: bankFilter.topic===t, text:t}))));
  const levels = [...new Set(allQs().map(q => q.l).filter(Boolean))];
  f.append(h("select", {class:"selectbtn", "aria-label":"Difficulty", onchange:e => { bankFilter.level = e.target.value; applyFilters(); }}, h("option", {value:"", text:"All levels"}), ...levels.map(l => h("option", {value:l, selected: bankFilter.level===l, text:l}))));
  if (bankFilter.search) f.append(h("button", {class:"btn plain", onclick:() => { bankFilter.search = ""; $("sideSearch").value = ""; applyFilters(); }, html: ic("close") + `“${bankFilter.search}”`}));
  v.append(f);
  const list = h("div", {class:"list"});
  pool.slice(0, state.bankShown).forEach(q => list.append(questionRow(q, true)));
  if (!pool.length) list.append(h("div", {class:"empty", text:"No questions match these filters."}));
  v.append(list);
  if (pool.length > state.bankShown) v.append(h("div", {class:"row", style:{justifyContent:"center"}}, h("button", {class:"btn tint", onclick:() => { state.bankShown += 300; render(); }, text:`Show more (${(pool.length - state.bankShown).toLocaleString()} left)`})));
}
function applyFilters(){
  store.set("bankFilter", bankFilter); state.bankShown = 150;
  const pool = filtered(); if (!pool.some(q => q.t === state.track)) state.track = (pool[0]||{}).t || "acct";
  state.current = null; render();
}

/* ----- Progress ----- */
function viewProgress(v){
  v.append(h("h1", {class:"largetitle", text:"Progress"}));
  v.append(h("p", {class:"subtitle", text:"Your scores and habits over time."}));
  const n = history.length;
  const last20 = history.slice(-20);
  const avg = a => a.length ? a.reduce((x,y)=>x+y,0)/a.length : null;
  const avgScore = avg(last20.map(x=>x.score));
  const prev20 = history.slice(-40,-20); const prevAvg = avg(prev20.map(x=>x.score));
  const days = [...new Set(history.map(x => new Date(x.ts).toDateString()))];
  let streak = 0; { const d = new Date(); for (;;){ if (days.includes(d.toDateString())){ streak++; d.setDate(d.getDate()-1); } else if (streak === 0 && d.toDateString() === new Date().toDateString()){ d.setDate(d.getDate()-1); } else break; } }
  const fill = avg(last20.filter(x=>x.words).map(x => x.fillers / x.words * 100));
  v.append(h("div", {class:"tiles"},
    tile("t-blue","chart","Answers graded", String(n), "all time"),
    tile("t-pink","star","Average score", avgScore === null ? "–" : avgScore.toFixed(1), prevAvg !== null && avgScore !== null ? `${avgScore >= prevAvg ? "▲" : "▼"} ${Math.abs(avgScore-prevAvg).toFixed(1)} vs previous 20` : "last 20 answers"),
    tile("t-orange","flame","Streak", String(streak), streak === 1 ? "day" : "days"),
    tile("t-purple","bubble","Fillers", fill === null ? "–" : fill.toFixed(1), "per 100 words")));
  if (n >= 2){
    const pts = history.slice(-40).map(x => x.score);
    const W = 600, H = 60, step = W / Math.max(1, pts.length-1);
    const d = pts.map((s,i) => `${i?"L":"M"}${(i*step).toFixed(1)},${(H - 4 - s/10*(H-8)).toFixed(1)}`).join("");
    v.append(h("section", {class:"card"}, h("div", {class:"chead"}, h("span", {class:"lbl t-pink", html: ic("chart") + "Score trend"}), h("span", {class:"aside", text:`Last ${pts.length} answers`})),
      h("div", {html:`<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-label="Score trend"><path d="${d}" fill="none" stroke="var(--pink)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`})));
  }
  v.append(h("h3", {class:"sechead"}, "By topic"));
  const pool = filtered();
  v.append(h("div", {class:"list"}, TRACKS.map(t => {
    const qs = pool.filter(q => q.t === t.id); if (!qs.length) return null;
    const tried = qs.filter(q => progress[q.id] && progress[q.id].scores.length);
    const a = avg(tried.map(q => progress[q.id].scores.at(-1)));
    const [icon, col] = TRACK_STYLE[t.id] || ["list","c-gray"];
    return h("button", {class:"li", onclick:() => { setTrack(t.id); go("drill"); }},
      h("span", {class:"lic "+col, html:ic(icon)}),
      h("div", {class:"lit"}, h("b", {text:t.name}), h("span", {text: `${tried.length} of ${qs.length} attempted`}), mixBar(mix(qs), qs.length)),
      h("span", {class:"trail"}, a !== null ? h("span", {class:`score-chip sc-${band(a)}`, text: a.toFixed(1)}) : null, chevEl()));
  })));
  v.append(h("h3", {class:"sechead"}, "Recent answers"));
  const recent = history.slice(-12).reverse();
  const byId = Object.fromEntries(allQs().map(q => [q.id, q]));
  v.append(h("div", {class:"list"}, recent.length ? recent.map(x => { const q = byId[x.id]; if (!q) return null;
    return h("button", {class:"li qrow", onclick:() => { state.track = q.t; state.view = "drill"; showQuestion(q); }},
      h("span", {class:"lic " + (x.score >= 8 ? "c-green" : x.score >= 6 ? "c-blue" : x.score >= 4 ? "c-orange" : "c-red"), html: ic("mic")}),
      h("div", {class:"lit"}, h("b", {text:q.q}), h("span", {text: new Date(x.ts).toLocaleString([], {month:"short", day:"numeric", hour:"numeric", minute:"2-digit"}) + (x.fillers ? ` · ${x.fillers} fillers` : "")})),
      h("span", {class:"trail"}, h("span", {class:`score-chip sc-${band(x.score)}`, text: x.score + "/10"}), chevEl())); }) : [h("div", {class:"empty", text:"Analyze your first answer to see it here."})]));
}
function tile(col, icon, k, val, sub){ return h("div", {class:"tile"}, h("div", {class:"k "+col, html: ic(icon) + k}), h("div", {class:"v", text:val}), h("div", {class:"s", text:sub})); }

/* ---------- Settings sheet ---------- */
function openSettings(){
  closeDrawer();
  const layer = $("layer");
  const close = () => { layer.replaceChildren(); document.removeEventListener("keydown", esc); render(); };
  const esc = e => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", esc);
  const sw = (key, label) => { const id = "s-"+key; return h("div", {class:"setrow"}, h("label", {for:id, text:label}), h("input", {type:"checkbox", class:"switch", id, checked: !!settings[key], onchange:e => { settings[key] = e.target.checked; saveSettings(); }})); };
  const sel = (key, label, opts, after) => { const id = "s-"+key; return h("div", {class:"setrow"}, h("label", {for:id, text:label}), h("select", {class:"selectbtn", id, onchange:e => { settings[key] = e.target.value; saveSettings(); after && after(); }}, ...opts.map(([v,n]) => h("option", {value:v, selected: settings[key]===v, text:n})))); };
  const keyInput = h("input", {type:"password", id:"s-key", placeholder: sample ? "Not needed here" : "sk-ant-…", autocomplete:"off", value: apiKey});
  const keyMsg = h("div", {class:"grpfoot"});
  let armed = false;
  const resetBtn = h("button", {class:"btn plain danger", onclick:() => {
    if (!armed){ armed = true; resetBtn.textContent = "Tap again to erase all progress"; setTimeout(() => { armed = false; resetBtn.textContent = "Reset all progress"; }, 4000); return; }
    if (typeof Cloud !== "undefined") Cloud.replaceNext(); progress = {}; history = []; log = []; store.set("progress", progress); store.set("history", history); store.set("log", log); resetBtn.textContent = "Progress cleared"; }, text:"Reset all progress"});
  const sheet = h("div", {class:"sheet", role:"dialog", "aria-modal":"true", "aria-labelledby":"setTitle"},
    h("div", {class:"sheethead"}, h("span"), h("b", {id:"setTitle", text:"Settings"}), h("button", {class:"tbtn", onclick:close, text:"Done", style:{fontWeight:600}})),
    Cloud.enabled ? h("div", {class:"grphead", text:"Account"}) : null,
    Cloud.enabled ? h("div", {class:"list grp"}, h("button", {class:"li", onclick:() => openAccount(Cloud.user ? "profile" : "signin")},
      h("span", {class:"avatar" + (Cloud.user ? " on" : ""), style:{width:"29px", height:"29px", fontSize:"12px"}, html: Cloud.user ? initials(Cloud.name()) : ic("person")}),
      h("div", {class:"lit"}, h("b", {text: Cloud.user ? Cloud.name() : "Sign in or create account"}), h("span", {text: Cloud.user ? Cloud.user.email : "Keep your progress on every device"})),
      h("span", {class:"trail"}, chevEl()))) : null,
    privateBankRow(),
    h("div", {class:"grphead", text:"Practice"}),
    h("div", {class:"list grp"}, sw("autoGrade","Analyze when I stop recording"), sw("accurate","Backup speech model on this device (used only if the server can't be reached)"),
      (apiKey || sample) ? sw("smartCleanup","Fix misheard words with Claude (uses your key)") : null,
      Object.keys(personalDict).length ? h("div", {class:"setrow"}, h("label", {text:`Word fixes learned from your edits: ${Object.keys(personalDict).length}`}),
        h("button", {class:"btn plain", onclick:e => { personalDict = {}; store.set("speechDict", {}); e.currentTarget.textContent = "Cleared"; }, text:"Clear"})) : null,
      sel("speechModel","Speech accuracy", [["fast","Fast (default)"],["best","Most accurate (slower, 172 MB once)"]], () => { if (ACC.worker){ try{ ACC.worker.terminate(); }catch{} ACC.worker = null; ACC.ready = false; ACC.loading = false; ACC.failed = false; ACC.progress = 0; } }),
      sel("strict","Interviewer style", [["standard","Standard analyst"],["tough","Tough MD"],["coach","Friendly coach"]])),
    h("div", {class:"grphead", text:"Appearance"}),
    h("div", {class:"list grp"}, sel("theme","Theme", [["light","Light"],["dark","Dark"],["system","Match my device"]], () => { settings.themeChosen = true; saveSettings(); applyTheme(); })),
    h("div", {class:"grphead", text:"Claude review (optional)"}),
    h("div", {class:"list grp"},
      sample ? h("div", {class:"setrow"}, h("label", {text:"Claude is connected through this page"}), h("span", {class:"ai-badge", html: ic("sparkles") + "On"})) :
        h("div", {class:"setrow"}, h("label", {for:"s-key", text:"API key"}), keyInput),
      sample ? null : sel("aiModel","Model", [["claude-opus-5-5","Claude Opus 5.5 (best)"],["claude-sonnet-5-5","Claude Sonnet 5.5 (faster)"],["claude-haiku-5-5","Claude Haiku 5.5 (cheapest)"]]),
      sel("aiMode","When to review", [["auto","After every answer"],["manual","Only when I ask"]])),
    sample ? null : keyMsg,
    sample ? null : h("div", {class:"row", style:{margin:"8px 32px 0"}},
      h("button", {class:"btn tint", onclick:() => { apiKey = keyInput.value.trim(); try{ apiKey ? localStorage.setItem("sdr:apikey", apiKey) : localStorage.removeItem("sdr:apikey"); }catch{} keyMsg.textContent = apiKey ? "Saved in this browser." : "Key removed."; }, html: ic("key") + "Save key"}),
      h("button", {class:"btn plain", onclick: async () => { keyMsg.textContent = "Testing…"; apiKey = keyInput.value.trim(); try{ await callClaude('Return JSON with score 10, verdict "ok", empty arrays and empty strings for the rest.'); keyMsg.textContent = "Connected. Claude will review your answers."; }catch(e){ keyMsg.textContent = "That didn't work: " + (e.message || e.code || "network error"); } }, text:"Test"})),
    sample ? null : h("div", {class:"grpfoot", text:"Without a key, the built-in coach grades everything on this device. With a key, Claude also gives an interviewer score, rewrites your answer and asks follow-ups. The key stays in this browser and is sent only to api.anthropic.com. Each review costs a few cents on your Anthropic account."}),
    h("div", {class:"grphead", text:"Data"}),
    h("div", {class:"list grp"}, h("div", {class:"setrow"}, h("label", {text: Cloud.user ? "Progress is saved to your account." : "Progress is saved in this browser only."}), resetBtn),
      h("div", {class:"setrow"}, h("label", {text:`Practice log: ${log.length} graded answer${log.length === 1 ? "" : "s"}, with what was heard and how it was graded.`}),
        h("button", {class:"btn plain", onclick:() => {
          const a = h("a", {href: URL.createObjectURL(new Blob([JSON.stringify(log, null, 1)], {type:"application/json"})), download:`drill-room-log-${new Date().toISOString().slice(0,10)}.json`});
          document.body.append(a); a.click(); a.remove();
        }, text:"Export"})),
      h("div", {class:"setrow"}, h("label", {for:"s-keepRec", text:`Keep my last ${REC_KEEP} recordings in this browser (never uploaded), to tune transcription on my voice`}),
        h("input", {type:"checkbox", class:"switch", id:"s-keepRec", checked: keepRecordings(), onchange:e => { settings.keepRecordings = e.target.checked; saveSettings(); if (!e.target.checked) recClear(); }})),
      h("div", {class:"setrow"}, h("label", {text:"Recordings with what each engine heard, plus the practice log"}),
        h("button", {class:"btn plain", onclick: async e => {
          const btn = e.currentTarget, recs = await recAll();
          if (!recs.length){ btn.textContent = "None saved yet"; return; }
          btn.textContent = "Preparing…";
          const out = [];
          for (const r of recs){ const {wav, ...rest} = r; out.push({...rest, wav: wav ? await blobB64(wav) : ""}); }
          const a = h("a", {href: URL.createObjectURL(new Blob([JSON.stringify({recordings: out, log}, null, 1)], {type:"application/json"})), download:`drill-room-recordings-${new Date().toISOString().slice(0,10)}.json`});
          document.body.append(a); a.click(); a.remove(); btn.textContent = "Download recordings";
        }, text:"Download recordings"}))),
  );
  layer.replaceChildren(h("div", {class:"scrim", onclick:e => { if (e.target === e.currentTarget) close(); }}, sheet));
  sheet.querySelector("button").focus();
}

/* ---------- Accounts ---------- */
const initials = n => (n||"?").split(/[\s@._-]+/).filter(Boolean).slice(0,2).map(w => w[0].toUpperCase()).join("") || "?";
function syncLabel(){
  const s = Cloud.status;
  if (s === "error") return "Couldn't sync. Will retry";
  if (s === "pending" || s === "saving") return "Saving…";
  if (s === "loading") return "Loading your progress…";
  if (Cloud.lastSync){ const m = Math.round((Date.now() - Cloud.lastSync)/60000); return m < 1 ? "Synced just now" : `Synced ${m} min ago`; }
  return "Synced";
}
function renderAccountRow(){
  const b = $("navAccount"); if (!b) return;
  b.hidden = !Cloud.enabled; if (!Cloud.enabled) return;
  const tb = $("topAccount");
  if (tb){
    tb.hidden = false; tb.classList.toggle("on", !!Cloud.user);
    tb.replaceChildren(...(Cloud.user ? [h("span", {class:"avatar on", text: initials(Cloud.name())}), h("span", {class:"lbl", text: Cloud.name()})] : [h("span", {text:"Sign in"})]));
  }
  b.replaceChildren();
  if (Cloud.user){
    b.append(h("span", {class:"avatar on", text: initials(Cloud.name())}),
      h("span", {class:"who"}, h("b", {text: Cloud.name()}), h("small", null, h("span", {class:"syncdot " + Cloud.status}), syncLabel())));
  } else {
    b.append(h("span", {class:"avatar", html: ic("person")}), h("span", {class:"who"}, h("b", {text:"Sign in"}), h("small", {text:"Save progress to your account"})));
  }
}
$("navAccount").onclick = () => openAccount(Cloud.user ? "profile" : "signin");
$("topAccount").onclick = () => openAccount(Cloud.user ? "profile" : "signin");
setInterval(() => { if (Cloud.user) renderAccountRow(); }, 30000);

function readGuest(){
  const g = k => { try{ return JSON.parse(localStorage.getItem("sdr:"+k)); }catch{ return null; } };
  return {progress: g("progress") || {}, history: g("history") || [], custom: g("custom") || [], log: g("log") || []};
}
function clearGuest(){ try{ ["progress","history","custom","log"].forEach(k => localStorage.removeItem("sdr:"+k)); }catch{} }

Cloud.on(e => {
  if (e.type === "signin"){
    acctPrefix = "sdr:u:" + e.user.id + ":"; loadAccountData();
    try{ localStorage.setItem("sdr:welcomed", "1"); }catch{}
    if ($("layer").querySelector("[data-auth]")) $("layer").replaceChildren();
    render();
  } else if (e.type === "remote"){
    let local = {progress, history, custom, log};
    if (e.first){
      const guest = readGuest();
      if (Object.keys(guest.progress).length || guest.history.length){ local = Cloud.merge(local, guest); clearGuest(); }
    }
    const remote = e.data || {};
    const merged = Cloud.merge(remote, local);
    writeAccountData(merged);
    const changed = JSON.stringify(merged.history.length) !== JSON.stringify((remote.history||[]).length) || Object.keys(merged.progress).length !== Object.keys(remote.progress||{}).length;
    if (changed || !e.data) Cloud.queueSave();
    render();
  } else if (e.type === "bank"){
    useBanks(e.data || {}); state.current = null; render();
  } else if (e.type === "signout"){
    useBanks(PAGE_BANKS);
    acctPrefix = "sdr:"; loadAccountData(); state.current = null; render();
  } else if (e.type === "recovery"){
    openAccount("newpassword");
  } else if (e.type === "ready"){
    // First visit: show what this is and how it works, not a sign-in wall. Signing in is offered
    // later, after the first graded answer, when saving progress actually means something.
    let seen = false; try{ seen = localStorage.getItem("sdr:welcomed") === "1"; }catch{}
    if (!Cloud.user && !seen && !history.length){ state.view = "home"; render(); }
  }
  renderAccountRow();
});

/* Private question bank: stored in the account (readable only by its owner) and loaded
   on sign-in. Shown once one is loaded, or when the page is opened with #privatebank. */
let privateCollectionInfo = null;
Cloud.on(e => { if (e.type === "bank"){ const d = e.data || {}; privateCollectionInfo = {guides: GUIDES.length, practice: PRACTICE.length}; } else if (e.type === "signout") privateCollectionInfo = null; });
function privateBankRow(){
  if (!Cloud.enabled || !Cloud.user || !(privateCollectionInfo || /privatebank/.test(location.hash))) return null;
  const msg = h("div", {class:"grpfoot", text: privateCollectionInfo
    ? `Loaded from your account: ${[privateCollectionInfo.guides && privateCollectionInfo.guides + " study-guide", privateCollectionInfo.practice && privateCollectionInfo.practice + " extended-practice"].filter(Boolean).join(" and ")} questions. Only your account can read it.`
    : "Upload a bank file (private-bank.json). It's stored in your account, only you can read it, and it loads whenever you sign in."});
  const file = h("input", {type:"file", accept:".json,application/json", hidden:true, onchange: async e => {
    const f = e.target.files[0]; if (!f) return;
    msg.textContent = "Uploading…";
    try{
      const bank = normalizePrivateBank(JSON.parse(await f.text()));
      if (!Array.isArray(bank.guides) && !Array.isArray(bank.practice)) throw new Error("That file has no question bank in it.");
      await Cloud.saveBank(bank);
      msg.textContent = `Saved to your account: ${[(bank.guides||[]).length && (bank.guides||[]).length + " study-guide", (bank.practice||[]).length && (bank.practice||[]).length + " extended-practice"].filter(Boolean).join(" and ")} questions.`;
    }catch(err){ msg.textContent = "Couldn't save it: " + (/row-level security|policy/i.test(err.message||"") ? "only the owner account can store a private bank." : err.message || err); }
    e.target.value = "";
  }});
  return h("div", null,
    h("div", {class:"grphead", text:"Private question bank"}),
    h("div", {class:"list grp"}, h("div", {class:"setrow"}, h("label", {text: privateCollectionInfo ? "Your private bank is on" : "No private bank yet"}),
      h("button", {class:"btn tint", onclick:() => file.click(), text: privateCollectionInfo ? "Replace" : "Upload"}), file)),
    msg);
}

function openAccount(mode){
  closeDrawer();
  const layer = $("layer");
  const close = () => { layer.replaceChildren(); document.removeEventListener("keydown", esc); try{ localStorage.setItem("sdr:welcomed","1"); }catch{} render(); };
  const esc = e => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", esc);
  const msg = h("div", {class:"authmsg", role:"status"});
  const say = (t, good) => { msg.textContent = t; msg.className = "authmsg " + (good ? "good" : "bad"); };
  const busy = (btn, on, label) => { btn.disabled = on; if (label) btn.textContent = label; };
  const field = (type, ph, auto) => h("input", {class:"field", type, placeholder:ph, autocomplete:auto, "aria-label":ph, required:true});
  const friendly = e => {
    const m = (e && e.message) || "Something went wrong.";
    if (/invalid login/i.test(m)) return "Wrong email or password.";
    if (/email not confirmed/i.test(m)) return "Confirm your email first. Check your inbox for the link.";
    if (/already registered|already exists/i.test(m)) return "That email already has an account. Sign in instead.";
    if (/password/i.test(m) && /6|short|weak/i.test(m)) return "Use a password with at least 8 characters.";
    if (/rate limit/i.test(m)) return "Too many tries. Wait a minute and try again.";
    return m;
  };
  let body;
  const head = (title) => h("div", {class:"sheethead"}, h("span"), h("b", {id:"acctTitle", text:title}), h("button", {class:"tbtn", onclick:close, text: mode === "welcome" ? "Not now" : "Done", style:{fontWeight:600}}));

  if (mode === "profile" && Cloud.user){
    const name = h("input", {class:"field", value: Cloud.name(), "aria-label":"Name", autocomplete:"name"});
    const n = Object.keys(progress).length;
    body = [head("Account"),
      h("div", {class:"authhero"}, h("div", {class:"avatar big on", text: initials(Cloud.name())}), h("h2", {text: Cloud.name()}), h("p", {text: Cloud.user.email})),
      h("div", {class:"grphead", text:"Profile"}),
      h("div", {class:"authform"}, h("div", {class:"list"}, h("div", {class:"li"}, name))),
      h("div", {class:"row", style:{margin:"0 32px"}}, h("button", {class:"btn tint", onclick: async ev => { const b = ev.currentTarget; busy(b, true); try{ await Cloud.updateName(name.value.trim()); say("Name saved.", true); renderAccountRow(); }catch(e){ say(friendly(e)); } busy(b, false); }, text:"Save name"})),
      h("div", {class:"grphead", text:"Sync"}),
      h("div", {class:"list grp"}, h("div", {class:"setrow"}, h("label", null, h("span", {class:"syncdot " + Cloud.status}), syncLabel()), h("span", {class:"t-gray", text: `${n} question${n===1?"":"s"} tracked`}))),
      h("div", {class:"grpfoot", text:"Your progress follows you to any device where you sign in."}),
      msg,
      h("div", {class:"authactions"}, h("button", {class:"btn danger", onclick: async () => { await Cloud.signOut(); close(); }, text:"Sign out"}))];
  } else if (mode === "newpassword"){
    const pw = field("password", "New password", "new-password");
    const go = h("button", {class:"btn fill lg", type:"submit", text:"Save new password"});
    body = [head("New password"),
      h("div", {class:"authhero"}, h("h2", {text:"Choose a new password"}), h("p", {text:"At least 8 characters."})),
      h("form", {class:"authform", onsubmit: async e => { e.preventDefault(); if (pw.value.length < 8) return say("Use at least 8 characters."); busy(go, true); try{ await Cloud.setPassword(pw.value); say("Password updated. You're signed in.", true); setTimeout(close, 900); }catch(err){ say(friendly(err)); } busy(go, false); }},
        h("div", {class:"list"}, h("div", {class:"li"}, pw)), msg, h("div", {class:"authactions"}, go))];
  } else {
    let tab = mode === "signup" ? "signup" : "signin";
    if (mode === "reset") tab = "reset";
    const name = field("text", "Name", "name"), email = field("email", "Email", "email"), pw = field("password", "Password", tab === "signup" ? "new-password" : "current-password");
    name.required = false;
    const go = h("button", {class:"btn fill lg", type:"submit"});
    const seg = h("div", {class:"seg", role:"group", "aria-label":"Account", style:{display:"grid", margin:"4px 16px 14px"}});
    const paint = () => {
      seg.replaceChildren(...[["signin","Sign in"],["signup","Create account"]].map(([k,n]) => h("button", {type:"button", "aria-pressed": String(tab===k), onclick:() => { tab = k; msg.textContent = ""; paint(); }, text:n})));
      seg.hidden = tab === "reset";
      nameRow.hidden = tab !== "signup"; pwRow.hidden = tab === "reset";
      pw.autocomplete = tab === "signup" ? "new-password" : "current-password";
      go.textContent = tab === "signup" ? "Create account" : tab === "reset" ? "Email me a reset link" : "Sign in";
      forgot.hidden = tab !== "signin";
      back.hidden = tab !== "reset";
    };
    const nameRow = h("div", {class:"li"}, name), pwRow = h("div", {class:"li"}, pw);
    const forgot = h("button", {type:"button", class:"btn plain", onclick:() => { tab = "reset"; msg.textContent = ""; paint(); }, text:"Forgot password?"});
    const back = h("button", {type:"button", class:"btn plain", onclick:() => { tab = "signin"; msg.textContent = ""; paint(); }, text:"Back to sign in"});
    const submit = async e => {
      e.preventDefault();
      const em = email.value.trim();
      if (!/^\S+@\S+\.\S+$/.test(em)) return say("Enter a valid email.");
      if (tab !== "reset" && pw.value.length < (tab === "signup" ? 8 : 1)) return say(tab === "signup" ? "Use a password with at least 8 characters." : "Enter your password.");
      busy(go, true);
      try{
        if (tab === "signin"){ await Cloud.signIn(em, pw.value); say("Signed in.", true); }
        else if (tab === "signup"){ const r = await Cloud.signUp(em, pw.value, name.value.trim()); if (r.needsConfirm) say("Check your email and tap the link to confirm, then sign in here.", true); else say("Account created.", true); }
        else { await Cloud.reset(em); say("If that email has an account, a reset link is on its way.", true); }
      }catch(err){ say(friendly(err)); }
      busy(go, false); paint();
    };
    body = [head(mode === "welcome" ? "Welcome" : "Account"),
      h("div", {class:"authhero"}, h("div", {class:"avatar big", html: ic("person")}),
        h("h2", {text: mode === "welcome" ? "Save your progress" : "Sign in to sync"}),
        h("p", {text:"Create a free account to keep your scores and mastery on every device."})),
      seg,
      h("form", {class:"authform", onsubmit: submit, novalidate:true}, h("div", {class:"list"}, nameRow, h("div", {class:"li"}, email), pwRow), msg,
        h("div", {class:"authactions"}, go, h("div", {class:"row", style:{justifyContent:"center"}}, forgot, back),
          mode === "welcome" ? h("button", {type:"button", class:"btn plain", onclick: close, text:"Continue without an account"}) : null))];
    paint();
  }
  const sheet = h("div", {class:"sheet", role:"dialog", "aria-modal":"true", "aria-labelledby":"acctTitle", "data-auth":""}, ...body);
  layer.replaceChildren(h("div", {class:"scrim", onclick:e => { if (e.target === e.currentTarget) close(); }}, sheet));
  const f = sheet.querySelector("input:not([hidden])"); if (f && mode !== "profile") setTimeout(() => f.focus(), 50);
}

/* ---------- Keyboard ---------- */
document.addEventListener("keydown", e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName || "");
  if (typing || e.metaKey || e.ctrlKey || e.altKey || $("layer").children.length) return;
  if ((state.view === "drill" || state.view === "mock") && e.key === " " && $("recBtn")){ e.preventDefault(); mic.on ? stopMic() : startMic(); }
  if ((state.view === "drill") && e.key.toLowerCase() === "n"){ pickNext(); }
});

/* ---------- Boot ---------- */
if (!TRACKS.some(t => t.id === state.track)) state.track = "acct";
if (!filtered().some(q => q.t === state.track)) state.track = (filtered()[0]||{}).t || "acct";
const first = filtered().find(q => q.t === state.track && !progress[q.id]) || filtered().find(q => q.t === state.track);
if (first) showQuestion(first, {render:false, speak:false});   // browsers block speech before a tap
render();

/* ---------- New version check ----------
   A tab left open keeps running the version it loaded. Every few minutes, and when you come
   back to the tab, check the live page; if the code changed, offer a one-tap reload. */
(function checkForUpdate(){
  if (!window.SDR_BUILD || location.protocol === "file:") return;
  let shown = false;
  const check = async () => {
    if (shown || mic.on) return;
    try{
      const res = await fetch(location.pathname + "?v=" + Date.now(), {cache:"no-store"});
      const m = (await res.text()).match(/window\.SDR_BUILD = "([0-9a-f]+)"/);
      if (!m || m[1] === window.SDR_BUILD) return;
      shown = true;
      const bar = h("div", {role:"status", class:"updbar"},
        h("span", {class:"dot"}),
        h("span", {text:"A new version of Superday Room is ready."}),
        h("button", {class:"btn fill", onclick:() => location.reload(), text:"Reload"}),
        h("button", {class:"btn plain", onclick:() => bar.remove(), text:"Later"}));
      document.body.append(bar);
    }catch{}
  };
  setInterval(check, 5 * 60e3);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") check(); });
  setTimeout(check, 20e3);
})();

})();