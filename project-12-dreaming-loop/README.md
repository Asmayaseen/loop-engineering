# Project 12 — Dreaming Loop

**Difficulty:** capstone · **Concept(s):** Concept 12 (meta-loop over a loop's own history), Concept 11, Concept 6, Part 5 (maker-checker / PR-not-commit discipline)

## What This Project Does

This is a loop that watches another loop, not code. Once a week, it reads
`project-08-daily-loop/progress.md` — the daily loop's own spine — going back only as far as
`dreaming-state.md`'s last-reviewed date, and looks for the *same* failure or correction
showing up more than once across separate runs. If it finds one, it drafts the smallest
possible change to a rules file that would prevent it, and opens that as a PR — never a
direct commit — citing exactly which runs, on which dates, and how many times.

## The Problem It Solves

A loop that only ever reacts to its current input never notices it's making the same mistake
repeatedly, because each run only sees itself. If the same edge case trips up the daily loop
in three separate runs, nothing about any single run's logic flags that as a pattern — from
inside any one run, it just looks like "this run needed a manual correction," three
unrelated times. The dreaming loop is the mechanism that steps back far enough to see three
occurrences as one pattern, and proposes fixing the *rule*, not just the *instance*.

## How It Works

1. **Read `dreaming-state.md`** — the one fact it holds is the last-reviewed date. First run:
   review from the beginning.
2. **Read `progress.md` entries since that date** — raw run history, not a summary of it.
3. **Look for repetition, not for any single failure**: one occurrence is noise; the same
   failure or correction appearing in **2 or more separate run entries** is treated as a real
   pattern worth acting on.
4. **Draft the smallest rule change** that would have prevented it — one or two sentences,
   added to `project-08-daily-loop/CLAUDE.md` (created if it doesn't exist yet), never a
   rewrite of the whole rules file.
5. **Open a PR, never commit directly** — a new `claude/dream-<topic>` branch, pushed, PR'd.
   The PR description must cite the *exact* evidence: which `progress.md` entries, which
   dates, how many times the pattern appeared. A PR without that citation isn't valid output
   of this loop.
6. **Propose exactly one deletion candidate** — a rule in the rules file that the reviewed
   runs never actually needed. If none exists, say so plainly rather than inventing one.
7. **Update `dreaming-state.md`** with today's date, every run, whether or not a PR was
   opened — committed directly, since the state file is this loop's own spine, not a rule.

## Files In This Folder

| File | Purpose |
|---|---|
| `README.md` | This file |
| `dreaming-state.md` | The spine — holds only the last-reviewed date |
| `.claude/skills/dreaming-loop/SKILL.md` | The full codified 7-step process above |

## How To Run It

Invoke the `dreaming-loop` skill. It reads `dreaming-state.md` and
`../project-08-daily-loop/progress.md` itself — there's no separate command to run first.

## What I Observed

Not yet run — `dreaming-state.md` still says "none yet," and no `claude/dream-*` branch or PR
exists. For context on what a first run would actually see:
`project-08-daily-loop/progress.md` currently holds 10 real run entries — a genuine fix cycle
(2 real bugs found and merged via PR #2/#3), one deliberate "hold off, PRs still open"
no-op, and then seven consecutive clean "11 passed, 0 failed" firings from a session cron
job. None of those entries currently repeat the *same* failure or correction twice — the two
real bugs were each fixed exactly once — so an honest first dreaming run over this exact log
would most likely conclude "no pattern found, no PR" rather than force one. That's a
correct outcome per the skill's own rule against manufacturing changes to justify running.

## Key Lesson

A meta-loop earns its usefulness by having a real threshold for action (2+ occurrences, not
1) and by drafting instead of shipping — reviewing a loop's own history is powerful enough to
change the rules that govern future runs, which is exactly why that power is routed through
a PR a human reviews, never a direct commit.
