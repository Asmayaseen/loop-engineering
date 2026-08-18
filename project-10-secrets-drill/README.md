# Project 10 — The Secrets Drill

**Difficulty:** medium · **Concept(s):** Appendix A2 (environment-variables panel), A4 (gitignored `.env` is local-only)

## What This Project Does

This project puts the same dummy secret in two places a Routine might look for it — a
gitignored `.env` file in this folder, and (separately, outside this repo) the cloud
Routine's own environment-variables panel — then runs the Routine and checks which one it
can actually read. The point isn't the secret itself, it's finding out experimentally which
storage location survives a Routine's fresh clone of this repo and which one doesn't.

## The Problem It Solves

A `.env` file feels like it "just works" because it works locally — your shell or dev tool
loads it from disk, so any secret dropped in there is immediately available. But a cloud
Routine doesn't run against your disk; it clones this repo fresh from GitHub. Since `.env`
is (correctly) gitignored, it was never pushed, so the clone the Routine runs against simply
doesn't have it. A secret only reaches a Routine if it's stored somewhere that isn't
git-tracked at all — the platform's own environment-variables panel, injected into the
runtime independent of whatever the repo contains. Assuming `.env` "just works" the same way
in the cloud as it does locally is exactly the mistake this drill is built to catch, on a
dummy token, before it's a real credential.

## How It Works

1. **A2 — environment-variables panel**: the same key (`DUMMY_API_TOKEN`) is also set, by
   hand, in the Routine's environment-variables configuration on the platform — a location
   that has nothing to do with this git repo at all.
2. **A4 — gitignored `.env`**: `project-10-secrets-drill/.env` holds
   `DUMMY_API_TOKEN=drill-secret-12345` locally. It's covered by the repo's `.gitignore`, so
   it is never committed and never reaches GitHub — meaning a fresh clone of this repo (which
   is exactly what a Routine does before it runs) will not contain this file at all.
3. **The drill**: run a Routine whose task is "read `DUMMY_API_TOKEN` and report whether it
   was found," pointed at this repo. Read `secret-check-result.md` afterward. The prediction
   this drill tests: the Routine finds the token from the environment-variables panel, and
   reports it missing when it looks for a `.env` file — because only one of the two locations
   actually exists in the environment the Routine runs in.

## Files In This Folder

| File | Purpose |
|---|---|
| `README.md` | This file |
| `.env` | Local-only dummy secret (`DUMMY_API_TOKEN=drill-secret-12345`) — **gitignored, never pushed** |
| `secret-check-result.md` | Placeholder — the Routine's report on where it did/didn't find the token |

## How To Run It

1. Confirm `.env` is ignored: `git check-ignore -v project-10-secrets-drill/.env`
2. Set `DUMMY_API_TOKEN=drill-secret-12345` in the Routine's environment-variables panel
   (outside this repo).
3. Create/run a one-off Routine against this repo with the task: "check whether
   `DUMMY_API_TOKEN` is available as an environment variable, and whether a `.env` file
   exists in `project-10-secrets-drill/`; write both findings to `secret-check-result.md`."
4. Read `secret-check-result.md` — don't infer the result, check what it actually says.

## What I Observed

Not yet run — this folder currently holds only the drill's setup. `.env` exists locally with
the dummy token and is confirmed covered by `.gitignore`; `secret-check-result.md` still
holds its placeholder note, since no Routine has executed against this repo yet.

## Key Lesson

A `.env` file is a local convenience, not a deployment mechanism — it survives on your disk,
not in a fresh git clone. The only secret storage that reliably reaches a cloud Routine is
one that lives outside git entirely, like an environment-variables panel; anything gitignored
is, by definition, invisible to whatever clones the repo.
