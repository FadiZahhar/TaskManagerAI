# Module 5 - Step-by-Step Delivery and Evidence Guide

**Module:** Review, Governance, Planning, Context Engineering, and Personal AI Playbooks  
**Project:** Existing Task Tracker repository  
**Primary tool:** Codex App  
**Purpose:** Complete Module 5 in the expected sequence, preserve student ownership, and produce evidence that every AI output was inspected, graded, compared, and converted into a deliberate engineering rule.

---

# 1. What Module 5 is actually teaching

Module 5 is not a new feature-building module. It is a **judgment, governance, and context-engineering module**.

The main question is no longer:

> Can an AI generate a useful answer?

The main questions are:

> Is the answer grounded in the actual repository?  
> What evidence supports it?  
> What did it miss or invent?  
> What belongs in the repository after human review?  
> What rule will I follow next time?

The working sequence is:

> **Read first -> inspect -> grade -> compare -> decide -> document**

The central principle is:

> **AI proposes; you grade.**

A polished AI answer is not the deliverable. The deliverable is your evidence-based decision about that answer.

Module 5 therefore evaluates whether you can:

1. Configure Codex App to respect repository-level instructions.
2. Confirm that the agent is reading real files rather than relying on generic assumptions.
3. Grade AI security findings as **Valid**, **False Positive**, or **Noise**.
4. Perform your own manual security scan and identify **You-only** findings.
5. Reconstruct what you shared with AI and classify the governance risk.
6. Explain one generated code block well enough to claim ownership of it.
7. Compare a generic feature plan with a repository-grounded plan without implementing the feature.
8. Run the same architecture task with three context strategies and explain why their outputs differ.
9. Write a personal AI coding playbook in your own voice, supported by specific course evidence.

---

# 2. The most important Module 5 boundaries

These boundaries should remain active throughout the module.

## 2.1 Docs-first

Most Module 5 outputs belong in `docs/`.

Expected exceptions:

- `AGENTS.md` belongs at the repository root.
- One optional one-line security fix may touch `app/`, but only after you have graded the finding as Valid, confirmed the change is truly minimal, reviewed the exact diff, and deliberately approved it.

## 2.2 Read-only by default

Start every investigation as read-only. Do not allow Codex to edit files merely because it can.

The normal order is:

1. Ask for analysis.
2. Inspect the cited files yourself.
3. Grade the result.
4. Decide what should be saved.
5. Approve only the exact documentation file or minimal fix.

## 2.3 One bounded task per thread

Do not use one long Codex thread for the whole module.

Use fresh threads for:

- setup and `AGENTS.md`;
- security review;
- governance worksheet;
- generic comments plan;
- repository-grounded comments plan;
- Architecture Strategy A;
- Architecture Strategy B;
- Architecture Strategy C;
- final playbook review.

Fresh threads are especially important when comparing outputs. Otherwise, earlier context contaminates the experiment.

## 2.4 Actual file evidence is mandatory

When Codex makes a repository claim, require:

- the exact file path;
- a line number when available;
- a brief evidence summary;
- a confidence level or limitation.

Statements such as “FastAPI apps usually...” are not repository evidence.

## 2.5 No hidden application changes

Reject unexpected edits to `app/`, tests, workflows, Docker files, or frontend files.

After every approved write, inspect:

```bash
git status --short
git diff --stat
git diff
```

## 2.6 No placeholders in submitted artifacts

Prompts in this guide contain placeholders because you must paste your own evidence into them. Final repository documents must not contain items such as:

```text
[PASTE AI FINDINGS HERE]
[PASTE YOUR NOTES HERE]
___
<TODO>
TBD
```

## 2.7 Student ownership cannot be delegated

The following judgments must remain yours:

- final security classifications;
- manual security findings;
- top-three backlog priorities;
- risk classifications for what you shared;
- whether you understand generated code;
- plan critique labels;
- selected context strategy;
- context-engineering rule;
- playbook rules;
- Decision Card answers.

Codex may help organize or challenge these judgments. It must not make them for you.

---

# 3. Expected Module 5 deliverables

The prompt library organizes Module 5 into Parts 5.1 through 5.6.

| Part | Core activity | Expected artifact | Evidence that makes it acceptable |
|---|---|---|---|
| 5.1 | Codex App setup and repository grounding | `AGENTS.md` | Repo-grounded stack, commands, business rules, Module 5 guardrails, and two successful smoke tests |
| 5.2 | Security review and human grading | `docs/security-review.md` | AI findings graded Valid / False Positive / Noise, manual scan, Agreement / AI-only / You-only reconciliation, top-three backlog |
| 5.3 | Governance retrospective | `docs/governance-worksheet.md` | “What I Shared” risk table, one generated block traced line by line, three concrete personal usage rules |
| 5.4 | Comments-feature planning | `docs/decisions/comments-feature-plan.md` | Generic baseline, repository-grounded plan, section-by-section critique, no feature implementation |
| 5.5 | Context-engineering experiment | `docs/architecture-A.md`, `docs/architecture-B.md`, `docs/architecture-C.md`, and `docs/architecture.md` | Three genuinely separate context strategies, comparison table, chosen strategy, transferable two-sentence rule |
| 5.6 | Personal AI coding playbook | `docs/ai-playbook.md` | Own voice, course evidence, completed Decision Card, concrete never-paste rule, 30-day reread commitment |

Recommended supporting evidence:

```text
docs/
├── security-review.md
├── governance-worksheet.md
├── architecture-A.md
├── architecture-B.md
├── architecture-C.md
├── architecture.md
├── ai-playbook.md
├── decisions/
│   └── comments-feature-plan.md
└── module-5/
    ├── evidence-index.md
    ├── setup-smoke-tests.md
    ├── security-audit-raw.md
    ├── comments-plan-generic.md
    ├── comments-plan-comparison.md
    └── final-audit.md
```

The files under `docs/module-5/` are recommended evidence helpers. The core expected artifacts are the files listed in the table.

---

# 4. What each part is proving

## 4.1 Part 5.1 proves repository grounding

A strong result shows that Codex:

- opened the correct Task Tracker repository;
- read the actual project files;
- follows `AGENTS.md`;
- understands that Module 5 is docs-first and read-only by default;
- distinguishes confirmed facts from assumptions.

## 4.2 Part 5.2 proves security-review judgment

A strong result is not the longest security report. It shows:

- the AI cited real code;
- you manually verified every important claim;
- you did not accept generic findings merely because they sounded professional;
- you found at least some context the AI missed, when such context exists;
- you separated course-scope limitations from production vulnerabilities;
- you converted confirmed issues into a realistic top-three backlog.

## 4.3 Part 5.3 proves governance ownership

A strong result shows that you know:

- what information you sent to AI tools;
- why some inputs are low, medium, or high risk;
- how to share less next time;
- whether you truly understand generated code;
- how you will record AI contributions.

## 4.4 Part 5.4 proves planning quality

A strong result shows the difference between:

- a coherent generic plan that could fit many task trackers; and
- a repository-grounded plan that names actual files, storage behavior, test conventions, frontend structure, and migration implications.

You plan and critique the comments feature. You do not implement it.

## 4.5 Part 5.5 proves context engineering

A strong result shows that you can select context intentionally rather than simply providing “more context.”

You compare:

- **Strategy A - Minimal context:** broad discovery, but greater risk of generic or invented claims.
- **Strategy B - Structured context:** more complete and specific, but potentially longer or overconfident.
- **Strategy C - Targeted context:** narrower and more honest, but likely to miss details outside the selected anchor files.

The comparison and resulting rule matter more than any single architecture draft.

## 4.6 Part 5.6 proves personal operating discipline

A strong playbook is not a generic responsible-AI policy. It should sound like you and cite incidents from your work in Modules 1-5.

It should help a teammate predict what you will do in a future task.

---

# 5. Placeholders used in this guide

Replace these before using the prompts or commands.

| Placeholder | Meaning | Example |
|---|---|---|
| `<DEFAULT_BRANCH>` | Repository integration branch | `main` |
| `<MODULE_BRANCH>` | Module 5 working branch | `module-5-governance` |
| `<TEST_COMMAND>` | Exact repository test command | `pytest -q` or `pytest -v` |
| `<RUN_COMMAND>` | Exact application run command | Confirm from the repository |
| `<AI_FINDINGS>` | Raw findings from the Codex security audit | Paste the complete table |
| `<GRADED_FINDINGS>` | Findings with your provisional grades | Paste the reviewed table |
| `<MANUAL_FINDINGS>` | Findings from your own scan | Paste only your observations |
| `<WHAT_I_SHARED_TABLE>` | Your governance inventory | Paste completed rows |
| `<GENERATED_CODE_BLOCK>` | One AI-generated block from Modules 1-4 | Paste the exact block |
| `<GOVERNANCE_NOTES>` | Your completed worksheet notes | Paste your own notes |
| `<GENERIC_PLAN>` | Generic comments plan | Paste Strategy 5.4A output |
| `<GROUNDED_PLAN>` | Repo-grounded comments plan | Paste Strategy 5.4B output |
| `<REPO_NOTES>` | File evidence you personally checked | Paste concise evidence |
| `<AGENTS_CONTENT>` | Final verified `AGENTS.md` | Paste the file contents |
| `<FILE_SUMMARIES>` | One-line summaries of important app files | Paste verified summaries |
| `<ARCHITECTURE_A/B/C>` | The three architecture drafts | Paste each complete draft |
| `<PLAYBOOK_DRAFT>` | Your personally written playbook | Paste your own draft |

Do not submit a final document with any placeholder still present.

---

# 6. Recommended thread map

Use this thread plan to prevent context leakage.

| Thread | Purpose | Repository access? | Expected write access? |
|---|---|---:|---:|
| T1 | Guardrails, `AGENTS.md`, smoke tests | Yes | `AGENTS.md` only after approval |
| T2 | Security audit and grading | Yes | `docs/security-review.md` only after grading |
| T3 | Governance worksheet | Optional repo access | `docs/governance-worksheet.md` only |
| T4 | Generic comments plan | No repo context | No application files; save baseline only if desired |
| T5 | Repo-grounded comments plan | Yes | `docs/decisions/comments-feature-plan.md` only |
| T6 | Architecture Strategy A | Yes, minimal instruction | `docs/architecture-A.md` only |
| T7 | Architecture Strategy B | Structured pasted context | `docs/architecture-B.md` only |
| T8 | Architecture Strategy C | Exactly three anchor files | `docs/architecture-C.md` only |
| T9 | Architecture comparison | Only the three drafts | `docs/architecture.md` only |
| T10 | Playbook template and review | Your notes/draft | `docs/ai-playbook.md` only after you write it |

A new thread should begin with the Module 5 guardrail prompt in Section 8.

---

# 7. Phase 0 - Prepare a controlled baseline

## Objective

Create a safe branch, understand the starting repository state, and ensure Module 5 changes can be separated from prior work.

## Step 0.1 - Open the actual repository root

```bash
cd /path/to/your/task-tracker
pwd
git rev-parse --show-toplevel
git status
git branch --show-current
```

The path from `git rev-parse --show-toplevel` should be the Task Tracker root.

## Step 0.2 - Create a Module 5 branch

Do not discard existing work. First inspect:

```bash
git status --short
```

If clean:

```bash
git switch <DEFAULT_BRANCH>
git pull
git switch -c <MODULE_BRANCH>
```

Example:

```bash
git switch main
git pull
git switch -c module-5-governance
```

## Step 0.3 - Record the baseline

```bash
python --version
git ls-files
<TEST_COMMAND>
```

Running the test suite is not the core Module 5 exercise, but it establishes that any later application failure was not present at the start.

Record:

- branch name;
- current commit;
- test result;
- repository root;
- whether `AGENTS.md` already exists;
- whether `docs/` already exists;
- whether there are uncommitted changes.

## Step 0.4 - Create documentation directories

```bash
mkdir -p docs/decisions docs/module-5
```

This command should not create or modify application files.

## Step 0.5 - Create a baseline evidence note

Recommended file:

```text
docs/module-5/evidence-index.md
```

Initial template:

```markdown
# Module 5 Evidence Index

## Baseline
- Date:
- Repository root:
- Branch:
- Starting commit:
- Test command:
- Test result:
- Existing uncommitted work:

## Part 5.1 - Setup and grounding
- AGENTS.md:
- Project evidence smoke test:
- Recent-files smoke test:

## Part 5.2 - Security review
- Security review:
- Manual scan:
- Reconciliation:
- Top-three backlog:
- Optional code fix, if any:

## Part 5.3 - Governance
- What I Shared table:
- Generated code trace:
- Personal usage rules:

## Part 5.4 - Feature planning
- Generic plan:
- Repo-grounded plan:
- Critique and comparison:

## Part 5.5 - Context engineering
- Architecture A:
- Architecture B:
- Architecture C:
- Comparison and chosen rule:

## Part 5.6 - Personal playbook
- Playbook:
- Decision Card:
- 30-day reread date:

## Final verification
- Unexpected application edits:
- Placeholder scan:
- Tests:
- Final commit:
```

## Phase 0 exit gate

- [ ] Correct repository root confirmed.
- [ ] Module 5 branch created without losing work.
- [ ] Starting commit recorded.
- [ ] Existing tests pass, or pre-existing failures are documented.
- [ ] `docs/decisions/` and `docs/module-5/` exist.
- [ ] Evidence index created.
- [ ] No Module 5 AI task has started before the baseline is understood.

---

# 8. Reusable Codex App prompts

## Copy/paste prompt P00 - Module 5 thread guardrails

Paste this at the start of every fresh Codex App thread that can see the repository.

```text
I am working in Module 5 of AI-Assisted Coding with the Task Tracker repository in Codex App.

Module goal:
I am grading and governing AI-assisted coding work. I am not building new app features in this module.

Default constraints:
- Prefer read-only analysis first.
- Edit files in docs/ only unless I explicitly approve a different path.
- Do not modify app/, tests/, frontend/, CI, Docker, dependency files, or configuration during Module 5 unless I explicitly approve one specific minimal fix.
- Use one bounded task per thread.
- When you make claims about the repository, cite the actual files you inspected and line numbers when available.
- If you are uncertain, a file is unavailable, or a fact is not visible, say so instead of guessing.
- Do not expose, copy, or request credentials, tokens, secrets, personal data, production data, or private configuration.
- Do not run destructive commands, commit, push, reset, delete, or rewrite history.
- Treat every answer as a draft for me to grade.

Before answering, briefly state:
1. The bounded task you think I am asking for.
2. The files you plan to inspect, if any.
3. Whether you need permission to edit anything.
```

## Optional guardrail confirmation

```text
Before you continue, restate the Module 5 guardrails in your own words. Name every repository area you will not change unless I explicitly approve it.
```

## Copy/paste prompt P00B - Read-only evidence challenge

Use this whenever an answer seems generic or too confident.

```text
Pause and re-evaluate your answer as a read-only evidence review.

For every repository-specific claim:
- identify the exact source file;
- cite the relevant line or symbol when available;
- distinguish confirmed fact from inference;
- state what would need manual verification;
- remove any claim that is based only on framework convention.

Do not edit files.
```

## Copy/paste prompt P00C - Approve one documentation write

Use only after you have reviewed a draft.

```text
I approve only the following write:

Target file:
<EXACT DOCS PATH>

Approved content:
<DESCRIBE THE APPROVED DRAFT OR PASTE IT>

Constraints:
- Modify only the exact target file.
- Do not change app/, tests/, frontend/, configuration, CI, Docker, dependencies, or any other file.
- Preserve my wording where I have written the final judgment.
- Do not add unsupported facts.
- Do not commit or push.

After writing, show:
1. git status --short
2. git diff --stat
3. the complete diff for the target file
4. any placeholder or unsupported claim still present
```

## Copy/paste prompt P00D - Challenge an AI conclusion

```text
Challenge the conclusion below rather than defending it automatically.

Conclusion:
<PASTE ONE CONCLUSION>

Return:
1. Evidence supporting it.
2. Evidence contradicting it.
3. Missing context.
4. Whether it is Confirmed, Partially Supported, Unsupported, or Wrong.
5. The smallest manual check that would settle the question.

Do not edit files and do not invent repository facts.
```

---

# 9. Phase 1 - Codex App setup, AGENTS.md, and grounding smoke tests

## Objective

Prove that Codex is operating in the correct repository, follows durable project instructions, and can support claims with actual file evidence.

## Step 1.1 - Start a fresh Codex App thread

Open the Task Tracker repository in Codex App. Paste **P00**.

Confirm that Codex understands:

- this is Module 5;
- analysis is read-only by default;
- `docs/` is the normal working area;
- `app/` changes are not permitted by default;
- every repository claim needs file evidence.

## Step 1.2 - Draft or review AGENTS.md

## Copy/paste prompt P01 - Repo-grounded AGENTS.md

```text
You are helping me set up Codex App for the Module 5 Task Tracker repository.

Task:
Draft an AGENTS.md file for this repository. Read the repository first, especially:
- README.md
- app/main.py or the actual API entry file
- app/models.py or equivalent schema/model files
- app/storage.py or the actual persistence files
- tests/
- frontend/index.html or equivalent frontend files, if present
- requirements.txt or pyproject.toml, if present
- Dockerfile and .github workflows, if present

AGENTS.md must include:
1. Project summary.
2. Tech stack and run/test commands that are actually supported by this repository.
3. Repository structure and important files.
4. Business rules visible in the code, including task statuses, priorities, validation rules, transition rules, storage behavior, and error behavior when confirmed.
5. Module 5 guardrails: docs-first, read-only by default, one bounded task per thread, and no app/ changes unless explicitly approved.
6. Security and governance reminders: never expose secrets or personal data, do not run destructive commands, cite actual files, distinguish assumptions, and do not invent findings.
7. Verification expectations: show proposed changes before writing and show the final diff after writing.

Constraints:
- Do not edit any file yet.
- Do not propose changes outside AGENTS.md.
- List the files you read before presenting the draft.
- If a command, business rule, or architecture detail is not visible, mark it "not confirmed" rather than inventing it.
- Keep the instructions useful and repository-specific, not generic FastAPI advice.

Output format:
1. Files inspected
2. Proposed AGENTS.md
3. Assumptions or items I must verify
4. Exact target path
5. Diff preview if I later approve the write
```

## Step 1.3 - Manually verify the AGENTS.md draft

Check every claim against the repository.

### Project facts

- Does the summary describe this Task Tracker rather than any task tracker?
- Is the stack confirmed by dependency files and code?
- Are run and test commands exact?
- Are file paths real?

### Business rules

Verify:

- exact task status values;
- exact priority values;
- title/body length validation;
- allowed status transitions;
- invalid transition behavior;
- missing-task behavior;
- storage behavior;
- frontend assumptions;
- local ports and CORS, if documented.

### Module 5 rules

Confirm that `AGENTS.md` says:

- docs-first;
- read-only by default;
- one bounded task per thread;
- no `app/` changes without explicit approval;
- no secret exposure;
- no destructive commands;
- cite files;
- do not invent findings.

## Copy/paste prompt P02 - Audit the AGENTS.md draft

```text
Review the proposed AGENTS.md against the actual repository and the Module 5 guardrails.

For each instruction, label it:
- Supported by repository evidence
- Useful Module 5 guardrail
- Too broad
- Too risky
- Unsupported or not confirmed

Return a table with columns:
Instruction | Label | Evidence file or reason | Minimal correction

Then identify:
1. Any generic statement that could describe any FastAPI project.
2. Any command that has not been confirmed.
3. Any business rule that may be invented.
4. Any permission that is too broad for Module 5.

Do not edit files.
```

Correct the draft yourself. Then use **P00C** to approve only `AGENTS.md`.

## Step 1.4 - Inspect the write

```bash
git status --short
git diff -- AGENTS.md
git diff --check
```

Do not continue if unrelated files changed.

## Step 1.5 - Run the project evidence smoke test

## Copy/paste prompt P03 - Project evidence smoke test

```text
Summarize the Task Tracker repository in exactly five evidence-based rows.

For each row:
- state one specific claim;
- name the exact file or files inspected;
- briefly quote or paraphrase the evidence;
- state confidence as High, Medium, or Low;
- state one assumption that still requires verification, or write "None".

Constraints:
- Read-only.
- Do not edit files.
- Do not run tests or start the application.
- Do not rely on generic FastAPI assumptions.
- Do not include a claim when you cannot point to evidence.

Output format:
Claim | Evidence file | Evidence summary | Confidence | Assumption to verify
```

Manually open at least two cited files and confirm that the evidence exists.

## Step 1.6 - Run the recent-files smoke test

This test confirms filesystem awareness without relying on Git history.

## Copy/paste prompt P04 - Recent-files smoke test

```text
Using filesystem metadata only, identify the three most recently modified files inside this repository.

For each file, provide:
- file path;
- last modified time, if visible;
- one sentence describing the content you actually inspected;
- evidence confidence.

Constraints:
- Do not use git.
- Do not edit anything.
- Do not infer content from the filename alone; open or inspect the file before describing it.
- If filesystem metadata is unavailable, say so clearly and propose one safe read-only alternative.

Output format:
File | Modified time | What the file contains | Evidence confidence
```

Optional proof question:

```text
Choose one file from your table and give one specific detail that proves you opened the file rather than only reading its name.
```

## Step 1.7 - Record setup evidence

Recommended file:

```text
docs/module-5/setup-smoke-tests.md
```

Template:

```markdown
# Module 5 Setup and Grounding Evidence

## Repository
- Root:
- Branch:
- Starting commit:

## AGENTS.md verification
| Claim or instruction | Source checked | Accurate? | Correction made |
|---|---|---|---|
| ... | ... | Yes / No | ... |

## Project evidence smoke test
| Claim | File checked manually | Result |
|---|---|---|
| ... | ... | Confirmed / Corrected |

## Recent-files smoke test
| File | Metadata visible? | Detail proving content was inspected |
|---|---|---|
| ... | ... | ... |

## Conclusion
- Codex is grounded in the correct repository: Yes / No
- Remaining uncertainty:
```

## Step 1.8 - Commit Part 5.1

```bash
git add AGENTS.md docs/module-5/setup-smoke-tests.md docs/module-5/evidence-index.md
git commit -m "docs: add Module 5 agent guidance and grounding evidence"
```

## Phase 1 exit gate

- [ ] Codex App opened the correct repository.
- [ ] P00 guardrails were acknowledged.
- [ ] `AGENTS.md` is repository-specific.
- [ ] Commands and business rules were manually verified.
- [ ] Unsupported facts were corrected or marked not confirmed.
- [ ] Project evidence smoke test contains five file-grounded claims.
- [ ] At least two smoke-test claims were manually checked.
- [ ] Recent-files smoke test used filesystem metadata rather than Git.
- [ ] No application files changed.
- [ ] Setup evidence was saved.

---

# 10. Phase 2 - Read-only security review, grading, manual scan, and backlog

## Objective

Produce `docs/security-review.md` as a **graded security analysis**, not an unreviewed AI report and not a broad code-refactoring exercise.

The strongest evidence in this phase is:

1. Your grading of each AI finding.
2. Your independent manual scan.
3. The **You-only** column.
4. Your top-three security backlog.

## Step 2.1 - Start a fresh security-review thread

Paste **P00**.

Tell Codex that the task is read-only and that the target output will eventually be `docs/security-review.md`, but it must not create the file yet.

## Step 2.2 - Run the read-only security audit

## Copy/paste prompt P05 - Evidence-based security audit

```text
You are a security-minded reviewer conducting a read-only audit of the Task Tracker repository in Codex App.

Inspect relevant files before answering, including where present:
- AGENTS.md
- backend entry points and route files
- models, schemas, validation, and status-transition logic
- storage or persistence files
- tests/ to understand expected behavior
- requirements.txt or pyproject.toml
- Dockerfile, compose files, and .dockerignore
- .github workflows
- frontend/index.html or equivalent frontend files
- README.md and configuration files

Review these areas:
1. Input validation: unbounded strings, missing limits, enum handling, IDs, type assumptions, update payloads, and server/client validation differences.
2. Authorization: gaps or the intentional absence of authentication as a course-scope decision.
3. Data exposure: verbose errors, stack traces, secrets, environment configuration, unsafe logging, and unintended response data.
4. Error handling: broad exceptions, swallowed failures, inconsistent status codes, and failure masking.
5. Dependencies, CI, Docker, and deployment risks.
6. CORS and frontend/backend API assumptions.
7. Storage behavior, concurrency assumptions, and data durability where visible.

Constraints:
- Read-only. Do not edit files.
- Do not run destructive commands.
- Do not invent findings to fill categories.
- If a category is clean, not applicable, or not visible, say so.
- Cite actual file paths and line numbers when available.
- Distinguish confirmed evidence from hypotheses.
- Do not automatically call intentional course scope a vulnerability without explaining the production implication.

Output format:
Return a markdown table with columns:
ID | Severity | File / location | Finding | Evidence | Suggested next step | Confidence

After the table include:
1. Files inspected
2. Categories where no issue was found
3. Assumptions and limits of the audit
4. Findings that may be course-scope decisions rather than defects

Do not create or modify docs/security-review.md yet.
```

Save the raw output separately if useful:

```text
docs/module-5/security-audit-raw.md
```

Do not treat the raw output as the final deliverable.

## Step 2.3 - Challenge course-scope findings

## Copy/paste prompt P06 - Course-scope versus production-risk check

```text
Review only the findings from the security audit that involve authentication, persistence, deployment, CORS, or other course-scope limitations.

For each one, distinguish:
1. Current course expectation.
2. Actual repository behavior.
3. Production risk outside the course context.
4. Whether the item is a defect, an accepted limitation, a documentation note, or a backlog item.
5. Evidence needed before assigning severity.

Do not invent new findings and do not edit files.
```

## Step 2.4 - Perform your own manual security scan

Do this before asking AI to reconcile findings.

Open and inspect the repository yourself. Use this checklist.

### A. Inputs and models

- Are required fields actually required?
- Are string lengths bounded?
- Are enum values enforced?
- Are empty or whitespace-only values handled?
- Are partial updates restricted correctly?
- Can clients submit server-owned fields?
- Are IDs validated consistently?

### B. Routes and errors

- Are missing resources handled consistently?
- Are invalid transitions rejected?
- Are stack traces or internal exception details exposed?
- Are broad `except Exception` blocks hiding failures?
- Are HTTP status codes accurate?
- Are errors returned in a predictable shape?

### C. Authentication and authorization

- Is authentication intentionally absent?
- Would every user be able to read or modify every task in production?
- Is that limitation documented rather than misrepresented as a completed security control?

### D. Storage

- Is storage in memory?
- Is data lost at restart?
- Are concurrent writes safe?
- Are IDs predictable or collision-prone?
- Is persistence behavior documented?

### E. Frontend and CORS

- Is API origin hard-coded?
- Is CORS broader than required?
- Does the frontend trust server responses safely?
- Does it inject unsanitized text into HTML?
- Are failures hidden or ignored?

### F. Dependencies and delivery

- Are dependencies pinned or constrained?
- Do tests and CI use the same dependencies?
- Does CI mask failures?
- Does Docker run as non-root?
- Could secrets enter the image or Git history?
- Is development-only configuration used in a production-like runtime?

### G. Secrets and data

- Are `.env` files tracked?
- Are tokens or keys present in source, history, examples, or screenshots?
- Is real user data present?
- Are logs safe to share?

Record only findings you can explain with evidence.

Manual finding template:

```markdown
| ID | Severity | File/location | My finding | Evidence | Why AI may miss it | Proposed disposition |
|---|---|---|---|---|---|---|
| M1 | ... | ... | ... | ... | ... | Backlog / Docs / Test / Optional fix |
```

## Step 2.5 - Grade each AI finding

Use your own preliminary judgment first. Then use Codex as a grading assistant.

Definitions:

- **Valid:** A real issue in this repository, or a course-scope limitation that would matter outside the learning context.
- **False Positive:** Wrong because of actual code, actual behavior, severity, or project scope.
- **Noise:** Technically true but too generic, trivial, unsupported, or low-value to become an action item.

## Copy/paste prompt P07 - Grade AI security findings

```text
I am grading AI security findings for Module 5.

Definitions:
- Valid: a real issue in this repository, or a course-scope limitation that would matter outside the learning context.
- False Positive: wrong because of the actual code, behavior, severity, or Task Tracker scope.
- Noise: technically true but too generic, trivial, unsupported, or low-value to become an action item.

Task:
For each finding below, help me evaluate whether it should be Valid, False Positive, or Noise.

Constraints:
- Do not invent new findings.
- Do not upgrade severity without evidence.
- Ask for file evidence when needed rather than guessing.
- Treat the absence of authentication carefully: it may be intentional course scope while still representing a production risk.
- Explain uncertainty.
- Keep the final judgment mine.

Output format:
Finding ID | Proposed grade | Reason | Evidence used or evidence needed | Student decision to confirm

AI findings:
<AI_FINDINGS>
```

After receiving the output, personally fill the final grade. Do not copy “Student decision to confirm” as if it were already your decision.

## Step 2.6 - Reconcile AI and manual findings

## Copy/paste prompt P08 - Agreement / AI-only / You-only reconciliation

```text
I completed a Module 5 security review. Below are the graded AI findings and my independent manual findings.

Task:
1. Group findings into Agreement, AI-only, and You-only.
2. Write a two-line observation about the shape of AI coverage.
3. Create a top-three security backlog using only findings I graded Valid.

Definitions:
- Agreement: both AI and I identified the issue or a closely related issue.
- AI-only: AI identified it and I did not identify it during my manual scan.
- You-only: I identified it and AI missed it. This is the most important learning column.

Constraints:
- Do not invent new findings.
- If a finding lacks file evidence, mark it "needs evidence" rather than confirmed.
- Preserve my final grades.
- Suggested owners must be realistic: backend, frontend, DevOps, or course/project owner.
- Do not automatically prioritize by AI severity; explain actual impact and feasibility.

Output format:
1. Reconciliation table with columns: Agreement | AI-only | You-only
2. Two-line observation
3. Top-three backlog table with columns: Rank | Finding | Why it matters | Suggested owner | Next action

Graded AI findings:
<GRADED_FINDINGS>

My manual findings:
<MANUAL_FINDINGS>
```

## Step 2.7 - Build the final security-review.md

Recommended structure:

```markdown
# Security Review

## 1. Scope and method
- Repository/branch:
- Date:
- Files inspected:
- Review was read-only: Yes / No
- Limits of the review:

## 2. AI-generated findings and my grades
| ID | AI severity | File/location | Finding | My grade | Evidence checked | Final reason | Disposition |
|---|---|---|---|---|---|---|---|
| S1 | ... | ... | ... | Valid / False Positive / Noise | ... | ... | Backlog / Docs / Test / No action |

## 3. Manual scan findings
| ID | Severity | File/location | My finding | Evidence | Disposition |
|---|---|---|---|---|---|
| M1 | ... | ... | ... | ... | ... |

## 4. Reconciliation
| Agreement | AI-only | You-only |
|---|---|---|
| ... | ... | ... |

## 5. Observation about AI coverage
[Write two specific lines in your own voice.]

## 6. Top-three security backlog
| Rank | Finding | Why it matters | Owner | Next action | Verification of completion |
|---|---|---|---|---|---|
| 1 | ... | ... | ... | ... | ... |

## 7. Course-scope versus production risk
| Item | Course decision | Production implication | Current treatment |
|---|---|---|---|
| ... | ... | ... | ... |

## 8. Optional minimal fix
- Finding:
- Decision: Applied / Not applied / Backlog
- Reason:
- Diff:
- Verification:

## 9. Review limitations
- ...
```

Use **P00C** to save only `docs/security-review.md` after you have replaced AI-proposed judgments with your own final decisions.

## Step 2.8 - Optional one-line fix

This is optional. Skip it unless one Valid finding has a clearly bounded, low-risk fix.

## Copy/paste prompt P09 - Preview one optional minimal fix

```text
I want to evaluate one optional minimal fix from docs/security-review.md.

Finding:
<PASTE EXACTLY ONE VALID FINDING>

Task:
Propose the smallest diff that addresses only this finding. Do not apply it.

Constraints:
- One finding only.
- No refactoring.
- No unrelated validation changes.
- No new dependencies.
- Do not edit tests unless I explicitly ask.
- Do not modify API contracts or business rules unless the finding itself requires that exact change.
- If this is not truly a one-line or very small isolated fix, classify it as backlog instead.

Output format:
1. Decision: minimal fix or backlog
2. Minimal unified diff
3. Why the change is bounded
4. Possible side effects
5. Exact verification command or manual check
```

Before applying:

- inspect the target file;
- understand the side effect;
- checkpoint Git state;
- approve the exact line;
- run the relevant tests and full suite;
- record the result in `docs/security-review.md`.

After an optional fix:

```bash
git status --short
git diff
git diff --check
<TEST_COMMAND>
```

No other `app/` change is allowed.

## Step 2.9 - Commit Part 5.2

Without a code fix:

```bash
git add docs/security-review.md docs/module-5/security-audit-raw.md docs/module-5/evidence-index.md
git commit -m "docs: grade and reconcile Module 5 security findings"
```

With an approved minimal fix, stage only the exact changed file plus documentation.

## Phase 2 exit gate

- [ ] Security audit was read-only.
- [ ] Findings cite actual repository files.
- [ ] Clean/not-applicable categories are stated honestly.
- [ ] Every AI finding has one final grade: Valid, False Positive, or Noise.
- [ ] Severity was not accepted without evidence.
- [ ] A separate manual scan was completed before reconciliation.
- [ ] Agreement, AI-only, and You-only columns exist.
- [ ] You-only findings are specific and evidence-backed.
- [ ] Two-line AI-coverage observation is in your voice.
- [ ] Top-three backlog uses only Valid findings.
- [ ] Course-scope limitations are distinguished from production risk.
- [ ] Optional fix, if any, was truly minimal and verified.
- [ ] Final artifact is `docs/security-review.md`.
- [ ] No broad application refactor occurred.

---

# 11. Phase 3 - Governance worksheet and ownership of AI-generated work

## Objective

Reconstruct what you shared with AI, understand the risk of that sharing, demonstrate ownership of one generated code block, and create three concrete personal usage rules.

## Step 3.1 - Create the governance worksheet structure

Create:

```text
docs/governance-worksheet.md
```

Start with this structure, but fill it with your own course evidence.

````markdown
# AI Governance Worksheet

## 1. What I Shared
| Module/task | AI tool | What I shared | Public or private? | Secrets/PII? | Initial risk | Why | Safer future version |
|---|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | ... | ... |

## 2. What I Received
| Module/task | AI output | Where used | Reviewed how? | Accepted, modified, or rejected? |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## 3. One Generated Block I Must Own
### Source and context
- Module:
- Tool:
- File:
- Why I selected this block:

### Code block
```language
[PASTE THE EXACT BLOCK HERE WHILE WORKING, THEN REMOVE THIS INSTRUCTION]
```

### Line-by-line trace
| Line(s) | What it does | Why it exists | What could break | Assumption to verify | Do I own this yet? |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | Yes / Not yet |

### Check questions and my answers
1. Question:
   - My answer:
2. Question:
   - My answer:
3. Question:
   - My answer:

## 4. My Three AI Usage Rules
| Rule category | Final rule | Course evidence | How a teammate can test compliance |
|---|---|---|---|
| What I will never paste | ... | ... | ... |
| What I will always verify | ... | ... | ... |
| How I will record AI contributions | ... | ... | ... |

## 5. Reflection
- The highest-risk thing I shared was:
- The main habit I will change is:
- One generated artifact I now understand better is:
````

## Step 3.2 - Reconstruct “What I Shared”

Review Modules 1-4 and identify actual inputs you sent to AI tools.

Possible categories include:

- course toy-project code;
- complete repository context;
- error messages;
- terminal output;
- screenshots;
- GitHub links;
- `.env` examples;
- dependency files;
- names or email addresses;
- generated code;
- internal or private repository details.

Do not invent a clean history. Record what actually happened.

Use this risk rubric:

- **Low:** Public code or course toy-project code with no secrets, personal data, or proprietary logic.
- **Medium:** Private but non-sensitive code, internal implementation details, or non-public repository context without secrets or PII.
- **High:** Credentials, tokens, secrets, production configuration, real customer/user data, regulated data, or code you were not authorized to share.

## Copy/paste prompt P10 - Classify what you shared

```text
I am completing a Module 5 governance retrospective about information I shared with AI coding tools during this course.

Risk rubric:
- Low: public code or course toy-project code, with no sensitive data, proprietary logic, secrets, or PII.
- Medium: private but non-sensitive code, internal implementation details, or non-public repository context with no secrets and no PII.
- High: credentials, tokens, secrets, production configuration, real customer/user data, regulated data, or code I am not authorized to share.

Task:
For each row in my What I Shared table:
1. Propose Low, Medium, or High.
2. Give a one-sentence reason.
3. Suggest a safer future version that shares less while preserving the task.
4. Identify any ambiguity I must resolve.

Constraints:
- If a row is ambiguous, name the missing information instead of guessing.
- Do not minimize risk because the project is small or educational.
- Do not invent rows.
- Keep the final classification mine.

Output format:
Item shared | Proposed risk | Reason | Safer future version | Ambiguity to resolve | Student decision

What I Shared:
<WHAT_I_SHARED_TABLE>
```

Manually finalize the risk column.

## Step 3.3 - Select one generated code block

Choose one AI-generated block from Modules 1-4 that you cannot fully explain yet.

Good candidates:

- a Pydantic validator;
- a status-transition function;
- a pytest fixture;
- frontend drag-and-drop logic;
- a GitHub Actions step;
- a Dockerfile stage;
- an error-handling block.

Choose a block with enough substance to learn from, but small enough to explain line by line.

## Copy/paste prompt P11 - Trace generated code line by line

```text
Walk me through the following AI-generated code block line by line or in the smallest meaningful groups.

For each line or group, explain:
1. What it does.
2. Why it is written this way.
3. What would break if it were removed or changed.
4. Any assumption, risk, framework behavior, or library behavior I should verify.
5. One check I can perform to confirm the explanation.

Constraints:
- Use beginner-friendly but precise language.
- Ask for surrounding files if the explanation requires context.
- If uncertain, say so.
- Do not say "this is standard" without explaining why.
- Do not rewrite the code.
- Do not claim I understand it merely because you explained it.

Output format:
Line(s) | What it does | Why it is there | What could break | Assumption/check | Do I own this yet?

Code block:
<GENERATED_CODE_BLOCK>
```

## Copy/paste prompt P12 - Ownership check questions

```text
From the line-by-line trace, identify the three most important concepts I must understand before I can claim ownership of this code.

For each concept:
- cite the relevant line or lines;
- ask me one concrete check question;
- do not answer the question for me;
- state what evidence would show that my answer is correct.

Ask exactly three questions.
```

Answer the questions yourself in the worksheet.

Mark “Do I own this yet?” as **Yes** only when you can explain the behavior and verify the key assumptions without repeating the AI wording.

## Step 3.4 - Turn notes into three personal rules

The required rule categories are:

1. What I will never paste.
2. What I will always verify before accepting.
3. How I will record AI contributions.

Each rule must be enforceable. “Be careful” is not a rule.

## Copy/paste prompt P13 - Sharpen personal AI usage rules

```text
Use only my governance worksheet notes below. Do not invent events, examples, or policies.

Task:
Help me sharpen three personal AI usage rules:
1. What I will never paste.
2. What I will always verify before accepting.
3. How I will record AI contributions.

Quality bar:
- Each rule must be concrete enough that a teammate could determine whether a future action violates it.
- Each rule must cite an actual course incident or observation from my notes.
- A rule such as "be careful" or "double-check things" is too vague.

Constraints:
- Do not write a generic company policy.
- Do not add examples that are not in my notes.
- If evidence is missing, write "Missing - add course evidence".
- Keep the final wording mine.

Output format:
Rule category | Draft rule | Evidence from my notes | What is still vague? | Revised rule | Student final wording

My notes:
<GOVERNANCE_NOTES>
```

After Codex responds, rewrite the final wording yourself.

Optional scenario test:

```text
For each of my three final rules, give one future scenario and ask me whether the rule produces a clear Allow / Do not allow / Verify first decision. Do not answer for me.
```

## Step 3.5 - Inspect and commit

```bash
git status --short
git diff -- docs/governance-worksheet.md
git diff --check
```

Confirm:

- no secret value was copied into the worksheet;
- no private production data is preserved as evidence;
- placeholder instructions are removed;
- the rules are yours, not generic AI prose.

Commit:

```bash
git add docs/governance-worksheet.md docs/module-5/evidence-index.md
git commit -m "docs: complete AI governance and code ownership worksheet"
```

## Phase 3 exit gate

- [ ] What I Shared table contains actual course examples.
- [ ] Every row has a final Low / Medium / High classification.
- [ ] Ambiguous rows identify missing information.
- [ ] Safer future versions share less context.
- [ ] One real generated code block is traced line by line.
- [ ] Three ownership questions are answered in your words.
- [ ] You can explain what would break if key lines changed.
- [ ] Three personal rules are concrete and testable.
- [ ] Rules cite course evidence.
- [ ] No secrets or personal data were placed in the worksheet.
- [ ] Final artifact is `docs/governance-worksheet.md`.

---

# 12. Phase 4 - Generic versus repository-grounded comments-feature planning

## Objective

Plan a comments-on-tasks feature twice, compare the plans, and produce a reviewed design document without implementing the feature.

The fixed comment requirements are:

```text
id: string UUID
task_id: string foreign key or task reference
author: required string, 1-100 characters
body: required string, 1-2000 characters
created_at: server-generated UTC datetime
```

## Critical rule

Do not implement comments in Module 5.

Do not create models, routes, tests, frontend controls, or migrations. The work is planning and critique only.

## Step 4.1 - Create the generic baseline in a fresh thread

This thread must not have repository access, pasted source code, `AGENTS.md`, file names, or summaries.

Use a general chat or a fresh context that does not know your repository.

## Copy/paste prompt P14 - Generic comments plan

```text
Without reading repository files, produce a generic plan for adding comments to tasks in a Task Tracker application.

A comment has:
- id: string UUID
- task_id: string foreign key or task reference
- author: required string, 1-100 characters
- body: required string, 1-2000 characters
- created_at: server-generated UTC datetime

Create a plan with these sections:
1. Data Model
2. API Routes
3. Tests
4. Frontend Changes
5. Migration or data-shape notes
6. Open Questions

Constraints:
- Do not write implementation code.
- Clearly label assumptions.
- Do not claim knowledge of actual file names, storage approach, frontend structure, route style, or test style.
- Keep this intentionally generic because I will compare it with a repository-grounded plan.

Output format:
1. Markdown plan
2. Assumptions this plan makes
3. Parts most likely to be wrong after reading a real repository
```

Save the output as recommended evidence:

```text
docs/module-5/comments-plan-generic.md
```

Do not revise it after seeing the real repository. It is the baseline.

## Step 4.2 - Create the repository-grounded plan in a new Codex thread

Open a genuinely fresh Codex App thread. Paste **P00**.

## Copy/paste prompt P15 - Repo-grounded comments plan

```text
Plan - do not implement - a comments-on-tasks feature for this Task Tracker repository.

A comment has:
- id: string UUID
- task_id: string foreign key or task reference
- author: required string, 1-100 characters
- body: required string, 1-2000 characters
- created_at: server-generated UTC datetime

Before planning, read the actual repository, especially:
- AGENTS.md
- app/models.py or equivalent model/schema files
- app/main.py and actual route files
- app/storage.py or wherever tasks are persisted
- tests/ to understand naming, fixtures, and assertion style
- frontend/index.html or equivalent frontend files
- README.md for commands and conventions
- any relevant decision notes

Produce a design document with these sections:
1. Data Model - exact existing file/pattern where comment request and response models would belong.
2. API Routes - method, path, request body, response body, success status, error cases, and relationship to existing task routes.
3. Tests - concrete proposed test names grouped by happy path, validation, authorization/scope if relevant, and edge cases.
4. Frontend Changes - actual files that would change and what the user would see.
5. Migration Notes - impact on current storage shape, existing task records, startup data, and future persistence.
6. Open Questions - at least three real team decisions.
7. Suggested implementation order - planning sequence only, no code.

Constraints:
- Read-only.
- Do not edit app/, tests/, frontend/, or create implementation files.
- Do not produce implementation code blocks.
- Reference actual file paths and conventions observed.
- If you begin giving generic FastAPI advice, stop and inspect the relevant file.
- If something is not visible, say so.
- Do not create docs/decisions/comments-feature-plan.md yet.

Output format:
1. Draft markdown suitable for docs/decisions/comments-feature-plan.md
2. Files read
3. Repository conventions used
4. Assumptions to verify
5. Possible course-scope constraints
```

## Step 4.3 - Verify every repository reference

For each referenced file:

- open the file;
- confirm the path;
- confirm the pattern described;
- confirm the storage model;
- confirm route naming style;
- confirm test naming and fixture style;
- confirm frontend structure.

Record corrections before saving the plan.

## Copy/paste prompt P16 - Plan self-critique

```text
Critique the repository-grounded comments plan you just produced.

Return:
1. The three strongest sections and why they are grounded.
2. The three claims most likely to need human correction.
3. Any sentence that could apply to almost any FastAPI app.
4. Any file path, route, storage detail, test name, or migration claim that requires manual verification.
5. Any place where the plan may be implementing rather than planning.

Do not edit files and do not rewrite the plan.
```

## Step 4.4 - Compare and grade the two plans

Use labels:

- **Right:** Accurate about the existing repository and safe to keep.
- **Missing:** A required specific detail is absent.
- **Needs-Resequencing:** The idea may be useful, but the proposed order is wrong for implementation or review.

## Copy/paste prompt P17 - Grade and compare plans

```text
I am evaluating two comments-feature plans for Module 5: one generic plan and one repository-grounded Codex App plan.

Grading labels:
- Right: accurate about the existing repository and safe to keep.
- Missing: a specific required detail is absent.
- Needs-Resequencing: the idea may be useful, but its implementation or review order is wrong.

Task:
1. Grade each section of the repository-grounded plan:
   - Data Model
   - API Routes
   - Tests
   - Frontend Changes
   - Migration Notes
   - Open Questions
   - Suggested implementation order
2. For each section, cite evidence from the plan or repository notes I provide.
3. Give the smallest correction rather than rewriting the entire plan.
4. Compare the generic and repository-grounded plans in exactly three lines:
   - Biggest difference
   - Plan I would hand to a teammate and why
   - One task shape where generic chat is sufficient

Constraints:
- Do not implement the feature.
- Do not rewrite the whole plan.
- Do not invent repository facts.
- Preserve my final grading authority.

Output format:
1. Section critique table: Section | Label | Evidence | Minimal correction | Student final decision
2. Three-line generic versus repository-grounded comparison

Generic plan:
<GENERIC_PLAN>

Repository-grounded plan:
<GROUNDED_PLAN>

Repository evidence I checked:
<REPO_NOTES>
```

## Step 4.5 - Build docs/decisions/comments-feature-plan.md

Recommended final structure:

```markdown
# Decision Plan: Comments on Tasks

## 1. Feature brief
A comment has:
- id: string UUID
- task_id: string task reference
- author: required, 1-100 characters
- body: required, 1-2000 characters
- created_at: server-generated UTC datetime

This document is a plan only. The feature is not implemented in Module 5.

## 2. Repository evidence
| Area | File(s) checked | Existing convention | Impact on comments plan |
|---|---|---|---|
| Models | ... | ... | ... |
| Routes | ... | ... | ... |
| Storage | ... | ... | ... |
| Tests | ... | ... | ... |
| Frontend | ... | ... | ... |

## 3. Repository-grounded plan
### Data Model
...

### API Routes
| Method | Path | Request | Response | Success status | Error cases |
|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... |

### Tests
#### Happy path
- ...

#### Validation
- ...

#### Edge cases
- ...

### Frontend Changes
...

### Migration or data-shape notes
...

### Open Questions
1. ...
2. ...
3. ...

### Suggested implementation order
1. ...
2. ...

## 4. Section critique
| Section | Label | Evidence | Correction I made |
|---|---|---|---|
| Data Model | Right / Missing / Needs-Resequencing | ... | ... |

## 5. Generic versus repository-grounded comparison
- Biggest difference:
- Plan I would hand to a teammate and why:
- Task where generic chat is enough:

## 6. Assumptions still to verify
- ...

## 7. Non-implementation confirmation
- No application models added.
- No routes added.
- No tests added.
- No frontend controls added.
- No migration performed.
```

The generic baseline may remain in `docs/module-5/comments-plan-generic.md`. The reviewed repository-grounded result belongs in `docs/decisions/comments-feature-plan.md`.

Use **P00C** to approve only the decision-plan file.

## Step 4.6 - Inspect and commit

```bash
git status --short
git diff --name-only
git diff -- docs/decisions/comments-feature-plan.md docs/module-5/comments-plan-generic.md
git diff --check
```

Confirm that `app/`, tests, and frontend are untouched.

Commit:

```bash
git add docs/decisions/comments-feature-plan.md docs/module-5/comments-plan-generic.md docs/module-5/evidence-index.md
git commit -m "docs: compare generic and repo-grounded comments planning"
```

## Phase 4 exit gate

- [ ] Generic plan was created without repository context.
- [ ] Generic plan was frozen before repo-grounded work.
- [ ] Repo-grounded plan was created in a fresh thread.
- [ ] Repo-grounded plan cites actual files.
- [ ] Every cited path and convention was manually checked.
- [ ] Every required section was graded Right, Missing, or Needs-Resequencing.
- [ ] Minimal corrections were made.
- [ ] Three-line comparison is present.
- [ ] At least three real open questions are present.
- [ ] Comments were not implemented.
- [ ] Final artifact is `docs/decisions/comments-feature-plan.md`.

---

# 13. Phase 5 - Context-engineering experiment with Architecture A, B, and C

## Objective

Run the same architecture-document task three ways, preserve the outputs, compare what context changed, and formulate a reusable context rule.

The required architecture sections are:

1. What the app does.
2. Data model.
3. Request flow for creating a task.
4. Key files.
5. Conventions.
6. Not visible or assumptions.

Each draft should be approximately one page.

## Experimental integrity rules

- Use a fresh thread for each strategy.
- Do not paste Architecture A into the Strategy B or C generation thread.
- Do not let Strategy C read extra files without explicit approval.
- Save each draft before reading the next one.
- Do not silently correct drafts before comparison; preserve what each strategy produced.

## Step 5.1 - Strategy A: minimal context

Start a fresh Codex App thread. Paste **P00**, then P18 below.

## Copy/paste prompt P18 - Architecture Strategy A

```text
This is Strategy A: minimal context.

Task:
Produce a one-page architecture document for this Task Tracker repository using only the minimal task description below. You may inspect repository files as needed, but do not ask me for extra summaries first.

Minimal task description:
Create a concise architecture document for the Task Tracker application.

Required sections:
1. What the app does - one short paragraph.
2. Data model - entities and important fields.
3. Request flow - what happens when a user creates a task.
4. Key files - five to ten important files, one line each.
5. Conventions - validation, storage, error handling, frontend/backend interaction.
6. Not visible or assumptions - anything you could not confirm.

Constraints:
- One page maximum.
- Markdown output.
- Do not produce code.
- Do not edit app/ or any application file.
- Do not save a file until I review the draft.
- Do not pretend an assumption is confirmed.

Output format:
1. Draft architecture-A.md
2. Files inspected
3. Assumptions or possible inventions
4. Sentences that could describe almost any FastAPI app
```

Review the draft but do not correct it. Save it as:

```text
docs/architecture-A.md
```

Use **P00C** and allow only that file.

## Step 5.2 - Prepare structured context for Strategy B

Strategy B uses:

- verified `AGENTS.md`;
- a one-line summary of each important app file.

You may create the summary yourself. If using Codex, use P19 and verify every row.

## Copy/paste prompt P19 - Produce verified file summaries

```text
Perform a read-only inventory of the important Task Tracker files for use as structured context.

Return five to twelve rows with:
File path | One-line factual summary | Key symbol or behavior | Confidence | Fact I should verify

Constraints:
- Inspect each file before summarizing it.
- Do not infer from filenames.
- Do not include generic framework descriptions.
- Do not edit files.
- Keep each summary to one sentence.
```

Manually correct the summary list before using it.

## Step 5.3 - Strategy B: structured context

Start a new thread that has not seen Architecture A. Paste the following. Replace both placeholders before sending.

## Copy/paste prompt P20 - Architecture Strategy B

```text
This is Strategy B: structured context.

Context:

AGENTS.md:
<AGENTS_CONTENT>

Verified one-line summary of important repository files:
<FILE_SUMMARIES>

Task:
Using only the structured context above and any repository files you explicitly inspect, produce a one-page architecture document for the Task Tracker application.

Required sections:
1. What the app does - one short paragraph.
2. Data model - entities and important fields.
3. Request flow - what happens when a user creates a task.
4. Key files - five to ten important files, one line each.
5. Conventions - validation, storage, error handling, frontend/backend interaction.
6. Not visible or assumptions - anything not confirmed.

Constraints:
- One page maximum.
- Markdown output.
- Do not produce code.
- Do not edit app/ or any application file.
- Do not add details unsupported by AGENTS.md, the file summaries, or files you explicitly inspect.
- Do not save a file until I review the draft.

Output format:
1. Draft architecture-B.md
2. Which structured context item helped most
3. Remaining assumptions or unsupported details
4. Any place where the extra context made the draft too long or too confident
```

Preserve and save the reviewed draft as:

```text
docs/architecture-B.md
```

## Step 5.4 - Strategy C: targeted context

Identify the actual equivalents of:

- main API entry file;
- main model/schema file;
- main persistence/storage file.

Do not silently substitute files. If one does not exist, record the closest equivalent and approve it before the prompt proceeds.

Start a new thread that has not seen Architecture A or B.

## Copy/paste prompt P21 - Architecture Strategy C

```text
This is Strategy C: targeted context.

Read exactly these files and nothing else unless I explicitly approve a follow-up:
- app/main.py or the confirmed main API entry file
- app/models.py or the confirmed main model/schema file
- app/storage.py or the confirmed main persistence file

If a listed path does not exist:
- tell me the closest actual equivalent;
- do not substitute it until I approve.

Task:
From only the approved files, produce a one-page architecture document for the Task Tracker application.

Required sections:
1. What the app does - one short paragraph.
2. Data model - entities and important fields.
3. Request flow - what happens when a user creates a task.
4. Key files - five to ten important files, one line each.
5. Conventions - validation, storage, error handling, frontend/backend interaction.
6. Not visible or assumptions - anything you could not confirm.

Special honesty rule:
When something is not visible from the files read, write exactly "not visible from the files I read" rather than inferring from framework convention.

Constraints:
- One page maximum.
- Markdown output.
- Do not produce code.
- Do not edit app/ or any application file.
- Do not read tests, frontend, README, configuration, or other files unless I separately approve.
- Do not save a file until I review the draft.

Output format:
1. Draft architecture-C.md
2. Files read
3. Items marked not visible
4. What the targeted strategy likely missed
```

Preserve and save it as:

```text
docs/architecture-C.md
```

## Step 5.5 - Score the three outputs yourself

Use a table before asking Codex to compare them.

```markdown
| Criterion | Architecture A | Architecture B | Architecture C |
|---|---|---|---|
| Correct repository facts | ... | ... | ... |
| Specificity | ... | ... | ... |
| Completeness | ... | ... | ... |
| Unsupported claims | ... | ... | ... |
| Useful admissions of uncertainty | ... | ... | ... |
| Concision | ... | ... | ... |
| Best task shape | ... | ... | ... |
| Most important miss | ... | ... | ... |
```

Read each draft against the repository. Mark exact sentences that are:

- correct;
- generic;
- unsupported;
- wrong;
- not visible;
- too broad;
- useful but incomplete.

## Step 5.6 - Compare strategies in a separate thread

This comparison thread should receive only the three drafts and your own notes. It does not need broad repository access.

## Copy/paste prompt P22 - Compare context strategies

```text
I ran the same architecture-document task with three context strategies.

Strategy A: minimal context
Strategy B: structured context using AGENTS.md and verified file summaries
Strategy C: targeted context using a small set of approved anchor files

Task:
For each strategy, identify:
- what it got right;
- what it got wrong, missed, or invented;
- where it was appropriately uncertain;
- which task shape it is best suited for.

Then help me draft:
1. A verdict stating which strategy I chose for the final architecture document and why.
2. A two-sentence context-engineering rule in this form:
   "For task shape X, I use strategy Y because Z. For task shape A, I use strategy B because C."

Constraints:
- Use only the three drafts and my notes below.
- Do not invent repository facts.
- Do not rewrite the entire architecture document.
- Make the comparison specific; do not stop at "context matters."
- Keep the final strategy choice and rule mine.

Output format:
1. Strategy comparison table
2. Verdict paragraph
3. Two-sentence context-engineering rule
4. Questions I must answer before finalizing

Architecture A:
<ARCHITECTURE_A>

Architecture B:
<ARCHITECTURE_B>

Architecture C:
<ARCHITECTURE_C>

My verification notes:
<PASTE YOUR SCORECARD AND CORRECTIONS>
```

## Step 5.7 - Build docs/architecture.md

Recommended structure:

```markdown
# Task Tracker Architecture and Context-Engineering Comparison

## Final architecture document
[Use the verified version of the strategy you selected. Correct unsupported claims, but record what you corrected below.]

### What the app does
...

### Data model
...

### Request flow: create a task
...

### Key files
| File | Role |
|---|---|
| ... | ... |

### Conventions
...

### Not visible or assumptions
...

## Context-strategy comparison
| Strategy | What it got right | What it got wrong/missed/invented | Appropriate uncertainty | Best task shape |
|---|---|---|---|---|
| A - Minimal | ... | ... | ... | ... |
| B - Structured | ... | ... | ... | ... |
| C - Targeted | ... | ... | ... | ... |

## Corrections made before finalizing
| Draft | Original claim | Problem | Repository evidence | Final correction |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

## Verdict
[Write in your own voice.]

## My context-engineering rule
For ...
For ...
```

## Step 5.8 - Inspect and commit

```bash
git status --short
git diff --name-only
git diff -- docs/architecture-A.md docs/architecture-B.md docs/architecture-C.md docs/architecture.md
git diff --check
```

Commit:

```bash
git add docs/architecture-A.md docs/architecture-B.md docs/architecture-C.md docs/architecture.md docs/module-5/evidence-index.md
git commit -m "docs: compare three context strategies for architecture"
```

## Phase 5 exit gate

- [ ] A, B, and C were created in genuinely fresh threads.
- [ ] A received only minimal instructions.
- [ ] B received verified `AGENTS.md` and file summaries.
- [ ] C read only the approved anchor files.
- [ ] All three drafts were preserved before correction.
- [ ] Every draft states assumptions or unavailable information.
- [ ] Your scorecard compares correctness, completeness, specificity, unsupported claims, honesty, and task fit.
- [ ] Final `docs/architecture.md` contains the comparison.
- [ ] Verdict is specific to observed outputs.
- [ ] Two-sentence context rule names real task shapes.
- [ ] No application files changed.

---

# 14. Phase 6 - Personal AI coding playbook and Decision Card

## Objective

Create a one-page personal playbook in your own voice, based on course evidence, and complete a tool-choice Decision Card.

Codex may scaffold and review. It must not write your final rules for you.

## Required playbook sections

1. When I reach for AI first.
2. When I do not reach for AI.
3. My non-negotiables.
4. My review rules.
5. What I am still figuring out.
6. Decision Card.
7. 30-day reread commitment.

## Step 6.1 - Ask only for a blank scaffold

Start a fresh thread.

## Copy/paste prompt P23 - Playbook template only

```text
Draft a one-page personal AI coding playbook template for me to fill in.

Required sections:
1. When I reach for AI first
2. When I do not reach for AI
3. My non-negotiables
4. My review rules
5. What I am still figuring out
6. Evidence from this course
7. 30-day reread commitment

For each section, provide two or three empty bullet placeholders that describe the type of evidence I should add. Do not fill in my actual rules or examples.

End with a Decision Card in exactly this format:
- For a new feature I reach for: ___
- For a code review I reach for: ___
- For debugging I reach for: ___
- For infrastructure I reach for: ___
- I will never paste ___ into an AI tool.
- My one rule is: ___

Constraints:
- Template only.
- Do not invent examples from my course experience.
- Do not put generic advice inside the blanks.
- Keep it short enough for a one-page docs/ai-playbook.md.
- Do not create the file yet.
```

Review the template and remove any rule-like content Codex filled in accidentally.

## Step 6.2 - Write your own playbook

Use evidence from your work, for example:

- a security finding you rejected as a false positive;
- a manual finding the AI missed;
- a Module 4 review comment classified as Wrong;
- a CI or Docker artifact that looked plausible but needed verification;
- a generic plan that did not fit the repository;
- an architecture strategy that became too confident with extra context;
- code you initially could not explain;
- a prompt where file evidence improved the answer.

Each rule should answer:

- What exactly will I do?
- When will I do it?
- What evidence triggered this rule?
- How could another person tell whether I followed it?

## Step 6.3 - Complete the Decision Card yourself

Tool shapes from the course:

- **Cursor:** Larger implementation loops inside the IDE.
- **GitHub Copilot:** Continuous editor pairing and line-level assistance.
- **Claude Code:** Terminal delivery work across repository files and commands.
- **Codex App:** Desktop review, planning, grading, governance, and context experiments.
- **General chat:** Reasoning, drafting, comparison, and reflection without repository access.

No tool is universally best. Match the interface and scope to the task.

If stuck, use the following prompt, which asks questions rather than filling the card.

## Copy/paste prompt P24 - Decision Card forcing questions

```text
Do not fill in my Decision Card.

Ask me one forcing question for each blank:
- For a new feature I reach for: ___
- For a code review I reach for: ___
- For debugging I reach for: ___
- For infrastructure I reach for: ___
- I will never paste ___ into an AI tool.
- My one rule is: ___

Use these course tool shapes to make the questions concrete:
- Cursor for larger implementation loops.
- GitHub Copilot for continuous editor pairing.
- Claude Code for terminal delivery work.
- Codex App for desktop review, planning, grading, and governance.
- General chat for reasoning, drafting, and reflection without repository access.

Constraints:
- Ask questions only.
- Do not recommend one tool as universally best.
- Do not fill any blank.
- Push me to answer from course evidence rather than habit, preference, or hype.

Output exactly six numbered questions.
```

Answer all six yourself.

## Step 6.4 - Add the 30-day reread commitment

Include a concrete date.

Example structure:

```markdown
## 30-day reread commitment
I will reread and revise this playbook on YYYY-MM-DD. I will compare these rules with one real AI-assisted task completed before that date and update any rule that did not produce a clear decision.
```

Use a real date approximately 30 days after completion.

## Step 6.5 - Ask Codex to review, not rewrite

## Copy/paste prompt P25 - Review playbook for evidence and voice

```text
I wrote the playbook below myself. Review it for evidence and student voice, but do not rewrite it for me.

Check whether it meets this Module 5 quality bar:
- One page or close to one page.
- My own voice rather than generic AI-policy language.
- Each important rule is backed by a specific course incident or observation.
- Practical review habits rather than vague aspirations.
- Decision Card fully completed.
- Never-paste rule names a concrete type of data.
- 30-day reread commitment includes a real date.
- Tool choices are explained by task shape rather than hype.
- No confidential information is reproduced.

Constraints:
- Do not produce a replacement playbook.
- Do not add evidence I did not provide.
- Suggest only minimal edits.
- Mark unsupported rules as "needs course evidence".
- Preserve my final wording authority.

Output format:
Requirement | Present / Missing | Evidence from my draft | Minimal edit | Student decision

My playbook draft:
<PLAYBOOK_DRAFT>
```

Make only the edits you personally accept.

## Step 6.6 - Recommended playbook structure

```markdown
# My AI Coding Playbook

## When I reach for AI first
- [Specific task shape and why.]
- [Specific task shape and evidence.]

## When I do not reach for AI
- [Concrete boundary.]
- [Concrete situation requiring direct human work.]

## My non-negotiables
- [Rule tied to a course incident.]
- [Rule tied to security/governance evidence.]

## My review rules
- [What I inspect before accepting.]
- [What I run or compare.]
- [How I handle uncertainty.]

## What I am still figuring out
- [A real unresolved question.]
- [A practice to test in the next month.]

## Evidence from this course
| Rule | Module incident or observation | What it changed in my practice |
|---|---|---|
| ... | ... | ... |

## Decision Card
- For a new feature I reach for: [your answer and one-line reason]
- For a code review I reach for: [your answer and one-line reason]
- For debugging I reach for: [your answer and one-line reason]
- For infrastructure I reach for: [your answer and one-line reason]
- I will never paste [concrete data type] into an AI tool.
- My one rule is: [your strongest rule]

## 30-day reread commitment
I will reread and revise this playbook on YYYY-MM-DD. I will test it against one real AI-assisted task completed before that date.
```

## Step 6.7 - Inspect and commit

```bash
git status --short
git diff -- docs/ai-playbook.md
git diff --check
```

Commit:

```bash
git add docs/ai-playbook.md docs/module-5/evidence-index.md
git commit -m "docs: add evidence-based personal AI coding playbook"
```

## Phase 6 exit gate

- [ ] Playbook was written by you, not generated as a finished artifact.
- [ ] It is approximately one page.
- [ ] Rules are concrete.
- [ ] Rules cite specific course incidents or observations.
- [ ] Never-paste rule names concrete sensitive data.
- [ ] Decision Card has no blanks.
- [ ] Tool choices are based on task shape.
- [ ] 30-day reread commitment has a real date.
- [ ] Codex review suggested minimal edits only.
- [ ] Final artifact is `docs/ai-playbook.md`.

---

# 15. Phase 7 - Final repository and deliverable audit

## Objective

Prove that all expected artifacts exist, contain your judgments, have no unresolved placeholders, and did not introduce unintended application changes.

## Step 7.1 - Inspect changed files

```bash
git status --short
git diff --name-status <DEFAULT_BRANCH>...HEAD
git diff --stat <DEFAULT_BRANCH>...HEAD
```

Expected changes should be primarily:

```text
AGENTS.md
docs/
```

An application file is acceptable only when you deliberately applied and documented the optional minimal security fix.

## Step 7.2 - Search for unresolved placeholders

With `rg`:

```bash
rg -n '\[PASTE|PASTE YOUR|___|TODO|TBD|REPLACE ME|STUDENT DECISION|needs course evidence' AGENTS.md docs
```

With `grep` when `rg` is unavailable:

```bash
grep -RInE '\[PASTE|PASTE YOUR|___|TODO|TBD|REPLACE ME|STUDENT DECISION|needs course evidence' AGENTS.md docs
```

Review every result. Some words may appear in a deliberate explanation, but no unresolved worksheet placeholder should remain.

## Step 7.3 - Search for accidental secrets

Do not print real secret values into evidence logs.

Review tracked files for suspicious names and patterns:

```bash
git ls-files | grep -Ei '(^|/)(\.env|.*secret.*|.*credential.*|.*token.*|.*key.*)$' || true
```

Use your repository’s approved secret-scanning method if one exists.

Do not paste any discovered value into Codex or the final documentation.

## Step 7.4 - Verify artifact structure

```bash
find docs -maxdepth 3 -type f | sort
```

Confirm these core files exist:

```text
AGENTS.md
docs/security-review.md
docs/governance-worksheet.md
docs/decisions/comments-feature-plan.md
docs/architecture-A.md
docs/architecture-B.md
docs/architecture-C.md
docs/architecture.md
docs/ai-playbook.md
```

## Step 7.5 - Verify application integrity

Run the existing tests:

```bash
<TEST_COMMAND>
```

When no application fix was intended, the behavior and test result should match the baseline.

## Step 7.6 - Run the final AI audit

Use Codex as a checklist assistant, not as approver.

## Copy/paste prompt P26 - Final Module 5 deliverable audit

```text
Perform a read-only final audit of the Module 5 working tree against these expectations.

Required core artifacts:
- AGENTS.md
- docs/security-review.md
- docs/governance-worksheet.md
- docs/decisions/comments-feature-plan.md
- docs/architecture-A.md
- docs/architecture-B.md
- docs/architecture-C.md
- docs/architecture.md
- docs/ai-playbook.md

Check:
1. AGENTS.md is repository-specific and contains Module 5 guardrails.
2. Security review grades every AI finding as Valid, False Positive, or Noise.
3. Security review contains manual findings, Agreement / AI-only / You-only, and a top-three backlog.
4. Governance worksheet contains What I Shared risk classifications, one generated block traced line by line, and three concrete personal rules.
5. Comments feature is planned and critiqued but not implemented.
6. Architecture A, B, and C are distinct context experiments.
7. Architecture comparison includes a verdict and a two-sentence context rule.
8. Playbook is approximately one page, has a completed Decision Card, names concrete never-paste data, cites course evidence, and includes a 30-day reread date.
9. No unresolved placeholders remain.
10. No unexpected app/, tests/, frontend/, CI, Docker, dependency, or configuration edits exist.
11. Every repository-specific claim cites or can be traced to actual files.

Constraints:
- Read-only.
- Do not edit files.
- Do not approve the submission.
- Do not infer completion from file existence alone.
- Identify exact file and section for every gap.

Output format:
Artifact | Requirement | Evidence found | Status: Complete / Needs correction / Not found | Exact next action

End with:
- Unexpected changed files
- Unresolved placeholders
- Claims needing manual verification
- Questions I must answer before I decide the work is ready
```

Verify the audit yourself. Codex does not decide readiness.

## Step 7.7 - Complete the evidence index

Update `docs/module-5/evidence-index.md` with:

- links to every core artifact;
- final grades and decisions;
- any optional fix;
- test result;
- final commit;
- remaining open questions.

Recommended final matrix:

```markdown
## Final deliverable matrix
| Part | Artifact | Human-owned evidence | Status | Remaining action |
|---|---|---|---|---|
| 5.1 | AGENTS.md | Verified commands/rules and smoke tests | Complete / Not complete | ... |
| 5.2 | security-review.md | Grades, manual scan, reconciliation, backlog | ... | ... |
| 5.3 | governance-worksheet.md | Risk decisions, code ownership, rules | ... | ... |
| 5.4 | comments-feature-plan.md | Generic comparison and section critique | ... | ... |
| 5.5 | architecture files | A/B/C comparison and chosen rule | ... | ... |
| 5.6 | ai-playbook.md | Own voice, Decision Card, reread date | ... | ... |
```

## Step 7.8 - Final diff review

```bash
git diff --check
git diff <DEFAULT_BRANCH>...HEAD -- AGENTS.md docs/
git log --oneline --decorate -n 15
```

For an optional application fix:

```bash
git diff <DEFAULT_BRANCH>...HEAD -- app/ tests/
```

Be able to explain every changed line.

## Step 7.9 - Final commit

```bash
git add AGENTS.md docs/
git commit -m "docs: complete Module 5 governance and context evidence"
```

Add an approved optional fix file only when applicable.

Push according to your course workflow.

## Phase 7 exit gate

- [ ] All core files exist.
- [ ] No final placeholder remains.
- [ ] No secret or private data is reproduced.
- [ ] No unexpected application change exists.
- [ ] Tests pass or pre-existing failures are documented.
- [ ] Every artifact contains human-owned evidence.
- [ ] Final Codex audit was reviewed rather than accepted automatically.
- [ ] Evidence index is complete.
- [ ] You can explain every changed file.

---

# 16. Prompt index

| Prompt | Purpose | Fresh thread required? | Expected write? |
|---|---|---:|---:|
| P00 | Module 5 guardrails | Start of every repo thread | No |
| P00B | Challenge generic claims | No | No |
| P00C | Approve one exact docs write | No | One exact file |
| P00D | Challenge one conclusion | No | No |
| P01 | Draft `AGENTS.md` | Recommended | No, draft first |
| P02 | Audit `AGENTS.md` | Same setup thread | No |
| P03 | Project evidence smoke test | Same setup thread | No |
| P04 | Recent-files smoke test | Same setup thread | No |
| P05 | Read-only security audit | Yes | No |
| P06 | Course scope versus production risk | Same security thread | No |
| P07 | Grade AI security findings | Same or separate grading thread | No |
| P08 | Reconcile AI/manual findings | After manual scan | No |
| P09 | Optional minimal fix preview | Only when justified | No, preview first |
| P10 | Classify what was shared | Governance thread | No |
| P11 | Trace generated code | Governance thread | No |
| P12 | Ask ownership questions | Governance thread | No |
| P13 | Sharpen personal rules | Governance thread | No |
| P14 | Generic comments plan | Yes, no repo context | No |
| P15 | Repo-grounded comments plan | Yes | No |
| P16 | Critique grounded plan | Same planning thread | No |
| P17 | Grade and compare plans | Separate comparison context recommended | No |
| P18 | Architecture A | Yes | Draft only |
| P19 | Verified file summaries | Before Strategy B | No |
| P20 | Architecture B | Yes | Draft only |
| P21 | Architecture C | Yes | Draft only |
| P22 | Compare A/B/C | Yes, only drafts supplied | No |
| P23 | Playbook template only | Yes | No |
| P24 | Decision Card questions | Same playbook thread | No |
| P25 | Review your playbook | After you write it | No |
| P26 | Final deliverable audit | Final read-only thread | No |

---

# 17. Recommended repository structure after Module 5

```text
Task-Tracker/
├── AGENTS.md
├── app/
│   └── ...                         # unchanged unless one approved minimal fix
├── frontend/
│   └── ...                         # unchanged
├── tests/
│   └── ...                         # unchanged
├── docs/
│   ├── security-review.md
│   ├── governance-worksheet.md
│   ├── architecture-A.md
│   ├── architecture-B.md
│   ├── architecture-C.md
│   ├── architecture.md
│   ├── ai-playbook.md
│   ├── decisions/
│   │   └── comments-feature-plan.md
│   └── module-5/
│       ├── evidence-index.md
│       ├── setup-smoke-tests.md
│       ├── security-audit-raw.md
│       └── comments-plan-generic.md
└── ... existing Module 1-4 files
```

---

# 18. Suggested commit sequence

A clean history helps demonstrate the sequence.

```text
docs: add Module 5 agent guidance and grounding evidence
docs: grade and reconcile Module 5 security findings
docs: complete AI governance and code ownership worksheet
docs: compare generic and repo-grounded comments planning
docs: compare three context strategies for architecture
docs: add evidence-based personal AI coding playbook
docs: complete Module 5 evidence index
```

When an optional security fix is justified, use a separate commit such as:

```text
fix: apply verified minimal security correction
```

Do not combine it with unrelated documentation edits.

---

# 19. Suggested live demonstration sequence

Use this order when presenting Module 5.

## 1. State the module objective

Explain:

> Module 5 is about grading and governing AI-assisted work. The application is not being expanded. The default is read-only analysis, documentation, comparison, and student-owned judgment.

## 2. Show AGENTS.md and grounding

Open `AGENTS.md` and show:

- actual project commands;
- actual business rules;
- docs-first guardrail;
- no application changes by default;
- file-evidence requirement.

Show one smoke-test claim and the file that proves it.

## 3. Show the security review

Demonstrate:

- one Valid finding;
- one False Positive or Noise finding;
- one manual finding;
- the Agreement / AI-only / You-only table;
- the top-three backlog.

Explain why the raw AI audit was not the final artifact.

## 4. Show the governance worksheet

Show:

- one item classified for sharing risk;
- a safer future version;
- the generated code trace;
- one ownership question and your answer;
- your three personal rules.

## 5. Show generic versus grounded planning

Place the generic and repo-grounded comments plans side by side.

Explain:

- what the generic plan assumed;
- which repository details changed the plan;
- one section labeled Missing or Needs-Resequencing;
- why no comments code was implemented.

## 6. Show the context experiment

Open A, B, and C.

Show:

- one generic or invented statement from A;
- one improvement or overconfidence from B;
- one honest “not visible” limitation from C;
- your chosen strategy;
- your two-sentence context rule.

## 7. Show the playbook

Read:

- one rule supported by course evidence;
- the never-paste rule;
- the completed Decision Card;
- the 30-day reread date.

## 8. Close with ownership

A suitable closing idea is:

> The AI generated drafts and challenges, but I retained ownership of the evidence, classifications, priorities, context strategy, and final operating rules.

---

# 20. Common failure modes and corrections

| Failure | Why it fails Module 5 | Correction |
|---|---|---|
| Treating Module 5 as another feature sprint | The module evaluates governance and judgment, not feature output | Stop implementation and move work into planning/review artifacts |
| One long Codex thread | Context contaminates the generic/grounded and A/B/C comparisons | Restart with fresh threads |
| Generic `AGENTS.md` | Does not prove repository grounding | Verify commands, paths, rules, and storage against actual files |
| Accepting AI security severity | Severity can be inflated or context-blind | Verify behavior and assign your own grade |
| Marking every finding Valid | Demonstrates deference, not judgment | Use Valid / False Positive / Noise definitions rigorously |
| No manual scan | Removes the main student-owned evidence | Inspect the code before reconciliation |
| Empty You-only column without explanation | May indicate no independent review | Recheck business rules, threat model, frontend, and scope decisions; keep empty only if honestly justified |
| Calling “no authentication” simply a bug | Ignores course scope | Record it as an accepted learning-scope limitation and production risk when appropriate |
| Turning review into refactor | Violates docs-first scope | Use backlog; apply only an explicitly approved minimal fix |
| Governance worksheet contains secrets | Repeats the governance failure in the evidence artifact | Describe secret type, never copy its value |
| Code explanation copied from AI | Does not prove ownership | Answer check questions in your own words and verify behavior |
| Generic and grounded plan created in same thread | Generic plan is no longer genuinely ungrounded | Recreate the generic baseline in a clean context |
| Comments feature implemented | Exceeds Part 5.4 | Revert implementation and preserve planning only |
| Architecture drafts silently corrected before comparison | Destroys experimental evidence | Preserve original A/B/C drafts, record corrections separately |
| Strategy C reads extra files | Invalidates targeted-context experiment | Restart or clearly document the contamination and repeat C |
| “More context is always better” conclusion | Misses the point of task-shaped context | Compare completeness, unsupported confidence, honesty, and cost |
| AI writes the final playbook | Removes personal evidence and voice | Use AI only for scaffold, questions, and review |
| Decision Card uses one tool for everything | Tool choice is based on habit rather than task shape | Explain selection by scope, interface, and verification needs |
| Placeholders left in docs | Artifacts are incomplete | Run the placeholder scan and resolve every match |
| Unexpected `app/` edits | Violates the default Module 5 boundary | Revert or justify the single approved fix with evidence |

---

# 21. Troubleshooting

## Codex cannot see the expected repository file

Do not let it guess.

1. Confirm the repository root in Codex App.
2. Confirm the actual path locally.
3. Ask Codex to list the closest equivalent.
4. Approve substitution only after checking it.

## Codex gives generic security findings

Use **P00B** and require:

- exact file;
- exact code evidence;
- concrete failure scenario;
- confidence;
- clean/not-applicable categories.

Remove any finding that could apply to almost any web app without repository evidence.

## AI and manual findings do not align

Do not force agreement.

Record:

- different threat assumptions;
- different files inspected;
- course-scope context;
- whether the AI saw cross-file behavior;
- whether your manual finding needs additional evidence.

## You cannot find a You-only issue

The goal is not to fabricate one.

Recheck:

- business-rule context;
- frontend behavior;
- course-scope decisions;
- storage assumptions;
- dependency and Docker files;
- error behavior.

If no genuine You-only finding remains, say so and explain the breadth of your manual scan.

## A Valid security issue requires more than one line

Do not expand the fix.

Move it to the backlog with:

- impact;
- owner;
- smallest next action;
- verification criterion.

## The generic plan accidentally knows repository details

The thread was contaminated. Restart in a context without repository access or pasted project information.

## Architecture B exceeds one page

Remove repetition, not evidence.

Keep:

- app purpose;
- key data model;
- create-task flow;
- key files;
- conventions;
- assumptions.

Move detailed comparisons to `docs/architecture.md`.

## Architecture C cannot list five key files from three files read

It should not invent them. It may name only visible files and mark the remaining requested scope “not visible from the files I read.” That honesty is part of the experiment.

## The playbook sounds like corporate policy

Replace general statements with:

- “After [specific incident], I will...”
- “Before accepting [artifact type], I will inspect...”
- “I will not paste [concrete data category]...”
- “I will record AI involvement by...”

## Placeholder scan matches deliberate examples

Inspect each match manually. A placeholder may appear in a discussion of what not to submit, but it must not remain in the active content of a final worksheet, plan, comparison, or playbook.

---

# 22. Final definition of done

Module 5 is ready only when all of the following are true.

## Part 5.1 - Setup

- [ ] `AGENTS.md` exists at the repository root.
- [ ] It describes the actual Task Tracker.
- [ ] Actual run/test commands are confirmed.
- [ ] Actual business rules are confirmed or marked not confirmed.
- [ ] Module 5 docs-first and read-only guardrails are present.
- [ ] Project evidence smoke test is complete.
- [ ] Recent-files smoke test is complete.

## Part 5.2 - Security

- [ ] `docs/security-review.md` exists.
- [ ] AI audit cites real files.
- [ ] Every AI finding has a final Valid / False Positive / Noise grade.
- [ ] A separate manual scan exists.
- [ ] Agreement / AI-only / You-only reconciliation exists.
- [ ] Two-line observation exists.
- [ ] Top-three backlog exists.
- [ ] Course-scope versus production risk is distinguished.
- [ ] Optional fix, if used, is minimal and verified.

## Part 5.3 - Governance

- [ ] `docs/governance-worksheet.md` exists.
- [ ] What I Shared table contains real course examples.
- [ ] Every item has a final risk classification.
- [ ] Safer future versions are documented.
- [ ] One generated block is traced line by line.
- [ ] Ownership questions are answered by you.
- [ ] Three concrete usage rules exist.

## Part 5.4 - Planning

- [ ] Generic comments plan was produced without repo context.
- [ ] Repo-grounded plan cites actual files.
- [ ] Plan sections were graded Right / Missing / Needs-Resequencing.
- [ ] Three-line comparison exists.
- [ ] `docs/decisions/comments-feature-plan.md` exists.
- [ ] Comments were not implemented.

## Part 5.5 - Context engineering

- [ ] `docs/architecture-A.md` exists.
- [ ] `docs/architecture-B.md` exists.
- [ ] `docs/architecture-C.md` exists.
- [ ] Threads were separated.
- [ ] Strategy C stayed within approved files.
- [ ] `docs/architecture.md` contains comparison and final verified architecture.
- [ ] Verdict is in your voice.
- [ ] Two-sentence context rule names specific task shapes.

## Part 5.6 - Playbook

- [ ] `docs/ai-playbook.md` exists.
- [ ] It is one page or close.
- [ ] It sounds like you.
- [ ] Rules cite course evidence.
- [ ] Review habits are practical.
- [ ] Decision Card is complete.
- [ ] Never-paste rule names concrete data.
- [ ] 30-day reread commitment contains a real date.

## Repository integrity

- [ ] No unresolved placeholders remain.
- [ ] No credentials, secrets, or PII are present.
- [ ] No unexpected application edits exist.
- [ ] Tests pass or pre-existing failures are documented.
- [ ] Every changed file is understood.
- [ ] Evidence index is complete.
- [ ] Final diff was manually reviewed.
- [ ] AI did not make the final readiness decision.

---

# 23. Submission summary template

Use this as a final handoff or pull-request description.

```markdown
# Module 5 Submission Summary

## Objective
This submission demonstrates repository-grounded AI review, human grading, governance, feature planning, context engineering, and a personal AI coding playbook. It does not add the comments feature or other new application functionality.

## Deliverables
- `AGENTS.md`
- `docs/security-review.md`
- `docs/governance-worksheet.md`
- `docs/decisions/comments-feature-plan.md`
- `docs/architecture-A.md`
- `docs/architecture-B.md`
- `docs/architecture-C.md`
- `docs/architecture.md`
- `docs/ai-playbook.md`
- `docs/module-5/evidence-index.md`

## Human-owned decisions
- Security findings graded:
- Most important You-only finding:
- Top security backlog item:
- Highest-risk sharing habit changed:
- Comments-plan section needing the most correction:
- Selected architecture context strategy:
- Context-engineering rule:
- Strongest playbook rule:

## Application changes
- None

or, when applicable:

- One approved minimal security fix:
- Evidence and verification:

## Verification
- Placeholder scan:
- Unexpected-file check:
- Test command/result:
- Final diff reviewed:

## Remaining open questions
- ...
```

---

# 24. One-page execution sequence

Use this condensed sequence while working.

1. Create a clean Module 5 branch and evidence index.
2. Open the correct repository in Codex App.
3. Start a fresh thread with P00.
4. Draft, verify, and save `AGENTS.md`.
5. Run project-evidence and recent-files smoke tests.
6. Start a fresh security thread.
7. Run the read-only audit.
8. Manually scan the code yourself.
9. Grade findings Valid / False Positive / Noise.
10. Reconcile Agreement / AI-only / You-only.
11. Create top-three backlog and save `docs/security-review.md`.
12. Complete the What I Shared governance inventory.
13. Trace one generated code block and answer three ownership questions.
14. Write three concrete usage rules and save `docs/governance-worksheet.md`.
15. In a no-repo fresh thread, generate the generic comments plan.
16. In a new repo-grounded thread, generate the actual plan.
17. Grade the plan Right / Missing / Needs-Resequencing.
18. Save `docs/decisions/comments-feature-plan.md`; do not implement comments.
19. Run Architecture A in a fresh minimal-context thread.
20. Run Architecture B in a fresh structured-context thread.
21. Run Architecture C in a fresh targeted-context thread.
22. Compare all three and write the context rule in `docs/architecture.md`.
23. Ask only for a playbook template.
24. Write the playbook and Decision Card yourself.
25. Add a dated 30-day reread commitment.
26. Run P26 final audit.
27. Search for placeholders and unexpected edits.
28. Run tests.
29. Review the complete diff.
30. Complete the evidence index and submit only after your own approval.

---

# 25. Final principle

Module 5 is successful when the repository contains more than AI-generated prose. It should contain a visible record of your engineering judgment:

- what the AI knew;
- what evidence it used;
- what it missed;
- what it invented;
- what you accepted;
- what you rejected;
- what you will do differently next time.

The final standard is:

> **Use AI to widen the review and planning surface, but retain human ownership of evidence, classification, priority, context, and decision.**
