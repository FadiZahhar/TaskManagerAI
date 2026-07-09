My transition verification printed these failing line(s):

[PASTE THE FAILING LINE(S)]

Expected pattern for the six checks:
200, 200, 422, 200, 422, 200

Relevant files:
@app/business_rules.py
@app/main.py

For each failing check, identify the root cause and fix it without changing the public function names or route paths.

Checklist of common root causes:
- validate_status_transition checks only the new status, not the (current, new) pair.
- The PATCH route validates even when payload.status is None.
- The PATCH route validates before checking whether the task exists.
- Same -> same was accidentally allowed.
- The route changed the expected 404 behavior.

Constraints:
- Keep VALID_TRANSITIONS as the three allowed pairs.
- Keep same -> same invalid.
- Keep invalid transitions as HTTP 422.
- Do not modify unrelated routes.

Output only the full updated app/business_rules.py and the updated PATCH route.