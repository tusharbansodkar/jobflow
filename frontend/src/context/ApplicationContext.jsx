import { createContext, useEffect, useRef, useState } from "react";
import { showToast } from "../utils/toast";
import axios from "axios";

const ApplicationContext = createContext(null);

const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toastId = useRef(null);

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
      toastId.current = showToast.loading("Saving application...");

      const response = await axios.post(
        "https://jobflow-8bka.onrender.com/applications/add",
        applicationData,
      );

      const newApplication = response.data.application;
      setApplications([...applications, newApplication]);

      setIsModalOpen(false);

      showToast.success(toastId.current, response.data.message);
    } catch (error) {
      console.log("Failed to update application.", error);

      showToast.error(toastId.current, response.data.message);
    }
  };

  const deleteApplication = async (applicationId) => {
    try {
      toastId.current = showToast.loading("Deleting application...");

      const response = await axios.delete(
        `https://jobflow-8bka.onrender.com/applications/delete/${applicationId}`,
      );

      const deletedApplication = response.data.deletedApplication;

      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) => application._id !== deletedApplication._id,
        ),
      );

      showToast.success(toastId.current, response.data.message);
    } catch (error) {
      console.log("Failed to delete application.", error);
      showToast.error(toastId.current, response.data.message);
    }
  };

  const updateApplication = async (applicationId, updates) => {
    toastId.current = showToast.loading("Updating application...");

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

      showToast.success(toastId.current, response.data.message);
    } catch (error) {
      console.error("Failed to update application:", error);
      showToast.error(toastId.current, response.data.message);
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
