# Stress clips for the voice audit: answers spoken the way students really answer (walk-throughs
# with numbers, "part one / part two", pauses mid-answer, "um", a false start), each tied to the
# question it answers so the app's hint words match.  Output: stress\raw\*.wav + refs.json
# Then: python -I tests/speech/stress/variants.py  (quiet / noisy / clipped copies)
$dir = Join-Path $PSScriptRoot "raw"
New-Item -ItemType Directory -Force $dir | Out-Null
Add-Type -AssemblyName System.Speech
$items = @(
  @{ q = "iv-t-444"; ssml = "Um, so for part one, at the time of purchase, capital expenditures are not listed on the income statement. <break time='2500ms'/> On the cash flow statement it goes under cash flow from investing, so cash is down a hundred dollars. On the balance sheet, cash is down a hundred and P P and E is up a hundred, so it balances. <break time='3000ms'/> For part two, after one year, depreciation is ten dollars, so pre-tax income is down ten and net income is down seven fifty at a twenty five percent tax rate. You add back the ten of depreciation, so cash is up two fifty. P P and E is down ten, assets are down seven fifty, and retained earnings are down seven fifty.";
     text = "Um, so for part one, at the time of purchase, capital expenditures are not listed on the income statement. On the cash flow statement it goes under cash flow from investing, so cash is down a hundred dollars. On the balance sheet, cash is down a hundred and PP&E is up a hundred, so it balances. For part two, after one year, depreciation is ten dollars, so pre-tax income is down ten and net income is down seven fifty at a twenty five percent tax rate. You add back the ten of depreciation, so cash is up two fifty. PP&E is down ten, assets are down seven fifty, and retained earnings are down seven fifty." },
  @{ q = "iv-t-424"; ssml = "If you sell P P and E for a hundred dollars with a twenty dollar gain, pre-tax income goes up twenty, and with a twenty five percent tax rate, net income goes up fifteen. <break time='2000ms'/> On the cash flow statement, you start with fifteen, subtract the twenty dollar gain, and add the hundred of proceeds in cash flow from investing, so net cash is up ninety five. <break time='2500ms'/> On the balance sheet, cash is up ninety five, P P and E is down eighty, and retained earnings are up fifteen.";
     text = "If you sell PP&E for a hundred dollars with a twenty dollar gain, pre-tax income goes up twenty, and with a twenty five percent tax rate, net income goes up fifteen. On the cash flow statement, you start with fifteen, subtract the twenty dollar gain, and add the hundred of proceeds in cash flow from investing, so net cash is up ninety five. On the balance sheet, cash is up ninety five, PP&E is down eighty, and retained earnings are up fifteen." },
  @{ q = "iv-t-436"; ssml = "I would rather have ten dollars of cost savings, uh, because it goes straight to the bottom line. At a twenty five percent tax rate, that's seven fifty of net income. <break time='2000ms'/> Ten dollars of revenue only adds the margin, so if the margin is ten percent, that's just one dollar.";
     text = "I would rather have ten dollars of cost savings, uh, because it goes straight to the bottom line. At a twenty five percent tax rate, that's seven fifty of net income. Ten dollars of revenue only adds the margin, so if the margin is ten percent, that's just one dollar." },
  @{ q = "iv-t-56"; ssml = "Basic equity value is one hundred shares times ten dollars, so one thousand. The ten options are in the money, so the company gets fifty dollars and buys back five shares. <break time='3000ms'/> So diluted shares are one hundred five, and diluted equity value is one thousand fifty.";
     text = "Basic equity value is one hundred shares times ten dollars, so one thousand. The ten options are in the money, so the company gets fifty dollars and buys back five shares. So diluted shares are one hundred five, and diluted equity value is one thousand fifty." },
  @{ q = "iv-t-1148"; ssml = "So an unlevered, sorry, an unlevered D C F uses unlevered free cash flow, and you discount it at the whack, which gives you enterprise value. <break time='2000ms'/> A levered D C F uses levered free cash flow, after interest, and you discount it at the cost of equity, which gives you equity value directly.";
     text = "So an unlevered, sorry, an unlevered DCF uses unlevered free cash flow, and you discount it at the WACC, which gives you enterprise value. A levered DCF uses levered free cash flow, after interest, and you discount it at the cost of equity, which gives you equity value directly." },
  @{ q = "bw-accounting-23"; ssml = "Equity interests are when you own between twenty and fifty percent of another company. You don't consolidate it. <break time='2500ms'/> You record your share of its net income, so if you own thirty percent and it earns a hundred thousand, you record thirty thousand.";
     text = "Equity interests are when you own between twenty and fifty percent of another company. You don't consolidate it. You record your share of its net income, so if you own thirty percent and it earns a hundred thousand, you record thirty thousand." }
)
$voices = @("Microsoft David Desktop", "Microsoft Zira Desktop")
$fmt = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(16000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
$refs = @()
for ($i = 0; $i -lt $items.Count; $i++) {
  foreach ($rate in @(0, 4)) {
    $it = $items[$i]; $v = $voices[$i % 2]
    $name = "s$i-r$rate.wav"
    $s = New-Object System.Speech.Synthesis.SpeechSynthesizer
    $s.SelectVoice($v); $s.Rate = $rate
    $s.SetOutputToWaveFile((Join-Path $dir $name), $fmt)
    $s.SpeakSsml("<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><break time='1500ms'/>" + $it.ssml + "<break time='1500ms'/></speak>")
    $s.SetOutputToNull(); $s.Dispose()
    $refs += [pscustomobject]@{ file = $name; q = $it.q; rate = $rate; text = $it.text }
  }
}
$refs | ConvertTo-Json | Set-Content -Encoding utf8 (Join-Path $dir "refs.json")
"made $($refs.Count) clips"
