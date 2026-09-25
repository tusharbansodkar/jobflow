import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

const AppShell = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(ApplicationContext);
  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
