# Mid-Course Assignment Roadmap

## 1. What is actually being assessed

The two software features are the vehicle for assessment. The main competency is whether the developer can retain ownership while using AI to:

- understand the existing repository;
- translate a brief into user stories and acceptance criteria;
- constrain scope;
- prompt in small, reviewable phases;
- inspect and edit generated output;
- run the application and tests;
- debug from concrete evidence;
- prove that important tests detect a real defect;
- refactor without changing behavior;
- document accepted, edited, and rejected AI suggestions.

A working feature without evidence of this process can still receive **Not Met**. A smaller polished feature with strong evidence is safer than a large partial feature.

## 2. Recommended feature pair

### Feature 1 — Due dates + overdue filtering

Why it fits:

- adds one optional backend field;
- exercises create and update validation;
- creates a visible form/card enhancement;
- adds a meaningful filter;
- provides clear boundary tests.

### Feature 2 — Search + combined filters

Why it fits:

- extends the existing list endpoint rather than introducing a new subsystem;
- exercises query validation and combinations;
- creates a visible filter bar;
- has deterministic tests and clear empty-state behavior;
- avoids new persistence models.

## 3. Submission interpretation

The brief first says documentation belongs in `docs/`, then explicitly requires `docs/midcourse/` at submission. Use `docs/midcourse/` for every required file so both statements are satisfied.

Minimum code/evidence requirements:

- public repository URL;
- submitted branch named `mid-course-project`;
- two completed scoped features;
- at least one frontend-visible feature; this plan makes both visible;
- all existing tests preserved;
- at least four new pytest tests; this plan targets more than four;
- at least three meaningful AI prompts per feature;
- one weak prompt rewritten as a stronger prompt;
- at least one corrected AI assumption per feature;
- baseline test evidence;
- manual browser evidence;
- behavior contract before and after refactor;
- Break Test evidence for at least two tests, one per feature;
- 250–500 word reflection;
- README run/test instructions;
- no secrets or unrelated generated files.

## 4. Safe execution order

1. Inspect Git status and repository structure.
2. Create/switch to `mid-course-project` without discarding work.
3. Run baseline tests and application smoke checks.
4. Reconcile the supplied user stories and ADR with the actual code.
5. Implement Feature 1 backend in a focused change.
6. Add and run Feature 1 tests.
7. Integrate Feature 1 into the frontend.
8. Manually verify Feature 1.
9. Perform and record one Feature 1 Break Test.
10. Create a reviewed checkpoint.
11. Repeat the same loop for Feature 2.
12. Run the full behavior contract and full pytest suite.
13. Create a working checkpoint.
14. Refactor one narrow area only.
15. Re-run the complete affected contract and tests.
16. Complete prompt decisions, verification evidence, reflection, README, and final audit.
17. Push the public `mid-course-project` branch and submit the repository URL.

## 5. Evidence model

For each phase, retain:

- the prompt sent to Claude;
- a short summary of Claude's response;
- the diff or files changed;
- the human decision: accepted, edited, or rejected;
- commands and results;
- browser/DevTools observations where relevant;
- unresolved risks or `NOT RUN` items.

Do not paste enormous transcripts. Concise evidence that proves the workflow is stronger than raw chat logs.

## 6. Common reasons for Not Met

- coding directly on the wrong branch;
- no baseline result;
- only frontend work with no backend/tests;
- one giant AI-generated patch;
- fewer than three meaningful prompts per feature;
- prompt log lists prompts but not decisions;
- tests assert only status codes or share unstable state;
- Break Test changes the test instead of the source;
- Break Test mutation is not restored;
- browser checks are claimed without observation;
- refactor occurs without a before/after contract;
- README commands are generic and do not run in the submitted repo;
- documentation contains placeholders, fabricated output, or secrets.
