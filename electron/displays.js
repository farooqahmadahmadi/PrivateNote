import { screen } from "electron";

export function getDisplays() {
  return screen.getAllDisplays().map((display) => ({
    id: display.id,
    bounds: display.bounds,
    workArea: display.workArea,
    size: {
      width: display.size.width,
      height: display.size.height,
    },
    scaleFactor: display.scaleFactor,
    rotation: display.rotation,
    label: display.label || `Display ${display.id}`,
    isPrimary: display.id === screen.getPrimaryDisplay().id,
  }));
}

export function getPrimaryDisplay() {
  const display = screen.getPrimaryDisplay();

  return {
    id: display.id,
    bounds: display.bounds,
    workArea: display.workArea,
    size: {
      width: display.size.width,
      height: display.size.height,
    },
    scaleFactor: display.scaleFactor,
    rotation: display.rotation,
    label: display.label || `Display ${display.id}`,
    isPrimary: true,
  };
}
