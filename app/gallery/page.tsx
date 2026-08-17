"use client";

import { motion, Variants } from "framer-motion";

// Placeholder data - replace with your actual uploaded images
const galleryImages = [
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
];

// Explicitly type as Variants so TypeScript knows 'easeOut' is valid
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-12 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-playfair text-4xl uppercase tracking-widest mb-4">Gallery</h1>
        <p className="text-gray-500 font-light max-w-xl mx-auto">
          A visual exploration of our premium services and architecture.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {galleryImages.map((src, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            // Updated to the cleaner aspect-4/5 utility
            className="relative aspect-4/5 overflow-hidden group bg-gray-100"
          >
            {/* Using standard img for quick setup, upgrade to next/image for prod */}
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}