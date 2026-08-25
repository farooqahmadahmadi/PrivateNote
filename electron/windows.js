import { BrowserWindow } from "electron";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createMainWindow(isDevelopment) {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,

    minWidth: 700,
    minHeight: 500,

    resizable: true,
    maximizable: true,
    minimizable: true,
    fullscreenable: true,

    show: false,

    backgroundColor: "#020617",

    title: "PrivateNotes",

    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),

      contextIsolation: true,

      nodeIntegration: false,

      sandbox: false,
    },
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (isDevelopment) {
    mainWindow.loadURL("http://127.0.0.1:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  return mainWindow;
}
