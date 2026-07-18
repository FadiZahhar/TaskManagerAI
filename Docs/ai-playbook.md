# My AI Coding Playbook

One page, first person. It reuses the rules and evidence I confirmed in
`Docs/governance-worksheet.md` and extends them for the final project. I
reviewed and approved this wording, including the newly drafted first-person
sentences, on 2026-07-18.

## When I reach for AI first

- Drafting boilerplate I can fully read and verify: a project skeleton, a CI
  workflow, a Dockerfile, request/response models, or a first test list.
- Turning a concrete, bounded requirement into a first implementation I will
  then review line by line.
- Explaining unfamiliar code or an exact error, and proposing focused fixes.
- Producing review and evidence drafts (security passes, release notes) that I
  grade against the real repository afterward.

## When I do not reach for AI first

- Deciding scope, product behavior, or business rules (e.g. the allowed status
  transitions, or whether `overdue` is stored or derived) — those are my calls.
- Grading security findings, review comments, or risk — AI proposes, I decide.
- Anything that would touch credentials, private data, or production systems.
- Small, well-understood edits where reading the code is faster than prompting.

## My non-negotiables

1. **I never paste** credentials, tokens, private keys, unredacted `.env` files,
   production configuration, or real personal/customer data into an AI tool, and
   I strip unrelated context before sharing code or diagnostics.
2. **I always verify** before accepting AI output: read the exact diff, run the
   smallest relevant test, run the full suite when behavior changed, and observe
   the browser myself when the UI is affected. If a check was not performed, I
   write `NOT RUN` — I never upgrade it to `PASS`.
3. **I record AI contributions**: the tool, a prompt/task summary, what context
   I shared, files changed, whether I accepted/edited/rejected the output, and
   the commands and observed results — in the prompt log or evidence index.

## My review rules

- Treat AI as a fast junior contributor: helpful, confident, and sometimes
  wrong. Every claim of "passing" needs evidence I can point to.
- Prefer the smallest defensible change. Reject scope expansion (auth, a
  database, framework swaps, mass reformatting) even when AI offers it.
- Keep AI-proposed grades separate from my final grades until I have checked the
  evidence myself.

## What I am still figuring out

- Building a systematic independent checklist *before* I read AI findings, so my
  own review adds signal instead of just agreeing (my Module 5 security pass
  found no distinct You-only finding — a gap I want to close).
- When a lockfile / pinned dependencies are worth the maintenance cost on a
  small project versus a real reproducibility need.

## Evidence from this course

- **Module 1:** the AI-generated package layout did not start until I repaired
  the structure — generated ≠ working.
- **Module 2:** accepted code used Python 3.10 `X | None` union syntax that fails
  in this project's documented Python 3.9 environment; I replaced it with
  `Optional[X]`.
- **Module 3 / mid-course:** a drag-and-drop bug (`event.target.closest` on a
  text node) only appeared in a real browser, not in tests — so UI changes get a
  real browser check.
- **Mid-course design calls I owned:** I rejected a *stored* overdue flag in
  favor of a derived one, and rejected client-only filtering in favor of
  server-side filtering. I can trace the `loadBoard()` stale-response guard
  (`frontend/index.html`) line by line (see `Docs/governance-worksheet.md` §4).
- **Final project:** I downgraded an AI suggestion to split `requirements.txt`
  and pin hashes to slim the Docker image, keeping the release minimal; the
  container still runs non-root with a verified `/health` 200.

## Decision Card

| Situation | My default move |
|---|---|
| **New feature** | AI drafts from a bounded requirement; I own scope and business rules, and reject out-of-scope additions. Nothing merges without my read + tests. |
| **Code review** | AI does one correctness pass and one maintainability pass; I confirm or overturn each comment against the real diff before it counts. |
| **Debugging** | Share the failing test/handler, the exact error, and a minimal reproduction — not the whole repository. Verify the fix with the smallest test, then the full suite. |
| **Infrastructure (CI/Docker)** | AI drafts; I verify versions are consistent (Python 3.9 across README, Dockerfile, CI), the container runs non-root with no `--reload`, and CI actually runs the real suite with no failure-masking (`--exit-zero`, `continue-on-error`). |
| **Never paste** | Credentials, tokens, private keys, `.env` files, production config, or real personal/customer data. Describe the category; never copy the value. |
| **One governing rule** | AI proposes; I verify and own. If I cannot explain a line or point to its evidence, it does not ship. |
