/* ==========================================================================
   Cloud accounts (Supabase). Optional: without window.SDR_CONFIG the app
   runs exactly as before, saving to this browser only.
   One row per user in public.progress holds {progress, history, custom, log}.
   ========================================================================== */
const Cloud = (() => {
  const cfg = window.SDR_CONFIG || {};
  const enabled = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase && window.supabase.createClient);
  const client = enabled ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {auth:{persistSession:true, autoRefreshToken:true, detectSessionInUrl:true}}) : null;
  let user = null, status = "idle", lastSync = 0, timer = null, pulledAt = null, replaceNext = false;
  const listeners = new Set();
  const emit = (evt) => listeners.forEach(fn => { try{ fn(evt); }catch(e){ console.error(e); } });

  // Merge two snapshots so nothing is lost when the same account is used on two devices.
  function merge(a, b){
    a = a || {}; b = b || {};
    const progress = {...(a.progress||{})};
    for (const [id, p] of Object.entries(b.progress||{})){
      const cur = progress[id];
      if (!cur || (p.last||0) > (cur.last||0)) progress[id] = p;
    }
    const seen = new Set(), history = [];
    for (const x of [...(a.history||[]), ...(b.history||[])].sort((x,y) => x.ts - y.ts)){
      const k = x.id + "@" + x.ts; if (seen.has(k)) continue; seen.add(k); history.push(x);
    }
    const custom = [...(a.custom||[])];
    for (const q of (b.custom||[])) if (!custom.some(c => c.id === q.id)) custom.push(q);
    // Practice log: one entry per graded answer; the newer edit of the same entry wins.
    const byKey = new Map();
    for (const x of [...(a.log||[]), ...(b.log||[])]){ const k = x.id + "@" + x.ts, cur = byKey.get(k); if (!cur || (x.upd||0) > (cur.upd||0)) byKey.set(k, x); }
    const log = [...byKey.values()].sort((x,y) => x.ts - y.ts).slice(-300);
    return {progress, history: history.slice(-500), custom, log};
  }

  async function pull(){
    if (!client || !user) return null;
    const {data, error} = await client.from("progress").select("data, updated_at").eq("user_id", user.id).maybeSingle();
    if (error) throw error;
    pulledAt = data ? data.updated_at : null;
    return data ? data.data : null;
  }
  async function push(snapshot){
    if (!client || !user) return;
    status = "saving"; emit({type:"status"});
    // Merge with what the server already has, so a stale tab or device never overwrites newer progress.
    if (replaceNext) replaceNext = false;   // "Reset all progress": send the empty copy as is
    else try{ const remote = await pull(); if (remote) snapshot = merge(remote, snapshot); }catch{}
    const {error} = await client.from("progress").upsert({user_id:user.id, data:snapshot, updated_at:new Date().toISOString()});
    if (error){ status = "error"; emit({type:"status", error}); return; }
    status = "saved"; lastSync = Date.now(); emit({type:"status"});
  }

  let getSnapshot = () => ({});
  function queueSave(){
    if (!user) return;
    clearTimeout(timer);
    status = "pending"; emit({type:"status"});
    timer = setTimeout(() => push(getSnapshot()), 1200);
  }
  function flush(){ if (user && timer){ clearTimeout(timer); timer = null; push(getSnapshot()); } }
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(); else refresh(); });

  // Pick up changes made on another device when this tab comes back into focus.
  async function refresh(){
    if (!client || !user) return;
    try{
      const {data} = await client.from("progress").select("updated_at").eq("user_id", user.id).maybeSingle();
      if (data && data.updated_at !== pulledAt && Date.now() - lastSync > 3000){
        const remote = await pull();
        emit({type:"remote", data: remote});
      }
    }catch{}
  }

  // A private question bank, readable only by its owner (public.private_bank, row-level security).
  async function pullBank(){
    if (!client || !user) return null;
    const {data, error} = await client.from("private_bank").select("data, updated_at").eq("user_id", user.id).maybeSingle();
    if (error) return null;            // table missing or no access: carry on with the page's own banks
    return data ? data.data : null;
  }

  async function onSession(session, event){
    const prev = user;
    user = session ? session.user : null;
    if (event === "PASSWORD_RECOVERY"){ emit({type:"recovery"}); }
    if (user && (!prev || prev.id !== user.id)){
      pullBank().then(bank => { if (bank) emit({type:"bank", data: bank}); });
      status = "loading"; emit({type:"signin", user});
      try{ const remote = await pull(); emit({type:"remote", data: remote, first:true}); status = "saved"; lastSync = Date.now(); }
      catch(e){ status = "error"; emit({type:"status", error:e}); }
      emit({type:"status"});
    }
    if (!user && prev) emit({type:"signout"});
    if (event === "INITIAL") emit({type:"ready"});
  }
  if (client){
    client.auth.getSession().then(({data}) => onSession(data.session, "INITIAL"));
    // Run our handler after the auth callback returns: making Supabase requests inside
    // onAuthStateChange deadlocks the client (every later query waits forever).
    client.auth.onAuthStateChange((event, session) => { setTimeout(() => onSession(session, event), 0); });
  }

  const redirect = () => location.origin + location.pathname;
  return {
    enabled, merge, queueSave, flush,
    replaceNext(){ replaceNext = true; },
    // Supabase Edge Functions (e.g. "transcribe"): open to anyone using the page. They only need
    // the address and public key, not the accounts library, so they work even if it didn't load.
    hasFunctions: !!(cfg.supabaseUrl && cfg.supabaseAnonKey),
    functionUrl: name => cfg.supabaseUrl + "/functions/v1/" + name,
    functionHeaders: () => ({apikey: cfg.supabaseAnonKey}),
    on: fn => listeners.add(fn),
    setSnapshot: fn => { getSnapshot = fn; },
    get user(){ return user; }, get status(){ return status; }, get lastSync(){ return lastSync; },
    name(){ return user ? (user.user_metadata && user.user_metadata.name) || user.email.split("@")[0] : ""; },
    async signUp(email, password, name){
      const {data, error} = await client.auth.signUp({email, password, options:{data:{name}, emailRedirectTo: redirect()}});
      if (error) throw error;
      return {needsConfirm: !data.session};
    },
    async signIn(email, password){ const {error} = await client.auth.signInWithPassword({email, password}); if (error) throw error; },
    async reset(email){ const {error} = await client.auth.resetPasswordForEmail(email, {redirectTo: redirect()}); if (error) throw error; },
    async setPassword(password){ const {error} = await client.auth.updateUser({password}); if (error) throw error; },
    async updateName(name){ const {data, error} = await client.auth.updateUser({data:{name}}); if (error) throw error; user = data.user; emit({type:"status"}); },
    async signOut(){ flush(); await client.auth.signOut(); },
    async saveBank(bank){
      if (!client || !user) throw new Error("Sign in first.");
      const {error} = await client.from("private_bank").upsert({user_id:user.id, data:bank, updated_at:new Date().toISOString()});
      if (error) throw error;
      emit({type:"bank", data: bank});
    },
  };
})();
