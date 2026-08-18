# Project 4 — Fix Loop

**Concept:** Maker-checker (a fixer skill + an independent reviewer subagent)

## What it does

The `fix-bug` skill reads the failing test and edits only `src/calculator.js` to satisfy it;
a separate `reviewer` subagent independently re-runs the tests and checks the diff before
replying `PASS` or `FAIL`.

## Key result

Current state is green: `npm test` → `3/3 pass`, e.g. `calculateDiscount(100, 10)` → `90`.
`reviewer.md` requires the checker to run `npm test` itself and confirm the diff touches only
`src/calculator.js` — it can't take "tests pass" on the fixer's word.

## Lesson

A checker that trusts the maker's claim instead of re-verifying isn't independent review —
it's an echo.
