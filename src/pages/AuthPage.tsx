import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Shield, Mail, Lock, User, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const phoneSchema = z.string().regex(/^\+?[1-9]\d{9,14}$/, "Enter a valid phone number (e.g. +91XXXXXXXXXX)");

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const role = searchParams.get("role");
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/book", { replace: true });
    }
  }, [user, navigate]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (authMethod === "email") {
      const emailResult = emailSchema.safeParse(email);
      if (!emailResult.success) errs.email = emailResult.error.issues[0].message;
      const passResult = passwordSchema.safeParse(password);
      if (!passResult.success) errs.password = passResult.error.issues[0].message;
      if (tab === "signup" && !fullName.trim()) errs.fullName = "Name is required";
    } else {
      const phoneResult = phoneSchema.safeParse(phone);
      if (!phoneResult.success) errs.phone = phoneResult.error.issues[0].message;
      if (otpSent && otp.length < 6) errs.otp = "Enter the 6-digit OTP";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendOTP = async () => {
    const phoneResult = phoneSchema.safeParse(phone);
    if (!phoneResult.success) {
      setErrors({ phone: phoneResult.error.issues[0].message });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setOtpSent(true);
        toast({ title: "OTP Sent", description: "Check your phone for the verification code." });
      }
    } catch {
      toast({ title: "Error", description: "Failed to send OTP.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
      if (error) {
        toast({ title: "Verification failed", description: error.message, variant: "destructive" });
      } else {
        navigate("/book");
      }
    } catch {
      toast({ title: "Error", description: "Verification failed.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast({ title: "Google Sign-In failed", description: String(error), variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Google Sign-In failed.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === "phone") {
      if (otpSent) {
        handleVerifyOTP();
      } else {
        handleSendOTP();
      }
      return;
    }
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
          navigate("/book");
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
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
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
              {tab === "login" ? "Welcome back" : role === "driver" ? "Register as Driver" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {tab === "login"
                ? "Sign in to your SafeHerRide account"
                : role === "driver" ? "Join SafeHerRide as a verified driver" : "Join SafeHerRide for safer rides"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full h-11 mb-4 gap-3 font-medium"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-3 text-muted-foreground">or continue with</span>
              </div>
            </div>

            {/* Auth method toggle */}
            <div className="flex rounded-lg bg-muted p-1 mb-4">
              <button
                className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  authMethod === "email" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => { setAuthMethod("email"); setErrors({}); setOtpSent(false); }}
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </button>
              <button
                className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  authMethod === "phone" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => { setAuthMethod("phone"); setErrors({}); }}
              >
                <Phone className="w-3.5 h-3.5" />
                Phone
              </button>
            </div>

            {authMethod === "email" && (
              <>
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
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMethod === "phone" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91XXXXXXXXXX"
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={otpSent}
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                  </div>

                  {otpSent && (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit OTP"
                        className="text-center tracking-[0.3em] text-lg font-semibold"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      />
                      {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
                      <button
                        type="button"
                        className="text-xs text-primary hover:underline"
                        onClick={() => { setOtpSent(false); setOtp(""); }}
                      >
                        Change phone number
                      </button>
                    </div>
                  )}

                  <Button type="submit" className="w-full h-11" disabled={loading}>
                    {loading ? "Please wait..." : otpSent ? "Verify OTP" : "Send OTP"}
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
