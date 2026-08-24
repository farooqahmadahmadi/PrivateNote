const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // ==================================================
  // Displays
  // ==================================================

  displays: {
    getAll: () => ipcRenderer.invoke("displays:get"),

    getPrimary: () => ipcRenderer.invoke("displays:get-primary"),

    getBounds: (displayId) =>
      ipcRenderer.invoke("displays:get-bounds", displayId),
  },

  // ==================================================
  // Notes Window
  // ==================================================

  notes: {
    open: (displayId) => ipcRenderer.invoke("notes:open", displayId),

    close: () => ipcRenderer.invoke("notes:close"),

    isOpen: () => ipcRenderer.invoke("notes:is-open"),

    moveToDisplay: (displayId) =>
      ipcRenderer.invoke("notes:move-to-display", displayId),
  },

  // ==================================================
  // Presentation Window
  // ==================================================

  presentation: {
    open: (displayId) => ipcRenderer.invoke("presentation:open", displayId),

    close: () => ipcRenderer.invoke("presentation:close"),

    isOpen: () => ipcRenderer.invoke("presentation:is-open"),

    moveToDisplay: (displayId) =>
      ipcRenderer.invoke("presentation:move-to-display", displayId),
  },

  // ==================================================
  // Application Menu
  // ==================================================

  menu: {
    onNewNote: (callback) => {
      const handler = () => callback();

      ipcRenderer.on("menu:new-note", handler);

      return () => {
        ipcRenderer.removeListener("menu:new-note", handler);
      };
    },

    onSaveNote: (callback) => {
      const handler = () => callback();

      ipcRenderer.on("menu:save-note", handler);

      return () => {
        ipcRenderer.removeListener("menu:save-note", handler);
      };
    },

    onDeleteNote: (callback) => {
      const handler = () => callback();

      ipcRenderer.on("menu:delete-note", handler);

      return () => {
        ipcRenderer.removeListener("menu:delete-note", handler);
      };
    },

    onAbout: (callback) => {
      const handler = () => callback();

      ipcRenderer.on("menu:about", handler);

      return () => {
        ipcRenderer.removeListener("menu:about", handler);
      };
    },
  },
});
