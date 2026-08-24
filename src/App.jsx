import DisplaySelector from "./components/DisplaySelector.jsx";
import NotesEditor from "./components/NotesEditor.jsx";
import PresentationView from "./components/PresentationView.jsx";
import WindowControls from "./components/WindowControls.jsx";

import { useDisplayAssignment } from "./hooks/useDisplayAssignment.js";
import { useDisplays } from "./hooks/useDisplays.js";

function App() {
  const windowType = window.location.hash;

  // Presentation is the only secondary view.
  if (windowType === "#presentation") {
    return <PresentationView />;
  }

  // Everything else is Home / Notebook.
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

        <header className="border-b border-slate-800 px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">PrivateNotes</h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Private Presentation Notebook
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
              <span className="text-xs text-emerald-400">● Notebook</span>
            </div>
          </div>
        </header>

        {/* ================================================== */}
        {/* Notebook */}
        {/* ================================================== */}

        <section className="min-h-0 flex-1">
          <NotesEditor />
        </section>

        {/* ================================================== */}
        {/* Display Controls */}
        {/* ================================================== */}

        <section className="border-t border-slate-800 bg-slate-950 px-5 py-5 sm:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <WindowControls
              notesDisplayId={notesDisplayId}
              presentationDisplayId={presentationDisplayId}
            />

            <section className="my-5 grid grid-cols-1 gap-3 min-[600px]:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <p className="text-xs font-medium text-emerald-400">
                  📝 Private Notes Display
                </p>

                <p className="mt-2 break-all text-sm text-slate-300">
                  {notesDisplayId
                    ? `Display ID: ${notesDisplayId}`
                    : "Not assigned"}
                </p>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <p className="text-xs font-medium text-blue-400">
                  📺 Presentation Display
                </p>

                <p className="mt-2 break-all text-sm text-slate-300">
                  {presentationDisplayId
                    ? `Display ID: ${presentationDisplayId}`
                    : "Not assigned"}
                </p>
              </div>
            </section>

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
