import { useCallback, useMemo, useState } from "react";

import {
  createNote as createStoredNote,
  deleteNote as deleteStoredNote,
  getNotes,
  updateNote as updateStoredNote,
} from "../services/notesStorage.js";

import { createEmptyNote } from "../utils/noteUtils.js";

export function useNotes() {
  const [notes, setNotes] = useState(() => getNotes());

  const [activeNoteId, setActiveNoteId] = useState(null);

  // ==================================================
  // Create
  // ==================================================

  const createNote = useCallback(() => {
    const note = createEmptyNote();

    const savedNote = createStoredNote(note);

    if (!savedNote) {
      return null;
    }

    setNotes((currentNotes) => [savedNote, ...currentNotes]);

    setActiveNoteId(savedNote.id);

    return savedNote;
  }, []);

  // ==================================================
  // Update
  // ==================================================

  const updateNote = useCallback((noteId, changes) => {
    const updatedNote = updateStoredNote(noteId, changes);

    if (!updatedNote) {
      return null;
    }

    setNotes((currentNotes) =>
      currentNotes.map((note) => (note.id === noteId ? updatedNote : note)),
    );

    return updatedNote;
  }, []);

  // ==================================================
  // Toggle Private / Public
  // ==================================================

  const setNotePrivacy = useCallback(
    (noteId, isPrivate) => {
      return updateNote(noteId, {
        isPrivate,
      });
    },
    [updateNote],
  );

  const toggleNotePrivacy = useCallback(
    (noteId) => {
      const currentNote = getNotes().find((note) => note.id === noteId);

      if (!currentNote) {
        return null;
      }

      return updateNote(noteId, {
        isPrivate: !currentNote.isPrivate,
      });
    },
    [updateNote],
  );

  // ==================================================
  // Delete
  // ==================================================

  const deleteNote = useCallback((noteId) => {
    deleteStoredNote(noteId);

    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    );

    setActiveNoteId((currentId) => (currentId === noteId ? null : currentId));
  }, []);

  // ==================================================
  // Select
  // ==================================================

  const selectNote = useCallback((noteId) => {
    setActiveNoteId(noteId);
  }, []);

  // ==================================================
  // Active Note
  // ==================================================

  const activeNote = useMemo(
    () => notes.find((note) => note.id === activeNoteId) || null,
    [notes, activeNoteId],
  );

  return {
    notes,
    activeNote,
    activeNoteId,

    createNote,
    updateNote,
    deleteNote,
    selectNote,

    setNotePrivacy,
    toggleNotePrivacy,
  };
}
