# Project 9 — Rehearse A Routine

**Difficulty:** medium · **Concept(s):** Appendix A1 (Routines), A3 (one-off runs), A5 (green status ≠ task success)

## What This Project Does

A cloud **Routine** runs on a schedule with nobody watching it fire — which means the first
time you find out it's broken is the first time it silently does the wrong thing, unless you
rehearse it first. This project sets up a Routine whose job is to summarize "yesterday's
commits" into `commits-summary.md`, and deliberately runs it as a **one-off** a few times
before ever attaching a recurring schedule, to catch problems while a human is still watching.

## The Problem It Solves

A scheduled Routine reports a status of its own execution — did the job run, did it error out,
did it time out — not a verdict on whether the *task* it performed was actually correct. A
Routine can finish "green" while writing an empty summary, summarizing the wrong day, or
silently failing to find any commits at all, and the schedule will happily keep reporting
success on every future firing. Rehearsing with one-off runs, reading the actual output
in each rehearsal, catches that gap before it's running unattended and unwatched.

## How It Works

1. **A1 — the Routine itself**: a scheduled cloud agent whose task is to summarize
   yesterday's commits (from this repo's `git log`) into `commits-summary.md`.
2. **A3 — one-off runs before scheduling**: rather than attaching a cron schedule on the
   first try, the Routine is invoked as a single, manually-triggered run — repeatable as many
   times as needed — so each run's actual output can be inspected before trusting it to fire
   unattended.
3. **A5 — green status ≠ task success**: after each one-off run, the check isn't "did the
   Routine report success" — it's "open `commits-summary.md` and read what it actually
   wrote." A Routine that reports green but produces an empty, stale, or wrong summary has
   not passed rehearsal, regardless of its own status field.

Only once a few one-off runs produce a correct, sane `commits-summary.md` does it make sense
to attach a recurring schedule to this Routine.

## Files In This Folder

| File | Purpose |
|---|---|
| `README.md` | This file |
| `commits-summary.md` | The Routine's output target — currently a placeholder, not yet written to by a real run |

## How To Run It

This repo needs to exist on GitHub before a Routine can be created against it (a Routine
clones the repo to run), so the first step is committing and pushing this folder. After that:

1. Create the Routine (one-off, no schedule yet) pointed at this repo, with the task
   "summarize yesterday's commits into `project-09-rehearse-routine/commits-summary.md`."
2. Trigger it manually.
3. Read `commits-summary.md` yourself — don't trust the Routine's own status report.
4. Repeat until the output is consistently correct, *then* attach a schedule.

## What I Observed

Not yet run — this folder currently holds the placeholder task file only. `commits-summary.md`
still contains its placeholder note, not real output, since no Routine has executed against
it yet. This README will be updated (or a run log added) once the first one-off rehearsal
actually happens.

## Key Lesson

Rehearse a Routine with one-off runs and read its actual output before ever attaching a
schedule — "green" from the Routine only means the infrastructure didn't error, never that
the task it performed was correct.
