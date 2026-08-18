# Project 11 — The Two-Routine Gate

**Difficulty:** hard · **Concept(s):** Appendix A3 (one-off runs), A4 (secrets outside the repo), A6 (API-triggered routine as a human gate)

## What This Project Does

This project splits one job into two separate Routines so that a consequential action can
never happen without a human explicitly saying so. **Routine A** runs on its own (a schedule,
or a one-off rehearsal) and only ever *drafts* something into `draft-summary.md` — it never
performs the real action itself. **Routine B** performs the actual action, but has no
schedule at all: it only fires when a human sends an authenticated `curl` request to its API
trigger, after reading Routine A's draft and deciding it's good.

## The Problem It Solves

A single Routine that both drafts and ships collapses review into execution — by the time a
human notices something's wrong, it's already happened. Splitting drafting from doing puts a
real gate between them: Routine A can run as often as it wants (cheaply, safely, per
Project 9's rehearsal lesson) because drafting is reversible and inspectable, while Routine B
— the part that actually does something — is deliberately given no autonomous trigger at
all. The only way Routine B runs is a human firing it on purpose.

## How It Works

1. **A3 — Routine A rehearsed as one-off runs**: same discipline as Project 9 — Routine A is
   run manually first, its output in `draft-summary.md` read and checked, before it's ever
   trusted on a schedule. Drafting is safe to over-run; nothing ships from it directly.
2. **A6 — Routine B is API-triggered, not scheduled**: Routine B has no cron attached at all.
   It sits idle until it receives a `curl` call to its trigger URL. That call *is* the human
   approval — not a separate "approve" button that then still runs on its own schedule, but
   the literal act that causes the action to happen.
3. **A4 — the trigger secret lives outside the repo**: firing Routine B requires an auth
   token/trigger URL, which — same as Project 10's drill — must live in the platform's
   environment/secrets configuration, never committed to this repo. A human who wants to
   approve has to actually hold that secret; it isn't sitting in git for anyone with clone
   access to fire.
4. **The gate**: Routine A drafts → human reads `draft-summary.md` → human runs
   `curl <trigger-url>` (with the auth header) only if they approve → Routine B runs and
   writes `gate-log.md`, which is proof the gate held (nothing in `gate-log.md` unless a
   human explicitly fired it).

## Files In This Folder

| File | Purpose |
|---|---|
| `README.md` | This file |
| `draft-summary.md` | Placeholder — Routine A's draft, for human review only |
| `gate-log.md` | Placeholder — only written when a human fires Routine B via its API trigger |

## How To Run It

1. Run Routine A (one-off first, per A3) and read `draft-summary.md`.
2. Decide, as a human, whether the draft is good enough to act on.
3. Only if approved, fire Routine B manually:
   ```bash
   curl -X POST "<routine-b-trigger-url>" \
     -H "Authorization: Bearer <trigger-secret-from-env-panel>"
   ```
4. Read `gate-log.md` afterward — it should only ever contain entries corresponding to an
   actual `curl` call someone made, never an automatic firing.

## What I Observed

Not yet run — this folder currently holds the two placeholder files only. Neither Routine
has executed yet, so `draft-summary.md` and `gate-log.md` still hold their placeholder notes.

## Key Lesson

A gate is only real if the thing being gated has no path to running without it — giving
Routine B an API trigger instead of a schedule means the human's `curl` call isn't a
formality layered on top of an already-running loop, it's the actual cause of the action.
