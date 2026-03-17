import React from "react";
import { Link } from "wouter";
import { Instagram, Twitter, Music2 as Pinterest, ArrowRight } from "lucide-react";
import { Container } from "../Container";
import { FOOTER_SECTIONS, SOCIAL_LINKS, COPYRIGHT_TEXT } from "./constants";
import { FooterSection, FooterLink } from "./types";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-24 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-2 pr-12">
            <h2 className="text-2xl font-light tracking-[0.3em] mb-8">VELORA</h2>
            <p className="text-neutral-500 font-light leading-relaxed mb-8 max-w-sm">
              Elevating the everyday through a curated collection of minimalist essentials. 
              Designed for the modern woman who values quality and timeless elegance.
            </p>
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
                      href={link.href} 
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
