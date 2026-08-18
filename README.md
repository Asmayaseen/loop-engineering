# Loop Engineering — 12 Projects

> **Reading order note:** GitHub's file browser sorts folders alphabetically, not
> numerically — so it lists `project-1`, `project-10`, `project-11`, `project-12`,
> `project-2`, `project-3`, ... rather than 1 through 12 in order. The table below is
> the correct numeric reading order; use it instead of the file browser's own listing.

A course in building loops that work unattended: from a simple timer that dies with your
terminal, up to a capstone loop that fixes real bugs, gets independently reviewed, opens real
PRs, and stays idempotent across dozens of unattended firings — then a second capstone that
rehearses, secures, gates, and finally reviews its own history to improve itself.

## Projects

| # | Project | Concept | Folder |
|---|---------|---------|--------|
| 1 | Watcher Loop | In-session loop (dies when the session closes) | [project-1-watcher-loop](project-1-watcher-loop) |
| 2 | Test Loop | Conditional loop (repeat until a check passes) | [project-2-test-loop](project-2-test-loop) |
| 3 | Morning Brief | The spine (append-only log a loop reads/writes) | [project-3-morning-brief](project-3-morning-brief) |
| 4 | Fix Loop | Maker-checker (fixer skill + independent reviewer) | [project-4-fix-loop](project-4-fix-loop) |
| 5 | Workflow Body | Reusable process across independent targets | [project-5-workflow-body](project-5-workflow-body) |
| 6 | Doorbell Loop | Event-driven loop (fires on a PR, not a timer) | [project-6-doorbell-loop](project-6-doorbell-loop) |
| 7 | Break It On Purpose | Cost measurement + observability (fail loud) | [project-7-break-it-on-purpose](project-7-break-it-on-purpose) |
| 8 | Daily Loop | Capstone — all six parts combined | [project-8-daily-loop](project-8-daily-loop) |
| 9 | Rehearse a Routine | Cloud routine rehearsal (one-off runs before scheduling; green ≠ success) | [project-9-rehearse-routine](project-9-rehearse-routine) |
| 10 | The Secrets Drill | Secrets storage (env-vars panel survives a clone; gitignored `.env` doesn't) | [project-10-secrets-drill](project-10-secrets-drill) |
| 11 | The Two-Routine Gate | Human gate (draft-only routine + API-triggered action routine) | [project-11-routine-gate](project-11-routine-gate) |
| 12 | The Dreaming Loop | Meta-loop (reviews another loop's history, drafts rule fixes as PRs) | [project-12-dreaming-loop](project-12-dreaming-loop) |

## What This Repo Demonstrates

- **Four loop heartbeats**, each proven working, not just described: in-session timer
  (Project 1), conditional check-and-retry (Project 2), event-driven PR trigger (Project 6),
  and scheduled cron (Project 8's `*/2 * * * *` session job).
- **The spine pattern** — an append-only `progress.md` a loop reads before acting and writes
  after, so re-runs stay idempotent instead of duplicating or re-reporting old work.
- **Maker-checker** — a fixer never grades its own fix; a separate reviewer re-runs tests and
  checks diff scope independently before a `PASS` is trusted (Projects 4 and 8).
- **Real GitHub PRs**, opened and merged by the loop itself, not simulated —
  [PR #1](https://github.com/Asmayaseen/loop-engineering/pull/1),
  [PR #2](https://github.com/Asmayaseen/loop-engineering/pull/2),
  [PR #3](https://github.com/Asmayaseen/loop-engineering/pull/3).

## Key Numbers

- **≈ $0.007/beat**, **≈ $0.20/month daily → ≈ $58.32/month every 5 min** (Project 7's real
  cost measurement of Project 3's loop, at Sonnet pricing).
- **5 failed → 11 passed**: Project 8's `watched/` suite before and after both real bugs were
  fixed, reviewed, and merged via PR #2 and PR #3.
- **7 consecutive automatic cron firings**, every one an identical idempotent no-op —
  Project 8's proof that the full loop holds steady with nobody typing the command.
