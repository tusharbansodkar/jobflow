import { createContext, useState } from "react";
import { mockApplications } from "../data/mockApplications";

const ApplicationContext = createContext(null);

const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(mockApplications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addApplication = (applicationData) => {
    const newApplication = {
      id: crypto.randomUUID(),
      ...applicationData,
    };

    setApplications((currentApplications) => [
      newApplication,
      ...currentApplications,
    ]);
  };

  const deleteApplication = (applicationId) => {
    const updatedApplications = applications.filter(
      (application) => application.id !== applicationId,
    );

    setApplications(updatedApplications);
  };

  const updateApplication = (applicationId, updates) => {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === applicationId
          ? { ...application, ...updates }
          : application,
      ),
    );
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    updateApplication(applicationId, {
      status: newStatus,
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const value = {
    applications,
    addApplication,
    deleteApplication,
    updateApplication,
    updateApplicationStatus,
    isModalOpen,
    setIsModalOpen,
    isSidebarOpen,
    toggleSidebar,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
export { ApplicationContext, ApplicationProvider };
