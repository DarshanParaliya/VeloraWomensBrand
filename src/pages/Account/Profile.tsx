import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/use-redux";
import { logout, updateUser } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Shield, Package, Heart, LogOut, ChevronRight, Settings, HelpCircle, X, Phone, CheckCircle2, Smartphone, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EditProfileModal: React.FC<{ isOpen: boolean; onClose: () => void; user: any }> = ({ isOpen, onClose, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verifyingType, setVerifyingType] = useState<"email" | "mobile" | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  // Reset local states when modal closes or user changes
  React.useEffect(() => {
    if (!isOpen) {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setMobile(user?.mobile || "");
      setOtp("");
      setIsOtpSent(false);
      setVerifyingType(null);
      setIsEmailVerified(false);
      setIsMobileVerified(false);
    }
  }, [isOpen, user]);

  const handleSendOtp = (type: "email" | "mobile") => {
    setVerifyingType(type);
    setIsOtpSent(true);
    toast({ 
      title: "OTP Sent", 
      description: `Verification code sent to your ${type === 'email' ? 'email' : 'mobile'}.` 
    });
  };

  const handleVerifyOtp = () => {
    if (otp.length >= 4) {
      if (verifyingType === "email") setIsEmailVerified(true);
      if (verifyingType === "mobile") setIsMobileVerified(true);
      
      setIsOtpSent(false);
      setVerifyingType(null);
      setOtp("");
      toast({ title: "Success", description: "Verification successful!" });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, mobile }));
    toast({ title: "Profile Updated", description: "Your changes have been saved successfully." });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <h2 className="text-xl font-light tracking-widest uppercase">Edit Profile</h2>
              <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-1">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black font-medium transition-all"
                  />
                </div>
              </div>

              {/* Email Section */}
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-1">Email Address</Label>
                <div className="flex gap-3">
                  <div className="relative group flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                    <Input 
                      value={email} 
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value !== user.email) setIsEmailVerified(false);
                      }}
                      className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black font-medium transition-all"
                    />
                  </div>
                  {email !== user.email && (
                    isEmailVerified ? (
                      <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-[10px] uppercase tracking-widest pr-2">
                        <CheckCircle2 size={16} /> Verified
                      </div>
                    ) : (
                      <Button type="button" onClick={() => handleSendOtp("email")} variant="outline" className="h-14 rounded-2xl px-6 uppercase text-[10px] font-bold tracking-widest shrink-0">Verify</Button>
                    )
                  )}
                </div>
              </div>

              {/* Mobile Section */}
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-1">Mobile Number</Label>
                <div className="flex gap-3">
                  <div className="relative group flex-1">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={18} />
                    <Input 
                      placeholder="+1 (555) 000-0000"
                      value={mobile} 
                      onChange={(e) => {
                        setMobile(e.target.value);
                        if (e.target.value !== user.mobile) setIsMobileVerified(false);
                      }}
                      className="pl-12 h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black font-medium transition-all"
                    />
                  </div>
                  {mobile && mobile !== user.mobile && (
                    isMobileVerified ? (
                      <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-[10px] uppercase tracking-widest pr-2">
                        <CheckCircle2 size={16} /> Verified
                      </div>
                    ) : (
                      <Button type="button" onClick={() => handleSendOtp("mobile")} variant="outline" className="h-14 rounded-2xl px-6 uppercase text-[10px] font-bold tracking-widest shrink-0">Verify</Button>
                    )
                  )}
                </div>
              </div>

              {/* OTP Field */}
              <AnimatePresence>
                {isOtpSent && ((verifyingType === 'email' && !isEmailVerified) || (verifyingType === 'mobile' && !isMobileVerified)) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-1">Enter OTP</Label>
                    <div className="flex gap-3">
                      <Input 
                        placeholder="••••••"
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-14 bg-neutral-50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black text-center font-bold tracking-[0.5em] transition-all flex-1"
                      />
                      <Button 
                        type="button"
                        onClick={handleVerifyOtp}
                        className="h-14 bg-black text-white rounded-2xl px-6 uppercase text-[10px] font-bold tracking-widest"
                      >
                        Confirm
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button type="submit" className="w-full h-14 bg-black hover:bg-neutral-800 text-white rounded-2xl font-bold tracking-widest uppercase transition-all shadow-xl">
                Save Changes
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        dispatch(updateUser({ avatar: base64String }));
        toast({ 
          title: "Profile Photo Updated", 
          description: "Your new profile picture has been uploaded and set successfully." 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-neutral-50/50">
      <EditProfileModal user={user} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoUpload} 
        accept="image/*" 
        className="hidden" 
      />

      <Container className="max-w-4xl">
        <div className="mb-12 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-neutral-100"
          >
            <div className="relative group/avatar">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100 shadow-inner overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={60} strokeWidth={1} className="text-neutral-300" />
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-3 bg-white rounded-full shadow-lg border border-neutral-100 hover:scale-110 transition-transform hover:text-[#0891B2] group-hover/avatar:ring-4 ring-neutral-50"
                title="Change Photo"
              >
                <Camera size={16} className="text-neutral-600 group-hover:text-black" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0891B2] mb-2 block">Member Profile</span>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-4 uppercase">{user.name}</h1>
              <div className="flex flex-col md:flex-row items-center gap-4 text-neutral-500">
                <div className="flex items-center gap-2">
                  {user.email ? <Mail size={16} strokeWidth={1.5} /> : <Phone size={16} strokeWidth={1.5} />}
                  <span className="text-sm font-medium">{user.email || user.mobile}</span>
                </div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-neutral-200" />
                <span className="text-sm font-medium">Joined March 2026</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(true)}
              className="rounded-full px-8 h-12 border-neutral-200 font-bold uppercase tracking-widest text-[10px]"
            >
              Edit Profile
            </Button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-neutral-50">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">Account Settings</h2>
          </div>
          <div className="divide-y divide-neutral-50">
            {[
              { label: "Security & Password", icon: Shield, href: "/reset-password" },
              { label: "Help & Support", icon: HelpCircle, href: "/contact" },
            ].map((link) => (
              <button 
                key={link.label}
                onClick={() => navigate(link.href)}
                className="w-full flex items-center justify-between p-7 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-50 flex items-center justify-center group-hover:bg-white transition-colors">
                    <link.icon size={20} strokeWidth={1.5} className="text-neutral-400 group-hover:text-black transition-colors" />
                  </div>
                  <span className="font-medium text-neutral-900">{link.label}</span>
                </div>
                <ChevronRight size={18} className="text-neutral-300 group-hover:text-black transition-colors group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-7 hover:bg-red-50/30 transition-colors group"
            >
              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-white transition-colors">
                  <LogOut size={20} strokeWidth={1.5} className="text-red-400" />
                </div>
                <span className="font-medium text-red-600">Sign Out</span>
              </div>
              <ChevronRight size={18} className="text-red-200 group-hover:text-red-600 transition-colors group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Profile;
