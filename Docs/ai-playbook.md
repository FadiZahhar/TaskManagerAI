# My AI Coding Playbook

## When I reach for AI first

- For repository-wide new-feature work, I reach for Claude Code because the
  task spans files, commands, and tests.
- For code review, I reach for the Codex App because I need repository
  inspection, evidence comparison, and claim grading.
- For broad architecture summaries where direct repository inspection is
  allowed, I use Strategy A because it produces the most complete, specific,
  and directly cited whole-system account. For bounded backend reviews where
  context access must be tightly controlled, I use Strategy C because it stays
  precise within its approved anchors and explicitly marks unavailable
  evidence.

## When I do not reach for AI

- I do not substitute AI output for direct browser observation of UI behavior.
  If I did not observe it, I record **NOT RUN**.
- I do not share complete repository context when focused files and sanitized
  diagnostic excerpts are enough.
- I do not let AI make my final security grade, product decision, ownership
  judgment, or submission-readiness decision.

## My non-negotiables

- I will never paste credentials, tokens, private keys, unredacted environment
  files, production configuration, or real personal/customer data into an AI
  tool.
- Before accepting AI-generated code, I will inspect the exact diff, run the
  smallest relevant test, run the broader relevant suite, and directly observe
  browser behavior when the change affects the UI. If a check was not
  performed, I will record it as **NOT RUN**.
- I will record the tool, context, changed files, accept/edit/reject decision,
  and observed verification results.

## My review rules

- I compare repository-specific claims with exact source files before accepting
  them.
- I separate confirmed facts, architectural inferences, assumptions, and
  unavailable evidence instead of presenting them with the same confidence.
- I review the smallest diff and focused behavior before running the broader
  suite.

## What I am still figuring out

- I am improving my independent manual-review checklist so AI findings do not
  define my scan.
- I want to test asynchronous browser behavior more deliberately. The
  `loadBoard()` sequence guard is source-understood, but a focused browser race
  test would provide stronger runtime evidence.

## Evidence from this course

| Rule | Module incident or observation | What it changed in my practice |
|---|---|---|
| Verify output in the real environment | Module 1's generated package layout did not start; Module 2 initially used Python 3.10-only syntax in a Python 3.9 project. | I inspect the diff and run focused and broad checks. |
| Observe UI behavior directly | Module 3's drag bug appeared only in a real browser. | UI verification must be observed or recorded as **NOT RUN**. |
| Control context by task shape | A was the strongest broad summary; C was the most honest bounded review and caught stale metadata. | I choose broad inspection or approved anchors according to the task. |
| Grade findings myself | The security review separated reproducible findings, educational limitations, and Noise. | AI findings remain proposals until I grade the evidence. |

## Decision Card

- For a new feature I reach for: **Claude Code**, for work across files,
  commands, and tests.
- For a code review I reach for: **Codex App**, for repository inspection,
  evidence comparison, and grading.
- For debugging I reach for: **Claude Code for backend or test failures, and
  Codex with browser observation for UI failures**.
- For infrastructure I reach for: **Claude Code**, for configuration and
  terminal verification. Module 4 evidence is unavailable on this branch, so
  this choice is based on task shape.
- I will never paste **credentials, tokens, private keys, unredacted environment
  files, production configuration, or real personal/customer data** into an AI
  tool.
- My one rule is: **Inspect the exact diff, run the smallest relevant test, run
  the broader suite, and observe UI behavior in a browser; otherwise record
  NOT RUN.**

## 30-day reread commitment

I will reread and revise this playbook on **2026-08-17**. I will compare these
rules with one real AI-assisted task completed before that date and update any
rule that did not produce a clear decision.
