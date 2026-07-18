(function () {
  "use strict";

  const content = window.AI_LEARNING_HUB_CONTENT;
  const quizzes = window.AI_LEARNING_HUB_QUIZZES;
  const storage = window.LearningStorage;

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function clear(node) {
    if (node) {
      node.replaceChildren();
    }
  }

  function el(tag, options, children) {
    const node = document.createElement(tag);
    const config = options || {};
    if (config.className) {
      node.className = config.className;
    }
    if (config.text !== undefined) {
      node.textContent = config.text;
    }
    if (config.htmlFor) {
      node.htmlFor = config.htmlFor;
    }
    if (config.type) {
      node.type = config.type;
    }
    if (config.value !== undefined) {
      node.value = config.value;
    }
    if (config.href) {
      node.href = config.href;
    }
    if (config.target) {
      node.target = config.target;
    }
    if (config.rel) {
      node.rel = config.rel;
    }
    if (config.name) {
      node.name = config.name;
    }
    if (config.id) {
      node.id = config.id;
    }
    if (config.ariaLabel) {
      node.setAttribute("aria-label", config.ariaLabel);
    }
    if (config.attrs) {
      Object.entries(config.attrs).forEach(([key, value]) => {
        node.setAttribute(key, value);
      });
    }
    if (config.dataset) {
      Object.entries(config.dataset).forEach(([key, value]) => {
        node.dataset[key] = value;
      });
    }
    (children || []).forEach((child) => {
      if (child === null || child === undefined) {
        return;
      }
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    });
    return node;
  }

  function pageName() {
    const name = window.location.pathname.split("/").filter(Boolean).pop();
    return name || "index.html";
  }

  function moduleById(moduleId) {
    return content.modules.find((module) => String(module.id) === String(moduleId));
  }

  function getQuizzes(moduleId) {
    return (quizzes.modules && quizzes.modules[String(moduleId)]) || [];
  }

  function readingUrl(item) {
    if (item.url) {
      return item.url;
    }
    if (Array.isArray(item.links) && item.links.length && item.links[0][1]) {
      return item.links[0][1];
    }
    return "";
  }

  function renderExternalLink(title, url) {
    return el("a", {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      text: title
    });
  }

  function renderReadingItem(item) {
    const card = el("article", { className: "reading-card" });
    const heading = el("h3", {});
    if (item.url) {
      heading.append(renderExternalLink(item.title, item.url));
    } else {
      heading.textContent = item.title;
    }
    card.append(heading);
    if (item.use) {
      card.append(el("p", { text: item.use }));
    }
    if (Array.isArray(item.links)) {
      const list = el("ul", { className: "content-list" });
      item.links.forEach((link) => {
        list.append(el("li", {}, [renderExternalLink(link[0], link[1])]));
      });
      card.append(list);
    }
    return card;
  }

  function setupTheme() {
    const state = storage.getState();
    applyTheme(state.theme);
    $all("[data-theme-select]").forEach((select) => {
      select.value = state.theme;
      select.addEventListener("change", () => {
        applyTheme(select.value);
        storage.setTheme(select.value);
      });
    });
  }

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function setupNavigation() {
    const current = pageName();
    $all(".site-nav a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const target = href.replace("./", "");
      if (target === current || (current === "index.html" && target === "")) {
        link.setAttribute("aria-current", "page");
      }
    });

    const toggle = $("[data-menu-toggle]");
    const nav = $("#site-navigation");
    if (!toggle || !nav) {
      return;
    }
    function closeMenu(returnFocus) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      if (returnFocus) {
        toggle.focus();
      }
    }
    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMenu(true);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu(true);
      }
    });
  }

  function setupFooterActions() {
    const resetButtons = $all("[data-action='reset-progress']");
    resetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (window.confirm("Reset local learning progress in this browser?")) {
          storage.reset();
          window.location.reload();
        }
      });
    });

    $all("[data-action='export-progress']").forEach((button) => {
      button.addEventListener("click", () => {
        const blob = new Blob([storage.exportJson()], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = el("a", {
          href: url,
          attrs: { download: "ai-learning-hub-progress.json" }
        });
        document.body.append(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        storage.announce("Progress exported as JSON.", "success");
      });
    });

    $all("[data-import-progress]").forEach((input) => {
      input.addEventListener("change", () => {
        const file = input.files && input.files[0];
        if (!file) {
          return;
        }
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const result = storage.importJson(String(reader.result || ""));
          storage.announce(result.message, result.ok ? "success" : "error");
          if (result.ok) {
            window.setTimeout(() => window.location.reload(), 500);
          }
        });
        reader.addEventListener("error", () => {
          storage.announce("Import failed. The file could not be read.", "error");
        });
        reader.readAsText(file);
      });
    });
  }

  function renderJourney() {
    const list = $("[data-journey-map]");
    if (!list || !content.site) {
      return;
    }
    clear(list);
    content.site.journey.forEach((item) => {
      list.append(el("li", {}, [
        el("strong", { text: `Module ${item.module}: ${item.verb}` }),
        el("p", { text: item.summary }),
        el("a", { href: `./module-${item.module}.html`, text: "Open module" })
      ]));
    });
  }

  function renderHomeProgress() {
    const summary = $("[data-progress-summary]");
    const continueLink = $("[data-continue-link]");
    if (!summary) {
      return;
    }
    const state = storage.getState();
    const values = Object.values(state.progress);
    const completed = values.filter((entry) => entry.readingComplete && entry.activityComplete).length;
    const opened = values.filter((entry) => entry.opened).length;
    summary.textContent = `${opened} of 5 modules opened. ${completed} of 5 modules have reading and activity marked complete.`;
    if (continueLink) {
      continueLink.href = `./${state.lastVisited || "module-1.html"}`;
    }
  }

  function renderGlossary() {
    const list = $("[data-glossary-list]");
    if (!list || !Array.isArray(content.glossary)) {
      return;
    }
    clear(list);
    content.glossary.forEach((item) => {
      list.append(el("article", { className: "card" }, [
        el("h2", { text: item.term }),
        el("p", { text: item.definition })
      ]));
    });
  }

  function renderSources() {
    const target = $("[data-sources-list]");
    if (!target) {
      return;
    }
    clear(target);
    content.modules.forEach((module) => {
      const section = el("section", { className: "panel" });
      section.append(el("h2", { text: `Module ${module.id}: ${module.title}` }));
      Object.entries(module.readingGroups || {}).forEach(([groupName, items]) => {
        const group = el("div", { className: "reading-group" });
        group.append(el("h3", { text: groupName[0].toUpperCase() + groupName.slice(1) }));
        items.forEach((item) => group.append(renderReadingItem(item)));
        section.append(group);
      });
      target.append(section);
    });
  }

  function renderQuestion(question, options) {
    const config = options || {};
    const wrapper = el("form", { className: "quiz-question" });
    const feedback = el("div", {
      className: "feedback",
      attrs: { role: "status", "aria-live": "polite" }
    });

    wrapper.append(el("h3", { text: question.prompt }));
    if (question.hint) {
      wrapper.append(el("details", {}, [
        el("summary", { text: "Hint" }),
        el("p", { text: question.hint })
      ]));
    }

    if (question.type === "ordering") {
      renderOrderingQuestion(wrapper, question, feedback, config);
    } else {
      renderSingleQuestion(wrapper, question, feedback, config);
    }
    wrapper.append(feedback);
    return wrapper;
  }

  function renderSingleQuestion(wrapper, question, feedback, config) {
    const fieldset = el("fieldset");
    fieldset.append(el("legend", { text: "Choose one answer" }));
    question.choices.forEach((choice, index) => {
      const id = `${question.id}-${index}`;
      const radio = el("input", {
        id,
        type: "radio",
        name: question.id,
        value: String(index)
      });
      fieldset.append(el("label", { className: "choice", htmlFor: id }, [
        radio,
        el("span", { text: choice })
      ]));
    });
    wrapper.append(fieldset);
    wrapper.append(el("button", { type: "submit", text: "Check answer" }));
    wrapper.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = wrapper.querySelector(`input[name="${question.id}"]:checked`);
      if (!selected) {
        feedback.className = "feedback warning";
        feedback.textContent = "Choose an answer before checking.";
        return;
      }
      const correct = Number(selected.value) === Number(question.answer);
      showQuestionResult(feedback, correct, question.explanation);
      if (typeof config.onResult === "function") {
        config.onResult(question, correct);
      }
    });
  }

  function renderOrderingQuestion(wrapper, question, feedback, config) {
    let items = question.items.slice();
    const list = el("div", { attrs: { role: "list", "aria-label": "Ordering choices" } });

    function draw() {
      clear(list);
      items.forEach((item, index) => {
        const up = el("button", { type: "button", className: "secondary", text: "Move up" });
        const down = el("button", { type: "button", className: "secondary", text: "Move down" });
        up.disabled = index === 0;
        down.disabled = index === items.length - 1;
        up.addEventListener("click", () => {
          [items[index - 1], items[index]] = [items[index], items[index - 1]];
          draw();
        });
        down.addEventListener("click", () => {
          [items[index + 1], items[index]] = [items[index], items[index + 1]];
          draw();
        });
        list.append(el("div", { className: "ordering-item", attrs: { role: "listitem" } }, [
          el("span", { text: `${index + 1}. ${item}` }),
          el("span", { className: "ordering-actions" }, [up, down])
        ]));
      });
    }

    draw();
    wrapper.append(list);
    wrapper.append(el("button", { type: "submit", text: "Check order" }));
    wrapper.addEventListener("submit", (event) => {
      event.preventDefault();
      const correct = JSON.stringify(items) === JSON.stringify(question.answer);
      showQuestionResult(feedback, correct, question.explanation);
      if (typeof config.onResult === "function") {
        config.onResult(question, correct);
      }
    });
  }

  function showQuestionResult(feedback, correct, explanation) {
    feedback.className = correct ? "feedback success" : "feedback warning";
    feedback.textContent = `${correct ? "Correct." : "Not yet."} ${explanation}`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupTheme();
    setupNavigation();
    setupFooterActions();
    renderJourney();
    renderHomeProgress();
    renderGlossary();
    renderSources();
  });

  window.LearningHub = {
    $,
    $all,
    clear,
    el,
    pageName,
    moduleById,
    getQuizzes,
    readingUrl,
    renderReadingItem,
    renderQuestion,
    renderExternalLink
  };
})();
