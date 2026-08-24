import { BrowserWindow } from "electron";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let presentationWindow = null;

export function createPresentationWindow(isDevelopment) {
  if (presentationWindow && !presentationWindow.isDestroyed()) {
    presentationWindow.focus();
    return presentationWindow;
  }

  presentationWindow = new BrowserWindow({
    width: 1280,
    height: 720,

    minWidth: 640,
    minHeight: 360,

    resizable: true,
    maximizable: true,
    minimizable: true,
    fullscreenable: true,

    show: false,

    backgroundColor: "#000000",

    title: "PrivateNotes — Presentation",

    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),

      contextIsolation: true,
      nodeIntegration: false,

      sandbox: false,
    },
  });

  presentationWindow.once("ready-to-show", () => {
    presentationWindow.show();
  });

  if (isDevelopment) {
    presentationWindow.loadURL("http://127.0.0.1:5173/#presentation");
  } else {
    presentationWindow.loadFile(path.join(__dirname, "../dist/index.html"), {
      hash: "presentation",
    });
  }

  presentationWindow.on("closed", () => {
    presentationWindow = null;
  });

  return presentationWindow;
}

export function getPresentationWindow() {
  if (!presentationWindow || presentationWindow.isDestroyed()) {
    return null;
  }

  return presentationWindow;
}

export function closePresentationWindow() {
  if (presentationWindow && !presentationWindow.isDestroyed()) {
    presentationWindow.close();
  }

  presentationWindow = null;
}
