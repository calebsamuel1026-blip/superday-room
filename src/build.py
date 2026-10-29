"""Assemble the single-file app.

    python -I build.py            -> ../index.html  (personal copy, includes the extended practice bank)
    python -I build.py --public   -> ../public/index.html  (no extended practice or GUIDES content; safe to share)

Accounts are wired in only when src/config.json holds the Supabase project URL
and the public anon key: {"supabaseUrl": "...", "supabaseAnonKey": "..."}
"""
import json, pathlib, re, sys

SRC = pathlib.Path(__file__).resolve().parent
ROOT = SRC.parent
public = "--public" in sys.argv

shell = (SRC / "shell.html").read_text(encoding="utf-8")
data = (SRC / "data.js").read_text(encoding="utf-8")
if public:
    # Drop the personal extended practice export; keep TRACKS + the core BANK.
    data = re.sub(r"(?ms)^const PRACTICE_BANK = \[.*\];\s*$", "const PRACTICE_BANK = [];\n", data)
    assert "q-" not in data, "extended practice content leaked into public build"
# GUIDES guide questions are paid content: personal copy only.
guide_path = SRC / "data-guides.js"
if not public and guide_path.exists():
    data += "\n" + guide_path.read_text(encoding="utf-8")
if public:
    assert "GUIDE_BANK = [{" not in data and '"collection":"guides"' not in data, "GUIDES content leaked into public build"
# Full spoken model answers. The public build keeps only the core questions' answers.
say_path = SRC / "data-say.js"
if say_path.exists():
    parts = dict(re.findall(r"(?m)^const (SAY_\w+) = (.*);$", say_path.read_text(encoding="utf-8")))
    say = json.loads(parts.get("SAY_BANK", "{}"))
    check = json.loads(parts.get("SAY_CHECK", "{}"))
    personal = set(json.loads(parts.get("SAY_PERSONAL", "[]")))
    if public:
        # Shareable copy: only the core questions' answers; nothing from the paid banks.
        say = {k: v for k, v in say.items() if not k.startswith("q-") and k not in personal}
        check = {}
    data += ("\nconst SAY_BANK = " + json.dumps(say, ensure_ascii=False, separators=(",", ":")) + ";\n"
             "const SAY_CHECK = " + json.dumps(check, ensure_ascii=False, separators=(",", ":")) + ";\n")
    if public:
        assert '"q-' not in data, "extended practice answers leaked into public build"
# Alternate wordings of each question, shown in turn with the original so it can't be memorized.
reph_path = SRC / "data-rephrase.json"
reph = json.loads(reph_path.read_text(encoding="utf-8")) if reph_path.exists() else {}
if public:
    reph = {k: v for k, v in reph.items() if not k.startswith("q-")}
data += "\nconst REPHRASE = " + json.dumps(reph, ensure_ascii=False, separators=(",", ":")) + ";\n"
engine = (SRC / "engine.js").read_text(encoding="utf-8")
cloud = (SRC / "cloud.js").read_text(encoding="utf-8")
app = (SRC / "app.js").read_text(encoding="utf-8")

cfg_path = SRC / "config.json"
cfg = json.loads(cfg_path.read_text(encoding="utf-8")) if cfg_path.exists() else {}
cloud_head = ""
if cfg.get("supabaseUrl") and cfg.get("supabaseAnonKey"):
    assert "service_role" not in cfg["supabaseAnonKey"], "never ship the service_role key"
    conf = json.dumps({"supabaseUrl": cfg["supabaseUrl"], "supabaseAnonKey": cfg["supabaseAnonKey"]})
    cloud_head = ('<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js"></script>\n'
                  f"<script>window.SDR_CONFIG = {conf};</script>\n")

# A fingerprint of the code, so an open page can tell when a newer version is live.
import hashlib
build_id = hashlib.sha1((engine + cloud + app).encode("utf-8")).hexdigest()[:12]
script = lambda js: "<script>\n" + js + "\n</script>"
out = (shell.replace("<!--@DATA-->", script(data))
            .replace("<!--@ENGINE-->", script(engine) + "\n" + cloud_head + script(cloud))
            .replace("<!--@APP-->", script(f'window.SDR_BUILD = "{build_id}";\n' + app)))
dest = ROOT / "public" / "index.html" if public else ROOT / "index.html"
dest.parent.mkdir(exist_ok=True)
dest.write_text(out, encoding="utf-8")
# The service worker that lets speech recognition use every CPU core sits next to the page.
if (SRC / "sw.js").exists():
    (dest.parent / "sw.js").write_text((SRC / "sw.js").read_text(encoding="utf-8"), encoding="utf-8")
print(f"wrote {dest} ({dest.stat().st_size:,} bytes){' with accounts' if cloud_head else ''}")
