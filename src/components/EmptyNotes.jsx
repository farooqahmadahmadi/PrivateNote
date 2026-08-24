function EmptyNotes() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-6">
      <div className="max-w-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl">
          📝
        </div>

        <h2 className="mt-5 text-xl font-semibold text-white">
          No note selected
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Select a note from the sidebar or create a new one.
        </p>
      </div>
    </div>
  );
}

export default EmptyNotes;
