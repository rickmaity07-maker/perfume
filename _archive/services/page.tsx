"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const servicesList = [
  { id: 1, name: "Signature Consultation", duration: "45 Min", price: "$120" },
  { id: 2, name: "Premium Architectural Review", duration: "90 Min", price: "$250" },
  { id: 3, name: "Full Scope Development", duration: "Custom", price: "Let's Talk" },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-playfair text-4xl uppercase tracking-widest mb-4">Our Services</h1>
        <p className="text-gray-500 font-light max-w-xl mx-auto">
          Select a module below to begin your booking process.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {servicesList.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center"
            onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
          >
            <div>
              <h3 className="font-playfair text-xl mb-1">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.duration}</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <span className="font-semibold text-lg">{service.price}</span>
              <button 
                className="px-6 py-2 bg-black text-white text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService(service.id);
                }}
              >
                Select
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Form Expansion */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-8"
          >
            <div className="bg-gray-50 border border-gray-200 p-8">
              <h4 className="font-playfair text-2xl mb-6">Complete Booking</h4>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="p-3 border border-gray-300 w-full focus:outline-none focus:border-black transition-colors bg-white" />
                  <input type="text" placeholder="Last Name" className="p-3 border border-gray-300 w-full focus:outline-none focus:border-black transition-colors bg-white" />
                </div>
                <input type="email" placeholder="Email Address" className="p-3 border border-gray-300 w-full focus:outline-none focus:border-black transition-colors bg-white" />
                <input type="date" className="p-3 border border-gray-300 w-full focus:outline-none focus:border-black transition-colors bg-white" />
                <button className="mt-4 w-full bg-black text-white py-4 font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                  Confirm Appointment
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}