# Project 8 — Daily Loop

**Difficulty:** capstone · **Concept(s):** all six prior parts combined — spine, worktree isolation, skill body, maker-checker, connector (PRs), human gate, PR cap, and idempotency

## What This Project Does

This is the capstone loop: it watches two Python modules under `watched/` for failing tests,
fixes each broken one on its own isolated git branch, has an independent reviewer subagent
verify the fix before trusting it, opens a PR only for low-risk verified fixes (capped at 5
per run), and logs everything else for a human — updating a durable `progress.md` spine on
every single run, whether or not anything changed.

## The Problem It Solves

Each earlier project proved one piece in isolation — a timer loop, a conditional retry, a
spine, a maker-checker pair, a reusable workflow, an event trigger, a cost/safety check. None
of those pieces alone is a loop you'd trust to run unattended against real code: a fixer
without a checker merges bad fixes; a checker without a cap can flood a repo with PRs; a loop
without a spine forgets what it already did and duplicates work every time it re-runs. This
project wires all of them together and then actually runs it — repeatedly, unattended, on a
schedule — to prove the combination holds up, not just each part individually.

## How It Works

`.claude/skills/daily-loop/SKILL.md` codifies the sequence:

1. **Spine first** — read `progress.md` before anything else; never blindly redo work it
   already logged as Done or Open.
2. **Find failures** — `pytest watched/ -v`; build the list of modules with failing tests
   from raw output, not assumption.
3. **PR cap** — never open more than 5 PRs in one run; anything beyond the cap gets logged
   for a later run, never silently dropped.
4. **Isolate each fix** — one `claude/fix-<module>` branch (worktree-isolated) per module;
   only that module's source file is ever edited, never its test file.
5. **Maker-checker** — a fresh `reviewer` subagent (`.claude/agents/reviewer.md`) independently
   re-runs the tests, checks diff scope and minimality, and replies `PASS`/`FAIL` plus a
   low-risk/risky call — it never takes the fixer's word for it.
6. **Connector or human gate** — `PASS` + low-risk → push branch, `gh pr create`. `FAIL` or
   `PASS`-but-risky → log under "Open - needs a human" in `progress.md`, no PR.
7. **Idempotency check** — before creating any new branch/PR, check `gh pr list --state all`
   and `git branch -a` for an existing one covering the same module, so re-running the loop
   never duplicates already-open or already-merged work.
8. **Spine last** — always append a dated entry to `progress.md`, even when nothing changed,
   then commit it.

## Files In This Folder

| File / folder | Purpose |
|---|---|
| `watched/math_helper.py` | `is_prime(n)` — had a real, subtle bug (below) |
| `watched/string_helper.py` | `truncate(text, max_length)` — had a real, subtle bug (below) |
| `watched/test_math_helper.py` | 7 assertions for `is_prime`, including the edge cases the bug missed |
| `watched/test_string_helper.py` | 4 assertions for `truncate`, including the length-bound check |
| `requirements.txt` | `pytest` |
| `.claude/skills/daily-loop/SKILL.md` | The full codified loop (spine → scan → fix → review → gate → spine) |
| `.claude/agents/reviewer.md` | Independent, read-only maker-checker reviewer |
| `progress.md` | The spine — 10 real dated run entries from this project's actual execution |

## How To Run It

```bash
pytest watched/ -v
```
Then invoke the `daily-loop` skill to run the full cycle (fix → review → PR-or-log → spine
update).

## What I Observed

**The two real bugs, both fixed and merged:**
- `math_helper.is_prime(n)` — `range(2, n)` is empty for `n < 2`, so the loop fell through to
  `return True` for 1, 0, and negative numbers. Fixed with a 2-line `if n < 2: return False`
  guard. **[PR #2](https://github.com/Asmayaseen/loop-engineering/pull/2)** — reviewer verdict
  **PASS, low-risk** (7/7 tests), squash-merged.
- `string_helper.truncate(text, max_length)` — appended `"..."` *after* slicing to
  `max_length`, so truncated output was `max_length + 3` chars instead of staying within the
  bound. Fixed by changing the slice to `text[:max_length - 3]`.
  **[PR #3](https://github.com/Asmayaseen/loop-engineering/pull/3)** — reviewer verdict
  **PASS, low-risk** (4/4 tests), squash-merged.

**Baseline, before any fix:** `pytest watched/ -v` → **5 failed, 6 passed**.
**Current state, after both merges:** `pytest watched/ -v` → **11 passed, 0 failed**.

**10 real runs logged in `progress.md`:** run 1 found both bugs, fixed them, and opened PR #2
and PR #3. Run 2 found `main` still red (fixes were on unmerged branches) but correctly held
off — no duplicate branches or PRs — because `gh pr list` showed both still open. Run 3, after
the PRs were manually squash-merged, found the suite fully green and logged a clean "nothing
to do" entry. Runs 4-10 were seven consecutive *automatic* firings of a session-only cron job
(`*/2 * * * *`, id `ec27fb72`) — every one landed at the identical idempotent conclusion (11
passed, 0 failed, PR #2/#3 confirmed merged, no stray branches), proving the loop holds
steady unattended before the job was deliberately cancelled.

## Key Lesson

A loop assembled from six independently-correct parts still isn't trustworthy until it's been
run repeatedly, unattended, against the exact edge case that breaks naive loops — "the check
still fails the same way it did last time, but for a completely different reason (pending
merge vs. actually unfixed)." Idempotency isn't free; it requires the loop to check external
state (PR status, branch existence) before acting, not just react to the raw test output.
