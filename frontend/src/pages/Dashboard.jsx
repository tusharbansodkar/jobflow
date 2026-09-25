import ApplicationPipeline from "../components/dashboard/ApplicationPipeline";
import JobSearchInsights from "../components/dashboard/JobSearchInsights";
import RecentApplications from "../components/dashboard/RecentApplications";
import StatCard from "../components/dashboard/statCard";
import useApplications from "../hooks/useApplications";

const Dashboard = () => {
  const { applications } = useApplications();

  const totalApplications = applications.length;

  const activeApplications = applications.filter(
    (application) =>
      application.status !== "rejected" && application.status !== "offer",
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "interview",
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "offer",
  ).length;

  return (
    <section className="p-3 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Overview of your job search.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={totalApplications}
          type="application"
        />

        <StatCard
          title="Active Applications"
          value={activeApplications}
          type="active"
        />

        <StatCard title="Interviews" value={interviewCount} type="interview" />

        <StatCard title="Offers" value={offerCount} type="offer" />
      </div>

      {/* Application pipeline */}

      <ApplicationPipeline applications={applications} />

      {/* Recent + Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <RecentApplications applications={applications} />

        <JobSearchInsights applications={applications} />
      </div>
    </section>
  );
};

export default Dashboard;
