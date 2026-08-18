---
name: fix-bug
description: Fix a failing test in this project by correcting the bug in src/, without touching the tests themselves. Use whenever the user asks to fix the calculator bug, make the failing tests pass, or run the fix loop for project-04-fix-loop.
allowed-tools: Bash, Read, Edit
---

# Fix the bug

The tests are the spec. The bug is in `src/`. Only one of those two gets edited.

## Process

1. **Read the failing test first.** Open `test/calculator.test.js` and work out, from the
   assertions alone, what `calculateDiscount(price, percent)` is supposed to return. Don't
   guess at the intended formula from the buggy implementation — derive it from what the
   tests expect.

2. **Read the current implementation.** Open `src/calculator.js` and find where its
   behavior diverges from what the tests require.

3. **Fix only `src/calculator.js`.** Do not edit `test/calculator.test.js` or any other
   test file, under any circumstance — the tests define correctness here, not the other
   way around. Make the smallest change that satisfies the tests: no rewrites, no
   refactors, no touching unrelated functions or files.

4. **Run `npm test` yourself and read the output.** Don't finish on the strength of the
   edit looking right — confirm it by running the suite and checking every test reports
   `ok`, not just the one you were focused on.

5. **If it's still red**, re-read the failing assertion's expected vs. actual values and
   adjust — don't add a second bug on top of the first while chasing the fix.

## Done means

- `npm test` exits clean with every test `ok`.
- `git diff` (or equivalent) touches `src/calculator.js` only — nothing under `test/`.
- The diff is minimal: the discount formula corrected, nothing else restructured.
