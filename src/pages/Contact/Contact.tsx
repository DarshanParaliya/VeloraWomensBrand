import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you shortly.",
    });
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
       {/* Hero / Header Section */}
       <div className="relative h-[40vh] mb-20 overflow-hidden">
          <img 
            src="/contact-bg.png" 
            alt="Contact Velora" 
            className="w-full h-full object-cover saturate-50 brightness-95"
          />
          <div className="absolute inset-0 bg-neutral-900/10 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-xs uppercase tracking-[0.8em] text-neutral-800 mb-4">Connect With Us</h1>
              <p className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900">How Can We Help?</p>
            </div>
          </div>
       </div>

       <Container>
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
           
           {/* Contact Information */}
           <div className="lg:col-span-5 space-y-16">
              <div className="space-y-8">
                <h2 className="text-2xl font-light tracking-tight text-neutral-900">Get in Touch</h2>
                <p className="text-neutral-500 font-light leading-relaxed max-w-md">
                  Whether you have a question about our products, an order, or just want to share your story, we'd love to hear from you.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group cursor-pointer">
                  <div className="p-3 bg-neutral-50 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1 font-medium">Email Us</p>
                    <p className="text-neutral-900 font-light">concierge@velora.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group cursor-pointer">
                  <div className="p-3 bg-neutral-50 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1 font-medium">Call Us</p>
                    <p className="text-neutral-900 font-light">+1 (800) VELORA-V</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group cursor-pointer">
                  <div className="p-3 bg-neutral-50 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1 font-medium">Headquarters</p>
                    <p className="text-neutral-900 font-light leading-relaxed">
                      77 Creative Avenue <br />
                      Design District, Manhattan <br />
                      NY 10013, USA
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-6">
                 <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Follow Our Journey</p>
                 <div className="flex gap-6">
                    <Instagram className="w-5 h-5 text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors" />
                    <Twitter className="w-5 h-5 text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors" />
                    <Linkedin className="w-5 h-5 text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors" />
                 </div>
              </div>
           </div>

           {/* Contact Form */}
           <div className="lg:col-span-1 border-l border-neutral-100 hidden lg:block"></div>

           <div className="lg:col-span-6">
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 ml-1">Email Address</label>
                  <Input required type="email" className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-1 bg-transparent placeholder:text-neutral-300 h-12" placeholder="jane@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 ml-1">Subject</label>
                  <Input required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-1 bg-transparent placeholder:text-neutral-300 h-12" placeholder="Inquiry about..." />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 ml-1">Your Message</label>
                  <Textarea required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-1 bg-transparent placeholder:text-neutral-300 min-h-[150px] resize-none pt-4" placeholder="Tell us what's on your mind..." />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-14 rounded-none bg-neutral-900 text-white uppercase tracking-[0.5em] text-[10px] hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                    Send Message
                  </Button>
                </div>
              </form>
           </div>

         </div>
       </Container>
    </div>
  );
};

export default Contact;
