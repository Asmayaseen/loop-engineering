# Project 1 — Watcher Loop

**Concept:** In-session loop (repeats only while the session is open)

## What it does

Watches something over time in two ways: `long-task.js` + `check-task.ps1` poll a flag file
(`output/result.json`) to detect when a background job finishes, and the `iss-position` skill
drives Claude Code's `/loop` to report the ISS's live position once a minute.

## Key result

`output/progress.log` shows 5 steps logged exactly 60s apart, with `result.json` written only
once, at completion — confirming the poll script would report `RUNNING` 4 times then `DONE`.
The ISS skill prints a fixed-width card per beat (e.g. `49.2° S 105.8° W · 432 km ·
27,557 km/h`) so consecutive readings line up on screen.

## Lesson

An in-session loop is a kitchen timer, not an alarm clock — it dies the moment the terminal
closes.
