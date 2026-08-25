const STORAGE_KEY = "privatenotes.app.mode";

const DEFAULT_MODE = "private";

function normalizeMode(mode) {
  return mode === "public" ? "public" : "private";
}

export function getAppMode() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return normalizeMode(stored);
  } catch (error) {
    console.error("Failed to load application mode:", error);

    return DEFAULT_MODE;
  }
}

export function saveAppMode(mode) {
  const normalizedMode = normalizeMode(mode);

  try {
    localStorage.setItem(STORAGE_KEY, normalizedMode);

    return normalizedMode;
  } catch (error) {
    console.error("Failed to save application mode:", error);

    return DEFAULT_MODE;
  }
}
