import { Check, Clock, MapPin, Navigation, Car } from "lucide-react";

export type RideStatus =
  | "searching"
  | "driver_assigned"
  | "en_route"
  | "arrived"
  | "trip_started"
  | "completed";

const STATUS_CONFIG: Record<RideStatus, { label: string; icon: typeof Check; color: string }> = {
  searching: { label: "Searching for driver…", icon: Clock, color: "text-accent" },
  driver_assigned: { label: "Driver assigned!", icon: Check, color: "text-safe" },
  en_route: { label: "Driver en route to you", icon: Car, color: "text-primary" },
  arrived: { label: "Driver has arrived", icon: MapPin, color: "text-safe" },
  trip_started: { label: "Trip in progress", icon: Navigation, color: "text-primary" },
  completed: { label: "Trip completed!", icon: Check, color: "text-safe" },
};

const ALL_STATUSES: RideStatus[] = [
  "searching",
  "driver_assigned",
  "en_route",
  "arrived",
  "trip_started",
  "completed",
];

interface RideStatusTimelineProps {
  currentStatus: RideStatus;
}

const RideStatusTimeline = ({ currentStatus }: RideStatusTimelineProps) => {
  const currentIdx = ALL_STATUSES.indexOf(currentStatus);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-1">
      {ALL_STATUSES.map((status, i) => {
        const config = STATUS_CONFIG[status];
        const Icon = config.icon;
        const isActive = i === currentIdx;
        const isDone = i < currentIdx;

        return (
          <div key={status} className="flex items-center gap-3 py-1.5">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                isDone
                  ? "bg-safe text-safe-foreground"
                  : isActive
                  ? "bg-primary text-primary-foreground animate-pulse"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isDone ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
            </div>
            <span
              className={`text-sm transition-colors ${
                isActive ? "font-semibold text-foreground" : isDone ? "text-muted-foreground line-through" : "text-muted-foreground/50"
              }`}
            >
              {config.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RideStatusTimeline;
