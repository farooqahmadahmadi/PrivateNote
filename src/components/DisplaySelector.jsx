import DisplayCard from "./DisplayCard.jsx";

function DisplaySelector({
  displays,
  primaryDisplay,
  loading,
  error,
  onRefresh,
  getDisplayRole,
  onAssignNotes,
  onAssignPresentation,
  onClear,
}) {
  if (loading) {
    return (
      <div className="flex w-full items-center justify-center py-12">
        <p className="text-sm text-slate-400 sm:text-base">
          Detecting displays...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 sm:p-6">
        <p className="text-sm text-red-400 sm:text-base">{error}</p>

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-95"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Connected Displays
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            {displays.length} {displays.length === 1 ? "display" : "displays"}{" "}
            detected
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="w-full rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 active:scale-95 sm:w-auto"
        >
          Refresh
        </button>
      </div>

      {/* Display List */}
      {displays.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4">
          {displays.map((display, index) => (
            <DisplayCard
              key={display.id}
              display={display}
              index={index}
              role={getDisplayRole(display.id)}
              onAssignNotes={onAssignNotes}
              onAssignPresentation={onAssignPresentation}
              onClear={onClear}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-sm text-slate-400">No displays detected.</p>
        </div>
      )}

      {/* Primary Display ID */}
      {primaryDisplay && (
        <div className="mt-5 w-full rounded-lg border border-slate-800/70 bg-slate-900/50 px-3 py-2.5 text-center">
          <p className="break-all text-[10px] text-slate-500 sm:text-xs">
            Primary Display ID:{" "}
            <span className="text-slate-400">{primaryDisplay.id}</span>
          </p>
        </div>
      )}
    </section>
  );
}

export default DisplaySelector;
