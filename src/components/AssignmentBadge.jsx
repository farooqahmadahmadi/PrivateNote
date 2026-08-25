function AssignmentBadge({ role }) {
  if (!role) {
    return (
      <span className="shrink-0 rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400 sm:text-xs">
        Unassigned
      </span>
    );
  }

  if (role === "notes") {
    return (
      <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 sm:text-xs">
        Private Notes
      </span>
    );
  }

  return (
    <span className="shrink-0 rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-medium text-blue-600 dark:text-blue-400 sm:text-xs">
      Presentation
    </span>
  );
}

export default AssignmentBadge;