"use client";

import React, { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// Removed the brand icons from this import:
import { ShoppingBag, Search, Menu, X, Plus, Minus } from "lucide-react";

// --- GLOBAL CART STATE ---
type CartItem = { product: any; quantity: number };
interface CartContextType {
  cartItems: CartItem[]; cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: any) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  cartTotal: number; cartCount: number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

// --- GLOBAL SHELL UI ---
function Shell({ children }: { children: React.ReactNode }) {
  const { cartItems, cartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  // Design concepts bring their own nav and footer; keep only the cart drawer there.
  const bare = usePathname()?.startsWith("/concepts") ?? false;

  return (
    <>
      {/* NAVBAR */}
      {!bare && (
      <header className="fixed top-0 left-0 right-0 z-40 vsp-glass border-b border-white/5 h-20 flex items-center px-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold">
            <button onClick={() => setMenuOpen(true)} className="md:hidden hover:text-(--vsp-bronze) transition-colors"><Menu size={24} /></button>
            <Link href="/collection" className="hidden md:block hover:text-(--vsp-bronze) transition-colors">Collection</Link>
            <Link href="/#atelier" className="hidden md:block hover:text-(--vsp-bronze) transition-colors">Atelier</Link>
          </div>
          
          <Link href="/" className="font-serif text-3xl tracking-widest text-white font-semibold uppercase absolute left-1/2 -translate-x-1/2">
            Vespre
          </Link>
          
          <div className="flex items-center gap-6 text-white/70">
            <button onClick={() => setSearchOpen(true)} className="hover:text-(--vsp-bronze) transition-colors"><Search size={20} /></button>
            <button onClick={() => setCartOpen(true)} className="relative hover:text-(--vsp-bronze) transition-colors group">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-(--vsp-bronze) text-black text-[9px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full transition-colors">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      )}

      {/* OVERLAYS */}
      <AnimatePresence>
        {/* Cart Drawer */}
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", bounce: 0, duration: 0.6 }} className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <h2 className="font-serif text-2xl text-white">Your Bag ({cartCount})</h2>
                <button onClick={() => setCartOpen(false)} className="text-white/50 hover:text-white transition-colors"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6">
                {cartItems.length === 0 ? ( <p className="text-white/40 font-light text-center mt-20">Your bag is currently empty.</p> ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-sm border border-white/5">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover" />
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-white mb-1">{item.product.name}</h3>
                        <p className="text-[10px] text-(--vsp-bronze) uppercase tracking-widest mb-3">€{item.product.price}</p>
                        <div className="flex items-center gap-4 text-white">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="hover:text-(--vsp-bronze)"><Minus size={14} /></button>
                          <span className="text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="hover:text-(--vsp-bronze)"><Plus size={14} /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-white/30 hover:text-white text-xs uppercase tracking-widest underline underline-offset-4">Remove</button>
                    </div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="border-t border-white/10 pt-6 mt-6">
                  <div className="flex justify-between text-white font-serif text-xl mb-6"><span>Subtotal</span><span>€{cartTotal}</span></div>
                  <button className="w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-(--vsp-bronze) transition-colors">Checkout Securely</button>
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* Search Modal */}
        {searchOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-50 flex items-center justify-center p-6">
            <button onClick={() => setSearchOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={32} /></button>
            <div className="w-full max-w-3xl flex flex-col gap-4">
              <span className="text-[10px] text-(--vsp-bronze) uppercase tracking-[0.3em]">Search Library</span>
              <input autoFocus type="text" placeholder="Search fragrances..." className="w-full bg-transparent border-b-2 border-white/20 pb-4 text-3xl md:text-5xl font-serif text-white outline-none placeholder:text-white/20 focus:border-(--vsp-bronze) transition-colors" />
            </div>
          </motion.div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '-100%' }} className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col p-8 md:hidden">
            <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={32} /></button>
            <div className="mt-20 flex flex-col gap-8 text-3xl font-serif">
              <Link href="/collection" onClick={() => setMenuOpen(false)} className="text-white hover:text-(--vsp-bronze) transition-colors">Collection</Link>
              <Link href="/#atelier" onClick={() => setMenuOpen(false)} className="text-white hover:text-(--vsp-bronze) transition-colors">Atelier</Link>
              <Link href="/#contact" onClick={() => setMenuOpen(false)} className="text-white hover:text-(--vsp-bronze) transition-colors">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAGE CONTENT */}
      {children}

      {/* --- UPGRADED LUXURY FOOTER --- */}
      {!bare && (
      <footer id="contact" className="relative bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Section: Links & Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
            
            {/* Brand & Address */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <span className="font-serif text-3xl tracking-widest uppercase text-white">VESPRE</span>
              <div className="text-xs text-white/50 font-light leading-relaxed space-y-4">
                <p>
                  <strong className="text-white font-medium block mb-1">Maison & Headquarters</strong>
                  42 Avenue Montaigne<br/>
                  75008 Paris, France
                </p>
                <p>
                  <strong className="text-white font-medium block mb-1">Atelier & Extraction</strong>
                  Domaine de la Rose, 124 Route de Pégomas<br/>
                  06130 Grasse, France
                </p>
                <p className="pt-2">
                  <a href="mailto:concierge@vespre.com" className="hover:text-(--vsp-bronze) transition-colors">concierge@vespre.com</a><br/>
                  +33 1 40 50 60 70
                </p>
              </div>
            </div>

            {/* Client Care */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-(--vsp-bronze) mb-2">Client Care</h4>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Contact Us</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Shipping & Delivery</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Returns & Exchanges</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">FAQ</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Track Order</Link>
            </div>

            {/* The Maison */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-(--vsp-bronze) mb-2">The Maison</h4>
              <Link href="/#atelier" className="text-xs text-white/60 hover:text-white transition-colors">Our Story</Link>
              <Link href="/collection" className="text-xs text-white/60 hover:text-white transition-colors">The Collection</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Sustainability</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Boutiques</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Careers</Link>
            </div>

            {/* Newsletter & Socials */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-(--vsp-bronze)">Stay Close to the Edit</h4>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Subscribe to receive invitations to private releases, editorial journals, and atelier news.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); if(email) setSubscribed(true); }} className="flex border-b border-white/20 pb-3 focus-within:border-(--vsp-bronze) transition-colors mt-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-white/30" 
                />
                <button type="submit" className="text-[10px] uppercase tracking-widest hover:text-(--vsp-bronze) transition-colors text-white cursor-pointer">
                  {subscribed ? 'Joined' : 'Subscribe'}
                </button>
              </form>
              
              {/* Premium Typographic Social Links instead of SVGs */}
              <div className="flex items-center gap-6 mt-4 text-white/50">
                <a href="#" className="text-[10px] uppercase tracking-[0.15em] hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-[10px] uppercase tracking-[0.15em] hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-[10px] uppercase tracking-[0.15em] hover:text-white transition-colors">Facebook</a>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-[10px] text-white/40 uppercase tracking-wider font-light gap-4">
            <p>&copy; {new Date().getFullYear()} Vespre Parfums. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>

        </div>
      </footer>
      )}
    </>
  );
}

// --- PROVIDER WRAPPER ---
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const updateQuantity = (id: number, delta: number) => setCartItems(prev => prev.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(item => item.product.id !== id));
  
  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartOpen, setCartOpen, addToCart, updateQuantity, removeFromCart, cartTotal, cartCount }}>
      <Shell>{children}</Shell>
    </CartContext.Provider>
  );
}