import { BrowserWindow, screen } from "electron";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createMainWindow(isDevelopment) {
  const primaryDisplay = screen.getPrimaryDisplay();

  const { width, height } = primaryDisplay.workAreaSize;

  const window = new BrowserWindow({
    width: Math.min(1200, width),
    height: Math.min(800, height),

    minWidth: 800,
    minHeight: 600,

    show: false,

    backgroundColor: "#020617",

    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),

      contextIsolation: true,
      nodeIntegration: false,

      sandbox: false,
    },
  });

  window.once("ready-to-show", () => {
    window.show();
  });

  if (isDevelopment) {
    window.loadURL("http://127.0.0.1:5173");
  } else {
    window.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  return window;
}
