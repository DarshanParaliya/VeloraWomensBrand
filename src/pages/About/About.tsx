import React from "react";
import { Container } from "@/components/layout/Container";
import { MoveRight } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <img
          src="/velore_story.png"
          alt="Velora Studio"
          className="w-full h-full object-cover grayscale brightness-90 saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-xs uppercase tracking-[0.8em] mb-6 opacity-80">Our Journey</h1>
            <p className="text-5xl md:text-7xl font-light tracking-tighter max-w-4xl mx-auto leading-[1.1]">
              Crafting a New Era of <br />
              <span className="italic serif">Personal Style.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-32">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
              <div className="md:col-span-4 sticky top-32">
                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 block mb-4">Established 2024</span>
                <h2 className="text-3xl font-light tracking-tight text-neutral-900 mb-8">Velora's Story</h2>
              </div>
              <div className="md:col-span-8 space-y-12">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-800">
                  Velora was born from a simple yet profound realization: that true elegance lies in the details, and modern style should be as conscious as it is beautiful.
                </p>
                <div className="space-y-6 text-neutral-500 leading-relaxed text-lg font-light">
                  <p>
                    What started as a small creative studio has evolved into a global destination for women who appreciate curated design and exceptional craftsmanship. We believe that what you wear is a reflection of who you are—and who you aspire to be.
                  </p>
                  <p>
                    From our headquarters, we collaborate with independent creators and established artisans to bring you a collection that transcends fleeting trends. Each piece in our collection is selected for its quality, its story, and its ability to inspire confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="order-2 lg:order-1">
               <img 
                 src="/about_mission.png" 
                 alt="Our Community" 
                 className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
               />
             </div>
             <div className="order-1 lg:order-2 space-y-12">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-6 font-semibold">Our Mission</h3>
                  <p className="text-4xl font-light text-neutral-900 leading-tight">
                    Empowering Every Woman <br /> To Own Her Story.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium uppercase tracking-widest text-neutral-900">Craftsmanship</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed font-light">
                      We prioritize quality over quantity, working only with creators who share our commitment to exceptional detail.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium uppercase tracking-widest text-neutral-900">Inclusivity</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed font-light">
                      Velora is a space for all women. Our community is built on the celebration of diverse perspectives and styles.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium uppercase tracking-widest text-neutral-900">Sustainability</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed font-light">
                      Mindful consumption is at our core. We strive for a future where fashion and ethics coexist seamlessly.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium uppercase tracking-widest text-neutral-900">Curated Design</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed font-light">
                      Every element in our collection is handpicked to ensure it adds lasting value to your wardrobe and life.
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <button className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-medium text-neutral-900 hover:text-neutral-500 transition-colors">
                    Join Our Community
                    <MoveRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
             </div>
          </div>
        </Container>
      </section>

      {/* Values Banner */}
      <section className="py-24 border-t border-neutral-100">
        <Container>
          <div className="flex flex-wrap justify-center gap-x-24 gap-y-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Timeless Aesthetics</span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Ethical Sourcing</span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Creator Focused</span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Modern Luxury</span>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
