import { Link } from "react-router-dom";
import { Shield, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Safety-First Ride Hailing
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Every ride,{" "}
              <span className="text-primary">safer</span>{" "}
              than the last
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              SafeHerRide combines real-time safety intelligence, verified drivers,
              and an instant SOS system to make every journey secure and comfortable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" asChild className="text-base px-8 h-12 animate-pulse-glow">
                <Link to="/book">Book a Ride</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 h-12">
                <Link to="/auth?tab=signup&role=driver">Drive with Us</Link>
              </Button>
            </div>

            <div className="flex gap-8">
              {[
                { icon: Shield, label: "Safety Score", value: "Every Route" },
                { icon: MapPin, label: "Live Tracking", value: "Real-time" },
                { icon: Star, label: "Verified", value: "All Drivers" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Phone mockup */}
              <div className="w-[320px] mx-auto bg-card rounded-[2.5rem] border-4 border-foreground/10 shadow-2xl overflow-hidden">
                <div className="p-6 pt-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-safe flex items-center justify-center">
                      <Shield className="w-5 h-5 text-safe-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm">Safety Score</p>
                      <p className="text-2xl font-bold text-safe">92/100</p>
                    </div>
                  </div>
                  <div className="h-48 rounded-xl bg-muted mb-4 flex items-center justify-center overflow-hidden">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 rounded-full bg-muted w-3/4" />
                    <div className="h-3 rounded-full bg-muted w-1/2" />
                    <div className="h-10 rounded-lg bg-primary mt-4" />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 top-24 bg-card border border-border rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-safe/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-safe" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Route Verified</p>
                    <p className="text-xs text-muted-foreground">Safe & Populated</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
