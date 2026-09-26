import { useState } from "react";
import ApplicationToolbar from "../components/applications/ApplicationToolbar";
import KanbanBoard from "../components/applications/KanbanBoard";
import ApplicationDetailsDrawer from "../components/applications/ApplicationDetailsDrawer";
import ApplicationModal from "../components/applications/ApplicationModal";
import useApplications from "../hooks/useApplications";

const Applications = () => {
  const {
    applications,
    addApplication,
    deleteApplication,
    updateApplication,
    updateApplicationStatus,
    isModalOpen,
    setIsModalOpen,
  } = useApplications();

  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const [editingApplication, setEditingApplication] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const selectedApplication = applications.find(
    (application) => application._id === selectedApplicationId,
  );

  const filteredApplications = applications
    .filter((application) => {
      const query = searchQuery.trim().toLowerCase();

      const matchedSearch =
        !query ||
        application.company.toLowerCase().includes(query) ||
        application.position.toLowerCase().includes(query) ||
        application.location.toLowerCase().includes(query);

      const matchedStatus =
        statusFilter === "all" || application.status === statusFilter;

      return matchedSearch && matchedStatus;
    })
    .toSorted((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.applicationDate) - new Date(a.applicationDate);

        case "oldest":
          return new Date(a.applicationDate) - new Date(b.applicationDate);

        case "companyAsc":
          return a.company.localeCompare(b.company);

        case "companyDesc":
          return b.company.localeCompare(a.company);

        default:
          return 0;
      }
    });

  const handleApplicationClick = (application) => {
    setSelectedApplicationId(application._id);
  };

  const handleStatusChange = (applicationId, newStatus) => {
    updateApplicationStatus(applicationId, newStatus);
  };

  const handleDrawerStatusChange = (newStatus) => {
    if (!selectedApplicationId) return;

    handleStatusChange(selectedApplicationId, newStatus);
  };

  const handleAddApplication = () => {
    setEditingApplication(null);
    setIsModalOpen(true);
  };

  const handleDeleteApplication = (applicationId) => {
    deleteApplication(applicationId);
    setSelectedApplicationId(null);
  };

  const handleEditApplication = (application) => {
    setEditingApplication(application);
    setIsModalOpen(true);
  };

  const handleApplicationSubmit = (formData) => {
    if (editingApplication) {
      updateApplication(editingApplication._id, formData);
      setEditingApplication(null);
      setIsModalOpen(false);
    } else {
      addApplication(formData);
    }
  };

  return (
    <section className="space-y-6 p-3">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          Applications
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          track and manage your job applications.
        </p>
      </header>

      <ApplicationToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {applications.length >= 0 && filteredApplications.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center rounded-lg border border-border bg-surface">
          <div className="text-center">
            <p className="text-sm font-medium text-text-primary">
              No applications found
            </p>

            <p className="mt-1 text-sm text-text-muted">
              {applications.length === 0
                ? "Add application and start tracking."
                : "Try a different search term."}
            </p>
          </div>
        </div>
      ) : (
        <KanbanBoard
          applications={filteredApplications}
          onApplicationClick={handleApplicationClick}
          onAdd={handleAddApplication}
          onStatusChange={handleStatusChange}
        />
      )}

      <ApplicationDetailsDrawer
        application={selectedApplication}
        onClose={() => setSelectedApplicationId(null)}
        onStatusChange={handleDrawerStatusChange}
        onEdit={() => handleEditApplication(selectedApplication)}
        onDelete={() => handleDeleteApplication(selectedApplicationId)}
      />

      <ApplicationModal
        isOpen={isModalOpen}
        application={selectedApplication}
        onClose={setIsModalOpen}
        onSubmit={handleApplicationSubmit}
      />
    </section>
  );
};

export default Applications;
