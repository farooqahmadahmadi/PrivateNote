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
    <aside className="flex h-full w-full flex-col border-r border-slate-800 bg-slate-950">
      {/* Header */}
      <div className="shrink-0 border-b border-slate-800 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-white">Notes</h2>

            <p className="mt-1 text-xs text-slate-500">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </p>
          </div>

          <button
            type="button"
            onClick={onCreate}
            className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.98]"
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
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
        {filteredNotes.length === 0 ? (
          <div className="px-3 py-10 text-center text-sm text-slate-600">
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
    </aside>
  );
}

export default NotesSidebar;