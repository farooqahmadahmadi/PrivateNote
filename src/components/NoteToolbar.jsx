function NoteToolbar({ note, onDelete, onTogglePrivacy, onClose }) {
  const isPrivate = note?.isPrivate !== false;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-3 sm:px-8">
      {/* Status */}
      <div className="min-w-0">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          PrivateNotes
        </span>

        <div className="mt-1.5 flex items-center gap-2">
          <span
            className={[
              "h-2 w-2 rounded-full",
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

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
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
            "rounded-lg border px-3 py-2 text-xs font-medium transition",
            "active:scale-[0.98]",
            isPrivate
              ? "border-amber-500/20 bg-amber-500/5 text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10"
              : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/10",
          ].join(" ")}
        >
          {isPrivate ? "🔒 Private" : "🌐 Public"}
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs font-medium text-red-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 active:scale-[0.98]"
        >
          Delete
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white active:scale-[0.98]"
        >
          Close
        </button>
      </div>
    </header>
  );
}

export default NoteToolbar;
