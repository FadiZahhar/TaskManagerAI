@AGENTS.md

## Claude Code-specific operating rules

- Start complex or multi-file work in Plan Mode.
- In the first response for each phase, inspect the relevant code and propose a plan before editing.
- Use selected, focused edits rather than broad rewrites.
- Stop after the requested phase; do not automatically continue into the next phase.
- When browser control is unavailable, produce an exact browser and DevTools checklist and do not claim it passed.
- Before any deliberate source breakage, show the proposed temporary mutation and wait for approval.
