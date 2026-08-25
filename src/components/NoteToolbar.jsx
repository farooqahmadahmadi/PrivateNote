function NoteToolbar({
  note,
  onDelete,
  onClose,
  onReadingMode,
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
          className="shrink-0 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-2 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
        >
          {sidebarOpen ? "←" : "☰"}
        </button>
      </div>

      {/* Actions */}

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {/* Reading Mode */}

        <button
          type="button"
          onClick={onReadingMode}
          title="Open Reading Mode"
          className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-2.5 py-2 text-xs font-medium text-blue-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 sm:px-3"
        >
          <span className="sm:hidden">Read</span>

          <span className="hidden sm:inline">Reading Mode</span>
        </button>

        {/* Delete */}

        <button
          type="button"
          onClick={onDelete}
          title="Delete note"
          className="rounded-lg border border-red-500/20 bg-red-500/5 px-2.5 py-2 text-xs font-medium text-red-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 sm:px-3"
        >
          <span className="sm:hidden">🗑</span>

          <span className="hidden sm:inline">Delete</span>
        </button>

        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          title="Close note"
          className="rounded-lg border border-slate-700 px-2.5 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white sm:px-3"
        >
          <span className="sm:hidden">×</span>

          <span className="hidden sm:inline">Close</span>
        </button>
      </div>
    </header>
  );
}

export default NoteToolbar;
