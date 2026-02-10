import { Shield, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const safetyStats = [
  { value: "50,000+", label: "Safe rides completed" },
  { value: "15+", label: "Verified female drivers" },
  { value: "92/100", label: "Avg. route safety score" },
  { value: "<30s", label: "SOS response time" },
];

const routeExamples = [
  { from: "Hitech City", to: "Gachibowli", score: 92, time: "Day & Night" },
  { from: "Jubilee Hills", to: "Banjara Hills", score: 95, time: "All hours" },
  { from: "Secunderabad", to: "Begumpet", score: 88, time: "Day & Night" },
  { from: "Kukatpally", to: "JNTU", score: 78, time: "Caution after 10 PM" },
  { from: "Madhapur", to: "Kondapur", score: 90, time: "All hours" },
  { from: "Ameerpet", to: "SR Nagar", score: 85, time: "Day & Night" },
];

const SafetySection = () => {
  return (
    <section id="safety" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Safety by the <span className="text-primary">numbers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every route is scored. Every driver verified. Every ride monitored.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {safetyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl bg-card border border-border"
            >
              <p className="text-3xl font-bold text-primary font-display">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Route Safety Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-xl font-semibold mb-6 text-center">
            <Shield className="inline w-5 h-5 text-primary mr-2" />
            Every Route Safety Scored — Hyderabad Examples
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routeExamples.map((route, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{route.from} → {route.to}</p>
                    <p className="text-xs text-muted-foreground">{route.time}</p>
                  </div>
                </div>
                <div className={`text-lg font-bold font-display ${route.score >= 85 ? 'text-safe' : 'text-warning'}`}>
                  {route.score}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SafetySection;
