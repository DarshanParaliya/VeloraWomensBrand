import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Music2, Share2 as Pinterest, ArrowRight, Twitter } from "lucide-react";
import { Container } from "../Container";
import { FOOTER_SECTIONS, SOCIAL_LINKS, COPYRIGHT_TEXT } from "./constants";
import { FooterSection, FooterLink } from "./types";
import { useToast } from "@/hooks/use-toast";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a correct email format.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Subscription Successful",
      description: "Welcome to Velora! You've been added to our mailing list.",
    });
    setEmail("");
  };
  return (
    <footer className="bg-white border-t border-neutral-100 pt-24 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-2 pr-12">
            <h2 className="text-2xl font-light tracking-[0.3em] mb-8 uppercase">VELORA</h2>
            <p className="text-neutral-500 font-light leading-relaxed mb-10 max-w-sm">
              Elevating the everyday through a curated collection of minimalist essentials. 
              Designed for the modern woman who values quality and timeless elegance.
            </p>
            
            {/* Newsletter */}
            <div className="mb-10 max-w-xs">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Newsletter</h4>
              <form 
                onSubmit={handleSubscribe}
                className="flex border-b border-neutral-200 focus-within:border-black transition-colors py-2"
              >
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Join our mailing list" 
                  className="bg-transparent text-sm font-light w-full outline-none placeholder:text-neutral-300"
                />
                <button 
                  type="submit"
                  className="text-neutral-400 hover:text-black transition-colors px-2"
                >
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </form>
            </div>

            <div className="flex space-x-6">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.platform} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-black transition-colors"
                >
                  {social.platform === "Instagram" && <Instagram size={20} strokeWidth={1.5} />}
                  {social.platform === "Twitter" && <Twitter size={20} strokeWidth={1.5} />}
                  {social.platform === "Pinterest" && <Pinterest size={20} strokeWidth={1.5} />}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {FOOTER_SECTIONS.map((section: FooterSection) => (
            <div key={section.title}>
              <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link: FooterLink) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-neutral-500 hover:text-black transition-colors font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-[0.2em] text-neutral-400">
            {COPYRIGHT_TEXT}
          </p>
          <div className="flex items-center space-x-8">
            <button className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">
              ENGLISH (US)
            </button>
            <button className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">
              PRIVACY
            </button>
            <button className="text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black transition-colors">
              TERMS
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
