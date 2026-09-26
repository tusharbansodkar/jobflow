import { createContext, useEffect, useState } from "react";
import axios from "axios";

const ApplicationContext = createContext(null);

const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://jobflow-8bka.onrender.com/applications")
      .then((response) => {
        setApplications(response.data.applications);
      })
      .catch((error) => console.log(error));
  }, []);

  const addApplication = async (applicationData) => {
    try {
      const response = await axios.post(
        "https://jobflow-8bka.onrender.com/applications/add",
        applicationData,
      );

      const newApplication = response.data.application;

      setApplications([...applications, newApplication]);

      console.log(response.data.message);
    } catch (error) {
      console.log("Failed to update application", error);
    }
  };

  const deleteApplication = async (applicationId) => {
    try {
      const response = await axios.delete(
        `https://jobflow-8bka.onrender.com/applications/delete/${applicationId}`,
      );

      const deletedApplication = response.data.deletedApplication;

      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) => application._id !== deletedApplication._id,
        ),
      );
    } catch (error) {
      console.log("Failed to delete application.", error);
    }
  };

  const updateApplication = async (applicationId, updates) => {
    try {
      const response = await axios.put(
        `https://jobflow-8bka.onrender.com/applications/update/${applicationId}`,
        updates,
      );

      const updatedApplication = response.data.application;

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          (application._id ?? application.id) === applicationId
            ? { ...application, ...updatedApplication }
            : application,
        ),
      );
    } catch (error) {
      console.error("Failed to update application:", error);
    }
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
