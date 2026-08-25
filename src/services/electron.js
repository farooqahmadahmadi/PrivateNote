export const electronAPI = {
  app: {
    getMode: () => window.electronAPI.app.getMode(),

    setMode: (mode) => window.electronAPI.app.setMode(mode),

    onModeChanged: (callback) => window.electronAPI.app.onModeChanged(callback),
  },

  reading: {
    open: () => window.electronAPI.reading.open(),

    close: () => window.electronAPI.reading.close(),

    onOpen: (callback) => window.electronAPI.reading.onOpen(callback),

    onClose: (callback) => window.electronAPI.reading.onClose(callback),
  },
};
