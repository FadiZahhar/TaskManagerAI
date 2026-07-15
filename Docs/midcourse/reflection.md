# Reflection

> **Submission requirement:** 250–500 words. Replace every bracketed item with real experience. Do not submit this scaffold unchanged.

During this project I used **[CLAUDE CODE AND ANY OTHER TOOL]** for different parts of the workflow rather than asking one tool to generate the entire solution. I used Claude first to inspect **[KEY FILES OR SYMBOLS]**, summarize the existing API and frontend contract, and identify where the two selected features would fit. I then used focused prompts for planning, backend changes, pytest tests, frontend integration, debugging, and one narrow refactor. My responsibility was to compare every proposal with the repository, review the diff, run the relevant command, and decide whether to accept, edit, or reject it.

One moment when AI helped was **[DESCRIBE A SPECIFIC MOMENT]**. The useful part was not only the generated code; it was **[EXPLANATION, TEST MATRIX, ROOT-CAUSE HYPOTHESIS, OR SMALLER DESIGN]**. I verified that help by **[TARGETED TEST/BROWSER/NETWORK EVIDENCE]**, then ran **[FULL SUITE OR CONTRACT]** before keeping the change.

AI also slowed me down when **[DESCRIBE ONE REAL EXAMPLE]**. It assumed **[WRONG FIELD, ROUTE, STATUS, ARCHITECTURE, OR TEST SETUP]** or proposed **[OVERLY LARGE/OUT-OF-SCOPE CHANGE]**. I did not force that suggestion into the project. I returned to **[FILE/RESPONSE/TRACEBACK/REQUIREMENT]**, rewrote the prompt with the missing context and constraints, and **[EDITED OR REJECTED]** the proposal. This showed me that a fast answer can create more work when its context is weak.

My review materially changed the result in **[SPECIFIC PLACE]**. Claude proposed **[SUGGESTION]**, but I noticed **[RISK OR CONTRACT VIOLATION]**. I changed the implementation to **[FINAL DECISION]** because **[EVIDENCE OR TRADEOFF]**. The Break Tests were especially useful: **[TEST 1]** and **[TEST 2]** passed on correct source, failed after a small temporary source mutation for the expected reason, and passed again after restoration. That gave me more confidence than a green suite alone.

The main lesson is that AI-assisted coding is a controlled feedback loop: define observable behavior, give the tool the real context, inspect its output, test the smallest change, and document the human decision. The final repository reflects both the implemented features and the evidence used to trust them.

**Final word count:** `[COUNT — MUST BE 250–500]`
