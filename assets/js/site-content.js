window.AI_LEARNING_HUB_CONTENT = {
  "version": 1,
  "site": {
    "title": "AI-Assisted Coding Learning Hub",
    "tagline": "Learn to use AI as a coding partner — not an autopilot.",
    "privacyNote": "Your progress stays in this browser unless you export it. Do not save secrets or personal data here.",
    "journey": [
      {
        "module": 1,
        "verb": "Communicate",
        "summary": "Give AI a clear task, context, limits, and output format."
      },
      {
        "module": 2,
        "verb": "Build",
        "summary": "Create a verified FastAPI backend with strict models, routes, rules, and tests."
      },
      {
        "module": 3,
        "verb": "Refine",
        "summary": "Build the browser experience with focused prompts, diffs, Fetch, drag and drop, and tests."
      },
      {
        "module": 4,
        "verb": "Control",
        "summary": "Use a repository-wide agent carefully for Docker, CI, documentation, and review."
      },
      {
        "module": 5,
        "verb": "Govern",
        "summary": "Judge findings, protect information, engineer context, and document AI use."
      }
    ]
  },
  "modules": [
    {
      "id": 1,
      "slug": "module-1",
      "title": "Talk to AI Clearly",
      "mission": "Give an AI tool a clear job, review its draft, and turn ideas into useful project documents.",
      "estimatedMinutes": 55,
      "analogy": "AI is like a new intern: fast and helpful, but it needs a clear brief and careful review.",
      "simpleOverview": [
        "A strong prompt explains the task, the useful context, the limits, and the expected output.",
        "Project instructions can provide background, but the current prompt still needs the exact job.",
        "AI output is a draft. The student reviews, corrects, and tests it.",
        "User stories explain who needs something, what they need, and why.",
        "Acceptance criteria make a story testable.",
        "An ADR is a short record of an important technical decision, its context, and its consequences."
      ],
      "keyTakeaway": "Clear context and clear limits produce more useful drafts, but the human still owns the result.",
      "commonMistakes": [
        "Using a vague prompt and accepting the first answer.",
        "Adding unrelated context that distracts the model.",
        "Writing user stories without testable acceptance criteria.",
        "Copying an ADR without understanding the decision.",
        "Assuming the AI remembers earlier conversations.",
        "Treating confident language as evidence."
      ],
      "activity": {
        "type": "prompt-builder",
        "title": "Prompt Repair Shop",
        "instructions": "Improve a weak prompt by adding the task, context, constraints, output format, and an instruction for missing information."
      },
      "readingGroups": {
        "core": [
          {
            "title": "OpenAI — Prompt engineering",
            "url": "https://developers.openai.com/api/docs/guides/prompt-engineering",
            "use": "Clear instructions and general prompt strategies. Skip API implementation details for this module."
          },
          {
            "title": "Anthropic — Prompt engineering overview and best practices",
            "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
            "use": "Clear instructions, examples, roles, constraints, and structured output."
          },
          {
            "title": "GitHub Docs — Responsible use of GitHub Copilot Chat",
            "url": "https://docs.github.com/en/copilot/responsible-use/chat-in-github",
            "use": "Limitations, review, testing, and human responsibility."
          },
          {
            "title": "Atlassian — User Stories with Examples and a Template",
            "url": "https://www.atlassian.com/agile/project-management/user-stories",
            "use": "User-story format, the 3 Cs, and acceptance criteria."
          },
          {
            "title": "Martin Fowler — Architecture Decision Record",
            "url": "https://martinfowler.com/bliki/ArchitectureDecisionRecord.html",
            "use": "What an ADR is and how it records context, a decision, and consequences."
          }
        ],
        "practical": [
          {
            "title": "Claude Projects",
            "url": "https://support.claude.com/en/articles/9517075-what-are-projects",
            "use": "Persistent project context."
          },
          {
            "title": "ChatGPT Custom Instructions",
            "url": "https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions",
            "use": "Persistent general instructions, not a substitute for task-specific context."
          },
          {
            "title": "Anthropic — Interactive Prompt Engineering Tutorial",
            "url": "https://github.com/anthropics/prompt-eng-interactive-tutorial",
            "use": "Practice improving weak prompts."
          }
        ],
        "optional": [
          {
            "title": "Cognitect / Michael Nygard — Documenting Architecture Decisions",
            "url": "https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
            "use": "Original lightweight ADR framing."
          },
          {
            "title": "AWS — Prompt engineering concepts for Amazon Bedrock",
            "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html",
            "use": "General prompt-quality ideas for students using Bedrock."
          },
          {
            "title": "Google — Gemini prompt design strategies",
            "url": "https://ai.google.dev/gemini-api/docs/prompting-strategies",
            "use": "Compare iterative prompting, context, and examples."
          },
          {
            "title": "Martin Fowler / Thoughtworks — Exploring Generative AI",
            "url": "https://martinfowler.com/articles/exploring-gen-ai.html",
            "use": "Practitioner reflections on AI-assisted software delivery."
          },
          {
            "title": "Anthropic Engineering — Effective context engineering for AI agents",
            "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
            "use": "Advanced extension from context blocks to agent context."
          },
          {
            "title": "Research — Can LLMs Generate User Stories and Assess Their Quality?",
            "url": "https://arxiv.org/abs/2507.15157",
            "use": "Advanced evidence on AI-assisted user stories."
          },
          {
            "title": "Research — Exploring the Use of LLMs for Requirements Specification",
            "url": "https://arxiv.org/abs/2507.19113",
            "use": "Advanced evidence on requirements work."
          },
          {
            "title": "Research — Automated User Story Generation with Test Case Specification Using LLM",
            "url": "https://arxiv.org/abs/2404.01558",
            "use": "Advanced evidence linking stories and test cases."
          },
          {
            "title": "OpenAI Cookbook — GPT-4.1 prompting guide",
            "url": "https://cookbook.openai.com/examples/gpt4-1_prompting_guide",
            "use": "Model-specific examples after learning the tool-agnostic basics."
          }
        ]
      }
    },
    {
      "id": 2,
      "slug": "module-2",
      "title": "Build the Backend Carefully",
      "mission": "Use editor-based AI to build the Task Tracker backend, then prove the behavior with tests.",
      "estimatedMinutes": 65,
      "analogy": "The API is a service counter, Pydantic is the data checker, storage is the shelf, and tests are the inspectors.",
      "simpleOverview": [
        "Give the editor AI the exact files and one bounded change.",
        "Request models describe input; response models describe output.",
        "Pydantic v2 rules reject blank titles, unknown fields, and invalid enum values.",
        "Routes need correct status codes and clear errors.",
        "PATCH changes only supplied fields.",
        "A valid field value can still violate a status-transition business rule.",
        "A Break Test proves that the tests detect a real defect."
      ],
      "keyTakeaway": "Generated backend code is not complete until its data rules, status codes, and tests are verified.",
      "commonMistakes": [
        "Using Pydantic v1 syntax.",
        "Allowing extra fields.",
        "Returning the wrong status code.",
        "Using a query parameter where a path parameter is expected.",
        "Overwriting fields during PATCH.",
        "Forgetting transition rules.",
        "Writing tests that never fail.",
        "Adding databases or deployment work outside the module."
      ],
      "activity": {
        "type": "api-detective",
        "title": "API Detective",
        "instructions": "Match each request situation to the expected status code, model, and type of rule."
      },
      "readingGroups": {
        "core": [
          {
            "title": "Editor-based AI prompting and file context",
            "links": [
              [
                "Cursor Docs — Prompting agents",
                "https://cursor.com/docs/agent/prompting"
              ],
              [
                "GitHub Copilot best practices",
                "https://docs.github.com/en/copilot/get-started/best-practices"
              ],
              [
                "VS Code Chat overview",
                "https://code.visualstudio.com/docs/copilot/chat/copilot-chat"
              ]
            ],
            "use": "Specific file context, bounded prompts, review before apply."
          },
          {
            "title": "FastAPI request and response fundamentals",
            "links": [
              [
                "Request Body",
                "https://fastapi.tiangolo.com/tutorial/body/"
              ],
              [
                "Response Model",
                "https://fastapi.tiangolo.com/tutorial/response-model/"
              ],
              [
                "Response Status Code",
                "https://fastapi.tiangolo.com/tutorial/response-status-code/"
              ]
            ],
            "use": "Map TaskCreate to input, TaskResponse to output, and status_code to the route."
          },
          {
            "title": "FastAPI paths, queries, and errors",
            "links": [
              [
                "Path Parameters",
                "https://fastapi.tiangolo.com/tutorial/path-params/"
              ],
              [
                "Query Parameters",
                "https://fastapi.tiangolo.com/tutorial/query-params/"
              ],
              [
                "Handling Errors",
                "https://fastapi.tiangolo.com/tutorial/handling-errors/"
              ]
            ],
            "use": "Path versus query, empty search results, 404, and business-rule errors."
          },
          {
            "title": "Pydantic v2 models and validation",
            "links": [
              [
                "Models",
                "https://pydantic.dev/docs/validation/latest/concepts/models/"
              ],
              [
                "Validators",
                "https://pydantic.dev/docs/validation/latest/concepts/validators/"
              ],
              [
                "Model Config",
                "https://pydantic.dev/docs/validation/2.0/usage/model_config/"
              ],
              [
                "Serialization",
                "https://pydantic.dev/docs/validation/latest/concepts/serialization/"
              ]
            ],
            "use": "Strict fields, validators, enums, and model_dump."
          },
          {
            "title": "PATCH and partial updates",
            "links": [
              [
                "FastAPI Body Updates",
                "https://fastapi.tiangolo.com/tutorial/body-updates/"
              ],
              [
                "Pydantic Serialization",
                "https://pydantic.dev/docs/validation/latest/concepts/serialization/"
              ]
            ],
            "use": "exclude_unset, partial updates, and transition validation."
          },
          {
            "title": "Testing FastAPI with pytest",
            "links": [
              [
                "FastAPI Testing",
                "https://fastapi.tiangolo.com/tutorial/testing/"
              ],
              [
                "pytest fixtures",
                "https://docs.pytest.org/en/stable/how-to/fixtures.html"
              ]
            ],
            "use": "TestClient, fixtures, status assertions, reset behavior, and Break Tests."
          }
        ],
        "practical": [
          {
            "title": "HTTP status-code references",
            "links": [
              [
                "FastAPI status_code",
                "https://fastapi.tiangolo.com/tutorial/response-status-code/"
              ],
              [
                "MDN HTTP status codes",
                "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status"
              ],
              [
                "MDN 204",
                "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204"
              ],
              [
                "MDN 422",
                "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/422"
              ]
            ],
            "use": "Check 201, 204, 404, and 422 expectations."
          },
          {
            "title": "CRUD and test-suite lookup",
            "links": [
              [
                "FastAPI Request Body",
                "https://fastapi.tiangolo.com/tutorial/body/"
              ],
              [
                "FastAPI Response Model",
                "https://fastapi.tiangolo.com/tutorial/response-model/"
              ],
              [
                "FastAPI Testing",
                "https://fastapi.tiangolo.com/tutorial/testing/"
              ],
              [
                "pytest fixtures",
                "https://docs.pytest.org/en/stable/how-to/fixtures.html"
              ]
            ],
            "use": "Review routes, TestClient, fixtures, and storage reset."
          }
        ],
        "optional": [
          {
            "title": "Microsoft Learn — Introduction to prompt engineering with GitHub Copilot",
            "url": "https://learn.microsoft.com/en-us/training/modules/introduction-prompt-engineering-with-github-copilot/",
            "use": "Broader beginner prompt practice."
          },
          {
            "title": "Microsoft Learn — Developer use cases for AI with GitHub Copilot",
            "url": "https://learn.microsoft.com/en-us/training/modules/developer-use-cases-for-ai-with-github-copilot/",
            "use": "Broader software-lifecycle use cases."
          },
          {
            "title": "GitHub Blog — Using Copilot in your IDE",
            "url": "https://github.blog/developer-skills/github/how-to-use-github-copilot-in-your-ide-tips-tricks-and-best-practices/",
            "use": "Practical context tips."
          },
          {
            "title": "Martin Fowler — Exploring GenAI",
            "url": "https://martinfowler.com/articles/exploring-gen-ai.html",
            "use": "Professional reflection beyond the coding reference."
          }
        ]
      }
    },
    {
      "id": 3,
      "slug": "module-3",
      "title": "Build the Browser Experience",
      "mission": "Use focused Copilot help to build the Kanban board, check Fetch behavior, and verify frontend changes.",
      "estimatedMinutes": 60,
      "analogy": "The frontend moves digital sticky notes; Fetch is the messenger between the board and the API.",
      "simpleOverview": [
        "Use the loop Ask, Inspect, Run, Test, Refine.",
        "Select a small block before asking for an inline change.",
        "Native drag and drop uses draggable items, transferred data, drop targets, dragstart, dragover, and drop.",
        "A 404 or 422 response does not automatically reject Fetch.",
        "Check response.ok and show useful error states.",
        "Use Copilot to draft tests, then run and verify them.",
        "Add real file and terminal context when suggestions become generic."
      ],
      "keyTakeaway": "Keep the change small, inspect the diff, and check the browser and tests after every important step.",
      "commonMistakes": [
        "Requesting a whole-file rewrite.",
        "Applying an inline diff without reading it.",
        "Forgetting response.ok.",
        "Showing no loading or error state.",
        "Making task movement mouse-only.",
        "Using an unapproved drag library.",
        "Adding tests without running them."
      ],
      "activity": {
        "type": "fetch-bug-hunt",
        "title": "Fetch Bug Hunt",
        "instructions": "Find the missing status check and choose the safest error-handling step."
      },
      "readingGroups": {
        "core": [
          {
            "title": "GitHub Docs — Best practices for using GitHub Copilot",
            "url": "https://docs.github.com/en/copilot/get-started/best-practices",
            "use": "Thoughtful prompts, smaller tasks, examples, inspection, and validation."
          },
          {
            "title": "GitHub Docs — Asking Copilot questions in your IDE",
            "url": "https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide",
            "use": "IDE chat, selected code, file context, and grounded questions."
          },
          {
            "title": "VS Code Docs — Inline chat",
            "url": "https://code.visualstudio.com/docs/copilot/chat/inline-chat",
            "use": "Selected-block prompts and Keep/Undo review."
          },
          {
            "title": "MDN — HTML Drag and Drop API",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API",
            "use": "Draggable items, transferred data, drop targets, and event flow."
          },
          {
            "title": "MDN — Using the Fetch API",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
            "use": "Sending JSON, reading JSON, and checking status or response.ok."
          },
          {
            "title": "GitHub Docs — Writing tests with GitHub Copilot",
            "url": "https://docs.github.com/en/copilot/tutorials/write-tests",
            "use": "Specific test prompts and verification after generation."
          }
        ],
        "practical": [
          {
            "title": "FastAPI — Testing",
            "url": "https://fastapi.tiangolo.com/tutorial/testing/",
            "use": "Backend tests for PATCH edge cases and status transitions."
          },
          {
            "title": "pytest documentation",
            "url": "https://docs.pytest.org/en/stable/",
            "use": "Run tests and understand failures."
          },
          {
            "title": "MDN — DataTransfer",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer",
            "use": "setData, getData, effectAllowed, and dropEffect."
          },
          {
            "title": "VS Code Docs — Manage context for AI",
            "url": "https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context",
            "use": "Attach files, symbols, terminal output, and codebase context."
          }
        ],
        "optional": [
          {
            "title": "GitHub Docs — Prompt engineering for Copilot Chat",
            "url": "https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering",
            "use": "Extra practice with context, constraints, examples, and output expectations."
          },
          {
            "title": "Martin Fowler / Thoughtworks — Exploring Generative AI",
            "url": "https://martinfowler.com/articles/exploring-gen-ai.html",
            "use": "Broader practitioner context after the hands-on work."
          }
        ]
      }
    },
    {
      "id": 4,
      "slug": "module-4",
      "title": "Let an Agent Work, but Keep Control",
      "mission": "Use a terminal agent for repository-wide tasks while reviewing plans, diffs, Docker work, CI, and AI review comments.",
      "estimatedMinutes": 70,
      "analogy": "A terminal agent is a contractor with access to the workshop: give written rules, approve the job, inspect the work, and test it.",
      "simpleOverview": [
        "A terminal agent can understand and change multiple files and run tools.",
        "CLAUDE.md gives repository-specific project memory.",
        "Plan before editing and review every diff and command.",
        "A Dockerfile should be small, intentional, and safe—not only buildable.",
        ".dockerignore protects the build context from unnecessary or sensitive files.",
        "CI must fail when tests fail; an intentional red run followed by green provides evidence.",
        "AI review comments are triaged as Useful, Noise, or Wrong."
      ],
      "keyTakeaway": "More agent power requires stronger instructions, smaller approvals, and better verification.",
      "commonMistakes": [
        "Writing a long generic CLAUDE.md.",
        "Giving the agent an unbounded task.",
        "Approving commands without reading them.",
        "Accepting a Dockerfile only because it builds.",
        "Including secrets or unnecessary files in the build context.",
        "Swallowing test failures in CI.",
        "Treating every AI review comment as correct."
      ],
      "activity": {
        "type": "diff-traffic-light",
        "title": "Diff Traffic Light",
        "instructions": "Classify proposed changes as Keep, Needs Review, or Reject, then explain the evidence needed."
      },
      "readingGroups": {
        "core": [
          {
            "title": "Anthropic — Claude Code overview",
            "url": "https://code.claude.com/docs/en/overview",
            "use": "Repo-wide understanding, multi-file work, and tool use."
          },
          {
            "title": "Anthropic — How Claude remembers your project",
            "url": "https://code.claude.com/docs/en/memory",
            "use": "CLAUDE.md content, updates, and troubleshooting."
          },
          {
            "title": "Docker Docs — Building best practices",
            "url": "https://docs.docker.com/build/building/best-practices/",
            "use": "Multi-stage builds, smaller images, .dockerignore, and non-root guidance."
          },
          {
            "title": "GitHub Docs — Responsible use of AI code review",
            "url": "https://docs.github.com/en/copilot/responsible-use/code-review",
            "use": "Missed issues, false positives, inaccurate suggestions, and human review."
          }
        ],
        "practical": [
          {
            "title": "Anthropic — Claude Code common workflows",
            "url": "https://code.claude.com/docs/en/common-workflows",
            "use": "Explore, plan before editing, test, and document."
          },
          {
            "title": "Anthropic — Claude Code best practices",
            "url": "https://code.claude.com/docs/en/best-practices",
            "use": "Environment setup, planning, diffs, and useful context."
          },
          {
            "title": "GitHub Docs — Workflow syntax for GitHub Actions",
            "url": "https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions",
            "use": "Look up on, jobs, steps, runs-on, uses, run, and matrix."
          },
          {
            "title": "Docker Docs — Multi-stage builds",
            "url": "https://docs.docker.com/build/building/multi-stage/",
            "use": "Multiple FROM statements and COPY --from."
          },
          {
            "title": "Docker Docs — Build context",
            "url": "https://docs.docker.com/build/concepts/context/",
            "use": ".dockerignore and what enters the build context."
          },
          {
            "title": "Dockerfile reference",
            "url": "https://docs.docker.com/reference/dockerfile/",
            "use": "Look up .dockerignore-related behavior and USER."
          }
        ],
        "optional": [
          {
            "title": "HumanLayer — Writing a good CLAUDE.md",
            "url": "https://www.humanlayer.dev/blog/writing-a-good-claude-md",
            "use": "A practitioner view of useful, non-bloated project memory."
          },
          {
            "title": "Anthropic — Bringing Code Review to Claude Code",
            "url": "https://claude.com/blog/code-review",
            "use": "Product direction; the course still uses human triage."
          },
          {
            "title": "ADR hub",
            "url": "https://adr.github.io/",
            "use": "Background on ADRs and templates."
          },
          {
            "title": "AWS — ADR best practices",
            "url": "https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/",
            "use": "A team-oriented view of decision quality."
          }
        ],
        "extension": [
          {
            "title": "GitHub Docs — Security for GitHub Actions",
            "url": "https://docs.github.com/actions/security-for-github-actions",
            "use": "Advanced Actions security topics beyond the core module."
          },
          {
            "title": "Anthropic Engineering — Claude Code auto mode",
            "url": "https://www.anthropic.com/engineering/claude-code-auto-mode",
            "use": "Advanced permission and automation concepts."
          }
        ]
      }
    },
    {
      "id": 5,
      "slug": "module-5",
      "title": "Use AI with Judgment",
      "mission": "Review, govern, document, and make responsible decisions about AI-assisted work.",
      "estimatedMinutes": 65,
      "analogy": "AI is a co-pilot, not an autopilot: the human chooses the route, checks the instruments, and remains responsible.",
      "simpleOverview": [
        "Work from the correct repository and keep one bounded task per thread.",
        "AGENTS.md gives stack, command, testing, security, and path guidance.",
        "Security findings must cite actual files and explain a concrete risk.",
        "Classify findings as Valid, False positive, or Noise.",
        "Human-only findings capture business logic, project scope, and threat-model context.",
        "Targeted context names exact files and tells the model not to guess.",
        "Plan-only work must not change application code.",
        "Governance rules cover what never to paste, what always to verify, and how to record AI contributions."
      ],
      "keyTakeaway": "Good AI use is measured by how well you scope, critique, verify, and document—not by how much output you accept.",
      "commonMistakes": [
        "Turning generic advice into confirmed security findings.",
        "Calling missing authentication critical without checking scope and threat model.",
        "Accepting a plan that never references repository files.",
        "Allowing plan-only work to edit application code.",
        "Recording prompts but not decisions and verification.",
        "Sharing real personal or customer data.",
        "Treating AI-only findings as more important than human context."
      ],
      "activity": {
        "type": "security-finding-sorter",
        "title": "Security Finding Sorter",
        "instructions": "Classify a finding as Valid, False positive, or Noise, then identify the evidence that supports the choice."
      },
      "readingGroups": {
        "core": [
          {
            "title": "OpenAI — Codex app",
            "url": "https://developers.openai.com/codex/app",
            "use": "Project folders, threads, worktrees, and Git-aware desktop workflows."
          },
          {
            "title": "OpenAI — Custom instructions with AGENTS.md",
            "url": "https://developers.openai.com/codex/guides/agents-md",
            "use": "Project guidance, stack, commands, tests, security notes, and path boundaries."
          },
          {
            "title": "OpenSSF — Security-Focused Guide for AI Code Assistant Instructions",
            "url": "https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions.html",
            "use": "Security-focused instructions and continued developer responsibility."
          },
          {
            "title": "OWASP — Secure Code Review Cheat Sheet",
            "url": "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html",
            "use": "Manual review lenses: validation, auth, errors, data exposure, logging, and attack paths."
          },
          {
            "title": "Martin Fowler / Thoughtworks — Context Engineering for Coding Agents",
            "url": "https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html",
            "use": "Focused context, reusable instructions, and files as context."
          }
        ],
        "practical": [
          {
            "title": "OpenAI — Codex app review pane",
            "url": "https://developers.openai.com/codex/app/review",
            "use": "Inspect changes, comment, keep, or reject."
          },
          {
            "title": "OpenAI — Codex app settings",
            "url": "https://developers.openai.com/codex/app/settings",
            "use": "Configure only the settings needed for a safe module workflow."
          },
          {
            "title": "AGENTS.md open format guide",
            "url": "https://agents.md/",
            "use": "Structure examples for overview, commands, style, tests, and security."
          },
          {
            "title": "OWASP Top Ten",
            "url": "https://owasp.org/www-project-top-ten/",
            "use": "Grade findings and form a small backlog."
          },
          {
            "title": "GitHub Docs — Responsible use of Copilot code review",
            "url": "https://docs.github.com/en/copilot/responsible-use/code-review",
            "use": "Capabilities, limitations, false positives, and missed issues."
          },
          {
            "title": "GitHub Docs — Best practices for GitHub Copilot",
            "url": "https://docs.github.com/en/copilot/get-started/best-practices",
            "use": "Transferable context-management habits."
          }
        ],
        "optional": [
          {
            "title": "Anthropic Engineering — Effective context engineering for AI agents",
            "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
            "use": "Broader context-engineering concepts."
          },
          {
            "title": "LangChain — Context Engineering for Agents",
            "url": "https://www.langchain.com/blog/context-engineering-for-agents",
            "use": "Write, select, compress, and isolate context."
          },
          {
            "title": "NIST — AI RMF Playbook",
            "url": "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook",
            "use": "Govern, Map, Measure, and Manage."
          },
          {
            "title": "NIST — Generative AI Profile for the AI RMF",
            "url": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
            "use": "Formal governance language for generative AI risk."
          },
          {
            "title": "Research — Security Vulnerabilities in AI-Generated Code: A Large-Scale Analysis",
            "url": "https://arxiv.org/abs/2510.26103",
            "use": "Evidence that generated code still needs review."
          },
          {
            "title": "Frontiers — Review of AI models and code-generation security",
            "url": "https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2024.1386720/full",
            "use": "Systematic literature context."
          },
          {
            "title": "Research — Security Weaknesses of Copilot-Generated Code in GitHub Projects",
            "url": "https://arxiv.org/abs/2310.02059",
            "use": "Empirical evidence on generated-code weaknesses."
          }
        ]
      }
    }
  ],
  "glossary": [
    {
      "term": "Acceptance criteria",
      "definition": "Conditions that show when a user story is complete."
    },
    {
      "term": "ADR",
      "definition": "A short record of an important technical decision, its context, and its consequences."
    },
    {
      "term": "Agent",
      "definition": "An AI tool that can inspect files, run tools, and make changes."
    },
    {
      "term": "API",
      "definition": "A defined way for software parts to communicate."
    },
    {
      "term": "Business rule",
      "definition": "A project rule that describes allowed behavior."
    },
    {
      "term": "Context",
      "definition": "Information available to the AI for the current task."
    },
    {
      "term": "Context engineering",
      "definition": "Choosing, organizing, and limiting information given to an AI system."
    },
    {
      "term": "CRUD",
      "definition": "Create, Read, Update, and Delete."
    },
    {
      "term": "Diff",
      "definition": "A view that shows what changed in files."
    },
    {
      "term": "False positive",
      "definition": "A reported problem that looks plausible but does not apply in the current context."
    },
    {
      "term": "Fetch",
      "definition": "A browser API for making network requests."
    },
    {
      "term": "Governance",
      "definition": "Rules and practices for responsible AI use."
    },
    {
      "term": "HTTP status code",
      "definition": "A number that explains the result of a web request."
    },
    {
      "term": "localStorage",
      "definition": "Browser storage for small, non-sensitive data that may remain between visits."
    },
    {
      "term": "Noise",
      "definition": "Output that is generic, unsupported, irrelevant, or not actionable."
    },
    {
      "term": "PATCH",
      "definition": "An HTTP method commonly used for partial updates."
    },
    {
      "term": "Prompt",
      "definition": "The instructions and context given to an AI model."
    },
    {
      "term": "Pydantic",
      "definition": "A Python library used to validate data models."
    },
    {
      "term": "Repo-grounded",
      "definition": "Based on the real files and structure of the repository."
    },
    {
      "term": "Threat model",
      "definition": "A description of what needs protection, from whom, and in what environment."
    },
    {
      "term": "Validation",
      "definition": "Checking that data or behavior follows defined rules."
    },
    {
      "term": "Verification",
      "definition": "Gathering evidence that a result is correct."
    }
  ]
};
