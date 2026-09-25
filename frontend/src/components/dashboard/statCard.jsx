import {
  BriefcaseBusiness,
  CircleCheck,
  MessageSquare,
  Send,
} from "lucide-react";

const ICONS = {
  application: Send,
  active: BriefcaseBusiness,
  interview: MessageSquare,
  offer: CircleCheck,
};

const ICON_STYLES = {
  application: "bg-primary-subtle text-primary",
  active: "bg-info-subtle text-info",
  interview: "bg-info-subtle text-status-interview",
  offer: "bg-success-subtle text-success",
};

const StatCard = ({ title, value, type }) => {
  const Icon = ICONS[type];

  return (
    <div className="rounded-lg border border-border-strong bg-surface p-5 transition-shadow duration-200 hover:shadow-card">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-text-secondary">{title}</p>

        <div className={`rounded-md p-2 ${ICON_STYLES[type]}`}>
          <Icon size={18} />
        </div>
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
