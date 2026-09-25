import { Plus, Menu, X } from "lucide-react";
import ApplicationModal from "../applications/ApplicationModal";
import useApplications from "../../hooks/useApplications";

const Header = ({ isSidebarOpen, onToggle }) => {
  const { addApplication, isModalOpen, setIsModalOpen } = useApplications();

  const handleApplicationSubmit = (formData) => {
    addApplication(formData);
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border-strong bg-surface">
        <div className="flex h-16 items-center justify-between lg:justify-end gap-4 px-4 sm:px-6 lg:px-8">
          <button
            className="lg:hidden p-2 hover:bg-primary-subtle text-primary cursor-pointer rounded-sm"
            onClick={onToggle}
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {/* Add application button */}

          <button
            type="button"
            className="inline-flex h-9 shrink items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-white transition hover:bg-primary-hover active:scale-95 cursor-pointer"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add Application</span>
          </button>
        </div>
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleApplicationSubmit}
        />
      </header>
    </>
  );
};

export default Header;
