import { Shield, MapPin, AlertTriangle, Users, Car, Phone } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Safety Score Engine",
    description: "Every route gets a real-time safety score based on time, area risk, and route type before you confirm.",
  },
  {
    icon: Users,
    title: "Female Driver Preference",
    description: "Choose a female driver by default. Male drivers assigned only with your explicit permission.",
  },
  {
    icon: AlertTriangle,
    title: "Instant SOS",
    description: "One-tap emergency button during any ride. Alerts our monitoring team and shares your live location.",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Real-time driver tracking with speed monitoring, halt detection, and shareable trip links for guardians.",
  },
  {
    icon: Car,
    title: "Verified Drivers",
    description: "Every driver is verified with license, vehicle documents, and government ID before approval.",
  },
  {
    icon: Phone,
    title: "Guardian Sharing",
    description: "Share your live trip with family or friends. They can track you on a map in real-time.",
  },
];

const FeaturesSection = () => {
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
            Every part of SafeHerRide is designed around one principle: your safety comes first, always.
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
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
