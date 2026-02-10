import { Shield, MapPin, AlertTriangle, Users, Car, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "Safety Score Engine",
    description: "Every route gets a real-time safety score based on time, area risk, and route type before you confirm.",
    details: {
      heading: "Route Safety Intelligence",
      content: "Our Safety Score Engine analyzes every route in real-time, scoring them 1-100 based on multiple factors:",
      examples: [
        { route: "Hitech City → Gachibowli", score: 92, risk: "Low", reason: "Well-lit, high traffic, commercial area" },
        { route: "Secunderabad → Begumpet", score: 88, risk: "Low", reason: "Main road, police checkpoints nearby" },
        { route: "Jubilee Hills → Banjara Hills", score: 95, risk: "Very Low", reason: "Premium residential, CCTV coverage" },
        { route: "Kukatpally → JNTU", score: 78, risk: "Medium", reason: "Some poorly lit stretches after 10 PM" },
        { route: "Uppal → Habsiguda", score: 70, risk: "Medium", reason: "Moderate traffic, limited street lights at night" },
        { route: "Old City → Charminar", score: 65, risk: "Medium-High", reason: "Narrow lanes, congested, limited monitoring" },
      ],
      factors: ["Time of day (night rides scored lower)", "Street lighting density", "Police station proximity", "Traffic density", "Historical incident data", "CCTV coverage in area"],
    },
  },
  {
    icon: Users,
    title: "Female Driver Preference",
    description: "Choose a female driver by default. Male drivers assigned only with your explicit permission.",
    details: {
      heading: "Female Driver Priority",
      content: "SafeHerRide prioritizes your comfort and safety by defaulting to female drivers:",
      examples: [],
      factors: ["Female driver toggle is ON by default", "All female drivers are background-verified", "Male drivers only assigned with explicit consent", "Driver gender shown before ride confirmation", "24/7 female driver availability across Hyderabad", "Special training for night-time rides"],
    },
  },
  {
    icon: AlertTriangle,
    title: "Instant SOS",
    description: "One-tap emergency button during any ride. Alerts our monitoring team and shares your live location.",
    details: {
      heading: "Emergency SOS System",
      content: "One tap sends an instant alert with your GPS location to multiple emergency contacts:",
      examples: [],
      factors: ["One-tap SOS button always visible during rides", "Automatic location sharing with police control room", "Alert sent to 3 emergency contacts simultaneously", "Audio recording begins automatically", "Admin monitoring team notified in real-time", "Auto-escalation if no response in 30 seconds"],
    },
  },
  {
    icon: MapPin,
    title: "Real-time Live Tracking",
    description: "Real-time driver tracking with speed monitoring, halt detection, and shareable trip links for guardians.",
    details: {
      heading: "Live GPS Tracking",
      content: "Track every aspect of your ride in real-time with our advanced monitoring system:",
      examples: [],
      factors: ["Live driver location on map updated every 3 seconds", "Speed monitoring with alerts for overspeeding", "Automatic halt detection with notifications", "Route deviation alerts sent to guardians", "ETA updates shared with emergency contacts", "Full trip history with route replay"],
    },
  },
  {
    icon: Car,
    title: "Verified Drivers",
    description: "Every driver is verified with license, vehicle documents, and government ID before approval.",
    details: {
      heading: "Driver Verification Process",
      content: "All SafeHerRide drivers go through a rigorous 5-step verification process:",
      examples: [
        { route: "Priya Sharma", score: 98, risk: "⭐ 4.9", reason: "Maruti Swift | MH 02 AB 1234 | 2,500+ rides" },
        { route: "Anjali Reddy", score: 96, risk: "⭐ 4.8", reason: "Hyundai i20 | TS 09 CD 5678 | 1,800+ rides" },
        { route: "Kavitha Rao", score: 97, risk: "⭐ 4.9", reason: "Honda Activa | TS 07 EF 9012 | 3,200+ rides" },
        { route: "Meena Devi", score: 94, risk: "⭐ 4.7", reason: "Maruti WagonR | TS 08 GH 3456 | 900+ rides" },
        { route: "Sunitha B", score: 95, risk: "⭐ 4.8", reason: "Toyota Etios | TS 10 IJ 7890 | 1,500+ rides" },
        { route: "Lakshmi K", score: 93, risk: "⭐ 4.7", reason: "Suzuki Access | TS 11 KL 2345 | 2,100+ rides" },
        { route: "Deepa Nair", score: 96, risk: "⭐ 4.8", reason: "Hyundai Venue | TS 12 MN 6789 | 1,200+ rides" },
        { route: "Fatima S", score: 92, risk: "⭐ 4.6", reason: "Maruti Ertiga | TS 13 OP 0123 | 750+ rides" },
        { route: "Swathi G", score: 97, risk: "⭐ 4.9", reason: "Honda City | TS 14 QR 4567 | 2,800+ rides" },
        { route: "Radha M", score: 95, risk: "⭐ 4.8", reason: "Bajaj Pulsar | TS 15 ST 8901 | 1,600+ rides" },
        { route: "Pooja T", score: 94, risk: "⭐ 4.7", reason: "Tata Nexon | TS 16 UV 2345 | 1,100+ rides" },
        { route: "Bhavani L", score: 96, risk: "⭐ 4.8", reason: "Maruti Baleno | TS 17 WX 6789 | 1,900+ rides" },
        { route: "Divya R", score: 93, risk: "⭐ 4.7", reason: "TVS Jupiter | TS 18 YZ 0123 | 2,400+ rides" },
        { route: "Sarita K", score: 91, risk: "⭐ 4.6", reason: "Hyundai Creta | TS 19 AB 4567 | 680+ rides" },
        { route: "Nandini P", score: 95, risk: "⭐ 4.8", reason: "Maruti Dzire | TS 20 CD 8901 | 3,500+ rides" },
      ],
      factors: ["Government ID verification (Aadhaar/PAN)", "Driving license validation", "Vehicle RC book check", "Vehicle fitness certificate", "Criminal background check", "Mandatory safety training program", "Periodic re-verification every 6 months"],
    },
  },
  {
    icon: Phone,
    title: "Guardian Sharing",
    description: "Share your live trip with family or friends. They can track you on a map in real-time.",
    details: {
      heading: "Guardian Live Tracking",
      content: "Keep your loved ones informed with one-tap trip sharing:",
      examples: [],
      factors: ["Share trip link via WhatsApp, SMS or any app", "Guardian sees live map with driver location", "Auto-share option for night rides (8 PM - 6 AM)", "Trip details: driver name, vehicle, route displayed", "Guardian gets arrival notification", "No app needed for guardian — works in browser"],
    },
  },
];

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Safety isn't a feature.{" "}
            <span className="text-primary">It's everything.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every part of SafeHerRide is designed around one principle: your safety comes first, always. Click any feature to learn more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedFeature(feature)}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              <p className="text-xs text-primary mt-3 font-medium group-hover:underline">Click to learn more →</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedFeature && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <selectedFeature.icon className="w-5 h-5 text-primary" />
                  </div>
                  {selectedFeature.details.heading}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {selectedFeature.details.content}
                </DialogDescription>
              </DialogHeader>

              {selectedFeature.details.examples.length > 0 && (
                <div className="space-y-2 mt-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    {selectedFeature.title === "Verified Drivers" ? "Verified Drivers on Platform" : "Route Examples"}
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedFeature.details.examples.map((ex, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                        <div>
                          <p className="text-sm font-medium text-foreground">{ex.route}</p>
                          <p className="text-xs text-muted-foreground">{ex.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-safe">{selectedFeature.title === "Verified Drivers" ? ex.risk : `${ex.score}/100`}</p>
                          {selectedFeature.title !== "Verified Drivers" && (
                            <p className="text-xs text-muted-foreground">{ex.risk} Risk</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3">
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
                <ul className="space-y-1.5">
                  {selectedFeature.details.factors.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link to="/book">Book a Safe Ride Now</Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturesSection;
