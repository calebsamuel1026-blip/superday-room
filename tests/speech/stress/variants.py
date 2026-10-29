"""Makes harder copies of the stress clips (normal-speed ones): quiet laptop mic, noisy room with
mains hum, and a clipped/distorted mic.  python -I tests/speech/stress/variants.py
Writes stress/clips/*.wav and stress/clips/list.json (file, q, text, condition)."""
import json, math, random, struct, wave
from pathlib import Path

HERE = Path(__file__).parent
RAW, OUT = HERE / "raw", HERE / "clips"
OUT.mkdir(exist_ok=True)
refs = json.loads((RAW / "refs.json").read_text(encoding="utf-8-sig"))
random.seed(7)


def read(p):
    with wave.open(str(p)) as w:
        n = w.getnframes()
        return [s / 32768 for s in struct.unpack("<%dh" % n, w.readframes(n))]


def write(p, x):
    with wave.open(str(p), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(16000)
        w.writeframes(b"".join(struct.pack("<h", int(max(-1, min(1, v)) * 32767)) for v in x))


def rms(x):
    return math.sqrt(sum(v * v for v in x) / len(x))


out = []
for r in refs:
    x = read(RAW / r["file"])
    stem = r["file"][:-4]
    conds = {"clean": x}
    if r["rate"] == 0:
        conds["quiet"] = [v * 0.04 for v in x]
        s = rms([v for v in x if abs(v) > 0.01] or x)
        noise = s / (10 ** (8 / 20))                                   # about 8 dB SNR
        conds["noisy"] = [v + random.gauss(0, noise) + 0.3 * noise * math.sin(2 * math.pi * 60 * i / 16000) for i, v in enumerate(x)]
        conds["clipped"] = [max(-0.35, min(0.35, v * 6)) for v in x]
    for c, y in conds.items():
        name = f"{stem}-{c}.wav"
        write(OUT / name, y)
        out.append({"file": name, "q": r["q"], "text": r["text"], "cond": c + ("-fast" if r["rate"] else "")})
(OUT / "list.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
print(len(out), "clips")
