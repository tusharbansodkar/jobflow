import { BriefcaseBusiness, LayoutDashboard, Settings } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ApplicationContext } from "../../context/ApplicationContext";

const navigationItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    to: "/applications",
    icon: BriefcaseBusiness,
  },
];

const Sidebar = ({ isSidebarOpen, onToggle }) => {
  return (
    <>
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed lg:hidden inset-0 bg-black/30 backdrop-blur-xs z-40"
          onClick={onToggle}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 w-64 shrink-0 border-r border-border-strong bg-surface transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0 backdrop-blur-md z-50`}
      >
        <div className="flex flex-col h-screen">
          {/* Brand */}

          <div className="flex h-16 items-center justify-center border-b border-border">
            <span className="text-xl font-semibold tracking-tight text-primary">
              JobFlow
            </span>
          </div>

          {/* Navigation */}

          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  onClick={onToggle}
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "flex  items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary-subtle text-primary"
                        : "text-text-secondary hover:bg-surface-subtle hover:text-text-primary",
                    ].join(" ")
                  }
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Navigation */}

          <div className="border-t border-border-strong p-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary cursor-pointer"
            >
              <Settings className="size-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
