import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { JOURNAL_ARTICLES, JOURNAL_CONFIG, JournalArticle } from "./constants";
import { Link } from "react-router-dom";

export const Journal: React.FC = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-40">
      {/* Header Section */}
      <section className="mb-24 lg:mb-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-neutral-400 font-bold">
              {JOURNAL_CONFIG.subtitle}
            </h1>
            <h2 className="text-5xl md:text-8xl font-light tracking-tight text-neutral-900 font-display">
              {JOURNAL_CONFIG.title}
            </h2>
            <p className="text-lg md:text-xl text-neutral-500 font-light leading-relaxed max-w-2xl mx-auto italic">
              {JOURNAL_CONFIG.intro}
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Article - Full Width Style */}
      <section className="mb-24 lg:mb-32">
        <Container>
          <div className="relative group overflow-hidden bg-neutral-100 aspect-[21/9] md:aspect-[21/7]">
             <img 
               src={JOURNAL_ARTICLES[0].imageUrl} 
               alt={JOURNAL_ARTICLES[0].title}
               className="w-full h-full object-cover grayscale transition-all duration-[2s] group-hover:scale-105 group-hover:grayscale-0"
             />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
             <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 text-white bg-gradient-to-t from-black/60 to-transparent">
                <div className="max-w-3xl space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/80">{JOURNAL_ARTICLES[0].category}</span>
                  <Link to={`/journal/${JOURNAL_ARTICLES[0].id}`}>
                    <h3 className="text-3xl md:text-5xl font-light tracking-wide uppercase hover:text-white/80 transition-colors">
                      {JOURNAL_ARTICLES[0].title}
                    </h3>
                  </Link>
                  <p className="hidden md:block text-sm text-white/70 font-light max-w-xl">{JOURNAL_ARTICLES[0].excerpt}</p>
                  <div className="pt-4">
                    <Link to={`/journal/${JOURNAL_ARTICLES[0].id}`}>
                      <Button variant="premium" className="bg-white text-black hover:bg-neutral-100 hover:text-black">
                        Read Featured <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
             </div>
          </div>
        </Container>
      </section>

      {/* Grid of Articles */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 lg:gap-y-32">
            {JOURNAL_ARTICLES.slice(1).map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial Footer */}
      <section className="mt-40 bg-neutral-900 py-32 text-white">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4 max-w-md">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400">Join the circle</h4>
              <p className="text-2xl font-light">Stay enlightened with our weekly editorial highlights.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="bg-transparent border-b border-white/30 py-4 px-2 text-[11px] tracking-widest uppercase focus:outline-none focus:border-white w-full md:w-80"
              />
              <button className="ml-4 text-[11px] uppercase tracking-widest font-bold border-b border-white/30 hover:border-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

const ArticleCard: React.FC<{ article: JournalArticle; index: number }> = ({ article, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="group flex flex-col h-full"
  >
    {/* Image Container */}
    <Link to={`/journal/${article.id}`} className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-8 border border-neutral-100/50 block">
      <img 
        src={article.imageUrl} 
        alt={article.title}
        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
      />
      {/* Category Tag Overlay */}
      <div className="absolute top-6 left-6">
        <span className="bg-white/95 backdrop-blur-sm px-4 py-2 text-[9px] uppercase tracking-[0.3em] font-bold text-neutral-900 shadow-xl overflow-hidden relative group/tag">
          <span className="relative z-10">{article.category}</span>
          <div className="absolute inset-0 bg-neutral-900 translate-y-full group-hover/tag:translate-y-0 transition-transform duration-500" />
        </span>
      </div>
    </Link>

    {/* Metadata */}
    <div className="px-1 space-y-6 flex-1 flex flex-col text-center md:text-left">
      <div className="flex items-center justify-center md:justify-start gap-6 text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
        <span className="flex items-center gap-2"><Calendar size={10} /> {article.date}</span>
        <span className="flex items-center gap-2 text-neutral-500 font-bold"><User size={10} /> {article.author}</span>
      </div>
      
      <div className="space-y-4 flex-1">
        <Link to={`/journal/${article.id}`}>
          <h3 className="text-2xl md:text-3xl font-light text-neutral-900 leading-[1.1] tracking-tight hover:text-neutral-500 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-neutral-500 font-light leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
      </div>

      <div className="pt-4">
        <Link to={`/journal/${article.id}`}>
          <Button 
            variant="premium" 
            className="w-full md:w-auto rounded-none tracking-[0.4em] py-5 px-10 text-[9px] bg-neutral-900 hover:bg-neutral-800"
          >
            Read Selection <ArrowRight size={12} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  </motion.div>
);
