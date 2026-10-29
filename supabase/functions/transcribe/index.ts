// Server-quality transcription for the Drill Room, open to anyone using the page (no sign-in).
// The page posts one recorded answer (WAV) plus a short prompt of the question's terms; this
// function forwards it to Groq's free Whisper large-v3-turbo with the key kept server-side.
//
// Deploy with JWT verification OFF (visitors aren't signed in). Secret: GROQ_API_KEY.
// Guards: only the Drill Room's own pages, audio size cap, and a per-visitor rate limit, so a
// stranger can't burn through the free quota (about 20 requests a minute for the whole project).

const ALLOWED = [
  "https://calebsamuel1026-blip.github.io",
  "http://127.0.0.1:8773", "http://localhost:8773", "http://127.0.0.1:8774",
];
const MAX_BYTES = 6_000_000;          // ~3 minutes of 16 kHz mono 16-bit audio
const PER_MINUTE = 6;                 // per visitor (IP)
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now(), recent = (hits.get(ip) || []).filter(t => now - t < 60_000);
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > PER_MINUTE;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  const okOrigin = ALLOWED.includes(origin);
  const cors: Record<string, string> = {
    "Access-Control-Allow-Origin": okOrigin ? origin : ALLOWED[0],
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  if (!okOrigin) return json({ error: "origin" }, 403);

  const key = Deno.env.get("GROQ_API_KEY");
  if (!key) return json({ error: "not_configured" }, 503);

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return json({ error: "busy" }, 429);

  let form: FormData;
  try { form = await req.formData(); } catch (e) { console.log("formData failed", String(e)); return json({ error: "bad_request" }, 400); }
  console.log("received audio", (form.get("file") as File | null)?.size);
  const file = form.get("file");
  if (!(file instanceof File) || !file.size) return json({ error: "no_audio" }, 400);
  if (file.size > MAX_BYTES) return json({ error: "too_long" }, 413);
  const prompt = String(form.get("prompt") || "").slice(0, 600);

  const fd = new FormData();
  fd.append("file", file, "answer.wav");
  fd.append("model", "whisper-large-v3-turbo");
  fd.append("language", "en");
  fd.append("temperature", "0");
  fd.append("response_format", "json");
  if (prompt) fd.append("prompt", prompt);

  let r: Response;
  try {
    r = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST", headers: { Authorization: `Bearer ${key}` }, body: fd, signal: AbortSignal.timeout(20_000),
    });
  } catch (e) { console.log("groq call failed", String(e)); return json({ error: "upstream_timeout" }, 504); }
  console.log("groq status", r.status);
  if (!r.ok) console.log("groq error body", (await r.clone().text()).slice(0, 300));
  if (r.status === 429) return json({ error: "busy" }, 429);
  if (!r.ok) return json({ error: "upstream", status: r.status }, 502);
  const out = await r.json();
  return json({ text: String(out.text || "").trim() });
});
