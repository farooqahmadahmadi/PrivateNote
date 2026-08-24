import DisplaySelector from "./components/DisplaySelector.jsx";
import NotesEditor from "./components/NotesEditor.jsx";
import PresentationView from "./components/PresentationView.jsx";
import WindowControls from "./components/WindowControls.jsx";

import { useDisplayAssignment } from "./hooks/useDisplayAssignment.js";
import { useDisplays } from "./hooks/useDisplays.js";

function App() {
  const windowType = window.location.hash;

  if (windowType === "#presentation") {
    return <PresentationView />;
  }

  return <Home />;
}

function Home() {
  const { displays, primaryDisplay, loading, error, refreshDisplays } =
    useDisplays();

  const {
    notesDisplayId,
    presentationDisplayId,
    assignNotesDisplay,
    assignPresentationDisplay,
    clearAssignment,
    getDisplayRole,
  } = useDisplayAssignment();

  return (
    <main className="min-h-screen w-full bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col">
        {/* ================================================== */}
        {/* Header */}
        {/* ================================================== */}

        <header className="shrink-0 border-b border-slate-800 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold sm:text-xl lg:text-2xl">
                PrivateNotes
              </h1>

              <p className="mt-1 truncate text-[11px] text-slate-500 sm:text-xs lg:text-sm">
                Private Presentation Notebook
              </p>
            </div>

            <div className="shrink-0 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 sm:px-3 sm:py-2">
              <span className="text-[10px] text-emerald-400 sm:text-xs">
                ● Notebook
              </span>
            </div>
          </div>
        </header>

        {/* ================================================== */}
        {/* Notes Editor */}
        {/* ================================================== */}

        <section className="min-h-0 flex-1">
          <NotesEditor />
        </section>

        {/* ================================================== */}
        {/* Bottom Control Area */}
        {/* ================================================== */}

        <section className="shrink-0 border-t border-slate-800 bg-slate-950 px-3 py-4 sm:px-5 sm:py-5 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            {/* ================================================== */}
            {/* Window Controls */}
            {/* ================================================== */}

            <div className="mb-4">
              <WindowControls
                notesDisplayId={notesDisplayId}
                presentationDisplayId={presentationDisplayId}
              />
            </div>

            {/* ================================================== */}
            {/* Assigned Displays */}
            {/* ================================================== */}

            <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Notes Display */}

              <div className="min-w-0 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3.5 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-sm">
                    📝
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 sm:text-xs">
                      Private Notes Display
                    </p>

                    <p className="mt-1.5 truncate text-xs text-slate-400 sm:text-sm">
                      {notesDisplayId
                        ? `Display ID: ${notesDisplayId}`
                        : "Not assigned"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Presentation Display */}

              <div className="min-w-0 rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-3.5 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-sm">
                    📺
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 sm:text-xs">
                      Presentation Display
                    </p>

                    <p className="mt-1.5 truncate text-xs text-slate-400 sm:text-sm">
                      {presentationDisplayId
                        ? `Display ID: ${presentationDisplayId}`
                        : "Not assigned"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================== */}
            {/* Display Selector */}
            {/* ================================================== */}

            <DisplaySelector
              displays={displays}
              primaryDisplay={primaryDisplay}
              loading={loading}
              error={error}
              onRefresh={refreshDisplays}
              getDisplayRole={getDisplayRole}
              onAssignNotes={assignNotesDisplay}
              onAssignPresentation={assignPresentationDisplay}
              onClear={clearAssignment}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
