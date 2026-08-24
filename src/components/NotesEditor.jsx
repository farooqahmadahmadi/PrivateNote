import { useEffect, useRef, useState } from "react";

import EmptyNotes from "./EmptyNotes.jsx";
import NoteToolbar from "./NoteToolbar.jsx";
import NotesSidebar from "./NotesSidebar.jsx";

import { useNotes } from "../hooks/useNotes.js";

function NotesEditor() {
  const {
    notes,
    activeNote,
    activeNoteId,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    toggleNotePrivacy,
  } = useNotes();

  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");

  const saveTimer = useRef(null);
  const previousNoteId = useRef(null);

  // ==================================================
  // Load selected note
  // ==================================================

  useEffect(() => {
    if (!activeNote) {
      return;
    }

    if (previousNoteId.current === activeNote.id) {
      return;
    }

    previousNoteId.current = activeNote.id;

    setDraftTitle(activeNote.title);
    setDraftContent(activeNote.content);
  }, [activeNote]);

  // ==================================================
  // Auto Save
  // ==================================================

  useEffect(() => {
    if (!activeNoteId) {
      return;
    }

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    saveTimer.current = setTimeout(() => {
      updateNote(activeNoteId, {
        title: draftTitle.trim() || "Untitled Note",
        content: draftContent,
      });
    }, 400);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, [draftTitle, draftContent, activeNoteId, updateNote]);

  // ==================================================
  // Create Note
  // ==================================================

  const handleCreate = () => {
    const note = createNote();

    if (!note) {
      return;
    }

    previousNoteId.current = note.id;

    setDraftTitle(note.title);
    setDraftContent(note.content);
  };

  // ==================================================
  // Save
  // ==================================================

  const handleSave = () => {
    if (!activeNoteId) {
      return;
    }

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    updateNote(activeNoteId, {
      title: draftTitle.trim() || "Untitled Note",
      content: draftContent,
    });
  };

  // ==================================================
  // Toggle Privacy
  // ==================================================

  const handleTogglePrivacy = () => {
    if (!activeNoteId) {
      return;
    }

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    toggleNotePrivacy(activeNoteId);
  };

  // ==================================================
  // Close Note
  // ==================================================

  const handleClose = () => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    if (activeNoteId) {
      updateNote(activeNoteId, {
        title: draftTitle.trim() || "Untitled Note",
        content: draftContent,
      });
    }

    previousNoteId.current = null;

    setDraftTitle("");
    setDraftContent("");

    selectNote(null);
  };

  // ==================================================
  // Delete Note
  // ==================================================

  const handleDelete = (noteId = activeNoteId, askConfirmation = true) => {
    if (!noteId) {
      return;
    }

    const noteToDelete = notes.find((note) => note.id === noteId);

    if (askConfirmation) {
      const confirmed = window.confirm(
        `Delete "${noteToDelete?.title || "Untitled Note"}"?`,
      );

      if (!confirmed) {
        return;
      }
    }

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    deleteNote(noteId);

    if (noteId === activeNoteId) {
      previousNoteId.current = null;

      setDraftTitle("");
      setDraftContent("");
    }
  };

  // ==================================================
  // Select Note
  // ==================================================

  const handleSelect = (noteId) => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    previousNoteId.current = null;

    selectNote(noteId);
  };

  // ==================================================
  // Electron Menu
  // ==================================================

  useEffect(() => {
    if (!window.electronAPI?.menu) {
      return;
    }

    const removeNewNoteListener =
      window.electronAPI.menu.onNewNote(handleCreate);

    const removeSaveNoteListener =
      window.electronAPI.menu.onSaveNote(handleSave);

    const removeDeleteNoteListener = window.electronAPI.menu.onDeleteNote(() =>
      handleDelete(activeNoteId, true),
    );

    return () => {
      removeNewNoteListener?.();
      removeSaveNoteListener?.();
      removeDeleteNoteListener?.();
    };
  }, [activeNoteId, draftTitle, draftContent, notes]);

  // ==================================================
  // UI
  // ==================================================

  return (
    <main className="flex h-screen w-full overflow-hidden bg-slate-950 text-white">
      <NotesSidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onSelect={handleSelect}
        onCreate={handleCreate}
        onDelete={(noteId) => handleDelete(noteId, false)}
      />

      <section className="flex min-w-0 flex-1 flex-col">
        {!activeNote ? (
          <EmptyNotes />
        ) : (
          <>
            <NoteToolbar
              note={activeNote}
              onTogglePrivacy={handleTogglePrivacy}
              onDelete={() => handleDelete(activeNoteId, true)}
              onClose={handleClose}
            />

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="border-b border-slate-800 px-5 py-4 sm:px-8">
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                  placeholder="Note title"
                  className="w-full bg-transparent text-xl font-semibold text-white outline-none placeholder:text-slate-700 sm:text-2xl"
                />
              </div>

              <textarea
                value={draftContent}
                onChange={(event) => setDraftContent(event.target.value)}
                placeholder="Start writing your private notes..."
                spellCheck
                className="min-h-0 flex-1 resize-none bg-transparent px-5 py-5 text-base leading-7 text-slate-200 outline-none placeholder:text-slate-700 sm:px-8 sm:py-7"
              />

              <div className="border-t border-slate-800 px-5 py-2 text-right sm:px-8">
                <span className="text-[11px] text-emerald-500">
                  Auto saved
                </span>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default NotesEditor;
