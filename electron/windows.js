import { BrowserWindow } from "electron";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createMainWindow(isDevelopment, initialMode = "private") {
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

  // ==================================================
  // Current Mode
  // ==================================================

  let currentMode =
    initialMode === "public" ? "public" : "private";

  let isHiddenByBlur = false;

  // ==================================================
  // Apply Mode Protection
  // ==================================================

  const applyModeProtection = (mode) => {
    if (mainWindow.isDestroyed()) {
      return;
    }

    currentMode = mode === "public" ? "public" : "private";

    // Screenshot / Screen Recording protection
    mainWindow.setContentProtection(currentMode === "private");

    // Public Mode = completely normal
    if (currentMode === "public") {
      isHiddenByBlur = false;
      mainWindow.setOpacity(1);
    }
  };

  // Initial protection
  applyModeProtection(currentMode);

  // ==================================================
  // Private Mode Blur Protection
  // ==================================================

  mainWindow.on("blur", () => {
    if (currentMode !== "private") {
      return;
    }

    if (mainWindow.isDestroyed()) {
      return;
    }

    if (isHiddenByBlur) {
      return;
    }

    isHiddenByBlur = true;

    // Keep window available, but hide its content
    mainWindow.setOpacity(0);
  });

  // ==================================================
  // Restore On Focus
  // ==================================================

  mainWindow.on("focus", () => {
    if (!isHiddenByBlur) {
      return;
    }

    if (mainWindow.isDestroyed()) {
      return;
    }

    isHiddenByBlur = false;
    mainWindow.setOpacity(1);
  });

  // ==================================================
  // Public API
  // ==================================================

  mainWindow.applyModeProtection = applyModeProtection;

  // ==================================================
  // Show Window
  // ==================================================

  mainWindow.once("ready-to-show", () => {
    mainWindow.setOpacity(1);
    mainWindow.show();
  });

  // ==================================================
  // Load Application
  // ==================================================

  if (isDevelopment) {
    mainWindow.loadURL("http://127.0.0.1:5173");
  } else {
    mainWindow.loadFile(
      path.join(__dirname, "../dist/index.html"),
    );
  }

  return mainWindow;
}