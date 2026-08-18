# Project 3 — Morning Brief

**Concept:** The spine (an append-only log a loop reads and writes every run)

## What it does

`run-brief.md` scans `src/*.js` for `TODO` lines, diffs them against everything already
recorded in `progress.md`, and appends a dated entry listing only what's new.

## Key result

Run 1 logged all 3 real TODOs; runs 2-7 correctly found nothing new. Project 7's sabotage
test (pointing step 1 at a missing file) produced a loud, explicit `## ... NEEDS A HUMAN`
entry in `progress.md` instead of a false "no new TODOs" — and that entry alone, read cold,
was enough to diagnose what failed, when, and why.

## Lesson

An append-only spine only works if every entry — including failures — is self-contained
enough to diagnose without replaying the run.
