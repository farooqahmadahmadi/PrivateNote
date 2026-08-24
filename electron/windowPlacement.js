import { screen } from "electron";

function findDisplay(displayId) {
  const displays = screen.getAllDisplays();

  return displays.find((display) => String(display.id) === String(displayId));
}

function getSafeBounds(display) {
  const { x, y, width, height } = display.workArea;

  return {
    x,
    y,
    width,
    height,
  };
}

export function moveWindowToDisplay(window, displayId) {
  if (!window || window.isDestroyed()) {
    return false;
  }

  const display = findDisplay(displayId);

  if (!display) {
    return false;
  }

  const bounds = getSafeBounds(display);

  window.setBounds(bounds);

  return true;
}

export function moveWindowToPrimaryDisplay(window) {
  if (!window || window.isDestroyed()) {
    return false;
  }

  const display = screen.getPrimaryDisplay();

  window.setBounds(getSafeBounds(display));

  return true;
}

export function getDisplayBounds(displayId) {
  const display = findDisplay(displayId);

  if (!display) {
    return null;
  }

  return {
    bounds: display.bounds,
    workArea: display.workArea,
    scaleFactor: display.scaleFactor,
    rotation: display.rotation,
  };
}
