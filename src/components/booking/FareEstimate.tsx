import { IndianRupee, Clock, Route } from "lucide-react";

interface FareEstimateProps {
  pickup: [number, number] | null;
  dropoff: [number, number] | null;
  vehicleType: "car" | "bike";
}

function haversineKm(a: [number, number], b: [number, number]): number {
  const toRad = (n: number) => (n * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

const FareEstimate = ({ pickup, dropoff, vehicleType }: FareEstimateProps) => {
  if (!pickup || !dropoff) return null;

  const distKm = haversineKm(pickup, dropoff);
  const ratePerKm = vehicleType === "car" ? 14 : 8;
  const baseFare = vehicleType === "car" ? 50 : 25;
  const fare = Math.round(baseFare + distKm * ratePerKm);
  const etaMin = Math.round((distKm / (vehicleType === "car" ? 35 : 30)) * 60);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Fare Estimate</h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="space-y-1">
          <Route className="h-4 w-4 mx-auto text-muted-foreground" />
          <div className="text-lg font-bold text-foreground">{distKm.toFixed(1)}</div>
          <div className="text-[10px] text-muted-foreground">km</div>
        </div>
        <div className="space-y-1">
          <Clock className="h-4 w-4 mx-auto text-muted-foreground" />
          <div className="text-lg font-bold text-foreground">{etaMin}</div>
          <div className="text-[10px] text-muted-foreground">min</div>
        </div>
        <div className="space-y-1">
          <IndianRupee className="h-4 w-4 mx-auto text-primary" />
          <div className="text-lg font-bold text-primary">₹{fare}</div>
          <div className="text-[10px] text-muted-foreground">est.</div>
        </div>
      </div>
    </div>
  );
};

export default FareEstimate;
