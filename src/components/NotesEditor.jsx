import { useEffect, useRef, useState } from "react";

import EmptyNotes from "./EmptyNotes.jsx";
import NoteToolbar from "./NoteToolbar.jsx";
import NotesSidebar from "./NotesSidebar.jsx";
import ReadingView from "./ReadingView.jsx";

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
  } = useNotes();

  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [readingMode, setReadingMode] = useState(false);
  const [readingNote, setReadingNote] = useState(null);

  const saveTimer = useRef(null);
  const previousNoteId = useRef(null);

  // ==================================================
  // Responsive Sidebar
  // ==================================================

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 760px)");

    const handleChange = (event) => {
      setSidebarOpen(!event.matches);
    };

    setSidebarOpen(!mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // ==================================================
  // Load Selected Note
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

    if (window.innerWidth <= 760) {
      setSidebarOpen(false);
    }
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
  // Create
  // ==================================================

  const handleCreate = () => {
    const note = createNote();

    if (!note) {
      return;
    }

    previousNoteId.current = note.id;

    setDraftTitle(note.title);
    setDraftContent(note.content);

    setReadingMode(false);
    setReadingNote(null);

    if (window.innerWidth > 760) {
      setSidebarOpen(true);
    }
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
  // Reading Mode
  // ==================================================

  const handleOpenReading = () => {
    if (!activeNoteId) {
      return;
    }

    handleSave();

    const latestNote =
      notes.find((note) => note.id === activeNoteId) || activeNote;

    const updatedReadingNote = {
      ...latestNote,
      title: draftTitle.trim() || "Untitled Note",
      content: draftContent,
    };

    setReadingNote(updatedReadingNote);
    setReadingMode(true);
  };

  const handleCloseReading = () => {
    setReadingMode(false);
    setReadingNote(null);
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

    setReadingMode(false);
    setReadingNote(null);

    selectNote(null);
  };

  // ==================================================
  // Delete
  // ==================================================

  const handleDelete = (noteId = activeNoteId, askConfirmation = true) => {
    if (!noteId) {
      return;
    }

    const noteToDelete = notes.find((note) => note.id === noteId);

    // Confirmation for every delete action.
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

      setReadingMode(false);
      setReadingNote(null);
    }
  };

  // ==================================================
  // Select
  // ==================================================

  const handleSelect = (noteId) => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    previousNoteId.current = null;

    setReadingMode(false);
    setReadingNote(null);

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
  // Reading Menu
  // ==================================================

  useEffect(() => {
    if (!window.electronAPI?.reading) {
      return;
    }

    const removeOpen = window.electronAPI.reading.onOpen(handleOpenReading);

    const removeClose = window.electronAPI.reading.onClose(handleCloseReading);

    return () => {
      removeOpen?.();
      removeClose?.();
    };
  }, [activeNoteId, draftTitle, draftContent, notes]);

  // ==================================================
  // Reading UI
  // ==================================================

  if (readingMode) {
    return <ReadingView note={readingNote} onClose={handleCloseReading} />;
  }

  // ==================================================
  // UI
  // ==================================================

  return (
    <main className="flex h-full w-full min-w-0 overflow-hidden bg-slate-950 text-white">
      {/* ==================================================
          Sidebar
      ================================================== */}

      <aside
        className={[
          "h-full min-h-0 shrink-0 overflow-hidden",
          "transition-[width] duration-200 ease-in-out",

          sidebarOpen ? "w-80" : "w-0",

          "max-[760px]:absolute",
          "max-[760px]:inset-y-0",
          "max-[760px]:left-0",
          "max-[760px]:z-30",
          "max-[760px]:w-full",

          !sidebarOpen
            ? "max-[760px]:-translate-x-full"
            : "max-[760px]:translate-x-0",

          "max-[760px]:transition-transform",
        ].join(" ")}
      >
        <div className="h-full w-full min-w-0">
          <NotesSidebar
            notes={notes}
            activeNoteId={activeNoteId}
            onSelect={handleSelect}
            onCreate={handleCreate}
            onDelete={(noteId) => handleDelete(noteId, true)}
          />
        </div>
      </aside>

      {/* ==================================================
          Editor
      ================================================== */}

      <section className="relative flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {!activeNote ? (
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="absolute left-3 top-3 z-20">
              <button
                type="button"
                onClick={() => setSidebarOpen((current) => !current)}
                className="rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-2 text-xs font-medium text-slate-400 shadow-lg transition hover:bg-slate-800 hover:text-white"
              >
                {sidebarOpen ? "← Notes" : "☰ Notes"}
              </button>
            </div>

            <div className="min-h-0 min-w-0 flex-1">
              <EmptyNotes />
            </div>
          </div>
        ) : (
          <>
            {/* ==================================================
                Toolbar
            ================================================== */}

            <div className="min-w-0 shrink-0">
              <NoteToolbar
                note={activeNote}
                onReadingMode={handleOpenReading}
                onDelete={() => handleDelete(activeNoteId, true)}
                onClose={handleClose}
                onToggleSidebar={() => setSidebarOpen((current) => !current)}
                sidebarOpen={sidebarOpen}
              />
            </div>

            {/* ==================================================
                Editor Content
            ================================================== */}

            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              {/* Title */}

              <div className="min-w-0 shrink-0 border-b border-slate-800 px-4 py-3 sm:px-8 sm:py-4">
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                  placeholder="Note title"
                  className="block w-full min-w-0 bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-700 sm:text-2xl"
                />
              </div>

              {/* Content */}

              <textarea
                value={draftContent}
                onChange={(event) => setDraftContent(event.target.value)}
                placeholder="Start writing..."
                spellCheck
                className="block min-h-0 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-4 py-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-700 sm:px-8 sm:py-7 sm:text-base sm:leading-7"
              />

              {/* Status */}

              <div className="min-w-0 shrink-0 border-t border-slate-800 px-4 py-2 text-right sm:px-8">
                <span className="text-[11px] text-emerald-500">Auto saved</span>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default NotesEditor;
