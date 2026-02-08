import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Shield, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) errs.email = emailResult.error.issues[0].message;
    const passResult = passwordSchema.safeParse(password);
    if (!passResult.success) errs.password = passResult.error.issues[0].message;
    if (tab === "signup" && !fullName.trim()) errs.fullName = "Name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      if (tab === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message?.includes("Invalid login")) {
            toast({ title: "Login failed", description: "Invalid email or password.", variant: "destructive" });
          } else if (error.message?.includes("Email not confirmed")) {
            toast({ title: "Email not verified", description: "Please check your email and verify your account.", variant: "destructive" });
          } else {
            toast({ title: "Error", description: error.message, variant: "destructive" });
          }
        } else {
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message?.includes("already registered")) {
            toast({ title: "Account exists", description: "This email is already registered. Try logging in.", variant: "destructive" });
          } else {
            toast({ title: "Signup failed", description: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: "Check your email", description: "We've sent a verification link to your email." });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="font-display text-2xl">
              {tab === "login" ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {tab === "login"
                ? "Sign in to your SafeHerRide account"
                : "Join SafeHerRide for safer rides"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Tab switcher */}
            <div className="flex rounded-lg bg-muted p-1 mb-6">
              <button
                className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${
                  tab === "login" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => { setTab("login"); setErrors({}); }}
              >
                Log In
              </button>
              <button
                className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${
                  tab === "signup" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => { setTab("signup"); setErrors({}); }}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      className="pl-10"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? "Please wait..." : tab === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
