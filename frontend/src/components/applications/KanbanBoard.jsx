import { APPLICATION_STATUSES } from "../../data/applicationStatuses";
import { DndContext } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({
  applications,
  onApplicationClick,
  onAdd,
  onStatusChange,
}) => {
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const applicationId = active.id;
    const newStatus = over.id;

    onStatusChange(applicationId, newStatus);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="mt-4 pb-4 overflow-x-auto">
        <div className="flex min-h-[calc(100vh-220px)] gap-4">
          {APPLICATION_STATUSES.map((status) => {
            const statusApplications = applications.filter(
              (application) => application.status === status.id,
            );

            if (!statusApplications.length) return null;

            return (
              <KanbanColumn
                key={status.id}
                status={status}
                applications={statusApplications}
                onApplicationClick={onApplicationClick}
                onAdd={onAdd}
              />
            );
          })}
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
