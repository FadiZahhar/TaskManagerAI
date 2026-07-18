(function () {
  "use strict";

  const hub = window.LearningHub;
  const storage = window.LearningStorage;

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector("[data-module-id]");
    if (!page) {
      return;
    }
    const moduleId = page.dataset.moduleId;
    const module = hub.moduleById(moduleId);
    if (!module) {
      return;
    }
    storage.markModuleOpened(moduleId, `module-${moduleId}.html`);
    renderModule(page, module);
    setupCompletionControls(moduleId);
  });

  function renderModule(page, module) {
    setText(page, "[data-module-mission]", module.mission);
    setText(page, "[data-module-analogy]", module.analogy);
    setText(page, "[data-key-takeaway]", module.keyTakeaway);
    renderList(page, "[data-simple-overview]", module.simpleOverview);
    renderList(page, "[data-common-mistakes]", module.commonMistakes);
    renderReadingMap(page, module);
    renderActivity(page, module);
    renderQuickCheck(page, module);
  }

  function setText(root, selector, text) {
    const node = root.querySelector(selector);
    if (node) {
      node.textContent = text;
    }
  }

  function renderList(root, selector, items) {
    const list = root.querySelector(selector);
    if (!list) {
      return;
    }
    hub.clear(list);
    items.forEach((item) => list.append(hub.el("li", { text: item })));
  }

  function renderReadingMap(root, module) {
    const target = root.querySelector("[data-reading-map]");
    if (!target) {
      return;
    }
    hub.clear(target);
    Object.entries(module.readingGroups || {}).forEach(([groupName, items]) => {
      const group = hub.el("section", { className: "reading-group" });
      group.append(hub.el("h3", { text: groupName[0].toUpperCase() + groupName.slice(1) }));
      items.forEach((item) => group.append(hub.renderReadingItem(item)));
      target.append(group);
    });
  }

  function renderActivity(root, module) {
    const target = root.querySelector("[data-activity]");
    if (!target) {
      return;
    }
    hub.clear(target);
    target.append(hub.el("h3", { text: module.activity.title }));
    target.append(hub.el("p", { text: module.activity.instructions }));
    const type = module.activity.type;
    if (type === "prompt-builder") {
      target.append(renderPromptBuilder(module.id));
    } else {
      target.append(renderScenarioActivity(module.id, type));
    }
  }

  function renderPromptBuilder(moduleId) {
    const form = hub.el("form", { className: "form-grid" });
    const fields = [
      ["task", "Task", "What should the AI do?"],
      ["context", "Context", "Which project, files, or facts matter?"],
      ["constraints", "Constraints", "What must not change?"],
      ["output", "Output format", "What should the answer look like?"],
      ["missing", "Missing-information rule", "What should the AI do instead of guessing?"]
    ];
    const preview = hub.el("pre", {
      className: "prompt-preview",
      attrs: { "aria-live": "polite" }
    });

    fields.forEach(([id, label, placeholder]) => {
      const inputId = `prompt-${id}`;
      const textarea = hub.el("textarea", {
        id: inputId,
        attrs: { placeholder }
      });
      textarea.addEventListener("input", updatePreview);
      form.append(hub.el("label", { htmlFor: inputId }, [
        hub.el("span", { text: label }),
        textarea
      ]));
    });

    function updatePreview() {
      const values = fields.map(([id, label]) => {
        const input = document.getElementById(`prompt-${id}`);
        return `${label}: ${input ? input.value.trim() || "[add details]" : "[add details]"}`;
      });
      preview.textContent = values.join("\n");
    }

    const copy = hub.el("button", { type: "button", text: "Copy prompt" });
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(preview.textContent);
        storage.announce("Prompt copied.", "success");
      } catch (error) {
        storage.announce("Copy failed. Select and copy the preview manually.", "warning");
      }
    });

    const save = hub.el("button", { type: "button", className: "secondary", text: "Save as favorite" });
    save.addEventListener("click", () => {
      storage.savePrompt(preview.textContent);
      storage.setActivityComplete(moduleId, true);
    });

    const clear = hub.el("button", { type: "reset", className: "secondary", text: "Clear" });
    form.addEventListener("reset", () => {
      window.setTimeout(updatePreview, 0);
    });

    updatePreview();
    form.append(preview, hub.el("div", { className: "footer-actions" }, [copy, save, clear]));
    return form;
  }

  function renderScenarioActivity(moduleId, type) {
    const data = {
      "api-detective": {
        question: "A client sends a blank Task Tracker title. Which result is most appropriate?",
        choices: ["201 Created", "204 No Content", "422 validation error", "500 server error"],
        answer: 2,
        explanation: "A blank title violates request validation, so the API should reject it with 422."
      },
      "fetch-bug-hunt": {
        question: "The frontend calls fetch('/tasks/missing') and immediately reads JSON. What is missing?",
        choices: ["A response.ok or status check", "A CSS gradient", "A database migration", "A service worker"],
        answer: 0,
        explanation: "Fetch can resolve on HTTP errors. The code must check response.ok and show a clear error."
      },
      "diff-traffic-light": {
        question: "An agent changes Docker, tests, frontend styles, and adds authentication in one task. How should this be classified?",
        choices: ["Keep", "Needs review", "Reject as out of scope", "Publish immediately"],
        answer: 2,
        explanation: "The proposed change is too broad and includes unapproved product work."
      },
      "security-finding-sorter": {
        question: "A report says, 'Critical: add login now,' but authentication is documented out of scope. How should it be graded?",
        choices: ["Valid", "False positive", "Noise", "Already fixed"],
        answer: 1,
        explanation: "Authentication can matter, but this severity is misapplied to the stated project scope."
      }
    }[type];
    const wrapper = hub.el("div", { className: "activity" });
    const feedback = hub.el("div", { className: "feedback", attrs: { role: "status", "aria-live": "polite" } });
    wrapper.append(hub.el("p", { text: data.question }));
    const fieldset = hub.el("fieldset");
    fieldset.append(hub.el("legend", { text: "Choose the best answer" }));
    data.choices.forEach((choice, index) => {
      const id = `activity-${moduleId}-${index}`;
      fieldset.append(hub.el("label", { className: "choice", htmlFor: id }, [
        hub.el("input", { id, type: "radio", name: `activity-${moduleId}`, value: String(index) }),
        hub.el("span", { text: choice })
      ]));
    });
    const button = hub.el("button", { type: "button", text: "Check activity" });
    button.addEventListener("click", () => {
      const selected = wrapper.querySelector(`input[name="activity-${moduleId}"]:checked`);
      if (!selected) {
        feedback.className = "feedback warning";
        feedback.textContent = "Choose an answer first.";
        return;
      }
      const correct = Number(selected.value) === data.answer;
      feedback.className = correct ? "feedback success" : "feedback warning";
      feedback.textContent = `${correct ? "Correct." : "Not yet."} ${data.explanation}`;
      if (correct) {
        storage.setActivityComplete(moduleId, true);
      }
    });
    wrapper.append(fieldset, button, feedback);
    return wrapper;
  }

  function renderQuickCheck(root, module) {
    const target = root.querySelector("[data-quick-check]");
    if (!target) {
      return;
    }
    hub.clear(target);
    const questions = hub.getQuizzes(module.id).slice(0, 5);
    const results = new Map();
    let recordedAttempt = false;
    const status = hub.el("p", { className: "status-line", attrs: { "aria-live": "polite" } });

    function updateStatus() {
      const score = Array.from(results.values()).filter(Boolean).length;
      status.textContent = `${results.size} of ${questions.length} answered. Current score: ${score}/${questions.length}.`;
      if (results.size === questions.length) {
        storage.recordQuizScore(module.id, score, questions.length, !recordedAttempt);
        recordedAttempt = true;
      }
    }

    target.append(status);
    questions.forEach((question) => {
      target.append(hub.renderQuestion(question, {
        onResult: (answered, correct) => {
          results.set(answered.id, correct);
          updateStatus();
        }
      }));
    });
    updateStatus();
  }

  function setupCompletionControls(moduleId) {
    document.querySelectorAll("[data-reading-complete]").forEach((button) => {
      button.addEventListener("click", () => {
        storage.setReadingComplete(moduleId, true);
      });
    });
    document.querySelectorAll("[data-bookmark-page]").forEach((button) => {
      button.addEventListener("click", () => {
        const module = hub.moduleById(moduleId);
        storage.addBookmark({
          id: `module-${moduleId}`,
          type: "module",
          title: `Module ${moduleId}: ${module.title}`,
          url: `./module-${moduleId}.html`,
          addedAt: new Date().toISOString()
        });
      });
    });
    document.querySelectorAll("[data-reflection-save]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.querySelector("[data-reflection-input]");
        storage.setReflection(moduleId, input ? input.value : "");
      });
    });
  }
})();
