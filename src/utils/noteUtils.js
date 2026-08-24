export function createNoteId() {
  if (typeof crypto !== "undefined") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  }

  return `note-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createEmptyNote() {
  const now = Date.now();

  return {
    id: createNoteId(),
    title: "Untitled Note",
    content: "",
    createdAt: now,
    updatedAt: now,

    // New notes are private
    isPrivate: true,
  };
}

export function formatNoteDate(timestamp) {
  if (!timestamp) {
    return "";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
}

export function getNotePreview(content, length = 80) {
  const text = String(content || "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length)}...`;
}
