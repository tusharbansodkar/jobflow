import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import ApplicationCard from "./ApplicationCard";
import { STATUS_STYLES } from "../../constants/statusStyles";

const KanbanColumn = ({ status, applications, onApplicationClick, onAdd }) => {
  const { isOver, setNodeRef } = useDroppable({ id: status.id });
  const styles = STATUS_STYLES[status.id];

  return (
    <section
      className={`flex w-75 shrink-0 flex-col rounded-xl ${styles.badge} p-3 ${isOver ? "bg-primary-subtle" : ""}`}
      ref={setNodeRef}
    >
      <header className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <span className={`size-2 rounded-full ${styles.dot}`}></span>
          <h2 className="text-sm font-semibold text-text-primary">
            {status.label}
          </h2>
          <span className="text-xs font-medium text-text-muted">
            {applications.length}
          </span>
        </div>

        <button
          type="button"
          className="rounded-md p-1.5 text-text-muted transition hover:bg-surface hover:text-text-primary cursor-pointer"
          onClick={onAdd}
        >
          <Plus className="size-4" />
        </button>
      </header>

      {/* cards */}

      <div className="min-h-24 space-y-3">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onClick={() => onApplicationClick(application)}
          />
        ))}
      </div>
    </section>
  );
};

export default KanbanColumn;
