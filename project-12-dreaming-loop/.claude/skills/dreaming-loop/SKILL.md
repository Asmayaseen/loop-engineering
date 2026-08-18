---
name: dreaming-loop
description: Run the weekly "dreaming" review over project-08-daily-loop's progress.md — look for the same failure or correction repeating across multiple runs since the last review, and if found, draft the smallest rules-file change that would prevent it, as a PR (never a direct commit), citing the exact evidence. Use whenever the user asks to run the dreaming loop, review the daily loop's history for patterns, or propose rule changes based on repeated daily-loop issues.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Dreaming loop

This loop doesn't fix code — it fixes the *process* that fixes code. It runs on a slower
cadence than the daily loop (weekly, not every firing), looking back over a stretch of the
daily loop's own history for a pattern a single run would never notice: the same failure or
the same correction happening more than once. One occurrence is noise. Two or more is a
pattern worth changing a rule over.

## 1. Read the state file

Read `dreaming-state.md` in this folder. It holds exactly one fact: the date of the last
review. If it says "none yet," this is the first run — review `progress.md` from the
beginning. Never skip this step; it's what keeps successive dreaming runs from re-reviewing
the same stretch of history or, worse, skipping a stretch entirely.

## 2. Read what happened since then

Read every dated entry in `../project-08-daily-loop/progress.md` with a date after the last
reviewed date (or all entries, on a first run). This is raw material, not something to
summarize yet — read the actual run entries, not a description of them.

## 3. Look for a repeated pattern

Across those entries, look for the *same* failure, the *same* correction, or the *same*
kind of manual intervention showing up more than once — not "any two things that seem
related," but the same specific issue recurring. Concretely:

- **One occurrence = noise.** A single run hitting an edge case once is not a pattern; don't
  propose a rule change over it.
- **Two or more occurrences = a pattern worth fixing.** If the same thing had to be handled,
  worked around, or corrected in two or more separate run entries, that's a real signal that
  the daily loop's current rules don't cover it — and it'll keep happening on its own until a
  rule is added.

If nothing repeats, that's a valid outcome: no PR this run. Don't force a change to justify
having run.

## 4. Draft the smallest possible rule change

If a pattern was found, draft the smallest edit to a rules file that would have prevented it.
The target is `../project-08-daily-loop/CLAUDE.md` — create it if it doesn't exist yet, using
the same style as this repo's other `CLAUDE.md` files (an `@AGENTS.md` import, or, if no
`AGENTS.md` exists for that project, a short direct instruction). "Smallest" means:

- One new rule, stated in one or two sentences — not a rewrite of the whole file.
- Specific enough to actually prevent the recurring issue, not a vague general reminder.
- No unrelated cleanup, no reformatting of existing rules, no removing anything except the
  one deletion candidate from step 6.

## 5. Open a PR — never commit directly

Create a new `claude/dream-<short-topic>` branch, make the rule-file edit there, push it, and
open a PR with `gh pr create`. **Never commit the rule change directly to `main`.** A rule
change proposed by a loop reviewing its own history needs the same human review any other
change gets — the dreaming loop drafts, it doesn't ship.

The PR description **must cite evidence**, specifically:
- The exact `progress.md` entries the pattern was found in (dates / run numbers).
- How many times the pattern appeared.
- The exact wording or behavior that repeated, quoted or closely paraphrased from the log —
  not a vague "this came up a few times."

A PR without that evidence is not a valid output of this loop — "trust me, I noticed a
pattern" is exactly the kind of unverifiable claim the maker-checker projects (4, 8) exist to
rule out.

## 6. Propose one deletion candidate

Separately from the addition (if any), look at the rules currently in
`../project-08-daily-loop/CLAUDE.md` (or `AGENTS.md`/`SKILL.md` instructions it's reasonable to
review) and check whether any existing rule was never actually invoked by the runs reviewed
this cycle — a rule sitting there unused. If one exists, propose removing it in the same PR
(or note it in the PR description as a candidate for a human to confirm), with the same
evidentiary standard: name the rule, and say plainly that the reviewed runs show no case
where it mattered. If no such rule exists, say so explicitly rather than inventing one to
delete — a forced deletion is as unwarranted as a forced addition.

## 7. Update the state file

Whether or not a PR was opened, update `dreaming-state.md` with today's date as the new last-
reviewed point, and commit that update directly (the state file itself isn't a rule — it's
this loop's own spine, same pattern as Project 3 and Project 8's `progress.md`). This step
happens every run, unconditionally — a dreaming run that found nothing still has to move the
watermark forward, or the next run will needlessly re-review the same history.

## Done means

- `dreaming-state.md` reflects today's date, every run, no exceptions.
- If a pattern was found: a PR exists on a `claude/dream-*` branch (never a direct commit to
  `main`) with cited evidence — specific run entries, dates, and a repeat count of 2+.
- If no pattern was found: no PR, and the "nothing found" conclusion is stated plainly rather
  than papered over with a manufactured rule change.
- At most one deletion candidate is proposed per run, only when the evidence actually
  supports it.
