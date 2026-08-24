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
        "group relative overflow-hidden rounded-2xl border bg-slate-900/60 transition-all duration-200",
        role === "notes"
          ? "border-emerald-500/30 shadow-lg shadow-emerald-950/10"
          : role === "presentation"
            ? "border-blue-500/30 shadow-lg shadow-blue-950/10"
            : "border-slate-800 hover:border-slate-700",
      ].join(" ")}
    >
      {/* Assignment accent */}
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

        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg",
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
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  Display {index + 1}
                </h3>

                {display.isPrimary && (
                  <span className="rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-400">
                    Primary
                  </span>
                )}
              </div>

              <p className="mt-1 truncate text-xs text-slate-500">
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

        <div className="mt-5 grid grid-cols-2 gap-2">
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
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            Assign display
          </p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onAssignNotes(display.id)}
              className={[
                "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all active:scale-[0.98]",
                role === "notes"
                  ? "border border-emerald-500/20 bg-emerald-500/15 text-emerald-300"
                  : "border border-slate-800 bg-slate-950/70 text-slate-400 hover:border-emerald-500/20 hover:bg-emerald-500/5 hover:text-emerald-300",
              ].join(" ")}
            >
              <span>📝</span>

              <span>
                {role === "notes" ? "Notes Display" : "Use for Notes"}
              </span>

              {role === "notes" && (
                <span className="ml-auto text-emerald-400">✓</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onAssignPresentation(display.id)}
              className={[
                "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all active:scale-[0.98]",
                role === "presentation"
                  ? "border border-blue-500/20 bg-blue-500/15 text-blue-300"
                  : "border border-slate-800 bg-slate-950/70 text-slate-400 hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-300",
              ].join(" ")}
            >
              <span>📺</span>

              <span>
                {role === "presentation"
                  ? "Presentation Display"
                  : "Use for Presentation"}
              </span>

              {role === "presentation" && (
                <span className="ml-auto text-blue-400">✓</span>
              )}
            </button>
          </div>

          {/* ================================================== */}
          {/* Clear Assignment */}
          {/* ================================================== */}

          {role && (
            <button
              type="button"
              onClick={() => onClear(display.id)}
              className="mt-2.5 w-full rounded-lg px-3 py-2 text-[11px] font-medium text-slate-600 transition hover:bg-slate-800/70 hover:text-slate-400"
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
    <div className="rounded-xl border border-slate-800/70 bg-slate-950/50 px-3 py-2.5">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

export default DisplayCard;
