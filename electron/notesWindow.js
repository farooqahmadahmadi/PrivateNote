import { BrowserWindow } from "electron";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let notesWindow = null;

export function createNotesWindow(isDevelopment) {
  if (notesWindow && !notesWindow.isDestroyed()) {
    notesWindow.focus();
    return notesWindow;
  }

notesWindow = new BrowserWindow({
  width: 720,
  height: 620,

  // Very compact Sticky Notes size
  minWidth: 260,
  minHeight: 200,

  resizable: true,
  maximizable: true,
  minimizable: true,
  fullscreenable: true,

  show: false,

  backgroundColor: "#020617",

  title: "PrivateNotes — Notes",

  webPreferences: {
    preload: path.join(__dirname, "preload.cjs"),

    contextIsolation: true,
    nodeIntegration: false,

    sandbox: false,
  },
});
  notesWindow.once("ready-to-show", () => {
    notesWindow.show();
  });

  if (isDevelopment) {
    notesWindow.loadURL("http://127.0.0.1:5173/#notes");
  } else {
    notesWindow.loadFile(path.join(__dirname, "../dist/index.html"), {
      hash: "notes",
    });
  }

  notesWindow.on("closed", () => {
    notesWindow = null;
  });

  return notesWindow;
}

export function getNotesWindow() {
  if (!notesWindow || notesWindow.isDestroyed()) {
    return null;
  }

  return notesWindow;
}

export function closeNotesWindow() {
  if (notesWindow && !notesWindow.isDestroyed()) {
    notesWindow.close();
  }

  notesWindow = null;
}