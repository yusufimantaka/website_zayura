"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ListingGrid } from "@/components/ListingGrid";
import { PropertyGallery } from "@/components/PropertyGallery";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { 
  Wifi, 
  MapPin, 
  ShieldCheck, 
  Bed, 
  Clock,
  MessageCircle,
  Utensils,
  Car,
  GraduationCap,
  Coffee,
  Printer,
  ArrowRight,
  Play
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Animation Physics ---
const springConfig = { type: "spring" as const, stiffness: 260, damping: 20 };

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: springConfig }
};

const faqCategories = [
  {
    id: "umum",
    label: "Umum",
    items: [
      { q: "Apakah harga sewa sudah termasuk listrik?", a: "Harga sewa belum termasuk biaya listrik. Setiap kamar dilengkapi dengan meteran listrik (token) masing-masing yang diisi sendiri sesuai pemakaian." },
      { q: "Berapa minimal durasi sewa?", a: "Minimal sewa adalah 1 bulan. Namun, kami sangat menyarankan paket per 3 bulan untuk mendapatkan harga spesial (Hemat hingga Rp 300.000)." },
      { q: "Apakah tersedia jasa laundry?", a: "Ya, kami bekerja sama dengan mitra laundry terpercaya dengan harga khusus mahasiswa yang berlokasi sangat dekat." },
    ]
  },
  {
    id: "fasilitas",
    label: "Fasilitas",
    items: [
      { q: "Apakah kamar dibersihkan oleh pengelola?", a: "Untuk menjaga privasi penuh penghuni, kebersihan di dalam kamar adalah tanggung jawab masing-masing. Tim <i>Housekeeping</i> kami fokus menjaga kebersihan area umum, lorong, dan dapur setiap hari." },
      { q: "Bagaimana kebijakan parkir mobil?", a: "Kami menyediakan slot parkir mobil eksklusif namun terbatas (hanya 3 slot). Mohon konfirmasi ketersediaan slot saat pemesanan. Parkir motor tersedia luas dan gratis." },
    ]
  },
  {
    id: "aturan",
    label: "Aturan",
    items: [
      { q: "Apakah ada jam malam (Curfew)?", a: "Akses hunian bebas 24 jam dengan sistem keamanan fingerprint. Namun, kami menerapkan Jam Tenang (Quiet Hours) mulai pukul 22.00 WIB demi kenyamanan istirahat bersama." },
      { q: "Apakah boleh membawa tamu lawan jenis?", a: "Untuk kenyamanan dan privasi penghuni, tamu lawan jenis hanya diperbolehkan bertemu di area ruang tamu lantai 1." },
      { q: "Bolehkah membawa hewan peliharaan (Pets)?", a: "Demi kenyamanan dan kebersihan bersama (alergi/bau), kami menerapkan kebijakan No Pets Allowed (Tidak diperkenankan membawa hewan peliharaan jenis apapun)." },
    ]
  }
];

const facilities = [
  { icon: Wifi, title: "Internet Cepat", text: "Fiber optik kecepatan tinggi untuk belajar dan bekerja.", spec: "Up to 400 Mbps" },
  { icon: ShieldCheck, title: "Keamanan Modern", text: "CCTV 24 jam dan kunci pintu sidik jari (fingerprint).", spec: "Biometric" },
  { icon: Clock, title: "Akses 24 Jam", text: "Kebebasan akses keluar masuk tanpa jam malam.", spec: "Self Access" },
  { icon: Utensils, title: "Dapur Bersama", text: "Area memasak lengkap untuk seluruh penghuni.", spec: "Full Equipment" },
  { icon: Car, title: "Parkir Luas", text: "Lahan aman untuk motor dan tersedia untuk 3 mobil.", spec: "CCTV Monitored" },
  { icon: Bed, title: "Fasilitas Kamar", text: "Semua tipe kamar dilengkapi Queen Bed, AC, Water Heater, dan Smart TV.", spec: "Premium Standard" },
];

const marqueeItems = [
  "Fast Internet",
  "3 Min to UB",
  "Fingerprint Access",
  "Prime Location",
  "Secure Cluster",
  "No Curfew",
  "Common Kitchen",
  "CCTV 24h"
];

const neighborhoodBenefits = [
  {
    category: "The Academic Circle (Anti Telat)",
    icon: GraduationCap,
    items: [
      { 
        title: "Walking Distance ke UIN Maliki (400m)", 
        desc: "Cukup 5 menit jalan kaki santai. Anda bisa pulang ke kost di sela-sela jeda kuliah untuk istirahat atau sholat." 
      },
      { 
        title: "Akses Cepat ke UB (Gerbang Watugong/Soehat)", 
        desc: "Akses jalan tikus yang cepat menuju Fakultas Teknik, MIPA, atau Kedokteran UB." 
      }
    ]
  },
  {
    category: "Student Lifestyle Ecosystem",
    icon: Coffee,
    items: [
      { 
        title: "Pusat 'Nugas' & Kopi", 
        desc: "Dikelilingi puluhan Coffee Shop hits area Kerto & Gajayana yang buka sampai malam." 
      },
      { 
        title: "Logistik 24 Jam", 
        desc: "Hanya 200m ke Alfamart/Indomaret terdekat. Pusat kuliner mahasiswa yang hidup 24 jam." 
      }
    ]
  },
  {
    category: "Penunjang Akademik",
    icon: Printer,
    items: [
      { 
        title: "Digital Printing & Laundry Hub", 
        desc: "Tidak perlu pusing saat deadline. Area ini dipenuhi jasa laundry kilat dan percetakan dokumen." 
      }
    ]
  }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen selection:bg-primary/20 pb-20 text-gray-900 overflow-x-hidden relative">
      <Navbar />

      {/* SEO H1 */}
      <h1 className="sr-only">Zayura Exclusive: Kost Putri Eksklusif & Premium Malang dekat UB & UIN</h1>

      {/* 1. Hero */}
      <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 md:py-0">
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop"
            alt="Interior Kos Putri Eksklusif Zayura Malang dekat Universitas Brawijaya"
            fill
            className="object-cover brightness-[0.6]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background transition-colors duration-300" />
        </motion.div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-20 pb-12">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center"
          >
            <motion.div 
              variants={fadeInUp}
              className="mb-8 md:mb-12 flex items-center gap-3 px-4 py-1.5"
            >
              <motion.span 
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"
              />
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">Permintaan Tinggi</span>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mb-8 md:mb-12 relative w-full max-w-[280px] md:max-w-[700px] aspect-[4/1]"
            >
              <Image 
                src="/images/logo.png" 
                alt="Zayura Exclusive" 
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-8 md:mb-10">
              <p className="text-white/60 text-[10px] md:text-xs font-medium tracking-[1em] uppercase ml-[1em]">Gajayana</p>
            </motion.div>

            {/* Female Only Badge - Relocated to above headline */}
            <motion.div
              variants={fadeInUp}
              className="mb-8 px-5 py-2 rounded-full bg-pink-500/10 backdrop-blur-md border border-pink-500/20 text-pink-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 mx-auto w-fit"
            >
              <span className="text-xs">🌸</span> KOST KHUSUS PUTRI / FEMALE ONLY
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-4xl mb-12 md:mb-16">
              <h2 className="text-white text-2xl md:text-4xl font-serif italic mb-6 leading-tight">
                {"\"Kost Putri Eksklusif & Premium Terdekat dari UB & UIN Malang.\""}
              </h2>
              <p className="text-white/70 text-sm md:text-lg font-medium tracking-wide">
                Fasilitas lengkap: AC, Water Heater, WiFi 400Mbps. Aman dengan Security & CCTV 24 Jam.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 md:gap-8 w-full max-w-[320px] sm:max-w-none justify-center relative z-30"
            >
              <Link
                href="/paket"
                className="bg-primary text-primary-foreground px-10 md:px-14 py-4 md:py-5 rounded-full text-sm md:text-base font-bold uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(197,160,33,0.25)] flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-95"
              >
                Amankan Slot
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
              <Link
                href="/kamar"
                className="bg-white/5 backdrop-blur-xl text-white border border-white/20 px-10 md:px-14 py-4 md:py-5 rounded-full text-sm md:text-base font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-white/10 hover:-translate-y-1 active:scale-95"
              >
                Lihat Galeri
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Infinite Marquee */}
      <div className="relative py-12 md:py-20 overflow-hidden bg-background border-y border-border select-none z-10">
        <div className="flex whitespace-nowrap">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="flex items-center gap-12 md:gap-24">
                <span className="text-xl md:text-4xl font-serif italic tracking-wider text-muted-foreground/30">{item}</span>
                <span className="text-primary/20 text-2xl font-serif">∗</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 3. Galeri Kamar */}
      <PropertyGallery />

      {/* 4. The Residence (Eksterior & Fasilitas) - ENHANCED with more photos */}
      <section id="residence" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
        <div className="text-center mb-16 md:mb-24 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4"
          >
            The Residence
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springConfig, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-gray-900 dark:text-foreground tracking-tight"
          >
            Eksterior & Fasilitas Bersama
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {/* Main Photo 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-8 md:row-span-2 relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden group border border-border shadow-2xl h-[400px] md:h-[800px]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop"
              alt="Building Exterior"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
              <h4 className="text-white text-3xl md:text-5xl font-serif mb-4">Gedung Eksklusif</h4>
              <p className="text-white/60 text-lg font-serif italic">"Privasi dan keamanan dalam balutan arsitektur kontemporer."</p>
            </div>
          </motion.div>

          {/* Photo 2: Kitchen */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group border border-border h-[300px] md:h-[385px]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop"
              alt="Common Kitchen"
              fill
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-700 flex items-center justify-center p-8">
              <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <h5 className="text-white text-2xl font-serif mb-2">Dapur Bersama</h5>
                <p className="text-white/70 text-xs uppercase tracking-widest">Peralatan Masak Lengkap</p>
              </div>
            </div>
          </motion.div>

          {/* Photo 3: Lounge */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group border border-border h-[300px] md:h-[385px]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1000&auto=format&fit=crop"
              alt="Lobby Area"
              fill
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-700 flex items-center justify-center p-8">
              <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <h5 className="text-white text-2xl font-serif mb-2">Lobby & Lounge</h5>
                <p className="text-white/70 text-xs uppercase tracking-widest">Ruang Tunggu & Kolaborasi</p>
              </div>
            </div>
          </motion.div>

          {/* Photo 4: Parking Area (Additional) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-6 relative rounded-[2rem] md:rounded-[3.5rem] overflow-hidden group border border-border h-[300px] md:h-[400px]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1590674867585-81c3723929f0?q=80&w=1000&auto=format&fit=crop"
              alt="Parking Area"
              fill
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-700 flex items-center justify-center p-8">
              <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <h5 className="text-white text-2xl font-serif mb-2">Area Parkir</h5>
                <p className="text-white/70 text-xs uppercase tracking-widest">Aman dengan CCTV 24 Jam</p>
              </div>
            </div>
          </motion.div>

          {/* Photo 5: Security / Entrance (Additional) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-6 relative rounded-[2rem] md:rounded-[3.5rem] overflow-hidden group border border-border h-[300px] md:h-[400px]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
              alt="Security Entrance"
              fill
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-700 flex items-center justify-center p-8">
              <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <h5 className="text-white text-2xl font-serif mb-2">Sistem Keamanan</h5>
                <p className="text-white/70 text-xs uppercase tracking-widest">Akses Fingerprint & RFID</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/gedung"
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs border-b-2 border-primary/20 pb-1 hover:border-primary transition-all"
          >
            Lihat Detail Gedung & Fasilitas
            <ArrowRight size={14} />
          </motion.a>
        </div>
      </section>

      {/* 5. Standar Kami (Facilities Icons) - RESTORED */}
      <section id="keunggulan" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
        <div className="bg-white dark:bg-card rounded-[3rem] p-8 md:p-24 border border-border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-between mb-20 md:mb-24 px-2 text-center lg:text-left">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4"
              >
                Standar Kami
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...springConfig, delay: 0.1 }}
                className="text-4xl md:text-6xl font-serif text-gray-900 dark:text-foreground tracking-tight leading-tight"
              >
                Segala yang Anda butuhkan untuk kenyamanan.
              </motion.h3>
            </div>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-lg md:text-xl max-w-sm font-serif italic leading-relaxed lg:mt-12 mx-auto lg:mx-0"
            >
              "Kami merancang setiap fasilitas untuk mendukung produktivitas dan kenyamanan Anda."
            </motion.p>
          </div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
          >
            {facilities.map((f, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="group text-center md:text-left"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  transition={springConfig}
                  className="text-primary mb-8 mx-auto md:mx-0"
                >
                  <f.icon size={32} strokeWidth={1.5} />
                </motion.div>
                <h4 className="font-serif text-2xl text-gray-900 dark:text-foreground mb-4 tracking-tight">{f.title}</h4>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8">{f.text}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="bg-muted dark:bg-white/5 text-primary text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] border border-border">
                    {f.spec}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Lokasi */}
      <section id="location" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springConfig}
          className="bg-white dark:bg-card rounded-[3rem] p-8 md:p-24 border border-border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 relative h-[400px] md:h-[600px] bg-muted dark:bg-black/20 rounded-[2.5rem] border border-border overflow-hidden shadow-inner">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.447447141441!2d112.6052003106414!3d-7.948050679348421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTYnNTMuMCJTIDExMsKwMzYnMjYuNiJF!5e0!3m2!1sen!2sid!4v1703830000000!5m2!1sen!2sid" 
                 width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                 className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 dark:opacity-60 dark:hover:opacity-90"
               ></iframe>
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6">Lokasi Strategis</h2>
              <h3 className="text-4xl md:text-6xl font-serif text-gray-900 dark:text-foreground tracking-tight mb-8 leading-tight">Jantung Ketawanggede.</h3>
              <p className="text-muted-foreground text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 font-serif italic mb-12">
                Terletak di kawasan "Kerto", berada tepat di antara universitas-universitas paling bergengsi di Malang.
              </p>
              
              <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
                {[
                  { place: "UIN Maliki (Pintu Belakang)", dist: "5 mnt jalan kaki", desc: "±400m - Hunian premium terdekat dari kampus." },
                  { place: "Universitas Brawijaya (UB)", dist: "3 mnt berkendara", desc: "±850m - Akses sangat mudah via Watugong." },
                  { place: "Pusat Kebutuhan Harian", dist: "1 mnt jalan kaki", desc: "200m ke Alfamart, Kafe, dan Laundry." },
                ].map((loc, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-6 items-center group text-center sm:text-left border-b border-border pb-6 last:border-0">
                    <div className="w-12 h-12 bg-muted dark:bg-white/5 rounded-full flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row items-center gap-3 mb-1">
                        <h5 className="font-serif text-xl text-gray-900 dark:text-foreground">{loc.place}</h5>
                        <span className="text-primary text-[10px] font-bold uppercase tracking-widest">{loc.dist}</span>
                      </div>
                      <p className="text-muted-foreground text-sm font-medium">{loc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <motion.a 
                  whileHover={{ x: 5 }}
                  href="/lokasi"
                  className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px] border-b border-primary/20 pb-1"
                >
                  Lihat Detail Lokasi & Akses
                  <ArrowRight size={12} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 7. Paket Kamar */}
      <section id="sewa" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-card rounded-[3rem] p-8 md:p-24 border border-border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]"
        >
          <div className="text-center mb-16 md:mb-24 px-4">
            <h2 className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4">Pilih Ruang Anda</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-gray-900 dark:text-foreground tracking-tight">Paket Kamar</h3>
          </div>
          <ListingGrid />

          {/* Inventory Summary - RESTORED */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springConfig}
            className="mt-16 md:mt-24 max-w-5xl mx-auto bg-muted dark:bg-black/40 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative overflow-hidden border border-border"
          >
            <div className="relative z-10 text-center md:text-left md:pr-16">
              <h4 className="text-3xl md:text-4xl font-serif mb-4 text-gray-900 dark:text-white">Total 24 Kamar</h4>
              <p className="text-muted-foreground font-medium leading-relaxed text-sm md:text-base italic">"Ketersediaan terbatas untuk semester ini."</p>
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
          
          <div className="mt-12">
            <motion.a 
              whileHover={{ x: 5 }}
              href="/paket"
              className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px] border-b border-primary/20 pb-1"
            >
              Lihat Detail Paket & Kebijakan
              <ArrowRight size={12} />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* 8. FAQ */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-24 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={springConfig}
          className="bg-white dark:bg-card rounded-[3rem] p-8 md:p-24 border border-border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)]"
        >
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 dark:text-foreground tracking-tight">Informasi Penting</h2>
          </div>
          
          <Tabs defaultValue="umum" className="w-full">
            <TabsList className="flex w-fit mx-auto rounded-full bg-muted dark:bg-white/5 p-1 mb-12 md:mb-16 border border-border overflow-hidden">
              {faqCategories.map((cat) => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="rounded-full px-8 md:px-12 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground font-bold transition-all text-[11px] uppercase tracking-[0.2em]"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {faqCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="focus-visible:outline-none">
                <Accordion type="single" collapsible className="w-full space-y-4 text-left">
                  {cat.items.map((item, i) => (
                    <AccordionItem 
                      key={i} 
                      value={`item-${i}`}
                      className="border border-border rounded-2xl bg-muted/30 dark:bg-white/5 px-8 py-2 hover:bg-white dark:hover:bg-white/10 transition-all data-[state=open]:bg-white dark:data-[state=open]:bg-white/10"
                    >
                      <AccordionTrigger className="text-left font-serif text-xl text-gray-900 dark:text-foreground hover:no-underline py-6 leading-snug">
                        <span className="flex-1 pr-4">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-medium text-sm md:text-base leading-relaxed pb-8 pt-2">
                        <div dangerouslySetInnerHTML={{ __html: item.a }} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </section>

      {/* 9. Kontak */}
      <section id="contact" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-32 relative z-10 text-center text-white">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springConfig}
          className="bg-primary rounded-[3rem] p-12 md:p-32 text-center relative overflow-hidden shadow-[0_48px_96px_-12px_rgba(197,160,33,0.3)] group"
        >
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} 
          />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={springConfig}
              className="text-4xl md:text-7xl font-serif mb-12 md:mb-16 tracking-tight leading-tight text-primary-foreground"
            >
              Siap untuk memesan <br className="hidden md:block" /> hunian impian Anda?
            </motion.h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a 
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground text-primary px-12 md:px-16 py-5 md:py-6 rounded-full text-sm md:text-base font-bold uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-3"
              >
                Pesan via WhatsApp
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.a 
        href="https://wa.me/6281234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-[#25D366] text-white p-4 md:p-5 rounded-full shadow-2xl flex items-center gap-3 group min-h-[56px] md:min-h-[64px]"
      >
        <span className="max-w-0 overflow-hidden lg:group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">Hubungi Pengelola</span>
        <MessageCircle size={24} className="md:w-7 md:h-7" fill="currentColor" />
      </motion.a>

      <Footer />
    </main>
  );
}
