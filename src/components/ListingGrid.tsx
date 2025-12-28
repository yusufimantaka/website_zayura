"use client";

import { motion, Variants } from "framer-motion";
import { PropertyCard } from "./PropertyCard";

const roomData = [
  { 
    id: 1,
    key: 'small',
    price: "2.000.000",
    discount: "1.900.000",
    location: "Lantai 2 & 3",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
  },
  { 
    id: 2,
    key: 'medium',
    price: "2.100.000",
    discount: "2.000.000",
    location: "Lantai 1, 2, & 3",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
    tag: "Terpopuler"
  },
  { 
    id: 3,
    key: 'large',
    price: "2.200.000",
    discount: "2.100.000",
    location: "Lantai 2 & 3",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop",
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 } 
  }
};

export const ListingGrid = () => {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col gap-12"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {roomData.map((room) => (
          <motion.div key={room.id} variants={item}>
            <PropertyCard 
              image={room.image}
              name={room.key === 'small' ? "Kamar Small" : room.key === 'medium' ? "Kamar Medium" : "Kamar Large"}
              location={room.location}
              price={room.price}
              tag={room.tag}
              customPrice={
                <div className="mt-1 p-2.5 md:p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl md:rounded-2xl border border-amber-100 dark:border-amber-500/20 group-hover:bg-white dark:group-hover:bg-white/10 transition-colors duration-500 text-left">
                  <p className="text-[8px] md:text-[10px] font-black text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-0.5 md:mb-1">Bayar per 3 bulan</p>
                  <p className="text-amber-700 dark:text-amber-400 font-black text-base md:text-lg tracking-tight">Rp {room.discount} <span className="text-[10px] md:text-xs font-medium text-amber-600 dark:text-amber-500/80">/ bulan</span></p>
                </div>
              }
            />
          </motion.div>
        ))}
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-gray-500 font-black text-sm italic"
      >
        *Belum termasuk biaya listrik (token)
      </motion.p>
    </motion.div>
  );
};
