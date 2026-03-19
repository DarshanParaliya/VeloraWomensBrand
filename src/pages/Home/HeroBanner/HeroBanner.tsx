import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HERO_SLIDES } from "./constants";
import { BannerSlide } from "./types";
import { Button } from "@/components/ui/button";

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide: BannerSlide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-neutral-100">
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="h-full w-full object-cover object-center transition-transform duration-[10000ms] scale-110"
          style={{ transform: 'scale(1.05)' }}
        />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <span className="text-xs md:text-sm tracking-[0.5em] text-white/90 mb-4 uppercase">
          {slide.subtitle}
        </span>
        <h2 className="text-4xl md:text-7xl font-light text-white tracking-[0.2em] mb-10 max-w-4xl">
          {slide.title}
        </h2>

        <Link to={slide.ctaLink}>
          <Button
            variant="outline"
            className="group bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-black transition-all duration-500 px-12 py-7 rounded-none tracking-[0.3em] text-[10px]"
          >
            {slide.ctaText}
            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-4">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-[1px] w-16 transition-all duration-700 ${currentSlide === index ? "bg-white" : "bg-white/30"
              }`}
          />
        ))}
      </div>
    </section>
  );
};
