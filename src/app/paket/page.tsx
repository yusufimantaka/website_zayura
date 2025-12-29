"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ListingGrid } from "@/components/ListingGrid";
import { motion } from "framer-motion";
import { Check, X, Wallet, ShieldCheck, Clock, Calendar } from "lucide-react";
import React from "react";

const springConfig = { type: "spring" as const, stiffness: 260, damping: 20 };

const inclusionData = [
  { item: "Sewa Kamar Full Furnished", included: true },
  { item: "Fast WiFi (Up to 400 Mbps)", included: true },
  { item: "Kebersihan Area Umum (Daily)", included: true },
  { item: "Maintenance Gedung", included: true },
  { item: "Iuran Keamanan Cluster", included: true },
  { item: "Sampah & Lingkungan", included: true },
  { item: "Listrik (Sistem Token Pribadi)", included: false },
  { item: "Jasa Laundry (Partnered)", included: false },
];

export default function PaketPage() {
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
              Investasi Kenyamanan
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto font-serif italic"
            >
              {"Transparansi biaya adalah komitmen kami. Pilih paket yang paling sesuai dengan durasi studi Anda."}
            </motion.p>
          </div>
          
          <ListingGrid />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-32">
            {/* Inclusion List */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-[3rem] p-12 border border-border shadow-sm"
            >
              <h3 className="text-3xl font-serif mb-10">Inklusi Layanan</h3>
              <div className="space-y-6">
                {inclusionData.map((data, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className={`text-sm font-medium ${data.included ? 'text-foreground' : 'text-muted-foreground'}`}>{data.item}</span>
                    {data.included ? (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <X size={14} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Terms & Payment */}
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-muted/30 rounded-[3rem] p-12 border border-border"
              >
                <div className="flex items-center gap-4 mb-8">
                  <Wallet size={24} className="text-primary" />
                  <h3 className="text-2xl font-serif">Sistem Pembayaran</h3>
                </div>
                <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                  <p>• <strong>Deposit Keamanan:</strong> Diperlukan deposit sebesar 1 bulan sewa (dikembalikan saat akhir masa sewa).</p>
                  <p>• <strong>Metode Bayar:</strong> Transfer Bank (BCA, Mandiri) atau Pembayaran Digital lainnya.</p>
                  <p>• <strong>Skema Diskon:</strong> Pembayaran langsung per 3 bulan mendapatkan potongan khusus (lihat detail di kartu harga).</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-[3rem] p-12 border border-border shadow-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <Calendar size={24} className="text-primary" />
                  <h3 className="text-2xl font-serif">Kebijakan Sewa</h3>
                </div>
                <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                  <p>• <strong>Minimal Durasi:</strong> Minimal sewa adalah 1 bulan.</p>
                  <p>• <strong>Check-in:</strong> Mulai pukul 14.00 WIB pada tanggal mulai sewa.</p>
                  <p>• <strong>Perpanjangan:</strong> Konfirmasi perpanjangan minimal 14 hari sebelum masa sewa berakhir.</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Inventory Summary (Restored from previous design) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springConfig}
            className="mt-32 max-w-5xl mx-auto bg-muted dark:bg-black/40 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative overflow-hidden border border-border"
          >
            <div className="relative z-10 text-center md:text-left md:pr-16">
              <h4 className="text-3xl md:text-4xl font-serif mb-4">Inventory Kamar</h4>
              <p className="text-muted-foreground font-medium leading-relaxed text-sm md:text-base italic">"Ketersediaan unit diperbarui setiap hari."</p>
            </div>
            <div className="relative z-10 flex flex-1 items-center justify-between w-full max-w-2xl">
              {[
                { label: "Lantai 1", count: "04" },
                { label: "Lantai 2", count: "10" },
                { label: "Lantai 3", count: "10" }
              ].map((floor, i) => (
                <React.Fragment key={i}>
                  <div className="text-center flex-1">
                    <p className="text-primary font-serif text-4xl md:text-6xl tracking-tighter mb-2">{floor.count}</p>
                    <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-[0.3em]">{floor.label}</p>
                  </div>
                  {i < 2 && <div className="h-16 w-[1px] bg-border shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
