import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/layout/Container";
import { Mail, Key, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOtp = () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address first.",
        variant: "destructive",
      });
      return;
    }
    // Simulate OTP sending
    setIsOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `A magic code has been sent to ${email}`,
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the OTP received.",
        variant: "destructive",
      });
      return;
    }
    // Simulate verification and redirect
    navigate("/reset-password");
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
          <button 
            onClick={() => navigate("/auth")}
            className="group flex items-center gap-2 text-neutral-400 hover:text-black transition-colors mb-8 text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </button>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-light tracking-[0.2em] mb-3 uppercase">
              Reset Password
            </h1>
            <p className="text-neutral-500 text-sm font-medium">
              Enter your registered email to receive a secure OTP.
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 ml-1">Enter Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black placeholder:text-neutral-300 font-medium transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isOtpSent}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp" className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 ml-1">Enter OTP</Label>
              <div className="flex gap-3">
                <div className="relative group flex-1">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black placeholder:text-neutral-300 font-medium transition-all"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="button"
                  onClick={handleSendOtp}
                  variant="outline"
                  className="h-14 px-6 rounded-2xl font-bold tracking-widest uppercase border-neutral-100 hover:bg-neutral-50 shrink-0"
                >
                  {isOtpSent ? "Resend" : "Send OTP"}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-black hover:bg-neutral-800 text-white rounded-2xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group"
            >
              Verify OTP
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </motion.div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
