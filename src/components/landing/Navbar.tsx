import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Safe<span className="text-primary">Her</span>Ride
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Safety</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Button asChild>
              <Link to="/book">Book a Ride</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth?tab=signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-background"
          >
            <div className="container py-4 flex flex-col gap-3">
              <a href="#features" className="text-sm py-2" onClick={() => setMobileOpen(false)}>Features</a>
              <a href="#safety" className="text-sm py-2" onClick={() => setMobileOpen(false)}>Safety</a>
              <a href="#how-it-works" className="text-sm py-2" onClick={() => setMobileOpen(false)}>How it Works</a>
              <Link to="/admin" className="text-sm py-2" onClick={() => setMobileOpen(false)}>Admin Portal</Link>
              <div className="flex gap-3 pt-2">
                {user ? (
                  <Button asChild className="flex-1">
                    <Link to="/book">Book a Ride</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="flex-1">
                      <Link to="/auth">Log In</Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link to="/auth?tab=signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
