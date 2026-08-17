"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "./data";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2800&auto=format&fit=crop" alt="Dark luxury perfume backdrop" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black" />
        </div>

        <motion.div animate={{ background: [ "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%)", "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)", "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%)" ] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 z-0 pointer-events-none" />

        <div className="relative z-10 text-center flex flex-col items-center mt-20">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-(--vsp-bronze) mb-6 font-semibold">
            The New Standard
          </motion.span>
          
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 50 }} className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] mb-8 vsp-text-glow text-white">
            Timeless <br /> 
            <span className="italic font-light text-white/50">Essence.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="max-w-md text-sm md:text-base font-light text-white/70 leading-relaxed mb-10">
            Mastercrafted botanical extracts, aged to perfection. The scent stays sharp down to the bottom of the glass.
          </motion.p>

          <Link href="/collection" className="group flex items-center gap-4 bg-transparent border border-(--vsp-bronze) px-8 py-4 text-xs uppercase tracking-widest text-white hover:bg-(--vsp-bronze) hover:text-black transition-all duration-500 cursor-pointer">
            Explore Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* 2. ATELIER SECTION */}
      <section id="atelier" className="relative py-32 px-6 border-t border-white/5 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2000&auto=format&fit=crop" alt="Essential oils background" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-linear-to-r from-black to-black/60" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center relative z-10">
          <div className="flex-1 space-y-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-(--vsp-bronze) font-semibold">Our Process</span>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] text-white">Maceration.<br/>Time as an ingredient.</h2>
            <p className="text-base text-white/60 font-light leading-relaxed max-w-md">
              We don't rush. Every batch sits in cold storage for 12 weeks before filtering. This allows the heavy base molecules to fully bond with the top notes. If the base note doesn't hold past hour six, it doesn't ship.
            </p>
          </div>
          <div className="flex-1 relative aspect-square w-full vsp-glass overflow-hidden vsp-image-reveal shadow-2xl p-2">
            <img src={PRODUCTS[1].image} alt="Fragrance bottle detail" className="w-full h-full object-cover opacity-100 hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
      </section>

      {/* 3. THE MANIFESTO */}
      <section className="py-40 px-6 bg-[#050505] flex items-center justify-center text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-white/5 blur-[120px] pointer-events-none rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-(--vsp-bronze) font-semibold block mb-8">The Philosophy</span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-white/90">
            "A great fragrance is a quiet revolution. It arrives before you do, and lingers long after you are gone."
          </h2>
          <div className="w-12 h-px bg-(--vsp-bronze) mx-auto mt-12" />
        </motion.div>
      </section>

      {/* 4. RAW MATERIALS SOURCING (Image updated to Perfume Bottle) */}
      <section className="relative py-32 px-6 overflow-hidden bg-black border-t border-white/5">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-16 items-center relative z-10">
           
           <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1 }}
             className="flex-1 space-y-8"
           >
             <span className="text-[10px] uppercase tracking-[0.3em] text-(--vsp-bronze) font-semibold">Sourcing</span>
             <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] text-white">Rare botanicals.<br/>Ethical harvests.</h2>
             <p className="text-base text-white/60 font-light leading-relaxed max-w-md">
               We source our raw materials from independent farmers across Grasse, Madagascar, and Sri Lanka. Every petal, resin, and bark is hand-selected to ensure unparalleled purity and longevity on the skin.
             </p>
             <Link href="/collection" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-(--vsp-bronze) transition-colors border-b border-white/20 hover:border-(--vsp-bronze) pb-1 mt-4">
               Discover The Origins <ArrowRight size={14} />
             </Link>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1 }}
             className="flex-1 relative aspect-[4/5] w-full vsp-glass overflow-hidden shadow-2xl p-2 group"
           >
             <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop" alt="Luxury Perfume Bottle" className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-1000" />
           </motion.div>

         </div>
      </section>

      {/* 5. EDITORIAL / JOURNAL TEASER (Images updated to Perfume Bottles) */}
      <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-(--vsp-bronze) font-semibold block mb-4">The Journal</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Editorial</h2>
            </div>
            <Link href="#" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
              Read All Entries <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group cursor-pointer"
             >
               <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden mb-8 bg-white/5">
                 <img src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop" alt="Perfume Editorial 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
               </div>
               <span className="text-[10px] text-(--vsp-bronze) uppercase tracking-widest">Guide</span>
               <h3 className="font-serif text-2xl md:text-3xl text-white mt-3 mb-4">The Art of Layering Fragrances</h3>
               <p className="text-sm text-white/50 font-light leading-relaxed max-w-md">Master the technique of combining complementary notes to create a signature scent that is entirely your own.</p>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group cursor-pointer mt-0 md:mt-24"
             >
               <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden mb-8 bg-white/5">
                 <img src="https://images.unsplash.com/photo-1585365314983-50953a7e58db?q=80&w=1000&auto=format&fit=crop" alt="Perfume Editorial 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
               </div>
               <span className="text-[10px] text-(--vsp-bronze) uppercase tracking-widest">Behind the Scenes</span>
               <h3 className="font-serif text-2xl md:text-3xl text-white mt-3 mb-4">A Season in Grasse</h3>
               <p className="text-sm text-white/50 font-light leading-relaxed max-w-md">Follow our master perfumer through the jasmine harvest in the undisputed perfume capital of the world.</p>
             </motion.div>
          </div>

        </div>
      </section>

    </main>
  );
}