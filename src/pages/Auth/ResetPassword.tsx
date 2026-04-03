import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/layout/Container";
import { Lock, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/use-redux";
import { login } from "@/store/authSlice";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    // Simulate update success
    setIsSuccess(true);
    
    // Automatically log user in
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: "Velora User",
      email: "user@velora.com",
    };
    dispatch(login(userData));

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-neutral-50 flex items-center justify-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-neutral-200/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-neutral-200/50 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <Container className="max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-neutral-100/50 backdrop-blur-sm"
        >
          {isSuccess ? (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" strokeWidth={1} />
              <h2 className="text-2xl font-light tracking-[0.2em] mb-4 uppercase">Password Reset Success!</h2>
              <p className="text-neutral-500 text-sm font-medium mb-8">
                Your password has been changed securely. Redirecting to home...
              </p>
              <div className="w-full h-1 bg-neutral-100 overflow-hidden rounded-full max-w-[200px] mx-auto">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="h-full bg-black"
                />
              </div>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-light tracking-[0.2em] mb-3 uppercase">
                  Create New Password
                </h1>
                <p className="text-neutral-500 text-sm font-medium">
                  Set a new password for your Velora account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 ml-1">Enter New Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="pl-12 pr-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black placeholder:text-neutral-300 font-medium transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 ml-1">Confirm Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="pl-12 pr-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black placeholder:text-neutral-300 font-medium transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 bg-black hover:bg-neutral-800 text-white rounded-2xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group"
                >
                  Submit Changes
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default ResetPassword;
