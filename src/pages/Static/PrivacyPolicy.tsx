import React from "react";
import { Container } from "@/components/layout/Container";
import { Shield, Eye, Lock, FileText, Globe, Scale } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-24 border-l-4 border-neutral-900 pl-12"
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 leading-tight">Privacy Policy</h1>
            <p className="text-sm text-neutral-400 font-bold uppercase tracking-[0.4em] mb-4">Effective March 21, 2026</p>
            <p className="text-xl text-neutral-800 font-light leading-relaxed max-w-2xl italic serif">
              At Velora, your privacy is a priority. We are committed to transparency in the collection, use, and protection of your personal information.
            </p>
          </motion.div>

          {/* Policy Sections */}
          <section className="space-y-24">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 sticky top-40 h-fit space-y-6">
                   <div className="p-4 bg-neutral-50 inline-block rounded-xl text-neutral-900">
                      <Eye className="w-5 h-5" />
                   </div>
                   <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold">1. Information</h2>
                </div>
                <div className="lg:col-span-8 space-y-6">
                   <h3 className="text-2xl font-light text-neutral-900 italic serif">What We Collect</h3>
                   <p className="text-sm text-neutral-500 font-light leading-relaxed">
                     When you visit our site or make a purchase, we collect certain personal identification 
                     information such as your name, email address, mailing address, phone number, and 
                     payment details. We also use cookies to understand your browsing behavior and improve 
                     your experience.
                   </p>
                   <ul className="space-y-3 text-sm text-neutral-400 font-light">
                      <li className="flex gap-4 items-center tracking-wide italic leading-relaxed">• IP Address and Device Information</li>
                      <li className="flex gap-4 items-center tracking-wide italic leading-relaxed">• Browsing and Purchase History</li>
                      <li className="flex gap-4 items-center tracking-wide italic leading-relaxed">• Newsletter Preferences</li>
                   </ul>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 sticky top-40 h-fit space-y-6">
                   <div className="p-4 bg-neutral-50 inline-block rounded-xl text-neutral-900">
                      <Lock className="w-5 h-5" />
                   </div>
                   <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold">2. Protection</h2>
                </div>
                <div className="lg:col-span-8 space-y-6">
                   <h3 className="text-2xl font-light text-neutral-900 italic serif">Security Measures</h3>
                   <p className="text-sm text-neutral-500 font-light leading-relaxed">
                     We implement high-level security measures, including SSL encryption and secure payment gateways, 
                     to protect your personal information against unauthorized access, use, or disclosure.
                   </p>
                   <div className="p-6 bg-neutral-50 rounded-xl flex items-start gap-4 italic serif opacity-70">
                      <Shield className="w-5 h-5 text-neutral-900 shrink-0" />
                      <p className="text-sm text-neutral-500 font-light leading-relaxed italic">
                        "Your data is never sold to third-party marketers. We value your trust as much as we value our planet."
                      </p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 sticky top-40 h-fit space-y-6">
                   <div className="p-4 bg-neutral-50 inline-block rounded-xl text-neutral-900">
                      <Scale className="w-5 h-5" />
                   </div>
                   <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold">3. Your Rights</h2>
                </div>
                <div className="lg:col-span-8 space-y-6">
                   <h3 className="text-2xl font-light text-neutral-900 italic serif">Control Over Your Data</h3>
                   <p className="text-sm text-neutral-500 font-light leading-relaxed">
                     You have the right to access, correct, or delete your personal data at any time. 
                     You can also opt-out of marketing communications by clicking the 'unsubscribe' 
                     link in any of our emails.
                   </p>
                   <div className="flex flex-wrap gap-8 pt-8">
                     <button className="text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b border-neutral-900 hover:opacity-60 transition-opacity">Request Data</button>
                     <button className="text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b border-red-900 text-red-900 hover:opacity-60 transition-opacity">Delete Account</button>
                   </div>
                </div>
             </div>
          </section>

          <div className="mt-40 pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex gap-12 items-center text-neutral-300">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold">GDPR Compliant</span>
             </div>
             <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 text-center md:text-right">
                For further inquiries, contact privacy@velora.com
             </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
