import { ArrowDownUp, Filter, Plus, Search, ChevronDown } from "lucide-react";
import { APPLICATION_STATUSES } from "../../data/applicationStatuses";
import { useState } from "react";

const SORT_OPTIONS = [
  {
    value: "newest",
    label: "Newest first",
  },
  {
    value: "oldest",
    label: "Oldest first",
  },
  {
    value: "companyAsc",
    label: "Company A → Z",
  },
  {
    value: "companyDesc",
    label: "Company Z → A",
  },
];

const ApplicationToolbar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-strong bg-surface p-3 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-3 px-3 h-9 min-w-0 rounded-md border border-border bg-surface-subtle transition focus-within:border-primary focus-within:ring-2 ring-border">
        <Search className="size-5" />
        <input
          type="search"
          placeholder="Search applications..."
          className=" w-full text-sm text-text-primary outline-none  placeholder:text-text-muted "
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <div className="relative ">
          <button
            type="button"
            className="inline-flex items-center h-9 gap-2 rounded-md border border-border-strong bg-surface px-3 text-sm font-medium text-text-secondary transition hover:bg-surface-subtle hover:text-text-primary cursor-pointer"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            <Filter className="size-4" />
            <span>Filter</span>

            <ChevronDown
              className={`size-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 z-20 w-48 rounded-lg bg-surface border border-border p-1 shadow-lg ">
              <button
                type="button"
                onClick={() => {
                  onStatusFilterChange("all");
                  setIsFilterOpen(false);
                }}
                className={`w-full mb-0.5 rounded-md px-3 py-2 text-left text-sm ${
                  statusFilter === "all"
                    ? "bg-primary-subtle text-primary"
                    : "text-text-secondary hover:bg-surface-subtle"
                }`}
              >
                All applictions
              </button>

              {APPLICATION_STATUSES.map((status) => (
                <button
                  type="button"
                  onClick={() => {
                    onStatusFilterChange(status.id);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full mb-0.5 rounded-md px-3 py-2 text-left text-sm ${
                    statusFilter === status.id
                      ? "bg-primary-subtle text-primary"
                      : "text-text-secondary hover:bg-surface-subtle"
                  }   `}
                >
                  {status.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center h-9 gap-2 rounded-md border border-border-strong bg-surface px-3 text-sm font-medium text-text-secondary transition hover:bg-surface-subtle hover:text-text-primary cursor-pointer"
            onClick={() => setIsSortOpen((prev) => !prev)}
          >
            <ArrowDownUp className="size-4" />
            <span>Sort</span>
            <ChevronDown
              className={`size-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 z-20 w-48 rounded-lg bg-surface border border-border p-1 shadow-lg ">
              {SORT_OPTIONS.map((option) => (
                <button
                  type="button"
                  onClick={() => {
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }}
                  className={`w-full mb-0.5 rounded-md px-3 py-2 text-left text-sm ${
                    sortOption === option.value
                      ? "bg-primary-subtle text-primary"
                      : "text-text-secondary hover:bg-surface-subtle"
                  }   `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationToolbar;
