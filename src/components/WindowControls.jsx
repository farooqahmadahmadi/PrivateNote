import { electronAPI } from "../services/electron.js";

function WindowControls({ notesDisplayId, presentationDisplayId }) {
  const openNotes = async () => {
    await electronAPI.notes.open(notesDisplayId);
  };

  const openPresentation = async () => {
    await electronAPI.presentation.open(presentationDisplayId);
  };

  const closeNotes = async () => {
    await electronAPI.notes.close();
  };

  const closePresentation = async () => {
    await electronAPI.presentation.close();
  };

  return (
    <section className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="font-semibold text-emerald-400">📝 Private Notes</h2>

            <p className="mt-1 text-xs text-slate-500">
              {notesDisplayId
                ? "Assigned display selected"
                : "No display selected"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={openNotes}
              disabled={!notesDisplayId}
              className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Open
            </button>

            <button
              type="button"
              onClick={closeNotes}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="font-semibold text-blue-400">📺 Presentation</h2>

            <p className="mt-1 text-xs text-slate-500">
              {presentationDisplayId
                ? "Assigned display selected"
                : "No display selected"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={openPresentation}
              disabled={!presentationDisplayId}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Open
            </button>

            <button
              type="button"
              onClick={closePresentation}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WindowControls;
