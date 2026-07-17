# Tool-Fit Reflection

> Drafted with Module 4 examples for reference. The **My conclusion** and
> **Required reflection** sections must be rewritten in your own voice before
> submitting — the comparison is meant to be yours, not generic.

The module compares tools by **scope of work**, not by declaring one universally best.

## Copilot / Autocomplete

### Best fit in this project
Line-level, in-editor help on small, familiar patterns — e.g. filling in the
repetitive `assert response.status_code == …` bodies in `tests/test_tasks.py`, or
completing a Google-style docstring skeleton once the first one exists.

### Main limitation
No repository-wide view. It cannot reason about the CI workflow, the multi-stage
Dockerfile, the green→red→green Git dance, or whether a docstring's claimed status
code matches the actual route — the Module 4 core work.

### Verification rule
Read every inserted line before accepting; never accept a completion that asserts
a status code or business rule I haven't confirmed in the source.

## Cursor / IDE Chat

### Best fit in this project
File- or selection-level edits with a visible diff — e.g. adding docstrings across
`app/main.py`, or editing the README, where seeing the change inline before
accepting is valuable.

### Main limitation
Terminal-heavy, cross-cutting work (building the Docker image, running the
container, driving `pytest` exit codes, pushing a proof branch) still needs direct
command execution and verification outside the editor.

### Verification rule
Inspect the proposed diff, then actually run the project (tests, `curl /health`)
rather than trusting the explanation.

## Claude Code / Terminal Agent

### Best fit in this project
Repository-level, multi-file, command-driven work: auditing the repo, planning and
writing `ci.yml` + `Dockerfile`, running the build/container, executing the
green→red→green proof, and cross-checking docstrings against the live OpenAPI
schema — all in one place with plan-then-approve control.

### Main limitation
Broad permissions and repo-wide scope mean it can do a lot quickly — including the
wrong thing at scale — so unattended edits or pushes are the risk (e.g. it must not
mutate correct source for a break test without approval).

### Verification rule
`CLAUDE.md` project memory + plan mode + per-command approval + reading every diff +
running tests + recording evidence files; treat any "Pass" as a lead to verify, not
a verdict (see the two **Wrong** findings in `ai-review-log.md`).

## My conclusion

> DRAFT — rewrite in your own voice.

For this Task Tracker I would reach for:
- **a one-line implementation** → Copilot/autocomplete;
- **a file-level refactor** → Cursor/IDE chat (visible diff);
- **CI or Docker work** → Claude Code (repo-wide, terminal-driven);
- **code review** → Claude Code for broad first-pass coverage, verified by hand;
- **documentation verification** → Claude Code, because it can compare docstrings,
  the README, the route table, and the running `/docs` together.

The pattern: the wider the scope, the more capable the tool must be — and the more
disciplined the verification has to become.

## Required reflection

> **DRAFT — rewrite in your own voice; must begin exactly "I would do this differently...".**

I would do this differently by deciding the tool per task up front instead of
defaulting to one: reaching for autocomplete on the mechanical test/docstring work,
and reserving the terminal agent for the CI, Docker, and Git-proof steps where
repo-wide context and command execution actually earned their keep — while keeping
the same rule throughout, that nothing an assistant produces counts until I have
run it or read it against the source myself.
