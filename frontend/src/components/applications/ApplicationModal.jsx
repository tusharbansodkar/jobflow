import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { APPLICATION_STATUSES } from "../../data/applicationStatuses";

const EMPTY_FORM = {
  company: "",
  position: "",
  location: "",
  jobUrl: "",
  applicationDate: "",
  status: "applied",
  notes: "",
};

const ApplicationModal = ({ isOpen, application, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const isEditing = Boolean(application);

  useEffect(() => {
    if (application) {
      setFormData({
        company: application.company || "",
        position: application.position || "",
        location: application.location || "",
        jobUrl: application.jobUrl || "",
        applicationDate: application.applicationDate || "",
        status: application.status || "applied",
        notes: application.notes || "",
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [application]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData(EMPTY_FORM);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-modal-title"
    >
      {/* Backdrop */}

      <button
        className="absolute inset-0 bg-black/30 "
        aria-label="Close Modal"
        onClick={onClose}
      ></button>

      {/* Modal */}

      <div className="relative my-auto w-full max-w-xl ">
        <div className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-border bg-surface shadow-xl sm:max-h-[calc(100vh-3rem)] custom-scrollbar">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-border-strong px-6 py-4">
            <div>
              <h2
                id="application-modal-title"
                className="text-lg font-semibold text-text-primary"
              >
                {isEditing ? "Edit Application" : "Add Application"}
              </h2>
              <p className="mt-1 text-sm text-text-primary">
                {isEditing
                  ? "Update the details of this application."
                  : "Add a new job application to your tracker."}
              </p>
            </div>

            <button
              className="p-2 rounded-md text-text-muted transition hover:bg-surface-subtle hover:text-text-primary cursor-pointer"
              onClick={onClose}
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit}>
            <div className="space-y-5 px-6 py-5 ">
              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Razorpay"
                  required
                  className="w-full rounded-md border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Position */}

              <div>
                <label
                  htmlFor="position"
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  Position
                </label>

                <input
                  id="position"
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  required
                  className="w-full rounded-md border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                ></input>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore/Remote"
                  required
                  className="w-full rounded-md border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                ></input>
              </div>

              {/* Job Url */}
              <div>
                <label
                  htmlFor="jobUrl"
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  Job URL
                </label>

                <input
                  id="jobUrl"
                  name="jobUrl"
                  type="url"
                  value={formData.jobUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                  className="w-full rounded-md border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                ></input>
              </div>

              {/* Date + Status */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="applicationDate"
                    className="mb-1.5 block text-sm font-medium text-text-primary"
                  >
                    Application Date
                  </label>

                  <input
                    id="applicationDate"
                    name="applicationDate"
                    type="date"
                    value={formData.applicationDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                  ></input>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="mb-1.5 block text-sm font-medium text-text-primary"
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-md border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {APPLICATION_STATUSES.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}

              <div>
                <label
                  htmlFor="notes"
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  Notes
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any notes about this application..."
                  className="w-full resize-none rounded-md border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none transition placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>
            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 border-t border-border-strong px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text-secondary transition hover:bg-surface-subtle hover:text-text-primary cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text-secondary transition hover:bg-surface-subtle hover:text-text-primary cursor-pointer"
              >
                {isEditing ? "Save Changes" : "Add Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
