import { app, BrowserWindow, Menu } from "electron";

export function createApplicationMenu() {
  const template = [
    // ==================================================
    // File
    // ==================================================

    {
      label: "File",
      submenu: [
        {
          label: "New Note",
          accelerator: "Ctrl+N",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send("menu:new-note");
          },
        },

        {
          label: "Save",
          accelerator: "Ctrl+S",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send(
              "menu:save-note",
            );
          },
        },

        {
          type: "separator",
        },

        {
          label: "Delete Note",
          accelerator: "Ctrl+Delete",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send(
              "menu:delete-note",
            );
          },
        },

        {
          type: "separator",
        },

        {
          label: "Exit",
          accelerator: "Alt+F4",
          click: () => {
            app.quit();
          },
        },
      ],
    },

    // ==================================================
    // Edit
    // ==================================================

    {
      label: "Edit",
      submenu: [
        {
          role: "undo",
          label: "Undo",
        },
        {
          role: "redo",
          label: "Redo",
        },

        {
          type: "separator",
        },

        {
          role: "cut",
          label: "Cut",
        },
        {
          role: "copy",
          label: "Copy",
        },
        {
          role: "paste",
          label: "Paste",
        },
        {
          role: "selectAll",
          label: "Select All",
        },
      ],
    },

    // ==================================================
    // View
    // ==================================================

    {
      label: "View",
      submenu: [
        {
          role: "reload",
          label: "Reload",
        },

        {
          role: "forceReload",
          label: "Force Reload",
        },

        {
          type: "separator",
        },

        {
          role: "toggleDevTools",
          label: "Developer Tools",
        },

        {
          type: "separator",
        },

        {
          role: "togglefullscreen",
          label: "Fullscreen",
        },
      ],
    },

    // ==================================================
    // Mode
    // ==================================================

    {
      label: "Mode",
      submenu: [
        {
          label: "Private Mode",
          accelerator: "Ctrl+Shift+P",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send(
              "app:mode-changed",
              "private",
            );
          },
        },

        {
          label: "Public Mode",
          accelerator: "Ctrl+Shift+U",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send(
              "app:mode-changed",
              "public",
            );
          },
        },
      ],
    },

    // ==================================================
    // Theme
    // ==================================================

    {
      label: "Theme",
      submenu: [
        {
          label: "Light",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send(
              "theme:changed",
              "light",
            );
          },
        },

        {
          label: "Dark",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send(
              "theme:changed",
              "dark",
            );
          },
        },
      ],
    },
    // ==================================================
    // Reading
    // ==================================================

    {
      label: "Reading",
      submenu: [
        {
          label: "Open Reading Mode",
          accelerator: "F11",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send("reading:open");
          },
        },

        {
          label: "Close Reading Mode",
          accelerator: "Escape",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send("reading:close");
          },
        },
      ],
    },

    // ==================================================
    // Window
    // ==================================================

    {
      label: "Window",
      submenu: [
        {
          role: "minimize",
          label: "Minimize",
        },

        {
          role: "close",
          label: "Close",
        },
      ],
    },

    // ==================================================
    // Help
    // ==================================================

    {
      label: "Help",
      submenu: [
        {
          label: "About PrivateNotes",
          click: () => {
            BrowserWindow.getFocusedWindow()?.webContents.send("menu:about");
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
}
