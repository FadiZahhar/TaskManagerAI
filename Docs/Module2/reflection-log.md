# Reflection Log — Module 2

I built out the Task Tracker's CRUD layer this module: `app/models.py` and
`app/storage.py` passed both an import check and a functional sanity check
(create, get, filter, update, delete, reset) before any routes touched them.
Each endpoint was verified against the running server rather than assumed —
`POST /tasks` returns 201 with the full task body, `GET /tasks`/`GET
/tasks/{id}` return 200 (or 404 for a missing id), `PATCH` returns 200 for
valid partial updates, and `DELETE` returns 204 with an empty body — and the
status-transition matrix (`ToDo→InProgress`, `InProgress→Done`,
`Done→InProgress` allowed; `Done→ToDo`, reverse transitions, and same-status
no-ops rejected with 422) matched the exact `200/200/422/200/422/200`
sequence I checked it against. The full pytest suite passed 19/19, and I ran
a genuine Break Test by commenting out the `validate_status_transition` call
in the PATCH route: exactly the two tests tied to that rule
(`test_patch_invalid_transition_todo_to_done_returns_422`,
`test_patch_same_status_returns_422`) failed, with 17 others staying green,
which told me the test suite's coverage is precise rather than accidental.
The AI did well at scoping each change to exactly the route or file requested
without touching unrelated code, which kept every diff small enough to
verify in isolation. The thing I had to catch and correct myself was a real
environment bug it introduced: the `GET /tasks` route used `TaskStatus |
None` syntax, which crashed the app on startup because this project's
virtualenv runs Python 3.9 and that syntax requires 3.10+ — I only found it
because I insisted on actually starting the server instead of trusting that
the code looked correct.
