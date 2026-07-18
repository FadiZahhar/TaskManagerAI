window.AI_LEARNING_HUB_QUIZZES = {
  "version": 1,
  "modules": {
    "1": [
      {
        "id": "m1-q1",
        "type": "single",
        "prompt": "Which prompt gives the AI the clearest job?",
        "choices": [
          "Make the Task Tracker better.",
          "Write some requirements for an app.",
          "Write three Task Tracker user stories. Use the 'As a, I want, so that' format, add three testable acceptance criteria to each, and do not add authentication or team features.",
          "Use anything you know and make the result impressive."
        ],
        "answer": 2,
        "explanation": "The strongest prompt states the task, format, amount, and boundaries.",
        "hint": "Look for task, context, constraints, and output."
      },
      {
        "id": "m1-q2",
        "type": "single",
        "prompt": "Why should a student review AI output?",
        "choices": [
          "AI output is a draft and may be incomplete or wrong.",
          "Review is needed only when the answer is short.",
          "AI output is always correct, but review makes the document longer.",
          "Review is useful only for spelling."
        ],
        "answer": 0,
        "explanation": "AI can miss context, invent details, or produce incorrect code. The student owns the final work.",
        "hint": "Confidence is not proof."
      },
      {
        "id": "m1-q3",
        "type": "single",
        "prompt": "Which sentence follows the common user-story format?",
        "choices": [
          "The database should be fast.",
          "As a student, I want to mark a task complete so that I can see what work is finished.",
          "Build a completed column.",
          "Use FastAPI because it is popular."
        ],
        "answer": 1,
        "explanation": "It names the user, the goal, and the reason.",
        "hint": "Look for who, what, and why."
      },
      {
        "id": "m1-q4",
        "type": "single",
        "prompt": "What is the main purpose of acceptance criteria?",
        "choices": [
          "To make the story sound technical.",
          "To choose an IDE theme.",
          "To make the story testable and define what success means.",
          "To replace all tests."
        ],
        "answer": 2,
        "explanation": "Acceptance criteria describe observable conditions that show the story is complete.",
        "hint": "How will the team know the feature works?"
      },
      {
        "id": "m1-q5",
        "type": "single",
        "prompt": "What belongs in a short ADR?",
        "choices": [
          "Context, decision, and consequences.",
          "Every line of code in the project.",
          "Only the final answer with no reason.",
          "A list of all tools on the internet."
        ],
        "answer": 0,
        "explanation": "An ADR records an important decision, why it was made, and what follows from it.",
        "hint": "It is a decision record, not a full manual."
      },
      {
        "id": "m1-q6",
        "type": "single",
        "prompt": "Do saved project instructions replace the current task prompt?",
        "choices": [
          "Yes, always.",
          "No. They help with background, but the current prompt still needs the exact task.",
          "Yes, but only for code.",
          "No, because saved instructions are never useful."
        ],
        "answer": 1,
        "explanation": "Persistent instructions provide background. The current prompt provides the specific job and boundaries.",
        "hint": "General context and task context have different jobs."
      },
      {
        "id": "m1-q7",
        "type": "single",
        "prompt": "The AI gives a confident answer that adds a feature not requested. What should the student do?",
        "choices": [
          "Accept it because confidence means correctness.",
          "Reject or revise the extra feature and restate the scope.",
          "Add more unrelated features.",
          "Remove all constraints from the prompt."
        ],
        "answer": 1,
        "explanation": "The student should enforce the requested scope and correct drift.",
        "hint": "The human owns scope."
      },
      {
        "id": "m1-q8",
        "type": "ordering",
        "prompt": "Put the prompt parts in a useful order.",
        "items": [
          "Task",
          "Context",
          "Constraints",
          "Expected output",
          "Missing-information rule"
        ],
        "answer": [
          "Task",
          "Context",
          "Constraints",
          "Expected output",
          "Missing-information rule"
        ],
        "explanation": "This order gives the job, relevant background, boundaries, output shape, and a rule against guessing.",
        "hint": "Start with what the AI must do."
      }
    ],
    "2": [
      {
        "id": "m2-q1",
        "type": "single",
        "prompt": "Which statement is correct?",
        "choices": [
          "The request model describes data sent to the API, and the response model describes data returned by the API.",
          "The response model stores data in localStorage.",
          "The request model is only for tests.",
          "Request and response models always have exactly the same fields."
        ],
        "answer": 0,
        "explanation": "Input and output models have different responsibilities and may have different fields.",
        "hint": "Think input versus output."
      },
      {
        "id": "m2-q2",
        "type": "single",
        "prompt": "A valid task is created successfully. Which status code best matches the module?",
        "choices": [
          "200",
          "201",
          "204",
          "404"
        ],
        "answer": 1,
        "explanation": "201 means a resource was created.",
        "hint": "The request created something new."
      },
      {
        "id": "m2-q3",
        "type": "single",
        "prompt": "A search has no matching tasks. What should the API normally return?",
        "choices": [
          "404 because no item matched.",
          "500 because the list is empty.",
          "200 with an empty list.",
          "204 and a JSON body."
        ],
        "answer": 2,
        "explanation": "The search itself succeeded. Its result is simply an empty collection.",
        "hint": "No matches is not always an error."
      },
      {
        "id": "m2-q4",
        "type": "single",
        "prompt": "Which rule is a strict Pydantic-model concern?",
        "choices": [
          "Reject an unknown field in the request body.",
          "Do not allow completed tasks to move back to todo.",
          "Show a Kanban card.",
          "Deploy the site to GitHub Pages."
        ],
        "answer": 0,
        "explanation": "Unknown-field rejection is data-shape validation. A status transition is a business rule.",
        "hint": "Is the issue about the shape of one request?"
      },
      {
        "id": "m2-q5",
        "type": "single",
        "prompt": "Why is exclude_unset useful in PATCH logic?",
        "choices": [
          "It deletes all unset fields.",
          "It identifies only fields the client supplied.",
          "It changes POST into PATCH.",
          "It turns every error into 200."
        ],
        "answer": 1,
        "explanation": "A partial update should update supplied fields without overwriting fields the client did not send.",
        "hint": "PATCH is partial."
      },
      {
        "id": "m2-q6",
        "type": "single",
        "prompt": "The value 'completed' is a valid status, but moving directly from 'todo' to 'completed' is forbidden. What kind of check is this?",
        "choices": [
          "A CSS rule.",
          "A response-model rule.",
          "A business-rule transition check.",
          "A Git branch rule."
        ],
        "answer": 2,
        "explanation": "The individual value is valid, but the move between states may be forbidden.",
        "hint": "The problem is the transition, not the spelling of the value."
      },
      {
        "id": "m2-q7",
        "type": "single",
        "prompt": "A task identifier comes from the URL `/tasks/42`. What kind of parameter is `42`?",
        "choices": [
          "Path parameter",
          "Query parameter",
          "Request header",
          "Response field"
        ],
        "answer": 0,
        "explanation": "It is part of the URL path.",
        "hint": "It appears inside the path itself."
      },
      {
        "id": "m2-q8",
        "type": "single",
        "prompt": "What is the purpose of a Break Test?",
        "choices": [
          "To make the test suite permanently fail.",
          "To prove the tests detect a real defect, then restore the code and return to green.",
          "To delete difficult tests.",
          "To test only spelling."
        ],
        "answer": 1,
        "explanation": "A deliberate small break followed by a failing test provides evidence that the suite is meaningful.",
        "hint": "Red first, then restored green."
      }
    ],
    "3": [
      {
        "id": "m3-q1",
        "type": "ordering",
        "prompt": "Put the Module 3 AI-assisted loop in order.",
        "items": [
          "Ask",
          "Inspect",
          "Run",
          "Test",
          "Refine"
        ],
        "answer": [
          "Ask",
          "Inspect",
          "Run",
          "Test",
          "Refine"
        ],
        "explanation": "The loop keeps the student in control at every step.",
        "hint": "Do not accept immediately after asking."
      },
      {
        "id": "m3-q2",
        "type": "single",
        "prompt": "Which Copilot request is most safely scoped?",
        "choices": [
          "Rewrite the whole frontend.",
          "Select the drop handler and ask for one status-update fix with an inline diff.",
          "Change anything you think is useful.",
          "Replace the project with a framework."
        ],
        "answer": 1,
        "explanation": "Selected code and one clear goal reduce unrelated changes.",
        "hint": "Smaller context and one change."
      },
      {
        "id": "m3-q3",
        "type": "single",
        "prompt": "What normally happens during dragstart?",
        "choices": [
          "The task identifier is placed in DataTransfer.",
          "The API server is deleted.",
          "The browser automatically updates the backend.",
          "The page reloads."
        ],
        "answer": 0,
        "explanation": "The dragged item stores identifying data that the drop handler can read.",
        "hint": "The drop target needs to know which task moved."
      },
      {
        "id": "m3-q4",
        "type": "single",
        "prompt": "Why does a drop target often handle dragover?",
        "choices": [
          "To allow the drop operation and set expected behavior.",
          "To create a database table.",
          "To make Fetch reject on 404.",
          "To write a pytest fixture."
        ],
        "answer": 0,
        "explanation": "The browser needs the target to allow the drop, commonly by preventing the default behavior.",
        "hint": "The drop target must accept the item."
      },
      {
        "id": "m3-q5",
        "type": "single",
        "prompt": "Fetch receives a 404 response. What happens by default?",
        "choices": [
          "The promise always rejects automatically.",
          "The browser closes.",
          "The promise can resolve, so the code must check response.ok or status.",
          "The response becomes 200."
        ],
        "answer": 2,
        "explanation": "HTTP error status alone does not automatically reject a Fetch promise.",
        "hint": "Fetch is a messenger, not a judge."
      },
      {
        "id": "m3-q6",
        "type": "single",
        "prompt": "Which error behavior is best for a student-facing frontend?",
        "choices": [
          "Hide the error and do nothing.",
          "Show a clear message and preserve a usable interface.",
          "Print only an internal stack trace on the page.",
          "Reload forever."
        ],
        "answer": 1,
        "explanation": "The student needs understandable feedback and a safe next step.",
        "hint": "Make failure visible and useful."
      },
      {
        "id": "m3-q7",
        "type": "single",
        "prompt": "Copilot starts suggesting a different project structure. What should the student do?",
        "choices": [
          "Attach the relevant real files, selected code, and terminal output.",
          "Accept the new structure immediately.",
          "Remove all file context.",
          "Ask a more general question."
        ],
        "answer": 0,
        "explanation": "Real repository context helps bring the answer back to the actual project.",
        "hint": "Ground the tool in the files."
      },
      {
        "id": "m3-q8",
        "type": "single",
        "prompt": "Why must the Kanban board provide a non-drag method to move tasks?",
        "choices": [
          "Drag and drop never works.",
          "Keyboard and assistive-technology users need an operable alternative.",
          "It makes the CSS file longer.",
          "GitHub Pages requires it."
        ],
        "answer": 1,
        "explanation": "Core functions should be available without requiring a mouse gesture.",
        "hint": "Accessibility is part of correctness."
      }
    ],
    "4": [
      {
        "id": "m4-q1",
        "type": "single",
        "prompt": "Why does Module 4 use a terminal agent?",
        "choices": [
          "It can inspect the repository, work across files, and run tools.",
          "It guarantees correct code.",
          "It removes the need for tests.",
          "It prevents all scope drift."
        ],
        "answer": 0,
        "explanation": "The terminal agent can handle broader repository tasks, but still needs human control.",
        "hint": "Think multi-file work and commands."
      },
      {
        "id": "m4-q2",
        "type": "single",
        "prompt": "What is the best purpose of CLAUDE.md?",
        "choices": [
          "Store secrets for the agent.",
          "Provide repository-specific stack, commands, rules, and boundaries.",
          "Replace all task prompts.",
          "List every possible programming language."
        ],
        "answer": 1,
        "explanation": "Project memory should help the agent understand and safely work in this repository.",
        "hint": "It is a project guide, not a secret store."
      },
      {
        "id": "m4-q3",
        "type": "single",
        "prompt": "For a multi-file task, what is the safest first step?",
        "choices": [
          "Ask for a plan before edits.",
          "Approve all changes automatically.",
          "Delete the tests.",
          "Run the deployment first."
        ],
        "answer": 0,
        "explanation": "A plan exposes assumptions, scope, sequence, and affected files before changes occur.",
        "hint": "Inspect before edit."
      },
      {
        "id": "m4-q4",
        "type": "single",
        "prompt": "What is a common benefit of a multi-stage Docker build?",
        "choices": [
          "It can keep build tools out of the final runtime image.",
          "It removes the need for application code.",
          "It makes secrets safe to copy into the image.",
          "It guarantees zero vulnerabilities."
        ],
        "answer": 0,
        "explanation": "A separate runtime stage can contain only what is needed to run the app.",
        "hint": "Build environment and runtime environment can differ."
      },
      {
        "id": "m4-q5",
        "type": "single",
        "prompt": "Why is .dockerignore important?",
        "choices": [
          "It reduces unnecessary build context and helps keep sensitive or irrelevant files out.",
          "It changes HTTP status codes.",
          "It replaces GitHub Actions.",
          "It stores passwords."
        ],
        "answer": 0,
        "explanation": "The build context should contain only files intentionally sent to Docker.",
        "hint": "Think about what is copied or sent into the build."
      },
      {
        "id": "m4-q6",
        "type": "single",
        "prompt": "Why run the application as a non-root user when practical?",
        "choices": [
          "To reduce the impact of a compromise.",
          "To make the image larger.",
          "To remove all permissions from the app.",
          "To make tests unnecessary."
        ],
        "answer": 0,
        "explanation": "Least privilege limits what a compromised process can do.",
        "hint": "Do not give more permission than needed."
      },
      {
        "id": "m4-q7",
        "type": "single",
        "prompt": "What does an intentional red CI run followed by a restored green run prove?",
        "choices": [
          "The workflow can detect the tested failure and can pass after the fix.",
          "The workflow is too slow.",
          "The tests should be removed.",
          "The agent is always correct."
        ],
        "answer": 0,
        "explanation": "The red/green evidence shows the workflow is not merely displaying success.",
        "hint": "A real failure must reach CI."
      },
      {
        "id": "m4-q8",
        "type": "single",
        "prompt": "How should AI code-review comments be handled?",
        "choices": [
          "Accept all of them.",
          "Ignore all of them.",
          "Triage them as Useful, Noise, or Wrong, then verify.",
          "Apply only the longest comments."
        ],
        "answer": 2,
        "explanation": "AI review can help, but findings vary in relevance and accuracy.",
        "hint": "Review the reviewer."
      }
    ],
    "5": [
      {
        "id": "m5-q1",
        "type": "single",
        "prompt": "What three rule categories should docs/ai-usage.md contain?",
        "choices": [
          "Which model to pay for, IDE theme, and prompts per day.",
          "What the student will never paste, what the student will always verify, and how AI contributions will be recorded.",
          "How to deploy, monitor production, and choose a cloud provider.",
          "Which teammate approves output, which tool is fastest, and which language is easiest."
        ],
        "answer": 1,
        "explanation": "The rules focus on information protection, verification, and transparency about AI help.",
        "hint": "Think governance, not tool preferences."
      },
      {
        "id": "m5-q2",
        "type": "single",
        "prompt": "During a plan-only comments activity, Codex proposes edits to app/models.py and frontend/index.html. What should the student do?",
        "choices": [
          "Approve because Codex read the files.",
          "Reject the edits, keep the activity plan-only, save the plan, and critique it as Right, Missing, or Needs-Resequencing.",
          "Ask Codex to finish implementation before planning.",
          "Delete AGENTS.md."
        ],
        "answer": 1,
        "explanation": "Planning and implementation are separate scopes. Unexpected code edits should be rejected.",
        "hint": "The activity is plan-only."
      },
      {
        "id": "m5-q3",
        "type": "single",
        "prompt": "Which prompt best represents targeted context?",
        "choices": [
          "Write an architecture document using anything you know about FastAPI.",
          "Read exactly app/main.py, app/models.py, and app/storage.py. Use only those files, follow named sections, and say when something is not visible instead of inferring.",
          "Read the whole repository and the internet with no page limit.",
          "Do not read files; guess from the project name."
        ],
        "answer": 1,
        "explanation": "It names exact files, limits the evidence, defines the output, and prevents guessing.",
        "hint": "Specific files and a missing-information rule."
      },
      {
        "id": "m5-q4",
        "type": "single",
        "prompt": "Codex reports: 'Critical: every Task Tracker endpoint must add login immediately.' How should this finding be graded when authentication is outside the documented scope and threat model?",
        "choices": [
          "Valid, because every app without authentication is critical.",
          "False positive, because a real security idea is misapplied to this project context.",
          "Noise, because authentication is never a security topic.",
          "Skip it until deployment."
        ],
        "answer": 1,
        "explanation": "Authentication can matter, but severity and relevance depend on intended scope and threat model.",
        "hint": "A security-shaped concern can still be contextually wrong."
      },
      {
        "id": "m5-q5",
        "type": "single",
        "prompt": "Which security-review comparison column is especially important, and why?",
        "choices": [
          "Agreement, because shared findings are always highest severity.",
          "AI-only, to prove the AI is more thorough.",
          "You-only, because it captures business logic, scope, and threat-model context the AI may miss.",
          "None; the columns are only formatting."
        ],
        "answer": 2,
        "explanation": "Human project knowledge often reveals issues or constraints that are not visible from code alone.",
        "hint": "What can the student know that the model may not?"
      },
      {
        "id": "m5-q6",
        "type": "single",
        "prompt": "A plan for comments never names repository files or structure. What is the best critique?",
        "choices": [
          "It is better because generic advice is reusable.",
          "It may be coherent, but it is not repo-grounded and may assume the wrong storage, API, frontend, or test patterns.",
          "Implement it immediately.",
          "It is invalid only if it has spelling mistakes."
        ],
        "answer": 1,
        "explanation": "A repository plan should fit the real architecture and conventions.",
        "hint": "Generic coherence is not the same as repository evidence."
      },
      {
        "id": "m5-q7",
        "type": "single",
        "prompt": "What should AGENTS.md do?",
        "choices": [
          "Give repository-specific stack, commands, business rules, and path boundaries.",
          "Store API keys.",
          "Replace the student security review.",
          "Copy a generic policy with no project details."
        ],
        "answer": 0,
        "explanation": "AGENTS.md guides the agent inside the real repository and should not contain secrets.",
        "hint": "Project guidance, not secret storage."
      },
      {
        "id": "m5-q8",
        "type": "single",
        "prompt": "A security audit says only 'validate inputs, avoid SQL injection, protect secrets, use HTTPS' and cites no files. What is the best response?",
        "choices": [
          "Mark every item Valid.",
          "Treat it as weak or noisy output, request a file-grounded read-only audit, and do not confirm generic advice as findings.",
          "Implement all suggestions immediately.",
          "Delete the review activity."
        ],
        "answer": 1,
        "explanation": "A confirmed finding needs repository evidence and a concrete risk.",
        "hint": "Best practice is not automatically proof of a defect."
      },
      {
        "id": "m5-q9",
        "type": "single",
        "prompt": "Which item is the clearest high-risk entry in a governance worksheet?",
        "choices": [
          "Open course code with no sensitive data.",
          "A real customer email address pasted into a prompt.",
          "A generic stack trace with no secrets or personal data.",
          "Public repository filenames."
        ],
        "answer": 1,
        "explanation": "A real customer email address is personal data and should not be pasted into an AI prompt without an approved reason and handling process.",
        "hint": "Look for real personal data."
      },
      {
        "id": "m5-q10",
        "type": "single",
        "prompt": "What is the main shift in Module 5?",
        "choices": [
          "Add one more production feature.",
          "Categorize, critique, compare, verify, and document AI output.",
          "Stop using AI completely.",
          "Memorize one tool interface forever."
        ],
        "answer": 1,
        "explanation": "The module focuses on human judgment, governance, security review, planning, and documentation.",
        "hint": "The goal changes from output production to responsible evaluation."
      },
      {
        "id": "m5-q11",
        "type": "single",
        "prompt": "Which security-review prompt is strongest?",
        "choices": [
          "Check security and fix anything bad.",
          "Make the app secure and edit any files.",
          "Look at my code and tell me if it is okay.",
          "Review without editing. Focus on named risk areas, cite actual files, explain concrete risks, avoid invented findings, and return a table for grading."
        ],
        "answer": 3,
        "explanation": "It is read-only, scoped, evidence-based, and designed for human grading.",
        "hint": "Look for boundaries, evidence, and a useful output format."
      },
      {
        "id": "m5-q12",
        "type": "single",
        "prompt": "Which output set best represents a complete Module 5 submission?",
        "choices": [
          "Authentication, production database migration, and deployed comments.",
          "Security review, governance worksheet, AI usage rules, comments feature plan, architecture document, AI playbook, and the assigned closing reflection or checklist.",
          "Only AGENTS.md.",
          "Only a list of prompts."
        ],
        "answer": 1,
        "explanation": "Module 5 is documentation- and judgment-centered, not a production feature release.",
        "hint": "Think docs-first deliverables."
      },
      {
        "id": "m5-q13",
        "type": "single",
        "prompt": "Which workflow best matches the Codex app lesson?",
        "choices": [
          "Select the correct repo, keep one bounded task per thread, inspect diffs, and discard changes outside scope.",
          "Use every interface at once and apply all diffs.",
          "Open the parent folder and let the tool guess.",
          "Skip the review pane."
        ],
        "answer": 0,
        "explanation": "Correct repository context, bounded threads, diff review, and scope control keep the human responsible.",
        "hint": "One task, one scope, reviewed changes."
      }
    ]
  }
};
