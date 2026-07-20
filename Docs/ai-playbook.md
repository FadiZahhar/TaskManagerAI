# My AI Coding Playbook

This is my one-page operating guide for using AI on this project. AI can draft
and critique, but I own the scope, evidence, grades, and final decision.

## When I reach for AI first

- Boilerplate I can fully inspect: CI, Docker, FastAPI models, or first-pass
  tests from a bounded requirement.
- Explaining unfamiliar code or an exact error, then proposing a focused fix.
- Drafting evidence or review notes that I will verify against repository facts.

## When I do not reach for AI

- Product scope, business rules, security grades, and release decisions.
- Credentials, private data, production configuration, or real user/customer data.
- Tiny edits where reading the code is faster than prompting.

## My non-negotiables

- I never paste tokens, keys, `.env` files, production logs/config, or real
  personal/customer data into an AI tool.
- I do not mark checks as `PASS` unless I ran or personally observed them; otherwise
  I write `NOT RUN` or `NEEDS OWNER VALIDATION`.
- I reject scope creep such as auth, a database, framework swaps, or mass
  reformatting unless the assignment explicitly asks for it.

## My review rules

- Read the exact diff and verify each claim against real files, commands, or logs.
- Run the smallest relevant test first; run the full suite when behavior changes.
- Keep AI-proposed findings separate from my final owner grade until I check them.

## What I am still figuring out

- How to build a stronger independent checklist before reading AI findings.
- When dependency pinning or split runtime/dev files are worth the maintenance cost.

## Evidence from this course

- Module 1 showed that generated structure is not automatically runnable.
- Module 2 caught Python 3.10 `X | None` syntax in a Python 3.9 project.
- Module 3/mid-course showed that a drag-and-drop bug required browser observation.
- Final review confirmed valid explicit-`null` defects; I documented them instead
  of hiding or rushing an unverified fix.

## Decision Card

- For a new feature I reach for: repository-grounded AI draft, then I own scope,
  business rules, tests, and final acceptance.
- For a code review I reach for: AI review plus my own evidence check before any
  grade counts.
- For debugging I reach for: the exact failing test/error and the smallest
  relevant code path, not the whole repo.
- For infrastructure I reach for: AI draft, then I verify versions, commands,
  CI logs, Docker runtime user, and no failure masking.
- I will never paste credentials, private keys, `.env` files, production config,
  logs, or real personal/customer data into an AI tool.
- My one rule is: if I cannot explain it or point to evidence for it, it does not
  ship.

## 30-day reread commitment

I will reread and revise this playbook on 2026-08-19 after testing it against one
real AI-assisted task.
