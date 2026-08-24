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
      <section className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
        <div className="flex min-h-36 flex-col items-center justify-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />

          <p className="text-sm font-medium text-slate-400">
            Detecting displays...
          </p>

          <p className="text-xs text-slate-600">
            Checking available monitors
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/[0.04]">
        <div className="flex items-start gap-3 p-4 sm:gap-4 sm:p-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 sm:h-10 sm:w-10">
            <span className="text-sm text-red-400 sm:text-lg">!</span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-red-300">
              Display detection failed
            </h3>

            <p className="mt-1 text-xs leading-5 text-red-400/80 sm:text-sm sm:leading-6">
              {error}
            </p>

            <button
              type="button"
              onClick={onRefresh}
              className="mt-3 rounded-lg bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20 active:scale-[0.98]"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const notesDisplay = displays.find(
    (display) => getDisplayRole(display.id) === "notes",
  );

  const presentationDisplay = displays.find(
    (display) => getDisplayRole(display.id) === "presentation",
  );

  return (
    <section className="w-full">
      {/* ================================================== */}
      {/* Header */}
      {/* ================================================== */}

      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-400 sm:text-[11px]">
              Display Setup
            </span>
          </div>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Connected Displays
          </h2>

          <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
            Assign your monitors for notes and presentation output.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white active:scale-[0.98] sm:w-auto"
        >
          <span className="text-base">↻</span>
          Refresh
        </button>
      </div>

      {/* ================================================== */}
      {/* Summary */}
      {/* ================================================== */}

      <div className="mb-5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-3">
        <SummaryCard
          label="Detected"
          value={displays.length}
          suffix={displays.length === 1 ? "display" : "displays"}
        />

        <SummaryCard
          label="Notes Output"
          value={
            notesDisplay
              ? notesDisplay.label ||
                notesDisplay.name ||
                `Display ${notesDisplay.id}`
              : "Not assigned"
          }
          tone="emerald"
        />

        <SummaryCard
          label="Presentation"
          value={
            presentationDisplay
              ? presentationDisplay.label ||
                presentationDisplay.name ||
                `Display ${presentationDisplay.id}`
              : "Not assigned"
          }
          tone="blue"
        />
      </div>

      {/* ================================================== */}
      {/* Display Grid */}
      {/* ================================================== */}

      {displays.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-5 py-10 text-center sm:px-6 sm:py-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-lg">
            🖥
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-300">
            No displays detected
          </h3>

          <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-slate-600">
            Connect another monitor and refresh the display list to assign it.
          </p>

          <button
            type="button"
            onClick={onRefresh}
            className="mt-5 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Refresh displays
          </button>
        </div>
      )}

      {/* ================================================== */}
      {/* Primary Display */}
      {/* ================================================== */}

      {primaryDisplay && (
        <div className="mt-4 flex min-w-0 flex-col gap-1.5 rounded-xl border border-slate-800/70 bg-slate-900/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />

            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
              Primary Display
            </span>
          </div>

          <span className="break-all text-[10px] text-slate-500 sm:text-right">
            {primaryDisplay.id}
          </span>
        </div>
      )}
    </section>
  );
}

function SummaryCard({ label, value, suffix, tone }) {
  const toneClasses = {
    emerald:
      "border-emerald-500/15 bg-emerald-500/[0.04] text-emerald-300",
    blue: "border-blue-500/15 bg-blue-500/[0.04] text-blue-300",
  };

  return (
    <div
      className={[
        "min-w-0 rounded-xl border px-4 py-3",
        tone ? toneClasses[tone] : "border-slate-800 bg-slate-900/60",
      ].join(" ")}
    >
      <p
        className={[
          "text-[9px] font-medium uppercase tracking-wider",
          tone === "emerald"
            ? "text-emerald-500/70"
            : tone === "blue"
              ? "text-blue-500/70"
              : "text-slate-600",
        ].join(" ")}
      >
        {label}
      </p>

      {suffix ? (
        <div className="mt-1 flex items-end gap-2">
          <span className="text-xl font-semibold text-white">{value}</span>

          <span className="pb-0.5 text-xs text-slate-500">{suffix}</span>
        </div>
      ) : (
        <p className="mt-1 truncate text-sm font-medium">{value}</p>
      )}
    </div>
  );
}

export default DisplaySelector;