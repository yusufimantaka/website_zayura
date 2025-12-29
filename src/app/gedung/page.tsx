"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Wifi, 
  ShieldCheck, 
  Clock, 
  Utensils, 
  Car, 
  ShieldAlert,
  Sparkles,
  Camera,
  Key
} from "lucide-react";
import React from "react";

const springConfig = { type: "spring" as const, stiffness: 260, damping: 20 };

const detailedFacilities = [
  {
    title: "Sistem Keamanan Berlapis",
    description: "Kami menggunakan teknologi keamanan terbaru untuk ketenangan pikiran Anda 24 jam sehari.",
    items: [
      { icon: Camera, label: "CCTV HD di Setiap Sudut" },
      { icon: Key, label: "Akses Fingerprint & RFID" },
      { icon: ShieldAlert, label: "Secure Cluster System" }
    ]
  },
  {
    title: "Area Publik & Kolaborasi",
    description: "Ruang komunal yang dirancang untuk kenyamanan bersantai maupun kerja kelompok.",
    items: [
      { icon: Utensils, label: "Dapur Lengkap (Kompor, Microwave)" },
      { icon: Wifi, label: "Dedicated Fiber Optic WiFi" },
      { icon: Clock, label: "Akses Tanpa Jam Malam" }
    ]
  },
  {
    title: "Maintenance & Kebersihan",
    description: "Manajemen gedung profesional untuk memastikan hunian selalu dalam kondisi prima.",
    items: [
      { icon: Sparkles, label: "Daily Area Cleaning" },
      { icon: Car, label: "Parkir Motor Luas & Aman" },
      { icon: ShieldCheck, label: "On-site Staff Management" }
    ]
  }
];

export default function GedungPage() {
  return (
    <main className="min-h-screen selection:bg-primary/20 bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <div className="pt-32 md:pt-48 pb-20">
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
          <div className="text-center mb-20 px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif mb-8"
            >
              The Residence Detail
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto font-serif italic"
            >
              {"Gedung Zayura dirancang dengan filosofi modern-minimalis yang mengedepankan fungsionalitas dan privasi tinggi."}
            </motion.p>
          </div>

          {/* Detailed Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-border shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop"
                alt="Building Exterior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-12">
                <div className="text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-60">Arsitektur</p>
                  <h3 className="text-3xl font-serif">Fasad Kontemporer</h3>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-border shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop"
                alt="Common Kitchen"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-12">
                <div className="text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-60">Fasilitas</p>
                  <h3 className="text-3xl font-serif">Dapur Komunal</h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {detailedFacilities.map((section, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-muted/30 rounded-[2.5rem] p-10 border border-border"
              >
                <h2 className="text-2xl font-serif mb-6">{section.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{section.description}</p>
                <div className="space-y-6">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <item.icon size={18} />
                      </div>
                      <span className="text-sm font-bold tracking-tight">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Building Specs Table */}
        <section className="max-w-4xl mx-auto px-4 py-24 bg-card rounded-[3rem] border border-border shadow-sm text-center">
          <h2 className="text-3xl font-serif mb-12">Spesifikasi Gedung</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left px-8">
            <div className="flex justify-between border-b border-border pb-4">
              <span className="text-muted-foreground font-medium">Tahun Bangun</span>
              <span className="font-bold">2024 (Brand New)</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="text-muted-foreground font-medium">Total Lantai</span>
              <span className="font-bold">3 Lantai</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="text-muted-foreground font-medium">Kapasitas Parkir</span>
              <span className="font-bold">24 Motor, 3 Mobil</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="text-muted-foreground font-medium">Kecepatan WiFi</span>
              <span className="font-bold">Up to 400 Mbps</span>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
