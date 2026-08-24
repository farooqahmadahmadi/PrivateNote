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

    const interval = setInterval(() => {
      loadNotes();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-transparent p-8 text-white">
      <div className="mx-auto w-full max-w-6xl">
        {publicNotes.length === 0 ? (
          <div className="flex min-h-[80vh] items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold">No Public Notes</h1>

              <p className="mt-3 text-slate-500">
                Public notes will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {publicNotes.map((note) => (
              <article
                key={note.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />

                  <span className="text-xs uppercase tracking-wider text-emerald-400">
                    Public Note
                  </span>
                </div>

                <h1 className="text-3xl font-bold sm:text-4xl">
                  {note.title || "Untitled Note"}
                </h1>

                <div className="mt-6 whitespace-pre-wrap text-lg leading-8 text-slate-300">
                  {note.content}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default PresentationView;
