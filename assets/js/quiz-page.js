(function () {
  "use strict";

  const hub = window.LearningHub;
  const storage = window.LearningStorage;

  document.addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector("[data-quiz-module]");
    const target = document.querySelector("[data-quiz-lab]");
    if (!select || !target) {
      return;
    }
    select.addEventListener("change", () => renderQuiz(select.value, target));
    renderQuiz(select.value || "1", target);
  });

  function renderQuiz(moduleId, target) {
    const module = hub.moduleById(moduleId);
    const questions = hub.getQuizzes(moduleId);
    const results = new Map();
    let recordedAttempt = false;
    hub.clear(target);
    target.append(hub.el("h2", { text: `Module ${moduleId}: ${module ? module.title : "Quiz"}` }));
    const status = hub.el("p", { className: "status-line", attrs: { "aria-live": "polite" } });
    const retry = hub.el("button", { type: "button", className: "secondary", text: "Retry this module" });
    retry.addEventListener("click", () => renderQuiz(moduleId, target));
    target.append(status, retry);

    function updateStatus() {
      const score = Array.from(results.values()).filter(Boolean).length;
      status.textContent = `${results.size} of ${questions.length} answered. Score: ${score}/${questions.length}.`;
      if (results.size === questions.length) {
        storage.recordQuizScore(moduleId, score, questions.length, !recordedAttempt);
        recordedAttempt = true;
      }
    }

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
})();
