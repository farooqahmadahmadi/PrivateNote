import { useEffect, useState } from "react";

import { getNotes } from "../services/notesStorage.js";

function PresentationView() {
  const [publicNotes, setPublicNotes] = useState([]);

  const loadNotes = () => {
    const notes = getNotes();

    setPublicNotes(notes.filter((note) => note.isPrivate === false));
  };

  useEffect(() => {
    loadNotes();

    const interval = setInterval(loadNotes, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-slate-950 text-white">
      {publicNotes.length === 0 ? (
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl">
              📝
            </div>

            <h1 className="mt-5 text-3xl font-bold">No Public Notes</h1>

            <p className="mt-3 text-sm text-slate-500">
              Public notes will appear here during the presentation.
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-6xl px-8 py-10">
          <header className="mb-10 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
                Public Notes
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Presentation Notes
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {publicNotes.length}{" "}
              {publicNotes.length === 1 ? "public note" : "public notes"}
            </p>
          </header>

          <div className="space-y-10">
            {publicNotes.map((note) => (
              <article
                key={note.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8"
              >
                <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                  {note.title || "Untitled Note"}
                </h2>

                {note.content ? (
                  <div className="mt-6 whitespace-pre-wrap text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
                    {note.content}
                  </div>
                ) : (
                  <p className="mt-6 text-sm text-slate-600">Empty note</p>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default PresentationView;
