const JobSearchInsights = ({ applications }) => {
  const total = applications.length;

  const responded = applications.filter(
    (application) => application.status === "applied",
  ).length;

  const interviews = applications.filter(
    (application) =>
      application.status === "interview" || application.status === "offer",
  ).length;

  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

  const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;

  return (
    <div className="rounded-lg border border-border-strong bg-surface p-5">
      <h2 className="text-base font-bold text-text-primary">
        Job Search Insights
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        A quick look at your application performance.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Response Rate</span>
            <span className="text-sm font-semibold text-text-primary">
              {responseRate}%
            </span>
          </div>

          <div className="mt-2 h-2 bg-surface-subtle rounded-full">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${responseRate}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Interview Rate</span>
            <span className="text-sm font-semibold text-text-primary">
              {interviewRate}%
            </span>
          </div>

          <div className="mt-2 h-2 bg-surface-subtle rounded-full">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${interviewRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchInsights;
