import React, { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Leaf, Package, Users, Globe, Recycle, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Sustainability: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      title: "Eco-Materials",
      icon: <Recycle className="w-8 h-8 text-[#9CB2A1]" />,
      description: "Our commitment starts with the fiber. We exclusively source organic cotton, recycled linen, and Tencel™ Lyocell—materials that respect the earth and your skin.",
      details: ["100% GOTS Certified Organic Cotton", "Recycled Post-Consumer Linen", "Low-impact, non-toxic dyes"],
      image: "/sustainability2.png"
    },
    {
      title: "Plastic-Free Packaging",
      icon: <Package className="w-8 h-8 text-[#9CB2A1]" />,
      description: "Every order arrives in 100% compostable mailers and FSC-certified recycled paper. We've eliminated all single-use plastics from our supply chain.",
      details: ["Cornstarch-based compostable bags", "Soy-based ink printing", "Reusable fabric dust bags"],
      image: "/sustainability3.png"
    },
    {
      title: "Artisan Empowerment",
      icon: <Users className="w-8 h-8 text-[#9CB2A1]" />,
      description: "We partner directly with small-scale artisan communities, ensuring fair wages and preserving traditional craftsmanship that has been passed down for generations.",
      details: ["Fair Trade Certified partnerships", "Direct-to-artisan revenue model", "Traditional weaving preservation"],
      image: "/sustainability4.png"
    }
  ];

  return (
    <div className="bg-[#F7F7F7] min-h-screen pt-20 overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/sustainability1.png')",
            transform: `translateY(${scrollY * 0.4}px)`,
            filter: "brightness(0.85) contrast(0.9)"
          }}
        />
        <div className="absolute inset-0 bg-black/10 z-10" />
        
        <Container className="relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.6em] mb-6 block font-medium">Conscious Luxury</span>
            <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter mb-8 leading-tight">
              Honoring Our <br />
              <span className="italic font-serif">Original Home.</span>
            </h1>
            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90 leading-relaxed">
              At Velora, sustainability isn't an initiative—it's the foundation of everything we create. 
              Beautiful design should never come at the cost of our planet.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Leaf className="w-12 h-12 text-[#9CB2A1] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 italic serif">
              "We don't inherit the earth from our ancestors, we borrow it from our children."
            </h2>
            <div className="h-px w-24 bg-[#9CB2A1] mx-auto opacity-30" />
            <p className="text-lg text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto">
              Our mission is to lead the transition toward a circular fashion economy where every garment is designed with its afterlife in mind.
            </p>
          </div>
        </Container>
      </section>

      {/* Triple Pillar Sections */}
      {sections.map((section, index) => (
        <section key={section.title} className={`py-32 ${index % 2 === 1 ? 'bg-[#9CB2A1]/5' : 'bg-white'}`}>
          <Container>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={index % 2 === 1 ? 'order-2' : 'order-1'}
              >
                <div className="space-y-8">
                  <div className="p-4 bg-white inline-block rounded-full shadow-sm">
                    {section.icon}
                  </div>
                  <h3 className="text-4xl font-light tracking-tight text-neutral-900">{section.title}</h3>
                  <p className="text-xl text-neutral-600 font-light leading-relaxed">
                    {section.description}
                  </p>
                  <ul className="space-y-4 pt-4">
                    {section.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-3 text-neutral-500 font-light">
                        <CheckCircle2 className="w-4 h-4 text-[#9CB2A1]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${index % 2 === 1 ? 'order-1' : 'order-2'}`}
              >
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#9CB2A1]/10 mix-blend-multiply pointer-events-none" />
              </motion.div>
            </div>
          </Container>
        </section>
      ))}

      {/* Progress Tracker Bar */}
      {/* <section className="bg-[#F7F7F7] border-t border-[#9CB2A1]/20 py-12 px-6">
        <Container>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Globe className="w-6 h-6 text-[#9CB2A1] animate-pulse" />
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9CB2A1] block mb-1">
                  Our 2026 Commitment
                </span>
                <h4 className="text-xl font-light text-neutral-900">Sustainability Milestone</h4>
              </div>
            </div>
            
            <div className="flex-1 w-full bg-neutral-200 h-2.5 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "82%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute inset-y-0 left-0 bg-[#9CB2A1]"
              />
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="text-lg font-bold text-[#9CB2A1]">82% COMPLETE</span>
              <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 border-b border-black flex items-center gap-2 group hover:gap-3 transition-all pb-1">
                VIEW FULL REPORT
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </Container>
      </section> */}
    </div>
  );
};

export default Sustainability;
