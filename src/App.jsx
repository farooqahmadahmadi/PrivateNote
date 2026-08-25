import { useEffect, useState } from "react";

import NotesEditor from "./components/NotesEditor.jsx";

import { getAppMode, saveAppMode } from "./services/appModeStorage.js";

function App() {
  const [mode, setMode] = useState(() => getAppMode());

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

  const handleModeChange = (newMode) => {
    const normalizedMode = newMode === "public" ? "public" : "private";

    saveAppMode(normalizedMode);

    setMode(normalizedMode);

    window.electronAPI?.app?.setMode(normalizedMode);
  };

  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-slate-950 text-white">
      {/* ==================================================
          Header
      ================================================== */}

      <header className="shrink-0 border-b border-slate-800 px-4 py-3 sm:px-6">
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

          {/* Mode */}

          <div className="flex shrink-0 items-center gap-2">
            <span
              className={[
                "hidden rounded-md border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider sm:inline-block",

                mode === "private"
                  ? "border-amber-500/20 bg-amber-500/5 text-amber-400"
                  : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
              ].join(" ")}
            >
              {mode === "private" ? "Private Mode" : "Public Mode"}
            </span>

            <button
              type="button"
              onClick={() =>
                handleModeChange(mode === "private" ? "public" : "private")
              }
              className={[
                "rounded-lg border px-3 py-2 text-xs font-medium transition",

                mode === "private"
                  ? "border-amber-500/20 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10"
                  : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10",
              ].join(" ")}
            >
              {mode === "private" ? "Private" : "Public"}
            </button>
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
