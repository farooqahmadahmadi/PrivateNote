import AssignmentBadge from "./AssignmentBadge.jsx";

function DisplayCard({
  display,
  index,
  role,
  onAssignNotes,
  onAssignPresentation,
  onClear,
}) {
  return (
    <article className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-700 sm:p-5">
      {/* Header */}
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white sm:text-lg">
            🖥 Display {index + 1}
          </h3>

          <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
            {display.label}
          </p>
        </div>

        <AssignmentBadge role={role} />
      </div>

      {/* Primary */}
      {display.isPrimary && (
        <div className="mt-3">
          <span className="inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium text-amber-400 sm:text-xs">
            Primary Display
          </span>
        </div>
      )}

      {/* Information */}
      <div className="mt-4 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
        <div className="rounded-lg bg-slate-950 p-3">
          <span className="text-xs text-slate-500">Resolution</span>

          <div className="mt-1 text-sm text-slate-200">
            {display.size.width} × {display.size.height}
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-3">
          <span className="text-xs text-slate-500">Scale</span>

          <div className="mt-1 text-sm text-slate-200">
            {display.scaleFactor}x
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-3">
          <span className="text-xs text-slate-500">Position</span>

          <div className="mt-1 text-sm text-slate-200">
            {display.bounds.x}, {display.bounds.y}
          </div>
        </div>

        <div className="rounded-lg bg-slate-950 p-3">
          <span className="text-xs text-slate-500">Rotation</span>

          <div className="mt-1 text-sm text-slate-200">{display.rotation}°</div>
        </div>
      </div>

      {/* Assignment Buttons */}
      <div className="mt-5 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
        <button
          type="button"
          onClick={() => onAssignNotes(display.id)}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition active:scale-[0.98] ${
            role === "notes"
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : "border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          📝 {role === "notes" ? "Notes Display" : "Use for Notes"}
        </button>

        <button
          type="button"
          onClick={() => onAssignPresentation(display.id)}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition active:scale-[0.98] ${
            role === "presentation"
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          📺{" "}
          {role === "presentation"
            ? "Presentation Display"
            : "Use for Presentation"}
        </button>
      </div>

      {/* Clear */}
      {role && (
        <button
          type="button"
          onClick={() => onClear(display.id)}
          className="mt-2 w-full rounded-lg px-4 py-2 text-xs text-slate-500 transition hover:bg-slate-800 hover:text-slate-300"
        >
          Clear Assignment
        </button>
      )}
    </article>
  );
}

export default DisplayCard;
