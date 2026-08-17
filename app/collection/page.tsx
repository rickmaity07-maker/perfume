"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import NoteRings from "../NoteRings";
import BottleArt from "../BottleArt";
import { PRODUCTS } from "../data";
import { useCart } from "../ClientLayout";

export default function CollectionPage() {
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen pt-20">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1608528577891-eb05ebec5ba8?q=80&w=2000&auto=format&fit=crop" alt="Smoke and amber texture" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h1 className="font-serif text-3xl md:text-5xl text-white">The Signature Series</h1>
            <div className="w-12 h-px bg-(--vsp-bronze) mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, idx) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: (idx % 3) * 0.2, ease: [0.16, 1, 0.3, 1] }} className="group relative flex flex-col">
                <div className="relative aspect-3/4 overflow-hidden vsp-glass p-8 flex items-center justify-center shadow-2xl">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100 relative z-10" />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-700 z-20" />
                  
                  <div className="absolute bottom-8 left-0 right-0 flex justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 z-30">
                    <button onClick={() => addToCart(product)} className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-(--vsp-bronze) cursor-pointer">
                      <ShoppingBag size={14} /> Quick Add — €{product.price}
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col items-center text-center cursor-default">
                  <NoteRings top={product.top} heart={product.heart} base={product.base} size={60} className="mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <h3 className="font-serif text-2xl tracking-wide text-white">{product.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-(--vsp-bronze) mt-3">
                    {product.top[0]} & {product.base[0]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}