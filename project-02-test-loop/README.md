# Project 2 — Test Loop

**Concept:** Conditional loop (repeat until a check passes, not until a timer expires)

## What it does

Runs `npm test` against `src/math.js`, and on any failure fixes the source (never the test
file) and re-runs — looping until `node --test` reports every case `ok`.

## Key result

Current state is fully green: `npm test` → `# tests 3 / # pass 3 / # fail 0`, covering
`add(2,3)===5`, `add(10,-4)===6`, and `isEven(4)===true`.

## Lesson

A conditional loop's exit condition has to be an objective, machine-checked fact — not a
subjective "looks fixed."
