I am running a Break Test for Module 2. The production code is intentionally broken right now.

Break I introduced:
[PASTE EXACT CHANGE, such as "commented out validate_status_transition(...) in the PATCH route"]

Tests I expected to fail:
[PASTE EXPECTED TEST NAMES]

Actual pytest output:
[PASTE OUTPUT]

Analyze the result.

Rules:
- Do NOT fix the intentionally broken production code in this response.
- If the expected test failed, explain what behavior the test successfully protected.
- If a test passed when it should have failed, identify the missing or weak assertion and propose a test-only fix.
- If an unexpected test failed, explain whether that reveals a real dependency or a bad test.

Output:
1. Break Test result summary
2. Which tests are trustworthy
3. Which tests need improvement, if any
4. Test-only code changes if needed

After Claude analyzes it, restore the production code and run:
pytest

Expected: all tests pass.