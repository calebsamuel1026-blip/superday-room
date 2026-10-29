# Superday Drill Room

Private investment banking interview practice app with microphone input, coaching, mastery tracking, optional Claude review, and Supabase progress sync.

Open `index.html` in Chrome or Edge. Rebuild with `python -I src/build.py` or `python -I src/make_site.py`.

## Question banks

- Extended practice: 2,143 technical and 382 behavioral questions with answers and tags. Raw export: `practice-bank-export.json`; app data: `src/data.js`.
- Study guides: 411 questions with answers, guide pages, and study links covering accounting, enterprise value, DCF, merger models, and LBOs. Raw export: `guides/guide-bank.json`; app data: `src/data-guides.js`.
- Original drill questions are also retained.

Paid materials are for personal use. Keep this repository private. GitHub Pages is disabled. The previous public website URL no longer serves this version. Private repository visibility alone does not ensure private website hosting.

`python -I src/build.py --public` creates an optional core-only copy in `public/index.html`, excluding both paid banks.

Supabase uses its public anon key in `src/config.json`; database setup is in `supabase/schema.sql`. Optional Anthropic API keys are entered in browser settings.
