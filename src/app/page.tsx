"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ListingGrid } from "@/components/ListingGrid";
import { PropertyGallery } from "@/components/PropertyGallery";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
  Coffee,
  Printer,
  GraduationCap,
  Zap,
  Play,
  ArrowRight,
  ShieldAlert
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
  { icon: Wifi, title: "Internet Cepat", text: "Fiber optik kecepatan tinggi untuk belajar dan bekerja.", spec: "Dedicated Line" },
  { icon: ShieldCheck, title: "Keamanan Modern", text: "CCTV 24 jam dan kunci pintu sidik jari (fingerprint).", spec: "Biometric" },
  { icon: Clock, title: "Akses 24 Jam", text: "Kebebasan akses keluar masuk tanpa jam malam.", spec: "Self Access" },
  { icon: Utensils, title: "Dapur Bersama", text: "Area memasak lengkap untuk seluruh penghuni.", spec: "Full Equipment" },
  { icon: Car, title: "Parkir Luas", text: "Lahan aman untuk motor dan tersedia untuk 3 mobil.", spec: "CCTV Monitored" },
    { icon: Bed, title: "Fasilitas Kamar", text: "Kasur Queen, AC, Water heater, dan Smart TV.", spec: "Full Furnished" },
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
        desc: "Cukup 5 menit jalan kaki santai. Anda bisa pulang ke kost di sela-sela jeda kuliah untuk istirahat atau sholat, lalu kembali ke kampus dengan segar." 
      },
      { 
        title: "Akses Cepat ke UB (Gerbang Watugong/Soehat)", 
        desc: "Menghindari kemacetan MT Haryono. Akses jalan tikus yang cepat menuju Fakultas Teknik, MIPA, atau Kedokteran UB (via Veteran)." 
      }
    ]
  },
  {
    category: "Student Lifestyle Ecosystem",
    icon: Coffee,
    items: [
      { 
        title: "Pusat 'Nugas' & Kopi", 
        desc: "Dikelilingi puluhan Coffee Shop hits area Kerto & Gajayana yang buka sampai malam. Cocok untuk work from cafe atau mengerjakan skripsi tanpa perlu berkendara jauh." 
      },
      { 
        title: "Logistik 24 Jam", 
        desc: "Hanya 200m ke Alfamart/Indomaret terdekat. Lapar tengah malam? Area Ketawanggede adalah pusat kuliner mahasiswa yang hidup 24 jam." 
      }
    ]
  },
  {
    category: "Penunjang Akademik",
    icon: Printer,
    items: [
      { 
        title: "Digital Printing & Laundry Hub", 
        desc: "Tidak perlu pusing saat deadline. Area ini dipenuhi jasa laundry kilat dan percetakan dokumen 24 jam yang sangat krusial saat masa ujian/skripsi." 
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

      {/* 1. Hero */}
      <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 md:py-0">
        {/* Background with Zoom Effect */}
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop"
            alt="Zayura Exclusive Exterior"
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
            {/* Scarcity Badge */}
            <motion.div 
              variants={fadeInUp}
              className="mb-6 md:mb-8 flex items-center gap-2 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 px-3 md:px-4 py-1.5 rounded-full"
            >
              <motion.span 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-amber-50 rounded-full"
              />
              <span className="text-amber-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Permintaan Tinggi</span>
            </motion.div>

            {/* Main Headline (Logo) */}
            <motion.div 
              variants={fadeInUp}
              className="mb-6 md:mb-8 relative w-full max-w-[240px] md:max-w-[600px] aspect-[3/1]"
            >
              <Image 
                src="/images/logo.png" 
                alt="Zayura Exclusive" 
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mb-6 md:mb-8 bg-white/10 backdrop-blur-md border border-white/20 px-4 md:px-6 py-1.5 rounded-full"
            >
              <p className="text-white text-[9px] md:text-xs font-black tracking-[0.4em] md:tracking-[0.6em] uppercase ml-[0.4em] md:ml-[0.6em]">
                Gajayana
              </p>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="max-w-2xl text-white/90 text-base md:text-xl font-medium mb-10 md:mb-12 px-2 leading-relaxed drop-shadow-lg"
            >
              Hunian premium di dalam cluster terjaga. Hanya selangkah dari <span className="text-white font-bold">UIN & UB</span>, dilengkapi fasilitas <span className="text-amber-400 font-bold">Fast Internet</span> untuk produktivitas kuliah Anda.
            </motion.p>

            {/* Double CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-[320px] sm:max-w-none justify-center relative z-30"
            >
              <motion.a 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFBF00] text-gray-900 px-8 md:px-12 py-4 md:py-5 rounded-2xl md:rounded-[2rem] text-lg md:text-xl font-black shadow-[0_15px_30px_rgba(255,191,0,0.3)] flex items-center justify-center gap-2 md:gap-3 transition-all"
              >
                Amankan Slot
                <ArrowRight size={20} strokeWidth={3} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.95 }}
                href="#gallery"
                className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 md:px-12 py-4 md:py-5 rounded-2xl md:rounded-[2rem] text-lg md:text-xl font-black flex items-center justify-center gap-2 md:gap-3 transition-all"
              >
                <Play size={18} fill="currentColor" />
                Lihat Galeri
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

          {/* Infinite Marquee Section */}
          <div className="relative py-6 md:py-10 overflow-hidden bg-white/40 dark:bg-black/20 border-y border-gray-100 dark:border-white/5 select-none z-10">
            <div className="flex whitespace-nowrap">
              <motion.div 
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ 
                  duration: 40, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16"
              >
                {[...marqueeItems, ...marqueeItems].map((item, i) => (
                  <div key={i} className="flex items-center gap-8 md:gap-16">
                    <span className="text-sm md:text-2xl font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-900/[0.15] dark:text-white/[0.15]">
                      {item}
                    </span>
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-amber-500 rounded-full opacity-30" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* 2. Galeri */}
          <PropertyGallery />

          {/* 3. Lokasi */}
          <section id="location" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={springConfig}
              className="bg-white dark:bg-card rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 border border-gray-100 dark:border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-12 md:mb-20">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springConfig, delay: 0.2 }}
                  className="order-2 lg:order-1 relative h-[300px] md:h-[500px] bg-gray-50 dark:bg-black/20 rounded-2xl md:rounded-[2rem] border border-gray-100 dark:border-border overflow-hidden shadow-inner"
                >
                   <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.447447141441!2d112.6052003106414!3d-7.948050679348421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTYnNTMuMCJTIDExMsKwMzYnMjYuNiJF!5e0!3m2!1sen!2sid!4v1703830000000!5m2!1sen!2sid" 
                     width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                     className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 dark:opacity-60 dark:hover:opacity-90"
                   ></iframe>
                </motion.div>
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="order-1 lg:order-2 text-center lg:text-left"
                >
                  <motion.h2 variants={fadeInUp} className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4">Lokasi Strategis</motion.h2>
                  <motion.h3 variants={fadeInUp} className="text-3xl md:text-5xl font-black text-gray-900 dark:text-foreground tracking-tighter mb-6 md:mb-8 leading-tight">Jantung Ketawanggede.</motion.h3>
                  <motion.p variants={fadeInUp} className="text-gray-600 dark:text-muted-foreground text-base md:text-lg mb-8 md:mb-12 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Terletak di kawasan "Kerto", pusat aktivitas mahasiswa. Berada tepat di antara universitas-universitas paling bergengsi di Malang.
                  </motion.p>
                  
                  <div className="space-y-3 md:space-y-4 max-w-xl mx-auto lg:mx-0">
                    {[
                      { place: "UIN Maliki (Pintu Belakang)", dist: "5 mnt jalan kaki", desc: "±400m - Hunian premium terdekat dari kampus." },
                      { place: "Universitas Brawijaya (UB)", dist: "3 mnt berkendara", desc: "±850m - Akses sangat mudah via Watugong." },
                      { place: "Pusat Kebutuhan Harian", dist: "1 mnt jalan kaki", desc: "200m ke Alfamart, Kafe, dan Laundry." },
                    ].map((loc, i) => (
                      <motion.div 
                        key={i} 
                        variants={fadeInUp}
                        whileHover={{ x: 10 }}
                        className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center p-4 md:p-5 bg-gray-50/50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-border hover:bg-white dark:hover:bg-white/10 transition-all group text-center sm:text-left"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-zinc-800 shadow-sm rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <MapPin size={18} className="md:w-5 md:h-5" />
                        </div>
                        <div>
                          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 mb-1">
                            <h5 className="font-bold text-gray-900 dark:text-foreground text-base md:text-lg leading-none tracking-tight">{loc.place}</h5>
                            <span className="text-primary font-black text-[9px] md:text-[10px] uppercase tracking-widest">{loc.dist}</span>
                          </div>
                          <p className="text-gray-400 dark:text-muted-foreground/60 text-xs md:text-sm font-medium leading-relaxed">{loc.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="border-t border-gray-100 dark:border-border pt-12 md:pt-16 text-center">
                <motion.h4 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-xl md:text-2xl font-black text-gray-900 dark:text-foreground mb-8 md:mb-10 tracking-tight"
                >
                  Kenapa Lokasi Kami Istimewa?
                </motion.h4>
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                >
                  {neighborhoodBenefits.map((benefit, i) => (
                    <motion.div 
                      key={i} 
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      className="p-6 md:p-8 bg-gray-50/50 dark:bg-white/5 rounded-2xl md:rounded-3xl border border-transparent hover:border-gray-100 dark:hover:border-border hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm hover:shadow-md group text-center md:text-left"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        transition={springConfig}
                        className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors mx-auto md:mx-0"
                      >
                        <benefit.icon size={20} className="md:w-6 md:h-6" />
                      </motion.div>
                      <h5 className="font-black text-gray-900 dark:text-foreground text-base md:text-lg mb-4 md:mb-6 tracking-tight">{benefit.category}</h5>
                      <div className="space-y-4 md:space-y-6">
                        {benefit.items.map((item, j) => (
                          <div key={j}>
                            <h6 className="font-bold text-gray-900 dark:text-foreground text-xs md:text-sm mb-1 md:mb-2">{item.title}</h6>
                            <p className="text-gray-500 dark:text-muted-foreground text-[10px] md:text-xs leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* 4. Paket Kamar */}
          <section id="sewa" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-card rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 border border-gray-100 dark:border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="text-center mb-12 md:mb-16 px-4">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4"
                >
                  Pilih Ruang Anda
                </motion.h2>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springConfig, delay: 0.1 }}
                  className="text-3xl md:text-5xl font-black text-gray-900 dark:text-foreground tracking-tighter"
                >
                  Paket Kamar
                </motion.h3>
              </div>
              
              <ListingGrid />
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={springConfig}
                className="mt-12 md:mt-16 max-w-4xl mx-auto bg-gray-900 dark:bg-black rounded-3xl md:rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 text-white overflow-hidden relative group shadow-2xl transition-all duration-500 hover:scale-[1.01]"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 text-center md:text-left md:pr-10">
                  <h4 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">Total 24 Kamar</h4>
                  <p className="text-white/60 font-medium leading-relaxed text-xs md:text-sm">Ketersediaan terbatas untuk semester ini.</p>
                </div>
                <div className="relative z-10 flex flex-1 items-center justify-between w-full max-w-2xl">
                  {[
                    { label: "Lantai 1", count: "04" },
                    { label: "Lantai 2", count: "10" },
                    { label: "Lantai 3", count: "10" }
                  ].map((floor, i) => (
                    <React.Fragment key={i}>
                      <div className="text-center flex-1">
                        <p className="text-primary font-black text-3xl md:text-5xl tracking-tighter mb-1">{floor.count}</p>
                        <p className="text-[9px] md:text-xs font-black text-white/80 uppercase tracking-[0.2em]">{floor.label}</p>
                      </div>
                      {i < 2 && <div className="h-10 md:h-12 w-[1px] bg-white/10 shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* 5. Fasilitas */}
          <section id="keunggulan" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
            <div className="bg-white dark:bg-card rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 border border-gray-100 dark:border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start justify-between mb-12 md:mb-16 px-2 text-center lg:text-left">
                <div className="max-w-xl mx-auto lg:mx-0">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4"
                  >
                    Standar Kami
                  </motion.h2>
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...springConfig, delay: 0.1 }}
                    className="text-3xl md:text-5xl font-black text-gray-900 dark:text-foreground tracking-tighter leading-tight"
                  >
                    Segala yang Anda butuhkan untuk kenyamanan.
                  </motion.h3>
                </div>
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-gray-600 dark:text-muted-foreground text-base md:text-lg max-w-sm font-medium leading-relaxed lg:mt-12 mx-auto lg:mx-0"
                >
                  Kami merancang setiap fasilitas untuk mendukung produktivitas dan kenyamanan Anda.
                </motion.p>
              </div>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {facilities.map((f, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeInUp}
                    whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                    className="p-6 md:p-8 bg-gray-50/50 dark:bg-white/5 rounded-2xl md:rounded-[2rem] border border-transparent hover:border-gray-100 dark:hover:border-border hover:bg-white dark:hover:bg-white/10 transition-all group shadow-sm text-center md:text-left"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      transition={springConfig}
                      className="text-primary mb-4 md:mb-6 mx-auto md:mx-0"
                    >
                      <f.icon size={28} className="md:w-8 md:h-8" />
                    </motion.div>
                    <h4 className="font-black text-gray-900 dark:text-foreground text-lg md:text-xl mb-2 md:mb-3 tracking-tight">{f.title}</h4>
                    <p className="text-gray-500 dark:text-muted-foreground font-medium text-xs md:text-sm leading-relaxed mb-4 md:mb-6">{f.text}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="bg-amber-50 dark:bg-primary/10 text-amber-700 dark:text-primary text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-full uppercase tracking-[0.15em] border border-amber-100/50 dark:border-primary/20">
                        {f.spec}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 6. FAQ */}
          <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={springConfig}
              className="bg-white dark:bg-card rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 border border-gray-100 dark:border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-foreground tracking-tighter">Informasi Penting</h2>
              </div>
              
              <Tabs defaultValue="umum" className="w-full">
                <TabsList className="flex w-fit mx-auto rounded-full bg-gray-100/50 dark:bg-muted p-1 mb-8 md:mb-12 border border-gray-100 dark:border-border overflow-hidden">
                  {faqCategories.map((cat) => (
                    <TabsTrigger 
                      key={cat.id} 
                      value={cat.id}
                      className="rounded-full px-4 md:px-8 py-2 md:py-2.5 data-[state=active]:bg-primary data-[state=active]:shadow-sm data-[state=active]:text-primary-foreground text-gray-500 dark:text-muted-foreground font-black transition-all text-xs md:text-sm border border-transparent dark:data-[state=inactive]:hover:bg-white/5"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {faqCategories.map((cat) => (
                  <TabsContent key={cat.id} value={cat.id} className="focus-visible:outline-none">
                    <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4 text-left">
                      {cat.items.map((item, i) => (
                        <AccordionItem 
                          key={i} 
                          value={`item-${i}`}
                          className="border border-gray-100 dark:border-border rounded-xl md:rounded-2xl bg-gray-50/50 dark:bg-white/5 px-4 md:px-6 py-1 md:py-2 hover:bg-white dark:hover:bg-white/10 hover:border-gray-200 dark:hover:border-border transition-all data-[state=open]:bg-white dark:data-[state=open]:bg-white/10 data-[state=open]:border-gray-200 dark:data-[state=open]:border-border data-[state=open]:shadow-sm"
                        >
                          <AccordionTrigger className="text-left font-black text-gray-900 dark:text-foreground hover:no-underline text-base md:text-lg py-3 md:py-4 leading-snug group">
                            <span className="flex-1 pr-4">{item.q}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-muted-foreground font-medium text-xs md:text-sm leading-relaxed pb-5 md:pb-6 pt-1 md:pt-2">
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

          {/* 7. Kontak */}
          <section id="contact" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-32 relative z-10 text-center text-white">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springConfig}
              className="bg-primary rounded-[2rem] md:rounded-[3rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl group"
            >
              {/* Subtle decorative pattern overlay */}
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
                   style={{ 
                     backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1.5px)`, 
                     backgroundSize: '24px 24px' 
                   }} 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent group-hover:opacity-80 transition-opacity" />
              
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <motion.h2 
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  transition={springConfig}
                  className="text-3xl md:text-6xl font-black mb-8 md:mb-10 tracking-tighter leading-tight text-primary-foreground"
                >
                  Siap untuk memesan <br className="hidden md:block" /> kamar Anda?
                </motion.h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-black text-gray-900 dark:text-primary px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-black hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all shadow-xl flex items-center justify-center gap-3 min-h-[56px] md:min-h-[64px]"
                  >
                    Pesan via WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </section>

      {/* WhatsApp FAB with Breathing Animation */}
      <motion.a 
        href="https://wa.me/6281234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          boxShadow: [
            "0 0 0 0px rgba(37, 211, 102, 0)",
            "0 0 0 15px rgba(37, 211, 102, 0.1)",
            "0 0 0 30px rgba(37, 211, 102, 0)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: springConfig as any,
          opacity: { duration: 0.5 }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-[#25D366] text-white p-4 md:p-5 rounded-full shadow-2xl flex items-center gap-3 group min-h-[56px] md:min-h-[64px]"
      >
        <span className="max-w-0 overflow-hidden lg:group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">Hubungi Pengelola</span>
        <MessageCircle size={24} className="md:w-7 md:h-7" fill="currentColor" />
      </motion.a>

      <Footer />
    </main>
  );
}
