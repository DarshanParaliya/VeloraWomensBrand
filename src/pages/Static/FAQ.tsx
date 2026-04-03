import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Plus, Minus, HelpCircle, Package, Truck, Recycle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Orders & Shipping",
      icon: <Package className="w-5 h-5" />,
      questions: [
        {
          q: "How can I track my order?",
          a: "Once your order has been dispatched, you will receive a confirmation email with a tracking number and a link to our carrier's website."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship worldwide. Shipping rates and delivery times vary by destination and are calculated at checkout."
        },
        {
          q: "Can I cancel my order?",
          a: "We process orders quickly to ensure fast delivery. If you need to cancel, please contact us within 1 hour of placing your order."
        }
      ]
    },
    {
      category: "Sustainability",
      icon: <Recycle className="w-5 h-5" />,
      questions: [
        {
          q: "What materials do you use?",
          a: "We exclusively use GOTS-certified organic cotton, recycled linen, and Tencel™ Lyocell. All our materials are sourced for their quality and minimal environmental impact."
        },
        {
          q: "Is your packaging eco-friendly?",
          a: "Every Velora order is shipped in 100% compostable mailers or FSC-certified recycled paper boxes. We use soy-based inks and have eliminated all single-use plastics."
        }
      ]
    },
    {
      category: "Returns & Warranty",
      icon: <RotateCcw className="w-5 h-5" />,
      questions: [
        {
          q: "How do I return an item?",
          a: "Returns are accepted within 30 days of delivery. Please visit our returns portal to initiate the process."
        },
        {
          q: "Do you provide a warranty?",
          a: "All Velora products include a 12-month quality guarantee. If your piece shows a defect in materials or craftsmanship, we will repair or replace it at no cost."
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Flattened for easy indexing
  const allQuestions = faqs.flatMap(f => f.questions);

  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <Container>
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-8 italic serif">Frequently Asked Questions</h1>
            <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-lg mx-auto uppercase tracking-widest">
              Browse common inquiries or contact our client services team for personalized assistance.
            </p>
          </motion.div>

          <div className="space-y-16">
            {faqs.map((category, catIdx) => (
              <section key={catIdx} className="space-y-8">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 border-b border-neutral-100 pb-4">
                   {category.icon}
                   {category.category}
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                   {category.questions.map((item, qIdx) => {
                     const totalIdx = faqs.slice(0, catIdx).reduce((acc, c) => acc + c.questions.length, 0) + qIdx;
                     const isOpen = openIndex === totalIdx;
                     
                     return (
                       <div key={totalIdx} className={`border border-neutral-100 rounded-xl overflow-hidden transition-all duration-500 ${isOpen ? 'ring-1 ring-neutral-900 shadow-sm' : ''}`}>
                          <button 
                            onClick={() => toggleFAQ(totalIdx)}
                            className="w-full text-left p-6 md:p-8 flex items-center justify-between"
                          >
                             <span className="text-lg font-light text-neutral-900 leading-tight pr-8">{item.q}</span>
                             {isOpen ? <Minus className="w-4 h-4 text-neutral-900 shrink-0" /> : <Plus className="w-4 h-4 text-neutral-400 shrink-0" />}
                          </button>
                          
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                              >
                                <div className="px-8 pb-8 text-neutral-500 font-light text-sm leading-relaxed max-w-2xl">
                                   {item.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                       </div>
                     );
                   })}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-32 p-12 bg-neutral-900 rounded-2xl text-white flex flex-col items-center text-center space-y-8">
             <HelpCircle className="w-8 h-8 opacity-40" />
             <div className="space-y-4">
                <h3 className="text-2xl font-light italic serif leading-tight">Can't find what you're looking for?</h3>
                <p className="text-sm opacity-60 font-light">Our dedicated client services team is available 24/7 to assist you.</p>
             </div>
             <div className="flex flex-wrap justify-center gap-8">
                <button className="text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b border-white hover:opacity-60 transition-opacity">Email Us</button>
                <button className="text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b border-white hover:opacity-60 transition-opacity">Live Chat</button>
             </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

import { RotateCcw } from "lucide-react";
export default FAQ;
