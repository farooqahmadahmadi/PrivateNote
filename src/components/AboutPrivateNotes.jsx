function AboutPrivateNotes({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-100/80 px-3 py-4 backdrop-blur-sm dark:bg-black/60 sm:px-4 sm:py-6">
      <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:max-h-[calc(100vh-3rem)]">
        {/* Header */}

        <div className="shrink-0 border-b border-slate-200 px-4 py-5 text-center dark:border-slate-800 sm:px-6">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl font-bold text-slate-900 dark:bg-slate-800 dark:text-white">
            PN
          </div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            PrivateNotes
          </h2>

          <p className="mx-auto mt-1 max-w-sm text-sm leading-5 text-slate-600 dark:text-slate-500">
            A simple, private and focused desktop application for writing,
            organizing and reading your personal notes.
          </p>

          <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Version 1.0.0
          </span>
        </div>

        {/* Scrollable Content */}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="space-y-5 px-4 py-5 sm:px-6">
            {/* About */}

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                About PrivateNotes
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                PrivateNotes is designed for users who want a clean and
                distraction-free environment for creating and managing personal
                notes. The application focuses on simplicity, privacy and a
                comfortable writing experience.
              </p>
            </div>

            {/* Features */}

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Features
              </p>

              <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
                  • Create, edit and delete notes
                </div>

                <div className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
                  • Automatic note saving
                </div>

                <div className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
                  • Open and read TXT files
                </div>

                <div className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
                  • TXT file association with PrivateNotes
                </div>

                <div className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
                  • Focused Reading Mode
                </div>

                <div className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
                  • Private and Public modes
                </div>

                <div className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
                  • Keyboard shortcuts and desktop integration
                </div>
              </div>
            </div>

            {/* Developer */}

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Developer
              </p>

              <p className="mt-1 font-medium text-slate-900 dark:text-white">
                Farooq Ahmad Ahmadi
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                To learn more about the developer, projects, technologies and
                future work, explore the links below.
              </p>
            </div>

            {/* Links */}

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                More Information
              </p>

              <div className="mt-2 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
                <a
                  href="https://github.com/farooqahmadahmadi"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  GitHub
                </a>

                <a
                  href="https://your-portfolio.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  Portfolio
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  LinkedIn
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-6">
          <span className="text-xs text-slate-500 dark:text-slate-600">
            © 2026 PrivateNotes
          </span>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg bg-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutPrivateNotes;
