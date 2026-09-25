import { CalendarDays, MapPin } from "lucide-react";
import { APPLICATION_STATUSES } from "../../data/applicationStatuses";

const STATUS_BADGE_STYLES = {
  applied: "bg-info-subtle text-info",
  screening: "bg-warning-subtle text-warning",
  interview: "bg-primary-subtle text-primary",
  offer: "bg-success-subtle text-success",
  rejected: "bg-danger-subtle text-danger",
};

const RecentApplications = ({ applications }) => {
  const recentApplications = [...applications]
    .toSorted(
      (a, b) => new Date(b.applicationDate) - new Date(a.applicationDate),
    )
    .slice(0, 5);

  const getStatusLabel = (statusId) => {
    const status = APPLICATION_STATUSES.find((item) => item.id === statusId);

    return status?.label || statusId;
  };

  if (recentApplications.length === 0) {
    return (
      <div className="rounded-lg border border-border-strong bg-surface p-5">
        <h2 className="text-base font-semibold text-text-primary">
          Recent Applications
        </h2>
        <p className="mt-8 text-center text-sm text-text-muted">
          No applications yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-strong bg-surface">
      <div className="border-b border-border-strong px-5 py-4">
        <h2 className="text-base font-bold text-text-primary">
          Recent Applications
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          Your latest job applications.
        </p>
      </div>

      <div className="divide-y divide-border">
        {recentApplications.map((application) => (
          <div key={application.id} className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">
                  {application.company}
                </p>

                <p className="mt-0.5 truncate text-sm text-text-secondary">
                  {application.position}
                </p>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
                  {application.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={13} />
                      {application.location}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={13} />
                    {application.applicationDate}
                  </span>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full bg-surface-subtle px-2.5 py-1 text-xs font-medium text-text-secondary ${STATUS_BADGE_STYLES[application.status]}`}
              >
                {getStatusLabel(application.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentApplications;
