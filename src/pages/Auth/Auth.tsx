import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/hooks/use-redux";
import { login, signup } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/layout/Container";
import { Mail, Lock, User, ArrowRight, Github, Chrome, Phone, Smartphone, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<"email" | "mobile">("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";

  const handleSendOtp = () => {
    if (!mobile) {
      toast({ title: "Error", description: "Please enter a mobile number.", variant: "destructive" });
      return;
    }
    setIsOtpSent(true);
    toast({ title: "OTP Sent", description: "Verification code sent to your mobile device." });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate auth logic
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: isLogin ? (authMethod === 'email' ? email.split('@')[0] : "Velora User") : name,
      ...(authMethod === 'email' ? { email } : { mobile }),
    };

    if (isLogin) {
      dispatch(login(userData));
    } else {
      dispatch(signup(userData));
    }

    navigate(redirectPath);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-neutral-50 flex items-center justify-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-neutral-200/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-neutral-200/50 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <Container className="max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-neutral-100/50 backdrop-blur-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light tracking-[0.2em] mb-3 uppercase">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-neutral-500 text-sm font-medium">
              {isLogin 
                ? "Experience the epitome of luxury essentials." 
                : "Join the Velora circle for exclusive access."}
            </p>
          </div>

          {/* Auth Method Toggle */}
          <div className="flex bg-neutral-50 p-1.5 rounded-2xl mb-8 border border-neutral-100">
            <button 
              onClick={() => { setAuthMethod("email"); setIsOtpSent(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${authMethod === 'email' ? 'bg-white shadow-sm text-black' : 'text-neutral-400 hover:text-black'}`}
            >
              <Mail size={14} strokeWidth={authMethod === 'email' ? 2 : 1.5} /> Email
            </button>
            <button 
              onClick={() => { setAuthMethod("mobile"); setIsOtpSent(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${authMethod === 'mobile' ? 'bg-white shadow-sm text-black' : 'text-neutral-400 hover:text-black'}`}
            >
              <Smartphone size={14} strokeWidth={authMethod === 'mobile' ? 2 : 1.5} /> Mobile
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-1">Full Name</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black placeholder:text-neutral-300 font-medium transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {authMethod === 'email' ? (
                <motion.div 
                  key="email-fields"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 ml-1">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="hello@velora.com"
                        className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black placeholder:text-neutral-300 font-medium transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={authMethod === 'email'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <Label htmlFor="password" className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Password</Label>
                      {isLogin && (
                        <button 
                          type="button" 
                          onClick={() => navigate("/forgot-password")}
                          className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-black transition-colors"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black placeholder:text-neutral-300 font-medium transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={authMethod === 'email'}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="mobile-fields"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 ml-1">Mobile Number</Label>
                    <div className="flex gap-3">
                      <div className="relative group flex-1">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black placeholder:text-neutral-300 font-medium transition-all"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          required={authMethod === 'mobile'}
                          disabled={isOtpSent}
                        />
                      </div>
                      <Button 
                        type="button" 
                        onClick={handleSendOtp}
                        variant="outline"
                        className="h-14 rounded-2xl px-6 uppercase text-[10px] font-bold tracking-widest shrink-0 border-neutral-100 hover:bg-neutral-50"
                      >
                        {isOtpSent ? "Resend" : "Send OTP"}
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOtpSent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <Label htmlFor="otp" className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-1">Enter OTP Code</Label>
                        <div className="relative group">
                          <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                          <Input
                            id="otp"
                            type="text"
                            placeholder="••••••"
                            className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black placeholder:text-neutral-300 font-bold tracking-[0.5em] text-center transition-all"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required={authMethod === 'mobile'}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              type="submit" 
              className="w-full h-14 bg-black hover:bg-neutral-800 text-white rounded-2xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group"
            >
              {isLogin ? "Sign In" : "Register Now"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-neutral-100"></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase tracking-widest font-bold text-neutral-500">Or continue with</span>
              <div className="flex-grow border-t border-neutral-100"></div>
            </div>

            <div className="grid gap-4 mt-6">
              <button className="flex items-center justify-center gap-2 h-12 bg-white border border-neutral-100 rounded-2xl hover:bg-neutral-50 transition-colors">
                <Chrome size={20} className="text-neutral-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Google</span>
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-neutral-400 font-medium">
            {isLogin ? "New to Velora?" : "Already member?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-black font-bold uppercase tracking-widest text-xs ml-1 hover:underline underline-offset-4 decoration-2"
            >
              {isLogin ? "sign up here" : "Sign in here"}
            </button>
          </p>
        </motion.div>
      </Container>
    </div>
  );
};

export default Auth;
