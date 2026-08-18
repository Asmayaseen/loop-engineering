# Project 6 — Doorbell Loop

**Difficulty:** medium · **Concept(s):** Concept 10 — Event-driven loop (fires on an external trigger, not a timer)

## What This Project Does

This project builds a loop that fires when a GitHub pull request is opened against this
repo, rather than on any schedule. `.github/workflows/claude-pr-review.yml` runs on
`pull_request: [opened, synchronize, reopened]` and has Claude Code review the diff for
correctness bugs, missed edge cases, simplification opportunities, and test coverage —
then posts the review as a PR comment via `gh pr comment`.

## The Problem It Solves

A polling loop ("check every N minutes for new PRs") wastes cycles when nothing's happening
and can lag behind a real event by up to one interval. A doorbell loop instead reacts
immediately to the actual event — someone opening a PR — the same way a doorbell rings on
the button press, not on a timer that happens to poll the porch every 5 minutes.

## How It Works

`package.json` states the intent directly: *"a loop that fires on an external event (a PR)
instead of a timer."* The workflow (defined at the repo root, `.github/workflows/`) grants
Claude Code `contents: read`, `pull-requests: write`, and `issues: write`, then instructs it
to review the diff and **actually run** `gh pr comment --body "<review>"` — producing the
review as text alone doesn't post it anywhere, the workflow explicitly guards against a
review that never gets delivered.

## Files In This Folder

| File | Purpose |
|---|---|
| `package.json` | Declares the project and the event-driven-loop intent |
| `src/greet.js` | The reviewed code — `greet(name)` returns `` `Hello, ${name}!` `` |
| `test/greet.test.js` | 1 assertion: `greet('World')` → `'Hello, World!'` |
| `../.github/workflows/claude-pr-review.yml` | The trigger — fires the review on `pull_request` events |

## How To Run It

There's no manual command — the loop fires itself:
```bash
git checkout -b pr/greet-bug
# make a change to src/greet.js
git push -u origin pr/greet-bug
gh pr create --title "..." --body "..."
# claude-pr-review.yml fires automatically on PR open
```

## What I Observed

**PR #1, "Trim trailing character in greet()"** is a real, still-open test case: the branch
`pr/greet-bug` changes `src/greet.js` from
`` return `Hello, ${name}!`; `` to `` return `Hello, ${name.slice(0, -1)}!`; ``, described in
the PR body as sanitizing the input. The automatic review correctly caught this as a real
bug, not a stylistic nitpick — posted as an actual PR comment:

> **Correctness bug:** `greet()` now does `name.slice(0, -1)`, which unconditionally strips
> the *last character* of `name` regardless of its content... `greet("World")` now returns
> `"Hello, Worl!"` instead of `"Hello, World!"`, which contradicts the existing test...
>
> **Missed edge case:** for single-character names it silently drops the only character
> (e.g. `"A"` → `""`), producing `"Hello, !"`.
>
> **Test coverage:** no new test was added to cover the intended sanitization behavior, and
> the existing test wasn't updated — so nothing currently verifies the new behavior, and the
> old test appears to be broken by this change.

The review fired without anyone manually invoking it — opening the PR was the entire trigger.

## Key Lesson

An event-driven loop's reliability depends on the trigger being unambiguous (a specific
GitHub Actions event) and the action being verifiably executed, not just described — a
review that only exists as generated text and never actually calls `gh pr comment` is
indistinguishable from a loop that never fired at all.
