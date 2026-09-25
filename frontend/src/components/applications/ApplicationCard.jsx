import { CalendarDays, ExternalLink, GripVertical, MapPin } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

const ApplicationCard = ({ application, onClick }) => {
  const { company, position, location, jobUrl, applicationDate } = application;

  const { attributes, setNodeRef, listeners, transform, isDragging } =
    useDraggable({ id: application.id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <article
      onClick={onClick}
      className={`group rounded-lg cursor-pointer border border-border bg-surface p-4 shadow-card transition hover:border-border-strong hover:shadow-sm ${isDragging ? "opacity-70 ring-2 ring-primary/20" : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-text-primary">
            {company}
          </h3>

          <p className="mt-1 text-sm text-text-secondary">{position}</p>
        </div>

        <a
          href={jobUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="shrink-0 rounded-md p-1.5 text-text-muted opacity-0 transition hover:bg-surface-subtle hover:text-text-primary group-hover:opacity-100"
          aria-label={`Open ${company} job posting`}
        >
          <ExternalLink className="size-4" />
        </a>

        <button
          type="button"
          className="cursor-grab rounded-md p-1.5 text-text-muted opacity-0 transition hover:bg-surface-subtle hover:text-text-primary group-hover:opacity-100"
          {...listeners}
          {...attributes}
          onClick={(event) => event.stopPropagation()}
        >
          <GripVertical className="size-4" />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-text-muted text-xs">
          <MapPin className="size-3.5" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 text-text-muted text-xs">
          <CalendarDays className="size-3.5" />
          <span>{applicationDate}</span>
        </div>
      </div>
    </article>
  );
};

export default ApplicationCard;
