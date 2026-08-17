# Project 7 — Break it on purpose

**Loop Engineering, Concept 13 (cost) + Concept 14 (observability).**

This project does **not** contain new code. Per the course's instructions to "take your
Project 3 loop," Project 7's work was performed directly on
[`project-3-morning-brief`](../project-3-morning-brief) — its existing TODO-scanning
"morning brief" loop (`run-brief.md` + `progress.md`) — rather than building a new one
from scratch. This README documents what was done there and why.

## Part A — Cost measurement

No token-usage tool was available to measure the session's actual consumption, so this
is an estimate grounded in the real file sizes read by one beat of the loop
(`run-brief.md`, `progress.md`, `src/app.js`, `src/utils.js`), modeled as a lean,
purpose-built loop invocation.

**Per beat** (steady-state case: no new TODOs found):

- ~1,000 input tokens, ~250 output tokens
- ≈ **$0.007/beat** (Sonnet pricing: $3/M input, $15/M output)

**Monthly cost by cadence:**

| Cadence | Runs/month | Monthly cost |
|---|---|---|
| Once a day | 30 | ≈ $0.20 |
| Once an hour | 720 | ≈ $4.86 |
| Every 5 minutes | 8,640 | ≈ $58.32 |

**Cost scales with frequency, not with the command itself.** The work done by a single
beat is identical no matter how often it fires — what changes the monthly bill is purely
how many times that same fixed-cost beat runs. Daily is negligible, hourly is still
cheap, but every-5-minutes turns a $0.007 action into real monthly spend just by firing
288x more often than daily.

## Part B — Sabotage test

**What was broken:** `run-brief.md` step 1 was changed from "Read `progress.md` first"
to instead read `config-that-does-not-exist.json` first, before anything else — a file
that was never created.

**What happened:** the run failed loudly — an explicit `File does not exist` error, not
a silent gap, not a fabricated result. The run was stopped at step 1 rather than
continuing on to steps 2–5 and producing a "No new TODOs found" entry that would have
looked identical to a real, successful check.

**Proof — copied verbatim from `project-3-morning-brief/progress.md`:**

> ## 2026-08-18 (run 8) — NEEDS A HUMAN
>
> **Run failed at step 1.** `run-brief.md` step 1 says: "Read
> `config-that-does-not-exist.json` first, before anything else." That file does
> not exist in this project — the read failed with `File does not exist.`
>
> The run stopped here. Steps 2–5 (scanning `src/` for TODOs, diffing against
> this log, and reporting) were never reached, so this entry is **not** a "no
> new TODOs found" result — it means the check did not actually run this time.
> No TODO data should be trusted as current until this is fixed.
>
> **Likely cause:** `run-brief.md` step 1 was edited to point at a file that
> was never created — either the filename is wrong, or the file needs to be
> added to the project.
>
> **Action needed:** a human should either (a) create
> `config-that-does-not-exist.json`, or (b) fix step 1 in `run-brief.md` to
> point at a file that actually exists (e.g. revert to reading `progress.md`
> first). Once fixed, re-run the brief to get a real result for this date.

**Diagnosed from the spine alone:** the failure was later diagnosed using *only*
`progress.md` — no other file, no conversation history, no replay of the run. Given just
that log entry cold, the diagnosis correctly identified what failed (step 1's file read),
when (run 8, 2026-08-18), and why (the target file doesn't exist) — confirming the entry
is self-contained and legible on its own, which is the entire point of writing a loud,
explicit failure record instead of letting it fail silently.

## Done criteria confirmed

- ✅ **Spine-only diagnosis works** — `progress.md` alone, read fresh with no other
  context, was sufficient to correctly answer what failed, when, and why.
- ✅ **Clear "needs a human" note** — the run 8 entry above explicitly flags itself as
  needing human attention, distinguishes itself from a normal result, and states the
  exact fix required.
- ✅ **Known monthly cost** — per-beat and monthly figures at three cadences are
  calculated above (Part A).

## Cleanup note

`run-brief.md` step 1 was already reverted back to its original form —
**"Read `progress.md` first."** — confirmed by re-reading the file before writing this
README. Project 3's loop is back to its normal, working behavior going forward. The run 8
failure entry was left in place in `progress.md` as a permanent record of the test,
rather than being erased, since that log is append-only by design.
