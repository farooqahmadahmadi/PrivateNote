import AssignmentBadge from "./AssignmentBadge.jsx";

function DisplayCard({
  display,
  index,
  role,
  onAssignNotes,
  onAssignPresentation,
  onClear,
}) {
  const isAssigned = Boolean(role);

  return (
    <article
      className={[
        "group relative min-w-0 overflow-hidden rounded-2xl border bg-slate-900/60 transition-all duration-200",
        role === "notes"
          ? "border-emerald-500/30 shadow-lg shadow-emerald-950/10"
          : role === "presentation"
            ? "border-blue-500/30 shadow-lg shadow-blue-950/10"
            : "border-slate-800 hover:border-slate-700",
      ].join(" ")}
    >
      {/* Assignment Accent */}
      {isAssigned && (
        <div
          className={[
            "absolute inset-x-0 top-0 h-px",
            role === "notes" ? "bg-emerald-500" : "bg-blue-500",
          ].join(" ")}
        />
      )}

      <div className="p-4 sm:p-5">
        {/* ================================================== */}
        {/* Header */}
        {/* ================================================== */}

        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-base sm:h-11 sm:w-11 sm:text-lg",
                role === "notes"
                  ? "border-emerald-500/20 bg-emerald-500/10"
                  : role === "presentation"
                    ? "border-blue-500/20 bg-blue-500/10"
                    : "border-slate-800 bg-slate-950",
              ].join(" ")}
            >
              🖥
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  Display {index + 1}
                </h3>

                {display.isPrimary && (
                  <span className="rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-amber-400 sm:text-[9px]">
                    Primary
                  </span>
                )}
              </div>

              <p className="mt-1 truncate text-[11px] text-slate-500 sm:text-xs">
                {display.label || "Unnamed display"}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <AssignmentBadge role={role} />
          </div>
        </div>

        {/* ================================================== */}
        {/* Display Information */}
        {/* ================================================== */}

        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-4">
          <InfoItem
            label="Resolution"
            value={`${display.size.width} × ${display.size.height}`}
          />

          <InfoItem label="Scale" value={`${display.scaleFactor}x`} />

          <InfoItem
            label="Position"
            value={`${display.bounds.x}, ${display.bounds.y}`}
          />

          <InfoItem label="Rotation" value={`${display.rotation}°`} />
        </div>

        {/* ================================================== */}
        {/* Assignment Actions */}
        {/* ================================================== */}

        <div className="mt-4 border-t border-slate-800/80 pt-4">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-600 sm:text-[10px]">
              Assign display
            </p>

            {role && (
              <span
                className={[
                  "text-[9px] font-medium",
                  role === "notes"
                    ? "text-emerald-500"
                    : "text-blue-500",
                ].join(" ")}
              >
                Active
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
            {/* Notes */}
            <button
              type="button"
              onClick={() => onAssignNotes(display.id)}
              className={[
                "flex min-h-10 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all active:scale-[0.98]",
                role === "notes"
                  ? "border border-emerald-500/20 bg-emerald-500/15 text-emerald-300"
                  : "border border-slate-800 bg-slate-950/70 text-slate-400 hover:border-emerald-500/20 hover:bg-emerald-500/5 hover:text-emerald-300",
              ].join(" ")}
            >
              <span>📝</span>

              <span className="truncate">
                {role === "notes" ? "Notes Display" : "Use for Notes"}
              </span>

              {role === "notes" && (
                <span className="shrink-0 text-emerald-400">✓</span>
              )}
            </button>

            {/* Presentation */}
            <button
              type="button"
              onClick={() => onAssignPresentation(display.id)}
              className={[
                "flex min-h-10 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all active:scale-[0.98]",
                role === "presentation"
                  ? "border border-blue-500/20 bg-blue-500/15 text-blue-300"
                  : "border border-slate-800 bg-slate-950/70 text-slate-400 hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-300",
              ].join(" ")}
            >
              <span>📺</span>

              <span className="truncate">
                {role === "presentation"
                  ? "Presentation Display"
                  : "Use for Presentation"}
              </span>

              {role === "presentation" && (
                <span className="shrink-0 text-blue-400">✓</span>
              )}
            </button>
          </div>

          {/* Clear */}
          {role && (
            <button
              type="button"
              onClick={() => onClear(display.id)}
              className="mt-2.5 min-h-9 w-full rounded-lg px-3 py-2 text-[10px] font-medium text-slate-600 transition hover:bg-slate-800/70 hover:text-slate-400 sm:text-[11px]"
            >
              Clear assignment
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-800/70 bg-slate-950/50 px-2.5 py-2.5 sm:px-3">
      <p className="truncate text-[8px] font-semibold uppercase tracking-wider text-slate-600 sm:text-[9px]">
        {label}
      </p>

      <p className="mt-1 truncate text-[11px] font-medium text-slate-300 sm:text-xs">
        {value}
      </p>
    </div>
  );
}

export default DisplayCard;