import { MapPin, Shield, Car, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MapPin,
    title: "Set Your Route",
    description: "Enter pickup & drop-off. We auto-detect your location and show route options.",
  },
  {
    icon: Shield,
    title: "Check Safety Score",
    description: "See your route's safety score. Get warnings and safer alternatives if needed.",
  },
  {
    icon: Car,
    title: "Ride with Confidence",
    description: "Verified driver assigned. Live tracking, SOS button, and guardian sharing active.",
  },
  {
    icon: CheckCircle,
    title: "Arrive Safely",
    description: "Rate your ride. Your feedback helps keep our safety scores accurate.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-primary">SafeHerRide</span> Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Four simple steps to a safer ride experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="relative inline-flex mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
