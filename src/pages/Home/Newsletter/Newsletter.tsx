import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { NEWSLETTER_CONTENT } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-32 bg-neutral-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {!isSubmitted ? (
            <>
              <h2 className="text-[10px] font-bold tracking-[0.6em] uppercase text-neutral-400 mb-8">
                NEWSLETTER
              </h2>
              <h3 className="text-3xl font-light tracking-widest uppercase mb-6">
                {NEWSLETTER_CONTENT.title}
              </h3>
              <p className="text-neutral-500 font-light leading-relaxed mb-12 px-12">
                {NEWSLETTER_CONTENT.description}
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <Input
                  type="email"
                  placeholder={NEWSLETTER_CONTENT.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none bg-transparent border-t-0 border-l-0 border-r-0 border-b-neutral-300 focus-visible:ring-0 focus-visible:border-b-black transition-all w-full md:w-80 px-0 py-4 text-xs tracking-widest"
                  required
                />
                <Button 
                  type="submit"
                  variant="ghost"
                  className="rounded-none text-[10px] tracking-[0.4em] font-bold px-10 py-6 hover:bg-black hover:text-white transition-all duration-500"
                >
                  {NEWSLETTER_CONTENT.buttonLabel}
                </Button>
              </form>
            </>
          ) : (
            <div className="animate-in fade-in zoom-in duration-1000">
              <h3 className="text-2xl font-light tracking-widest uppercase mb-4">
                {NEWSLETTER_CONTENT.successMessage}
              </h3>
              <p className="text-neutral-400 text-xs tracking-[0.2em]">
                YOUR ELEGANT JOURNEY WITH VELORA BEGINS NOW.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
