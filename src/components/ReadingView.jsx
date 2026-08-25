import { useEffect, useState } from "react";

import { electronAPI } from "../services/electron.js";
import { getNotes } from "../services/notesStorage.js";

function ReadingView({ note, onClose }) {
  const [currentNote, setCurrentNote] = useState(note);

  useEffect(() => {
    setCurrentNote(note);
  }, [note]);

  useEffect(() => {
    const removeCloseListener = electronAPI.reading.onClose(() => {
      onClose();
    });

    return () => {
      removeCloseListener?.();
    };
  }, [onClose]);

  if (!currentNote) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">No Note Selected</h1>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white dark:bg-blue-600"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full overflow-y-auto bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 sm:px-10 sm:py-16 lg:px-16">
        {/* Top */}

        <header className="mb-10 flex items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Reading Mode
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-600">
              PrivateNotes
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Close
          </button>
        </header>

        {/* Note */}

        <article>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            {currentNote.title || "Untitled Note"}
          </h1>

          <div className="mt-10 whitespace-pre-wrap text-lg leading-9 text-slate-700 dark:text-slate-300 sm:text-xl sm:leading-10 lg:text-2xl lg:leading-[2.1]">
            {currentNote.content || "Empty note"}
          </div>
        </article>
      </div>
    </main>
  );
}

export default ReadingView;
