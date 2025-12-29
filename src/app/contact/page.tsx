"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Mail, Phone, Clock } from "lucide-react";
import React from "react";

const springConfig = { type: "spring" as const, stiffness: 260, damping: 20 };

export default function ContactPage() {
  return (
    <main className="min-h-screen selection:bg-primary/20 bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <div className="pt-32 md:pt-48 pb-20">
        <section className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif mb-8"
            >
              Hubungi Kami
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto font-serif italic"
            >
              {"Kami siap menjawab pertanyaan Anda dan membantu proses pemesanan hunian impian Anda."}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-[3rem] p-10 border border-border shadow-sm"
              >
                <h3 className="text-3xl font-serif mb-10">Informasi Kontak</h3>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Telepon / WhatsApp</p>
                      <p className="text-xl font-bold">+62 812-3456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                      <p className="text-xl font-bold">hello@zayura.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Lokasi</p>
                      <p className="text-xl font-bold">Jl. Gajayana No. 123, Malang</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-muted/30 rounded-[3rem] p-10 border border-border"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Clock size={20} className="text-primary" />
                  <h4 className="font-bold tracking-tight">Jam Operasional Kantor</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Senin - Jumat</span>
                    <span className="font-bold text-foreground">08:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu</span>
                    <span className="font-bold text-foreground">09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu</span>
                    <span className="font-bold text-foreground">Tutup</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Box */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-primary rounded-[4rem] p-12 md:p-20 flex flex-col items-center justify-center text-center text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                   style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} 
              />
              <div className="relative z-10">
                <MessageCircle size={80} strokeWidth={1} className="mb-10 mx-auto opacity-50" />
                <h3 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Fast Response via WhatsApp</h3>
                <p className="text-lg md:text-xl mb-12 opacity-80 font-serif italic">
                  {"Dapatkan respon tercepat untuk ketersediaan unit dan jadwal visit melalui WhatsApp resmi kami."}
                </p>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-foreground text-primary px-12 py-6 rounded-full text-base font-bold uppercase tracking-[0.2em] shadow-xl inline-block"
                >
                  Hubungi Sekarang
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

