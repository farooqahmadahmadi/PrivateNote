import { formatNoteDate, getNotePreview } from "../utils/noteUtils.js";

function NoteItem({ note, active, onSelect, onDelete }) {
  const isPrivate = note.isPrivate !== false;

  const handleDelete = (event) => {
    event.stopPropagation();

    onDelete(note.id);
  };

  return (
    <div
      className={[
        "w-full rounded-xl border p-3 transition",
        active
          ? "border-blue-500/40 bg-blue-500/10"
          : "border-slate-800 bg-slate-900 hover:bg-slate-800",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => onSelect(note.id)}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 truncate text-sm font-medium text-slate-100">
            {note.title || "Untitled Note"}
          </div>

          <span
            className={[
              "shrink-0 rounded-md px-1.5 py-0.5 text-[10px]",
              isPrivate
                ? "bg-amber-500/10 text-amber-400"
                : "bg-emerald-500/10 text-emerald-400",
            ].join(" ")}
          >
            {isPrivate ? "Private" : "Public"}
          </span>
        </div>

        <div className="mt-1 line-clamp-2 text-xs text-slate-500">
          {getNotePreview(note.content) || "Empty note"}
        </div>

        <div className="mt-2 text-[11px] text-slate-600">
          {formatNoteDate(note.updatedAt)}
        </div>
      </button>

      <div className="mt-3 flex justify-end border-t border-slate-800 pt-2">
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-md border border-red-500/15 bg-red-500/5 px-2 py-1 text-[10px] font-medium text-red-400 transition hover:border-red-500/25 hover:bg-red-500/10 hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteItem;
