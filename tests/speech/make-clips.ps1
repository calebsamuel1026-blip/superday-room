# Makes test recordings for comparing speech models: two voices, two speeds.
# Output: tests\speech\clips\*.wav plus refs.json (what was actually said).
$dir = Join-Path $PSScriptRoot "clips"
New-Item -ItemType Directory -Force $dir | Out-Null
Add-Type -AssemblyName System.Speech
$texts = @(
  "If depreciation goes up by ten dollars, operating income falls by ten and net income falls by six at a forty percent tax rate. On the cash flow statement you add back the ten of depreciation, so cash is up four.",
  "To get from equity value to enterprise value, you add debt, preferred stock and noncontrolling interest, and you subtract cash. Enterprise value reflects the core operations available to all investors.",
  "In a leveraged buyout, the private equity firm funds the purchase with mostly debt, uses the company's free cash flow to pay down that debt, and exits in about five years. Leverage magnifies the IRR because the equity check is smaller.",
  "The WACC blends the cost of equity, the after tax cost of debt and the cost of preferred stock, weighted by market values. Higher leverage lowers the WACC at first because debt is cheaper, but too much raises the risk of default.",
  "An all stock deal is accretive when the buyer's P E multiple is higher than the seller's. You also look at synergies, the amortization of new intangibles and the interest on any new debt.",
  "Goodwill is not amortized. It is tested for impairment every year, and an impairment charge reduces net income and shareholders' equity, but it is a non cash charge that you add back on the cash flow statement."
)
$voices = @("Microsoft David Desktop", "Microsoft Zira Desktop")
$rates = @(0, 3)
$fmt = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(16000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
$refs = @()
for ($i = 0; $i -lt $texts.Count; $i++) {
  $v = $voices[$i % 2]; $r = $rates[[math]::Floor($i / 2) % 2]
  $name = "clip$i.wav"
  $s = New-Object System.Speech.Synthesis.SpeechSynthesizer
  $s.SelectVoice($v); $s.Rate = $r
  $s.SetOutputToWaveFile((Join-Path $dir $name), $fmt)
  $s.Speak($texts[$i]); $s.SetOutputToNull(); $s.Dispose()
  $refs += [pscustomobject]@{ file = $name; voice = $v; rate = $r; text = $texts[$i] }
}
$refs | ConvertTo-Json | Set-Content -Encoding utf8 (Join-Path $dir "refs.json")
"made $($texts.Count) clips"
