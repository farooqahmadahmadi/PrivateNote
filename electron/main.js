import { app, ipcMain } from "electron";

import { createMainWindow } from "./windows.js";
import { createApplicationMenu } from "./menu.js";

import { getDisplays, getPrimaryDisplay } from "./displays.js";

import {
  createNotesWindow,
  closeNotesWindow,
  getNotesWindow,
} from "./notesWindow.js";

import {
  createPresentationWindow,
  closePresentationWindow,
  getPresentationWindow,
} from "./presentationWindow.js";

import {
  moveWindowToDisplay,
  moveWindowToPrimaryDisplay,
  getDisplayBounds,
} from "./windowPlacement.js";

let mainWindow = null;

const isDevelopment = !app.isPackaged;

// ==================================================
// Display IPC
// ==================================================

ipcMain.handle("displays:get", () => {
  return getDisplays();
});

ipcMain.handle("displays:get-primary", () => {
  return getPrimaryDisplay();
});

ipcMain.handle("displays:get-bounds", (_event, displayId) => {
  return getDisplayBounds(displayId);
});

// ==================================================
// Notes Window
// ==================================================

ipcMain.handle("notes:open", (_event, displayId = null) => {
  const window = createNotesWindow(isDevelopment);

  if (displayId !== null && displayId !== undefined) {
    moveWindowToDisplay(window, displayId);
  } else {
    moveWindowToPrimaryDisplay(window);
  }

  window.show();
  window.focus();

  return {
    success: true,
  };
});

ipcMain.handle("notes:close", () => {
  closeNotesWindow();

  return {
    success: true,
  };
});

ipcMain.handle("notes:is-open", () => {
  return Boolean(getNotesWindow());
});

ipcMain.handle("notes:move-to-display", (_event, displayId) => {
  const window = getNotesWindow();

  if (!window) {
    return false;
  }

  return moveWindowToDisplay(window, displayId);
});

// ==================================================
// Presentation Window
// ==================================================

ipcMain.handle("presentation:open", (_event, displayId = null) => {
  const window = createPresentationWindow(isDevelopment);

  if (displayId !== null && displayId !== undefined) {
    moveWindowToDisplay(window, displayId);
  } else {
    moveWindowToPrimaryDisplay(window);
  }

  window.show();
  window.focus();

  return {
    success: true,
  };
});

ipcMain.handle("presentation:close", () => {
  closePresentationWindow();

  return {
    success: true,
  };
});

ipcMain.handle("presentation:is-open", () => {
  return Boolean(getPresentationWindow());
});

ipcMain.handle("presentation:move-to-display", (_event, displayId) => {
  const window = getPresentationWindow();

  if (!window) {
    return false;
  }

  return moveWindowToDisplay(window, displayId);
});

// ==================================================
// Application
// ==================================================

app.whenReady().then(() => {
  // Native Application Menu
  createApplicationMenu();

  // Main Window
  mainWindow = createMainWindow(isDevelopment);

  app.on("activate", () => {
    if (mainWindow === null) {
      mainWindow = createMainWindow(isDevelopment);
    }
  });
});

// ==================================================
// Application Close
// ==================================================

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
