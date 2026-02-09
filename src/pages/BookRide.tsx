import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
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
    toast.success("Searching for a driver…");
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
