(function () {
  "use strict";

  const hub = window.LearningHub;
  const storage = window.LearningStorage;

  document.addEventListener("DOMContentLoaded", () => {
    renderProgress();
  });

  function renderProgress() {
    const target = document.querySelector("[data-progress-page]");
    if (!target) {
      return;
    }
    const state = storage.getState();
    hub.clear(target);
    target.append(renderSummary(state));
    target.append(renderModules(state));
    target.append(renderBookmarks(state));
    target.append(renderPrompts(state));
  }

  function renderSummary(state) {
    const totalTasks = 15;
    const completed = Object.values(state.progress).reduce((count, entry) => {
      return count
        + (entry.opened ? 1 : 0)
        + (entry.readingComplete ? 1 : 0)
        + (entry.activityComplete ? 1 : 0);
    }, 0);
    const percent = Math.round((completed / totalTasks) * 100);
    const card = hub.el("section", { className: "panel" });
    card.append(
      hub.el("h2", { text: "Progress summary" }),
      hub.el("p", { text: `Last visited page: ${state.lastVisited}` }),
      hub.el("div", { className: "progress-meter", attrs: { "aria-label": `${percent}% complete` } }, [
        hub.el("span", { attrs: { style: `width: ${percent}%` } })
      ]),
      hub.el("p", { text: `${percent}% of opened, reading, and activity checkpoints complete.` })
    );
    return card;
  }

  function renderModules(state) {
    const section = hub.el("section", { className: "section" });
    section.append(hub.el("h2", { text: "Module details" }));
    const grid = hub.el("div", { className: "grid two" });
    window.AI_LEARNING_HUB_CONTENT.modules.forEach((module) => {
      const progress = state.progress[String(module.id)];
      const reflectionId = `reflection-${module.id}`;
      const textarea = hub.el("textarea", {
        id: reflectionId,
        value: progress.reflection,
        attrs: { maxlength: "400" }
      });
      const save = hub.el("button", { type: "button", text: "Save reflection" });
      save.addEventListener("click", () => storage.setReflection(module.id, textarea.value));
      grid.append(hub.el("article", { className: "card" }, [
        hub.el("h3", { text: `Module ${module.id}: ${module.title}` }),
        hub.el("p", { text: `Opened: ${progress.opened ? "yes" : "not yet"}` }),
        hub.el("p", { text: `Reading complete: ${progress.readingComplete ? "yes" : "not yet"}` }),
        hub.el("p", { text: `Activity complete: ${progress.activityComplete ? "yes" : "not yet"}` }),
        hub.el("p", { text: `Best quiz score: ${progress.bestScore}/${progress.bestScoreTotal || 5}; attempts: ${progress.attempts}` }),
        hub.el("label", { htmlFor: reflectionId }, [
          hub.el("span", { text: "One-sentence reflection" }),
          textarea
        ]),
        save,
        hub.el("p", {}, [hub.el("a", { href: `./module-${module.id}.html`, text: "Return to module" })])
      ]));
    });
    section.append(grid);
    return section;
  }

  function renderBookmarks(state) {
    const section = hub.el("section", { className: "section" });
    section.append(hub.el("h2", { text: "Bookmarks" }));
    if (!state.bookmarks.length) {
      section.append(hub.el("p", { text: "No bookmarks yet." }));
      return section;
    }
    const list = hub.el("div", { className: "grid two" });
    state.bookmarks.forEach((bookmark) => {
      const remove = hub.el("button", { type: "button", className: "secondary", text: "Remove" });
      remove.addEventListener("click", () => {
        storage.removeBookmark(bookmark.id);
        renderProgress();
      });
      list.append(hub.el("article", { className: "card" }, [
        hub.el("h3", {}, [hub.el("a", { href: bookmark.url, text: bookmark.title })]),
        hub.el("p", { text: `Type: ${bookmark.type}` }),
        remove
      ]));
    });
    section.append(list);
    return section;
  }

  function renderPrompts(state) {
    const section = hub.el("section", { className: "section" });
    section.append(hub.el("h2", { text: "Saved prompt drafts" }));
    if (!state.savedPrompts.length) {
      section.append(hub.el("p", { text: "Saved prompts from Module 1 will appear here." }));
      return section;
    }
    state.savedPrompts.forEach((prompt) => {
      section.append(hub.el("article", { className: "card" }, [
        hub.el("p", { text: `Saved: ${prompt.addedAt}` }),
        hub.el("pre", { text: prompt.text })
      ]));
    });
    return section;
  }
})();
