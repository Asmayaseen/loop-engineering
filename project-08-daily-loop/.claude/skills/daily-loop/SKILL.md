---
name: daily-loop
description: Run the full daily loop for project-08-daily-loop -- find failing tests under watched/, fix each broken module on its own isolated branch, have an independent reviewer subagent grade every fix, open a PR only for low-risk passing fixes (capped at 5 per run), and log everything else for a human. Use whenever the user asks to run the daily loop, check the watched folder, or process today's failing tests for project-08-daily-loop.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Agent
---

# Daily loop

This is the capstone loop: it combines the spine (Project 3), the fix loop (Project 4),
worktree isolation (Project 5), a PR cap (Project 6), and a maker-checker review gate
(Projects 4/6) into one run. Follow the steps in order -- do not skip the spine read, do
not skip the reviewer, do not exceed the PR cap.

## 0. Read the spine first

Before anything else, read `progress.md` in full. It is the only source of truth for what
prior runs found, fixed, or flagged for a human. Do not start work, and do not re-open a
PR for something already logged as fixed or already sitting under "Open - needs a human"
without re-checking whether it's still actually broken.

## 1. Find failing tests under watched/

From the project root, run:

```
pytest watched/ -v
```

Read the raw output. Build a list of which `watched/<module>.py` files have failing
tests, based on which `test_<module>.py` files reported failures -- not on assumption.
Modules whose tests are all green need no action this run.

## 2. Enforce the PR cap before starting

**Never open more than 5 PRs in one run.** Count how many modules have failing tests. If
it's more than 5, still investigate and fix up to 5 of them this run (pick the most
straightforward first, e.g. by file size or fewest failing assertions), and log the rest
under "Open - needs a human" in `progress.md` as "not yet attempted this run -- PR cap
reached" so a future run picks them up. Never silently drop them.

## 3. For each failing module: fix it in isolation

For every module you're taking action on this run, do the fix on its own branch, isolated
from the others, so one bad fix can't block or contaminate another:

1. Branch name: `claude/fix-<module-name>` (e.g. `claude/fix-string_helper`).
2. Use an isolated worktree for the fix -- when delegating the fix to a subagent, launch
   it with `isolation: "worktree"` so it works on its own checkout of the branch rather
   than the shared working directory. If working directly instead of delegating, create
   and check out the branch yourself (`git worktree add` or `git checkout -b`) before
   editing.
3. **Read the failing test first** (`watched/test_<module>.py`) and work out, from the
   assertions alone, what the correct behavior is. Don't guess at the intended behavior
   from the buggy implementation -- derive it from what the tests expect. The module's own
   docstring also describes the bug; use it, but the tests are the actual spec.
4. **Fix only `watched/<module>.py`.** Do not edit any `test_*.py` file, under any
   circumstance. Make the smallest change that satisfies the tests: no rewrites, no
   refactors, no touching unrelated functions or other modules.
5. Run `pytest watched/test_<module>.py -v` yourself and confirm every test for that
   module passes before moving on.

## 4. Maker-checker: get an independent review

You (the maker) do not get to grade your own fix. For each fix, invoke the `reviewer`
subagent (a fresh agent, not a fork -- it must not inherit your assumptions) and tell it
which module and branch/worktree to check. It will run the tests itself, check the diff
is scoped to that one module, check minimality, and reply with `PASS` or `FAIL` plus a
low-risk/risky assessment on any PASS. Trust its verdict over your own impression of the
fix -- that's the point of a separate checker.

## 5. Act on the verdict

- **PASS and low-risk** -- open a PR (the connector step): push the branch and run
  `gh pr create` with a title referencing the module and a body that states the bug that
  was fixed and quotes the reviewer's PASS reasoning. Record the PR number/link under
  `## Done` in `progress.md`.
- **PASS but risky**, or **FAIL** -- do **not** open a PR. This is the human gate: log it
  under `## Open - needs a human` in `progress.md` instead, with the module name, the
  reviewer's verdict and full reasoning, and what a human needs to look at or decide. A
  risky-but-passing fix and an outright failing fix both stop here -- neither gets merged
  or PR'd automatically.

## 6. Update the spine before finishing

Always finish by updating `progress.md`, even if nothing needed fixing this run:

- `## Done` -- one entry per module that got a PASS + low-risk fix and an opened PR (with
  the PR link).
- `## In progress` -- any module you started but couldn't finish this run (e.g. PR cap
  reached mid-fix); leave enough detail for the next run to pick it up without re-deriving
  context.
- `## Open - needs a human` -- one entry per FAIL or PASS-risky module, plus any modules
  that hit the PR cap before being attempted, with enough detail (verdict, reasoning,
  what's needed) that a human reading `progress.md` cold can act without replaying this
  run.

If a run finds nothing broken, still append a dated entry (e.g. "No failing tests found")
so the log stays a continuous, honest record -- don't just leave it unchanged.

## Done means

- `progress.md` reflects exactly what happened this run: every module either fixed +
  PR'd, still in progress, or logged for a human -- nothing silently skipped.
- No more than 5 PRs opened in the run.
- Every opened PR corresponds to a fix that got an independent `PASS` + low-risk verdict
  from the `reviewer` subagent, verified by that subagent actually running the tests.
- No `test_*.py` file was ever edited to make a test pass.
