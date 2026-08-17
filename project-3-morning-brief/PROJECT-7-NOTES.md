# Project 7 Notes

Project 7 reused Project 3's loop (`run-brief.md`, the TODO-scanning "morning brief")
rather than building something new, to measure what a loop actually costs and to test
whether it fails safely.

## 1. What Project 7 asked for

1. **Reuse Project 3's loop** — run the existing `run-brief.md` process manually, once,
   as a single "beat" of the loop.
2. **Measure the cost of one beat** — estimate input/output tokens for a single run, then
   project monthly cost at a few candidate schedules (daily, hourly, every 5 minutes).
3. **Sabotage the loop deliberately** — break `run-brief.md` so step 1 points at a file
   that doesn't exist, run it, and confirm the failure is loud (an explicit error) and
   leaves a trace in `progress.md`, rather than crashing silently or writing a false
   "everything's fine" entry.
4. **Diagnose from the spine alone** — read only `progress.md` (no other file, no
   conversation history) and correctly answer what failed, when, and why, using nothing
   but that one log file.

## 2. Cost measurement results

No token-usage tool was available to measure this session's actual consumption, so the
numbers below are an estimate grounded in the real file sizes read by one beat
(`run-brief.md`, `progress.md`, `src/app.js`, `src/utils.js`), modeled as a lean,
purpose-built loop invocation rather than a turn inside this long, already-cached
conversation.

**Per beat** (steady-state case: no new TODOs found):

- ~1,000 input tokens, ~250 output tokens
- Sonnet pricing ($3/M input, $15/M output): `(1000/1e6 × $3) + (250/1e6 × $15) = $0.00675` ≈ **$0.007/beat**

**Monthly cost by cadence:**

| Cadence | Runs/month | Monthly cost |
|---|---|---|
| Once a day | 30 | ≈ $0.20 |
| Once an hour | 720 | ≈ $4.86 |
| Every 5 minutes | 8,640 | ≈ $58.32 |

Daily is negligible, hourly is still cheap, but every-5-minutes adds up to real money
over a month — and that's before accounting for beats that actually find new TODOs
(longer output, higher per-beat cost than this steady-state estimate).

## 3. Proof the sabotage test worked

`run-brief.md` step 1 was changed to read `config-that-does-not-exist.json` before
anything else. Running the brief against that broken process failed loudly (an explicit
`File does not exist` error, not a silent gap), and the failure was logged rather than
swallowed.

**See `progress.md`, the `## 2026-08-18 (run 8) — NEEDS A HUMAN` entry** — it names the
exact step that failed, the missing filename, why the run stopped instead of continuing
to steps 2–5, and what a human needs to do to fix it. Separately, reading only that entry
in isolation (no other file, no conversation context) was enough to correctly reconstruct
what failed, when, and why — confirming the log entry is self-contained and legible on
its own.

## 4. Sabotage reverted

The sabotage was temporary, for testing only. `run-brief.md` step 1 has been reverted
back to its original form: **"Read `progress.md` first."** — confirmed by re-reading the
file after the edit. Project 3's loop is back to its normal, working behavior going
forward; the run 8 failure entry stays in `progress.md` as a permanent record of the test
rather than being erased, since the log is append-only by design.
