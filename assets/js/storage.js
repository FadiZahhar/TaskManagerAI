(function () {
  "use strict";

  const KEY = "aiLearningHub.v1";
  const MODULE_IDS = ["1", "2", "3", "4", "5"];
  const THEMES = new Set(["system", "light", "dark"]);

  function emptyProgress() {
    return MODULE_IDS.reduce((progress, id) => {
      progress[id] = {
        opened: false,
        readingComplete: false,
        activityComplete: false,
        bestScore: 0,
        bestScoreTotal: 0,
        attempts: 0,
        reflection: ""
      };
      return progress;
    }, {});
  }

  function defaultState() {
    return {
      version: 1,
      theme: "system",
      lastVisited: "module-1.html",
      progress: emptyProgress(),
      bookmarks: [],
      savedPrompts: []
    };
  }

  function storageAvailable() {
    try {
      const testKey = `${KEY}.test`;
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  function normalizeProgress(progress) {
    const base = emptyProgress();
    if (!progress || typeof progress !== "object") {
      return base;
    }
    MODULE_IDS.forEach((id) => {
      const entry = progress[id];
      if (!entry || typeof entry !== "object") {
        return;
      }
      base[id] = {
        opened: Boolean(entry.opened),
        readingComplete: Boolean(entry.readingComplete),
        activityComplete: Boolean(entry.activityComplete),
        bestScore: Number.isFinite(Number(entry.bestScore)) ? Number(entry.bestScore) : 0,
        bestScoreTotal: Number.isFinite(Number(entry.bestScoreTotal)) ? Number(entry.bestScoreTotal) : 0,
        attempts: Number.isFinite(Number(entry.attempts)) ? Number(entry.attempts) : 0,
        reflection: typeof entry.reflection === "string" ? entry.reflection.slice(0, 400) : ""
      };
    });
    return base;
  }

  function normalizeBookmark(item) {
    if (!item || typeof item !== "object") {
      return null;
    }
    const title = typeof item.title === "string" ? item.title.slice(0, 120) : "";
    const url = typeof item.url === "string" ? item.url.slice(0, 240) : "";
    const type = typeof item.type === "string" ? item.type.slice(0, 40) : "page";
    if (!title || !url || /^(javascript|data):/i.test(url)) {
      return null;
    }
    return {
      id: typeof item.id === "string" ? item.id.slice(0, 80) : `${type}:${url}`,
      title,
      url,
      type,
      addedAt: typeof item.addedAt === "string" ? item.addedAt : new Date().toISOString()
    };
  }

  function normalizePrompt(item) {
    if (!item || typeof item !== "object" || typeof item.text !== "string") {
      return null;
    }
    const text = item.text.trim().slice(0, 2000);
    if (!text) {
      return null;
    }
    return {
      id: typeof item.id === "string" ? item.id.slice(0, 80) : `prompt:${Date.now()}`,
      text,
      addedAt: typeof item.addedAt === "string" ? item.addedAt : new Date().toISOString()
    };
  }

  function normalizeState(candidate) {
    const base = defaultState();
    if (!candidate || typeof candidate !== "object") {
      return base;
    }
    const theme = typeof candidate.theme === "string" && THEMES.has(candidate.theme)
      ? candidate.theme
      : "system";
    const lastVisited = typeof candidate.lastVisited === "string"
      && /^[a-z0-9.-]+\.html$/i.test(candidate.lastVisited)
      ? candidate.lastVisited
      : base.lastVisited;
    return {
      version: 1,
      theme,
      lastVisited,
      progress: normalizeProgress(candidate.progress),
      bookmarks: Array.isArray(candidate.bookmarks)
        ? candidate.bookmarks.map(normalizeBookmark).filter(Boolean).slice(0, 80)
        : [],
      savedPrompts: Array.isArray(candidate.savedPrompts)
        ? candidate.savedPrompts.map(normalizePrompt).filter(Boolean).slice(0, 20)
        : []
    };
  }

  function getState() {
    if (!storageAvailable()) {
      return defaultState();
    }
    try {
      const raw = window.localStorage.getItem(KEY);
      return normalizeState(raw ? JSON.parse(raw) : null);
    } catch (error) {
      return defaultState();
    }
  }

  function saveState(state) {
    if (!storageAvailable()) {
      return { ok: false, message: "Local progress storage is unavailable in this browser." };
    }
    try {
      window.localStorage.setItem(KEY, JSON.stringify(normalizeState(state)));
      return { ok: true, message: "Progress saved in this browser." };
    } catch (error) {
      return { ok: false, message: "Progress could not be saved. Export your work before closing the page." };
    }
  }

  function update(mutator) {
    const state = getState();
    const result = mutator(state) || state;
    const outcome = saveState(result);
    announce(outcome.message, outcome.ok ? "success" : "warning");
    return { state: normalizeState(result), outcome };
  }

  function announce(message, tone) {
    const region = document.querySelector("[data-storage-status]");
    if (!region) {
      return;
    }
    region.textContent = message;
    region.className = `feedback ${tone || "success"}`;
  }

  function setTheme(theme) {
    return update((state) => {
      state.theme = THEMES.has(theme) ? theme : "system";
      return state;
    });
  }

  function markModuleOpened(moduleId, page) {
    return update((state) => {
      const id = String(moduleId);
      if (state.progress[id]) {
        state.progress[id].opened = true;
      }
      if (page) {
        state.lastVisited = page;
      }
      return state;
    });
  }

  function setReadingComplete(moduleId, value) {
    return update((state) => {
      const id = String(moduleId);
      if (state.progress[id]) {
        state.progress[id].readingComplete = Boolean(value);
      }
      return state;
    });
  }

  function setActivityComplete(moduleId, value) {
    return update((state) => {
      const id = String(moduleId);
      if (state.progress[id]) {
        state.progress[id].activityComplete = Boolean(value);
      }
      return state;
    });
  }

  function recordQuizScore(moduleId, score, total, countAttempt) {
    return update((state) => {
      const id = String(moduleId);
      if (state.progress[id]) {
        if (countAttempt) {
          state.progress[id].attempts += 1;
        }
        if (score >= state.progress[id].bestScore) {
          state.progress[id].bestScore = score;
          state.progress[id].bestScoreTotal = total;
        }
      }
      return state;
    });
  }

  function setReflection(moduleId, reflection) {
    return update((state) => {
      const id = String(moduleId);
      if (state.progress[id]) {
        state.progress[id].reflection = String(reflection || "").slice(0, 400);
      }
      return state;
    });
  }

  function addBookmark(item) {
    return update((state) => {
      const bookmark = normalizeBookmark(item);
      if (!bookmark) {
        return state;
      }
      state.bookmarks = state.bookmarks.filter((existing) => existing.id !== bookmark.id);
      state.bookmarks.unshift(bookmark);
      return state;
    });
  }

  function removeBookmark(id) {
    return update((state) => {
      state.bookmarks = state.bookmarks.filter((item) => item.id !== id);
      return state;
    });
  }

  function savePrompt(text) {
    return update((state) => {
      const prompt = normalizePrompt({
        id: `prompt:${Date.now()}`,
        text,
        addedAt: new Date().toISOString()
      });
      if (prompt) {
        state.savedPrompts.unshift(prompt);
      }
      return state;
    });
  }

  function reset() {
    const state = defaultState();
    const outcome = saveState(state);
    announce(outcome.ok ? "Progress reset." : outcome.message, outcome.ok ? "success" : "warning");
    return { state, outcome };
  }

  function exportJson() {
    return JSON.stringify(getState(), null, 2);
  }

  function importJson(raw) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      return { ok: false, message: "Import failed. The file is not valid JSON." };
    }
    const normalized = normalizeState(parsed);
    const outcome = saveState(normalized);
    return outcome.ok
      ? { ok: true, message: "Progress imported.", state: normalized }
      : outcome;
  }

  window.LearningStorage = {
    KEY,
    MODULE_IDS,
    getState,
    saveState,
    update,
    setTheme,
    markModuleOpened,
    setReadingComplete,
    setActivityComplete,
    recordQuizScore,
    setReflection,
    addBookmark,
    removeBookmark,
    savePrompt,
    reset,
    exportJson,
    importJson,
    announce
  };
})();
