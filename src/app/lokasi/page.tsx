"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Coffee, Printer, Store, TrainFront, Compass } from "lucide-react";
import React from "react";

const poIs = [
  {
    category: "Pusat Pendidikan",
    icon: GraduationCap,
    items: [
      { name: "UIN Maliki (Pintu Belakang)", time: "5 Menit Jalan Kaki", dist: "400m" },
      { name: "Universitas Brawijaya (UB)", time: "3 Menit Berkendara", dist: "850m" },
      { name: "Politeknik Negeri Malang (POLINEMA)", time: "7 Menit Berkendara", dist: "1.8km" }
    ]
  },
  {
    category: "Kuliner & Lifestyle",
    icon: Coffee,
    items: [
      { name: "Kerto Coffee Strip", time: "2 Menit Jalan Kaki", dist: "150m" },
      { name: "Warung Spesial Sambal (SS)", time: "4 Menit Jalan Kaki", dist: "350m" },
      { name: "Starbucks Soekarno Hatta", time: "6 Menit Berkendara", dist: "1.5km" }
    ]
  },
  {
    category: "Kebutuhan Harian",
    icon: Store,
    items: [
      { name: "Alfamart / Indomaret", time: "1 Menit Jalan Kaki", dist: "100m" },
      { name: "Pasar Dinoyo City", time: "5 Menit Berkendara", dist: "1.2km" },
      { name: "ATM Center (Mandiri, BNI, BCA)", time: "2 Menit Jalan Kaki", dist: "200m" }
    ]
  }
];

export default function LokasiPage() {
  return (
    <main className="min-h-screen selection:bg-primary/20 bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <div className="pt-32 md:pt-48 pb-20">
        <section className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif mb-8"
            >
              Jelajahi Sekitar
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto font-serif italic"
            >
              {"Berada di jantung Gajayana yang dinamis, Zayura Exclusive adalah pusat dari segala kebutuhan akademis dan gaya hidup Anda."}
            </motion.p>
          </div>

          {/* Interactive Map (Enhanced) */}
          <div className="bg-white dark:bg-card rounded-[3rem] p-4 border border-border shadow-2xl overflow-hidden mb-24">
            <div className="relative h-[500px] md:h-[700px] rounded-[2.5rem] overflow-hidden">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.447447141441!2d112.6052003106414!3d-7.948050679348421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTYnNTMuMCJTIDExMsKwMzYnMjYuNiJF!5e0!3m2!1sen!2sid!4v1703830000000!5m2!1sen!2sid" 
                 width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
                 className="grayscale contrast-125 dark:opacity-60"
               ></iframe>
               <div className="absolute top-8 left-8 p-6 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-2xl border border-border shadow-xl">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                   <span className="font-bold text-sm tracking-tight">Zayura Exclusive</span>
                 </div>
                 <p className="text-xs text-muted-foreground font-medium">Jl. Gajayana, Malang</p>
               </div>
            </div>
          </div>

          {/* Nearby Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            {poIs.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <cat.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-serif">{cat.category}</h3>
                </div>
                <div className="space-y-8">
                  {cat.items.map((item, j) => (
                    <div key={j} className="flex flex-col gap-1 border-l-2 border-border pl-6 relative">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary" />
                      <h4 className="font-bold text-sm tracking-tight">{item.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                        <span>{item.time}</span>
                        <span>•</span>
                        <span>{item.dist}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Transportation / Access */}
          <div className="bg-muted/30 rounded-[3rem] p-12 md:p-20 text-center">
            <h3 className="text-3xl font-serif mb-8">Aksesibilitas & Lingkungan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm">
                  <TrainFront size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Transportasi Publik</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Dekat dengan rute Angkot (LDG, GML) dan mudah diakses oleh ojek online 24 jam karena berada di jalur utama mahasiswa.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm">
                  <Compass size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Suasana Lingkungan</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Berada di dalam cluster premium yang terjaga (One Gate System), menjamin ketenangan istirahat meski di tengah pusat kota.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
