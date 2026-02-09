import { Star, Phone, MessageSquare, Car, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DriverInfo {
  name: string;
  rating: number;
  vehicle: string;
  vehicleType: "car" | "bike";
  plate: string;
  photo: string;
}

interface DriverInfoCardProps {
  driver: DriverInfo;
}

const DriverInfoCard = ({ driver }: DriverInfoCardProps) => {
  const VehicleIcon = driver.vehicleType === "car" ? Car : Bike;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-primary font-display shrink-0">
          {driver.name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{driver.name}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-sm text-muted-foreground">{driver.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <VehicleIcon className="h-3.5 w-3.5" />
            <span>{driver.vehicle}</span>
            <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">{driver.plate}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DriverInfoCard;
