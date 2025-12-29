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
    ([x, y]) => `radial-gradient(600px circle at ${Number(x)}px ${Number(y)}px, rgba(197, 160, 33, 0.05), transparent 80%)`
  );

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      whileHover={{ y: -12 }}
      transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
      className="group cursor-pointer bg-card rounded-[3rem] p-5 border border-border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_48px_96px_-12px_rgba(0,0,0,0.12)] relative overflow-hidden"
    >
      {/* Spotlight Overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background }}
      />

      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-inner transition-all duration-700">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Favorite Button */}
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)", color: "#ef4444" }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-xl rounded-full text-white transition-all active:scale-95 z-10"
        >
          <Heart className="h-5 w-5 stroke-[1.5px]" />
        </motion.button>

        {/* Tag Overlay */}
        {tag && (
          <div className="absolute bottom-6 right-6 z-10">
            <Badge className="bg-primary text-primary-foreground border-none rounded-full px-5 py-2 shadow-2xl shadow-primary/40 text-[10px] font-bold tracking-[0.2em] uppercase">
              {tag}
            </Badge>
          </div>
        )}

        {/* Availability Pulse Dot */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2.5 bg-black/30 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_12px_rgba(197,160,33,0.8)]"
          />
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] leading-none">Tersedia</span>
        </div>
      </div>

      <div className="px-2 pb-2 relative z-10 text-center">
        <h3 className="font-serif text-2xl text-foreground tracking-tight group-hover:text-primary transition-colors mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm font-medium mb-6 italic font-serif">"{location}"</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2 justify-center">
            <span className="text-3xl font-serif text-foreground tracking-tighter">Rp {price}</span>
            <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em]">/ bulan</span>
          </div>
          {customPrice}
        </div>
      </div>
    </motion.div>
  );
};
