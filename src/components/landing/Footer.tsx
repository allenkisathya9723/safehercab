import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">
              Safe<span className="text-primary">Her</span>Ride
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/book" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Book a Ride</Link>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SafeHerRide. Safety first, always.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
