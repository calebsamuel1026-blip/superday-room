"""Refresh the GitHub Pages repo folder from this project.

    python -I src/make_site.py

Builds the public copy (no extended practice content) and copies it, plus the source
files, into ../../superday-drill-room-site/. The personal question export
never leaves this folder.
"""
import pathlib, re, shutil, subprocess, sys

SRC = pathlib.Path(__file__).resolve().parent
ROOT = SRC.parent
SITE = ROOT.parent / "superday-drill-room-site"

subprocess.run([sys.executable, "-I", str(SRC / "build.py"), "--public"], check=True)
(SITE / "src").mkdir(parents=True, exist_ok=True)
(SITE / "supabase").mkdir(exist_ok=True)

shutil.copy2(ROOT / "public" / "index.html", SITE / "index.html")
shutil.copy2(ROOT / "supabase" / "schema.sql", SITE / "supabase" / "schema.sql")
for name in ["shell.html", "engine.js", "cloud.js", "app.js", "build.py", "make_site.py", "config.json"]:
    if (SRC / name).exists():
        shutil.copy2(SRC / name, SITE / "src" / name)
data = (SRC / "data.js").read_text(encoding="utf-8")
data = re.sub(r"(?ms)^const PRACTICE_BANK = \[.*\];\s*$", "const PRACTICE_BANK = [];\n", data)
(SITE / "src" / "data.js").write_text(data, encoding="utf-8")
(SITE / ".nojekyll").write_text("", encoding="utf-8")

for f in SITE.rglob("*"):
    if f.is_file() and ".git" not in f.parts and f.name not in ("build.py", "make_site.py"):
        text = f.read_text(encoding="utf-8", errors="ignore")
        assert "q-" not in text and "q-" not in text and "extended practice" not in text.lower(), f"extended practice content found in {f}"
        assert '"collection":"guides"' not in text and "q-" not in text and "guide-provider" not in text.lower(), f"GUIDES content found in {f}"
print(f"site ready at {SITE}")
