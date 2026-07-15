# Module 3 Debugging Log

Create one entry for each meaningful failure or deliberate-breakage exercise. Do not invent evidence.

## Entry ___ — [brief title]

**1. Bug or failure**  
[State what failed or what was deliberately broken.]

**2. Evidence**  
- Action performed:  
- Failing test or browser flow:  
- Status code:  
- Response body / console message / traceback line:  
- Relevant request URL and method:  

**3. AI diagnosis**  
[Summarize the stated root cause, likely file/symbol, and proposed source fix.]

**4. Decision**  
`ACCEPTED` / `REJECTED` — [Explain why this is a source-cause fix or symptom suppression.]

**Verification after the decision**  
- Targeted check:  
- Full suite:  
- Browser contract item(s):  

---

# Reflection

- Which AI tool was used for each phase, and why?
- Which suggestion was rejected, and why?
- What evidence was most useful: diff, browser, network, console, response body, or pytest output?
- What would be added to `AGENTS.md` or `CLAUDE.md` to prevent a repeated mistake?
