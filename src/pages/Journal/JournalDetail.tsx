import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, ChevronRight } from "lucide-react";
import { JOURNAL_ARTICLES } from "./constants";

export const JournalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = JOURNAL_ARTICLES.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
        <h1 className="text-2xl font-light mb-8">Article Not Found</h1>
        <Link to="/journal">
          <Button variant="outline" className="rounded-none px-12 py-6 border-neutral-900 uppercase tracking-widest text-[10px]">
            Return to Journal
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-40">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-16 animate-in fade-in slide-in-from-left-4 duration-700">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/journal" className="hover:text-neutral-900 transition-colors">Journal</Link>
          <ChevronRight size={10} />
          <span className="text-neutral-900 font-bold">{article.title}</span>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
               <span className="text-[10px] uppercase tracking-[0.6em] text-velora-teal font-bold">{article.category}</span>
               <div className="h-px flex-1 bg-neutral-100" />
            </div>
            <h1 className="text-4xl md:text-7xl font-light tracking-tight text-neutral-900 font-display leading-[1.1]">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
              <span className="flex items-center gap-2"><Calendar size={12} /> {article.date}</span>
              <span className="flex items-center gap-2 text-neutral-500 font-bold"><User size={12} /> {article.author}</span>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="aspect-[16/9] overflow-hidden bg-neutral-100 mb-20 shadow-2xl"
          >
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-neutral max-w-none"
          >
            <div className="space-y-12">
               <p className="text-xl md:text-2xl font-light text-neutral-700 leading-relaxed italic border-l-2 border-neutral-900 pl-8 py-2">
                 {article.excerpt}
               </p>
               
               <div className="text-lg text-neutral-600 font-light leading-loose space-y-8 first-letter:text-7xl first-letter:font-display first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-neutral-900">
                  {article.content.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
               </div>
            </div>
          </motion.div>

          {/* Footer Back Button */}
          <div className="mt-32 pt-20 border-t border-neutral-100 flex justify-between items-center">
             <Link to="/journal">
                <Button variant="premium" className="rounded-none tracking-[0.4em] py-5 px-10 text-[9px] bg-neutral-900 hover:bg-neutral-800">
                  <ArrowLeft size={12} className="mr-2" /> Back to Library
                </Button>
             </Link>
             
             <div className="hidden md:flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Share Selection</span>
                <div className="flex gap-4">
                   <span className="w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer">IG</span>
                   <span className="w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer">TW</span>
                </div>
             </div>
          </div>
        </div>
      </Container>
    </main>
  );
};
