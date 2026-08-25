import { useMemo, useState } from "react";

import NoteItem from "./NoteItem.jsx";

function NotesSidebar({ notes, activeNoteId, onSelect, onCreate, onDelete }) {
  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return notes;
    }

    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    });
  }, [notes, search]);

  return (
    <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      {/* Header */}

      <div className="shrink-0 border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Notes
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </p>
          </div>

          <button
            type="button"
            onClick={onCreate}
            className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.98] dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            + New
          </button>
        </div>

        {/* Search */}

        <div className="mt-4">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Notes */}

      <div
        className="notes-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto p-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {filteredNotes.length === 0 ? (
          <div className="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-600">
            {search ? "No matching notes." : "No notes yet."}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              active={note.id === activeNoteId}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      {/* Hide scrollbar */}

      <style>
        {`
          .notes-scrollbar::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }
        `}
      </style>
    </aside>
  );
}

export default NotesSidebar;
