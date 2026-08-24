export const electronAPI = {
  displays: {
    getAll: () => window.electronAPI.displays.getAll(),

    getPrimary: () => window.electronAPI.displays.getPrimary(),

    getBounds: (displayId) => window.electronAPI.displays.getBounds(displayId),
  },

  notes: {
    open: (displayId) => window.electronAPI.notes.open(displayId),

    close: () => window.electronAPI.notes.close(),

    isOpen: () => window.electronAPI.notes.isOpen(),

    moveToDisplay: (displayId) =>
      window.electronAPI.notes.moveToDisplay(displayId),
  },

  presentation: {
    open: (displayId) => window.electronAPI.presentation.open(displayId),

    close: () => window.electronAPI.presentation.close(),

    isOpen: () => window.electronAPI.presentation.isOpen(),

    moveToDisplay: (displayId) =>
      window.electronAPI.presentation.moveToDisplay(displayId),
  },
};
  