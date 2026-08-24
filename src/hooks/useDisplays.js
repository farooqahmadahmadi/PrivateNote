import { useCallback, useState } from "react";

import { electronAPI } from "../services/electron.js";

export function useDisplays() {
  const [displays, setDisplays] = useState([]);
  const [primaryDisplay, setPrimaryDisplay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshDisplays = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [allDisplays, primary] = await Promise.all([
        electronAPI.displays.getAll(),
        electronAPI.displays.getPrimary(),
      ]);

      setDisplays(allDisplays);
      setPrimaryDisplay(primary);
    } catch (err) {
      console.error("Failed to load displays:", err);

      setDisplays([]);
      setPrimaryDisplay(null);
      setError("Unable to detect displays.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    displays,
    primaryDisplay,
    loading,
    error,
    refreshDisplays,
  };
}
