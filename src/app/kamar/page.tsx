"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyGallery } from "@/components/PropertyGallery";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

const roomDetails = [
  {
    type: "Tipe Small",
    description: "Ruang privat yang efisien dengan fasilitas lengkap standar premium Zayura.",
    features: ["Queen Sized Bed", "AC", "Water Heater", "Smart TV 14\"", "Kunci Fingerprint", "Meja Belajar & Kursi", "Lemari Pakaian"],
    specs: "Luas Kamar: 12m² | Listrik: 900W (Token)"
  },
  {
    type: "Tipe Medium",
    description: "Keseimbangan sempurna antara luas ruang dan fungsionalitas untuk produktivitas Anda.",
    features: ["Queen Sized Bed", "AC", "Water Heater", "Smart TV 14\"", "Kunci Fingerprint", "Meja Belajar & Kursi", "Lemari Pakaian"],
    specs: "Luas Kamar: 16m² | Listrik: 1300W (Token)"
  },
  {
    type: "Tipe Large",
    description: "Ruang terluas kami yang memberikan keleluasaan maksimal untuk beristirahat dan bekerja.",
    features: ["Queen Sized Bed", "AC", "Water Heater", "Smart TV 14\"", "Kunci Fingerprint", "Meja Belajar & Kursi", "Lemari Pakaian"],
    specs: "Luas Kamar: 20m² | Listrik: 1300W (Token)"
  }
];

export default function KamarPage() {
  return (
    <main className="min-h-screen selection:bg-primary/20 bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <div className="pt-32 md:pt-48 pb-20">
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif mb-8"
          >
            Kamar Kos Putri Eksklusif Malang
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-serif italic"
          >
            {"Setiap kamar kos di Gajayana ini dirancang dengan standar hotel untuk mendukung kenyamanan mahasiswi UB & UIN Malang."}
          </motion.p>
        </section>

        <PropertyGallery />

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {roomDetails.map((room, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-[2.5rem] p-8 md:p-10 border border-border shadow-sm hover:shadow-xl transition-all group"
              >
                <h2 className="text-2xl md:text-3xl font-serif mb-6 group-hover:text-primary transition-colors">{room.type}</h2>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{room.description}</p>
                
                <div className="space-y-4 mb-10">
                  {room.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-border flex items-start gap-3">
                  <Info size={16} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">{room.specs}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-24 text-center border-t border-border mt-12">
          <h3 className="text-2xl md:text-4xl font-serif mb-8">Kenyamanan yang Standar</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Pembersihan Berkala", "Laundry Service", "Maintenance 24j", "Fast WiFi"].map((item, i) => (
              <div key={i}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Benefit</p>
                <p className="font-serif text-lg">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
