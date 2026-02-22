import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationInput from "@/components/booking/LocationInput";
import BookingMap from "@/components/booking/BookingMap";
import RideOptions from "@/components/booking/RideOptions";
import FareEstimate from "@/components/booking/FareEstimate";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const BookRide = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pickupText, setPickupText] = useState("");
  const [dropoffText, setDropoffText] = useState("");
  const [pickup, setPickup] = useState<[number, number] | null>(null);
  const [dropoff, setDropoff] = useState<[number, number] | null>(null);
  const [vehicleType, setVehicleType] = useState<"car" | "bike">("car");
  const [femaleOnly, setFemaleOnly] = useState(true);
  const [routePref, setRoutePref] = useState<"fastest" | "safest" | "balanced">("safest");
  const [locating, setLocating] = useState(false);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setPickup([lat, lon]);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
          const data = await res.json();
          setPickupText(data.display_name?.split(",").slice(0, 3).join(",") || "My Location");
        } catch {
          setPickupText("My Location");
        }
        setLocating(false);
        toast.success("Location detected!");
      },
      () => {
        toast.error("Unable to get your location. Please allow location access.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Auto-detect location on mount
  useEffect(() => {
    if (!pickup) useMyLocation();
  }, []);

  const handleConfirm = () => {
    if (!user) {
      toast.error("Please sign in to book a ride");
      navigate("/auth");
      return;
    }
    if (!pickup || !dropoff) {
      toast.error("Please set both pickup and drop-off locations");
      return;
    }
    navigate(`/tracking?plat=${pickup[0]}&plon=${pickup[1]}&dlat=${dropoff[0]}&dlon=${dropoff[1]}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground font-['Space_Grotesk']">Book a Ride</h1>
          <Shield className="ml-auto h-5 w-5 text-primary" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 lg:grid lg:grid-cols-[1fr_420px] lg:gap-6">
        {/* Map */}
        <div className="h-[45vh] lg:h-[calc(100vh-80px)] lg:sticky lg:top-[65px] rounded-xl overflow-hidden mb-4 lg:mb-0">
          <BookingMap pickup={pickup} dropoff={dropoff} />
        </div>

        {/* Sidebar */}
        <div className="space-y-5 pb-8">
          {/* Locations */}
          <div className="space-y-3">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <LocationInput
                  label="Pickup"
                  placeholder="Search pickup location…"
                  value={pickupText}
                  icon="pickup"
                  onChange={(text, lat, lon) => {
                    setPickupText(text);
                    setPickup([lat, lon]);
                  }}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={useMyLocation}
                disabled={locating}
                title="Use my location"
              >
                <LocateFixed className={`h-4 w-4 ${locating ? "animate-spin" : ""}`} />
              </Button>
            </div>
            <LocationInput
              label="Drop-off"
              placeholder="Where are you going?"
              value={dropoffText}
              icon="dropoff"
              onChange={(text, lat, lon) => {
                setDropoffText(text);
                setDropoff([lat, lon]);
              }}
            />
          </div>

          {/* Options */}
          <RideOptions
            vehicleType={vehicleType}
            onVehicleChange={setVehicleType}
            femaleOnly={femaleOnly}
            onFemaleOnlyChange={setFemaleOnly}
            routePref={routePref}
            onRoutePrefChange={setRoutePref}
          />

          {/* Fare */}
          <FareEstimate pickup={pickup} dropoff={dropoff} vehicleType={vehicleType} />

          {/* Confirm */}
          <Button
            className="w-full h-12 text-base font-semibold"
            disabled={!pickup || !dropoff}
            onClick={handleConfirm}
          >
            Confirm Ride
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
