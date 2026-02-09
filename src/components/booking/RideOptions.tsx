import { Car, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type VehicleType = "car" | "bike";
type RoutePreference = "fastest" | "safest" | "balanced";

interface RideOptionsProps {
  vehicleType: VehicleType;
  onVehicleChange: (v: VehicleType) => void;
  femaleOnly: boolean;
  onFemaleOnlyChange: (v: boolean) => void;
  routePref: RoutePreference;
  onRoutePrefChange: (v: RoutePreference) => void;
}

const RideOptions = ({
  vehicleType,
  onVehicleChange,
  femaleOnly,
  onFemaleOnlyChange,
  routePref,
  onRoutePrefChange,
}: RideOptionsProps) => {
  const routeOptions: { value: RoutePreference; label: string; desc: string }[] = [
    { value: "fastest", label: "Fastest", desc: "Shortest time" },
    { value: "safest", label: "Safest", desc: "Well-lit roads" },
    { value: "balanced", label: "Balanced", desc: "Best of both" },
  ];

  return (
    <div className="space-y-5">
      {/* Vehicle Type */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Vehicle Type</label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={vehicleType === "car" ? "default" : "outline"}
            className="h-16 flex-col gap-1"
            onClick={() => onVehicleChange("car")}
          >
            <Car className="h-5 w-5" />
            <span className="text-xs">Car</span>
          </Button>
          <Button
            variant={vehicleType === "bike" ? "default" : "outline"}
            className="h-16 flex-col gap-1"
            onClick={() => onVehicleChange("bike")}
          >
            <Bike className="h-5 w-5" />
            <span className="text-xs">Bike</span>
          </Button>
        </div>
      </div>

      {/* Female Driver Preference */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
        <Label htmlFor="female-driver" className="text-sm cursor-pointer">
          Female Driver Only
        </Label>
        <Switch id="female-driver" checked={femaleOnly} onCheckedChange={onFemaleOnlyChange} />
      </div>

      {/* Route Preference */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Route Preference</label>
        <div className="grid grid-cols-3 gap-2">
          {routeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onRoutePrefChange(opt.value)}
              className={`p-3 rounded-lg border text-center transition-all ${
                routePref === opt.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              <div className="text-xs font-semibold">{opt.label}</div>
              <div className="text-[10px] mt-0.5 opacity-70">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RideOptions;
