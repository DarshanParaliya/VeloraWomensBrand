import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Briefcase, Heart, Sparkles, TrendingUp, MapPin, Clock, ArrowRight, ChevronRight, Share2, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const jobs = [
  {
    id: 1,
    slug: "senior-product-designer",
    title: "Senior Product Designer",
    category: "Design",
    location: "Global / Remote",
    type: "Full-Time",
    experience: "5+ Years",
    description: "Lead the visual and experiential direction for our next-generation women's collection."
  },
  {
    id: 2,
    slug: "eco-material-specialist",
    title: "Eco-Material Specialist",
    category: "Sustainability",
    location: "Global / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    description: "Research and source innovative organic and recycled materials for our sustainable product line."
  },
  {
    id: 3,
    slug: "fashion-marketing-strategist",
    title: "Fashion Marketing Strategist",
    category: "Marketing",
    location: "London, UK",
    type: "Contract",
    experience: "4+ Years",
    description: "Develop and execute premium marketing campaigns that resonate with modern, conscious consumers."
  },
  {
    id: 4,
    slug: "artisan-partnership-manager",
    title: "Artisan Partnership Manager",
    category: "Operations",
    location: "Global / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    description: "Strengthen our relationships with artisanal communities and ensure ethical production standards."
  }
];

const Careers: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Design", "Sustainability", "Marketing", "Operations"];

  const filteredJobs = activeCategory === "All" 
    ? jobs 
    : jobs.filter(job => job.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-x-0 inset-y-0 z-0 bg-cover bg-center grayscale brightness-90 saturate-[0.8]"
          style={{ backgroundImage: "url('/careers1.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        
        <Container className="relative z-20 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-[10px] uppercase tracking-[0.8em] mb-6 block font-medium opacity-80">Join Our Mission</span>
            <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter mb-8 leading-[1.1]">
              Shape the Future of <br />
              <span className="italic font-serif">Conscious Luxury.</span>
            </h1>
            <p className="text-xl font-light opacity-90 leading-relaxed mb-12 max-w-xl">
              At Velora, we combine timeless design with radical transparency. We're looking for visionary creators to help us redefine the modern fashion industry.
            </p>
            <button className="bg-white text-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-colors">
              Explore Openings
            </button>
          </motion.div>
        </Container>
      </section>

      {/* Philosophy/Values Section */}
      <section className="py-32 bg-[#FAF9F6]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div>
               <h2 className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8 font-semibold">Our Culture</h2>
               <h3 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 leading-tight mb-8">
                 A Space Where <br /> Craftsmanship Meets Innovation.
               </h3>
               <p className="text-lg text-neutral-500 font-light leading-relaxed mb-12">
                 We believe in empowering every team member to lead with creativity. Diversity of thought isn't just a goal—it's how we navigate the complex landscape of sustainable luxury.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="p-3 bg-neutral-100 inline-block rounded-lg text-neutral-900">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900">Empathy-Driven</h4>
                    <p className="text-sm text-neutral-400 font-light">
                      We prioritize the well-being and growth of our global community.
                    </p>
                 </div>
                 <div className="space-y-4">
                    <div className="p-3 bg-neutral-100 inline-block rounded-lg text-neutral-900">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900">Radical Design</h4>
                    <p className="text-sm text-neutral-400 font-light">
                      Pushing the boundaries of what's possible in ethical fashion.
                    </p>
                 </div>
               </div>
             </div>

             <div className="relative">
                <img 
                  src="/careers2.png" 
                  alt="Culture" 
                  className="w-full aspect-square object-cover rounded-2xl shadow-2xl grayscale saturate-[0.5]"
                />
                <div className="absolute -bottom-8 -right-8 bg-neutral-900 p-12 hidden md:block rounded-xl">
                    <p className="text-white text-3xl font-light italic serif leading-tight">
                      "Creativity is the <br /> heartbeat of sustainability."
                    </p>
                </div>
             </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-32">
        <Container>
           <div className="text-center mb-24 max-w-2xl mx-auto space-y-6">
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 font-medium">Why Join Velora?</h2>
              <h3 className="text-4xl font-light text-neutral-900">Perks of Being a Velorian</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: <TrendingUp />, title: "Growth Mindset", desc: "Generous professional development budgets for every role." },
                { icon: <Briefcase />, title: "Remote-First", desc: "Work from anywhere in the world with flexible hours." },
                { icon: <Star />, title: "Share Our Success", desc: "Competitive compensation and equity packages." },
                { icon: <Heart />, title: "Wellness First", desc: "Comprehensive health and mental well-being benefits." }
              ].map((benefit, idx) => (
                <div key={idx} className="p-8 border border-neutral-100 rounded-2xl hover:border-neutral-900 transition-all group">
                   <div className="mb-6 text-neutral-400 group-hover:text-neutral-900 transition-colors">
                      {benefit.icon}
                   </div>
                   <h4 className="text-lg font-light text-neutral-900 mb-4">{benefit.title}</h4>
                   <p className="text-sm text-neutral-500 font-light leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
           </div>
        </Container>
      </section>

      {/* Openings Section */}
      <section className="py-32 bg-neutral-900 text-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.6em] opacity-40 mb-6 font-medium">Openings</h2>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight italic serif">Find Your Place.</h3>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full border text-[10px] uppercase tracking-[0.2em] transition-all font-bold ${
                    activeCategory === cat 
                    ? "bg-white text-black border-white" 
                    : "border-white/20 text-white/60 hover:border-white/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <Link 
                  to={`/careers/${job.slug}`}
                  key={job.id}
                  className="block"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="group relative p-8 md:p-12 border border-white/10 hover:border-white transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                          <span>{job.category}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span>{job.type}</span>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-light text-white group-hover:italic transition-all">
                          {job.title}
                        </h4>
                        <p className="text-white/60 font-light max-w-xl text-sm leading-relaxed">
                          {job.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-12">
                        <div className="flex flex-col gap-2">
                          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                            <MapPin className="w-3 h-3" /> {job.location}
                          </span>
                          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                            <Clock className="w-3 h-3" /> {job.experience}
                          </span>
                        </div>
                        
                        <div className="p-4 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                           <ChevronRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle Background Accent */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-20 opacity-40">
                <p className="text-lg font-light italic">No current openings in this category. Join our talent pool.</p>
              </div>
            )}
          </div>

          <div className="mt-32 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/40 font-light text-sm max-w-md text-center md:text-left">
              Don't see a role that fits? We're always looking for collective brilliance. Send your portfolio to careers@velora.com
            </p>
            <div className="flex gap-12">
              <Share2 className="w-6 h-6 text-white/20 hover:text-white transition-colors cursor-pointer" />
              <button className="text-[10px] uppercase tracking-[0.4em] font-bold pb-2 border-b border-white hover:opacity-70 transition-opacity">
                Join Talent Pool
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom Padding */}
      <div className="h-24" />
    </div>
  );
};

export default Careers;
