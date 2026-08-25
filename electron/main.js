import { app, ipcMain } from "electron";
import fs from "node:fs/promises";

import { createMainWindow } from "./windows.js";
import { createApplicationMenu } from "./menu.js";

let mainWindow = null;

const isDevelopment = !app.isPackaged;

// ==================================================
// Single Instance
// ==================================================

const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
  app.quit();
} else {
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
  // Text File
  // ==================================================

  const getTextFileFromArgs = (argv = []) => {
    return (
      argv.find((arg) => {
        if (!arg || arg.startsWith("-")) {
          return false;
        }

        return arg.toLowerCase().endsWith(".txt");
      }) || null
    );
  };

  let pendingTextFile = getTextFileFromArgs(process.argv);

  // ==================================================
  // Read Text File
  // ==================================================

  ipcMain.handle("file:read-text", async (_event, filePath) => {
    if (!filePath || typeof filePath !== "string") {
      throw new Error("Invalid file path.");
    }

    if (!filePath.toLowerCase().endsWith(".txt")) {
      throw new Error("Only TXT files are supported.");
    }

    return await fs.readFile(filePath, "utf8");
  });

  // ==================================================
  // Send File To Renderer
  // ==================================================

  const sendTextFileToRenderer = (filePath) => {
    if (!filePath || !mainWindow) {
      return;
    }

    if (mainWindow.webContents.isLoading()) {
      pendingTextFile = filePath;
      return;
    }

    mainWindow.webContents.send("file:open-text", filePath);
  };

  // ==================================================
  // Second Instance
  // ==================================================

  app.on("second-instance", (_event, commandLine) => {
    const filePath = getTextFileFromArgs(commandLine);

    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }

      mainWindow.show();
      mainWindow.focus();
    }

    if (filePath) {
      sendTextFileToRenderer(filePath);
    }
  });

  // ==================================================
  // Application
  // ==================================================

  app.whenReady().then(() => {
    createApplicationMenu();

    mainWindow = createMainWindow(isDevelopment);

    mainWindow.webContents.on("did-finish-load", () => {
      if (!pendingTextFile) {
        return;
      }

      const filePath = pendingTextFile;

      pendingTextFile = null;

      mainWindow?.webContents.send("file:open-text", filePath);
    });

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
}
