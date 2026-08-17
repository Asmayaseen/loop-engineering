# run-brief

A repeatable check that scans the codebase for TODOs and logs only what's new since the
last run. Meant to be driven by a loop (e.g. a daily `/loop` or cron) so each run produces
a "morning brief" of what changed.

## Process

1. **Read `progress.md` first.** Collect the exact text of every TODO already recorded
   there (look under all `## New TODOs` entries, not just the most recent one).

2. **Scan for current TODOs.** Look at every `.js` file under `src/` and collect every
   line that contains the substring `TODO`. For each match, record:
   - the file path (relative to the project root)
   - the line number
   - the exact line text (trimmed)

3. **Diff against what's recorded.** A TODO counts as "already recorded" if its exact
   line text appears in `progress.md` from a previous run. Anything found in step 2 that
   isn't already recorded is a **new TODO**.

4. **Append a dated entry to `progress.md`:**
   - Add a new section header with today's date, e.g. `## 2026-08-17`.
   - If there are new TODOs, list each one as `- file:line — text`.
   - If there are no new TODOs, write the line `No new TODOs found.` under that date's
     section — the check still gets logged even when nothing changed.
   - Never remove or rewrite earlier entries; only append.

5. **Report to the user** what was found this run: either the list of new TODOs, or an
   explicit "No new TODOs found" message. Don't re-report TODOs that were already listed
   in a previous entry.

## Notes

- This file only describes the process — nothing here runs automatically. A run happens
  when this process is explicitly invoked (e.g. "run the brief").
- Keep the comparison based on exact line text so edits to a TODO's wording correctly
  register as "new" (the old wording stays in history, the new wording gets logged).
