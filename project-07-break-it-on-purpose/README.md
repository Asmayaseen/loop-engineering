# Project 7 — Break It On Purpose

**Difficulty:** hard · **Concept(s):** Concept 13 — Cost (measuring what a loop actually spends) · Concept 14 — Observability (failing loud, not silent)

## What This Project Does

This project contains no new code of its own. Per the course's instruction to "take your
Project 3 loop," Project 7 was performed directly against
[`../project-03-morning-brief`](../project-03-morning-brief) — its existing TODO-scanning
"morning brief" loop (`run-brief.md` + `progress.md`) — to measure what one beat of a real
loop costs, and to deliberately sabotage it to confirm it fails loudly instead of silently.

## The Problem It Solves

A loop you can't cost or can't trust to fail visibly is a loop you can't safely leave
running. Without a cost estimate, "just run it every 5 minutes" is a decision made blind. And
without proof that a broken loop fails loud, a silent failure can masquerade as a normal
"nothing changed" result for weeks before anyone notices.

## How It Works

Two independent exercises, both against Project 3's existing loop:

1. **Cost measurement** — with no token-usage tool available, the estimate was grounded in
   the real file sizes one beat actually reads (`run-brief.md`, `progress.md`, `src/app.js`,
   `src/utils.js`), modeled as a lean, purpose-built invocation rather than a turn inside a
   long cached conversation.
2. **Sabotage test** — `run-brief.md` step 1 was deliberately changed from "Read
   `progress.md` first" to instead read a file that was never created
   (`config-that-does-not-exist.json`), then the brief was run against that broken process to
   see whether it failed loud or silently produced a false "all clear."

## Files In This Folder

| File | Purpose |
|---|---|
| `README.md` | This file — documents what was done to `project-03-morning-brief` and why |

(All code, `run-brief.md`, and `progress.md` for this exercise live in
`../project-03-morning-brief/` — see that project's own README for the mechanism itself.)

## How To Run It

There's nothing to run in this folder directly. To reproduce:
```
cd ../project-03-morning-brief
# read run-brief.md, src/app.js, src/utils.js, progress.md
# estimate tokens for one beat, project monthly cost at a few cadences
# then deliberately break run-brief.md step 1 and re-run the brief
```

## What I Observed

**Cost, steady-state beat (no new TODOs found):** ~1,000 input tokens, ~250 output tokens →
`(1000/1e6 × $3) + (250/1e6 × $15) = $0.00675` ≈ **$0.007/beat** on Sonnet pricing.

| Cadence | Runs/month | Monthly cost |
|---|---|---|
| Once a day | 30 | ≈ $0.20 |
| Once an hour | 720 | ≈ $4.86 |
| Every 5 minutes | 8,640 | ≈ $58.32 |

**Sabotage result:** the run failed loudly with an explicit `File does not exist` error at
step 1, rather than continuing on to produce a fabricated "no new TODOs" entry. It was logged
verbatim in `project-03-morning-brief/progress.md` as `## 2026-08-18 (run 8) — NEEDS A
HUMAN`, naming the exact step that failed, the missing filename, and what a human needs to
do. Reading *only* that log entry — no other file, no conversation context — was enough to
correctly reconstruct what failed, when, and why, confirming the entry is self-contained.
`run-brief.md` was then reverted back to "Read `progress.md` first," confirmed by re-reading
the file; the run 8 entry itself was left in place as a permanent record, since the log is
append-only by design.

## Key Lesson

Cost scales with frequency, not with what a single beat does — a $0.007 beat is negligible
daily but turns into real monthly spend at high frequency purely from firing more often. And
a loop's failure mode matters as much as its success mode: failing loud into a durable,
self-contained log entry is what makes a broken loop safe to run unattended.
