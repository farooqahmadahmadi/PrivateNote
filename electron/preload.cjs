const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // ==================================================
  // Application
  // ==================================================

  app: {
    getMode: () => ipcRenderer.invoke("app:get-mode"),

    setMode: (mode) => {
      ipcRenderer.send("app:set-mode", mode);
    },

    onModeChanged: (callback) => {
      const handler = (_event, mode) => callback(mode);

      ipcRenderer.on("app:mode-changed", handler);

      return () => {
        ipcRenderer.removeListener("app:mode-changed", handler);
      };
    },
  },

  // ==================================================
  // Reading Mode
  // ==================================================

  reading: {
    open: () => {
      ipcRenderer.send("reading:open");
    },

    close: () => {
      ipcRenderer.send("reading:close");
    },

    onOpen: (callback) => {
      const handler = () => callback();

      ipcRenderer.on("reading:open", handler);

      return () => {
        ipcRenderer.removeListener("reading:open", handler);
      };
    },

    onClose: (callback) => {
      const handler = () => callback();

      ipcRenderer.on("reading:close", handler);

      return () => {
        ipcRenderer.removeListener("reading:close", handler);
      };
    },
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
