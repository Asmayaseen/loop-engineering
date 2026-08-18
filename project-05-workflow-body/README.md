# Project 5 — Workflow Body

**Difficulty:** medium · **Concept(s):** Concept 9 — Reusable workflow body (one process, applied across independent targets)

## What This Project Does

This project takes Project 4's fix-loop *process* — read the failing test, fix only the
source, verify by re-running — and reuses it as a workflow body across three independent,
unrelated bugs in one pass: `arrayUtils.js`, `dateUtils.js`, and `stringUtils.js`. The point
isn't a new mechanism, it's proving the same process generalizes without being rewritten per
target.

## The Problem It Solves

If a fix process is written specifically for one bug (as Project 4's was, for
`calculateDiscount`), it's not obvious the same steps hold up against a *different* bug in a
*different* file. Running the identical process three times against three unrelated modules
in the same project is the test: does "read the test, fix only the source, verify" survive
contact with problems it wasn't written for?

## How It Works

Same three-module shape repeated: each `src/*.js` file exports one small function, each
`test/*.test.js` file pins down its expected behavior with 3 assertions. The workflow body
applied to each is identical and target-agnostic:

1. Read the test file for that module — derive correct behavior from the assertions, not
   from the current implementation.
2. Edit only that module's source file — never its test file.
3. Re-run the full suite (`npm test`) and confirm every test across *all three* modules
   passes, not just the one just touched — catching any cross-module regression immediately.

Unlike Project 4, there's no separate `.claude/skills/` or `.claude/agents/` file here — the
process was applied directly, module by module, in one working session rather than codified
as a standalone skill file in this folder.

## Files In This Folder

| File | Purpose |
|---|---|
| `package.json` | Declares the project, wires `npm test` to `node --test` |
| `src/arrayUtils.js` | `findMax(arr)` — returns the largest element |
| `src/dateUtils.js` | `daysBetween(date1, date2)` — whole days between two dates |
| `src/stringUtils.js` | `reverseString(str)` — reverses a string |
| `test/arrayUtils.test.js` | 3 assertions for `findMax` |
| `test/dateUtils.test.js` | 3 assertions for `daysBetween` |
| `test/stringUtils.test.js` | 3 assertions for `reverseString` |

## How To Run It

```bash
npm test
```

## What I Observed

All 9 tests across all 3 modules pass:
```
# tests 9
# pass 9
# fail 0
```
`findMax([1, 5, 3])` → `5`, `findMax([-10, -2, -30])` → `-2`, `findMax([7])` → `7`;
`daysBetween` correctly returns `0`, `1`, and `9` days for the three date pairs;
`reverseString('hello')` → `'olleh'`, `reverseString('abcd')` → `'dcba'`. This folder was
committed once the workflow had already been applied to all three modules, so — same as
Projects 2 and 4 — what's preserved is the converged, all-green end state rather than a
per-module before/after diff.

## Key Lesson

A workflow body is only proven reusable once it's been run against targets it wasn't
originally written for — running the same "read test, fix source, verify" process three
times against three unrelated bugs, with zero changes to the process itself, is what makes it
a workflow rather than a one-off fix.
