import { APPLICATION_STATUSES } from "../../data/applicationStatuses";
import { STATUS_STYLES } from "../../constants/statusStyles";

const ApplicationPipeline = ({ applications }) => {
  const getCount = (status) =>
    applications.filter((application) => application.status === status).length;

  const total = applications.length;

  return (
    <div className="rounded-lg border border-border-strong bg-surface p-6">
      <div>
        <h2 className="text-base font-semibold text-text-primary">
          Application Pipeline
        </h2>
        <p className="mt-1 text-sm text-text-primary">
          See how your applications are progressing.
        </p>
      </div>

      <div className="mt-7 space-y-5">
        {APPLICATION_STATUSES.map((status) => {
          const styles = STATUS_STYLES[status.id];
          const count = getCount(status.id);
          const percentage = count > 0 ? (count / total) * 100 : 0;

          return (
            <div key={status.id}>
              <div className="mb-1.5 flex justify-between items-center">
                <span className="text-sm font-medium text-text-secondary">
                  {status.label}
                </span>
                <span className="text-sm font-semibold text-text-primary">
                  {count}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-surface-subtle">
                <div
                  className={`h-full rounded-full bg-primary transition-all duration-200 ${styles.bar}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationPipeline;
