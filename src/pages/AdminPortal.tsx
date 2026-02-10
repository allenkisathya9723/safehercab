import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, CheckCircle, XCircle, Clock, Users, AlertTriangle, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DriverProfile {
  id: string;
  user_id: string;
  vehicle_type: string;
  gender: string | null;
  approval_status: string;
  is_available: boolean;
  night_rides: boolean;
  license_url: string | null;
  rc_book_url: string | null;
  vehicle_photo_url: string | null;
  govt_id_url: string | null;
  created_at: string;
}

const AdminPortal = () => {
  const navigate = useNavigate();
  const { user, roles } = useAuth();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState<DriverProfile[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected" | "sos">("pending");

  // Check if user is admin
  useEffect(() => {
    if (user && roles.includes("admin")) {
      setIsAdminLoggedIn(true);
      fetchDrivers();
    }
  }, [user, roles]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });
      if (error) {
        toast.error("Invalid admin credentials");
      }
      // The useEffect will handle checking admin role
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from("driver_profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setDrivers(data);
      if (error) console.error("Error fetching drivers:", error);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const updateDriverStatus = async (driverId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("driver_profiles")
        .update({ approval_status: status })
        .eq("id", driverId);
      if (error) {
        toast.error("Failed to update driver status");
      } else {
        toast.success(`Driver ${status === "approved" ? "approved" : "rejected"} successfully`);
        fetchDrivers();
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const filteredDrivers = drivers.filter(d => {
    if (activeTab === "pending") return d.approval_status === "pending";
    if (activeTab === "approved") return d.approval_status === "approved";
    if (activeTab === "rejected") return d.approval_status === "rejected";
    return true;
  });

  // Mock SOS alerts for demo
  const mockSOSAlerts = [
    { id: 1, rider: "Sneha K.", location: "Madhapur → Gachibowli", time: "2 min ago", status: "active" },
    { id: 2, rider: "Priyanka M.", location: "Ameerpet → SR Nagar", time: "15 min ago", status: "resolved" },
    { id: 3, rider: "Divya R.", location: "Kukatpally → JNTU", time: "1 hr ago", status: "resolved" },
  ];

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>

          <Card className="border-border/50 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="font-display text-2xl">Admin Portal</CardTitle>
              <p className="text-sm text-muted-foreground">Sign in with your admin credentials</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@safeherride.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In as Admin"}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Only authorized admin accounts can access this portal.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Shield className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground font-display">Admin Dashboard</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Users, label: "Total Drivers", value: drivers.length, color: "text-primary" },
            { icon: Clock, label: "Pending", value: drivers.filter(d => d.approval_status === "pending").length, color: "text-warning" },
            { icon: CheckCircle, label: "Approved", value: drivers.filter(d => d.approval_status === "approved").length, color: "text-safe" },
            { icon: AlertTriangle, label: "SOS Alerts", value: mockSOSAlerts.filter(a => a.status === "active").length, color: "text-destructive" },
          ].map(stat => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold font-display">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(["pending", "approved", "rejected", "sos"] as const).map(tab => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab === "sos" ? "SOS Alerts" : `${tab} Drivers`}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "sos" ? (
          <div className="space-y-3">
            <h3 className="font-display text-lg font-semibold">SOS Emergency Alerts</h3>
            {mockSOSAlerts.map(alert => (
              <Card key={alert.id} className={alert.status === "active" ? "border-destructive" : ""}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${alert.status === "active" ? "text-destructive animate-pulse" : "text-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium">{alert.rider}</p>
                      <p className="text-xs text-muted-foreground">{alert.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.status === "active" ? "bg-destructive/10 text-destructive" : "bg-safe/10 text-safe"
                    }`}>
                      {alert.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-display text-lg font-semibold">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Drivers ({filteredDrivers.length})
            </h3>
            {filteredDrivers.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <Car className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No {activeTab} drivers found.</p>
                  {activeTab === "pending" && <p className="text-xs mt-1">New driver registrations will appear here.</p>}
                </CardContent>
              </Card>
            ) : (
              filteredDrivers.map(driver => (
                <Card key={driver.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">Driver ID: {driver.id.slice(0, 8)}...</p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{driver.vehicle_type}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{driver.gender || "N/A"}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                            {driver.night_rides ? "Night rides ✓" : "Day only"}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-2 text-xs">
                          {driver.license_url && <span className="text-safe">License ✓</span>}
                          {driver.rc_book_url && <span className="text-safe">RC ✓</span>}
                          {driver.govt_id_url && <span className="text-safe">Gov ID ✓</span>}
                          {driver.vehicle_photo_url && <span className="text-safe">Photo ✓</span>}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Registered: {new Date(driver.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {driver.approval_status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-safe border-safe hover:bg-safe hover:text-safe-foreground"
                            onClick={() => updateDriverStatus(driver.id, "approved")}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => updateDriverStatus(driver.id, "rejected")}
                          >
                            <XCircle className="w-4 h-4 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                      {driver.approval_status !== "pending" && (
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          driver.approval_status === "approved" ? "bg-safe/10 text-safe" : "bg-destructive/10 text-destructive"
                        }`}>
                          {driver.approval_status}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
