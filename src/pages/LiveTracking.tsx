import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Shield, Phone, MapPin, Share2, UserPlus, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
  const [sosDialogOpen, setSosDialogOpen] = useState(false);
  const [contactsDialogOpen, setContactsDialogOpen] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<{ name: string; phone: string }[]>(() => {
    const saved = localStorage.getItem("emergency_contacts");
    return saved ? JSON.parse(saved) : [];
  });
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
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

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      setDriverProgress(-1 + t);
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
      return lerp(dropoff, pickup, -0.4);
    }
    if (status === "en_route") {
      const approachStart: [number, number] = lerp(dropoff, pickup, -0.3);
      const t = Math.max(0, driverProgress + 1);
      return lerp(approachStart, pickup, t);
    }
    if (status === "arrived") {
      return pickup;
    }
    if (status === "trip_started") {
      return lerp(pickup, dropoff, Math.max(0, driverProgress));
    }
    return dropoff;
  })();

  const handleSOS = useCallback(() => {
    setSosDialogOpen(true);
  }, []);

  const triggerSOS = useCallback(() => {
    setSosTriggered(true);
    setSosDialogOpen(false);

    // Try to get current location and share
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const locationUrl = `https://www.google.com/maps?q=${lat},${lon}`;
          
          toast.error("🚨 SOS Alert Activated!", {
            description: `Location shared: ${locationUrl}`,
            duration: 10000,
          });

          // Try to call emergency number
          window.open("tel:112", "_self");
        },
        () => {
          toast.error("🚨 SOS Alert Activated!", {
            description: "Emergency services have been notified.",
            duration: 10000,
          });
          window.open("tel:112", "_self");
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      toast.error("🚨 SOS Alert Activated!", {
        description: "Emergency services notified.",
        duration: 10000,
      });
      window.open("tel:112", "_self");
    }
  }, []);

  const shareLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const url = `https://www.google.com/maps?q=${lat},${lon}`;
          const text = `🚨 I need help! My live location: ${url}`;
          
          if (navigator.share) {
            try {
              await navigator.share({ title: "SOS - SafeHerRide", text, url });
            } catch {
              await navigator.clipboard.writeText(text);
              toast.success("Location copied to clipboard!");
            }
          } else {
            await navigator.clipboard.writeText(text);
            toast.success("Location copied to clipboard!");
          }
        },
        () => toast.error("Unable to get location")
      );
    }
  }, []);

  const addEmergencyContact = useCallback(() => {
    if (!newContactName.trim() || !newContactPhone.trim()) {
      toast.error("Please enter both name and phone number");
      return;
    }
    const updated = [...emergencyContacts, { name: newContactName.trim(), phone: newContactPhone.trim() }];
    setEmergencyContacts(updated);
    localStorage.setItem("emergency_contacts", JSON.stringify(updated));
    setNewContactName("");
    setNewContactPhone("");
    toast.success(`${newContactName} added as emergency contact`);
  }, [newContactName, newContactPhone, emergencyContacts]);

  const removeContact = useCallback((idx: number) => {
    const updated = emergencyContacts.filter((_, i) => i !== idx);
    setEmergencyContacts(updated);
    localStorage.setItem("emergency_contacts", JSON.stringify(updated));
  }, [emergencyContacts]);

  const notifyEmergencyContacts = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const url = `https://www.google.com/maps?q=${lat},${lon}`;
          const text = `🚨 EMERGENCY! I need help. My location: ${url}`;

          for (const contact of emergencyContacts) {
            const smsLink = `sms:${contact.phone}?body=${encodeURIComponent(text)}`;
            window.open(smsLink, "_blank");
          }
          toast.success(`Alert sent to ${emergencyContacts.length} emergency contact(s)!`);
        },
        () => toast.error("Unable to get location")
      );
    }
  }, [emergencyContacts]);

  const showDriver = status !== "searching";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {/* Header with SOS at top-right */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/book")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground font-display">Live Tracking</h1>
          
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-xs"
              onClick={() => setContactsDialogOpen(true)}
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Contacts</span>
              {emergencyContacts.length > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {emergencyContacts.length}
                </span>
              )}
            </Button>
            <button
              onClick={handleSOS}
              disabled={sosTriggered}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold text-sm uppercase tracking-wider transition-all ${
                sosTriggered
                  ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                  : "bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95 animate-pulse"
              }`}
              style={!sosTriggered ? {
                boxShadow: "0 0 20px 4px rgba(220, 38, 38, 0.5), 0 0 40px 8px rgba(220, 38, 38, 0.2)",
                border: "2px solid rgba(255, 100, 100, 0.7)",
              } : {}}
            >
              <AlertTriangle className="h-5 w-5" />
              {sosTriggered ? "SOS Sent ✓" : "🚨 SOS"}
            </button>
          </div>
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

      {/* SOS Confirmation Dialog */}
      <Dialog open={sosDialogOpen} onOpenChange={setSosDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-destructive text-xl flex items-center justify-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Emergency SOS
            </DialogTitle>
            <DialogDescription className="text-center">
              This will call emergency services and notify your emergency contacts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Button
              className="w-full h-14 text-lg font-bold gap-3"
              variant="destructive"
              onClick={triggerSOS}
            >
              <Phone className="h-5 w-5" />
              Call 112 Emergency
            </Button>
            {emergencyContacts.length > 0 && (
              <Button
                variant="outline"
                className="w-full h-11 gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={notifyEmergencyContacts}
              >
                <Users className="h-4 w-4" />
                Alert {emergencyContacts.length} Emergency Contact{emergencyContacts.length > 1 ? "s" : ""}
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full h-11 gap-2"
              onClick={shareLocation}
            >
              <Share2 className="h-4 w-4" />
              Share My Location
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setSosDialogOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency Contacts Dialog */}
      <Dialog open={contactsDialogOpen} onOpenChange={setContactsDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Emergency Contacts
            </DialogTitle>
            <DialogDescription>
              Add trusted contacts who will be notified during an SOS emergency.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            {emergencyContacts.map((c, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.phone}</p>
                </div>
                <button onClick={() => removeContact(i)} className="text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="space-y-2 pt-2 border-t border-border">
              <Input
                placeholder="Contact name"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
              />
              <Input
                placeholder="Phone number"
                type="tel"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
              />
              <Button className="w-full gap-2" onClick={addEmergencyContact}>
                <UserPlus className="h-4 w-4" />
                Add Contact
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveTracking;
