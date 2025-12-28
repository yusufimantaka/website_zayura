"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface PropertyCardProps {
  image: string;
  name: string;
  location: string;
  price: string;
  tag?: string;
  customPrice?: React.ReactNode;
}

export const PropertyCard = ({ image, name, location, price, tag, customPrice }: PropertyCardProps) => {
  // --- Spotlight Effect Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${Number(x)}px ${Number(y)}px, rgba(255, 191, 0, 0.08), transparent 80%)`
  );

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
      className="group cursor-pointer bg-card rounded-[2.5rem] p-4 border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
    >
      {/* Spotlight Overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background }}
      />

      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-sm transition-all duration-500">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Favorite Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all active:scale-95 z-10"
        >
          <Heart className="h-5 w-5 transition-colors" />
        </motion.button>

        {/* Tag Overlay */}
        {tag && (
          <div className="absolute bottom-4 right-4 z-10">
            <Badge className="bg-primary text-primary-foreground border-none rounded-full px-3.5 py-1.5 shadow-lg shadow-primary/20 text-[10px] font-black tracking-widest uppercase">
              {tag}
            </Badge>
          </div>
        )}

        {/* Availability Pulse Dot */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-center">
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
          />
          <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Tersedia</span>
        </div>
      </div>

      <div className="px-2 pb-2 relative z-10">
        <h3 className="font-black text-foreground text-xl tracking-tight group-hover:text-primary transition-colors mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm font-medium mb-5 leading-relaxed">{location}</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-1.5 justify-center md:justify-start">
            <span className="text-2xl font-black text-foreground tracking-tighter">Rp {price}</span>
            <span className="text-gray-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest">/ bulan</span>
          </div>
          {customPrice}
        </div>
      </div>
    </motion.div>
  );
};
