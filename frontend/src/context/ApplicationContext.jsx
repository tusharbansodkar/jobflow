import { createContext, useEffect, useState } from "react";
import { mockApplications } from "../data/mockApplications";
import axios from "axios";

const ApplicationContext = createContext(null);

const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/applications")
      .then((response) => {
        setApplications(response.data.applications);
      })
      .catch((error) => console.log(error));
  }, []);

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

  const updateApplication = async (applicationId, updates) => {
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
