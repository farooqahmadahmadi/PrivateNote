import { app, ipcMain } from "electron";

import { createMainWindow } from "./windows.js";
import { createApplicationMenu } from "./menu.js";

let mainWindow = null;

const isDevelopment = !app.isPackaged;

// ==================================================
// Application Mode
// ==================================================

ipcMain.handle("app:get-mode", () => {
  return "private";
});

ipcMain.on("app:set-mode", (_event, mode) => {
  if (mode !== "private" && mode !== "public") {
    return;
  }

  mainWindow?.webContents.send("app:mode-changed", mode);
});

// ==================================================
// Reading Mode
// ==================================================

ipcMain.on("reading:open", () => {
  mainWindow?.webContents.send("reading:open");
});

ipcMain.on("reading:close", () => {
  mainWindow?.webContents.send("reading:close");
});

// ==================================================
// Application
// ==================================================

app.whenReady().then(() => {
  createApplicationMenu();

  mainWindow = createMainWindow(isDevelopment);

  app.on("activate", () => {
    if (mainWindow === null) {
      mainWindow = createMainWindow(isDevelopment);
    }
  });
});

// ==================================================
// Close
// ==================================================

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
