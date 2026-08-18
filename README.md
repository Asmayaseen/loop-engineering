# Loop Engineering — 12 Projects

> **Folder naming note:** GitHub's file browser sorts folders alphabetically, not
> numerically, which used to list `project-1`, `project-10`, `project-11`, `project-12`,
> `project-2`, ... out of order. Folders below 10 are now zero-padded (`project-01`, not
> `project-1`) specifically so the file browser's own alphabetical listing matches the
> 1–12 order in the table below — no separate reading-order workaround needed.

A course in building loops that work unattended: from a simple timer that dies with your
terminal, up to a capstone loop that fixes real bugs, gets independently reviewed, opens real
PRs, and stays idempotent across dozens of unattended firings — then a second capstone that
rehearses, secures, gates, and finally reviews its own history to improve itself.

## Projects

| # | Project | Concept | Folder |
|---|---------|---------|--------|
| 1 | Watcher Loop | In-session loop (dies when the session closes) | [project-01-watcher-loop](project-01-watcher-loop) |
| 2 | Test Loop | Conditional loop (repeat until a check passes) | [project-02-test-loop](project-02-test-loop) |
| 3 | Morning Brief | The spine (append-only log a loop reads/writes) | [project-03-morning-brief](project-03-morning-brief) |
| 4 | Fix Loop | Maker-checker (fixer skill + independent reviewer) | [project-04-fix-loop](project-04-fix-loop) |
| 5 | Workflow Body | Reusable process across independent targets | [project-05-workflow-body](project-05-workflow-body) |
| 6 | Doorbell Loop | Event-driven loop (fires on a PR, not a timer) | [project-06-doorbell-loop](project-06-doorbell-loop) |
| 7 | Break It On Purpose | Cost measurement + observability (fail loud) | [project-07-break-it-on-purpose](project-07-break-it-on-purpose) |
| 8 | Daily Loop | Capstone — all six parts combined | [project-08-daily-loop](project-08-daily-loop) |
| 9 | Rehearse a Routine | Cloud routine rehearsal (one-off runs before scheduling; green ≠ success) | [project-09-rehearse-routine](project-09-rehearse-routine) |
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
