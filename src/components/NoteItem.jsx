import { formatNoteDate, getNotePreview } from "../utils/noteUtils.js";

function NoteItem({ note, active, onSelect, onDelete }) {
  const handleDelete = (event) => {
    event.stopPropagation();

    onDelete(note.id);
  };

  const handleExport = (event) => {
    event.stopPropagation();

    const title = note.title?.trim() || "Untitled Note";
    const content = note.content || "";

    const fileContent = `${title}\n\n${content}`;

    const blob = new Blob([fileContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${
      title
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .trim()
        .replace(/\s+/g, "_") || "Untitled_Note"
    }.txt`;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
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
      {/* Note */}

      <button
        type="button"
        onClick={() => onSelect(note.id)}
        className="w-full text-left"
      >
        <div className="min-w-0 truncate text-sm font-medium text-slate-100">
          {note.title || "Untitled Note"}
        </div>

        <div className="mt-1 line-clamp-2 text-xs text-slate-500">
          {getNotePreview(note.content) || "Empty note"}
        </div>

        <div className="mt-2 text-[11px] text-slate-600">
          {formatNoteDate(note.updatedAt)}
        </div>
      </button>

      {/* Actions */}

      <div className="mt-3 flex justify-end gap-2 border-t border-slate-800 pt-2">
        {/* Export */}

        <button
          type="button"
          onClick={handleExport}
          title="Export note as text file"
          className="rounded-md border border-blue-500/15 bg-blue-500/5 px-2 py-1 text-[10px] font-medium text-blue-400 transition hover:border-blue-500/25 hover:bg-blue-500/10 hover:text-blue-300"
        >
          Export
        </button>

        {/* Delete */}

        <button
          type="button"
          onClick={handleDelete}
          title="Delete note"
          className="rounded-md border border-red-500/15 bg-red-500/5 px-2 py-1 text-[10px] font-medium text-red-400 transition hover:border-red-500/25 hover:bg-red-500/10 hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteItem;
