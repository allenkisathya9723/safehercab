import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackingMap from "@/components/tracking/TrackingMap";
import DriverInfoCard, { type DriverInfo } from "@/components/tracking/DriverInfoCard";
import RideStatusTimeline, { type RideStatus } from "@/components/tracking/RideStatusTimeline";
import { toast } from "sonner";

// Default demo coordinates (Mumbai area)
const DEFAULT_PICKUP: [number, number] = [19.076, 72.8777];
const DEFAULT_DROPOFF: [number, number] = [19.0288, 72.8544];

const MOCK_DRIVER: DriverInfo = {
  name: "Priya Sharma",
  rating: 4.8,
  vehicle: "Maruti Swift",
  vehicleType: "car",
  plate: "MH 02 AB 1234",
  photo: "",
};

const STATUS_SEQUENCE: RideStatus[] = [
  "searching",
  "driver_assigned",
  "en_route",
  "arrived",
  "trip_started",
  "completed",
];

// Durations in ms for each status before advancing
const STATUS_DURATIONS: Record<RideStatus, number> = {
  searching: 3000,
  driver_assigned: 2000,
  en_route: 4000,
  arrived: 3000,
  trip_started: 8000,
  completed: 999999,
};

function lerp(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

const LiveTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pickup: [number, number] = (() => {
    const lat = parseFloat(searchParams.get("plat") || "");
    const lon = parseFloat(searchParams.get("plon") || "");
    return isNaN(lat) || isNaN(lon) ? DEFAULT_PICKUP : [lat, lon];
  })();

  const dropoff: [number, number] = (() => {
    const lat = parseFloat(searchParams.get("dlat") || "");
    const lon = parseFloat(searchParams.get("dlon") || "");
    return isNaN(lat) || isNaN(lon) ? DEFAULT_DROPOFF : [lat, lon];
  })();

  const [status, setStatus] = useState<RideStatus>("searching");
  const [driverProgress, setDriverProgress] = useState(0);
  const [sosTriggered, setSosTriggered] = useState(false);
  const animFrameRef = useRef<number>();
  const statusIdxRef = useRef(0);

  // Auto-advance statuses
  useEffect(() => {
    if (status === "completed") return;
    const timer = setTimeout(() => {
      const nextIdx = statusIdxRef.current + 1;
      if (nextIdx < STATUS_SEQUENCE.length) {
        statusIdxRef.current = nextIdx;
        setStatus(STATUS_SEQUENCE[nextIdx]);
      }
    }, STATUS_DURATIONS[status]);
    return () => clearTimeout(timer);
  }, [status]);

  // Simulate driver movement during trip_started
  useEffect(() => {
    if (status !== "trip_started") return;
    let start: number | null = null;
    const duration = STATUS_DURATIONS.trip_started;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      setDriverProgress(t);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [status]);

  // Driver approaching pickup during en_route
  useEffect(() => {
    if (status !== "en_route") return;
    let start: number | null = null;
    const duration = STATUS_DURATIONS.en_route;
    const approachStart: [number, number] = lerp(dropoff, pickup, -0.3); // start from behind pickup

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      setDriverProgress(-1 + t); // negative indicates approach phase
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [status]);

  const driverPosition: [number, number] = (() => {
    if (status === "searching" || status === "driver_assigned") {
      // Driver far from pickup
      return lerp(dropoff, pickup, -0.4);
    }
    if (status === "en_route") {
      // Approaching pickup
      const approachStart: [number, number] = lerp(dropoff, pickup, -0.3);
      const t = Math.max(0, driverProgress + 1); // -1..0 mapped to 0..1
      return lerp(approachStart, pickup, t);
    }
    if (status === "arrived") {
      return pickup;
    }
    if (status === "trip_started") {
      return lerp(pickup, dropoff, Math.max(0, driverProgress));
    }
    return dropoff; // completed
  })();

  const handleSOS = useCallback(() => {
    setSosTriggered(true);
    toast.error("🚨 SOS Alert sent! Emergency services notified.", {
      duration: 5000,
    });
  }, []);

  const showDriver = status !== "searching";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/book")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground font-display">Live Tracking</h1>
          <Shield className="ml-auto h-5 w-5 text-primary" />
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_400px]">
        {/* Map */}
        <div className="h-[50vh] lg:h-full relative">
          <TrackingMap
            pickup={pickup}
            dropoff={dropoff}
            driverPosition={driverPosition}
            progress={driverProgress}
          />

          {/* SOS Button */}
          {status !== "completed" && status !== "searching" && (
            <button
              onClick={handleSOS}
              disabled={sosTriggered}
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-lg transition-all ${
                sosTriggered
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-destructive text-destructive-foreground hover:scale-105 animate-pulse-glow"
              }`}
            >
              <AlertTriangle className="h-5 w-5" />
              {sosTriggered ? "SOS Sent" : "SOS Emergency"}
            </button>
          )}
        </div>

        {/* Info Panel */}
        <div className="border-t lg:border-t-0 lg:border-l border-border p-4 space-y-4 overflow-y-auto">
          {/* Status Timeline */}
          <RideStatusTimeline currentStatus={status} />

          {/* Driver Info */}
          {showDriver && <DriverInfoCard driver={MOCK_DRIVER} />}

          {/* ETA */}
          {status === "trip_started" && (
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Estimated Arrival</p>
              <p className="text-2xl font-bold text-foreground font-display mt-1">
                {Math.max(1, Math.round((1 - driverProgress) * 15))} min
              </p>
            </div>
          )}

          {/* Completed */}
          {status === "completed" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-safe/30 bg-safe/10 p-4 text-center">
                <p className="text-safe font-semibold">You've arrived safely! 🎉</p>
              </div>
              <Button className="w-full" onClick={() => navigate("/book")}>
                Book Another Ride
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
