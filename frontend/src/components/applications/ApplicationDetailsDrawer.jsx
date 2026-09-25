import { CalendarDays, ExternalLink, MapPin, X } from "lucide-react";

const ApplicationDetailsDrawer = ({
  application,
  onClose,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  if (!application) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 border-2">
      {/* Backdrop */}

      <button
        type="button"
        aria-label="Close application details"
        className="absolute inset-0 cursor-default bg-slate-950/30"
        onClick={onClose}
      />

      {/* Drawer */}

      <aside
        className=" absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border-strong bg-surface shadow-modal"
        aria-label="Application details"
      >
        {/* Header */}

        <header className="flex justify-between items-center border-b border-border-strong px-6 py-5">
          <div className="min-w-0 ">
            <p className="text-sm font-medium text-text-muted">Application</p>
            <h2 className="mt-1 truncate text-lg font-semibold text-text-primary">
              {application.company}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              {application.position}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-text-muted transition-colors hover:bg-surface-subtle hover:text-text-primary cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </header>

        {/* Content */}

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* status */}

            <div>
              <label
                htmlFor="application-status"
                className="text-xs font-medium uppercase tracking-wide text-text-muted"
              >
                Status
              </label>

              <select
                id="application-status"
                value={application.status}
                onChange={(event) => onStatusChange(event.target.value)}
                className="mt-2 h-10 w-full rounded-md border-border bg-surface px-3 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-subtle cursor-pointer"
              >
                <option value="applied">Applied</option>
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Details */}

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Location
                </p>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-text-primary">
                <MapPin className="size-4 text-text-muted" />
                {application.location}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Applied
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm text-text-primary">
                <CalendarDays className="size-4 text-text-muted" />
                {application.applicationDate}
              </div>
            </div>

            {/* Job URL */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Job Posting
              </p>

              <a
                href={application.jobUrl}
                target="_blank "
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary-hover"
              >
                View job posting
                <ExternalLink className="size-4" />
              </a>
            </div>

            {/* Notes */}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Notes
              </p>

              <div className="mt-2 rounded-lg border border-border bg-surface-subtle p-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-text-secondary">
                  {application.notes || "No notes added."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <footer className="border-t border-border-strong px-6 py-4">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h9 rounded-md border border-border bg-surface px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              className="h9 rounded-md border border-border bg-surface px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary cursor-pointer"
              onClick={onEdit}
            >
              Edit Application
            </button>

            <button
              type="button"
              className="h9 rounded-md border border-border bg-surface px-3 text-sm font-medium text-danger transition-colors hover:bg-danger-subtle cursor-pointer"
              onClick={onDelete}
            >
              Delete Application
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
};

export default ApplicationDetailsDrawer;
