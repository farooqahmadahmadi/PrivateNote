function NoteToolbar({
  note,
  onDelete,
  onTogglePrivacy,
  onClose,
  onToggleSidebar,
  sidebarOpen,
}) {
  const isPrivate = note?.isPrivate !== false;

  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 sm:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Sidebar Toggle */}
        <button
          type="button"
          onClick={onToggleSidebar}
          title={sidebarOpen ? "Hide notes" : "Show notes"}
          className="shrink-0 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-2 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white active:scale-[0.98]"
        >
          {sidebarOpen ? "←" : "☰"}
        </button>

        {/* Status */}
        <div className="min-w-0">
          <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">
            PrivateNotes
          </span>

          <div className="mt-0 flex items-center gap-2 sm:mt-1.5">
            <span
              className={[
                "h-2 w-2 shrink-0 rounded-full",
                isPrivate ? "bg-amber-400" : "bg-emerald-400",
              ].join(" ")}
            />

            <span
              className={[
                "text-xs font-medium",
                isPrivate ? "text-amber-400" : "text-emerald-400",
              ].join(" ")}
            >
              {isPrivate ? "Private Note" : "Public Note"}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {/* Privacy */}
        <button
          type="button"
          onClick={onTogglePrivacy}
          title={
            isPrivate
              ? "Make this note visible in Presentation"
              : "Make this note private"
          }
          className={[
            "rounded-lg border px-2.5 py-2 text-xs font-medium transition sm:px-3",
            "active:scale-[0.98]",
            isPrivate
              ? "border-amber-500/20 bg-amber-500/5 text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10"
              : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/10",
          ].join(" ")}
        >
          {isPrivate ? "🔒" : "🌐"}
          <span className="hidden sm:inline">
            {isPrivate ? " Private" : " Public"}
          </span>
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={onDelete}
          title="Delete note"
          className="rounded-lg border border-red-500/20 bg-red-500/5 px-2.5 py-2 text-xs font-medium text-red-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 active:scale-[0.98] sm:px-3"
        >
          <span className="sm:hidden">🗑</span>
          <span className="hidden sm:inline">Delete</span>
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          title="Close note"
          className="rounded-lg border border-slate-700 px-2.5 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white active:scale-[0.98] sm:px-3"
        >
          <span className="sm:hidden">×</span>
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>
    </header>
  );
}

export default NoteToolbar;