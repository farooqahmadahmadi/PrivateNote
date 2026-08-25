const STORAGE_KEY = "privatenotes.notes";

function normalizeNotes(notes) {
  if (!Array.isArray(notes)) {
    return [];
  }

  return notes
    .filter(
      (note) =>
        note &&
        typeof note.id === "string" &&
        typeof note.title === "string" &&
        typeof note.content === "string",
    )
    .map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt || Date.now(),
      updatedAt: note.updatedAt || Date.now(),
    }));
}

export function getNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return normalizeNotes(JSON.parse(stored));
  } catch (error) {
    console.error("Failed to load notes:", error);

    return [];
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeNotes(notes)));

    return true;
  } catch (error) {
    console.error("Failed to save notes:", error);

    return false;
  }
}

export function createNote(note) {
  const notes = getNotes();

  const now = Date.now();

  const newNote = {
    id: note.id,
    title: note.title || "Untitled Note",
    content: note.content || "",
    createdAt: note.createdAt || now,
    updatedAt: now,
  };

  const success = saveNotes([newNote, ...notes]);

  if (!success) {
    console.error("Failed to create note.");

    return null;
  }

  return newNote;
}

export function updateNote(noteId, changes) {
  const notes = getNotes();

  const updatedNotes = notes.map((note) =>
    note.id === noteId
      ? {
          ...note,
          ...changes,
          updatedAt: Date.now(),
        }
      : note,
  );

  saveNotes(updatedNotes);

  return updatedNotes.find((note) => note.id === noteId) || null;
}

export function deleteNote(noteId) {
  const notes = getNotes();

  const updatedNotes = notes.filter((note) => note.id !== noteId);

  saveNotes(updatedNotes);

  return updatedNotes;
}

export function clearNotes() {
  localStorage.removeItem(STORAGE_KEY);
}
