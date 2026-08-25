import { useEffect, useState } from "react";

import NotesEditor from "./components/NotesEditor.jsx";

import { getAppMode, saveAppMode } from "./services/appModeStorage.js";

function App() {
  const [mode, setMode] = useState(() => getAppMode());
  const [theme, setTheme] = useState("light");

  // ==================================================
  // Mode
  // ==================================================

  useEffect(() => {
    const removeModeListener = window.electronAPI?.app?.onModeChanged(
      (newMode) => {
        const normalizedMode = newMode === "public" ? "public" : "private";

        saveAppMode(normalizedMode);
        setMode(normalizedMode);
      },
    );

    return () => {
      removeModeListener?.();
    };
  }, []);

  // ==================================================
  // Theme
  // ==================================================

  useEffect(() => {
    const removeThemeListener = window.electronAPI?.theme?.onChanged(
      (newTheme) => {
        const normalizedTheme = newTheme === "dark" ? "dark" : "light";

        setTheme(normalizedTheme);
      },
    );

    return () => {
      removeThemeListener?.();
    };
  }, []);

  // ==================================================
  // Apply Theme
  // ==================================================

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <main
      className={[
        "flex h-dvh w-full flex-col overflow-hidden",
        "bg-white text-slate-950",
        "dark:bg-slate-950 dark:text-white",
      ].join(" ")}
    >
      {/* ==================================================
          Header
      ================================================== */}

      <header
        className={[
          "shrink-0 border-b px-4 py-3 sm:px-6",
          "border-slate-200",
          "dark:border-slate-800",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold sm:text-xl">
              PrivateNotes
            </h1>

            <p className="mt-1 hidden text-xs text-slate-500 sm:block">
              Personal Notes & Reading
            </p>
          </div>

          {/* ==================================================
              Mode Status Light
          ================================================== */}

          <div
            className="flex shrink-0 items-center justify-center"
            title={mode === "private" ? "Private Mode" : "Public Mode"}
            aria-label={mode === "private" ? "Private Mode" : "Public Mode"}
          >
            <span
              className={[
                "relative flex h-3.5 w-3.5 items-center justify-center",
                "rounded-full",
                "animate-pulse",

                mode === "private"
                  ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                  : "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute inset-0 rounded-full opacity-40",
                  "animate-ping",

                  mode === "private" ? "bg-emerald-400" : "bg-blue-400",
                ].join(" ")}
              />

              <span
                className={[
                  "relative h-1.5 w-1.5 rounded-full",
                  mode === "private" ? "bg-emerald-100" : "bg-blue-100",
                ].join(" ")}
              />
            </span>
          </div>
        </div>
      </header>

      {/* ==================================================
          Notes
      ================================================== */}

      <section className="min-h-0 flex-1">
        <NotesEditor />
      </section>
    </main>
  );
}

export default App;