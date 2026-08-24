import { useCallback, useState } from "react";

import { electronAPI } from "../services/electron.js";

export function useDisplayAssignment() {
  const [notesDisplayId, setNotesDisplayId] = useState(null);

  const [presentationDisplayId, setPresentationDisplayId] = useState(null);

  const assignNotesDisplay = useCallback(async (displayId) => {
    setNotesDisplayId(displayId);

    setPresentationDisplayId((currentId) =>
      currentId === displayId ? null : currentId,
    );

    const isOpen = await electronAPI.notes.isOpen();

    if (isOpen) {
      await electronAPI.notes.moveToDisplay(displayId);
    }
  }, []);

  const assignPresentationDisplay = useCallback(async (displayId) => {
    setPresentationDisplayId(displayId);

    setNotesDisplayId((currentId) =>
      currentId === displayId ? null : currentId,
    );

    const isOpen = await electronAPI.presentation.isOpen();

    if (isOpen) {
      await electronAPI.presentation.moveToDisplay(displayId);
    }
  }, []);

  const clearAssignment = useCallback((displayId) => {
    setNotesDisplayId((currentId) =>
      currentId === displayId ? null : currentId,
    );

    setPresentationDisplayId((currentId) =>
      currentId === displayId ? null : currentId,
    );
  }, []);

  const getDisplayRole = useCallback(
    (displayId) => {
      if (displayId === notesDisplayId) {
        return "notes";
      }

      if (displayId === presentationDisplayId) {
        return "presentation";
      }

      return null;
    },
    [notesDisplayId, presentationDisplayId],
  );

  return {
    notesDisplayId,
    presentationDisplayId,

    assignNotesDisplay,
    assignPresentationDisplay,
    clearAssignment,

    getDisplayRole,
  };
}
